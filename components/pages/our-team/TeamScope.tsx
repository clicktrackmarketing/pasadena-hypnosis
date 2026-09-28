'use client';

/* ---------------------------------------------------------------------------
   OUR TEAM — what these credentials are, and are not.

   Full width, on its own ground, at body-copy size rather than footnote
   size. This is the sentence that makes the five certificates above read as
   fact rather than as a sales pitch — a page that displays credentials this
   prominently has to state their limit just as plainly. So the motion here is
   deliberately small: the card rises once, and a hairline draws across its
   top edge. PRACTITIONER.scopeNote, verbatim.
--------------------------------------------------------------------------- */

import { PRACTITIONER } from '../../content';
import { ShieldCheckIcon } from '../../Icons';
import { motion, useReducedMotion, Reveal, EASE_OUT_SOFT } from '../../Motion';

export const TeamScope = () => {
  const reduce = useReducedMotion();
  return (
    <section className="relative overflow-hidden bg-[#E9F3EF] py-16 sm:py-20">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <Reveal distance={20}>
          <div className="relative flex flex-col items-start gap-6 overflow-hidden rounded-[22px] border border-[#2E2F3D]/10 bg-white/75 p-7 backdrop-blur-sm sm:flex-row sm:items-center sm:p-10">
            <motion.span
              aria-hidden="true"
              className="absolute inset-x-0 top-0 h-[3px] origin-left bg-gradient-to-r from-[#46699F] via-[#5DBA47] to-[#46699F]"
              initial={reduce ? false : { scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: '0px 0px -10% 0px' }}
              transition={{ duration: 1.4, delay: 0.2, ease: EASE_OUT_SOFT }}
            />
            <span className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full bg-[#E9F3EF] ring-1 ring-[#2E2F3D]/10">
              <ShieldCheckIcon className="h-7 w-7 text-[#2E2F3D]" />
            </span>
            <div>
              <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.16em] text-[#46699F]">
                What these credentials are, and are not
              </p>
              <p className="max-w-[80ch] text-[16.5px] leading-[1.72] text-[#2E2F3D] sm:text-[17.5px]">
                {PRACTITIONER.scopeNote}
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
