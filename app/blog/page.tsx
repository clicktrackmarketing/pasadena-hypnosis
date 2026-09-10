import type { Metadata } from 'next';
import Link from 'next/link';
import { NAP } from '../../components/content';
import { PhoneIcon } from '../../components/Icons';

// Target keywords (profile.ts targetKeywords['/blog']): "hypnotherapy blog los angeles".
export const metadata: Metadata = {
  title: 'Insights',
  description: 'Hypnotherapy insights from Pasadena Hypnosis — coming soon.',
  alternates: { canonical: '/blog' },
};

// Call 2 Content & Services Brief §8 (2026-09-10) — real planned topics, not
// fabricated posts. No dates, authors or excerpts are invented for these;
// they render as "coming soon" until actually written.
const PLANNED_TOPICS = [
  'Depression and hypnotherapy: what it actually looks like in session',
  'Living with disabling anxiety — when talk therapy and medication aren’t enough',
  'Does hypnosis really work to quit smoking?',
  'Gut-directed hypnotherapy for IBS: the evidence-based term your gastroenterologist may already know',
  'What chronic pain patients wish their doctor understood about the "pain alarm"',
  'Grief after loss: when it doesn’t get better on its own',
  'How much does hypnotherapy cost, and is it covered by insurance/HSA?',
  'What makes gut-directed / clinical hypnotherapy different from stage hypnosis',
];

export default function BlogIndexPage() {
  return (
    <div>
      <section className="bg-white">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <p className="font-body text-xs sm:text-sm font-semibold tracking-[0.14em] uppercase text-[#46699F] mb-4">Insights</p>
          <h1 className="font-heading text-4xl sm:text-5xl leading-[1.1] text-[#2E2F3D] mb-6 max-w-2xl">Hypnotherapy insights</h1>
          <p className="text-base sm:text-lg text-[#4B5468] leading-relaxed max-w-2xl">
            The first posts are on the way. In the meantime, call the office directly with any question.
          </p>
        </div>
      </section>

      <section className="bg-[#E6EFFF] py-14 sm:py-20">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 gap-5">
          {PLANNED_TOPICS.map((t) => (
            <div key={t} className="bg-white border border-[#D7DEEA] rounded-[14px] p-6">
              <span className="inline-block text-[11px] font-semibold tracking-wide uppercase text-[#46699F] mb-3">Coming soon</span>
              <p className="font-heading text-lg text-[#2E2F3D]">{t}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[#454659] py-14">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <h2 className="font-heading text-2xl sm:text-3xl text-white">Have a question now?</h2>
          <div className="flex flex-wrap gap-3">
            <Link href="/faq" className="inline-flex items-center gap-2 rounded-[10px] bg-white text-[#454659] px-6 py-3.5 text-sm sm:text-base font-medium hover:bg-[#E6EFFF] transition-colors">
              View FAQ
            </Link>
            <a href={`tel:${NAP.phone.replace(/[^\d+]/g, '')}`} className="inline-flex items-center gap-2 rounded-[10px] border border-white text-white px-6 py-3.5 text-sm sm:text-base font-medium hover:bg-white/10 transition-colors">
              <PhoneIcon className="h-4 w-4" />
              {NAP.phone}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
