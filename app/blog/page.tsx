import type { Metadata } from 'next';
import Link from 'next/link';
import { NAP } from '../../components/content';
import { DESK_NOTEBOOK, serviceImage } from '../../components/unsplash';
import { PhoneIcon, ArrowRightIcon } from '../../components/Icons';
import { PageHero, heroPrimaryBtn, heroGhostBtn } from '../../components/PageHero';
import { CtaBand } from '../../components/CtaBand';
import { Reveal, Stagger, StaggerItem } from '../../components/Motion';

// Target keywords (profile.ts targetKeywords['/blog']): "hypnotherapy blog los angeles".
export const metadata: Metadata = {
  title: 'Insights',
  description: 'Hypnotherapy insights from Pasadena Hypnosis — coming soon.',
  alternates: { canonical: '/blog' },
};

/*
 * Call 2 Content & Services Brief §8 (2026-09-10) — real planned topics, not
 * fabricated posts.
 *
 * THIS PAGE STAYS HONESTLY EMPTY, and the redesign did not change that. It
 * would have been trivial to give each card a date, a reading time, an author
 * byline and a two-line excerpt and make the page look finished. Every one of
 * those would be invented: the posts do not exist. So the cards carry the
 * planned title and the words "not written yet", and the page says so at the
 * top. A visibly-forthcoming list is a smaller cost than eight phantom
 * articles a reader clicks and cannot find.
 *
 * The `related` slug on each topic is real — it points at a service page that
 * does exist and does cover the subject, which is the useful thing this page
 * can offer today.
 */
const PLANNED_TOPICS: { title: string; slug?: string; related?: { label: string; href: string } }[] = [
  {
    title: 'Depression and hypnotherapy: what it actually looks like in session',
    slug: 'depression-bipolar-support',
    related: { label: 'Depression & Bipolar Support', href: '/services/depression-bipolar-support' },
  },
  {
    title: 'Living with disabling anxiety — when talk therapy and medication aren’t enough',
    slug: 'stress-and-anxiety',
    related: { label: 'Stress and Anxiety', href: '/services/stress-and-anxiety' },
  },
  {
    title: 'Does hypnosis really work to quit smoking?',
    slug: 'smoking-cessation',
    related: { label: 'Smoking Cessation', href: '/services/smoking-cessation' },
  },
  {
    title:
      'Gut-directed hypnotherapy for IBS: the evidence-based term your gastroenterologist may already know',
    slug: 'ibs',
    related: { label: 'Gut-Directed Hypnotherapy', href: '/services/ibs' },
  },
  {
    title: 'What chronic pain patients wish their doctor understood about the "pain alarm"',
    slug: 'chronic-pain',
    related: { label: 'Chronic Pain', href: '/services/chronic-pain' },
  },
  {
    title: 'Grief after loss: when it doesn’t get better on its own',
    slug: 'grief-and-loss',
    related: { label: 'Grief & Loss', href: '/services/grief-and-loss' },
  },
  {
    title: 'How much does hypnotherapy cost, and is it covered by insurance/HSA?',
    slug: 'hypnotherapy-sessions',
    related: { label: 'Pricing', href: '/pricing' },
  },
  {
    title: 'What makes gut-directed / clinical hypnotherapy different from stage hypnosis',
    slug: 'group-hypnotherapy-program',
    related: { label: 'All services', href: '/services' },
  },
];

export default function BlogIndexPage() {
  return (
    <div>
      <PageHero
        eyebrow="Insights"
        title="Hypnotherapy insights"
        image={DESK_NOTEBOOK}
        lede={
          <p>
            Jason is writing these himself, which is why there are none yet rather than eight generic ones. The
            planned subjects are below. In the meantime the service pages answer most of the same questions, and
            the phone answers the rest.
          </p>
        }
      >
        <Link href="/faq" className={heroPrimaryBtn}>
          Read the FAQ instead
          <ArrowRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
        <a href={NAP.phoneHref} className={heroGhostBtn}>
          <PhoneIcon className="h-4 w-4" />
          {NAP.phone}
        </a>
      </PageHero>

      <section className="bg-[#E6EFFF] py-20 sm:py-28">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="mb-10 flex flex-col gap-2 border-b border-[#2E2F3D]/12 pb-5 sm:flex-row sm:items-end sm:justify-between">
              <h2 className="font-heading text-[1.7rem] text-[#2E2F3D] sm:text-[2rem]">Planned, not yet written</h2>
              <p className="text-[12.5px] font-semibold uppercase tracking-[0.12em] text-[#46699F]">
                {PLANNED_TOPICS.length} subjects
              </p>
            </div>
          </Reveal>

          {/* Each card carries the photograph of the service it points at —
              the same slug-keyed image used on that service's own page. The
              picture is therefore doing something honest: it previews the page
              the "meanwhile" link actually goes to, rather than illustrating an
              article that does not exist. */}
          <Stagger className="grid auto-rows-fr grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4" gap={0.07}>
            {PLANNED_TOPICS.map((t) => {
              const img = t.slug ? serviceImage(t.slug) : null;
              return (
                <StaggerItem key={t.title} distance={26}>
                  <article className="group flex h-full flex-col overflow-hidden rounded-[18px] border border-[#D7DEEA] bg-white transition-all duration-500 hover:-translate-y-1.5 hover:border-[#46699F]/40 hover:shadow-[0_26px_56px_-30px_rgba(46,47,61,0.4)]">
                    {img ? (
                      <div className="relative aspect-[16/10] overflow-hidden">
                        <img
                          src={img.src}
                          alt={img.alt}
                          loading="lazy"
                          className="h-full w-full object-cover grayscale-[35%] transition-all duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.08] group-hover:grayscale-0"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#2E2F3D]/55 via-transparent to-transparent" />
                        <span className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-white/92 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.1em] text-[#2E2F3D] backdrop-blur-sm">
                          <span className="h-1.5 w-1.5 rounded-full bg-[#5DBA47]" aria-hidden="true" />
                          Not written yet
                        </span>
                      </div>
                    ) : null}
                    <div className="flex flex-1 flex-col p-6">
                      <h3 className="flex-1 font-heading text-[1.1rem] leading-snug text-[#2E2F3D]">{t.title}</h3>
                      {t.related ? (
                        <Link
                          href={t.related.href}
                          className="ph-tap ph-underline mt-5 inline-flex w-fit items-center gap-2 text-[13.5px] font-semibold text-[#46699F] transition-colors hover:text-[#2E2F3D] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#454659] focus-visible:ring-offset-2"
                        >
                          Meanwhile: {t.related.label}
                          <ArrowRightIcon className="h-3.5 w-3.5" />
                        </Link>
                      ) : null}
                    </div>
                  </article>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </section>

      <CtaBand
        title="Have a question now?"
        body="You do not have to wait for an article — the discovery call is free and Jason will answer it directly."
        secondary={{ href: '/faq', label: 'View FAQ' }}
      />
    </div>
  );
}
