'use client';

/* ---------------------------------------------------------------------------
   /contact — the animated sections under the hero.

     ContactTiles  phone / email / address / hours as four large tiles that
                   flip up into place, carry a light under the cursor
                   (Spotlight) and lean toward it (Magnetic, capped at 6px so
                   the hit area never leaves where the eye saw it)
     OfficeBlock   the practice's real consulting room, uncovered by a panel
                   that sweeps across it (CurtainReveal); a route line draws
                   itself to a pin as the section scrolls (ScrollDraw)
     ContactForm   the shared BookingForm, untouched, with slow scroll-turned
                   rings in the ground around it — never on it

   COPY: every string is content.ts (NAP, HOURS, SERVICE_AREAS) or was already
   on this page. No suite number anywhere: it is unverified (see NAP).

   The stock "room" gallery strip that used to close this page was dropped:
   placed straight after the practice's real office photograph, a ticker of
   other people's rooms invites exactly the confusion unsplash.ts forbids.
--------------------------------------------------------------------------- */

import type { ComponentType, ReactNode, SVGProps } from 'react';
import { NAP, HOURS, SERVICE_AREAS } from '../../content';
import { OFFICE_INTERIOR, OFFICE_INTERIOR_ALT } from '../../assets';
import { ArrowRightIcon, ClockIcon, MailIcon, MapPinIcon, PhoneIcon } from '../../Icons';
import { Spiral, Rings } from '../../Spiral';
import { responsive } from '../../responsive';
import { BookingForm } from '../../BookingForm';
import { motion, useReducedMotion, Magnetic, Reveal, SplitHeading, Stagger, EASE_OUT_SOFT } from '../../Motion';
import { Spotlight, FlipItem, CurtainReveal, ScrollDraw, ScrollRotate, RollText } from '../../MotionFx';

/* -------------------------------------------------------------- Tiles -- */

type Tile = {
  label: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
  value?: ReactNode;
  note?: string;
  href?: string;
  external?: boolean;
  hours?: boolean;
};

/* The address splits after the @ so a narrow tile breaks it there rather
   than mid-word. The text itself is NAP.email, unchanged. */
const [emailUser, emailDomain] = NAP.email.split('@');

const TILES: Tile[] = [
  { label: 'Call', Icon: PhoneIcon, value: NAP.phone, href: NAP.phoneHref, note: 'Fastest route to a person' },
  {
    label: 'Email',
    Icon: MailIcon,
    value: (
      <>
        {emailUser}@<wbr />
        {emailDomain}
      </>
    ),
    href: `mailto:${NAP.email}`,
    note: 'For anything not urgent',
  },
  {
    label: 'Visit',
    Icon: MapPinIcon,
    value: `${NAP.street}, ${NAP.city}`,
    href: NAP.directions,
    note: 'Opens Google Maps',
    external: true,
  },
  { label: 'Hours', Icon: ClockIcon, hours: true },
];

const TileBody = ({ t }: { t: Tile }) => (
  <>
    {/* Oversized ghost of the tile's icon, bleeding off the corner. */}
    <t.Icon
      aria-hidden="true"
      strokeWidth={0.8}
      className="pointer-events-none absolute -right-8 -top-8 h-44 w-44 text-white/[0.045] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-rotate-6 group-hover:scale-110"
    />
    <span className="flex items-center justify-between">
      <span className="flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-white/[0.06] text-[#A9C4EE] transition-colors duration-300 group-hover:border-white group-hover:bg-white group-hover:text-[#2E2F3D]">
        <t.Icon className="h-5 w-5" aria-hidden="true" />
      </span>
      {t.href ? (
        <span
          aria-hidden="true"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/80 transition-colors duration-300 group-hover:border-white/40 group-hover:text-white"
        >
          <ArrowRightIcon className="h-4 w-4 -rotate-45 transition-transform duration-500 group-hover:rotate-0" />
        </span>
      ) : null}
    </span>

    <p className="mt-10 text-[11.5px] font-bold uppercase tracking-[0.18em] text-[#A9C4EE] sm:mt-14">{t.label}</p>

    {t.hours ? (
      <dl className="mt-3">
        {HOURS.map((h) => (
          <div key={h.days} className="flex items-baseline justify-between gap-5 border-b border-white/10 py-2 last:border-0">
            <dt className="text-[14.5px] text-[#D9E1F0]">{h.days}</dt>
            <dd className="font-heading text-[1.15rem] tabular-nums text-white">{h.time}</dd>
          </div>
        ))}
      </dl>
    ) : (
      <>
        <p className="mt-2 font-heading text-[1.5rem] leading-[1.2] text-white sm:text-[1.9rem] lg:text-[2.1rem]">{t.value}</p>
        {t.note ? <p className="mt-3 text-[14px] text-[#D9E1F0]">{t.note}</p> : null}
      </>
    )}
  </>
);

export const ContactTiles = () => (
  <section className="relative isolate overflow-hidden bg-[#2E2F3D] py-16 ph-grain sm:py-24">
    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      <div className="absolute left-1/2 top-0 h-[28rem] w-[70rem] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(70,105,159,0.3),transparent)] blur-2xl" />
    </div>

    <Stagger className="relative mx-auto grid max-w-[1280px] grid-cols-1 gap-5 px-4 sm:grid-cols-2 sm:gap-6 sm:px-6 lg:px-8" gap={0.1}>
      {TILES.map((t) => {
        const cls =
          'group relative flex h-full flex-col p-7 sm:p-9 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#A9C4EE] rounded-[26px]';
        return (
          <FlipItem key={t.label} className="h-full">
            <Magnetic className="h-full w-full align-top">
              <Spotlight className="h-full rounded-[26px] border border-white/10 bg-white/[0.035] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
                {t.href ? (
                  <a href={t.href} {...(t.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})} className={cls}>
                    <TileBody t={t} />
                  </a>
                ) : (
                  <div className={cls}>
                    <TileBody t={t} />
                  </div>
                )}
              </Spotlight>
            </Magnetic>
          </FlipItem>
        );
      })}
    </Stagger>
  </section>
);

