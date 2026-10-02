'use client';

/* ---------------------------------------------------------------------------
   SERVICES — a horizontal rail that the page scrolls sideways through.

   WHY A RAIL RATHER THAN THE GRID IT WAS. A full catalogue does not fit in a
   six-card grid without the grid quietly lying about the catalogue's size. The
   rail carries EVERY SERVICE, in the practice's own ranked order, and the
   sideways travel makes the length of the list the point instead of hiding it.

   <PinnedRail> handles the mechanics and the bail-outs: below lg, and for
   anyone who has asked for reduced motion, it is a plain horizontally
   scrollable row with no scroll hijacking at all. Read its header note before
   changing anything about the measurement — it is the part that breaks.

   IMAGERY: each card shows the work, or the thing the work is about, keyed by
   slug in unsplash.ts. Revised 2026-09-17 — the first pass used landscape and
   weather for all six, which avoided stock-photo melodrama but left a grid
   where no card was distinguishable from any other and none of them looked
   like a hypnotherapy practice. See the header note in unsplash.ts for the
   line that is still held: recognisable, not theatrical, and nothing here is
   captioned as this practice or its clients.

   The `tag` line ("Primary specialty", "Most requested") comes from content.ts
   and is Jason's own ranking, not a marketing badge invented here.
--------------------------------------------------------------------------- */

import Link from 'next/link';
import { SERVICES } from '../content';
import { serviceImage } from '../unsplash';
import { responsive } from '../responsive';
import { ArrowRightIcon } from '../Icons';
import { SectionHeading } from '../SectionHeading';
import { PinnedRail, TiltCard } from '../Motion';

export const ServicesGrid = () => {

  return (
    <section className="relative bg-white pt-16 sm:pt-28">
      <PinnedRail
        header={
          <div className="mx-auto mb-10 w-full max-w-[1280px] px-4 sm:px-6 lg:mb-0 lg:px-8">
            {/* Markup #8: the lede explaining the ranking is deleted ("Don't
                tell the customer why they are ranked… Delete all of this"),
                and #74: no count of the services anywhere. */}
            <SectionHeading
              eyebrow="Service information"
              title="What can you book with Pasadena Hypnosis?"
              aside={
                <Link
                  href="/services"
                  className="group inline-flex items-center gap-2 rounded-full border border-[#2E2F3D]/15 px-5 py-2.5 text-sm font-medium text-[#2E2F3D] transition-all duration-300 hover:border-[#454659] hover:bg-[#454659] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#454659] focus-visible:ring-offset-2"
                >
                  View all services
                  <ArrowRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              }
            />
          </div>
        }
        className="pb-16 sm:pb-28"
        trackClassName="flex gap-6 px-4 sm:px-6 lg:px-8 pb-4"
      >
        {SERVICES.map((s) => {
          const img = serviceImage(s.slug);
          return (
            /* No per-card entrance: in a sideways rail each card would start
               blank and fade in as it slid into view, which reads as photos
               loading late. The section heading carries the entrance. */
            <div key={s.slug} className="w-[19rem] flex-shrink-0 sm:w-[21rem]">
              <TiltCard className="h-full" max={5}>
                <Link
                  href={`/services/${s.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-[18px] border border-[#D7DEEA] bg-white transition-all duration-500 hover:-translate-y-1.5 hover:border-[#46699F]/40 hover:shadow-[0_28px_60px_-28px_rgba(46,47,61,0.45)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#454659] focus-visible:ring-offset-2"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img
                      src={img.src}
                      alt={img.alt}
                      loading="lazy"
                      {...responsive(img.src, 'rail')}
                      className="h-full w-full object-cover transition-transform duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.09]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#2E2F3D]/55 via-transparent to-transparent" />
                    <span className="absolute left-4 top-4 inline-flex items-center rounded-full bg-white/92 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.1em] text-[#2E2F3D] backdrop-blur-sm">
                      {s.tag ?? s.category}
                    </span>
                    {/* No price pill: markup #22/#34/#36 — the price is on
                        /pricing and on each service page, not on every tile. */}
                  </div>

                  {/* Clamped to a fixed shape for the same reason as
                      ServiceCard — see the note there. On a horizontal rail it
                      matters more, not less: the cards sit side by side with
                      nothing to hide a ragged baseline. */}
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="mb-2.5 line-clamp-2 min-h-[3.6rem] font-heading text-[1.3rem] leading-snug text-[#2E2F3D]">
                      {s.name}
                    </h3>
                    <p className="mb-5 line-clamp-4 min-h-[5.9rem] flex-1 text-[14.5px] leading-[1.62] text-[#4B5468]">
                      {s.summary}
                    </p>
                    <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#46699F]">
                      Learn more
                      <ArrowRightIcon className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1.5" />
                    </span>
                  </div>
                </Link>
              </TiltCard>
            </div>
          );
        })}
      </PinnedRail>
    </section>
  );
};
