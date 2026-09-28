import type { Metadata } from 'next';
import Link from 'next/link';
import { PRACTITIONER, CREDENTIALS, RATING, NAP, REAL_COPY, SERVICES } from '../../components/content';
import { PORTRAIT, PORTRAIT_ALT, OFFICE_INTERIOR, OFFICE_INTERIOR_ALT } from '../../components/assets';
import * as ASSETS from '../../components/assets';
import { BAMBOO_WALKWAY, GALLERY } from '../../components/unsplash';
import { ShieldCheckIcon, ArrowRightIcon, PhoneIcon, StarIcon, CheckIcon, MapPinIcon } from '../../components/Icons';
import { PageHero, heroPrimaryBtn, heroGhostBtn } from '../../components/PageHero';
import { CtaBand } from '../../components/CtaBand';
import { ServiceCard } from '../../components/ServiceCard';
import { SectionHeading } from '../../components/SectionHeading';
import { ImageStrip } from '../../components/Bands';
import { Reveal, Stagger, StaggerItem, Parallax, Counter, ClipReveal } from '../../components/Motion';
import { CredentialTimeline } from '../../components/home/CredentialTimeline';

/* ---------------------------------------------------------------------------
   OUR TEAM.

   THE PROBLEM THIS PAGE HAS TO SOLVE. "Our Team" on a solo practice is
   usually an apology — one headshot under a plural heading, padded out to look
   like a firm. This version does the opposite and treats the solo part as the
   argument: one person, named, with every document he holds photographed at a
   size you can actually read.

   WHAT IS ON THE PAGE IS WHAT EXISTS. There are five certificates and they are
   all here. There is no "team" section with invented associates, no stock
   headshots captioned as staff, no "years of combined experience" arithmetic.
   The practitioner block, the timeline and the document wall are all driven by
   CREDENTIALS and PRACTITIONER in content.ts.

   THE TIMELINE IS NOT DECORATIVE. Every node is the date printed on a
   certificate this page also displays — March 8, April 14, April 19, April 21
   and October 8, all 2016 — sorted by that date rather than by array order. It
   is the one genuinely new thing this redesign found in the data, and it tells
   a true story the old page buried: the four AHA specialisms were earned
   before the HMI diploma completed in October.

   Nothing is inferred to fill the sequence. There is no "2018: opened the
   practice" node, because no document says that.
--------------------------------------------------------------------------- */

// Target keywords (profile.ts targetKeywords['/our-team']): "jason meissner hypnotherapist".
export const metadata: Metadata = {
  title: 'Our Team — Jason Meissner, Certified Hypnotherapist',
  description:
    "Jason Meissner completed a year of accredited training and supervised residency at the Hypnosis Motivation Institute and has practiced hypnotherapy for 10 years in South Pasadena, California.",
  alternates: { canonical: '/our-team' },
};

function credentialImage(key: string) {
  const rec = ASSETS as unknown as Record<string, string | number>;
  return { src: rec[key] as string, width: rec[key + '_W'] as number, height: rec[key + '_H'] as number };
}

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: PRACTITIONER.name,
  jobTitle: PRACTITIONER.role,
  description: PRACTITIONER.bio,
  alumniOf: { '@type': 'EducationalOrganization', name: 'Hypnosis Motivation Institute', url: 'https://hypnosis.edu' },
  hasCredential: CREDENTIALS.map((c) => ({
    '@type': 'EducationalOccupationalCredential',
    name: c.award,
    credentialCategory: c.featured ? 'diploma' : 'certificate',
    dateCreated: c.date,
    recognizedBy: { '@type': 'Organization', name: c.issuer },
    ...(c.ref ? { identifier: c.ref } : {}),
  })),
};

