'use client';

/* ---------------------------------------------------------------------------
   OUR TEAM — the practice at a glance, on the dark band.

   Signature motion: SPOTLIGHT. Each card is lit by a soft light that follows
   the mouse across it, and its border brightens nearest the cursor
   (Spotlight). The cards arrive by focusing in from a blur (PopItem); the
   numbers count up once.

   Every figure is one the page already states, read from content.ts: ten
   years (PRACTITIONER.credentials), 5.0 from 12 reviews (RATING), five
   documents (CREDENTIALS.length). No number here is derived or rounded.

   The room is the practice's own photograph (OFFICE_INTERIOR) in its native
   portrait frame, beside Jason's own sentence about the building. The
   address sits under the sentence, not on the photograph — the photo's
   source names no location (see assets.ts), so it is not captioned with one.
--------------------------------------------------------------------------- */

import { PRACTITIONER, RATING, CREDENTIALS, REAL_COPY, NAP } from '../../content';
import { OFFICE_INTERIOR, OFFICE_INTERIOR_ALT } from '../../assets';
import { StarIcon, MapPinIcon, CheckIcon } from '../../Icons';
import { Reveal, Stagger, Counter, Parallax, ClipReveal } from '../../Motion';
import { Spotlight, PopItem } from '../../MotionFx';
import { issuerShort, shortAward, chronological } from './credentials';

const card =
  'flex h-full flex-col justify-between rounded-[22px] border border-white/10 bg-white/[0.04] p-6 sm:p-7';

export const TeamFigures = () => {
  const [hmi, years] = PRACTITIONER.credentials;
  const docs = chronological();

  return (
    <section className="relative isolate overflow-hidden bg-[#1F2030] py-24 ph-grain sm:py-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-10 h-[36rem] w-[36rem] rounded-full bg-[radial-gradient(closest-side,rgba(70,105,159,0.32),transparent)] blur-2xl"
      />
      <div className="relative mx-auto grid max-w-[1280px] grid-cols-1 items-center gap-14 px-4 sm:px-6 lg:grid-cols-12 lg:gap-12 lg:px-8">
        <div className="lg:col-span-7">
          <Reveal>
            <p className="mb-8 inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#A9C4EE] sm:text-[13px]">
              <span aria-hidden="true" className="inline-block h-px w-10 bg-[#A9C4EE]/60" />
              At a glance
            </p>
          </Reveal>

          <Stagger className="grid auto-rows-fr grid-cols-1 gap-5 sm:grid-cols-2" gap={0.12}>
            <PopItem>
              <Spotlight className={card}>
                <p className="font-heading text-[3.4rem] leading-none text-white sm:text-[4rem]">
                  <Counter to={10} duration={1.6} />
                </p>
                <div className="mt-8">
                  <p className="text-[11.5px] font-bold uppercase tracking-[0.14em] text-[#A9C4EE]">years in practice</p>
                  <p className="mt-2 text-[14.5px] leading-[1.6] text-[#D9E1F0]">{years.detail}</p>
                </div>
              </Spotlight>
            </PopItem>

            <PopItem>
              <Spotlight className={card}>
                <p className="flex items-baseline gap-2 font-heading text-[3.4rem] leading-none text-white sm:text-[4rem]">
                  <Counter to={RATING.value} decimals={1} duration={1.6} />
                  <StarIcon className="h-6 w-6 -translate-y-1 text-[#5DBA47]" aria-hidden="true" />
                </p>
                <div className="mt-8">
                  <span className="mb-3 flex gap-1" aria-hidden="true">
                    {Array.from({ length: 5 }, (_, i) => (
                      <StarIcon key={i} className="h-4 w-4 text-[#5DBA47]" />
                    ))}
                  </span>
                  <p className="text-[11.5px] font-bold uppercase tracking-[0.14em] text-[#A9C4EE]">
                    from {RATING.count} Google reviews
                  </p>
                </div>
              </Spotlight>
            </PopItem>

            <PopItem>
              <Spotlight className={card}>
                <span className="flex h-12 w-12 items-center justify-center rounded-full border border-[#A9C4EE]/40 bg-white/[0.06]">
                  <CheckIcon className="h-5 w-5 text-[#A9C4EE]" />
                </span>
                <div className="mt-8">
                  <p className="font-heading text-[1.35rem] leading-snug text-white">{hmi.title}</p>
                  <p className="mt-2 text-[14.5px] leading-[1.6] text-[#D9E1F0]">{hmi.detail}</p>
                </div>
              </Spotlight>
            </PopItem>

            <PopItem>
              <Spotlight className={card}>
                <p className="flex items-baseline gap-3 font-heading text-[3.4rem] leading-none text-white sm:text-[4rem]">
                  <Counter to={CREDENTIALS.length} duration={1.2} />
                  <span className="font-body text-[12px] font-bold uppercase tracking-[0.14em] text-[#A9C4EE]">on file</span>
                </p>
                <ul className="mt-8 flex flex-wrap gap-1.5">
                  {docs.map((c) => (
                    <li
                      key={c.img}
                      className="rounded-full border border-white/15 px-2.5 py-1 text-[11.5px] leading-tight text-[#D9E1F0]"
                    >
                      <span className="font-semibold text-[#A9C4EE]">{issuerShort(c.issuer)}</span> {shortAward(c.award)}
                    </li>
                  ))}
                </ul>
              </Spotlight>
            </PopItem>
          </Stagger>
        </div>

        {/* THE ROOM -------------------------------------------------------- */}
        <div className="lg:col-span-5">
          <Parallax speed={34}>
            <ClipReveal
              src={OFFICE_INTERIOR}
              alt={OFFICE_INTERIOR_ALT}
              from="top"
              className="mx-auto max-w-[400px] overflow-hidden rounded-[22px] border border-white/10 shadow-[0_40px_80px_-34px_rgba(0,0,0,0.8)]"
              imgClassName="aspect-[760/1131] w-full object-cover"
            />
          </Parallax>
          <Reveal delay={0.15}>
            <div className="mx-auto mt-7 max-w-[400px]">
              <p className="text-[15px] leading-[1.7] text-[#D9E1F0]">{REAL_COPY.about.office}</p>
              <p className="mt-4 inline-flex items-center gap-2 text-[13.5px] text-[#A9C4EE]">
                <MapPinIcon className="h-4 w-4 flex-shrink-0 text-[#5DBA47]" />
                {NAP.street}, {NAP.city}
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};
