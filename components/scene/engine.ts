/* ---------------------------------------------------------------------------
   PARTICLE ENGINE — raw WebGL, no three.js.

   Why no library: the whole job is one draw call of a few thousand points
   blended between two position buffers. three.js would add ~150 KB gzipped to
   do that; this file is a few KB and is only fetched (as its own chunk, via a
   dynamic import in MindScene) once the page is idle and the canvas is on
   screen. The hero's H1 never waits for it.

   HOW A MORPH WORKS. Two attribute buffers, A and B, hold two shapes. The
   vertex shader mixes them by uMorph and pushes each particle outward along
   its own random direction by sin(pi * uMorph), so mid-morph the figure
   loosens into a cloud and re-forms rather than sliding in straight lines.
   Interrupting a morph bakes the current blend into A on the CPU and starts
   again towards the new B, so there is never a jump.

   Everything ambient (the wave on water, the ripple on rings, the heartbeat,
   the breath) lives in the shader and is weighted by the pose of the shape on
   screen, so it fades in and out with the morph instead of switching.

   It never runs when it cannot be seen: the host stops it off-screen and on a
   hidden tab, and under reduced motion it draws single still frames only.
--------------------------------------------------------------------------- */

import { getShape, POSES, type Pose, type ShapeName } from './shapes';

export type Tone = 'dark' | 'light';

export type EngineOptions = {
  shape: ShapeName;
  tone: Tone;
  reduce: boolean;
  density?: number;
  palette?: [string, string, string];
  /** Object offset in world units after rotation — lets a figure sit off-centre. */
  offset?: [number, number];
  zoom?: number;
  intensity?: number;
  /** Assemble from a dust cloud on first frame. */
  intro?: boolean;
  /**
   * Figures to move through on their own. Timed in the engine's own clock and
   * only after the previous morph has FINISHED, so a slow device (or a hidden
   * tab resuming) can never stack morphs on top of each other and leave the
   * figure permanently half-formed.
   */
  cycle?: ShapeName[];
  /** Seconds each figure holds before the next, in cycle mode. */
  cycleHold?: number;
  onLost?: () => void;
};

export type Engine = {
  setShape: (name: ShapeName) => void;
  setSequence: (names: ShapeName[]) => void;
  setProgress: (p: number) => void;
  setPointer: (x: number, y: number, active: boolean) => void;
  /** Temporarily morph to a figure (hover); null returns to the cycle / base shape. */
  setHover: (name: ShapeName | null) => void;
  start: () => void;
  stop: () => void;
  resize: () => void;
  destroy: () => void;
};

const VERT = `
precision highp float;
attribute vec3 aA;
attribute vec3 aB;
attribute vec4 aR;
uniform mat3 uRot;
uniform float uTime, uMorph, uScatter, uScale, uPoint, uDpr, uAspect, uCam, uF;
uniform float uWave, uRipple, uTunnel, uJitter, uPulse, uBreath, uAlpha;
uniform vec2 uOffset, uMouse;
uniform float uMouseOn;
uniform vec3 uC1, uC2, uC3;
varying vec3 vCol;
varying float vA;
vec3 h3(float n) {
  return fract(sin(vec3(n, n + 1.7, n + 3.1)) * vec3(43758.5453, 22578.1459, 19642.349)) * 2.0 - 1.0;
}
void main() {
  float t = uTime;
  vec3 p = mix(aA, aB, uMorph);
  vec3 dir = normalize(h3(aR.x * 97.13) + vec3(0.0001));
  p += dir * sin(3.14159265 * uMorph) * uScatter * (0.55 + aR.z);
  p += 0.014 * vec3(
    sin(t * 0.9 + aR.z * 6.283 + p.y * 3.1),
    sin(t * 0.7 + aR.z * 4.1 + p.z * 2.7),
    sin(t * 0.8 + aR.z * 5.3 + p.x * 2.9));
  p += uJitter * 0.05 * vec3(sin(t * 3.1 + aR.x * 50.0), sin(t * 2.7 + aR.x * 70.0), sin(t * 3.5 + aR.x * 30.0));
  p.y += uWave * (0.085 * sin(p.x * 2.6 + t * 0.9) + 0.05 * sin(p.z * 3.4 - t * 1.25));
  float rr = length(p.xz);
  p.y += uRipple * 0.075 * sin(rr * 9.0 - t * 2.1) * smoothstep(1.7, 0.2, rr);
  float tz = mod(p.z + t * 0.55 + 6.0, 7.2) - 5.8;
  float tf = mix(1.0, smoothstep(-5.8, -4.3, tz) * smoothstep(2.0, 0.9, tz), uTunnel);
  p.z = mix(p.z, tz, uTunnel);
  float beat = pow(0.5 + 0.5 * sin(t * 2.3), 14.0);
  p *= 1.0 + uPulse * 0.055 * beat + uBreath * 0.03 * sin(t * 0.9);

  vec3 v = uRot * (p * uScale);
  v.xy += uOffset;
  float dist = uCam - v.z;
  vec2 ndc = vec2(v.x * uF / uAspect, v.y * uF) / dist;
  vec2 dm = (ndc - uMouse) * vec2(uAspect, 1.0);
  float dl = length(dm);
  float push = uMouseOn * smoothstep(0.42, 0.0, dl);
  v.xy += (dm / max(dl, 0.001)) * push * 0.24;
  gl_Position = vec4(v.x * uF / uAspect, v.y * uF, 0.0, dist);

  float spark = step(0.93, aR.w) * pow(max(0.0, sin(t * 1.4 + aR.x * 113.0)), 20.0);
  gl_PointSize = uPoint * uDpr * aR.y * (4.2 / dist) * (1.0 + spark * 1.6 + push * 0.7);
  float fog = smoothstep(uCam + 1.8, uCam - 1.3, dist);
  vec3 col = mix(uC1, uC2, aR.w * aR.w);
  col = mix(col, uC3, step(0.955, aR.w));
  vCol = col;
  vA = uAlpha * (0.3 + 0.7 * fog) * (1.0 + spark * 1.6) * tf;
}`;

