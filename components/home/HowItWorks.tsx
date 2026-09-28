'use client';

/* ---------------------------------------------------------------------------
   HOW IT WORKS — three steps, alternating, each with its own photograph.

   The rail down the middle fills in step with this section's own scroll
   progress rather than on a timer. Tying it to scroll instead of to time is
   the difference between a progress indicator and a loading spinner: the
   visitor is the one moving through the process, so the visitor should be the
   one moving the line.

   The rail and the step markers are aria-hidden throughout. An <ol> already
   communicates "three ordered steps"; a decorative line reporting its own fill
   percentage would be noise.

   STEPS come from content.ts verbatim, including the $200 and the street
   address in step two. Those are site-verified figures and this component does
   not reformat or round them.

   The photographs are deliberately literal — a telephone, a session, a person
   walking — because this is the section a nervous prospect reads to find out
   what they are actually agreeing to.
--------------------------------------------------------------------------- */

import { STEPS } from '../content';
import { serviceImage, OUT_WALK, TEXTURE_FLOW } from '../unsplash';
import { responsive } from '../responsive';
import { SectionHeading } from '../SectionHeading';
import {
  motion,
  useReducedMotion,
  useTransform,
  useSectionProgress,
  ClipReveal,
  Parallax,
  EASE_OUT_SOFT,
} from '../Motion';

/** One image per step, in STEPS order. */
const STEP_IMAGES = [
  serviceImage('discovery-call'),
  serviceImage('hypnotherapy-sessions'),
  OUT_WALK,
];

export const HowItWorks = () => {
  const reduce = useReducedMotion();
  const [ref, progress] = useSectionProgress();
  const scaleY = useTransform(progress, [0, 1], [0, 1]);

  return (
    <section ref={ref} className="relative overflow-hidden bg-[#E9F3EF] py-16 sm:py-28">
      <Parallax speed={40} className="pointer-events-none absolute inset-0">
        <img
          src={TEXTURE_FLOW.src}
        {...responsive(TEXTURE_FLOW.src, 'full')}
          alt=""
          aria-hidden="true"
          loading="lazy"
          className="h-[120%] w-full object-cover opacity-[0.12] mix-blend-luminosity"
        />
      </Parallax>

      <div className="relative mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <SectionHeading
          className="mb-16 sm:mb-20"
          eyebrow="The process"
          title="How it works"
          lede={<p>Three stages, and the first one costs nothing.</p>}
        />

        <div className="relative">
          {/* THE RAIL. Centred on desktop, down the left on mobile — in both
              cases inset so it starts and ends at the first and last marker
              rather than running off into the section padding. */}
          <div
            aria-hidden="true"
            className="absolute bottom-24 left-[27px] top-24 w-px bg-[#2E2F3D]/12 lg:left-1/2 lg:-translate-x-1/2"
          >
            <motion.div
              className="h-full w-full origin-top bg-gradient-to-b from-[#46699F] via-[#5DBA47] to-[#46699F]"
              style={reduce ? { scaleY: 1 } : { scaleY }}
            />
          </div>

          <ol className="relative flex flex-col gap-16 sm:gap-20">
            {STEPS.map((s, i) => {
              const img = STEP_IMAGES[i] ?? STEP_IMAGES[0];
              const flip = i % 2 === 1;
              return (
                <li key={s.n} className="relative">
                  <div
                    className={`grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-20 ${
                      flip ? 'lg:[direction:rtl]' : ''
                    }`}
                  >
                    {/* COPY — [direction:ltr] resets the rtl trick used to
                        flip column order without duplicating the markup. */}
                    <motion.div
                      initial={reduce ? false : { opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
                      transition={{ duration: 0.75, ease: EASE_OUT_SOFT }}
                      className="flex gap-5 lg:[direction:ltr]"
                    >
                      <motion.span
                        aria-hidden="true"
                        initial={reduce ? false : { scale: 0.6, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: true, margin: '0px 0px -12% 0px' }}
                        transition={{ duration: 0.6, delay: 0.1, ease: EASE_OUT_SOFT }}
                        className="relative z-10 flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full border border-[#2E2F3D]/12 bg-white font-heading text-lg text-[#46699F] shadow-[0_8px_24px_-12px_rgba(46,47,61,0.4)] lg:hidden"
                      >
                        {s.n}
                      </motion.span>
                      <div>
                        <p
                          aria-hidden="true"
                          className="mb-3 hidden font-heading text-[3.4rem] leading-none text-[#46699F]/25 lg:block"
                        >
                          {s.n}
                        </p>
                        <h3 className="mb-3 font-heading text-[1.5rem] text-[#2E2F3D] sm:text-[1.8rem]">
                          {s.title}
                        </h3>
                        <p className="max-w-[44ch] text-[16px] leading-[1.72] text-[#4B5468]">{s.body}</p>
                      </div>
                    </motion.div>

                    {/* IMAGE */}
                    <div className="lg:[direction:ltr]">
                      <ClipReveal
                        src={img.src}
                        alt={img.alt}
                        from={flip ? 'right' : 'left'}
                        className="overflow-hidden rounded-[20px] border border-[#2E2F3D]/10 shadow-[0_28px_64px_-34px_rgba(46,47,61,0.45)]"
                        imgClassName="aspect-[4/3] w-full object-cover"
                      />
                    </div>
                  </div>

                  {/* Desktop marker, centred on the rail. */}
                  <span
                    aria-hidden="true"
                    className="absolute left-1/2 top-1/2 hidden h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[#2E2F3D]/12 bg-white font-heading text-[15px] text-[#46699F] shadow-[0_8px_24px_-12px_rgba(46,47,61,0.4)] lg:flex"
                  >
                    {s.n}
                  </span>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
};
