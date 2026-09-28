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

   MOTION (2026-09-28): the band's top edge is a slow travelling wave in its
   own colour, the spiral turns with page scroll rather than on a timer, a
   soft light drifts behind the heading, and the primary button carries the
   travelling border light that marks "the" action on a page. No WebGL here —
   the page's hero already has the figure, and every inner page ends with
   this band, so it stays cheap.
--------------------------------------------------------------------------- */

import Link from 'next/link';
import type { ReactNode } from 'react';
import { NAP } from './content';
import { ArrowRightIcon, PhoneIcon } from './Icons';
import { Spiral } from './Spiral';
import { Reveal, SplitHeading, Magnetic, CursorGlow } from './Motion';
import { RollText, ScrollRotate, WaveSeam } from './MotionFx';

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
  <section className="relative isolate bg-[#1F2030] ph-grain">
    <WaveSeam color="#1F2030" className="absolute bottom-full left-0" />
    <div className="relative overflow-hidden py-20 sm:py-28">
      <CursorGlow />
      <div
        aria-hidden="true"
        className="ph-bob pointer-events-none absolute left-[8%] top-[-30%] h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(closest-side,rgba(70,105,159,0.45),transparent)] blur-2xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[-40%] right-[12%] h-[26rem] w-[26rem] rounded-full bg-[radial-gradient(closest-side,rgba(93,186,71,0.16),transparent)] blur-2xl"
      />
      <ScrollRotate degrees={220} className="pointer-events-none absolute -right-40 top-1/2 -translate-y-1/2">
        <Spiral className="h-[40rem] w-[40rem] text-white/[0.08]" strokeWidth={0.6} />
      </ScrollRotate>

      <div className="relative mx-auto flex max-w-[1280px] flex-col items-start justify-between gap-10 px-4 sm:px-6 lg:flex-row lg:items-center lg:px-8">
        <div className="max-w-[48ch]">
          <Reveal>
            <p className="mb-4 inline-flex items-center gap-3 text-[11.5px] font-bold uppercase tracking-[0.2em] text-[#A9C4EE]">
              <span className="inline-block h-px w-8 bg-[#A9C4EE]/70" aria-hidden="true" />
              Free discovery call
            </p>
          </Reveal>
          <SplitHeading
            text={title}
            className="font-heading text-[2.1rem] leading-[1.1] tracking-[-0.015em] text-white sm:text-[2.9rem]"
          />
          {body ? (
            <Reveal delay={0.15}>
              <p className="mt-5 text-[16px] leading-[1.7] text-[#D9E1F0]">{body}</p>
            </Reveal>
          ) : null}
        </div>
        <Reveal delay={0.2} dir="left">
          <div className="flex flex-wrap gap-3">
            <Magnetic>
              <Link
                href={primaryHref}
                className="group ph-glow-border inline-flex items-center gap-2.5 rounded-[14px] bg-white px-7 py-4 text-[15px] font-semibold text-[#2E2F3D] shadow-[0_14px_36px_-16px_rgba(0,0,0,0.8)] transition-colors duration-300 hover:bg-[#E6EFFF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#1F2030] sm:text-base"
              >
                <RollText>{primaryLabel}</RollText>
                <ArrowRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Magnetic>
            {secondary ? (
              <Link
                href={secondary.href}
                className="group inline-flex items-center gap-2.5 rounded-[14px] border border-white/40 px-7 py-4 text-[15px] font-medium text-white transition-colors duration-300 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#1F2030] sm:text-base"
              >
                <RollText>{secondary.label}</RollText>
                <ArrowRightIcon className="h-4 w-4" />
              </Link>
            ) : (
              <a
                href={NAP.phoneHref}
                className="group inline-flex items-center gap-2.5 rounded-[14px] border border-white/40 px-7 py-4 text-[15px] font-medium text-white transition-colors duration-300 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#1F2030] sm:text-base"
              >
                <PhoneIcon className="h-4 w-4" />
                <RollText>{NAP.phone}</RollText>
              </a>
            )}
          </div>
        </Reveal>
      </div>
    </div>
  </section>
);
