'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll } from 'motion/react';
import { SERVICES, SERVICE_AREAS, NAP } from './content';
import { LOGO, LOGO_W, LOGO_H } from './assets';
import { serviceImage } from './unsplash';
import { responsive } from './responsive';
import { ChevronDownIcon, MenuIcon, CloseIcon, PhoneIcon, ArrowRightIcon } from './Icons';
import { EASE_OUT_SOFT } from './Motion';
import { RollText } from './MotionFx';

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

/* The mega-menu groups services by category in the brief's own order. */
const GROUPED = CATEGORY_ORDER.map((c) => ({ c, items: SERVICES.filter((s) => s.category === c) })).filter(
  (g) => g.items.length > 0,
);

export const Header = () => {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [hoverKey, setHoverKey] = useState<string | null>(null);
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
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setServicesOpen(false);
        setMobileOpen(false);
      }
    };
    document.addEventListener('click', onClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('click', onClick);
      document.removeEventListener('keydown', onKey);
    };
  }, []);

  /* The full-screen mobile sheet owns the viewport while it is open. */
  useEffect(() => {
    if (!mobileOpen) return;
    const html = document.documentElement;
    const prev = html.style.overflow;
    html.style.overflow = 'hidden';
    return () => {
      html.style.overflow = prev;
    };
  }, [mobileOpen]);

  const isActive = (href: string) => pathname === href || (href !== '/' && pathname.startsWith(href));

  /*
   * TRANSPARENT-OVER-HERO MODE, added with the 2026-09-16 homepage redesign.
   *
   * EVERY route opens on a full-bleed dark hero — the homepage through
   * <HomeHero>, every other page through <PageHero>. The header starts
   * transparent and flips to the solid white treatment once the visitor
   * scrolls past the first 24px. IF A ROUTE IS EVER ADDED THAT DOES NOT OPEN
   * ON A DARK HERO, this needs a pathname check again — white-on-white is
   * unreadable, not merely ugly.
   *
   * THE FLIP CARRIES THE TEXT COLOURS WITH IT: over the hero nav links are
   * #FFFFFF / #A9C4EE; once the bar is white they return to #2E2F3D / #46699F.
   *
   * HIDE ON SCROLL DOWN, added 2026-09-28. Past 420px the bar slides away
   * while the visitor reads downward and returns the moment they scroll up —
   * the page gets the full viewport, and the navigation is one flick away.
   * It never hides while a menu is open, and never under reduced motion.
   */
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  useMotionValueEvent(scrollY, 'change', (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 24);
    if (reduce || mobileOpen || servicesOpen) return setHidden(false);
    if (y > 420 && y > prev + 4) setHidden(true);
    else if (y < prev - 4 || y <= 420) setHidden(false);
  });
  useEffect(() => {
    setScrolled(window.scrollY > 24);
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
  const pill = overHero ? 'bg-white/12' : 'bg-[#E6EFFF]';

  return (
    <>
    <motion.header
      animate={{ y: hidden ? '-110%' : '0%' }}
      transition={{ duration: 0.45, ease: EASE_OUT_SOFT }}
      className={`sticky top-0 z-40 transition-colors duration-500 ${
        mobileOpen
          ? 'bg-[#23242F] border-b border-white/10'
          : overHero
            ? 'bg-transparent border-b border-white/10'
            : 'bg-white/88 backdrop-blur-xl border-b border-[#D7DEEA] shadow-[0_1px_20px_-12px_rgba(46,47,61,0.5)]'
      }`}
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex items-center justify-between gap-4 transition-all duration-500 ${overHero || mobileOpen ? 'h-20 sm:h-24' : 'h-16 sm:h-20'}`}>
          <Link
            href="/"
            className="group flex items-center gap-2.5 flex-shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#454659] focus-visible:ring-offset-2 rounded-[12px]"
            aria-label="Pasadena Hypnosis — go to homepage"
          >
            <span className="inline-flex items-center rounded-[8px] bg-black px-2.5 py-1.5 transition-transform duration-500 group-hover:scale-[1.03]">
              <img src={LOGO} alt="Pasadena Hypnosis" width={LOGO_W} height={LOGO_H} className="h-9 sm:h-10 w-auto object-contain" />
            </span>
          </Link>

          {/* Desktop nav. A single pill slides between links on hover
              (shared layoutId), which is what makes the bar feel like one
              object rather than seven. */}
          <nav aria-label="Primary" className="hidden xl:flex items-center gap-1" onMouseLeave={() => setHoverKey(null)}>
            <div className="relative flex items-center" ref={servicesRef}>
              <Link
                href="/services"
                onMouseEnter={() => setHoverKey('/services')}
                className={`relative px-3 py-2 text-sm font-medium rounded-[10px] transition-colors focus-visible:outline-none focus-visible:ring-2 ${ring} focus-visible:ring-offset-2 ${navLink(isActive('/services'))}`}
              >
                {hoverKey === '/services' && !reduce ? (
                  <motion.span layoutId="nav-pill" className={`absolute inset-0 -z-10 rounded-[10px] ${pill}`} transition={{ type: 'spring', stiffness: 420, damping: 34 }} />
                ) : null}
                Services
              </Link>
              <button
                type="button"
                aria-haspopup="true"
                aria-expanded={servicesOpen}
                aria-controls="services-panel"
                onClick={() => setServicesOpen((v) => !v)}
                className={`flex items-center gap-1 px-2 py-2 text-sm font-medium rounded-[10px] transition-colors focus-visible:outline-none focus-visible:ring-2 ${ring} focus-visible:ring-offset-2 ${navLink(false)}`}
                aria-label="Browse all services"
              >
                <ChevronDownIcon className={`h-4 w-4 transition-transform duration-300 ${servicesOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {servicesOpen ? (
                  <motion.div
                    id="services-panel"
                    initial={reduce ? false : { opacity: 0, y: 14, scale: 0.98, filter: 'blur(6px)' }}
                    animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                    exit={reduce ? { opacity: 0 } : { opacity: 0, y: 10, scale: 0.985, filter: 'blur(4px)' }}
                    transition={{ duration: 0.38, ease: EASE_OUT_SOFT }}
                    className="absolute left-0 top-full z-50 mt-3 w-[880px] origin-top-left overflow-hidden rounded-[20px] border border-[#D7DEEA] bg-white shadow-[0_40px_90px_-30px_rgba(46,47,61,0.45)]"
                  >
                    <div className="grid grid-cols-[1fr_250px]">
                      <div className="grid max-h-[72vh] grid-cols-2 gap-x-6 gap-y-5 overflow-y-auto p-6" data-lenis-prevent>
                        {GROUPED.map((g, gi) => (
                          <div key={g.c}>
                            <p className="mb-2 px-2 text-[10.5px] font-bold uppercase tracking-[0.16em] text-[#46699F]">{g.c}</p>
                            <ul className="flex flex-col gap-0.5">
                              {g.items.map((s, si) => {
                                const img = serviceImage(s.slug);
                                return (
                                  <motion.li
                                    key={s.slug}
                                    initial={reduce ? false : { opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.4, delay: 0.04 + gi * 0.04 + si * 0.025, ease: EASE_OUT_SOFT }}
                                  >
                                    <Link
                                      href={`/services/${s.slug}`}
                                      onClick={() => setServicesOpen(false)}
                                      className="group flex items-center gap-3 rounded-[12px] px-2 py-1.5 transition-colors duration-200 hover:bg-[#E6EFFF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#454659]"
                                    >
                                      <span className="h-10 w-10 flex-shrink-0 overflow-hidden rounded-[10px] bg-[#E6EFFF]">
                                        <img
                                          src={img.src}
                                          alt=""
                                          loading="lazy"
                                          {...responsive(img.src, 'tile')}
                                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                      </span>
                                      <span className="text-[14px] font-medium leading-snug text-[#2E2F3D]">{s.name}</span>
                                    </Link>
                                  </motion.li>
                                );
                              })}
                            </ul>
                          </div>
                        ))}
                      </div>
                      <div className="relative flex flex-col justify-between overflow-hidden bg-[#2E2F3D] p-6 text-white">
                        <div aria-hidden="true" className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-[#46699F]/40 blur-3xl" />
                        <div className="relative">
                          <p className="text-[10.5px] font-bold uppercase tracking-[0.16em] text-[#A9C4EE]">Start here</p>
                          <p className="mt-3 font-heading text-[1.35rem] leading-snug">A free discovery call</p>
                          <p className="mt-2 text-[13px] leading-relaxed text-[#D9E1F0]">
                            Talk it through with Jason directly. No charge, no commitment.
                          </p>
                        </div>
                        <div className="relative mt-6 flex flex-col gap-2">
                          <Link
                            href="/book"
                            onClick={() => setServicesOpen(false)}
                            className="group inline-flex items-center justify-between rounded-[12px] bg-white px-4 py-3 text-[14px] font-semibold text-[#2E2F3D] transition-colors hover:bg-[#E6EFFF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A9C4EE]"
                          >
                            <RollText>Book the call</RollText>
                            <ArrowRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                          </Link>
                          <Link
                            href="/services"
                            onClick={() => setServicesOpen(false)}
                            className="inline-flex items-center justify-between rounded-[12px] border border-white/25 px-4 py-3 text-[14px] font-medium text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A9C4EE]"
                          >
                            All {SERVICES.length} services
                            <ArrowRightIcon className="h-4 w-4" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>
            {NAV_LINKS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onMouseEnter={() => setHoverKey(item.href)}
                className={`relative px-3 py-2 text-sm font-medium rounded-[10px] transition-colors focus-visible:outline-none focus-visible:ring-2 ${ring} focus-visible:ring-offset-2 ${navLink(isActive(item.href))}`}
              >
                {hoverKey === item.href && !reduce ? (
                  <motion.span layoutId="nav-pill" className={`absolute inset-0 -z-10 rounded-[10px] ${pill}`} transition={{ type: 'spring', stiffness: 420, damping: 34 }} />
                ) : null}
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
              className={`group rounded-[10px] px-4 py-2.5 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 ${ring} focus-visible:ring-offset-2 ${overHero ? 'bg-white text-[#2E2F3D] hover:bg-[#E6EFFF]' : 'bg-[#454659] text-white hover:bg-[#33344A]'}`}
            >
              <RollText>Book a Free Call</RollText>
            </Link>
          </div>

          <div className="flex xl:hidden items-center gap-2">
            <a href={`tel:${NAP.phone.replace(/[^\d+]/g, '')}`} aria-label={`Call ${NAP.phone}`} className={`ph-tap-icon inline-flex items-center justify-center p-2 rounded-[10px] focus-visible:outline-none focus-visible:ring-2 ${ring} ${overHero || mobileOpen ? 'text-white' : 'text-[#454659]'}`}>
              <PhoneIcon className="h-5 w-5" />
            </a>
            <button
              type="button"
              onClick={() => setMobileOpen((v) => !v)}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              className={`ph-tap-icon inline-flex items-center justify-center p-2 rounded-[10px] focus-visible:outline-none focus-visible:ring-2 ${ring} ${overHero || mobileOpen ? 'text-white' : 'text-[#2E2F3D]'}`}
            >
              {mobileOpen ? <CloseIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

    </motion.header>

      {/* MOBILE SHEET — full height, dark, large serif links that arrive in a
          stagger. It is a dark band, so it follows the dark-band rules: white
          headings, #D9E1F0 body, #A9C4EE accents, light focus rings. */}
      <AnimatePresence>
        {mobileOpen ? (
          <motion.div
            id="mobile-menu"
            initial={reduce ? false : { clipPath: 'inset(0% 0% 100% 0%)' }}
            animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
            exit={reduce ? { opacity: 0 } : { clipPath: 'inset(0% 0% 100% 0%)' }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            className="xl:hidden fixed inset-x-0 bottom-0 top-20 z-[39] overflow-y-auto bg-[#23242F] sm:top-24"
            data-lenis-prevent
          >
            <nav aria-label="Mobile primary" className="mx-auto flex max-w-[1280px] flex-col px-5 pb-10 pt-4 sm:px-6">
              {[{ label: 'Services', href: '/services' }, ...NAV_LINKS].map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={reduce ? false : { opacity: 0, y: 26 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, delay: 0.18 + i * 0.05, ease: EASE_OUT_SOFT }}
                  className="border-b border-white/10"
                >
                  {item.href === '/services' ? (
                    <>
                      <button
                        type="button"
                        aria-expanded={mobileServicesOpen}
                        onClick={() => setMobileServicesOpen((v) => !v)}
                        className="flex w-full items-center justify-between py-4 font-heading text-[1.75rem] text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A9C4EE]"
                      >
                        Services
                        <ChevronDownIcon className={`h-5 w-5 text-[#A9C4EE] transition-transform ${mobileServicesOpen ? 'rotate-180' : ''}`} />
                      </button>
                      <AnimatePresence initial={false}>
                        {mobileServicesOpen ? (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.4, ease: EASE_OUT_SOFT }}
                            className="overflow-hidden"
                          >
                            <div className="flex flex-col gap-1 pb-4">
                              <Link href="/services" className="ph-tap rounded-[10px] bg-white/8 px-3 py-2.5 text-sm font-semibold text-[#A9C4EE]">
                                All services
                              </Link>
                              {SERVICES.map((s) => (
                                <Link key={s.slug} href={`/services/${s.slug}`} className="ph-tap block rounded-[10px] px-3 py-2 text-[15px] text-[#D9E1F0] hover:bg-white/8">
                                  {s.name}
                                </Link>
                              ))}
                            </div>
                          </motion.div>
                        ) : null}
                      </AnimatePresence>
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      className={`ph-tap flex items-center justify-between py-4 font-heading text-[1.75rem] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A9C4EE] ${isActive(item.href) ? 'text-[#A9C4EE]' : 'text-white'}`}
                    >
                      {item.label}
                      <ArrowRightIcon className="h-5 w-5 text-[#A9C4EE]/70" />
                    </Link>
                  )}
                </motion.div>
              ))}
              <motion.div
                initial={reduce ? false : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.55, ease: EASE_OUT_SOFT }}
                className="mt-8 flex flex-col gap-3"
              >
                <Link
                  href="/book"
                  className="w-full rounded-[12px] bg-white px-4 py-4 text-center text-base font-semibold text-[#2E2F3D] transition-colors hover:bg-[#E6EFFF]"
                >
                  Book a Free Call
                </Link>
                <a
                  href={`tel:${NAP.phone.replace(/[^\d+]/g, '')}`}
                  className="flex w-full items-center justify-center gap-2 rounded-[12px] border border-white/25 px-4 py-4 text-base font-medium text-white"
                >
                  <PhoneIcon className="h-4 w-4" />
                  {NAP.phone}
                </a>
                <p className="mt-2 text-center text-[13px] text-[#A9C4EE]/80">{SERVICE_AREAS.slice(0, 3).map((a) => a.split(',')[0]).join(' · ')} · online statewide</p>
              </motion.div>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
};

export { CATEGORY_ORDER, areaSlug };
