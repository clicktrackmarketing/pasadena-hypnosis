'use client';

/* ---------------------------------------------------------------------------
   WHY PEOPLE COME.

   THE CAREFUL BIT, and it is the whole reason this section is written the way
   it is. Three large photographs of people looking calm, under a heading about
   a hypnotherapy practice, is one short step from a before-and-after claim.
   So:

     - Every line of text here is a REASON SOMEONE ARRIVED, taken from the
       `topic` field of the practice's six real Google reviews in content.ts.
       Not one of them is an outcome, a result, or a percentage.
     - The section heading says "come", not "leave".
     - The photographs are captioned with the reason, never with a result, and
       the footnote states plainly that they are stock images and not clients.

   A practice whose own scope note says it is not a licensed clinician cannot
   afford a band of imagery that implies cures. This is the version that says
   something true and still looks like something.

   MOTION: the three tiles rise on a stagger and their images push in slowly on
   hover; the band behind them drifts on scroll.
--------------------------------------------------------------------------- */

import Link from 'next/link';
import { REVIEW_SHOTS, RATING } from '../content';
import { OUT_BENCH, OUT_SLEEP, OUT_WALK } from '../unsplash';
import { ArrowRightIcon, StarIcon } from '../Icons';
import { SectionHeading } from '../SectionHeading';
import { Reveal, Stagger, ClipReveal } from '../Motion';
import { FlipItem, Spotlight } from '../MotionFx';

/* Three of the six real review topics, paired with a frame. The remaining
   three appear on the reviews rail below; nothing is invented to fill a slot. */
const REASONS = [
  {
    image: OUT_WALK,
    topic: REVIEW_SHOTS[0].topic, // Quit smoking after 30 years
    detail: 'After cutting down, quitting cold turkey and rationing had all been tried.',
  },
  {
    image: OUT_BENCH,
    topic: REVIEW_SHOTS[4].topic, // Preparing for a stressful event
    detail: 'About four sessions, booked ahead of something specific and unavoidable.',
  },
  {
    image: OUT_SLEEP,
    topic: REVIEW_SHOTS[1].topic, // Persistent IBS
    detail: 'Every doctor already seen, and pain medication already being taken.',
  },
];

export const WhyPeopleCome = () => (
  <section className="relative overflow-hidden bg-[#E6EFFF] py-16 sm:py-28">
    <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
      <SectionHeading
        className="mb-12 sm:mb-16"
        eyebrow="Why people come"
        title="Most clients arrive having tried the obvious things first"
        lede={
          <p>
            These are the situations described in the practice&rsquo;s own Google reviews &mdash; what people came
            in for, in their words, not what they left with.
          </p>
        }
        aside={
          <div className="flex items-center gap-3 rounded-full border border-[#D7DEEA] bg-white px-5 py-3">
            <span className="flex" aria-hidden="true">
              {Array.from({ length: 5 }, (_, i) => (
                <StarIcon key={i} className="h-4 w-4 text-[#5DBA47]" />
              ))}
            </span>
            <span className="text-[13.5px] font-semibold text-[#2E2F3D]">
              {RATING.value.toFixed(1)} from {RATING.count} reviews
            </span>
          </div>
        }
      />

      <Stagger className="grid grid-cols-1 gap-6 md:grid-cols-3" gap={0.14}>
        {REASONS.map((r) => (
          <FlipItem key={r.topic}>
            <Spotlight as="article" color="rgba(70,105,159,0.12)" className="group h-full overflow-hidden rounded-[20px] border border-[#D7DEEA] bg-white transition-all duration-500 hover:-translate-y-1.5 hover:border-[#46699F]/40 hover:shadow-[0_30px_66px_-32px_rgba(46,47,61,0.45)]">
              <ClipReveal
                src={r.image.src}
                alt={r.image.alt}
                from="bottom"
                className="relative aspect-[4/3] overflow-hidden"
                imgClassName="h-full w-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.08]"
              />
              <div className="p-6">
                <p className="mb-2.5 text-[11px] font-bold uppercase tracking-[0.14em] text-[#46699F]">
                  Came in for
                </p>
                <h3 className="mb-2.5 font-heading text-[1.3rem] leading-snug text-[#2E2F3D]">{r.topic}</h3>
                <p className="text-[14.5px] leading-[1.62] text-[#4B5468]">{r.detail}</p>
              </div>
            </Spotlight>
          </FlipItem>
        ))}
      </Stagger>

      <Reveal delay={0.1}>
        <div className="mt-8 flex flex-col items-start justify-between gap-4 border-t border-[#D7DEEA] pt-6 sm:flex-row sm:items-center">
          <p className="max-w-[72ch] text-[12.5px] leading-[1.6] text-[#4B5468]">
            The photographs above are stock images, not clients of this practice. The situations described are taken
            from real Google reviews, which are shown as screenshots further down this page.
          </p>
          <Link
            href="/services"
            className="ph-tap ph-underline inline-flex flex-shrink-0 items-center gap-2 text-[14.5px] font-semibold text-[#46699F] transition-colors hover:text-[#2E2F3D] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#454659] focus-visible:ring-offset-2"
          >
            See what Jason treats
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </div>
      </Reveal>
    </div>
  </section>
);
