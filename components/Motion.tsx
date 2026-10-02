'use client';

/* ---------------------------------------------------------------------------
   Motion primitives — the whole animation vocabulary for this site in one
   place, so a section file never reaches for a raw <motion.div> and invents
   its own easing.

   TWO RULES HOLD EVERYWHERE IN THIS FILE.

   1. REDUCED MOTION IS HONOURED, NOT APPROXIMATED. Every primitive calls
      useReducedMotion() and, when it is set, renders the FINAL state
      immediately with no transition — not a shortened one. This matters more
      than usual here: vestibular disorders and migraine sit squarely inside
      this practice's own client base (chronic pain, disabling anxiety), and a
      parallax hero is a genuinely hostile thing to serve someone who has
      switched the preference on. The breathing orb is the one exception and it
      is handled explicitly in its own component.

   2. NOTHING ANIMATES THAT WOULD HIDE CONTENT IF JS NEVER RUNS. Reveal and
      friends start at opacity 0 via motion's `initial`, which motion applies
      on the client. If the bundle fails, React still renders the markup and
      the section is readable — no CSS class leaves text permanently invisible.

   Easing: a single custom cubic-bezier, EASE_OUT_SOFT, for everything that
   enters. Consistency of easing is most of what separates "animated" from
   "designed".
--------------------------------------------------------------------------- */

import {
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from 'motion/react';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import { responsive } from './responsive';

/** Slow out, no overshoot. The house easing curve. */
export const EASE_OUT_SOFT = [0.16, 1, 0.3, 1] as const;

type Dir = 'up' | 'down' | 'left' | 'right' | 'none';

const offsetFor = (dir: Dir, distance: number) => {
  switch (dir) {
    case 'up':
      return { y: distance };
    case 'down':
      return { y: -distance };
    case 'left':
      return { x: distance };
    case 'right':
      return { x: -distance };
    default:
      return {};
  }
};

/**
 * The workhorse. Fades and rises into place once, when scrolled to.
 * `once` is deliberately the default — content that re-animates every time it
 * re-enters the viewport is a novelty on the first scroll and an irritation on
 * the second.
 */
export const Reveal = ({
  children,
  delay = 0,
  duration = 0.6,
  dir = 'up',
  distance = 26,
  className,
  as = 'div',
}: {
  children: ReactNode;
  delay?: number;
  duration?: number;
  dir?: Dir;
  distance?: number;
  className?: string;
  as?: 'div' | 'section' | 'li' | 'span' | 'p';
}) => {
  const reduce = useReducedMotion();
  const Tag = motion[as];
  if (reduce) {
    const Plain = as as 'div';
    return <Plain className={className}>{children}</Plain>;
  }
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, ...offsetFor(dir, distance) }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '0px 0px 5% 0px' }}
      transition={{ duration, delay, ease: EASE_OUT_SOFT }}
    >
      {children}
    </Tag>
  );
};

/**
 * Parent for a run of StaggerItems. The children inherit their timing from
 * here rather than each carrying a hand-counted delay, which is what stops a
 * six-card grid drifting out of rhythm when someone reorders it.
 */
export const Stagger = ({
  children,
  className,
  gap = 0.09,
  delay = 0,
  as = 'div',
}: {
  children: ReactNode;
  className?: string;
  gap?: number;
  delay?: number;
  as?: 'div' | 'ul' | 'ol' | 'dl';
}) => {
  const reduce = useReducedMotion();
  const Tag = motion[as];
  if (reduce) {
    const Plain = as as 'div';
    return <Plain className={className}>{children}</Plain>;
  }
  return (
    <Tag
      className={className}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, margin: '0px 0px 5% 0px' }}
      variants={{ shown: { transition: { staggerChildren: gap, delayChildren: delay } } }}
    >
      {children}
    </Tag>
  );
};

