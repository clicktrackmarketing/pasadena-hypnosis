'use client';

/* ---------------------------------------------------------------------------
   BLOG — SUBJECT TICKER (added 2026-09-28).

   SIGNATURE MOTION FOR THIS BAND: two scroll-velocity marquees running in
   opposite directions. They drift on their own and speed up, reverse and
   lean with the scroll wheel, so the band answers the reader's own movement.

   Row one is the service pages the planned subjects point to, in display
   type; row two is the planned titles themselves. Both are the page's own
   words, repeated from the cards above — so the whole band is aria-hidden
   and carries no links. It is texture, not navigation.
--------------------------------------------------------------------------- */

import { Spiral } from '../../Spiral';
import { VelocityMarquee } from '../../MotionFx';

export const TopicTicker = ({ labels, titles }: { labels: string[]; titles: string[] }) => (
  <div aria-hidden="true" className="relative overflow-hidden bg-white py-16 sm:py-24">
    <VelocityMarquee baseVelocity={-1.3} className="ph-fade-x">
      {labels.map((l, i) => (
        <span
          key={l}
          className="mx-4 inline-flex items-center gap-8 font-heading text-[2.8rem] leading-[1.15] tracking-[-0.02em] sm:mx-6 sm:gap-12 sm:text-[4.6rem] lg:text-[6rem]"
          style={
            i % 2 === 1
              ? { color: 'transparent', WebkitTextStroke: '1.2px #2E2F3D' }
              : { color: '#2E2F3D' }
          }
        >
          {l}
          <Spiral className="h-10 w-10 text-[#5DBA47] ph-spin-slow sm:h-14 sm:w-14" strokeWidth={1.4} />
        </span>
      ))}
    </VelocityMarquee>

    <VelocityMarquee baseVelocity={0.9} className="ph-fade-x mt-5 sm:mt-8">
      {titles.map((t) => (
        <span key={t} className="mx-5 inline-flex items-center gap-5 text-[15px] text-[#4B5468] sm:mx-7 sm:text-[17px]">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#46699F]" />
          {t}
        </span>
      ))}
    </VelocityMarquee>
  </div>
);
