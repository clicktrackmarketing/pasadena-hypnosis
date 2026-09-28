import { PINE_FOREST } from './unsplash';
import { ShieldCheckIcon } from './Icons';
import { PageHero } from './PageHero';
import { Reveal, Stagger, StaggerItem } from './Motion';

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
 */
export const LegalPlaceholder = ({ title, intro, sections }: Props) => (
  <div>
    <PageHero eyebrow="Legal" title={title} image={PINE_FOREST} size="sm" lede={<p>{intro}</p>} />

    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-[800px] px-4 sm:px-6">
        <Reveal>
          <div className="mb-12 rounded-[16px] border-2 border-dashed border-[#46699F]/45 bg-[#E6EFFF] p-6 sm:p-7">
            <p className="mb-2 font-heading text-[1.15rem] text-[#2E2F3D]">
              Placeholder &mdash; this is not final legal text.
            </p>
            <p className="text-[14.5px] leading-[1.7] text-[#4B5468]">
              The headings below are the structure this document will follow. The binding language has to come from
              the practice&rsquo;s own counsel and has not been drafted yet. Owner: Jason&rsquo;s legal counsel. Due:
              before launch.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <h2 className="mb-6 font-heading text-[1.4rem] text-[#2E2F3D]">Planned sections</h2>
        </Reveal>

        <Stagger className="flex flex-col gap-3" as="ol" gap={0.07}>
          {sections.map((s, i) => (
            <StaggerItem key={s} as="li" distance={14}>
              <div className="flex items-center gap-4 rounded-[14px] border border-[#D7DEEA] bg-white px-5 py-4">
                <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[#E9F3EF] font-heading text-[13px] text-[#46699F]">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="font-medium text-[#2E2F3D]">{s}</span>
              </div>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal delay={0.1}>
          <div className="mt-12 flex items-start gap-3.5 border-t border-[#D7DEEA] pt-8">
            <ShieldCheckIcon className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#4B5468]" />
            <p className="text-[13px] leading-[1.7] text-[#4B5468]">
              Pasadena Hypnosis is a complementary hypnotherapy practice, not a substitute for medical or psychiatric
              care. Jason Meissner is a certified hypnotherapist, not a licensed medical or mental-health clinician.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  </div>
);