export const StaggerItem = ({
  children,
  className,
  distance = 24,
  as = 'div',
}: {
  children: ReactNode;
  className?: string;
  distance?: number;
  as?: 'div' | 'li' | 'span';
}) => {
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
        hidden: { opacity: 0, y: distance },
        shown: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE_OUT_SOFT } },
      }}
    >
      {children}
    </Tag>
  );
};

/**
 * Display headings that assemble word by word with a blur lift.
 *
 * SPLIT ON WORDS, NEVER ON CHARACTERS. Per-letter animation is the standard
 * showreel move and it wrecks screen readers and text selection. Each word
 * here is a real word in the DOM, separated by real spaces, and the whole
 * heading is exposed to assistive tech as a single string via aria-label with
 * the animated spans marked aria-hidden.
 */
export const SplitHeading = ({
  text,
  className,
  delay = 0,
  stagger = 0.045,
  duration = 0.7,
  as: Tag = 'h2',
}: {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  duration?: number;
  as?: 'h1' | 'h2' | 'h3' | 'p';
}) => {
  const reduce = useReducedMotion();
  const words = text.split(' ');

  if (reduce) return <Tag className={className}>{text}</Tag>;

  return (
    <Tag className={className} aria-label={text}>
      <motion.span
        aria-hidden="true"
        initial="hidden"
        whileInView="shown"
        viewport={{ once: true, margin: '0px 0px 5% 0px' }}
        variants={{ shown: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
        style={{ display: 'inline' }}
      >
        {words.map((w, i) => (
          <motion.span
            key={`${w}-${i}`}
            style={{ display: 'inline-block', willChange: 'transform, filter, opacity' }}
            variants={{
              hidden: { opacity: 0, y: '0.42em', filter: 'blur(7px)' },
              shown: {
                opacity: 1,
                y: '0em',
                filter: 'blur(0px)',
                transition: { duration, ease: EASE_OUT_SOFT },
              },
            }}
          >
            {w}
            {i < words.length - 1 ? ' ' : ''}
          </motion.span>
        ))}
      </motion.span>
    </Tag>
  );
};

/**
 * Scroll-linked vertical drift. `speed` is how far the element travels across
 * its full pass through the viewport, in pixels; negative moves against the
 * scroll. Springed so a fast flick does not snap.
 */
export const Parallax = ({
  children,
  speed = 60,
  className,
}: {
  children: ReactNode;
  speed?: number;
  className?: string;
}) => {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const raw = useTransform(scrollYProgress, [0, 1], [speed, -speed]);
  const y = useSpring(raw, { stiffness: 90, damping: 24, mass: 0.35 });

  if (reduce) return <div className={className}>{children}</div>;
  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y, willChange: 'transform' }}>{children}</motion.div>
    </div>
  );
};

/**
 * Image that eases from slightly over-scaled to true size as it scrolls in —
 * the frame stays put, the picture settles inside it. Pair with
 * overflow-hidden on the parent.
 */
export const ScaleInImage = ({
  src,
  alt,
  className,
  imgClassName,
}: {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
}) => {
  const reduce = useReducedMotion();
  if (reduce) {
    return (
      <div className={className}>
        <img src={src} alt={alt} className={imgClassName} loading="lazy" />
      </div>
    );
  }
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '0px 0px 5% 0px' }}
      transition={{ duration: 0.65, ease: EASE_OUT_SOFT }}
    >
      <motion.img
        src={src}
        alt={alt}
        loading="lazy"
        className={imgClassName}
        initial={{ scale: 1.16 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, margin: '0px 0px 5% 0px' }}
        transition={{ duration: 0.65, ease: EASE_OUT_SOFT }}
      />
    </motion.div>
  );
};

/**
 * Pointer-tracked 3D tilt for cards. Springed hard enough to feel like an
 * object and not a jelly, and the tilt is small (max ~6deg) because a card
 * carrying body copy has to stay readable while it moves.
 *
 * Touch devices never fire pointermove without a press, so this degrades to a
 * plain card there, which is the correct outcome.
 */
