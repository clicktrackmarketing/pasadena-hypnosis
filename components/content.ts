/**
 * Ground truth for the C4 concept frame — REAL-SITE ALIGNED 2026-09-09,
 * CALL 2 BRIEF SYNCED 2026-09-10.
 *
 * NOT 'use client' in this repo (unlike the MagicPath concept's copy) — this
 * is pure data/functions with no hooks or browser APIs, and it's imported by
 * Server Components (app/layout.tsx calls buildJsonLd() directly) as well as
 * client ones. Keep it that way; a stray 'use client' here breaks every
 * server-rendered route that reads structured data from this file.
 *
 * Every string here is sourced from clients/pasadena-hypnosis/profile.ts,
 * intake.ts, the rendered Step-8 design prompt, or a direct fetch of the
 * live www.pasadenahypnosis.com pages. Nothing is invented.
 *
 * WHAT CHANGED 2026-09-10 (Call 2 Content & Services Brief, see profile.ts
 * header and intake.ts addendum for the full rationale):
 *   - SERVICES reordered to Jason's own ranked priority and grown from 11 to
 *     14 — 3 new entries (depression-bipolar-support, grief-and-loss,
 *     group-hypnotherapy-program) that did not exist as pages before today.
 *     `ibs` keeps its slug but now displays as "Gut-Directed Hypnotherapy."
 *   - Smoking-cessation `price` is now `null` (was `400`) — the brief itself
 *     still lists $400-vs-$500 as unresolved even after Call 2, so this
 *     concept stops asserting either figure. `priceLabel()` already renders
 *     `null` as nothing; the qualifier text points to the discovery call.
 *   - FAQS: cost answer re-hedged to match; added the insurance/HSA FAQ.
 *   - SERVICE_AREAS trimmed from 9 audit-radius cities to the 5 the brief
 *     actually confirms (Pasadena, South Pasadena, Glendale, Eagle Rock,
 *     Arcadia) — matches the `serviceAreas` trim in profile.ts.
 *   - HOME_ANSWER reordered to lead with depression/bipolar/anxiety.
 *
 * This file exists so that content which MUST match cannot drift:
 *   - the FAQ accordion and the FAQPage JSON-LD render from ONE array
 *   - NAP renders four times (header, Where, footer, MedicalOrganization)
 *     from ONE object
 *   - SERVICES drives the nav dropdown, the index, the footer AND the
 *     OfferCatalog, so schema cannot describe a service the page hides
 * Checklist section 3 and 6 forbid hidden or phantom schema in either direction.
 *
 * WHAT CHANGED 2026-09-09 (see creative/c4/08-real-site-alignment.md):
 *   - SERVICES replaces CONDITIONS. The old array carried four invented
 *     condition pages (anxiety / depression / addiction / grief-loss) that
 *     were Tier-1 audit RECOMMENDATIONS, never real pages. These eleven are
 *     the practice's actual live booking services, slugs and all, taken
 *     verbatim from profile.ts's catalog.
 *   - Smoking cessation now carries a real number. $400 is site-verified from
 *     the live booking widget, which labels it "1 Quit Smoking Power Session,
 *     90 minutes" — a SINGLE session, not a package. The Two-Session Package
 *     is offered on /quitsmoking but carries no published price. Jason's
 *     verbal "$500" on Call 1 may refer to that package; both can be true.
 *   - REAL_COPY holds sentences lifted verbatim from the live site so the
 *     rebuild speaks in Jason's own voice rather than a paraphrase of it.
 *
 * WHAT CHANGED 2026-09-09, SECOND PASS (see creative/c4/09-real-assets-embedded.md):
 *   - CREDENTIALS is new. Five real documents were found sitting unlinked in
 *     the live site's media library — an HMI diploma and four AHA specialist
 *     certificates. Every field is transcribed off the artwork the page shows
 *     beside it, and the same array builds the `hasCredential` schema nodes.
 *   - REVIEW_SHOTS is new: six real 5-star Google reviews as screenshots.
 *   - PRACTITIONER no longer says "two years at HMI". The diploma says one
 *     year, and the diploma is now on the page. See the note on that field.
 *
 * DELIBERATE OMISSIONS — do not "complete" these:
 *   - NAP has no suite number. Every other tenant at 1910 Huntington lists
 *     one; whether Jason has one is unverified.
 *   - Still NO Review nodes. Six real reviews are now shown, but as the
 *     screenshots they are: the reviewer names are greyed out in the client's
 *     own crops, Review schema requires an author, and inventing one is not
 *     available. AggregateRating (5.0 / 12, Places API) remains the only
 *     machine-readable review claim.
 *   - No social URLs. The live site says "Check us out On Instagram" but the
 *     href was not captured, and a guessed handle is worse than a gap.
 */

