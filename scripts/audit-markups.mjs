/**
 * Markup round one — rendered-site audit (2026-10-01).
 *
 * Fetches every route from a running server and checks the visible text and
 * the JSON-LD against the client's site-wide rules from docs/markup-round-one.md.
 * Run against `npm run dev` or `npm start`:
 *
 *   node scripts/audit-markups.mjs http://localhost:3000
 *
 * Exit code 1 if any rule fails.
 */
const base = (process.argv[2] || 'http://localhost:3000').replace(/\/$/, '');

const SERVICES = [
  'depression-bipolar-support', 'stress-and-anxiety', 'smoking-cessation', 'chronic-pain', 'ibs',
  'grief-and-loss', 'childhood-stress-anxiety', 'hypnotherapy-sessions', 'online-hypnotherapy',
  'discovery-call', 'testing-and-academic-performance', 'sports-performance',
];
const AREAS = ['pasadena', 'south-pasadena', 'glendale', 'eagle-rock', 'arcadia'];
const ROUTES = [
  '/', '/services', '/pricing', '/our-team', '/faq', '/blog', '/contact', '/about', '/book', '/service-areas',
  '/privacy', '/terms', '/editorial-policy',
  ...SERVICES.map((s) => `/services/${s}`),
  ...AREAS.map((a) => `/service-areas/${a}`),
];

/* [label, regex, markup comment numbers] — checked against visible text AND JSON-LD. */
const BANNED = [
  ['diagnosed', /diagnos/i, '#2 #75 #98'],
  ['disabling', /disabling/i, '#3 #33'],
  ['statewide', /state-?wide/i, '#7 #33'],
  ['California', /California/i, '#7 #33 #85'],
  ['complementary', /complementary|complimentary/i, '#32 #55'],
  ['gut-directed', /gut[- ]directed|gut-brain/i, '#5 #11 #44'],
  ['6-8 sessions', /\b6\s*[-–]\s*8\b|six to eight/i, '#9 #23 #56 #60'],
  ['HSA/FSA', /\bHSA\b|\bFSA\b/, '#61 #67'],
  ['specialisms', /specialism/i, '#8 #69 #71'],
  ['military time', /\b(1[3-9]|2[0-3]):[0-5]\d\b/, '#30'],
  ['other practices/hypnotherapists', /other practices|other hypnotherapists|most hypnotherapists|hypnotherapists decline|turn away|turn down|decline outright|lighter work|stop at phobias/i, '#1 #25 #40 #54 #68 #75'],
  ['high-close', /high-close/i, '#92'],
  ['Past Life Regression', /past[- ]life/i, '#19 #51'],
  ['Group program', /group hypnotherapy|group programme|cohort/i, '#13 #46 #65'],
  ['service count', /\b(14|fourteen|twelve)\s+services\b|all\s+\d+\s+services|\d+\s+services/i, '#64 #74'],
  ['Call 2 brief', /call 2|per the brief/i, '#12'],
  ['not everyday nerves', /everyday nerves/i, '#41'],
  ['post-surgical', /post-surgical/i, '#10 #43'],
  ['On your call', /on your call/i, '#58'],
];

/* The scope-note sentence may appear ONLY on /our-team (#73) and /faq (#80). */
const SCOPE = /not a licensed medical or mental-health clinician/i;
const SCOPE_ALLOWED = new Set(['/our-team', '/faq']);
const DISCLAIMER =
  'Pasadena Hypnosis is a hypnotherapy practice, Jason Meissner is a certified hypnotherapist. Hypnotherapy is not a substitute for medical or psychiatric care.';
const TAGLINE = 'Certified hypnotherapy, let us know how we can help.';

const decode = (s) =>
  s.replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&#x27;|&#39;/g, "'").replace(/&quot;/g, '"')
    .replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&rsquo;/g, '’').replace(/&mdash;/g, '—')
    .replace(/&middot;/g, '·').replace(/&ldquo;|&rdquo;/g, '"');

const visibleText = (html) =>
  decode(
    html
      .replace(/<script[\s\S]*?<\/script>/gi, ' ')
      .replace(/<style[\s\S]*?<\/style>/gi, ' ')
      .replace(/<[^>]+>/g, ' '),
  ).replace(/\s+/g, ' ');

const ldJson = (html) =>
  [...html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].map((m) => m[1]).join(' ');

/* Schema's machine-only opening hours are required in 24h form. */
const stripSchemaHours = (s) => s.replace(/"(opens|closes)":"\d\d:\d\d"/g, '');

