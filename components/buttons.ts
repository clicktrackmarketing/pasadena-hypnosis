/* ---------------------------------------------------------------------------
   Hero button treatments — PLAIN MODULE, deliberately no 'use client'.

   These used to be exported from PageHero.tsx, which is a Client Component
   module. A Server Component (every route's page.tsx) that imports a
   non-component value from a 'use client' module does not get the value: it
   gets a client-reference stub. Passed into a client component it happens to
   resolve in the browser; used directly on a server-rendered <a> it renders
   the stub's source ("function(){throw Error("Attempted to call
   heroGhostBtn() from the server...") as the class attribute — which is how
   the service-areas, city, contact and book heroes lost their button styling
   in the production build. Same trap as priceLabel / price.ts.

   The inverted-on-dark rule these encode: inside the dark band the primary
   button is a light fill with dark text, and both take the light focus ring.
--------------------------------------------------------------------------- */

export const heroPrimaryBtn =
  'group inline-flex items-center gap-2.5 rounded-[14px] bg-white px-6 py-3.5 text-[15px] font-semibold text-[#2E2F3D] shadow-[0_10px_30px_-12px_rgba(0,0,0,0.6)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#E6EFFF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A9C4EE] focus-visible:ring-offset-2 focus-visible:ring-offset-[#2E2F3D]';

export const heroGhostBtn =
  'group inline-flex items-center gap-2.5 rounded-[14px] border border-white/35 px-6 py-3.5 text-[15px] font-medium text-white transition-colors duration-300 hover:border-white hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A9C4EE] focus-visible:ring-offset-2 focus-visible:ring-offset-[#2E2F3D]';
