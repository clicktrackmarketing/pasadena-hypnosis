/* ---------------------------------------------------------------------------
   BOOKING CALENDAR BAND — a service's own Wix booking calendar, on its page.

   WIX_CALENDAR maps this site's service slugs to Jason's Wix Bookings slugs
   (pasadenahypnosis.com/booking-calendar/<wix slug>), taken from his live
   site's service list on 2026-10-16. Two of his specialties have no calendar
   of their own on Wix, so they book the general 60-minute Hypnotherapy
   Session, which is what those sessions are. past-life-regression exists on
   Wix but was removed from this site (markup #19, #51).
--------------------------------------------------------------------------- */

import { SERVICES } from './content';
import { Reveal, SplitHeading } from './Motion';
import { WixCalendar } from './WixCalendar';

export const WIX_CALENDAR: Record<string, string> = {
  'depression-bipolar-support': 'hypnotherapy-sessions',
  'stress-and-anxiety': 'stress-and-anxiety',
  'smoking-cessation': 'smoking-cessation',
  'chronic-pain': 'chronic-pain',
  ibs: 'ibs',
  'grief-and-loss': 'hypnotherapy-sessions',
  'hypnotherapy-sessions': 'hypnotherapy-sessions',
  'online-hypnotherapy': 'online-hypnotherapy',
  'discovery-call': 'discovery-call',
  'childhood-stress-anxiety': 'childhood-stress-anxiety-1',
  'testing-and-academic-performance': 'testing-and-academic-performance',
  'sports-performance': 'sports-performance-1',
};

export const BookingCalendarBand = ({ slug }: { slug: string }) => {
  const wixSlug = WIX_CALENDAR[slug];
  const service = SERVICES.find((s) => s.slug === slug);
  if (!wixSlug || !service) return null;
  const booksGeneral = wixSlug === 'hypnotherapy-sessions' && slug !== 'hypnotherapy-sessions';
  const heading = slug === 'discovery-call' ? 'Book your free discovery call' : `Book ${booksGeneral ? 'a hypnotherapy session' : service.name}`;

  return (
    <section id="book" className="scroll-mt-24 bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-[1100px] px-4 sm:px-6 lg:px-8">
        <SplitHeading
          text={heading}
          className="font-heading text-[2.1rem] leading-[1.1] tracking-[-0.018em] text-[#2E2F3D] sm:text-[2.8rem]"
        />
        <p className="mt-4 max-w-[60ch] text-[16px] leading-[1.7] text-[#4B5468] sm:text-[17px]">
          Pick a day and time that works for you.
        </p>
        <Reveal delay={0.08}>
          <div className="mt-10">
            <WixCalendar wixSlug={wixSlug} title={`${heading} - booking calendar`} />
          </div>
        </Reveal>
      </div>
    </section>
  );
};
