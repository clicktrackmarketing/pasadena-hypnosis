import type { Metadata } from 'next';
import { BUSINESS } from './content';

/* ---------------------------------------------------------------------------
   Per-page metadata (launch audit 2026-10-20).

   Every page builds its metadata here so canonical, og:url and the share card
   always agree. In the App Router a child page's `openGraph` REPLACES the
   root layout's rather than merging with it, so a page that set only
   `openGraph.title` lost the image, site name and URL. This helper always
   sends the whole object.

   OG_IMAGE is a 1200x630 card made by scripts/make-og-image.mjs.
--------------------------------------------------------------------------- */

export const OG_IMAGE = {
  url: '/og-default.jpg',
  width: 1200,
  height: 630,
  alt: 'Pasadena Hypnosis: certified hypnotherapy with Jason Meissner in South Pasadena and online',
};

/** Google shows about 155-160 characters of a description. Cut at the last
    full sentence that fits, else at a word boundary with an ellipsis. */
export const clipDescription = (text: string, max = 158): string => {
  if (text.length <= max) return text;
  const head = text.slice(0, max);
  const sentenceEnd = Math.max(head.lastIndexOf('. '), head.lastIndexOf('? '));
  if (sentenceEnd > 80) return head.slice(0, sentenceEnd + 1);
  return head.slice(0, head.lastIndexOf(' ')).replace(/[,;:]$/, '') + '…';
};

type PageMetaInput = {
  title: string;
  description: string;
  /** Path from the site root, e.g. '/meet-jason'. */
  path: string;
  /** Use the title as-is, without the "| Pasadena Hypnosis" template. */
  absoluteTitle?: boolean;
  type?: 'website' | 'article';
  publishedTime?: string;
  keywords?: string[];
};

export const pageMeta = ({
  title,
  description,
  path,
  absoluteTitle = false,
  type = 'website',
  publishedTime,
  keywords,
}: PageMetaInput): Metadata => {
  const desc = clipDescription(description);
  const shareTitle = absoluteTitle ? title : `${title} | ${BUSINESS.name}`;
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description: desc,
    ...(keywords ? { keywords } : {}),
    alternates: { canonical: path },
    openGraph: {
      type,
      url: path,
      title: shareTitle,
      description: desc,
      siteName: BUSINESS.name,
      locale: 'en_US',
      images: [OG_IMAGE],
      ...(type === 'article' && publishedTime ? { publishedTime } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title: shareTitle,
      description: desc,
      images: [OG_IMAGE.url],
    },
  };
};
