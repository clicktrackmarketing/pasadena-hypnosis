'use client';

/* ---------------------------------------------------------------------------
   PRICING — "EVERY SERVICE, AT A GLANCE", as a pinned comparison
   (redesigned 2026-09-28; replaces the single long price list).

   SIGNATURE MOTION FOR THIS SECTION: the services are grouped by what they
   cost, and each price tier is a card that pins near the top of the viewport
   while the next slides over it (StickyStack), the earlier ones receding.
   On desktop the heading column stays pinned beside the stack and a small
   index tracks which tier is on top.

   NOTHING HERE IS TYPED. The tiers are BUILT from SERVICES: every service is
   filed under its own priceLabel(), so a price edited in content.ts moves the
   service to the right tier on its own. The big figure on each tier is a
   <Counter> over the raw numeric field (its final string is identical to
   priceLabel), or the label itself for "Free" and "On your call". Where a
   tier's services do not share a qualifier — the two unresolved prices are
   "confirmed on your free discovery call" and "confirmed directly with
   Jason" — each service shows its own.

   HEIGHT DISCIPLINE. A sticky card taller than the viewport hides its own
   lower half behind the next card, so the big tier (ten services) lays its
   services out as wrapping chips rather than a one-per-row list; the tallest
   card stays well inside a 375 x 667 phone.
--------------------------------------------------------------------------- */

import Link from 'next/link';
import { useRef, useState } from 'react';
import { useMotionValueEvent } from 'motion/react';
import { SERVICES, type Service } from '../../content';
import { priceLabel } from '../../price';
import { ArrowRightIcon } from '../../Icons';
import { Counter, Reveal, SplitHeading, SectionProgressBar, useScroll } from '../../Motion';
import { StickyStack } from '../../MotionFx';

type Tier = { label: string; price: number | null; items: Service[] };

const rank = (p: number | null) => (p === null ? Number.POSITIVE_INFINITY : p);

const TIERS: Tier[] = (() => {
  const byLabel = new Map<string, Tier>();
  for (const s of SERVICES) {
    const label = priceLabel(s);
    const t = byLabel.get(label) ?? { label, price: s.price, items: [] };
    t.items.push(s);
    byLabel.set(label, t);
  }
  return [...byLabel.values()].sort((a, b) => rank(a.price) - rank(b.price));
})();

/* One skin per tier, in price order. Every pairing below is from the token
   set's verified list: ink on mint / tint / white, white + #D9E1F0 + #A9C4EE
   on the dark ground. */
const SKINS = [
  { card: 'bg-[#E9F3EF]', ink: 'text-[#2E2F3D]', body: 'text-[#4B5468]', accent: 'text-[#46699F]', chip: 'border-[#2E2F3D]/15 bg-white/70 text-[#2E2F3D] hover:border-[#46699F] hover:bg-white', ring: 'focus-visible:ring-[#454659]' },
  { card: 'bg-[#2E2F3D]', ink: 'text-white', body: 'text-[#D9E1F0]', accent: 'text-[#A9C4EE]', chip: 'border-white/15 bg-white/[0.06] text-white hover:border-[#A9C4EE] hover:bg-white/[0.12]', ring: 'focus-visible:ring-[#A9C4EE] focus-visible:ring-offset-[#2E2F3D]' },
  { card: 'bg-[#E6EFFF]', ink: 'text-[#2E2F3D]', body: 'text-[#4B5468]', accent: 'text-[#46699F]', chip: 'border-[#2E2F3D]/15 bg-white/80 text-[#2E2F3D] hover:border-[#46699F] hover:bg-white', ring: 'focus-visible:ring-[#454659]' },
  { card: 'border border-[#D7DEEA] bg-white', ink: 'text-[#2E2F3D]', body: 'text-[#4B5468]', accent: 'text-[#46699F]', chip: 'border-[#2E2F3D]/15 bg-[#F7F9FC] text-[#2E2F3D] hover:border-[#46699F] hover:bg-white', ring: 'focus-visible:ring-[#454659]' },
] as const;

const sharedQualifier = (t: Tier) => {
  const qs = new Set(t.items.map((s) => s.priceQualifier ?? ''));
  if (qs.size !== 1) return null;
  const q = [...qs][0];
  // "Free" / "free" says nothing the figure has not already said.
  return q && q.toLowerCase() !== t.label.toLowerCase() ? q : null;
};

