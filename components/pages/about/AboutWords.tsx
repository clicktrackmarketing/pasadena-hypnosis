'use client';

/* ---------------------------------------------------------------------------
   ABOUT — "In Jason's words".

   Signature motion: the training sentence is SCRUBBED in, word by word, by
   the visitor's own scroll (ScrubText). It is the one sentence on the old
   About page that says where the training came from, so it gets the whole
   width and the largest type on the page after the H1.

   Everything here is verbatim: REAL_COPY.about.training and .hmi from
   content.ts, and the diploma line from CREDENTIALS (the same fields the
   certificate itself carries). The spiral behind is decorative and turns
   with the scroll; under reduced motion it simply sits still.
--------------------------------------------------------------------------- */

import Link from 'next/link';
import { REAL_COPY, CREDENTIALS } from '../../content';
import { ArrowRightIcon } from '../../Icons';
import { Spiral } from '../../Spiral';
import { Reveal, Stagger } from '../../Motion';
import { ScrubText, ScrollRotate, SlideItem } from '../../MotionFx';

export const AboutWords = () => {
  const diploma = CREDENTIALS.find((c) => c.featured) ?? CREDENTIALS[0];

  return (
    <section className="relative overflow-hidden bg-white py-20 sm:py-28">
      {/* Decorative: the logo's spiral, turning with the page. */}
      <div aria-hidden="true" className="pointer-events-none absolute -right-48 top-8 hidden md:block">
        <ScrollRotate degrees={140}>
          <Spiral className="h-[40rem] w-[40rem] text-[#A9C4EE]/40" strokeWidth={0.6} />
        </ScrollRotate>
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 bottom-[-12rem] h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(closest-side,rgba(230,239,255,0.9),transparent)]"
      />

      <div className="relative mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <Reveal dir="right" distance={30}>
          <p className="mb-10 inline-flex items-center gap-3 font-body text-xs font-semibold uppercase tracking-[0.2em] text-[#46699F] sm:mb-14 sm:text-[13px]">
            <span aria-hidden="true" className="inline-block h-px w-10 bg-[#46699F]/60" />
            In Jason&rsquo;s words
          </p>
        </Reveal>

        <ScrubText
          as="p"
          text={REAL_COPY.about.training}
          dim={0.13}
          offset={['start 82%', 'end 48%']}
          className="max-w-[22ch] font-heading text-[2.15rem] leading-[1.14] tracking-[-0.022em] text-[#2E2F3D] sm:text-[3.3rem] lg:text-[4.4rem]"
        />

        <Stagger
          className="mt-16 grid grid-cols-1 gap-6 border-t border-[#2E2F3D]/10 pt-10 sm:mt-20 md:grid-cols-2 md:gap-10"
          gap={0.14}
        >
          <SlideItem from="left">
            <p className="max-w-[44ch] text-[17px] leading-[1.75] text-[#4B5468]">
              {REAL_COPY.about.hmi}{' '}
              <a
                href="https://hypnosis.edu"
                target="_blank"
                rel="noopener noreferrer"
                className="ph-tap ph-underline font-medium text-[#46699F]"
              >
                hypnosis.edu
              </a>
            </p>
          </SlideItem>

          <SlideItem from="right">
            <div className="rounded-[20px] border border-[#D7DEEA] bg-[#F7F9FC] p-6 sm:p-7">
              <span className="inline-flex items-center rounded-full bg-[#5DBA47] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.1em] text-[#2E2F3D]">
                The diploma
              </span>
              <p className="mt-4 font-heading text-[1.3rem] leading-snug text-[#2E2F3D]">{diploma.award}</p>
              <p className="mt-2 text-[14px] leading-[1.6] text-[#4B5468]">
                {diploma.issuer} &middot; {diploma.date}
              </p>
              <Link
                href="/our-team"
                className="ph-tap group mt-5 inline-flex items-center gap-2 text-[14px] font-semibold text-[#46699F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#454659] focus-visible:ring-offset-2"
              >
                Credentials &amp; documents
                <ArrowRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </SlideItem>
        </Stagger>
      </div>
    </section>
  );
};
