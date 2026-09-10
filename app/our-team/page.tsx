import type { Metadata } from 'next';
import { PRACTITIONER, CREDENTIALS } from '../../components/content';
import { PORTRAIT, PORTRAIT_ALT } from '../../components/assets';
import * as ASSETS from '../../components/assets';
import { ShieldCheckIcon } from '../../components/Icons';

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

  return (
    <div>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />

      <section className="bg-white">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <p className="font-body text-xs sm:text-sm font-semibold tracking-[0.14em] uppercase text-[#46699F] mb-4">Our Team</p>
            <h1 className="font-heading text-4xl sm:text-5xl leading-[1.1] text-[#2E2F3D] mb-4">{PRACTITIONER.name}</h1>
            <p className="text-base sm:text-lg text-[#4B5468] leading-relaxed mb-6">{PRACTITIONER.bio}</p>
            <div className="flex items-start gap-3 rounded-[14px] border border-[#D7DEEA] bg-[#E6EFFF] p-5">
              <ShieldCheckIcon className="h-5 w-5 text-[#454659] flex-shrink-0 mt-0.5" />
              <p className="text-sm text-[#2E2F3D] leading-relaxed">{PRACTITIONER.scopeNote}</p>
            </div>
          </div>
          <img src={PORTRAIT} alt={PORTRAIT_ALT} className="w-full aspect-[4/5] object-cover rounded-[14px]" />
        </div>
      </section>

      <section className="bg-[#E6EFFF] py-14 sm:py-20">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-2xl sm:text-3xl text-[#2E2F3D] mb-8">Credentials, in his own documents</h2>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {featured.map((c) => {
              const img = credentialImage(c.img);
              return (
                <div key={c.img} className="lg:col-span-5 lg:self-start bg-white border border-[#D7DEEA] rounded-[14px] p-5">
                  <img src={img.src} alt={c.alt} width={img.width} height={img.height} className="w-full rounded-[10px] mb-4" />
                  <p className="font-heading text-lg text-[#2E2F3D] mb-1">{c.award}</p>
                  <p className="text-sm text-[#4B5468]">{c.issuer}{c.issuerNote ? ` — ${c.issuerNote}` : ''}, {c.date}</p>
                  {c.note ? <p className="text-sm text-[#4B5468] mt-2 leading-relaxed">{c.note}</p> : null}
                </div>
              );
            })}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {rest.map((c) => {
                const img = credentialImage(c.img);
                return (
                  <div key={c.img} className="bg-white border border-[#D7DEEA] rounded-[14px] p-5">
                    <img src={img.src} alt={c.alt} width={img.width} height={img.height} className="w-full rounded-[10px] mb-3" />
                    <p className="font-medium text-[#2E2F3D] text-sm mb-1">{c.award}</p>
                    <p className="text-xs text-[#4B5468]">{c.issuer}, {c.date}{c.ref ? ` · #${c.ref}` : ''}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
