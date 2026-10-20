import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ORG_ID, PERSON_ID, POSTS, PRACTITIONER, SERVICES } from '../../../components/content';
import { pageMeta } from '../../../components/seo';
import { serviceImage } from '../../../components/unsplash';
import { ArrowRightIcon } from '../../../components/Icons';
import { PageHero } from '../../../components/PageHero';
import { heroPrimaryBtn } from '../../../components/buttons';
import { CtaBand } from '../../../components/CtaBand';
import { serviceScene } from '../../../components/pages/services/shapes';

/*
 * A blog post Jason wrote himself. The words are his (see the POSTS note in
 * content.ts); this page adds only the frame: the hero, a byline he is the
 * subject of, the date it went live, and a link to the service page the post
 * belongs beside.
 */

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const post = POSTS.find((p) => p.slug === slug);
  if (!post) return {};
  return pageMeta({
    title: post.title,
    description: post.description,
    path: `/blog/${post.slug}`,
    type: 'article',
    publishedTime: post.date,
  });
}

const longDate = (iso: string) =>
  new Date(`${iso}T12:00:00Z`).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' });

export default async function BlogPostPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const post = POSTS.find((p) => p.slug === slug);
  if (!post) notFound();

  const service = SERVICES.find((s) => s.slug === post.service);
  const img = serviceImage(post.service);
  const { scene, hover } = serviceScene(post.service);
  const url = `https://www.pasadenahypnosis.com/blog/${post.slug}`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.pasadenahypnosis.com/' },
          { '@type': 'ListItem', position: 2, name: 'Insights', item: 'https://www.pasadenahypnosis.com/blog' },
          { '@type': 'ListItem', position: 3, name: post.title, item: url },
        ],
      },
      {
        '@type': 'BlogPosting',
        headline: post.title,
        description: post.description,
        datePublished: post.date,
        mainEntityOfPage: url,
        image: `https://www.pasadenahypnosis.com${img.src}`,
        author: { '@type': 'Person', '@id': PERSON_ID, name: PRACTITIONER.name },
        publisher: { '@id': ORG_ID },
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

      <PageHero
        eyebrow="Insights"
        title={post.title}
        image={img}
        scene={scene}
        sceneHover={hover}
        intro="rise"
        breadcrumb={{ label: 'All insights', href: '/blog' }}
        facts={[
          { k: 'Written by', v: PRACTITIONER.name },
          { k: 'Published', v: longDate(post.date) },
        ]}
      >
        {service ? (
          <Link href={`/services/${service.slug}`} className={heroPrimaryBtn}>
            {service.name}
            <ArrowRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        ) : null}
      </PageHero>

      <article className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-[720px] px-4 sm:px-6">
          {post.paras.map((p, i) => (
            <p
              key={i}
              className={`text-[#2E2F3D] ${
                i === 0
                  ? 'font-heading text-[1.35rem] leading-[1.55] sm:text-[1.55rem]'
                  : 'mt-6 text-[17px] leading-[1.8] text-[#4B5468] sm:text-[18px]'
              }`}
            >
              {p}
            </p>
          ))}
          <p className="mt-12 border-t border-[#D7DEEA] pt-6 text-[15px] text-[#4B5468]">
            {PRACTITIONER.name}, Pasadena Hypnosis
          </p>
        </div>
      </article>

      <CtaBand title="Let us know how we can help" body="A free discovery call comes first." />
    </div>
  );
}
