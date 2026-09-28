import type { Metadata } from 'next';
import Link from 'next/link';
import { HOME_ANSWER, FAQS } from '../components/content';
import { ArrowRightIcon } from '../components/Icons';
import { FaqAccordion } from '../components/FaqAccordion';
import { Reveal, SplitHeading } from '../components/Motion';
import { WaveSeam } from '../components/MotionFx';
import { HomeHero } from '../components/home/HomeHero';
import { Specialties } from '../components/home/Specialties';
import { ServicesGrid } from '../components/home/ServicesGrid';
import { SessionJourney } from '../components/home/SessionJourney';
import { BreathSection } from '../components/home/BreathSection';
import { Practitioner } from '../components/home/Practitioner';
import { Reviews } from '../components/home/Reviews';
import { QuoteBand } from '../components/home/QuoteBand';
import { AreasStrip } from '../components/home/AreasStrip';
import { Gallery } from '../components/home/Gallery';
import { WhyPeopleCome } from '../components/home/WhyPeopleCome';
import { FinalCta } from '../components/home/FinalCta';

/* ---------------------------------------------------------------------------
   HOMEPAGE.

   REDESIGNED 2026-09-16. This file used to hold every section inline; it is
   now an assembly of section components under ../components/home, one file
   each, because each section owns a different piece of scroll-linked motion
   and eight animation concerns in one file is not maintainable.

   THIS FILE IS STILL A SERVER COMPONENT and must stay one — the metadata
   export below is why. Server components may import client components freely,
   so every animated section is a 'use client' leaf and the page itself ships
   no JS of its own.

   WHAT THE REDESIGN DELIBERATELY DID NOT DO, since a future editor comparing
   against git history will wonder:
     - No copy was rewritten. H1, the answer block, the specialties argument,
       the steps, the bio, the scope note, the quote, the FAQs and the service
       summaries are all still read from content.ts and still verbatim.
     - No claim was added. Nothing counts up that is not a site-verified
       figure, no review was retyped as a quote, and no stock photograph
       stands in for the practitioner, the office or a client.
     - The palette is the approved "Field & Frame" token set, unchanged.
   This was a staging and motion pass, not an editorial one.

   The answer-first paragraph lives inside <HomeHero> and keeps its
   id="answer-first" anchor.
--------------------------------------------------------------------------- */

// Target keywords (profile.ts targetKeywords['/']): "hypnotherapy pasadena",
// "hypnotherapy south pasadena", "hypnosis pasadena".
export const metadata: Metadata = {
  title: 'Certified Hypnotherapy in South Pasadena, CA',
  description: HOME_ANSWER,
  alternates: { canonical: '/' },
};

export default function HomePage() {
  return (
    <div>
      <HomeHero />
      <Specialties />
      <ServicesGrid />
      <Gallery />
      <SessionJourney />
      <BreathSection />
      <WhyPeopleCome />
      <Practitioner />
      <Reviews />
      <QuoteBand />
      <AreasStrip />

      {/* FAQ TEASER — the accordion leaf is shared with /faq and the service
          pages, so the height animation added to it there arrives here too. */}
      <section className="relative bg-[#E6EFFF] py-20 sm:py-28">
        <WaveSeam color="#E6EFFF" className="absolute bottom-full left-0" />
        <div className="mx-auto max-w-[800px] px-4 sm:px-6">
          <div className="mb-10 text-center sm:mb-12">
            <Reveal>
              <p className="mb-3 font-body text-xs font-semibold uppercase tracking-[0.18em] text-[#46699F] sm:text-[13px]">
                Before you call
              </p>
            </Reveal>
            <SplitHeading
              text="Common questions"
              className="font-heading text-[2.1rem] leading-[1.12] tracking-[-0.01em] text-[#2E2F3D] sm:text-[2.7rem]"
            />
          </div>
          <Reveal delay={0.1}>
            <FaqAccordion items={FAQS.slice(0, 4)} autoOpenOnScroll />
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-8 text-center">
              <Link
                href="/faq"
                className="ph-tap ph-underline inline-flex items-center gap-2 text-[15px] font-semibold text-[#46699F] transition-colors hover:text-[#2E2F3D] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#454659] focus-visible:ring-offset-2"
              >
                View all {FAQS.length} frequently asked questions
                <ArrowRightIcon className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <FinalCta />
    </div>
  );
}
