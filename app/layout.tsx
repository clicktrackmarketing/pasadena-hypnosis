import type { Metadata } from 'next';
import './globals.css';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { buildJsonLd } from '../components/content';

// Sitewide entity graph only — WebSite and MedicalOrganization (with the
// founder/credentials/aggregateRating/hasOfferCatalog nodes nested inside
// it). FAQPage lives on /faq, next to the accordion it describes.
const SITEWIDE_TYPES = new Set(['WebSite', 'MedicalOrganization']);
const sitewideJsonLd = (buildJsonLd()['@graph'] as Array<Record<string, unknown>>).filter((node) =>
  SITEWIDE_TYPES.has(node['@type'] as string),
);

export const metadata: Metadata = {
  metadataBase: new URL('https://www.pasadenahypnosis.com'),
  title: {
    default: 'Pasadena Hypnosis | Certified Hypnotherapy in South Pasadena, CA',
    template: '%s | Pasadena Hypnosis',
  },
  description:
    'Hypnotherapy for Depression & Bipolar Disorder, Disabling Anxiety, Smoking Cessation, Chronic Pain, Gut-Directed Hypnotherapy and Grief in South Pasadena.',
  // This repo is the real, launch-track site (converted from the approved
  // MagicPath concept per the site-build skill's route-conversion pattern),
  // but it is not yet promoted to the live domain — stays noindex,nofollow
  // on the Vercel preview host until a human promotes it. See
  // pipeline/.claude/skills/site-build/SKILL.md.
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@graph': sitewideJsonLd }) }}
        />
        <div className="w-full min-h-screen flex flex-col bg-white text-[#2E2F3D]">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
