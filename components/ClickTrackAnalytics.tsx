/**
 * Click Track Analytics (ct.js v2) — CANONICAL INSTALL.
 *
 * Copy this file to `src/components/ClickTrackAnalytics.tsx` UNCHANGED on every
 * CTM client site and render it once from the root layout. There is nothing to
 * edit per client: both site-specific values come from env, exactly as
 * NEXT_PUBLIC_GTM_ID and NEXT_PUBLIC_GA_MEASUREMENT_ID already do in these
 * repos.
 *
 * That is the whole point. Hardcoding `data-key` per repo means every install
 * is a hand edit, and the failure mode is silent and expensive: paste the
 * previous client's key and their visits collect into the wrong property. Two
 * collectors under different keys are two separate properties with separate
 * history, and nothing in the browser or the container reveals the mistake.
 *
 *   NEXT_PUBLIC_CT_KEY   cta_<domain_with_underscores>_v1
 *   NEXT_PUBLIC_CT_SITE  the per-site id issued by Click Track Analytics
 *
 * Set both in Vercel for Production (and Preview, if previews should collect).
 *
 * ── Why a plain <Script>, not the createElement pattern ──────────────────────
 * The skill's default is `createElement` + `setAttribute`, because GTM Custom
 * HTML strips `data-*`. That does not apply here: this is a CODE install, and
 * next/script serializes `data-*` props correctly under beforeInteractive —
 * verified in the live DOM on San Diego Solar 2026-09-30, where both data-key
 * and data-site reached the element. Verify it again on the first site you
 * install this on, the same way:
 *
 *   [...document.querySelectorAll('script[src*="clicktrackanalytics"]')]
 *     .map(s => [...s.attributes].map(a => a.name + '=' + a.value));
 *
 * ── Why beforeInteractive is load-bearing ───────────────────────────────────
 * Forms read window.CT.ghlCustomFields() at submit time, so the loader must
 * have run first. It also samples the real landing URL and referrer before any
 * client-side navigation rewrites them, which is what keeps landing_page_first
 * and referrer_url_captured honest. Do NOT demote this to a useEffect client
 * component — attribution silently degrades and nothing errors.
 *
 * ── Consent ─────────────────────────────────────────────────────────────────
 * This renders ungated. On a site with the `ctm_track` edge cookie, use
 * Variant B in gated-component.tsx instead — an inline beforeInteractive script
 * that reads the cookie synchronously and injects this loader only when
 * tracking is allowed. Gating in a client effect or in the layout does not
 * work; see the skill.
 */
import Script from "next/script";

const CT_KEY = process.env.NEXT_PUBLIC_CT_KEY;
const CT_SITE = process.env.NEXT_PUBLIC_CT_SITE;

export function ClickTrackAnalytics() {
  // Render nothing rather than a half-configured tag. ct.js with a missing key
  // does not fall back to anything useful — it collects against nothing, which
  // looks identical to working until someone checks the property weeks later.
  // Matches how the GTM and GA4 tags in these layouts already guard.
  if (!CT_KEY || !CT_SITE) return null;

  return (
    /* eslint-disable-next-line @next/next/no-before-interactive-script-outside-document */
    <Script
      id="click-track-analytics"
      src="https://c.clicktrackanalytics.com/ct.v2.js"
      data-key={CT_KEY}
      data-site={CT_SITE}
      strategy="beforeInteractive"
    />
  );
}
