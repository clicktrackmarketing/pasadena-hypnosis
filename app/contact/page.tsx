import type { Metadata } from 'next';
import { NAP, HOURS } from '../../components/content';
import { OFFICE_INTERIOR, OFFICE_INTERIOR_ALT } from '../../components/assets';
import { ClockIcon, MapPinIcon, PhoneIcon, MailIcon } from '../../components/Icons';
import { BookingForm } from '../../components/BookingForm';

// Target keywords (profile.ts targetKeywords['/contact']): "pasadena hypnosis
// contact", "hypnotherapy south pasadena phone".
export const metadata: Metadata = {
  title: 'Contact Pasadena Hypnosis',
  description: `Call ${NAP.phone}, book a free discovery call, or visit Pasadena Hypnosis at ${NAP.street} in ${NAP.city}, CA.`,
  alternates: { canonical: '/contact' },
};

export default function ContactPage() {
  return (
    <div>
      <section className="bg-white">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <p className="font-body text-xs sm:text-sm font-semibold tracking-[0.14em] uppercase text-[#46699F] mb-4">Contact</p>
          <h1 className="font-heading text-4xl sm:text-5xl leading-[1.1] text-[#2E2F3D] mb-4 max-w-2xl">Get in touch</h1>
          <p className="text-base sm:text-lg text-[#4B5468] leading-relaxed max-w-2xl">
            Call, book a free discovery call online, or visit the South Pasadena office directly.
          </p>
        </div>
      </section>

      <section className="bg-[#E6EFFF] py-10 sm:py-16">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-8 lg:gap-12">
          <div className="bg-white border border-[#D7DEEA] rounded-[14px] p-6 sm:p-8 flex flex-col gap-6">
            <div className="flex items-start gap-3">
              <MapPinIcon className="h-5 w-5 text-[#454659] flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-[#2E2F3D]">{NAP.street}</p>
                <p className="text-[#2E2F3D]">{NAP.city}, {NAP.state} {NAP.zip}</p>
                <a href={NAP.directions} target="_blank" rel="noopener noreferrer" className="text-xs text-[#46699F] hover:text-[#2E2F3D] mt-1 inline-block">
                  Get directions
                </a>
              </div>
            </div>
            <a href={`tel:${NAP.phone.replace(/[^\d+]/g, '')}`} className="flex items-start gap-3 hover:text-[#46699F] transition-colors">
              <PhoneIcon className="h-5 w-5 text-[#454659] flex-shrink-0 mt-0.5" />
              <span className="text-[#2E2F3D] font-medium">{NAP.phone}</span>
            </a>
            <a href={`mailto:${NAP.email}`} className="flex items-start gap-3 hover:text-[#46699F] transition-colors">
              <MailIcon className="h-5 w-5 text-[#454659] flex-shrink-0 mt-0.5" />
              <span className="text-[#2E2F3D] font-medium">{NAP.email}</span>
            </a>
            <div className="flex items-start gap-3">
              <ClockIcon className="h-5 w-5 text-[#454659] flex-shrink-0 mt-0.5" />
              <ul className="text-[#2E2F3D]">
                {HOURS.map((h) => (
                  <li key={h.days}>{h.days}: {h.time}</li>
                ))}
              </ul>
            </div>
            <img src={OFFICE_INTERIOR} alt={OFFICE_INTERIOR_ALT} className="w-full aspect-[4/3] object-cover rounded-[10px]" />
          </div>

          <BookingForm />
        </div>
      </section>
    </div>
  );
}
