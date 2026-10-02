'use client';

/* ---------------------------------------------------------------------------
   PRICING — THE THREE CARDS (redesigned 2026-09-28).

   SIGNATURE MOTION FOR THIS SECTION: the cards fold up out of the page in 3D
   (FlipItem inside a Stagger), each carries a soft light that follows the
   mouse (Spotlight), and the standard session — the most-booked service and
   the figure most visitors came here for — is the one card on the page with
   the travelling glow border. The numeric price counts up once, as it
   arrives.

   PRICES ARE NEVER TYPED HERE. The page passes each card the raw
   `price` field from content.ts and the `priceLabel()` string built from it.
   A positive number is animated by <Counter>, whose final string is
   `$${price}` — byte-identical to priceLabel(). A zero or null price renders
   the label itself ("Free" / "On your call"). Smoking cessation is $400
   since markup round one (#58, the client: "This is published at $400").
--------------------------------------------------------------------------- */

import Link from 'next/link';
import { ArrowRightIcon, CheckIcon } from '../../Icons';
import { Rings, Spiral } from '../../Spiral';
import { Counter, Stagger } from '../../Motion';
import { FlipItem, Spotlight, ScrollRotate } from '../../MotionFx';

export type PriceCard = {
  slug: string;
  name: string;
  tag: string | null;
  /** Raw content.ts field: 0 = free, null = unresolved. */
  price: number | null;
  /** priceLabel(service) — the only string form of the price. */
  label: string;
  qualifier: string;
  note: string;
  points: string[];
  /** The one card that gets the dark ground and the glow border. */
  featured: boolean;
};

const PriceFigure = ({ c }: { c: PriceCard }) => {
  const numeric = typeof c.price === 'number' && c.price > 0;
  const tone = c.featured ? 'text-white' : 'text-[#2E2F3D]';
  if (numeric) {
    /* The label is announced from an sr-only copy and the ticking figure is
       hidden: Counter's own aria-label sits on a generic <span>, which some
       screen readers skip — not a risk worth taking with a price. */
    return (
      <p className={`font-heading text-[clamp(3.2rem,5.4vw,4.6rem)] leading-none tracking-[-0.02em] tabular-nums ${tone}`}>
        <span className="sr-only">{c.label}</span>
        <span aria-hidden="true">
          <Counter to={c.price as number} prefix="$" duration={1.7} />
        </span>
      </p>
    );
  }
  return (
    <p className={`font-heading text-[clamp(2.4rem,3.8vw,3.2rem)] leading-[1.02] tracking-[-0.015em] ${tone}`}>
      {c.label}
    </p>
  );
};

const CardBody = ({ c }: { c: PriceCard }) => {
  const dark = c.featured;
  return (
    <Spotlight
      className={`flex h-full flex-col rounded-[25px] p-7 sm:p-9 ${
        dark
          ? 'bg-[#2E2F3D] shadow-[0_40px_90px_-40px_rgba(31,32,48,0.85)]'
          : 'border border-[#D7DEEA] bg-white shadow-[0_24px_60px_-40px_rgba(46,47,61,0.45)]'
      }`}
      color={dark ? 'rgba(169,196,238,0.20)' : 'rgba(70,105,159,0.13)'}
    >
      {dark ? (
        <Spiral
          className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 text-[#A9C4EE]/15 ph-spin-slow"
          strokeWidth={0.6}
        />
      ) : null}

      <div className="relative flex items-start justify-between gap-3">
        <h2
          className={`text-[11.5px] font-bold uppercase tracking-[0.16em] ${dark ? 'text-[#A9C4EE]' : 'text-[#46699F]'}`}
        >
          {c.name}
        </h2>
        {c.tag ? (
          <span
            className={`whitespace-nowrap rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.1em] ${
              dark ? 'bg-white/10 text-[#A9C4EE]' : 'bg-[#E6EFFF] text-[#46699F]'
            }`}
          >
            {c.tag}
          </span>
        ) : null}
      </div>

      <div className="relative mt-7">
        <PriceFigure c={c} />
        <p className={`mt-3 text-[14.5px] ${dark ? 'text-[#D9E1F0]' : 'text-[#4B5468]'}`}>{c.qualifier}</p>
      </div>

      <ul className={`relative mt-7 flex flex-col gap-3 border-t pt-7 ${dark ? 'border-white/15' : 'border-[#D7DEEA]'}`}>
        {c.points.map((p) => (
          <li key={p} className="flex items-start gap-3">
            <span
              aria-hidden="true"
              className={`mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full ${
                dark ? 'bg-[#5DBA47]/20 text-[#5DBA47]' : 'bg-[#E6EFFF] text-[#46699F]'
              }`}
            >
              <CheckIcon className="h-3 w-3" />
            </span>
            <span className={`text-[14.5px] leading-[1.55] ${dark ? 'text-[#D9E1F0]' : 'text-[#4B5468]'}`}>{p}</span>
          </li>
        ))}
      </ul>

      <p className={`relative mt-7 flex-1 text-[14.5px] leading-[1.65] ${dark ? 'text-[#D9E1F0]' : 'text-[#4B5468]'}`}>
        {c.note}
      </p>

      <Link
        href={`/services/${c.slug}`}
        className={`ph-tap group/link relative mt-8 inline-flex w-fit items-center gap-2 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
          dark
            ? 'text-white hover:text-[#A9C4EE] focus-visible:ring-[#A9C4EE] focus-visible:ring-offset-[#2E2F3D]'
            : 'text-[#46699F] hover:text-[#2E2F3D] focus-visible:ring-[#454659]'
        }`}
      >
        About this service
        <ArrowRightIcon className="h-3.5 w-3.5 transition-transform duration-300 group-hover/link:translate-x-1" />
      </Link>
    </Spotlight>
  );
};

export const PriceCards = ({ cards }: { cards: PriceCard[] }) => (
  <section className="relative isolate overflow-hidden bg-[#E6EFFF] py-16 sm:py-28">
    {/* Ground: concentric rings that turn with the scroll, and a soft light
        behind the featured card. Decorative. */}
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
      <ScrollRotate degrees={140} className="absolute -left-56 -top-40 h-[40rem] w-[40rem]">
        <Rings className="h-full w-full text-[#46699F]/15" count={9} />
      </ScrollRotate>
      <ScrollRotate degrees={-110} className="absolute -bottom-72 -right-56 h-[46rem] w-[46rem]">
        <Rings className="h-full w-full text-[#46699F]/10" count={7} />
      </ScrollRotate>
      <div className="absolute left-1/2 top-1/2 h-[36rem] w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(70,105,159,0.22),transparent)] blur-2xl" />
    </div>

    <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
      <Stagger className="grid grid-cols-1 items-stretch gap-6 md:grid-cols-3 md:gap-5 lg:gap-7" gap={0.16}>
        {cards.map((c) => (
          <FlipItem key={c.slug} className="h-full">
            <div
              className={`h-full transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-2 ${
                c.featured ? 'ph-glow-border rounded-[26px] p-px md:-mt-5 md:mb-5' : ''
              }`}
            >
              <CardBody c={c} />
            </div>
          </FlipItem>
        ))}
      </Stagger>
    </div>
  </section>
);