export const TiltCard = ({
  children,
  className,
  max = 6,
}: {
  children: ReactNode;
  className?: string;
  max?: number;
}) => {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement | null>(null);
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const rx = useSpring(useTransform(py, [-0.5, 0.5], [max, -max]), { stiffness: 260, damping: 26 });
  const ry = useSpring(useTransform(px, [-0.5, 0.5], [-max, max]), { stiffness: 260, damping: 26 });

  if (reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 900, transformStyle: 'preserve-3d' }}
      onPointerMove={(e) => {
        if (e.pointerType !== 'mouse') return;
        const r = ref.current?.getBoundingClientRect();
        if (!r) return;
        px.set((e.clientX - r.left) / r.width - 0.5);
        py.set((e.clientY - r.top) / r.height - 0.5);
      }}
      onPointerLeave={() => {
        px.set(0);
        py.set(0);
      }}
    >
      {children}
    </motion.div>
  );
};

/**
 * A button that leans toward the cursor as it approaches. Capped at 6px so the
 * hit area never meaningfully leaves the place the eye saw it — a magnetic
 * button that runs away from the pointer is a well-known way to make a CTA
 * harder to click, which is the opposite of the point.
 */
export const Magnetic = ({ children, className }: { children: ReactNode; className?: string }) => {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement | null>(null);
  const x = useSpring(useMotionValue(0), { stiffness: 220, damping: 18 });
  const y = useSpring(useMotionValue(0), { stiffness: 220, damping: 18 });

  if (reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ x, y, display: 'inline-block' }}
      onPointerMove={(e) => {
        if (e.pointerType !== 'mouse') return;
        const r = ref.current?.getBoundingClientRect();
        if (!r) return;
        const dx = e.clientX - (r.left + r.width / 2);
        const dy = e.clientY - (r.top + r.height / 2);
        x.set(Math.max(-6, Math.min(6, dx * 0.18)));
        y.set(Math.max(-6, Math.min(6, dy * 0.18)));
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
};

/**
 * Counts up to a number when it scrolls into view.
 *
 * The output is rendered inside a span carrying the FINAL value as aria-label
 * and the ticking digits as aria-hidden, so a screen reader announces "5.0"
 * once rather than narrating a slot machine.
 */
export const Counter = ({
  to,
  decimals = 0,
  suffix = '',
  prefix = '',
  duration = 1.5,
  className,
}: {
  to: number;
  decimals?: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
}) => {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLSpanElement | null>(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px 5% 0px' });
  const [n, setN] = useState(0);
  const final = `${prefix}${to.toFixed(decimals)}${suffix}`;

  useEffect(() => {
    if (!inView || reduce) return;
    let raf = 0;
    const started = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - started) / (duration * 1000));
      // Same curve as EASE_OUT_SOFT, close enough by eye and cheap per frame.
      setN(to * (1 - Math.pow(1 - t, 3)));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduce, to, duration]);

  // The final value is real text in an sr-only span (aria-label on a plain
  // span is ignored by several screen readers); the ticking digits are
  // aria-hidden so they are never narrated.
  return (
    <span ref={ref} className={className}>
      <span className="sr-only">{final}</span>
      <span aria-hidden="true">
        {reduce ? final : `${prefix}${n.toFixed(decimals)}${suffix}`}
      </span>
    </span>
  );
};

/**
 * Edge-to-edge infinite ticker. Duplicates its children once and translates
 * the pair by exactly -50%, which is what makes the loop seamless without
 * measuring anything. Pauses on hover and on focus-within so a keyboard user
 * can actually reach a link inside it.
 *
 * aria-hidden on the duplicate, so the content is not announced twice.
 */
