'use client';

import { useEffect, useState } from 'react';

/**
 * True only once the page is known to be on a wide screen. Used to avoid
 * mounting a second WebGL canvas on phones at all (a canvas inside a
 * display:none box still boots a GL context). False during SSR and the first
 * client render, so nothing mismatches on hydration.
 */
export const useWide = (query = '(min-width: 1024px)') => {
  const [wide, setWide] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const on = () => setWide(mq.matches);
    on();
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, [query]);
  return wide;
};
