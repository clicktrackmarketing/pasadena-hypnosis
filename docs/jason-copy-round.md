# Jason's copy and review links: 2026-10-20

Heeba posted Jason's new copy and questions on the Asana task "Implement
Client Edits" on 2026-10-20. Applied 2026-10-21 on branch
`markups/jason-copy-round`, which starts from `launch/checklist-fixes` (PR #12).

**Verify:** `node scripts/audit-markups.mjs http://localhost:3000`. It now
checks the new opening, the new Depression page text and both review links.

| # | Request | Done |
| --- | --- | --- |
| 1 | New homepage opening ("A qualified hypnotherapist is a mechanic of stillness…") | Replaces the hero paragraph, verbatim, as three paragraphs (`HOME_ANSWER`). Only change: one doubled space removed |
| 2 | Google review count 12 → 13 | Already 13 since 2026-10-20 (`RATING`). Rechecked: no "12" shows anywhere |
| 3 | Should the review count link to Google? | **Yes, done.** Hero rating, homepage reviews pill, footer pill and the About reviews section link to his Google Business Profile ("Pasadena Hypnosis LLC", 1910 Huntington Dr) by its permanent CID link (`REVIEW_LINKS.google`). Opens in a new tab |
| 4 | Yelp: include or link? | **Link it, don't show it.** Done: footer and About now say "Also reviewed on Yelp" with a link. Not added: Yelp's 4.8 from 5 reviews, a Yelp badge or Yelp in schema. Google is the stronger signal (5.0 from 13), and showing two different ratings makes the page weaker. **Jason should fix his Yelp listing first:** it shows a Pasadena 91101 address, different hours and "accepts insurance". There is also a second, unclaimed listing at 1151 El Centro St that he should ask Yelp to close or merge |
| 5 | YouTube: embed, link, or leave out? | Recommendation below, and done to match: "What Is A Hypnotherapy Session Like" on /services/hypnotherapy-sessions, "How Hypnosis and Hypnotherapy Work" on /faq (`VIDEOS`, `components/VideoBand.tsx`). Click to load from youtube-nocookie.com; privacy policy sections 5 and 7 now mention YouTube. The 41-minute full session is not used. To move or remove one, edit those two pages |
| 6 | Depression page: full new copy | His text, verbatim, replaces the old section *and* the four-step "What happens in a session" cards. The steps were pieced together from his blog post, and his new text now says what happens in a session itself, so keeping them would repeat it. Heading: "Depression and Hypnotherapy". The link to his blog post stays |
| 7 | Keep the "complement care from your doctor, therapist, or psychiatrist" section | Kept, set apart under the text with a rule beside it (`detail.note`) |
| 8 | Consistent formatting, desktop and mobile | Checked at 375px and desktop: same type and spacing as the other service pages, no sideways scroll |
| 9 | Flag wording for compliance review | See below |

## YouTube recommendation

All three videos are on his channel "Pasadena Hypnotherapy" (@pasadenahypnotherapy9530).

| Video | Length | Recommendation |
| --- | --- | --- |
| [What Is A Hypnotherapy Session Like](https://youtu.be/lJWolYhjvjc) (2018) | 1:42 | **Embed.** Best fit: the Hypnotherapy Sessions page or /book. It answers the main question people have before they book, and is short |
| [How Hypnosis and Hypnotherapy Work](https://youtu.be/BXJTPGCOmGA) (2018) | 2:21 | **Embed** on the FAQ page or the services hub, next to "How does hypnotherapy work?" |
| [Full First Session Hypnotherapy](https://youtu.be/1vzm7dFDBsc) (2022) | 40:52 | **Don't embed, and don't link from service pages.** This is the one that gives too much away: its own description says to start with it and repeat it many times, so for some visitors it replaces booking. If he wants it on the site, link it from the blog as a self-hypnosis practice for between sessions, which matches what he writes on the Depression page |

On Jason's question: the two short explainers don't give too much away.
They explain hypnotherapy without doing it, which builds trust and makes
booking easier. The 41-minute full session is different, for the reason
above.

The embeds use `youtube-nocookie.com` and load the player only when someone
presses play. That keeps the pages fast, and keeps the privacy policy
accurate (the site still sets no cookies of its own).

## Wording to review before publishing

1. **"Certified Clinical Hypnotherapist"** (new opening). Everywhere else the
   site says "Certified Hypnotherapist" (hero card, Meet Jason, schema, FAQ).
   The title is backed by his HMI "Diploma in Clinical Hypnotherapy", so it
   is accurate. **Done:** his title now reads "Certified Clinical
   Hypnotherapist" wherever it is used as a title (hero card, Meet Jason
   heading, page title and photo caption, Person schema `jobTitle`).
   Sentences like "Jason Meissner is a certified hypnotherapist" (the footer
   disclaimer he wrote, the FAQ, the legal pages) describe his profession
   and stay as they are.
2. **"I specialize in … depression and bipolar disorder … IBS, fibromyalgia"**
   (new opening). This names psychiatric and medical conditions as
   specialties. The Depression page's "alongside your doctor, therapist, or
   psychiatrist" note and the footer disclaimer help, but the homepage line
   has neither next to it. Worth a quick legal/compliance check. A softer
   option, if needed: "I work with people living with …".
3. **"including prescribed medication"** (Depression page). Fine as written:
   it supports staying on medication. Never edit it toward anything about
   changing or stopping medication.
4. **"You are already whole and complete"** and **"The suffering is real. It
   does not define the whole of you."** Supportive, no promise of a result.
   No change needed.
5. Yelp says the practice **accepts insurance**. If that isn't true, it should
   come off Yelp.

## Still open (needs someone other than us)

- **Yelp listing (Jason):** fix the address, hours and "accepts insurance"
  on the claimed listing, and ask Yelp to close the unclaimed El Centro St one.
- **Homepage specialties line (compliance):** item 2 above. Left word for
  word, since it is Jason's own copy.
- **Wix bookings (Jason's Wix and easyDNS logins):** move Wix to
  `book.pasadenahypnosis.com` before the domain switches, or the booking
  calendars break. Steps: `docs/launch-booking.md`.
- **Release:** this branch sits on `launch/checklist-fixes` (PR #12). Merge
  #12 first, then this branch.
