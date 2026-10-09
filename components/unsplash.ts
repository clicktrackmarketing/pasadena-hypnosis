/* ---------------------------------------------------------------------------
   Atmospheric / editorial imagery — Unsplash, downloaded 2026-09-16.

   DELIBERATELY SEPARATE FROM ./assets.ts. Everything in assets.ts is a REAL
   client asset with a traceable source (the practice's Wix media library, its
   Google Business Profile, its own certificates and review screenshots). This
   file is stock photography and nothing in it is evidence of anything about
   this practice.

   THE RULE THAT GOVERNS THIS FILE, and it is not a style preference:
   no image here may ever stand in for a person, a room, a credential or a
   client outcome belonging to Pasadena Hypnosis. The practitioner is a real,
   named, identifiable person and the office is a real address — dropping a
   stock headshot into the practitioner slot or a stock interior into the
   office slot would be a straightforward misrepresentation, and a prospect who
   walked in and saw a different room would be right to feel misled.

   PORTRAIT and OFFICE_INTERIOR in ./assets.ts remain the only pictures of the
   practitioner and the practice, and no redesign has touched them.

   REVISED 2026-09-17. The first version of this set was all weather and
   landscape — misty water, dawn ridges, pine trees — chosen to avoid stock
   models performing their symptoms. Reviewed against the actual pages, it
   read as a meditation-app mood board rather than a hypnotherapy practice, and
   a visitor scanning the services grid could not tell what any card was about.
   The subject matter is now the work itself: consulting rooms, a therapist and
   client talking, a paced phone call, hands held across a table.

   SO PEOPLE APPEAR IN THESE FRAMES NOW, and the honesty rule tightens rather
   than relaxes to compensate:

     1. Every alt string below describes WHAT IS IN THE FRAME and names nobody.
        Not "Jason with a client", not "a Pasadena Hypnosis session" — "a
        therapist and client talking in a consulting room". The people in these
        photographs are models; the page never implies otherwise.
     2. These are TOPIC ILLUSTRATIONS on service cards and page headers. None
        is captioned as this practice, this room, or this client.
     3. Where a page asserts something about the practice — the practitioner,
        the office, the certificates, the reviews — it uses ./assets.ts, and
        nothing from this file is permitted in those slots.

   A card showing a stranger in a consulting room is a picture of the kind of
   work on offer. A stranger in the practitioner slot would be a lie. The
   distinction is the whole of the policy.

   Files are served from /public rather than hotlinked off images.unsplash.com:
   a launch-track site should not have its hero depend on a third-party CDN
   staying up, and local files let the browser cache them on our own headers.
   Each was pulled at the width it is actually displayed at, q=72.

   Unsplash licence allows commercial use without permission or credit;
   photographer names are recorded anyway so the client can credit them if they
   choose, and so a future editor can find the original.
--------------------------------------------------------------------------- */

export type StockImage = {
  src: string;
  /** Written for a screen reader: what is in the frame, nothing implied about the practice. */
  alt: string;
  credit: string;
};

const u = (file: string) => `/assets/unsplash/${file}`;

/** HERO. Still water under low fog — the calmest frame in the set, and dark
    enough at the top edge to carry white display type over a scrim. */
export const HERO_STILL_WATER: StockImage = {
  src: u('hero-still-water.jpg'),
  alt: 'Still water disappearing into low fog, with no horizon line visible.',
  credit: 'Noorulabdeen Ahmad / Unsplash',
};

/** Specialties band. Tall pines, light falling between them. */
export const PINE_FOREST: StockImage = {
  src: u('pine-forest-light.jpg'),
  alt: 'Tall pine trees photographed from below with soft daylight between the trunks.',
  credit: 'pine watt / Unsplash',
};

/**
 * One image per service, KEYED BY SLUG rather than positioned by index.
 *
 * The index-based version of this map lasted exactly one page. SERVICES is an
 * ordered priority list that the brief expects to be re-ranked, and an array
 * lookup means re-ranking silently swaps the photographs — putting the night
 * sky on smoking cessation and the dawn ridge on past-life regression, with
 * nothing failing and no test catching it. The slug is the stable key.
 *
 * SELECTION RULE: each card shows the WORK, or the thing the work is about,
 * closely enough that a visitor scanning the grid can tell the cards apart
 * without reading them. Consulting rooms and sessions where the service is a
 * format (standard sessions, group, online, the discovery call); the subject
 * where the service is a condition (pain, gut, grief, smoking).
 *
 * The one line held from the previous, all-landscape version: a card must not
 * be a model performing anguish for the camera. Head-in-hands stock sells the
 * symptom back to someone already living it. The anxiety card is a person at a
 * desk with their head resting on their hand; the pain card is a hand at the
 * back of a neck. Recognisable, not theatrical.
 */
