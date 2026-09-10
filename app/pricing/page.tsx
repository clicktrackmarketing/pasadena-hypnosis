import type { Metadata } from 'next';
import Link from 'next/link';
import { SERVICES, NAP } from '../../components/content';
import { ArrowRightIcon, PhoneIcon } from '../../components/Icons';

// Target keywords (profile.ts targetKeywords['/pricing']): "hypnotherapy
// cost pasadena", "how much does hypnotherapy cost", "is hypnotherapy
// covered by insurance".
export const metadata: Metadata = {
  title: 'Hypnotherapy Pricing',
  description:
    'Standard hypnotherapy sessions with Pasadena Hypnosis are $200 each, with most clients engaging for 6-8 sessions. Self-pay by cash, credit card, or HSA/FSA card.',
  alternates: { canonical: '/pricing' },
};

export default function PricingPage() {
  const discovery = SERVICES.find((s) => s.slug === 'discovery-call')!;
  const standard = SERVICES.find((s) => s.slug === 'hypnotherapy-sessions')!;
  const smoking = SERVICES.find((s) => s.slug === 'smoking-cessation')!;
  const cards = [
    { s: discovery, note: 'No charge, no card, no commitment — talk it through before you book anything.', filled: false },
    { s: standard, note: 'Most clients engage for 6-8 sessions. The same fee in the South Pasadena office or online statewide.', filled: true },
    { s: smoking, note: 'A single 90-minute session, or a Two-Session Package. Pricing confirmed on your discovery call.', filled: false },
  ];

  return (
    <div>
      <section className="bg-white">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <p className="font-body text-xs sm:text-sm font-semibold tracking-[0.14em] uppercase text-[#46699F] mb-4">Pricing</p>
          <h1 className="font-heading text-4xl sm:text-5xl leading-[1.1] text-[#2E2F3D] mb-6 max-w-2xl">How much does hypnotherapy cost?</h1>
          <p className="text-base sm:text-lg text-[#4B5468] leading-relaxed max-w-2xl">
            Published up front. Standard sessions are $200 each, with most clients engaging Jason Meissner for 6-8
            sessions depending on the condition treated.
          </p>
        </div>
      </section>

      <section className="bg-[#E6EFFF] py-14 sm:py-20">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {cards.map((c) => (
              <div key={c.s.slug} className={`rounded-[14px] p-8 ${c.filled ? 'bg-[#454659]' : 'bg-white border border-[#D7DEEA]'}`}>
                <p className={`text-xs font-semibold tracking-[0.14em] uppercase mb-4 ${c.filled ? 'text-[#D9E1F0]' : 'text-[#46699F]'}`}>{c.s.name}</p>
                <p className={`font-heading text-[clamp(2.25rem,3.6vw,3rem)] mb-1 ${c.filled ? 'text-white' : 'text-[#2E2F3D]'}`}>
                  {c.s.price === null ? 'Confirm on call' : c.s.price === 0 ? 'Free' : `$${c.s.price}`}
                </p>
                <p className={`text-sm mb-6 ${c.filled ? 'text-[#D9E1F0]' : 'text-[#4B5468]'}`}>{c.s.priceQualifier}</p>
                <p className={`border-t pt-6 text-[15px] leading-[1.6] ${c.filled ? 'border-white/25 text-[#D9E1F0]' : 'border-[#D7DEEA] text-[#4B5468]'}`}>
                  {c.note}
                </p>
              </div>
            ))}
          </div>

          <div className="bg-white border border-[#D7DEEA] rounded-[14px] p-6 sm:p-8 mb-10">
            <h2 className="font-heading text-xl sm:text-2xl text-[#2E2F3D] mb-4">Every service, at a glance</h2>
            <div className="divide-y divide-[#D7DEEA]">
              {SERVICES.map((s) => (
                <Link key={s.slug} href={`/services/${s.slug}`} className="flex items-center justify-between gap-4 py-3 hover:text-[#46699F] transition-colors group">
                  <span className="text-sm sm:text-base text-[#2E2F3D] group-hover:text-[#46699F]">{s.name}</span>
                  <span className="ph-nums text-sm font-medium text-[#4B5468] flex-shrink-0">
                    {s.price === null ? s.priceQualifier : s.price === 0 ? 'Free' : `$${s.price}`}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          <div className="bg-[#E9F3EF] border border-[#D7DEEA] rounded-[14px] p-6 sm:p-8">
            <h2 className="font-heading text-lg sm:text-xl text-[#2E2F3D] mb-2">Self-pay, HSA/FSA-friendly</h2>
            <p className="text-sm sm:text-base text-[#4B5468] leading-relaxed">
              Pasadena Hypnosis does not bill insurance directly — sessions are self-pay by cash or credit card. HSA
              and FSA cards work the same as any other credit card at checkout, so many clients are able to use
              pre-tax health-spending funds even without a direct insurance billing relationship.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[#454659] py-14">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <h2 className="font-heading text-2xl sm:text-3xl text-white">Talk it through first, at no cost</h2>
          <div className="flex flex-wrap gap-3">
            <Link href="/book" className="inline-flex items-center gap-2 rounded-[10px] bg-white text-[#454659] px-6 py-3.5 text-sm sm:text-base font-medium hover:bg-[#E6EFFF] transition-colors">
              Book a Free Discovery Call
              <ArrowRightIcon className="h-4 w-4" />
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
