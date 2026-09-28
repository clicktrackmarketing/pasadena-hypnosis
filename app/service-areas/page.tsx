import type { Metadata } from 'next';
import Link from 'next/link';
import { NAP } from '../../components/content';
import { PALMS_DAYLIGHT } from '../../components/unsplash';
import { ArrowRightIcon, PhoneIcon } from '../../components/Icons';
import { PageHero } from '../../components/PageHero';
import { heroPrimaryBtn, heroGhostBtn } from '../../components/buttons';
import { CtaBand } from '../../components/CtaBand';
import { Magnetic } from '../../components/Motion';
import { RollText } from '../../components/MotionFx';
import { AreasMarquee, CityBento, OnlineDepth } from '../../components/pages/service-areas/HubSections';

// Target keywords (profile.ts targetKeywords['/service-areas']): "hypnotherapy
// near me", "hypnosis near me los angeles" — Call 2 brief's stated single
// biggest unclaimed opportunity (~6,600/mo combined, low-moderate difficulty).
export const metadata: Metadata = {
  title: 'Hypnotherapy Service Areas Near South Pasadena, CA',
  description:
    'Pasadena Hypnosis sees clients in person from a South Pasadena office and serves Pasadena, South Pasadena, Glendale, Eagle Rock and Arcadia, plus online statewide.',
  alternates: { canonical: '/service-areas' },
};

/*
 * REDESIGNED 2026-09-28 — each band moves differently:
 *   hero      a turning particle globe (hovering it lays the foothills flat);
 *             the H1 slides up out of a mask
 *   marquee   the five city names in display type, speed and lean tied to
 *             the scroll wheel, with the online route running the other way
 *   cities    cards swing in from alternating sides
 *   online    layered pictures that part under the pointer
 *
 * FIVE CITIES, AND NOT NINE. The original audit assumed a drive-time radius
 * that included Alhambra, Altadena, San Marino and Sierra Madre; Jason
 * confirmed only these five on Call 2, and content.ts was trimmed to match.
 * Every section below renders SERVICE_AREAS as-is. The online route keeps a
 * full section of its own — statewide video is genuinely half the practice.
 */
export default function ServiceAreasHubPage() {
  return (
    <div>
      <PageHero
        eyebrow="Service areas"
        title="Hypnotherapy near you, from a real South Pasadena office"
        image={PALMS_DAYLIGHT}
        size="lg"
        scene="globe"
        sceneHover="terrain"
        intro="mask"
        facts={[
          { k: 'In person', v: '5 cities' },
          { k: 'Online', v: 'All of California' },
          { k: 'Office', v: 'South Pasadena' },
          { k: 'First call', v: 'Free' },
        ]}
        lede={
          <p>
            In person at {NAP.street} in {NAP.city}, and by video anywhere in California. These are the areas Jason
            Meissner most often sees clients from in person.
          </p>
        }
      >
        <Magnetic>
          <Link href="/book" className={`${heroPrimaryBtn} ph-glow-border`}>
            <RollText>Book a Free Discovery Call</RollText>
            <ArrowRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </Magnetic>
        <a href={NAP.phoneHref} className={`group ${heroGhostBtn}`}>
          <PhoneIcon className="h-4 w-4" />
          <RollText>{NAP.phone}</RollText>
        </a>
      </PageHero>

      <AreasMarquee />

      <CityBento />

      <OnlineDepth />

      <CtaBand
        title="Outside these cities? Online works the same way."
        body="Same rate, same conditions treated, anywhere in California."
        secondary={{ href: '/services/online-hypnotherapy', label: 'Online Hypnotherapy' }}
      />
    </div>
  );
}
