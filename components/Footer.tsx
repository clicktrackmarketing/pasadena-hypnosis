import Link from 'next/link';
import { NAP, HOURS, SERVICE_AREAS } from './content';
import { LOGO, LOGO_W, LOGO_H } from './assets';
import { MapPinIcon, ClockIcon, PhoneIcon, MailIcon } from './Icons';

const areaSlug = (a: string) => a.split(',')[0].trim().toLowerCase().replace(/\s+/g, '-');

/** No 'use client' — every link is a real next/link href, so this renders fully on the server. */
export const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-[#2E2F3D] text-[#D9E1F0]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <img src={LOGO} alt="Pasadena Hypnosis" width={LOGO_W} height={LOGO_H} className="h-10 w-auto object-contain mb-4 brightness-0 invert" />
            <p className="text-sm text-[#D9E1F0]/80 leading-relaxed max-w-xs">
              Certified hypnotherapy for the conditions other practices turn away — South Pasadena and by video across California.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-semibold tracking-[0.14em] uppercase text-[#A9C4EE] mb-4">Visit</h4>
            <div className="flex items-start gap-2 text-sm text-[#D9E1F0]/90 mb-3">
              <MapPinIcon className="h-4 w-4 mt-0.5 flex-shrink-0 text-[#A9C4EE]" />
              <span>
                {NAP.street}
                <br />
                {NAP.city}, {NAP.state} {NAP.zip}
              </span>
            </div>
            <a href={`tel:${NAP.phone.replace(/[^\d+]/g, '')}`} className="flex items-center gap-2 text-sm text-[#D9E1F0]/90 hover:text-white mb-3">
              <PhoneIcon className="h-4 w-4 flex-shrink-0 text-[#A9C4EE]" />
              {NAP.phone}
            </a>
            <a href={`mailto:${NAP.email}`} className="flex items-center gap-2 text-sm text-[#D9E1F0]/90 hover:text-white mb-3">
              <MailIcon className="h-4 w-4 flex-shrink-0 text-[#A9C4EE]" />
              {NAP.email}
            </a>
            <div className="flex items-start gap-2 text-sm text-[#D9E1F0]/90">
              <ClockIcon className="h-4 w-4 mt-0.5 flex-shrink-0 text-[#A9C4EE]" />
              <ul>
                {HOURS.map((h) => (
                  <li key={h.days}>
                    {h.days}: {h.time}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-semibold tracking-[0.14em] uppercase text-[#A9C4EE] mb-4">Explore</h4>
            <ul className="flex flex-col gap-2.5 text-sm text-[#D9E1F0]/90">
              <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link href="/services" className="hover:text-white transition-colors">Services</Link></li>
              <li><Link href="/service-areas" className="hover:text-white transition-colors">Service Areas</Link></li>
              <li><Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link></li>
              <li><Link href="/our-team" className="hover:text-white transition-colors">Our Team</Link></li>
              <li><Link href="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
              <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold tracking-[0.14em] uppercase text-[#A9C4EE] mb-4">Service Areas</h4>
            <ul className="flex flex-col gap-2.5 text-sm text-[#D9E1F0]/90 mb-6">
              {SERVICE_AREAS.map((a) => (
                <li key={a}>
                  <Link href={`/service-areas/${areaSlug(a)}`} className="hover:text-white transition-colors">
                    {a.split(',')[0].trim()}
                  </Link>
                </li>
              ))}
            </ul>
            <h4 className="text-xs font-semibold tracking-[0.14em] uppercase text-[#A9C4EE] mb-4">Legal</h4>
            <ul className="flex flex-col gap-2.5 text-sm text-[#D9E1F0]/90">
              <li><Link href="/editorial-policy" className="hover:text-white transition-colors">Editorial Policy</Link></li>
              <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="text-xs text-[#D9E1F0]/60">© {year} Pasadena Hypnosis. All rights reserved.</p>
          <p className="text-xs text-[#D9E1F0]/50 max-w-2xl leading-relaxed">
            Pasadena Hypnosis is a complementary hypnotherapy practice, not a substitute for medical or psychiatric
            care. Jason Meissner is a certified hypnotherapist, not a licensed medical or mental-health clinician.
          </p>
        </div>
      </div>
    </footer>
  );
};
