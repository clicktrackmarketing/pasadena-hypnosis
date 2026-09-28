'use client';

/* ---------------------------------------------------------------------------
   IMAGE WARM-UP — photos are fetched before their section arrives.

   Every photo below the fold is loading="lazy", which is right for the first
   paint but leaves the browser to decide when to start each download. Chrome
   waits until an image is roughly one screen away VERTICALLY, and horizontal
   rails (the pinned services rail, the review strips) are worse: a card 3,000px
   to the right of the viewport is not fetched until it is dragged close, so
   it arrives as a blank grey frame that fills in late.

   This watches every lazy <img> with a generous margin — 1,200px above and
   below, 1,600px to either side — and flips it to eager as it enters that
   zone. Nothing above the fold changes, so the first paint and LCP are
   untouched; images simply start downloading one screen earlier than the
   browser would have, and rails get the same treatment sideways.

   Re-scans after client navigations and when sections mount new images.
--------------------------------------------------------------------------- */

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export const ImageWarmup = () => {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          const img = e.target as HTMLImageElement;
          img.loading = 'eager';
          io.unobserve(img);
        }
      },
      { rootMargin: '1200px 1600px' },
    );
    const scan = () =>
      document.querySelectorAll<HTMLImageElement>('img[loading="lazy"]').forEach((img) => io.observe(img));
    scan();

    let pending = 0;
    const mo = new MutationObserver(() => {
      if (pending) return;
      pending = window.setTimeout(() => {
        pending = 0;
        scan();
      }, 300);
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
      window.clearTimeout(pending);
    };
  }, [pathname]);

  return null;
};
