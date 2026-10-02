#!/usr/bin/env node
// Uploads an Android App Bundle to a Google Play track through the Play Developer API.
//
// Usage: node scripts/play-upload.mjs <app.aab> [--track internal] [--status draft|completed] [--notes "texto"]
// Credentials: play-service-account.json in the repo root (gitignored) or $PLAY_SERVICE_ACCOUNT.

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const PACKAGE = JSON.parse(fs.readFileSync(path.join(ROOT, "app.json"), "utf8")).expo.android.package;
const API = "https://androidpublisher.googleapis.com/androidpublisher/v3/applications";
const UPLOAD = "https://androidpublisher.googleapis.com/upload/androidpublisher/v3/applications";

const args = process.argv.slice(2);
const flag = (name, fallback) => {
  const i = args.indexOf(`--${name}`);
  return i >= 0 ? args[i + 1] : fallback;
};
const aab = args.find((a) => a.endsWith(".aab"));
const track = flag("track", "internal");
const status = flag("status", "draft");
const notes = flag("notes", "");
if (!aab || !fs.existsSync(aab)) {
  console.error("Usage: node scripts/play-upload.mjs <app.aab> [--track internal] [--status draft|completed] [--notes texto]");
  process.exit(1);
}

const keyPath = process.env.PLAY_SERVICE_ACCOUNT || path.join(ROOT, "play-service-account.json");
const key = JSON.parse(fs.readFileSync(keyPath, "utf8"));

async function accessToken() {
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
  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer", assertion: `${unsigned}.${sig}` }),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(`token: ${JSON.stringify(json)}`);
  return json.access_token;
}

const token = await accessToken();
async function call(method, url, body, headers = { "Content-Type": "application/json" }) {
  const res = await fetch(url, {
    method,
    headers: { Authorization: `Bearer ${token}`, ...headers },
    body: body && !(body instanceof Buffer) ? JSON.stringify(body) : body,
  });
  const text = await res.text();
  if (!res.ok) throw new Error(`${method} ${url} → ${res.status}\n${text}`);
  return text ? JSON.parse(text) : {};
}

const edit = await call("POST", `${API}/${PACKAGE}/edits`, {});
console.log(`Edit ${edit.id} opened for ${PACKAGE}`);
const bundle = await call(
  "POST",
  `${UPLOAD}/${PACKAGE}/edits/${edit.id}/bundles?uploadType=media`,
  fs.readFileSync(aab),
  { "Content-Type": "application/octet-stream" }
);
console.log(`Uploaded bundle versionCode ${bundle.versionCode}`);
await call("PUT", `${API}/${PACKAGE}/edits/${edit.id}/tracks/${track}`, {
  track,
  releases: [
    {
      status,
      versionCodes: [String(bundle.versionCode)],
      ...(notes ? { releaseNotes: [{ language: "es-ES", text: notes }] } : {}),
    },
  ],
});
// Draft apps (never published) only accept draft releases and need changesNotSentForReview omitted.
const committed = await call("POST", `${API}/${PACKAGE}/edits/${edit.id}:commit`);
console.log(`Committed edit ${committed.id}: versionCode ${bundle.versionCode} → ${track} (${status})`);
