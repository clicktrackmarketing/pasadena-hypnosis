'use client';

/* ---------------------------------------------------------------------------
   THE ROOM — a parallax gallery band.

   READ THE HEADING BEFORE THE PICTURES. It says "the kind of room this work
   happens in", and the caption under the band says in plain words that the
   practice's own room is the photograph on the About page. That is not
   throat-clearing: a seven-image gallery placed on a practice's homepage reads
   as "our premises" by default, and six of these seven are stock. Naming it is
   what makes the band usable at all.

   The seventh — OFFICE_INTERIOR — IS the real room, and it is the largest tile
   in the grid, captioned. The honest version of this section is the one where
   the real photograph is the hero of it.

   MOTION: each column drifts at a different speed, so the band never reads as
   a flat sheet of images, and each tile wipes in behind a clip-path rather
   than fading. Parallax is off entirely under reduced motion.
--------------------------------------------------------------------------- */

import Link from 'next/link';
import { GALLERY } from '../unsplash';
import { OFFICE_INTERIOR, OFFICE_INTERIOR_ALT } from '../assets';
import { ArrowRightIcon, MapPinIcon } from '../Icons';
import { SectionHeading } from '../SectionHeading';
import { Reveal, Parallax, ClipReveal } from '../Motion';

export const Gallery = () => (
  <section className="relative overflow-hidden bg-[#F7F9FC] py-16 sm:py-28">
    <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
      <SectionHeading
        className="mb-12 sm:mb-16"
        /* Markup #20: the lede is removed ("Remove all of this it is
           terrible!"). #29: "It is an office." */
        eyebrow="The setting"
        title="Where the work happens"
        aside={
          <Link
            href="/contact"
            className="group inline-flex items-center gap-2 rounded-full border border-[#2E2F3D]/15 px-5 py-2.5 text-sm font-medium text-[#2E2F3D] transition-all duration-300 hover:border-[#454659] hover:bg-[#454659] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#454659] focus-visible:ring-offset-2"
          >
            <MapPinIcon className="h-4 w-4" />
            Visit the office
            <ArrowRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        }
      />

      {/* Three columns at three parallax speeds. The middle one is offset
          downward so the band reads as staggered rather than as a table. */}
      <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
        <Parallax speed={30} className="flex flex-col gap-4 sm:gap-5">
          <ClipReveal
            src={GALLERY[0].src}
            alt={GALLERY[0].alt}
            from="bottom"
            className="aspect-[3/4] overflow-hidden rounded-[16px] border border-[#D7DEEA]"
            imgClassName="h-full w-full object-cover"
          />
          <ClipReveal
            src={GALLERY[1].src}
            alt={GALLERY[1].alt}
            from="left"
            delay={0.1}
            className="aspect-square overflow-hidden rounded-[16px] border border-[#D7DEEA]"
            imgClassName="h-full w-full object-cover"
          />
        </Parallax>

        <Parallax speed={-24} className="flex flex-col gap-4 pt-8 sm:gap-5 sm:pt-12">
          <ClipReveal
            src={GALLERY[2].src}
            alt={GALLERY[2].alt}
            from="bottom"
            delay={0.05}
            className="aspect-square overflow-hidden rounded-[16px] border border-[#D7DEEA]"
            imgClassName="h-full w-full object-cover"
          />
          <ClipReveal
            src={GALLERY[3].src}
            alt={GALLERY[3].alt}
            from="right"
            delay={0.15}
            className="aspect-[3/4] overflow-hidden rounded-[16px] border border-[#D7DEEA]"
            imgClassName="h-full w-full object-cover"
          />
        </Parallax>

        <Parallax speed={22} className="flex flex-col gap-4 sm:gap-5">
          <ClipReveal
            src={GALLERY[4].src}
            alt={GALLERY[4].alt}
            from="bottom"
            delay={0.08}
            className="aspect-[3/4] overflow-hidden rounded-[16px] border border-[#D7DEEA]"
            imgClassName="h-full w-full object-cover"
          />
          <ClipReveal
            src={GALLERY[6].src}
            alt={GALLERY[6].alt}
            from="left"
            delay={0.18}
            className="aspect-square overflow-hidden rounded-[16px] border border-[#D7DEEA]"
            imgClassName="h-full w-full object-cover"
          />
        </Parallax>

        {/* THE REAL ROOM. Largest tile, captioned, and the only one in the
            band that is a photograph of this practice. */}
        <Parallax speed={-14} className="col-span-2 mx-auto w-full max-w-[26rem] pt-4 lg:col-span-1 lg:max-w-none lg:pt-16">
          <Reveal>
            <figure className="relative overflow-hidden rounded-[16px] border border-[#46699F]/35 shadow-[0_28px_64px_-34px_rgba(46,47,61,0.5)]">
              <img
                src={OFFICE_INTERIOR}
                alt={OFFICE_INTERIOR_ALT}
                loading="lazy"
                className="aspect-[3/4] w-full object-cover"
              />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#2E2F3D] via-[#2E2F3D]/80 to-transparent p-5 pt-14">
                <span className="mb-2 inline-flex items-center rounded-full bg-[#5DBA47] px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-[0.1em] text-[#2E2F3D]">
                  The office
                </span>
                <p className="text-[13px] leading-[1.6] text-[#D9E1F0]">
                  The office in South Pasadena. Sessions also run online, anywhere.
                </p>
              </figcaption>
            </figure>
          </Reveal>
        </Parallax>
      </div>

      <Reveal delay={0.1}>
        {/* Shortened: the client asked the site to stop talking about itself
            (#27), but stock interiors still must not pass as his premises. */}
        <p className="mt-8 text-[12.5px] leading-[1.6] text-[#4B5468]">
          Only the captioned photo shows the Pasadena Hypnosis office.
        </p>
      </Reveal>
    </div>
  </section>
);
