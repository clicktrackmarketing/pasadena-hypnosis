'use client';

/* ---------------------------------------------------------------------------
   MOTION FX — the third wave of the motion vocabulary (added 2026-09-28).

   Motion.tsx holds the entrance primitives (Reveal, Stagger, SplitHeading...).
   This file adds the SCROLL-SCRUBBED and POINTER-DRIVEN effects that give each
   page its own signature, so that no two pages move the same way:

     ScrubText        words light up as the paragraph passes through view
     ZoomFrame        an inset, rounded image opens to full-bleed on scroll
     StickyStack      cards pin and stack, the ones underneath receding
     VelocityMarquee  a ticker whose speed and lean follow the scroll wheel
     ScrollDraw       an SVG path that draws itself with scroll
     Spotlight        a card lit by a soft light under the cursor
     FlipItem / PopItem / SlideItem   3D and blur entrances for <Stagger>
     CurtainReveal    a colour panel sweeps across, uncovering the content
     DepthField/Depth pointer-parallax layers at different depths
     Orbit            items circling a centre, always upright
     RiseIn           a section that grows from a rounded card to full width
     ScrollRotate     rotation tied to page scroll
     RollText         hover label that rolls to a duplicate of itself

   SAME TWO RULES AS Motion.tsx, without exception:
     1. prefers-reduced-motion renders the FINAL state, immediately.
     2. Nothing hides content if the JS bundle never runs — anything that
        starts invisible does so through motion's `initial`, never through a
        CSS class.
--------------------------------------------------------------------------- */

import {
  motion,
  useAnimationFrame,
  useInView,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  type MotionValue,
} from 'motion/react';
import {
  Children,
  createContext,
  useContext,
  useEffect,
  useId,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from 'react';
import { EASE_OUT_SOFT } from './Motion';

/* ------------------------------------------------------------ ScrubText -- */

const ScrubWord = ({
  word,
  progress,
  range,
  dim,
}: {
  word: string;
  progress: MotionValue<number>;
  range: [number, number];
  dim: number;
}) => {
  const opacity = useTransform(progress, range, [dim, 1]);
  const y = useTransform(progress, range, ['0.18em', '0em']);
  return (
    <motion.span style={{ opacity, y, display: 'inline-block' }} aria-hidden="true">
      {word}
    </motion.span>
  );
};

/**
 * A statement that reads itself in as you scroll: every word starts dim and
 * reaches full strength in order. The whole string is exposed once via
 * aria-label; the animated words are aria-hidden.
 */
export const ScrubText = ({
  text,
  className,
  as = 'p',
  dim = 0.14,
  offset = ['start 85%', 'end 50%'],
}: {
  text: string;
  className?: string;
  as?: 'p' | 'h2' | 'h3' | 'blockquote';
  dim?: number;
  offset?: [string, string];
}) => {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement | null>(null);
  // Server HTML and the first client render show the sentence at FULL
  // strength; the dimmed, scroll-driven words only take over once hydrated.
  // Otherwise a visitor whose JS is slow or blocked reads a faint sentence.
  const [live, setLive] = useState(false);
  useEffect(() => setLive(true), []);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: offset as unknown as ['start end', 'end start'],
  });
  const Tag = as as 'p';
  if (reduce || !live) return <Tag ref={ref as React.RefObject<HTMLParagraphElement>} className={className}>{text}</Tag>;
  const words = text.split(' ');
  return (
    <Tag ref={ref as React.RefObject<HTMLParagraphElement>} className={className} aria-label={text}>
      {words.map((w, i) => (
        <span key={`${w}-${i}`}>
          <ScrubWord word={w} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]} dim={dim} />
          {i < words.length - 1 ? ' ' : ''}
        </span>
      ))}
    </Tag>
  );
};

/* ------------------------------------------------------------ ZoomFrame -- */

/**
 * An image that starts as an inset, rounded card and opens to the full width
 * of its container as it reaches the middle of the viewport. `children` are
 * laid over the picture (give them their own scrim).
 */
