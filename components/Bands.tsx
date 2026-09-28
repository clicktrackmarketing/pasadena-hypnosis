'use client';

/* ---------------------------------------------------------------------------
   SHARED PAGE BANDS.

   Three layouts that several pages each needed a copy of. They live here so
   the inner pages stay readable — an inner page file should say what it is
   about, not re-derive a two-column image layout every time.

   Everything here obeys the same imagery rule as the rest of the site: alt
   text describes the frame, no stock photograph is captioned as this practice,
   and where a band shows the practice's own room it comes from ./assets.
--------------------------------------------------------------------------- */

import Link from 'next/link';
import type { ReactNode } from 'react';
import type { StockImage } from './unsplash';
import { ArrowRightIcon } from './Icons';
import { SectionHeading } from './SectionHeading';
import { Reveal, Stagger, StaggerItem, Parallax, ClipReveal, Marquee, LineReveal } from './Motion';
import { responsive } from './responsive';

/* -------------------------------------------------------------------------
   SPLIT FEATURE — copy one side, picture the other, alternating down a page.
   ------------------------------------------------------------------------- */
export const SplitFeature = ({
  eyebrow,
  title,
  lines,
  image,
  flip = false,
  children,
  tint = 'white',
}: {
  eyebrow: string;
  title: string;
  /** Paragraph as explicit lines — see LineReveal's note on why not a string. */
  lines: string[];
  image: StockImage;
  flip?: boolean;
  children?: ReactNode;
  tint?: 'white' | 'blue' | 'mint' | 'pale';
}) => {
  const bg =
    tint === 'blue' ? 'bg-[#E6EFFF]' : tint === 'mint' ? 'bg-[#E9F3EF]' : tint === 'pale' ? 'bg-[#F7F9FC]' : 'bg-white';

  return (
    <section className={`relative overflow-hidden ${bg} py-16 sm:py-28`}>
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <div className={`grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20 ${flip ? 'lg:[direction:rtl]' : ''}`}>
          <div className="lg:[direction:ltr]">
            <SectionHeading eyebrow={eyebrow} title={title} size="sm" />
            <LineReveal
              lines={lines}
              className="mt-6 max-w-[48ch] text-[16.5px] leading-[1.72] text-[#4B5468]"
              delay={0.15}
            />
            {children ? <Reveal delay={0.2}>{children}</Reveal> : null}
          </div>

          <div className="lg:[direction:ltr]">
            <Parallax speed={26}>
              <ClipReveal
                src={image.src}
                alt={image.alt}
                from={flip ? 'right' : 'left'}
                className="overflow-hidden rounded-[20px] border border-[#2E2F3D]/10 shadow-[0_30px_70px_-34px_rgba(46,47,61,0.5)]"
                imgClassName="aspect-[4/3] w-full object-cover"
              />
            </Parallax>
          </div>
        </div>
      </div>
    </section>
  );
};

/* -------------------------------------------------------------------------
   IMAGE STRIP — a slow edge-to-edge ticker of pictures.

   aria-hidden throughout: it carries no information a caption would convey,
   and announcing a dozen unlabelled images would be noise. Anything a visitor
   needs to know is in the band's own heading.
   ------------------------------------------------------------------------- */
export const ImageStrip = ({
  images,
  speed = 70,
  reverse = false,
  className,
}: {
  images: StockImage[];
  speed?: number;
  reverse?: boolean;
  className?: string;
}) => (
  <div aria-hidden="true" className={className}>
    <Marquee speed={speed} reverse={reverse} className="ph-fade-x">
      {images.map((img, i) => (
        <span
          key={`${img.src}-${i}`}
          className="mx-2.5 block h-28 w-40 flex-shrink-0 overflow-hidden rounded-[12px] border border-[#2E2F3D]/10 sm:h-36 sm:w-52"
        >
          <img src={img.src} alt="" loading="lazy" className="h-full w-full object-cover" {...responsive(img.src, 'tile')} />
        </span>
      ))}
    </Marquee>
  </div>
);

/* -------------------------------------------------------------------------
   FEATURE GRID — three or four tiles, each with a picture and a link.
   ------------------------------------------------------------------------- */
export const FeatureGrid = ({
  eyebrow,
  title,
  lede,
  items,
  tint = 'white',
  aside,
  columns = 3,
}: {
  eyebrow: string;
  title: string;
  lede?: ReactNode;
  items: { title: string; body: string; image: StockImage; href?: string; tag?: string }[];
  tint?: 'white' | 'blue' | 'mint' | 'pale';
  aside?: ReactNode;
  columns?: 2 | 3 | 4;
}) => {
  const bg =
    tint === 'blue' ? 'bg-[#E6EFFF]' : tint === 'mint' ? 'bg-[#E9F3EF]' : tint === 'pale' ? 'bg-[#F7F9FC]' : 'bg-white';
  const cols =
    columns === 2 ? 'sm:grid-cols-2' : columns === 4 ? 'sm:grid-cols-2 lg:grid-cols-4' : 'sm:grid-cols-2 lg:grid-cols-3';

  return (
    <section className={`relative overflow-hidden ${bg} py-16 sm:py-28`}>
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <SectionHeading className="mb-12 sm:mb-14" eyebrow={eyebrow} title={title} lede={lede} aside={aside} />

        <Stagger className={`grid grid-cols-1 gap-6 ${cols}`} gap={0.08}>
          {items.map((it) => {
            const inner = (
              <article className="group flex h-full flex-col overflow-hidden rounded-[18px] border border-[#D7DEEA] bg-white transition-all duration-500 hover:-translate-y-1.5 hover:border-[#46699F]/40 hover:shadow-[0_28px_60px_-28px_rgba(46,47,61,0.4)]">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={it.image.src}
                    alt={it.image.alt}
                    loading="lazy"
                    {...responsive(it.image.src, 'card')}
                    className="h-full w-full object-cover transition-transform duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.08]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2E2F3D]/50 via-transparent to-transparent" />
                  {it.tag ? (
                    <span className="absolute left-4 top-4 inline-flex items-center rounded-full bg-white/92 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.1em] text-[#2E2F3D] backdrop-blur-sm">
                      {it.tag}
                    </span>
                  ) : null}
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="mb-2.5 font-heading text-[1.25rem] leading-snug text-[#2E2F3D]">{it.title}</h3>
                  <p className="flex-1 text-[14.5px] leading-[1.62] text-[#4B5468]">{it.body}</p>
                  {it.href ? (
                    <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#46699F]">
                      Learn more
                      <ArrowRightIcon className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1.5" />
                    </span>
                  ) : null}
                </div>
              </article>
            );

            return (
              <StaggerItem key={it.title} distance={28}>
                {it.href ? (
                  <Link
                    href={it.href}
                    className="block h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#454659] focus-visible:ring-offset-2 rounded-[18px]"
                  >
                    {inner}
                  </Link>
                ) : (
                  inner
                )}
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
};
