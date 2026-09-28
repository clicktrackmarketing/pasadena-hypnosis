import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { SERVICES, FAQS, PRACTITIONER, STEPS, NAP } from '../../../components/content';
import { serviceImage, GALLERY } from '../../../components/unsplash';
import { OFFICE_INTERIOR, OFFICE_INTERIOR_ALT } from '../../../components/assets';
import { ArrowRightIcon, PhoneIcon, ShieldCheckIcon, MapPinIcon, ClockIcon } from '../../../components/Icons';
import { PageHero, heroPrimaryBtn, heroGhostBtn } from '../../../components/PageHero';
import { CtaBand } from '../../../components/CtaBand';
import { ServiceCard } from '../../../components/ServiceCard';
import { priceLabel } from '../../../components/price';
import { FaqAccordion } from '../../../components/FaqAccordion';
import { Reveal, SplitHeading, Stagger, StaggerItem, Parallax, ClipReveal } from '../../../components/Motion';
import { SectionHeading } from '../../../components/SectionHeading';
import { ImageStrip } from '../../../components/Bands';

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

  const img = serviceImage(service.slug);
  const price = priceLabel(service);
  const related = SERVICES.filter((s) => s.slug !== service.slug).slice(0, 3);

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
        unsplash.ts. That mapping is by slug and not by array index precisely
        so that re-ranking the catalogue — which the brief expects — cannot
        quietly move the night sky onto smoking cessation.
      */}
      <PageHero
        eyebrow={`${service.category}${service.tag ? ` · ${service.tag}` : ''}`}
        title={service.name}
        image={img}
        size="lg"
        breadcrumb={{ label: 'All services', href: '/services' }}
        facts={[
          { k: 'Investment', v: price },
          { k: 'Format', v: 'In person or by video' },
          { k: 'Typical course', v: 'Six to eight sessions' },
          { k: 'First step', v: 'A free discovery call' },
        ]}
        lede={
          <p id="answer-first" className="border-l-2 border-[#A9C4EE]/45 pl-5">
            {service.answer}
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

      {/* The four facts that used to sit in a strip here are now in the hero's
          own fact row directly above — same values, read from the same service
          record, printed once instead of twice.

          `price` renders "On your call" rather than a number when the figure
          is genuinely unresolved (smoking cessation: $400 site-verified vs.
          $500 verbal, still open after Call 2). */}

      {/* BODY + SIDEBAR --------------------------------------------------- */}
      <section className="bg-white py-20 sm:py-24">
        <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:gap-16 lg:px-8">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="mb-3 font-body text-xs font-semibold uppercase tracking-[0.18em] text-[#46699F] sm:text-[13px]">
                In short
              </p>
            </Reveal>
            <SplitHeading
              text="What booking this actually involves"
              className="max-w-[20ch] font-heading text-[1.9rem] leading-[1.14] tracking-[-0.01em] text-[#2E2F3D] sm:text-[2.4rem]"
            />

            <Reveal delay={0.12}>
              <p className="mt-7 text-[17px] leading-[1.72] text-[#4B5468]">{service.summary}</p>
            </Reveal>

            {/* The three steps are the practice's real process, shared across
                every service — they are not re-written per service, because
                the process genuinely is the same one. */}
            <Stagger className="mt-10 flex flex-col gap-6" as="ol" gap={0.1}>
              {STEPS.map((s) => (
                <StaggerItem key={s.n} as="li">
                  <div className="flex gap-5">
                    <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full border border-[#D7DEEA] bg-[#E6EFFF] font-heading text-[15px] text-[#46699F]">
                      {s.n}
                    </span>
                    <div>
                      <h3 className="mb-1.5 font-heading text-[1.2rem] text-[#2E2F3D]">{s.title}</h3>
                      <p className="max-w-[54ch] text-[15px] leading-[1.68] text-[#4B5468]">{s.body}</p>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>

            <Reveal delay={0.1}>
              <div className="mt-10 flex items-start gap-4 rounded-[16px] border border-[#D7DEEA] bg-[#E9F3EF] p-6">
                <ShieldCheckIcon className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#454659]" />
                <p className="text-[15px] leading-[1.7] text-[#2E2F3D]">{PRACTITIONER.scopeNote}</p>
              </div>
            </Reveal>
          </div>

          {/* SIDEBAR */}
          <aside className="lg:col-span-5">
            <Parallax speed={26}>
              <div className="overflow-hidden rounded-[20px] border border-[#D7DEEA] bg-white shadow-[0_28px_64px_-34px_rgba(46,47,61,0.45)]">
                <img
                  src={OFFICE_INTERIOR}
                  alt={OFFICE_INTERIOR_ALT}
                  loading="lazy"
                  className="aspect-[4/3] w-full object-cover"
                />
                <div className="p-6">
                  <p className="font-heading text-[1.25rem] text-[#2E2F3D]">Where this happens</p>
                  <ul className="mt-5 flex flex-col gap-4 text-[14.5px] text-[#4B5468]">
                    <li className="flex items-start gap-3">
                      <MapPinIcon className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#46699F]" />
                      <span>
                        {NAP.street}
                        <br />
                        {NAP.city}, {NAP.state} {NAP.zip}
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <ClockIcon className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#46699F]" />
                      <span>Open late &mdash; most evenings until 21:00</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <PhoneIcon className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#46699F]" />
                      <a href={NAP.phoneHref} className="ph-tap ph-underline font-medium text-[#2E2F3D]">
                        {NAP.phone}
                      </a>
                    </li>
                  </ul>
                  <Link
                    href="/book"
                    className="mt-6 flex w-full items-center justify-center gap-2 rounded-[12px] bg-[#454659] px-6 py-3.5 text-[15px] font-semibold text-white transition-colors duration-300 hover:bg-[#33344A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#454659] focus-visible:ring-offset-2"
                  >
                    Book a Free Discovery Call
                    <ArrowRightIcon className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </Parallax>
          </aside>
        </div>
      </section>

      {/* FAQ -------------------------------------------------------------- */}
      <section className="bg-[#E6EFFF] py-20 sm:py-24">
        <div className="mx-auto max-w-[800px] px-4 sm:px-6">
          <div className="mb-10 text-center">
            <Reveal>
              <p className="mb-3 font-body text-xs font-semibold uppercase tracking-[0.18em] text-[#46699F] sm:text-[13px]">
                Before you call
              </p>
            </Reveal>
            <SplitHeading
              text="Common questions"
              className="font-heading text-[1.9rem] leading-[1.14] text-[#2E2F3D] sm:text-[2.4rem]"
            />
          </div>
          {/*
            No FAQPage schema on this route — it lives on /faq, beside the
            full list. Emitting the same three questions as FAQPage from
            fourteen service URLs would be duplicate structured data across
            the site, which is the opposite of helpful.
          */}
          <Reveal delay={0.1}>
            <FaqAccordion items={FAQS.slice(0, 3)} autoOpenOnScroll />
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-8 text-center">
              <Link
                href="/faq"
                className="ph-tap ph-underline inline-flex items-center gap-2 text-[15px] font-semibold text-[#46699F] transition-colors hover:text-[#2E2F3D] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#454659] focus-visible:ring-offset-2"
              >
                View all {FAQS.length} frequently asked questions
                <ArrowRightIcon className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* THE SETTING ------------------------------------------------------ */}
      <section className="relative overflow-hidden bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <div>
              <SectionHeading
                eyebrow="The setting"
                title="An hour at a time, in a quiet room"
                size="sm"
                lede={
                  <p>
                    In person at {NAP.street} in {NAP.city}, or by video anywhere in California. Same work, same
                    rate, whichever you can get to.
                  </p>
                }
              />
              <Reveal delay={0.2}>
                <Link
                  href="/contact"
                  className="ph-tap ph-underline mt-7 inline-flex items-center gap-2 text-[15px] font-semibold text-[#46699F] transition-colors hover:text-[#2E2F3D] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#454659] focus-visible:ring-offset-2"
                >
                  Find the office
                  <ArrowRightIcon className="h-4 w-4" />
                </Link>
              </Reveal>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <ClipReveal
                src={GALLERY[0].src}
                alt={GALLERY[0].alt}
                from="bottom"
                className="aspect-[3/4] overflow-hidden rounded-[16px] border border-[#D7DEEA]"
                imgClassName="h-full w-full object-cover"
              />
              <ClipReveal
                src={GALLERY[2].src}
                alt={GALLERY[2].alt}
                from="top"
                delay={0.12}
                className="mt-8 aspect-[3/4] overflow-hidden rounded-[16px] border border-[#D7DEEA]"
                imgClassName="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* RELATED ---------------------------------------------------------- */}
      <section className="bg-[#F7F9FC] py-20 sm:py-24">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="mb-10 font-heading text-[1.9rem] text-[#2E2F3D] sm:text-[2.2rem]">
              Other work Jason takes
            </h2>
          </Reveal>
          <Stagger className="grid auto-rows-fr grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3" gap={0.08}>
            {related.map((s) => (
              <StaggerItem key={s.slug} distance={26}>
                <ServiceCard service={s} variant="brief" />
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <ImageStrip images={SERVICES.slice(0, 9).map((s) => serviceImage(s.slug))} speed={84} className="bg-[#F7F9FC] pb-16" />

      <CtaBand
        title={`Talk through ${service.name.toLowerCase()} first`}
        body="The discovery call is free and carries no obligation to book a session afterwards."
      />
    </div>
  );
}
