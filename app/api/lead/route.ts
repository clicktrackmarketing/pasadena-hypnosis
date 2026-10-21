/**
 * Next.js App Router route — POST /api/lead
 *
 * Receives a lead payload from the site forms, validates it, and writes the
 * contact into HighLevel via the v2 Contacts API using a Private Integration
 * Token. The PIT lives ONLY in this server-side env var — never exposed to
 * the browser.
 *
 * Drop into: app/api/lead/route.ts
 *
 * Behavior — write-once contract:
 *   1. Parse + minimum-validate the incoming JSON.
 *   2. Look up an existing contact by email (idempotency).
 *   3. If new → POST /contacts/  with the full payload (incl. locked first-touch fields).
 *   4. If existing → PRESERVE all original data:
 *      - Standard fields (firstName/lastName/email/phone): NOT sent → preserved
 *      - LOCKED first-touch fields: NOT sent → preserved
 *      - WRITE_ONCE qualification fields (lead_goal, notes, etc.): NOT sent → preserved
 *      - "Recent" attribution fields (visitor_source_recent, last_*): SENT → updated each visit
 *      - Tags: APPENDED via dedicated /tags endpoint (does not replace)
 *   5. Return { ok: true, contactId, created: bool }.
 *
 * Required env vars (set in .env.local AND deployment provider, NOT in client bundle):
 *   GHL_PIT          — the Private Integration Token (pit-…)
 *   GHL_LOCATION_ID  — the sub-account location ID
 */

import type { NextRequest } from "next/server";

const GHL_API = "https://services.leadconnectorhq.com";
const API_VERSION = "2021-07-28";

// ──────────────────────────────────────────────────────────────────
// Field classification for write-once contract
// ──────────────────────────────────────────────────────────────────

// LOCKED — only written when CREATING a brand-new contact. Never sent on
// update. Preserves first-touch attribution per Peoplelytics Master Schema
// v1.0 "lock by suffix" rule:
//   *_first / *_captured / first_*_at_iso → LOCKED
// Plus first-* lifecycle and revenue locks from Group F + Group H.
const LOCKED_FIELD_KEYS = new Set<string>([
  // Group A — Core Attribution
  "visitor_source_first",
  "visitor_source_first_detail",
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
  "how_did_you_hear",
  // Group C — Universal Form
  "form_first_submitted_at",
  // Group D — SEO
  "seo_keyword_first",
  "seo_keyword_confidence",
  "seo_keyword_match_method",
  "seo_landing_page_first",
  "seo_first_organic_visit_at",
  // Group E — AEO
  "aeo_source_engine_first",
  "aeo_source_engine_first_detail",
  "aeo_query_first",
  "aeo_query_confidence",
  "aeo_landing_page_first",
  "aeo_first_ai_visit_at",
  // Group F — Lifecycle
  "lc_first_contacted_at",
  "lc_first_response_at",
  // Group H — Revenue Rollup
  "rev_first_deal_value",
  "rev_first_deal_closed_at",
  "rev_days_visit_to_lead",
  // Group B — PeoplePixel Identity (IntentWave, 2026-06 schema v9)
  // IntentWave's webhook directly writes these, but form submissions
  // (/api/contact, /api/quote) MUST NEVER overwrite the identity values
  // with stale form-submitted data. The 4 engagement signals
  // (time_on_site_seconds, pages_viewed_count, session_count,
  // top_pages_json) are intentionally OMITTED — they update each visit.
  //
  // Identity (universal hashes for Meta CAPI / Google Enhanced / Bing UET)
  "visitor_id",
  "email_md5",
  "email_sha1",
  "email_sha256",
  "personal_emails_additional",
  // Enriched contact (collision-avoidance vs GHL standard contact fields)
  "enriched_full_name",
  "enriched_business_email",
  "enriched_mobile_phone",
  "enriched_city",
  "enriched_state",
  "enriched_postal_code",
  // Professional profile + B2B firmographics
  "buyer_signal_score",
  "job_title",
  "seniority_level",
  "linkedin_url",
  "income_range",
  "company_name",
  "company_domain",
  "company_industry",
  "company_revenue",
  "company_employee_count",
  "company_description",
  "company_linkedin_url",
  // B2C demographics — solar / home-services fit-scoring
  "homeowner_flag",
  "net_worth_range",
  "age_range",
  "gender",
  "married_flag",
  "children_flag",
  // Identity-resolution consent (GDPR/CCPA legal record — distinct from
  // form/SMS consent which is in WRITE_ONCE_FIELD_KEYS below)
  "identity_consent_date",
  "identity_consent_url",
]);

