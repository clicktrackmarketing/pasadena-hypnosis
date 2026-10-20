import type { MetadataRoute } from 'next';
import { BUSINESS } from '../components/content';
import { isIndexable } from '../components/indexing';

/**
 * robots.txt follows the same switch as the page-level robots meta
 * (components/indexing.ts): disallow everything on the Vercel preview host
 * and in development, allow everything on the live pasadenahypnosis.com
 * production deployment, with the sitemap. Bots are not singled out:
 * profile.ts's aiPolicy allows Googlebot, Bingbot, GPTBot, ClaudeBot,
 * PerplexityBot, Google-Extended and CCBot, which `allow: '/'` for every
 * agent already covers.
 */
export default function robots(): MetadataRoute.Robots {
  if (!isIndexable()) {
    return { rules: [{ userAgent: '*', disallow: '/' }] };
  }
  return {
    rules: [{ userAgent: '*', allow: '/' }],
    sitemap: `${BUSINESS.url}/sitemap.xml`,
    host: BUSINESS.url,
  };
}
