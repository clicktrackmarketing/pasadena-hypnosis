import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { SERVICES, FAQS, PRACTITIONER, NAP } from '../../../components/content';
import { ArrowRightIcon, PhoneIcon, ShieldCheckIcon } from '../../../components/Icons';

// profile.ts targetKeywords['/services/<slug>'] — see profile.ts for the
// sourcing note on each (audited vs. Call 2 brief-derived).
const TARGET_KEYWORDS: Record<string, string[]> = {
  'depression-bipolar-support': ['hypnotherapy for depression pasadena', 'hypnosis for bipolar disorder'],
  'stress-and-anxiety': ['hypnotherapy for anxiety pasadena', 'hypnosis for disabling anxiety'],
  'smoking-cessation': ['quit smoking hypnosis pasadena', 'does hypnosis work to quit smoking'],
  'chronic-pain': ['hypnotherapy for chronic pain los angeles', 'hypnosis for post surgical pain'],
  ibs: ['gut-directed hypnotherapy', 'hypnotherapy for ibs los angeles'],
  'grief-and-loss': ['hypnotherapy for grief pasadena', 'hypnosis for grief and loss'],
  'group-hypnotherapy-program': ['group hypnotherapy program pasadena'],
  'hypnotherapy-sessions': ['hypnotherapy session pasadena', 'hypnotherapist south pasadena'],
  'online-hypnotherapy': ['online hypnotherapy california'],
  'discovery-call': ['free hypnotherapy consultation pasadena'],
  'childhood-stress-anxiety': ['hypnotherapy for children pasadena'],
  'testing-and-academic-performance': ['test anxiety hypnosis pasadena', 'academic performance hypnosis san marino'],
  'sports-performance': ['sports performance hypnosis los angeles'],
  'past-life-regression': ['past life regression pasadena'],
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

export default async function ServiceDetailPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);
  if (!service) notFound();

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

      <section className="bg-white">
        <div className="max-w-[900px] mx-auto px-4 sm:px-6 py-12 sm:py-16 lg:py-20">
          <Link href="/services" className="text-sm font-medium text-[#46699F] hover:text-[#2E2F3D] mb-5 inline-block">
            &larr; All services
          </Link>
          <p className="font-body text-xs sm:text-sm font-semibold tracking-[0.14em] uppercase text-[#46699F] mb-3">
            {service.category}
            {service.tag ? ` · ${service.tag}` : ''}
          </p>
          <h1 className="font-heading text-4xl sm:text-5xl leading-[1.1] text-[#2E2F3D] mb-6">{service.name}</h1>
          <p id="answer-first" className="text-base sm:text-lg text-[#4B5468] leading-relaxed mb-8 border-l-[3px] border-[#454659] pl-5">
            {service.answer}
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/book" className="inline-flex items-center gap-2 rounded-[10px] bg-[#454659] text-white px-6 py-3.5 text-sm sm:text-base font-medium hover:bg-[#33344A] transition-colors">
              Book a Free Discovery Call
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
            <a href={`tel:${NAP.phone.replace(/[^\d+]/g, '')}`} className="inline-flex items-center gap-2 rounded-[10px] border border-[#454659] text-[#2E2F3D] px-6 py-3.5 text-sm sm:text-base font-medium hover:text-[#46699F] transition-colors">
              <PhoneIcon className="h-4 w-4" />
              {NAP.phone}
            </a>
          </div>
        </div>
      </section>

      <section className="bg-[#E6EFFF] py-14 sm:py-20 border-t border-[#D7DEEA]">
        <div className="max-w-[900px] mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-start gap-4 bg-white border border-[#D7DEEA] rounded-[14px] p-6 sm:p-8">
          <ShieldCheckIcon className="h-6 w-6 text-[#454659] flex-shrink-0" />
          <p className="text-sm sm:text-base text-[#2E2F3D] leading-relaxed">
            {PRACTITIONER.name}, a Hypnosis Motivation Institute graduate with 10 years in practice, reviews every
            case personally — sessions run $200 each unless noted otherwise above, with a free discovery call
            available first to talk through your specific situation.
          </p>
        </div>
      </section>

      <section className="bg-white py-14 sm:py-20">
        <div className="max-w-[760px] mx-auto px-4 sm:px-6">
          <h2 className="font-heading text-2xl sm:text-3xl text-[#2E2F3D] mb-6">Common questions</h2>
          <div className="flex flex-col gap-3">
            {FAQS.slice(0, 3).map((f) => (
              <div key={f.q} className="border border-[#D7DEEA] rounded-[12px] bg-[#E9F3EF] p-5">
                <p className="font-medium text-[#2E2F3D] mb-1.5">{f.q}</p>
                <p className="text-sm text-[#4B5468] leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>
          <Link href="/faq" className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-[#46699F] hover:text-[#2E2F3D] transition-colors">
            View all frequently asked questions
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <section className="bg-[#454659] py-14">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {SERVICES.filter((s) => s.slug !== service.slug)
            .slice(0, 3)
            .map((s) => (
              <Link key={s.slug} href={`/services/${s.slug}`} className="text-left bg-white/[0.08] border border-white/20 rounded-[12px] p-5 hover:bg-white/[0.14] transition-colors block">
                <p className="font-heading text-lg text-white mb-1">{s.name}</p>
                <span className="text-xs text-white inline-flex items-center gap-1">
                  Learn more <ArrowRightIcon className="h-3 w-3" />
                </span>
              </Link>
            ))}
        </div>
      </section>
    </div>
  );
}
