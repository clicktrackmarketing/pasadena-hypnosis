import type { Metadata } from 'next';
import Link from 'next/link';
import { SERVICES, NAP, REAL_COPY } from '../../components/content';
import { FOLIAGE_PATH, serviceImage } from '../../components/unsplash';
import { OFFICE_INTERIOR, OFFICE_INTERIOR_ALT } from '../../components/assets';
import { PhoneIcon, ArrowRightIcon } from '../../components/Icons';
import { PageHero } from '../../components/PageHero';
import { heroPrimaryBtn, heroGhostBtn } from '../../components/buttons';
import { CtaBand } from '../../components/CtaBand';
import { FeatureGrid } from '../../components/Bands';
import { priceLabel } from '../../components/price';
import { NameTicker, CatalogueGrid } from '../../components/pages/services/HubSections';
import { HUB_SCENE_CYCLE } from '../../components/pages/services/shapes';

// Target keywords (profile.ts targetKeywords['/services']): "hypnotherapist
// pasadena", "hypnotherapy services south pasadena".
export const metadata: Metadata = {
  title: 'Hypnotherapy Services in South Pasadena, CA',
  description:
    'Pasadena Hypnosis LLC offers hypnotherapy in South Pasadena, CA and online, specializing in stress and anxiety, depression and bipolar disorder, smoking cessation, chronic and acute pain, IBS and fibromyalgia, and grief.',
  alternates: { canonical: '/services' },
};

/* The hero's price figures are read off the service records, never retyped:
   the standard session's price and the discovery call's "Free". */
const SESSION = SERVICES.find((s) => s.slug === 'hypnotherapy-sessions');
const CALL = SERVICES.find((s) => s.slug === 'discovery-call');

/*
  REVISED 2026-10-01 from the client's markup round one (#33-#55):
    - the hero no longer counts the services (#74) and its lede is rewritten
      without "diagnosed", "disabling", other hypnotherapists or "statewide"
      (#33);
    - the dark category-panel band is gone. Its category headings were marked
      "Get rid of this" twice (#37, #38), its rows repeated the price on every
      line (#34, #36), and it listed the discovery call among the specialties
      (#34 "This is a mistake obviously"). In its place is the "Hypnotherapy"
      block from his own homepage — in the office, or online at your
      convenience — in his words;
    - the "You do not have to pick the right one first" band is gone (#52
      "Delete this section… They click to call and book a session");
    - the closing band says what he asked it to (#53).

  PAGE ORDER:
    hero        dark    particle spiral cycling through the service figures
    ticker      white   the service names in display serif
    office/online pale  his homepage's two ways to work, with the real office photo
    catalogue   tint    every card flips up in 3D, row by row
    cta         slate   shared CtaBand
*/
export default function ServicesHubPage() {
  const sessionPrice = SESSION ? priceLabel(SESSION) : '';
  const callPrice = CALL ? priceLabel(CALL) : '';
  const online = serviceImage('online-hypnotherapy');

  return (
    <div>
      <PageHero
        eyebrow="Services"
        title="Hypnotherapy services, one South Pasadena office"
        image={FOLIAGE_PATH}
        size="lg"
        scene="spiral"
        sceneCycle={HUB_SCENE_CYCLE}
        intro="scale"
        facts={[
          ...(sessionPrice ? [{ k: 'Standard session', v: sessionPrice }] : []),
          ...(callPrice ? [{ k: 'First call', v: callPrice }] : []),
          { k: 'Format', v: 'In person or online' },
          { k: 'Office', v: 'South Pasadena' },
        ]}
        lede={
          <p>
            Jason Meissner specializes in stress and anxiety, depression and bipolar disorder, smoking cessation,
            chronic and acute pain, IBS and fibromyalgia, and grief. Sessions are in person in South Pasadena, or
            online with clients anywhere.
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

      <NameTicker />

      {/* HYPNOTHERAPY — his homepage's own block, in his own words. */}
      <FeatureGrid
        eyebrow="Hypnotherapy"
        title={REAL_COPY.headers.designed}
        lede={<p>{REAL_COPY.hypnotherapy}</p>}
        tint="pale"
        columns={2}
        items={[
          {
            title: 'In Office Hypnotherapy',
            body: REAL_COPY.inOffice,
            image: { src: OFFICE_INTERIOR, alt: OFFICE_INTERIOR_ALT, credit: 'Pasadena Hypnosis' },
            href: '/contact',
          },
          {
            title: 'Hypnotherapy Online at Your Convenience',
            body: REAL_COPY.online,
            image: online,
            href: '/services/online-hypnotherapy',
          },
        ]}
      />

      {/* EVERY SERVICE — 3D flip grid -------------------------------------- */}
      <CatalogueGrid eyebrow="Services" title={REAL_COPY.headers.serviceInfo} />

      <CtaBand title="Not sure where to start?" body="Call us with whatever you need help with." />
    </div>
  );
}