export const BUSINESS = {
  name: 'Pasadena Hypnosis',
  legalName: 'Pasadena Hypnosis LLC',
  url: 'https://www.pasadenahypnosis.com',
  priceRange: '$$',
} as const;

/** GBP value — what NAP consistency is measured against. No suite number: unverified. */
export const NAP = {
  name: 'Pasadena Hypnosis LLC',
  street: '1910 Huntington Dr',
  city: 'South Pasadena',
  state: 'CA',
  zip: '91030',
  country: 'US',
  phone: '(626) 616-0143',
  phoneHref: 'tel:+16266160143',
  email: 'jason@pasadenahypnosis.com',
  directions:
    'https://www.google.com/maps/search/?api=1&query=1910+Huntington+Dr+South+Pasadena+CA+91030',
} as const;

/** Complete 7-day hours, Google Places API pull 2026-09-03. */
export const HOURS = [
  { days: 'Monday - Friday', time: '10:00 - 21:00' },
  { days: 'Saturday', time: '10:30 - 21:00' },
  { days: 'Sunday', time: '10:00 - 21:00' },
];

/** Places API 2026-09-03. Real, and the only social proof on this page. */
export const RATING = { value: 5.0, count: 12, best: 5, worst: 1 } as const;

/**
 * Verbatim from the live site, fetched 2026-09-09. These are Jason's own
 * words, not a rewrite of them — the point of the revision is that the new
 * site sounds like the old one, only legible to a machine.
 */
export const REAL_COPY = {
  /** Homepage hero, first line. */
  heroLine: 'You, whole healthy and complete every day.',
  /** Homepage hero, supporting sentence. */
  heroSupport:
    'The world and pressures around us can keep us from remembering we are already whole and complete.',
  /** Site-wide tagline. */
  tagline: 'Getting your mind in order is a process we can take care of.',
  /** Quote used on the live site. */
  quote:
    'Your vision will become clear only when you can look into your own heart. Who looks outside, dreams, who looks inside, awakes.',
  /** Live section headers, reused as this page's own section headers. */
  headers: {
    designed: 'Specifically Designed for You',
    sessions: 'Hypnotherapy Sessions',
    specialties: 'Specialties and Success',
    serviceInfo: 'Service Information',
  },
  /** About page, verbatim. */
  about: {
    training:
      'I received my training in Hypnotherapy at the Hypnosis Motivation Institute in Southern California.',
    office:
      'We have a beautiful office in South Pasadena. There are several other traditional Therapists also working out of this building.',
    hmi: 'HMI is located at hypnosis.edu for more information.',
  },
  /** /quitsmoking page, verbatim. Its voice is deliberately louder than the rest of the site — preserved rather than smoothed out. */
  quitSmoking: {
    kicker: 'My Method Turns Craving into a Victory Trigger',
    headline: 'Mr. Butts Doesn’t Own You Anymore!',
    body:
      'You trained yourself to crave a cigarette… Now you’ll feel powerful in those moments — because you conquered the beast most cannot.',
    close: 'Ready? Let’s make you a non-smoker… Forever.',
    money: 'The Last Money You’ll Ever Spend on Cigarettes.',
    packages: ['Two-Session Package', 'One-Session Quit Day'],
  },
  /** Newsletter block that exists on the live site. Visual only here — see Newsletter in the component. */
  newsletter: 'Sign up to get the latest news and updates',
} as const;

export const PRACTITIONER = {
  name: 'Jason Meissner',
  role: 'Certified Hypnotherapist, Owner',
  /*
   * "Two years at HMI" was carried from Call 1 and is NOT what the diploma
   * says. The document reads "successfully completed one year of Nationally
   * Accredited Education and Supervised Residency", dated October 8 2016. The
   * diploma is now displayed on the page, so copy that contradicts it is worse
   * than no copy at all — a prospect reading the claim and then reading the
   * certificate catches the practice in an overstatement. The wording below is
   * what the document supports. Worth confirming with Jason whether the extra
   * year was a second HMI program that produced its own certificate.
   */
  bio: 'Jason Meissner graduated with Honors from the Hypnosis Motivation Institute in 2016 and has practiced hypnotherapy in South Pasadena for a decade, specializing in cases many hypnotherapists decline — chronic pain, diagnosed depression, addiction and grief — alongside smoking cessation and anxiety.',
  credentials: [
    {
      title: 'HMI graduate, with Honors',
      detail: 'Nationally accredited hypnotherapy college in Tarzana, California (hypnosis.edu).',
    },
    {
      title: '10 years in practice',
      detail: 'Practicing hypnotherapy in South Pasadena, California.',
    },
  ],
  /**
   * Scope disclosure. Vertical research: "Do not imply licensure or scope the
   * practitioner does not hold — credential display must say exactly what was
   * earned, not more." Naming the limit is what makes the rest believable.
   */
  scopeNote:
    'A certified hypnotherapist is not a licensed medical or mental-health clinician. Jason’s training is in hypnotherapy, and this practice works alongside your doctor, psychiatrist or chiropractor rather than in place of them.',
};

