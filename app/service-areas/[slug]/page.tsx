import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { SERVICE_AREAS, SERVICES, NAP, HOURS, PRACTITIONER } from '../../../components/content';
import { areaImage } from '../../../components/unsplash';
import { OFFICE_INTERIOR, OFFICE_INTERIOR_ALT } from '../../../components/assets';
import { ArrowRightIcon, MapPinIcon, PhoneIcon, ClockIcon, ShieldCheckIcon } from '../../../components/Icons';
import { PageHero, heroPrimaryBtn, heroGhostBtn } from '../../../components/PageHero';
import { CtaBand } from '../../../components/CtaBand';
import { ServiceCard } from '../../../components/ServiceCard';
import { Reveal, SplitHeading, Stagger, StaggerItem, Parallax } from '../../../components/Motion';

const areaSlug = (a: string) => a.split(',')[0].trim().toLowerCase().replace(/\s+/g, '-');

/*
 * Programmatic template. The Call 2 brief confirms these 5 cities as real
 * targets (§3) but gives none of them bespoke long-form copy, matching
 * `deriveContentBrief`'s own treatment of this route. Everything rendered here
 * is assembled from shared, real facts — NAP, hours, the actual service
 * catalogue, the practitioner record — rather than per-city copy invented to
 * fill a template.
 *
 * ONE IMAGE FOR ALL FIVE, and that is deliberate: see the note on
 * FOOTHILL_RANGE in unsplash.ts. Sourcing five stock photographs and
 * captioning them "Glendale", "Arcadia" and so on would assert something no
 * source supports. The alt text names no place.
 */
