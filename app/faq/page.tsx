import type { Metadata } from 'next';
import Link from 'next/link';
import { FAQS, NAP } from '../../components/content';
import { TWO_TALKING, GALLERY } from '../../components/unsplash';
import { PhoneIcon, ArrowRightIcon, MailIcon } from '../../components/Icons';
import { FaqAccordion } from '../../components/FaqAccordion';
import { PageHero, heroPrimaryBtn, heroGhostBtn } from '../../components/PageHero';
import { CtaBand } from '../../components/CtaBand';
import { Reveal, Counter, Parallax, ClipReveal } from '../../components/Motion';

// Target keywords (profile.ts targetKeywords['/faq']): "what does a hypnotist
// cost", "does hypnosis work for quitting smoking", "is hypnotherapy covered
// by insurance".
export const metadata: Metadata = {
  title: 'Frequently Asked Questions',
  description:
    'Cost, credentials, online availability, and what to expect at Pasadena Hypnosis in South Pasadena, CA — answered directly.',
  alternates: { canonical: '/faq' },
};

/*
 * FAQPage schema lives HERE and only here, built from the same FAQS array the
 * accordion renders — they cannot drift. Service pages show three of these
 * questions without schema on purpose: emitting the same FAQPage from fourteen
 * URLs is duplicate structured data, not fourteen times the coverage.
 */
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

      <PageHero
        eyebrow="FAQ"
        title="Frequently asked questions"
        image={TWO_TALKING}
        facts={[
          { k: 'Questions', v: 'Ten, answered' },
          { k: 'Cost', v: '$200 per session' },
          { k: 'Insurance', v: 'Self-pay, HSA/FSA' },
          { k: 'First call', v: 'Free' },
        ]}
        breadcrumb={{ label: 'Back to home', href: '/' }}
        lede={
          <p>
            Cost, credentials, online availability and what actually happens in a session &mdash; answered directly,
            with no form in the way. For anything not covered here, call the office.
          </p>
        }
      >
        <a href={NAP.phoneHref} className={heroPrimaryBtn}>
          <PhoneIcon className="h-4 w-4" />
          {NAP.phone}
        </a>
        <a href={`mailto:${NAP.email}`} className={heroGhostBtn}>
          <MailIcon className="h-4 w-4" />
          Email a question
        </a>
      </PageHero>

      <section className="bg-[#E6EFFF] py-20 sm:py-28">
        <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:gap-16 lg:px-8">
        <div className="lg:col-span-7">
          <Reveal>
            <p className="mb-8 flex items-baseline gap-2 text-[13px] font-semibold uppercase tracking-[0.14em] text-[#46699F]">
              <Counter to={FAQS.length} className="font-heading text-[1.6rem] normal-case tracking-normal text-[#2E2F3D]" />
              questions answered
            </p>
          </Reveal>

          {/* initialOpenIndex={null} rather than 0: on a page that is nothing
              but the list, opening the first answer for the visitor pushes
              everything below it down before they have chosen anything. */}
          <Reveal delay={0.08}>
            <FaqAccordion items={FAQS} initialOpenIndex={null} autoOpenOnScroll />
          </Reveal>

          <Reveal delay={0.12}>
            <div className="mt-10 rounded-[18px] border border-[#D7DEEA] bg-white p-6 sm:p-8">
              <h2 className="mb-2.5 font-heading text-[1.3rem] text-[#2E2F3D]">Not answered here?</h2>
              <p className="mb-5 text-[15px] leading-[1.7] text-[#4B5468]">
                Questions about a specific condition are usually better on the phone than in writing. The discovery
                call exists for exactly that, and it costs nothing.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/book"
                  className="inline-flex items-center gap-2 rounded-[12px] bg-[#454659] px-6 py-3.5 text-[15px] font-semibold text-white transition-colors duration-300 hover:bg-[#33344A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#454659] focus-visible:ring-offset-2"
                >
                  Book a Free Discovery Call
                  <ArrowRightIcon className="h-4 w-4" />
                </Link>
                <Link
                  href="/services"
                  className="inline-flex items-center gap-2 rounded-[12px] border border-[#2E2F3D]/20 px-6 py-3.5 text-[15px] font-medium text-[#2E2F3D] transition-colors duration-300 hover:border-[#454659] hover:text-[#46699F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#454659] focus-visible:ring-offset-2"
                >
                  Browse services
                </Link>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Picture column. Decorative — every answer is in the accordion. */}
        <aside className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <Parallax speed={20}>
              <ClipReveal
                src={GALLERY[5].src}
                alt={GALLERY[5].alt}
                from="bottom"
                className="overflow-hidden rounded-[20px] border border-[#D7DEEA] shadow-[0_28px_64px_-34px_rgba(46,47,61,0.45)]"
                imgClassName="aspect-[4/5] w-full object-cover"
              />
            </Parallax>
            <div className="mt-5 grid grid-cols-2 gap-4">
              <ClipReveal src={GALLERY[1].src} alt={GALLERY[1].alt} from="left" delay={0.1} className="aspect-square overflow-hidden rounded-[16px] border border-[#D7DEEA]" imgClassName="h-full w-full object-cover" />
              <ClipReveal src={GALLERY[4].src} alt={GALLERY[4].alt} from="right" delay={0.18} className="aspect-square overflow-hidden rounded-[16px] border border-[#D7DEEA]" imgClassName="h-full w-full object-cover" />
            </div>
          </div>
        </aside>
        </div>
      </section>

      <CtaBand
        title="Still have a question?"
        body="Jason can walk you through anything not covered here, on a call that costs nothing."
      />
    </div>
  );
}
