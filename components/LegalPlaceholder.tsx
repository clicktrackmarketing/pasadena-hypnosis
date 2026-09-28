import { PINE_FOREST } from './unsplash';
import { ShieldCheckIcon } from './Icons';
import { PageHero } from './PageHero';
import { Reveal } from './Motion';
import { WaveSeam } from './MotionFx';
import { LegalOutline } from './pages/legal/LegalOutline';

type Props = {
  title: string;
  intro: string;
  sections: string[];
};

/**
 * Placeholder legal pages. Final legal text for all three documents must come
 * from the practice's own counsel before launch — inventing binding policy
 * language here would be exactly the "plausible wrong answer" this pipeline's
 * invariants exist to prevent.
 * Owner: Jason's legal counsel. Due: before launch.
 *
 * RESTYLED 2026-09-16 with the redesign, AND THE PLACEHOLDER NOTICE GOT MORE
 * PROMINENT RATHER THAN LESS. The temptation in a visual pass is to tidy the
 * dashed warning box away, because it is the one element on the site that
 * looks unfinished. It is supposed to look unfinished. A privacy policy that
 * *looks* complete but contains a table of contents and no policy is worse
 * than an obviously empty one: a visitor may rely on it, and the practice
 * collects regulated health context through its booking form. The notice
 * stays first, stays bordered, and now names what is missing.
 *
 * MOTION PASS 2026-09-28 — deliberately the calmest pages on the site. The
 * hero gets a slow particle wave and an H1 that focuses in from a blur; the
 * body text only fades up once, briefly. The one scroll effect is a hairline
 * that draws itself down through the section numbers as the reader moves
 * (components/pages/legal/LegalOutline.tsx). Nothing reading-critical moves
 * while it is being read, and the notice is still the first thing below the
 * hero, still dashed, still unmissable.
 */
export const LegalPlaceholder = ({ title, intro, sections }: Props) => (
  <div>
    <PageHero
      eyebrow="Legal"
      title={title}
      image={PINE_FOREST}
      size="sm"
      scene="wave"
      intro="blur"
      lede={<p>{intro}</p>}
    />

    <section className="relative bg-white pb-20 pt-14 sm:pb-28 sm:pt-20">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8"><div className="max-w-[820px]">
        <Reveal distance={14}>
          <div className="relative mb-14 overflow-hidden rounded-[18px] border-2 border-dashed border-[#46699F]/50 bg-[#E6EFFF] p-6 sm:p-8">
            <span aria-hidden="true" className="absolute inset-y-0 left-0 w-1.5 bg-[#46699F]" />
            <p className="mb-2.5 font-heading text-[1.2rem] text-[#2E2F3D] sm:text-[1.3rem]">
              Placeholder &mdash; this is not final legal text.
            </p>
            <p className="text-[15px] leading-[1.72] text-[#4B5468]">
              The headings below are the structure this document will follow. The binding language has to come from
              the practice&rsquo;s own counsel and has not been drafted yet. Owner: Jason&rsquo;s legal counsel. Due:
              before launch.
            </p>
          </div>
        </Reveal>

        <LegalOutline sections={sections} />
      </div></div>
    </section>

    <section className="relative bg-[#E9F3EF] py-12 sm:py-16">
      <WaveSeam color="#E9F3EF" className="absolute inset-x-0 bottom-full" />
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8"><div className="max-w-[820px]">
        <Reveal distance={12}>
          <div className="flex items-start gap-4">
            <span
              aria-hidden="true"
              className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-white text-[#46699F]"
            >
              <ShieldCheckIcon className="h-5 w-5" />
            </span>
            <p className="text-[14.5px] leading-[1.72] text-[#4B5468]">
              Pasadena Hypnosis is a complementary hypnotherapy practice, not a substitute for medical or psychiatric
              care. Jason Meissner is a certified hypnotherapist, not a licensed medical or mental-health clinician.
            </p>
          </div>
        </Reveal>
      </div></div>
    </section>
  </div>
);
