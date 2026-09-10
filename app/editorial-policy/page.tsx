import type { Metadata } from 'next';
import { LegalPlaceholder } from '../../components/LegalPlaceholder';

// Target keywords (profile.ts targetKeywords['/editorial-policy']): "pasadena
// hypnosis editorial policy". Required because this is regulated-health
// content — an editorial/review policy is an E-E-A-T and AEO trust signal.
export const metadata: Metadata = {
  title: 'Editorial Policy',
  description: 'How Pasadena Hypnosis reviews and maintains the health information published on this site.',
  alternates: { canonical: '/editorial-policy' },
};

export default function EditorialPolicyPage() {
  return (
    <LegalPlaceholder
      title="Editorial Policy"
      intro="This page will describe how content on this site is written and reviewed, and who is responsible for its accuracy — Jason Meissner is the practice's designated content reviewer."
      sections={['Who writes and reviews our content', 'Our sourcing standards', 'How we handle corrections', 'Contact us about an error']}
    />
  );
}
