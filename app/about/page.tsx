import type { Metadata } from 'next';
import { REAL_COPY, RATING, REVIEW_SHOTS } from '../../components/content';
import { OFFICE_INTERIOR, OFFICE_INTERIOR_ALT } from '../../components/assets';
import * as ASSETS from '../../components/assets';
import { StarIcon, QuoteIcon } from '../../components/Icons';

// Target keywords (profile.ts targetKeywords['/about']): "jason meissner
// hypnotherapist", "hypnotherapy motivation institute pasadena".
export const metadata: Metadata = {
  title: 'About Pasadena Hypnosis',
  description:
    'Pasadena Hypnosis LLC is a solo hypnotherapy practice run by Jason Meissner out of South Pasadena, California, holding a 5.0 Google rating from 12 reviews.',
  alternates: { canonical: '/about' },
};

function reviewImage(key: string) {
  const rec = ASSETS as unknown as Record<string, string | number>;
  return { src: rec[key] as string, width: rec[key + '_W'] as number, height: rec[key + '_H'] as number };
}

export default function AboutPage() {
  return (
    <div>
      <section className="bg-white">
        <div className="max-w-[900px] mx-auto px-4 sm:px-6 py-12 sm:py-16 lg:py-20">
          <p className="font-body text-xs sm:text-sm font-semibold tracking-[0.14em] uppercase text-[#46699F] mb-4">About</p>
          <h1 className="font-heading text-4xl sm:text-5xl leading-[1.1] text-[#2E2F3D] mb-8">About Pasadena Hypnosis</h1>
          <div className="space-y-5 text-base sm:text-lg text-[#4B5468] leading-relaxed">
            <p>{REAL_COPY.about.training}</p>
            <p>{REAL_COPY.about.office}</p>
            <p className="text-sm">{REAL_COPY.about.hmi}</p>
          </div>
        </div>
      </section>

      <section className="bg-[#E6EFFF] py-14 sm:py-20">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <img src={OFFICE_INTERIOR} alt={OFFICE_INTERIOR_ALT} className="w-full aspect-[4/3] object-cover rounded-[14px]" />
          <div>
            <div className="flex items-center gap-2 mb-3">
              <StarIcon className="h-5 w-5 text-[#454659]" />
              <p className="font-heading text-2xl text-[#2E2F3D]">{RATING.value.toFixed(1)} / 5 from {RATING.count} Google reviews</p>
            </div>
            <p className="text-[#4B5468] leading-relaxed">
              Every review below is a real 5-star Google review, shown as the screenshot it is — the reviewer names
              are greyed out in the practice&rsquo;s own crops, so these render as images rather than invented quote
              cards with fabricated authors.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white py-14 sm:py-20">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-3 gap-5">
          {REVIEW_SHOTS.map((r) => {
            const img = reviewImage(r.img);
            return (
              <figure key={r.img} className="bg-[#E9F3EF] border border-[#D7DEEA] rounded-[14px] p-4">
                <QuoteIcon className="h-5 w-5 text-[#46699F] mb-2" />
                <img src={img.src} alt={r.gist} width={img.width} height={img.height} className="w-full rounded-[10px] mb-3" />
                <figcaption className="text-sm font-medium text-[#2E2F3D]">{r.topic}</figcaption>
              </figure>
            );
          })}
        </div>
      </section>
    </div>
  );
}
