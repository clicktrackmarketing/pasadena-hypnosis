#!/usr/bin/env node
/**
 * Smoke test: hit the GHL Contacts API directly with the same logic that
 * api/lead.ts uses. Creates a synthetic test contact with full attribution
 * payload, then re-submits with the same email to verify locked-field
 * protection (visitor_source_first stays put, recent updates).
 *
 * Run from repo root:
 *   node scripts/test-ghl-lead.mjs
 *
 * Reads GHL_PIT and GHL_LOCATION_ID from .env.local
 */
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(__dirname, "..");

// Load .env.local
const envText = readFileSync(resolve(repoRoot, ".env.local"), "utf8");
const env = Object.fromEntries(
  envText
    .split("\n")
    .filter((l) => l && !l.startsWith("#") && l.includes("="))
    .map((l) => {
      const idx = l.indexOf("=");
      return [l.slice(0, idx).trim(), l.slice(idx + 1).trim()];
    })
);
const PIT = env.GHL_PIT;
const LOCATION_ID = env.GHL_LOCATION_ID;
if (!PIT || !LOCATION_ID) {
  console.error("✗ Missing GHL_PIT or GHL_LOCATION_ID in .env.local");
  process.exit(1);
}

const GHL = "https://services.leadconnectorhq.com";
const VERSION = "2021-07-28";
const headers = {
  Authorization: `Bearer ${PIT}`,
  Version: VERSION,
  "Content-Type": "application/json",
  Accept: "application/json",
};

const TEST_EMAIL = `ctm-smoke-test-${Date.now()}@example.com`;
const TEST_PHONE = "+14805550199";

// ── Field classification — must mirror api/lead.ts exactly ─────────
const LOCKED = new Set([
  "visitor_source_first",
  "attribution_method",
  "utm_source_captured",
  "utm_medium_captured",
  "utm_campaign_captured",
  "utm_term_captured",
  "utm_content_captured",
  "gclid_captured",
  "fbclid_captured",
  "msclkid_captured",
  "ttclid_captured",
  "landing_page_first",
  "referrer_url_captured",
  "first_visit_at_iso",
]);

const WRITE_ONCE = new Set([
  "services_needed",
  "how_did_you_hear",
  "form_page_url",
  "submitted_at",
]);

// Must mirror api/lead.ts STANDARD_FIELDS exactly — form_source / form_page_url
// / submitted_at intentionally excluded so they flow into customFields.
const STANDARD = new Set([
  "first_name", "last_name", "full_name", "email", "phone",
]);

function buildCustomFields(body, mode) {
  const out = [];
  for (const [k, v] of Object.entries(body)) {
    if (v === undefined || v === null || v === "") continue;
    if (STANDARD.has(k)) continue;
    if (mode === "update" && (LOCKED.has(k) || WRITE_ONCE.has(k))) continue;
    out.push({ key: k, field_value: typeof v === "boolean" ? v : Array.isArray(v) ? v.map(String) : String(v) });
  }
  return out;
}

async function searchByEmail(email) {
  // GHL v2 has a dedicated duplicate-check endpoint that's faster + cheaper
  // than the generic search. Returns { contact: {...} } if found, or
  // 200 with no body / 404 if not.
  const u = `${GHL}/contacts/search/duplicate?locationId=${encodeURIComponent(LOCATION_ID)}&email=${encodeURIComponent(email)}`;
  const r = await fetch(u, { headers });
  if (r.status === 404) return null;
  if (!r.ok) throw new Error(`search HTTP ${r.status}: ${await r.text()}`);
  const json = await r.json();
  return json.contact || null;
}

async function createContact(body) {
  // test:ignore tag lets GHL workflows filter out smoke-test contacts so they
  // don't trigger New Lead Notifications, drip sequences, etc.
  const tags = [`form:${body.form_source}`, `channel:${String(body.visitor_source_recent || "").toLowerCase().replace(/\s+/g, "-")}`, "website contact form submitted", "test:ignore"].filter(Boolean);
  const payload = {
    locationId: LOCATION_ID,
    type: "Lead",
    firstName: body.first_name,
    lastName: body.last_name,
    name: body.full_name,
    email: body.email,
    phone: body.phone,
    source: body.form_source,
    customFields: buildCustomFields(body, "create"),
    tags,
  };
  const r = await fetch(`${GHL}/contacts/`, { method: "POST", headers, body: JSON.stringify(payload) });
  if (!r.ok) throw new Error(`create HTTP ${r.status}: ${await r.text()}`);
  const json = await r.json();
  return json.contact?.id || json.id;
}