/**
 * Five real documents, transcribed field-by-field off the certificates
 * themselves rather than off the harvest manifest — the manifest dated the HMI
 * diploma 2018 and it reads 2016. Nothing here is inferred: issuer, award
 * wording, date and certificate number are all printed on the artwork the page
 * displays beside them, so a prospect can check every line against the image.
 * `img` names the export in ./assets; the component owns that mapping so the
 * facts file stays free of a megabyte of base64.
 */
export const CREDENTIALS = [
  {
    img: 'DIPLOMA_HMI',
    award: 'Diploma in Clinical Hypnotherapy, with Honors',
    issuer: 'Hypnosis Motivation Institute',
    issuerNote: 'Nationally accredited college of hypnotherapy, Tarzana, California',
    date: 'October 8, 2016',
    ref: null as string | null,
    /* Transcribed from the body of the diploma itself. */
    note: 'Awarded on completion of nationally accredited education and supervised residency, and endorsed by the American Hypnosis Association.' as string | null,
    featured: true,
    alt: 'Diploma from the Hypnosis Motivation Institute, nationally accredited College of Hypnotherapy, conferring the Diploma in Clinical Hypnotherapy with Honors on Jason Meissner, dated October 8 2016.',
  },
  {
    img: 'CERT_PAIN',
    award: 'Certified Specialist — Hypnosis and Pain Management',
    issuer: 'American Hypnosis Association',
    issuerNote: null,
    date: 'March 8, 2016',
    note: null,
    ref: '140250',
    featured: false,
    alt: 'American Hypnosis Association certificate naming Jason A. Meissner a Certified Specialist in Hypnosis and Pain Management, dated March 8 2016, certificate number 140250.',
  },
  {
    img: 'CERT_SMOKING',
    award: 'Certified Specialist — Hypnosis and Smoking Cessation',
    issuer: 'American Hypnosis Association',
    issuerNote: null,
    date: 'April 21, 2016',
    note: null,
    ref: '140251',
    featured: false,
    alt: 'American Hypnosis Association certificate naming Jason A. Meissner a Certified Specialist in Hypnosis and Smoking Cessation, dated April 21 2016, certificate number 140251.',
  },
  {
    img: 'CERT_ADHD',
    award: 'Certified Specialist — Hypnosis and ADD-ADHD',
    issuer: 'American Hypnosis Association',
    issuerNote: null,
    date: 'April 14, 2016',
    note: null,
    ref: '140534',
    featured: false,
    alt: 'American Hypnosis Association certificate naming Jason A. Meissner a Certified Specialist in Hypnosis and ADD-ADHD, dated April 14 2016, certificate number 140534.',
  },
  {
    img: 'CERT_SPORTS',
    award: 'Certified Specialist — Hypnosis and Sports Performance',
    issuer: 'American Hypnosis Association',
    issuerNote: null,
    date: 'April 19, 2016',
    note: null,
    ref: '140533',
    featured: false,
    alt: 'American Hypnosis Association certificate naming Jason A. Meissner a Certified Specialist in Hypnosis and Sports Performance, dated April 19 2016, certificate number 140533.',
  },
];

/**
 * Six real 5-star Google reviews, shown as the screenshots they are.
 *
 * The reviewer names are greyed out in the client's own crops. That rules out
 * Review schema, which requires an `author`, and it rules out retyping them as
 * quote cards with names attached — inventing an author for a real review is
 * the one move that would turn honest proof into a fabrication. So they render
 * as images, captioned with the subject only, and the machine-readable claim
 * stays what it has always been: the real 5.0 / 12-review AggregateRating.
 *
 * `topic` is the caption. `gist` is the accessible description and is a
 * paraphrase of visible text, never an expansion of the truncated "... More".
 */
