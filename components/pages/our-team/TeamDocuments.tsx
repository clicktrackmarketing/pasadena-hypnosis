'use client';

/* ---------------------------------------------------------------------------
   OUR TEAM — the documents themselves, as a stack.

   Signature motion: STICKY STACK. The five certificates pin one after
   another near the top of the screen; each earlier one recedes and dims as
   the next slides over it (StickyStack). Plain CSS sticky, so it scrolls
   natively on every device, and under reduced motion the cards simply sit
   in a column without scaling or dimming.

   THE ARTWORK IS THE POINT. Every card shows the real certificate image
   (assets.ts) with its transcription BENEATH it, so a prospect can check
   each printed line — issuer, award wording, date, certificate number —
   against the picture above it, exactly as the section's lede says. Nothing
   in the transcription is inferred; see the CREDENTIALS note in content.ts.

   ORDER: by the date on the paper, so the stack tells the same story as the
   timeline above it — four specialisms in the spring, and the diploma last,
   landing on top.

   FIT: the image's height is capped against the viewport so a whole card
   fits under the header while it is pinned, on a laptop as well as a tall
   monitor. "View certificate" opens the full-size file for anyone who wants
   to read the small print.

   The section is overflow-x-CLIP, not overflow-hidden: `hidden` would make
   it a scroll container and silently stop every card from sticking.
--------------------------------------------------------------------------- */

import * as ASSETS from '../../assets';
import { CREDENTIALS } from '../../content';
import { responsive } from '../../responsive';
import { ArrowRightIcon } from '../../Icons';
import { SectionHeading } from '../../SectionHeading';
import { StickyStack } from '../../MotionFx';
import { chronological, issuerShort } from './credentials';
import { useViewportWidth } from './useViewport';

const credentialImage = (key: string) => {
  const rec = ASSETS as unknown as Record<string, string | number>;
  return { src: rec[key] as string, width: rec[key + '_W'] as number, height: rec[key + '_H'] as number };
};

const Row = ({ k, v }: { k: string; v: string }) => (
  <div>
    <dt className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#4B5468]">{k}</dt>
    <dd className="mt-1 text-[14px] leading-snug text-[#2E2F3D]">{v}</dd>
  </div>
);

export const TeamDocuments = () => {
  const vw = useViewportWidth();
  const items = chronological();
  const n = items.length;
  const top = vw >= 640 ? 112 : 80;
  const gap = vw >= 640 ? 22 : 12;

  return (
    <section className="relative overflow-x-clip bg-[#E6EFFF] py-24 sm:py-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 top-20 h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(closest-side,rgba(255,255,255,0.9),transparent)]"
      />
      <div className="relative mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <SectionHeading
          className="mb-14 sm:mb-16"
          eyebrow="Verifiable"
          title="The documents themselves"
          size="lg"
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

        {/* The arbitrary variant rounds StickyStack's inner scaling wrapper,
            so the dimming overlay (border-radius: inherit) follows the card's
            corners instead of drawing square ones outside them. */}
        <StickyStack top={top} gap={gap} className="mx-auto max-w-[1100px] [&>div>div]:rounded-[26px]">
          {items.map((c, i) => {
            const img = credentialImage(c.img);
            return (
              <article
                key={c.img}
                className="overflow-hidden rounded-[26px] border border-[#2E2F3D]/10 bg-white shadow-[0_40px_90px_-46px_rgba(31,32,48,0.6)]"
              >
                <div className="relative flex items-center justify-center bg-[#F4F7FC] px-4 pb-5 pt-10 sm:px-8 sm:pb-7 sm:pt-12">
                  <span className="absolute left-5 top-4 text-[11px] font-bold tabular-nums tracking-[0.14em] text-[#46699F] sm:left-8 sm:top-5">
                    {String(i + 1).padStart(2, '0')} / {String(n).padStart(2, '0')}
                  </span>
                  <span className="absolute right-5 top-4 text-[11px] font-bold uppercase tracking-[0.14em] text-[#46699F] sm:right-8 sm:top-5">
                    {issuerShort(c.issuer)}
                  </span>
                  <img
                    src={img.src}
                    alt={c.alt}
                    width={img.width}
                    height={img.height}
                    loading="lazy"
                    {...responsive(img.src, 'half')}
                    className="h-auto w-auto max-w-full rounded-[6px] shadow-[0_18px_40px_-22px_rgba(31,32,48,0.55)]"
                    style={{ maxHeight: 'max(190px, min(calc(100svh - 470px), 500px))' }}
                  />
                </div>

                <div className="border-t border-[#D7DEEA] p-5 sm:p-7 lg:px-9">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-8">
                    <div>
                      {c.featured ? (
                        <span className="mb-2.5 inline-flex items-center rounded-full bg-[#5DBA47] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.1em] text-[#2E2F3D]">
                          The diploma
                        </span>
                      ) : null}
                      <h3 className="font-heading text-[1.3rem] leading-snug text-[#2E2F3D] sm:text-[1.6rem]">{c.award}</h3>
                    </div>
                    <a
                      href={img.src}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ph-tap group inline-flex flex-shrink-0 items-center gap-2 self-start rounded-full border border-[#2E2F3D]/15 px-4 py-2 text-[13px] font-medium text-[#2E2F3D] transition-colors duration-300 hover:border-[#454659] hover:bg-[#454659] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#454659] focus-visible:ring-offset-2"
                    >
                      View certificate
                      <span className="sr-only">: {c.award}</span>
                      <ArrowRightIcon className="h-3.5 w-3.5 -rotate-45 transition-transform duration-300 group-hover:translate-x-0.5" />
                    </a>
                  </div>

                  <dl className="mt-5 grid grid-cols-2 gap-x-6 gap-y-3.5 border-t border-[#D7DEEA] pt-5 lg:grid-cols-4">
                    <Row k="Issuer" v={c.issuer} />
                    {c.issuerNote ? <Row k="Accredited" v={c.issuerNote} /> : null}
                    <Row k="Dated" v={c.date} />
                    {c.ref ? <Row k="Certificate" v={`#${c.ref}`} /> : null}
                  </dl>
                  {c.note ? <p className="mt-4 max-w-[80ch] text-[14px] leading-[1.65] text-[#4B5468]">{c.note}</p> : null}
                </div>
              </article>
            );
          })}
        </StickyStack>
      </div>
    </section>
  );
};
