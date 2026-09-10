'use client';

import { useState } from 'react';
import { ChevronDownIcon } from './Icons';

type Faq = { q: string; a: string };

type Props = {
  items: Faq[];
  itemClassName?: string;
  initialOpenIndex?: number | null;
};

/**
 * Shared accordion leaf for the homepage preview, the standalone /faq page,
 * and per-service FAQ blocks. Extracted so the surrounding page can stay a
 * Server Component — only this leaf needs 'use client'.
 */
export const FaqAccordion = ({ items, itemClassName, initialOpenIndex = 0 }: Props) => {
  const [openIndex, setOpenIndex] = useState<number | null>(initialOpenIndex);
  return (
    <div className="flex flex-col gap-3">
      {items.map((faq, i) => {
        const open = openIndex === i;
        return (
          <div key={faq.q} className={itemClassName ?? 'border border-[#D7DEEA] rounded-[12px] bg-[#E6EFFF]'}>
            <button
              type="button"
              aria-expanded={open}
              onClick={() => setOpenIndex(open ? null : i)}
              className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#454659] rounded-[12px]"
            >
              <span className="font-medium text-[#2E2F3D]">{faq.q}</span>
              <ChevronDownIcon
                className={`h-5 w-5 text-[#4B5468] flex-shrink-0 transition-transform ${open ? 'rotate-180' : ''}`}
              />
            </button>
            {open ? <p className="px-5 pb-5 text-sm text-[#4B5468] leading-relaxed">{faq.a}</p> : null}
          </div>
        );
      })}
    </div>
  );
};
