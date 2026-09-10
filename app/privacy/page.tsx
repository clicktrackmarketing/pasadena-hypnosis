import type { Metadata } from 'next';
import { LegalPlaceholder } from '../../components/LegalPlaceholder';

// Target keywords (profile.ts targetKeywords['/privacy']): "pasadena hypnosis
// privacy policy". Navigational/legal only.
export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How Pasadena Hypnosis collects, uses, and protects information submitted through this website.',
  alternates: { canonical: '/privacy' },
};

export default function PrivacyPage() {
  return (
    <LegalPlaceholder
      title="Privacy Policy"
      intro="This page will describe what information Pasadena Hypnosis collects through this site — including any regulated health context submitted through the booking form — how it is used, and how clients can request changes or deletion."
      sections={['Information we collect', 'How we use it', 'Cookies & analytics', 'Your choices', 'Contact us']}
    />
  );
}