const FRAG = `
precision mediump float;
varying vec3 vCol;
varying float vA;
void main() {
  vec2 c = gl_PointCoord - 0.5;
  float d = dot(c, c) * 4.0;
  if (d > 1.0) discard;
  float a = 1.0 - d;
  a *= a * vA;
  gl_FragColor = vec4(vCol * a, a);
}`;

const hex = (h: string): [number, number, number] => {
  const n = parseInt(h.replace('#', ''), 16);
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
};

const PALETTES: Record<Tone, [string, string, string]> = {
  dark: ['#A9C4EE', '#FFFFFF', '#5DBA47'],
  light: ['#46699F', '#2E2F3D', '#5DBA47'],
};

const easeInOut = (x: number) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
const clamp01 = (x: number) => Math.min(1, Math.max(0, x));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const TAU = Math.PI * 2;

const lerpPose = (a: Pose, b: Pose, t: number): Pose => {
  const o = { ...a };
  (Object.keys(a) as Array<keyof Pose>).forEach((k) => {
    o[k] = lerp(a[k], b[k], t);
  });
  return o;
};

/** Rx(pitch) * Ry(yaw) * Rz(roll), column-major for uniformMatrix3fv. */
const rotation = (pitch: number, yaw: number, roll: number) => {
  const cx = Math.cos(pitch), sx = Math.sin(pitch);
  const cy = Math.cos(yaw), sy = Math.sin(yaw);
  const cz = Math.cos(roll), sz = Math.sin(roll);
  // Row-major M = Rx * Ry * Rz
  const m00 = cy * cz, m01 = -cy * sz, m02 = sy;
  const m10 = sx * sy * cz + cx * sz, m11 = -sx * sy * sz + cx * cz, m12 = -sx * cy;
  const m20 = -cx * sy * cz + sx * sz, m21 = cx * sy * sz + sx * cz, m22 = cx * cy;
  return new Float32Array([m00, m10, m20, m01, m11, m21, m02, m12, m22]);
};

