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
 * WHAT CHANGED 2026-10-01 (Jason's markup round one, 101 comments — full
 * record in docs/markup-round-one.md). These are the client's own rules and
 * they outrank every older note in this header:
 *   - Never say "diagnosed", "disabling", "complementary", "statewide" or
 *     "California" (as a service range — he works online with clients
 *     anywhere), "6-8 sessions" (there is no set number), HSA/FSA, or
 *     "specialisms". No military time.
 *   - Never compare him with other hypnotherapists or practices, and never
 *     say what he is not. The scope note survives in exactly two places he
 *     chose (/our-team's TeamScope, and FAQ "Is hypnotherapy a replacement…");
 *     the footer carries the one disclaimer sentence he wrote himself.
 *   - Never count the services out loud.
 *   - Group Hypnotherapy Program and Past Life Regression are removed ("not
 *     an offering"). Gut-Directed Hypnotherapy is now IBS & Fibromyalgia;
 *     Chronic Pain is now Chronic and Acute Pain. Smoking cessation is $400,
 *     resolving the old $400-vs-$500 question in favour of the published
 *     figure, on his instruction.
 *   - Copy comes from his own site wherever it can: "go back to my website".
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
  /** Keyless Google Maps embed of the same address, for the /contact office block. */
  mapEmbed: 'https://maps.google.com/maps?q=1910+Huntington+Dr,+South+Pasadena,+CA+91030&z=15&output=embed',
} as const;

/** Complete 7-day hours, Google Places API pull 2026-09-03. Twelve-hour clock
    on the client's instruction ("Get rid of all military time on the
    website"); the 24-hour form survives only inside the JSON-LD, where
    schema.org requires it and nobody reads it. */
export const HOURS = [
  { days: 'Monday - Friday', time: '10:00 AM - 9:00 PM' },
  { days: 'Saturday', time: '10:30 AM - 9:00 PM' },
  { days: 'Sunday', time: '10:00 AM - 9:00 PM' },
];

/** Places API 2026-09-03. Real, and the only machine-readable review claim. */
export const RATING = { value: 5.0, count: 12, best: 5, worst: 1 } as const;

/** Jason, markup #31: "There are also yelp reviews. As well as others." No
    count or URL was given, so this names the platforms and nothing more. */
export const REVIEWS_ELSEWHERE = 'Also reviewed on Yelp and more';

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
  /**
   * About page, verbatim — with two cuts the client made himself in markup
   * round one: "in Southern California" is gone from the training line
   * ("Delete California site wide", #85), and the office line stops before
   * the other therapists in the building (#91, "Get rid of this!").
   */
  about: {
    training: 'I received my training in Hypnotherapy at the Hypnosis Motivation Institute.',
    office: 'We have a beautiful office in South Pasadena. It is safe and easy to use.',
    hmi: 'HMI is located at hypnosis.edu for more information.',
  },
  /** Homepage, verbatim. */
  hypnotherapy:
    'Hypnotherapy allows you to strengthen what you want in your life and to gain freedom from what should be released. It allows us to curate the impact and results of thoughts.',
  wholeSelf:
    'The world and pressures around us can keep us from remembering we are already whole and complete. We can find that whole and fearless self at the center of peace and strength that is already there inside us.',
  bestOfUs: 'All we need to do is access what we already have and let go of everything we no longer need or want.',
  inOffice: 'In person sessions are held at my office in South Pasadena, CA.',
  online:
    'Hypnotherapy is 100% effective online or over the phone. Save drive time and fuel. Find a quiet spot where you will be undisturbed for 1 hour and we can take care of it from the comfort of your home.',
  meditation:
    'Meditation and Hypnotherapy share many things. First of which is the certainty that doing it regularly will create better overall health and wellbeing.',
  charges: 'All charges are the same in the office or online.',
  /** Footer motto on the live site. */
  motto: 'Find your Peace',
  /**
   * /quitsmoking page, verbatim. Its voice is deliberately louder than the
   * rest of the site — preserved rather than smoothed out. Jason, markup #94:
   * "I will write the smoke pages I guess. I thought I did" — he did, and this
   * is it. The smoking-cessation page is built from these lines.
   */
  quitSmoking: {
    kicker: 'My Method Turns Craving into a Victory Trigger',
    headline: 'Mr. Butts Doesn’t Own You Anymore!',
    body: 'You trained yourself to need cigarettes. Now you’ll feel powerful in those moments — because you conquered the beast most cannot.',
    close: 'Ready? Let’s make you a non-smoker… Forever.',
    money: 'The Last Money You’ll Ever Spend on Cigarettes.',
    packages: ['Two-Session Package', 'One-Session Quit Day'],
    opener: [
      'You thought quitting meant pain… deprivation… willpower.',
      'That is what they told you. That’s what you’ve tried before.',
      'This isn’t that.',
    ],
    question: 'What if quitting smoking became the most powerful moment of your life?',
    answer: ['Not a punishment.', 'Not a sacrifice.', 'A new freedom and victory you can feel every day.'],
    trigger: 'We turn your habit into a lifelong trigger for Peace, Confidence and Victory',
    craving:
      'You trained yourself to crave a cigarette. What if that same craving now brought you directly back to your healthiest, strongest, most powerful self? That’s what I do. It works.',
    method: ['Every time you see it.', 'Every time you smell it.', 'Every time someone offers it…', 'It means one thing: Victory'],
    /*
     * Markup #103 — his rewrite of "Two Ways to Win", which he signed off
     * "Feel free to edit." Typos fixed ("quite day", "realligned", "every
     * use"), nothing added. "No price change" settles the Two-Session
     * Package's price: it is the same $400.
     */
    waysTitle: 'Quitting your way',
    ways: [
      {
        title: 'One-Session Quit Day',
        body: 'We can do it all at once in a single session, around 90 minutes long, and be done with everything. You choose your quit day now. About 60% of clients choose one session.',
      },
      {
        title: 'Two-Session Package',
        body: 'We also offer it in two sessions if you would like more time for the challenge. The first session gets you ready, going deep into hypnosis and laying the groundwork. You pick your final quit day during that first session and finish the process on the date you choose. No price change.',
      },
    ],
    backup:
      'A back-up session and call or text help are always available if you need them. We can do it all one more time if you need to be realigned. This is very rarely used.',
    walkAway: 'It is time to walk away now.',
    earned: ['You’ve done the suffering.', 'You earned the victory.', 'I’ll help you claim it.'],
    readyCta: 'I’m Ready to Quit',
    /** "SMOKING CLIENT REVIEWS" on /quitsmoking, verbatim, unattributed there too. */
    reviews: [
      'It is hard to believe I was ever so attached to cigarettes in the way I was and I feel complete relief from the pull to indulge in that again!',
      'I can’t even explain the level of comfort I feel and the amount of hope I have inside. I am a non smoker and I am more than grateful for Jason’s work and the compassion he has shown to me.',
      'I quit smoking with a deep reverence to the pledge. Jason has a warm and passionate demeanor and I hope to run into him again. 100% recommend.',
    ],
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
  /* Markup #25/#68: no comparison with other hypnotherapists, no "diagnosed". */
  bio: 'Jason Meissner graduated with Honors from the Hypnosis Motivation Institute in 2016 and has practiced hypnotherapy for a decade — in person at his South Pasadena office, and online with clients anywhere.',
  credentials: [
    {
      title: 'HMI graduate, with Honors',
      detail: 'Nationally accredited college of hypnotherapy (hypnosis.edu).',
    },
    {
      title: '10 years in practice',
      detail: 'Practicing hypnotherapy in South Pasadena.',
    },
  ],
  /**
   * Scope disclosure. Jason, markup #73, on /our-team's TeamScope: "This is the
   * one place this can remain. REMOVE IT EVERYWHERE ELSE COMPLETELY." So it is
   * rendered there and nowhere else — do not import it into another section.
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
    issuerNote: 'Nationally accredited college of hypnotherapy',
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

/**
 * The homepage H1. Markup #113: "I am told this H1 should read with the city.
 * Like 'Your Best Choice for Certified Hypnotherapy in Pasadena, Ca.'" — his
 * wording, with the state abbreviation capitalised. It used to be the #78
 * tagline below; the tagline now lives only in the footer.
 */
export const H1_TITLE = 'Your Best Choice for Certified Hypnotherapy in Pasadena, CA';
/* Leading space is load-bearing: the two spans join into the element's text
   content. It collapses visually because the spans are block-level. */
export const H1_TAIL = ' I’m available online anywhere and locally in person.';
/**
 * Footer tagline, in Jason's words (markup #78): "CHANGE THIS TO THE FOLLOWING
 * SITE WIDE: Certified hypnotherapy, let us know how we can help. I'm available
 * online anywhere and locally in person." The old clause about conditions
 * other practices turn away is deleted everywhere.
 */
export const TAGLINE = 'Certified hypnotherapy, let us know how we can help.' + H1_TAIL;

/**
 * Footer disclaimer, verbatim from markup #77 — the only sentence of its kind
 * the client allows outside /our-team and the one FAQ that carries it.
 */
export const DISCLAIMER =
  'Pasadena Hypnosis is a hypnotherapy practice, Jason Meissner is a certified hypnotherapist. Hypnotherapy is not a substitute for medical or psychiatric care.';

/** Renders directly under the H1 as the answer-first block. */
export const HOME_ANSWER =
  'Pasadena Hypnosis LLC is a South Pasadena, CA hypnotherapy practice led by Jason Meissner, a Hypnosis Motivation Institute graduate with 10 years in practice. He works with stress and anxiety, depression and bipolar disorder, smoking cessation, chronic and acute pain, IBS and fibromyalgia, and grief, in person and online, with a 5.0 Google rating.';

export type Service = {
  slug: string;
  name: string;
  category: string;
  summary: string;
  /** 0 = genuinely free (the discovery call). Every figure here is site-verified. */
  price: number | null;
  priceQualifier?: string;
  tag?: string;
  /** Optional lede under the service page's H1, where the client wrote one. */
  heroLede?: string;
  /** Answer block, one per /services/<slug> route; also the hub card text. */
  answer: string;
  /** The service page's own section: a heading and paragraphs in Jason's voice. */
  detail: { heading: string; paras: string[] };
  /** A testimonial from the live site, verbatim, initials as published there. */
  quote?: { text: string; by: string };
};

/**
 * The practice's services, in the practice's own order. Rewritten 2026-10-01
 * from Jason's markup (comment numbers in brackets) and from his own site's
 * words — every summary, answer and detail line below either quotes
 * pasadenahypnosis.com or does what a pinned comment told it to.
 *
 * REMOVED: group-hypnotherapy-program (#13 "This is not an offering please
 * remove it", #46, #65) and past-life-regression (#19, #51 "Get rid of this
 * tile. Remove the offering."). Their routes no longer exist.
 *
 * PRICES ARE NOT REPEATED IN CARD TEXT (#22, #34 "Why is the dollar amount
 * there over and over and over when I have one cost", #36). They live on
 * /pricing and in each service page's own hero.
 *
 * CATEGORIES were renamed so the menus stop putting the discovery call among
 * the specialties (#34 "This is a mistake obviously") and stop leaving out
 * the practices he leads with (#34 "you already forgot my primary practices").
 */
export const SERVICES: Service[] = [
  {
    slug: 'depression-bipolar-support',
    name: 'Depression & Bipolar Support',
    category: 'Specialties',
    // #40, #75, #98: no "diagnosed", no other hypnotherapists.
    summary:
      'Depression and bipolar support — remember that you are already whole and complete.',
    price: 200,
    priceQualifier: 'per session',
    answer:
      'Pasadena Hypnosis offers hypnotherapy for depression and bipolar disorder with Jason Meissner, a Hypnosis Motivation Institute graduate with 10 years in practice. The world and pressures around us can keep us from remembering we are already whole and complete — together we find that whole and fearless self again.',
    detail: {
      heading: 'You, whole, healthy and complete every day',
      paras: [
        'The world and pressures around us can keep us from remembering we are already whole and complete. We can find that whole and fearless self at the center of peace and strength that is already there inside us.',
        'All we need to do is access what we already have and let go of everything we no longer need or want. Hypnotherapy allows you to strengthen what you want in your life and to gain freedom from what should be released.',
      ],
    },
  },
  {
    slug: 'stress-and-anxiety',
    name: 'Stress and Anxiety',
    category: 'Specialties',
    // #3, #41, #99, #100: no "disabling", no "not everyday nerves" — talk
    // about stress and anxiety, in the words of his own Stress and Anxiety page.
    summary:
      'Hypnotherapy for stress and anxiety, with great relief normally every session.',
    price: 200,
    priceQualifier: 'per session',
    answer:
      'Don’t continue to suffer as a slave to a mind that is lost and overworking itself to solve all of your problems. Hypnotherapy for stress and anxiety with Jason Meissner gets your mind in order and calms the body.',
    detail: {
      heading: 'Getting your mind in order is a process we can take care of',
      paras: [
        'Stress and anxiety are a mind lost and overworking itself, trying to solve all of your problems at once. It keeps you up at night, tightens the body and takes the ease out of every day.',
        'Hypnotherapy allows you to strengthen what you want in your life and to gain freedom from what should be released. It quiets the racing thoughts and brings you back to the center of peace and strength that is already there inside you.',
        'We can also refine your at home self hypnosis or meditation work to keep you on track now and in the future.',
      ],
    },
  },
  {
    slug: 'smoking-cessation',
    name: 'Smoking Cessation',
    category: 'Specialties',
    // #9, #58: "The pricing is the pricing as listed on my website. $400." The
    // old null (the unresolved $400-vs-$500 question) is closed by the client.
    // #6, #9, #42, #76, #92, #94: his method, in his words — no "high-close",
    // no session counts.
    summary:
      'My method turns craving into a victory trigger. Let’s make you a non-smoker… forever.',
    price: 400,
    priceQualifier: 'I’m ready to quit smoking',
    tag: 'Most requested',
    answer:
      'We turn your habit into a lifelong trigger for peace, confidence and victory. You trained yourself to crave a cigarette — what if that same craving now brought you directly back to your healthiest, strongest, most powerful self? That’s what Jason Meissner does. It works.',
    detail: {
      heading: 'The last money you’ll ever spend on cigarettes',
      paras: [
        'You thought quitting meant pain… deprivation… willpower. That is what they told you. That’s what you’ve tried before. This isn’t that.',
        'What if quitting smoking became the most powerful moment of your life? Not a punishment. Not a sacrifice. A new freedom and victory you can feel every day.',
      ],
    },
    quote: {
      text: 'I have been smoking for 30 years… I’ve tried cutting down, stopping cold turkey, and rationing. NOTHING has worked. I smoked over a pack a day and woke up to my coffee and cigarette every morning… well not this morning!!',
      by: 'A.S.',
    },
  },
  {
    slug: 'chronic-pain',
    // #10, #33, #43: "It is 'Chronic and Acute Pain'". The slug stays, so the
    // URL still matches the live site's /service-page/chronic-pain.
    name: 'Chronic and Acute Pain',
    category: 'Specialties',
    summary: 'Hypnotherapy for chronic and acute pain, with relief after every session.',
    price: 200,
    priceQualifier: 'per session',
    answer:
      'Yes, we can reduce the pain you are experiencing. Hypnotherapy for chronic and acute pain with Jason Meissner, a Certified Specialist in Hypnosis and Pain Management through the American Hypnosis Association — and there will be relief after every session.',
    detail: {
      heading: 'Yes, we can reduce the pain you are experiencing',
      paras: [
        'Hypnotherapy for chronic and acute pain with Jason Meissner, a Certified Specialist in Hypnosis and Pain Management through the American Hypnosis Association.',
        // #104: his own continuation of this sentence.
        'There will be relief after every session, and together we build a result that is personally sustainable — comfort you can keep, created by you during the hypnotherapy session.',
      ],
    },
  },
  {
    slug: 'ibs',
    // #5, #11, #35, #44: "Gut Directed is made up… I work with IBS and
    // fibromyalgia. Remove all gut directed references."
    name: 'IBS & Fibromyalgia',
    category: 'Specialties',
    summary: 'Hypnotherapy for IBS and fibromyalgia. Jason has always had great success with IBS.',
    price: 200,
    priceQualifier: 'per session',
    answer:
      'Pasadena Hypnosis works with IBS and fibromyalgia. Jason Meissner has always had great success with IBS — you will find relief after every session, and together we establish your ability to maintain that comfort on your own.',
    detail: {
      heading: 'Great success with IBS and fibromyalgia',
      paras: [
        'Jason Meissner has always had great success with IBS, and works with fibromyalgia as well.',
        'You will find relief after every session, and together we establish your ability to maintain the comfort on your own.',
      ],
    },
    quote: {
      text: 'I met Jason three years ago while dealing with persistent IBS. I had tried and seen every doctor in the book… Through several hypnosis sessions, I was finally able to regain my life back.',
      by: 'A.G.',
    },
  },
  {
    slug: 'grief-and-loss',
    name: 'Grief & Loss',
    category: 'Specialties',
    // #12 "PLEASE FIX". #45 "Delete everything after the first sentence."
    summary: 'Hypnotherapy for grief and loss — a place to find your peace again.',
    price: 200,
    priceQualifier: 'per session',
    answer: 'Pasadena Hypnosis offers hypnotherapy for grief and loss — one of Jason Meissner’s most requested areas of work.',
    detail: {
      heading: 'Find your peace',
      paras: [
        'Hypnotherapy for grief and loss, at your own pace.',
        'We can find that whole and fearless self at the center of peace and strength that is already there inside us.',
      ],
    },
  },
  {
    slug: 'hypnotherapy-sessions',
    name: 'Hypnotherapy Sessions',
    category: 'Sessions',
    // #14: "It is a 60 minute session. No other wording is here is valuable."
    summary: 'A 60-minute hypnotherapy session, specifically designed for you.',
    price: 200,
    priceQualifier: 'per session',
    tag: 'Most booked',
    answer:
      'A Hypnotherapy Session with Jason Meissner is 60 minutes, specifically designed for you. We can discuss your specific needs before your session.',
    detail: {
      heading: 'Specifically designed for you',
      paras: [
        'Hypnotherapy allows you to strengthen what you want in your life and to gain freedom from what should be released. It allows us to curate the impact and results of thoughts.',
        'All charges are the same in the office or online.',
      ],
    },
  },
  {
    slug: 'online-hypnotherapy',
    name: 'Online Hypnotherapy',
    category: 'Sessions',
    // #15 "I do online sessions with people anywhere. Remove everything else."
    // #47 "anywhere. Delete everything after Meissner."
    summary: 'Online hypnotherapy sessions with clients anywhere.',
    price: 200,
    priceQualifier: 'per session',
    answer: 'Pasadena Hypnosis offers complete hypnotherapy sessions online for clients anywhere, led by Jason Meissner.',
    detail: {
      heading: 'Hypnotherapy online at your convenience',
      paras: [
        'Hypnotherapy is 100% effective online or over the phone. Save drive time and fuel.',
        'Find a quiet spot where you will be undisturbed for 1 hour and we can take care of it from the comfort of your home, wherever you are.',
      ],
    },
  },
  {
    slug: 'discovery-call',
    name: 'Free Discovery Call',
    category: 'Sessions',
    // #16 "Delete everything after the -".
    summary: 'A free call to talk through your situation before committing to a paid session.',
    price: 0,
    priceQualifier: 'free',
    tag: 'Free',
    answer:
      'The Free Discovery Call is a conversation with Jason Meissner to talk through your situation before you book a hypnotherapy session. We can discuss what you need and what we can accomplish together.',
    detail: {
      heading: 'Talk it through first',
      paras: [
        'A free call with Jason to talk through your situation before you book a session.',
        'We can discuss what you need and what we can accomplish together, so you know what to expect before you begin.',
      ],
    },
  },
  {
    slug: 'childhood-stress-anxiety',
    name: 'Childhood Stress & Anxiety',
    category: 'Specialties',
    // #17 "AI talking to itself". #48 "Get rid of the location junk and
    // everything after my name."
    summary: 'Kids respond quickly to hypnotherapy. Parents are of course welcome to observe and participate.',
    price: 200,
    priceQualifier: 'per session',
    answer: 'Pasadena Hypnosis offers hypnotherapy for childhood stress and anxiety, led by Jason Meissner.',
    detail: {
      heading: 'Kids respond quickly to hypnotherapy',
      paras: [
        'Hypnotherapy for stress and anxiety in children, led by Jason Meissner.',
        'Parents are of course welcome to observe and participate.',
      ],
    },
  },
  {
    slug: 'testing-and-academic-performance',
    name: 'Testing and Academic Performance',
    category: 'Performance',
    // #18 "pointless terrible text". #49 "Get rid of everything after
    // Performance. Or do FAR better!" — the better version is his own page.
    summary: 'Express your excellence and rise to the challenge. Let’s get your mind in order ahead of time.',
    price: 200,
    priceQualifier: 'per session',
    answer:
      'Pasadena Hypnosis offers hypnotherapy for testing and academic performance. Jason helps you express your excellence and rise to the challenge — the more preparation the better, so let’s get your mind in order ahead of time.',
    detail: {
      heading: 'Express your excellence',
      paras: [
        'Jason helps you express your excellence and rise to the challenge.',
        'The more preparation the better. Let’s get your mind in order ahead of time.',
        'Memorization techniques and large project help available if needed.',
      ],
    },
  },
  {
    slug: 'sports-performance',
    name: 'Sports Performance Hypnosis',
    category: 'Performance',
    summary: 'Most athletics is a mental game. Get yours in order or fall behind.',
    price: 200,
    priceQualifier: 'per session',
    // #106, verbatim but for one full stop turned into a comma.
    heroLede:
      'If you are putting in the effort, all that is left is the mental game. We can help you find that flow state excellence on purpose.',
    // #50 "Get rid of everything after performance. It is repetitive garbage!"
    // #107 "This needs text I can provide." — the second sentence is his own,
    // from #111: "I have helped high school, college and pro athletes manage
    // those demands in life, while find their best."
    answer:
      'Pasadena Hypnosis offers sports performance hypnosis. Jason Meissner has helped high school, college and pro athletes manage the demands of competition and life while finding their best.',
    detail: {
      heading: 'Most athletics is a mental game',
      paras: [
        'Get yours in order or fall behind.',
        'You will normally see immediate results, and you keep them with your practice at home. Just like body fitness, mental fitness takes effort.',
      ],
    },
  },
];

/** The order the header menu groups SERVICES by `category`. */
export const CATEGORY_ORDER = ['Specialties', 'Sessions', 'Performance'];

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

/* Markup #15, #21, #28, #33, #85: online sessions reach clients anywhere. */
export const ONLINE_AREA = 'Online — anywhere';

/**
 * The three steps. Markup #21-#24: no cost in step two, no "six to eight
 * sessions" and no "you will know roughly where you stand" in step three.
 */
export const STEPS = [
  {
    n: '01',
    title: 'A free discovery call',
    body: 'Talk through your situation with Jason directly, and discuss what you need and what we can accomplish together.',
  },
  {
    n: '02',
    title: 'Your first session',
    body: 'Online with clients anywhere, or in person at the office in South Pasadena.',
  },
  {
    n: '03',
    title: 'Relief, session by session',
    body: 'There is no set number of sessions. With hypnotherapy you experience great relief, normally every session.',
  },
];

/**
 * Rendered by the accordion AND by the FAQPage JSON-LD from this same array —
 * they cannot drift. Rewritten 2026-10-01 from the client's markup:
 *   - the insurance / HSA-FSA question is gone (#61, #67 "remove all of this
 *     HSA AND FSA CARD STUFF ACROSS THE WHOLE SITE");
 *   - "Does Pasadena Hypnosis treat conditions other hypnotherapists turn
 *     down?" is gone (#84 "Delete this section completely");
 *   - the replacement-for-medical-care answer stays here and only here (#80
 *     "This is where this belongs"), minus "complementary" (#55);
 *   - the sessions answer is the client's own text (#81), and the
 *     credentials answer loses its last sentence (#83).
 * Keep that question out of FAQS.slice(0, 4): the homepage and service pages
 * show the first few, and #80 says it must not appear on any other page.
 */
export const FAQS = [
  {
    q: 'What does a hypnotherapy session with Pasadena Hypnosis cost?',
    a: 'Hypnotherapy sessions with Jason Meissner are $200 each, and all charges are the same in the office or online. Smoking cessation is $400. A free discovery call comes first, so you can talk through your situation before you book.',
  },
  {
    q: 'Does hypnosis actually work for quitting smoking?',
    a: 'Yes. You have to want to quit for real, and that is all. Jason Meissner is a Certified Specialist in Hypnosis and Smoking Cessation through the American Hypnosis Association.',
  },
  {
    q: 'What conditions does Pasadena Hypnosis treat?',
    a: 'Jason Meissner works with stress and anxiety, depression and bipolar disorder, chronic and acute pain, IBS and fibromyalgia, grief and loss, and smoking cessation, along with childhood stress and anxiety, testing and academic performance, and sports performance. He completed a year of accredited training and supervised residency at the Hypnosis Motivation Institute and has practiced for a decade.',
  },
  {
    q: 'Is hypnotherapy available online, or only in South Pasadena?',
    a: 'Both. Jason sees clients in person at 1910 Huntington Dr in South Pasadena, and online with clients anywhere. Hypnotherapy is 100% effective online or over the phone — save drive time and fuel, find a quiet spot where you will be undisturbed for 1 hour, and we can take care of it from the comfort of your home. All charges are the same in the office or online.',
  },
  {
    q: 'How many hypnotherapy sessions does it typically take?',
    a: 'This totally depends on what the issue is we are working with. We can discuss how many sessions according to what you need and what we can accomplish during the discovery call before you begin.',
  },
  {
    q: 'Is hypnotherapy a replacement for medical or psychiatric treatment?',
    a: 'No. Most clients are already under the care of a doctor, psychiatrist or chiropractor, and hypnotherapy works alongside that care rather than replacing it. Jason Meissner is a certified hypnotherapist, not a licensed medical or mental-health clinician, and he frames every session that way: as one part of a client\'s broader care, not a substitute for it.',
  },
  {
    q: 'What are Jason Meissner\'s credentials as a hypnotherapist?',
    a: 'Jason Meissner holds a Diploma in Clinical Hypnotherapy with Honors from the Hypnosis Motivation Institute, a nationally accredited hypnotherapy college, awarded October 8 2016. He also holds four American Hypnosis Association specialist certifications — Pain Management, Smoking Cessation, Sports Performance, and ADD-ADHD — and has practiced in South Pasadena for a decade.',
  },
  {
    q: 'How do I book an appointment with Pasadena Hypnosis?',
    a: 'Book directly online or call (626) 616-0143. A free discovery call is available first for anyone who wants to talk through their situation before booking a session. Sessions are available both in person at the South Pasadena office and online for clients anywhere.',
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
  // No 'California' entry: the client works online with clients anywhere (#85).
  const areas = [...SERVICE_AREAS];

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
