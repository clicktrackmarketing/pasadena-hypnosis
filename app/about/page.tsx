import type { Metadata } from 'next';
import Link from 'next/link';
import { NAP } from '../../components/content';
import { GARDEN_STREAM } from '../../components/unsplash';
import { ArrowRightIcon, PhoneIcon } from '../../components/Icons';
import { PageHero } from '../../components/PageHero';
import { heroPrimaryBtn, heroGhostBtn } from '../../components/buttons';
import { CtaBand } from '../../components/CtaBand';
import { AboutWords } from '../../components/pages/about/AboutWords';
import { AboutRoom } from '../../components/pages/about/AboutRoom';
import { AboutZoom } from '../../components/pages/about/AboutZoom';
import { AboutReviews } from '../../components/pages/about/AboutReviews';

/* ---------------------------------------------------------------------------
   ABOUT — redesigned 2026-09-28 for motion. Each band moves its own way:

     hero      a particle WAVE behind the copy; the H1 slides up out of a mask
     words     the training sentence is scrubbed in by the scroll (ScrubText)
     room      a layered collage that separates under the mouse (DepthField),
               photographs uncovered by a colour sweep (CurtainReveal)
     tagline   open water opening from an inset card to full bleed (ZoomFrame)
     reviews   screenshots uncovered in reading order (CurtainReveal), beside
               a particle constellation (desktop only)
     scope     a travelling water line along its top edge (WaveSeam)

   THE COPY DID NOT CHANGE. Every sentence is still REAL_COPY / PRACTITIONER /
   RATING / REVIEW_SHOTS from content.ts, verbatim; the redesign restages it.
   The only photographs of the practice are OFFICE_INTERIOR (the room) and the
   review screenshots; stock frames carry their own alt text and are never
   captioned as this practice. The stock "rooms" ticker that used to sit under
   the reviews was dropped from this page for that reason — an uncaptioned run
   of other people's consulting rooms beside the real one invites exactly the
   misreading the imagery rule exists to prevent.
--------------------------------------------------------------------------- */

// Target keywords (profile.ts targetKeywords['/about']): "jason meissner
// hypnotherapist", "hypnotherapy motivation institute pasadena".
export const metadata: Metadata = {
  title: 'About Pasadena Hypnosis',
  description:
    'Pasadena Hypnosis LLC is a solo hypnotherapy practice run by Jason Meissner out of South Pasadena, CA, holding a 5.0 Google rating from 12 reviews.',
  alternates: { canonical: '/about' },
};

export default function AboutPage() {
  return (
    <div>
      <PageHero
        eyebrow="About"
        title="A solo practice, in one office, for a decade"
        image={GARDEN_STREAM}
        size="lg"
        scene="wave"
        sceneHover="spiral"
        intro="mask"
        facts={[
          { k: 'Practice', v: 'Solo, since 2016' },
          { k: 'Location', v: 'South Pasadena, CA' },
          { k: 'Rating', v: '5.0 from 12 reviews' },
          { k: 'Also', v: 'Online, anywhere' },
        ]}
        lede={
          <p>
            Pasadena Hypnosis LLC is Jason Meissner&rsquo;s own practice, run out of a South Pasadena office he has
            worked from for ten years.
          </p>
        }
      >
        <Link href="/our-team" className={heroPrimaryBtn}>
          Credentials &amp; documents
          <ArrowRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
        <a href={NAP.phoneHref} className={heroGhostBtn}>
          <PhoneIcon className="h-4 w-4" />
          {NAP.phone}
        </a>
      </PageHero>

      <AboutWords />
      <AboutRoom />
      <AboutZoom />
      <AboutReviews />

      <CtaBand
        title="Talk to Jason directly"
        body="The first conversation is free. Let us know how we can help."
      />
    </div>
  );
}