const TierCard = ({ t, i }: { t: Tier; i: number }) => {
  const skin = SKINS[i % SKINS.length];
  const numeric = typeof t.price === 'number' && t.price > 0;
  const shared = sharedQualifier(t);
  const perItem = shared === null && t.items.some((s) => s.priceQualifier && s.priceQualifier.toLowerCase() !== t.label.toLowerCase());

  return (
    <article
      className={`rounded-[28px] p-6 shadow-[0_-24px_60px_-44px_rgba(31,32,48,0.6),0_30px_70px_-50px_rgba(31,32,48,0.55)] sm:p-10 ${skin.card}`}
    >
      <div className="grid grid-cols-1 gap-6 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-10">
        <div>
          <p className={`flex items-center gap-3 text-[11.5px] font-bold uppercase tracking-[0.18em] ${skin.accent}`}>
            <span aria-hidden="true" className="font-heading text-[13px] tracking-normal tabular-nums">
              {String(i + 1).padStart(2, '0')}
            </span>
            <span aria-hidden="true" className="inline-block h-px w-6 bg-current opacity-50" />
            {t.items.length} {t.items.length === 1 ? 'service' : 'services'}
          </p>
          <h3 className={`mt-4 font-heading leading-none tracking-[-0.02em] ${skin.ink} ${numeric ? 'text-[clamp(3.4rem,8vw,5.6rem)] tabular-nums' : 'text-[clamp(2.4rem,5.5vw,3.6rem)]'}`}>
            {numeric ? (
              <>
                {/* sr-only label + hidden ticker: see the note in PriceCards. */}
                <span className="sr-only">{t.label}</span>
                <span aria-hidden="true">
                  <Counter to={t.price as number} prefix="$" duration={1.4} />
                </span>
              </>
            ) : (
              t.label
            )}
          </h3>
          {shared ? <p className={`mt-3 text-[15px] ${skin.body}`}>{shared}</p> : null}
        </div>

        {perItem ? (
          <ul className="flex flex-col gap-3 self-center">
            {t.items.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/services/${s.slug}`}
                  className={`group flex items-start justify-between gap-4 rounded-[16px] border px-5 py-4 transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${skin.chip} ${skin.ring}`}
                >
                  <span className="min-w-0">
                    <span className="block text-[15px] font-medium">{s.name}</span>
                    {s.priceQualifier ? (
                      <span className={`mt-1 block text-[13.5px] leading-[1.5] ${skin.body}`}>{s.priceQualifier}</span>
                    ) : null}
                  </span>
                  <ArrowRightIcon className="mt-1 h-4 w-4 flex-shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <ul className="flex flex-wrap content-center gap-2.5">
            {t.items.map((s) => (
              <li key={s.slug} className="max-w-full">
                <Link
                  href={`/services/${s.slug}`}
                  className={`ph-tap group inline-flex max-w-full items-center gap-2 rounded-full border px-4 py-2.5 text-[14px] font-medium transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${skin.chip} ${skin.ring}`}
                >
                  <span className="min-w-0">{s.name}</span>
                  {s.tag ? (
                    <span className={`hidden whitespace-nowrap text-[11px] font-bold uppercase tracking-[0.08em] sm:inline ${skin.accent}`}>
                      {s.tag}
                    </span>
                  ) : null}
                  <ArrowRightIcon className="h-3.5 w-3.5 flex-shrink-0 transition-transform duration-300 group-hover:translate-x-0.5" />
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </article>
  );
};

export const PriceTiers = () => {
  const stackRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: stackRef, offset: ['start 40%', 'end 75%'] });
  const [active, setActive] = useState(0);
  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    const i = Math.min(TIERS.length - 1, Math.max(0, Math.floor(v * TIERS.length)));
    setActive((prev) => (prev === i ? prev : i));
  });

  return (
    <section className="relative bg-white py-16 sm:py-28">
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:gap-14 lg:px-8">
        {/* Pinned heading column */}
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-32">
            <SplitHeading
              text="Every service, at a glance"
              className="font-heading text-[2.2rem] sm:text-[2.9rem] lg:text-[3.3rem] leading-[1.08] tracking-[-0.018em] text-[#2E2F3D]"
            />
            <Reveal delay={0.12}>
              <p className="mt-5 max-w-[40ch] text-[16px] leading-[1.7] text-[#4B5468]">
                All {SERVICES.length} services and what each one costs. Nothing is hidden behind a form.
              </p>
            </Reveal>

            {/* Tier index — decorative; the cards carry the content. */}
            <Reveal delay={0.2} className="hidden lg:block">
              <div aria-hidden="true" className="mt-12 text-[#46699F]">
                <SectionProgressBar progress={scrollYProgress} />
                <ol className="mt-6 flex flex-col gap-1">
                  {TIERS.map((t, i) => (
                    <li
                      key={t.label}
                      className={`flex items-baseline gap-4 rounded-[12px] px-3 py-2.5 transition-all duration-500 ${
                        active === i ? 'translate-x-2 bg-[#E6EFFF]' : ''
                      }`}
                    >
                      <span className="w-6 font-heading text-[13px] tabular-nums text-[#46699F]">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span
                        className={`font-heading text-[1.35rem] transition-colors duration-500 ${
                          active === i ? 'text-[#2E2F3D]' : 'text-[#4B5468]/70'
                        }`}
                      >
                        {t.label}
                      </span>
                      <span className="ml-auto text-[12px] text-[#4B5468]">{t.items.length}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </Reveal>
          </div>
        </div>

        {/* The stack */}
        <div ref={stackRef} className="lg:col-span-8">
          <StickyStack top={112} gap={24}>
            {TIERS.map((t, i) => (
              <TierCard key={t.label} t={t} i={i} />
            ))}
          </StickyStack>
        </div>
      </div>
    </section>
  );
};
