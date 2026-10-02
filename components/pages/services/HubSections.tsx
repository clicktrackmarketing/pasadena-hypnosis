'use client';

/* ---------------------------------------------------------------------------
   SERVICES HUB — the animated bands between the hero and the CTA.

   Each band moves in its own way, so the page never repeats a fade-up:

     NameTicker     two rows of the service names in display serif, driven by
                    the scroll wheel (VelocityMarquee): they drift on their
                    own, speed up and lean with a fast scroll, and reverse when
                    the reader scrolls back up. Solid row / outline row.
     CatalogueGrid  every service card, flipping up out of the page in 3D
                    (FlipItem) as each row reaches the viewport.

   Copy is the hub's existing copy, verbatim. The ticker is aria-hidden: every
   name in it is a real link in the grid below. (ChooseBand, the "if the list
   is too long" cards, was removed 2026-10-01 — markup #52.)
--------------------------------------------------------------------------- */

import { SERVICES } from '../../content';
import { Spiral } from '../../Spiral';
import { ServiceCard } from '../../ServiceCard';
import { SectionHeading } from '../../SectionHeading';
import { Stagger } from '../../Motion';
import { VelocityMarquee, FlipItem, WaveSeam } from '../../MotionFx';

/* -------------------------------------------------------------- ticker -- */

const TickerRow = ({ names, outline }: { names: string[]; outline?: boolean }) => (
  <>
    {names.map((n) => (
      <span
        key={n}
        className={`mx-5 inline-flex items-center gap-10 font-heading text-[3rem] leading-[1.15] tracking-[-0.025em] sm:mx-8 sm:text-[4.6rem] lg:text-[6rem] ${
          outline ? 'text-transparent [-webkit-text-stroke:1.2px_#46699F]' : 'text-[#2E2F3D]'
        }`}
      >
        {n}
        <Spiral className="h-9 w-9 flex-shrink-0 text-[#46699F] sm:h-12 sm:w-12" strokeWidth={1.1} />
      </span>
    ))}
  </>
);

export const NameTicker = () => {
  const names = SERVICES.map((s) => s.name);
  const half = Math.ceil(names.length / 2);
  return (
    <section aria-hidden="true" className="relative overflow-hidden border-b border-[#D7DEEA] bg-white py-14 sm:py-20">
      <VelocityMarquee baseVelocity={-1.4} className="ph-fade-x">
        <TickerRow names={names.slice(0, half)} />
      </VelocityMarquee>
      <VelocityMarquee baseVelocity={1.1} className="ph-fade-x mt-1 sm:mt-2">
        <TickerRow names={names.slice(half)} outline />
      </VelocityMarquee>
    </section>
  );
};

/* ---------------------------------------------------------------- grid -- */

export const CatalogueGrid = ({ eyebrow, title }: { eyebrow: string; title: string }) => (
  <section className="relative bg-[#E6EFFF] pb-16 pt-16 sm:pb-32 sm:pt-28">
    <WaveSeam color="#E6EFFF" className="absolute inset-x-0 bottom-full" />
    <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
      <SectionHeading
        className="mb-12 sm:mb-16"
        eyebrow={eyebrow}
        title={title}
      />
      {/* One Stagger per card rather than one for the grid: a single parent
          fires when the grid's TOP enters the viewport, and the bottom rows
          would flip while still off screen. Delay by column keeps each row a
          left-to-right cascade. Flex-wrap rather than grid so a short last
          row sits centred instead of orphaned left. */}
      <div className="flex flex-wrap justify-center gap-3 sm:gap-6" style={{ perspective: 1400 }}>
        {SERVICES.map((s, i) => (
          <Stagger
            key={s.slug}
            className="w-[calc((100%-0.75rem)/2)] sm:w-[calc((100%-1.5rem)/2)] lg:w-[calc((100%-3rem)/3)]"
            delay={(i % 3) * 0.09}
          >
            <FlipItem className="h-full">
              <ServiceCard service={s} variant="full" />
            </FlipItem>
          </Stagger>
        ))}
      </div>
    </div>
  </section>
);