export const REVIEW_SHOTS = [
  {
    img: 'REVIEW_SMOKING_30YR',
    topic: 'Quit smoking after 30 years',
    gist: 'Five-star Google review from a client who had smoked for 30 years and had tried cutting down, quitting cold turkey and rationing without success before finding Jason through a Google search.',
  },
  {
    img: 'REVIEW_IBS',
    topic: 'Persistent IBS',
    gist: 'Five-star Google review from a client who had seen every doctor and was taking pain medication for persistent IBS before trying hypnotherapy.',
  },
  {
    img: 'REVIEW_SMOKING_13YR',
    topic: 'A 13-year habit',
    gist: 'Five-star Google review from a self-described skeptic who came to Pasadena Hypnosis to quit smoking after a 13-year addiction.',
  },
  {
    img: 'REVIEW_CONFIDENCE',
    topic: 'Confidence and self-esteem',
    gist: 'Five-star Google review from a client of several months describing improvement in self-confidence and self-esteem, and calling Jason understanding and intuitive.',
  },
  {
    img: 'REVIEW_RELATIONSHIP',
    topic: 'Preparing for a stressful event',
    gist: 'Five-star Google review from a client who saw Jason about four times to prepare for a stressful upcoming event, and valued how clearly he explained how hypnotherapy works.',
  },
  {
    img: 'REVIEW_GROWTH',
    topic: 'Classes and sessions',
    gist: 'Five-star Google review describing every class and session as insightful, and Jason as passionate about the work and focused on the client seeing growth and results.',
  },
];

export const H1_CLAUSE = 'Certified hypnotherapy for the conditions other practices turn away';
/* Leading space is load-bearing: the two spans join into the element's text
   content, and the required H1 has a space before the em dash. It collapses
   visually because the spans are block-level. */
export const H1_TAIL = ' — Pasadena, South Pasadena, and by video across California.';

/** profile.homeAnswer, verbatim. Renders directly under the H1 as required. */
export const HOME_ANSWER =
  'Pasadena Hypnosis LLC is a South Pasadena, CA hypnotherapy practice led by Jason Meissner, a Hypnosis Motivation Institute graduate with 10 years in practice. He specializes in diagnosed depression, bipolar disorder and disabling anxiety, plus smoking cessation, chronic pain and grief, holding a 5.0 Google rating from South Pasadena and Pasadena clients.';

export type Service = {
  slug: string;
  name: string;
  category: string;
  summary: string;
  /** 0 = genuinely free (the discovery call). Every figure here is site-verified. */
  price: number | null;
  priceQualifier?: string;
  tag?: string;
  /** 40–60 word answer block, one per /services/<slug> route. */
  answer: string;
};

/**
 * The practice's 14 real service pages — 11 from the live booking system
 * plus 3 net-new pages added 2026-09-10 per the Call 2 brief (see profile.ts
 * catalog for full sourcing). Generated from profile.ts's catalog array
 * rather than retyped, so the slugs match booking-services-sitemap.xml
 * exactly for the 11 pre-existing ones. Order matches Jason's own ranked
 * priority; the last 4 are de-prioritized per the brief but kept live.
 */
