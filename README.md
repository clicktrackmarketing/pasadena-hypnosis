# Pasadena Hypnosis — website

Next.js 15 / React 19 / Tailwind 4. Converted from the approved MagicPath
"C4 Brand Continuity" concept into real App Router routes per the CTM
site-build skill's route-conversion pattern — 25 real, indexable pages
(services index + 12 service detail pages, service-areas index + 5 city
pages, pricing, FAQ, our-team, about, book, blog, contact, and 3 legal
placeholder pages), not a single-page fake-multi-page demo.

- **Live:** https://pasadena-hypnosis.vercel.app (`noindex,nofollow` and a
  disallow-all robots.txt). Indexing switches on by itself on a production
  deployment served from pasadenahypnosis.com (`components/indexing.ts`);
  `SITE_INDEXABLE=true|false` overrides it.
- **Content/design source of truth:** `clients/pasadena-hypnosis/profile.ts`
  in the `magicpath/pipeline` repo. `components/content.ts` and
  `components/assets.ts` here are a synced snapshot of that data, not a live
  import — re-sync by hand if `profile.ts` changes (see that file's own
  header comment for the Call 2 Content & Services Brief context).
- **Client markup round one (2026-10-01, 101 comments) overrides older
  notes.** Read `docs/markup-round-one.md` before editing copy: it lists the
  client's site-wide rules (no "diagnosed", no "California"/"statewide", no
  comparisons with other practitioners, no session counts, no HSA/FSA, …).
  Check with `node scripts/audit-markups.mjs http://localhost:3000`.
- **Pre-launch review (2026-10-19) overrides both markup rounds where they
  differ.** Read `docs/prelaunch-review.md`: shorter homepage in Jason's
  first person, no guaranteed-result wording, no expired union certificate,
  "Our Team" is now "Meet Jason" at `/meet-jason`.
- **Known open items, do not "fix" by inventing content:**
  - Smoking cessation is $400 — the client settled the old $400/$500
    question in markup #9/#58. The Two-Session Package has no published price.
  - Group Hypnotherapy Program and Past Life Regression were removed on the
    client's instruction ("not an offering", markup #13/#19/#51).
  - The Hypnotherapists Union certificate ("Valid to March 2017") is off the
    site until a current one replaces it; the image is still in assets.ts.
  - `/privacy`, `/terms`, `/editorial-policy` carry real text since
    2026-10-20 (`components/LegalDocument.tsx`), written to match what the
    site actually does: no site forms, cookies or analytics; Wix Bookings for
    booking and payment; a Google Maps embed; Vercel hosting. **When tracking
    or a site form is added, update the privacy policy in the same change.**
    Signed off by Click Track Marketing (Bilal) 2026-10-23, including the analytics wording added that
    day; not sent to Jason or counsel. Re-check after any change.
  - `/llms.txt` is generated from `components/content.ts`
    (`app/llms.txt/route.ts`), so it stays in step with services and pages.
  - Share card: `public/og-default.jpg`, rebuilt by
    `node scripts/make-og-image.mjs`. Page metadata goes through
    `components/seo.ts` `pageMeta()`.
  - `/blog` lists real planned topic titles from the Call 2 brief as
    "coming soon" cards — no fabricated posts, dates, or authors.
  - Booking is Jason's live Wix Bookings calendars, framed
    (`components/WixCalendar.tsx`): the Discovery Call on `/book` and
    `/contact`, and each service's own calendar on its `/services/<slug>`
    page (map in `components/BookingCalendarBand.tsx`). He is keeping Wix
    for bookings and payment. **The calendars load from
    `https://www.pasadenahypnosis.com`, so before that domain is pointed at
    this site, connect the Wix site to a subdomain (e.g.
    `book.pasadenahypnosis.com`) and set `NEXT_PUBLIC_WIX_SITE` to it.**
    Step by step, including the old-URL redirects: `docs/launch-booking.md`.
  - Consent-gated material from the Call 2 brief (the knee-surgery case
    study, AscendantLens.com, Jason's personal story) is used nowhere on
    this site — none of it has his permission yet.

## Commands

```
npm install
npm run dev     # http://localhost:3000
npm run build
```

## Deploy

Push to `main` — the Vercel project (`click-track-marketing/pasadena-hypnosis`)
is git-linked and deploys automatically. Always verify the resulting
deployment reaches `READY` with a resolved `githubCommitAuthorLogin` (commit
as `clicktrackmarketing@users.noreply.github.com`, not any other author —
Vercel blocks deploys whose commit author it can't resolve to a team member).
