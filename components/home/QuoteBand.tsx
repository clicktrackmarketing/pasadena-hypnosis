'use client';

/* ---------------------------------------------------------------------------
   QUOTE BAND.

   The quote is the one the live site already runs, carried across unchanged
   from content.ts, attributed the way the live site attributes it: to Carl
   Jung. (The line that used to sit here talked about the website itself —
   the client asked for that to stop, markup #27.) A serif pull-quote
   floating unattributed would read as the practitioner's own words.

   MOTION (2026-09-28): the quote is SCRUBBED — each word brightens in order
   as the band scrolls through the viewport, so it is read at the speed the
   visitor chooses. Behind it, a particle tunnel flies slowly toward the
   viewer: the one figure on the site that literally "looks inside". Both
   render still under reduced motion.
--------------------------------------------------------------------------- */

import { REAL_COPY } from '../content';
import { QuoteIcon } from '../Icons';
import { MindScene } from '../scene/MindScene';
import { ScrubText } from '../MotionFx';
import { motion, useReducedMotion, EASE_OUT_SOFT } from '../Motion';

export const QuoteBand = () => {
  const reduce = useReducedMotion();

  return (
    <section className="relative isolate overflow-hidden bg-[#1F2030] py-16 ph-grain sm:py-32">
      <MindScene shape="tunnel" tone="dark" intro={false} intensity={0.75} className="absolute inset-0" interactive />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(closest-side,rgba(31,32,48,0.55),rgba(31,32,48,0.92))]" />

      <div className="relative mx-auto max-w-[980px] px-4 text-center sm:px-6">
        <motion.div
          initial={reduce ? false : { opacity: 0, scale: 0.6, rotate: -20 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, ease: EASE_OUT_SOFT }}
        >
          <QuoteIcon className="mx-auto mb-10 h-11 w-11 text-[#A9C4EE]" />
        </motion.div>

        <blockquote className="font-heading text-[1.65rem] leading-[1.38] text-white sm:text-[2.5rem]">
          <ScrubText
            text={'“Your vision will become clear only when you can look into your own heart.'}
            className="block"
            offset={['start 88%', 'end 55%']}
          />
          <ScrubText
            text={'Who looks outside, dreams; who looks inside, awakes.”'}
            className="mt-4 block text-[#A9C4EE]"
            offset={['start 85%', 'end 50%']}
          />
        </blockquote>

        <motion.p
          initial={reduce ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, delay: 0.4 }}
          className="mt-10 text-[13px] tracking-wide text-[#D9E1F0]/60"
        >
          Carl Jung
        </motion.p>
        {/* Belt and braces: if the copy in content.ts is ever edited, this
            renders the difference rather than silently drifting from it. */}
        {REAL_COPY.quote.includes('awakes') ? null : (
          <p className="mt-4 text-[13px] text-[#F09D8B]">{REAL_COPY.quote}</p>
        )}
      </div>
    </section>
  );
};
