import type { Metadata } from 'next';
import Link from 'next/link';
import { SERVICE_AREAS, ONLINE_AREA, NAP } from '../../components/content';
import { PALMS_DAYLIGHT, FOOTHILL_RANGE, areaImage, serviceImage } from '../../components/unsplash';
import { OFFICE_INTERIOR, OFFICE_INTERIOR_ALT } from '../../components/assets';
import { ArrowRightIcon, MapPinIcon, PhoneIcon } from '../../components/Icons';
import { PageHero, heroPrimaryBtn, heroGhostBtn } from '../../components/PageHero';
import { CtaBand } from '../../components/CtaBand';
import { SERVICES } from '../../components/content';
import { Reveal, SplitHeading, Stagger, StaggerItem, Parallax } from '../../components/Motion';
import { ImageStrip } from '../../components/Bands';

// Target keywords (profile.ts targetKeywords['/service-areas']): "hypnotherapy
// near me", "hypnosis near me los angeles" — Call 2 brief's stated single
// biggest unclaimed opportunity (~6,600/mo combined, low-moderate difficulty).
export const metadata: Metadata = {
  title: 'Hypnotherapy Service Areas Near South Pasadena, CA',
  description:
    'Pasadena Hypnosis sees clients in person from a South Pasadena office and serves Pasadena, South Pasadena, Glendale, Eagle Rock and Arcadia, plus online statewide.',
  alternates: { canonical: '/service-areas' },
};

const areaSlug = (a: string) => a.split(',')[0].trim().toLowerCase().replace(/\s+/g, '-');

export default function ServiceAreasHubPage() {
  return (
    <div>
      <PageHero
        eyebrow="Service areas"
        title="Hypnotherapy near you, from a real South Pasadena office"
        image={PALMS_DAYLIGHT}
        size="lg"
        facts={[
          { k: 'In person', v: '5 cities' },
          { k: 'Online', v: 'All of California' },
          { k: 'Office', v: 'South Pasadena' },
          { k: 'First call', v: 'Free' },
        ]}
        lede={
          <p>
            In person at {NAP.street} in {NAP.city}, and by video anywhere in California. These are the areas Jason
            Meissner most often sees clients from in person.
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

      {/* THE FIVE CITIES --------------------------------------------------
          FIVE, AND NOT NINE. The original audit assumed a drive-time radius
          that included Alhambra, Altadena, San Marino and Sierra Madre; Jason
          confirmed only these five on Call 2, and content.ts was trimmed to
          match. A service-area grid is exactly where a redesign is tempted to
          pad the list back out for coverage — every extra city here is a page
          promising something nobody agreed to. This renders the array. */}
      <section className="bg-[#E6EFFF] py-20 sm:py-28">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="mb-10 flex flex-col gap-2 border-b border-[#2E2F3D]/12 pb-5 sm:flex-row sm:items-end sm:justify-between">
              <h2 className="font-heading text-[1.7rem] text-[#2E2F3D] sm:text-[2rem]">In person</h2>
              <p className="text-[12.5px] font-semibold uppercase tracking-[0.12em] text-[#46699F]">
                {SERVICE_AREAS.length} cities
              </p>
            </div>
          </Reveal>

          <Stagger className="grid auto-rows-fr grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3" gap={0.08}>
            {SERVICE_AREAS.map((a) => {
              const city = a.split(',')[0].trim();
              const slug = areaSlug(a);
              /* South Pasadena shows the practice's OWN office, because the
                 office genuinely is in South Pasadena. Every other city gets
                 a photograph its photographer described as that place, or the
                 shared foothill fallback. See AREA_IMAGE_BY_SLUG. */
              const isHome = slug === 'south-pasadena';
              const img = isHome
                ? { src: OFFICE_INTERIOR, alt: OFFICE_INTERIOR_ALT }
                : areaImage(slug);
              return (
                <StaggerItem key={a} distance={26}>
                  <Link
                    href={`/service-areas/${areaSlug(a)}`}
                    className="group flex h-full flex-col overflow-hidden rounded-[18px] border border-[#D7DEEA] bg-white transition-all duration-500 hover:-translate-y-1.5 hover:border-[#46699F]/40 hover:shadow-[0_28px_60px_-28px_rgba(46,47,61,0.4)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#454659] focus-visible:ring-offset-2"
                  >
                    <div className="relative aspect-[16/9] overflow-hidden">
                      <img
                        src={img.src}
                        alt={img.alt}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.08]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#2E2F3D]/75 via-[#2E2F3D]/15 to-transparent" />
                      {isHome ? (
                        <span className="absolute left-4 top-4 inline-flex items-center rounded-full bg-[#5DBA47] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.1em] text-[#2E2F3D]">
                          The office
                        </span>
                      ) : null}
                      <h3 className="absolute bottom-4 left-5 right-5 font-heading text-[1.35rem] text-white">
                        Hypnotherapy in {city}
                      </h3>
                    </div>
                    <div className="flex flex-1 items-center justify-between gap-4 p-5">
                      <span className="inline-flex items-center gap-2 text-[13.5px] text-[#4B5468]">
                        <MapPinIcon className="h-4 w-4 text-[#46699F]" />
                        {a}
                      </span>
                      <ArrowRightIcon className="h-4 w-4 flex-shrink-0 text-[#46699F] transition-transform duration-300 group-hover:translate-x-1" />
                    </div>
                  </Link>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </section>

      <ImageStrip images={SERVICES.slice(0, 8).map((s) => serviceImage(s.slug))} speed={82} className="bg-[#E6EFFF] pb-20" />

      {/* ONLINE ----------------------------------------------------------- */}
      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto grid max-w-[1280px] grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
          <div>
            <Reveal>
              <p className="mb-3 font-body text-xs font-semibold uppercase tracking-[0.18em] text-[#46699F] sm:text-[13px]">
                Everywhere else
              </p>
            </Reveal>
            <SplitHeading
              text={ONLINE_AREA}
              className="max-w-[16ch] font-heading text-[1.9rem] leading-[1.14] text-[#2E2F3D] sm:text-[2.4rem]"
            />
            <Reveal delay={0.15}>
              <p className="mt-6 max-w-[54ch] text-[16.5px] leading-[1.72] text-[#4B5468]">
                Video sessions are the same work at the same rate, and roughly half the practice runs that way. If
                you are outside the five cities above, that is the route &mdash; not a lesser version of it.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <Link
                href="/services/online-hypnotherapy"
                className="ph-tap ph-underline mt-7 inline-flex items-center gap-2 text-[15px] font-semibold text-[#46699F] transition-colors hover:text-[#2E2F3D] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#454659] focus-visible:ring-offset-2"
              >
                About online hypnotherapy
                <ArrowRightIcon className="h-4 w-4" />
              </Link>
            </Reveal>
          </div>

          <Parallax speed={28}>
            <figure className="overflow-hidden rounded-[20px] border border-[#D7DEEA] shadow-[0_30px_70px_-34px_rgba(46,47,61,0.45)]">
              <img
                src={FOOTHILL_RANGE.src}
                alt={FOOTHILL_RANGE.alt}
                loading="lazy"
                className="aspect-[4/3] w-full object-cover"
              />
            </figure>
          </Parallax>
        </div>
      </section>

      <CtaBand
        title="Outside these cities? Online works the same way."
        body="Same rate, same conditions treated, anywhere in California."
        secondary={{ href: '/services/online-hypnotherapy', label: 'Online Hypnotherapy' }}
      />
    </div>
  );
}
