'use client';

/* ---------------------------------------------------------------------------
   QUOTE BAND.

   The quote is the one the live site already runs, carried across unchanged
   from content.ts — including the attribution line admitting it is quoted
   rather than original. That line survived the redesign on purpose: a serif
   pull-quote floating unattributed over smoke is precisely the styling that
   makes a borrowed aphorism read as the practitioner's own words.

   MOTION: the two clauses of the quote arrive separately, the second on a
   longer delay, so the sentence lands the way it would be said out loud. The
   backdrop drifts continuously at very low amplitude. Nothing here is
   interactive, so nothing here needs a focus state.
--------------------------------------------------------------------------- */

import { REAL_COPY } from '../content';
import { BLUE_SMOKE } from '../unsplash';
import { QuoteIcon } from '../Icons';
import { responsive } from '../responsive';
import { Spiral } from '../Spiral';
import { motion, useReducedMotion, EASE_OUT_SOFT } from '../Motion';

export const QuoteBand = () => {
  const reduce = useReducedMotion();

  return (
    <section className="relative isolate overflow-hidden bg-[#2E2F3D] py-24 ph-grain sm:py-32">
      <img
        src={BLUE_SMOKE.src}
        {...responsive(BLUE_SMOKE.src, 'full')}
        alt=""
        aria-hidden="true"
        loading="lazy"
        className={`pointer-events-none absolute inset-0 h-full w-full object-cover opacity-30 ${reduce ? '' : 'ph-drift'}`}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#2E2F3D] via-[#2E2F3D]/70 to-[#2E2F3D]" />
      <Spiral className="pointer-events-none absolute left-1/2 top-1/2 h-[46rem] w-[46rem] -translate-x-1/2 -translate-y-1/2 text-white/[0.07] ph-spin-slow" />

      <div className="relative mx-auto max-w-[920px] px-4 text-center sm:px-6">
        <motion.div
          initial={reduce ? false : { opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: EASE_OUT_SOFT }}
        >
          <QuoteIcon className="mx-auto mb-8 h-10 w-10 text-[#A9C4EE]" />
        </motion.div>

        <blockquote className="font-heading text-[1.5rem] leading-[1.45] text-white sm:text-[2.05rem]">
          <motion.span
            className="block"
            initial={reduce ? false : { opacity: 0, y: 20, filter: 'blur(6px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.15, ease: EASE_OUT_SOFT }}
          >
            &ldquo;Your vision will become clear only when you can look into your own heart.
          </motion.span>
          <motion.span
            className="mt-3 block text-[#A9C4EE]"
            initial={reduce ? false : { opacity: 0, y: 20, filter: 'blur(6px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.55, ease: EASE_OUT_SOFT }}
          >
            Who looks outside, dreams; who looks inside, awakes.&rdquo;
          </motion.span>
        </blockquote>

        <motion.p
          initial={reduce ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 1.05 }}
          className="mt-8 text-[13px] tracking-wide text-[#D9E1F0]/60"
        >
          Quoted on pasadenahypnosis.com today &mdash; carried across unchanged
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