export const SERVICE_IMAGE_BY_SLUG: Record<string, StockImage> = {
  'depression-bipolar-support': {
    src: u('svc-depression-counseling.jpg'),
    alt: 'A therapist listening to a client during a counselling session.',
    credit: 'Vitaly Gariev / Unsplash',
  },
  'stress-and-anxiety': {
    src: u('svc-anxiety-stress.jpg'),
    alt: 'A person sitting at a desk with their head resting on one hand.',
    credit: 'Elisa Ventur / Unsplash',
  },
  'smoking-cessation': {
    /* Markup #76: the old frame (a hand holding a lit cigarette) was
       "terrible", so it became a summit at sunrise. Replaced 2026-10-09 with a
       smoking-related frame that still shows no one smoking: a flower offered
       beside a cigarette pack — the choice to quit. Downloaded from
       unsplash.com/photos/557xkSmNZ1g at 1100px, q=72. */
    src: u('blog-flower-or-cigarettes.jpg'),
    alt: 'One hand offering a yellow flower beside another hand holding a pack of cigarettes.',
    credit: 'Shubhro Jyoti Dey / Unsplash',
  },
  'chronic-pain': {
    src: u('svc-chronic-pain.jpg'),
    alt: 'A person reaching a hand to the back of their neck and shoulder.',
    credit: 'Klara Kulikova / Unsplash',
  },
  ibs: {
    /* Markup #105, #109: the old frame (hands held against a stomach) had to
       go — "I would like to remove this photo in place of anything else."
       IBS and fibromyalgia are pain conditions, so the card shows the work —
       a calm one-to-one session — rather than the symptom. Downloaded
       2026-10-08 from unsplash.com/photos/lVEteug2d30 at 1100px, q=72. */
    src: u('svc-session-armchairs.jpg'),
    alt: 'A practitioner and a client talking in armchairs in a bright, quiet room.',
    credit: 'Vitaly Gariev / Unsplash',
  },
  'grief-and-loss': {
    src: u('svc-grief-hands.jpg'),
    alt: 'Two people holding hands across a table.',
    credit: 'Priscilla Du Preez / Unsplash',
  },
  'hypnotherapy-sessions': {
    src: u('svc-session-couch.jpg'),
    alt: 'A practitioner and a client talking, seated across from each other.',
    credit: 'Vitaly Gariev / Unsplash',
  },
  'online-hypnotherapy': {
    src: u('svc-online-video.jpg'),
    alt: 'A video consultation in progress on a laptop screen.',
    credit: 'Vitaly Gariev / Unsplash',
  },
  'discovery-call': {
    src: u('svc-phone-call.jpg'),
    alt: 'A hand holding the receiver of a telephone.',
    credit: 'Wesley Hilario / Unsplash',
  },
  'childhood-stress-anxiety': {
    /* A session, not a distressed child. The frame shows the help rather than
       the symptom — for a service whose clients are minors, that distinction
       is the difference between reassuring a parent and unsettling one. */
    src: u('svc-child-therapy.jpg'),
    alt: 'A practitioner talking with a young person seated on a couch.',
    credit: 'Vitaly Gariev / Unsplash',
  },
  'testing-and-academic-performance': {
    src: u('svc-student-desk.jpg'),
    alt: 'A student sitting beside a blackboard covered in equations.',
    credit: 'Vitaly Gariev / Unsplash',
  },
  'sports-performance': {
    src: u('svc-runner-silhouette.jpg'),
    alt: 'A runner in silhouette on a rocky trail against a low sun.',
    credit: 'Venti Views / Unsplash',
  },
};

/** Fallback keeps a new service renderable before anyone picks it a picture. */
export const serviceImage = (slug: string): StockImage =>
  SERVICE_IMAGE_BY_SLUG[slug] ?? {
    src: u('svc-session-couch.jpg'),
    alt: 'A practitioner and a client talking, seated across from each other.',
    credit: 'Vitaly Gariev / Unsplash',
  };

/** How-it-works ground. Pale, abstract, almost invisible at 12% opacity — it
    is there to stop a large tinted block reading as flat, not to be looked at. */
export const TEXTURE_FLOW: StockImage = {
  src: u('texture-white-flow.jpg'),
  alt: '',
  credit: 'Yue Ma / Unsplash',
};

/** Quote band. Blue and white smoke on dark — the one frame in the set that
    nods at the subject matter without illustrating a trance, which would be
    both kitsch and a clinical claim. */
export const BLUE_SMOKE: StockImage = {
  src: u('band-blue-smoke.jpg'),
  alt: '',
  credit: 'Marek Piwnicki / Unsplash',
};

/** Service-areas strip. Pasadena City Hall — the one genuinely local frame,
    and a real landmark rather than a generic suburb. */
