'use client';

/* ---------------------------------------------------------------------------
   SERVICE DETAIL — the animated bands shared by every service page.

   Each band has its own kind of motion; none of them is a plain fade-up:

     AnswerZoom    the service's own photograph starts as an inset, rounded
                   card and opens to full-bleed as it reaches the middle of the
                   screen (ZoomFrame); the answer block focuses in over it.
     ServiceStory  the service's own heading and paragraphs (content.ts
                   `detail`), beside a card that turns in from the side with a
                   rule drawing down its edge: a client review from the live
                   site where there is one, otherwise a way to call.
     QuitSmoking   smoking cessation only, in place of StepsPath: the method,
                   "Two Ways to Win" and the smoking client reviews, all from
                   the client's own /quitsmoking page.
     StepsPath     the three STEPS as cursor-lit cards (Spotlight) zig-zagging
                   down a dark band, joined by a line that draws itself with
                   scroll (ScrollDraw), measured from the cards' positions.
     OfficeSetting the practice's real room, uncovered by a panel of colour
                   sweeping across it (CurtainReveal), then settling in scale.
     RelatedRise   the related services on a dark block that grows from a
                   rounded card to full width as it arrives (RiseIn).
     FaqEcho       the page's own particle figure again, in the light tone,
                   held beside the questions (desktop only — the second and
                   last canvas on the page).

   COPY RULES: every string is the service record, STEPS, FAQS, NAP or
   REAL_COPY from content.ts, or text this route already carried. NO SCOPE
   NOTE on these pages: the client removed it (markup #93, #101) and allowed
   it on /our-team only (#73).

   IMAGERY: the office photograph is OFFICE_INTERIOR from ./assets — the one
   real picture of the room. The two stock "room" photographs that used to sit
   beside the setting copy were removed: next to a heading about the office,
   a stock interior reads as the office.
--------------------------------------------------------------------------- */

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { SERVICES, STEPS, FAQS, NAP, REAL_COPY, type Service } from '../../content';
import { serviceImage } from '../../unsplash';
import { OFFICE_INTERIOR, OFFICE_INTERIOR_ALT } from '../../assets';
import { responsive } from '../../responsive';
import { priceLabel } from '../../price';
import { ArrowRightIcon, PhoneIcon, MapPinIcon, ClockIcon, QuoteIcon, StarIcon } from '../../Icons';
import { SectionHeading } from '../../SectionHeading';
import { ServiceCard } from '../../ServiceCard';
import { FaqAccordion } from '../../FaqAccordion';
import { MindScene, type ShapeName } from '../../scene/MindScene';
import { motion, useReducedMotion, Reveal, SplitHeading, Stagger, CursorGlow, EASE_OUT_SOFT } from '../../Motion';
import { ZoomFrame, Spotlight, ScrollDraw, PopItem, SlideItem, CurtainReveal, RiseIn, RollText } from '../../MotionFx';
import { useWide } from './useWide';

const bySlug = (slug: string): Service | undefined => SERVICES.find((s) => s.slug === slug);

/* ---------------------------------------------------------- AnswerZoom -- */

