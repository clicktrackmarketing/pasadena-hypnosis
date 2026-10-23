import Script from 'next/script';

/* ---------------------------------------------------------------------------
   Google Tag Manager + Consent Mode v2 (launch audit 2026-10-23).

   GTM (NEXT_PUBLIC_GTM_ID) carries GA4: the Google tag with
   send_page_view=false, and a page_view tag fired by the `virtualPageview`
   event that components/AttributionCapture.tsx pushes on every route.

   CONSENT DEFAULTS, set before GTM loads. There is no consent banner, so:
     - EEA-27 + Iceland, Liechtenstein, Norway, UK, Switzerland: everything
       denied. Google matches the visitor's region itself; nothing here
       geolocates. With no banner these visitors are never asked, so GA4
       only receives cookieless pings from them. That is the price of
       having no banner, and it is the lawful side of the trade.
     - Everywhere else: analytics_storage granted.
     - Ad signals (ad_storage, ad_user_data, ad_personalization) denied
       everywhere. The site runs no advertising; if ads are added later,
       revisit this together with the privacy policy.
   Global Privacy Control: a browser sending GPC gets ad signals denied
   (already the default) and analytics denied as well, before GTM loads.

   Loaded only on Vercel production (or ANALYTICS_ENABLED=true), so preview
   deployments and local dev never send data to GA4. Read at build time, so
   no page becomes dynamic.

   app/privacy describes exactly this. Change both together.
--------------------------------------------------------------------------- */

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;

const CONSENT_REGIONS = [
  'AT', 'BE', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EE', 'FI', 'FR', 'DE', 'GR', 'HU', 'IE',
  'IT', 'LV', 'LT', 'LU', 'MT', 'NL', 'PL', 'PT', 'RO', 'SK', 'SI', 'ES', 'SE',
  'IS', 'LI', 'NO', 'GB', 'CH',
];

export const analyticsEnabled = (): boolean => {
  if (!GTM_ID) return false;
  if (process.env.ANALYTICS_ENABLED === 'true') return true;
  if (process.env.ANALYTICS_ENABLED === 'false') return false;
  return process.env.VERCEL_ENV === 'production';
};

const consentScript = `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
var ads = { ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' };
gtag('consent', 'default', Object.assign({ analytics_storage: 'denied', region: ${JSON.stringify(CONSENT_REGIONS)} }, ads));
gtag('consent', 'default', Object.assign({ analytics_storage: 'granted' }, ads));
if (navigator.globalPrivacyControl) {
  gtag('consent', 'update', Object.assign({ analytics_storage: 'denied' }, ads));
}
`;

const gtmScript = (id: string) => `
(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});
var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${id}');
`;

/** Consent defaults. Must render before GTM, so it goes in <head>. */
export function ConsentDefaults() {
  if (!analyticsEnabled()) return null;
  // eslint-disable-next-line react/no-danger
  return <script id="consent-defaults" dangerouslySetInnerHTML={{ __html: consentScript }} />;
}

/** The GTM loader, after hydration so it does not compete with first paint. */
export function GoogleTagManager() {
  if (!analyticsEnabled() || !GTM_ID) return null;
  return (
    <>
      <Script id="gtm" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: gtmScript(GTM_ID) }} />
      <noscript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
          height="0"
          width="0"
          style={{ display: 'none', visibility: 'hidden' }}
          title="Google Tag Manager"
        />
      </noscript>
    </>
  );
}
