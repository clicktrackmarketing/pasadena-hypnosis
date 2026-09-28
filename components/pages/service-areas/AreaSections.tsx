'use client';

/* ---------------------------------------------------------------------------
   /service-areas/[slug] — the animated sections under the hero. One template,
   five cities; every fact in it is shared (NAP, hours, the service catalogue,
   the scope note) rather than per-city copy invented to fill a page.

     AreaServices  the city's photograph opens from an inset card to its full
                   frame as it scrolls to centre (ZoomFrame); the service cards
                   below focus in from a blur (PopItem)
     VisitBand     the practical block — the real office, address, hours —
                   grows from a rounded card to full width (RiseIn)
     AlsoServing   the other four cities as an index; rules draw across as
                   they arrive and labels roll on hover

   THE PHOTOGRAPH IS NEVER CAPTIONED. Pasadena, Glendale and Arcadia have
   photographs their photographers described as those places; Eagle Rock has
   a Los Angeles street and South Pasadena the foothill range. So the frame
   carries its alt text and nothing laid over it names a place — the heading
   beside it is about the services, not the picture.

   FRAME SHAPE follows the file (see imageRatio): a portrait sits beside the
   heading, a landscape or panorama runs full width beneath it.
--------------------------------------------------------------------------- */

import Link from 'next/link';
import { SERVICE_AREAS, SERVICES, NAP, HOURS, PRACTITIONER } from '../../content';
import { areaImage } from '../../unsplash';
import { OFFICE_INTERIOR, OFFICE_INTERIOR_ALT } from '../../assets';
import { ArrowRightIcon, ClockIcon, MapPinIcon, ShieldCheckIcon } from '../../Icons';
import { Rings } from '../../Spiral';
import { responsive } from '../../responsive';
import { ServiceCard } from '../../ServiceCard';
import { motion, useReducedMotion, Reveal, SplitHeading, Stagger, ClipReveal, EASE_OUT_SOFT } from '../../Motion';
import { ZoomFrame, PopItem, RiseIn, RollText } from '../../MotionFx';
import { areaSlug, imageRatio } from './areas';

/* ----------------------------------------------------------- Services -- */

