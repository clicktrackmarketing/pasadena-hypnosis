import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { SERVICE_AREAS, SERVICES, NAP, HOURS } from '../../../components/content';
import { ArrowRightIcon, MapPinIcon, PhoneIcon, ClockIcon } from '../../../components/Icons';

const areaSlug = (a: string) => a.split(',')[0].trim().toLowerCase().replace(/\s+/g, '-');

// Programmatic template — the Call 2 brief confirms these 5 cities as real
// targets (§3) but does not give each one bespoke long-form copy, matching
// `deriveContentBrief`'s own treatment of `/service-areas/[slug]` (no
// per-city answer block is generated; only the index gets one). Content
// here is assembled from real, shared facts (NAP, hours, the real service
// catalog) rather than invented per-city copy.
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
  const featured = SERVICES.slice(0, 6);

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

      <section className="bg-white">
        <div className="max-w-[900px] mx-auto px-4 sm:px-6 py-12 sm:py-16 lg:py-20">
          <Link href="/service-areas" className="text-sm font-medium text-[#46699F] hover:text-[#2E2F3D] mb-5 inline-block">
            &larr; All service areas
          </Link>
          <p className="font-body text-xs sm:text-sm font-semibold tracking-[0.14em] uppercase text-[#46699F] mb-3">Service Area</p>
          <h1 className="font-heading text-4xl sm:text-5xl leading-[1.1] text-[#2E2F3D] mb-6">Hypnotherapy in {city}, CA</h1>
          <p id="answer-first" className="text-base sm:text-lg text-[#4B5468] leading-relaxed mb-8 border-l-[3px] border-[#454659] pl-5">
            Pasadena Hypnosis serves {city} clients in person at {NAP.street} in {NAP.city}, and by video anywhere in
            California — the same $200 rate and the same conditions treated either way, led by Jason Meissner, a
            Hypnosis Motivation Institute graduate with 10 years in practice.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/book" className="inline-flex items-center gap-2 rounded-[10px] bg-[#454659] text-white px-6 py-3.5 text-sm sm:text-base font-medium hover:bg-[#33344A] transition-colors">
              Book a Free Discovery Call
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
            <a href={`tel:${NAP.phone.replace(/[^\d+]/g, '')}`} className="inline-flex items-center gap-2 rounded-[10px] border border-[#454659] text-[#2E2F3D] px-6 py-3.5 text-sm sm:text-base font-medium hover:text-[#46699F] transition-colors">
              <PhoneIcon className="h-4 w-4" />
              {NAP.phone}
            </a>
          </div>
        </div>
      </section>

      <section className="bg-[#E6EFFF] py-14 sm:py-20">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8">
            <h2 className="font-heading text-2xl sm:text-3xl text-[#2E2F3D] mb-6">Services {city} clients book most</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {featured.map((s) => (
                <Link key={s.slug} href={`/services/${s.slug}`} className="bg-white border border-[#D7DEEA] rounded-[14px] p-5 hover:border-[#454659] transition-colors block">
                  <h3 className="font-heading text-lg text-[#2E2F3D] mb-1.5">{s.name}</h3>
                  <span className="inline-flex items-center gap-1.5 text-sm font-medium text-[#46699F]">
                    Learn more <ArrowRightIcon className="h-3.5 w-3.5" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
          <div className="lg:col-span-4">
            <div className="bg-white border border-[#D7DEEA] rounded-[14px] p-6 flex flex-col gap-4">
              <div className="flex items-start gap-3">
                <MapPinIcon className="h-5 w-5 text-[#454659] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-[#2E2F3D]">{NAP.street}</p>
                  <p className="text-[#2E2F3D]">{NAP.city}, {NAP.state} {NAP.zip}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <ClockIcon className="h-5 w-5 text-[#454659] flex-shrink-0 mt-0.5" />
                <ul className="text-sm text-[#2E2F3D]">
                  {HOURS.map((h) => (
                    <li key={h.days}>{h.days}: {h.time}</li>
                  ))}
                </ul>
              </div>
              <a href={NAP.directions} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-[#46699F] hover:text-[#2E2F3D]">
                Get directions
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
