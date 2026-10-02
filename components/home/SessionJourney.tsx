'use client';

/* ---------------------------------------------------------------------------
   HOW IT WORKS, as a pinned 3D journey (replaced the alternating
   HowItWorks rows on 2026-09-28; that file is kept for reference only).

   One particle figure stays pinned beside the copy while the three steps
   scroll past it, and it re-forms at each stage:

     intro   brain    the mind as it arrives
     01      rings    a conversation — the free discovery call
     02      spiral   the session itself
     03      orb      a short, settled course of work

   The figure is driven by this section's own scroll progress, not by a
   timer: the visitor is the one moving through the process, so the visitor
   moves the figure. It has no captions and claims nothing; the words beside
   it are STEPS from content.ts, verbatim (rewritten per markup #21-#24: no
   price in step two, no session count in step three).

   LAYOUT: desktop is two columns with the canvas column sticky. On phones the
   canvas itself is sticky under the header and the step cards (dark glass)
   scroll over it, so the figure is still visibly changing behind them.

   REDUCED MOTION: the figure snaps between shapes rather than dissolving
   (MindScene handles that), the glow does not shift, and entrances render
   in their final state.
--------------------------------------------------------------------------- */

import Link from 'next/link';
import { useState } from 'react';
import { STEPS } from '../content';
import { serviceImage, OUT_WALK } from '../unsplash';
import { ArrowRightIcon } from '../Icons';
import { SectionHeading } from '../SectionHeading';
import { MindScene } from '../scene/MindScene';
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  ClipReveal,
  Reveal,
  EASE_OUT_SOFT,
} from '../Motion';
import { useMotionValueEvent, useMotionTemplate } from 'motion/react';
import { useRef } from 'react';

const STEP_IMAGES = [serviceImage('discovery-call'), serviceImage('hypnotherapy-sessions'), OUT_WALK];
const SEQUENCE = ['brain', 'rings', 'spiral', 'orb'] as const;

export const SessionJourney = () => {
  const reduce = useReducedMotion();
  const stepsRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: stepsRef, offset: ['start 60%', 'end 70%'] });
  const [active, setActive] = useState(0);
  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    const i = Math.min(3, Math.max(0, Math.round(v * 3)));
    if (i !== active) setActive(i);
  });

  // The light the figure sits in shifts hue with the stage.
  const hue = useTransform(scrollYProgress, [0, 0.33, 0.66, 1], [212, 150, 218, 12]);
  const glow = useMotionTemplate`radial-gradient(closest-side, hsla(${hue}, 45%, 55%, 0.32), transparent)`;
  const bar = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="how-it-works" className="relative isolate bg-[#1F2030] text-white ph-grain">
      <div className="relative mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <div className="relative lg:grid lg:grid-cols-12 lg:gap-12">
          {/* FIGURE --------------------------------------------------------- */}
          <div className="sticky top-16 z-0 h-[46vh] sm:top-20 lg:static lg:col-span-6 lg:h-auto">
            <div className="relative h-full lg:sticky lg:top-0 lg:h-screen">
              <motion.div
                aria-hidden="true"
                className="absolute inset-[6%] rounded-full blur-2xl"
                style={reduce ? { background: 'radial-gradient(closest-side, rgba(70,105,159,0.32), transparent)' } : { background: glow }}
              />
              <MindScene
                shape="brain"
                sequence={[...SEQUENCE]}
                progress={scrollYProgress}
                tone="dark"
                intro={false}
                className="absolute inset-0"
                zoom={0.98}
              />
              {/* Stage read-out. Decorative — the <ol> carries the order. */}
              <div aria-hidden="true" className="absolute bottom-6 left-0 hidden items-end gap-5 lg:flex">
                <span className="font-heading text-[4.5rem] leading-none text-white/90 tabular-nums">
                  {active === 0 ? '00' : STEPS[active - 1]?.n}
                </span>
                <span className="mb-3 flex flex-col gap-2">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#A9C4EE]">
                    {active === 0 ? 'The process' : `Stage ${active} of ${STEPS.length}`}
                  </span>
                  <span className="block h-px w-40 bg-white/15">
                    <motion.span className="block h-full origin-left bg-[#A9C4EE]" style={reduce ? { scaleX: 1 } : { scaleX: bar }} />
                  </span>
                </span>
              </div>
            </div>
          </div>

          {/* STEPS ---------------------------------------------------------- */}
          <div ref={stepsRef} className="relative z-10 lg:col-span-6">
            <div className="flex min-h-[46vh] items-center py-14 lg:min-h-[78vh] lg:py-0">
              <div className="rounded-[22px] bg-[#1F2030]/75 p-6 backdrop-blur-md sm:p-8 lg:bg-transparent lg:p-0 lg:backdrop-blur-0">
                <SectionHeading
                  tone="light"
                  size="lg"
                  eyebrow="The process"
                  title="How it works"
                  lede={<p>Three stages, and the first one costs nothing.</p>}
                />
              </div>
            </div>

            <ol className="relative">
              {STEPS.map((s, i) => {
                const img = STEP_IMAGES[i] ?? STEP_IMAGES[0];
                const on = active === i + 1;
                return (
                  <li key={s.n} className="flex min-h-[58vh] items-center py-6 lg:min-h-[76vh]">
                    <motion.div
                      initial={reduce ? false : { opacity: 0, y: 60, filter: 'blur(8px)' }}
                      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                      viewport={{ once: true, margin: '0px 0px 5% 0px' }}
                      transition={{ duration: 0.65, ease: EASE_OUT_SOFT }}
                      className={`w-full rounded-[24px] border p-6 backdrop-blur-md transition-colors duration-700 sm:p-8 ${
                        on ? 'border-[#A9C4EE]/35 bg-white/[0.07]' : 'border-white/10 bg-[#1F2030]/70'
                      }`}
                    >
                      <div className="flex items-start gap-5">
                        <span
                          aria-hidden="true"
                          className={`flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full border font-heading text-lg transition-colors duration-700 ${
                            on ? 'border-[#A9C4EE] bg-[#A9C4EE] text-[#1F2030]' : 'border-white/25 text-[#A9C4EE]'
                          }`}
                        >
                          {s.n}
                        </span>
                        <div>
                          <h3 className="font-heading text-[1.6rem] leading-tight text-white sm:text-[2rem]">{s.title}</h3>
                          <p className="mt-3 max-w-[46ch] text-[16px] leading-[1.72] text-[#D9E1F0]">{s.body}</p>
                        </div>
                      </div>
                      <ClipReveal
                        src={img.src}
                        alt={img.alt}
                        from={i % 2 === 0 ? 'left' : 'right'}
                        className="mt-7 overflow-hidden rounded-[16px]"
                        imgClassName="aspect-[16/8] w-full object-cover"
                      />
                    </motion.div>
                  </li>
                );
              })}
            </ol>

            <div className="flex min-h-[26vh] items-center pb-20 lg:min-h-[40vh]">
              <Reveal>
                <Link
                  href="/book"
                  className="group inline-flex items-center gap-2.5 rounded-[14px] bg-white px-7 py-4 text-[15px] font-semibold text-[#2E2F3D] transition-colors hover:bg-[#E6EFFF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A9C4EE] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1F2030]"
                >
                  Book a Free Discovery Call
                  <ArrowRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
