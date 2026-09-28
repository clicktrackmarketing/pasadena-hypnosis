'use client';

/* ---------------------------------------------------------------------------
   /service-areas — the animated sections under the hero.

   Each band moves in its own way, so the page does not read as one reveal
   repeated five times:

     AreasMarquee  the five city names in display type, on a ticker that
                   speeds up, reverses and leans with the scroll wheel; a
                   second, quieter line runs the other way with the online
                   route, so the two ways of working literally pass each other
     CityBento     the city cards swing in from alternate sides (SlideItem)
     OnlineDepth   layered pictures that separate under the pointer
                   (DepthField), over a live wave figure

   COPY: every string is content.ts or was already on this page. The five
   cities are SERVICE_AREAS rendered as-is — no neighbouring towns.

   PICTURES: each card's frame takes the shape of its own photograph (see
   imageRatio in ./areas). South Pasadena shows the practice's own office
   because the office really is there; no other card is captioned as a place
   beyond what unsplash.ts already says.
--------------------------------------------------------------------------- */

import Link from 'next/link';
import type { CSSProperties } from 'react';
import { SERVICE_AREAS, ONLINE_AREA } from '../../content';
import { areaImage, serviceImage, FOOTHILL_RANGE } from '../../unsplash';
import { OFFICE_INTERIOR, OFFICE_INTERIOR_ALT, OFFICE_INTERIOR_W, OFFICE_INTERIOR_H } from '../../assets';
import { ArrowRightIcon, MapPinIcon } from '../../Icons';
import { Spiral, Rings } from '../../Spiral';
import { responsive } from '../../responsive';
import { MindScene } from '../../scene/MindScene';
import { Reveal, SplitHeading, Stagger } from '../../Motion';
import { VelocityMarquee, SlideItem, DepthField, Depth, RollText } from '../../MotionFx';
import { areaSlug, areaCity, imageRatio } from './areas';

/* ------------------------------------------------------------ Marquee -- */

export const AreasMarquee = () => {
  const cities = SERVICE_AREAS.map(areaCity);
  return (
    /* Decorative: every city here is a real link in the cards below. */
    <div aria-hidden="true" className="relative overflow-hidden bg-[#1F2030] pb-14 pt-10 sm:pb-20 sm:pt-14">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[30rem] w-[60rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(70,105,159,0.28),transparent)] blur-2xl" />

      <VelocityMarquee baseVelocity={-1.1} className="ph-fade-x relative">
        {cities.map((c, i) => (
          <span key={c} className="inline-flex items-center">
            <span
              className={`px-5 font-heading text-[3.4rem] leading-[1.15] tracking-[-0.025em] sm:px-8 sm:text-[5.6rem] lg:text-[8rem] ${
                i % 2 === 0 ? 'text-white' : 'text-transparent [-webkit-text-stroke:1.5px_rgba(169,196,238,0.85)]'
              }`}
            >
              {c}
            </span>
            <Spiral className="h-9 w-9 text-[#5DBA47] ph-spin-slow sm:h-12 sm:w-12 lg:h-16 lg:w-16" strokeWidth={1.3} />
          </span>
        ))}
      </VelocityMarquee>

      <VelocityMarquee baseVelocity={0.7} className="ph-fade-x relative mt-3 sm:mt-5">
        {[0, 1, 2].map((k) => (
          <span
            key={k}
            className="inline-flex items-center gap-5 px-6 text-[12px] font-semibold uppercase tracking-[0.3em] text-[#A9C4EE] sm:text-[14px]"
          >
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#5DBA47]" />
            {ONLINE_AREA}
          </span>
        ))}
      </VelocityMarquee>
    </div>
  );
};

/* -------------------------------------------------------------- Bento -- */

type CardKind = 'tall' | 'std' | 'wide';

const kindFor = (ratio: number): CardKind => (ratio < 1 ? 'tall' : ratio > 2.4 ? 'wide' : 'std');

/*
 * Grid placement per shape. Tall cards (Pasadena's portrait of City Hall, the
 * office) span two rows; the Glendale panorama spans the full row. Cards are
 * SORTED tall -> std -> wide below so that the DOM order, the focus order and
 * the visual order are the same thing.
 *
 * A tall card's frame is an explicit aspect ratio on phones and tablets, and
 * on desktop it fills whatever height the two stacked 3:2 cards beside it
 * set — which lands within a few percent of the photograph's own 2:3.
 */
const PLACE: Record<CardKind, { item: string; frame: string }> = {
  tall: { item: 'sm:row-span-2', frame: 'aspect-[var(--ar)] lg:aspect-auto lg:min-h-[22rem] lg:flex-1' },
  std: { item: '', frame: 'aspect-[var(--ar)]' },
  wide: { item: 'sm:col-span-2 lg:col-span-3', frame: 'aspect-[var(--ar)]' },
};

