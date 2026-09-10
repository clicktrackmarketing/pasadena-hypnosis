import type { Metadata } from 'next';
import Link from 'next/link';
import { SERVICES, NAP } from '../../components/content';
import { OFFICE_INTERIOR, OFFICE_INTERIOR_ALT } from '../../components/assets';
import { ArrowRightIcon, PhoneIcon } from '../../components/Icons';

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

export default function ServicesHubPage() {
  return (
    <div>
      <section className="bg-white">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <p className="font-body text-xs sm:text-sm font-semibold tracking-[0.14em] uppercase text-[#46699F] mb-4">Services</p>
            <h1 className="font-heading text-4xl sm:text-5xl leading-[1.1] text-[#2E2F3D] mb-6">{SERVICES.length} services, one South Pasadena office</h1>
            <p className="text-base sm:text-lg text-[#4B5468] leading-relaxed mb-8">
              Jason Meissner specializes in diagnosed depression and bipolar disorder, disabling anxiety, smoking
              cessation, chronic pain and grief — cases many hypnotherapists decline in favor of lighter work like
              phobias. Sessions run $200 each, in person in South Pasadena or online statewide.
            </p>
            <a href={`tel:${NAP.phone.replace(/[^\d+]/g, '')}`} className="inline-flex items-center gap-2 rounded-[10px] border border-[#454659] text-[#2E2F3D] px-6 py-3.5 text-sm sm:text-base font-medium hover:text-[#46699F] transition-colors">
              <PhoneIcon className="h-4 w-4" />
              {NAP.phone}
            </a>
          </div>
          <img src={OFFICE_INTERIOR} alt={OFFICE_INTERIOR_ALT} className="w-full aspect-[4/3] object-cover rounded-[14px]" />
        </div>
      </section>

      <section className="bg-[#E6EFFF] py-14 sm:py-20">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-10 sm:gap-12">
          {CATEGORY_ORDER.map((category) => {
            const services = SERVICES.filter((s) => s.category === category);
            if (services.length === 0) return null;
            return (
              <div key={category}>
                <h2 className="font-heading text-xl sm:text-2xl text-[#2E2F3D] mb-4 sm:mb-5">{category}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                  {services.map((s) => (
                    <Link
                      key={s.slug}
                      href={`/services/${s.slug}`}
                      className="text-left bg-white border border-[#D7DEEA] rounded-[14px] p-6 sm:p-8 hover:border-[#454659] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#454659] focus-visible:ring-offset-2 group block"
                    >
                      {s.tag ? <span className="inline-block text-[11px] font-semibold tracking-wide uppercase text-[#46699F] mb-3">{s.tag}</span> : null}
                      <h3 className="font-heading text-2xl text-[#2E2F3D] mb-2">{s.name}</h3>
                      <p className="text-sm text-[#4B5468] leading-relaxed mb-5">{s.answer}</p>
                      <span className="inline-flex items-center gap-1.5 text-sm font-medium text-[#46699F] group-hover:gap-2.5 transition-all">
                        View {s.name.toLowerCase()}
                        <ArrowRightIcon className="h-3.5 w-3.5" />
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="bg-[#454659] py-14">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <h2 className="font-heading text-2xl sm:text-3xl text-white">Not sure where to start?</h2>
          <Link href="/book" className="inline-flex items-center gap-2 rounded-[10px] bg-white text-[#454659] px-6 py-3.5 text-sm sm:text-base font-medium hover:bg-[#E6EFFF] transition-colors">
            Book a Free Discovery Call
          </Link>
        </div>
      </section>
    </div>
  );
}