export const Marquee = ({
  children,
  speed = 38,
  className,
  reverse = false,
}: {
  children: ReactNode;
  speed?: number;
  className?: string;
  reverse?: boolean;
}) => {
  const reduce = useReducedMotion();
  if (reduce) {
    return <div className={`overflow-x-auto ${className ?? ''}`}>{children}</div>;
  }
  return (
    <div className={`group relative overflow-hidden ${className ?? ''}`}>
      <div
        className="flex w-max ph-marquee group-hover:[animation-play-state:paused] focus-within:[animation-play-state:paused]"
        style={{ animationDuration: `${speed}s`, animationDirection: reverse ? 'reverse' : 'normal' }}
      >
        <div className="flex shrink-0">{children}</div>
        <div className="flex shrink-0" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
};

/** Thin progress bar pinned to the top of the viewport. Sits in the layout. */
export const ScrollProgress = () => {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 28, restDelta: 0.001 });
  if (reduce) return null;
  return (
    <motion.div
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 z-[60] h-[3px] origin-left bg-gradient-to-r from-[#46699F] via-[#5DBA47] to-[#F09D8B]"
      style={{ scaleX }}
    />
  );
};

/**
 * Exposes a section's own scroll progress to children that need to draw with
 * it. Typed to HTMLElement rather than HTMLDivElement because every caller
 * attaches it to a <section>.
 */
export const useSectionProgress = (): [
  React.RefObject<HTMLElement | null>,
  MotionValue<number>,
] => {
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 75%', 'end 55%'] });
  return [ref, scrollYProgress];
};

/* ===========================================================================
   SECOND WAVE — added 2026-09-17 when the homepage was rebuilt richer.
   Same two rules as everything above: reduced motion renders the final state,
   and nothing here hides content if the bundle never loads.
   =========================================================================== */

/**
 * Image that wipes in behind a travelling clip-path rather than fading.
 *
 * The wipe is the reason this exists instead of another <Reveal>: a fade
 * reads as "the page is still loading", a wipe reads as "this was placed".
 * `from` picks the edge it uncovers from.
 */
export const ClipReveal = ({
  src,
  alt,
  className,
  imgClassName,
  from = 'bottom',
  delay = 0,
}: {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  from?: 'bottom' | 'left' | 'right' | 'top';
  delay?: number;
}) => {
  const reduce = useReducedMotion();
  const hidden =
    from === 'bottom'
      ? 'inset(100% 0% 0% 0%)'
      : from === 'top'
        ? 'inset(0% 0% 100% 0%)'
        : from === 'left'
          ? 'inset(0% 100% 0% 0%)'
          : 'inset(0% 0% 0% 100%)';

  if (reduce) {
    return (
      <div className={className}>
        <img src={src} alt={alt} loading="lazy" className={imgClassName} {...responsive(src, 'half')} />
      </div>
    );
  }
  return (
    <motion.div
      className={className}
      initial={{ clipPath: hidden }}
      whileInView={{ clipPath: 'inset(0% 0% 0% 0%)' }}
      viewport={{ once: true, margin: '0px 0px 5% 0px' }}
      transition={{ duration: 0.65, delay, ease: EASE_OUT_SOFT }}
    >
      {/* The inner image counter-scales so the picture does not appear to
          stretch out of the mask as the mask opens. */}
      <motion.img
        src={src}
        alt={alt}
        loading="lazy"
        className={imgClassName}
        {...responsive(src, 'half')}
        initial={{ scale: 1.22 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, margin: '0px 0px 5% 0px' }}
        transition={{ duration: 0.65, delay, ease: EASE_OUT_SOFT }}
      />
    </motion.div>
  );
};

/**
 * Body copy that assembles line by line from behind a mask.
 *
 * Takes an ARRAY OF LINES rather than a string, because splitting a paragraph
 * into visual lines requires measuring it, and a measured split reflows into
 * nonsense at a different width. The caller decides the break points, which
 * means they are stable at every breakpoint.
 *
 * Accessibility: the wrapper carries the joined text as aria-label and the
 * animated lines are aria-hidden, so it is announced as one paragraph.
 */