export const ZoomFrame = ({
  src,
  alt,
  className,
  imgProps,
  children,
  from = 12,
}: {
  src: string;
  alt: string;
  className?: string;
  imgProps?: Record<string, unknown>;
  children?: ReactNode;
  /** Starting inset, percent of the frame. */
  from?: number;
}) => {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'center center'] });
  const inset = useTransform(scrollYProgress, [0, 1], [from, 0]);
  const insetX = useTransform(inset, (v) => v * 1.4);
  const radius = useTransform(scrollYProgress, [0, 1], [40, 0]);
  const clipPath = useMotionTemplate`inset(${inset}% ${insetX}% ${inset}% ${insetX}% round ${radius}px)`;
  const scale = useTransform(scrollYProgress, [0, 1], [1.28, 1]);

  return (
    <div ref={ref} className={`relative overflow-hidden ${className ?? ''}`}>
      <motion.div className="absolute inset-0" style={reduce ? undefined : { clipPath }}>
        <motion.img
          src={src}
          alt={alt}
          loading="lazy"
          {...imgProps}
          className="h-full w-full object-cover"
          style={reduce ? undefined : { scale }}
        />
        {children}
      </motion.div>
    </div>
  );
};

/* ---------------------------------------------------------- StickyStack -- */

const StackCard = ({
  children,
  i,
  n,
  progress,
  top,
  gap,
  reduce,
  className,
}: {
  children: ReactNode;
  i: number;
  n: number;
  progress: MotionValue<number>;
  top: number;
  gap: number;
  reduce: boolean;
  className?: string;
}) => {
  const target = 1 - (n - 1 - i) * 0.045;
  const scale = useTransform(progress, [i / n, 1], [1, target]);
  const dimOpacity = useTransform(progress, [i / n, Math.min(1, (i + 1.2) / n)], [0, i === n - 1 ? 0 : 0.35]);
  return (
    <div className={`sticky ${className ?? ''}`} style={{ top: top + i * gap }}>
      <motion.div style={reduce ? undefined : { scale, transformOrigin: 'top center' }} className="relative">
        {children}
        {!reduce && (
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-[inherit] bg-[#2E2F3D]"
            style={{ opacity: dimOpacity, borderRadius: 'inherit' }}
          />
        )}
      </motion.div>
    </div>
  );
};

/**
 * Cards that pin one after another near the top of the viewport; each earlier
 * card shrinks back and dims as the next slides over it. Plain sticky
 * positioning, so it scrolls natively on every device.
 */
export const StickyStack = ({
  children,
  top = 110,
  gap = 22,
  className,
  itemClassName,
}: {
  children: ReactNode;
  top?: number;
  gap?: number;
  className?: string;
  itemClassName?: string;
}) => {
  const reduce = useReducedMotion() ?? false;
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const items = Children.toArray(children);
  return (
    <div ref={ref} className={`relative flex flex-col gap-[9vh] ${className ?? ''}`}>
      {items.map((c, i) => (
        <StackCard
          key={i}
          i={i}
          n={items.length}
          progress={scrollYProgress}
          top={top}
          gap={gap}
          reduce={reduce}
          className={itemClassName}
        >
          {c}
        </StackCard>
      ))}
    </div>
  );
};

/* ------------------------------------------------------ VelocityMarquee -- */

const wrap = (min: number, max: number, v: number) => {
  const r = max - min;
  return ((((v - min) % r) + r) % r) + min;
};

/**
 * A ticker that drifts on its own and speeds up, reverses and leans with the
 * scroll wheel. Four copies of the children; three are aria-hidden. It stops
 * computing entirely when it is off screen.
 */
export const VelocityMarquee = ({
  children,
  baseVelocity = -1.6,
  className,
}: {
  children: ReactNode;
  baseVelocity?: number;
  className?: string;
}) => {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { margin: '100px 0px' });
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const smooth = useSpring(velocity, { damping: 50, stiffness: 380 });
  const factor = useTransform(smooth, [0, 1000], [0, 4], { clamp: false });
  const skewX = useTransform(smooth, [-1800, 0, 1800], [7, 0, -7], { clamp: true });
  const x = useTransform(baseX, (v) => `${wrap(-25, -50, v)}%`);
  const dir = useRef(1);

  useAnimationFrame((_, delta) => {
    if (reduce || !inView) return;
    let move = dir.current * baseVelocity * (delta / 1000);
    const f = factor.get();
    if (f < 0) dir.current = -1;
    else if (f > 0) dir.current = 1;
    move += dir.current * move * f;
    baseX.set(baseX.get() + move);
  });

  if (reduce) {
    return (
      <div className={`overflow-hidden whitespace-nowrap ${className ?? ''}`}>
        <span className="inline-block">{children}</span>
      </div>
    );
  }
  return (
    <div ref={ref} className={`overflow-hidden whitespace-nowrap ${className ?? ''}`}>
      <motion.div className="flex w-max flex-nowrap" style={{ x, skewX }}>
        <span className="block shrink-0">{children}</span>
        {[1, 2, 3].map((k) => (
          <span key={k} className="block shrink-0" aria-hidden="true">
            {children}
          </span>
        ))}
      </motion.div>
    </div>
  );
};

