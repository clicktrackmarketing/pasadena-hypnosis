'use client';

/* ---------------------------------------------------------------------------
   PRACTITIONER — Jason, the room, and the certificates.

   REAL ASSETS ONLY IN THIS SECTION. OFFICE_INTERIOR is the practice's own
   photograph of its own consulting room, pulled from its Google Business
   Profile; the credential ticker lists five certificates the site actually
   displays on /our-team, transcribed off the documents. No stock image appears
   anywhere in this block, because this is the block a prospect reads to decide
   whether the practitioner is real.

   The scope note keeps its own plate and its full wording: "a certified
   hypnotherapist is not a licensed medical or mental-health clinician". It
   would be very easy for a redesign to treat that as a legal footnote and
   shrink it. It is doing the opposite job — naming the limit is what makes the
   ten years and the five certificates land as fact rather than as sales copy.

   MOTION: the room photograph drifts against the scroll, the credential rail
   tickers sideways and pauses on hover or keyboard focus, and the two headline
   numbers count up. The ticker duplicates its content, so the copy the screen
   reader sees is the first pass only — the second is aria-hidden inside
   <Marquee>.
--------------------------------------------------------------------------- */

import Link from 'next/link';
import { PRACTITIONER, CREDENTIALS, RATING } from '../content';
import { OFFICE_INTERIOR, OFFICE_INTERIOR_ALT } from '../assets';
import { ArrowRightIcon, ShieldCheckIcon, StarIcon } from '../Icons';
import { Reveal, SplitHeading, Parallax, Counter, Marquee, Stagger, StaggerItem, TiltCard } from '../Motion';
import { ScrubText, DepthField, Depth } from '../MotionFx';
import { Rings } from '../Spiral';

export const Practitioner = () => (
  <section className="relative overflow-hidden bg-white py-16 sm:py-28">
    <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">
          <Reveal>
            <p className="mb-3 font-body text-[11.5px] font-bold uppercase tracking-[0.2em] text-[#46699F] sm:text-xs">
              Practitioner
            </p>
          </Reveal>
          <SplitHeading
            text={PRACTITIONER.name}
            className="font-heading text-[2.2rem] sm:text-[2.9rem] lg:text-[3.3rem] leading-[1.08] tracking-[-0.018em] text-[#2E2F3D]"
          />
          <Reveal delay={0.12}>
            <p className="mt-3 text-[15px] font-medium text-[#46699F]">{PRACTITIONER.role}</p>
          </Reveal>
          {/* The bio reads itself in as it scrolls through view (2026-09-28). */}
          <ScrubText
            text={PRACTITIONER.bio}
            dim={0.22}
            offset={['start 88%', 'end 60%']}
            className="mt-6 max-w-[60ch] text-[17.5px] leading-[1.72] text-[#2E2F3D]"
          />

          {/* Two figures, both site-verified: the decade in practice and the
              Google rating. Nothing else on this page counts up. */}
          <Stagger className="mt-10 grid grid-cols-2 gap-5 sm:max-w-md" gap={0.12}>
            <StaggerItem>
              <div className="rounded-[16px] border border-[#D7DEEA] bg-[#E6EFFF] p-5">
                <p className="font-heading text-[2.4rem] leading-none text-[#2E2F3D]">
                  <Counter to={10} duration={1.6} />
                </p>
                <p className="mt-2 text-[12.5px] uppercase tracking-[0.12em] text-[#4B5468]">
                  years in practice
                </p>
              </div>
            </StaggerItem>
            <StaggerItem>
              <div className="rounded-[16px] border border-[#D7DEEA] bg-[#E9F3EF] p-5">
                <p className="flex items-baseline gap-1.5 font-heading text-[2.4rem] leading-none text-[#2E2F3D]">
                  <Counter to={RATING.value} decimals={1} duration={1.6} />
                  <StarIcon className="h-5 w-5 translate-y-[-2px] text-[#5DBA47]" />
                </p>
                <p className="mt-2 text-[12.5px] uppercase tracking-[0.12em] text-[#4B5468]">
                  from {RATING.count} Google reviews
                </p>
              </div>
            </StaggerItem>
          </Stagger>

          <Reveal delay={0.1}>
            <div className="mt-8 flex items-start gap-4 rounded-[16px] border border-[#D7DEEA] bg-[#E6EFFF] p-6">
              <ShieldCheckIcon className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#454659]" />
              <p className="text-[15px] leading-[1.7] text-[#2E2F3D]">{PRACTITIONER.scopeNote}</p>
            </div>
          </Reveal>

          <Reveal delay={0.14}>
            <Link
              href="/our-team"
              className="ph-tap ph-underline mt-8 inline-flex items-center gap-2 text-[15px] font-semibold text-[#46699F] transition-colors hover:text-[#2E2F3D] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#454659] focus-visible:ring-offset-2"
            >
              Full credentials &amp; our team
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>

        {/* THE ROOM ------------------------------------------------------- */}
        <div className="lg:col-span-5">
          {/* Pointer-depth layers: the rings sit behind and drift further
              than the photograph, so the frame reads as an object in space. */}
          <DepthField className="relative mx-auto max-w-[26rem] lg:max-w-none">
          <Depth depth={-26} className="pointer-events-none absolute -right-16 -top-16 hidden lg:block">
            <Rings className="h-72 w-72 text-[#46699F]/25 ph-spin-slow" count={6} />
          </Depth>
          <Parallax speed={34}>
          <Depth depth={12}>
          <TiltCard max={4}>
            <figure className="relative overflow-hidden rounded-[20px] border border-[#D7DEEA] shadow-[0_30px_70px_-34px_rgba(46,47,61,0.55)]">
              <img
                src={OFFICE_INTERIOR}
                alt={OFFICE_INTERIOR_ALT}
                loading="lazy"
                className="aspect-[3/4] w-full object-cover"
              />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#2E2F3D] via-[#2E2F3D]/75 to-transparent p-5 pt-16 text-[13px] text-[#D9E1F0]">
                The consulting room in South Pasadena. Sessions also run by video, anywhere in California.
              </figcaption>
            </figure>
          </TiltCard>
          </Depth>
          </Parallax>
          </DepthField>
        </div>
      </div>
    </div>

    {/* CREDENTIAL TICKER ------------------------------------------------- */}
    <div className="mt-16 border-y border-[#D7DEEA] bg-[#FAFBFD] py-5 sm:mt-20">
      <Marquee speed={46} className="ph-fade-x">
        {CREDENTIALS.map((c, i) => (
          <div key={`${c.award}-${i}`} className="flex items-center gap-4 px-7">
            <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#5DBA47]" aria-hidden="true" />
            <span className="whitespace-nowrap text-[14px] font-semibold text-[#2E2F3D]">{c.award}</span>
            <span className="whitespace-nowrap text-[13px] text-[#4B5468]">{c.issuer}</span>
            <span className="whitespace-nowrap text-[12.5px] text-[#4B5468]">{c.date}</span>
          </div>
        ))}
      </Marquee>
    </div>
  </section>
);