export const createEngine = (canvas: HTMLCanvasElement, opts: EngineOptions): Engine | null => {
  const gl = (canvas.getContext('webgl', {
    alpha: true,
    antialias: false,
    depth: false,
    stencil: false,
    premultipliedAlpha: true,
    powerPreference: 'low-power',
  }) || canvas.getContext('experimental-webgl')) as WebGLRenderingContext | null;
  if (!gl) return null;

  const compile = (type: number, src: string) => {
    const s = gl.createShader(type)!;
    gl.shaderSource(s, src);
    gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
      console.warn('[MindScene] shader', gl.getShaderInfoLog(s));
      return null;
    }
    return s;
  };
  const vs = compile(gl.VERTEX_SHADER, VERT);
  const fs = compile(gl.FRAGMENT_SHADER, FRAG);
  if (!vs || !fs) return null;
  const prog = gl.createProgram()!;
  gl.attachShader(prog, vs);
  gl.attachShader(prog, fs);
  gl.linkProgram(prog);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return null;
  gl.useProgram(prog);

  /* Particle count scales with the canvas, not the device name. A phone-sized
     canvas gets well under half the points of a desktop hero. */
  const w0 = canvas.clientWidth || 800;
  const N = Math.round((w0 >= 900 ? 15000 : w0 >= 560 ? 10500 : 6800) * (opts.density ?? 1));

  const bufA = gl.createBuffer()!;
  const bufB = gl.createBuffer()!;
  const bufR = gl.createBuffer()!;
  const locA = gl.getAttribLocation(prog, 'aA');
  const locB = gl.getAttribLocation(prog, 'aB');
  const locR = gl.getAttribLocation(prog, 'aR');

  // Per-particle constants: seed, size, phase, hue.
  const rnd = new Float32Array(N * 4);
  let s = 1234567;
  const r = () => ((s = (s * 16807) % 2147483647) - 1) / 2147483646;
  for (let i = 0; i < N; i += 1) {
    rnd[i * 4] = r();
    rnd[i * 4 + 1] = 0.55 + Math.pow(r(), 2.2) * 1.25;
    rnd[i * 4 + 2] = r();
    rnd[i * 4 + 3] = r();
  }
  gl.bindBuffer(gl.ARRAY_BUFFER, bufR);
  gl.bufferData(gl.ARRAY_BUFFER, rnd, gl.STATIC_DRAW);
  gl.enableVertexAttribArray(locR);
  gl.vertexAttribPointer(locR, 4, gl.FLOAT, false, 0, 0);

  const upload = (buf: WebGLBuffer, data: Float32Array) => {
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, data, gl.DYNAMIC_DRAW);
  };
  gl.bindBuffer(gl.ARRAY_BUFFER, bufA);
  gl.enableVertexAttribArray(locA);
  gl.bindBuffer(gl.ARRAY_BUFFER, bufB);
  gl.enableVertexAttribArray(locB);

  const U = (n: string) => gl.getUniformLocation(prog, n);
  const u = {
    rot: U('uRot'), time: U('uTime'), morph: U('uMorph'), scatter: U('uScatter'), scale: U('uScale'),
    point: U('uPoint'), dpr: U('uDpr'), aspect: U('uAspect'), cam: U('uCam'), f: U('uF'),
    wave: U('uWave'), ripple: U('uRipple'), tunnel: U('uTunnel'), jitter: U('uJitter'),
    pulse: U('uPulse'), breath: U('uBreath'), alpha: U('uAlpha'), offset: U('uOffset'),
    mouse: U('uMouse'), mouseOn: U('uMouseOn'), c1: U('uC1'), c2: U('uC2'), c3: U('uC3'),
  };

  const pal = opts.palette ?? PALETTES[opts.tone];
  gl.uniform3fv(u.c1, hex(pal[0]));
  gl.uniform3fv(u.c2, hex(pal[1]));
  gl.uniform3fv(u.c3, hex(pal[2]));
  gl.uniform1f(u.cam, 4.2);
  gl.uniform1f(u.f, 1 / Math.tan((36 * Math.PI) / 360));
  gl.uniform2fv(u.offset, opts.offset ?? [0, 0]);
  gl.enable(gl.BLEND);
  if (opts.tone === 'dark') gl.blendFunc(gl.ONE, gl.ONE);
  else gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
  const baseAlpha = (opts.tone === 'dark' ? 0.66 : 0.78) * (opts.intensity ?? 1);

  /* ------------------------------------------------------------ state -- */
  let current: ShapeName = opts.shape;
  let aData = getShape(current, N);
  let bData = aData;
  let morph = 1;
  let morphStart = 0;
  let morphDur = 1.7;
  let morphing = false;
  let scatter = 0.34;
  let poseA: Pose = POSES[current];
  let poseB: Pose = POSES[current];
  let sequence: ShapeName[] | null = null;
  let seqSeg = -1;
  let t = 0;
  let last = 0;
  let raf = 0;
  let running = false;
  let destroyed = false;
  let base: ShapeName = opts.shape;
  let hover: ShapeName | null = null;
  const cycle = opts.cycle && opts.cycle.length > 1 ? opts.cycle : null;
  let cycleIdx = cycle ? Math.max(0, cycle.indexOf(opts.shape)) : 0;
  let held = 0;
  let spinY = 0;
  let spinZ = 0;
  const ptr = { x: 0, y: 0, on: 0, tx: 0, ty: 0, ton: 0 };
  let aspect = 1;
  let fitScale = 1;

  if (opts.intro && !opts.reduce) {
    const dust = new Float32Array(N * 3);
    for (let i = 0; i < N; i += 1) {
      const zz = r() * 2 - 1;
      const a = r() * TAU;
      const rr = 1.6 + r() * 1.8;
      const q = Math.sqrt(1 - zz * zz);
      dust[i * 3] = Math.cos(a) * q * rr;
      dust[i * 3 + 1] = Math.sin(a) * q * rr;
      dust[i * 3 + 2] = zz * rr;
    }
    aData = dust;
    morph = 0;
    morphing = true;
    morphDur = 2.4;
    scatter = 0.12;
  }
  upload(bufA, aData);
  upload(bufB, bData);

  const bindAttribs = () => {
    gl.bindBuffer(gl.ARRAY_BUFFER, bufA);
    gl.vertexAttribPointer(locA, 3, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ARRAY_BUFFER, bufB);
    gl.vertexAttribPointer(locB, 3, gl.FLOAT, false, 0, 0);
  };

  /** Bake the on-screen blend into A so a new morph starts where we are. */
  const bake = () => {
    if (morph >= 1) return bData;
    if (morph <= 0) return aData;
    const e = easeInOut(morph);
    const out = new Float32Array(N * 3);
    for (let i = 0; i < out.length; i += 1) out[i] = aData[i] + (bData[i] - aData[i]) * e;
    return out;
  };

  const resize = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
    const w = Math.max(1, Math.round(canvas.clientWidth * dpr));
    const h = Math.max(1, Math.round(canvas.clientHeight * dpr));
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w;
      canvas.height = h;
    }
    gl.viewport(0, 0, w, h);
    aspect = w / h;
    // A portrait canvas would crop the figure's sides; shrink it to fit.
    fitScale = aspect < 1 ? Math.max(0.58, aspect * 0.98) : 1;
    gl.uniform1f(u.aspect, aspect);
    gl.uniform1f(u.dpr, dpr);
    gl.uniform1f(u.point, w < 700 * dpr ? 2.3 : 2.1);
    if (!running) draw(0);
  };

  const draw = (dt: number) => {
    if (destroyed) return;
    // Morph clock (time-driven mode only; sequence mode sets morph directly).
    if (morphing && !sequence) {
      morph = clamp01((t - morphStart) / morphDur);
      if (morph >= 1) morphing = false;
    }
    // Cycle mode: advance only once the last morph has landed and held.
    if (cycle && !sequence && !hover && !morphing && !opts.reduce) {
      held += dt;
      if (held >= (opts.cycleHold ?? 4.2)) {
        held = 0;
        cycleIdx = (cycleIdx + 1) % cycle.length;
        base = cycle[cycleIdx];
        setShape(base);
      }
    }

    const e = easeInOut(morph);
    const pose = lerpPose(poseA, poseB, e);

    // Spin accumulates; a shape that does not spin unwinds to the nearest
    // full turn so it settles in its own pose rather than wherever it was.
    spinY += dt * pose.spinY;
    spinZ += dt * pose.spinZ;
    if (Math.abs(pose.spinY) < 0.01) spinY += (Math.round(spinY / TAU) * TAU - spinY) * Math.min(1, dt * 1.6);
    if (Math.abs(pose.spinZ) < 0.01) spinZ += (Math.round(spinZ / TAU) * TAU - spinZ) * Math.min(1, dt * 1.6);

    const k = Math.min(1, dt * 3.2);
    ptr.x += (ptr.tx - ptr.x) * k;
    ptr.y += (ptr.ty - ptr.y) * k;
    ptr.on += (ptr.ton - ptr.on) * Math.min(1, dt * 4);

    const yaw = pose.yaw + Math.sin(t * 0.23) * pose.sway + spinY + ptr.x * 0.42 * ptr.on;
    const pitch = pose.pitch + Math.sin(t * 0.17) * 0.04 - ptr.y * 0.26 * ptr.on;
    gl.uniformMatrix3fv(u.rot, false, rotation(pitch, yaw, pose.roll + spinZ));
    gl.uniform1f(u.time, t);
    gl.uniform1f(u.morph, e);
    gl.uniform1f(u.scatter, scatter);
    gl.uniform1f(u.scale, pose.scale * fitScale * (opts.zoom ?? 1));
    gl.uniform1f(u.wave, pose.wave);
    gl.uniform1f(u.ripple, pose.ripple);
    gl.uniform1f(u.tunnel, pose.tunnel);
    gl.uniform1f(u.jitter, pose.jitter);
    gl.uniform1f(u.pulse, pose.pulse);
    gl.uniform1f(u.breath, pose.breath);
    gl.uniform1f(u.alpha, baseAlpha);
    gl.uniform2f(u.mouse, ptr.x, ptr.y);
    gl.uniform1f(u.mouseOn, ptr.on);

    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    bindAttribs();
    gl.drawArrays(gl.POINTS, 0, N);
  };

  const frame = (now: number) => {
    if (!running) return;
    // Capped so a long stall (tab switch, GC pause) cannot teleport a morph,
    // but loose enough that a low frame rate still keeps real time.
    const dt = last ? Math.min(0.1, (now - last) / 1000) : 0.016;
    last = now;
    t += dt;
    draw(dt);
    raf = requestAnimationFrame(frame);
  };

  const start = () => {
    if (running || destroyed || opts.reduce) {
      if (opts.reduce) draw(0);
      return;
    }
    running = true;
    last = 0;
    raf = requestAnimationFrame(frame);
  };
  const stop = () => {
    running = false;
    cancelAnimationFrame(raf);
  };

  const setShape = (name: ShapeName) => {
    if (name === current && !sequence) return;
    sequence = null;
    seqSeg = -1;
    const from = bake();
    const fromPose = lerpPose(poseA, poseB, easeInOut(morph));
    current = name;
    aData = from;
    bData = getShape(name, N);
    upload(bufA, aData);
    upload(bufB, bData);
    poseA = fromPose;
    poseB = POSES[name];
    if (opts.reduce) {
      morph = 1;
      morphing = false;
      draw(0);
      return;
    }
    morph = 0;
    morphStart = t;
    morphDur = 1.7;
    scatter = 0.34;
    morphing = true;
  };

  const setSequence = (names: ShapeName[]) => {
    sequence = names.length > 1 ? names : null;
    seqSeg = -1;
    morphing = false;
    scatter = 0.26;
  };

  const setProgress = (p: number) => {
    if (!sequence) return;
    const n = sequence.length - 1;
    const x = clamp01(p) * n;
    const seg = Math.min(n - 1, Math.floor(x));
    let local = x - seg;
    // Hold each figure at the ends of its segment so it is legible before it
    // starts to dissolve into the next one.
    local = clamp01((local - 0.18) / 0.64);
    if (opts.reduce) local = local < 0.5 ? 0 : 1;
    if (seg !== seqSeg) {
      seqSeg = seg;
      aData = getShape(sequence[seg], N);
      bData = getShape(sequence[seg + 1], N);
      upload(bufA, aData);
      upload(bufB, bData);
      poseA = POSES[sequence[seg]];
      poseB = POSES[sequence[seg + 1]];
    }
    current = local >= 0.5 ? sequence[seg + 1] : sequence[seg];
        morph = local;
    if (!running) draw(0);
  };

  const setPointer = (x: number, y: number, active: boolean) => {
    ptr.tx = x;
    ptr.ty = y;
    ptr.ton = active ? 1 : 0;
  };

  const setHover = (name: ShapeName | null) => {
    hover = name;
    held = 0;
    setShape(name ?? base);
  };

  const onLost = (ev: Event) => {
    ev.preventDefault();
    stop();
    opts.onLost?.();
  };
  canvas.addEventListener('webglcontextlost', onLost);

  resize();

  return {
    setShape: (name: ShapeName) => {
      base = name;
      if (!hover) setShape(name);
    },
    setSequence,
    setProgress,
    setPointer,
    setHover,
    start,
    stop,
    resize,
    destroy: () => {
      destroyed = true;
      stop();
      canvas.removeEventListener('webglcontextlost', onLost);
      gl.deleteBuffer(bufA);
      gl.deleteBuffer(bufB);
      gl.deleteBuffer(bufR);
      gl.deleteProgram(prog);
    },
  };
};