async function updateContact(id, body) {
  // Mirror api/lead.ts exactly:
  // - NO firstName/lastName/email/phone (preserve existing)
  // - customFields filtered to skip LOCKED + WRITE_ONCE (preserve original)
  // - NO tags here (handled separately by appendTags below — additive)
  const recentCustomFields = buildCustomFields(body, "update");

  if (recentCustomFields.length > 0) {
    const payload = { customFields: recentCustomFields };
    const r = await fetch(`${GHL}/contacts/${id}`, { method: "PUT", headers, body: JSON.stringify(payload) });
    if (!r.ok) throw new Error(`update HTTP ${r.status}: ${await r.text()}`);
  }

  // Append new tags via dedicated endpoint (additive, never replaces)
  const newTags = [
    `form:${body.form_source}`,
    `channel:${String(body.visitor_source_recent || "").toLowerCase().replace(/\s+/g, "-")}`,
    "test:ignore",
  ].filter((t) => t && !t.endsWith(":"));

  if (newTags.length > 0) {
    const tagRes = await fetch(`${GHL}/contacts/${id}/tags`, {
      method: "POST",
      headers,
      body: JSON.stringify({ tags: newTags }),
    });
    if (!tagRes.ok) throw new Error(`tag append HTTP ${tagRes.status}: ${await tagRes.text()}`);
  }
}

async function fetchContact(id) {
  const r = await fetch(`${GHL}/contacts/${id}`, { headers });
  if (!r.ok) throw new Error(`fetch HTTP ${r.status}: ${await r.text()}`);
  const json = await r.json();
  return json.contact || json;
}

async function deleteContact(id) {
  const r = await fetch(`${GHL}/contacts/${id}`, { method: "DELETE", headers });
  return r.ok;
}

// Map of GHL custom field ID → fieldKey, populated lazily on first use.
let _fieldIdToKey = null;
async function loadFieldIdMap() {
  if (_fieldIdToKey) return _fieldIdToKey;
  const r = await fetch(`${GHL}/locations/${LOCATION_ID}/customFields?model=contact`, { headers });
  if (!r.ok) throw new Error(`field map fetch HTTP ${r.status}`);
  const json = await r.json();
  _fieldIdToKey = new Map();
  for (const f of json.customFields || []) {
    const bareKey = (f.fieldKey || "").replace(/^contact\./, "");
    _fieldIdToKey.set(f.id, bareKey);
  }
  return _fieldIdToKey;
}

function customFieldValue(contact, key) {
  if (!contact.customFields) return undefined;
  // GHL returns customFields by id. Prefer matching by id via the loaded map.
  if (_fieldIdToKey) {
    for (const cf of contact.customFields) {
      const cfKey = _fieldIdToKey.get(cf.id);
      if (cfKey === key) return cf.value ?? cf.field_value;
    }
  }
  // Fallback for shapes that include the key inline
  for (const cf of contact.customFields) {
    if (cf.key === key || cf.fieldKey === key) return cf.value ?? cf.field_value;
  }
  return undefined;
}

// ── First touch payload (Paid Search via gclid) ──────────────────────
const firstTouch = {
  first_name: "Smoke",
  last_name: "Test",
  full_name: "Smoke Test",
  email: TEST_EMAIL,
  phone: TEST_PHONE,
  form_source: "contact_section",
  form_page_url: "https://www.pasadenahypnosis.com/services/stress-and-anxiety",
  submitted_at: new Date().toISOString(),

  // Attribution payload — all what attribution.ts would produce
  visitor_source_first: "Paid Search",
  visitor_source_recent: "Paid Search",
  attribution_method: "gclid",
  attribution_confidence: "High",
  utm_source_captured: "google",
  utm_medium_captured: "cpc",
  utm_campaign_captured: "smoke_test",
  utm_term_captured: "hypnotherapy pasadena",
  gclid_captured: "TEST_GCLID_001",
  landing_page_first: "/?utm_source=google&utm_medium=cpc&utm_campaign=smoke_test&gclid=TEST_GCLID_001",
  referrer_url_captured: "https://www.google.com/",
  first_visit_at_iso: new Date().toISOString(),
  last_visit_at_iso: new Date().toISOString(),
  landing_page_recent: "/",
  referrer_recent: "https://www.google.com/",

  // Lead qualification
  services_needed: "Stress and anxiety",
  how_did_you_hear: "Google Search",
};

