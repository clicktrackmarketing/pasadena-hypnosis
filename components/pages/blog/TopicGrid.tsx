'use client';

/* ---------------------------------------------------------------------------
   BLOG — THE PLANNED SUBJECTS (redesigned 2026-09-28).

   STILL HONESTLY EMPTY. Every card is one of the page's own PLANNED_TOPICS:
   the planned title, the words "Not written yet", and the real service page
   that covers the subject meanwhile. The redesign added motion and a bento
   layout; it did not add a date, a reading time, an excerpt or a byline,
   because every one of those would be invented.

   SIGNATURE MOTION FOR THIS SECTION: the cards arrive by focusing in from a
   blur and a slightly smaller scale (PopItem in a Stagger), each carries a
   soft light under the cursor (Spotlight), and the photograph — the one the
   linked service page itself uses — zooms and regains its colour on hover.

   LAYOUT: a 4-column bento on desktop. The first subject is a 2 x 2 feature
   and the last spans two columns, so the eight cards fill a clean 4 x 3 with
   no hole; on tablets the same two cards span the full row of a 2-column
   grid, and phones get a single column.
--------------------------------------------------------------------------- */

import Link from 'next/link';
import { ArrowRightIcon } from '../../Icons';
import { Rings } from '../../Spiral';
import { responsive } from '../../responsive';
import { Counter, Reveal, SplitHeading, Stagger } from '../../Motion';
import { PopItem, ScrollRotate, Spotlight } from '../../MotionFx';

export type TopicCard = {
  title: string;
  related?: { label: string; href: string };
  img: { src: string; alt: string } | null;
};

const Card = ({ t, i, variant }: { t: TopicCard; i: number; variant: 'feature' | 'wide' | 'plain' }) => {
  const feature = variant === 'feature';
  const wide = variant === 'wide';
  return (
    <Spotlight
      as="article"
      color="rgba(70,105,159,0.14)"
      className={`group flex h-full rounded-[22px] border border-[#D7DEEA] bg-white transition-[transform,box-shadow,border-color] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1.5 hover:border-[#46699F]/40 hover:shadow-[0_30px_60px_-32px_rgba(46,47,61,0.45)] ${
        wide ? 'flex-col sm:flex-row' : 'flex-col'
      }`}
    >
      {t.img ? (
        <div
          className={`relative overflow-hidden ${
            feature
              ? 'aspect-[16/11] lg:aspect-auto lg:min-h-[18rem] lg:flex-1'
              : wide
                ? 'aspect-[16/10] sm:aspect-auto sm:min-h-[14rem] sm:w-1/2 sm:flex-shrink-0'
                : 'aspect-[16/10]'
          }`}
        >
          <img
            src={t.img.src}
            alt={t.img.alt}
            loading="lazy"
            {...responsive(t.img.src, feature || wide ? 'half' : 'card')}
            className="absolute inset-0 h-full w-full object-cover grayscale-[35%] transition-[transform,filter] duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.09] group-hover:grayscale-0"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#2E2F3D]/60 via-transparent to-transparent" />
          <span className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-white/92 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.1em] text-[#2E2F3D] backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-[#5DBA47]" aria-hidden="true" />
            Not written yet
          </span>
          <span
            aria-hidden="true"
            className={`absolute bottom-3 right-5 font-heading leading-none text-white/85 tabular-nums ${
              feature ? 'text-[4.5rem] sm:text-[5.5rem]' : 'text-[2.4rem]'
            }`}
          >
            {String(i + 1).padStart(2, '0')}
          </span>
        </div>
      ) : null}

      <div className={`relative flex flex-1 flex-col ${feature ? 'p-7 sm:p-9' : 'p-6'}`}>
        <h3
          className={`flex-1 font-heading leading-snug text-[#2E2F3D] ${
            feature ? 'text-[1.5rem] sm:text-[1.9rem] lg:text-[2.1rem] lg:leading-[1.2]' : wide ? 'text-[1.25rem] sm:text-[1.4rem]' : 'text-[1.1rem]'
          }`}
        >
          {t.title}
        </h3>
        {t.related ? (
          <Link
            href={t.related.href}
            className="ph-tap ph-underline mt-6 inline-flex w-fit items-center gap-2 text-[13.5px] font-semibold text-[#46699F] transition-colors hover:text-[#2E2F3D] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#454659] focus-visible:ring-offset-2"
          >
            Meanwhile: {t.related.label}
            <ArrowRightIcon className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        ) : null}
      </div>
    </Spotlight>
  );
};

export const TopicGrid = ({ topics }: { topics: TopicCard[] }) => {
  const last = topics.length - 1;
  return (
    <section className="relative isolate overflow-hidden bg-[#E6EFFF] py-16 sm:py-28">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <ScrollRotate degrees={-160} className="absolute -right-64 -top-56 h-[44rem] w-[44rem]">
          <Rings className="h-full w-full text-[#46699F]/12" count={9} />
        </ScrollRotate>
      </div>

      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <div className="mb-12 flex flex-col gap-4 border-b border-[#2E2F3D]/12 pb-7 sm:mb-14 sm:flex-row sm:items-end sm:justify-between">
          <SplitHeading
            text="Planned, not yet written"
            className="font-heading text-[2.2rem] sm:text-[2.9rem] lg:text-[3.3rem] leading-[1.08] tracking-[-0.018em] text-[#2E2F3D]"
          />
          <Reveal dir="left" delay={0.15}>
            <p className="flex items-baseline gap-2.5 text-[12.5px] font-semibold uppercase tracking-[0.12em] text-[#46699F]">
              <span className="sr-only">{topics.length}</span>
              <span aria-hidden="true">
                <Counter
                  to={topics.length}
                  duration={1.1}
                  className="font-heading text-[2.6rem] normal-case leading-none tracking-normal text-[#2E2F3D]"
                />
              </span>
              subjects
            </p>
          </Reveal>
        </div>

        {/* Each card carries the photograph of the service it points at —
            the same slug-keyed image used on that service's own page. The
            picture is therefore doing something honest: it previews the page
            the "meanwhile" link actually goes to, rather than illustrating an
            article that does not exist. */}
        <Stagger className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6" gap={0.08}>
          {topics.map((t, i) => {
            const variant = i === 0 ? 'feature' : i === last && topics.length > 2 ? 'wide' : 'plain';
            const span =
              variant === 'feature' ? 'sm:col-span-2 lg:row-span-2' : variant === 'wide' ? 'sm:col-span-2' : '';
            return (
              <PopItem key={t.title} className={`h-full ${span}`}>
                <Card t={t} i={i} variant={variant} />
              </PopItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
};
