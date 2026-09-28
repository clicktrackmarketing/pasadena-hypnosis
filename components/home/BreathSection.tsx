'use client';

/* ---------------------------------------------------------------------------
   A PACED-BREATHING PANEL — the one piece of motion on this page that is not
   decoration.

   WHY IT IS HERE. Every other section animates to make the page feel
   considered. This one does something: it runs a 4-in / 4-hold / 6-out /
   2-rest cycle a visitor can actually follow while they sit deciding whether
   to call. A prospect for this practice is, by the site's own framing,
   frequently someone with disabling anxiety. Giving them thirty usable seconds
   before they are asked for anything is both the most on-brand thing this page
   can do and a small, real demonstration of the work.

   WHAT IT DOES NOT CLAIM, and this is the line that matters. Paced breathing
   is not hypnotherapy, and this panel says so in as many words. It is not
   presented as a treatment, a sample session, or evidence of anything. The
   copy avoids any outcome verb — no "calms you", no "reduces anxiety" —
   because this practice's whole positioning rests on not overstating, and a
   breathing widget promising a clinical effect would undercut the scope note
   two sections above it.

   TIMING. One requestAnimationFrame loop drives BOTH the ring and the label
   off the same elapsed-time clock, so they cannot drift apart over a long
   visit. Driving the ring from a CSS keyframe and the label from a JS timer
   is the obvious build and it desynchronises within a minute or two, which
   produces a visual telling you to breathe out while it expands.

   REDUCED MOTION. No loop at all: a static ring, and the pattern written out
   as text so the information is still there. The animation is also paused
   whenever the section is off screen.
--------------------------------------------------------------------------- */

import { useRef, useState } from 'react';
import { useAnimationFrame } from 'motion/react';
import { HANDS_RESTING } from '../unsplash';
import { responsive } from '../responsive';
import { Rings } from '../Spiral';
import { motion, useReducedMotion, useInView, Reveal, SplitHeading, CursorGlow } from '../Motion';

/** Seconds. Sum is the cycle length; the labels below assume these exact values. */
const IN = 4;
const HOLD = 4;
const OUT = 6;
const REST = 2;
const CYCLE = IN + HOLD + OUT + REST;

const MIN_SCALE = 0.68;
const MAX_SCALE = 1;

/** Standard ease-in-out, so the ring does not reach full size and stop dead. */
const easeInOut = (t: number) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);

type Phase = { label: string; scale: number };

const phaseAt = (elapsed: number): Phase => {
  const t = elapsed % CYCLE;
  if (t < IN) {
    return { label: 'Breathe in', scale: MIN_SCALE + (MAX_SCALE - MIN_SCALE) * easeInOut(t / IN) };
  }
  if (t < IN + HOLD) {
    return { label: 'Hold', scale: MAX_SCALE };
  }
  if (t < IN + HOLD + OUT) {
    const k = (t - IN - HOLD) / OUT;
    return { label: 'Breathe out', scale: MAX_SCALE - (MAX_SCALE - MIN_SCALE) * easeInOut(k) };
  }
  return { label: 'Rest', scale: MIN_SCALE };
};

export const BreathSection = () => {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement | null>(null);
  const inView = useInView(sectionRef, { margin: '0px 0px -15% 0px' });

  const ringRef = useRef<HTMLDivElement | null>(null);
  const [label, setLabel] = useState('Breathe in');
  const startedAt = useRef<number | null>(null);

  useAnimationFrame((now) => {
    if (reduce || !inView) return;
    if (startedAt.current === null) startedAt.current = now;
    const elapsed = (now - startedAt.current) / 1000;
    const { label: l, scale } = phaseAt(elapsed);
    // Written straight to style rather than through React state: this runs at
    // 60fps and a setState per frame would re-render the whole section.
    if (ringRef.current) ringRef.current.style.transform = `scale(${scale.toFixed(4)})`;
    setLabel((prev) => (prev === l ? prev : l));
  });

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-[#2E2F3D] py-16 ph-grain sm:py-28">
      <img
        src={HANDS_RESTING.src}
        {...responsive(HANDS_RESTING.src, 'full')}
        alt=""
        aria-hidden="true"
        loading="lazy"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-[0.16]"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#2E2F3D] via-[#2E2F3D]/85 to-[#2E2F3D]/70" />
      <CursorGlow color="rgba(93,186,71,0.14)" />

      <div className="relative mx-auto grid max-w-[1280px] grid-cols-1 items-center gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:gap-20 lg:px-8">
        <div>
          <Reveal>
            <p className="mb-4 font-body text-[11.5px] font-bold uppercase tracking-[0.2em] text-[#A9C4EE] sm:text-xs">
              While you are here
            </p>
          </Reveal>
          <SplitHeading
            text="Thirty seconds, before you decide anything."
            className="max-w-[16ch] font-heading text-[2.2rem] sm:text-[2.9rem] lg:text-[3.3rem] leading-[1.08] tracking-[-0.018em] text-white"
          />
          <Reveal delay={0.15}>
            <p className="mt-6 max-w-[52ch] text-[16px] leading-[1.72] text-[#D9E1F0]">
              Follow the ring for a few rounds if you like &mdash; in for four, hold for four, out for six.
              It is a paced-breathing pattern, not hypnotherapy and not a session. Consider it somewhere to
              put your attention while you read the rest of the page.
            </p>
          </Reveal>
          <Reveal delay={0.25}>
            <p className="mt-6 inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-[12.5px] text-[#A9C4EE]">
              Hypnotherapy itself is one-to-one work with Jason, in the room or by video.
            </p>
          </Reveal>
        </div>

        {/* THE RING ------------------------------------------------------- */}
        <div className="flex items-center justify-center">
          <motion.div
            initial={reduce ? false : { opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex h-[19rem] w-[19rem] items-center justify-center sm:h-[23rem] sm:w-[23rem]"
          >
            <Rings className="absolute inset-0 h-full w-full text-[#A9C4EE]/20 ph-spin-slower" count={7} />

            {/* Expanding halo, one cycle behind the ring — CSS-driven because
                it is pure ambience and does not have to stay in lockstep with
                the label the way the ring does. */}
            {!reduce && (
              <span className="absolute h-44 w-44 rounded-full bg-[#5DBA47]/12 ph-ripple sm:h-56 sm:w-56" />
            )}

            <div
              ref={ringRef}
              style={{ transform: `scale(${reduce ? 0.9 : MIN_SCALE})`, willChange: 'transform' }}
              className="flex h-44 w-44 items-center justify-center rounded-full border border-[#A9C4EE]/40 bg-gradient-to-br from-[#46699F]/35 to-[#5DBA47]/20 backdrop-blur-sm sm:h-56 sm:w-56"
            >
              <div className="text-center">
                {reduce ? (
                  <p className="px-6 font-heading text-lg leading-snug text-white">
                    In 4 &middot; Hold 4 &middot; Out 6
                  </p>
                ) : (
                  <>
                    {/* aria-live is deliberately OFF. A label changing four
                        times every sixteen seconds would hijack a screen
                        reader indefinitely; the pattern is stated in the
                        paragraph beside it instead. */}
                    <p aria-hidden="true" className="font-heading text-2xl text-white sm:text-[1.75rem]">
                      {label}
                    </p>
                    <p aria-hidden="true" className="mt-1.5 text-[11px] uppercase tracking-[0.22em] text-[#A9C4EE]">
                      4 &middot; 4 &middot; 6
                    </p>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
