import type { Metadata } from 'next';
import Link from 'next/link';
import { H1_CLAUSE, H1_TAIL, HOME_ANSWER, RATING, NAP, PRACTITIONER, SERVICES, FAQS, STEPS, REAL_COPY } from '../components/content';
import { PORTRAIT, PORTRAIT_ALT, OFFICE_INTERIOR, OFFICE_INTERIOR_ALT } from '../components/assets';
import { ArrowRightIcon, PhoneIcon, StarIcon, ShieldCheckIcon, QuoteIcon } from '../components/Icons';
import { FaqAccordion } from '../components/FaqAccordion';

// Target keywords (profile.ts targetKeywords['/']): "hypnotherapy pasadena",
// "hypnotherapy south pasadena", "hypnosis pasadena".
export const metadata: Metadata = {
  title: 'Certified Hypnotherapy in South Pasadena, CA',
  description: HOME_ANSWER,
  alternates: { canonical: '/' },
};

export default function HomePage() {
  const featured = SERVICES.slice(0, 6);
  return (
    <div>
      {/* HERO */}
      <section className="bg-white">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div>
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-[3.2rem] leading-[1.1] text-[#2E2F3D] mb-6">
              {H1_CLAUSE}
              <span className="text-[#4B5468] font-body text-2xl sm:text-3xl lg:text-[1.6rem] block mt-2 font-normal leading-snug">
                {H1_TAIL}
              </span>
            </h1>
            <div id="answer-first" className="border-l-[3px] border-[#454659] pl-5 mb-8">
              <p className="max-w-[58ch] text-[15px] sm:text-base leading-[1.62] text-[#4B5468]">{HOME_ANSWER}</p>
            </div>
            <div className="flex flex-wrap items-center gap-3 mb-7">
              <Link href="/book" className="inline-flex items-center gap-2 rounded-[10px] bg-[#454659] text-white px-6 py-3.5 text-sm sm:text-base font-medium hover:bg-[#33344A] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#454659] focus-visible:ring-offset-2">
                Book a Free Discovery Call
                <ArrowRightIcon className="h-4 w-4" />
              </Link>
              <a href={`tel:${NAP.phone.replace(/[^\d+]/g, '')}`} className="inline-flex items-center gap-2 rounded-[10px] border border-[#454659] text-[#2E2F3D] px-6 py-3.5 text-sm sm:text-base font-medium hover:text-[#46699F] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#454659] focus-visible:ring-offset-2">
                <PhoneIcon className="h-4 w-4" />
                {NAP.phone}
              </a>
            </div>
            <ul className="flex flex-wrap items-center gap-x-3.5 gap-y-2 text-[12.5px] font-medium text-[#4B5468]">
              <li className="inline-flex items-center gap-1.5">
                <StarIcon className="h-4 w-4 text-[#454659]" />
                {RATING.value.toFixed(1)} · {RATING.count} Google reviews
              </li>
              <li aria-hidden="true">·</li>
              <li>HMI graduate</li>
              <li aria-hidden="true">·</li>
              <li>$200 / session</li>
              <li aria-hidden="true">·</li>
              <li>Free discovery call</li>
            </ul>
          </div>
          <div className="relative">
            <img src={PORTRAIT} alt={PORTRAIT_ALT} className="w-full aspect-[4/5] object-cover rounded-[14px]" />
          </div>
        </div>
      </section>

      {/* SPECIALTIES */}
      <section className="bg-[#E6EFFF] py-14 sm:py-20">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-x-16 gap-y-10">
          <div className="lg:col-span-6">
            <p className="font-body text-xs sm:text-sm font-semibold tracking-[0.14em] uppercase text-[#46699F] mb-3">{REAL_COPY.headers.specialties}</p>
            <h2 className="font-heading text-3xl sm:text-4xl text-[#2E2F3D]">Most hypnotherapists stop at phobias.</h2>
          </div>
          <div className="lg:col-span-6 space-y-5 text-[17px] leading-[1.7] text-[#4B5468] lg:pt-2">
            <p>
              The usual hypnotherapy menu is phobias, nail-biting and light behavioural change. Jason Meissner takes
              the cases that menu leaves out — diagnosed depression and bipolar disorder, disabling anxiety, chronic
              and post-surgical pain, and grief — alongside smoking cessation.
            </p>
            <p className="border-l-[3px] border-[#454659] pl-5 text-[#2E2F3D]">
              Hypnotherapy here works alongside your doctor, psychiatrist or chiropractor — not instead of them. Most
              clients arrive already under someone&rsquo;s care, and that is exactly how this practice is designed to work.
            </p>
          </div>
        </div>
      </section>

      {/* SERVICES TEASER */}
      <section className="bg-white py-14 sm:py-20">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8 sm:mb-10">
            <div>
              <p className="font-body text-xs sm:text-sm font-semibold tracking-[0.14em] uppercase text-[#46699F] mb-2">{REAL_COPY.headers.serviceInfo}</p>
              <h2 className="font-heading text-3xl sm:text-4xl text-[#2E2F3D]">What can you book with Pasadena Hypnosis?</h2>
            </div>
            <Link href="/services" className="inline-flex items-center gap-1.5 text-sm font-medium text-[#46699F] hover:text-[#2E2F3D] transition-colors self-start sm:self-auto">
              View all {SERVICES.length} services
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {featured.map((s) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className="text-left bg-[#E6EFFF] border border-[#D7DEEA] rounded-[14px] p-6 hover:border-[#454659] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#454659] focus-visible:ring-offset-2 group block"
              >
                {s.tag ? <span className="inline-block text-[11px] font-semibold tracking-wide uppercase text-[#46699F] mb-3">{s.tag}</span> : null}
                <h3 className="font-heading text-xl text-[#2E2F3D] mb-2">{s.name}</h3>
                <p className="text-sm text-[#4B5468] leading-relaxed mb-4">{s.summary}</p>
                <span className="inline-flex items-center gap-1.5 text-sm font-medium text-[#46699F] group-hover:gap-2.5 transition-all">
                  Learn more
                  <ArrowRightIcon className="h-3.5 w-3.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-[#E9F3EF] py-14 sm:py-20">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-3xl sm:text-4xl text-[#2E2F3D] mb-10">How it works</h2>
          <ol className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {STEPS.map((s) => (
              <li key={s.n} className="relative">
                <p className="font-heading text-4xl text-[#46699F] mb-3">{s.n}</p>
                <h3 className="font-heading text-lg text-[#2E2F3D] mb-2">{s.title}</h3>
                <p className="text-sm text-[#4B5468] leading-relaxed">{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* CREDENTIALS / PRACTITIONER */}
      <section className="bg-white py-14 sm:py-20">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-7">
            <p className="font-body text-xs sm:text-sm font-semibold tracking-[0.14em] uppercase text-[#46699F] mb-3">Practitioner</p>
            <h2 className="font-heading text-3xl sm:text-4xl text-[#2E2F3D] mb-5">{PRACTITIONER.name}</h2>
            <p className="text-base text-[#4B5468] leading-relaxed mb-6">{PRACTITIONER.bio}</p>
            <div className="flex items-start gap-3 rounded-[14px] border border-[#D7DEEA] bg-[#E6EFFF] p-5 mb-6">
              <ShieldCheckIcon className="h-5 w-5 text-[#454659] flex-shrink-0 mt-0.5" />
              <p className="text-sm text-[#2E2F3D] leading-relaxed">{PRACTITIONER.scopeNote}</p>
            </div>
            <Link href="/our-team" className="inline-flex items-center gap-1.5 text-sm font-medium text-[#46699F] hover:text-[#2E2F3D] transition-colors">
              Full credentials &amp; our team
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </div>
          <div className="lg:col-span-5">
            <img src={OFFICE_INTERIOR} alt={OFFICE_INTERIOR_ALT} className="w-full aspect-[3/4] object-cover rounded-[14px]" />
          </div>
        </div>
      </section>

      {/* QUOTE */}
      <section className="bg-[#2E2F3D] py-14 sm:py-20">
        <div className="max-w-[900px] mx-auto px-4 sm:px-6 text-center">
          <QuoteIcon className="h-8 w-8 text-[#A9C4EE] mx-auto mb-5" />
          <blockquote className="font-heading text-xl sm:text-2xl text-white leading-relaxed mb-4">
            &quot;{REAL_COPY.quote}&quot;
          </blockquote>
          <p className="text-sm text-[#D9E1F0]/70">Quoted on pasadenahypnosis.com today — carried across unchanged</p>
        </div>
      </section>

      {/* FAQ TEASER */}
      <section className="bg-[#E6EFFF] py-14 sm:py-20">
        <div className="max-w-[760px] mx-auto px-4 sm:px-6">
          <h2 className="font-heading text-3xl sm:text-4xl text-[#2E2F3D] mb-8 sm:mb-10 text-center">Common questions</h2>
          <FaqAccordion items={FAQS.slice(0, 4)} />
          <div className="mt-6 text-center">
            <Link href="/faq" className="inline-flex items-center gap-1.5 text-sm font-medium text-[#46699F] hover:text-[#2E2F3D] transition-colors">
              View all frequently asked questions
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-[#454659] py-14 sm:py-16">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <h2 className="font-heading text-2xl sm:text-3xl text-white mb-2">Ready to talk it through?</h2>
            <p className="text-white/85">A free discovery call comes first — no obligation to continue.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/book" className="inline-flex items-center gap-2 rounded-[10px] bg-white text-[#454659] px-6 py-3.5 text-sm sm:text-base font-medium hover:bg-[#E6EFFF] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#454659]">
              Book a Free Discovery Call
            </Link>
            <a href={`tel:${NAP.phone.replace(/[^\d+]/g, '')}`} className="inline-flex items-center gap-2 rounded-[10px] border border-white text-white px-6 py-3.5 text-sm sm:text-base font-medium hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#454659]">
              <PhoneIcon className="h-4 w-4" />
              {NAP.phone}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
