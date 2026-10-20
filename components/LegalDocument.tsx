import type { ReactNode } from 'react';
import { PINE_FOREST } from './unsplash';
import { DISCLAIMER } from './content';
import { ShieldCheckIcon } from './Icons';
import { PageHero } from './PageHero';
import { WaveSeam } from './MotionFx';

export type LegalSection = { id: string; title: string; body: ReactNode };

/**
 * The three legal pages (privacy, terms, editorial policy). Replaced the
 * "not final legal text" placeholder for launch (2026-10-20).
 *
 * The text describes what this site actually does today, nothing more:
 * no forms, cookies or analytics of its own; bookings and payments through
 * Jason's Wix Bookings calendar; a Google Maps embed on /contact; Vercel
 * hosting. WHEN THAT CHANGES (tracking pixel, GA4, a site-hosted form),
 * UPDATE THE PRIVACY POLICY IN THE SAME CHANGE and bump its effective date.
 * A policy that promises less than the site does is the exposure.
 *
 * Plain server component, deliberately calm: the reader is reading. Body
 * text does not animate; only the hero has the shared entrance.
 */
export const LegalDocument = ({
  title,
  intro,
  effective,
  sections,
}: {
  title: string;
  intro: string;
  /** Human-readable, e.g. "October 20, 2026". */
  effective: string;
  sections: LegalSection[];
}) => (
  <div>
    <PageHero eyebrow="Legal" title={title} image={PINE_FOREST} size="sm" scene="wave" intro="blur" lede={<p>{intro}</p>} />

    <section className="relative bg-white pb-16 pt-14 sm:pb-28 sm:pt-20">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <article className="max-w-[760px]">
          <p className="text-[14px] font-medium text-[#4B5468]">Effective {effective}</p>

          <nav aria-label="On this page" className="mt-8 rounded-[16px] border border-[#D7DEEA] bg-[#F7F9FC] p-5 sm:p-6">
            <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.16em] text-[#46699F]">On this page</p>
            <ol className="grid gap-1.5 text-[15px] sm:grid-cols-2">
              {sections.map((s, i) => (
                <li key={s.id}>
                  <a href={`#${s.id}`} className="ph-underline text-[#2E2F3D] hover:text-[#46699F]">
                    {i + 1}. {s.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <div className="ph-legal mt-12 flex flex-col gap-11 text-[16.5px] leading-[1.78] text-[#4B5468]">
            {sections.map((s, i) => (
              <section key={s.id} id={s.id} aria-labelledby={`${s.id}-h`}>
                <h2 id={`${s.id}-h`} className="mb-4 font-heading text-[1.45rem] leading-snug text-[#2E2F3D] sm:text-[1.6rem]">
                  {i + 1}. {s.title}
                </h2>
                {s.body}
              </section>
            ))}
          </div>
        </article>
      </div>
    </section>

    <section className="relative bg-[#E9F3EF] py-12 sm:py-16">
      <WaveSeam color="#E9F3EF" className="absolute inset-x-0 bottom-full" />
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <div className="flex max-w-[760px] items-start gap-4">
          <span
            aria-hidden="true"
            className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-white text-[#46699F]"
          >
            <ShieldCheckIcon className="h-5 w-5" />
          </span>
          {/* Markup #77: the client's own disclaimer sentence. */}
          <p className="text-[14.5px] leading-[1.72] text-[#4B5468]">{DISCLAIMER}</p>
        </div>
      </div>
    </section>
  </div>
);
