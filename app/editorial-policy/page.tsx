import type { Metadata } from 'next';
import Link from 'next/link';
import { pageMeta } from '../../components/seo';
import { LegalDocument, type LegalSection } from '../../components/LegalDocument';
import { NAP } from '../../components/content';

// Target keywords (profile.ts targetKeywords['/editorial-policy']): "pasadena
// hypnosis editorial policy". Required because this is regulated-health
// content — an editorial/review policy is an E-E-A-T and AEO trust signal.
export const metadata: Metadata = pageMeta({
  title: 'Editorial Policy',
  description: 'How Pasadena Hypnosis writes, reviews and maintains the health information published on this site.',
  path: '/editorial-policy',
});

/* Written 2026-10-20. Every statement here describes how this site was in
   fact made: Jason reviewed the copy over two markup rounds and a pre-launch
   review (docs/), his blog posts are his own words, and the reviews are
   unedited screenshots of his Google reviews. */
const EFFECTIVE = 'October 20, 2026';

const SECTIONS: LegalSection[] = [
  {
    id: 'who',
    title: 'Who writes and reviews our content',
    body: (
      <>
        <p>
          Jason Meissner, the certified hypnotherapist who runs Pasadena Hypnosis, is responsible for everything
          published on this site. Pages may be drafted with the help of our web team, but every page about hypnotherapy,
          its uses and what to expect from a session is read and approved by Jason before it goes live. Articles on our{' '}
          <Link href="/blog">blog</Link> are written by Jason in his own words.
        </p>
        <p>
          You can read about his training and credentials on <Link href="/meet-jason">Meet Jason</Link>.
        </p>
      </>
    ),
  },
  {
    id: 'standards',
    title: 'Our standards',
    body: (
      <ul>
        <li>We describe hypnotherapy from Jason&rsquo;s training and his years in practice.</li>
        <li>We do not promise outcomes or say a result is guaranteed. People respond differently.</li>
        <li>
          We are clear that hypnotherapy is not a substitute for medical or psychiatric care, and we encourage readers
          to keep working with their doctors and therapists.
        </li>
        <li>Prices, hours and contact details are checked against our booking calendar and Google Business Profile.</li>
        <li>Client reviews are screenshots of reviews posted on Google, with reviewers&rsquo; names hidden for their privacy. We do not change their words.</li>
      </ul>
    ),
  },
  {
    id: 'updates',
    title: 'Keeping pages current',
    body: (
      <p>
        We review the site whenever our services, prices or hours change, and at least once a year. Blog articles show
        the date they were published.
      </p>
    ),
  },
  {
    id: 'corrections',
    title: 'Corrections',
    body: (
      <p>
        If you think something on this site is wrong or out of date, please tell us at{' '}
        <a href={`mailto:${NAP.email}`}>{NAP.email}</a> or <a href={NAP.phoneHref}>{NAP.phone}</a>. We will check it and
        correct the page promptly if it needs changing.
      </p>
    ),
  },
];

export default function EditorialPolicyPage() {
  return (
    <LegalDocument
      title="Editorial Policy"
      intro="How the information on this site is written, who reviews it, and how to tell us about a mistake."
      effective={EFFECTIVE}
      sections={SECTIONS}
    />
  );
}
