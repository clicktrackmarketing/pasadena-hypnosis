import { BUSINESS, HOURS, NAP, POSTS, PRACTITIONER, SERVICES, SERVICE_AREAS, RATING } from '../../components/content';
import { areaSlug, areaCity } from '../../components/pages/service-areas/areas';

/* /llms.txt for AI answer engines (launch audit 2026-10-20).

   Built from the same data as the pages and the sitemap, so it cannot drift
   when a service, city page or post is added: a hand-written llms.txt goes
   stale silently. Static at build time.

   Copy rules apply here too (docs/markup-round-one.md): no "California" as a
   service range, no session counts, no guaranteed results. */
export const dynamic = 'force-static';

export function GET() {
  const url = BUSINESS.url;
  const services = SERVICES.map((s) => {
    const price = s.price === 0 ? 'free' : s.price ? `$${s.price}` : null;
    return `- [${s.name}](${url}/services/${s.slug})${price ? ` (${price})` : ''}: ${s.summary}`;
  }).join('\n');
  const areas = SERVICE_AREAS.map((a) => `- [${areaCity(a)}](${url}/service-areas/${areaSlug(a)})`).join('\n');
  const posts = POSTS.map((p) => `- [${p.title}](${url}/blog/${p.slug}): ${p.description}`).join('\n');
  const hours = HOURS.map((h) => `${h.days}: ${h.time}`).join('; ');

  const body = `# ${BUSINESS.name}: certified hypnotherapy in South Pasadena and online

> ${NAP.name} is a hypnotherapy practice run by ${PRACTITIONER.name}, a certified hypnotherapist trained at the Hypnosis Motivation Institute. Sessions are in person at ${NAP.street}, ${NAP.city}, ${NAP.state} ${NAP.zip}, or online for clients anywhere. A free discovery call comes first. Hypnotherapy is not a substitute for medical or psychiatric care.

- Phone: ${NAP.phone}
- Email: ${NAP.email}
- Hours: ${hours}
- Standard session: $200, in the office or online. Smoking cessation: $400. Discovery call: free.
- Google rating: ${RATING.value.toFixed(1)} from ${RATING.count} reviews

## Services

${services}

## Service areas

In person at the South Pasadena office for:

${areas}

Online sessions are available anywhere.

## About

- [Meet Jason Meissner](${url}/meet-jason): training, credentials and documents
- [About the practice](${url}/about)
- [Pricing](${url}/pricing)
- [Frequently asked questions](${url}/faq)
- [Book a free discovery call](${url}/book)
- [Contact and directions](${url}/contact)

## Articles

${posts}

## Policies

- [Editorial policy](${url}/editorial-policy)
- [Privacy policy](${url}/privacy)
- [Terms of service](${url}/terms)
`;

  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
