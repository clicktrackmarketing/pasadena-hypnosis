'use client';

import { useEffect, useState } from 'react';

/**
 * True while the viewport is at least `px` wide. Starts at `initial` on the
 * server and on the first client render, then settles after mount — so it is
 * only used for things that may appear a beat late (a second canvas, an
 * orbit radius), never for anything the first paint depends on.
 */
export const useMinWidth = (px: number, initial = false) => {
  const [ok, setOk] = useState(initial);
  useEffect(() => {
    const mq = window.matchMedia(`(min-width: ${px}px)`);
    const on = () => setOk(mq.matches);
    on();
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, [px]);
  return ok;
};
