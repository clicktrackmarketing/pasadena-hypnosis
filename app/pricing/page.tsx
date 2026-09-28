import type { Metadata } from 'next';
import Link from 'next/link';
import { SERVICES, NAP, type Service } from '../../components/content';
import { DESK_LAMP, GALLERY } from '../../components/unsplash';
import { priceLabel } from '../../components/price';
import { ArrowRightIcon, PhoneIcon } from '../../components/Icons';
import { PageHero, heroPrimaryBtn, heroGhostBtn } from '../../components/PageHero';
import { CtaBand } from '../../components/CtaBand';
import { ImageStrip } from '../../components/Bands';
import { PriceCards, type PriceCard } from '../../components/pages/pricing/PriceCards';
import { PriceTiers } from '../../components/pages/pricing/PriceTiers';
import { PaymentBand } from '../../components/pages/pricing/PaymentBand';

// Target keywords (profile.ts targetKeywords['/pricing']): "hypnotherapy
// cost pasadena", "how much does hypnotherapy cost", "is hypnotherapy
// covered by insurance".
export const metadata: Metadata = {
  title: 'Hypnotherapy Pricing',
  description:
    'Standard hypnotherapy sessions with Pasadena Hypnosis are $200 each, with most clients engaging for 6-8 sessions. Self-pay by cash, credit card, or HSA/FSA card.',
  alternates: { canonical: '/pricing' },
};

/*
 * REDESIGNED 2026-09-28 — one kind of motion per band:
 *   hero      lattice figure, H1 settles in from scale
 *   cards     3D flip-up entrance, cursor spotlight, glow border on the
 *             standard session, prices counting up
 *   tiers     every service grouped by price, as a pinned card stack
 *   payment   pointer-parallax depth field around a particle orb
 *   strip     the existing gallery ticker
 *
 * EVERY PRICE ON THIS PAGE COMES FROM content.ts via priceLabel() or the raw
 * `price` field — including the hero fact strip and the lede, which used to
 * carry a typed "$200". price === null renders the qualifier / "On your call",
 * never a number: smoking cessation is genuinely unresolved ($400
 * site-verified vs. $500 verbal, still open after Call 2) and a pricing page
 * is the last place to guess.
 */

const card = (s: Service, note: string, points: string[], featured: boolean): PriceCard => ({
  slug: s.slug,
  name: s.name,
  tag: s.tag ?? null,
  price: s.price,
  label: priceLabel(s),
  qualifier: s.priceQualifier ?? '',
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
      'No charge, no card, no commitment — talk it through before you book anything.',
      ['Speak to Jason directly', 'No written intake first', 'No obligation to continue'],
      false,
    ),
    card(
      standard,
      'Most clients engage for 6-8 sessions. The same fee in the South Pasadena office or online statewide.',
      ['Same rate in person or by video', 'Typically six to eight sessions', 'HSA/FSA cards accepted'],
      true,
    ),
    card(
      smoking,
      'A single 90-minute session, or a Two-Session Package. Pricing confirmed on your discovery call.',
      ['90-minute Quit Smoking Power Session', 'Or a Two-Session Package', 'Figure confirmed on your call'],
      false,
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
          { k: 'Discovery call', v: priceLabel(discovery) },
          { k: 'Typical course', v: '6–8 sessions' },
          { k: 'Payment', v: 'Self-pay · HSA/FSA' },
        ]}
        lede={
          <p>
            Published up front. Standard sessions are {priceLabel(standard)} each, with most clients engaging Jason
            Meissner for six to eight sessions depending on the condition treated.
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

      <PaymentBand />

      <ImageStrip images={GALLERY} speed={92} className="bg-white py-14 sm:py-20" />

      <CtaBand
        title="Talk it through first, at no cost"
        body="The discovery call is genuinely free — there is no card, and no session is booked on it unless you want one."
      />
    </div>
  );
}