export const AnswerZoom = ({ slug }: { slug: string }) => {
  const reduce = useReducedMotion();
  const service = bySlug(slug);
  if (!service) return null;
  const img = serviceImage(service.slug);
  const price = priceLabel(service);

  return (
    <section className="relative bg-white pt-4 sm:pt-8">
      <ZoomFrame
        src={img.src}
        alt={img.alt}
        imgProps={responsive(img.src, 'full')}
        from={10}
        className="h-[92svh] min-h-[38rem] max-h-[62rem]"
      >
        {/* SCRIM, in two parts so the photograph still reads at the top of
            the frame while the text never depends on what the photo does:
              1. a light veil (#1F2030 at 30%) over the whole frame;
              2. a gradient attached to the TEXT BLOCK itself, solid #1F2030
                 at 90%+ from its foot to 75% of its height and fading above.
            Worked against a pure-white pixel of the photo, the smallest text
            (the #A9C4EE label at the block's top edge) composites to at least
            ~0.9 of #1F2030 — about 7:1 — and the white answer is above 11:1. */}
        <div aria-hidden="true" className="absolute inset-0 bg-[#1F2030]/30" />

        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#1F2030] from-35% via-[#1F2030]/90 via-75% to-transparent pt-40 sm:pt-48">
          <div className="mx-auto max-w-[1280px] px-6 pb-14 sm:px-10 sm:pb-20 lg:px-8 lg:pb-24">
            <motion.p
              initial={reduce ? false : { opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '0px 0px 5% 0px' }}
              transition={{ duration: 0.7, ease: EASE_OUT_SOFT }}
              className="mb-6 flex flex-wrap items-center gap-x-3 gap-y-1 text-[12px] font-bold uppercase tracking-[0.18em] text-[#A9C4EE]"
            >
              <span aria-hidden="true" className="inline-block h-px w-8 bg-[#A9C4EE]/70" />
              {service.name}
              {price ? (
                <>
                  <span aria-hidden="true">&middot;</span>
                  <span>{price}</span>
                </>
              ) : null}
            </motion.p>
            <motion.p
              id="answer-first"
              initial={reduce ? false : { opacity: 0, y: 40, filter: 'blur(12px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, margin: '0px 0px 5% 0px' }}
              transition={{ duration: 0.65, delay: 0.1, ease: EASE_OUT_SOFT }}
              className="max-w-[42ch] font-heading text-[1.28rem] leading-[1.48] tracking-[-0.005em] text-white sm:text-[1.75rem] lg:text-[2.05rem]"
            >
              {service.answer}
            </motion.p>
          </div>
        </div>
      </ZoomFrame>
    </section>
  );
};

/* --------------------------------------------------------- ServiceStory -- */

/*
  REPLACES "InShort" (2026-10-01, markup #93, #94, #100, #101). That band had a
  generic heading ("What booking this actually involves"), the one-line card
  summary, and the scope note in a card beside it. The client: "Why is this
  here? and not anxiety and stress"; on the scope note, "Remove completely!"
  and "Delete this terrible junk". So each service now gets its own heading
  and paragraphs (`detail` in content.ts, in his own words), and the card
  beside them is either a real testimonial from his site or a way to call.
*/
export const ServiceStory = ({ slug }: { slug: string }) => {
  const reduce = useReducedMotion();
  const service = bySlug(slug);
  if (!service) return null;
  return (
    /* Clipped on x: the side card enters from 60px to the right and would
       otherwise push a phone's page sideways while it travels. */
    <section className="relative overflow-x-clip bg-white py-16 sm:py-32">
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 items-start gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:gap-16 lg:px-8">
        <div className="lg:col-span-7">
          <Reveal>
            <p className="mb-4 font-body text-[11.5px] font-bold uppercase tracking-[0.2em] text-[#46699F] sm:text-xs">
              {service.name}
            </p>
          </Reveal>
          <SplitHeading
            text={service.detail.heading}
            className="max-w-[20ch] font-heading text-[2.2rem] sm:text-[2.9rem] lg:text-[3.3rem] leading-[1.08] tracking-[-0.018em] text-[#2E2F3D]"
          />
          <Reveal delay={0.15}>
            <div className="mt-8 flex max-w-[58ch] flex-col gap-5 text-[17px] leading-[1.72] text-[#4B5468]">
              {service.detail.paras.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </Reveal>
        </div>
        <div className="lg:col-span-5 lg:pt-10" style={{ perspective: 1200 }}>
          <motion.div
            initial={reduce ? false : { opacity: 0, x: 60, rotateY: -14 }}
            whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
            viewport={{ once: true, margin: '0px 0px 5% 0px' }}
            transition={{ duration: 0.8, ease: EASE_OUT_SOFT }}
            className="relative overflow-hidden rounded-[24px] border border-[#2E2F3D]/12 bg-[#E9F3EF] p-7 pl-9 shadow-[0_30px_60px_-40px_rgba(46,47,61,0.45)] sm:p-9 sm:pl-11"
          >
            <motion.span
              aria-hidden="true"
              initial={reduce ? false : { scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.35, ease: EASE_OUT_SOFT }}
              className="absolute bottom-0 left-0 top-0 w-[5px] origin-top bg-[#2E2F3D]"
            />
            {service.quote ? (
              <figure>
                <span className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-[0_8px_20px_-12px_rgba(46,47,61,0.5)]">
                  <QuoteIcon className="h-6 w-6 text-[#2E2F3D]" aria-hidden="true" />
                </span>
                <blockquote className="font-heading text-[1.25rem] leading-[1.5] text-[#2E2F3D] sm:text-[1.4rem]">
                  &ldquo;{service.quote.text}&rdquo;
                </blockquote>
                <figcaption className="mt-5 text-[13px] font-semibold uppercase tracking-[0.14em] text-[#46699F]">
                  {service.quote.by} &middot; Client review
                </figcaption>
              </figure>
            ) : (
              <div>
                <span className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-[0_8px_20px_-12px_rgba(46,47,61,0.5)]">
                  <PhoneIcon className="h-6 w-6 text-[#2E2F3D]" aria-hidden="true" />
                </span>
                <p className="font-heading text-[1.4rem] leading-[1.35] text-[#2E2F3D]">Let us know how we can help.</p>
                <p className="mt-3 text-[16px] leading-[1.7] text-[#4B5468]">
                  Don&rsquo;t hesitate to call with any questions you might have.
                </p>
                <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
                  <a
                    href={NAP.phoneHref}
                    className="ph-tap inline-flex items-center gap-2 rounded-[12px] bg-[#454659] px-5 py-3 text-[15px] font-semibold text-white transition-colors duration-300 hover:bg-[#33344A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#454659] focus-visible:ring-offset-2"
                  >
                    <PhoneIcon className="h-4 w-4" />
                    {NAP.phone}
                  </a>
                  <Link
                    href="/book"
                    className="ph-tap ph-underline inline-flex items-center gap-2 text-[15px] font-semibold text-[#46699F] transition-colors hover:text-[#2E2F3D] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#454659] focus-visible:ring-offset-2"
                  >
                    Book a Free Discovery Call
                    <ArrowRightIcon className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

/* -------------------------------------------------------- QuitSmoking -- */

/*
  The smoking-cessation page's own middle, in place of the generic steps
  (markup #95 "This is all wrong", #96 "this is all wrong as well" — the
  generic steps quoted $200 and a session count). Every line is the client's
  /quitsmoking page, via REAL_COPY.quitSmoking: the method, "Two Ways to Win",
  and the smoking client reviews. Markup #94: "I will write the smoke pages I
  guess. I thought I did…" — he did; this is that page.
*/
export const QuitSmoking = () => {
  const q = REAL_COPY.quitSmoking;
  return (
    <>
      <section className="relative isolate overflow-hidden bg-[#2E2F3D] py-16 ph-grain sm:py-32">
        <CursorGlow />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-48 top-1/3 h-[40rem] w-[40rem] rounded-full bg-[radial-gradient(closest-side,rgba(93,186,71,0.14),transparent)] blur-2xl"
        />
        <div className="relative mx-auto grid max-w-[1280px] grid-cols-1 gap-14 px-4 sm:px-6 lg:grid-cols-12 lg:gap-16 lg:px-8">
          {/* THE METHOD */}
          <div className="lg:col-span-6">
            <Reveal>
              <p className="mb-6 flex items-center gap-3 text-[11.5px] font-bold uppercase tracking-[0.2em] text-[#A9C4EE] sm:text-xs">
                <span aria-hidden="true" className="inline-block h-px w-10 bg-[#A9C4EE]/60" />
                The Method
              </p>
            </Reveal>
            <SplitHeading
              text={q.kicker}
              className="max-w-[18ch] font-heading text-[2.2rem] sm:text-[2.9rem] lg:text-[3.1rem] leading-[1.08] tracking-[-0.018em] text-white"
            />
            <Reveal delay={0.12}>
              <ul className="mt-9 flex flex-col gap-2 font-heading text-[1.35rem] leading-snug text-[#D9E1F0] sm:text-[1.6rem]">
                {q.method.map((line, i) => (
                  <li key={line} className={i === q.method.length - 1 ? 'text-white' : ''}>
                    {line}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-8 max-w-[52ch] text-[16.5px] leading-[1.75] text-[#D9E1F0]">{q.body}</p>
              <p className="mt-6 font-heading text-[1.6rem] leading-snug text-white sm:text-[1.9rem]">{q.headline}</p>
            </Reveal>
          </div>

          {/* TWO WAYS TO WIN */}
          <div className="lg:col-span-6">
            <Reveal>
              <p className="mb-6 flex items-center gap-3 text-[11.5px] font-bold uppercase tracking-[0.2em] text-[#A9C4EE] sm:text-xs">
                <span aria-hidden="true" className="inline-block h-px w-10 bg-[#A9C4EE]/60" />
                Two Ways to Win
              </p>
            </Reveal>
            <Stagger className="flex flex-col gap-5" gap={0.12}>
              {q.ways.map((w, i) => (
                <PopItem key={w.title}>
                  <Spotlight className="rounded-[24px] border border-white/10 bg-[#1F2030] p-7 shadow-[0_40px_80px_-40px_rgba(0,0,0,0.7)] sm:p-9">
                    <span
                      aria-hidden="true"
                      className="font-heading text-[3.4rem] leading-[0.9] text-transparent [-webkit-text-stroke:1px_rgba(169,196,238,0.75)]"
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <h3 className="mt-5 font-heading text-[1.6rem] leading-tight text-white sm:text-[1.9rem]">{w.title}</h3>
                    <p className="mt-3 max-w-[52ch] text-[16px] leading-[1.72] text-[#D9E1F0]">{w.body}</p>
                  </Spotlight>
                </PopItem>
              ))}
            </Stagger>
            <Reveal delay={0.15}>
              <p className="mt-7 font-heading text-[1.35rem] text-[#A9C4EE]">{q.walkAway}</p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* SMOKING CLIENT REVIEWS */}
      <section className="relative overflow-hidden bg-white py-16 sm:py-28">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
          <div className="mb-12 flex flex-col gap-4 sm:mb-14 sm:flex-row sm:items-end sm:justify-between">
            <SplitHeading
              text="Smoking client reviews"
              className="font-heading text-[2.2rem] sm:text-[2.9rem] lg:text-[3.3rem] leading-[1.08] tracking-[-0.018em] text-[#2E2F3D]"
            />
            <Reveal dir="left" delay={0.15}>
              <ul className="flex flex-col font-heading text-[1.15rem] leading-snug text-[#2E2F3D] sm:items-end sm:text-right">
                {q.earned.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </Reveal>
          </div>
          <Stagger className="grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-6" gap={0.12}>
            {q.reviews.map((r) => (
              <PopItem key={r} className="h-full">
                <figure className="flex h-full flex-col rounded-[22px] border border-[#D7DEEA] bg-[#F7F9FC] p-7">
                  <QuoteIcon className="h-6 w-6 text-[#46699F]" aria-hidden="true" />
                  <blockquote className="mt-4 flex-1 text-[16px] leading-[1.7] text-[#2E2F3D]">&ldquo;{r}&rdquo;</blockquote>
                  <figcaption className="mt-5 flex gap-1" aria-label="Five stars">
                    {Array.from({ length: 5 }, (_, i) => (
                      <StarIcon key={i} className="h-4 w-4 text-[#5DBA47]" aria-hidden="true" />
                    ))}
                  </figcaption>
                </figure>
              </PopItem>
            ))}
          </Stagger>
          <Reveal delay={0.1}>
            <Link
              href="/book"
              className="group mt-10 inline-flex items-center gap-2.5 rounded-[14px] bg-[#454659] px-7 py-4 text-[15px] font-semibold text-white transition-colors duration-300 hover:bg-[#33344A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#454659] focus-visible:ring-offset-2"
            >
              <RollText>{q.readyCta}</RollText>
              <ArrowRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
};

/* ----------------------------------------------------------- StepsPath -- */

/*
  THE LINE BETWEEN THE STEPS is built from the cards' real positions, in
  pixels, and handed to ScrollDraw with a viewBox the same size as the box it
  is drawn in — so the SVG is never stretched.

  WHY MEASURED AND NOT A FIXED 100x100 PATH: ScrollDraw draws with
  preserveAspectRatio="none" + vector-effect="non-scaling-stroke" + a
  normalised pathLength. Once that box is stretched unevenly (a 100x100 path
  over a 1200x1500 list), the dash pattern that animates pathLength is
  computed in one space and applied in the other, and the "drawn" stroke
  breaks into separate dashes. At 1:1 scale the two spaces agree.

  Desktop (cards zig-zag): centre to centre with horizontal tangents, so the
  line leaves each card through its side and sweeps down into the next. The
  cards are opaque; the line only shows in the gaps. Phones (one column): a
  gentle wave down the left gutter.
*/
type Geo = { w: number; h: number; d: string };

const useStepsGeometry = () => {
  const ref = useRef<HTMLOListElement | null>(null);
  const [geo, setGeo] = useState<Geo | null>(null);
  useEffect(() => {
    const ol = ref.current;
    if (!ol) return;
    const measure = () => {
      // offset* ignores transforms, so the entrance animation cannot skew it.
      const cards = Array.from(ol.querySelectorAll<HTMLElement>('[data-step]')).map((el) => ({
        x: el.offsetLeft,
        y: el.offsetTop,
        w: el.offsetWidth,
        h: el.offsetHeight,
      }));
      if (cards.length < 2) return;
      const w = ol.offsetWidth;
      const h = ol.offsetHeight;
      const single = Math.abs(cards[0].x - cards[1].x) < 8;
      let d: string;
      if (single) {
        const x = 12;
        const top = cards[0].y + 24;
        const bot = cards[cards.length - 1].y + cards[cards.length - 1].h - 24;
        const q = (bot - top) / 4;
        d = `M ${x} ${top} C ${x + 7} ${top + q}, ${x - 7} ${top + q * 1.5}, ${x} ${top + q * 2} S ${x + 7} ${top + q * 3.5}, ${x} ${bot}`;
      } else {
        const pts = cards.map((c) => ({ x: c.x + c.w / 2, y: c.y + c.h / 2 }));
        d = `M ${pts[0].x} ${pts[0].y}`;
        for (let i = 1; i < pts.length; i++) {
          const a = pts[i - 1];
          const b = pts[i];
          const dx = (b.x - a.x) * 0.95;
          d += ` C ${a.x + dx} ${a.y}, ${b.x - dx} ${b.y}, ${b.x} ${b.y}`;
        }
      }
      setGeo({ w, h, d });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(ol);
    return () => ro.disconnect();
  }, []);
  return [ref, geo] as const;
};

export const StepsPath = () => {
  const [olRef, geo] = useStepsGeometry();
  return (
  <section className="relative isolate overflow-hidden bg-[#2E2F3D] py-16 ph-grain sm:py-32">
    <CursorGlow />
    <div
      aria-hidden="true"
      className="pointer-events-none absolute -right-48 top-1/3 h-[40rem] w-[40rem] rounded-full bg-[radial-gradient(closest-side,rgba(93,186,71,0.12),transparent)] blur-2xl"
    />
    <div className="relative mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
      <Reveal>
        <p className="mb-14 flex items-center gap-3 text-[11.5px] font-bold uppercase tracking-[0.2em] text-[#A9C4EE] sm:mb-20 sm:text-xs">
          <span aria-hidden="true" className="inline-block h-px w-10 bg-[#A9C4EE]/60" />
          Step by step
        </p>
      </Reveal>

      <div className="relative">
        {geo ? (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-0 top-0"
            style={{ width: geo.w, height: geo.h }}
          >
            <ScrollDraw
              d={geo.d}
              viewBox={`0 0 ${geo.w} ${geo.h}`}
              strokeWidth={2}
              gradient={['#A9C4EE', '#5DBA47']}
              offset={['start 75%', 'end 60%']}
              className="block h-full w-full text-white"
            />
          </div>
        ) : null}

        <ol ref={olRef} className="relative flex flex-col gap-10 pl-9 sm:gap-14 lg:gap-24 lg:pl-0">
          {STEPS.map((s, i) => (
            <li key={s.n} data-step className={`lg:w-[46%] ${i % 2 === 1 ? 'lg:ml-auto' : ''}`}>
              <Stagger>
                <PopItem>
                  <Spotlight className="rounded-[26px] border border-white/10 bg-[#1F2030] p-7 shadow-[0_40px_80px_-40px_rgba(0,0,0,0.7)] sm:p-10">
                    <div className="flex items-start justify-between gap-4">
                      <span
                        aria-hidden="true"
                        className="font-heading text-[4.2rem] leading-[0.9] text-transparent [-webkit-text-stroke:1px_rgba(169,196,238,0.75)] sm:text-[5.6rem]"
                      >
                        {s.n}
                      </span>
                      <span className="mt-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#A9C4EE]">
                        Step {i + 1} of {STEPS.length}
                      </span>
                    </div>
                    <h3 className="mt-7 font-heading text-[1.6rem] leading-tight text-white sm:text-[2.1rem]">{s.title}</h3>
                    <p className="mt-3 max-w-[46ch] text-[16px] leading-[1.72] text-[#D9E1F0]">{s.body}</p>
                  </Spotlight>
                </PopItem>
              </Stagger>
            </li>
          ))}
        </ol>
      </div>
    </div>
  </section>
  );
};

/* ------------------------------------------------------- OfficeSetting -- */

export const OfficeSetting = () => {
  const reduce = useReducedMotion();
  return (
    <section className="relative overflow-hidden bg-[#E9F3EF] py-16 sm:py-32">
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:gap-20 lg:px-8">
        <div className="lg:col-span-5">
          <CurtainReveal
            color="#2E2F3D"
            className="mx-auto max-w-[26rem] rounded-[26px] shadow-[0_40px_80px_-40px_rgba(46,47,61,0.6)] lg:max-w-none"
          >
            <div className="overflow-hidden rounded-[26px]">
              <motion.img
                src={OFFICE_INTERIOR}
                alt={OFFICE_INTERIOR_ALT}
                loading="lazy"
                className="aspect-[760/1131] w-full object-cover"
                initial={reduce ? false : { scale: 1.18 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true, margin: '0px 0px 5% 0px' }}
                transition={{ duration: 0.65, delay: 0.15, ease: EASE_OUT_SOFT }}
              />
            </div>
          </CurtainReveal>
        </div>

        <div className="lg:col-span-7">
          <SectionHeading
            eyebrow="The setting"
            title="In the office, or online from anywhere"
            size="lg"
            lede={
              /* Markup #97, the client's exact sentence ("DELETE AND INSERT"). */
              <p>In person at 1910 Huntington Dr in South Pasadena, or by video anywhere.</p>
            }
          />

          <Reveal delay={0.1}>
            <h3 className="mt-12 font-heading text-[1.3rem] text-[#2E2F3D]">Where this happens</h3>
          </Reveal>
          <Stagger as="ul" className="mt-5 flex flex-col divide-y divide-[#2E2F3D]/10 border-y border-[#2E2F3D]/10" gap={0.1}>
            <SlideItem as="li" from="right" className="flex items-center gap-4 py-4">
              <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-white text-[#46699F]">
                <MapPinIcon className="h-[18px] w-[18px]" />
              </span>
              <span className="text-[15.5px] text-[#2E2F3D]">
                {NAP.street}, {NAP.city}, {NAP.state} {NAP.zip}
              </span>
            </SlideItem>
            <SlideItem as="li" from="right" className="flex items-center gap-4 py-4">
              <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-white text-[#46699F]">
                <ClockIcon className="h-[18px] w-[18px]" />
              </span>
              <span className="text-[15.5px] text-[#2E2F3D]">Open late &mdash; most evenings until 9 PM</span>
            </SlideItem>
            <SlideItem as="li" from="right" className="flex items-center gap-4 py-4">
              <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-white text-[#46699F]">
                <PhoneIcon className="h-[18px] w-[18px]" />
              </span>
              <a href={NAP.phoneHref} className="ph-tap ph-underline text-[15.5px] font-medium text-[#2E2F3D]">
                {NAP.phone}
              </a>
            </SlideItem>
          </Stagger>

          <Reveal delay={0.2}>
            <div className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-4">
              <Link
                href="/book"
                className="group inline-flex items-center gap-2.5 rounded-[14px] bg-[#454659] px-7 py-4 text-[15px] font-semibold text-white transition-colors duration-300 hover:bg-[#33344A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#454659] focus-visible:ring-offset-2"
              >
                <RollText>Book a Free Discovery Call</RollText>
                <ArrowRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link
                href="/contact"
                className="ph-tap ph-underline inline-flex items-center gap-2 text-[15px] font-semibold text-[#46699F] transition-colors hover:text-[#2E2F3D] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#454659] focus-visible:ring-offset-2"
              >
                Find the office
                <ArrowRightIcon className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

/* --------------------------------------------------------- RelatedRise -- */

export const RelatedRise = ({ slug }: { slug: string }) => {
  const related = SERVICES.filter((s) => s.slug !== slug).slice(0, 3);
  return (
    <div className="bg-[#E9F3EF]">
      <RiseIn className="relative isolate bg-[#1F2030] ph-grain">
        <CursorGlow />
        <div className="relative mx-auto max-w-[1280px] px-4 py-16 sm:px-6 sm:py-28 lg:px-8">
          <div className="mb-12 flex flex-col gap-5 sm:mb-14 sm:flex-row sm:items-end sm:justify-between">
            <SplitHeading
              text="Other work Jason takes"
              className="font-heading text-[2.2rem] sm:text-[2.9rem] lg:text-[3.3rem] leading-[1.08] tracking-[-0.018em] text-white"
            />
            <Reveal dir="left" delay={0.2}>
              <Link
                href="/services"
                className="ph-tap group inline-flex items-center gap-2 text-[15px] font-semibold text-[#A9C4EE] transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A9C4EE] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1F2030]"
              >
                <RollText>All services</RollText>
                <ArrowRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Reveal>
          </div>
          <Stagger className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-3" gap={0.1}>
            {related.map((s, i) => (
              <SlideItem key={s.slug} from={i % 2 === 0 ? 'left' : 'right'} className="h-full">
                <ServiceCard service={s} variant="brief" />
              </SlideItem>
            ))}
          </Stagger>
        </div>
      </RiseIn>
    </div>
  );
};

/* ------------------------------------------------------------- FaqEcho -- */

export const FaqEcho = ({ scene, hover }: { scene: ShapeName; hover?: ShapeName }) => {
  const wide = useWide();
  return (
    /* overflow-x-clip, not overflow-hidden: `hidden` makes the section a
       scroll container and the sticky column would stop sticking. */
    <section className="relative overflow-x-clip bg-[#E6EFFF] py-16 sm:py-32">
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:gap-16 lg:px-8">
        <div className="lg:sticky lg:top-28 lg:col-span-5 lg:self-start">
          <Reveal>
            <p className="mb-4 font-body text-[11.5px] font-bold uppercase tracking-[0.2em] text-[#46699F] sm:text-xs">
              Before you call
            </p>
          </Reveal>
          <SplitHeading
            text="Common questions"
            className="font-heading text-[2.2rem] sm:text-[2.9rem] lg:text-[3.3rem] leading-[1.08] tracking-[-0.018em] text-[#2E2F3D]"
          />
          <Reveal delay={0.15}>
            <Link
              href="/faq"
              className="ph-tap ph-underline mt-6 inline-flex items-center gap-2 text-[15px] font-semibold text-[#46699F] transition-colors hover:text-[#2E2F3D] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#454659] focus-visible:ring-offset-2"
            >
              View all frequently asked questions
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </Reveal>
          {/* The page's own figure, returning in the light tone. */}
          <div className="relative mt-8 hidden h-[21rem] lg:block">
            <div
              aria-hidden="true"
              className="absolute inset-[10%] rounded-full bg-[radial-gradient(closest-side,rgba(255,255,255,0.75),transparent)]"
            />
            {wide ? (
              <MindScene
                shape={scene}
                hoverShape={hover}
                tone="light"
                intro={false}
                intensity={0.85}
                className="absolute inset-0"
              />
            ) : null}
          </div>
        </div>

        <div className="lg:col-span-7">
          {/*
            No FAQPage schema on this route — it lives on /faq, beside the
            full list. Emitting the same three questions as FAQPage from
            every service URL would be duplicate structured data across
            the site, which is the opposite of helpful.
          */}
          <Reveal dir="left" distance={40}>
            <FaqAccordion items={FAQS.slice(0, 3)} autoOpenOnScroll />
          </Reveal>
        </div>
      </div>
    </section>
  );
};
