'use client';

/* ---------------------------------------------------------------------------
   ABOUT — the room, as a layered collage.

   Signature motion: DEPTH. The collage is a stack of layers at different
   depths (DepthField/Depth), so they separate as the mouse moves across it,
   and each photograph is uncovered by a sweeping colour panel
   (CurtainReveal) rather than faded in.

   WHAT IS IN THE COLLAGE, and why only these:
     - OFFICE_INTERIOR — the practice's own photograph of its room (assets.ts),
       with its own alt text. It is the only room picture on this page.
     - One real Google review, as the screenshot it is, alt = its `gist`.
     - Two chips carrying facts the hero strip already states.
     - Blue smoke (stock, alt '') and rings: abstract texture only. No stock
       ROOM photograph is used here, so nothing in the frame could be read as
       a second picture of the office.
   On touch devices the layers simply sit still.

   The copy beside it is REAL_COPY.about.office, verbatim, split at its own
   full stop so the first sentence can carry the section heading.
--------------------------------------------------------------------------- */

import { REAL_COPY, NAP, RATING, REVIEW_SHOTS } from '../../content';
import * as ASSETS from '../../assets';
import { OFFICE_INTERIOR, OFFICE_INTERIOR_ALT, OFFICE_INTERIOR_W, OFFICE_INTERIOR_H } from '../../assets';
import { BLUE_SMOKE } from '../../unsplash';
import { responsive } from '../../responsive';
import { MapPinIcon, StarIcon, QuoteIcon, ArrowRightIcon } from '../../Icons';
import { Rings } from '../../Spiral';
import { Reveal, SplitHeading } from '../../Motion';
import { DepthField, Depth, CurtainReveal } from '../../MotionFx';

const reviewImage = (key: string) => {
  const rec = ASSETS as unknown as Record<string, string | number>;
  return { src: rec[key] as string, width: rec[key + '_W'] as number, height: rec[key + '_H'] as number };
};

/** "A. B." -> ["A.", "B."] — splits at the first full stop only. */
const firstSentence = (s: string): [string, string] => {
  const i = s.indexOf('. ');
  return i === -1 ? [s, ''] : [s.slice(0, i + 1), s.slice(i + 2)];
};

