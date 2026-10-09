import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { SERVICES, NAP, REAL_COPY } from '../../../components/content';
import { serviceImage } from '../../../components/unsplash';
import { ArrowRightIcon, PhoneIcon } from '../../../components/Icons';
import { PageHero } from '../../../components/PageHero';
import { heroPrimaryBtn, heroGhostBtn } from '../../../components/buttons';
import { CtaBand } from '../../../components/CtaBand';
import { priceLabel } from '../../../components/price';
import { serviceScene } from '../../../components/pages/services/shapes';
import {
  AnswerZoom,
  ServiceStory,
  QuitSmoking,
  StepsPath,
  OfficeSetting,
  RelatedRise,
  FaqEcho,
} from '../../../components/pages/services/DetailSections';

// profile.ts targetKeywords['/services/<slug>'] — see profile.ts for the
// sourcing note on each (audited vs. Call 2 brief-derived).
const TARGET_KEYWORDS: Record<string, string[]> = {
  'depression-bipolar-support': ['hypnotherapy for depression pasadena', 'hypnosis for bipolar disorder'],
  'stress-and-anxiety': ['hypnotherapy for anxiety pasadena', 'hypnosis for stress and anxiety'],
  'smoking-cessation': ['quit smoking hypnosis pasadena', 'does hypnosis work to quit smoking'],
  'chronic-pain': ['hypnotherapy for chronic pain los angeles', 'hypnosis for acute pain'],
  ibs: ['hypnotherapy for ibs los angeles', 'hypnotherapy for fibromyalgia'],
  'grief-and-loss': ['hypnotherapy for grief pasadena', 'hypnosis for grief and loss'],
  'hypnotherapy-sessions': ['hypnotherapy session pasadena', 'hypnotherapist south pasadena'],
  'online-hypnotherapy': ['online hypnotherapy'],
  'discovery-call': ['free hypnotherapy consultation pasadena'],
  'childhood-stress-anxiety': ['hypnotherapy for children pasadena'],
  'testing-and-academic-performance': ['test anxiety hypnosis pasadena', 'academic performance hypnosis san marino'],
  'sports-performance': ['sports performance hypnosis los angeles'],
};

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);
  if (!service) return {};
  return {
    title: service.name,
    description: service.answer,
    keywords: TARGET_KEYWORDS[slug],
    alternates: { canonical: `/services/${slug}` },
  };
}

/*
  PAGE ORDER, and the kind of motion each band carries (no two alike):
    hero       dark   this service's own particle figure (see shapes.ts); H1 rises word by word
    answer     photo  the service's photograph opens from an inset card to full-bleed; answer focuses in over it
    story      white  the service's own heading + paragraphs, beside a review or a call card
    steps      dark   cursor-lit glass cards joined by a line that draws itself with scroll
                      (smoking cessation: QuitSmoking instead — his /quitsmoking page)
    setting    mint   the real office photo uncovered by a sweeping colour panel
    related    dark   a block that grows from a rounded card to full width as it arrives
    faq        tint   the page's figure again, light tone, held beside the questions (desktop)
    cta        slate  shared CtaBand
*/
export default async function ServiceDetailPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);
  if (!service) notFound();

  const img = serviceImage(service.slug);
  const price = priceLabel(service);
  const { scene, hover } = serviceScene(service.slug);
  const isSmoking = service.slug === 'smoking-cessation';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.pasadenahypnosis.com/' },
          { '@type': 'ListItem', position: 2, name: 'Services', item: 'https://www.pasadenahypnosis.com/services' },
          { '@type': 'ListItem', position: 3, name: service.name, item: `https://www.pasadenahypnosis.com/services/${service.slug}` },
        ],
      },
      {
        '@type': 'Service',
        name: service.name,
        description: service.answer,
        serviceType: service.name,
        category: service.category,
        areaServed: 'South Pasadena, CA',
        provider: { '@type': 'MedicalOrganization', name: 'Pasadena Hypnosis' },
        ...(service.price !== null ? { offers: { '@type': 'Offer', price: String(service.price), priceCurrency: 'USD' } } : {}),
      },
    ],
  };

  return (
    <div>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/*
        The hero carries this service's OWN photograph, keyed by slug in
        unsplash.ts, as a dim ground under this service's own figure. That
        mapping is by slug and not by array index precisely so that re-ranking
        the catalogue — which the brief expects — cannot quietly move the night
        sky onto smoking cessation.

        The answer block (id="answer-first") moved from the hero lede into the
        band directly below, where it is set large over the same photograph at
        full bleed. It is still the first paragraph after the H1 in the DOM —
        printed once, not twice.

        No "typical course" fact: there is no set number of sessions (markup
        #23, #56). Smoking cessation is $400 (#58).
      */}
      <PageHero
        eyebrow={`${service.category}${service.tag ? ` · ${service.tag}` : ''}`}
        title={service.name}
        image={img}
        size="lg"
        scene={scene}
        sceneHover={hover}
        intro="rise"
        breadcrumb={{ label: 'All services', href: '/services' }}
        lede={service.heroLede ? <p>{service.heroLede}</p> : undefined}
        facts={[
          { k: 'Investment', v: price },
          { k: 'Format', v: 'In person or online' },
          isSmoking
            ? { k: 'Includes', v: 'Support calls' }
            : service.slug === 'discovery-call'
              ? { k: 'With', v: 'Jason, directly' }
              : { k: 'Session', v: '60 minutes' },
          { k: 'First step', v: 'A free discovery call' },
        ]}
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

      <AnswerZoom slug={service.slug} />
      <ServiceStory slug={service.slug} />
      {isSmoking ? <QuitSmoking /> : <StepsPath />}
      <OfficeSetting />
      <RelatedRise slug={service.slug} />
      <FaqEcho scene={scene} hover={hover} />

      {isSmoking ? (
        <CtaBand
          title={REAL_COPY.quitSmoking.close}
          body={REAL_COPY.quitSmoking.walkAway}
          primaryLabel={REAL_COPY.quitSmoking.readyCta}
        />
      ) : (
        <CtaBand
          title="Let us know how we can help"
          body="A free discovery call comes first."
        />
      )}
    </div>
  );
}
