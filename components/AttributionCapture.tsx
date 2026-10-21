"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { captureAttribution, getAttributionData } from "./attribution";

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

/* The 15 attribution keys GTM's Data Layer Variables read (peoplelytics-ga4-setup
   DLV catalog). Names match the GHL fieldKeys and GA4 custom dimensions. */
const DATALAYER_KEYS = [
  "visitor_source_first",
  "visitor_source_recent",
  "attribution_method",
  "attribution_confidence",
  "aeo_source_engine_first",
  "aeo_source_engine_recent",
  "utm_source_captured",
  "utm_medium_captured",
  "utm_campaign_captured",
  "utm_term_captured",
  "utm_content_captured",
  "gclid_captured",
  "fbclid_captured",
  "msclkid_captured",
  "ttclid_captured",
] as const;

/**
 * Invisible component. Runs captureAttribution() on every route change so
 * localStorage reflects the latest first/last-touch + classified channel,
 * then pushes a `virtualPageview` carrying the attribution keys. That event
 * is what fires the "GA4 - page_view (SPA)" tag in GTM; the Google tag has
 * send_page_view=false so there is exactly one page_view per route.
 *
 * Mounted once in app/layout.tsx. Returns null — no visible output.
 */
export default function AttributionCapture() {
  const pathname = usePathname();

  useEffect(() => {
    captureAttribution();
    const data = getAttributionData() as Record<string, unknown>;
    const attribution = Object.fromEntries(DATALAYER_KEYS.map((k) => [k, data[k]]));
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "virtualPageview",
      page_path: pathname,
      page_location: window.location.href,
      page_title: document.title,
      ...attribution,
    });
    // Intentionally include pathname so SPA navigations re-capture
  }, [pathname]);

  return null;
}
