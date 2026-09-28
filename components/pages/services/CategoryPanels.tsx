'use client';

/* ---------------------------------------------------------------------------
   SERVICES HUB — the catalogue as expanding panels.

   One tall panel per category, side by side. On a desktop with a mouse the
   panel under the pointer (or holding keyboard focus) widens and the others
   fold down to a vertical label; on phones, tablets and any coarse pointer
   the panels simply stack, fully open, one after another.

   WHY THE WIDENING IS CSS AND NOT STATE. Everything that decides which panel
   is open lives in the scoped stylesheet below — :hover, :focus-within and
   :has() — so the accordion works with no JavaScript at all, and a keyboard
   user tabbing into a folded panel's first link opens that panel by the act
   of focusing it. The React state only adds memory: the last panel the
   pointer visited stays open when the pointer leaves, instead of snapping
   back to the first.

   EVERY SERVICE IS A REAL LINK in every state. Folded panels hide their list
   visually (opacity, pointer-events) but it stays in the DOM, in the tab
   order and in the accessibility tree — focusing any of those links unfolds
   its panel.

   The desktop behaviour is gated on (hover: hover) and (pointer: fine), not
   on width alone: a 1024px touch tablet would otherwise get panels that only
   open on a tap that also follows the link underneath it.

   Copy: category names come from SERVICES[].category, the one-line notes are
   the hub's existing CATEGORY_NOTE strings, and prices come through
   priceLabel(). Nothing here is new text except the counts.
--------------------------------------------------------------------------- */

import Link from 'next/link';
import { useState } from 'react';
import type { Service } from '../../content';
import { serviceImage } from '../../unsplash';
import { priceLabel } from '../../price';
import { responsive } from '../../responsive';
import { ArrowRightIcon } from '../../Icons';
import { motion, useReducedMotion, EASE_OUT_SOFT } from '../../Motion';

export type CategoryGroup = { category: string; note?: string; services: Service[] };

/* Scoped to .svc-acc — nothing here can leak into another page. The
   specificity ladder matters and is written out so a later edit does not
   quietly break the no-JS path:
     .svc-panel                                   (0,1,0)  folded
     .svc-panel.is-active                         (0,2,0)  open by memory
     .svc-acc:has(> panel:hover) > .svc-panel     (0,4,0)  fold the rest
     ...same... > .svc-panel:hover                (0,5,0)  open the hovered one */
const CSS = `
.svc-acc{display:flex;flex-direction:column;gap:14px;margin:0;padding:0;list-style:none}
.svc-panel{position:relative;isolation:isolate;overflow:hidden;border-radius:22px;background:#2E2F3D;border:1px solid rgba(255,255,255,.09)}
.svc-bg{position:absolute;inset:0;z-index:-2;width:100%;height:100%;object-fit:cover;opacity:.4;transform:scale(1.04)}
.svc-scrim{position:absolute;inset:0;z-index:-1;background:linear-gradient(to top,#1F2030 18%,rgba(31,32,48,.88) 58%,rgba(31,32,48,.6))}
.svc-closed{display:none}
.svc-line{display:none}
.svc-open{position:relative;padding:30px 22px 22px}
@media (min-width:1024px) and (hover:hover) and (pointer:fine){
  .svc-acc{flex-direction:row;gap:10px;height:clamp(34rem,74vh,40rem)}
  .svc-panel{flex:1 1 0%;min-width:0;transition:flex-grow .95s cubic-bezier(.16,1,.3,1),border-color .6s ease}
  .svc-panel.is-active{flex-grow:6.5;border-color:rgba(169,196,238,.28)}
  .svc-acc:has(> .svc-panel:is(:hover,:focus-within)) > .svc-panel{flex-grow:1;border-color:rgba(255,255,255,.09)}
  .svc-acc:has(> .svc-panel:is(:hover,:focus-within)) > .svc-panel:is(:hover,:focus-within){flex-grow:6.5;border-color:rgba(169,196,238,.28)}

  .svc-bg{left:50%;width:46rem;max-width:none;opacity:.34;transform:translateX(-50%) scale(1.16);filter:saturate(.55);transition:transform 1.5s cubic-bezier(.16,1,.3,1),opacity .9s ease,filter .9s ease}
  .svc-scrim{background:linear-gradient(to top,#1F2030 26%,rgba(31,32,48,.8) 58%,rgba(31,32,48,.34))}

  .svc-closed{display:flex;position:absolute;inset:0;flex-direction:column;align-items:center;justify-content:space-between;padding:28px 0 26px;transition:opacity .45s ease .15s}
  .svc-open{position:absolute;left:0;bottom:0;width:clamp(22rem,36vw,31rem);padding:36px 34px 30px;opacity:0;transform:translateY(22px);pointer-events:none;transition:opacity .3s ease,transform .6s cubic-bezier(.16,1,.3,1)}
  .svc-line{display:block;position:absolute;left:0;right:0;top:0;height:2px;transform:scaleX(0);transform-origin:left;background:linear-gradient(90deg,#A9C4EE,#5DBA47 70%,transparent);transition:transform 1.1s cubic-bezier(.16,1,.3,1)}

  .svc-panel.is-active .svc-bg{opacity:.62;transform:translateX(-50%) scale(1);filter:saturate(1)}
  .svc-panel.is-active .svc-closed{opacity:0;transition-delay:0s}
  .svc-panel.is-active .svc-open{opacity:1;transform:none;pointer-events:auto;transition-delay:.32s,.28s}
  .svc-panel.is-active .svc-line{transform:scaleX(1);transition-delay:.25s}

  .svc-acc:has(> .svc-panel:is(:hover,:focus-within)) > .svc-panel .svc-bg{opacity:.34;transform:translateX(-50%) scale(1.16);filter:saturate(.55)}
  .svc-acc:has(> .svc-panel:is(:hover,:focus-within)) > .svc-panel .svc-closed{opacity:1;transition-delay:.15s}
  .svc-acc:has(> .svc-panel:is(:hover,:focus-within)) > .svc-panel .svc-open{opacity:0;transform:translateY(22px);pointer-events:none;transition-delay:0s}
  .svc-acc:has(> .svc-panel:is(:hover,:focus-within)) > .svc-panel .svc-line{transform:scaleX(0);transition-delay:0s}

  .svc-acc:has(> .svc-panel:is(:hover,:focus-within)) > .svc-panel:is(:hover,:focus-within) .svc-bg{opacity:.62;transform:translateX(-50%) scale(1);filter:saturate(1)}
  .svc-acc:has(> .svc-panel:is(:hover,:focus-within)) > .svc-panel:is(:hover,:focus-within) .svc-closed{opacity:0;transition-delay:0s}
  .svc-acc:has(> .svc-panel:is(:hover,:focus-within)) > .svc-panel:is(:hover,:focus-within) .svc-open{opacity:1;transform:none;pointer-events:auto;transition-delay:.32s,.28s}
  .svc-acc:has(> .svc-panel:is(:hover,:focus-within)) > .svc-panel:is(:hover,:focus-within) .svc-line{transform:scaleX(1);transition-delay:.25s}
}
.svc-vlabel{writing-mode:vertical-rl;transform:rotate(180deg);white-space:nowrap}
@media (prefers-reduced-motion:reduce){
  .svc-panel,.svc-bg,.svc-open,.svc-closed,.svc-line{transition:none !important}
}
`;

