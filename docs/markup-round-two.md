# Markup round two — Jason Meissner, comments #102–#113

Same board as round one, reviewed against `pasadena-hypnosis.vercel.app`.
Fourteen comments were open by 2026-10-09: the twelve new ones below, plus #82 and
#88 carried over from round one. Applied 2026-10-07 to 2026-10-09.

**Verify:** `node scripts/audit-markups.mjs http://localhost:3000`. It now
asserts 110 of 113 comments; #82, #102 and #110 are still open.

The site-wide rules from `docs/markup-round-one.md` still apply to everything
below, and every new line was checked against them.

## Every comment

| # | Page | Pinned to | Comment (short) | Done |
| --- | --- | --- | --- | --- |
| 102 | `/services/smoking-cessation` | "Mr. Butts Doesn't Own You Anymore!" | Use the Mr. Butts image if we refer to him, otherwise don't refer to him. Reply: "I paid for Mr. Butts so it is mine. But only use it if you think it is wise." Three images attached (IMG_1829.PNG, IMG_3363.JPG, IMG_3364.JPG) | **Waiting on a decision** — see below |
| 103 | `/services/smoking-cessation` | "Two Ways to Win" cards | His rewrite: "Quitting your way", Option 1 / Option 2, the back-up session line. "Feel free to edit." | Section is now "Quitting your way"; both cards and the back-up line are his text with typos fixed (`REAL_COPY.quitSmoking`). "No price change" means the Two-Session Package is also $400 |
| 104 | `/services/chronic-pain` | "…comfort you can keep." | ", created by you during the hypnotherapy session." | Appended verbatim |
| 105 | `/blog` | IBS & fibromyalgia card photo (hands on stomach) | Different picture; those are pain-related illnesses | Replaced site-wide (see #109) |
| 106 | `/services/sports-performance` | Hero heading | "If you are putting in the effort. All that is left is the mental game…" | Added as the hero lede (new optional `heroLede` on `Service`); one full stop made a comma |
| 107 | `/services/sports-performance` | Photo-band answer "Pasadena Hypnosis offers sports performance hypnosis." | Needs text he can provide | Second sentence added from his own words in #111: "…has helped high school, college and pro athletes manage the demands of competition and life while finding their best." Swap in his text if he sends more |
| 108 | `/` | "What can you book" sideways rail | Scrolling is strange on a laptop; arrows, or better, a full grid | Full grid: 1 / 2 / 3 columns. No scroll hijacking, nothing hidden off-screen |
| 109 | `/` | IBS & fibromyalgia card photo | Remove this photo in place of anything else | `SERVICE_IMAGE_BY_SLUG.ibs` is now a calm one-to-one session photo (Vitaly Gariev / Unsplash, `svc-session-armchairs.jpg`, 1100px); fixes home, blog, the IBS page and every related card at once |
| 110 | `/services` | Hero "Standard session $200" | His current site's booking also takes payment and sends it to his account | **Waiting on a decision** — see below |
| 111 | `/services` | Hero lede listing conditions | Missing the upbeat services (BAR exam and other test prep; high school, college and pro athletes); "bullet points without bullets" | Lede rewritten as two paragraphs of sentences, keeping his naming (#33) and adding test prep and athletes in his words |
| 112 | `/contact` | Contact section | "We need an embedded map or google map I'm told." | Live Google map of 1910 Huntington Dr (keyless embed, `NAP.mapEmbed`) in the office block, under the address and Get directions |
| 113 | `/` | Home H1 | H1 should include the city, e.g. "Your Best Choice for Certified Hypnotherapy in Pasadena, Ca"; better wording welcome | H1 is now "Your Best Choice for Certified Hypnotherapy in Pasadena, CA" (his wording), with "I’m available online anywhere and locally in person." under it. The #78 tagline stays in the footer (`H1_TITLE` and `TAGLINE` are now separate) |

## Carried over

- **#82** — more HMI diploma credentials. Still waiting on him to send them.
- **#88** — "I accept the challenge" on the blog lede. His reply: "Yes I would
  like to write these. I will get through a couple this weekend." No change;
  waiting on his posts.

## Decisions needed before these can close

- **#102, Mr. Butts.** Either add his Mr. Butts artwork beside the headline on
  the smoking page (and the home Specialties note), or remove both "Mr. Butts"
  lines. He leaves the call to us. The three attachments live on the markup
  thread; they have not been downloaded into the repo.
- **#110, booking with payment.** His live site is Wix; its booking pages
  (`/booking-calendar/<service>`) take payment through Wix. On this site,
  `BookingForm` is still UI only (see README). Options: point the Book buttons
  at the Wix booking pages (only works while the Wix site stays up, e.g. moved
  to a booking subdomain), or set up a scheduler with payments (Square,
  Acuity, Calendly + Stripe) on his account. Either way it needs his accounts.

## Not from the markup

- `/blog` "Does hypnosis really work to quit smoking?" card: a smoking-related
  photo (a flower offered beside a cigarette pack, `BLOG_QUIT_SMOKING`) in
  place of the summit, on ClickTrack's request. The smoking service page and
  home card keep the summit Jason approved in #76.
