'use client';

/* ---------------------------------------------------------------------------
   FAQ — "NOT ANSWERED HERE?" (redesigned 2026-09-28).

   This used to be a small bordered box under the accordion. Its two
   sentences are now the page's closing statement, word for word:

     "Questions about a specific condition are usually better on the phone
      than in writing."  — SCRUBBED: each word brightens in order as the
                           band scrolls through, so it is read at the
                           visitor's own pace.
     "The discovery call exists for exactly that, and it costs nothing."

   SIGNATURE MOTION FOR THIS SECTION: the scrubbed statement, beside a
   layered picture stack in which each photograph is uncovered by a sweeping
   colour curtain and drifts at its own parallax speed. The pictures are the
   same three atmospheric stock frames the page already used, with their own
   alt text; none is presented as the practice's office.

   A travelling wave sits on the band's top edge, so the seam from the white
   list above moves like water rather than ruling a line.
--------------------------------------------------------------------------- */

import Link from 'next/link';
import { GALLERY } from '../../unsplash';
import { ArrowRightIcon } from '../../Icons';
import { responsive } from '../../responsive';
import { Magnetic, Parallax, Reveal } from '../../Motion';
import { CurtainReveal, ScrubText, WaveSeam } from '../../MotionFx';

const MAIN = GALLERY[5];
const SMALL_A = GALLERY[1];
const SMALL_B = GALLERY[4];

export const FaqStatement = () => (
  <section className="relative isolate overflow-x-clip bg-[#E9F3EF] pb-16 pt-16 sm:pb-32 sm:pt-24">
    <WaveSeam color="#E9F3EF" className="absolute inset-x-0 bottom-full" />

    <div className="mx-auto grid max-w-[1280px] grid-cols-1 items-center gap-16 px-4 sm:px-6 lg:grid-cols-12 lg:gap-16 lg:px-8">
      <div className="lg:col-span-7">
        <Reveal>
          <h2 className="mb-7 inline-flex items-center gap-3 text-[12.5px] font-bold uppercase tracking-[0.2em] text-[#46699F]">
            <span aria-hidden="true" className="inline-block h-px w-8 bg-[#46699F]/60" />
            Not answered here?
          </h2>
        </Reveal>

        <ScrubText
          text="Questions about a specific condition are usually better on the phone than in writing."
          className="font-heading text-[2.1rem] leading-[1.18] tracking-[-0.015em] text-[#2E2F3D] sm:text-[2.9rem] lg:text-[3.4rem]"
          dim={0.16}
          offset={['start 85%', 'end 50%']}
        />

        <Reveal delay={0.1}>
          <p className="mt-8 max-w-[46ch] text-[17px] leading-[1.7] text-[#4B5468]">
            The discovery call exists for exactly that, and it costs nothing.
          </p>
        </Reveal>

        <Reveal delay={0.16}>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Magnetic>
              <Link
                href="/book"
                className="group inline-flex items-center gap-2.5 rounded-[14px] bg-[#454659] px-7 py-4 text-[15px] font-semibold text-white shadow-[0_16px_36px_-18px_rgba(46,47,61,0.8)] transition-colors duration-300 hover:bg-[#33344A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#454659] focus-visible:ring-offset-2 focus-visible:ring-offset-[#E9F3EF]"
              >
                Book a Free Discovery Call
                <ArrowRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Magnetic>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 rounded-[14px] border border-[#2E2F3D]/25 px-7 py-4 text-[15px] font-medium text-[#2E2F3D] transition-colors duration-300 hover:border-[#454659] hover:bg-white/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#454659] focus-visible:ring-offset-2 focus-visible:ring-offset-[#E9F3EF]"
            >
              Browse services
            </Link>
          </div>
        </Reveal>
      </div>

      {/* Picture stack — three depths, three curtains. */}
      <div className="lg:col-span-5">
        <div className="relative mx-auto max-w-[27rem] pb-14 pl-6 pr-4 sm:pb-20 sm:pl-12 sm:pr-10">
          <Parallax speed={22}>
            <CurtainReveal
              color="#46699F"
              className="overflow-hidden rounded-[26px] shadow-[0_40px_80px_-40px_rgba(46,47,61,0.6)]"
            >
              <img
                src={MAIN.src}
                alt={MAIN.alt}
                loading="lazy"
                {...responsive(MAIN.src, 'half')}
                className="aspect-[4/5] w-full object-cover"
              />
            </CurtainReveal>
          </Parallax>

          <div className="absolute bottom-0 left-0 w-[46%]">
            <Parallax speed={-34}>
              <CurtainReveal
                color="#2E2F3D"
                delay={0.25}
                className="overflow-hidden rounded-[18px] border-[5px] border-[#E9F3EF] shadow-[0_30px_60px_-30px_rgba(46,47,61,0.65)]"
              >
                <img
                  src={SMALL_A.src}
                  alt={SMALL_A.alt}
                  loading="lazy"
                  {...responsive(SMALL_A.src, 'tile')}
                  className="aspect-square w-full object-cover"
                />
              </CurtainReveal>
            </Parallax>
          </div>

          <div className="absolute right-0 top-8 w-[34%]">
            <Parallax speed={-18}>
              <CurtainReveal
                color="#A9C4EE"
                delay={0.4}
                className="overflow-hidden rounded-[16px] border-[5px] border-[#E9F3EF] shadow-[0_24px_50px_-26px_rgba(46,47,61,0.6)]"
              >
                <img
                  src={SMALL_B.src}
                  alt={SMALL_B.alt}
                  loading="lazy"
                  {...responsive(SMALL_B.src, 'tile')}
                  className="aspect-[3/4] w-full object-cover"
                />
              </CurtainReveal>
            </Parallax>
          </div>
        </div>
      </div>
    </div>
  </section>
);
