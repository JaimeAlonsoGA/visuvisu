#!/usr/bin/env node
// Normalizes the species image catalogue in assets/species/data.json.
//
//  - Wikimedia images are resolved through the Commons API to a standard-size
//    thumbnail (Wikimedia rejects non-standard widths such as 1000px or 800px),
//    and get author + license filled in for attribution.
//  - Empty, broken, or stock-photo/hotlinked-search-result images are replaced
//    with a freely licensed image found on Wikipedia/Commons for that species.
//
// Usage: node scripts/fix-images.mjs [--dry-run]

import fs from "node:fs";
import path from "node:path";

const DATA = path.resolve(import.meta.dirname, "../assets/species/data.json");
const UA = "VisuApp/1.0 (https://github.com/JaimeAlonsoGA/visuvisu)";
const WIDTH = 960; // one of Wikimedia's standard thumbnail sizes
const DRY = process.argv.includes("--dry-run");

// Hosts whose images are unlicensed stock photos or expiring search-engine proxies.
const REPLACE_HOSTS = [
  "shutterstock.com",
  "istockphoto.com",
  "depositphotos.com",
  "gstatic.com",
  "googleusercontent.com",
];
// Search hints for names that are ambiguous on Wikipedia, keyed by class id.
const CLASS_HINT = { 1: "mineral", 4: "fósil", 18: "roca" };
// Hand-picked Commons files where a name search lands on the wrong article.
const FILE_OVERRIDES = {
  "Anomia ephippium": "Anomia ephippium.jpg",
  "Cuarzo ahumado": "Smoky quartz. Zinggenstock, Grimsel, Switzerland-8847.jpg",
  "Yeso rosa del desierto": "Roses des Sables Tunisie.jpg",
};

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function get(url, params) {
  const u = new URL(url);
  for (const [k, v] of Object.entries({ format: "json", formatversion: "2", ...params })) u.searchParams.set(k, v);
  for (let attempt = 0; attempt < 5; attempt++) {
    const res = await fetch(u, { headers: { "User-Agent": UA } });
    if (res.status === 429 || res.status >= 500) {
      await sleep(2000 * (attempt + 1));
      continue;
    }
    if (!res.ok) throw new Error(`${res.status} ${u}`);
    return res.json();
  }
  throw new Error(`gave up on ${u}`);
}

async function urlWorks(url) {
  try {
    const res = await fetch(url, { headers: { "User-Agent": UA, Range: "bytes=0-1023" }, signal: AbortSignal.timeout(20000) });
    await res.arrayBuffer().catch(() => {});
    return res.ok && (res.headers.get("content-type") || "").startsWith("image");
  } catch {
    return false;
  }
}

const stripHtml = (s = "") => s.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();

