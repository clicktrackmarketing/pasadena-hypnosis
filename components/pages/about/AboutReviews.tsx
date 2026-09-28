'use client';

/* ---------------------------------------------------------------------------
   ABOUT — the reviews, on the dark band.

   Six real 5-star Google reviews, SHOWN AS THE SCREENSHOTS THEY ARE (see the
   REVIEW_SHOTS note in content.ts) — never retyped as quotes, never given an
   author. Each card is uncovered by a sweeping colour panel (CurtainReveal),
   the panels running across the grid in reading order.

   THE 16/9 FRAME IS LOAD-BEARING, carried over from the previous version of
   this page: 16/9 (1.78) is wider than the widest crop in the set (900x517,
   1.74), so every screenshot fills the width and is cropped only along the
   bottom — the Like/Share row — and never through the review text. If a
   seventh review is added, check its ratio against 1.78 first.

   The particle figure beside the heading is the page's one extra 3D scene
   (desktop only, to keep phones to a single canvas). It is decorative and
   claims nothing.
--------------------------------------------------------------------------- */

import { RATING, REVIEW_SHOTS } from '../../content';
import * as ASSETS from '../../assets';
import { StarIcon, QuoteIcon } from '../../Icons';
import { MindScene } from '../../scene/MindScene';
import { Reveal, SplitHeading, Counter } from '../../Motion';
import { CurtainReveal } from '../../MotionFx';
import { useMinWidth } from './useMinWidth';

const reviewImage = (key: string) => {
  const rec = ASSETS as unknown as Record<string, string | number>;
  return { src: rec[key] as string, width: rec[key + '_W'] as number, height: rec[key + '_H'] as number };
};

/* Curtain colours, cycled. All used as a moving GROUND, never as text. */
const CURTAINS = ['#46699F', '#A9C4EE', '#F09D8B'];

export const AboutReviews = () => {
  const wide = useMinWidth(1024);

  return (
    <section className="relative isolate overflow-hidden bg-[#2E2F3D] py-20 ph-grain sm:py-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 top-0 h-[40rem] w-[40rem] rounded-full bg-[radial-gradient(closest-side,rgba(70,105,159,0.35),transparent)] blur-2xl"
      />

      <div className="relative mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal>
              <div className="mb-6 flex items-center gap-4">
                <span className="flex" aria-hidden="true">
                  {Array.from({ length: 5 }, (_, i) => (
                    <StarIcon key={i} className="h-5 w-5 text-[#5DBA47]" />
                  ))}
                </span>
                <p className="font-heading text-[2.4rem] leading-none text-white sm:text-[3rem]">
                  <Counter to={RATING.value} decimals={1} duration={1.4} />
                  <span className="text-[#A9C4EE]"> / 5</span>
                </p>
              </div>
            </Reveal>
            <SplitHeading
              text={`From ${RATING.count} Google reviews, shown as screenshots.`}
              className="max-w-[20ch] font-heading text-[2.2rem] sm:text-[2.9rem] lg:text-[3.3rem] leading-[1.08] tracking-[-0.018em] text-white"
            />
            <Reveal delay={0.15}>
              <p className="mt-7 max-w-[58ch] text-[16.5px] leading-[1.75] text-[#D9E1F0]">
                Every review below is a real 5-star Google review, shown as the screenshot it is. The reviewer names
                are greyed out in the practice&rsquo;s own crops, so these render as images rather than as invented
                quote cards with fabricated authors.
              </p>
            </Reveal>
          </div>

          <div aria-hidden="true" className="relative hidden h-[400px] lg:col-span-5 lg:block">
            <div className="absolute inset-[10%] rounded-full bg-[radial-gradient(closest-side,rgba(169,196,238,0.18),transparent)] blur-xl" />
            {wide ? (
              <MindScene
                shape="constellation"
                cycle={['constellation', 'rings']}
                cycleMs={7000}
                hoverShape="wave"
                tone="dark"
                intro={false}
                intensity={0.85}
                className="absolute inset-0"
              />
            ) : null}
          </div>
        </div>

        <ul className="mt-16 grid grid-cols-1 gap-6 sm:mt-20 sm:grid-cols-2 lg:grid-cols-3">
          {REVIEW_SHOTS.map((r, i) => {
            const img = reviewImage(r.img);
            return (
              <li
                key={r.img}
                className="group rounded-[18px] transition-[transform,box-shadow] duration-500 hover:-translate-y-1.5 hover:shadow-[0_30px_60px_-30px_rgba(0,0,0,0.8)]"
              >
                <CurtainReveal
                  color={CURTAINS[i % CURTAINS.length]}
                  delay={(i % 3) * 0.14 + Math.floor(i / 3) * 0.08}
                  className="rounded-[18px]"
                >
                  <figure className="flex flex-col overflow-hidden rounded-[18px] border border-white/10 bg-white">
                    <div className="flex items-center gap-2.5 px-5 py-4">
                      <QuoteIcon className="h-5 w-5 flex-shrink-0 text-[#46699F]" />
                      <span className="text-[10.5px] font-bold uppercase tracking-[0.12em] text-[#46699F]">
                        Google review
                      </span>
                    </div>
                    <div className="aspect-[16/9] w-full overflow-hidden bg-white">
                      <img
                        src={img.src}
                        alt={r.gist}
                        width={img.width}
                        height={img.height}
                        loading="lazy"
                        className="h-full w-full object-cover object-top transition-transform duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
                      />
                    </div>
                    <figcaption className="flex h-14 items-center border-t border-[#D7DEEA] bg-[#E9F3EF] px-5 text-[12px] font-semibold uppercase leading-tight tracking-[0.1em] text-[#2E2F3D]">
                      {r.topic}
                    </figcaption>
                  </figure>
                </CurtainReveal>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};
