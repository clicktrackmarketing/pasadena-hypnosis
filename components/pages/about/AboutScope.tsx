'use client';

/* ---------------------------------------------------------------------------
   ABOUT — the scope note.

   PRACTITIONER.scopeNote, verbatim, at body size on its own ground. A page
   that has just shown a 5.0 rating and a wall of reviews has to state the
   limit of the practitioner's scope just as plainly — so this block is NOT
   decorated down into a footnote. The only motion is the water line along
   its top edge (WaveSeam) and a single, quick entrance for the card.
--------------------------------------------------------------------------- */

import { PRACTITIONER } from '../../content';
import { ShieldCheckIcon } from '../../Icons';
import { Reveal } from '../../Motion';
import { WaveSeam } from '../../MotionFx';

export const AboutScope = () => (
  <section className="relative bg-[#E9F3EF] py-16 sm:py-20">
    <WaveSeam color="#E9F3EF" className="absolute inset-x-0 bottom-full" />
    <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
      <Reveal distance={18}>
        <div className="flex flex-col items-start gap-6 rounded-[22px] border border-[#2E2F3D]/10 bg-white/75 p-7 sm:flex-row sm:items-center sm:p-10">
          <span className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full bg-[#E9F3EF] ring-1 ring-[#2E2F3D]/10">
            <ShieldCheckIcon className="h-7 w-7 text-[#2E2F3D]" />
          </span>
          <div>
            <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.16em] text-[#46699F]">Scope of practice</p>
            <p className="max-w-[78ch] text-[16.5px] leading-[1.72] text-[#2E2F3D] sm:text-[17.5px]">
              {PRACTITIONER.scopeNote}
            </p>
          </div>
        </div>
      </Reveal>
    </div>
  </section>
);
