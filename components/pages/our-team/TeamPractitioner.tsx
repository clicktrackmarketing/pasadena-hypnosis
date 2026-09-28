'use client';

/* ---------------------------------------------------------------------------
   OUR TEAM — the practitioner, with his five documents in orbit.

   Signature motion: ORBIT + TILT. The real portrait (PORTRAIT, assets.ts,
   kept in its native 4:5 frame) sits at the centre and leans toward the
   mouse (TiltCard); the five credentials circle it on a slow track, each
   label staying upright (Orbit). Hovering the orbit pauses it, so a label
   can be read.

   The labels are cut out of the award wording printed on each certificate
   (see ./credentials.ts) — nothing is added. The full wording, dates and
   certificate numbers are further down the page, beside the documents.

   PHONES get no orbit: a circle wide enough to carry these labels does not
   fit a 375px screen, and a half-clipped orbit reads as a bug. Below 640px
   the same five labels sit in a wrapped row under the portrait instead.
   Under reduced motion the orbit is simply still.
--------------------------------------------------------------------------- */

import { PRACTITIONER, REAL_COPY, CREDENTIALS } from '../../content';
import { PORTRAIT, PORTRAIT_ALT, PORTRAIT_W, PORTRAIT_H } from '../../assets';
import { responsive } from '../../responsive';
import { SectionHeading } from '../../SectionHeading';
import { motion, useReducedMotion, Reveal, TiltCard, EASE_OUT_SOFT } from '../../Motion';
import { Orbit } from '../../MotionFx';
import { issuerShort, shortAward } from './credentials';
import { useViewportWidth } from './useViewport';

const Badge = ({ tag, label, strong }: { tag: string; label: string; strong?: boolean }) => (
  <span
    className={`flex max-w-[9rem] flex-col items-center rounded-[14px] border px-3 py-2 text-center shadow-[0_14px_30px_-20px_rgba(31,32,48,0.55)] backdrop-blur-sm ${
      strong ? 'border-[#5DBA47]/50 bg-white' : 'border-[#D7DEEA] bg-white/95'
    }`}
  >
    <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#46699F]">{tag}</span>
    <span className="mt-0.5 text-[12.5px] font-semibold leading-snug text-[#2E2F3D]">{label}</span>
  </span>
);

const Portrait = ({ width }: { width?: number }) => (
  <figure
    className="overflow-hidden rounded-[22px] border border-white shadow-[0_40px_80px_-34px_rgba(31,32,48,0.6)]"
    style={width ? { width } : undefined}
  >
    <img
      src={PORTRAIT}
      alt={PORTRAIT_ALT}
      width={PORTRAIT_W}
      height={PORTRAIT_H}
      loading="lazy"
      {...responsive(PORTRAIT, 'tile')}
      className="aspect-[4/5] w-full object-cover"
    />
  </figure>
);

export const TeamPractitioner = () => {
  const reduce = useReducedMotion();
  const vw = useViewportWidth();
  const radius = vw >= 1280 ? 226 : vw >= 1024 ? 182 : 214;
  const portraitW = Math.round(radius * 0.96);

  const badges = CREDENTIALS.map((c) => ({
    tag: issuerShort(c.issuer),
    label: shortAward(c.award),
    strong: c.featured,
  }));

  return (
    <section className="relative overflow-hidden bg-white py-16 sm:py-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-1/3 h-[30rem] w-[30rem] rounded-full bg-[radial-gradient(closest-side,rgba(230,239,255,0.95),transparent)]"
      />
      <div className="relative mx-auto grid max-w-[1280px] grid-cols-1 items-center gap-16 px-4 sm:px-6 lg:grid-cols-12 lg:gap-16 lg:px-8">
        {/* COPY ---------------------------------------------------------- */}
        <div className="lg:col-span-6">
          <SectionHeading eyebrow={PRACTITIONER.role} title={PRACTITIONER.name} size="lg" />

          <Reveal delay={0.12}>
            <p className="mt-8 max-w-[58ch] text-[17px] leading-[1.78] text-[#4B5468] sm:text-[18px]">
              {PRACTITIONER.bio}
            </p>
          </Reveal>

          {/* His own words, verbatim from the live site. The rule down its
              left edge draws itself when it arrives. */}
          <Reveal delay={0.2} dir="none">
            <blockquote className="relative mt-10 pl-7">
              <motion.span
                aria-hidden="true"
                className="absolute bottom-0 left-0 top-0 w-[3px] origin-top rounded-full bg-gradient-to-b from-[#5DBA47] to-[#46699F]"
                initial={reduce ? false : { scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true, margin: '0px 0px 5% 0px' }}
                transition={{ duration: 0.65, delay: 0.25, ease: EASE_OUT_SOFT }}
              />
              <p className="font-heading text-[1.35rem] leading-[1.5] text-[#2E2F3D] sm:text-[1.6rem]">
                &ldquo;{REAL_COPY.about.training}&rdquo;
              </p>
              <footer className="mt-3 text-[13px] text-[#4B5468]">
                Jason Meissner, in his own words on pasadenahypnosis.com
              </footer>
            </blockquote>
          </Reveal>
        </div>

        {/* ORBIT (640px and up) ------------------------------------------ */}
        <div className="hidden justify-center lg:col-span-6 lg:flex">
          <div className="relative" style={{ width: radius * 2, height: radius * 2 }}>
            {/* Track + glow. Decorative. */}
            <svg aria-hidden="true" viewBox="0 0 100 100" className="absolute inset-0 h-full w-full text-[#46699F]">
              <circle cx="50" cy="50" r="49.5" fill="none" stroke="currentColor" strokeOpacity="0.22" strokeWidth="1" vectorEffect="non-scaling-stroke" />
              <circle cx="50" cy="50" r="38" fill="none" stroke="currentColor" strokeOpacity="0.1" strokeWidth="1" vectorEffect="non-scaling-stroke" />
            </svg>
            <div
              aria-hidden="true"
              className="absolute inset-[14%] rounded-full bg-[radial-gradient(closest-side,rgba(169,196,238,0.55),transparent)] blur-2xl"
            />
            <Orbit
              radius={radius}
              duration={72}
              items={badges.map((b) => (
                <Badge key={b.label} {...b} />
              ))}
            >
              <TiltCard max={9} className="relative z-10">
                <Portrait width={portraitW} />
              </TiltCard>
            </Orbit>
          </div>
        </div>

        {/* PHONES: the same labels, in a row. No second portrait here — on a
            phone the hero's portrait is the screen directly above, and the
            same face twice in a row read as a layout error. */}
        <div className="lg:hidden">
          <ul className="flex flex-wrap justify-center gap-2.5 sm:justify-start">
            {badges.map((b) => (
              <li key={b.label}>
                <Badge {...b} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