export const AboutRoom = () => {
  const [lead, rest] = firstSentence(REAL_COPY.about.office);
  // The widest crop in the set, so it reads at a small size.
  const shot = REVIEW_SHOTS.find((r) => r.img === 'REVIEW_CONFIDENCE') ?? REVIEW_SHOTS[0];
  const shotImg = reviewImage(shot.img);

  return (
    <section className="relative overflow-hidden bg-[#E6EFFF] py-24 sm:py-32">
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 items-center gap-16 px-4 sm:px-6 lg:grid-cols-12 lg:gap-12 lg:px-8">
        {/* COLLAGE ------------------------------------------------------ */}
        <DepthField className="relative mx-auto aspect-[5/6] w-full max-w-[560px] lg:col-span-6 lg:max-w-none">
          <Depth depth={-26} className="pointer-events-none absolute inset-[-6%]">
            <Rings className="h-full w-full text-[#46699F]/25 ph-spin-slower" count={8} />
          </Depth>

          <Depth depth={-14} className="absolute left-0 top-[2%] w-[40%]">
            <div aria-hidden="true" className="overflow-hidden rounded-[18px] opacity-90 shadow-[0_24px_50px_-30px_rgba(31,32,48,0.6)]">
              <img
                src={BLUE_SMOKE.src}
                alt=""
                loading="lazy"
                {...responsive(BLUE_SMOKE.src, 'tile')}
                className="aspect-[2/3] w-full -rotate-3 scale-110 object-cover"
              />
            </div>
          </Depth>

          <Depth depth={14} className="absolute right-0 top-[5%] w-[62%]">
            <CurtainReveal color="#2E2F3D" className="rounded-[22px] shadow-[0_40px_80px_-36px_rgba(31,32,48,0.65)]">
              <figure className="relative">
                <img
                  src={OFFICE_INTERIOR}
                  alt={OFFICE_INTERIOR_ALT}
                  width={OFFICE_INTERIOR_W}
                  height={OFFICE_INTERIOR_H}
                  loading="lazy"
                  className="aspect-[760/1131] w-full rounded-[22px] object-cover"
                />
              </figure>
            </CurtainReveal>
          </Depth>

          <Depth depth={34} className="absolute bottom-[4%] left-0 w-[60%]">
            <div className="-rotate-2">
            <CurtainReveal color="#46699F" delay={0.3} className="rounded-[16px] shadow-[0_30px_60px_-28px_rgba(31,32,48,0.55)]">
              <figure className="overflow-hidden rounded-[16px] border border-[#D7DEEA] bg-white">
                <div className="flex items-center gap-2 px-4 py-2.5">
                  <QuoteIcon className="h-4 w-4 flex-shrink-0 text-[#46699F]" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#46699F]">Google review</span>
                </div>
                <div className="aspect-[16/9] w-full overflow-hidden">
                  <img
                    src={shotImg.src}
                    alt={shot.gist}
                    width={shotImg.width}
                    height={shotImg.height}
                    loading="lazy"
                    className="h-full w-full object-cover object-top"
                  />
                </div>
              </figure>
            </CurtainReveal>
            </div>
          </Depth>

          <Depth depth={48} className="absolute right-[3%] bottom-[13%] sm:bottom-[15%]">
            <Reveal delay={0.9} dir="left" distance={18}>
              <p className="inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-2 text-[12.5px] font-semibold text-[#2E2F3D] shadow-[0_16px_36px_-18px_rgba(31,32,48,0.6)] sm:px-4 sm:text-[13px]">
                <span className="flex" aria-hidden="true">
                  {Array.from({ length: 5 }, (_, i) => (
                    <StarIcon key={i} className="h-3 w-3 text-[#5DBA47]" />
                  ))}
                </span>
                {RATING.value.toFixed(1)} from {RATING.count} reviews
              </p>
            </Reveal>
          </Depth>

          <Depth depth={40} className="absolute left-[4%] top-[48%] sm:top-[46%]">
            <Reveal delay={1.05} dir="right" distance={18}>
              <p className="inline-flex items-center gap-2 rounded-full bg-[#2E2F3D] px-3.5 py-2 text-[12.5px] font-medium text-white shadow-[0_16px_36px_-18px_rgba(31,32,48,0.8)] sm:text-[13px]">
                <MapPinIcon className="h-3.5 w-3.5 flex-shrink-0 text-[#A9C4EE]" />
                {NAP.city}, {NAP.state}
              </p>
            </Reveal>
          </Depth>
        </DepthField>

        {/* COPY ---------------------------------------------------------- */}
        <div className="lg:col-span-5 lg:col-start-8">
          <Reveal>
            <p className="mb-5 inline-flex items-center gap-3 font-body text-xs font-semibold uppercase tracking-[0.2em] text-[#46699F] sm:text-[13px]">
              <span aria-hidden="true" className="inline-block h-px w-10 bg-[#46699F]/60" />
              The room
            </p>
          </Reveal>
          <SplitHeading
            text={lead}
            className="font-heading text-[2.2rem] sm:text-[2.9rem] lg:text-[3.3rem] leading-[1.08] tracking-[-0.018em] text-[#2E2F3D]"
          />
          {rest ? (
            <Reveal delay={0.15}>
              <p className="mt-6 max-w-[46ch] text-[17px] leading-[1.75] text-[#4B5468]">{rest}</p>
            </Reveal>
          ) : null}

          <Reveal delay={0.25}>
            <div className="mt-10 flex flex-col gap-4 border-t border-[#2E2F3D]/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
              <address className="not-italic text-[15px] leading-[1.6] text-[#2E2F3D]">
                {NAP.street}
                <br />
                {NAP.city}, {NAP.state} {NAP.zip}
              </address>
              <a
                href={NAP.directions}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 self-start rounded-full border border-[#2E2F3D]/15 px-5 py-2.5 text-sm font-medium text-[#2E2F3D] transition-all duration-300 hover:border-[#454659] hover:bg-[#454659] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#454659] focus-visible:ring-offset-2 sm:self-auto"
              >
                Get directions
                <ArrowRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};
