'use client';

/* ---------------------------------------------------------------------------
   PAGE HERO — the shared opener for every route except the homepage.

   WHY ONE COMPONENT RATHER THAN TWELVE HAND-BUILT HEADERS. The type scale is
   decided once, and a page that wants to look different passes a different
   photograph, figure or entrance rather than a different padding.

   2026-09-28 — EACH PAGE NOW GETS ITS OWN FIGURE AND ITS OWN ENTRANCE.
     `scene`  a 3D particle figure (components/scene) on the right of the
              copy — lungs on smoking cessation, a spine on chronic pain, a
              globe on the service areas, and so on. The photograph stays as
              a dim ground beneath it.
     `intro`  how the H1 arrives: 'rise' (word by word, the default), 'mask'
              (words slide up out of a mask), 'blur' (focuses in from a soft
              blur) or 'scale' (settles down from slightly large). Varying
              this is most of what makes consecutive pages feel distinct.

   IT REPEATS THE HOMEPAGE'S HERO LANGUAGE ON PURPOSE: dark ground, white
   display type, transparent header over it. The -mt-20/-mt-24 pulls it under
   the sticky header exactly as the homepage hero does.

   ACCESSIBILITY NOTES THAT MATTER MORE THAN THEY LOOK:
     - The h1 is a real h1 with the full string exposed; the animated words are
       aria-hidden with the text on aria-label.
     - The backdrop <img> and the 3D figure are decorative and aria-hidden.
     - Contrast: the scrim takes every photograph to at least #2E2F3D at 82%
       before type is drawn, which keeps white display type above 11:1 and
       the #D9E1F0 lede at the 7.03:1 the token set verified. The figure is
       kept to the right-hand column on desktop and dimmed behind a scrim on
       phones. Lightening either is not a free aesthetic choice.
--------------------------------------------------------------------------- */

import Link from 'next/link';
import type { ReactNode } from 'react';
import type { StockImage } from './unsplash';
import { ArrowRightIcon } from './Icons';
import { Spiral, Rings } from './Spiral';
import { responsive } from './responsive';
import { MindScene, type ShapeName } from './scene/MindScene';
import {
  motion,
  useReducedMotion,
  SplitHeading,
  CursorGlow,
  FloatY,
  ScrollAway,
  EASE_OUT_SOFT,
} from './Motion';

type Crumb = { label: string; href: string };

/** One fact in the strip along the bottom of the hero. */
export type HeroFact = { k: string; v: string };

export type HeroIntro = 'rise' | 'mask' | 'blur' | 'scale';

/** The H1, arriving in one of four ways. */
const HeroTitle = ({ text, intro, className }: { text: string; intro: HeroIntro; className: string }) => {
  const reduce = useReducedMotion();
  if (reduce) return <h1 className={className}>{text}</h1>;
  if (intro === 'rise') {
    return <SplitHeading as="h1" text={text} stagger={0.036} duration={0.7} className={className} />;
  }
  if (intro === 'mask') {
    const words = text.split(' ');
    return (
      <h1 className={className} aria-label={text}>
        {words.map((w, i) => (
          <span key={`${w}-${i}`}>
            <span aria-hidden="true" className="inline-block overflow-hidden pb-[0.12em] align-top">
              <motion.span
                className="inline-block"
                initial={{ y: '112%' }}
                animate={{ y: '0%' }}
                transition={{ duration: 0.85, delay: 0.05 + i * 0.045, ease: [0.76, 0, 0.24, 1] }}
              >
                {w}
              </motion.span>
            </span>
            {i < words.length - 1 ? ' ' : ''}
          </span>
        ))}
      </h1>
    );
  }
  if (intro === 'blur') {
    return (
      <motion.h1
        className={className}
        initial={{ opacity: 0, filter: 'blur(18px)', letterSpacing: '0.04em' }}
        animate={{ opacity: 1, filter: 'blur(0px)', letterSpacing: '-0.015em' }}
        transition={{ duration: 1.1, ease: EASE_OUT_SOFT }}
      >
        {text}
      </motion.h1>
    );
  }
  return (
    <motion.h1
      className={`${className} origin-left`}
      initial={{ opacity: 0, scale: 1.12, y: 18 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 1, ease: EASE_OUT_SOFT }}
    >
      {text}
    </motion.h1>
  );
};

