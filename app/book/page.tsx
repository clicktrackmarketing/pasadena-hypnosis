import type { Metadata } from 'next';
import { NAP } from '../../components/content';
import { PhoneIcon, ShieldCheckIcon } from '../../components/Icons';
import { BookingForm } from '../../components/BookingForm';

// Target keywords (profile.ts targetKeywords['/book']): "book hypnotherapy
// appointment pasadena".
export const metadata: Metadata = {
  title: 'Book a Free Discovery Call',
  description:
    'A free, no-obligation discovery call with Jason Meissner to talk through your situation before booking a paid hypnotherapy session.',
  alternates: { canonical: '/book' },
};

export default function BookPage() {
  return (
    <div>
      <section className="bg-white">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          <div>
            <p className="font-body text-xs sm:text-sm font-semibold tracking-[0.14em] uppercase text-[#46699F] mb-4">Book</p>
            <h1 className="font-heading text-4xl sm:text-5xl leading-[1.1] text-[#2E2F3D] mb-6">Book a free discovery call</h1>
            <p className="text-base sm:text-lg text-[#4B5468] leading-relaxed mb-6">
              A no-cost conversation with Jason Meissner to talk through your situation before booking a paid
              hypnotherapy session — in person in South Pasadena or online anywhere in California, with no
              obligation to continue afterward.
            </p>
            <div className="flex items-start gap-3 rounded-[14px] border border-[#D7DEEA] bg-[#E6EFFF] p-5 mb-6">
              <ShieldCheckIcon className="h-5 w-5 text-[#454659] flex-shrink-0 mt-0.5" />
              <p className="text-sm text-[#2E2F3D] leading-relaxed">
                Pasadena Hypnosis is a complementary practice, not a substitute for medical or psychiatric care.
              </p>
            </div>
            <a href={`tel:${NAP.phone.replace(/[^\d+]/g, '')}`} className="inline-flex items-center gap-2 text-sm font-medium text-[#46699F] hover:text-[#2E2F3D]">
              <PhoneIcon className="h-4 w-4" />
              Or call {NAP.phone} directly
            </a>
          </div>
          <BookingForm />
        </div>
      </section>
    </div>
  );
}