export const SERVICES: Service[] = [
  {
    slug: 'depression-bipolar-support',
    name: 'Depression & Bipolar Support',
    category: 'Featured',
    summary: 'Hypnotherapy for diagnosed depression and bipolar disorder — the practice\'s primary differentiator; most hypnotherapists decline these cases outright.',
    price: 200,
    priceQualifier: 'per session',
    tag: 'Primary specialty',
    answer:
      'Pasadena Hypnosis specializes in diagnosed depression and bipolar disorder — conditions most hypnotherapists decline outright. Jason Meissner, a Hypnosis Motivation Institute graduate with 10 years in practice, works alongside your existing psychiatric care, not in place of it. Sessions run $200 each, with a free discovery call available first.',
  },
  {
    slug: 'stress-and-anxiety',
    name: 'Stress and Anxiety',
    category: 'Featured',
    summary: 'Hypnotherapy for disabling-level stress and anxiety — grouped with depression/bipolar support as Jason\'s stated primary client focus.',
    price: 200,
    priceQualifier: 'per session',
    tag: 'Primary specialty',
    answer:
      'Pasadena Hypnosis treats disabling-level stress and anxiety — not everyday nerves, but anxiety serious enough that other approaches have already been tried. Jason Meissner, a Hypnosis Motivation Institute graduate with 10 years in practice, works with clients in South Pasadena, Pasadena and online statewide. Sessions run $200 each; a free discovery call comes first.',
  },
  {
    slug: 'smoking-cessation',
    name: 'Smoking Cessation',
    category: 'Featured',
    summary: 'A proven, high-close service — a single 90-minute Quit Smoking Power Session, or a Two-Session Package. Pricing confirmed on your free discovery call.',
    // null 2026-09-10 (was 400) — still unresolved per the Call 2 brief's
    // own open questions ($400 site-verified vs. Jason's verbal $500).
    // priceLabel() renders null as nothing rather than guessing.
    price: null,
    priceQualifier: 'confirmed on your free discovery call',
    tag: 'Most requested',
    answer:
      'Smoking Cessation at Pasadena Hypnosis is a proven, high-close service — most clients quit after a single 90-minute Quit Smoking Power Session, with a Two-Session Package also offered for those who want extra support. Exact pricing is confirmed on your free discovery call. Led by Jason Meissner, HMI-trained with 10 years in practice.',
  },
  {
    slug: 'chronic-pain',
    name: 'Chronic Pain',
    category: 'Conditions',
    summary: 'Hypnotherapy for chronic and post-surgical pain — a specialty Jason treats as adjacent to his depression/bipolar work, alongside ongoing medical care.',
    price: 200,
    priceQualifier: 'per session',
    answer:
      'Pasadena Hypnosis treats chronic and post-surgical pain as a complement to your existing medical care — the same complex, harder cases Jason Meissner takes on for depression and bipolar disorder. He\'s a Hypnosis Motivation Institute graduate with 10 years in practice, serving South Pasadena, Pasadena and the greater LA area. Sessions run $200 each.',
  },
  {
    slug: 'ibs',
    name: 'Gut-Directed Hypnotherapy',
    category: 'Conditions',
    summary: 'Gut-directed hypnotherapy for IBS and other gut-brain conditions — a genuine differentiator no local competitor claims.',
    price: 200,
    priceQualifier: 'per session',
    answer:
      'Gut-Directed Hypnotherapy is a clinical term for hypnotherapy targeting IBS and other gut-brain conditions — a specialty no competitor in the South Pasadena area claims. Jason Meissner, a Hypnosis Motivation Institute graduate with 10 years in practice, treats it at $200 per session, with a free discovery call available first.',
  },
  {
    slug: 'grief-and-loss',
    name: 'Grief & Loss',
    category: 'Conditions',
    summary: 'Hypnotherapy for grief and loss — one of Jason\'s most requested areas of work, per the Call 2 brief.',
    price: 200,
    priceQualifier: 'per session',
    answer:
      'Pasadena Hypnosis offers hypnotherapy for grief and loss — one of Jason Meissner\'s most requested areas of work, alongside chronic pain and diagnosed depression. He\'s a Hypnosis Motivation Institute graduate with 10 years in practice, serving South Pasadena, Pasadena and online statewide. Sessions run $200 each; a free discovery call comes first.',
  },
  {
    slug: 'group-hypnotherapy-program',
    name: 'Group Hypnotherapy Program',
    category: 'Programs',
    summary: 'A newly launched 8-person weekly cohort program — not previously on the site. Cadence, pricing and booking are confirmed directly with Jason.',
    price: null,
    priceQualifier: 'confirmed directly with Jason',
    tag: 'New',
    answer:
      'The Group Hypnotherapy Program is Pasadena Hypnosis\'s newest offering — an ongoing, weekly cohort format led by Jason Meissner rather than a one-on-one session. It\'s a recent addition to the practice, so cohort size, cadence and pricing are confirmed directly with Jason. Contact Pasadena Hypnosis or book a free discovery call to learn more.',
  },
  {
    slug: 'hypnotherapy-sessions',
    name: 'Hypnotherapy Sessions',
    category: 'General',
    summary: 'The flagship 60-90 minute hypnotherapy session — the practice\'s general, most-booked offering.',
    price: 200,
    priceQualifier: 'per session',
    tag: 'Most booked',
    answer:
      'A Hypnotherapy Session with Jason Meissner runs 60-90 minutes and is $200. Jason discusses your specific needs before the session — charges are the same whether you book in the South Pasadena office or online. He is a Hypnosis Motivation Institute graduate with 10 years in practice.',
  },
  {
    slug: 'online-hypnotherapy',
    name: 'Online Hypnotherapy',
    category: 'Online',
    summary: 'Full sessions delivered online, available anywhere in California — geographically unbounded and currently unmarketed.',
    price: 200,
    priceQualifier: 'per session',
    answer:
      'Pasadena Hypnosis offers complete hypnotherapy sessions online for clients anywhere in California, led by Jason Meissner, a Hypnosis Motivation Institute graduate with 10 years in practice. Online sessions cover the same range of work as in-person sessions at $200 per session, with a free discovery call available first.',
  },
  {
    slug: 'discovery-call',
    name: 'Free Discovery Call',
    category: 'Featured',
    summary: 'A free call to talk through your situation before committing to a paid session — a real, currently-live booking option.',
    price: 0,
    priceQualifier: 'free',
    tag: 'Free',
    answer:
      'The Free Discovery Call is a no-cost conversation with Jason Meissner to talk through your situation before booking a paid hypnotherapy session. It\'s available to anyone considering Pasadena Hypnosis, whether in person in South Pasadena or online anywhere in California, with no obligation to continue afterward.',
  },
  // De-prioritized 2026-09-10 per Call 2 brief — pages stay live, content
  // unchanged, just moved out of the featured/front-loaded positions above.
  {
    slug: 'childhood-stress-anxiety',
    name: 'Childhood Stress & Anxiety',
    category: 'Conditions',
    summary: 'Hypnotherapy for stress and anxiety in children — a real page on the live site, distinct from the adult stress-and-anxiety service.',
    price: 200,
    priceQualifier: 'per session',
    answer:
      'Pasadena Hypnosis offers hypnotherapy for childhood stress and anxiety in South Pasadena, CA, led by Jason Meissner, a Hypnosis Motivation Institute graduate with 10 years in practice. Sessions are $200 each, with an approach adapted for younger clients rather than a direct copy of the adult session format.',
  },
  {
    slug: 'testing-and-academic-performance',
    name: 'Testing and Academic Performance',
    category: 'Performance',
    summary: 'Hypnotherapy for test anxiety and academic performance — directly targets the San Marino / Arcadia gap in the audit.',
    price: 200,
    priceQualifier: 'per session',
    answer:
      'Pasadena Hypnosis offers hypnotherapy for testing and academic performance in South Pasadena and the greater Los Angeles area, led by Jason Meissner, a Hypnosis Motivation Institute graduate with 10 years in practice. Sessions run $200 each, helping clients manage test anxiety and perform at their real ability level.',
  },
  {
    slug: 'sports-performance',
    name: 'Sports Performance Hypnosis',
    category: 'Performance',
    summary: 'Hypnotherapy for sports and athletic performance.',
    price: 200,
    priceQualifier: 'per session',
    answer:
      'Pasadena Hypnosis offers sports performance hypnosis in South Pasadena and the greater Los Angeles area, led by Jason Meissner, a Hypnosis Motivation Institute graduate with 10 years in practice. Sessions run $200 each and are available in person in South Pasadena or online anywhere in California.',
  },
  {
    slug: 'past-life-regression',
    name: 'Past Life Regression',
    category: 'Specialty',
    summary: 'A real, currently-live service offering distinct from the clinical/condition-focused sessions.',
    price: 400,
    priceQualifier: 'per session',
    answer:
      'Pasadena Hypnosis offers past life regression sessions in South Pasadena, CA, led by Jason Meissner, a Hypnosis Motivation Institute graduate with 10 years in practice. Sessions are $400 each, available in person or online, for clients interested in this specialty alongside the practice\'s clinical hypnotherapy work.',
  },
];