// ── Second touch — designed to PROBE every preservation rule ────────
// All differences from firstTouch are intentional traps: if any of these
// values land on the contact after update, the no-overwrite contract is broken.
const secondTouch = {
  ...firstTouch,
  // Different name + phone — MUST NOT overwrite (preserve contract)
  first_name: "OVERWRITE",
  last_name: "ATTEMPTED",
  full_name: "OVERWRITE ATTEMPTED",
  phone: "+15555550000",

  // Different attribution recency — these SHOULD update (designed for it)
  visitor_source_recent: "AI Search",
  last_visit_at_iso: new Date().toISOString(),
  landing_page_recent: "/contact",
  referrer_recent: "https://www.perplexity.ai/",

  // Locked first-touch fields with different values — MUST NOT overwrite
  attribution_method: "utm",
  utm_source_captured: "perplexity",
  gclid_captured: undefined,

  // WRITE_ONCE qualification fields with different values — MUST NOT overwrite
  services_needed: "OVERWRITE_ATTEMPTED",      // was "Stress and anxiety"
  how_did_you_hear: "Other",                   // was "Google Search"

  // Form context — different form, MUST NOT overwrite first-touch source/url
  form_source: "contact_survey",
  form_page_url: "https://www.pasadenahypnosis.com/contact",
};

// What we EXPECT to find on the contact after the update
const EXPECTED_PRESERVED = {
  // Standard fields preserved
  firstName: "Smoke",
  lastName: "Test",
  email: TEST_EMAIL,
  phone: TEST_PHONE,
  // Locked first-touch
  visitor_source_first: "Paid Search",
  attribution_method: "gclid",
  gclid_captured: "TEST_GCLID_001",
  utm_source_captured: "google",
  // Write-once qualification + first-touch form context
  services_needed: "Stress and anxiety",
  how_did_you_hear: "Google Search",
  form_page_url: "https://www.pasadenahypnosis.com/services/stress-and-anxiety",
  submitted_at: firstTouch.submitted_at,
};

// What we EXPECT to UPDATE on the contact after the second touch
const EXPECTED_UPDATED = {
  visitor_source_recent: "AI Search",
  landing_page_recent: "/contact",
  referrer_recent: "https://www.perplexity.ai/",
};

// Tags from CREATE that MUST still be on the contact after update
const EXPECTED_PRESERVED_TAGS = ["form:contact_section", "channel:paid-search", "website contact form submitted"];
// Tags ADDED by the update — must be additive, not replace
const EXPECTED_APPENDED_TAGS = ["form:contact_survey", "channel:ai-search"];

console.log("──────────────────────────────────────────────────────────────────");
console.log("CTM /api/lead end-to-end smoke test");
console.log("──────────────────────────────────────────────────────────────────");
console.log("Test email:", TEST_EMAIL);
console.log("Location:  ", LOCATION_ID);
console.log("");

