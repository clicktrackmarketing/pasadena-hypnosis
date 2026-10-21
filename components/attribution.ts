/**
 * Client-side attribution capture — Peoplelytics PRD v3.2 aligned.
 *
 * Classifies every visit into ONE of the 10 canonical channels:
 *   Organic Search · Paid Search · Paid Social · Google Maps · AI Search
 *   Email · SMS · Referral · Direct · Offline
 *
 * Writes to localStorage. On form submit, pull the whole record via
 * getAttributionData() and include it in your payload — the keys match
 * the GHL custom fieldKeys from the peoplelytics-ghl-setup skill.
 *
 * Internal on-site CTAs (utm_medium=internal_cta) are IGNORED for attribution —
 * they never overwrite first-touch or set the classified channel.
 *
 * CUSTOMIZE PER PROJECT:
 *   STORAGE_KEY below — use a client-scoped key like "clientname_attribution_v1"
 *   so multiple CTM-built sites on the same domain don't collide.
 */

const STORAGE_KEY = "ph_attribution_v1"; // Pasadena Hypnosis
const FIRST_TOUCH_DAYS = 365;

export type Channel =
  | "Organic Search"
  | "Paid Search"
  | "Paid Social"
  | "Google Maps"
  | "AI Search"
  | "Email"
  | "SMS"
  | "Referral"
  | "Direct"
  | "Offline";

export type AttributionMethod =
  | "gclid"
  | "fbclid"
  | "msclkid"
  | "ttclid"
  | "utm"
  | "self_reported"
  | "inferred"
  | "peoplepixel_session";

export type AttributionConfidence = "High" | "Medium" | "Low";

export interface AttributionData {
  // Classified channel — locked + recent
  visitor_source_first?: Channel;
  visitor_source_recent?: Channel;
  attribution_method?: AttributionMethod;
  attribution_confidence?: AttributionConfidence;

  // Raw captured — all LOCKED at first touch
  utm_source_captured?: string;
  utm_medium_captured?: string;
  utm_campaign_captured?: string;
  utm_term_captured?: string;
  utm_content_captured?: string;
  gclid_captured?: string;
  fbclid_captured?: string;
  msclkid_captured?: string;
  ttclid_captured?: string;
  landing_page_first?: string;
  referrer_url_captured?: string;
  first_visit_at_iso?: string;

  // AEO engine — which AI engine referred this visit
  aeo_source_engine_first?: string;
  aeo_source_engine_recent?: string;

  // Most-recent external visit (updated each external visit)
  last_visit_at_iso?: string;
  landing_page_recent?: string;
  referrer_recent?: string;
}

// ──────────────────────────────────────────────────────────────────
// Referrer hostname → engine / platform
// ──────────────────────────────────────────────────────────────────
const AI_ENGINES: Record<string, string> = {
  "chatgpt.com": "ChatGPT",
  "chat.openai.com": "ChatGPT",
  "perplexity.ai": "Perplexity",
  "www.perplexity.ai": "Perplexity",
  "gemini.google.com": "Google Gemini",
  "bard.google.com": "Google Gemini",
  "copilot.microsoft.com": "Microsoft Copilot",
  "claude.ai": "Claude",
  "meta.ai": "Meta AI",
  "grok.com": "Grok",
};

const SOCIAL_HOSTS = new Set([
  "instagram.com", "www.instagram.com", "l.instagram.com",
  "facebook.com", "www.facebook.com", "m.facebook.com", "l.facebook.com",
  "youtube.com", "www.youtube.com", "m.youtube.com",
  "tiktok.com", "www.tiktok.com",
  "linkedin.com", "www.linkedin.com", "lnkd.in",
  "pinterest.com", "www.pinterest.com",
  "x.com", "twitter.com", "t.co",
  "reddit.com", "www.reddit.com",
]);

const SEARCH_HOSTS = new Set([
  "google.com", "www.google.com",
  "bing.com", "www.bing.com",
  "duckduckgo.com",
  "yahoo.com", "search.yahoo.com",
  "ecosia.org",
  "brave.com",
]);

function isMapsReferrer(host: string): boolean {
  return host === "maps.google.com" || host === "www.google.com/maps";
}

function aiEngineFor(host: string): string | null {
  return AI_ENGINES[host] || null;
}

// ──────────────────────────────────────────────────────────────────
// Storage helpers
// ──────────────────────────────────────────────────────────────────
function getStored(): AttributionData {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function setStored(data: AttributionData) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // localStorage disabled (private browsing) — skip silently
  }
}

function daysBetween(a: string, b: string): number {
  return (new Date(b).getTime() - new Date(a).getTime()) / (1000 * 60 * 60 * 24);
}

