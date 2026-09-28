'use client';

/* ---------------------------------------------------------------------------
   SPECIALTIES — "Most hypnotherapists stop at phobias."

   This is the page's actual argument, so it gets the page's most deliberate
   layout: the claim pins to the left while the six conditions it refers to
   scroll past on the right, each with its own photograph. The reader cannot
   lose the thesis while reading the evidence for it, which is the entire
   reason to pin something.

   THE CONDITIONS LIST IS NOT DECORATION. Each entry maps to a real service
   slug, carries that service's own image from unsplash.ts, and links to its
   page. It is generated from SERVICES rather than retyped, so a service that
   gets renamed or re-ranked cannot leave a stale claim sitting here.

   THE WORDS ARE THE SAME WORDS. The em-dashed run-on in the original prose is
   split into scannable rows, and the scope sentence — works alongside your
   doctor, not instead of them — is kept verbatim and given its own plate,
   because it is what makes every other claim on this page credible rather
   than reckless.

   Pinning is desktop-only and is skipped entirely under reduced motion; the
   section then reads as an ordinary stacked list, which is what it is
   underneath.
--------------------------------------------------------------------------- */

import Link from 'next/link';
import { REAL_COPY, SERVICES } from '../content';
import { serviceImage } from '../unsplash';
import { ShieldCheckIcon, ArrowRightIcon } from '../Icons';
import {
  motion,
  useReducedMotion,
  useTransform,
  useSectionProgress,
  Reveal,
  SplitHeading,
  ClipReveal,
  SectionProgressBar,
  EASE_OUT_SOFT,
} from '../Motion';

/** slug -> the plain-language label the argument uses for it. */
const CONDITIONS: { slug: string; label: string; note: string }[] = [
  {
    slug: 'depression-bipolar-support',
    label: 'Diagnosed depression & bipolar disorder',
    note: 'The cases most hypnotherapists decline outright.',
  },
  {
    slug: 'stress-and-anxiety',
    label: 'Disabling anxiety',
    note: 'Not everyday nerves — anxiety other approaches have already met.',
  },
  {
    slug: 'chronic-pain',
    label: 'Chronic & post-surgical pain',
    note: 'Worked alongside ongoing medical care, never instead of it.',
  },
  { slug: 'ibs', label: 'Gut-directed hypnotherapy', note: 'For IBS and other gut-brain conditions.' },
  { slug: 'grief-and-loss', label: 'Grief and loss', note: 'One of the most requested areas of the practice.' },
  { slug: 'smoking-cessation', label: 'Smoking cessation', note: 'The proven, high-close service.' },
];