export const PASADENA_CITY_HALL: StockImage = {
  src: u('pasadena-city-hall.jpg'),
  alt: 'Pasadena City Hall, its dome and arched entrance framed by palm trees under a clear sky.',
  credit: 'Liosha Shyp / Unsplash',
};

/** Final CTA. Open water and sky, reading as room to breathe. */
export const OPEN_WATER: StockImage = {
  src: u('cta-open-water.jpg'),
  alt: '',
  credit: 'Thomas Vimare / Unsplash',
};

/** Breathing section. Anonymous hands resting on legs — no face, so it
    illustrates a posture rather than impersonating a client. */
export const HANDS_RESTING: StockImage = {
  src: u('hands-resting-outdoors.jpg'),
  alt: "A person's hands resting open on their legs while sitting outdoors.",
  credit: 'Zulfugar Karimov / Unsplash',
};

/** Spare, used behind the reviews rail. */
export const FOG_FOREST: StockImage = {
  src: u('fog-forest-aerial.jpg'),
  alt: '',
  credit: 'Zachary Domes / Unsplash',
};

/* -------------------------------------------------------------------------
   INNER-PAGE HEROES. One per route, so no two pages open on the same frame —
   a site where every hero is the same photograph at a different crop reads as
   a template, which is the specific impression this practice cannot afford.
   ------------------------------------------------------------------------- */

/*
 * REPOINTED 2026-09-17 with the service cards. The hub and about heroes were
 * a woodland path and a garden stream — pleasant, and they told a visitor
 * nothing about what happens here. Consulting rooms and conversation instead.
 * The landscape files are still on disk and still exported below; they now
 * carry the sections where atmosphere is the actual point (the quote band, the
 * breathing panel) rather than the page headers.
 */

/** /services */
export const FOLIAGE_PATH: StockImage = {
  src: u('hero-two-chairs.jpg'),
  alt: 'Two empty chairs facing each other in a quiet room.',
  credit: 'CHUTTERSNAP / Unsplash',
};

/** /about */
export const GARDEN_STREAM: StockImage = {
  src: u('hero-consult-room.jpg'),
  alt: 'A consulting room with two chairs and a plant.',
  credit: 'Leuchtturm Entertainment / Unsplash',
};

/** /our-team */
export const BAMBOO_WALKWAY: StockImage = {
  src: u('hero-armchair-lamp.jpg'),
  alt: 'An armchair beside a floor lamp in a softly lit room.',
  credit: 'Fred Kleber / Unsplash',
};

/** /faq — two people mid-conversation, which is what the FAQ stands in for. */
export const TWO_TALKING: StockImage = {
  src: u('hero-two-talking.jpg'),
  alt: 'Two people sitting and talking to one another.',
  credit: 'LinkedIn Sales Solutions / Unsplash',
};

/** /pricing */
export const DESK_LAMP: StockImage = {
  src: u('desk-lamp-warm.jpg'),
  alt: 'An angled desk lamp on a bare wooden table.',
  credit: 'Andrej Lišakov / Unsplash',
};

/** /blog */
export const DESK_NOTEBOOK: StockImage = {
  src: u('desk-notebook.jpg'),
  alt: 'An open notebook and pen on a wooden table.',
  credit: 'Kelly Sikkema / Unsplash',
};

/** /book */
export const DESK_PLANNER: StockImage = {
  src: u('desk-planner.jpg'),
  alt: 'An open paper planner with a pen resting on it.',
  credit: 'Cabri Caldwell / Unsplash',
};

/** /service-areas */
export const PALMS_DAYLIGHT: StockImage = {
  src: u('palms-daylight.jpg'),
  alt: 'Palm trees against a clear sky.',
  credit: 'Haneen Krimly / Unsplash',
};

/* -------------------------------------------------------------------------
   THE ROOM — a gallery band on the homepage.

   Every frame here is a room, a surface or a detail. NONE OF THEM IS THIS
   PRACTICE'S ROOM, and the section that renders them says so in its own
   heading rather than leaving a visitor to assume. The practice's real
   consulting room is OFFICE_INTERIOR in ./assets.ts and it is shown
   separately, captioned, at full size.
   ------------------------------------------------------------------------- */