/* ----------------------------------------------------------- ScrollDraw -- */

/** An SVG path that draws itself as it scrolls through view. Decorative. */
export const ScrollDraw = ({
  d,
  viewBox,
  className,
  strokeWidth = 2,
  offset = ['start 85%', 'end 40%'],
  gradient,
}: {
  d: string;
  viewBox: string;
  className?: string;
  strokeWidth?: number;
  offset?: [string, string];
  gradient?: [string, string];
}) => {
  const reduce = useReducedMotion();
  const ref = useRef<SVGSVGElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref as unknown as React.RefObject<HTMLElement | null>,
    offset: offset as unknown as ['start end', 'end start'],
  });
  const pathLength = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  const gid = `ph-draw-${useId().replace(/:/g, '')}`;
  return (
    <svg ref={ref} viewBox={viewBox} className={className} fill="none" aria-hidden="true" preserveAspectRatio="none">
      {gradient ? (
        <defs>
          <linearGradient id={gid} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={gradient[0]} />
            <stop offset="100%" stopColor={gradient[1]} />
          </linearGradient>
        </defs>
      ) : null}
      <path d={d} stroke="currentColor" strokeOpacity={0.12} strokeWidth={strokeWidth} vectorEffect="non-scaling-stroke" />
      <motion.path
        d={d}
        stroke={gradient ? `url(#${gid})` : 'currentColor'}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
        style={reduce ? undefined : { pathLength }}
      />
    </svg>
  );
};

/* ------------------------------------------------------------ Spotlight -- */

/**
 * A card with a soft light that follows the mouse across its surface and a
 * border that brightens nearest the cursor. CSS custom properties only — no
 * React re-render per pointer move.
 */
export const Spotlight = ({
  children,
  className,
  color = 'rgba(169,196,238,0.22)',
  as = 'div',
}: {
  children: ReactNode;
  className?: string;
  color?: string;
  as?: 'div' | 'li' | 'article';
}) => {
  const ref = useRef<HTMLElement | null>(null);
  const Tag = as as 'div';
  return (
    <Tag
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`ph-spot group/spot relative isolate overflow-hidden ${className ?? ''}`}
      style={{ '--spot': color } as CSSProperties}
      onPointerMove={(e) => {
        if (e.pointerType !== 'mouse' || !ref.current) return;
        const r = ref.current.getBoundingClientRect();
        ref.current.style.setProperty('--mx', `${e.clientX - r.left}px`);
        ref.current.style.setProperty('--my', `${e.clientY - r.top}px`);
      }}
    >
      {children}
    </Tag>
  );
};

/* --------------------------------------- Stagger children: 3D entrances -- */

/** 3D flip-up entrance. Use inside <Stagger>. */
export const FlipItem = ({ children, className, as = 'div' }: { children: ReactNode; className?: string; as?: 'div' | 'li' }) => {
  const reduce = useReducedMotion();
  const Tag = motion[as];
  if (reduce) {
    const Plain = as as 'div';
    return <Plain className={className}>{children}</Plain>;
  }
  return (
    <Tag
      className={className}
      style={{ transformPerspective: 1200, transformOrigin: '50% 0%' }}
      variants={{
        hidden: { opacity: 0, rotateX: -58, y: 46 },
        shown: { opacity: 1, rotateX: 0, y: 0, transition: { duration: 0.65, ease: EASE_OUT_SOFT } },
      }}
    >
      {children}
    </Tag>
  );
};

