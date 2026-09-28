import type { Metadata } from 'next';
import Link from 'next/link';
import { SERVICES, NAP } from '../../components/content';
import { DESK_LAMP, GALLERY } from '../../components/unsplash';
import { priceLabel } from '../../components/price';
import { ArrowRightIcon, PhoneIcon, CheckIcon, ShieldCheckIcon } from '../../components/Icons';
import { PageHero, heroPrimaryBtn, heroGhostBtn } from '../../components/PageHero';
import { CtaBand } from '../../components/CtaBand';
import { Reveal, SplitHeading, Stagger, StaggerItem } from '../../components/Motion';
import { ImageStrip } from '../../components/Bands';

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
    {
      s: discovery,
      note: 'No charge, no card, no commitment — talk it through before you book anything.',
      points: ['Speak to Jason directly', 'No written intake first', 'No obligation to continue'],
      filled: false,
    },
    {
      s: standard,
      note: 'Most clients engage for 6-8 sessions. The same fee in the South Pasadena office or online statewide.',
      points: ['Same rate in person or by video', 'Typically six to eight sessions', 'HSA/FSA cards accepted'],
      filled: true,
    },
    {
      s: smoking,
      note: 'A single 90-minute session, or a Two-Session Package. Pricing confirmed on your discovery call.',
      points: ['90-minute Quit Smoking Power Session', 'Or a Two-Session Package', 'Figure confirmed on your call'],
      filled: false,
    },
  ];

  return (
    <div>
      <PageHero
        eyebrow="Pricing"
        title="How much does hypnotherapy cost?"
        image={DESK_LAMP}
        size="lg"
        facts={[
          { k: 'Standard session', v: '$200' },
          { k: 'Discovery call', v: 'Free' },
          { k: 'Typical course', v: '6–8 sessions' },
          { k: 'Payment', v: 'Self-pay · HSA/FSA' },
        ]}
        lede={
          <p>
            Published up front. Standard sessions are $200 each, with most clients engaging Jason Meissner for six
            to eight sessions depending on the condition treated.
          </p>
        }
      >
        <Link href="/book" className={heroPrimaryBtn}>
          Book a Free Discovery Call
          <ArrowRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
        <a href={NAP.phoneHref} className={heroGhostBtn}>
          <PhoneIcon className="h-4 w-4" />
          {NAP.phone}
        </a>
      </PageHero>

      {/* THE THREE CARDS -------------------------------------------------- */}
      <section className="bg-[#E6EFFF] py-20 sm:py-28">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
          <Stagger className="mb-14 grid grid-cols-1 gap-6 md:grid-cols-3" gap={0.12}>
            {cards.map((c) => (
              <StaggerItem key={c.s.slug} distance={30}>
                <div
                  className={`flex h-full flex-col rounded-[20px] p-8 transition-all duration-500 hover:-translate-y-1.5 ${
                    c.filled
                      ? 'bg-[#454659] shadow-[0_30px_70px_-30px_rgba(46,47,61,0.7)]'
                      : 'border border-[#D7DEEA] bg-white hover:border-[#46699F]/40'
                  }`}
                >
                  <p
                    className={`mb-5 text-[11.5px] font-bold uppercase tracking-[0.14em] ${
                      c.filled ? 'text-[#A9C4EE]' : 'text-[#46699F]'
                    }`}
                  >
                    {c.s.name}
                  </p>
                  {/*
                    price === null renders the qualifier, never a number.
                    Smoking cessation is genuinely unresolved ($400
                    site-verified vs. $500 verbal, still open after Call 2) and
                    a pricing page is the last place to guess.
                  */}
                  <p
                    className={`font-heading text-[clamp(2.3rem,3.6vw,3.1rem)] leading-none ${
                      c.filled ? 'text-white' : 'text-[#2E2F3D]'
                    }`}
                  >
                    {c.s.price === null ? 'On your call' : c.s.price === 0 ? 'Free' : `$${c.s.price}`}
                  </p>
                  <p className={`mt-3 text-[14px] ${c.filled ? 'text-[#D9E1F0]' : 'text-[#4B5468]'}`}>
                    {c.s.priceQualifier}
                  </p>

                  <ul
                    className={`mt-7 flex flex-col gap-3 border-t pt-7 ${
                      c.filled ? 'border-white/20' : 'border-[#D7DEEA]'
                    }`}
                  >
                    {c.points.map((p) => (
                      <li key={p} className="flex items-start gap-2.5">
                        <CheckIcon
                          className={`mt-0.5 h-4 w-4 flex-shrink-0 ${c.filled ? 'text-[#5DBA47]' : 'text-[#46699F]'}`}
                        />
                        <span className={`text-[14.5px] leading-[1.55] ${c.filled ? 'text-[#D9E1F0]' : 'text-[#4B5468]'}`}>
                          {p}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <p
                    className={`mt-7 flex-1 text-[14.5px] leading-[1.65] ${
                      c.filled ? 'text-[#D9E1F0]' : 'text-[#4B5468]'
                    }`}
                  >
                    {c.note}
                  </p>

                  <Link
                    href={`/services/${c.s.slug}`}
                    className={`mt-7 inline-flex items-center gap-2 text-sm font-semibold transition-colors ${
                      c.filled
                        ? 'text-white hover:text-[#A9C4EE] focus-visible:ring-white focus-visible:ring-offset-[#454659]'
                        : 'text-[#46699F] hover:text-[#2E2F3D] focus-visible:ring-[#454659]'
                    } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2`}
                  >
                    About this service
                    <ArrowRightIcon className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </StaggerItem>
            ))}
          </Stagger>

          {/* FULL PRICE LIST ------------------------------------------------ */}
          <Reveal>
            <div className="rounded-[20px] border border-[#D7DEEA] bg-white p-6 sm:p-9">
              <h2 className="mb-2 font-heading text-[1.6rem] text-[#2E2F3D] sm:text-[1.9rem]">
                Every service, at a glance
              </h2>
              <p className="mb-7 text-[14.5px] text-[#4B5468]">
                All {SERVICES.length} services and what each one costs. Nothing is hidden behind a form.
              </p>
              <ul className="divide-y divide-[#D7DEEA]">
                {SERVICES.map((s) => (
                  <li key={s.slug}>
                    <Link
                      href={`/services/${s.slug}`}
                      className="group flex items-center justify-between gap-6 py-4 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#454659] focus-visible:ring-offset-2"
                    >
                      <span className="flex min-w-0 items-center gap-3">
                        <span className="text-[15px] text-[#2E2F3D] transition-colors group-hover:text-[#46699F]">
                          {s.name}
                        </span>
                        {s.tag ? (
                          <span className="hidden rounded-full bg-[#E6EFFF] px-2.5 py-0.5 text-[10.5px] font-bold uppercase tracking-[0.08em] text-[#46699F] sm:inline">
                            {s.tag}
                          </span>
                        ) : null}
                      </span>
                      {/*
                        THE SHORT LABEL, NOT `priceQualifier`. The qualifier is
                        a full sentence on the unresolved services ("confirmed
                        on your free discovery call"), and sitting in a
                        flex-shrink-0 column it refused to shrink: it blew this
                        row out to 435px inside a 375px viewport, giving the
                        whole page a 60px horizontal scroll off one table row.
                        priceLabel() renders "On your call" instead. The full
                        sentence still appears on the three cards above, where
                        there is room for it.
                      */}
                      <span className="flex flex-shrink-0 items-center gap-3">
                        <span className="whitespace-nowrap text-[15px] font-semibold tabular-nums text-[#2E2F3D]">
                          {priceLabel(s)}
                        </span>
                        <ArrowRightIcon className="h-4 w-4 text-[#46699F] transition-transform duration-300 group-hover:translate-x-1" />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          {/* PAYMENT -------------------------------------------------------- */}
          <Reveal delay={0.1}>
            <div className="mt-6 flex items-start gap-4 rounded-[20px] border border-[#D7DEEA] bg-[#E9F3EF] p-6 sm:p-9">
              <ShieldCheckIcon className="mt-0.5 h-6 w-6 flex-shrink-0 text-[#454659]" />
              <div>
                <h2 className="mb-3 font-heading text-[1.3rem] text-[#2E2F3D] sm:text-[1.5rem]">
                  Self-pay, HSA/FSA-friendly
                </h2>
                <p className="max-w-[70ch] text-[15px] leading-[1.72] text-[#4B5468]">
                  Pasadena Hypnosis does not bill insurance directly &mdash; sessions are self-pay by cash or credit
                  card. HSA and FSA cards work the same as any other credit card at checkout, so many clients are
                  able to use pre-tax health-spending funds even without a direct insurance billing relationship.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <ImageStrip images={GALLERY} speed={92} className="bg-[#E6EFFF] pb-20" />

      <CtaBand
        title="Talk it through first, at no cost"
        body="The discovery call is genuinely free — there is no card, and no session is booked on it unless you want one."
      />
    </div>
  );
}