type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return SERVICE_AREAS.map((a) => ({ slug: areaSlug(a) }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const area = SERVICE_AREAS.find((a) => areaSlug(a) === slug);
  if (!area) return {};
  const city = area.split(',')[0].trim();
  return {
    title: `Hypnotherapy in ${city}, CA`,
    description: `Pasadena Hypnosis serves ${city}, CA with in-person sessions at ${NAP.street} in ${NAP.city} and online statewide. Certified hypnotherapy for depression, anxiety, chronic pain, smoking cessation and grief.`,
    alternates: { canonical: `/service-areas/${slug}` },
  };
}

export default async function ServiceAreaDetailPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const area = SERVICE_AREAS.find((a) => areaSlug(a) === slug);
  if (!area) notFound();
  const city = area.split(',')[0].trim();
  /* The one city that gets the practice's own photograph rather than a stock
     landmark, because the office genuinely is in this one. */
  const isHome = slug === 'south-pasadena';
  const featured = SERVICES.slice(0, 6);
  const others = SERVICE_AREAS.filter((a) => a !== area);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.pasadenahypnosis.com/' },
          { '@type': 'ListItem', position: 2, name: 'Service Areas', item: 'https://www.pasadenahypnosis.com/service-areas' },
          { '@type': 'ListItem', position: 3, name: city, item: `https://www.pasadenahypnosis.com/service-areas/${slug}` },
        ],
      },
    ],
  };

  return (
    <div>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <PageHero
        eyebrow="Service area"
        title={`Hypnotherapy in ${city}, CA`}
        image={isHome ? { src: OFFICE_INTERIOR, alt: OFFICE_INTERIOR_ALT, credit: 'Pasadena Hypnosis' } : areaImage(slug)}
        media={
          isHome
            ? {
                src: OFFICE_INTERIOR,
                alt: OFFICE_INTERIOR_ALT,
                aspect: '3/4' as const,
                caption: `The consulting room at ${NAP.street} — this is the city the office is actually in.`,
              }
            : undefined
        }
        size="lg"
        breadcrumb={{ label: 'All service areas', href: '/service-areas' }}
        facts={[
          { k: 'Office', v: 'South Pasadena' },
          { k: 'Standard session', v: '$200' },
          { k: 'Also available', v: 'By video' },
          { k: 'First call', v: 'Free' },
        ]}
        lede={
          <p id="answer-first" className="border-l-2 border-[#A9C4EE]/45 pl-5">
            Pasadena Hypnosis serves {city} clients in person at {NAP.street} in {NAP.city}, and by video anywhere in
            California &mdash; the same $200 rate and the same conditions treated either way, led by Jason Meissner,
            a Hypnosis Motivation Institute graduate with 10 years in practice.
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

      {/* SERVICES + PRACTICAL --------------------------------------------- */}
      <section className="bg-[#E6EFFF] py-20 sm:py-28">
        <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:gap-14 lg:px-8">
          <div className="lg:col-span-8">
            <Reveal>
              <p className="mb-3 font-body text-xs font-semibold uppercase tracking-[0.18em] text-[#46699F] sm:text-[13px]">
                What {city} clients book
              </p>
            </Reveal>
            <SplitHeading
              text="The work this practice is known for"
              className="mb-10 max-w-[20ch] font-heading text-[1.9rem] leading-[1.14] text-[#2E2F3D] sm:text-[2.4rem]"
            />

            <Stagger className="grid auto-rows-fr grid-cols-1 gap-6 sm:grid-cols-2" gap={0.08}>
              {featured.map((s) => (
                <StaggerItem key={s.slug} distance={26}>
                  <ServiceCard service={s} variant="brief" />
                </StaggerItem>
              ))}
            </Stagger>

            <Reveal delay={0.1}>
              <Link
                href="/services"
                className="ph-tap ph-underline mt-9 inline-flex items-center gap-2 text-[15px] font-semibold text-[#46699F] transition-colors hover:text-[#2E2F3D] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#454659] focus-visible:ring-offset-2"
              >
                All {SERVICES.length} services
                <ArrowRightIcon className="h-4 w-4" />
              </Link>
            </Reveal>
          </div>

          <aside className="lg:col-span-4">
            <Parallax speed={22}>
              <div className="overflow-hidden rounded-[20px] border border-[#D7DEEA] bg-white shadow-[0_26px_60px_-34px_rgba(46,47,61,0.4)]">
                <img
                  src={OFFICE_INTERIOR}
                  alt={OFFICE_INTERIOR_ALT}
                  loading="lazy"
                  className="aspect-[4/3] w-full object-cover"
                />
                <div className="p-6">
                  <p className="font-heading text-[1.2rem] text-[#2E2F3D]">Where {city} clients come</p>
                  <ul className="mt-5 flex flex-col gap-4 text-[14.5px] text-[#4B5468]">
                    <li className="flex items-start gap-3">
                      <MapPinIcon className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#46699F]" />
                      <span>
                        {NAP.street}
                        <br />
                        {NAP.city}, {NAP.state} {NAP.zip}
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <ClockIcon className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#46699F]" />
                      <span className="w-full">
                        {HOURS.map((h) => (
                          <span key={h.days} className="flex justify-between gap-4 border-b border-[#D7DEEA] py-1 last:border-0">
                            <span>{h.days}</span>
                            <span className="font-medium tabular-nums text-[#2E2F3D]">{h.time}</span>
                          </span>
                        ))}
                      </span>
                    </li>
                  </ul>
                  <a
                    href={NAP.directions}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ph-tap ph-underline mt-5 inline-flex items-center gap-2 text-[14px] font-semibold text-[#46699F]"
                  >
                    Get directions
                    <ArrowRightIcon className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            </Parallax>

            <Reveal delay={0.1}>
              <div className="mt-6 flex items-start gap-3.5 rounded-[18px] border border-[#D7DEEA] bg-white p-5">
                <ShieldCheckIcon className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#454659]" />
                <p className="text-[13.5px] leading-[1.65] text-[#2E2F3D]">{PRACTITIONER.scopeNote}</p>
              </div>
            </Reveal>
          </aside>
        </div>
      </section>

      {/* OTHER AREAS ------------------------------------------------------ */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
          <Reveal>
            <p className="mb-5 text-[12.5px] font-semibold uppercase tracking-[0.14em] text-[#46699F]">
              Also serving
            </p>
          </Reveal>
          <Stagger className="flex flex-wrap gap-2.5" as="ul" gap={0.06}>
            {others.map((a) => (
              <StaggerItem key={a} as="li" distance={12}>
                <Link
                  href={`/service-areas/${areaSlug(a)}`}
                  className="inline-flex items-center gap-2 rounded-full border border-[#D7DEEA] bg-[#E6EFFF] px-4 py-2.5 text-[13.5px] font-medium text-[#2E2F3D] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#46699F] hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#454659] focus-visible:ring-offset-2"
                >
                  <MapPinIcon className="h-4 w-4 text-[#46699F]" />
                  {a.replace(', CA', '')}
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <CtaBand
        title={`Talk it through from ${city}`}
        body="A free discovery call first, in person or by video — whichever is easier to get to."
      />
    </div>
  );
}