function commonsFileName(url) {
  const m = url.match(/(?:upload|thumb)\.wikimedia\.org\/wikipedia\/(?:commons|[a-z]+)\/(?:thumb\/)?[0-9a-f]\/[0-9a-f]{2}\/([^/?#]+)/);
  return m ? decodeURIComponent(m[1]) : null;
}

// Resolves Commons file names to { url, width, height, autor, license, source }.
async function resolveFiles(names) {
  const out = new Map();
  for (let i = 0; i < names.length; i += 40) {
    const batch = names.slice(i, i + 40);
    const data = await get("https://commons.wikimedia.org/w/api.php", {
      action: "query",
      titles: batch.map((n) => `File:${n}`).join("|"),
      prop: "imageinfo",
      iiprop: "url|size|extmetadata|mime",
      iiurlwidth: String(WIDTH),
    });
    const norm = new Map((data.query.normalized || []).map((n) => [n.to, n.from]));
    for (const page of data.query.pages) {
      const info = page.imageinfo?.[0];
      if (!info) continue;
      const name = (norm.get(page.title) || page.title).replace(/^File:/, "");
      const meta = info.extmetadata || {};
      out.set(name, {
        url: (info.thumburl || info.url).replace(/\?utm_.*$/, ""),
        width: info.thumbwidth || info.width,
        height: info.thumbheight || info.height,
        autor: stripHtml(meta.Artist?.value) || "Wikimedia Commons",
        license: stripHtml(meta.LicenseShortName?.value) || "",
        source: info.descriptionurl,
      });
    }
    await sleep(300);
  }
  return out;
}

// Finds the lead image of the best-matching Wikipedia article (es, then en), then Commons search.
async function findImageFor(query) {
  for (const host of ["es.wikipedia.org", "en.wikipedia.org"]) {
    const data = await get(`https://${host}/w/api.php`, {
      action: "query",
      generator: "search",
      gsrsearch: query,
      gsrlimit: "3",
      prop: "pageimages",
      piprop: "name",
    });
    const pages = (data.query?.pages || []).sort((a, b) => a.index - b.index);
    const hit = pages.find((p) => p.pageimage && !/\.svg$/i.test(p.pageimage));
    if (hit) return { file: hit.pageimage, via: `${host}: ${hit.title}` };
  }
  const data = await get("https://commons.wikimedia.org/w/api.php", {
    action: "query",
    list: "search",
    srsearch: `${query} filetype:bitmap`,
    srnamespace: "6",
    srlimit: "1",
  });
  const hit = data.query?.search?.[0];
  return hit ? { file: hit.title.replace(/^File:/, ""), via: `commons search: ${hit.title}` } : null;
}

const classes = JSON.parse(fs.readFileSync(DATA, "utf8"));
const log = [];

// 1. Collect every Wikimedia image and resolve them in bulk.
const wikiNames = new Set();
for (const c of classes)
  for (const s of c.species)
    for (const img of s.images) {
      img.url = img.url.trim().replace(/^h+ttps?:\/\//, "https://");
      const name = commonsFileName(img.url);
      if (name) wikiNames.add(name);
    }
console.log(`Resolving ${wikiNames.size} Commons files…`);
const resolved = await resolveFiles([...wikiNames]);

for (const c of classes) {
  for (const s of c.species) {
    const kept = [];
    for (const img of s.images) {
      const name = commonsFileName(img.url);
      if (name) {
        const r = resolved.get(name);
        if (r) kept.push({ ...img, ...r, title: img.title || s.scientific_name });
        else log.push(`missing on Commons: ${s.scientific_name} → ${name}`);
        continue;
      }
      if (!img.url) continue;
      const host = new URL(img.url).host;
      if (REPLACE_HOSTS.some((h) => host.endsWith(h))) {
        log.push(`dropping stock/proxy image for ${s.scientific_name} (${host})`);
        continue;
      }
      if (!(await urlWorks(img.url))) {
        log.push(`dropping broken image for ${s.scientific_name}: ${img.url}`);
        continue;
      }
      kept.push(img);
    }
    s.images = kept;
  }
}

// 2. Species left without images get one from Wikipedia/Commons.
for (const c of classes) {
  for (const s of c.species) {
    if (s.images.length) continue;
    const hint = CLASS_HINT[c.id];
    const query = hint ? `${s.scientific_name} ${hint}` : s.scientific_name;
    const override = FILE_OVERRIDES[s.scientific_name];
    const found = override
      ? { file: override, via: "manual override" }
      : (await findImageFor(query)) || (hint ? await findImageFor(s.scientific_name) : null);
    if (!found) {
      log.push(`NO IMAGE FOUND: [${c.name}] ${s.scientific_name}`);
      continue;
    }
    const r = (await resolveFiles([found.file])).get(found.file);
    if (!r) {
      log.push(`NO IMAGE FOUND (unresolvable ${found.file}): [${c.name}] ${s.scientific_name}`);
      continue;
    }
    s.images = [{ ...r, title: s.scientific_name }];
    log.push(`replaced: [${c.name}] ${s.scientific_name} ← ${found.via}`);
    await sleep(300);
  }
}

console.log(log.join("\n"));
if (!DRY) {
  fs.writeFileSync(DATA, JSON.stringify(classes, null, 2) + "\n");
  console.log(`Wrote ${DATA}`);
}
