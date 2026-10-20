import type { Metadata } from 'next';
import Link from 'next/link';
import { NAP, SERVICES } from '../components/content';
import { PINE_FOREST } from '../components/unsplash';
import { ArrowRightIcon, PhoneIcon } from '../components/Icons';
import { PageHero } from '../components/PageHero';
import { heroPrimaryBtn, heroGhostBtn } from '../components/buttons';

/* Custom 404 (launch audit 2026-10-20). The default one said "This page could
   not be found." with no way forward. Old Wix URLs that still exist are
   redirected in next.config.mjs; anything else lands here. */
export const metadata: Metadata = {
  title: 'Page not found',
  robots: { index: false, follow: true },
};

const POPULAR = ['stress-and-anxiety', 'depression-bipolar-support', 'smoking-cessation', 'chronic-pain'];

export default function NotFound() {
  const popular = POPULAR.map((slug) => SERVICES.find((s) => s.slug === slug)).filter(
    (s): s is (typeof SERVICES)[number] => Boolean(s),
  );
  return (
    <div>
      <PageHero
        eyebrow="Page not found"
        title="We could not find that page"
        image={PINE_FOREST}
        size="sm"
        scene="wave"
        intro="blur"
        lede={<p>The page may have moved when the site was rebuilt. These will get you where you were going.</p>}
      >
        <Link href="/" className={heroPrimaryBtn}>
          Go to the homepage
          <ArrowRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
        <a href={NAP.phoneHref} className={`group ${heroGhostBtn}`}>
          <PhoneIcon className="h-4 w-4" />
          {NAP.phone}
        </a>
      </PageHero>

      <section className="bg-white py-14 sm:py-20">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-[1.6rem] text-[#2E2F3D]">Popular pages</h2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { href: '/book', label: 'Book a free discovery call' },
              { href: '/services', label: 'All services' },
              ...popular.map((s) => ({ href: `/services/${s.slug}`, label: s.name })),
              { href: '/pricing', label: 'Pricing' },
              { href: '/contact', label: 'Contact & directions' },
            ].map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="group flex items-center justify-between rounded-[14px] border border-[#D7DEEA] px-5 py-4 text-[15px] font-medium text-[#2E2F3D] transition-colors hover:border-[#46699F] hover:bg-[#E6EFFF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#454659]"
                >
                  {l.label}
                  <ArrowRightIcon className="h-4 w-4 text-[#46699F] transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
