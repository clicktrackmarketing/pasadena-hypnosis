'use client';

/* ---------------------------------------------------------------------------
   SERVICE CARD — one card, three densities.

   Used by the services hub, the "related services" rail on a service page, and
   the "what {city} clients book" grid on an area page. Those were three
   separate hand-built cards before this pass, which is why one of them showed
   `summary`, one showed `answer` and one showed neither.

   WHICH TEXT IT SHOWS, and the distinction is real rather than stylistic:
     - `summary` is the one-line editorial description.
     - `answer` is the 40-60 word answer block written for the service's own
       page, and it is what the hub shows, because the hub is where someone
       scanning for "does he treat X" needs the fuller sentence.
   `compact` shows neither — it is a navigation tile, not a pitch.
--------------------------------------------------------------------------- */

import Link from 'next/link';
import type { Service } from './content';
import { serviceImage } from './unsplash';
import { ArrowRightIcon } from './Icons';
import { TiltCard } from './Motion';
/* No price pill on the card (markup #22, #34 "Why is the dollar amount there
   over and over and over when I have one cost", #36). Prices live on
   /pricing and in each service page's hero. */
import { responsive } from './responsive';

export const ServiceCard = ({
  service: s,
  variant = 'full',
}: {
  service: Service;
  /** full = photo + answer (hub) · brief = photo + summary (grids) · compact = text tile */
  variant?: 'full' | 'brief' | 'compact';
}) => {
  const img = serviceImage(s.slug);

  if (variant === 'compact') {
    return (
      <Link
        href={`/services/${s.slug}`}
        className="group flex items-center justify-between gap-4 rounded-[14px] border border-white/18 bg-white/[0.07] px-5 py-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-white/40 hover:bg-white/[0.13] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#454659]"
      >
        <span className="font-heading text-[1.05rem] text-white">{s.name}</span>
        <ArrowRightIcon className="h-4 w-4 flex-shrink-0 text-[#A9C4EE] transition-transform duration-300 group-hover:translate-x-1" />
      </Link>
    );
  }

  return (
    <TiltCard className="h-full" max={4}>
      <Link
        href={`/services/${s.slug}`}
        className="group flex h-full flex-col overflow-hidden rounded-[18px] border border-[#D7DEEA] bg-white transition-all duration-500 hover:-translate-y-1.5 hover:border-[#46699F]/40 hover:shadow-[0_28px_60px_-28px_rgba(46,47,61,0.4)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#454659] focus-visible:ring-offset-2"
      >
        <div className="relative aspect-[4/3] overflow-hidden sm:aspect-[16/9]">
          <img
            src={img.src}
            alt={img.alt}
            loading="lazy"
            {...responsive(img.src, 'card')}
            className="h-full w-full object-cover transition-transform duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.08]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#2E2F3D]/50 via-transparent to-transparent" />
          {s.tag ? (
            <span className="absolute left-4 top-4 hidden items-center rounded-full bg-white/92 sm:inline-flex px-3 py-1 text-[11px] font-bold uppercase tracking-[0.1em] text-[#2E2F3D] backdrop-blur-sm">
              {s.tag}
            </span>
          ) : null}
        </div>

        {/*
          FIXED TEXT BLOCK, so every service card is the same height.

          `auto-rows-fr` on a grid only equalises rows WITHIN that grid, and
          the services hub renders one grid per category — so Featured cards
          came out 583px and Programs cards 560px, which reads as
          misalignment even though each grid was internally tidy.

          Clamping instead makes the card a fixed shape wherever it appears:
          two lines of title, four lines of body, an aspect-locked image. The
          min-heights are the clamp heights, so a short entry reserves the same
          space a long one uses rather than shrinking.

          What gets truncated is the tail of `answer`/`summary`, and the full
          text is on the service's own page one click away — which is where
          someone reading past four lines is heading anyway.
        */}
        <div className="flex flex-1 flex-col p-4 sm:p-6">
          <h3 className="mb-2 line-clamp-3 min-h-[4.1rem] font-heading text-[1.02rem] leading-snug text-[#2E2F3D] sm:mb-2.5 sm:line-clamp-2 sm:min-h-[3.75rem] sm:text-[1.35rem]">
            {s.name}
          </h3>
          <p className="mb-5 line-clamp-4 min-h-[6rem] flex-1 text-[14.5px] leading-[1.65] text-[#4B5468] max-sm:hidden">
            {variant === 'full' ? s.answer : s.summary}
          </p>
          <span className="mt-auto inline-flex items-center gap-2 text-[13px] font-semibold text-[#46699F] sm:text-sm">
            Learn more
            <ArrowRightIcon className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1.5" />
          </span>
        </div>
      </Link>
    </TiltCard>
  );
};