/* ------------------------------------------------------------- Office -- */

/* The route, in a 520x96 box. The pin sits on its last point. */
const ROUTE = 'M6 62 C 70 12, 124 84, 196 46 S 306 8, 364 50 S 452 90, 504 38';
const PIN_X = 504 / 520;
const PIN_Y = 38 / 96;

export const OfficeBlock = () => {
  const reduce = useReducedMotion();
  return (
    <section className="relative overflow-hidden bg-white py-16 sm:py-28">
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:gap-20 lg:px-8">
        <div className="lg:col-span-5">
          {/* The practice's own room, at its native portrait ratio. */}
          <CurtainReveal
            color="#2E2F3D"
            className="mx-auto max-w-[440px] rounded-[26px] shadow-[0_40px_90px_-44px_rgba(46,47,61,0.7)] lg:mx-0"
          >
            <img
              src={OFFICE_INTERIOR}
              alt={OFFICE_INTERIOR_ALT}
              loading="lazy"
              {...responsive(OFFICE_INTERIOR, 'half')}
              className="aspect-[760/1131] w-full object-cover"
            />
          </CurtainReveal>
        </div>

        <div className="lg:col-span-7">
          <SplitHeading
            text="The office"
            className="font-heading text-[2.2rem] sm:text-[2.9rem] lg:text-[3.3rem] leading-[1.08] tracking-[-0.018em] text-[#2E2F3D]"
          />

          {/* ROUTE — draws itself with the scroll and ends on a pin. */}
          <div className="relative mt-8 h-16 max-w-[520px] sm:h-24" aria-hidden="true">
            <ScrollDraw
              d={ROUTE}
              viewBox="0 0 520 96"
              className="absolute inset-0 h-full w-full text-[#46699F]"
              strokeWidth={2.2}
              gradient={['#46699F', '#5DBA47']}
              offset={['start 92%', 'end 50%']}
            />
            <motion.span
              className="absolute flex h-9 w-9 items-center justify-center rounded-full bg-[#2E2F3D] text-white shadow-[0_10px_24px_-8px_rgba(46,47,61,0.7)]"
              style={{ left: `calc(${PIN_X * 100}% - 18px)`, top: `calc(${PIN_Y * 100}% - 18px)` }}
              initial={reduce ? false : { scale: 0, y: -14 }}
              whileInView={{ scale: 1, y: 0 }}
              viewport={{ once: true, margin: '0px 0px 5% 0px' }}
              transition={{ duration: 0.7, delay: 0.5, ease: EASE_OUT_SOFT }}
            >
              <MapPinIcon className="h-4 w-4" />
            </motion.span>
          </div>

          <Reveal delay={0.1}>
            <address className="mt-6 not-italic">
              <span className="block font-heading text-[1.7rem] leading-[1.25] text-[#2E2F3D] sm:text-[2.2rem]">{NAP.street}</span>
              <span className="block font-heading text-[1.7rem] leading-[1.25] text-[#4B5468] sm:text-[2.2rem]">
                {NAP.city}, {NAP.state} {NAP.zip}
              </span>
            </address>
          </Reveal>

          <Reveal delay={0.18}>
            <a
              href={NAP.directions}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-8 inline-flex items-center gap-2.5 rounded-[14px] bg-[#454659] px-6 py-3.5 text-[15px] font-semibold text-white shadow-[0_14px_34px_-18px_rgba(46,47,61,0.8)] transition-colors duration-300 hover:bg-[#33344A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#454659] focus-visible:ring-offset-2"
            >
              <RollText>Get directions</RollText>
              <ArrowRightIcon className="h-4 w-4 -rotate-45 transition-transform duration-300 group-hover:rotate-0" />
            </a>
          </Reveal>

          {/* No suite number anywhere on this page: it is unverified.
              See the NAP note in content.ts. */}
          <Reveal delay={0.24}>
            <p className="mt-10 max-w-[56ch] border-t border-[#D7DEEA] pt-6 text-[15px] leading-[1.72] text-[#4B5468]">
              Several other practitioners work out of the same building. Sessions also run by video anywhere in
              California, including for clients in {SERVICE_AREAS.slice(0, 3).map((a) => a.split(',')[0]).join(', ')} and
              beyond.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

/* --------------------------------------------------------------- Form -- */

export const ContactForm = () => (
  <section className="relative isolate overflow-hidden bg-[#E6EFFF] py-16 sm:py-28">
    {/* The rings turn with the page scroll. They live in the ground, never
        in the form — nothing near a field moves while someone types. */}
    <ScrollRotate
      degrees={140}
      className="pointer-events-none absolute -left-48 -top-24 h-[34rem] w-[34rem] text-[#46699F]/[0.1] sm:-left-32"
    >
      <Spiral className="h-full w-full" strokeWidth={0.8} />
    </ScrollRotate>
    <ScrollRotate
      degrees={-110}
      className="pointer-events-none absolute -bottom-48 -right-48 h-[32rem] w-[32rem] text-[#46699F]/[0.1]"
    >
      <Rings className="h-full w-full" count={7} />
    </ScrollRotate>

    <div className="relative mx-auto max-w-[760px] px-4 sm:px-6">
      <Reveal>
        <BookingForm />
      </Reveal>
    </div>
  </section>
);
