/* ---------------------------------------------------------------------------
   Redirects that keep the old site's URLs working when pasadenahypnosis.com
   moves from Wix to this site (client review 2026-10-19: "confirm the
   existing Wix booking/calendar URLs will continue working").

   Old URLs come from the live Wix sitemaps, read 2026-10-20
   (pages-sitemap.xml, booking-services-sitemap.xml). Three kinds:

   1. Pages this site replaces: permanent redirects to the new page, always on.
   2. Wix booking and members pages (calendar, booking form, check-out,
      memberships, groups, webinars…): Wix keeps running them, so they forward
      to the Wix site's new address, NEXT_PUBLIC_WIX_SITE (the same variable
      components/WixCalendar.tsx reads). Only active once that variable points
      somewhere other than www.pasadenahypnosis.com; until then those paths
      are still served by Wix itself and a redirect here would loop.
   3. "Our Team" renamed to "Meet Jason".

   Full launch steps: docs/launch-booking.md.
--------------------------------------------------------------------------- */

const MAIN_HOSTS = new Set(['pasadenahypnosis.com', 'www.pasadenahypnosis.com']);

const wixSite = (process.env.NEXT_PUBLIC_WIX_SITE || '').replace(/\/$/, '');
const wixMoved = (() => {
  try {
    return wixSite !== '' && !MAIN_HOSTS.has(new URL(wixSite).hostname);
  } catch {
    return false;
  }
})();

/* Wix service-page slug -> this site's /services slug. */
const SERVICE_PAGES = {
  'chronic-pain': 'chronic-pain',
  'childhood-stress-anxiety-1': 'childhood-stress-anxiety',
  'discovery-call': 'discovery-call',
  'smoking-cessation': 'smoking-cessation',
  'hypnotherapy-sessions': 'hypnotherapy-sessions',
  ibs: 'ibs',
  'sports-performance-1': 'sports-performance',
  'testing-and-academic-performance': 'testing-and-academic-performance',
  'online-hypnotherapy': 'online-hypnotherapy',
  'stress-and-anxiety': 'stress-and-anxiety',
};

/* Paths Wix still owns after the move. Each forwards with its sub-path. */
const WIX_PATHS = [
  '/booking-calendar',
  '/booking-form',
  '/booking-checkout',
  '/book-online',
  '/bookings-checkout',
  '/members',
  '/memberships',
  '/groups',
  '/group',
  '/meditation-challenges',
  '/online-programs',
  '/challenge-page',
  '/webinar-registration',
  '/webinar-registration-1',
  '/account',
  '/pricing-plans',
  '/plans-pricing',
];

/** @type {import('next').NextConfig} */
export default {
  async redirects() {
    const pages = [
      { source: '/our-team', destination: '/meet-jason', permanent: true },
      { source: '/about-us', destination: '/about', permanent: true },
      { source: '/quitsmoking', destination: '/services/smoking-cessation', permanent: true },
      { source: '/inquiry-services-page', destination: '/contact', permanent: true },
      { source: '/general-9', destination: '/', permanent: true },
      // Wix "Services" page, linked from the old homepage (launch audit 2026-10-20).
      { source: '/schedule', destination: '/services', permanent: true },
      { source: '/blog-feed.xml', destination: '/blog', permanent: true },
      { source: '/service-page/past-life-regression', destination: '/services', permanent: true },
      ...Object.entries(SERVICE_PAGES).map(([wix, ours]) => ({
        source: `/service-page/${wix}`,
        destination: `/services/${ours}`,
        permanent: true,
      })),
    ];
    const wix = wixMoved
      ? WIX_PATHS.flatMap((p) => [
          { source: p, destination: `${wixSite}${p}`, permanent: false },
          { source: `${p}/:rest*`, destination: `${wixSite}${p}/:rest*`, permanent: false },
        ])
      : [];
    return [...pages, ...wix];
  },
};
