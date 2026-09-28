import type { Metadata } from 'next';
import { NAP, HOURS, SERVICE_AREAS } from '../../components/content';
import { OFFICE_INTERIOR, OFFICE_INTERIOR_ALT } from '../../components/assets';
import { PASADENA_CITY_HALL, GALLERY } from '../../components/unsplash';
import { ClockIcon, MapPinIcon, PhoneIcon, MailIcon, ArrowRightIcon } from '../../components/Icons';
import { BookingForm } from '../../components/BookingForm';
import { PageHero, heroPrimaryBtn, heroGhostBtn } from '../../components/PageHero';
import { Reveal, Stagger, StaggerItem, Parallax } from '../../components/Motion';
import { ImageStrip } from '../../components/Bands';

// Target keywords (profile.ts targetKeywords['/contact']): "pasadena hypnosis
// contact", "hypnotherapy south pasadena phone".
export const metadata: Metadata = {
  title: 'Contact Pasadena Hypnosis',
  description: `Call ${NAP.phone}, book a free discovery call, or visit Pasadena Hypnosis at ${NAP.street} in ${NAP.city}, CA.`,
  alternates: { canonical: '/contact' },
};

export default function ContactPage() {
  return (
    <div>
      <PageHero
        eyebrow="Contact"
        title="Get in touch"
        image={PASADENA_CITY_HALL}
        facts={[
          { k: 'Phone', v: '(626) 616-0143' },
          { k: 'Address', v: '1910 Huntington Dr' },
          { k: 'Open until', v: '21:00 most evenings' },
          { k: 'Also', v: 'Video, statewide' },
        ]}
        lede={
          <p>
            Call, book a free discovery call online, or visit the South Pasadena office directly. Jason answers his
            own phone.
          </p>
        }
      >
        <a href={NAP.phoneHref} className={heroPrimaryBtn}>
          <PhoneIcon className="h-4 w-4" />
          {NAP.phone}
        </a>
        <a href={`mailto:${NAP.email}`} className={heroGhostBtn}>
          <MailIcon className="h-4 w-4" />
          Email instead
        </a>
      </PageHero>

      {/* QUICK CONTACT TILES ---------------------------------------------- */}
      <section className="border-b border-[#D7DEEA] bg-white py-12">
        <Stagger className="mx-auto grid max-w-[1280px] grid-cols-1 gap-5 px-4 sm:grid-cols-3 sm:px-6 lg:px-8" gap={0.09}>
          {[
            {
              icon: <PhoneIcon className="h-5 w-5" />,
              label: 'Call',
              value: NAP.phone,
              href: NAP.phoneHref,
              note: 'Fastest route to a person',
            },
            {
              icon: <MailIcon className="h-5 w-5" />,
              label: 'Email',
              value: NAP.email,
              href: `mailto:${NAP.email}`,
              note: 'For anything not urgent',
            },
            {
              icon: <MapPinIcon className="h-5 w-5" />,
              label: 'Visit',
              value: `${NAP.street}, ${NAP.city}`,
              href: NAP.directions,
              note: 'Opens Google Maps',
              external: true,
            },
          ].map((t) => (
            <StaggerItem key={t.label}>
              <a
                href={t.href}
                {...(t.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="group flex h-full flex-col rounded-[18px] border border-[#D7DEEA] bg-white p-6 transition-all duration-400 hover:-translate-y-1 hover:border-[#46699F]/45 hover:shadow-[0_22px_50px_-28px_rgba(46,47,61,0.4)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#454659] focus-visible:ring-offset-2"
              >
                <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-[#E6EFFF] text-[#46699F] transition-colors duration-300 group-hover:bg-[#46699F] group-hover:text-white">
                  {t.icon}
                </span>
                <p className="text-[11.5px] font-bold uppercase tracking-[0.14em] text-[#46699F]">{t.label}</p>
                <p className="mt-1.5 break-words font-heading text-[1.15rem] text-[#2E2F3D]">{t.value}</p>
                <p className="mt-2 text-[13px] text-[#4B5468]">{t.note}</p>
              </a>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* DETAILS + FORM --------------------------------------------------- */}
      <section className="bg-[#E6EFFF] py-16 sm:py-24">
        <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_1.15fr] lg:gap-14 lg:px-8">
          <div className="flex flex-col gap-6">
            <Reveal>
              <div className="rounded-[20px] border border-[#D7DEEA] bg-white p-6 sm:p-8">
                <h2 className="mb-6 font-heading text-[1.5rem] text-[#2E2F3D]">The office</h2>

                <div className="flex flex-col gap-6">
                  <div className="flex items-start gap-3.5">
                    <MapPinIcon className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#46699F]" />
                    <address className="not-italic">
                      <p className="font-medium text-[#2E2F3D]">{NAP.street}</p>
                      <p className="text-[#2E2F3D]">
                        {NAP.city}, {NAP.state} {NAP.zip}
                      </p>
                      <a
                        href={NAP.directions}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ph-tap ph-underline mt-1.5 inline-flex items-center gap-1.5 text-[13px] font-medium text-[#46699F]"
                      >
                        Get directions
                        <ArrowRightIcon className="h-3.5 w-3.5" />
                      </a>
                    </address>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <ClockIcon className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#46699F]" />
                    <dl className="w-full">
                      {HOURS.map((h) => (
                        <div
                          key={h.days}
                          className="flex items-baseline justify-between gap-6 border-b border-[#D7DEEA] py-2 last:border-0"
                        >
                          <dt className="text-[14.5px] text-[#4B5468]">{h.days}</dt>
                          <dd className="text-[14.5px] font-semibold tabular-nums text-[#2E2F3D]">{h.time}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                </div>

                {/* No suite number anywhere on this page: it is unverified.
                    See the NAP note in content.ts. */}
                <p className="mt-6 border-t border-[#D7DEEA] pt-5 text-[13px] leading-[1.65] text-[#4B5468]">
                  Several other practitioners work out of the same building. Sessions also run by video anywhere in
                  California, including for clients in {SERVICE_AREAS.slice(0, 3).map((a) => a.split(',')[0]).join(', ')} and
                  beyond.
                </p>
              </div>
            </Reveal>

            <Parallax speed={22}>
              <figure className="overflow-hidden rounded-[20px] border border-[#D7DEEA] shadow-[0_26px_60px_-34px_rgba(46,47,61,0.45)]">
                <img
                  src={OFFICE_INTERIOR}
                  alt={OFFICE_INTERIOR_ALT}
                  loading="lazy"
                  className="aspect-[4/3] w-full object-cover"
                />
              </figure>
            </Parallax>
          </div>

          <Reveal delay={0.1}>
            <BookingForm />
          </Reveal>
        </div>
      </section>

      <ImageStrip images={GALLERY} speed={86} className="bg-[#E6EFFF] pb-20" />
    </div>
  );
}
