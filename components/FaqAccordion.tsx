'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ChevronDownIcon } from './Icons';

type Faq = { q: string; a: string };

type Props = {
  items: Faq[];
  itemClassName?: string;
  initialOpenIndex?: number | null;
  /** Open each answer as the reader scrolls it past the trigger line. */
  autoOpenOnScroll?: boolean;
};

/**
 * Shared accordion leaf for the homepage preview, the standalone /faq page,
 * and per-service FAQ blocks. Extracted so the surrounding page can stay a
 * Server Component — only this leaf needs 'use client'.
 *
 * ANIMATED 2026-09-16 with the homepage redesign. The previous version mounted
 * and unmounted the answer with a ternary, so panels snapped open and the page
 * below them jumped by the height of a paragraph. Height is animated from 0 to
 * "auto" here, which motion resolves by measuring the content.
 *
 * SCROLL-DRIVEN OPENING added 2026-09-17, behind `autoOpenOnScroll`.
 *
 * THE RULE, AND WHY IT IS THIS RULE AND NOT THE OBVIOUS ONE. The obvious
 * implementation picks whichever item is nearest the middle of the viewport.
 * It oscillates, badly: opening item 3 pushes items 4-10 down, which changes
 * what is nearest the middle, which closes 3 and opens 4, which pulls
 * everything back up, which re-selects 3. The panel flickers between two
 * items and the page fights the reader's scroll.
 *
 * What is used instead is a classic scroll-spy rule: THE ACTIVE ITEM IS THE
 * LAST ONE WHOSE TOP EDGE HAS PASSED ABOVE THE TRIGGER LINE. That rule is
 * self-stabilising in both directions, which is the whole point:
 *
 *   - Scrolling DOWN, item N+1 crosses the line and becomes active. Closing N
 *     pulls N+1 further UP — still above the line, so it stays active.
 *   - Scrolling UP, N+1 drops below the line and N becomes active. Opening N
 *     pushes N+1 further DOWN — still below the line, so it stays inactive.
 *
 * In both cases the height change caused by the switch moves the boundary
 * AWAY from the threshold rather than back across it. No feedback loop.
 *
 * Measuring the item's TOP rather than its centre matters for the same
 * reason: an item's own top edge does not move when it opens, only the
 * content below it does.
 *
 * THREE THINGS THAT ARE NOT COSMETIC AND SHOULD SURVIVE ANY FUTURE EDIT:
 *
 *   1. The button and panel are linked with aria-controls / id — without it a
 *      screen reader announces "expanded" and gives the user nothing to
 *      navigate to.
 *
 *   2. Reduced motion falls back to the original instant open AND disables
 *      scroll-driven opening entirely. Content that rearranges itself under a
 *      reader who asked for less movement is precisely the complaint that
 *      preference exists to register.
 *
 *   3. A manual click always wins. Clicking suspends the scroll rule for
 *      1.2 seconds so the answer the reader deliberately opened cannot be
 *      closed out from under them by the next scroll event.
 */
export const FaqAccordion = ({
  items,
  itemClassName,
  initialOpenIndex = 0,
  autoOpenOnScroll = false,
}: Props) => {
  const reduce = useReducedMotion();
  const auto = autoOpenOnScroll && !reduce;

  /* With the scroll rule on, nothing should be open before the reader has
     reached the list — the rule will open the first item as it arrives. */
  const [openIndex, setOpenIndex] = useState<number | null>(auto ? null : initialOpenIndex);

  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  /* openIndex is read inside the scroll handler but must not be a dependency
     of it — re-registering a scroll listener on every open would be wasteful
     and would drop events mid-gesture. */
  const openRef = useRef<number | null>(openIndex);
  openRef.current = openIndex;
  const suspendUntil = useRef(0);

  const setOpen = useCallback((i: number | null, manual: boolean) => {
    if (manual) suspendUntil.current = performance.now() + 1200;
    setOpenIndex(i);
  }, []);

  useEffect(() => {
    if (!auto) return;
    let frame = 0;

    const evaluate = () => {
      frame = 0;
      if (performance.now() < suspendUntil.current) return;

      /* 38% down the viewport: low enough that an item is comfortably in view
         before it opens, high enough that the answer it reveals has room
         below it without another scroll. */
      const line = window.innerHeight * 0.38;

      let active: number | null = null;
      for (let i = 0; i < itemRefs.current.length; i += 1) {
        const el = itemRefs.current[i];
        if (!el) continue;
        if (el.getBoundingClientRect().top <= line) active = i;
        else break;
      }

      /* Once the whole list has scrolled off the top, stop holding the last
         answer open behind the reader. */
      const last = itemRefs.current[itemRefs.current.length - 1];
      if (last && last.getBoundingClientRect().bottom < 0) active = null;

      if (active !== openRef.current) setOpen(active, false);
    };

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(evaluate);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    evaluate();
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [auto, setOpen]);

  return (
    <div className="flex flex-col gap-3">
      {items.map((faq, i) => {
        const open = openIndex === i;
        const panelId = `faq-panel-${i}`;
        const buttonId = `faq-button-${i}`;
        return (
          <div
            key={faq.q}
            ref={(el) => {
              itemRefs.current[i] = el;
            }}
            className={
              itemClassName ??
              `rounded-[14px] border transition-colors duration-300 ${
                open ? 'border-[#46699F]/45 bg-white' : 'border-[#D7DEEA] bg-[#E6EFFF] hover:border-[#46699F]/30'
              }`
            }
          >
            <button
              type="button"
              id={buttonId}
              aria-expanded={open}
              aria-controls={panelId}
              onClick={() => setOpen(open ? null : i, true)}
              className="flex w-full items-center justify-between gap-4 rounded-[14px] px-5 py-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#454659]"
            >
              <span className="font-medium text-[#2E2F3D]">{faq.q}</span>
              <ChevronDownIcon
                className={`h-5 w-5 flex-shrink-0 text-[#4B5468] transition-transform duration-300 ${
                  open ? 'rotate-180 text-[#46699F]' : ''
                }`}
              />
            </button>

            {reduce ? (
              open ? (
                <div id={panelId} role="region" aria-labelledby={buttonId}>
                  <p className="px-5 pb-5 text-sm leading-relaxed text-[#4B5468]">{faq.a}</p>
                </div>
              ) : null
            ) : (
              <AnimatePresence initial={false}>
                {open ? (
                  <motion.div
                    key="panel"
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{
                      height: { duration: 0.38, ease: [0.16, 1, 0.3, 1] },
                      opacity: { duration: 0.28, ease: 'easeOut' },
                    }}
                    style={{ overflow: 'hidden' }}
                  >
                    <p className="px-5 pb-5 text-sm leading-relaxed text-[#4B5468]">{faq.a}</p>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            )}
          </div>
        );
      })}
    </div>
  );
};
