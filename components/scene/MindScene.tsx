'use client';

/* ---------------------------------------------------------------------------
   <MindScene> — the React face of the particle engine.

   LOADING. The engine and the shape library are a separate chunk, imported
   only once the browser is idle, so nothing about the 3D figure competes with
   the hero's H1 for the first paint. The canvas fades in over the first frames
   it draws; until then (and forever, if WebGL is missing or the context is
   lost) the section simply shows its own background — or, on dark grounds,
   the static SVG spiral the site already used as decoration.

   PERFORMANCE CONTRACT:
     - one draw call per frame, no per-frame allocation;
     - the loop only runs while the canvas is within 150px of the viewport and
       the tab is visible;
     - particle count and DPR scale down with the canvas size.

   ACCESSIBILITY. Entirely decorative: aria-hidden, pointer-events none, and it
   never carries information. Under prefers-reduced-motion it renders still
   frames only — no idle drift, no auto-cycling, and scroll-linked sequences
   snap between figures instead of dissolving.

   INPUT. Mouse only. The pointer is read from the PARENT element (the canvas
   itself does not take pointer events, so it can never block a link or text
   selection over it). Touch devices get the auto-cycle instead of hover.
--------------------------------------------------------------------------- */

import { useEffect, useRef, useState } from 'react';
import { useReducedMotion, type MotionValue } from 'motion/react';
import type { ShapeName } from './shapes';
import type { Engine, Tone } from './engine';
import { Spiral } from '../Spiral';

export type { ShapeName };

export type MindSceneProps = {
  shape: ShapeName;
  /** Figures to morph through as `progress` runs 0→1. */
  sequence?: ShapeName[];
  progress?: MotionValue<number>;
  /** Figures to move through on their own (engine-timed; ignored with `sequence`). */
  cycle?: ShapeName[];
  cycleMs?: number;
  /** Figure to morph into while the mouse is over the scene's centre. */
  hoverShape?: ShapeName;
  tone?: Tone;
  className?: string;
  interactive?: boolean;
  density?: number;
  palette?: [string, string, string];
  offset?: [number, number];
  zoom?: number;
  intensity?: number;
  intro?: boolean;
  /** Show the SVG spiral when WebGL is unavailable. Default on dark tone. */
  fallback?: boolean;
};

type Idle = (cb: () => void, o?: { timeout: number }) => number;

export const MindScene = ({
  shape,
  sequence,
  progress,
  cycle,
  cycleMs = 4200,
  hoverShape,
  tone = 'dark',
  className,
  interactive = true,
  density = 1,
  palette,
  offset,
  zoom = 1,
  intensity = 1,
  intro = true,
  fallback,
}: MindSceneProps) => {
  const reduce = useReducedMotion() ?? false;
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const engineRef = useRef<Engine | null>(null);
  const visibleRef = useRef(false);
  const hoverRef = useRef(false);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);

  // Static config read once at boot; shape/sequence changes go through setters.
  const boot = useRef({ shape, palette, offset, zoom, intensity, intro, density, cycle, cycleMs });

  /* Boot ---------------------------------------------------------------- */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    let cancelled = false;
    let io: IntersectionObserver | null = null;
    let ro: ResizeObserver | null = null;
    let engine: Engine | null = null;

    const onVis = () => {
      if (!engine) return;
      if (document.hidden || !visibleRef.current) engine.stop();
      else engine.start();
    };

    const init = () =>
      import('./engine')
        .then(({ createEngine }) => {
          if (cancelled || !canvasRef.current) return;
          const b = boot.current;
          engine = createEngine(canvas, {
            shape: b.shape,
            tone,
            reduce,
            density: b.density,
            palette: b.palette,
            offset: b.offset,
            zoom: b.zoom,
            intensity: b.intensity,
            intro: b.intro,
            cycle: b.cycle,
            cycleHold: b.cycleMs / 1000,
            onLost: () => setFailed(true),
          });
          if (!engine) {
            setFailed(true);
            return;
          }
          engineRef.current = engine;
          io = new IntersectionObserver(
            ([entry]) => {
              visibleRef.current = entry.isIntersecting;
              onVis();
            },
            { rootMargin: '150px 0px' },
          );
          io.observe(canvas);
          ro = new ResizeObserver(() => engine?.resize());
          ro.observe(canvas);
          document.addEventListener('visibilitychange', onVis);
          setReady(true);
        })
        .catch(() => setFailed(true));

    const idle: Idle =
      (window as unknown as { requestIdleCallback?: Idle }).requestIdleCallback ??
      ((cb) => window.setTimeout(cb, 250));
    idle(() => void init(), { timeout: 1400 });

    return () => {
      cancelled = true;
      io?.disconnect();
      ro?.disconnect();
      document.removeEventListener('visibilitychange', onVis);
      engine?.destroy();
      engineRef.current = null;
      setReady(false);
    };
  }, [tone, reduce]);

  /* Shape (when not driven by a sequence or a cycle) --------------------- */
  useEffect(() => {
    if (!ready || sequence || (cycle && cycle.length > 1)) return;
    engineRef.current?.setShape(shape);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shape, ready, sequence]);

  /* Scroll-driven sequence --------------------------------------------- */
  useEffect(() => {
    const engine = engineRef.current;
    if (!ready || !engine || !sequence || !progress) return;
    engine.setSequence(sequence);
    engine.setProgress(progress.get());
    return progress.on('change', (v) => engineRef.current?.setProgress(v));
  }, [ready, sequence, progress]);

  /* Pointer ------------------------------------------------------------- */
  useEffect(() => {
    const host = wrapRef.current?.parentElement;
    const canvas = canvasRef.current;
    if (!ready || reduce || !interactive || !host || !canvas) return;
    const move = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      const r = canvas.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width) * 2 - 1;
      const y = -(((e.clientY - r.top) / r.height) * 2 - 1);
      const inside = Math.abs(x) <= 1 && Math.abs(y) <= 1;
      engineRef.current?.setPointer(x, y, inside);
      if (hoverShape && !sequence) {
        const near = inside && Math.hypot(x, y) < 0.55;
        if (near !== hoverRef.current) {
          hoverRef.current = near;
          engineRef.current?.setHover(near ? hoverShape : null);
        }
      }
    };
    const leave = () => {
      engineRef.current?.setPointer(0, 0, false);
      if (hoverRef.current && hoverShape && !sequence) {
        hoverRef.current = false;
        engineRef.current?.setHover(null);
      }
    };
    host.addEventListener('pointermove', move);
    host.addEventListener('pointerleave', leave);
    return () => {
      host.removeEventListener('pointermove', move);
      host.removeEventListener('pointerleave', leave);
    };
  }, [ready, reduce, interactive, hoverShape, sequence]);

  const showFallback = failed && (fallback ?? tone === 'dark');

  return (
    <div ref={wrapRef} aria-hidden="true" className={`pointer-events-none ${className ?? ''}`}>
      <canvas
        ref={canvasRef}
        className="block h-full w-full transition-opacity duration-[1400ms] ease-out"
        style={{ opacity: ready && !failed ? 1 : 0 }}
      />
      {showFallback ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <Spiral className="h-[80%] w-[80%] text-[#A9C4EE]/25 ph-spin-slow" strokeWidth={0.6} />
        </div>
      ) : null}
    </div>
  );
};
