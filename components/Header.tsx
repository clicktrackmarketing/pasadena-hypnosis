'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SERVICES, SERVICE_AREAS, NAP } from './content';
import { LOGO, LOGO_W, LOGO_H } from './assets';
import { ChevronDownIcon, MenuIcon, CloseIcon, PhoneIcon } from './Icons';

const CATEGORY_ORDER = ['Featured', 'Conditions', 'Programs', 'General', 'Online', 'Performance', 'Specialty'];

const areaSlug = (a: string) => a.split(',')[0].trim().toLowerCase().replace(/\s+/g, '-');

const NAV_LINKS: { label: string; href: string }[] = [
  { label: 'Service Areas', href: '/service-areas' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Our Team', href: '/our-team' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
];

export const Header = () => {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const servicesRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setMobileOpen(false);
    setMobileServicesOpen(false);
    setServicesOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (servicesRef.current && !servicesRef.current.contains(e.target as Node)) {
        setServicesOpen(false);
      }
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  const isActive = (href: string) => pathname === href || (href !== '/' && pathname.startsWith(href));

  /*
   * TRANSPARENT-OVER-HERO MODE, added with the 2026-09-16 homepage redesign.
   *
   * EVERY route now opens on a full-bleed dark hero — the homepage through
   * <HomeHero>, every other page through <PageHero>. A solid white bar across
   * the top of one reads as a seam, so the header starts transparent and flips
   * to the solid white treatment once the visitor scrolls past the first 24px.
   *
   * This was scoped to "/" while only the homepage had been redesigned, and is
   * deliberately unconditional now: an inner page whose header stayed white
   * looked like a different site from the homepage, which is the exact
   * impression the redesign exists to remove. IF A ROUTE IS EVER ADDED THAT
   * DOES NOT OPEN ON A DARK HERO, this needs a pathname check again —
   * white-on-white is unreadable, not merely ugly.
   *
   * THE FLIP IS NOT PURELY COSMETIC — it carries the text colours with it.
   * Over the hero, nav links have to be #FFFFFF / #A9C4EE on the ~#2E2F3D
   * scrim; once the bar is white they have to go back to #2E2F3D / #46699F.
   * Leaving either pair behind produces white-on-white, so `overHero` gates
   * both in one place rather than section by section.
   *
   * The mobile sheet forces solid regardless: it is an opaque white panel, and
   * a transparent bar sitting on top of it would orphan the close button.
   */
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const overHero = !scrolled && !mobileOpen;

  const navLink = (active: boolean) =>
    overHero
      ? active
        ? 'text-[#A9C4EE]'
        : 'text-white/85 hover:text-white'
      : active
        ? 'text-[#46699F]'
        : 'text-[#2E2F3D] hover:text-[#46699F]';

  const ring = overHero ? 'focus-visible:ring-[#A9C4EE]' : 'focus-visible:ring-[#454659]';

  return (
    <header
      className={`sticky top-0 z-40 transition-colors duration-500 ${
        overHero
          ? 'bg-transparent border-b border-white/10'
          : 'bg-white/92 backdrop-blur-md border-b border-[#D7DEEA] shadow-[0_1px_20px_-12px_rgba(46,47,61,0.5)]'
      }`}
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex items-center justify-between gap-4 transition-all duration-500 ${overHero ? 'h-20 sm:h-24' : 'h-16 sm:h-20'}`}>
          <Link
            href="/"
            className="flex items-center gap-2.5 flex-shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#454659] focus-visible:ring-offset-2 rounded-[12px]"
            aria-label="Pasadena Hypnosis — go to homepage"
          >
            <span className="inline-flex items-center rounded-[8px] bg-black px-2.5 py-1.5">
              <img src={LOGO} alt="Pasadena Hypnosis" width={LOGO_W} height={LOGO_H} className="h-9 sm:h-10 w-auto object-contain" />
            </span>
          </Link>

          <nav aria-label="Primary" className="hidden xl:flex items-center gap-1">
            <Link
              href="/services"
              className={`px-3 py-2 text-sm font-medium rounded-[10px] transition-colors focus-visible:outline-none focus-visible:ring-2 ${ring} focus-visible:ring-offset-2 ${navLink(isActive('/services'))}`}
            >
              Services
            </Link>
            <div className="relative" ref={servicesRef}>
              <button
                type="button"
                aria-haspopup="true"
                aria-expanded={servicesOpen}
                onClick={() => setServicesOpen((v) => !v)}
                className={`flex items-center gap-1 px-2 py-2 text-sm font-medium rounded-[10px] transition-colors focus-visible:outline-none focus-visible:ring-2 ${ring} focus-visible:ring-offset-2 ${navLink(false)}`}
                aria-label="Browse all services"
              >
                <ChevronDownIcon className={`h-4 w-4 transition-transform ${servicesOpen ? 'rotate-180' : ''}`} />
              </button>
              {servicesOpen ? (
                <div id="services-panel" className="absolute left-1/2 top-full z-50 w-[620px] -translate-x-1/2 overflow-hidden rounded-[14px] border-t-[3px] shadow-[0_24px_60px_-24px_rgba(46,47,61,0.30)] mt-1" style={{ background: '#E6EFFF', borderTopColor: '#454659' }}>
                  <ul className="grid grid-cols-2 gap-x-4 gap-y-0.5 p-5 max-h-[70vh] overflow-y-auto">
                    {SERVICES.map((s) => (
                      <li key={s.slug}>
                        <Link
                          href={`/services/${s.slug}`}
                          onClick={() => setServicesOpen(false)}
                          className="block rounded-lg px-3 py-2 transition-colors duration-[140ms] hover:bg-white/70"
                        >
                          <span className="block text-[14px] font-medium text-[#2E2F3D]">{s.name}</span>
                          <span className="mt-0.5 block text-[12px] text-[#4B5468]">/services/{s.slug}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <p className="border-t px-5 py-3 text-[11px] font-semibold uppercase tracking-wide" style={{ borderColor: '#D7DEEA', color: '#46699F' }}>
                    {SERVICES.length} services · {SERVICES.length} indexable URLs
                  </p>
                </div>
              ) : null}
            </div>
            {NAV_LINKS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3 py-2 text-sm font-medium rounded-[10px] transition-colors focus-visible:outline-none focus-visible:ring-2 ${ring} focus-visible:ring-offset-2 ${navLink(isActive(item.href))}`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden xl:flex items-center gap-3 flex-shrink-0">
            <a href={`tel:${NAP.phone.replace(/[^\d+]/g, '')}`} className={`flex items-center gap-2 text-sm font-medium transition-colors ${navLink(false)}`}>
              <PhoneIcon className={`h-4 w-4 ${overHero ? 'text-[#A9C4EE]' : 'text-[#454659]'}`} />
              {NAP.phone}
            </a>
            <Link
              href="/book"
              className={`rounded-[10px] px-4 py-2.5 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 ${ring} focus-visible:ring-offset-2 ${overHero ? 'bg-white text-[#2E2F3D] hover:bg-[#E6EFFF]' : 'bg-[#454659] text-white hover:bg-[#33344A]'}`}
            >
              Book a Free Call
            </Link>
          </div>

          <div className="flex xl:hidden items-center gap-2">
            <a href={`tel:${NAP.phone.replace(/[^\d+]/g, '')}`} aria-label={`Call ${NAP.phone}`} className={`ph-tap-icon inline-flex items-center justify-center p-2 rounded-[10px] focus-visible:outline-none focus-visible:ring-2 ${ring} ${overHero ? 'text-white' : 'text-[#454659]'}`}>
              <PhoneIcon className="h-5 w-5" />
            </a>
            <button
              type="button"
              onClick={() => setMobileOpen((v) => !v)}
              aria-expanded={mobileOpen}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              className={`ph-tap-icon inline-flex items-center justify-center p-2 rounded-[10px] focus-visible:outline-none focus-visible:ring-2 ${ring} ${overHero ? 'text-white' : 'text-[#2E2F3D]'}`}
            >
              {mobileOpen ? <CloseIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {mobileOpen ? (
        <div className="xl:hidden border-t border-[#D7DEEA] bg-white">
          <nav aria-label="Mobile primary" className="max-w-[1280px] mx-auto px-4 sm:px-6 py-3 flex flex-col">
            <div className="border-b border-[#D7DEEA]">
              <button
                type="button"
                aria-expanded={mobileServicesOpen}
                onClick={() => setMobileServicesOpen((v) => !v)}
                className="w-full flex items-center justify-between py-3 text-base font-medium text-[#2E2F3D]"
              >
                Services
                <ChevronDownIcon className={`h-4 w-4 transition-transform ${mobileServicesOpen ? 'rotate-180' : ''}`} />
              </button>
              {mobileServicesOpen ? (
                <div className="pb-3 flex flex-col gap-1 max-h-[50vh] overflow-y-auto">
                  <Link href="/services" className="text-left py-2 px-3 text-sm font-medium text-[#46699F] bg-[#E6EFFF] rounded-[10px]">
                    All services
                  </Link>
                  {SERVICES.map((s) => (
                    <Link key={s.slug} href={`/services/${s.slug}`} className="ph-tap w-full text-left py-2 px-3 text-sm text-[#2E2F3D] hover:bg-[#E6EFFF] rounded-[10px] block">
                      {s.name}
                    </Link>
                  ))}
                </div>
              ) : null}
            </div>
            {NAV_LINKS.map((item) => (
              <Link key={item.href} href={item.href} className="ph-tap block text-left py-3 text-base font-medium text-[#2E2F3D] border-b border-[#D7DEEA] last:border-0">
                {item.label}
              </Link>
            ))}
            <Link
              href="/book"
              className="mt-4 w-full text-center rounded-[10px] bg-[#454659] text-white px-4 py-3 text-sm font-medium hover:bg-[#33344A] transition-colors"
            >
              Book a Free Call
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
};

export { CATEGORY_ORDER, areaSlug };
