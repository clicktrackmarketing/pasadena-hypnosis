import Link from 'next/link';
import { NAP, HOURS, SERVICE_AREAS, RATING } from './content';
import { LOGO, LOGO_W, LOGO_H } from './assets';
import { MapPinIcon, ClockIcon, PhoneIcon, MailIcon, ArrowRightIcon, StarIcon } from './Icons';
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

      {/* CALL STRIP ------------------------------------------------------- */}
      <div className="relative border-b border-white/10">
        <div className="mx-auto flex max-w-[1280px] flex-col items-start justify-between gap-5 px-4 py-8 sm:px-6 lg:flex-row lg:items-center lg:px-8">
          <p className="font-heading text-[1.35rem] text-white sm:text-[1.6rem]">
            A free discovery call comes first.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/book"
              className="group inline-flex items-center gap-2.5 rounded-[12px] bg-white px-6 py-3.5 text-[14.5px] font-semibold text-[#2E2F3D] transition-colors duration-300 hover:bg-[#E6EFFF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A9C4EE] focus-visible:ring-offset-2 focus-visible:ring-offset-[#2E2F3D]"
            >
              Book a Free Discovery Call
              <ArrowRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <a
              href={NAP.phoneHref}
              className="inline-flex items-center gap-2.5 rounded-[12px] border border-white/30 px-6 py-3.5 text-[14.5px] font-medium text-white transition-colors duration-300 hover:border-white hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A9C4EE] focus-visible:ring-offset-2 focus-visible:ring-offset-[#2E2F3D]"
            >
              <PhoneIcon className="h-4 w-4" />
              {NAP.phone}
            </a>
          </div>
        </div>
      </div>

      {/* COLUMNS ---------------------------------------------------------- */}
      <div className="relative mx-auto max-w-[1280px] px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <span className="mb-5 inline-flex items-center rounded-[10px] bg-black px-3 py-2">
              <img
                src={LOGO}
                alt="Pasadena Hypnosis"
                width={LOGO_W}
                height={LOGO_H}
                className="h-9 w-auto object-contain"
              />
            </span>
            <p className="max-w-[38ch] text-[14.5px] leading-[1.7] text-[#D9E1F0]/80">
              Certified hypnotherapy for the conditions other practices turn away &mdash; South Pasadena, and by
              video across California.
            </p>
            <p className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-3.5 py-1.5 text-[12.5px] text-[#D9E1F0]">
              <StarIcon className="h-3.5 w-3.5 text-[#5DBA47]" />
              {RATING.value.toFixed(1)} from {RATING.count} Google reviews
            </p>
          </div>

          <div className="lg:col-span-3">
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
                      {h.days}: <span className="tabular-nums">{h.time}</span>
                    </span>
                  ))}
                </span>
              </span>
            </address>
          </div>

          <div className="lg:col-span-2">
            <h2 className={heading}>Explore</h2>
            <ul className="flex flex-col gap-2.5">
              {EXPLORE.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className={navLink}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h2 className={heading}>Service areas</h2>
            <ul className="mb-8 flex flex-col gap-2.5">
              {SERVICE_AREAS.map((a) => (
                <li key={a}>
                  <Link href={`/service-areas/${areaSlug(a)}`} className={navLink}>
                    {a.split(',')[0].trim()}
                  </Link>
                </li>
              ))}
            </ul>
            <h2 className={heading}>Legal</h2>
            <ul className="flex flex-col gap-2.5">
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

        {/* The scope disclosure sits in the footer of every page on purpose.
            It is the sentence that keeps the rest of the site's claims
            defensible, and it should not be reachable only from /our-team. */}
        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-white/15 pt-7 lg:flex-row lg:items-center">
          <p className="text-[12px] text-[#D9E1F0]/55">
            &copy; {year} Pasadena Hypnosis. All rights reserved.
          </p>
          <p className="max-w-[80ch] text-[12px] leading-[1.7] text-[#D9E1F0]/55">
            Pasadena Hypnosis is a complementary hypnotherapy practice, not a substitute for medical or psychiatric
            care. Jason Meissner is a certified hypnotherapist, not a licensed medical or mental-health clinician.
          </p>
        </div>
      </div>
    </footer>
  );
};
