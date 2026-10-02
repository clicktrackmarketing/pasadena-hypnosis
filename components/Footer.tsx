import Link from 'next/link';
import { NAP, HOURS, SERVICE_AREAS, RATING, REVIEWS_ELSEWHERE, TAGLINE, DISCLAIMER } from './content';
import { LOGO, LOGO_W, LOGO_H } from './assets';
import { MapPinIcon, ClockIcon, PhoneIcon, MailIcon, StarIcon } from './Icons';
import { Rings } from './Spiral';

const areaSlug = (a: string) => a.split(',')[0].trim().toLowerCase().replace(/\s+/g, '-');

const EXPLORE = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/service-areas', label: 'Service Areas' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/about', label: 'About' },
  { href: '/our-team', label: 'Our Team' },
  { href: '/faq', label: 'FAQ' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
];

const LEGAL = [
  { href: '/editorial-policy', label: 'Editorial Policy' },
  { href: '/privacy', label: 'Privacy Policy' },
  { href: '/terms', label: 'Terms of Service' },
];

const heading = 'mb-5 text-[11px] font-bold uppercase tracking-[0.18em] text-[#A9C4EE]';
const navLink =
  'ph-tap ph-underline text-[14px] text-[#D9E1F0]/85 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A9C4EE] focus-visible:ring-offset-2 focus-visible:ring-offset-[#2E2F3D]';

/**
 * NO 'use client' — every link is a real next/link href and every effect is
 * CSS, so this renders entirely on the server. Worth keeping that way: the
 * footer is on every route, and a client boundary here would ship the whole
 * component tree to the browser on all 27 pages to animate a list of links.
 * The scroll-reveal treatment used elsewhere is deliberately not applied.
 */
export const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="relative isolate overflow-hidden bg-[#2E2F3D] text-[#D9E1F0] ph-grain">
      <Rings
        className="pointer-events-none absolute -right-40 -top-40 h-[34rem] w-[34rem] text-white/[0.06] ph-spin-slower"
        count={8}
      />

      {/* The call strip that used to sit here ("A free discovery call comes
          first." + Book / phone) was removed 2026-09-28: every page already
          ends on a call to action directly above the footer (CtaBand, the
          homepage FinalCta, or the booking form itself), so it rendered as a
          second identical bar. */}

      {/* COLUMNS ---------------------------------------------------------- */}
      <div className="relative mx-auto max-w-[1280px] px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-12 lg:gap-8">
          <div className="col-span-2 sm:col-span-3 lg:col-span-4">
            <span className="mb-5 inline-flex items-center rounded-[10px] bg-black px-3 py-2">
              <img
                src={LOGO}
                alt="Pasadena Hypnosis"
                width={LOGO_W}
                height={LOGO_H}
                className="h-9 w-auto object-contain"
              />
            </span>
            {/* Markup #78 (and #54/#86/#89 on other pages): the client's own words. */}
            <p className="max-w-[38ch] text-[14.5px] leading-[1.7] text-[#D9E1F0]/80">{TAGLINE}</p>
            <p className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-3.5 py-1.5 text-[12.5px] text-[#D9E1F0]">
              <StarIcon className="h-3.5 w-3.5 text-[#5DBA47]" />
              {RATING.value.toFixed(1)} from {RATING.count} Google reviews
            </p>
            {/* Markup #31: "There are also yelp reviews. As well as others." */}
            <p className="mt-2.5 text-[12.5px] text-[#D9E1F0]/75">{REVIEWS_ELSEWHERE}.</p>
          </div>

          <div className="col-span-2 sm:col-span-1 lg:col-span-3">
            <h2 className={heading}>Visit</h2>
            <address className="flex flex-col gap-3.5 not-italic">
              <span className="flex items-start gap-2.5 text-[14px] text-[#D9E1F0]/85">
                <MapPinIcon className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#A9C4EE]" />
                <span>
                  {NAP.street}
                  <br />
                  {NAP.city}, {NAP.state} {NAP.zip}
                </span>
              </span>
              <a href={NAP.phoneHref} className="ph-tap flex items-center gap-2.5 text-[14px] text-[#D9E1F0]/85 hover:text-white">
                <PhoneIcon className="h-4 w-4 flex-shrink-0 text-[#A9C4EE]" />
                {NAP.phone}
              </a>
              <a href={`mailto:${NAP.email}`} className="ph-tap flex items-center gap-2.5 break-all text-[14px] text-[#D9E1F0]/85 hover:text-white">
                <MailIcon className="h-4 w-4 flex-shrink-0 text-[#A9C4EE]" />
                {NAP.email}
              </a>
              <span className="flex items-start gap-2.5 text-[14px] text-[#D9E1F0]/85">
                <ClockIcon className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#A9C4EE]" />
                <span className="flex flex-col gap-0.5">
                  {HOURS.map((h) => (
                    <span key={h.days}>
                      {h.days}: <span className="whitespace-nowrap tabular-nums">{h.time}</span>
                    </span>
                  ))}
                </span>
              </span>
            </address>
          </div>

          <div className="col-span-1 lg:col-span-2">
            <h2 className={heading}>Explore</h2>
            <ul className="flex flex-col gap-1 sm:gap-2.5">
              {EXPLORE.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className={navLink}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-1 lg:col-span-3">
            <h2 className={heading}>Service areas</h2>
            <ul className="mb-8 flex flex-col gap-1 sm:gap-2.5">
              {SERVICE_AREAS.map((a) => (
                <li key={a}>
                  <Link href={`/service-areas/${areaSlug(a)}`} className={navLink}>
                    {a.split(',')[0].trim()}
                  </Link>
                </li>
              ))}
            </ul>
            <h2 className={heading}>Legal</h2>
            <ul className="flex flex-col gap-1 sm:gap-2.5">
              {LEGAL.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className={navLink}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* The disclaimer sits in the footer of every page, in the exact words
            the client gave in markup #77. It replaces the older two-sentence
            scope disclosure, which he limited to /our-team (#73). */}
        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-white/15 pt-7 lg:flex-row lg:items-center">
          {/* 75%, not the 55% these used to be: at 12px, #D9E1F0 at 55% over
              #2E2F3D measures ~4.2:1 and fails AA — and the second line is the
              scope disclosure, the one sentence that must never be faint. */}
          <p className="text-[12px] text-[#D9E1F0]/75">
            &copy; {year} Pasadena Hypnosis. All rights reserved.
          </p>
          {/* Markup #77 (and #32/#55/#87/#90): verbatim, the client's sentence. */}
          <p className="max-w-[80ch] text-[12px] leading-[1.7] text-[#D9E1F0]/75">{DISCLAIMER}</p>
        </div>
      </div>

      {/* Oversized wordmark along the foot of every page — typographic, not
          an image, so it costs nothing. Decorative (the real logo and name
          are above), hence aria-hidden. */}
      <p
        aria-hidden="true"
        className="pointer-events-none relative -mb-[0.18em] select-none whitespace-nowrap text-center font-heading text-[10.5vw] leading-[0.9] tracking-[-0.04em] text-white/[0.05] xl:text-[9.4rem]"
      >
        Pasadena Hypnosis
      </p>
    </footer>
  );
};
