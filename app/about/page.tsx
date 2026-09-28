import type { Metadata } from 'next';
import Link from 'next/link';
import { REAL_COPY, RATING, REVIEW_SHOTS, PRACTITIONER, NAP } from '../../components/content';
import { OFFICE_INTERIOR, OFFICE_INTERIOR_ALT } from '../../components/assets';
import * as ASSETS from '../../components/assets';
import { GARDEN_STREAM, GALLERY } from '../../components/unsplash';
import { StarIcon, QuoteIcon, ArrowRightIcon, PhoneIcon } from '../../components/Icons';
import { PageHero, heroPrimaryBtn, heroGhostBtn } from '../../components/PageHero';
import { CtaBand } from '../../components/CtaBand';
import { Reveal, SplitHeading, Stagger, StaggerItem, Parallax, Counter } from '../../components/Motion';
import { ImageStrip } from '../../components/Bands';

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
      <PageHero
        eyebrow="About"
        title="A solo practice, in one room, for a decade"
        image={GARDEN_STREAM}
        size="lg"
        facts={[
          { k: 'Practice', v: 'Solo, since 2016' },
          { k: 'Location', v: 'South Pasadena, CA' },
          { k: 'Rating', v: '5.0 from 12 reviews' },
          { k: 'Also', v: 'Video, statewide' },
        ]}
        lede={
          <p>
            Pasadena Hypnosis LLC is Jason Meissner&rsquo;s own practice, run out of a South Pasadena office he has
            worked from for ten years. What follows is in his words, carried across from the site he wrote himself.
          </p>
        }
      >
        <Link href="/our-team" className={heroPrimaryBtn}>
          Credentials &amp; documents
          <ArrowRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
        <a href={NAP.phoneHref} className={heroGhostBtn}>
          <PhoneIcon className="h-4 w-4" />
          {NAP.phone}
        </a>
      </PageHero>

      {/* HIS OWN WORDS -----------------------------------------------------
          REAL_COPY.about is verbatim from the live site. It is set here at
          display size and given room, rather than being paraphrased into
          "brand voice" — the whole point of that block in content.ts is that
          the new site sounds like the man who wrote the old one. */}
      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-[820px] px-4 sm:px-6">
          <Reveal>
            <p className="mb-8 font-body text-xs font-semibold uppercase tracking-[0.18em] text-[#46699F] sm:text-[13px]">
              In Jason&rsquo;s words
            </p>
          </Reveal>

          <Reveal delay={0.05}>
            <p className="font-heading text-[1.5rem] leading-[1.45] text-[#2E2F3D] sm:text-[1.85rem]">
              {REAL_COPY.about.training}
            </p>
          </Reveal>

          <Reveal delay={0.12}>
            <p className="mt-8 text-[17px] leading-[1.75] text-[#4B5468]">{REAL_COPY.about.office}</p>
          </Reveal>

          <Reveal delay={0.18}>
            <p className="mt-5 text-[15px] leading-[1.7] text-[#4B5468]">
              {REAL_COPY.about.hmi}{' '}
              <a
                href="https://hypnosis.edu"
                target="_blank"
                rel="noopener noreferrer"
                className="ph-tap ph-underline font-medium text-[#46699F]"
              >
                hypnosis.edu
              </a>
            </p>
          </Reveal>

          <Reveal delay={0.24}>
            <blockquote className="mt-12 border-l-2 border-[#5DBA47] pl-6 font-heading text-[1.25rem] leading-[1.5] text-[#2E2F3D] sm:text-[1.45rem]">
              &ldquo;{REAL_COPY.tagline}&rdquo;
            </blockquote>
          </Reveal>
        </div>
      </section>

      {/* THE ROOM + RATING ------------------------------------------------ */}
      <section className="bg-[#E6EFFF] py-20 sm:py-28">
        <div className="mx-auto grid max-w-[1280px] grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
          <Parallax speed={30}>
            <figure className="overflow-hidden rounded-[20px] border border-[#D7DEEA] shadow-[0_30px_70px_-34px_rgba(46,47,61,0.5)]">
              <img
                src={OFFICE_INTERIOR}
                alt={OFFICE_INTERIOR_ALT}
                loading="lazy"
                className="aspect-[4/3] w-full object-cover"
              />
            </figure>
          </Parallax>

          <div>
            <Reveal>
              <div className="mb-5 flex items-center gap-3">
                <span className="flex" aria-hidden="true">
                  {Array.from({ length: 5 }, (_, i) => (
                    <StarIcon key={i} className="h-5 w-5 text-[#5DBA47]" />
                  ))}
                </span>
                <p className="font-heading text-[1.8rem] leading-none text-[#2E2F3D]">
                  <Counter to={RATING.value} decimals={1} duration={1.4} />
                  <span className="text-[#4B5468]"> / 5</span>
                </p>
              </div>
            </Reveal>
            <SplitHeading
              text={`From ${RATING.count} Google reviews, shown as screenshots.`}
              className="max-w-[18ch] font-heading text-[1.9rem] leading-[1.14] text-[#2E2F3D] sm:text-[2.3rem]"
            />
            <Reveal delay={0.15}>
              <p className="mt-6 max-w-[56ch] text-[16px] leading-[1.72] text-[#4B5468]">
                Every review below is a real 5-star Google review, shown as the screenshot it is. The reviewer names
                are greyed out in the practice&rsquo;s own crops, so these render as images rather than as invented
                quote cards with fabricated authors.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* REVIEWS ---------------------------------------------------------- */}
      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
          {/*
            A UNIFORM GRID, replacing the masonry flow that was here. Masonry
            was the honest response to six screenshots of six different shapes,
            and it read as a mistake — the rows came out visibly ragged.

            Every card is now the same shape via a fixed 16/9 frame with
            `object-cover object-top`. THE RATIO IS LOAD-BEARING: 16/9 is 1.78,
            wider than the widest crop in the set (900x517, 1.74), so each
            image scales to fill the WIDTH and is cropped only along the
            BOTTOM. A narrower frame — 4/3, say — would scale the wider
            screenshots to fill the height instead and crop them left and
            right, slicing words out of the review text. The bottom crop costs
            the Like/Share row, which is the one part nobody needs.

            Nothing is lost for a screen reader: `gist` still carries the
            substance of each review as alt text.

            If a seventh review is added, check its ratio against 1.78 first.
          */}
          <Stagger className="grid auto-rows-fr grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3" gap={0.07}>
            {REVIEW_SHOTS.map((r) => {
              const img = reviewImage(r.img);
              return (
                <StaggerItem key={r.img}>
                  <figure className="flex h-full flex-col overflow-hidden rounded-[16px] border border-[#D7DEEA] bg-[#E9F3EF] transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_26px_54px_-30px_rgba(46,47,61,0.45)]">
                    <div className="flex flex-shrink-0 items-center gap-2.5 px-5 py-4">
                      <QuoteIcon className="h-5 w-5 flex-shrink-0 text-[#46699F]" />
                      <span className="text-[10.5px] font-bold uppercase tracking-[0.12em] text-[#46699F]">
                        Google review
                      </span>
                    </div>
                    <div className="aspect-[16/9] w-full flex-shrink-0 overflow-hidden bg-white">
                      <img
                        src={img.src}
                        alt={r.gist}
                        width={img.width}
                        height={img.height}
                        loading="lazy"
                        className="h-full w-full object-cover object-top"
                      />
                    </div>
                    <figcaption className="flex h-14 flex-shrink-0 items-center border-t border-[#D7DEEA] px-5 text-[12px] font-semibold uppercase leading-tight tracking-[0.1em] text-[#46699F]">
                      {r.topic}
                    </figcaption>
                  </figure>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </section>

      <ImageStrip images={GALLERY} speed={88} className="bg-white pb-20" />

      {/* SCOPE ------------------------------------------------------------ */}
      <section className="bg-[#E9F3EF] py-16">
        <div className="mx-auto max-w-[820px] px-4 sm:px-6">
          <Reveal>
            <p className="text-[15px] leading-[1.72] text-[#2E2F3D]">{PRACTITIONER.scopeNote}</p>
          </Reveal>
        </div>
      </section>

      <CtaBand
        title="Talk to Jason directly"
        body="The first conversation is free, and it is a conversation rather than an intake form."
      />
    </div>
  );
}
