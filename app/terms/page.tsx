import type { Metadata } from 'next';
import { LegalPlaceholder } from '../../components/LegalPlaceholder';

// Target keywords (profile.ts targetKeywords['/terms']): "pasadena hypnosis terms of service".
export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms governing use of the Pasadena Hypnosis website and booking.',
  alternates: { canonical: '/terms' },
};

export default function TermsPage() {
  return (
    <LegalPlaceholder
      title="Terms of Service"
      intro="This page will set out the terms governing use of this website, booking a session, and the scope of the hypnotherapy services Pasadena Hypnosis provides."
      sections={['Acceptance of terms', 'Scope of services', 'Booking & cancellation', 'Limitation of liability', 'Governing law']}
    />
  );
}