// WRITE_ONCE — only written when CREATING. Preserves the contact's ORIGINAL
// qualification answers. CUSTOMIZE PER CLIENT: add the client_{slug}_*
// qualification fields to this set.
const WRITE_ONCE_FIELD_KEYS = new Set<string>([
  // Pasadena Hypnosis qualification. The site has no qualification form yet;
  // services_needed is the one answer field provisioned on the sub-account.
  "services_needed",
  // Universal first-touch form context
  "form_page_url",
  "submitted_at",
]);

// Standard GHL contact properties — sent at top level of the GHL payload, not
// as customFields entries. On UPDATE, these are NOT sent so the contact's
// existing values stay intact.
//
// IMPORTANT: form_source / form_page_url / submitted_at must NOT be in this
// set. They're consumed at the top level too (form_source → contact.source on
// CREATE), but they're ALSO defined as Master Schema Group C custom fields and
// must be written there. WRITE_ONCE_FIELD_KEYS already covers preserving
// form_page_url + submitted_at on UPDATE. (Discovered 2026-05-07 on Pamela
// Hobbs — those three fields silently dropped from every contact for weeks.)
const STANDARD_FIELDS = new Set<string>([
  "first_name",
  "last_name",
  "full_name",
  "email",
  "phone",
]);

interface LeadBody {
  first_name?: string;
  last_name?: string;
  full_name?: string;
  email?: string;
  phone?: string;
  form_source?: string;
  visitor_source_recent?: string;
  [key: string]: unknown;
}

function buildCustomFields(body: LeadBody, mode: "create" | "update") {
  const out: Array<{ key: string; field_value: string | boolean | string[] }> = [];
  for (const [key, raw] of Object.entries(body)) {
    if (raw === undefined || raw === null || raw === "") continue;
    if (STANDARD_FIELDS.has(key)) continue;

    if (mode === "update") {
      if (LOCKED_FIELD_KEYS.has(key)) continue;
      if (WRITE_ONCE_FIELD_KEYS.has(key)) continue;
    }

    let value: string | boolean | string[];
    if (typeof raw === "boolean") value = raw;
    else if (Array.isArray(raw)) value = raw.map(String);
    else value = String(raw);

    out.push({ key, field_value: value });
  }
  return out;
}

async function ghlFetch(path: string, init: RequestInit, pit: string) {
  return fetch(`${GHL_API}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${pit}`,
      Version: API_VERSION,
      "Content-Type": "application/json",
      Accept: "application/json",
      ...(init.headers || {}),
    },
  });
}

async function findContactByEmail(email: string, pit: string, locationId: string): Promise<string | null> {
  const url = `/contacts/search/duplicate?locationId=${encodeURIComponent(locationId)}&email=${encodeURIComponent(email)}`;
  const res = await ghlFetch(url, { method: "GET" }, pit);
  if (res.status === 404) return null;
  if (!res.ok) return null;
  const json = (await res.json()) as { contact?: { id: string } };
  return json.contact?.id || null;
}

/**
 * Append tags to an existing contact via the dedicated /tags endpoint.
 * Idempotent — sending an already-present tag has no effect.
 * Critically, this does NOT replace existing tags (PUT /contacts/{id} would).
 */
