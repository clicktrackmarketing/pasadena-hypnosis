'use client';

/* ---------------------------------------------------------------------------
   CLOSING CTA.

   The offer is unchanged and stays deliberately small: a free discovery call
   with no obligation. No countdown, no "limited slots", no scarcity device.
   The visitor this page is written for is frequently someone who has already
   been sold something by a wellness practice and is wary; pressure tactics
   here would cost more than they earn.

   The hours come from the real Places API pull in content.ts, which is worth
   showing at the point of decision — "open until 9pm" answers the unspoken
   objection of someone reading this at the end of a workday.

   MOTION: magnetic primary button (capped at 6px so the target never runs
   away), soft reveal on the copy. Since 2026-09-28 the band rises into place
   as a rounded card that grows to full width, and a field of rippling rings
   (a voice, travelling outward) sits behind the glass hours card.
--------------------------------------------------------------------------- */

import Link from 'next/link';
import { NAP, HOURS } from '../content';
import { OPEN_WATER } from '../unsplash';
import { ArrowRightIcon, PhoneIcon, ClockIcon, MailIcon } from '../Icons';
import { responsive } from '../responsive';
import { MindScene } from '../scene/MindScene';
import { RiseIn, RollText } from '../MotionFx';
import { Reveal, SplitHeading, Magnetic, motion, useReducedMotion, EASE_OUT_SOFT } from '../Motion';

export const FinalCta = () => {
  const reduce = useReducedMotion();

  return (
    <RiseIn className="relative isolate bg-[#454659] ph-grain">
    <section className="relative isolate overflow-hidden py-16 sm:py-32">
      <img
        src={OPEN_WATER.src}
        {...responsive(OPEN_WATER.src, 'full')}
        alt=""
        aria-hidden="true"
        loading="lazy"
        className={`pointer-events-none absolute inset-0 h-full w-full object-cover opacity-15 ${reduce ? '' : 'ph-drift'}`}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-[#454659] via-[#454659]/90 to-[#2E2F3D]/95" />
      <MindScene shape="rings" tone="dark" intro={false} intensity={0.9} className="absolute inset-y-0 right-[-8%] w-full lg:w-[62%]" />

      <div className="relative mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <SplitHeading
              text="Ready to talk it through?"
              className="font-heading text-[2.2rem] sm:text-[2.9rem] lg:text-[3.3rem] leading-[1.08] tracking-[-0.018em] text-white"
            />
            <Reveal delay={0.15}>
              <p className="mt-5 max-w-[50ch] text-[16.5px] leading-[1.7] text-white/85">
                A free discovery call comes first &mdash; you talk through your situation with Jason
                directly, and there is no obligation to book anything after it.
              </p>
            </Reveal>

            <Reveal delay={0.25}>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <Magnetic>
                  <Link
                    href="/book"
                    className="group inline-flex items-center gap-2.5 rounded-[12px] bg-white px-7 py-4 text-[15px] font-semibold text-[#454659] shadow-[0_14px_36px_-16px_rgba(0,0,0,0.8)] transition-colors duration-300 hover:bg-[#E6EFFF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#454659] sm:text-base"
                  >
                    <RollText>Book a Free Discovery Call</RollText>
                    <ArrowRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </Magnetic>
                <a
                  href={NAP.phoneHref}
                  className="inline-flex items-center gap-2.5 rounded-[12px] border border-white/45 px-7 py-4 text-[15px] font-medium text-white transition-colors duration-300 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#454659] sm:text-base"
                >
                  <PhoneIcon className="h-4 w-4" />
                  {NAP.phone}
                </a>
              </div>
            </Reveal>
          </div>

          {/* Hours + email card */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '0px 0px -10% 0px' }}
            transition={{ duration: 0.8, delay: 0.2, ease: EASE_OUT_SOFT }}
            className="lg:col-span-5"
          >
            <div className="rounded-[20px] border border-white/15 bg-white/[0.07] p-7 backdrop-blur-md">
              <p className="mb-5 inline-flex items-center gap-2.5 text-[12px] font-semibold uppercase tracking-[0.16em] text-[#A9C4EE]">
                <ClockIcon className="h-4 w-4" />
                Opening hours
              </p>
              <dl className="space-y-3">
                {HOURS.map((h) => (
                  <div key={h.days} className="flex items-baseline justify-between gap-6 border-b border-white/10 pb-3 last:border-0 last:pb-0">
                    <dt className="text-[14px] text-white/85">{h.days}</dt>
                    <dd className="text-[14px] font-semibold tabular-nums text-white">{h.time}</dd>
                  </div>
                ))}
              </dl>
              <a
                href={`mailto:${NAP.email}`}
                className="ph-tap ph-underline mt-6 inline-flex items-center gap-2.5 text-[14px] font-medium text-[#A9C4EE] transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#454659]"
              >
                <MailIcon className="h-4 w-4" />
                {NAP.email}
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
    </RiseIn>
  );
};
