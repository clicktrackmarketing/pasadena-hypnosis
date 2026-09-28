'use client';

/* ---------------------------------------------------------------------------
   LEGAL — PLANNED SECTIONS, as a quiet reading line (added 2026-09-28).

   The legal pages are the one place on the site where motion is kept to a
   minimum on purpose: a visitor reading a privacy policy wants to read, not
   to be entertained. So the text itself does not move beyond a short, small
   entrance. The only scroll effect is a hairline running down through the
   section numbers that draws itself in step with the reader (ScrollDraw),
   with each number filling in once the line reaches it. Both are decorative
   and aria-hidden; the <ol> carries the order.
--------------------------------------------------------------------------- */

import { useRef, useState } from 'react';
import { useMotionValueEvent } from 'motion/react';
import { Reveal, Stagger, StaggerItem, useScroll } from '../../Motion';
import { ScrollDraw } from '../../MotionFx';

const OFFSET: [string, string] = ['start 75%', 'end 55%'];

export const LegalOutline = ({ sections }: { sections: string[] }) => {
  const listRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: OFFSET as unknown as ['start end', 'end start'],
  });
  const [reached, setReached] = useState(-1);
  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    const n = sections.length;
    const i = v <= 0 ? -1 : Math.min(n - 1, Math.floor(v * (n - 1) + 0.25));
    setReached((prev) => (prev === i ? prev : i));
  });

  return (
    <div>
      <Reveal delay={0.08}>
        <h2 className="mb-6 font-heading text-[1.5rem] text-[#2E2F3D] sm:text-[1.7rem]">Planned sections</h2>
      </Reveal>

      <div ref={listRef} className="relative">
        {/* The line runs from the first number's centre to the last's.
            Geometry is INLINE, not Tailwind: an SVG with a 2 x 100 viewBox
            and no applied width sizes itself to its container's width x 50,
            which made the page ~70,000px tall in a capture taken before the
            stylesheet had arrived. The wrapper pins it to 2px regardless. */}
        <div
          aria-hidden="true"
          className="pointer-events-none text-[#46699F]"
          style={{ position: 'absolute', top: 28, bottom: 28, left: 15, width: 2 }}
        >
          <ScrollDraw
            d="M1 0 L1 100"
            viewBox="0 0 2 100"
            strokeWidth={2}
            offset={OFFSET}
            className="block h-full w-full"
          />
        </div>
        <Stagger className="relative flex flex-col" as="ol" gap={0.07}>
          {sections.map((s, i) => {
            const on = i <= reached;
            return (
              <StaggerItem key={s} as="li" distance={12}>
                <div className="flex items-center gap-5">
                  <span
                    aria-hidden="true"
                    className={`relative z-10 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full font-heading text-[13px] ring-4 ring-white transition-colors duration-500 ${
                      on ? 'bg-[#46699F] text-white' : 'bg-[#E9F3EF] text-[#46699F]'
                    }`}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="flex-1 border-b border-[#D7DEEA] py-4 text-[16px] leading-6 font-medium text-[#2E2F3D] sm:text-[17px]">
                    {s}
                  </span>
                </div>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </div>
  );
};
