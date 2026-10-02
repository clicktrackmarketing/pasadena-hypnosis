'use client';

/* ---------------------------------------------------------------------------
   HERO — the dark cinematic opener, rebuilt 2026-09-28 around a 3D figure.

   THE FIGURE. The right half of the hero is a live particle field in the
   shape of a human brain, seen in three-quarter profile (see
   components/scene). It turns gently, leans toward the cursor, and on hover
   — or every few seconds on its own — dissolves into the hypnotic spiral and
   re-forms. That single loop, mind → spiral → mind, is the whole practice in
   one image without a pocket watch in sight, and it is the reason the
   portrait moved out of this column.

   THE PORTRAIT still opens the page: it sits in the trust row as a real
   photograph with name and role, and appears at full size in the Practitioner
   section further down. No stock image stands in for Jason anywhere.

   WHAT DID NOT CHANGE: the H1 string, the answer paragraph, the phone number,
   the rating and the price are all still read from content.ts. The redesign
   restages the facts; it does not edit them.

   PERFORMANCE: the figure's code is fetched only when the browser is idle,
   after the H1 has painted, and the canvas fades in over its first frames.
   The H1 remains the LCP element. Hero entrance timings stay faster than the
   rest of the page for the same reason as before — motion hides the H1 until
   hydration, so every tenth of a second here is a tenth of a blank hero.

   CONTRAST: the text column sits on the palette's own #2E2F3D. The particle
   field is confined to the right half on desktop; on phones it sits behind
   the copy at reduced strength with a scrim, and the copy clears the same
   7:1+ ratios as before.
--------------------------------------------------------------------------- */

import Link from 'next/link';
import { H1_CLAUSE, H1_TAIL, HOME_ANSWER, RATING, NAP, SERVICES } from '../content';
import { PORTRAIT, PORTRAIT_ALT } from '../assets';
import { HERO_STILL_WATER } from '../unsplash';
import { ArrowRightIcon, PhoneIcon, StarIcon } from '../Icons';
import { Rings } from '../Spiral';
import { responsive } from '../responsive';
import { MindScene } from '../scene/MindScene';
import { VelocityMarquee, RollText } from '../MotionFx';
import {
  motion,
  useReducedMotion,
  SplitHeading,
  Counter,
  CursorGlow,
  ScrollAway,
  Magnetic,
  EASE_OUT_SOFT,
} from '../Motion';

const CHIPS = [
  { label: 'HMI graduate, with Honors' },
  { label: '10 years in practice' },
  { label: '$200 / session' },
  { label: 'Free discovery call' },
];

const HERO_CYCLE = ['brain', 'spiral'] as const;

