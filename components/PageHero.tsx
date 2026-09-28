'use client';

/* ---------------------------------------------------------------------------
   PAGE HERO — the shared opener for every route except the homepage.

   WHY ONE COMPONENT RATHER THAN TWELVE HAND-BUILT HEADERS. Before this pass
   each inner page opened with its own hand-rolled block: same three elements
   (eyebrow, h1, lede) at slightly different sizes, paddings and breakpoints,
   drifting apart every time one was edited. Pulling them into one component
   means the type scale is decided once, and a page that wants to look
   different has to pass a different photograph rather than a different
   padding.

   IT REPEATS THE HOMEPAGE'S HERO LANGUAGE ON PURPOSE: full-bleed photograph,
   scrimmed to the palette's own #2E2F3D, white display type, transparent
   header sitting over it. That is what makes the site feel like one site. The
   -mt-20/-mt-24 pulls it under the sticky header exactly as the homepage hero
   does — but note the header only goes transparent on "/", so on these routes
   the solid white bar sits on top of the photograph. That is intentional and
   it is why the top padding here is generous.

   ACCESSIBILITY NOTES THAT MATTER MORE THAN THEY LOOK:
     - The h1 is a real h1 with the full string exposed; SplitHeading handles
       the aria-label/aria-hidden pairing internally.
     - The backdrop <img> is alt="" and aria-hidden. It is decoration. Where an
       image carries real information (the certificates, the review
       screenshots, the office) it is NOT rendered through this component.
     - Contrast: the scrim takes every photograph to at least #2E2F3D at 82%
       before type is drawn, which keeps white display type above 11:1 and the
       #D9E1F0 lede at the 7.03:1 the token set verified. Lightening the scrim
       is not a free aesthetic choice.
--------------------------------------------------------------------------- */

