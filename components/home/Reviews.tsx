'use client';

/* ---------------------------------------------------------------------------
   REVIEWS — the six real Google screenshots, on a rail.

   THESE ARE SCREENSHOTS AND THE SECTION SAYS SO. content.ts explains why: the
   reviewer names are greyed out in the client's own crops, so there is no
   author to attach, which rules out Review schema and rules out setting them
   as typographic pull-quotes with a name underneath. Presenting them as images
   of the real thing is the honest option and it is also, conveniently, more
   persuasive than a styled quote a visitor has no way to verify.

   Each screenshot carries the `gist` from content.ts as its alt text, so a
   screen reader gets the substance of a review it cannot see. That is the
   whole reason those gists were written.

   MOTION: a slow ticker that pauses on hover and on keyboard focus, and can be
   dragged. Under reduced motion <Marquee> degrades to a plain horizontally
   scrollable row, which keeps every review reachable.
--------------------------------------------------------------------------- */

import { REVIEW_SHOTS, RATING } from '../content';
import * as A from '../assets';
import { FOG_FOREST } from '../unsplash';
import { StarIcon } from '../Icons';
import { responsive } from '../responsive';
import { Reveal, SplitHeading, Marquee } from '../Motion';

/** content.ts stores the export NAME; the mapping to the asset lives here so
    the facts file stays free of image payloads. Same pattern /our-team uses. */
const SRC: Record<string, string> = {
  REVIEW_IBS: A.REVIEW_IBS,
  REVIEW_SMOKING_30YR: A.REVIEW_SMOKING_30YR,
  REVIEW_SMOKING_13YR: A.REVIEW_SMOKING_13YR,
  REVIEW_CONFIDENCE: A.REVIEW_CONFIDENCE,
  REVIEW_GROWTH: A.REVIEW_GROWTH,
  REVIEW_RELATIONSHIP: A.REVIEW_RELATIONSHIP,
};

export const Reviews = () => (
  <section className="relative overflow-hidden bg-[#F7F9FC] py-16 sm:py-28">
    <img
      src={FOG_FOREST.src}
        {...responsive(FOG_FOREST.src, 'full')}
      alt=""
      aria-hidden="true"
      loading="lazy"
      className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-[0.05]"
    />

    <div className="relative mx-auto mb-12 max-w-[1280px] px-4 sm:mb-14 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <Reveal>
            <p className="mb-3 font-body text-[11.5px] font-bold uppercase tracking-[0.2em] text-[#46699F] sm:text-xs">
              In their words
            </p>
          </Reveal>
          <SplitHeading
            text="Real reviews from real clients."
            className="max-w-[18ch] font-heading text-[2.2rem] sm:text-[2.9rem] lg:text-[3.3rem] leading-[1.08] tracking-[-0.018em] text-[#2E2F3D]"
          />
        </div>
        <Reveal delay={0.15} dir="left">
          <div className="flex items-center gap-3 rounded-full border border-[#D7DEEA] bg-white px-5 py-3">
            <span className="flex" aria-hidden="true">
              {Array.from({ length: 5 }, (_, i) => (
                <StarIcon key={i} className="h-4 w-4 text-[#5DBA47]" />
              ))}
            </span>
            <span className="text-[13.5px] font-semibold text-[#2E2F3D]">
              {RATING.value.toFixed(1)} from {RATING.count} Google reviews
            </span>
          </div>
        </Reveal>
      </div>
      <Reveal delay={0.2}>
        <p className="mt-5 max-w-[62ch] text-[15px] leading-[1.7] text-[#4B5468]">
          Screenshots of the practice&rsquo;s own Google reviews.
        </p>
      </Reveal>
    </div>

    {/* TWO ROWS, RUNNING OPPOSITE WAYS. One row of six screenshots loops
        quickly enough to read as motion but slowly enough to read as text;
        a second row travelling the other way fills the band without needing
        more reviews than the practice actually has. The second row is the
        same six, offset, and it is aria-hidden inside <Marquee> either way. */}
    <div className="flex flex-col gap-5">
      <Marquee speed={78} className="ph-fade-x">
        {REVIEW_SHOTS.map((r, i) => (
          <ReviewCard key={`a-${r.img}-${i}`} img={SRC[r.img]} gist={r.gist} topic={r.topic} />
        ))}
      </Marquee>

      <Marquee speed={92} reverse className="ph-fade-x hidden sm:block">
        {[...REVIEW_SHOTS.slice(3), ...REVIEW_SHOTS.slice(0, 3)].map((r, i) => (
          <ReviewCard key={`b-${r.img}-${i}`} img={SRC[r.img]} gist={r.gist} topic={r.topic} />
        ))}
      </Marquee>
    </div>
  </section>
);

/*
 * EVERY CARD IS THE SAME SHAPE, and getting there took one non-obvious step.
 *
 * The six screenshots are all different aspect ratios — 900x517 through
 * 900x690, so between 1.74:1 and 1.30:1. Letting each card size to its own
 * image gave a visibly ragged rail; letting the flex row stretch them all to
 * the tallest gave a band of empty card under five of six captions.
 *
 * The fix is a fixed 16/9 frame with `object-cover object-top`. The RATIO
 * MATTERS: 16/9 is 1.78, wider than the widest screenshot in the set, which
 * means every image scales to fill the WIDTH and is cropped only along the
 * BOTTOM. Choose a narrower frame — 4/3, say — and the wider screenshots get
 * scaled to fill the height instead and cropped at the left and right edges,
 * slicing words off the review text. Cropping the bottom only loses the
 * Like/Share row, which is the one part nobody needs to read.
 *
 * If a seventh review is ever added, check its ratio against 1.78 before
 * dropping it in.
 *
 * The caption is a fixed h-14 with its text vertically centred, so a topic
 * that wraps to two lines cannot make one card taller than its neighbours.
 */
const ReviewCard = ({ img, gist, topic }: { img: string; gist: string; topic: string }) => (
  <figure className="mx-3 flex w-[18rem] flex-shrink-0 flex-col overflow-hidden rounded-[16px] border border-[#D7DEEA] bg-white shadow-[0_18px_40px_-26px_rgba(46,47,61,0.4)] transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_28px_56px_-28px_rgba(46,47,61,0.5)] sm:w-[21rem]">
    <div className="aspect-[16/9] w-full overflow-hidden bg-[#F7F9FC]">
      <img src={img} alt={gist} loading="lazy" className="h-full w-full object-cover object-top" />
    </div>
    <figcaption className="flex h-14 items-center border-t border-[#D7DEEA] px-5 text-[12px] font-semibold uppercase leading-tight tracking-[0.1em] text-[#46699F]">
      {topic}
    </figcaption>
  </figure>
);
