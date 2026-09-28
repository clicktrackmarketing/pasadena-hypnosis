'use client';

/* ---------------------------------------------------------------------------
   ROUTE CURTAIN — the page-to-page transition.

   On every client-side navigation (never on the first load, so it can never
   delay the first paint or hide content from a visitor without JS) a dark
   panel carrying the spiral mark covers the new page and lifts away, while
   the new page's own hero entrance plays underneath it.

   It is keyed on the pathname, so /services/a → /services/b gets the curtain
   too; a root template.tsx would not remount for a change inside a segment.
   useLayoutEffect sets it before the browser paints the new route, so the
   new page never flashes uncovered for a frame first.
--------------------------------------------------------------------------- */

import { useLayoutEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { motion, useReducedMotion } from 'motion/react';
import { Spiral } from './Spiral';

export const RouteCurtain = () => {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const first = useRef(true);
  const [k, setK] = useState(0);

  useLayoutEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    setK((v) => v + 1);
  }, [pathname]);

  if (k === 0 || reduce) return null;
  return (
    <motion.div
      key={k}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[90] flex items-center justify-center bg-[#2E2F3D]"
      initial={{ clipPath: 'inset(0% 0% 0% 0%)' }}
      animate={{ clipPath: 'inset(0% 0% 100% 0%)' }}
      transition={{ duration: 0.8, delay: 0.12, ease: [0.76, 0, 0.24, 1] }}
    >
      <motion.div
        initial={{ opacity: 1, scale: 1, rotate: 0 }}
        animate={{ opacity: 0, scale: 0.7, rotate: 120 }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      >
        <Spiral className="h-20 w-20 text-[#A9C4EE]" strokeWidth={1.2} />
      </motion.div>
    </motion.div>
  );
};
