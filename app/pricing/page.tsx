import type { Metadata } from 'next';
import Link from 'next/link';
import { SERVICES, NAP, REAL_COPY, type Service } from '../../components/content';
import { DESK_LAMP, GALLERY } from '../../components/unsplash';
import { priceLabel } from '../../components/price';
import { ArrowRightIcon, PhoneIcon } from '../../components/Icons';
import { PageHero } from '../../components/PageHero';
import { heroPrimaryBtn, heroGhostBtn } from '../../components/buttons';
import { CtaBand } from '../../components/CtaBand';
import { ImageStrip } from '../../components/Bands';
import { PriceCards, type PriceCard } from '../../components/pages/pricing/PriceCards';
import { PriceTiers } from '../../components/pages/pricing/PriceTiers';

// Target keywords (profile.ts targetKeywords['/pricing']): "hypnotherapy
// cost pasadena", "how much does hypnotherapy cost".
export const metadata: Metadata = {
  title: 'Hypnotherapy Pricing',
  description:
    'Hypnotherapy sessions with Pasadena Hypnosis are $200 each, the same in the office or online. Smoking cessation is $400, and the discovery call is free.',
  alternates: { canonical: '/pricing' },
};

/*
 * REDESIGNED 2026-09-28 — one kind of motion per band:
 *   hero      lattice figure, H1 settles in from scale
 *   cards     3D flip-up entrance, cursor spotlight, glow border on the
 *             standard session, prices counting up
 *   tiers     every service grouped by price, as a pinned card stack
 *   strip     the existing gallery ticker
 *
 * REVISED 2026-10-01 from the client's markup round one (#56-#67):
 *   - no "6-8 sessions" anywhere on the page (#56, #60);
 *   - no HSA/FSA anywhere — the payment band that carried it is gone, and
 *     with it the hero's payment fact (#57, #61, #67);
 *   - smoking cessation is $400, as published (#58), with no session timing
 *     and no "figure confirmed on your call" (#59);
 *   - the standard-session card sells the session instead of describing the
 *     page (#62).
 *
 * EVERY PRICE ON THIS PAGE COMES FROM content.ts via priceLabel() or the raw
 * `price` field — including the hero fact strip and the lede.
 */

const card = (s: Service, note: string, points: string[], featured: boolean, qualifier?: string): PriceCard => ({
  slug: s.slug,
  name: s.name,
  tag: s.tag ?? null,
  price: s.price,
  label: priceLabel(s),
  qualifier: qualifier ?? s.priceQualifier ?? '',
  note,
  points,
  featured,
});

export default function PricingPage() {
  const discovery = SERVICES.find((s) => s.slug === 'discovery-call')!;
  const standard = SERVICES.find((s) => s.slug === 'hypnotherapy-sessions')!;
  const smoking = SERVICES.find((s) => s.slug === 'smoking-cessation')!;

  const cards: PriceCard[] = [
    card(
      discovery,
      'Talk through your situation with Jason before you book a session.',
      ['Speak with Jason directly', 'Discuss what you need', 'Plan what we can accomplish together'],
      false,
      // The figure already says Free; the sub-label says what it is.
      'A call with Jason',
    ),
    card(
      standard,
      REAL_COPY.hypnotherapy,
      ['A 60-minute session', 'Specifically designed for you', 'Same rate in the office or online'],
      true,
    ),
    card(
      smoking,
      REAL_COPY.quitSmoking.money,
      ['One-Session Quit Day', 'Support calls included', 'A back up office session if needed'],
      false,
      // The booking widget's own name for it, minus the timing (#59).
      'Quit Smoking Power Session',
    ),
  ];

  return (
    <div>
      <PageHero
        eyebrow="Pricing"
        title="How much does hypnotherapy cost?"
        image={DESK_LAMP}
        size="lg"
        scene="lattice"
        intro="scale"
        facts={[
          { k: 'Standard session', v: priceLabel(standard) },
          { k: 'Smoking cessation', v: priceLabel(smoking) },
          { k: 'Discovery call', v: priceLabel(discovery) },
          { k: 'Format', v: 'In person or online' },
        ]}
        lede={
          <p>
            Hypnotherapy sessions are {priceLabel(standard)} each, and smoking cessation is {priceLabel(smoking)}.{' '}
            {REAL_COPY.charges} Please call if you need more information.
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

      <PriceCards cards={cards} />

      <PriceTiers />

      <ImageStrip images={GALLERY} speed={92} className="bg-white py-14 sm:py-20" />

      <CtaBand
        title="Talk it through first, at no cost"
        body="The discovery call is free. Don’t hesitate to call with any questions you might have."
      />
    </div>
  );
}