export const GALLERY: StockImage[] = [
  {
    src: u('gal-waiting-chairs.jpg'),
    alt: 'Two chairs and a potted plant in a quiet room.',
    credit: 'Craig Lovelidge / Unsplash',
  },
  {
    src: u('gal-blinds-light.jpg'),
    alt: 'Sunlight falling across a floor through window blinds.',
    credit: 'Brian Patrick Tagalog / Unsplash',
  },
  {
    src: u('gal-lamp-window.jpg'),
    alt: 'A floor lamp and a potted plant beside a sunlit window.',
    credit: 'Christopher Stites / Unsplash',
  },
  {
    src: u('gal-journal-writing.jpg'),
    alt: 'A hand writing in a notebook.',
    credit: 'Hannah Olinger / Unsplash',
  },
  {
    src: u('gal-plant-window.jpg'),
    alt: 'A green plant against a bright window.',
    credit: 'Sandra Seitamaa / Unsplash',
  },
  {
    src: u('gal-sofa-window.jpg'),
    alt: 'A living room with a large window and soft daylight.',
    credit: 'Annie Spratt / Unsplash',
  },
  {
    src: u('gal-office-desk-plant.jpg'),
    alt: 'A desk beside a potted plant.',
    credit: 'Alesia Kazantceva / Unsplash',
  },
];

/* -------------------------------------------------------------------------
   "WHY PEOPLE COME" band.

   CAREFUL WITH THESE THREE. They are the closest this site gets to
   before-and-after imagery, and they are captioned with what clients came
   IN for — the topics of the practice's own six Google reviews, which are
   real — never with an outcome the site is promising. A photograph of
   someone sleeping under a caption about insomnia results would be an
   efficacy claim made in pictures, which is exactly the kind of claim this
   practice's scope note exists to avoid.
   ------------------------------------------------------------------------- */
export const OUT_WALK: StockImage = {
  src: u('out-walk-sunrise.jpg'),
  alt: 'A person walking along a path towards the sun.',
  credit: 'Daniel Akselrod / Unsplash',
};
export const OUT_BENCH: StockImage = {
  src: u('out-bench-calm.jpg'),
  alt: 'A person sitting alone on a bench in a park.',
  credit: 'John Lord Vicente / Unsplash',
};
export const OUT_SLEEP: StockImage = {
  src: u('out-sleep-calm.jpg'),
  alt: 'A person asleep with sunlight across the bed.',
  credit: 'Fernando Valero / Unsplash',
};

/**
 * Fallback for any service area without its own verified photograph.
 * The San Gabriel range is genuinely behind all five cities, so a mountain
 * horizon is true of every one of them and the alt text names no place.
 */
export const FOOTHILL_RANGE: StockImage = {
  src: u('foothill-range.jpg'),
  alt: 'A mountain range seen across open ground on a clear day.',
  credit: 'Vincent Y / Unsplash',
};

/* -------------------------------------------------------------------------
   PER-CITY IMAGERY for /service-areas.

   This replaced one shared mountain photograph repeated across all five city
   cards, which looked like a placeholder because it was one.

   THE SOURCING BAR, and it is why this map has three entries and not five:
   a photograph may only be captioned as a place if the PHOTOGRAPHER'S OWN
   description names that place. Pasadena, Glendale and Arcadia each have a
   genuine, described landmark on Unsplash — the descriptions read "Pasadena
   Town Hall", "Panorama of Glendale." and "Queen Ann Cottage at the LA County
   Arboretum" (the Arboretum is in Arcadia). Those are supportable.

   South Pasadena and Eagle Rock are not on Unsplash in any verifiable form. I
   searched for both directly and for their landmarks — Mission Street,
   Occidental College, Colorado Boulevard — and the results were a stranger's
   front door, some puppies and a plate of avocado toast, none of them
   described as the place.

   So neither gets a photograph pretending to be it:

     - SOUTH PASADENA uses the practice's OWN office photograph, which is the
       best possible answer: the office genuinely is in South Pasadena, at
       1910 Huntington Drive. Handled at the call site, from ./assets.
     - EAGLE ROCK uses a described Los Angeles residential street. Eagle Rock
       is a neighbourhood OF Los Angeles, so the alt text is literally true
       and claims nothing narrower than the source supports.

   If a real, described photograph of either ever appears, add it here.
   ------------------------------------------------------------------------- */
export const AREA_IMAGE_BY_SLUG: Record<string, StockImage> = {
  pasadena: {
    src: u('area-pasadena.jpg'),
    alt: 'Pasadena City Hall, its dome and arches under a clear blue sky.',
    credit: 'Freddy Kearney / Unsplash',
  },
  glendale: {
    src: u('area-glendale.jpg'),
    alt: 'A panorama across Glendale, with mountains behind the city.',
    credit: 'Levi Meir Clancy / Unsplash',
  },
  arcadia: {
    src: u('area-arcadia.jpg'),
    alt: 'The Queen Anne Cottage at the Los Angeles County Arboretum in Arcadia.',
    credit: 'Maurice Williams / Unsplash',
  },
  'eagle-rock': {
    src: u('area-eagle-rock.jpg'),
    alt: 'A quiet residential street in Los Angeles, lined with trees and parked cars.',
    credit: 'Katie Mukhina / Unsplash',
  },
};

export const areaImage = (slug: string): StockImage => AREA_IMAGE_BY_SLUG[slug] ?? FOOTHILL_RANGE;
