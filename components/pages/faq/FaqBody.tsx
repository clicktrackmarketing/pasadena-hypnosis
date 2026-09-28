'use client';

/* ---------------------------------------------------------------------------
   FAQ — THE LIST, with a pinned side column (redesigned 2026-09-28).

   SIGNATURE MOTION FOR THIS SECTION: a sticky column beside the accordion.
   It holds a settled particle orb (the calm the hero's storm turns into when
   hovered — this page's one extra 3D figure) with the question count ticking
   up over it, a hairline that fills as the reader moves down the list, and a
   contact card that stays in reach the whole way.

   THE ACCORDION IS USED EXACTLY AS BEFORE: FAQS in, initialOpenIndex={null},
   autoOpenOnScroll on. Its scroll-spy rule measures each item's top against
   a line 38% down the viewport and is self-stabilising (see the long note in
   FaqAccordion.tsx); nothing in this wrapper transforms the list while it is
   being read, so the rule sees the same geometry it always did.

   Every string in the side column is already on this page: "questions
   answered", the phone number, "Email a question", "Book a Free Discovery
   Call", and the hero lede's own last sentence.
--------------------------------------------------------------------------- */

import Link from 'next/link';
import { useRef } from 'react';
import { FAQS, NAP } from '../../content';
import { FaqAccordion } from '../../FaqAccordion';
import { ArrowRightIcon, MailIcon, PhoneIcon } from '../../Icons';
import { MindScene } from '../../scene/MindScene';
import { Counter, Reveal, SectionProgressBar, useScroll } from '../../Motion';
import { RollText, Spotlight } from '../../MotionFx';

export const FaqBody = () => {
  const listRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ['start 40%', 'end 70%'] });

  return (
    <section className="relative bg-white py-16 sm:py-24">
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:gap-14 lg:px-8">
        {/* SIDE COLUMN ------------------------------------------------------ */}
        <aside className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <Reveal>
              <div className="relative flex items-center gap-5 lg:block">
                <div aria-hidden="true" className="relative h-28 w-28 flex-shrink-0 sm:h-32 sm:w-32 lg:h-72 lg:w-full">
                  <div className="absolute inset-[12%] rounded-full bg-[radial-gradient(closest-side,rgba(169,196,238,0.55),rgba(230,239,255,0.25)_60%,transparent)]" />
                  <MindScene shape="orb" tone="light" intro={false} intensity={0.75} className="absolute inset-0" />
                </div>
                <p className="flex flex-col lg:pointer-events-none lg:absolute lg:inset-x-0 lg:top-0 lg:h-72 lg:items-center lg:justify-center lg:text-center">
                  <span className="sr-only">{FAQS.length}</span>
                  <span aria-hidden="true">
                    <Counter
                      to={FAQS.length}
                      duration={1.2}
                      className="font-heading text-[2.8rem] leading-none text-[#2E2F3D] lg:text-[4.6rem]"
                    />
                  </span>
                  <span className="mt-2 text-[12.5px] font-semibold uppercase tracking-[0.14em] text-[#46699F]">
                    questions answered
                  </span>
                </p>
              </div>
            </Reveal>

            <div className="mt-6 hidden text-[#46699F] lg:block">
              <SectionProgressBar progress={scrollYProgress} />
            </div>

            <Reveal delay={0.12} className="hidden lg:block">
              <Spotlight className="mt-8 rounded-[22px] bg-[#2E2F3D] p-7 shadow-[0_30px_70px_-40px_rgba(31,32,48,0.8)]">
                <p className="font-heading text-[1.35rem] leading-[1.35] text-white">
                  For anything not covered here, call the office.
                </p>
                <div className="mt-6 flex flex-col gap-3">
                  <a
                    href={NAP.phoneHref}
                    className="group inline-flex items-center justify-center gap-2.5 rounded-[12px] bg-white px-5 py-3.5 text-[15px] font-semibold text-[#2E2F3D] transition-colors duration-300 hover:bg-[#E6EFFF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A9C4EE] focus-visible:ring-offset-2 focus-visible:ring-offset-[#2E2F3D]"
                  >
                    <PhoneIcon className="h-4 w-4" />
                    <RollText>{NAP.phone}</RollText>
                  </a>
                  <a
                    href={`mailto:${NAP.email}`}
                    className="group inline-flex items-center justify-center gap-2.5 rounded-[12px] border border-white/30 px-5 py-3.5 text-[15px] font-medium text-white transition-colors duration-300 hover:border-white hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A9C4EE] focus-visible:ring-offset-2 focus-visible:ring-offset-[#2E2F3D]"
                  >
                    <MailIcon className="h-4 w-4" />
                    <RollText>Email a question</RollText>
                  </a>
                  <Link
                    href="/book"
                    className="group mt-2 inline-flex items-center justify-center gap-2 text-[14px] font-semibold text-[#A9C4EE] transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A9C4EE] focus-visible:ring-offset-2 focus-visible:ring-offset-[#2E2F3D]"
                  >
                    Book a Free Discovery Call
                    <ArrowRightIcon className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </div>
              </Spotlight>
            </Reveal>
          </div>
        </aside>

        {/* THE LIST --------------------------------------------------------- */}
        <div ref={listRef} className="lg:col-span-8">
          {/* initialOpenIndex={null} rather than 0: on a page that is nothing
              but the list, opening the first answer for the visitor pushes
              everything below it down before they have chosen anything. */}
          <Reveal delay={0.08}>
            <FaqAccordion items={FAQS} initialOpenIndex={null} autoOpenOnScroll />
          </Reveal>
        </div>
      </div>
    </section>
  );
};
