'use client';

/* ---------------------------------------------------------------------------
   WIX BOOKING CALENDAR — Jason's live Wix Bookings calendar, framed.

   Jason is keeping Wix for bookings (Slack, 2026-10-16), so this site shows
   his real calendars instead of a form: availability, the booking form and
   Wix's own payment step all stay on his Wix account, exactly as today.
   Supersedes the "BookingForm is UI only" note and closes markup #110.

   WIX_SITE MUST KEEP SERVING THE WIX SITE. If pasadenahypnosis.com is pointed
   at this Next.js site, connect the Wix site to a subdomain first (e.g.
   book.pasadenahypnosis.com) and change WIX_SITE to it, or every calendar
   here goes blank.

   CROPPING. A Wix booking page carries Wix's own header, logo, search box and
   footer. None of it may show. Wix picks its layout by user agent, not width,
   so there are two sets of numbers, measured 2026-10-16 with puppeteer on the
   discovery-call, hypnotherapy-sessions, smoking-cessation and chronic-pain
   calendars, every bookable day, and the booking-form step after "Next":
     desktop  fixed 980px page. Calendar heading at y=326; footer always
              505px tall; the content above it ends at y=779 on the emptiest
              day. Narrower than 980 (a tablet) the frame is scaled to fit.
     phone    320px-minimum fluid page. Heading at y=401; footer always 823px
              tall; content ends at y=1089 at the shortest.
   TOP: the frame is shifted up by `crop`, so Wix's header is never shown.
   BOTTOM: the steps differ in height (the Discovery Call form has extra
   questions), so the frame stays scrollable, but it is `footer` px taller than
   the visible window and that extra is clipped off. Scrolled to its very end,
   the frame's bottom 505/823px is the footer and it sits in the clipped part:
   visitors can reach every field and never the footer. That only holds while
   `view` stays under the shortest content (779-306, 1089-385), so the window
   is never taller than what lies between the header and the footer.
   SCROLLBARS: the desktop frame is a scrollbar wider than Wix's 980px page and
   the box clips that column off, so there is no sideways scroll and no bar.
   CLIP, NOT HIDDEN: both boxes are `overflow: clip` (the overflow-hidden
   class is only the fallback for browsers without clip). A hidden box is
   still a scroll container, so any scrollIntoView reaching up from the frame
   (Wix jumping to a form error, focus) scrolls it and slides Wix's header or
   footer into view. A clipped box cannot be scrolled at all.
   If Jason restyles his Wix header or footer these drift; re-measure with
   scripts/measure-wix-calendar.cjs. The "open in a new tab" link under every
   frame is the fallback for that and for browsers that block a framed form.
--------------------------------------------------------------------------- */

import { useEffect, useRef, useState } from 'react';

/* Set NEXT_PUBLIC_WIX_SITE (e.g. https://book.pasadenahypnosis.com) on the
   Vercel project once the Wix site is on its subdomain, and redeploy. The
   default is today's address, which only works while Wix still owns the
   domain. Launch steps: docs/launch-booking.md. next.config.mjs reads the
   same variable to forward the old Wix booking URLs. */
export const WIX_SITE = (process.env.NEXT_PUBLIC_WIX_SITE || 'https://www.pasadenahypnosis.com').replace(/\/$/, '');

export const wixCalendarUrl = (wixSlug: string) => `${WIX_SITE}/booking-calendar/${wixSlug}`;

const LAYOUT = {
  desktop: { width: 980, crop: 306, view: 466, footer: 505 },
  phone: { width: 0, crop: 385, view: 696, footer: 823 },
} as const;

/** Wider than any classic scrollbar; clipped off with it. */
const SCROLLBAR = 24;

/** Phones get Wix's mobile layout; iPads report a desktop UA and get desktop. */
const isPhoneUA = () => /Mobi|Android|iPhone|iPod/i.test(navigator.userAgent);

export const WixCalendar = ({
  wixSlug,
  title,
  tone = 'light',
}: {
  wixSlug: string;
  title: string;
  /** The ground the fallback link sits on. */
  tone?: 'light' | 'dark';
}) => {
  const box = useRef<HTMLDivElement | null>(null);
  const [phone, setPhone] = useState(false);
  const [boxWidth, setBoxWidth] = useState<number | null>(null);

  useEffect(() => {
    setPhone(isPhoneUA());
    const el = box.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => setBoxWidth(entry.contentRect.width));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const src = wixCalendarUrl(wixSlug);
  const l = phone ? LAYOUT.phone : LAYOUT.desktop;
  const scale = !phone && boxWidth && boxWidth < l.width ? boxWidth / l.width : 1;

  return (
    <div>
      <div
        ref={box}
        className="relative overflow-hidden rounded-[22px] bg-[#E3ECFD] ring-1 ring-[#2E2F3D]/10"
        style={{ height: Math.round(l.view * scale), overflow: 'clip' }}
      >
        <div
          className="overflow-hidden"
          style={{
            width: phone ? '100%' : l.width,
            overflow: 'clip',
            // clip, unlike hidden, does not contain margins: without a new
            // formatting context the frame's negative top margin collapses
            // through and moves the whole box instead of the frame inside it.
            display: 'flow-root',
            transform: scale < 1 ? `scale(${scale})` : undefined,
            transformOrigin: 'top left',
            marginLeft: !phone && scale === 1 && boxWidth ? (boxWidth - l.width) / 2 : 0,
          }}
        >
          <iframe
            src={src}
            title={title}
            loading="lazy"
            allow="payment"
            className="block border-0"
            style={{
              width: phone ? '100%' : l.width + SCROLLBAR,
              height: l.crop + l.view + l.footer,
              marginTop: -l.crop,
            }}
          />
        </div>
      </div>
      <p className={`mt-3 text-center text-[13.5px] ${tone === 'dark' ? 'text-[#D9E1F0]' : 'text-[#4B5468]'}`}>
        Calendar not loading?{' '}
        <a
          href={src}
          target="_blank"
          rel="noopener"
          className={`font-semibold underline underline-offset-2 ${tone === 'dark' ? 'text-white' : 'text-[#46699F]'}`}
        >
          Open it in a new tab
        </a>
      </p>
    </div>
  );
};