/**
 * The live site's real static pages, from pages-sitemap.xml. Rendered in the
 * footer as the sitemap so the rebuild's information architecture is visibly
 * the same one Jason already has — nothing invented, nothing dropped.
 */
export const SITE_PAGES = [
  { path: '/about-us', label: 'About Us' },
  { path: '/quitsmoking', label: 'Quit Smoking' },
  { path: '/blog', label: 'Blog' },
  { path: '/memberships', label: 'Memberships' },
  { path: '/meditation-challenges', label: 'Meditation Challenges' },
  { path: '/groups', label: 'Groups' },
  { path: '/webinar-registration', label: 'Webinar Registration' },
  { path: '/members', label: 'Members' },
];

// TRIMMED 2026-09-10 from 9 audit-radius cities to the 5 the Call 2 brief
// confirms as real targets — matches the `serviceAreas` trim in profile.ts.
// Alhambra/Altadena/San Marino/Sierra Madre were the audit's own assumed
// drive-time radius, never confirmed by Jason on either call.
export const SERVICE_AREAS = [
  'Pasadena, CA',
  'South Pasadena, CA',
  'Glendale, CA',
  'Eagle Rock, Los Angeles, CA',
  'Arcadia, CA',
];

export const ONLINE_AREA = 'Online — statewide across California';

