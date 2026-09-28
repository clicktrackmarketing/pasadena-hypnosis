'use client';

/* ---------------------------------------------------------------------------
   ABOUT — the tagline, over open water.

   Signature motion: ZOOM. The picture arrives as an inset, rounded card on
   the dark ground and opens to the full width of the screen as it reaches
   the middle of the viewport (ZoomFrame); the line on it focuses in once.

   THE PICTURE IS STOCK AND SAYS SO BY SAYING NOTHING: OPEN_WATER carries an
   empty alt in unsplash.ts and it is not captioned. The words over it are the
   practice's own site-wide tagline (REAL_COPY.tagline), which is about the
   work, not about the picture — so the image illustrates a mood and never
   stands in for the room, the practitioner or a client.

   CONTRAST: two scrims (a flat 58% #1F2030 plus a radial darkening behind the
   type) keep the white display line above 4.5:1 on the brightest part of
   the sky, which is well past the 3:1 it needs at this size.
--------------------------------------------------------------------------- */

import { REAL_COPY, BUSINESS } from '../../content';
import { OPEN_WATER } from '../../unsplash';
import { responsive } from '../../responsive';
import { motion, useReducedMotion, EASE_OUT_SOFT } from '../../Motion';
import { ZoomFrame } from '../../MotionFx';

export const AboutZoom = () => {
  const reduce = useReducedMotion();
  return (
    <section className="relative bg-[#1F2030] pt-16 sm:pt-24">
      <ZoomFrame
        src={OPEN_WATER.src}
        alt={OPEN_WATER.alt}
        imgProps={responsive(OPEN_WATER.src, 'full')}
        from={10}
        className="h-[76vh] min-h-[480px] w-full sm:h-[92vh] sm:min-h-[560px]"
      >
        <div aria-hidden="true" className="absolute inset-0 bg-[#1F2030]/58" />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(ellipse_60%_55%_at_50%_50%,rgba(31,32,48,0.6),transparent)]"
        />
        <div className="absolute inset-0 flex items-center justify-center px-8 sm:px-12">
          <motion.figure
            className="mx-auto w-full max-w-[1000px] text-center"
            initial={reduce ? false : { opacity: 0, scale: 0.94, filter: 'blur(14px)' }}
            whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: '0px 0px 5% 0px' }}
            transition={{ duration: 0.65, ease: EASE_OUT_SOFT }}
          >
            <blockquote className="mx-auto max-w-[17ch] font-heading text-[2.05rem] leading-[1.1] tracking-[-0.02em] text-white sm:text-[3.4rem] lg:text-[4.3rem]">
              &ldquo;{REAL_COPY.tagline}&rdquo;
            </blockquote>
            <figcaption className="mt-7 inline-flex items-center gap-3 text-[11.5px] font-semibold uppercase tracking-[0.22em] text-[#A9C4EE] sm:text-xs">
              <span aria-hidden="true" className="inline-block h-px w-8 bg-[#A9C4EE]/70" />
              {BUSINESS.name}
              <span aria-hidden="true" className="inline-block h-px w-8 bg-[#A9C4EE]/70" />
            </figcaption>
          </motion.figure>
        </div>
      </ZoomFrame>
    </section>
  );
};