// ──────────────────────────────────────────────────────────────────
// The 7-priority classifier (PRD section 7.1)
// ──────────────────────────────────────────────────────────────────
interface Signal {
  channel: Channel;
  method: AttributionMethod;
  confidence: AttributionConfidence;
  aeoEngine?: string;
}

function classify(opts: {
  params: URLSearchParams;
  referrerHost: string;
}): Signal {
  const { params, referrerHost } = opts;

  const utmSource = params.get("utm_source")?.toLowerCase();
  const utmMedium = params.get("utm_medium")?.toLowerCase();
  const gclid = params.get("gclid");
  const fbclid = params.get("fbclid");
  const msclkid = params.get("msclkid");
  const ttclid = params.get("ttclid");

  // Priority 1: gclid → Paid Search (Google Ads)
  if (gclid) return { channel: "Paid Search", method: "gclid", confidence: "High" };

  // Priority 2: msclkid → Paid Search (Bing Ads)
  if (msclkid) return { channel: "Paid Search", method: "msclkid", confidence: "High" };

  // Priority 3: fbclid or ttclid → Paid Social
  if (fbclid) return { channel: "Paid Social", method: "fbclid", confidence: "High" };
  if (ttclid) return { channel: "Paid Social", method: "ttclid", confidence: "High" };

  // Priority 4: AI engine — referrer OR explicit utm_source.
  // ChatGPT and Gemini frequently strip referrers on outbound clicks, so a
  // campaign tagged ?utm_source=chatgpt.com&utm_medium=referral arrives with
  // an empty referrer. Without checking utm_source here, those visits would
  // fall through to Priority 5 (utmMedium=referral → Referral) and
  // visitor_source_first would disagree with the GA4 Peoplelytics Channels
  // group (whose `Source matches regex` condition catches them via utm).
  const aiEngine =
    (referrerHost && aiEngineFor(referrerHost)) ||
    (utmSource && aiEngineFor(utmSource)) ||
    null;
  if (aiEngine) {
    // High confidence when there's an explicit signal (utm OR query param);
    // medium when only the referrer host matched.
    const hasQuery = params.get("q") || params.get("query");
    const hasUtm = !!utmSource;
    return {
      channel: "AI Search",
      method: hasUtm ? "utm" : "inferred",
      confidence: hasQuery || hasUtm ? "High" : "Medium",
      aeoEngine: aiEngine,
    };
  }

  // Priority 5: Explicit UTM medium
  if (utmMedium === "organic") {
    return { channel: "Organic Search", method: "utm", confidence: "High" };
  }
  if (utmMedium === "cpc" || utmMedium === "paid" || utmMedium === "ppc") {
    return { channel: "Paid Search", method: "utm", confidence: "High" };
  }
  if (utmMedium === "paid_social" || utmMedium === "social_paid") {
    return { channel: "Paid Social", method: "utm", confidence: "High" };
  }
  if (utmMedium === "email") {
    return { channel: "Email", method: "utm", confidence: "High" };
  }
  if (utmMedium === "sms" || utmMedium === "text") {
    return { channel: "SMS", method: "utm", confidence: "High" };
  }
  if (utmMedium === "referral") {
    return { channel: "Referral", method: "utm", confidence: "High" };
  }
  if (utmMedium === "social") {
    return { channel: "Paid Social", method: "utm", confidence: "Medium" };
  }

  // Priority 6: Google Maps / GBP
  if (utmMedium === "maps" || utmSource === "google_business") {
    return { channel: "Google Maps", method: "utm", confidence: "Medium" };
  }
  if (referrerHost && isMapsReferrer(referrerHost)) {
    return { channel: "Google Maps", method: "utm", confidence: "Medium" };
  }

  // Priority 6b: Organic referrer (search engine, no UTM)
  if (referrerHost && SEARCH_HOSTS.has(referrerHost)) {
    return { channel: "Organic Search", method: "inferred", confidence: "Medium" };
  }

  // Priority 6c: Social referrer (no UTM)
  if (referrerHost && SOCIAL_HOSTS.has(referrerHost)) {
    return { channel: "Paid Social", method: "inferred", confidence: "Medium" };
  }

  // Priority 7: Unknown external referrer
  if (referrerHost) {
    return { channel: "Referral", method: "inferred", confidence: "Low" };
  }

  // Fallback: Direct
  return { channel: "Direct", method: "inferred", confidence: "Low" };
}

