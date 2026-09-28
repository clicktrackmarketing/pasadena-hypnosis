'use client';

/* ---------------------------------------------------------------------------
   /book — the animated sections under the hero.

     BookFormBand  the request form in a glass panel with a travelling light
                   round its edge (.ph-glow-border). Around it, soft glows,
                   rings and marks drift apart under the pointer (DepthField).
     StepsPath     the three STEPS strung on a line that draws itself down
                   the page as you read (ScrollDraw); each stage's marker
                   lights when the line reaches it
     ScopeScrub    the scope sentence reads itself in, word by word, with
                   the scroll (ScrubText)

   THE FORM IS THE POINT OF THIS PAGE, so the rule for its band is strict:
   NOTHING THAT MOVES IS ALLOWED TO CARRY A FIELD. The form sits outside
   every <Depth> layer; only the decoration behind it responds to the
   pointer. The glow is a pseudo-element on the panel's border. The panel's
   one entrance (Reveal) runs once, as it scrolls into view, before anyone
   can be typing in it. BookingForm itself is the shared component, untouched.

   COPY: STEPS and HOURS are content.ts; the four reassurances and the scope
   sentence were already on this page.

   The stock "room" gallery strip that closed the old page was dropped — see
   the matching note on /contact.
--------------------------------------------------------------------------- */

import { useRef, useState } from 'react';
import { useMotionValueEvent } from 'motion/react';
import { HOURS, STEPS } from '../../content';
import { CheckIcon, ClockIcon, ShieldCheckIcon } from '../../Icons';
import { Spiral, Rings } from '../../Spiral';
import { BookingForm } from '../../BookingForm';
import {
  motion,
  useReducedMotion,
  useScroll,
  Reveal,
  SplitHeading,
  Stagger,
  StaggerItem,
  EASE_OUT_SOFT,
} from '../../Motion';
import { DepthField, Depth, ScrollDraw, ScrubText } from '../../MotionFx';

/* ---------------------------------------------------------- Form band -- */

export const BookFormBand = ({ reassurances }: { reassurances: string[] }) => (
  <section className="relative isolate overflow-hidden bg-[#2E2F3D] ph-grain">
    <DepthField className="relative py-16 sm:py-28">
      {/* DECORATION ONLY. Each plane shifts by its depth in px at the edges. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <Depth depth={-26} className="absolute -left-48 -top-32">
          <div className="h-[36rem] w-[36rem] rounded-full bg-[radial-gradient(closest-side,rgba(70,105,159,0.5),transparent)] blur-2xl" />
        </Depth>
        <Depth depth={34} className="absolute -bottom-40 right-[-10%]">
          <div className="h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(closest-side,rgba(93,186,71,0.14),transparent)] blur-2xl" />
        </Depth>
        <Depth depth={20} className="absolute -right-40 top-[2%] lg:right-[-4%]">
          <Rings className="h-[28rem] w-[28rem] text-[#A9C4EE]/[0.12] ph-spin-slow" count={8} />
        </Depth>
        <Depth depth={-14} className="absolute bottom-[4%] left-[34%] hidden lg:block">
          <Spiral className="h-48 w-48 text-[#A9C4EE]/[0.1] ph-spin-slower" strokeWidth={0.7} />
        </Depth>
        <Depth depth={52} className="absolute left-[44%] top-[9%]">
          <span className="block h-2 w-2 rounded-full bg-[#5DBA47]/70" />
        </Depth>
        <Depth depth={-40} className="absolute bottom-[16%] left-[6%]">
          <span className="block h-1.5 w-1.5 rounded-full bg-[#A9C4EE]/60" />
        </Depth>
        <Depth depth={64} className="absolute bottom-[8%] right-[44%]">
          <span className="block h-3 w-3 rounded-full border border-[#A9C4EE]/50" />
        </Depth>
      </div>

      <div className="relative mx-auto grid max-w-[1280px] grid-cols-1 items-start gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:gap-16 lg:px-8">
        <div className="lg:col-span-5 lg:pt-6">
          <Stagger as="ul" className="flex flex-col" gap={0.1}>
            {reassurances.map((r) => (
              <StaggerItem key={r} as="li" distance={18}>
                <span className="flex items-start gap-4 border-b border-white/10 py-5 font-heading text-[1.2rem] leading-[1.4] text-white sm:text-[1.4rem]">
                  <span className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-[#5DBA47]/40 bg-[#5DBA47]/10">
                    <CheckIcon className="h-4 w-4 text-[#5DBA47]" aria-hidden="true" />
                  </span>
                  {r}
                </span>
              </StaggerItem>
            ))}
          </Stagger>

          <Reveal delay={0.15}>
            <div className="mt-10 rounded-[20px] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm">
              <p className="mb-4 inline-flex items-center gap-2.5 text-[11.5px] font-bold uppercase tracking-[0.16em] text-[#A9C4EE]">
                <ClockIcon className="h-4 w-4" aria-hidden="true" />
                When you can call
              </p>
              <dl>
                {HOURS.map((h) => (
                  <div key={h.days} className="flex items-baseline justify-between gap-6 border-b border-white/10 py-2.5 last:border-0">
                    <dt className="text-[14.5px] text-[#D9E1F0]">{h.days}</dt>
                    <dd className="text-[14.5px] font-semibold tabular-nums text-white">{h.time}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>
        </div>

        <div id="request" className="scroll-mt-28 lg:col-span-7">
          <Reveal delay={0.08}>
            {/* THE GLASS PANEL. The form card inside is the shared component;
                this only frames it. */}
            <div className="ph-glow-border rounded-[30px] border border-white/12 bg-white/[0.07] p-2.5 shadow-[0_60px_120px_-50px_rgba(0,0,0,0.9)] backdrop-blur-xl sm:p-3.5">
              <BookingForm />
            </div>
          </Reveal>
        </div>
      </div>
    </DepthField>
  </section>
);