let failures = 0;
const fail = (route, msg) => {
  failures++;
  console.log(`FAIL ${route}: ${msg}`);
};

for (const route of ROUTES) {
  const res = await fetch(base + route);
  if (res.status !== 200) {
    fail(route, `HTTP ${res.status}`);
    continue;
  }
  const html = await res.text();
  const text = visibleText(html);
  const ld = stripSchemaHours(ldJson(html));
  for (const [label, re, refs] of BANNED) {
    const m = text.match(re) || ld.match(re);
    if (m) {
      const src = text.match(re) ? text : ld;
      const i = src.search(re);
      fail(route, `${label} (${refs}): …${src.slice(Math.max(0, i - 60), i + 60)}…`);
    }
  }
  if (SCOPE.test(text) && !SCOPE_ALLOWED.has(route)) fail(route, 'scope note outside /our-team and /faq (#73, #80)');
  if (!text.includes(DISCLAIMER)) fail(route, 'footer disclaimer missing or altered (#77)');
  if (!text.includes(TAGLINE)) fail(route, 'footer tagline missing (#78)');
}

/*
 * PER-COMMENT CHECKS — one row per markup comment, on the page it was pinned
 * to: [number, route, text that must be gone, text that must be present].
 * Text is matched against the page's visible text, or the raw HTML for a
 * needle prefixed 'html:' (collapsed FAQ answers and image paths are not
 * visible text). Still open, so not asserted: #82 (more HMI
 * diplomas), #102 (Mr. Butts image or no Mr. Butts), #110 (booking that takes
 * payment). Round two (#102–#113) is in
 * docs/markup-round-two.md.
 */
