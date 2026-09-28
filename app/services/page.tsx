import type { Metadata } from 'next';
import Link from 'next/link';
import { SERVICES, NAP } from '../../components/content';
import { FOLIAGE_PATH, GALLERY, serviceImage } from '../../components/unsplash';
import { PhoneIcon, ArrowRightIcon } from '../../components/Icons';
import { PageHero, heroPrimaryBtn, heroGhostBtn } from '../../components/PageHero';
import { CtaBand } from '../../components/CtaBand';
import { ServiceCard } from '../../components/ServiceCard';
import { Reveal, Stagger, StaggerItem } from '../../components/Motion';
import { SectionHeading } from '../../components/SectionHeading';
import { ImageStrip } from '../../components/Bands';

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

export default function ServicesHubPage() {
  const groups = CATEGORY_ORDER.map((category) => ({
    category,
    services: SERVICES.filter((s) => s.category === category),
  })).filter((g) => g.services.length > 0);

  return (
    <div>
      <PageHero
        eyebrow="Services"
        title={`${SERVICES.length} services, one South Pasadena office`}
        image={FOLIAGE_PATH}
        size="lg"
        facts={[
          { k: 'Services', v: String(SERVICES.length) },
          { k: 'Standard session', v: '$200' },
          { k: 'First call', v: 'Free' },
          { k: 'Format', v: 'In person or video' },
        ]}
        lede={
          <p>
            Jason Meissner specializes in diagnosed depression and bipolar disorder, disabling anxiety, smoking
            cessation, chronic pain and grief &mdash; cases many hypnotherapists decline in favour of lighter work
            like phobias. Sessions run $200 each, in person in South Pasadena or online statewide.
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

      {/* A LOOK AT THE CATALOGUE ------------------------------------------
          The stat strip that used to sit here was deleted rather than
          restyled: the same four figures are now in the hero's fact strip
          directly above, and repeating them twelve hundred pixels apart made
          the page look padded. A picture rail is the better use of the band —
          it shows the range of the work before the list names it. */}
      <section className="border-b border-[#D7DEEA] bg-white py-12">
        <ImageStrip images={SERVICES.slice(0, 8).map((s) => serviceImage(s.slug))} speed={76} />
      </section>

      {/* CATALOGUE -------------------------------------------------------- */}
      <section className="bg-[#E6EFFF] py-20 sm:py-28">
        <div className="mx-auto flex max-w-[1280px] flex-col gap-16 px-4 sm:gap-20 sm:px-6 lg:px-8">
          {groups.map((g) => (
            <div key={g.category}>
              <Reveal>
                <div className="mb-8 flex flex-col gap-2 border-b border-[#2E2F3D]/12 pb-5 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <h2 className="font-heading text-[1.7rem] text-[#2E2F3D] sm:text-[2rem]">{g.category}</h2>
                    {CATEGORY_NOTE[g.category] ? (
                      <p className="mt-1.5 max-w-[56ch] text-[14.5px] text-[#4B5468]">{CATEGORY_NOTE[g.category]}</p>
                    ) : null}
                  </div>
                  <p className="text-[12.5px] font-semibold uppercase tracking-[0.12em] text-[#46699F]">
                    {g.services.length} {g.services.length === 1 ? 'service' : 'services'}
                  </p>
                </div>
              </Reveal>

              <Stagger className="grid auto-rows-fr grid-cols-1 gap-6 md:grid-cols-2" gap={0.08}>
                {g.services.map((s) => (
                  <StaggerItem key={s.slug} distance={28}>
                    <ServiceCard service={s} variant="full" />
                  </StaggerItem>
                ))}
              </Stagger>
            </div>
          ))}
        </div>
      </section>

      {/* HOW TO CHOOSE ---------------------------------------------------- */}
      <section className="relative overflow-hidden bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
          <SectionHeading
            className="mb-12"
            eyebrow="If the list is too long"
            title="You do not have to pick the right one first"
            lede={
              <p>
                Most people book the discovery call and describe the situation instead. Jason will say which of
                these it is, or that it is not work he takes.
              </p>
            }
          />

          <Stagger className="grid auto-rows-fr grid-cols-1 gap-6 lg:grid-cols-3" gap={0.1}>
            {[
              {
                t: 'Start with the condition',
                b: 'If there is a diagnosis or a specific problem, go to that service page — depression, anxiety, pain, IBS, grief, smoking.',
                img: serviceImage('depression-bipolar-support'),
              },
              {
                t: 'Start with the format',
                b: 'If the condition is less clear than the constraint, start from how you can attend: a standard session, online, or the group programme.',
                img: serviceImage('online-hypnotherapy'),
              },
              {
                t: 'Start with a conversation',
                b: 'If neither of the above, the discovery call costs nothing and sorts it in ten minutes.',
                img: serviceImage('discovery-call'),
              },
            ].map((c) => (
              <StaggerItem key={c.t} distance={26}>
                <div className="flex h-full gap-5 rounded-[18px] border border-[#D7DEEA] bg-white p-5 transition-all duration-500 hover:-translate-y-1 hover:border-[#46699F]/40 hover:shadow-[0_24px_52px_-28px_rgba(46,47,61,0.4)]">
                  <span className="h-24 w-20 flex-shrink-0 overflow-hidden rounded-[12px]">
                    <img src={c.img.src} alt={c.img.alt} loading="lazy" className="h-full w-full object-cover" />
                  </span>
                  <div>
                    <h3 className="mb-2 font-heading text-[1.15rem] text-[#2E2F3D]">{c.t}</h3>
                    <p className="text-[14px] leading-[1.6] text-[#4B5468]">{c.b}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>

          <Reveal delay={0.1}>
            <div className="mt-12">
              <ImageStrip images={GALLERY} speed={90} reverse />
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBand
        title="Not sure where to start?"
        body="The discovery call exists for exactly this — describe the situation and Jason will tell you whether it is work he takes."
      />
    </div>
  );
}
