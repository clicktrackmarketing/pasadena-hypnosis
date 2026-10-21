import type { Metadata } from 'next';
import { Lora, Inter } from 'next/font/google';
import './globals.css';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { ScrollProgress } from '../components/Motion';
import { SmoothScroll } from '../components/SmoothScroll';
import { CursorRing } from '../components/CursorRing';
import { RouteCurtain } from '../components/RouteCurtain';
import { ImageWarmup } from '../components/ImageWarmup';
import { buildJsonLd } from '../components/content';
import { isIndexable } from '../components/indexing';
import { OG_IMAGE } from '../components/seo';

/* ---------------------------------------------------------------------------
   FONTS — self-hosted via next/font rather than fetched from Google.

   WHAT THIS REPLACED, and why it was worth changing. globals.css opened with
   `@import url('https://fonts.googleapis.com/css2?...')`. That is the slowest
   possible way to load a webfont, because every step is serial and the browser
   cannot start any of them early:

     1. fetch the app's CSS
     2. parse it, discover the @import
     3. connect to fonts.googleapis.com, fetch the font CSS
     4. parse THAT, discover the @font-face URLs
     5. connect to fonts.gstatic.com, fetch the font files

   Measured on this site, step 3 did not begin until 835ms after navigation —
   nearly a second before the browser even knew which font files it needed, on
   a page whose hero is almost entirely type.

   next/font downloads both families AT BUILD TIME and serves them from this
   origin, which removes both third-party connections and the @import hop
   entirely, and emits a preload for the files actually used.

   The weights below are exactly the ones the old @import requested — Lora
   400/500/600 plus a 500 italic, Inter 400/500/600/700. Adding weights here
   costs real bytes, so they are not widened "just in case".

   `display: swap` keeps text visible in the fallback face while the webfont
   loads, which is the behaviour the old URL also asked for.
--------------------------------------------------------------------------- */
const lora = Lora({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-lora',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
});

// Sitewide entity graph only — WebSite and MedicalBusiness (with the
// founder/credentials/hasOfferCatalog nodes nested inside it). FAQPage
// lives on /faq, next to the accordion it describes.
const SITEWIDE_TYPES = new Set(['WebSite', 'MedicalBusiness']);
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
    'Certified hypnotherapy in South Pasadena and online: stress and anxiety, depression and bipolar disorder, smoking cessation, chronic and acute pain, IBS and fibromyalgia, and grief.',
  authors: [{ name: 'Jason Meissner', url: '/meet-jason' }],
  // Fallback share card for anything that does not call pageMeta (the 404).
  openGraph: { type: 'website', siteName: 'Pasadena Hypnosis', locale: 'en_US', images: [OG_IMAGE] },
  twitter: { card: 'summary_large_image', images: [OG_IMAGE.url] },
  // noindex,nofollow everywhere EXCEPT the live pasadenahypnosis.com
  // production deployment, where it lifts by itself (client review
  // 2026-10-19). Rules in components/indexing.ts. Child pages inherit this,
  // so no page (the smoking page included) sets its own robots.
  robots: isIndexable() ? { index: true, follow: true } : { index: false, follow: false },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${lora.variable} ${inter.variable}`}>
      <body>
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@graph': sitewideJsonLd }) }}
        />
        {/* Reading-progress hairline. Decorative and aria-hidden; it renders
            nothing at all when the visitor has asked for reduced motion. */}
        <ScrollProgress />
        {/* Sitewide motion layer (2026-09-28): wheel smoothing, the cursor
            ring and the page-to-page curtain. All three switch themselves
            off under reduced motion; the first two also on touch devices. */}
        <SmoothScroll />
        <CursorRing />
        <RouteCurtain />
        <ImageWarmup />
        <div className="w-full min-h-screen flex flex-col bg-white text-[#2E2F3D]">
          <Header />
          <main id="main" tabIndex={-1} className="flex-1 focus:outline-none">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