const T = TAGLINE;
const D = DISCLAIMER;
const PER_COMMENT = [
  [1, '/', ['The usual hypnotherapy menu', 'Most hypnotherapists stop at phobias'], ['The world and pressures around us can keep us from remembering']],
  [2, '/', ['Diagnosed depression'], ['Depression & bipolar disorder']],
  [3, '/', ['Disabling anxiety', 'Not everyday nerves'], ['Getting your mind in order is a process we can take care of.']],
  [4, '/', ['Worked alongside ongoing medical care'], ['Yes, we can reduce the pain you are experiencing.']],
  [5, '/', ['For IBS and other gut-brain conditions'], ['IBS and fibromyalgia']],
  [6, '/', ['The proven, high-close service'], ['Mr. Butts doesn’t own you anymore!']],
  [7, '/', ['by video statewide'], ['in person or online anywhere']],
  [8, '/', ['ranked the way the practice ranks them'], []],
  [9, '/', ['A proven, high-close service'], ['My method turns craving into a victory trigger.']],
  [10, '/', ['post-surgical pain'], ['Chronic and Acute Pain']],
  [11, '/', ['Gut-directed hypnotherapy for IBS'], ['IBS & Fibromyalgia']],
  [12, '/', ['per the Call 2 brief'], ['a place to find your peace again']],
  [13, '/', ['Group Hypnotherapy Program', 'cohort'], []],
  [14, '/', ['60-90 minute'], ['A 60-minute hypnotherapy session, specifically designed for you.']],
  [15, '/', ['available anywhere in California'], ['Online hypnotherapy sessions with clients anywhere.']],
  [16, '/', ['a real, currently-live booking option'], ['A free call to talk through your situation before committing to a paid session.']],
  [17, '/', ['a real page on the live site'], ['Kids respond quickly to hypnotherapy.']],
  [18, '/', ['San Marino / Arcadia gap'], ['Express your excellence and rise to the challenge.']],
  [19, '/', ['Past Life Regression'], []],
  [20, '/', ['Quiet, unclinical, and an hour at a time'], []],
  [21, '/', ['online by video anywhere in California'], ['Online with clients anywhere, or in person at the office in South Pasadena.']],
  [22, '/', ['$200, in person at 1910'], []],
  [23, '/', ['six to eight sessions'], ['There is no set number of sessions.']],
  [24, '/', ['you will know roughly where you stand'], []],
  [25, '/', ['cases many hypnotherapists decline'], []],
  [26, '/', ['not a licensed medical or mental-health clinician'], []],
  [27, '/', ['Reviewer names are greyed out'], ['Screenshots of the practice’s own Google reviews.']],
  [28, '/', ['or by video statewide'], ['In the office in South Pasadena, or online anywhere.']],
  [29, '/', ['In the room in South Pasadena'], []],
  [30, '/', ['21:00'], ['10:00 AM - 9:00 PM']],
  [31, '/', [], ['Also reviewed on Yelp and more']],
  [32, '/', ['complementary'], [D]],
  [33, '/services', ['diagnosed depression', 'disabling anxiety', 'online statewide'], ['chronic and acute pain, IBS and fibromyalgia']],
  [34, '/services', ['The work Jason leads with, and the reason most clients find this practice.', 'On your call'], []],
  [35, '/services', ['Gut-Directed'], ['IBS & Fibromyalgia']],
  [36, '/services', ['html:svc-acc'], []],
  [37, '/services', ['Ongoing conditions, usually alongside existing medical or psychiatric care.'], []],
  [38, '/services', ['Structured work with a defined shape rather than open-ended sessions.'], []],
  [39, '/services', ['The same work by video, anywhere in California.'], []],
  [40, '/services', ['conditions most hypnotherapists decline outright'], []],
  [41, '/services', ['not everyday nerves'], []],
  [42, '/services', ['proven, high-close service'], ['We turn your habit into a lifelong trigger for peace, confidence and victory.']],
  [43, '/services', ['as a complement to your existing medical care'], ['Yes, we can reduce the pain you are experiencing.']],
  [44, '/services', ['clinical term for hypnotherapy targeting IBS'], ['Pasadena Hypnosis works with IBS and fibromyalgia.']],
  [45, '/services', ['alongside chronic pain and diagnosed depression'], ['Pasadena Hypnosis offers hypnotherapy for grief and loss — one of Jason Meissner’s most requested areas of work.']],
  [46, '/services', ['Group Hypnotherapy Program'], []],
  [47, '/services', ['online for clients anywhere in California'], ['Pasadena Hypnosis offers complete hypnotherapy sessions online for clients anywhere, led by Jason Meissner.']],
  [48, '/services', ['childhood stress and anxiety in South Pasadena, CA, led by'], ['Pasadena Hypnosis offers hypnotherapy for childhood stress and anxiety, led by Jason Meissner.']],
  [49, '/services', ['academic performance in South Pasadena and the greater'], ['express your excellence']],
  [50, '/services', ['sports performance hypnosis in South Pasadena and the greater'], ['Pasadena Hypnosis offers sports performance hypnosis.']],
  [51, '/services', ['Past Life Regression'], []],
  [52, '/services', ['You do not have to pick the right one first'], []],
  [53, '/services', ['The discovery call exists for exactly this'], ['Call us with whatever you need help with.']],
  [54, '/services', ['conditions other practices turn away'], [T]],
  [55, '/services', ['complementary'], [D]],
  [56, '/pricing', ['six to eight sessions depending'], []],
  [57, '/pricing', ['Self-pay · HSA/FSA'], []],
  [58, '/pricing', ['On your call'], ['smoking cessation is $400']],
  [59, '/pricing', ['Figure confirmed on your call', '90-minute'], []],
  [60, '/pricing', ['Typically six to eight sessions'], []],
  [61, '/pricing', ['HSA/FSA cards accepted'], []],
  [62, '/pricing', ['Most clients engage for 6-8 sessions'], ['Hypnotherapy allows you to strengthen what you want in your life']],
  [63, '/pricing', ['Gut-Directed Hypnotherapy'], ['IBS & Fibromyalgia']],
  [64, '/pricing', ['All 14 services'], ['The price of each service, in one place.']],
  [65, '/pricing', ['Group Hypnotherapy Program'], []],
  [66, '/pricing', ['confirmed on your free discovery call'], ['I’m ready to quit smoking']],
  [67, '/pricing', ['HSA/FSA-friendly'], []],
  [68, '/our-team', ['hypnotherapists decline'], []],
  [69, '/our-team', ['specialisms'], ['Four specialist certifications, then the diploma']],
  [70, '/our-team', ['Dated in the order the documents themselves are dated'], []],
  [71, '/our-team', ['specialisms came first'], []],
  [72, '/our-team', ['the accredited diploma completed that October'], []],
  [73, '/our-team', [], ['A certified hypnotherapist is not a licensed medical or mental-health clinician.']],
  [74, '/our-team', ['in total'], ['The work Jason leads with.']],
  [75, '/our-team', ['diagnosed', 'decline these cases outright'], []],
  [76, '/our-team', ['html:svc-quit-smoking.jpg', 'high-close'], ['html:blog-flower-or-cigarettes.jpg']],
  [77, '/our-team', [], [D]],
  [78, '/our-team', ['conditions other practices turn away'], [T]],
  [79, '/faq', ['For anything not covered here, call the office.'], ['Don’t hesitate to call with any questions you might have.']],
  [80, '/faq', [], ['html:Is hypnotherapy a replacement for medical or psychiatric treatment?']],
  [81, '/faq', ['html:Most clients work with Jason Meissner for 6-8 sessions'], ['html:This totally depends on what the issue is we are working with.']],
  [83, '/faq', ['html:reproduced on this page rather than merely claimed'], []],
  [84, '/faq', ['html:conditions other hypnotherapists turn down'], []],
  [85, '/faq', ['html:online for clients anywhere in California'], ['html:online for clients anywhere.']],
  [86, '/faq', ['conditions other practices turn away'], [T]],
  [87, '/faq', ['complementary'], [D]],
  [88, '/blog', [], ['Jason is writing these himself']],
  [89, '/contact', ['conditions other practices turn away'], [T]],
  [90, '/contact', ['complementary'], [D]],
  [91, '/contact', ['Several other practitioners work out of the same building'], []],
  [92, '/services/smoking-cessation', ['high-close'], ['We turn your habit into a lifelong trigger']],
  [93, '/services/smoking-cessation', ['not a licensed medical or mental-health clinician'], []],
  [94, '/services/smoking-cessation', ['A proven, high-close service'], ['The last money you’ll ever spend on cigarettes', 'Quitting your way']],
  [95, '/services/smoking-cessation', ['Your first session'], ['One-Session Quit Day']],
  [96, '/services/smoking-cessation', ['six to eight sessions', 'Relief, session by session'], ['Two-Session Package']],
  [97, '/services/smoking-cessation', ['Same work, same rate'], ['In person at 1910 Huntington Dr in South Pasadena, or by video anywhere.']],
  [98, '/services/smoking-cessation', ['diagnosed'], []],
  [99, '/services/stress-and-anxiety', ['disabling-level', 'not everyday nerves'], ['Don’t continue to suffer as a slave to a mind']],
  [100, '/services/stress-and-anxiety', ['What booking this actually involves'], ['Stress and anxiety are a mind lost and overworking itself']],
  [101, '/services/stress-and-anxiety', ['not a licensed medical or mental-health clinician'], []],
  // Round two (2026-10-07).
  [103, '/services/smoking-cessation', ['Two Ways to Win'], ['Quitting your way', 'About 60% of clients choose one session', 'No price change', 'This is very rarely used']],
  [104, '/services/chronic-pain', [], ['comfort you can keep, created by you during the hypnotherapy session.']],
  [105, '/blog', ['html:svc-gut-ibs'], ['html:svc-session-armchairs']],
  [106, '/services/sports-performance', [], ['all that is left is the mental game. We can help you find that flow state excellence on purpose.']],
  [107, '/services/sports-performance', [], ['high school, college and pro athletes']],
  [108, '/', ['html:w-[19rem] flex-shrink-0'], ['html:sm:grid-cols-2 lg:grid-cols-3']],
  [109, '/', ['html:svc-gut-ibs'], ['html:svc-session-armchairs']],
  [111, '/services', ['Jason Meissner specializes in'], ['students preparing for the BAR exam', 'high school, college and pro athletes']],
  [112, '/contact', [], ['html:maps.google.com/maps?q=1910+Huntington+Dr']],
  [113, '/', [], ['Your Best Choice for Certified Hypnotherapy in Pasadena, CA']],
];

const pageCache = new Map();
const getPage = async (route) => {
  if (!pageCache.has(route)) {
    const html = await (await fetch(base + route)).text();
    pageCache.set(route, { html: decode(html), text: visibleText(html) });
  }
  return pageCache.get(route);
};
let checked = 0;
for (const [n, route, gone, present] of PER_COMMENT) {
  const { html, text } = await getPage(route);
  const has = (needle) => (needle.startsWith('html:') ? html.includes(needle.slice(5)) : text.includes(needle));
  for (const g of gone) if (has(g)) fail(route, `#${n} still shows "${g}"`);
  for (const p of present) if (!has(p)) fail(route, `#${n} is missing "${p}"`);
  checked++;
}
console.log(`Per-comment checks: ${checked} of 113 comments asserted (#82, #102, #110 still open).`);

for (const gone of ['/services/past-life-regression', '/services/group-hypnotherapy-program']) {
  const res = await fetch(base + gone);
  if (res.status !== 404) fail(gone, `expected 404 for a removed offering, got ${res.status}`);
}

console.log(failures ? `\n${failures} failure(s)` : `\nAll ${ROUTES.length} routes pass every rule.`);
process.exit(failures ? 1 : 0);
