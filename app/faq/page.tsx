import type { Metadata } from 'next';
import { FAQS, NAP, SERVICES } from '../../components/content';
import { TWO_TALKING } from '../../components/unsplash';
import { priceLabel } from '../../components/price';
import { PhoneIcon, MailIcon } from '../../components/Icons';
import { PageHero } from '../../components/PageHero';
import { heroPrimaryBtn, heroGhostBtn } from '../../components/buttons';
import { CtaBand } from '../../components/CtaBand';
import { FaqBody } from '../../components/pages/faq/FaqBody';
import { FaqStatement } from '../../components/pages/faq/FaqStatement';

// Target keywords (profile.ts targetKeywords['/faq']): "what does a hypnotist
// cost", "does hypnosis work for quitting smoking", "is hypnotherapy covered
// by insurance".
export const metadata: Metadata = {
  title: 'Frequently Asked Questions',
  description:
    'Cost, credentials, online availability, and what to expect at Pasadena Hypnosis in South Pasadena, CA — answered directly.',
  alternates: { canonical: '/faq' },
};

/*
 * FAQPage schema lives HERE and only here, built from the same FAQS array the
 * accordion renders — they cannot drift. Service pages show three of these
 * questions without schema on purpose: emitting the same FAQPage from fourteen
 * URLs is duplicate structured data, not fourteen times the coverage.
 */
const faqPageJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQS.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
};

/*
 * REDESIGNED 2026-09-28 — one kind of motion per band:
 *   hero       a particle STORM that calms into an orb under the cursor; the
 *              H1 focuses in from a blur
 *   list       sticky side column (orb + question count + progress + contact)
 *              beside the unchanged auto-opening accordion
 *   statement  the "Not answered here?" copy scrubbed in word by word, beside
 *              curtain-revealed pictures at three parallax depths
 *
 * The hero fact strip's figures come from content.ts (priceLabel +
 * priceQualifier), no longer typed.
 */
export default function FaqPage() {
  const standard = SERVICES.find((s) => s.slug === 'hypnotherapy-sessions')!;
  const discovery = SERVICES.find((s) => s.slug === 'discovery-call')!;

  return (
    <div>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageJsonLd) }}
      />

      <PageHero
        eyebrow="FAQ"
        title="Frequently asked questions"
        image={TWO_TALKING}
        scene="storm"
        sceneHover="orb"
        intro="blur"
        facts={[
          { k: 'Questions', v: 'Ten, answered' },
          { k: 'Cost', v: `${priceLabel(standard)} ${standard.priceQualifier}` },
          { k: 'Insurance', v: 'Self-pay, HSA/FSA' },
          { k: 'First call', v: priceLabel(discovery) },
        ]}
        breadcrumb={{ label: 'Back to home', href: '/' }}
        lede={
          <p>
            Cost, credentials, online availability and what actually happens in a session &mdash; answered directly,
            with no form in the way. For anything not covered here, call the office.
          </p>
        }
      >
        <a href={NAP.phoneHref} className={heroPrimaryBtn}>
          <PhoneIcon className="h-4 w-4" />
          {NAP.phone}
        </a>
        <a href={`mailto:${NAP.email}`} className={heroGhostBtn}>
          <MailIcon className="h-4 w-4" />
          Email a question
        </a>
      </PageHero>

      <FaqBody />

      <FaqStatement />

      <CtaBand
        title="Still have a question?"
        body="Jason can walk you through anything not covered here, on a call that costs nothing."
      />
    </div>
  );
}