export const STEPS = [
  {
    n: '01',
    title: 'A free discovery call',
    body: 'Talk through your situation with Jason directly. No charge, no commitment, and no form asking you to explain yourself in writing first.',
  },
  {
    n: '02',
    title: 'Your first session',
    body: '$200, in person at 1910 Huntington Drive in South Pasadena, or online by video anywhere in California — whichever suits you.',
  },
  {
    n: '03',
    title: 'A short course of work',
    body: 'Most clients work with Jason for six to eight sessions. It varies by condition, and you will know roughly where you stand after the first.',
  },
];

/**
 * profile.faqs, verbatim, all ten (was nine — the insurance/HSA question was
 * added 2026-09-10 per the Call 2 brief). Rendered by the accordion AND by
 * the FAQPage JSON-LD from this same array — they cannot drift. The cost
 * answer is re-hedged on smoking-cessation pricing (see profile.ts header):
 * the brief itself still lists $400-vs-$500 as unresolved after Call 2.
 */
export const FAQS = [
  {
    q: 'What does a hypnotherapy session with Pasadena Hypnosis cost?',
    a: 'Standard hypnotherapy sessions with Jason Meissner are $200 each, with most clients engaging for 6-8 sessions depending on the condition being treated. A free discovery call is available before booking any paid session, so you can talk through your situation first. Smoking cessation is priced separately, as a single session or a Two-Session Package — exact pricing is confirmed on your discovery call.',
  },
  {
    // NEW 2026-09-10, Call 2 brief — near-zero-competition term, and a real,
    // sourced fact (not consent-gated).
    q: 'Is hypnotherapy covered by insurance or HSA/FSA?',
    a: 'Pasadena Hypnosis does not bill insurance directly — sessions are self-pay by cash or credit card. HSA and FSA cards work the same as any other credit card at checkout, so many clients are able to use pre-tax health-spending funds even without a direct insurance billing relationship. Ask on your free discovery call if you have questions about your specific plan.',
  },
  {
    q: 'Does hypnosis actually work for quitting smoking?',
    a: 'Hypnotherapy addresses the psychological drivers of nicotine dependence directly, which is why it can succeed where willpower alone does not. Pasadena Hypnosis has helped clients quit smoking through a defined series of sessions led by a Hypnosis Motivation Institute-trained hypnotherapist with 10 years in practice.',
  },
  {
    q: 'What conditions does Pasadena Hypnosis treat?',
    a: 'Jason Meissner works with chronic pain, diagnosed depression and bipolar disorder, addiction, grief and loss, IBS, anxiety and smoking cessation — a broader range than most hypnotherapists, who typically limit their practice to phobias and light behavioral change. He completed a year of accredited training and supervised residency at the Hypnosis Motivation Institute and has practiced for a decade, treating cases many peers in the field decline to take on.',
  },
  {
    q: 'Is hypnotherapy available online, or only in South Pasadena?',
    a: 'Both. Pasadena Hypnosis sees clients in person at 1910 Huntington Drive in South Pasadena, and offers full sessions online to clients anywhere in California — the same $200 rate and the same conditions treated either way, from chronic pain and anxiety to smoking cessation. Online sessions are a genuine option, not a fallback, for anyone outside the South Pasadena area or who prefers not to travel.',
  },
  {
    q: 'Is hypnotherapy a replacement for medical or psychiatric treatment?',
    a: 'No. Pasadena Hypnosis is a complementary practice — most clients are already under the care of a doctor, psychiatrist or chiropractor, and hypnotherapy works alongside that care rather than replacing it. Jason Meissner is a certified hypnotherapist, not a licensed medical or mental-health clinician, and he frames every session that way: as one part of a client\'s broader care, not a substitute for it.',
  },
  {
    q: 'How many hypnotherapy sessions does it typically take?',
    a: 'Most clients work with Jason Meissner for 6-8 sessions, though this varies by condition and by individual — chronic, long-standing issues like grief or chronic pain sometimes take longer, while quit-smoking clients often see results in a shorter, more defined series. A free discovery call helps set realistic expectations for your specific situation before you book a paid session.',
  },
  {
    q: 'What are Jason Meissner\'s credentials as a hypnotherapist?',
    a: 'Jason Meissner holds a Diploma in Clinical Hypnotherapy with Honors from the Hypnosis Motivation Institute, a nationally accredited hypnotherapy college in Tarzana, California, awarded October 8 2016. He also holds four American Hypnosis Association specialist certifications — Pain Management, Smoking Cessation, Sports Performance, and ADD-ADHD — and has practiced in South Pasadena for a decade. Every one of those documents is reproduced on this page rather than merely claimed.',
  },
  {
    q: 'Does Pasadena Hypnosis treat conditions other hypnotherapists turn down?',
    a: 'Yes. Jason Meissner specifically works with chronic pain, diagnosed depression and bipolar disorder, addiction, and grief — cases many hypnotherapists decline in favor of lighter work like phobias, rather than treating them as a hard no. He describes this as his real focus: not a textbook approach to a diagnosis, but full investment in the specific person and situation in front of him.',
  },
  {
    q: 'How do I book an appointment with Pasadena Hypnosis?',
    a: 'Book directly online or call (626) 616-0143. A free discovery call is available first for anyone who wants to talk through their situation before committing to a paid session — there\'s no obligation to continue afterward. Sessions are available both in person at the South Pasadena office and online for clients anywhere in California.',
  },
];