async function appendTags(contactId: string, tags: string[], pit: string) {
  if (tags.length === 0) return;
  const res = await ghlFetch(
    `/contacts/${contactId}/tags`,
    { method: "POST", body: JSON.stringify({ tags }) },
    pit
  );
  if (!res.ok) {
    const detail = await res.text();
    throw new Error(`Tag append failed (HTTP ${res.status}): ${detail}`);
  }
}

function jsonError(status: number, message: string, extra?: unknown) {
  return Response.json({ ok: false, error: message, detail: extra }, { status });
}

export async function POST(request: NextRequest) {
  const PIT = process.env.GHL_PIT;
  const LOCATION_ID = process.env.GHL_LOCATION_ID;
  if (!PIT || !LOCATION_ID) {
    return jsonError(500, "Server misconfigured: GHL_PIT or GHL_LOCATION_ID env var is missing.");
  }

  let body: LeadBody;
  try {
    body = (await request.json()) as LeadBody;
  } catch {
    return jsonError(400, "Invalid JSON body");
  }

  if (!body || (!body.email && !body.phone)) {
    return jsonError(400, "email or phone is required");
  }

  const formSource = String(body.form_source || "unknown");
  const channelTag = body.visitor_source_recent
    ? `channel:${String(body.visitor_source_recent).toLowerCase().replace(/\s+/g, "-")}`
    : null;

  try {
    let contactId: string | null = null;
    let created = false;

    if (body.email) {
      contactId = await findContactByEmail(body.email, PIT, LOCATION_ID);
    }

    if (contactId) {
      // ── EXISTING CONTACT — preserve all original data ────────────────
      const recentCustomFields = buildCustomFields(body, "update");

      if (recentCustomFields.length > 0) {
        const updatePayload = {
          customFields: recentCustomFields,
          // Intentionally NO firstName/lastName/email/phone — preserve existing
          // Intentionally NO tags — handled by appendTags below
        };
        const updateRes = await ghlFetch(
          `/contacts/${contactId}`,
          { method: "PUT", body: JSON.stringify(updatePayload) },
          PIT
        );
        if (!updateRes.ok) {
          const detail = await updateRes.text();
          return jsonError(502, `GHL update failed (HTTP ${updateRes.status})`, detail);
        }
      }

      const tagsToAppend = [
        `form:${formSource}`,
        ...(channelTag ? [channelTag] : []),
      ];
      await appendTags(contactId, tagsToAppend, PIT);
    } else {
      // ── NEW CONTACT — write full first-touch payload ────────────────
      // type: "Lead" matches the most common GHL Contact Type customization.
      // Adjust if the location's Contact Type field has different option values.
      const createPayload = {
        locationId: LOCATION_ID,
        type: "Lead",
        firstName: body.first_name || undefined,
        lastName: body.last_name || undefined,
        name: body.full_name || undefined,
        email: body.email || undefined,
        phone: body.phone || undefined,
        source: formSource,
        customFields: buildCustomFields(body, "create"),
        tags: [
          `form:${formSource}`,
          ...(channelTag ? [channelTag] : []),
          // Canonical CTM baseline tag — matches peoplelytics-webhook-form.
          // Don't rename per client; downstream GHL workflows trigger on it.
          "website contact form submitted",
        ],
      };
      const createRes = await ghlFetch(
        `/contacts/`,
        { method: "POST", body: JSON.stringify(createPayload) },
        PIT
      );
      if (!createRes.ok) {
        const detail = await createRes.text();
        return jsonError(502, `GHL create failed (HTTP ${createRes.status})`, detail);
      }
      const created_json = (await createRes.json()) as { contact?: { id: string }; id?: string };
      contactId = created_json.contact?.id || created_json.id || null;
      created = true;
    }

    return Response.json({ ok: true, contactId, created, form_source: formSource });
  } catch (err) {
    return jsonError(
      500,
      "Lead handler exception",
      err instanceof Error ? err.message : String(err)
    );
  }
}
