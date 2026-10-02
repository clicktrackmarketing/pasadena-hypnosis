import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { SERVICE_AREAS, NAP } from '../../../components/content';
import { FOOTHILL_RANGE } from '../../../components/unsplash';
import { OFFICE_INTERIOR, OFFICE_INTERIOR_ALT } from '../../../components/assets';
import { ArrowRightIcon, PhoneIcon } from '../../../components/Icons';
import { PageHero } from '../../../components/PageHero';
import { heroPrimaryBtn, heroGhostBtn } from '../../../components/buttons';
import { CtaBand } from '../../../components/CtaBand';
import { Magnetic } from '../../../components/Motion';
import { RollText } from '../../../components/MotionFx';
import { areaSlug, areaCity, findArea } from '../../../components/pages/service-areas/areas';
import { AreaServices, VisitBand, AlsoServing } from '../../../components/pages/service-areas/AreaSections';

/*
 * Programmatic template. The Call 2 brief confirms these 5 cities as real
 * targets (§3) but gives none of them bespoke long-form copy, matching
 * `deriveContentBrief`'s own treatment of this route. Everything rendered here
 * is assembled from shared, real facts — NAP, hours, the actual service
 * catalogue, the practitioner record — rather than per-city copy invented to
 * fill a template.
 *
 * REDESIGNED 2026-09-28. The hero's particle figure is a terrain — the San
 * Gabriel foothills that sit behind every one of the five cities — over the
 * foothill photograph, whose alt text names no place. The city's own frame
 * (areaImage) moved down the page into a ZoomFrame, where it is seen at full
 * strength instead of dimmed behind a scrim. South Pasadena keeps the
 * practice's own office in its hero, because the office genuinely is there.
 */
type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return SERVICE_AREAS.map((a) => ({ slug: areaSlug(a) }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const area = findArea(slug);
  if (!area) return {};
  const city = areaCity(area);
  return {
    title: `Hypnotherapy in ${city}, CA`,
    description: `Pasadena Hypnosis serves ${city}, CA with in-person sessions at ${NAP.street} in ${NAP.city} and online sessions anywhere. Certified hypnotherapy for stress and anxiety, depression, chronic and acute pain, smoking cessation and grief.`,
    alternates: { canonical: `/service-areas/${slug}` },
  };
}

export default async function ServiceAreaDetailPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const area = findArea(slug);
  if (!area) notFound();
  const city = areaCity(area);
  /* The one city that gets the practice's own photograph rather than a stock
     landmark, because the office genuinely is in this one. */
  const isHome = slug === 'south-pasadena';

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
        image={isHome ? { src: OFFICE_INTERIOR, alt: OFFICE_INTERIOR_ALT, credit: 'Pasadena Hypnosis' } : FOOTHILL_RANGE}
        media={
          isHome
            ? {
                src: OFFICE_INTERIOR,
                alt: OFFICE_INTERIOR_ALT,
                aspect: '3/4' as const,
                caption: `The office at ${NAP.street}, South Pasadena.`,
              }
            : undefined
        }
        size="lg"
        scene="terrain"
        intro="blur"
        breadcrumb={{ label: 'All service areas', href: '/service-areas' }}
        facts={[
          { k: 'Office', v: 'South Pasadena' },
          { k: 'Standard session', v: '$200' },
          { k: 'Also available', v: 'Online, anywhere' },
          { k: 'First call', v: 'Free' },
        ]}
        lede={
          <p id="answer-first" className="border-l-2 border-[#A9C4EE]/45 pl-5">
            Pasadena Hypnosis serves {city} clients in person at {NAP.street} in {NAP.city}, and by video anywhere
            &mdash; the same work either way, led by Jason Meissner, a Hypnosis Motivation Institute graduate with 10
            years in practice.
          </p>
        }
      >
        <Magnetic>
          <Link href="/book" className={`${heroPrimaryBtn} ph-glow-border`}>
            <RollText>Book a Free Discovery Call</RollText>
            <ArrowRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </Magnetic>
        <a href={NAP.phoneHref} className={`group ${heroGhostBtn}`}>
          <PhoneIcon className="h-4 w-4" />
          <RollText>{NAP.phone}</RollText>
        </a>
      </PageHero>

      <AreaServices slug={slug} city={city} />

      <VisitBand city={city} />

      <AlsoServing slug={slug} />

      <CtaBand
        title={`Talk it through from ${city}`}
        body="A free discovery call first. Let us know how we can help."
      />
    </div>
  );
}