/* --------------------------------------------------------------- Steps -- */

/*
 * The spine, in a 100x600 box stretched to the list's height. It passes
 * through x=50 at y=100/300/500 — the vertical centres of three equal-height
 * rows — so each stage marker sits exactly on the line, and swings out
 * between them.
 */
const SPINE = 'M50 0 L50 100 C95 150 95 250 50 300 C5 350 5 450 50 500 L50 600';
const DRAW_OFFSET: [string, string] = ['start 70%', 'end 60%'];

const Node = ({ n, lit, reduce }: { n: string; lit: boolean; reduce: boolean }) => (
  <span
    className={`relative flex h-14 w-14 items-center justify-center rounded-full border-2 font-heading text-[15px] tabular-nums transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] sm:h-16 sm:w-16 sm:text-[17px] ${
      lit ? 'scale-100 border-[#2E2F3D] bg-[#2E2F3D] text-white' : 'scale-90 border-[#D7DEEA] bg-white text-[#46699F]'
    }`}
  >
    {lit && !reduce ? (
      <motion.span
        aria-hidden="true"
        className="absolute -inset-1.5 rounded-full border border-[#5DBA47]"
        initial={{ scale: 1, opacity: 0.8 }}
        animate={{ scale: 1.7, opacity: 0 }}
        transition={{ duration: 0.65, ease: 'easeOut' }}
      />
    ) : null}
    {n}
  </span>
);

export const StepsPath = () => {
  const reduce = useReducedMotion() ?? false;
  const listRef = useRef<HTMLOListElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: DRAW_OFFSET as unknown as ['start end', 'end start'],
  });
  const [lit, setLit] = useState(0);
  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    const n = STEPS.filter((_, i) => v >= (2 * i + 1) / (2 * STEPS.length) - 0.03).length;
    setLit((prev) => (prev === n ? prev : n));
  });
  const shown = reduce ? STEPS.length : lit;

  return (
    /* overflow-x-CLIP, not hidden: hidden would make this section a scroll
       container and silently stop the sticky heading from sticking. */
    <section className="relative overflow-x-clip bg-white py-16 sm:py-28">
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:gap-16 lg:px-8">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-32">
            <SplitHeading
              text="What happens next"
              className="max-w-[12ch] font-heading text-[2.2rem] sm:text-[2.9rem] lg:text-[3.3rem] leading-[1.08] tracking-[-0.018em] text-[#2E2F3D]"
            />
            {/* Progress read-out. Decorative — the <ol> carries the order. */}
            <div aria-hidden="true" className="mt-8 hidden items-center gap-2 lg:flex">
              {STEPS.map((s, i) => (
                <span key={s.n} className="h-1 w-10 overflow-hidden rounded-full bg-[#2E2F3D]/10">
                  <span
                    className={`block h-full origin-left bg-[#46699F] transition-transform duration-700 ${
                      i < shown ? 'scale-x-100' : 'scale-x-0'
                    }`}
                  />
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="relative lg:col-span-8">
          <ScrollDraw
            d={SPINE}
            viewBox="0 0 100 600"
            className="absolute bottom-0 left-0 top-0 h-full w-[72px] text-[#46699F] sm:w-24"
            strokeWidth={2.2}
            gradient={['#46699F', '#5DBA47']}
            offset={DRAW_OFFSET}
          />
          <ol ref={listRef} className="relative grid auto-rows-fr">
            {STEPS.map((s, i) => (
              <li key={s.n} className="relative flex items-center py-10 pl-[88px] sm:py-14 sm:pl-36">
                <span className="absolute left-2 top-1/2 -translate-y-1/2 sm:left-4">
                  <Node n={s.n} lit={i < shown} reduce={reduce} />
                </span>
                <motion.div
                  initial={reduce ? false : { opacity: 0, x: 36 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '0px 0px 5% 0px' }}
                  transition={{ duration: 0.65, ease: EASE_OUT_SOFT }}
                >
                  <h3 className="font-heading text-[1.6rem] leading-[1.15] text-[#2E2F3D] sm:text-[2.2rem]">{s.title}</h3>
                  <p className="mt-3 max-w-[50ch] text-[16px] leading-[1.72] text-[#4B5468] sm:text-[17px]">{s.body}</p>
                </motion.div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
};

/* --------------------------------------------------------------- Scope -- */

export const ScopeScrub = () => (
  <section className="relative overflow-hidden bg-[#E9F3EF] py-16 sm:py-28">
    <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
      <Reveal>
        <span className="mb-8 flex h-14 w-14 items-center justify-center rounded-full bg-white text-[#454659] shadow-[0_14px_30px_-16px_rgba(46,47,61,0.5)]">
          <ShieldCheckIcon className="h-6 w-6" aria-hidden="true" />
        </span>
      </Reveal>
      <ScrubText
        text="Pasadena Hypnosis is a complementary practice, not a substitute for medical or psychiatric care."
        className="max-w-[30ch] font-heading text-[1.9rem] leading-[1.2] tracking-[-0.015em] text-[#2E2F3D] sm:text-[2.8rem] lg:text-[3.3rem]"
        dim={0.18}
        offset={['start 88%', 'end 55%']}
      />
    </div>
  </section>
);
