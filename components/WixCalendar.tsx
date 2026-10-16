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
   footer, so the frame is shifted up inside a clipped box until the calendar's
   "Select a Date and Time" heading sits at the top. Wix picks its layout by
   user agent, not width, so there are two sets of numbers, measured on
   2026-10-16 with puppeteer against /booking-calendar/discovery-call:
     desktop  fixed 980px-wide page; heading at y=326. Narrower than 980 (a
              tablet) the whole frame is scaled down to fit instead of
              scrolling sideways.
     phone    320px-minimum fluid page; heading at y=401 at every width.
   If Jason restyles his Wix header these offsets drift; re-measure with
   scripts/measure-wix-calendar.cjs. The "open in a new tab" link under every frame is
   the fallback for that and for browsers that block a framed checkout.
--------------------------------------------------------------------------- */

import { useEffect, useRef, useState } from 'react';

export const WIX_SITE = 'https://www.pasadenahypnosis.com';

export const wixCalendarUrl = (wixSlug: string) => `${WIX_SITE}/booking-calendar/${wixSlug}`;

const LAYOUT = {
  desktop: { width: 980, crop: 306, view: 520 },
  phone: { width: 0, crop: 385, view: 830 },
} as const;

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
        style={{ height: Math.round(l.view * scale) }}
      >
        <div
          style={{
            width: phone ? '100%' : l.width,
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
            className="block w-full border-0"
            style={{ height: l.crop + l.view, marginTop: -l.crop }}
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
