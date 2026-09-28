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
     ChooseBand     the "if the list is too long" cards, floating at
                    different depths under the mouse (DepthField), sliding in
                    from alternate sides, beside a particle figure of rings —
                    the conversation the discovery call is.

   Copy is the hub's existing copy, verbatim. The ticker is aria-hidden: every
   name in it is a real link in the panels and the grid below.
--------------------------------------------------------------------------- */

import type { ReactNode } from 'react';
import { SERVICES } from '../../content';
import { serviceImage } from '../../unsplash';
import { responsive } from '../../responsive';
import { Spiral } from '../../Spiral';
import { ServiceCard } from '../../ServiceCard';
import { SectionHeading } from '../../SectionHeading';
import { MindScene } from '../../scene/MindScene';
import { Stagger } from '../../Motion';
import { VelocityMarquee, FlipItem, SlideItem, DepthField, Depth, WaveSeam } from '../../MotionFx';
import { useWide } from './useWide';

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
  <section className="relative bg-[#E6EFFF] pb-24 pt-20 sm:pb-32 sm:pt-28">
    <WaveSeam color="#E6EFFF" className="absolute inset-x-0 bottom-full" />
    <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
      <SectionHeading
        className="mb-12 sm:mb-16"
        eyebrow={eyebrow}
        title={title}
        aside={
          <p className="text-[12.5px] font-semibold uppercase tracking-[0.12em] text-[#46699F]">
            {SERVICES.length} services
          </p>
        }
      />
      {/* One Stagger per card rather than one for the grid: a single parent
          fires when the grid's TOP enters the viewport, and the bottom rows
          would flip while still off screen. Delay by column keeps each row a
          left-to-right cascade. Flex-wrap rather than grid so the last,
          short row (14 = 4 x 3 + 2) sits centred instead of orphaned left. */}
      <div className="flex flex-wrap justify-center gap-6" style={{ perspective: 1400 }}>
        {SERVICES.map((s, i) => (
          <Stagger
            key={s.slug}
            className="w-full md:w-[calc((100%-1.5rem)/2)] lg:w-[calc((100%-3rem)/3)]"
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

/* -------------------------------------------------------------- choose -- */

export type ChooseCard = { t: string; b: string; slug: string };

export const ChooseBand = ({
  eyebrow,
  title,
  lede,
  cards,
}: {
  eyebrow: string;
  title: string;
  lede: ReactNode;
  cards: ChooseCard[];
}) => {
  const wide = useWide();
  return (
    <section className="relative overflow-hidden bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
          <SectionHeading className="lg:col-span-7" size="lg" eyebrow={eyebrow} title={title} lede={lede} />
          {/* Second (and last) canvas on this page, desktop only. Rings = a
              conversation; it settles into an orb under the pointer. */}
          <div className="relative hidden h-[22rem] lg:col-span-5 lg:block">
            <div
              aria-hidden="true"
              className="absolute inset-[8%] rounded-full bg-[radial-gradient(closest-side,rgba(70,105,159,0.14),transparent)]"
            />
            {wide ? (
              <MindScene shape="rings" hoverShape="orb" tone="light" intro={false} intensity={0.85} className="absolute inset-0" />
            ) : null}
          </div>
        </div>

        <DepthField className="mt-14 sm:mt-16">
          <Stagger className="grid grid-cols-1 gap-6 lg:grid-cols-3" gap={0.14}>
            {cards.map((c, i) => {
              const img = serviceImage(c.slug);
              return (
                <SlideItem key={c.t} from={i % 2 === 0 ? 'left' : 'right'} className="h-full">
                  <Depth depth={i === 1 ? 10 : 6} className="h-full">
                    <article className="group relative flex h-full flex-col overflow-hidden rounded-[24px] border border-[#D7DEEA] bg-[#F7F9FC] transition-shadow duration-500 hover:shadow-[0_34px_70px_-36px_rgba(46,47,61,0.45)]">
                      <div className="relative aspect-[16/10] overflow-hidden">
                        <Depth depth={-16} className="absolute -inset-5">
                          <img
                            src={img.src}
                            alt={img.alt}
                            loading="lazy"
                            {...responsive(img.src, 'card')}
                            className="h-full w-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
                          />
                        </Depth>
                        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-br from-[#1F2030]/60 via-[#1F2030]/10 to-transparent" />
                        <span
                          aria-hidden="true"
                          className="absolute left-5 top-4 font-heading text-[3.2rem] leading-none text-white [text-shadow:0_4px_24px_rgba(31,32,48,0.55)]"
                        >
                          {String(i + 1).padStart(2, '0')}
                        </span>
                      </div>
                      <div className="flex flex-1 flex-col p-6 sm:p-7">
                        <h3 className="mb-2.5 font-heading text-[1.3rem] leading-snug text-[#2E2F3D]">{c.t}</h3>
                        <p className="text-[15px] leading-[1.65] text-[#4B5468]">{c.b}</p>
                      </div>
                    </article>
                  </Depth>
                </SlideItem>
              );
            })}
          </Stagger>
        </DepthField>
      </div>
    </section>
  );
};
