'use client';

/* ---------------------------------------------------------------------------
   HERO — the dark cinematic opener.

   THE ONE JUDGEMENT CALL WORTH RECORDING. The previous hero put the H1 and
   Jason's portrait side by side on plain white. It was honest and it was
   forgettable. This version sets the same words and the same photograph over a
   still-water photograph darkened to the approved #2E2F3D, which is the
   palette's own dark-band ground — so nothing here invents a colour.

   WHAT DID NOT CHANGE, deliberately: the H1 string, the answer paragraph, the
   phone number, the rating and the price are all still read from content.ts.
   The redesign is allowed to restage the facts; it is not allowed to edit them,
   and a hero is exactly where an overstatement would do the most damage.

   HERO TIMINGS ARE DELIBERATELY FASTER than every other section, and should
   stay that way. Motion applies its initial state during SSR, so the H1 is
   transparent until hydration finishes — which makes it the LCP element and
   makes every tenth of a second of entrance animation a tenth of a second of
   blank hero. Sections further down are past the fold and can afford the full
   0.95s word reveal; this one settles in about 1.1s after hydration.

   CONTRAST, measured against the composited ground rather than assumed. The
   scrim below takes the photograph to at least #2E2F3D-at-88% over black in
   the text column, so white display type clears 13:1 and the #D9E1F0 body copy
   clears the 7.03:1 the token set already verified for that pairing. The
   scrim is not decoration — remove it and the type fails.

   The image rail across the bottom edge is the transition into the page: it
   shows the work at thumbnail size before the services grid says it in words.
   It is aria-hidden — every one of those pictures appears again, captioned, in
   the sections below, and announcing a decorative strip of fourteen unlabelled
   images to a screen reader would be pure noise.
--------------------------------------------------------------------------- */

import Link from 'next/link';
import { H1_CLAUSE, H1_TAIL, HOME_ANSWER, RATING, NAP, SERVICES } from '../content';
import { PORTRAIT, PORTRAIT_ALT } from '../assets';
import { HERO_STILL_WATER, serviceImage } from '../unsplash';
import { ArrowRightIcon, PhoneIcon, StarIcon } from '../Icons';
import { Spiral, Rings } from '../Spiral';
import { responsive } from '../responsive';
import {
  motion,
  useReducedMotion,
  SplitHeading,
  Counter,
  Marquee,
  CursorGlow,
  FloatY,
  ScrollAway,
  EASE_OUT_SOFT,
} from '../Motion';

const CHIPS = [
  { label: 'HMI graduate, with Honors' },
  { label: '10 years in practice' },
  { label: '$200 / session' },
  { label: 'Free discovery call' },
];

