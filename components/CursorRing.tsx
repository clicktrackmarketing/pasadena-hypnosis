'use client';

/* ---------------------------------------------------------------------------
   CURSOR RING — a soft ring that trails the mouse and swells over anything
   clickable.

   It ADDS to the system cursor; it never replaces or hides it. Hiding the
   real cursor is an accessibility regression (people rely on their OS cursor
   size and colour settings) for the sake of a flourish.

   Only for fine pointers that can hover, and never under reduced motion.
   mix-blend-mode: difference keeps it visible on the white bands and on the
   dark ones without a second colour.
--------------------------------------------------------------------------- */

import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion, useSpring } from 'motion/react';

const INTERACTIVE = 'a, button, [role="button"], input, textarea, select, summary, label';

export const CursorRing = () => {
  const reduce = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [mode, setMode] = useState<'idle' | 'link' | 'hidden'>('hidden');
  const modeRef = useRef(mode);
  const x = useSpring(-100, { stiffness: 520, damping: 42, mass: 0.35 });
  const y = useSpring(-100, { stiffness: 520, damping: 42, mass: 0.35 });

  useEffect(() => {
    if (reduce) return;
    const mq = window.matchMedia('(pointer: fine) and (hover: hover)');
    if (!mq.matches) return;
    setEnabled(true);
    const set = (m: 'idle' | 'link' | 'hidden') => {
      if (modeRef.current !== m) {
        modeRef.current = m;
        setMode(m);
      }
    };
    const move = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      x.set(e.clientX);
      y.set(e.clientY);
      const t = e.target as Element | null;
      set(t && t.closest && t.closest(INTERACTIVE) ? 'link' : 'idle');
    };
    const leave = () => set('hidden');
    window.addEventListener('pointermove', move, { passive: true });
    document.documentElement.addEventListener('pointerleave', leave);
    return () => {
      window.removeEventListener('pointermove', move);
      document.documentElement.removeEventListener('pointerleave', leave);
    };
  }, [reduce, x, y]);

  if (!enabled) return null;
  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[100] h-8 w-8 rounded-full border border-white mix-blend-difference"
      style={{ x, y, translateX: '-50%', translateY: '-50%' }}
      animate={{
        scale: mode === 'link' ? 1.9 : 1,
        opacity: mode === 'hidden' ? 0 : mode === 'link' ? 0.9 : 0.55,
        backgroundColor: mode === 'link' ? 'rgba(255,255,255,0.14)' : 'rgba(255,255,255,0)',
      }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
    />
  );
};