/** Scale-and-focus entrance (from blurred and small). Use inside <Stagger>. */
export const PopItem = ({ children, className, as = 'div' }: { children: ReactNode; className?: string; as?: 'div' | 'li' }) => {
  const reduce = useReducedMotion();
  const Tag = motion[as];
  if (reduce) {
    const Plain = as as 'div';
    return <Plain className={className}>{children}</Plain>;
  }
  return (
    <Tag
      className={className}
      variants={{
        hidden: { opacity: 0, scale: 0.86, filter: 'blur(10px)' },
        shown: { opacity: 1, scale: 1, filter: 'blur(0px)', transition: { duration: 0.65, ease: EASE_OUT_SOFT } },
      }}
    >
      {children}
    </Tag>
  );
};

/** Sideways entrance with a slight turn; `from` picks the side. Use inside <Stagger>. */
export const SlideItem = ({
  children,
  className,
  from = 'left',
  as = 'div',
}: {
  children: ReactNode;
  className?: string;
  from?: 'left' | 'right';
  as?: 'div' | 'li';
}) => {
  const reduce = useReducedMotion();
  const Tag = motion[as];
  if (reduce) {
    const Plain = as as 'div';
    return <Plain className={className}>{children}</Plain>;
  }
  const s = from === 'left' ? -1 : 1;
  return (
    <Tag
      className={className}
      style={{ transformPerspective: 1200 }}
      variants={{
        hidden: { opacity: 0, x: 70 * s, rotateY: 16 * s },
        shown: { opacity: 1, x: 0, rotateY: 0, transition: { duration: 0.65, ease: EASE_OUT_SOFT } },
      }}
    >
      {children}
    </Tag>
  );
};

/* -------------------------------------------------------- CurtainReveal -- */

/**
 * A panel of colour sweeps across the block and off the other side; the
 * content is uncovered as it passes. Reads as "placed", not "loading".
 */
export const CurtainReveal = ({
  children,
  className,
  color = '#46699F',
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  color?: string;
  delay?: number;
}) => {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={`relative overflow-hidden ${className ?? ''}`}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, margin: '0px 0px 5% 0px' }}
    >
      <motion.div
        variants={{ hidden: { opacity: 0 }, shown: { opacity: 1, transition: { delay: delay + 0.24, duration: 0.01 } } }}
      >
        {children}
      </motion.div>
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10"
        style={{ background: color }}
        variants={{
          hidden: { x: '-101%' },
          shown: {
            x: ['-101%', '0%', '0%', '101%'],
            transition: { duration: 0.65, delay, times: [0, 0.36, 0.46, 1], ease: [0.76, 0, 0.24, 1] },
          },
        }}
      />
    </motion.div>
  );
};

/* ------------------------------------------------------ DepthField/Depth -- */

type DepthCtx = { x: MotionValue<number>; y: MotionValue<number> } | null;
const DepthContext = createContext<DepthCtx>(null);

/**
 * Pointer-parallax container. Children wrapped in <Depth depth={n}> shift by
 * n pixels at the container's edges, so layers at different depths separate
 * as the mouse moves — a cheap, convincing sense of 3D space.
 */
export const DepthField = ({ children, className }: { children: ReactNode; className?: string }) => {
  const reduce = useReducedMotion();
  const x = useSpring(0, { stiffness: 70, damping: 20, mass: 0.6 });
  const y = useSpring(0, { stiffness: 70, damping: 20, mass: 0.6 });
  return (
    <DepthContext.Provider value={reduce ? null : { x, y }}>
      <div
        className={className}
        onPointerMove={(e) => {
          if (reduce || e.pointerType !== 'mouse') return;
          const r = e.currentTarget.getBoundingClientRect();
          x.set(((e.clientX - r.left) / r.width) * 2 - 1);
          y.set(((e.clientY - r.top) / r.height) * 2 - 1);
        }}
        onPointerLeave={() => {
          x.set(0);
          y.set(0);
        }}
      >
        {children}
      </div>
    </DepthContext.Provider>
  );
};

export const Depth = ({ children, depth = 20, className }: { children: ReactNode; depth?: number; className?: string }) => {
  const ctx = useContext(DepthContext);
  const fallback = useMotionValue(0);
  const tx = useTransform(ctx?.x ?? fallback, (v) => v * depth);
  const ty = useTransform(ctx?.y ?? fallback, (v) => v * depth);
  return (
    <motion.div className={className} style={ctx ? { x: tx, y: ty } : undefined}>
      {children}
    </motion.div>
  );
};

