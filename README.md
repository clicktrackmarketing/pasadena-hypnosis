# Pasadena Hypnosis — website

Next.js 15 / React 19 / Tailwind 4. Converted from the approved MagicPath
"C4 Brand Continuity" concept into real App Router routes per the CTM
site-build skill's route-conversion pattern — 27 real, indexable pages
(services index + 14 service detail pages, service-areas index + 5 city
pages, pricing, FAQ, our-team, about, book, blog, contact, and 3 legal
placeholder pages), not a single-page fake-multi-page demo.

- **Live:** https://pasadena-hypnosis.vercel.app (currently `noindex,nofollow`
  — a human promotes this once the client and CTM sign off on launch)
- **Content/design source of truth:** `clients/pasadena-hypnosis/profile.ts`
  in the `magicpath/pipeline` repo. `components/content.ts` and
  `components/assets.ts` here are a synced snapshot of that data, not a live
  import — re-sync by hand if `profile.ts` changes (see that file's own
  header comment for the Call 2 Content & Services Brief context).
- **Known open items, do not "fix" by inventing content:**
  - Smoking-cessation price is intentionally unpublished (`SERVICES` entry
    has `price: null`) — the site's $400 and Jason's verbal $500 are still
    unreconciled.
  - Group Hypnotherapy Program pricing/cadence/booking model: unconfirmed.
  - `/privacy`, `/terms`, `/editorial-policy` render a visible "not final
    legal text" placeholder — owner is Jason's own counsel.
  - `/blog` lists real planned topic titles from the Call 2 brief as
    "coming soon" cards — no fabricated posts, dates, or authors.
  - The booking form (`components/BookingForm.tsx`, used on `/book` and
    `/contact`) is UI only, wired to nothing — `compliance.sensitiveDataEndpoint`
    is unset in `profile.ts` until a BAA/DPA-covered endpoint is chosen. Do
    not wire it to Formspree, a generic webhook, or an email relay.
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