export default function OurTeamPage() {
  const featured = CREDENTIALS.filter((c) => c.featured);
  const rest = CREDENTIALS.filter((c) => !c.featured);

  /* Sorted by the date PRINTED ON THE DOCUMENT, not by position in the array.
     Ordering by array index happened to put the diploma first, which reversed
     the real sequence and implied the specialisms came after it. */
  const chronological = [...CREDENTIALS].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
  );

  const topServices = SERVICES.slice(0, 3);

  return (
    <div>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />

      <PageHero
        eyebrow="Our team"
        title="One hypnotherapist, and every document behind him"
        image={BAMBOO_WALKWAY}
        media={{
          src: PORTRAIT,
          alt: PORTRAIT_ALT,
          caption: 'Jason Meissner, Certified Hypnotherapist and owner.',
          aspect: '4/5',
        }}
        facts={[
          { k: 'Trained at', v: 'Hypnosis Motivation Institute' },
          { k: 'Graduated', v: '2016, with Honors' },
          { k: 'In practice', v: '10 years' },
          { k: 'Certificates', v: 'Five, shown below' },
        ]}
        lede={
          <p>
            Pasadena Hypnosis is a solo practice. There is no associate to be handed to and no rotating roster
            &mdash; the person you speak to on the discovery call is the person in the room.
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

      {/* THE PRACTITIONER ------------------------------------------------- */}
      <section className="relative overflow-hidden bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <SectionHeading eyebrow={PRACTITIONER.role} title={PRACTITIONER.name} size="lg" />

              <Reveal delay={0.15}>
                <p className="mt-8 max-w-[62ch] text-[17px] leading-[1.75] text-[#4B5468]">{PRACTITIONER.bio}</p>
              </Reveal>

              {/* His own words about the training, verbatim from the live
                  site — the point of REAL_COPY is that the new site sounds
                  like the man who wrote the old one. */}
              <Reveal delay={0.2}>
                <blockquote className="mt-10 border-l-2 border-[#5DBA47] pl-6">
                  <p className="font-heading text-[1.3rem] leading-[1.5] text-[#2E2F3D] sm:text-[1.5rem]">
                    &ldquo;{REAL_COPY.about.training}&rdquo;
                  </p>
                  <footer className="mt-3 text-[13px] text-[#4B5468]">
                    Jason Meissner, in his own words on pasadenahypnosis.com
                  </footer>
                </blockquote>
              </Reveal>

              <Stagger className="mt-10 grid auto-rows-fr grid-cols-1 gap-4 sm:grid-cols-2" gap={0.1}>
                {PRACTITIONER.credentials.map((c) => (
                  <StaggerItem key={c.title}>
                    <div className="flex h-full gap-3.5 rounded-[16px] border border-[#D7DEEA] bg-[#E6EFFF] p-5">
                      <CheckIcon className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#46699F]" />
                      <div>
                        <p className="font-heading text-[1.05rem] leading-snug text-[#2E2F3D]">{c.title}</p>
                        <p className="mt-1.5 text-[13.5px] leading-[1.6] text-[#4B5468]">{c.detail}</p>
                      </div>
                    </div>
                  </StaggerItem>
                ))}
              </Stagger>
            </div>

            {/* NUMBERS + THE ROOM */}
            <aside className="lg:col-span-5">
              <div className="lg:sticky lg:top-32">
                <Stagger className="grid grid-cols-2 gap-4" gap={0.12}>
                  <StaggerItem>
                    <div className="rounded-[16px] border border-[#D7DEEA] bg-white p-5">
                      <p className="font-heading text-[2.3rem] leading-none text-[#2E2F3D]">
                        <Counter to={10} duration={1.5} />
                      </p>
                      <p className="mt-2 text-[11.5px] uppercase tracking-[0.12em] text-[#4B5468]">
                        years in practice
                      </p>
                    </div>
                  </StaggerItem>
                  <StaggerItem>
                    <div className="rounded-[16px] border border-[#D7DEEA] bg-[#E9F3EF] p-5">
                      <p className="flex items-baseline gap-1.5 font-heading text-[2.3rem] leading-none text-[#2E2F3D]">
                        <Counter to={RATING.value} decimals={1} duration={1.5} />
                        <StarIcon className="h-5 w-5 translate-y-[-3px] text-[#5DBA47]" />
                      </p>
                      <p className="mt-2 text-[11.5px] uppercase tracking-[0.12em] text-[#4B5468]">
                        from {RATING.count} Google reviews
                      </p>
                    </div>
                  </StaggerItem>
                </Stagger>

                <Parallax speed={20} className="mt-4">
                  <figure className="relative overflow-hidden rounded-[18px] border border-[#D7DEEA] shadow-[0_28px_64px_-34px_rgba(46,47,61,0.45)]">
                    <img
                      src={OFFICE_INTERIOR}
                      alt={OFFICE_INTERIOR_ALT}
                      loading="lazy"
                      className="aspect-[4/3] w-full object-cover"
                    />
                    <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#2E2F3D] via-[#2E2F3D]/80 to-transparent p-5 pt-14">
                      <p className="inline-flex items-center gap-2 text-[13px] text-[#D9E1F0]">
                        <MapPinIcon className="h-4 w-4 flex-shrink-0 text-[#5DBA47]" />
                        {NAP.street}, {NAP.city}
                      </p>
                    </figcaption>
                  </figure>
                </Parallax>

                {/* REAL_COPY.about.office, verbatim — it is the sentence that
                    explains the shared building, which a first-time visitor
                    otherwise finds out on the doorstep. */}
                <Reveal delay={0.1}>
                  <p className="mt-4 text-[14px] leading-[1.68] text-[#4B5468]">{REAL_COPY.about.office}</p>
                </Reveal>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* 2016 TIMELINE ---------------------------------------------------- */}
      <CredentialTimeline items={chronological.map((c) => ({ date: c.date, award: c.award, issuer: c.issuer, ref: c.ref }))} />

      {/* THE DOCUMENTS ----------------------------------------------------
          The artwork is the point. Each card shows the certificate above its
          transcription so a prospect can check every printed line — issuer,
          award wording, date, certificate number — against the image beside
          it. Nothing here is inferred; see the CREDENTIALS header note in
          content.ts, including why the HMI diploma reads 2016 and not the
          2018 the harvest manifest recorded. */}
      <section className="relative overflow-hidden bg-[#E6EFFF] py-20 sm:py-28">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
          <SectionHeading
            className="mb-12 sm:mb-14"
            eyebrow="Verifiable"
            title="The documents themselves"
            lede={
              <p>
                Five certificates, photographed and transcribed field by field. Read the image, then read the line
                beneath it &mdash; they should say the same thing.
              </p>
            }
            aside={
              <p className="text-[12.5px] font-semibold uppercase tracking-[0.12em] text-[#46699F]">
                {CREDENTIALS.length} on file
              </p>
            }
          />

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
            {featured.map((c) => {
              const img = credentialImage(c.img);
              return (
                <Reveal key={c.img} className="lg:col-span-5 lg:self-start">
                  <figure className="overflow-hidden rounded-[18px] border border-[#46699F]/30 bg-white shadow-[0_26px_60px_-32px_rgba(46,47,61,0.45)]">
                    <ClipReveal
                      src={img.src}
                      alt={c.alt}
                      from="bottom"
                      className="overflow-hidden border-b border-[#D7DEEA]"
                      imgClassName="w-full"
                    />
                    <figcaption className="p-6 sm:p-7">
                      <span className="mb-3 inline-flex items-center rounded-full bg-[#5DBA47] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.1em] text-[#2E2F3D]">
                        The diploma
                      </span>
                      <p className="font-heading text-[1.3rem] leading-snug text-[#2E2F3D]">{c.award}</p>
                      <dl className="mt-4 flex flex-col gap-2 border-t border-[#D7DEEA] pt-4 text-[13.5px]">
                        <div className="flex gap-3">
                          <dt className="w-20 flex-shrink-0 text-[#4B5468]">Issuer</dt>
                          <dd className="text-[#2E2F3D]">{c.issuer}</dd>
                        </div>
                        {c.issuerNote ? (
                          <div className="flex gap-3">
                            <dt className="w-20 flex-shrink-0 text-[#4B5468]">Accredited</dt>
                            <dd className="text-[#2E2F3D]">{c.issuerNote}</dd>
                          </div>
                        ) : null}
                        <div className="flex gap-3">
                          <dt className="w-20 flex-shrink-0 text-[#4B5468]">Dated</dt>
                          <dd className="text-[#2E2F3D]">{c.date}</dd>
                        </div>
                      </dl>
                      {c.note ? (
                        <p className="mt-4 text-[14px] leading-[1.65] text-[#4B5468]">{c.note}</p>
                      ) : null}
                    </figcaption>
                  </figure>
                </Reveal>
              );
            })}

            <Stagger className="grid auto-rows-fr grid-cols-1 gap-5 sm:grid-cols-2 lg:col-span-7" gap={0.08}>
              {rest.map((c) => {
                const img = credentialImage(c.img);
                return (
                  <StaggerItem key={c.img}>
                    <figure className="flex h-full flex-col overflow-hidden rounded-[16px] border border-[#D7DEEA] bg-white transition-all duration-500 hover:-translate-y-1 hover:border-[#46699F]/40 hover:shadow-[0_24px_52px_-28px_rgba(46,47,61,0.4)]">
                      <img
                        src={img.src}
                        alt={c.alt}
                        width={img.width}
                        height={img.height}
                        loading="lazy"
                        className="w-full border-b border-[#D7DEEA]"
                      />
                      <figcaption className="flex flex-1 flex-col p-5">
                        <p className="line-clamp-2 min-h-[2.8rem] text-[14.5px] font-semibold leading-snug text-[#2E2F3D]">
                          {c.award}
                        </p>
                        <p className="mt-auto pt-3 text-[12.5px] leading-[1.5] text-[#4B5468]">
                          {c.issuer}
                          <br />
                          {c.date}
                          {c.ref ? ` · Cert. #${c.ref}` : ''}
                        </p>
                      </figcaption>
                    </figure>
                  </StaggerItem>
                );
              })}
            </Stagger>
          </div>
        </div>
      </section>

      {/* SCOPE ------------------------------------------------------------
          Full width, on its own ground, at body-copy size rather than
          footnote size. This is the sentence that makes the five certificates
          above read as fact rather than as a sales pitch — a page that
          displays credentials this prominently has to state their limit just
          as plainly. */}
      <section className="relative overflow-hidden bg-[#E9F3EF] py-16 sm:py-20">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-start gap-6 rounded-[20px] border border-[#2E2F3D]/10 bg-white/70 p-7 backdrop-blur-sm sm:flex-row sm:items-center sm:p-9">
            <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-[#E9F3EF]">
              <ShieldCheckIcon className="h-6 w-6 text-[#2E2F3D]" />
            </span>
            <div>
              <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.16em] text-[#46699F]">
                What these credentials are, and are not
              </p>
              <p className="max-w-[80ch] text-[15.5px] leading-[1.72] text-[#2E2F3D]">
                {PRACTITIONER.scopeNote}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT HE TAKES ---------------------------------------------------- */}
      <section className="relative overflow-hidden bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
          <SectionHeading
            className="mb-12"
            eyebrow="The work"
            title="What Jason actually treats"
            lede={
              <p>
                The certificates above map onto real services. These are the three he leads with; there are{' '}
                {SERVICES.length} in total.
              </p>
            }
            aside={
              <Link
                href="/services"
                className="group inline-flex items-center gap-2 rounded-full border border-[#2E2F3D]/15 px-5 py-2.5 text-sm font-medium text-[#2E2F3D] transition-all duration-300 hover:border-[#454659] hover:bg-[#454659] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#454659] focus-visible:ring-offset-2"
              >
                All {SERVICES.length} services
                <ArrowRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            }
          />

          <Stagger className="grid auto-rows-fr grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3" gap={0.08}>
            {topServices.map((s) => (
              <StaggerItem key={s.slug} distance={26}>
                <ServiceCard service={s} variant="brief" />
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <ImageStrip images={GALLERY} speed={88} className="bg-white pb-20" />

      <CtaBand
        title="Work with Jason"
        body="A free discovery call comes first, and he will tell you honestly whether this is work he takes."
        secondary={{ href: '/services', label: 'See all services' }}
      />
    </div>
  );
}