export const AreaServices = ({ slug, city }: { slug: string; city: string }) => {
  const img = areaImage(slug);
  const ratio = imageRatio(img.src);
  const portrait = ratio < 1;
  const featured = SERVICES.slice(0, 6);

  const heading = (
    <>
      <Reveal>
        <p className="mb-4 inline-flex items-center gap-3 font-body text-xs font-semibold uppercase tracking-[0.2em] text-[#46699F] sm:text-[13px]">
          <span className="inline-block h-px w-8 bg-[#46699F]/60" aria-hidden="true" />
          What {city} clients book
        </p>
      </Reveal>
      <SplitHeading
        text="The work this practice is known for"
        className="max-w-[16ch] font-heading text-[2.2rem] sm:text-[2.9rem] lg:text-[3.3rem] leading-[1.08] tracking-[-0.018em] text-[#2E2F3D]"
      />
    </>
  );

  const frame = (
    <div className="relative w-full" style={{ aspectRatio: String(ratio) }}>
      <ZoomFrame
        src={img.src}
        alt={img.alt}
        from={11}
        imgProps={responsive(img.src, portrait ? 'half' : 'full')}
        className="h-full w-full rounded-[26px]"
      />
    </div>
  );

  return (
    <section className="relative overflow-hidden bg-[#E6EFFF] py-16 sm:py-28">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        {portrait ? (
          <div className="grid grid-cols-1 items-end gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7 lg:pb-10">{heading}</div>
            <div className="mx-auto w-full max-w-[420px] lg:col-span-5 lg:max-w-none">{frame}</div>
          </div>
        ) : (
          <>
            {heading}
            <div className="mt-10 sm:mt-14">{frame}</div>
          </>
        )}

        <Stagger className="mt-14 grid auto-rows-fr grid-cols-2 gap-3 sm:mt-16 sm:gap-6 lg:grid-cols-3" gap={0.08}>
          {featured.map((s) => (
            <PopItem key={s.slug} className="h-full">
              <ServiceCard service={s} variant="brief" />
            </PopItem>
          ))}
        </Stagger>

        <Reveal delay={0.1}>
          <Link
            href="/services"
            className="group ph-tap mt-10 inline-flex items-center gap-2.5 rounded-[14px] border border-[#2E2F3D]/20 bg-white px-6 py-3.5 text-[15px] font-semibold text-[#2E2F3D] transition-colors duration-300 hover:border-[#2E2F3D] hover:bg-[#2E2F3D] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#454659] focus-visible:ring-offset-2 focus-visible:ring-offset-[#E6EFFF]"
          >
            <RollText>All {SERVICES.length} services</RollText>
            <ArrowRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
};

/* -------------------------------------------------------------- Visit -- */

export const VisitBand = ({ city }: { city: string }) => (
  /* The ground behind the band shows at its edges while it is still a
     rounded card, so it runs from the section above into the one below. */
  <div className="bg-gradient-to-b from-[#E6EFFF] to-white">
    <RiseIn className="relative isolate bg-[#2E2F3D] ph-grain">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 top-[-20%] h-[36rem] w-[36rem] rounded-full bg-[radial-gradient(closest-side,rgba(70,105,159,0.4),transparent)] blur-2xl" />
        <Rings className="absolute -bottom-48 -right-40 h-[34rem] w-[34rem] text-[#A9C4EE]/10 ph-spin-slow" count={8} />
      </div>

      <div className="relative mx-auto grid max-w-[1280px] grid-cols-1 items-center gap-12 px-4 py-16 sm:px-6 sm:py-28 lg:grid-cols-12 lg:gap-16 lg:px-8">
        <div className="lg:col-span-5">
          {/* The practice's own consulting room, at its native portrait
              ratio — cropping it to a banner would lose the shelf or the
              sofa, which are what make it read as a real room. */}
          <ClipReveal
            src={OFFICE_INTERIOR}
            alt={OFFICE_INTERIOR_ALT}
            from="bottom"
            className="mx-auto max-w-[420px] overflow-hidden rounded-[24px] border border-white/10 shadow-[0_40px_90px_-40px_rgba(0,0,0,0.85)] lg:mx-0"
            imgClassName="aspect-[760/1131] w-full object-cover"
          />
        </div>

        <div className="lg:col-span-7">
          <SplitHeading
            text={`Where ${city} clients come`}
            className="max-w-[16ch] font-heading text-[2.2rem] sm:text-[2.9rem] lg:text-[3.3rem] leading-[1.08] tracking-[-0.018em] text-white"
          />

          <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-10">
            <Reveal delay={0.1}>
              <p className="mb-3 inline-flex items-center gap-2 text-[11.5px] font-bold uppercase tracking-[0.16em] text-[#A9C4EE]">
                <MapPinIcon className="h-4 w-4" />
                {NAP.name}
              </p>
              <address className="not-italic font-heading text-[1.45rem] leading-[1.35] text-white sm:text-[1.6rem]">
                {NAP.street}
                <br />
                {NAP.city}, {NAP.state} {NAP.zip}
              </address>
              <a
                href={NAP.directions}
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-6 inline-flex items-center gap-2.5 rounded-[14px] bg-white px-5 py-3 text-[14.5px] font-semibold text-[#2E2F3D] transition-colors duration-300 hover:bg-[#E6EFFF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A9C4EE] focus-visible:ring-offset-2 focus-visible:ring-offset-[#2E2F3D]"
              >
                <RollText>Get directions</RollText>
                <ArrowRightIcon className="h-3.5 w-3.5 -rotate-45 transition-transform duration-300 group-hover:rotate-0" />
              </a>
            </Reveal>

            <Reveal delay={0.18}>
              <p className="mb-3 inline-flex items-center gap-2 text-[11.5px] font-bold uppercase tracking-[0.16em] text-[#A9C4EE]">
                <ClockIcon className="h-4 w-4" />
                Hours
              </p>
              <dl>
                {HOURS.map((h) => (
                  <div key={h.days} className="flex items-baseline justify-between gap-5 border-b border-white/10 py-2.5 last:border-0">
                    <dt className="text-[14.5px] text-[#D9E1F0]">{h.days}</dt>
                    <dd className="text-[14.5px] font-semibold tabular-nums text-white">{h.time}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>

          <Reveal delay={0.24}>
            <div className="mt-10 flex items-start gap-3.5 rounded-[18px] border border-white/12 bg-white/[0.05] p-5 backdrop-blur-sm sm:p-6">
              <ShieldCheckIcon className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#A9C4EE]" />
              <p className="text-[14px] leading-[1.7] text-[#D9E1F0]">{PRACTITIONER.scopeNote}</p>
            </div>
          </Reveal>
        </div>
      </div>
    </RiseIn>
  </div>
);

/* ------------------------------------------------------- Also serving -- */

const IndexRow = ({ a, i }: { a: string; i: number }) => {
  const reduce = useReducedMotion();
  return (
    <li className="relative">
      <Link
        href={`/service-areas/${areaSlug(a)}`}
        className="group relative isolate flex items-center justify-between gap-5 py-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#454659] sm:py-8"
      >
        {/* Hover wash rises from the rule. */}
        <span
          aria-hidden="true"
          className="absolute inset-0 -z-10 origin-bottom scale-y-0 rounded-[6px] bg-[#E6EFFF] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-y-100 motion-reduce:transition-none"
        />
        <span className="flex min-w-0 items-baseline gap-4 pl-1 sm:gap-8 sm:pl-3">
          <span aria-hidden="true" className="text-[12px] font-semibold tabular-nums tracking-[0.14em] text-[#46699F]">
            {String(i + 1).padStart(2, '0')}
          </span>
          <span className="min-w-0 font-heading text-[1.8rem] leading-[1.12] tracking-[-0.015em] text-[#2E2F3D] sm:text-[2.8rem] lg:text-[3.6rem]">
            <RollText>{a.replace(', CA', '')}</RollText>
          </span>
        </span>
        <span
          aria-hidden="true"
          className="mr-1 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full border border-[#2E2F3D]/15 text-[#2E2F3D] transition-colors duration-300 group-hover:border-[#2E2F3D] group-hover:bg-[#2E2F3D] group-hover:text-white sm:mr-3 sm:h-14 sm:w-14"
        >
          <ArrowRightIcon className="h-4 w-4 -rotate-45 transition-transform duration-500 group-hover:rotate-0" />
        </span>
      </Link>
      {/* The rule under each row draws across as the row arrives. */}
      <motion.span
        aria-hidden="true"
        className="absolute bottom-0 left-0 block h-px w-full origin-left bg-[#2E2F3D]/15"
        initial={reduce ? false : { scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: '0px 0px -8% 0px' }}
        transition={{ duration: 1.2, delay: i * 0.08, ease: EASE_OUT_SOFT }}
      />
    </li>
  );
};

export const AlsoServing = ({ slug }: { slug: string }) => {
  const others = SERVICE_AREAS.filter((a) => areaSlug(a) !== slug);
  return (
    <section className="relative overflow-hidden bg-white py-16 sm:py-28">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <Reveal>
          <p className="mb-6 inline-flex items-center gap-3 text-[12.5px] font-semibold uppercase tracking-[0.18em] text-[#46699F]">
            <span className="inline-block h-px w-8 bg-[#46699F]/60" aria-hidden="true" />
            Also serving
          </p>
        </Reveal>
        <ul className="border-t border-[#2E2F3D]/12">
          {others.map((a, i) => (
            <IndexRow key={a} a={a} i={i} />
          ))}
        </ul>
      </div>
    </section>
  );
};