export const CategoryPanels = ({ groups }: { groups: CategoryGroup[] }) => {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);

  return (
    <>
      <style>{CSS}</style>
      <motion.ul
        className="svc-acc"
        initial={reduce ? false : 'hidden'}
        whileInView="shown"
        viewport={{ once: true, margin: '0px 0px -12% 0px' }}
        variants={{ shown: { transition: { staggerChildren: 0.075 } } }}
      >
        {groups.map((g, i) => {
          const img = serviceImage(g.services[0]?.slug ?? '');
          const num = String(i + 1).padStart(2, '0');
          const count = `${g.services.length} ${g.services.length === 1 ? 'service' : 'services'}`;
          return (
            <motion.li
              key={g.category}
              className={`svc-panel ${active === i ? 'is-active' : ''}`}
              onPointerEnter={(e) => {
                if (e.pointerType === 'mouse') setActive(i);
              }}
              onFocus={() => setActive(i)}
              variants={
                reduce
                  ? undefined
                  : {
                      hidden: { opacity: 0, y: 70, clipPath: 'inset(100% 0% 0% 0% round 22px)' },
                      shown: {
                        opacity: 1,
                        y: 0,
                        clipPath: 'inset(0% 0% 0% 0% round 22px)',
                        transition: { duration: 1.1, ease: EASE_OUT_SOFT },
                      },
                    }
              }
            >
              <img className="svc-bg" src={img.src} alt={img.alt} loading="lazy" {...responsive(img.src, 'half')} />
              <div className="svc-scrim" aria-hidden="true" />
              <span className="svc-line" aria-hidden="true" />

              {/* Folded state: number, vertical name, a plus. Decorative — the
                  same name is the panel's real heading below. */}
              <div className="svc-closed" aria-hidden="true">
                <span className="font-heading text-[15px] tabular-nums text-[#A9C4EE]">{num}</span>
                <span className="svc-vlabel font-heading text-[1.6rem] leading-none text-white">{g.category}</span>
                <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/25 text-[18px] leading-none text-white/80">
                  +
                </span>
              </div>

              <div className="svc-open">
                <p className="mb-3 flex items-center gap-3 text-[11.5px] font-bold uppercase tracking-[0.18em] text-[#A9C4EE]">
                  <span className="tabular-nums">{num}</span>
                  <span aria-hidden="true" className="inline-block h-px w-6 bg-[#A9C4EE]/60" />
                  {count}
                </p>
                <h3 className="font-heading text-[2rem] leading-[1.05] tracking-[-0.015em] text-white sm:text-[2.5rem]">
                  {g.category}
                </h3>
                {g.note ? <p className="mt-3 max-w-[40ch] text-[15px] leading-[1.6] text-[#D9E1F0]">{g.note}</p> : null}
                <ul className="mt-6 border-b border-white/12">
                  {g.services.map((s) => {
                    const price = priceLabel(s);
                    return (
                      <li key={s.slug} className="border-t border-white/12">
                        <Link
                          href={`/services/${s.slug}`}
                          className="group/link flex items-center justify-between gap-4 py-3.5 text-white transition-colors duration-300 hover:text-[#E6EFFF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A9C4EE] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1F2030]"
                        >
                          <span className="font-heading text-[1.12rem] leading-snug transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/link:translate-x-1.5">
                            {s.name}
                          </span>
                          <span className="flex flex-shrink-0 items-center gap-3">
                            <span className="text-[13px] font-semibold text-[#A9C4EE]">{price}</span>
                            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 transition-all duration-500 group-hover/link:border-white group-hover/link:bg-white group-hover/link:text-[#2E2F3D]">
                              <ArrowRightIcon className="h-3.5 w-3.5" />
                            </span>
                          </span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </motion.li>
          );
        })}
      </motion.ul>
    </>
  );
};
