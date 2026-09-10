import type { MetadataRoute } from 'next';

/**
 * Preview-stage robots.txt: disallow everything. The real permissive
 * per-bot ruleset (explicit allow for Googlebot, Bingbot, GPTBot, ClaudeBot,
 * PerplexityBot, Google-Extended, CCBot per profile.ts's aiPolicy) belongs
 * to the real production domain, www.pasadenahypnosis.com, at launch — not
 * to this Vercel preview host. Every client build in this pipeline keeps
 * its preview noindex/nofollow until a human promotes it
 * (pipeline/.claude/skills/site-build/SKILL.md), on top of the per-page
 * `robots: {index:false}` metadata in app/layout.tsx.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: '*', disallow: '/' }],
  };
}