export const PageHero = ({
  eyebrow,
  title,
  lede,
  image,
  breadcrumb,
  children,
  align = 'left',
  size = 'md',
  facts,
  media,
  scene,
  sceneCycle,
  sceneHover,
  intro = 'rise',
}: {
  eyebrow: string;
  title: string;
  lede?: ReactNode;
  image: StockImage;
  breadcrumb?: Crumb;
  /** CTAs, badges, anything the specific page needs under the lede. */
  children?: ReactNode;
  align?: 'left' | 'center';
  /** "sm" for utility pages, "md" for hubs, "lg" where the page is the destination. */
  size?: 'sm' | 'md' | 'lg';
  /**
   * Four-up fact strip across the bottom of the hero. Every page that passes
   * this passes SITE-VERIFIED values — the price, the format, the rating, the
   * hours. It is the most prominent strip on the page and therefore the worst
   * possible place for a rounded-up or invented figure.
   */
  facts?: HeroFact[];
  /**
   * Optional framed image beside the copy. Forces the two-column layout.
   * `aspect` MUST MATCH THE SOURCE FILE — see the note in git history on the
   * portrait that was letterboxed by a 4/3 frame.
   */
  media?: { src: string; alt: string; caption?: string; aspect?: '4/3' | '4/5' | '1/1' | '3/4' };
  /** 3D particle figure for this page. */
  scene?: ShapeName;
  /** Figures to cycle through (includes `scene`). */
  sceneCycle?: ShapeName[];
  /** Figure the scene becomes while hovered. */
  sceneHover?: ShapeName;
  /** How the H1 arrives. */
  intro?: HeroIntro;
}) => {
  const reduce = useReducedMotion();
  const twoCol = Boolean(media) || Boolean(scene && align !== 'center');

  const pad =
    size === 'sm'
      ? 'pt-32 pb-14 sm:pt-40 sm:pb-20'
      : size === 'lg'
        ? 'pt-36 pb-20 sm:pt-48 sm:pb-28'
        : 'pt-36 pb-16 sm:pt-44 sm:pb-24';

  const titleSize =
    size === 'sm'
      ? 'text-[2.3rem] sm:text-[3rem]'
      : size === 'lg'
        ? 'text-[2.6rem] sm:text-[3.7rem] lg:text-[4.2rem]'
        : 'text-[2.5rem] sm:text-[3.4rem] lg:text-[3.7rem]';

  return (
    <section className="relative isolate -mt-20 overflow-hidden bg-[#1F2030] ph-grain sm:-mt-24">
      <div className="absolute inset-0 -z-10">
        <img
          src={image.src}
          alt=""
          aria-hidden="true"
          {...responsive(image.src, 'full')}
          fetchPriority="high"
          className={`h-full w-full object-cover ${scene ? 'opacity-45' : ''} ${reduce ? '' : 'ph-drift'}`}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1F2030] via-[#2E2F3D]/90 to-[#2E2F3D]/50" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1F2030] via-[#2E2F3D]/55 to-[#1F2030]/90" />
        {scene ? (
          <div className="absolute right-[-8%] top-[5%] h-[90%] w-[70%] rounded-full bg-[radial-gradient(closest-side,rgba(70,105,159,0.38),transparent)] blur-2xl lg:w-[55%]" />
        ) : null}
      </div>

      <CursorGlow />

      {scene ? (
        <>
          <div
            className={`pointer-events-none absolute inset-x-0 top-0 h-[75%] opacity-40 lg:inset-y-0 lg:h-auto lg:opacity-100 ${
              media ? 'lg:left-[38%] lg:opacity-60' : 'lg:left-auto lg:right-0 lg:w-[54%]'
            }`}
          >
            <MindScene
              shape={scene}
              cycle={sceneCycle}
              hoverShape={sceneHover}
              tone="dark"
              className="absolute inset-0"
              offset={[0.1, 0]}
            />
          </div>
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#1F2030]/20 via-[#1F2030]/60 to-[#1F2030]/80 lg:hidden" />
        </>
      ) : (
        <>
          <FloatY amount={12} duration={9} className="pointer-events-none absolute -right-28 -top-32">
            <Spiral className="h-[30rem] w-[30rem] text-[#A9C4EE]/12 ph-spin-slow" strokeWidth={0.6} />
          </FloatY>
          <Rings className="pointer-events-none absolute -left-44 bottom-[-16rem] h-[30rem] w-[30rem] text-[#5DBA47]/10 ph-spin-slower" count={7} />
        </>
      )}

      <ScrollAway className={`relative mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8 ${pad}`}>
        <div
          className={
            twoCol
              ? 'grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16'
              : align === 'center'
                ? 'mx-auto max-w-[64ch] text-center'
                : 'max-w-[64ch]'
          }
        >
          <div className={twoCol ? 'lg:col-span-7' : ''}>
            {breadcrumb ? (
              <motion.div
                initial={reduce ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: EASE_OUT_SOFT }}
                className="mb-6"
              >
                <Link
                  href={breadcrumb.href}
                  className="group inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-[13px] font-medium text-[#A9C4EE] backdrop-blur-sm transition-colors hover:border-white/35 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A9C4EE] focus-visible:ring-offset-2 focus-visible:ring-offset-[#2E2F3D]"
                >
                  <ArrowRightIcon className="h-3.5 w-3.5 rotate-180 transition-transform duration-300 group-hover:-translate-x-1" />
                  {breadcrumb.label}
                </Link>
              </motion.div>
            ) : null}

            <motion.p
              initial={reduce ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05, ease: EASE_OUT_SOFT }}
              className={`mb-5 inline-flex items-center gap-3 font-body text-xs font-semibold uppercase tracking-[0.2em] text-[#A9C4EE] sm:text-[13px] ${
                align === 'center' ? 'justify-center' : ''
              }`}
            >
              <motion.span
                aria-hidden="true"
                className="inline-block h-px w-8 origin-left bg-[#A9C4EE]/70"
                initial={reduce ? false : { scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.2, ease: EASE_OUT_SOFT }}
              />
              {eyebrow}
            </motion.p>

            <HeroTitle
              text={title}
              intro={intro}
              className={`font-heading leading-[1.05] tracking-[-0.018em] text-white ${titleSize}`}
            />

            {lede ? (
              <motion.div
                initial={reduce ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.45, ease: EASE_OUT_SOFT }}
                className={`mt-7 max-w-[60ch] text-[16px] leading-[1.7] text-[#D9E1F0] sm:text-[17px] ${
                  align === 'center' ? 'mx-auto' : ''
                }`}
              >
                {lede}
              </motion.div>
            ) : null}

            {children ? (
              <motion.div
                initial={reduce ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.58, ease: EASE_OUT_SOFT }}
                className={`mt-9 flex flex-wrap items-center gap-3 ${align === 'center' ? 'justify-center' : ''}`}
              >
                {children}
              </motion.div>
            ) : null}
          </div>

          {media ? (
            <motion.div
              initial={reduce ? false : { opacity: 0, scale: 0.94, y: 26, rotateY: -8 }}
              animate={{ opacity: 1, scale: 1, y: 0, rotateY: 0 }}
              transition={{ duration: 1.05, delay: 0.2, ease: EASE_OUT_SOFT }}
              style={{ transformPerspective: 1200 }}
              className="lg:col-span-5"
            >
              <figure className="relative mx-auto max-w-[26rem] overflow-hidden rounded-[22px] border border-white/12 shadow-[0_40px_80px_-32px_rgba(0,0,0,0.75)] lg:max-w-none">
                <img
                  src={media.src}
                  alt={media.alt}
                  {...responsive(media.src, 'half')}
                  className={`w-full object-cover ${
                    media.aspect === '4/5'
                      ? 'aspect-[4/5]'
                      : media.aspect === '3/4'
                        ? 'aspect-[3/4]'
                        : media.aspect === '1/1'
                          ? 'aspect-square'
                          : 'aspect-[4/3]'
                  }`}
                />
                {media.caption ? (
                  <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#2E2F3D] via-[#2E2F3D]/80 to-transparent p-5 pt-14 text-[13px] leading-[1.6] text-[#D9E1F0]">
                    {media.caption}
                  </figcaption>
                ) : null}
              </figure>
            </motion.div>
          ) : twoCol ? (
            <div className="hidden min-h-[22rem] lg:col-span-5 lg:block" aria-hidden="true" />
          ) : null}
        </div>
      </ScrollAway>

      {/* FACT STRIP — pinned to the foot of the hero so the page's four
          load-bearing numbers are visible before a single scroll. */}
      {facts && facts.length > 0 ? (
        <div className="relative border-t border-white/10 bg-[#1F2030]/40 backdrop-blur-sm">
          <motion.dl
            initial="hidden"
            animate="shown"
            variants={{ shown: { transition: { staggerChildren: 0.08, delayChildren: 0.7 } } }}
            className="mx-auto grid max-w-[1280px] grid-cols-2 gap-x-6 gap-y-6 px-4 py-7 sm:px-6 lg:grid-cols-4 lg:px-8"
          >
            {facts.map((f, i) => (
              <motion.div
                key={f.k}
                className={`relative ${i > 0 ? 'lg:pl-6' : ''}`}
                variants={{
                  hidden: { opacity: 0, y: 14, filter: 'blur(4px)' },
                  shown: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.6, ease: EASE_OUT_SOFT } },
                }}
              >
                {i > 0 ? (
                  <motion.span
                    aria-hidden="true"
                    className="absolute left-0 top-0 hidden h-full w-px origin-top bg-white/12 lg:block"
                    variants={{ hidden: { scaleY: 0 }, shown: { scaleY: 1, transition: { duration: 0.8, ease: EASE_OUT_SOFT } } }}
                  />
                ) : null}
                <dt className="text-[10.5px] font-bold uppercase tracking-[0.16em] text-[#A9C4EE]">{f.k}</dt>
                <dd className="mt-1.5 font-heading text-[1.2rem] text-white sm:text-[1.35rem]">{f.v}</dd>
              </motion.div>
            ))}
          </motion.dl>
        </div>
      ) : null}
    </section>
  );
};

/* The two button treatments used inside a PageHero, exported so no page
   re-types the inverted-on-dark rule (light fill, dark text, light focus
   ring) that the token set requires inside the dark band. */
export const heroPrimaryBtn =
  'group inline-flex items-center gap-2.5 rounded-[14px] bg-white px-6 py-3.5 text-[15px] font-semibold text-[#2E2F3D] shadow-[0_10px_30px_-12px_rgba(0,0,0,0.6)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#E6EFFF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A9C4EE] focus-visible:ring-offset-2 focus-visible:ring-offset-[#2E2F3D]';

export const heroGhostBtn =
  'inline-flex items-center gap-2.5 rounded-[14px] border border-white/35 px-6 py-3.5 text-[15px] font-medium text-white transition-colors duration-300 hover:border-white hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A9C4EE] focus-visible:ring-offset-2 focus-visible:ring-offset-[#2E2F3D]';
