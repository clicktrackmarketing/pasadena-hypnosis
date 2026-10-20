# Launch: keeping Jason's Wix bookings working

Written 2026-10-20 to answer Jason's pre-launch question (Asana, 2026-10-19):
will the existing Wix booking/calendar URLs keep working when the new site
replaces the current one on the same domain?

## Short answer

**Not if the domain is simply switched.** Every booking calendar on the new
site is Jason's real Wix Bookings calendar, loaded from
`https://www.pasadenahypnosis.com/booking-calendar/<service>`. That address
belongs to the Wix site today. Once `pasadenahypnosis.com` points at the new
site, Wix no longer answers there, and the calendars, booking form and
payment step would all go blank.

**They keep working if the Wix site moves to a subdomain first.** Wix keeps
running bookings, payments, confirmations and his client list exactly as
today; only its address changes, e.g. `book.pasadenahypnosis.com`. The new
site loads the calendars from there, and old links forward to it.

## What is already done in this repo

- The calendar address is a setting, `NEXT_PUBLIC_WIX_SITE`
  (`components/WixCalendar.tsx`). Default: today's
  `https://www.pasadenahypnosis.com`.
- Old URLs redirect (`next.config.mjs`):
  - Wix service pages `/service-page/<slug>` go to the matching
    `/services/<slug>` page, which has that service's calendar on it.
  - `/about-us` → `/about`, `/quitsmoking` → `/services/smoking-cessation`,
    `/inquiry-services-page` → `/contact`.
  - Wix-only paths (`/booking-calendar/…`, `/booking-form/…`, checkout,
    `/members`, `/memberships`, `/groups`, `/meditation-challenges`,
    webinars) forward to the Wix subdomain, with the rest of the path kept.
    This switches on automatically once `NEXT_PUBLIC_WIX_SITE` is set to a
    non-`pasadenahypnosis.com` host, so it cannot loop before the move.
- Search indexing turns on by itself on the live domain
  (`components/indexing.ts`).

## Where the domain lives (checked 2026-10-20)

- Nameservers: **easyDNS** (`dns1.easydns.com`, `dns2.easydns.net`,
  `dns3.easydns.org`). DNS changes are made in Jason's easyDNS account,
  not in Wix.
- `www.pasadenahypnosis.com` is a CNAME to Wix (`cdn1.wixdns.net`).

So the access needed is: Jason's **Wix** login (to connect the subdomain)
and his **easyDNS** login (to add the subdomain record and later point the
main domain at Vercel).

## Launch order (needs access to Jason's Wix account and his DNS)

1. **Wix: connect a subdomain.** In Wix, Settings → Domains, connect
   `book.pasadenahypnosis.com` to the Wix site, choosing the "connect via
   pointing" option since DNS stays at easyDNS. Add the record Wix shows
   (usually a CNAME for `book`) in easyDNS. Confirm
   `https://book.pasadenahypnosis.com/booking-calendar/discovery-call` loads.
   Make it the Wix site's primary domain so Wix emails and confirmations use
   it.
2. **Vercel: set the variable.** On the `pasadena-hypnosis` project, add
   `NEXT_PUBLIC_WIX_SITE=https://book.pasadenahypnosis.com` for Production and
   redeploy.
3. **Check the preview** (`pasadena-hypnosis.vercel.app`): `/book` and every
   `/services/<slug>` calendar loads, a test booking reaches the payment step,
   and `/booking-calendar/discovery-call` redirects to the subdomain.
4. **Point the main domain at Vercel.** Add `pasadenahypnosis.com` and
   `www.pasadenahypnosis.com` to the Vercel project and update the records
   in easyDNS as Vercel instructs (the `www` CNAME moves from Wix to Vercel;
   the `book` CNAME stays on Wix). Redeploy once attached, so the indexing switch sees the domain.
5. **After DNS settles:** open an old Wix link
   (`www.pasadenahypnosis.com/booking-calendar/smoking-cessation`) and confirm
   it lands on the Wix subdomain calendar; view source on the homepage and
   confirm there is no `noindex`; `robots.txt` allows crawling and lists the
   sitemap.
6. If the calendars' header or footer shows inside the frame after the move,
   re-measure with `scripts/measure-wix-calendar.cjs` (see the note in
   `components/WixCalendar.tsx`).

Wix's own booking emails, reminders and any links inside past confirmation
emails keep working: those that use the old domain are forwarded by step 5's
redirects; new ones use the subdomain.
