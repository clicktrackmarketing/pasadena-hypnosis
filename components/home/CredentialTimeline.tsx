'use client';

/* ---------------------------------------------------------------------------
   CREDENTIAL TIMELINE.

   EVERY NODE IS A DATE PRINTED ON A DOCUMENT THIS SITE DISPLAYS. The five
   certificates on /our-team carry March 8, April 14, April 19, April 21 and
   October 8, all 2016, and this renders them in that order — sorted by the
   date on the paper rather than by position in the CREDENTIALS array, which
   happened to put the diploma first and reversed the real sequence.

   NOTHING IS INFERRED TO FILL THE GAPS. A timeline is the single most
   inviting place on a site to invent a milestone: "2018 — opened the South
   Pasadena office", "2020 — 500th client". No document supports either, so
   neither is here. The sequence starts where the paperwork starts and stops
   where it stops, and the closing node says only what the bio already says —
   ten years in practice — with no month attached to it.

   The story it tells is true and was buried before: the four American
   Hypnosis Association specialisms were all earned in spring 2016, months
   BEFORE the HMI diploma completed that October.

   MOTION: the rail fills with the section's own scroll progress, and each
   node arrives as it is reached. The rail is aria-hidden — the <ol> already
   communicates the sequence, and a line reporting its own fill percentage
   would be noise.
--------------------------------------------------------------------------- */

import { SectionHeading } from '../SectionHeading';
import {
  motion,
  useReducedMotion,
  useTransform,
  useSectionProgress,
  Reveal,
  EASE_OUT_SOFT,
} from '../Motion';

export type TimelineItem = {
  date: string;
  award: string;
  issuer: string;
  ref: string | null;
};

/** "October 8, 2016" -> { month: "Oct", day: "8", year: "2016" } */
const splitDate = (d: string) => {
  const parsed = new Date(d);
  if (Number.isNaN(parsed.getTime())) return { month: '', day: '', year: d };
  return {
    month: parsed.toLocaleString('en-US', { month: 'short' }),
    day: String(parsed.getDate()),
    year: String(parsed.getFullYear()),
  };
};

export const CredentialTimeline = ({ items }: { items: TimelineItem[] }) => {
  const reduce = useReducedMotion();
  const [ref, progress] = useSectionProgress();
  const scaleY = useTransform(progress, [0, 1], [0, 1]);

  const years = [...new Set(items.map((i) => splitDate(i.date).year))];
  const yearLabel = years.length === 1 ? years[0] : `${years[0]}–${years[years.length - 1]}`;

  return (
    <section ref={ref} className="relative overflow-hidden bg-[#F7F9FC] py-20 sm:py-28">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <SectionHeading
          className="mb-14 sm:mb-16"
          eyebrow={`The paperwork, ${yearLabel}`}
          title="Four specialisms, then the diploma"
          lede={
            <p>
              Dated in the order the documents themselves are dated. The American Hypnosis Association
              specialisms came first, in the spring; the accredited diploma completed that October.
            </p>
          }
        />

        <div className="relative">
          {/* THE RAIL — down the left on every width, because a centred
              alternating timeline stops being readable the moment one entry
              runs to two lines and its neighbour does not. */}
          <div
            aria-hidden="true"
            className="absolute bottom-6 left-[31px] top-6 w-px bg-[#2E2F3D]/12 sm:left-[43px]"
          >
            <motion.div
              className="h-full w-full origin-top bg-gradient-to-b from-[#46699F] via-[#5DBA47] to-[#46699F]"
              style={reduce ? { scaleY: 1 } : { scaleY }}
            />
          </div>

          <ol className="relative flex flex-col gap-5">
            {items.map((it, i) => {
              const d = splitDate(it.date);
              const isLast = i === items.length - 1;
              return (
                <motion.li
                  key={`${it.award}-${it.date}`}
                  initial={reduce ? false : { opacity: 0, x: -22 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '0px 0px -12% 0px' }}
                  transition={{ duration: 0.7, delay: i * 0.06, ease: EASE_OUT_SOFT }}
                  className="flex items-stretch gap-5 sm:gap-7"
                >
                  {/* DATE MARKER */}
                  <div
                    className={`relative z-10 flex h-16 w-16 flex-shrink-0 flex-col items-center justify-center rounded-full border text-center sm:h-[5.5rem] sm:w-[5.5rem] ${
                      isLast
                        ? 'border-[#5DBA47] bg-[#5DBA47] text-[#2E2F3D]'
                        : 'border-[#D7DEEA] bg-white text-[#46699F]'
                    }`}
                  >
                    <span className="font-heading text-[1.15rem] leading-none sm:text-[1.5rem]">{d.day}</span>
                    <span className="mt-0.5 text-[9.5px] font-bold uppercase tracking-[0.12em] sm:text-[10.5px]">
                      {d.month}
                    </span>
                  </div>

                  {/* ENTRY */}
                  <div
                    className={`flex flex-1 flex-col justify-center rounded-[16px] border p-5 transition-all duration-500 hover:-translate-y-0.5 sm:p-6 ${
                      isLast
                        ? 'border-[#5DBA47]/40 bg-white shadow-[0_22px_48px_-30px_rgba(46,47,61,0.4)]'
                        : 'border-[#D7DEEA] bg-white'
                    }`}
                  >
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
                      <p className="font-heading text-[1.05rem] leading-snug text-[#2E2F3D] sm:text-[1.2rem]">
                        {it.award}
                      </p>
                      {isLast ? (
                        <span className="inline-flex items-center rounded-full bg-[#E9F3EF] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.1em] text-[#2E2F3D]">
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

        {/* CLOSING NOTE. Deliberately NOT a timeline node: "ten years in
            practice" is a statement in the bio, not a date on a certificate,
            and giving it a marker on this rail would dress an approximation up
            as a document. */}
        <Reveal delay={0.1}>
          <p className="mt-10 max-w-[70ch] border-t border-[#2E2F3D]/10 pt-6 text-[14px] leading-[1.7] text-[#4B5468]">
            Every date above is printed on a certificate shown further down this page. The practice has run in South
            Pasadena for the decade since &mdash; that part is Jason&rsquo;s own account rather than a document, so
            it is written here rather than added to the sequence.
          </p>
        </Reveal>
      </div>
    </section>
  );
};