export const CityBento = () => {
  const order: Record<CardKind, number> = { tall: 0, std: 1, wide: 2 };
  const cards = SERVICE_AREAS.map((a) => {
    const slug = areaSlug(a);
    const isHome = slug === 'south-pasadena';
    /* South Pasadena shows the practice's OWN office, because the office
       genuinely is in South Pasadena. See AREA_IMAGE_BY_SLUG. */
    const img = isHome ? { src: OFFICE_INTERIOR, alt: OFFICE_INTERIOR_ALT } : areaImage(slug);
    const ratio = isHome ? OFFICE_INTERIOR_W / OFFICE_INTERIOR_H : imageRatio(img.src);
    return { a, slug, city: areaCity(a), isHome, img, ratio, kind: kindFor(ratio) };
  }).sort((x, y) => order[x.kind] - order[y.kind]);

  return (
    <section className="relative overflow-hidden bg-[#E6EFFF] py-20 sm:py-28">
      <div className="pointer-events-none absolute -right-40 -top-40 h-[34rem] w-[34rem] text-[#46699F]/[0.07]" aria-hidden="true">
        <Rings className="h-full w-full ph-spin-slower" count={8} />
      </div>

      <div className="relative mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <div className="mb-12 flex flex-col gap-5 border-b border-[#2E2F3D]/12 pb-8 sm:mb-14 sm:flex-row sm:items-end sm:justify-between">
          <SplitHeading
            text="In person"
            className="font-heading text-[2.8rem] leading-[1] tracking-[-0.025em] text-[#2E2F3D] sm:text-[4.2rem] lg:text-[5.2rem]"
          />
          <Reveal dir="left" delay={0.15}>
            <p className="inline-flex items-baseline gap-3 text-[12.5px] font-semibold uppercase tracking-[0.16em] text-[#46699F]">
              <span className="font-heading text-[2.6rem] font-normal normal-case leading-none tracking-normal text-[#2E2F3D] tabular-nums sm:text-[3.2rem]">
                {SERVICE_AREAS.length}
              </span>
              cities
            </p>
          </Reveal>
        </div>

        <Stagger className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3" gap={0.11}>
          {cards.map((c, i) => {
            const place = PLACE[c.kind];
            return (
              <SlideItem key={c.a} from={i % 2 === 0 ? 'left' : 'right'} className={`h-full ${place.item}`}>
                <Link
                  href={`/service-areas/${c.slug}`}
                  className="group relative flex h-full flex-col overflow-hidden rounded-[24px] border border-[#2E2F3D]/10 bg-white shadow-[0_24px_60px_-42px_rgba(46,47,61,0.55)] transition-[translate,box-shadow,border-color] duration-500 hover:-translate-y-1.5 hover:border-[#46699F]/40 hover:shadow-[0_40px_80px_-40px_rgba(46,47,61,0.6)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#454659] focus-visible:ring-offset-2 focus-visible:ring-offset-[#E6EFFF]"
                >
                  <div className={`relative overflow-hidden ${place.frame}`} style={{ '--ar': String(c.ratio) } as CSSProperties}>
                    <img
                      src={c.img.src}
                      alt={c.img.alt}
                      loading="lazy"
                      {...responsive(c.img.src, c.kind === 'wide' ? 'full' : 'card')}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1F2030]/45 via-transparent to-[#1F2030]/10" />
                    {c.isHome ? (
                      <span className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-white/92 px-3 py-1.5 text-[10.5px] font-bold uppercase tracking-[0.12em] text-[#2E2F3D] backdrop-blur-sm">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#5DBA47]" aria-hidden="true" />
                        The office
                      </span>
                    ) : null}
                  </div>
                  <div className="flex items-center justify-between gap-4 p-5 sm:p-6">
                    <div className="min-w-0">
                      <h3 className="font-heading text-[1.3rem] leading-tight text-[#2E2F3D] sm:text-[1.45rem]">
                        Hypnotherapy in {c.city}
                      </h3>
                      <p className="mt-1.5 flex items-center gap-1.5 text-[13.5px] text-[#4B5468]">
                        <MapPinIcon className="h-4 w-4 flex-shrink-0 text-[#46699F]" />
                        {c.a}
                      </p>
                    </div>
                    <span
                      aria-hidden="true"
                      className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full border border-[#2E2F3D]/15 text-[#2E2F3D] transition-colors duration-300 group-hover:border-[#2E2F3D] group-hover:bg-[#2E2F3D] group-hover:text-white"
                    >
                      <ArrowRightIcon className="h-4 w-4 -rotate-45 transition-transform duration-500 group-hover:rotate-0" />
                    </span>
                  </div>
                </Link>
              </SlideItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
};

/* ------------------------------------------------------------- Online -- */

export const OnlineDepth = () => {
  const video = serviceImage('online-hypnotherapy');
  return (
    <section className="relative isolate overflow-hidden bg-[#E9F3EF] py-20 sm:py-28">
      <div className="relative mx-auto grid max-w-[1280px] grid-cols-1 items-center gap-14 px-4 sm:px-6 lg:grid-cols-12 lg:gap-16 lg:px-8">
        <div className="lg:col-span-5">
          <Reveal>
            <p className="mb-5 inline-flex items-center gap-3 font-body text-xs font-semibold uppercase tracking-[0.2em] text-[#46699F] sm:text-[13px]">
              <span className="inline-block h-px w-8 bg-[#46699F]/60" aria-hidden="true" />
              Everywhere else
            </p>
          </Reveal>
          <SplitHeading
            text={ONLINE_AREA}
            className="max-w-[14ch] font-heading text-[2.3rem] leading-[1.08] tracking-[-0.02em] text-[#2E2F3D] sm:text-[3.1rem] lg:text-[3.5rem]"
          />
          <Reveal delay={0.15}>
            <p className="mt-7 max-w-[50ch] text-[16.5px] leading-[1.75] text-[#4B5468] sm:text-[17px]">
              Video sessions are the same work at the same rate, and roughly half the practice runs that way. If you
              are outside the five cities above, that is the route &mdash; not a lesser version of it.
            </p>
          </Reveal>
          <Reveal delay={0.25}>
            <Link
              href="/services/online-hypnotherapy"
              className="group mt-9 inline-flex items-center gap-2.5 rounded-[14px] bg-[#454659] px-6 py-3.5 text-[15px] font-semibold text-white shadow-[0_14px_34px_-18px_rgba(46,47,61,0.8)] transition-colors duration-300 hover:bg-[#33344A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#454659] focus-visible:ring-offset-2 focus-visible:ring-offset-[#E9F3EF]"
            >
              <RollText>About online hypnotherapy</RollText>
              <ArrowRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>

        {/* LAYERED PICTURES. Three planes at different depths slide apart
            under the pointer; the wave figure sits behind them all. Only the
            decoration moves — no text lives inside a Depth layer. */}
        <div className="lg:col-span-7">
          <DepthField className="relative h-[21rem] sm:h-[31rem] lg:h-[35rem]">
            <MindScene shape="wave" tone="light" intro={false} intensity={0.75} className="absolute inset-[-8%]" />

            <Depth depth={-30} className="pointer-events-none absolute right-[2%] top-[-4%] h-40 w-40 sm:h-56 sm:w-56">
              <Rings className="h-full w-full text-[#46699F]/25 ph-spin-slow" count={6} />
            </Depth>

            <Depth depth={-14} className="absolute left-0 top-0 w-[88%] sm:w-[78%]">
              <figure className="overflow-hidden rounded-[22px] border border-[#2E2F3D]/10 shadow-[0_40px_80px_-44px_rgba(46,47,61,0.7)]">
                <img
                  src={FOOTHILL_RANGE.src}
                  alt={FOOTHILL_RANGE.alt}
                  loading="lazy"
                  {...responsive(FOOTHILL_RANGE.src, 'half')}
                  className="aspect-[3/2] w-full object-cover"
                />
              </figure>
            </Depth>

            <Depth depth={26} className="absolute bottom-0 right-0 w-[64%] sm:w-[56%]">
              <figure className="overflow-hidden rounded-[18px] border-[5px] border-white bg-white shadow-[0_44px_90px_-40px_rgba(46,47,61,0.75)]">
                <img
                  src={video.src}
                  alt={video.alt}
                  loading="lazy"
                  {...responsive(video.src, 'half')}
                  className="aspect-[16/9] w-full rounded-[13px] object-cover"
                />
              </figure>
            </Depth>

            <Depth depth={44} className="pointer-events-none absolute bottom-[14%] left-[4%] sm:bottom-[18%]">
              <span
                aria-hidden="true"
                className="inline-flex items-center gap-2.5 rounded-full border border-white/70 bg-white/80 px-4 py-2 text-[12.5px] font-semibold text-[#2E2F3D] shadow-[0_18px_40px_-20px_rgba(46,47,61,0.6)] backdrop-blur-md"
              >
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#5DBA47] opacity-60 motion-reduce:animate-none" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[#5DBA47]" />
                </span>
                All of California
              </span>
            </Depth>
          </DepthField>
        </div>
      </div>
    </section>
  );
};