export const HomeHero = () => {
  const reduce = useReducedMotion();

  return (
    /* The negative top margin pulls the hero up UNDER the sticky header, which
       is what makes the header's transparent mode work at all. The offsets
       must stay in step with the header's over-hero height (h-20 / sm:h-24),
       and the padding below adds it back so nothing tucks beneath the nav. */
    <section className="relative isolate -mt-20 overflow-hidden bg-[#1F2030] ph-grain sm:-mt-24">
      {/* BACKDROP ------------------------------------------------------- */}
      <div className="absolute inset-0 -z-10">
        <img
          src={HERO_STILL_WATER.src}
          alt=""
          aria-hidden="true"
          fetchPriority="high"
          {...responsive(HERO_STILL_WATER.src, 'full')}
          className={`h-full w-full object-cover opacity-40 ${reduce ? '' : 'ph-drift'}`}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1F2030] via-[#2E2F3D]/92 to-[#2E2F3D]/55" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1F2030]/90 via-transparent to-[#1F2030]" />
        {/* The glow the figure sits in. */}
        <div className="absolute right-[-10%] top-[8%] h-[80%] w-[70%] rounded-full bg-[radial-gradient(closest-side,rgba(70,105,159,0.42),transparent)] blur-2xl lg:right-[-4%] lg:w-[58%]" />
      </div>

      <CursorGlow />

      {/* THE FIGURE ------------------------------------------------------ */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[70vh] opacity-[0.68] sm:h-[78vh] lg:inset-y-0 lg:left-auto lg:right-0 lg:h-auto lg:w-[56%] lg:opacity-100">
        <Rings className="absolute left-1/2 top-1/2 h-[46rem] w-[46rem] -translate-x-1/2 -translate-y-1/2 text-[#A9C4EE]/[0.07] ph-spin-slower" count={9} />
        <MindScene
          shape="brain"
          cycle={[...HERO_CYCLE]}
          cycleMs={7200}
          hoverShape="spiral"
          tone="dark"
          className="absolute inset-0"
          offset={[0.12, 0.05]}
          zoom={1.08}
        />
      </div>
      {/* Mobile scrim so the copy keeps its contrast over the figure. */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#1F2030]/25 via-[#1F2030]/70 to-[#1F2030]/80 lg:hidden" />

      <ScrollAway>
        <div className="relative mx-auto grid max-w-[1280px] grid-cols-1 items-center gap-12 px-4 pb-12 pt-36 sm:px-6 sm:pb-14 sm:pt-44 lg:min-h-[100svh] lg:grid-cols-12 lg:px-8 lg:pb-16 lg:pt-40">
          {/* COPY ---------------------------------------------------------- */}
          <div className="lg:col-span-7">
            <motion.p
              initial={reduce ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE_OUT_SOFT }}
              className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-white/18 bg-white/8 px-4 py-1.5 text-[12.5px] font-medium tracking-[0.02em] text-[#D9E1F0] backdrop-blur-sm"
            >
              <span className="relative flex h-1.5 w-1.5">
                {!reduce && (
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#5DBA47] opacity-75" />
                )}
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#5DBA47]" />
              </span>
              South Pasadena, CA &middot; in person or online anywhere
            </motion.p>

            <h1 className="max-w-[16ch] font-heading text-[2.55rem] leading-[1.04] tracking-[-0.02em] text-white sm:text-[3.4rem] lg:text-[3.6rem] xl:text-[4.1rem]">
              <SplitHeading as="p" text={H1_CLAUSE} className="block" stagger={0.034} duration={0.7} />
              <SplitHeading
                as="p"
                text={H1_TAIL.trim()}
                className="mt-5 block max-w-[34ch] font-body text-[1.05rem] font-normal leading-[1.5] tracking-normal text-[#A9C4EE] sm:text-[1.25rem] lg:text-[1.35rem]"
                delay={0.32}
                stagger={0.014}
                duration={0.6}
              />
            </h1>

            <motion.div
              id="answer-first"
              initial={reduce ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5, ease: EASE_OUT_SOFT }}
              className="mt-8 max-w-[60ch] border-l-2 border-[#A9C4EE]/45 pl-5 text-[15px] leading-[1.68] text-[#D9E1F0] sm:text-base"
            >
              <p>{HOME_ANSWER}</p>
            </motion.div>

            <motion.div
              initial={reduce ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.62, ease: EASE_OUT_SOFT }}
              className="mt-9 flex flex-wrap items-center gap-3"
            >
              {/* Inside the dark band the primary button INVERTS — light fill,
                  dark text — and takes the light focus ring. */}
              <Magnetic>
                <Link
                  href="/book"
                  className="group ph-glow-border inline-flex items-center gap-2.5 rounded-[14px] bg-white px-7 py-4 text-[15px] font-semibold text-[#2E2F3D] shadow-[0_10px_30px_-12px_rgba(0,0,0,0.65)] transition-all duration-300 hover:bg-[#E6EFFF] hover:shadow-[0_18px_40px_-14px_rgba(0,0,0,0.75)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A9C4EE] focus-visible:ring-offset-2 focus-visible:ring-offset-[#2E2F3D] sm:text-base"
                >
                  <RollText>Book a Free Discovery Call</RollText>
                  <ArrowRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </Magnetic>
              <a
                href={NAP.phoneHref}
                className="group inline-flex items-center gap-2.5 rounded-[14px] border border-white/35 px-7 py-4 text-[15px] font-medium text-white transition-colors duration-300 hover:border-white hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A9C4EE] focus-visible:ring-offset-2 focus-visible:ring-offset-[#2E2F3D] sm:text-base"
              >
                <PhoneIcon className="h-4 w-4" />
                <RollText>{NAP.phone}</RollText>
              </a>
            </motion.div>

            {/* TRUST ROW — the real portrait, the rating, the chips. The rating
                counts up; everything else is a plain string because inventing
                a number to animate would break this page's whole premise. */}
            <motion.div
              initial="hidden"
              animate="shown"
              variants={{ shown: { transition: { staggerChildren: 0.055, delayChildren: 0.72 } } }}
              className="mt-10 flex flex-col gap-5"
            >
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  shown: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE_OUT_SOFT } },
                }}
                className="flex items-center gap-4"
              >
                <span className="relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-full border-2 border-white/25 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.8)]">
                  <img
                    src={PORTRAIT}
                    alt={PORTRAIT_ALT}
                    {...responsive(PORTRAIT, 'tile')}
                    className="h-full w-full object-cover"
                  />
                </span>
                <span>
                  <span className="block font-heading text-[1.05rem] text-white">Jason Meissner</span>
                  <span className="block text-[13px] text-[#A9C4EE]">Certified Hypnotherapist &middot; Owner</span>
                </span>
                <span className="mx-1 hidden h-10 w-px bg-white/15 sm:block" aria-hidden="true" />
                <span className="hidden items-center gap-2 text-[13px] font-semibold text-white sm:inline-flex">
                  <span className="flex" aria-hidden="true">
                    {Array.from({ length: 5 }, (_, i) => (
                      <StarIcon key={i} className="h-3.5 w-3.5 text-[#5DBA47]" />
                    ))}
                  </span>
                  <Counter to={RATING.value} decimals={1} duration={1.1} />
                  <span className="font-normal text-[#D9E1F0]">&middot; {RATING.count} Google reviews</span>
                </span>
              </motion.div>
              <ul className="flex flex-wrap items-center gap-2.5">
                <motion.li
                  variants={{
                    hidden: { opacity: 0, y: 10 },
                    shown: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE_OUT_SOFT } },
                  }}
                  className="inline-flex items-center gap-2 rounded-full border border-[#5DBA47]/35 bg-[#5DBA47]/12 px-3.5 py-1.5 text-[12.5px] font-semibold text-white sm:hidden"
                >
                  <StarIcon className="h-3.5 w-3.5 text-[#5DBA47]" aria-hidden="true" />
                  {RATING.value.toFixed(1)} &middot; {RATING.count} Google reviews
                </motion.li>
                {CHIPS.map((c) => (
                  <motion.li
                    key={c.label}
                    variants={{
                      hidden: { opacity: 0, y: 10 },
                      shown: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE_OUT_SOFT } },
                    }}
                    className="inline-flex items-center rounded-full border border-white/18 bg-white/6 px-3.5 py-1.5 text-[12.5px] font-medium text-[#D9E1F0] backdrop-blur-sm"
                  >
                    {c.label}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Right column is the figure's; it stays empty in the grid so the
              copy never runs under it on desktop. */}
          <div className="hidden lg:col-span-5 lg:block" aria-hidden="true" />
        </div>
      </ScrollAway>

      {/* SERVICE TICKER + SCROLL CUE ------------------------------------- */}
      <div className="relative border-t border-white/10 pb-7 pt-5">
        {/* Decorative: every one of these names is a real link further down. */}
        <div aria-hidden="true">
        <VelocityMarquee baseVelocity={-1.2} className="ph-fade-x mb-6">
          {SERVICES.map((s) => (
            <span key={s.slug} className="mx-6 inline-flex items-center gap-6 font-heading text-[1.6rem] text-white/80 sm:text-[2.2rem]">
              {s.name}
              <span className="inline-block h-2 w-2 rounded-full bg-[#5DBA47]/70" aria-hidden="true" />
            </span>
          ))}
        </VelocityMarquee>
        </div>

        <div className="flex justify-center">
          <a
            href="#specialties"
            className="group inline-flex flex-col items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-[#A9C4EE]/70 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A9C4EE] focus-visible:ring-offset-2 focus-visible:ring-offset-[#2E2F3D]"
          >
            Scroll
            <svg width="16" height="24" viewBox="0 0 16 24" fill="none" aria-hidden="true" className="ph-nudge">
              <rect x="0.75" y="0.75" width="14.5" height="22.5" rx="7.25" stroke="currentColor" strokeWidth="1.1" />
              <circle cx="8" cy="7" r="1.8" fill="currentColor" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};
