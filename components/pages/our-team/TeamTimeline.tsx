'use client';

/* ---------------------------------------------------------------------------
   OUR TEAM — the 2016 paperwork, as a line drawn by the scroll.

   Signature motion: SCROLL-DRAW. The rail down the left is an SVG line with
   a slow wave in it, drawn in step with the visitor's scroll (ScrollDraw);
   each entry swings in on its own as it is reached.

   EVERY NODE IS A DATE PRINTED ON A DOCUMENT THIS PAGE DISPLAYS, sorted by
   that date (see ./credentials.ts) — March 8, April 14, April 19, April 21,
   October 8, all 2016. Nothing is inferred to fill the sequence: no "opened
   the practice" node, because no document says when that happened. The
   heading, lede and closing note are the words the previous timeline on
   this page used, carried over verbatim.

   The rail stays down the LEFT on every width: a centred alternating
   timeline stops being readable the moment one entry runs to two lines and
   its neighbour does not.

   On wide screens a particle lattice sits beside the sequence, pinned while
   it scrolls past — the page's one in-page 3D scene, decorative, never
   mounted on phones.
--------------------------------------------------------------------------- */

import { SectionHeading } from '../../SectionHeading';
import { MindScene } from '../../scene/MindScene';
import { motion, useReducedMotion, EASE_OUT_SOFT } from '../../Motion';
import { ScrollDraw } from '../../MotionFx';
import { chronological, splitDate } from './credentials';
import { useViewportWidth } from './useViewport';

/* A vertical line with a gentle wave in it: twelve half-waves down a 40 x
   1000 box, stretched to the rail's real height. */
const RAIL = (() => {
  let d = 'M20 0';
  const n = 12;
  const h = 1000 / n;
  for (let k = 0; k < n; k++) {
    const y0 = k * h;
    d += ` Q ${k % 2 ? 10 : 30} ${(y0 + h / 2).toFixed(1)} 20 ${(y0 + h).toFixed(1)}`;
  }
  return d;
})();

export const TeamTimeline = () => {
  const reduce = useReducedMotion();
  const vw = useViewportWidth(0);
  const items = chronological();
  const years = [...new Set(items.map((i) => splitDate(i.date).year))];
  const yearLabel = years.length === 1 ? years[0] : `${years[0]}–${years[years.length - 1]}`;

  return (
    <section className="relative overflow-hidden bg-[#F7F9FC] py-16 sm:py-32">
      <div className="relative mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <SectionHeading
          className="mb-14 sm:mb-20"
          eyebrow={`The paperwork, ${yearLabel}`}
          /* Markup #69-#72: "specialisms" is not a word, and the lede is
             deleted ("Yes delete all of this text"). */
          title="Four specialist certifications, then the diploma"
          size="lg"
        />

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="relative lg:col-span-7">
            {/* THE RAIL. Decorative: the <ol> carries the order. */}
            <div className="absolute bottom-8 left-[12px] top-8 w-10 sm:left-[24px]">
              <ScrollDraw
                d={RAIL}
                viewBox="0 0 40 1000"
                className="h-full w-full text-[#46699F]"
                strokeWidth={2.5}
                gradient={['#46699F', '#5DBA47']}
                offset={['start 72%', 'end 62%']}
              />
            </div>

            <ol className="relative flex flex-col gap-6">
              {items.map((it, i) => {
                const d = splitDate(it.date);
                const isLast = i === items.length - 1;
                return (
                  <motion.li
                    key={it.img}
                    initial={reduce ? false : { opacity: 0, x: -34, rotateY: -14 }}
                    whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
                    viewport={{ once: true, margin: '0px 0px 5% 0px' }}
                    transition={{ duration: 0.65, ease: EASE_OUT_SOFT }}
                    style={{ transformPerspective: 1000, transformOrigin: '0% 50%' }}
                    className="flex items-stretch gap-5 sm:gap-7"
                  >
                    <motion.div
                      initial={reduce ? false : { scale: 0.55 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true, margin: '0px 0px 5% 0px' }}
                      transition={{ duration: 0.6, delay: 0.1, ease: [0.34, 1.56, 0.64, 1] }}
                      className={`relative z-10 flex h-16 w-16 flex-shrink-0 flex-col items-center justify-center self-center rounded-full border text-center shadow-[0_12px_28px_-16px_rgba(31,32,48,0.5)] sm:h-[5.5rem] sm:w-[5.5rem] ${
                        isLast ? 'border-[#5DBA47] bg-[#5DBA47] text-[#2E2F3D]' : 'border-[#D7DEEA] bg-white text-[#46699F]'
                      }`}
                    >
                      <span className="font-heading text-[1.2rem] leading-none sm:text-[1.6rem]">{d.day}</span>
                      <span className="mt-0.5 text-[11px] font-bold uppercase tracking-[0.12em] sm:text-[11px]">
                        {d.month}
                      </span>
                    </motion.div>

                    <div
                      className={`flex flex-1 flex-col justify-center rounded-[18px] border p-5 transition-[transform,box-shadow] duration-500 hover:-translate-y-0.5 hover:shadow-[0_24px_50px_-30px_rgba(31,32,48,0.45)] sm:p-6 ${
                        isLast
                          ? 'border-[#5DBA47]/45 bg-white shadow-[0_22px_48px_-30px_rgba(46,47,61,0.4)]'
                          : 'border-[#D7DEEA] bg-white'
                      }`}
                    >
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
                        <p className="font-heading text-[1.08rem] leading-snug text-[#2E2F3D] sm:text-[1.25rem]">
                          {it.award}
                        </p>
                        {isLast ? (
                          <span className="inline-flex items-center rounded-full bg-[#E9F3EF] px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-[0.1em] text-[#2E2F3D]">
                            Diploma
                          </span>
                        ) : null}
                      </div>
                      <p className="mt-2 text-[13.5px] text-[#4B5468]">
                        {it.issuer}
                        {it.ref ? (
                          <>
                            {' '}
                            &middot; <span className="tabular-nums">Cert. #{it.ref}</span>
                          </>
                        ) : null}
                      </p>
                    </div>
                  </motion.li>
                );
              })}
            </ol>
          </div>

          {/* PINNED FIGURE (wide screens only) --------------------------- */}
          <div aria-hidden="true" className="hidden lg:col-span-5 lg:block">
            <div className="sticky top-28 h-[min(70vh,560px)]">
              <div className="absolute inset-[8%] rounded-full bg-[radial-gradient(closest-side,rgba(169,196,238,0.45),transparent)] blur-2xl" />
              <p className="absolute inset-x-0 bottom-2 text-center font-heading text-[7.5rem] leading-none tracking-[-0.04em] text-[#2E2F3D]/[0.07]">
                {yearLabel}
              </p>
              {vw >= 1024 ? (
                <MindScene
                  shape="lattice"
                  tone="light"
                  intro={false}
                  intensity={0.8}
                  className="absolute inset-0"
                />
              ) : null}
            </div>
          </div>
        </div>

        {/* The closing note that explained how this timeline was assembled
            is gone: the client asked the site to stop talking about itself
            (markup #8, #27). */}
      </div>
    </section>
  );
};
