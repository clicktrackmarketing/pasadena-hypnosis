# Markup round one — Jason Meissner, 101 comments

Board: the client's markup.io review board (link kept with ClickTrack, not in this public repo)
(reviewed against `pasadena-hypnosis.vercel.app`, all comments High priority).
Comments 1–6 are signed "Jason Meissner", 7–101 "Jason Customer" — the same
person, the practice owner. Applied locally 2026-10-01.

**Verify:** `node scripts/audit-markups.mjs http://localhost:3000` against a
running dev or production server. It fetches all 30 routes and checks (a) the
client's site-wide rules on every page, and (b) one assertion per comment on
the page it was pinned to. 100 of 101 comments are asserted; #82 waits on the
client. Run against the old deployment it fails 97 of them — the three that
pass there (#73, #80, #88) are "keep this" comments.

## Site-wide rules the client set (apply them to anything new)

| Rule | From |
| --- | --- |
| Never "diagnosed" | #2, #75, #98 |
| Never "disabling" | #3, #33 |
| Never "statewide" or "California" as a service range — he works online with clients anywhere | #7, #15, #21, #28, #33, #85 |
| Never compare him with other hypnotherapists or practices, or say what he is not | #1, #25, #26, #40, #54, #68, #75, #77 |
| Never "complementary" | #32, #55 |
| No "not" qualifier phrases | #4, #55, #77 |
| No "6-8 sessions" — "There is no set number of sessions" | #9, #23, #56, #60 |
| No HSA/FSA anywhere | #57, #61, #67 |
| "Specialisms" is not a word | #8, #69, #71 |
| No count of the services ("no one cares") | #64, #74 |
| No military time | #30 |
| No "gut-directed" — it is IBS and fibromyalgia | #5, #11, #35, #44 |
| Chronic Pain is "Chronic and Acute Pain" | #10, #33, #43 |
| Price not repeated on every tile | #22, #34, #36 |
| Copy from his own website, not commentary about the website | #3, #8, #17, #27, #53, #92 |
| Footer tagline, verbatim: "Certified hypnotherapy, let us know how we can help. I'm available online anywhere and locally in person." | #78 (also #54, #86, #89) |
| Footer disclaimer, verbatim: "Pasadena Hypnosis is a hypnotherapy practice, Jason Meissner is a certified hypnotherapist. Hypnotherapy is not a substitute for medical or psychiatric care." | #77 (also #32, #55, #87, #90) |
| The longer scope note lives on /our-team (TeamScope) and the one FAQ, nowhere else | #73, #80 |

## Every comment

`content.ts` = `components/content.ts`. "Fixed by content" means the text comes
from `SERVICES`, `FAQS`, `STEPS`, `REAL_COPY` and so changed everywhere it renders.

### Home (`/`)

| # | Pinned to | Comment (short) | Done |
| --- | --- | --- | --- |
| 1 | Specialties paragraph "The usual hypnotherapy menu…" | Take this out, I don't rag on other practices | Heading "Most hypnotherapists stop at phobias" and paragraph replaced with his homepage opening: "You, whole healthy and complete every day." + "The world and pressures around us…" |
| 2 | "Diagnosed depression & bipolar disorder" | Obsession with diagnosed | Label "Depression & bipolar disorder"; "diagnosed" removed site-wide |
| 3 | "Disabling anxiety / Not everyday nerves…" | Remove disabling and the text below; go back to my website | "Stress and anxiety" + his tagline "Getting your mind in order is a process we can take care of." |
| 4 | "Worked alongside ongoing medical care, never instead of it." | Take all dumb qualifiers out | His tagline "Yes, we can reduce the pain you are experiencing." Scope plate under the heading also replaced with his line |
| 5 | "For IBS and other gut-brain conditions." | No gut directed, I work with IBS | "IBS and fibromyalgia" |
| 6 | Smoking "The proven, high-close service." | I have an entire method and marketing | "Mr. Butts doesn't own you anymore!" — from his /quitsmoking page |
| 7 | Hero chip "…by video statewide" | Remove statewide and California everywhere | "in person or online anywhere"; swept site-wide |
| 8 | Rail lede "Fourteen services, ranked… specialisms…" | Don't tell them why they're ranked; delete all | Lede deleted; button "View all services" |
| 9 | Smoking card | No 6-8 sessions; price is $400 | Smoking price $400 (resolves the old $400/$500 question); summary from his method |
| 10 | Chronic Pain card | It's "Chronic and Acute Pain"; no qualifying | Renamed; summary rewritten |
| 11 | Gut-Directed card | Remove gut directed; IBS and fibromyalgia | Renamed "IBS & Fibromyalgia" (slug `ibs` kept, matches his live URL) |
| 12 | Grief card "…per the Call 2 brief" | PLEASE FIX | "Hypnotherapy for grief and loss — a place to find your peace again." |
| 13 | Group Hypnotherapy Program card | Not an offering, remove | Service removed site-wide; route now 404 |
| 14 | Hypnotherapy Sessions card | It is a 60 minute session | "A 60-minute hypnotherapy session, specifically designed for you." |
| 15 | Online card "…anywhere in California…" | Online with people anywhere; remove everything else | "Online hypnotherapy sessions with clients anywhere." |
| 16 | Discovery call card | Delete everything after the dash | Cut at the dash |
| 17 | Childhood card "a real page on the live site" | AI talking to itself | His words: "Kids respond quickly to hypnotherapy. Parents are of course welcome to observe and participate." |
| 18 | Testing card "…San Marino / Arcadia gap in the audit" | Pointless | His words: "Express your excellence and rise to the challenge…" |
| 19 | Past Life Regression card | Just remove Past life regression | Service removed site-wide; route now 404 |
| 20 | Gallery lede "Quiet, unclinical…" | Remove all of this | Lede removed; heading "Where the work happens"; tile badge "The office" |
| 21 | Step 02 "…anywhere in California" | I do online with clients anywhere | Step 02: "Online with clients anywhere, or in person at the office in South Pasadena." |
| 22 | Step 02 "$200, …" | Get rid of the cost or move it to the end | Cost removed from the step |
| 23 | Step 03 "six to eight sessions" | No set number of sessions | Step 03 "Relief, session by session": "There is no set number of sessions…" |
| 24 | Step 03 "you will know roughly…" | Get rid of this estimation | Removed |
| 25 | Practitioner bio "…cases many hypnotherapists decline" | No comments about other hypnotherapists | Bio rewritten (content) |
| 26 | Practitioner scope note | No references to what I am not | Removed from the section |
| 27 | Reviews lede | Overstated, end after first sentence | "Screenshots of the practice's own Google reviews."; heading "Real reviews from real clients." |
| 28 | "…or by video statewide." | Video with clients anywhere | "In the office in South Pasadena, or online anywhere."; online pill "Online — anywhere" |
| 29 | "room" | It is an office | "office" here and in the other "room" headings (gallery, about, office band) |
| 30 | Hours "21:00" | No military time | `HOURS` in 12-hour clock everywhere (schema keeps 24h, as schema.org requires) |
| 31 | Footer rating chip | There are also Yelp reviews, and others | "Also reviewed on Yelp and more." under the chip (no Yelp count/URL was given) |
| 32 | Footer disclaimer | No complimentary; drop the second sentence | Replaced by his #77 text |

### Services (`/services`)

| # | Pinned to | Comment (short) | Done |
| --- | --- | --- | --- |
| 33 | Hero lede | No disabling; add stress; Chronic and Acute Pain; no ragging; clients anywhere; no statewide | Lede rewritten; hero no longer counts services |
| 34 | Category panel row "Free Discovery Call" | Mistake; dollar amount over and over; forgot primary practices | Category-panel band removed; categories reorganised so the discovery call is not among the specialties and pain/IBS are; no price on tiles |
| 35 | Panel row "Gut-Directed Hypnotherapy" | Does not exist; IBS and fibromyalgia | Renamed |
| 36 | Panel row "Chronic Pain $200" | Cost isn't helping | Panel band (and its prices) removed; price pills removed from all service cards |
| 37, 38 | Panel category heading | Get rid of this (×2) | Category headings removed with the band. Replaced by his homepage block "In Office Hypnotherapy / Hypnotherapy Online at Your Convenience" |
| 39 | Panel note | I work with clients who live anywhere | Notes removed with the band |
| 40 | Depression card | No references to other hypnotherapists | Answer rewritten (content) |
| 41 | Stress card | Remove "not everyday nerves" | Answer rewritten (content) |
| 42 | Smoking card | Marketing published in my documents | Answer from his /quitsmoking copy |
| 43 | Chronic Pain card | Chronic and Acute Pain; no medical-care qualifiers | Renamed; answer rewritten |
| 44 | Gut-Directed card | Made up; IBS and fibromyalgia, everywhere | Renamed everywhere incl. blog topics, metadata |
| 45 | Grief card | Delete everything after the first sentence | Done (and "diagnosed" out of that sentence) |
| 46 | Group program title | Remove this | Removed |
| 47 | Online card | anywhere; delete everything after Meissner | "…online for clients anywhere, led by Jason Meissner." |
| 48 | Childhood card | Location junk; everything after my name | "…childhood stress and anxiety, led by Jason Meissner." |
| 49 | Testing card | Everything after Performance, or do far better | His own words added after "…testing and academic performance." |
| 50 | Sports card | Everything after performance | "Pasadena Hypnosis offers sports performance hypnosis." |
| 51 | Past Life Regression tile | Remove the offering | Removed |
| 52 | "You do not have to pick the right one first" band | Delete the whole section | Removed |
| 53 | CTA band body | Not inviting; "Call us with whatever you need help with." | Body is exactly his sentence |
| 54 | Footer tagline | Fix as directed | His #78 text |
| 55 | Footer disclaimer | No complimentary; no "not" phrases everywhere | His #77 text; site-wide sweep |

### Pricing (`/pricing`)

| # | Pinned to | Comment (short) | Done |
| --- | --- | --- | --- |
| 56 | Hero lede "six to eight sessions" | No 6-8 sessions anywhere | Lede: $200 sessions, $400 smoking, "All charges are the same in the office or online." |
| 57 | Fact "Self-pay · HSA/FSA" | You made this up | Fact replaced (Smoking cessation $400 / Format) |
| 58 | Smoking card "On your call" | Published at $400 | $400 |
| 59 | Smoking card points | Drop the 3rd phrase and all timing | Points: One-Session Quit Day / Support calls included / Back up office session; no "90-minute" |
| 60 | Standard card "Typically six to eight sessions" | Remove | Removed |
| 61 | Standard card "HSA/FSA cards accepted" | Remove site-wide | Removed everywhere, FAQ included |
| 62 | Standard card | Is there a marketing person there | Card copy from his homepage ("Hypnotherapy allows you to strengthen what you want in your life…") |
| 63 | Tier chip "Gut-Directed Hypnotherapy" | Get rid of this | Now "IBS & Fibromyalgia" |
| 64 | Tiers lede "All 14 services…" | No 14 services; what is this list | "The price of each service, in one place."; tier counts removed |
| 65 | Tier row Group program | Does not exist | Removed |
| 66 | Tier row "confirmed on your free discovery call" | Create marketing, e.g. "I'm ready to quit smoking" | Smoking tier reads "I'm ready to quit smoking" |
| 67 | "Self-pay, HSA/FSA-friendly" band | False, remove HSA/FSA everywhere | Payment band removed |

### Our Team (`/our-team`)

| # | Pinned to | Comment (short) | Done |
| --- | --- | --- | --- |
| 68 | Bio | No other hypnotherapists | Bio rewritten (content) |
| 69 | "Four specialisms…" heading | Not a word | "Four specialist certifications, then the diploma" |
| 70–72 | Timeline lede | Delete all of this text | Lede removed (and the closing note that explained the page) |
| 73 | TeamScope note | The one place this can remain; remove everywhere else | Kept here; removed from home, about, book, service pages, city pages, legal pages |
| 74 | "…there are 14 in total." | Remove the number everywhere | "The work Jason leads with."; every service count on the site removed |
| 75 | Depression card | No "diagnosed", no "decline" | Summary rewritten |
| 76 | Smoking card | Picture terrible, text bad | New photo (sunlit summit, like the mountain image on his /quitsmoking page) and his copy |
| 77 | Footer disclaimer | Change site-wide to his sentence; never mention these qualifications again | Footer + legal pages use his sentence verbatim |
| 78 | Footer tagline | Change site-wide to his sentence; delete "for the conditions other practices turn away" everywhere | H1 and footer use his sentence verbatim |

### FAQ (`/faq`)

| # | Pinned to | Comment (short) | Done |
| --- | --- | --- | --- |
| 79 | Side card heading | Replace with "Don't hesitate to call with any questions you might have." | Verbatim |
| 80 | "Is hypnotherapy a replacement…" answer | This is where this belongs; delete it from every other page | Kept here only (minus "complementary", #55); never in the 4 FAQs shown on other pages |
| 81 | "How many sessions" answer | Replace with his text | Verbatim (one typo fixed: "how many sessions") |
| 82 | Credentials answer | Several more HMI diplomas; he will provide them | **Waiting on the client** |
| 83 | Credentials answer | Delete the last sentence | Deleted |
| 84 | "…other hypnotherapists turn down?" | Delete this section completely | Deleted |
| 85 | Booking answer | Available anywhere; delete California site-wide | "…online for clients anywhere." |
| 86, 87 | Footer | Fix as described | His #78 / #77 text |

### Blog, Contact

| # | Pinned to | Comment | Done |
| --- | --- | --- | --- |
| 88 | Blog lede "Jason is writing these himself" | I accept the challenge | No change — he is writing the posts. Topic titles cleaned of the banned terms |
| 89, 90 | Contact footer | Fix as directed | His #78 / #77 text |
| 91 | "Several other practitioners work out of the same building…" | Get rid of this | Removed (and from the office line on /our-team and /about) |

### Service pages

| # | Pinned to | Comment (short) | Done |
| --- | --- | --- | --- |
| 92 | Smoking answer "high-close service" | AI talking to itself; read my website | Answer from his /quitsmoking page |
| 93 | Scope note card | Remove completely | Removed from every service page |
| 94 | Smoking summary | "I will write the smoke pages I guess. I thought I did…" | The page is now his /quitsmoking content: the opener, The Method, Two Ways to Win, the smoking client reviews, "I'm Ready to Quit" |
| 95, 96 | Generic steps ($200, 6-8 sessions) | All wrong | Smoking page shows Two Ways to Win instead of the generic steps |
| 97 | Office band lede | Insert "In person at 1910 Huntington Dr in South Pasadena, or by video anywhere." | Verbatim, on every service page |
| 98 | Related card (depression) | Remove diagnosed everywhere | Done |
| 99 | Stress answer | Repetition of junk; discuss stress and anxiety | Answer and a new section that discuss stress and anxiety, in his words |
| 100 | "What booking this actually involves" | Why is this here and not anxiety and stress | Each service page now has its own heading and paragraphs (`detail` in content.ts) |
| 101 | Scope note card | Delete this terrible junk | Removed |

## Judgment calls (worth confirming with the client)

- **Categories.** The header menu now groups services as Specialties /
  Sessions / Performance. The old groups put the discovery call among the
  "Featured" practices (#34). Childhood stress and anxiety sits in Specialties.
- **Smoking cessation $400** is the One-Session Quit Day. The Two-Session
  Package is described (his words) but has no published price.
- **Yelp (#31):** named, not linked or counted — no URL or figure was given.
- **#49 "or do FAR better":** the testing answer keeps his own lines after the
  first sentence. **#50** (sports) is cut exactly where he said.
- **Repetition:** after the edits, every page was checked for repeated
  sentences and six-word phrases; the client called repetition "junk" (#99).

## Still open with the client

- **#82** — more HMI diploma credentials he will send.
- Yelp profile URL, if he wants it linked.
- Two-Session Package price, if he wants it published.

## Not from this markup, noticed while verifying

With the visitor's "reduce motion" setting on, React reports a hydration
mismatch (minified error #418) on page load. The deployed site already does
this, so it predates this round; normal-motion browsers are error-free.