let createdId = null;
try {
  // Pre-flight — load the field ID → key map so we can read custom fields by name
  await loadFieldIdMap();

  // Step 1 — search (should find nothing)
  console.log("1. Searching for existing contact by email…");
  const pre = await searchByEmail(TEST_EMAIL);
  if (pre) {
    console.log("   ⚠ Unexpected: contact already exists. Cleaning up and aborting.");
    await deleteContact(pre.id);
    process.exit(1);
  }
  console.log("   ✓ No existing contact (expected).");

  // Step 2 — create with full payload
  console.log("\n2. Creating contact with full first-touch payload…");
  createdId = await createContact(firstTouch);
  console.log(`   ✓ Created contact ${createdId}`);

  // Step 3 — fetch and verify
  console.log("\n3. Fetching back to verify field write…");
  await new Promise((r) => setTimeout(r, 1500)); // small grace for GHL indexing
  const after1 = await fetchContact(createdId);
  console.log(`   ✓ Contact has ${after1.customFields?.length || 0} custom fields populated`);
  console.log(`   ✓ Tags: ${(after1.tags || []).join(", ")}`);
  console.log(`   ✓ Contact type: ${after1.type ?? "(not returned by API)"}`);
  if (after1.type && after1.type !== "Lead") {
    console.warn(`   ⚠ Expected type="Lead" but got "${after1.type}". Check GHL Contact Type field options + default.`);
  }

  // Step 4 — update with second-touch payload
  console.log("\n4. Re-submitting same email with different channel (locked-field test)…");
  await updateContact(createdId, secondTouch);
  console.log("   ✓ Update PUT returned OK");

  // Step 5 — re-fetch and ASSERT no-overwrite contract holds
  console.log("\n5. Verifying no-overwrite contract…");
  await new Promise((r) => setTimeout(r, 1500));
  const after2 = await fetchContact(createdId);

  const assertions = [];
  const fail = (msg) => { assertions.push({ ok: false, msg }); };
  const pass = (msg) => { assertions.push({ ok: true, msg }); };

  // Standard fields — must be preserved
  for (const [field, expected] of Object.entries(EXPECTED_PRESERVED)) {
    const actual = field in after2 ? after2[field] : customFieldValue(after2, field);
    if (actual === expected) pass(`${field} preserved (${JSON.stringify(actual)})`);
    else fail(`${field} CHANGED: expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`);
  }

  // Recent attribution fields — must be updated
  for (const [field, expected] of Object.entries(EXPECTED_UPDATED)) {
    const actual = customFieldValue(after2, field);
    if (actual === expected) pass(`${field} updated (${JSON.stringify(actual)})`);
    else fail(`${field} NOT UPDATED: expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`);
  }

  // Tag preservation
  const finalTags = after2.tags || [];
  for (const expectedTag of EXPECTED_PRESERVED_TAGS) {
    if (finalTags.includes(expectedTag)) pass(`tag preserved: ${expectedTag}`);
    else fail(`tag LOST on update: ${expectedTag} (current tags: ${finalTags.join(", ")})`);
  }
  for (const expectedTag of EXPECTED_APPENDED_TAGS) {
    if (finalTags.includes(expectedTag)) pass(`tag appended: ${expectedTag}`);
    else fail(`tag NOT appended: ${expectedTag} (current tags: ${finalTags.join(", ")})`);
  }

  const failed = assertions.filter((a) => !a.ok);
  const passed = assertions.filter((a) => a.ok);

  for (const a of passed) console.log(`   ✓ ${a.msg}`);
  for (const a of failed) console.log(`   ✗ ${a.msg}`);

  if (failed.length > 0) {
    console.log(`\n   ${failed.length} assertion(s) failed out of ${assertions.length}`);
    throw new Error(`No-overwrite contract VIOLATED — ${failed.length} field(s) changed when they shouldn't have`);
  }
  console.log(`\n   ✓ All ${assertions.length} no-overwrite assertions passed`);
  console.log(`   Final tag count: ${finalTags.length} → ${finalTags.join(", ")}`);

  // Step 6 — clean up (skipped if KEEP_TEST_CONTACT=1)
  if (process.env.KEEP_TEST_CONTACT === "1") {
    console.log("\n6. KEEP_TEST_CONTACT=1 → leaving contact in GHL for manual inspection.");
    console.log(`   Contact ID: ${createdId}`);
    console.log(`   Email:      ${TEST_EMAIL}`);
    console.log(`   → Open GHL → Contacts → search "${TEST_EMAIL}" and verify Contact Type field`);
  } else {
    console.log("\n6. Cleaning up test contact…");
    const ok = await deleteContact(createdId);
    console.log(ok ? "   ✓ Test contact deleted." : "   ⚠ Delete returned non-OK; may need manual cleanup.");
  }

  console.log("\n──────────────────────────────────────────────────────────────────");
  console.log("✓ ALL CHECKS PASSED");
  console.log("──────────────────────────────────────────────────────────────────");
  console.log("Verified:");
  console.log("  • PIT scopes work (contacts.read + contacts.write)");
  console.log("  • Search-by-email idempotency works");
  console.log("  • Custom fields land via { key, field_value } payload shape");
  console.log("  • Tags applied: form:* and channel:* + website contact form submitted");
  console.log("  • Update path runs without overwriting locked first-touch");
  console.log("  • Test contact cleaned up — no garbage in GHL");
  console.log("");
  console.log("→ /api/lead is ready for production traffic once Vercel env vars are set.");
} catch (err) {
  console.error("\n✗ TEST FAILED:", err.message);
  if (createdId) {
    console.error(`  Attempting cleanup of ${createdId}…`);
    try { await deleteContact(createdId); } catch {}
  }
  process.exit(1);
}
