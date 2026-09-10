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

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-[#D7DEEA]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-16 sm:h-20 flex items-center justify-between gap-4">
          <Link
            href="/"
            className="flex items-center gap-2.5 flex-shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#454659] focus-visible:ring-offset-2 rounded-[12px]"
            aria-label="Pasadena Hypnosis — go to homepage"
          >
            <img src={LOGO} alt="Pasadena Hypnosis" width={LOGO_W} height={LOGO_H} className="h-9 sm:h-10 w-auto object-contain" />
          </Link>

          <nav aria-label="Primary" className="hidden lg:flex items-center gap-1">
            <Link
              href="/services"
              className={`px-3 py-2 text-sm font-medium rounded-[10px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#454659] focus-visible:ring-offset-2 ${isActive('/services') ? 'text-[#46699F]' : 'text-[#2E2F3D] hover:text-[#46699F]'}`}
            >
              Services
            </Link>
            <div className="relative" ref={servicesRef}>
              <button
                type="button"
                aria-haspopup="true"
                aria-expanded={servicesOpen}
                onClick={() => setServicesOpen((v) => !v)}
                className="flex items-center gap-1 px-2 py-2 text-sm font-medium rounded-[10px] text-[#2E2F3D] hover:text-[#46699F] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#454659] focus-visible:ring-offset-2"
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
                className={`px-3 py-2 text-sm font-medium rounded-[10px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#454659] focus-visible:ring-offset-2 ${isActive(item.href) ? 'text-[#46699F]' : 'text-[#2E2F3D] hover:text-[#46699F]'}`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-3 flex-shrink-0">
            <a href={`tel:${NAP.phone.replace(/[^\d+]/g, '')}`} className="flex items-center gap-2 text-sm font-medium text-[#2E2F3D] hover:text-[#46699F] transition-colors">
              <PhoneIcon className="h-4 w-4 text-[#454659]" />
              {NAP.phone}
            </a>
            <Link
              href="/book"
              className="rounded-[10px] bg-[#454659] text-white px-4 py-2.5 text-sm font-medium hover:bg-[#33344A] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#454659] focus-visible:ring-offset-2"
            >
              Book a Free Call
            </Link>
          </div>

          <div className="flex lg:hidden items-center gap-2">
            <a href={`tel:${NAP.phone.replace(/[^\d+]/g, '')}`} aria-label={`Call ${NAP.phone}`} className="p-2 text-[#454659] rounded-[10px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#454659]">
              <PhoneIcon className="h-5 w-5" />
            </a>
            <button
              type="button"
              onClick={() => setMobileOpen((v) => !v)}
              aria-expanded={mobileOpen}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              className="p-2 text-[#2E2F3D] rounded-[10px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#454659]"
            >
              {mobileOpen ? <CloseIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {mobileOpen ? (
        <div className="lg:hidden border-t border-[#D7DEEA] bg-white">
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
                    <Link key={s.slug} href={`/services/${s.slug}`} className="w-full text-left py-2 px-3 text-sm text-[#2E2F3D] hover:bg-[#E6EFFF] rounded-[10px] block">
                      {s.name}
                    </Link>
                  ))}
                </div>
              ) : null}
            </div>
            {NAV_LINKS.map((item) => (
              <Link key={item.href} href={item.href} className="text-left py-3 text-base font-medium text-[#2E2F3D] border-b border-[#D7DEEA] last:border-0">
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
