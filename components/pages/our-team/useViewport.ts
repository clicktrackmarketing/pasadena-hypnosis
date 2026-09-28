'use client';

import { useEffect, useState } from 'react';

/**
 * Current viewport width, or `fallback` on the server and first client
 * render. Only used for values that may settle a beat after hydration (an
 * orbit radius, a sticky offset, whether to mount a second canvas) — never
 * for anything the first paint depends on.
 */
export const useViewportWidth = (fallback = 1280) => {
  const [w, setW] = useState(fallback);
  useEffect(() => {
    const on = () => setW(window.innerWidth);
    on();
    window.addEventListener('resize', on);
    return () => window.removeEventListener('resize', on);
  }, []);
  return w;
};
