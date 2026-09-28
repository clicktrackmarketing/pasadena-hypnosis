'use client';

/* ---------------------------------------------------------------------------
   SERVICE AREAS.

   The five cities are the TRIMMED list from content.ts — Jason confirmed these
   on Call 2, and the four the original audit had assumed from a drive-time
   radius were removed. This section renders that array and nothing else: a
   local-SEO strip is the exact place where a redesign is tempted to pad the
   list back out with neighbouring towns, and every unconfirmed city is a page
   promising coverage nobody agreed to.

   The online line is given equal weight rather than treated as a footnote,
   because statewide video is genuinely half the practice.

   MOTION: pills pop in on a stagger; the landmark photograph drifts on scroll.
--------------------------------------------------------------------------- */

import Link from 'next/link';
import { SERVICE_AREAS, ONLINE_AREA, NAP } from '../content';
import { PASADENA_CITY_HALL } from '../unsplash';
import { MapPinIcon, ArrowRightIcon } from '../Icons';
import { Reveal, SplitHeading, Stagger, StaggerItem, Parallax } from '../Motion';
import { VelocityMarquee } from '../MotionFx';

const slug = (a: string) => a.split(',')[0].trim().toLowerCase().replace(/\s+/g, '-');

export const AreasStrip = () => (
  <section className="relative overflow-hidden bg-white pb-16 pt-14 sm:pb-28 sm:pt-20">
    {/* City ticker — decorative (the same five cities are real links below),
        drifting on its own and leaning with the scroll wheel. */}
    <div aria-hidden="true" className="mb-14 border-y border-[#D7DEEA] py-5 sm:mb-20">
      <VelocityMarquee baseVelocity={1.4}>
        {SERVICE_AREAS.map((a) => (
          <span key={a} className="mx-8 inline-flex items-center gap-8 font-heading text-[2.6rem] italic text-[#2E2F3D]/85 sm:text-[4.2rem]">
            {a.replace(', CA', '')}
            <span className="inline-block h-3 w-3 rounded-full border-2 border-[#46699F]" />
          </span>
        ))}
      </VelocityMarquee>
    </div>
    <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-6">
          <Reveal>
            <p className="mb-3 font-body text-[11.5px] font-bold uppercase tracking-[0.2em] text-[#46699F] sm:text-xs">
              Where Jason works
            </p>
          </Reveal>
          <SplitHeading
            text="In the room in South Pasadena, or by video statewide."
            className="max-w-[16ch] font-heading text-[2.2rem] sm:text-[2.9rem] lg:text-[3.3rem] leading-[1.08] tracking-[-0.018em] text-[#2E2F3D]"
          />

          <Stagger className="mt-9 flex flex-wrap gap-2.5" as="ul" gap={0.08}>
            {SERVICE_AREAS.map((a) => (
              <StaggerItem key={a} as="li" distance={12}>
                <Link
                  href={`/service-areas/${slug(a)}`}
                  className="group inline-flex items-center gap-2 rounded-full border border-[#D7DEEA] bg-[#E6EFFF] px-4 py-2.5 text-[13.5px] font-medium text-[#2E2F3D] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#46699F] hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#454659] focus-visible:ring-offset-2"
                >
                  <MapPinIcon className="h-4 w-4 text-[#46699F]" />
                  {a.replace(', CA', '')}
                </Link>
              </StaggerItem>
            ))}
            <StaggerItem as="li" distance={12}>
              <span className="inline-flex items-center gap-2 rounded-full border border-[#5DBA47]/40 bg-[#E9F3EF] px-4 py-2.5 text-[13.5px] font-medium text-[#2E2F3D]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#5DBA47]" aria-hidden="true" />
                {ONLINE_AREA}
              </span>
            </StaggerItem>
          </Stagger>

          <Reveal delay={0.15}>
            <address className="mt-9 not-italic text-[15px] leading-[1.7] text-[#4B5468]">
              <span className="font-semibold text-[#2E2F3D]">{NAP.name}</span>
              <br />
              {NAP.street}, {NAP.city}, {NAP.state} {NAP.zip}
            </address>
          </Reveal>

          <Reveal delay={0.2}>
            <Link
              href="/service-areas"
              className="ph-tap ph-underline mt-6 inline-flex items-center gap-2 text-[15px] font-semibold text-[#46699F] transition-colors hover:text-[#2E2F3D] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#454659] focus-visible:ring-offset-2"
            >
              All service areas
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>

        <div className="lg:col-span-6">
          <Parallax speed={30}>
            <figure className="overflow-hidden rounded-[20px] border border-[#D7DEEA] shadow-[0_30px_70px_-34px_rgba(46,47,61,0.5)]">
              <img
                src={PASADENA_CITY_HALL.src}
                alt={PASADENA_CITY_HALL.alt}
                loading="lazy"
                className="aspect-[4/3] w-full object-cover"
              />
            </figure>
          </Parallax>
        </div>
      </div>
    </div>
  </section>
);