// ──────────────────────────────────────────────────────────────────
// Main capture entry
// ──────────────────────────────────────────────────────────────────
export function captureAttribution() {
  if (typeof window === "undefined") return;

  const url = new URL(window.location.href);
  const params = url.searchParams;
  const now = new Date().toISOString();
  const stored = getStored();

  // Internal CTA click — never touches first/last touch
  if (params.get("utm_medium") === "internal_cta") return;

  // Parse referrer
  let referrerHost = "";
  // Only an EXTERNAL referrer is a real acquisition signal. A same-origin
  // referrer is just the previous page on this site, and storing it would put
  // a self-referral into the locked referrer_url_captured field — permanently,
  // since first-touch never rewrites. Keep the raw value only when external.
  let referrer = "";
  const rawReferrer = document.referrer || "";
  if (rawReferrer) {
    try {
      const rUrl = new URL(rawReferrer);
      if (rUrl.origin !== url.origin) {
        referrerHost = rUrl.hostname.toLowerCase();
        referrer = rawReferrer;
      }
    } catch {}
  }

  // Has incoming signal? (UTM, click ID, or external referrer)
  const hasSignal =
    params.has("utm_source") ||
    params.has("utm_medium") ||
    params.has("gclid") ||
    params.has("fbclid") ||
    params.has("msclkid") ||
    params.has("ttclid") ||
    !!referrerHost;

  // If no signal and we have stored attribution, skip (on-site nav)
  if (!hasSignal && stored.first_visit_at_iso) return;

  const signal = classify({ params, referrerHost });

  // Raw captured values for immutable write
  const capturedRaw = {
    utm_source: params.get("utm_source") || undefined,
    utm_medium: params.get("utm_medium") || undefined,
    utm_campaign: params.get("utm_campaign") || undefined,
    utm_term: params.get("utm_term") || undefined,
    utm_content: params.get("utm_content") || undefined,
    gclid: params.get("gclid") || undefined,
    fbclid: params.get("fbclid") || undefined,
    msclkid: params.get("msclkid") || undefined,
    ttclid: params.get("ttclid") || undefined,
  };

  const landingPage = url.pathname + url.search;
  const updated: AttributionData = { ...stored };

  // FIRST TOUCH — write only if unset or older than window (LOCKED fields)
  const shouldWriteFirst =
    !stored.first_visit_at_iso ||
    daysBetween(stored.first_visit_at_iso, now) > FIRST_TOUCH_DAYS;

  if (shouldWriteFirst) {
    updated.visitor_source_first = signal.channel;
    updated.attribution_method = signal.method;
    updated.attribution_confidence = signal.confidence;
    updated.utm_source_captured = capturedRaw.utm_source;
    updated.utm_medium_captured = capturedRaw.utm_medium;
    updated.utm_campaign_captured = capturedRaw.utm_campaign;
    updated.utm_term_captured = capturedRaw.utm_term;
    updated.utm_content_captured = capturedRaw.utm_content;
    updated.gclid_captured = capturedRaw.gclid;
    updated.fbclid_captured = capturedRaw.fbclid;
    updated.msclkid_captured = capturedRaw.msclkid;
    updated.ttclid_captured = capturedRaw.ttclid;
    updated.landing_page_first = landingPage;
    updated.referrer_url_captured = referrer || undefined;
    updated.first_visit_at_iso = now;
    updated.aeo_source_engine_first = signal.aeoEngine;
  }

  // RECENT TOUCH — update visitor_source_recent + last_* fields each external visit
  updated.visitor_source_recent = signal.channel;
  updated.last_visit_at_iso = now;
  updated.landing_page_recent = landingPage;
  updated.referrer_recent = referrer || undefined;
  updated.aeo_source_engine_recent = signal.aeoEngine;

  // Upgrade path per PRD 1.2: if current method = 'inferred' (Low confidence)
  // and new visit has a higher-confidence method, allow the upgrade.
  if (
    stored.visitor_source_first &&
    stored.attribution_method === "inferred" &&
    stored.attribution_confidence === "Low" &&
    signal.confidence === "High" &&
    signal.method !== "inferred"
  ) {
    updated.visitor_source_first = signal.channel;
    updated.attribution_method = signal.method;
    updated.attribution_confidence = signal.confidence;
    // Raw captured also upgrades since the original was empty
    updated.utm_source_captured = capturedRaw.utm_source || stored.utm_source_captured;
    updated.utm_medium_captured = capturedRaw.utm_medium || stored.utm_medium_captured;
    updated.gclid_captured = capturedRaw.gclid || stored.gclid_captured;
    updated.fbclid_captured = capturedRaw.fbclid || stored.fbclid_captured;
    updated.aeo_source_engine_first = signal.aeoEngine || stored.aeo_source_engine_first;
  }

  setStored(updated);
}

export function getAttributionData(): AttributionData {
  return getStored();
}
