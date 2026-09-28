import type { Metadata } from 'next';
import Link from 'next/link';
import { SERVICES, NAP, REAL_COPY } from '../../components/content';
import { FOLIAGE_PATH } from '../../components/unsplash';
import { PhoneIcon, ArrowRightIcon } from '../../components/Icons';
import { PageHero } from '../../components/PageHero';
import { heroPrimaryBtn, heroGhostBtn } from '../../components/buttons';
import { CtaBand } from '../../components/CtaBand';
import { SectionHeading } from '../../components/SectionHeading';
import { priceLabel } from '../../components/price';
import { CategoryPanels, type CategoryGroup } from '../../components/pages/services/CategoryPanels';
import { NameTicker, CatalogueGrid, ChooseBand } from '../../components/pages/services/HubSections';
import { HUB_SCENE_CYCLE } from '../../components/pages/services/shapes';

// Target keywords (profile.ts targetKeywords['/services']): "hypnotherapist
// pasadena", "hypnotherapy services south pasadena".
export const metadata: Metadata = {
  title: 'Hypnotherapy Services in South Pasadena, CA',
  description:
    'Pasadena Hypnosis LLC offers hypnotherapy in South Pasadena, CA, specializing in diagnosed depression, bipolar disorder and disabling anxiety, plus smoking cessation, chronic pain, gut-directed hypnotherapy and grief.',
  alternates: { canonical: '/services' },
};

// Matches the header nav's own grouping — derived from each service's
// `category` field, in the order the practice's own priority ranks them
// (Call 2 Content & Services Brief §1/§2), not alphabetically.
const CATEGORY_ORDER = ['Featured', 'Conditions', 'Programs', 'General', 'Online', 'Performance', 'Specialty'];

/* A one-line orientation per group. These describe how the practice already
   groups its own catalogue; they do not add a claim about any service. */
const CATEGORY_NOTE: Record<string, string> = {
  Featured: 'The work Jason leads with, and the reason most clients find this practice.',
  Conditions: 'Ongoing conditions, usually alongside existing medical or psychiatric care.',
  Programs: 'Structured work with a defined shape rather than open-ended sessions.',
  General: 'The standard session, and the free call that comes before it.',
  Online: 'The same work by video, anywhere in California.',
  Performance: 'Focus and preparation work, for sport and for testing.',
  Specialty: 'Less commonly requested, still offered.',
};

/* The hero's price figures are read off the service records, never retyped:
   the standard session's price and the discovery call's "Free". */
const SESSION = SERVICES.find((s) => s.slug === 'hypnotherapy-sessions');
const CALL = SERVICES.find((s) => s.slug === 'discovery-call');

/*
  PAGE ORDER, and the kind of motion each band carries (no two alike):
    hero        dark    particle spiral cycling through the service figures; H1 settles down from large
    ticker      white   the service names in display serif, speed and lean follow the scroll wheel
    categories  dark    expanding panels — widen on hover/focus (desktop), stacked (touch)
    catalogue   tint    every card flips up in 3D, row by row; a travelling wave on the seam
    choose      white   depth-parallax cards sliding in from alternate sides, beside a figure of rings
    cta         slate   shared CtaBand
*/
export default function ServicesHubPage() {
  const groups: CategoryGroup[] = CATEGORY_ORDER.map((category) => ({
    category,
    note: CATEGORY_NOTE[category],
    services: SERVICES.filter((s) => s.category === category),
  })).filter((g) => g.services.length > 0);

  const sessionPrice = SESSION ? priceLabel(SESSION) : '';
  const callPrice = CALL ? priceLabel(CALL) : '';

  return (
    <div>
      <PageHero
        eyebrow="Services"
        title={`${SERVICES.length} services, one South Pasadena office`}
        image={FOLIAGE_PATH}
        size="lg"
        scene="spiral"
        sceneCycle={HUB_SCENE_CYCLE}
        intro="scale"
        facts={[
          { k: 'Services', v: String(SERVICES.length) },
          ...(sessionPrice ? [{ k: 'Standard session', v: sessionPrice }] : []),
          ...(callPrice ? [{ k: 'First call', v: callPrice }] : []),
          { k: 'Format', v: 'In person or video' },
        ]}
        lede={
          <p>
            Jason Meissner specializes in diagnosed depression and bipolar disorder, disabling anxiety, smoking
            cessation, chronic pain and grief &mdash; cases many hypnotherapists decline in favour of lighter work
            like phobias. Sessions run {sessionPrice} each, in person in South Pasadena or online statewide.
          </p>
        }
      >
        <Link href="/book" className={heroPrimaryBtn}>
          Book a Free Discovery Call
          <ArrowRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
        <a href={NAP.phoneHref} className={heroGhostBtn}>
          <PhoneIcon className="h-4 w-4" />
          {NAP.phone}
        </a>
      </PageHero>

      <NameTicker />

      {/* CATEGORIES — expanding panels ------------------------------------ */}
      <section className="relative isolate overflow-hidden bg-[#1F2030] py-16 ph-grain sm:py-28">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-40 top-10 h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(closest-side,rgba(70,105,159,0.28),transparent)] blur-2xl"
        />
        <div className="relative mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
          <SectionHeading
            className="mb-12 sm:mb-14"
            tone="light"
            size="lg"
            eyebrow="Explore by category"
            title={REAL_COPY.headers.designed}
          />
          <CategoryPanels groups={groups} />
        </div>
      </section>

      {/* EVERY SERVICE — 3D flip grid -------------------------------------- */}
      <CatalogueGrid eyebrow="Services" title={REAL_COPY.headers.serviceInfo} />

      {/* HOW TO CHOOSE ------------------------------------------------------ */}
      <ChooseBand
        eyebrow="If the list is too long"
        title="You do not have to pick the right one first"
        lede={
          <p>
            Most people book the discovery call and describe the situation instead. Jason will say which of these it
            is, or that it is not work he takes.
          </p>
        }
        cards={[
          {
            t: 'Start with the condition',
            b: 'If there is a diagnosis or a specific problem, go to that service page — depression, anxiety, pain, IBS, grief, smoking.',
            slug: 'depression-bipolar-support',
          },
          {
            t: 'Start with the format',
            b: 'If the condition is less clear than the constraint, start from how you can attend: a standard session, online, or the group programme.',
            slug: 'online-hypnotherapy',
          },
          {
            t: 'Start with a conversation',
            b: 'If neither of the above, the discovery call costs nothing and sorts it in ten minutes.',
            slug: 'discovery-call',
          },
        ]}
      />

      <CtaBand
        title="Not sure where to start?"
        body="The discovery call exists for exactly this — describe the situation and Jason will tell you whether it is work he takes."
      />
    </div>
  );
}
