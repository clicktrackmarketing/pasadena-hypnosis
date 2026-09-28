import type { Metadata } from 'next';
import Link from 'next/link';
import { NAP } from '../../components/content';
import { DESK_NOTEBOOK, serviceImage } from '../../components/unsplash';
import { PhoneIcon, ArrowRightIcon } from '../../components/Icons';
import { PageHero } from '../../components/PageHero';
import { heroPrimaryBtn, heroGhostBtn } from '../../components/buttons';
import { CtaBand } from '../../components/CtaBand';
import { TopicGrid, type TopicCard } from '../../components/pages/blog/TopicGrid';
import { TopicTicker } from '../../components/pages/blog/TopicTicker';

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
 *
 * SECOND REDESIGN 2026-09-28 — motion only, same eight entries:
 *   hero    a particle ribbon; the H1 slides up out of a mask word by word
 *   grid    bento layout, cards focus in from a blur (PopItem), cursor
 *           spotlight, photographs zoom and regain colour on hover
 *   ticker  two scroll-velocity marquees of the same subjects (aria-hidden)
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
  const cards: TopicCard[] = PLANNED_TOPICS.map((t) => {
    const img = t.slug ? serviceImage(t.slug) : null;
    return { title: t.title, related: t.related, img: img ? { src: img.src, alt: img.alt } : null };
  });

  // The ticker's display row names only the subjects that point at a
  // specific service page ("Pricing" and "All services" read oddly as
  // display words); the second row carries every planned title.
  const tickerLabels = PLANNED_TOPICS.flatMap((t) =>
    t.related && t.related.href.startsWith('/services/') ? [t.related.label] : [],
  );
  const tickerTitles = PLANNED_TOPICS.map((t) => t.title);

  return (
    <div>
      <PageHero
        eyebrow="Insights"
        title="Hypnotherapy insights"
        image={DESK_NOTEBOOK}
        scene="ribbon"
        intro="mask"
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

      <TopicGrid topics={cards} />

      <TopicTicker labels={tickerLabels} titles={tickerTitles} />

      <CtaBand
        title="Have a question now?"
        body="You do not have to wait for an article — the discovery call is free and Jason will answer it directly."
        secondary={{ href: '/faq', label: 'View FAQ' }}
      />
    </div>
  );
}
