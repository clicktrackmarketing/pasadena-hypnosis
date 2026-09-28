import type { Metadata } from 'next';
import Link from 'next/link';
import { PRACTITIONER, CREDENTIALS, NAP } from '../../components/content';
import { PORTRAIT, PORTRAIT_ALT } from '../../components/assets';
import { BAMBOO_WALKWAY } from '../../components/unsplash';
import { ArrowRightIcon, PhoneIcon } from '../../components/Icons';
import { PageHero, heroPrimaryBtn, heroGhostBtn } from '../../components/PageHero';
import { CtaBand } from '../../components/CtaBand';
import { TeamPractitioner } from '../../components/pages/our-team/TeamPractitioner';
import { TeamFigures } from '../../components/pages/our-team/TeamFigures';
import { TeamTimeline } from '../../components/pages/our-team/TeamTimeline';
import { TeamDocuments } from '../../components/pages/our-team/TeamDocuments';
import { TeamScope } from '../../components/pages/our-team/TeamScope';
import { TeamServices } from '../../components/pages/our-team/TeamServices';

/* ---------------------------------------------------------------------------
   OUR TEAM.

   THE PROBLEM THIS PAGE HAS TO SOLVE. "Our Team" on a solo practice is
   usually an apology — one headshot under a plural heading, padded out to look
   like a firm. This version does the opposite and treats the solo part as the
   argument: one person, named, with every document he holds photographed at a
   size you can actually read.

   WHAT IS ON THE PAGE IS WHAT EXISTS. There are five certificates and they are
   all here. There is no "team" section with invented associates, no stock
   headshots captioned as staff, no "years of combined experience" arithmetic.
   Every section is driven by CREDENTIALS and PRACTITIONER in content.ts.

   REDESIGNED 2026-09-28 FOR MOTION. Each band moves its own way:
     hero        a faint particle ORB behind the real portrait; the H1 focuses
                 in from a blur
     practitioner the five credentials ORBIT the portrait, which TILTS toward
                 the mouse (a wrapped row of the same labels on phones)
     at a glance cards lit by a SPOTLIGHT under the cursor, focusing in
     2016        the timeline rail is DRAWN by the scroll (ScrollDraw), beside a
                 pinned particle lattice on wide screens
     documents   the five certificates PIN AND STACK (StickyStack), each with
                 its transcription beneath the image
     scope       deliberately quiet: one rise and a drawn hairline
     services    cards FLIP up into place

   THE TIMELINE IS NOT DECORATIVE. Every node is the date printed on a
   certificate this page also displays — March 8, April 14, April 19, April 21
   and October 8, all 2016 — sorted by that date rather than by array order.
   Nothing is inferred to fill the sequence.

   The stock "rooms" ticker that used to close this page was dropped: an
   uncaptioned strip of other practices' interiors on the practitioner's own
   page is the misreading the imagery rule (unsplash.ts) exists to prevent.
--------------------------------------------------------------------------- */

// Target keywords (profile.ts targetKeywords['/our-team']): "jason meissner hypnotherapist".
export const metadata: Metadata = {
  title: 'Our Team — Jason Meissner, Certified Hypnotherapist',
  description:
    "Jason Meissner completed a year of accredited training and supervised residency at the Hypnosis Motivation Institute and has practiced hypnotherapy for 10 years in South Pasadena, California.",
  alternates: { canonical: '/our-team' },
};

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: PRACTITIONER.name,
  jobTitle: PRACTITIONER.role,
  description: PRACTITIONER.bio,
  alumniOf: { '@type': 'EducationalOrganization', name: 'Hypnosis Motivation Institute', url: 'https://hypnosis.edu' },
  hasCredential: CREDENTIALS.map((c) => ({
    '@type': 'EducationalOccupationalCredential',
    name: c.award,
    credentialCategory: c.featured ? 'diploma' : 'certificate',
    dateCreated: c.date,
    recognizedBy: { '@type': 'Organization', name: c.issuer },
    ...(c.ref ? { identifier: c.ref } : {}),
  })),
};

export default function OurTeamPage() {
  return (
    <div>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />

      <PageHero
        eyebrow="Our team"
        title="One hypnotherapist, and every document behind him"
        image={BAMBOO_WALKWAY}
        scene="orb"
        sceneHover="rings"
        intro="blur"
        media={{
          src: PORTRAIT,
          alt: PORTRAIT_ALT,
          caption: 'Jason Meissner, Certified Hypnotherapist and owner.',
          aspect: '4/5',
        }}
        facts={[
          { k: 'Trained at', v: 'Hypnosis Motivation Institute' },
          { k: 'Graduated', v: '2016, with Honors' },
          { k: 'In practice', v: '10 years' },
          { k: 'Certificates', v: 'Five, shown below' },
        ]}
        lede={
          <p>
            Pasadena Hypnosis is a solo practice. There is no associate to be handed to and no rotating roster
            &mdash; the person you speak to on the discovery call is the person in the room.
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

      <TeamPractitioner />
      <TeamFigures />
      <TeamTimeline />
      <TeamDocuments />
      <TeamScope />
      <TeamServices />

      <CtaBand
        title="Work with Jason"
        body="A free discovery call comes first, and he will tell you honestly whether this is work he takes."
        secondary={{ href: '/services', label: 'See all services' }}
      />
    </div>
  );
}