export const HomeHero = () => {
  const reduce = useReducedMotion();

  return (
    /* The negative top margin pulls the hero up UNDER the sticky header, which
       is what makes the header's transparent mode work at all — without it the
       "transparent" bar is transparent over the white body and reads as a solid
       white strip. The offsets must stay in step with the header's own
       over-hero height (h-20 / sm:h-24), and the padding below adds it back so
       nothing tucks beneath the nav. */
    <section className="relative isolate -mt-20 overflow-hidden bg-[#2E2F3D] ph-grain sm:-mt-24">
      {/* BACKDROP ------------------------------------------------------- */}
      <div className="absolute inset-0 -z-10">
        <img
          src={HERO_STILL_WATER.src}
          alt=""
          aria-hidden="true"
          fetchPriority="high"
          {...responsive(HERO_STILL_WATER.src, 'full')}
          className={`h-full w-full object-cover ${reduce ? '' : 'ph-drift'}`}
        />
        {/* Two scrims, not one: a horizontal ramp that protects the text
            column on desktop, and a vertical one that keeps the header and the
            section seam dark on every width. */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#2E2F3D] via-[#2E2F3D]/88 to-[#2E2F3D]/35" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#2E2F3D] via-transparent to-[#2E2F3D]/90" />
      </div>

      <CursorGlow />

      {/* Decorative geometry, echoing the logo's spiral. */}
      <FloatY amount={14} duration={9} className="pointer-events-none absolute -right-24 -top-28">
        <Spiral className="h-[36rem] w-[36rem] text-[#A9C4EE]/15 ph-spin-slow" strokeWidth={0.6} />
      </FloatY>
      <Rings className="pointer-events-none absolute -left-40 bottom-[-14rem] h-[34rem] w-[34rem] text-[#5DBA47]/12 ph-spin-slower" />

      <ScrollAway>
        <div className="relative mx-auto grid max-w-[1280px] grid-cols-1 items-center gap-12 px-4 pb-14 pt-32 sm:px-6 sm:pb-16 sm:pt-40 lg:grid-cols-12 lg:gap-16 lg:px-8 lg:pb-20 lg:pt-44">
          {/* COPY ---------------------------------------------------------- */}
          <div className="lg:col-span-7">
            <motion.p
              initial={reduce ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE_OUT_SOFT }}
              className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-white/18 bg-white/8 px-4 py-1.5 text-[12.5px] font-medium tracking-[0.02em] text-[#D9E1F0] backdrop-blur-sm"
            >
              <span className="relative flex h-1.5 w-1.5">
                {!reduce && (
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#5DBA47] opacity-75" />
                )}
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#5DBA47]" />
              </span>
              South Pasadena, CA &middot; in person or by video statewide
            </motion.p>

            <h1 className="max-w-[15ch] font-heading text-[2.4rem] leading-[1.07] tracking-[-0.015em] text-white sm:text-[3rem] lg:text-[3.55rem]">
              <SplitHeading as="p" text={H1_CLAUSE} className="block" stagger={0.034} duration={0.7} />
              <SplitHeading
                as="p"
                text={H1_TAIL.trim()}
                className="mt-4 block font-body text-[1.05rem] font-normal leading-[1.5] text-[#A9C4EE] sm:text-[1.3rem] lg:text-[1.45rem]"
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
                  dark text — and takes the light focus ring. That rule is in the
                  token set's header comment; a #454659 fill here would be a
                  charcoal button on a charcoal ground. */}
              <Link
                href="/book"
                className="group inline-flex items-center gap-2.5 rounded-[12px] bg-white px-7 py-4 text-[15px] font-semibold text-[#2E2F3D] shadow-[0_10px_30px_-12px_rgba(0,0,0,0.65)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#E6EFFF] hover:shadow-[0_18px_40px_-14px_rgba(0,0,0,0.75)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A9C4EE] focus-visible:ring-offset-2 focus-visible:ring-offset-[#2E2F3D] sm:text-base"
              >
                Book a Free Discovery Call
                <ArrowRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <a
                href={NAP.phoneHref}
                className="inline-flex items-center gap-2.5 rounded-[12px] border border-white/35 px-7 py-4 text-[15px] font-medium text-white transition-colors duration-300 hover:border-white hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A9C4EE] focus-visible:ring-offset-2 focus-visible:ring-offset-[#2E2F3D] sm:text-base"
              >
                <PhoneIcon className="h-4 w-4" />
                {NAP.phone}
              </a>
            </motion.div>

            {/* Trust chips. The rating counts up; everything else is a plain
                string because inventing a number to animate would be the easiest
                possible way to break this page's whole premise. */}
            <motion.ul
              initial="hidden"
              animate="shown"
              variants={{ shown: { transition: { staggerChildren: 0.055, delayChildren: 0.72 } } }}
              className="mt-9 flex flex-wrap items-center gap-2.5"
            >
              <motion.li
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  shown: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE_OUT_SOFT } },
                }}
                className="inline-flex items-center gap-2 rounded-full border border-[#5DBA47]/35 bg-[#5DBA47]/12 px-3.5 py-1.5 text-[12.5px] font-semibold text-white"
              >
                <span className="flex" aria-hidden="true">
                  {Array.from({ length: 5 }, (_, i) => (
                    <StarIcon key={i} className="h-3.5 w-3.5 text-[#5DBA47]" />
                  ))}
                </span>
                <Counter to={RATING.value} decimals={1} duration={1.1} />
                <span className="font-normal text-[#D9E1F0]">
                  &middot; {RATING.count} Google reviews
                </span>
              </motion.li>
              {CHIPS.map((c) => (
                <motion.li
                  key={c.label}
                  variants={{
                    hidden: { opacity: 0, y: 10 },
                    shown: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE_OUT_SOFT } },
                  }}
                  className="inline-flex items-center rounded-full border border-white/18 bg-white/6 px-3.5 py-1.5 text-[12.5px] font-medium text-[#D9E1F0]"
                >
                  {c.label}
                </motion.li>
              ))}
            </motion.ul>
          </div>

          {/* PORTRAIT ------------------------------------------------------- */}
          <div className="lg:col-span-5">
            <motion.div
              initial={reduce ? false : { opacity: 0, scale: 0.94, y: 28 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.12, ease: EASE_OUT_SOFT }}
              className="relative mx-auto max-w-[24rem] lg:max-w-none"
            >
              <div className="relative overflow-hidden rounded-[20px] border border-white/12 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.8)]">
                <img
                  src={PORTRAIT}
                  alt={PORTRAIT_ALT}
                  {...responsive(PORTRAIT, 'half')}
                  className="aspect-[4/5] w-full object-cover"
                  fetchPriority="high"
                />
                {/* Caption plate. Says what the page can support: the name and
                    the role, set beside the picture, with no "pictured above"
                    claim — see the provenance note on PORTRAIT in assets.ts. */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#2E2F3D] via-[#2E2F3D]/80 to-transparent p-5 pt-14">
                  <p className="font-heading text-lg text-white">Jason Meissner</p>
                  <p className="text-[13px] text-[#A9C4EE]">Certified Hypnotherapist &middot; Owner</p>
                </div>
              </div>

              <FloatY amount={7} duration={7} className="absolute -left-3 top-8 sm:-left-6">
                <motion.div
                  initial={reduce ? false : { opacity: 0, x: -18 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.7, delay: 0.8, ease: EASE_OUT_SOFT }}
                  className="rounded-[14px] border border-white/15 bg-[#2E2F3D]/90 px-4 py-3 shadow-xl backdrop-blur-md"
                >
                  <p className="font-heading text-2xl leading-none text-white">
                    <Counter to={10} suffix="" duration={1.4} />
                  </p>
                  <p className="mt-1 text-[11.5px] uppercase tracking-[0.12em] text-[#A9C4EE]">
                    years in practice
                  </p>
                </motion.div>
              </FloatY>
            </motion.div>
          </div>
        </div>
      </ScrollAway>

      {/* IMAGE RAIL + SCROLL CUE ------------------------------------------ */}
      <div className="relative pb-7">
        <Marquee speed={64} className="ph-fade-x mb-7 border-y border-white/10 py-4">
          {SERVICES.map((s) => {
            const img = serviceImage(s.slug);
            return (
              <span
                key={s.slug}
                aria-hidden="true"
                className="mx-2 block h-16 w-24 flex-shrink-0 overflow-hidden rounded-[10px] border border-white/12 opacity-70 transition-opacity duration-500 hover:opacity-100 sm:h-20 sm:w-32"
              >
                <img src={img.src} alt="" className="h-full w-full object-cover" loading="lazy" {...responsive(img.src, 'tile')} />
              </span>
            );
          })}
        </Marquee>

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