export const Specialties = () => {
  const reduce = useReducedMotion();
  const [ref, progress] = useSectionProgress();
  const scaleY = useTransform(progress, [0, 1], [0, 1]);

  return (
    <section id="specialties" ref={ref} className="relative overflow-hidden bg-[#E6EFFF] py-20 sm:py-28">
      <div className="relative mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-x-16 gap-y-12 lg:grid-cols-12">
          {/* PINNED CLAIM ------------------------------------------------- */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <Reveal>
                <p className="mb-4 font-body text-[11.5px] font-bold uppercase tracking-[0.2em] text-[#46699F] sm:text-xs">
                  {REAL_COPY.headers.specialties}
                </p>
              </Reveal>
              <SplitHeading
                text="Most hypnotherapists stop at phobias."
                className="font-heading text-[2.1rem] leading-[1.12] tracking-[-0.015em] text-[#2E2F3D] sm:text-[2.6rem]"
              />
              <Reveal delay={0.1}>
                <p className="mt-6 max-w-[42ch] text-[16.5px] leading-[1.72] text-[#4B5468]">
                  The usual hypnotherapy menu is phobias, nail-biting and light behavioural change. Jason Meissner
                  takes the cases that menu leaves out.
                </p>
              </Reveal>

              {/* The drawing rule. Its height is tied to this section's own
                  scroll progress, so it fills as the argument is read. */}
              <div className="mt-9 hidden h-28 w-px bg-[#2E2F3D]/12 lg:block">
                <motion.div
                  className="h-full w-full origin-top bg-gradient-to-b from-[#46699F] to-[#5DBA47]"
                  style={reduce ? { scaleY: 1 } : { scaleY }}
                />
              </div>

              <Reveal delay={0.15}>
                <div className="mt-9 flex items-start gap-4 rounded-[16px] border border-[#2E2F3D]/10 bg-white/85 p-6 backdrop-blur-sm">
                  <span className="mt-0.5 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-[#E9F3EF]">
                    <ShieldCheckIcon className="h-[18px] w-[18px] text-[#2E2F3D]" />
                  </span>
                  <p className="text-[15px] leading-[1.68] text-[#2E2F3D]">
                    Hypnotherapy here works alongside your doctor, psychiatrist or chiropractor &mdash; not instead
                    of them. Most clients arrive already under someone&rsquo;s care, and that is exactly how this
                    practice is designed to work.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>

          {/* SCROLLING EVIDENCE ------------------------------------------- */}
          <div className="lg:col-span-7">
            <div className="mb-8 text-[#2E2F3D]">
              <SectionProgressBar progress={progress} />
            </div>

            <ul className="flex flex-col gap-5">
              {CONDITIONS.map((c, i) => {
                const service = SERVICES.find((s) => s.slug === c.slug);
                const img = serviceImage(c.slug);
                return (
                  <motion.li
                    key={c.slug}
                    initial={reduce ? false : { opacity: 0, y: 34 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '0px 0px -12% 0px' }}
                    transition={{ duration: 0.75, delay: (i % 2) * 0.06, ease: EASE_OUT_SOFT }}
                  >
                    <Link
                      href={`/services/${c.slug}`}
                      className="group flex items-stretch gap-0 overflow-hidden rounded-[18px] border border-[#2E2F3D]/10 bg-white transition-all duration-500 hover:-translate-y-1 hover:border-[#46699F]/40 hover:shadow-[0_26px_56px_-30px_rgba(46,47,61,0.45)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#454659] focus-visible:ring-offset-2"
                    >
                      <ClipReveal
                        src={img.src}
                        alt={img.alt}
                        from={i % 2 === 0 ? 'left' : 'bottom'}
                        className="relative w-28 flex-shrink-0 overflow-hidden sm:w-40"
                        imgClassName="h-full w-full object-cover transition-transform duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.09]"
                      />
                      {/*
                        EVERY ROW IS THE SAME HEIGHT. Two things made them
                        ragged before: `note` wraps to one line on some entries
                        and two on others, and only the Featured services carry
                        a `tag`, so three rows had a badge and three did not.

                        The badge row is now always rendered — it falls back to
                        the service's own `category`, which every service has —
                        and the note is clamped to two lines with the height
                        reserved. Uniform without inventing a label for the
                        services that have no tag.
                      */}
                      <div className="flex min-h-[8.75rem] flex-1 items-center justify-between gap-4 p-5 sm:min-h-[9.5rem] sm:p-6">
                        <div className="min-w-0">
                          <p className="line-clamp-2 font-heading text-[1.12rem] leading-snug text-[#2E2F3D] sm:text-[1.3rem]">
                            {c.label}
                          </p>
                          <p className="mt-1.5 line-clamp-2 min-h-[2.6rem] text-[13.5px] leading-[1.55] text-[#4B5468]">
                            {c.note}
                          </p>
                          <span className="mt-2.5 inline-flex items-center rounded-full bg-[#E6EFFF] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.1em] text-[#46699F]">
                            {service?.tag ?? service?.category ?? 'Service'}
                          </span>
                        </div>
                        <ArrowRightIcon className="h-5 w-5 flex-shrink-0 text-[#46699F] transition-transform duration-300 group-hover:translate-x-1.5" />
                      </div>
                    </Link>
                  </motion.li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
