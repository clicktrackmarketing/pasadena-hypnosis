import type { Metadata } from 'next';
import Link from 'next/link';
import { FAQS, NAP } from '../../components/content';
import { PhoneIcon, ArrowRightIcon } from '../../components/Icons';
import { FaqAccordion } from '../../components/FaqAccordion';

// Target keywords (profile.ts targetKeywords['/faq']): "what does a hypnotist
// cost", "does hypnosis work for quitting smoking", "is hypnotherapy covered
// by insurance".
export const metadata: Metadata = {
  title: 'Frequently Asked Questions',
  description:
    'Cost, credentials, online availability, and what to expect at Pasadena Hypnosis in South Pasadena, CA — answered directly.',
  alternates: { canonical: '/faq' },
};

const faqPageJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQS.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
};

export default function FaqPage() {
  return (
    <div>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageJsonLd) }}
      />

      <section className="bg-white">
        <div className="max-w-[900px] mx-auto px-4 sm:px-6 py-12 sm:py-16 lg:py-20">
          <Link href="/" className="text-sm font-medium text-[#46699F] hover:text-[#2E2F3D] mb-5 inline-block">
            &larr; Back to home
          </Link>
          <p className="font-body text-xs sm:text-sm font-semibold tracking-[0.14em] uppercase text-[#46699F] mb-4">FAQ</p>
          <h1 className="font-heading text-4xl sm:text-5xl leading-[1.1] text-[#2E2F3D] mb-6">Frequently asked questions</h1>
          <p className="text-base sm:text-lg text-[#4B5468] leading-relaxed mb-8">
            Answers about cost, credentials, online availability, and what to expect. For anything not covered
            here, call the office directly.
          </p>
          <a href={`tel:${NAP.phone.replace(/[^\d+]/g, '')}`} className="inline-flex items-center gap-2 rounded-[10px] border border-[#454659] text-[#2E2F3D] px-6 py-3.5 text-sm sm:text-base font-medium hover:text-[#46699F] transition-colors">
            <PhoneIcon className="h-4 w-4" />
            {NAP.phone}
          </a>
        </div>
      </section>

      <section className="bg-[#E6EFFF] py-14 sm:py-20">
        <div className="max-w-[760px] mx-auto px-4 sm:px-6">
          <FaqAccordion items={FAQS} itemClassName="border border-[#D7DEEA] rounded-[12px] bg-white" />
        </div>
      </section>

      <section className="bg-[#454659] py-14">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <h2 className="font-heading text-2xl sm:text-3xl text-white mb-2">Still have a question?</h2>
            <p className="text-white/85">Jason can walk you through anything not covered here.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/book" className="inline-flex items-center gap-2 rounded-[10px] bg-white text-[#454659] px-6 py-3.5 text-sm sm:text-base font-medium hover:bg-[#E6EFFF] transition-colors">
              Book a Free Discovery Call
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
            <a href={`tel:${NAP.phone.replace(/[^\d+]/g, '')}`} className="inline-flex items-center gap-2 rounded-[10px] border border-white text-white px-6 py-3.5 text-sm sm:text-base font-medium hover:bg-white/10 transition-colors">
              <PhoneIcon className="h-4 w-4" />
              {NAP.phone}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
