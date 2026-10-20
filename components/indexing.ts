/* ---------------------------------------------------------------------------
   Whether search engines may index this deployment.

   Jason's pre-launch review (2026-10-19) flagged the noindex,nofollow on the
   pages (he spotted it on the smoking page) and asked that it be gone when
   the site goes live. It used to be hard-coded `index: false` in
   app/layout.tsx and a disallow-all robots.txt, which only a human remembering
   to edit two files would ever lift. Now both read this flag, which turns on
   by itself on the real domain:

     - a Vercel PRODUCTION deployment whose production domain is
       pasadenahypnosis.com (VERCEL_PROJECT_PRODUCTION_URL is the project's
       shortest production domain, so it switches over the moment the
       custom domain is attached and the project is redeployed), or
     - SITE_INDEXABLE=true, as a manual override.

   The *.vercel.app preview host, branch previews and local dev stay
   noindex,nofollow with robots.txt disallowing everything.

   Plain module, no 'use client': app/layout.tsx and app/robots.ts are server
   code and call this at build time.
--------------------------------------------------------------------------- */

const LIVE_DOMAIN = 'pasadenahypnosis.com';

export const isIndexable = (): boolean => {
  if (process.env.SITE_INDEXABLE === 'true') return true;
  if (process.env.SITE_INDEXABLE === 'false') return false;
  const prodHost = (process.env.VERCEL_PROJECT_PRODUCTION_URL ?? '').toLowerCase();
  return (
    process.env.VERCEL_ENV === 'production' &&
    (prodHost === LIVE_DOMAIN || prodHost.endsWith('.' + LIVE_DOMAIN))
  );
};
