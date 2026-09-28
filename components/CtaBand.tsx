'use client';

/* ---------------------------------------------------------------------------
   CTA BAND — the closing block on every inner page.

   Six pages each carried their own near-identical copy of this: a dark
   #454659 strip, a heading, a white "Book a Free Discovery Call" button and a
   phone link. They had already drifted — different paddings, two different
   button radii, and one of them had lost its focus ring. One component now.

   THE OFFER NEVER ESCALATES. Whatever heading a page passes, the actions are
   the same two: a free discovery call, or the phone number. No countdown, no
   "limited availability", no second-guess interstitial. The visitor this site
   is written for has often been sold to by a wellness practice already, and
   pressure here costs more than it earns.
--------------------------------------------------------------------------- */

import Link from 'next/link';
import type { ReactNode } from 'react';
import { NAP } from './content';
import { ArrowRightIcon, PhoneIcon } from './Icons';
import { Rings } from './Spiral';
import { Reveal, SplitHeading, Magnetic, CursorGlow, FloatY } from './Motion';

export const CtaBand = ({
  title,
  body,
  primaryHref = '/book',
  primaryLabel = 'Book a Free Discovery Call',
  secondary,
}: {
  title: string;
  body?: ReactNode;
  primaryHref?: string;
  primaryLabel?: string;
  /** Replaces the phone link when a page has a better second action. */
  secondary?: { href: string; label: string };
}) => (
  <section className="relative isolate overflow-hidden bg-[#454659] py-16 ph-grain sm:py-20">
    <CursorGlow />
    <FloatY amount={10} duration={8} className="pointer-events-none absolute -right-28 -top-28">
      <Rings className="h-[28rem] w-[28rem] text-white/10 ph-spin-slow" count={7} />
    </FloatY>
    <div className="relative mx-auto flex max-w-[1280px] flex-col items-start justify-between gap-8 px-4 sm:px-6 lg:flex-row lg:items-center lg:px-8">
      <div className="max-w-[46ch]">
        <SplitHeading
          text={title}
          className="font-heading text-[1.9rem] leading-[1.14] tracking-[-0.01em] text-white sm:text-[2.4rem]"
        />
        {body ? (
          <Reveal delay={0.15}>
            <p className="mt-4 text-[16px] leading-[1.7] text-white/85">{body}</p>
          </Reveal>
        ) : null}
      </div>

      <Reveal delay={0.2} dir="left">
        <div className="flex flex-wrap gap-3">
          <Magnetic>
            <Link
              href={primaryHref}
              className="group inline-flex items-center gap-2.5 rounded-[12px] bg-white px-7 py-4 text-[15px] font-semibold text-[#454659] shadow-[0_14px_36px_-16px_rgba(0,0,0,0.8)] transition-colors duration-300 hover:bg-[#E6EFFF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#454659] sm:text-base"
            >
              {primaryLabel}
              <ArrowRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </Magnetic>

          {secondary ? (
            <Link
              href={secondary.href}
              className="inline-flex items-center gap-2.5 rounded-[12px] border border-white/45 px-7 py-4 text-[15px] font-medium text-white transition-colors duration-300 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#454659] sm:text-base"
            >
              {secondary.label}
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
          ) : (
            <a
              href={NAP.phoneHref}
              className="inline-flex items-center gap-2.5 rounded-[12px] border border-white/45 px-7 py-4 text-[15px] font-medium text-white transition-colors duration-300 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#454659] sm:text-base"
            >
              <PhoneIcon className="h-4 w-4" />
              {NAP.phone}
            </a>
          )}
        </div>
      </Reveal>
    </div>
  </section>
);
