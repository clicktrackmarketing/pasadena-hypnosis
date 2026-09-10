import type { Metadata } from 'next';
import Link from 'next/link';
import { SERVICE_AREAS, NAP } from '../../components/content';
import { ArrowRightIcon, MapPinIcon, PhoneIcon } from '../../components/Icons';

// Target keywords (profile.ts targetKeywords['/service-areas']): "hypnotherapy
// near me", "hypnosis near me los angeles" — Call 2 brief's stated single
// biggest unclaimed opportunity (~6,600/mo combined, low-moderate difficulty).
export const metadata: Metadata = {
  title: 'Hypnotherapy Service Areas Near South Pasadena, CA',
  description:
    'Pasadena Hypnosis sees clients in person from a South Pasadena office and serves Pasadena, South Pasadena, Glendale, Eagle Rock and Arcadia, plus online statewide.',
  alternates: { canonical: '/service-areas' },
};

const areaSlug = (a: string) => a.split(',')[0].trim().toLowerCase().replace(/\s+/g, '-');

export default function ServiceAreasHubPage() {
  return (
    <div>
      <section className="bg-white">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <p className="font-body text-xs sm:text-sm font-semibold tracking-[0.14em] uppercase text-[#46699F] mb-4">Service Areas</p>
          <h1 className="font-heading text-4xl sm:text-5xl leading-[1.1] text-[#2E2F3D] mb-6 max-w-2xl">
            Hypnotherapy near you, from a real South Pasadena office
          </h1>
          <p className="text-base sm:text-lg text-[#4B5468] leading-relaxed max-w-2xl mb-8">
            In person at {NAP.street} in {NAP.city}, and by video anywhere in California. These are the areas Jason
            Meissner most often sees clients from in person.
          </p>
          <a href={`tel:${NAP.phone.replace(/[^\d+]/g, '')}`} className="inline-flex items-center gap-2 rounded-[10px] border border-[#454659] text-[#2E2F3D] px-6 py-3.5 text-sm sm:text-base font-medium hover:text-[#46699F] transition-colors">
            <PhoneIcon className="h-4 w-4" />
            {NAP.phone}
          </a>
        </div>
      </section>

      <section className="bg-[#E6EFFF] py-14 sm:py-20">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {SERVICE_AREAS.map((a) => {
            const city = a.split(',')[0].trim();
            return (
              <Link
                key={a}
                href={`/service-areas/${areaSlug(a)}`}
                className="text-left bg-white border border-[#D7DEEA] rounded-[14px] p-6 hover:border-[#454659] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#454659] focus-visible:ring-offset-2 group block"
              >
                <MapPinIcon className="h-5 w-5 text-[#454659] mb-3" />
                <h2 className="font-heading text-xl text-[#2E2F3D] mb-2">Hypnotherapy in {city}</h2>
                <span className="inline-flex items-center gap-1.5 text-sm font-medium text-[#46699F] group-hover:gap-2.5 transition-all">
                  View {city}
                  <ArrowRightIcon className="h-3.5 w-3.5" />
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="bg-[#454659] py-14">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <h2 className="font-heading text-2xl sm:text-3xl text-white">Outside these cities? Online sessions work the same way.</h2>
          <Link href="/services/online-hypnotherapy" className="inline-flex items-center gap-2 rounded-[10px] bg-white text-[#454659] px-6 py-3.5 text-sm sm:text-base font-medium hover:bg-[#E6EFFF] transition-colors">
            Online Hypnotherapy
          </Link>
        </div>
      </section>
    </div>
  );
}