/** Built from the arrays above so schema cannot describe anything invisible. */
export function buildJsonLd() {
  const address = {
    '@type': 'PostalAddress',
    streetAddress: NAP.street,
    addressLocality: NAP.city,
    addressRegion: NAP.state,
    postalCode: NAP.zip,
    addressCountry: NAP.country,
  };
  const orgId = BUSINESS.url + '/#organization';
  const areas = [...SERVICE_AREAS, 'California'];

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': BUSINESS.url + '/#website',
        url: BUSINESS.url,
        name: BUSINESS.name,
        publisher: { '@id': orgId },
        inLanguage: 'en-US',
      },
      {
        '@type': 'MedicalOrganization',
        '@id': orgId,
        name: NAP.name,
        alternateName: BUSINESS.name,
        url: BUSINESS.url,
        telephone: NAP.phone,
        email: NAP.email,
        priceRange: BUSINESS.priceRange,
        address: address,
        areaServed: areas.map(function (name) {
          return { '@type': 'AdministrativeArea', name: name };
        }),
        openingHoursSpecification: [
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Sunday'],
            opens: '10:00',
            closes: '21:00',
          },
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Saturday'],
            opens: '10:30',
            closes: '21:00',
          },
        ],
        founder: {
          '@type': 'Person',
          name: PRACTITIONER.name,
          jobTitle: PRACTITIONER.role,
          description: PRACTITIONER.bio,
          alumniOf: {
            '@type': 'EducationalOrganization',
            name: 'Hypnosis Motivation Institute',
            url: 'https://hypnosis.edu',
          },
          /* Built from the same array the credential wall renders from, so
             every node here has its document visible on the page. Schema that
             describes a certificate the visitor cannot see is the exact
             phantom-markup pattern this build exists to avoid. */
          hasCredential: CREDENTIALS.map(function (c) {
            const node: Record<string, unknown> = {
              '@type': 'EducationalOccupationalCredential',
              name: c.award,
              credentialCategory: c.featured ? 'diploma' : 'certificate',
              dateCreated: c.date,
              recognizedBy: { '@type': 'Organization', name: c.issuer },
            };
            if (c.ref !== null) node.identifier = c.ref;
            return node;
          }),
        },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: RATING.value,
          reviewCount: RATING.count,
          bestRating: RATING.best,
          worstRating: RATING.worst,
        },
        /* One Offer per REAL booking service, at its real URL. Every price
           here is site-verified; the previous revision's null-price branch is
           gone because no service is unpriced any more. */
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Hypnotherapy services',
          itemListElement: SERVICES.map(function (s) {
            const offer: Record<string, unknown> = {
              '@type': 'Offer',
              url: BUSINESS.url + '/services/' + s.slug,
              itemOffered: {
                '@type': 'Service',
                name: s.name,
                description: s.summary,
                serviceType: s.name,
                category: s.category,
                provider: { '@id': orgId },
                areaServed: SERVICE_AREAS,
              },
            };
            if (s.price !== null) {
              offer.price = String(s.price);
              offer.priceCurrency = 'USD';
            }
            return offer;
          }),
        },
      },
      {
        '@type': 'FAQPage',
        '@id': BUSINESS.url + '/#faq',
        mainEntity: FAQS.map(function (f) {
          return {
            '@type': 'Question',
            name: f.q,
            acceptedAnswer: { '@type': 'Answer', text: f.a },
          };
        }),
      },
      {
        '@type': 'WebPage',
        '@id': BUSINESS.url + '/#webpage',
        url: BUSINESS.url,
        name: 'Hypnotherapy for Depression, Bipolar Disorder and Anxiety | Pasadena Hypnosis',
        isPartOf: { '@id': BUSINESS.url + '/#website' },
        about: { '@id': orgId },
        speakable: {
          '@type': 'SpeakableSpecification',
          cssSelector: ['#answer-first', '#faq'],
        },
      },
    ],
  };
}
