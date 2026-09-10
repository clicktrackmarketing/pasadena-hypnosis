import type { MetadataRoute } from 'next';
import { SERVICES, SERVICE_AREAS } from '../components/content';

const areaSlug = (a: string) => a.split(',')[0].trim().toLowerCase().replace(/\s+/g, '-');

// References the eventual real production domain (profile.ts siteUrl:
// https://www.pasadenahypnosis.com), not this Vercel preview host — correct
// for launch, mismatched until the site is promoted off preview.
const base = 'https://www.pasadenahypnosis.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${base}/`, priority: 1, changeFrequency: 'monthly' as const },
    { url: `${base}/services`, priority: 0.9, changeFrequency: 'monthly' as const },
    { url: `${base}/service-areas`, priority: 0.8, changeFrequency: 'monthly' as const },
    { url: `${base}/pricing`, priority: 0.9, changeFrequency: 'monthly' as const },
    { url: `${base}/our-team`, priority: 0.7, changeFrequency: 'monthly' as const },
    { url: `${base}/book`, priority: 0.9, changeFrequency: 'monthly' as const },
    { url: `${base}/faq`, priority: 0.7, changeFrequency: 'monthly' as const },
    { url: `${base}/blog`, priority: 0.7, changeFrequency: 'weekly' as const },
    { url: `${base}/contact`, priority: 0.7, changeFrequency: 'monthly' as const },
    { url: `${base}/editorial-policy`, priority: 0.3, changeFrequency: 'yearly' as const },
    { url: `${base}/privacy`, priority: 0.2, changeFrequency: 'yearly' as const },
    { url: `${base}/terms`, priority: 0.2, changeFrequency: 'yearly' as const },
  ];
  const serviceRoutes: MetadataRoute.Sitemap = SERVICES.map((s) => ({
    url: `${base}/services/${s.slug}`,
    priority: 0.8,
    changeFrequency: 'monthly' as const,
  }));
  const areaRoutes: MetadataRoute.Sitemap = SERVICE_AREAS.map((a) => ({
    url: `${base}/service-areas/${areaSlug(a)}`,
    priority: 0.7,
    changeFrequency: 'monthly' as const,
  }));
  return [...staticRoutes, ...serviceRoutes, ...areaRoutes];
}