/* ---------------------------------------------------------------- Orbit -- */

/**
 * Items evenly spaced on a circle that slowly turns; each item counter-rotates
 * so its text stays upright. Pure CSS animation, paused on hover.
 */
export const Orbit = ({
  items,
  radius = 180,
  duration = 60,
  className,
  children,
}: {
  items: ReactNode[];
  radius?: number;
  duration?: number;
  className?: string;
  children?: ReactNode;
}) => {
  const reduce = useReducedMotion();
  const spin = reduce ? {} : { animation: `ph-spin-slow ${duration}s linear infinite` };
  const counter = reduce ? {} : { animation: `ph-spin-slow ${duration}s linear infinite reverse` };
  return (
    <div className={`ph-orbit relative ${className ?? ''}`} style={{ width: radius * 2, height: radius * 2 }}>
      <div className="absolute inset-0 flex items-center justify-center">{children}</div>
      <div className="absolute inset-0" style={spin}>
        {items.map((it, i) => {
          const a = (i / items.length) * Math.PI * 2 - Math.PI / 2;
          return (
            <div
              key={i}
              className="absolute left-1/2 top-1/2"
              style={{ transform: `translate(-50%, -50%) translate(${Math.cos(a) * radius}px, ${Math.sin(a) * radius}px)` }}
            >
              <div style={counter}>{it}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

/* --------------------------------------------------------------- RiseIn -- */

/**
 * A block that enters as a smaller, rounded card and grows to full width as it
 * reaches the top of the viewport — the next section "arriving" rather than
 * just following.
 */
export const RiseIn = ({
  children,
  className,
  style,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}) => {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'start 25%'] });
  const scale = useTransform(scrollYProgress, [0, 1], [0.9, 1]);
  const radius = useTransform(scrollYProgress, [0, 1], [48, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [40, 0]);
  return (
    <div ref={ref}>
      <motion.div
        className={`overflow-hidden ${className ?? ''}`}
        style={reduce ? style : { ...style, scale, borderRadius: radius, y, transformOrigin: 'top center' }}
      >
        {children}
      </motion.div>
    </div>
  );
};

/* --------------------------------------------------------- ScrollRotate -- */

export const ScrollRotate = ({
  children,
  degrees = 180,
  className,
}: {
  children: ReactNode;
  degrees?: number;
  className?: string;
}) => {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const rotate = useTransform(scrollYProgress, [0, 1], [0, degrees]);
  return (
    <motion.div ref={ref} className={className} style={reduce ? undefined : { rotate }}>
      {children}
    </motion.div>
  );
};

/* ------------------------------------------------------------- WaveSeam -- */

/**
 * A slow travelling wave that sits on a section's top edge, filled with that
 * section's own colour, so the boundary between two bands moves like water
 * instead of being a ruled line. Position it absolutely at `bottom-full` of
 * the section it belongs to. Decorative; CSS-animated; frozen under reduced
 * motion by the global switch in globals.css.
 */
export const WaveSeam = ({ color = '#ffffff', className }: { color?: string; className?: string }) => (
  <div aria-hidden="true" className={`pointer-events-none h-[46px] w-full overflow-hidden sm:h-[64px] ${className ?? ''}`}>
    <div className="ph-wave-x flex h-full w-[200%]">
      {[0, 1].map((k) => (
        <svg key={k} viewBox="0 0 1440 64" preserveAspectRatio="none" className="h-full w-1/2">
          <path d="M0 32 C240 4 480 60 720 32 S1200 60 1440 32 V64 H0 Z" fill={color} />
        </svg>
      ))}
    </div>
  </div>
);

/* ------------------------------------------------------------- RollText -- */

/**
 * Button/link label that rolls up to an identical copy on hover. Needs a
 * `group` class on the interactive parent. The copy is aria-hidden.
 */
export const RollText = ({ children }: { children: ReactNode }) => (
  <span className="ph-roll relative inline-flex overflow-hidden align-top">
    <span className="ph-roll-a block">{children}</span>
    <span aria-hidden="true" className="ph-roll-b absolute left-0 top-full block">
      {children}
    </span>
  </span>
);
