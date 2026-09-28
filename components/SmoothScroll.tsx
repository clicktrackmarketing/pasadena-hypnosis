'use client';

/* ---------------------------------------------------------------------------
   SMOOTH SCROLLING (Lenis), sitewide.

   Interpolates the mouse wheel and trackpad so every scroll-linked effect on
   the site — parallax, the pinned 3D journey, the sticky stacks, the scrubbed
   text — moves continuously instead of in wheel-notch steps. Lenis scrolls
   the real window, so position: sticky, IntersectionObserver, motion's
   useScroll and the browser's own find-in-page all keep working.

   Deliberately OFF for:
     - prefers-reduced-motion: the interpolation is itself motion;
     - coarse pointers: phones and tablets already have native momentum
       scrolling, and replacing it is the thing people hate most about
       smooth-scroll libraries.

   Anchor links (#specialties etc.) are handled by Lenis so they glide rather
   than jump, offset for the sticky header.
--------------------------------------------------------------------------- */

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Lenis from 'lenis';

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

export const SmoothScroll = () => {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (window.matchMedia('(pointer: coarse)').matches) return;
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      anchors: { offset: -90 },
    });
    window.__lenis = lenis;
    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      delete window.__lenis;
    };
  }, []);

  // A new route changes the document height; re-measure once it has painted.
  useEffect(() => {
    const id = window.setTimeout(() => window.__lenis?.resize(), 120);
    return () => window.clearTimeout(id);
  }, [pathname]);

  return null;
};
