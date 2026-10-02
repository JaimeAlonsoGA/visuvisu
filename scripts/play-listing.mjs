#!/usr/bin/env node
// Pushes the store listing in store/ (texts, icon, feature graphic, phone screenshots)
// to Google Play through the Play Developer API.
//
// Usage: node scripts/play-listing.mjs [--dry-run]
// Credentials: play-service-account.json in the repo root (gitignored) or $PLAY_SERVICE_ACCOUNT.

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const STORE = path.join(ROOT, "store");
const PACKAGE = JSON.parse(fs.readFileSync(path.join(ROOT, "app.json"), "utf8")).expo.android.package;
const LANG = "es-ES";
const API = `https://androidpublisher.googleapis.com/androidpublisher/v3/applications/${PACKAGE}`;
const UPLOAD = `https://androidpublisher.googleapis.com/upload/androidpublisher/v3/applications/${PACKAGE}`;
const DRY = process.argv.includes("--dry-run");

// Sections of store/listing.md are "## Heading" blocks; the first paragraph(s) under each are the value.
function section(md, heading) {
  const m = md.match(new RegExp(`^## ${heading}[^\\n]*\\n([\\s\\S]*?)(?=^## |$(?![\\s\\S]))`, "m"));
  if (!m) throw new Error(`Missing section "${heading}" in listing.md`);
  return m[1].trim();
}

const md = fs.readFileSync(path.join(STORE, "listing.md"), "utf8");
const listing = {
  language: LANG,
  title: section(md, "Nombre"),
  shortDescription: section(md, "Descripción breve"),
  fullDescription: section(md, "Descripción completa"),
};
if (listing.title.length > 30) throw new Error("title > 30 chars");
if (listing.shortDescription.length > 80) throw new Error("short description > 80 chars");
if (listing.fullDescription.length > 4000) throw new Error("full description > 4000 chars");
const screenshots = fs
  .readdirSync(path.join(STORE, "screenshots"))
  .filter((f) => f.endsWith(".png"))
  .sort()
  .map((f) => path.join(STORE, "screenshots", f));

console.log(JSON.stringify({ ...listing, fullDescription: `${listing.fullDescription.slice(0, 60)}…` }, null, 1));
console.log(`icon, feature graphic, ${screenshots.length} screenshots`);
if (DRY) process.exit(0);

const key = JSON.parse(fs.readFileSync(process.env.PLAY_SERVICE_ACCOUNT || path.join(ROOT, "play-service-account.json"), "utf8"));
const b64 = (o) => Buffer.from(JSON.stringify(o)).toString("base64url");
const now = Math.floor(Date.now() / 1000);
const unsigned = `${b64({ alg: "RS256", typ: "JWT" })}.${b64({
  iss: key.client_email,
  scope: "https://www.googleapis.com/auth/androidpublisher",
  aud: "https://oauth2.googleapis.com/token",
  iat: now,
  exp: now + 3600,
})}`;
const sig = crypto.createSign("RSA-SHA256").update(unsigned).sign(key.private_key, "base64url");
const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
  method: "POST",
  body: new URLSearchParams({ grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer", assertion: `${unsigned}.${sig}` }),
});
const { access_token } = await tokenRes.json();

async function call(method, url, body, contentType = "application/json") {
  const res = await fetch(url, {
    method,
    headers: { Authorization: `Bearer ${access_token}`, ...(body ? { "Content-Type": contentType } : {}) },
    body: body && contentType === "application/json" ? JSON.stringify(body) : body,
  });
  const text = await res.text();
  if (!res.ok) throw new Error(`${method} ${url} → ${res.status}\n${text}`);
  return text ? JSON.parse(text) : {};
}

const edit = await call("POST", `${API}/edits`);
const E = `${API}/edits/${edit.id}`;
try {
  await call("PUT", `${E}/listings/${LANG}`, listing);
  const image = async (type, file) => {
    await call("POST", `${UPLOAD}/edits/${edit.id}/listings/${LANG}/${type}?uploadType=media`, fs.readFileSync(file), "image/png");
    console.log(`uploaded ${type}: ${path.basename(file)}`);
  };
  for (const type of ["icon", "featureGraphic", "phoneScreenshots"]) await call("DELETE", `${E}/listings/${LANG}/${type}`);
  await image("icon", path.join(STORE, "icon-512.png"));
  await image("featureGraphic", path.join(STORE, "feature-graphic.png"));
  for (const s of screenshots) await image("phoneScreenshots", s);
  await call("PATCH", `${E}/details`, { defaultLanguage: LANG });
  const committed = await call("POST", `${E}:commit`);
  console.log(`Listing committed (edit ${committed.id})`);
} catch (e) {
  await call("DELETE", E).catch(() => {});
  throw e;
}