export const LineReveal = ({
  lines,
  className,
  lineClassName,
  delay = 0,
}: {
  lines: string[];
  className?: string;
  lineClassName?: string;
  delay?: number;
}) => {
  const reduce = useReducedMotion();
  if (reduce) {
    return <p className={className}>{lines.join(' ')}</p>;
  }
  return (
    <motion.p
      className={className}
      aria-label={lines.join(' ')}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, margin: '0px 0px 5% 0px' }}
      variants={{ shown: { transition: { staggerChildren: 0.075, delayChildren: delay } } }}
    >
      {lines.map((l, i) => (
        <span key={i} aria-hidden="true" className="block overflow-hidden">
          <motion.span
            className={`block ${lineClassName ?? ''}`}
            variants={{
              hidden: { y: '110%' },
              shown: { y: '0%', transition: { duration: 0.6, ease: EASE_OUT_SOFT } },
            }}
          >
            {l}
          </motion.span>
        </span>
      ))}
    </motion.p>
  );
};

/**
 * A soft radial light that follows the pointer inside a dark section.
 *
 * Purely atmospheric, absolutely positioned, pointer-events-none. It only
 * tracks a MOUSE — on touch there is no pointer to follow and the blob would
 * sit wherever the last tap landed, which looks like a rendering bug.
 */
export const CursorGlow = ({ color = 'rgba(169,196,238,0.16)' }: { color?: string }) => {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement | null>(null);
  const x = useSpring(useMotionValue(-500), { stiffness: 120, damping: 30, mass: 0.6 });
  const y = useSpring(useMotionValue(-500), { stiffness: 120, damping: 30, mass: 0.6 });
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (reduce) return;
    const el = ref.current?.parentElement;
    if (!el) return;
    const move = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      const r = el.getBoundingClientRect();
      x.set(e.clientX - r.left);
      y.set(e.clientY - r.top);
      setActive(true);
    };
    const leave = () => setActive(false);
    el.addEventListener('pointermove', move);
    el.addEventListener('pointerleave', leave);
    return () => {
      el.removeEventListener('pointermove', move);
      el.removeEventListener('pointerleave', leave);
    };
  }, [reduce, x, y]);

  if (reduce) return null;
  return (
    <div ref={ref} aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute h-[34rem] w-[34rem] rounded-full blur-[110px] transition-opacity duration-700"
        style={{
          x,
          y,
          translateX: '-50%',
          translateY: '-50%',
          background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
          opacity: active ? 1 : 0,
        }}
      />
    </div>
  );
};

/** Endless gentle bob, for decorative marks. Amplitude in px. */
export const FloatY = ({
  children,
  amount = 10,
  duration = 6,
  className,
}: {
  children: ReactNode;
  amount?: number;
  duration?: number;
  className?: string;
}) => {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      animate={{ y: [0, -amount, 0] }}
      transition={{ duration, repeat: Infinity, ease: 'easeInOut' }}
    >
      {children}
    </motion.div>
  );
};

/**
 * Wraps the hero so it recedes as the page scrolls past it — scales down
 * slightly, fades, and lifts. Gives the next section the feeling of sliding
 * over the top of it rather than simply following it.
 */
export const ScrollAway = ({ children, className }: { children: ReactNode; className?: string }) => {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.93]);
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 90]);

  if (reduce) return <div className={className}>{children}</div>;
  return (
    <div ref={ref} className={className}>
      <motion.div style={{ scale, opacity, y, transformOrigin: 'top center', willChange: 'transform, opacity' }}>
        {children}
      </motion.div>
    </div>
  );
};

/**
 * PINNED HORIZONTAL SCROLL.
 *
 * The section becomes tall, sticks its inner panel to the viewport, and
 * translates that panel sideways in step with the vertical scroll. The showy
 * version of a carousel, and the one that goes wrong most often, so:
 *
 *   - The track's travel is MEASURED from the real scrollWidth on mount and on
 *     resize, not guessed from card count. A hard-coded distance leaves either
 *     dead space at the end or cards that never come into view when the copy
 *     changes length.
 *   - Section height is derived from that same measurement, so the pin lasts
 *     exactly as long as the sideways travel and not a pixel more. Mismatched,
 *     it either stalls on an empty panel or jumps at the seam.
 *   - BELOW `lg` AND UNDER REDUCED MOTION IT IS NOT PINNED AT ALL. It renders
 *     as an ordinary horizontally-scrollable rail. Hijacking vertical scroll on
 *     a phone is how this pattern earns its bad reputation, and a visitor who
 *     asked for less motion should not be dragged sideways by the page.
 */
