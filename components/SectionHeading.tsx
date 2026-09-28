'use client';

/* ---------------------------------------------------------------------------
   SECTION HEADING — the one place the page's section header is defined.

   WHY THIS EXISTS. Every band on the homepage opened with the same three
   things: an uppercase eyebrow, a serif display line, and sometimes a lede.
   Each was written inline, and they had drifted — four different eyebrow
   letter-spacings, three heading sizes, margins between 8 and 12. None of it
   was visible on its own; all of it was visible as a page, as a faint sense
   that nothing lined up. One component, one scale.

   THE RULE FOR ANYTHING USING IT: pass the words, not the styling. If a
   section needs a different size, add a `size` here rather than overriding
   the class at the call site, or the drift starts again.
--------------------------------------------------------------------------- */

import type { ReactNode } from 'react';
import { Reveal, SplitHeading } from './Motion';

export const SectionHeading = ({
  eyebrow,
  title,
  lede,
  align = 'left',
  tone = 'dark',
  size = 'md',
  className,
  aside,
}: {
  eyebrow: string;
  title: string;
  lede?: ReactNode;
  align?: 'left' | 'center';
  /** "dark" = ink on a light ground · "light" = white on a dark ground */
  tone?: 'dark' | 'light';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  /** Right-hand element on the same baseline — a "view all" link, a count. */
  aside?: ReactNode;
}) => {
  const titleSize =
    size === 'sm'
      ? 'text-[1.8rem] sm:text-[2.3rem]'
      : size === 'lg'
        ? 'text-[2.4rem] sm:text-[3.2rem] lg:text-[3.6rem]'
        : 'text-[2.2rem] sm:text-[2.9rem] lg:text-[3.3rem]';

  const eyebrowTone = tone === 'light' ? 'text-[#A9C4EE]' : 'text-[#46699F]';
  const titleTone = tone === 'light' ? 'text-white' : 'text-[#2E2F3D]';
  const ledeTone = tone === 'light' ? 'text-[#D9E1F0]' : 'text-[#4B5468]';

  const block = (
    <div className={align === 'center' ? 'mx-auto max-w-[48rem] text-center' : 'max-w-[44rem]'}>
      <Reveal>
        <p className={`mb-4 font-body text-[11.5px] font-bold uppercase tracking-[0.2em] ${eyebrowTone} sm:text-xs`}>
          {eyebrow}
        </p>
      </Reveal>
      <SplitHeading
        text={title}
        className={`font-heading leading-[1.08] tracking-[-0.018em] ${titleSize} ${titleTone}`}
      />
      {lede ? (
        <Reveal delay={0.15}>
          <div className={`mt-5 text-[16px] leading-[1.72] sm:text-[17px] ${ledeTone} ${align === 'center' ? 'mx-auto max-w-[56ch]' : 'max-w-[56ch]'}`}>{lede}</div>
        </Reveal>
      ) : null}
    </div>
  );

  if (!aside) return <div className={className}>{block}</div>;

  return (
    <div className={`flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between ${className ?? ''}`}>
      {block}
      <Reveal delay={0.2} dir="left">
        <div className="flex-shrink-0">{aside}</div>
      </Reveal>
    </div>
  );
};
