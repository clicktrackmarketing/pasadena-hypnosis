# Pre-launch review: Jason Meissner, 2026-10-19

Heeba's summary of Jason's review was posted on the Asana task "Implement
Client Edits" on 2026-10-19. Applied 2026-10-20 on branch
`markups/prelaunch-review`.

**Verify:** `node scripts/audit-markups.mjs http://localhost:3000`. The script
now bans the guaranteed-result phrases, the expired certificate and "Our
Team" on every route, and checks each item below.

| # | Jason's point | Done |
| --- | --- | --- |
| 1 | Will the Wix booking/calendar URLs keep working when the new site takes over the domain? | **Verified: not as-is.** The calendars load from `www.pasadenahypnosis.com`, which stops serving Wix once DNS moves. Fixed in code: the Wix address is now a setting (`NEXT_PUBLIC_WIX_SITE`), old Wix booking/members URLs forward to it, and old Wix service pages, `/about-us` and `/quitsmoking` redirect to their new pages (`next.config.mjs`). **Still needs Jason's Wix and DNS access** to put Wix on `book.pasadenahypnosis.com`. Steps: `docs/launch-booking.md` |
| 2 | Remove the union certificate "Valid to March 2017" | Removed from `CREDENTIALS` (home ticker, Meet Jason documents and timeline, schema). The image stays in `assets.ts` in case he sends a current card |
| 3 | Remove/soften "relief after every session", "nonsmoker forever" | Softened everywhere: chronic pain, IBS, stress summary, step 3, smoking summary/answer/close, "lifelong trigger", "It works.", "The last money you'll ever spend", "100% effective online" (now "works just as well online"), "immediate results" (sports), and one planned blog title. Real client reviews are quoted unchanged |
| 4 | Depression page needs substance on what happens in a session | New "What happens in a session" section, four steps, drawn from his own post "Depression and Hypnotherapy" and linking to it (`SERVICES[…].session`, `SessionDetail`). Swap in his own text if he sends more |
| 5 | Homepage too long and repetitive | 13 sections → 7: hero, services, how it works, Meet Jason, reviews, FAQ, CTA. Cut: Specialties (repeated the services), Gallery, breathing exercise, quote band, "why people come" (illustrative photos, repeated the reviews), service-area strip. Files kept, unused |
| 6 | Opening reads like a business listing; switches I / he / we | Hero paragraph is now his first person ("I'm Jason Meissner…"); Meet Jason bio, steps, CTA and section titles follow. "We" only means Jason and the client. FAQ answers stay third person (they are the FAQ schema) |
| 7 | Office gallery: one real photo, no illustrative images or disclaimers | Gallery and its disclaimer are gone from the homepage; the one real office photo is in Meet Jason. "Photographs are illustrative" no longer appears |
| 8 | Remove noindex,nofollow at launch | No page sets its own robots; the site-wide noindex and robots.txt now lift automatically on the pasadenahypnosis.com production deployment (`components/indexing.ts`). Preview stays noindex |
| 9 | Duplicate button labels and counter values exposed to screen readers | Hover-roll labels and counting numbers now draw their animated copy with CSS, so each label and number exists once in the page. The hero's rating also existed twice (a desktop span and a phone chip); it is one element now |
| 10 | "Our Team" → "Meet Jason" | Page moved to `/meet-jason` (title, eyebrow, menu, footer, links, sitemap); `/our-team` redirects permanently |
| 11 | Verify address, hours, review count | Checked 2026-10-20 against his Google Business Profile and pasadenahypnosis.com. Address 1910 Huntington Dr, South Pasadena, CA 91030 and phone match. Hours match Google exactly (Mon–Fri and Sun 10 AM–9 PM, Sat 10:30 AM–9 PM). **Reviews: 13 now, was 12**, updated. Note: Yelp lists different hours (9–9 weekdays, 10–3 weekends) and a Pasadena 91101 address; worth Jason correcting there |
| 12 | Pricing shouldn't suggest everything is $200 | Home hero chip "$200 / session · $400 quit smoking"; services hub adds "Quit smoking $400"; /book "$200 per session, $400 quit smoking". Pricing, FAQ and the smoking page already showed $400 |

## Also fixed while checking

- Phones could scroll sideways a few pixels on pages whose section heading
  has a link beside it (e.g. "View all services"): the link's slide-in
  started past the screen edge. Clipped in `SectionHeading`.

## Questions for Jason

- Wix login (to connect `book.pasadenahypnosis.com`) and easyDNS login (the
  domain's DNS is at easyDNS, checked 2026-10-20).
- A current union card, if he wants that credential back.
- More depression-page text, if he'd like his own wording over the version
  drawn from his blog post.
- Yelp listing hours and address differ from Google.
