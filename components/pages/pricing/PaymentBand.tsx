'use client';

/* ---------------------------------------------------------------------------
   PRICING — PAYMENT (redesigned 2026-09-28).

   THE COPY IS UNTOUCHED: the heading and the paragraph are exactly the words
   the page carried before, including "does not bill insurance directly".
   This is the most compliance-sensitive paragraph on the page, and a visual
   pass is not the place to smooth it.

   SIGNATURE MOTION FOR THIS SECTION: pointer-parallax depth. A settled
   particle orb (the page's one extra 3D figure) sits in a field with three
   glass tags that drift at different depths as the mouse moves across it,
   so the band reads as a space rather than a panel. The tags only restate
   the paragraph beside them — cash, credit card, HSA/FSA card — and the
   whole field is aria-hidden, so nothing is announced twice.
--------------------------------------------------------------------------- */

import { ShieldCheckIcon, CheckIcon } from '../../Icons';
import { MindScene } from '../../scene/MindScene';
import { Reveal, SplitHeading, CursorGlow, motion, useReducedMotion, EASE_OUT_SOFT } from '../../Motion';
import { DepthField, Depth } from '../../MotionFx';

const TAGS = [
  { label: 'Cash', depth: 26, pos: 'left-[2%] top-[16%] sm:left-[6%]', delay: '0s' },
  { label: 'Credit card', depth: -30, pos: 'right-[2%] top-[34%] sm:right-[4%]', delay: '-2s' },
  { label: 'HSA / FSA card', depth: 40, pos: 'left-[10%] bottom-[12%] sm:left-[16%]', delay: '-4s' },
];

export const PaymentBand = () => {
  const reduce = useReducedMotion();
  return (
    <section className="relative isolate overflow-hidden bg-[#2E2F3D] py-20 ph-grain sm:py-28">
      <CursorGlow />
      <div className="relative mx-auto grid max-w-[1280px] grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:gap-16 lg:px-8">
        <div className="lg:col-span-6">
          <motion.span
            aria-hidden="true"
            initial={reduce ? false : { opacity: 0, scale: 0.5, rotate: -30 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: EASE_OUT_SOFT }}
            className="mb-8 flex h-16 w-16 items-center justify-center rounded-full border border-[#A9C4EE]/35 bg-white/[0.04]"
          >
            <ShieldCheckIcon className="h-7 w-7 text-[#A9C4EE]" />
          </motion.span>

          <SplitHeading
            text="Self-pay, HSA/FSA-friendly"
            className="font-heading text-[2.2rem] sm:text-[2.9rem] lg:text-[3.3rem] leading-[1.08] tracking-[-0.018em] text-white"
          />

          <Reveal delay={0.18}>
            <p className="mt-7 max-w-[58ch] text-[16.5px] leading-[1.78] text-[#D9E1F0] sm:text-[17px]">
              Pasadena Hypnosis does not bill insurance directly &mdash; sessions are self-pay by cash or credit
              card. HSA and FSA cards work the same as any other credit card at checkout, so many clients are
              able to use pre-tax health-spending funds even without a direct insurance billing relationship.
            </p>
          </Reveal>
        </div>

        <div aria-hidden="true" className="lg:col-span-6">
          <DepthField className="relative mx-auto h-[20rem] max-w-[34rem] sm:h-[26rem] lg:h-[30rem]">
            <Depth depth={-10} className="absolute inset-[8%]">
              <div className="h-full w-full rounded-full bg-[radial-gradient(closest-side,rgba(70,105,159,0.42),transparent)] blur-2xl" />
            </Depth>
            <MindScene shape="orb" tone="dark" intro={false} intensity={0.85} className="absolute inset-0" />
            {TAGS.map((t) => (
              <Depth key={t.label} depth={t.depth} className={`absolute ${t.pos}`}>
                <span
                  className="ph-bob inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-[#2E2F3D]/70 px-4 py-2.5 text-[14px] font-medium text-white shadow-[0_20px_40px_-20px_rgba(0,0,0,0.8)] backdrop-blur-md sm:px-5 sm:py-3 sm:text-[15px]"
                  style={{ animationDelay: t.delay }}
                >
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#5DBA47]/20 text-[#5DBA47]">
                    <CheckIcon className="h-3 w-3" />
                  </span>
                  {t.label}
                </span>
              </Depth>
            ))}
          </DepthField>
        </div>
      </div>
    </section>
  );
};