export const PinnedRail = ({
  children,
  className,
  trackClassName,
  pace = 0.62,
  header,
}: {
  children: ReactNode;
  className?: string;
  trackClassName?: string;
  /**
   * Pinned WITH the track (2026-09-28). Without it the pinned viewport held
   * only a half-height row of cards, leaving a band of empty screen above
   * and below; the section heading belongs in that space.
   */
  header?: ReactNode;
  /**
   * How much vertical scroll buys the sideways travel. 1 means one pixel down
   * per pixel across; below 1 the rail moves faster than the wheel.
   *
   * THIS IS A COMFORT DIAL, NOT A STYLE ONE. At 1, fourteen cards pin the page
   * for roughly 4,100px — five or six wheel-flicks during which nothing else
   * on the page can happen, which is the exact thing people hate about pinned
   * sections. 0.62 covers the same cards in about 2,500px.
   */
  pace?: number;
}) => {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [travel, setTravel] = useState(0);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (reduce) return;
    const measure = () => {
      /*
       * WIDTH IS NOT ENOUGH — the pointer matters too. A landscape tablet
       * reports 1024px+ and would pin, and converting a touch swipe into
       * sideways travel is the single most complained-about version of this
       * pattern: the page stops responding to the gesture the user made.
       * Coarse pointers get the plain swipeable rail regardless of width.
       */
      const wide =
        window.matchMedia('(min-width: 1024px)').matches &&
        !window.matchMedia('(pointer: coarse)').matches;
      setEnabled(wide);
      const el = trackRef.current;
      if (!el || !wide) {
        setTravel(0);
        return;
      }
      setTravel(Math.max(0, el.scrollWidth - window.innerWidth + 96));
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [reduce]);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] });
  const rawX = useTransform(scrollYProgress, [0, 1], [0, -travel]);
  const x = useSpring(rawX, { stiffness: 120, damping: 30, mass: 0.4 });

  const pinned = enabled && travel > 0 && !reduce;

  return (
    <div
      ref={sectionRef}
      className={className}
      style={pinned ? { height: `calc(100vh + ${Math.round(travel * pace)}px)` } : undefined}
    >
      {/* Unpinned (reduced motion) at lg+, the header's own lg:mb-0 assumes
          the pinned layout's gap-10; this restores that gap so the cards do
          not sit on the heading. */}
      {!pinned && header ? <div className="lg:mb-10">{header}</div> : null}
      <div className={pinned ? 'sticky top-0 flex h-screen flex-col justify-center gap-10 overflow-hidden' : 'overflow-x-auto'}>
        {pinned && header ? header : null}
        {pinned ? (
          <motion.div ref={trackRef} style={{ x }} className={trackClassName}>
            {children}
          </motion.div>
        ) : (
          <div ref={trackRef} className={trackClassName}>
            {children}
          </div>
        )}
      </div>
    </div>
  );
};

/** Thin bar that fills with a section's own scroll progress. Decorative. */
export const SectionProgressBar = ({ progress, className }: { progress: MotionValue<number>; className?: string }) => {
  const reduce = useReducedMotion();
  const scaleX = useSpring(progress, { stiffness: 140, damping: 30 });
  return (
    <div aria-hidden="true" className={`h-px w-full bg-current/15 ${className ?? ''}`}>
      <motion.div className="h-full w-full origin-left bg-current" style={reduce ? { scaleX: 1 } : { scaleX }} />
    </div>
  );
};

export { motion, useReducedMotion, useScroll, useTransform, useSpring, useInView, useMotionValue };