import Link from 'next/link';
import type { ReactNode } from 'react';
import type { StockImage } from './unsplash';
import { ArrowRightIcon } from './Icons';
import { Spiral, Rings } from './Spiral';
import { responsive } from './responsive';
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
   *
   * `aspect` MUST MATCH THE SOURCE FILE. This slot used to hardcode 4/3, and
   * the first portrait put through it — PORTRAIT, which assets.ts notes is
   * "cropped to 4:5 ... so the frame needs no object-fit crop and nothing is
   * lost to a container mismatch" — was promptly cropped by the container
   * mismatch that note warns about, landing as a tight letterbox across the
   * middle of a face. Pass the ratio the asset was prepared at.
   */
  media?: { src: string; alt: string; caption?: string; aspect?: '4/3' | '4/5' | '1/1' | '3/4' };
}) => {
  const reduce = useReducedMotion();
  const twoCol = Boolean(media);

  const pad =
    size === 'sm'
      ? 'pt-28 pb-14 sm:pt-36 sm:pb-16'
      : size === 'lg'
        ? 'pt-32 pb-20 sm:pt-44 sm:pb-28'
        : 'pt-32 pb-16 sm:pt-40 sm:pb-24';

  const titleSize =
    size === 'sm'
      ? 'text-[2.1rem] sm:text-[2.7rem]'
      : size === 'lg'
        ? 'text-[2.4rem] sm:text-[3.4rem] lg:text-[3.8rem]'
        : 'text-[2.3rem] sm:text-[3.1rem]';

  return (
    <section className="relative isolate -mt-20 overflow-hidden bg-[#2E2F3D] ph-grain sm:-mt-24">
      <div className="absolute inset-0 -z-10">
        <img
          src={image.src}
          alt=""
          aria-hidden="true"
          {...responsive(image.src, 'full')}
          fetchPriority="high"
          className={`h-full w-full object-cover ${reduce ? '' : 'ph-drift'}`}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#2E2F3D] via-[#2E2F3D]/88 to-[#2E2F3D]/45" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#2E2F3D] via-[#2E2F3D]/55 to-[#2E2F3D]/85" />
      </div>

      <CursorGlow />

      <FloatY amount={12} duration={9} className="pointer-events-none absolute -right-28 -top-32">
        <Spiral className="h-[30rem] w-[30rem] text-[#A9C4EE]/12 ph-spin-slow" strokeWidth={0.6} />
      </FloatY>
      <Rings className="pointer-events-none absolute -left-44 bottom-[-16rem] h-[30rem] w-[30rem] text-[#5DBA47]/10 ph-spin-slower" count={7} />

      <ScrollAway className={`relative mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8 ${pad}`}>
        <div
          className={
            twoCol
              ? 'grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16'
              : align === 'center'
                ? 'mx-auto max-w-[62ch] text-center'
                : 'max-w-[62ch]'
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
                className="group inline-flex items-center gap-2 text-[13px] font-medium text-[#A9C4EE] transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A9C4EE] focus-visible:ring-offset-2 focus-visible:ring-offset-[#2E2F3D]"
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
            className={`mb-5 font-body text-xs font-semibold uppercase tracking-[0.2em] text-[#A9C4EE] sm:text-[13px] ${
              align === 'center' ? '' : ''
            }`}
          >
            {eyebrow}
          </motion.p>

          <SplitHeading
            as="h1"
            text={title}
            stagger={0.036}
            duration={0.7}
            className={`font-heading leading-[1.08] tracking-[-0.015em] text-white ${titleSize}`}
          />

          {lede ? (
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.45, ease: EASE_OUT_SOFT }}
              className={`mt-7 text-[16px] leading-[1.7] text-[#D9E1F0] sm:text-[17px] ${
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
            initial={reduce ? false : { opacity: 0, scale: 0.94, y: 26 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.95, delay: 0.2, ease: EASE_OUT_SOFT }}
            className="lg:col-span-5"
          >
            <figure className="relative mx-auto max-w-[26rem] overflow-hidden rounded-[20px] border border-white/12 shadow-[0_40px_80px_-32px_rgba(0,0,0,0.75)] lg:max-w-none">
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
        ) : null}
        </div>
      </ScrollAway>

      {/* FACT STRIP — pinned to the foot of the hero so the page's four
          load-bearing numbers are visible before a single scroll. */}
      {facts && facts.length > 0 ? (
        <div className="relative border-t border-white/10">
          <motion.dl
            initial="hidden"
            animate="shown"
            variants={{ shown: { transition: { staggerChildren: 0.08, delayChildren: 0.7 } } }}
            className="mx-auto grid max-w-[1280px] grid-cols-2 gap-x-6 gap-y-6 px-4 py-7 sm:px-6 lg:grid-cols-4 lg:px-8"
          >
            {facts.map((f) => (
              <motion.div
                key={f.k}
                variants={{
                  hidden: { opacity: 0, y: 12 },
                  shown: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE_OUT_SOFT } },
                }}
              >
                <dt className="text-[10.5px] font-bold uppercase tracking-[0.16em] text-[#A9C4EE]">{f.k}</dt>
                <dd className="mt-1.5 font-heading text-[1.15rem] text-white sm:text-[1.25rem]">{f.v}</dd>
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
  'group inline-flex items-center gap-2.5 rounded-[12px] bg-white px-6 py-3.5 text-[15px] font-semibold text-[#2E2F3D] shadow-[0_10px_30px_-12px_rgba(0,0,0,0.6)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#E6EFFF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A9C4EE] focus-visible:ring-offset-2 focus-visible:ring-offset-[#2E2F3D]';

export const heroGhostBtn =
  'inline-flex items-center gap-2.5 rounded-[12px] border border-white/35 px-6 py-3.5 text-[15px] font-medium text-white transition-colors duration-300 hover:border-white hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A9C4EE] focus-visible:ring-offset-2 focus-visible:ring-offset-[#2E2F3D]';
