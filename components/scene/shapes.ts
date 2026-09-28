/* ---------------------------------------------------------------------------
   SHAPE LIBRARY for the particle field.

   Every shape is a pure function of (particle count, seeded random), so the
   same shape always lands every particle in the same place and a morph from
   one shape to another is a straight, repeatable path. Nothing here touches
   the DOM or WebGL; it only returns Float32Array(N * 3) of object-space
   positions, roughly inside a unit sphere.

   The shapes are the site's visual vocabulary, chosen to sit on the right side
   of the line this practice draws: they are ANATOMY and ABSTRACTION, never a
   swinging pocket watch. A stage-hypnosis prop is the one image a clinical
   hypnotherapy practice most needs to avoid.

   Each shape also carries a POSE: how it wants to sit in front of the camera
   and which of the shader's ambient effects it uses (a wave for water, a
   ripple for a voice, a heartbeat for the heart, a breath for the lungs). The
   engine interpolates poses during a morph, so a brain turning into a spiral
   also turns to face the viewer rather than snapping.
--------------------------------------------------------------------------- */

export type ShapeName =
  | 'brain'
  | 'spiral'
  | 'orb'
  | 'wave'
  | 'rings'
  | 'tunnel'
  | 'storm'
  | 'lungs'
  | 'spine'
  | 'knot'
  | 'heart'
  | 'constellation'
  | 'globe'
  | 'terrain'
  | 'lattice'
  | 'ribbon';

export type Pose = {
  yaw: number;
  pitch: number;
  roll: number;
  /** Continuous spin, radians per second, about the object's Y / Z axes. */
  spinY: number;
  spinZ: number;
  /** Amplitude of a slow side-to-side yaw oscillation, radians. */
  sway: number;
  wave: number;
  ripple: number;
  tunnel: number;
  jitter: number;
  pulse: number;
  breath: number;
  scale: number;
};

const BASE: Pose = {
  yaw: 0,
  pitch: 0,
  roll: 0,
  spinY: 0,
  spinZ: 0,
  sway: 0,
  wave: 0,
  ripple: 0,
  tunnel: 0,
  jitter: 0,
  pulse: 0,
  breath: 0,
  scale: 1,
};

export const POSES: Record<ShapeName, Pose> = {
  // Three-quarter side view: the side profile is what makes a brain read as
  // a brain. Face-on it is two ovals.
  brain: { ...BASE, yaw: -1.2, pitch: 0.14, sway: 0.42, breath: 0.4 },
  spiral: { ...BASE, pitch: 0.18, spinZ: -0.42, sway: 0.16, scale: 1.02 },
  orb: { ...BASE, pitch: 0.38, roll: 0.32, spinY: 0.14, breath: 1 },
  wave: { ...BASE, pitch: 0.52, sway: 0.22, wave: 1, scale: 1.08 },
  rings: { ...BASE, pitch: 1.02, spinY: 0.1, ripple: 1, scale: 1.02 },
  tunnel: { ...BASE, tunnel: 1, spinZ: 0.12, scale: 1 },
  storm: { ...BASE, pitch: 0.2, spinY: 0.28, jitter: 1 },
  lungs: { ...BASE, pitch: 0.06, sway: 0.55, breath: 1.4 },
  spine: { ...BASE, yaw: 1.2, pitch: 0.04, sway: 0.55 },
  knot: { ...BASE, pitch: 0.35, spinY: 0.2, spinZ: 0.08 },
  heart: { ...BASE, pitch: 0.05, sway: 0.5, pulse: 1 },
  constellation: { ...BASE, pitch: 0.3, spinY: 0.16 },
  globe: { ...BASE, pitch: 0.38, spinY: 0.2, roll: 0.2 },
  terrain: { ...BASE, pitch: 0.5, sway: 0.3, scale: 1.1 },
  lattice: { ...BASE, yaw: 0.785, pitch: 0.6155, spinY: 0.16 },
  ribbon: { ...BASE, pitch: 0.42, roll: 0.3, spinY: 0.22, sway: 0.2 },
};

/* --------------------------------------------------------------- helpers -- */

type Rnd = () => number;

/** mulberry32 — tiny, seeded, good enough for placing points. */
export const seeded = (seed: number): Rnd => {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
};

const gauss = (R: Rnd) => {
  const u = Math.max(1e-9, R());
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * R());
};

const onSphere = (R: Rnd): [number, number, number] => {
  const z = R() * 2 - 1;
  const a = R() * Math.PI * 2;
  const r = Math.sqrt(1 - z * z);
  return [r * Math.cos(a), r * Math.sin(a), z];
};

const smooth = (e0: number, e1: number, x: number) => {
  const t = Math.min(1, Math.max(0, (x - e0) / (e1 - e0)));
  return t * t * (3 - 2 * t);
};

const put = (o: Float32Array, i: number, x: number, y: number, z: number) => {
  o[i * 3] = x;
  o[i * 3 + 1] = y;
  o[i * 3 + 2] = z;
};

/** Points spread evenly along a list of segments, weighted by length. */
const alongSegments = (
  o: Float32Array,
  start: number,
  count: number,
  segs: Array<[number, number, number, number, number, number, number]>,
  R: Rnd,
) => {
  // seg = [x0,y0,z0,x1,y1,z1,thickness]
  const lens = segs.map((s) => Math.hypot(s[3] - s[0], s[4] - s[1], s[5] - s[2]));
  const total = lens.reduce((a, b) => a + b, 0) || 1;
  let i = start;
  for (let k = 0; k < segs.length && i < start + count; k += 1) {
    const s = segs[k];
    const n = k === segs.length - 1 ? start + count - i : Math.round((lens[k] / total) * count);
    for (let j = 0; j < n && i < start + count; j += 1) {
      const t = R();
      const th = s[6];
      put(
        o,
        i++,
        s[0] + (s[3] - s[0]) * t + gauss(R) * th,
        s[1] + (s[4] - s[1]) * t + gauss(R) * th,
        s[2] + (s[5] - s[2]) * t + gauss(R) * th,
      );
    }
  }
  return i;
};

/** Scale so the farthest point sits at `target`, then centre on the bbox. */
const fit = (o: Float32Array, target = 1.15) => {
  let minX = Infinity, minY = Infinity, minZ = Infinity;
  let maxX = -Infinity, maxY = -Infinity, maxZ = -Infinity;
  for (let i = 0; i < o.length; i += 3) {
    minX = Math.min(minX, o[i]); maxX = Math.max(maxX, o[i]);
    minY = Math.min(minY, o[i + 1]); maxY = Math.max(maxY, o[i + 1]);
    minZ = Math.min(minZ, o[i + 2]); maxZ = Math.max(maxZ, o[i + 2]);
  }
  const cx = (minX + maxX) / 2, cy = (minY + maxY) / 2, cz = (minZ + maxZ) / 2;
  let r = 0;
  for (let i = 0; i < o.length; i += 3) {
    r = Math.max(r, Math.hypot(o[i] - cx, o[i + 1] - cy, o[i + 2] - cz));
  }
  const s = target / (r || 1);
  for (let i = 0; i < o.length; i += 3) {
    o[i] = (o[i] - cx) * s;
    o[i + 1] = (o[i + 1] - cy) * s;
    o[i + 2] = (o[i + 2] - cz) * s;
  }
  return o;
};

/* ---------------------------------------------------------------- shapes -- */

/**
 * THE BRAIN. Procedural, so there is no model file to download or license.
 * Recognisability comes from four things, in order of importance: the side
 * profile (flat underside, hanging temporal lobe), the two landmark grooves
 * (the lateral and central sulci), the cerebellum tucked under the back, and
 * particles that crowd onto the ridges of the folds instead of spreading
 * evenly — which is what draws the gyri without drawing any lines.
 */
const brain = (N: number, R: Rnd) => {
  const o = new Float32Array(N * 3);
  const nCereb = Math.floor(N * 0.76);
  const nCbl = Math.floor(N * 0.11);
  const nStem = Math.floor(N * 0.04);
  let i = 0;
  let guard = 0;
  while (i < nCereb && guard++ < N * 60) {
    const s = R() < 0.5 ? -1 : 1;
    const [ux, uy, uz] = onSphere(R);
    let x = s * 0.3 + ux * 0.5;
    let y = 0.1 + uy * 0.56;
    let z = uz * 0.95;
    if (s * x < 0.035) x = s * (0.035 + R() * 0.012); // longitudinal fissure
    if (y < -0.04) {
      const temporal = Math.exp(-(((z - 0.18) / 0.36) ** 2)) * smooth(0.2, 0.52, Math.abs(x));
      y = -0.04 + (y + 0.04) * (0.45 + 0.55 * temporal) - temporal * 0.1;
    }
    x *= 1 - 0.12 * smooth(0.3, 0.95, z); // frontal lobe narrows
    y += 0.06 * smooth(-0.2, -0.9, z) * smooth(-0.1, 0.5, y); // fuller at the back-top

    const sylvian = Math.abs(y - (-0.02 - 0.3 * z)) < 0.03 && Math.abs(x) > 0.3 && z > -0.3 && z < 0.72;
    const central = Math.abs(z - (0.02 - 0.28 * y)) < 0.026 && y > 0.12;
    if ((sylvian || central) && R() < 0.92) continue;

    const g =
      Math.sin(10.5 * x + 2.2 * Math.sin(6.3 * z + 1.7)) +
      Math.sin(9.1 * y + 2.4 * Math.sin(7.1 * x)) +
      Math.sin(11.2 * z + 2.0 * Math.sin(8.2 * y + 0.6));
    const ridge = 1 - Math.min(1, Math.abs(g) / 1.05);
    if (R() > 0.08 + 0.92 * ridge * ridge * ridge) continue;

    const nx = (x - s * 0.3) / 0.25, ny = (y - 0.1) / 0.31, nz = z / 0.9;
    const nl = Math.hypot(nx, ny, nz) || 1;
    const bump = 0.035 * ridge;
    put(o, i++, x + (nx / nl) * bump, y + (ny / nl) * bump, z + (nz / nl) * bump);
  }
  // Cerebellum: two small lobes under the occipital pole, striped with folia.
  guard = 0;
  while (i < nCereb + nCbl && guard++ < N * 40) {
    const s = R() < 0.5 ? -1 : 1;
    const [ux, uy, uz] = onSphere(R);
    const x = s * 0.22 + ux * 0.27;
    const y = -0.36 + uy * 0.17;
    const z = -0.6 + uz * 0.24;
    if (Math.abs(Math.sin(62 * y + 5 * z)) < 0.4 && R() < 0.85) continue;
    put(o, i++, x, y, z);
  }
  // Brain stem.
  while (i < nCereb + nCbl + nStem) {
    const t = R();
    const a = R() * Math.PI * 2;
    const r = 0.12 - t * 0.035;
    put(o, i++, Math.cos(a) * r, -0.26 - t * 0.66, -0.28 - t * 0.14 + Math.sin(a) * r * 0.8);
  }
  // Interior: faint drifting points that give the shape volume.
  while (i < N) {
    const [ux, uy, uz] = onSphere(R);
    const k = Math.cbrt(R()) * 0.78;
    put(o, i++, ux * 0.72 * k, 0.08 + uy * 0.46 * k, uz * 0.86 * k);
  }
  return fit(o, 1.18);
};

/** Two-armed hypnotic spiral that funnels away from the viewer at its centre. */
const spiral = (N: number, R: Rnd) => {
  const o = new Float32Array(N * 3);
  for (let i = 0; i < N; i += 1) {
    if (R() < 0.1) {
      const r = Math.sqrt(R()) * 1.45;
      const a = R() * Math.PI * 2;
      put(o, i, Math.cos(a) * r, Math.sin(a) * r, -(1.45 - r) * 0.3 + gauss(R) * 0.05);
      continue;
    }
    const arm = i % 2;
    const t = Math.pow(R(), 0.85);
    const r = 0.03 + 1.38 * t;
    const a = t * Math.PI * 2 * 3.1 + arm * Math.PI + gauss(R) * 0.1 * (0.35 + t);
    put(o, i, Math.cos(a) * r, Math.sin(a) * r, -(1 - t) * 0.9 + gauss(R) * 0.025);
  }
  return fit(o, 1.25);
};

/** A calm sphere with a thin equatorial ring. */
const orb = (N: number, R: Rnd) => {
  const o = new Float32Array(N * 3);
  const nS = Math.floor(N * 0.8);
  for (let i = 0; i < nS; i += 1) {
    const y = 1 - (2 * (i + 0.5)) / nS;
    const r = Math.sqrt(1 - y * y);
    const phi = i * 2.399963229728653;
    const k = 0.92 + gauss(R) * 0.012;
    put(o, i, Math.cos(phi) * r * k, y * k, Math.sin(phi) * r * k);
  }
  for (let i = nS; i < N; i += 1) {
    const a = R() * Math.PI * 2;
    const r = 1.38 + gauss(R) * 0.05;
    put(o, i, Math.cos(a) * r, gauss(R) * 0.012, Math.sin(a) * r);
  }
  return o;
};

/** Still water: a gently undulating plane. The shader keeps it moving. */
const wave = (N: number, R: Rnd) => {
  const o = new Float32Array(N * 3);
  const cols = Math.round(Math.sqrt(N * 1.7));
  const rows = Math.ceil(N / cols);
  for (let i = 0; i < N; i += 1) {
    const c = i % cols;
    const r = Math.floor(i / cols);
    const x = -1.8 + (3.6 * c) / (cols - 1) + (R() - 0.5) * 0.01;
    const z = -1.15 + (2.3 * r) / Math.max(1, rows - 1) + (R() - 0.5) * 0.01;
    const y = 0.1 * Math.sin(2 * x + 0.5) * Math.cos(1.6 * z) + 0.05 * Math.sin(3.3 * z - 1.1 * x);
    put(o, i, x, y, z);
  }
  return o;
};

/** Concentric rings on a plane — the shader turns them into outgoing ripples. */
const rings = (N: number, R: Rnd) => {
  const o = new Float32Array(N * 3);
  const count = 10;
  const radii = Array.from({ length: count }, (_, k) => 0.16 + (k / (count - 1)) * 1.42);
  const total = radii.reduce((a, b) => a + b, 0);
  let i = 0;
  radii.forEach((rad, k) => {
    const n = k === count - 1 ? N - i : Math.round((rad / total) * N);
    for (let j = 0; j < n && i < N; j += 1) {
      const a = R() * Math.PI * 2;
      const rr = rad + gauss(R) * 0.012;
      put(o, i++, Math.cos(a) * rr, gauss(R) * 0.01, Math.sin(a) * rr);
    }
  });
  return o;
};

/** A corridor of rings receding from the camera; the shader flies through it. */
const tunnel = (N: number, R: Rnd) => {
  const o = new Float32Array(N * 3);
  for (let i = 0; i < N; i += 1) {
    const ring = Math.floor(R() * 36);
    const z = 1.4 - ring * 0.2 + gauss(R) * 0.008;
    const a = R() * Math.PI * 2;
    const r = 0.95 + gauss(R) * 0.02;
    put(o, i, Math.cos(a) * r, Math.sin(a) * r, z);
  }
  return o;
};

/** Noise: tangled clusters and arcs. The shader adds a restless jitter. */
const storm = (N: number, R: Rnd) => {
  const o = new Float32Array(N * 3);
  const centres = Array.from({ length: 9 }, () => {
    const [x, y, z] = onSphere(R);
    const k = 0.25 + R() * 0.6;
    return [x * k, y * k, z * k];
  });
  for (let i = 0; i < N; i += 1) {
    if (R() < 0.38) {
      const c = centres[Math.floor(R() * centres.length)];
      const rad = 0.25 + R() * 0.6;
      const a = R() * Math.PI * 1.4;
      const [ax, ay] = [R() * Math.PI, R() * Math.PI];
      const px = Math.cos(a) * rad, py = Math.sin(a) * rad;
      const x = px * Math.cos(ay) + c[0];
      const y = py * Math.cos(ax) + c[1];
      const z = px * Math.sin(ay) + py * Math.sin(ax) + c[2];
      put(o, i, x + gauss(R) * 0.02, y + gauss(R) * 0.02, z + gauss(R) * 0.02);
    } else {
      const c = centres[Math.floor(R() * centres.length)];
      put(o, i, c[0] + gauss(R) * 0.24, c[1] + gauss(R) * 0.24, c[2] + gauss(R) * 0.24);
    }
  }
  return fit(o, 1.15);
};

/** Lungs with the bronchial tree inside them. For smoking cessation. */
const lungs = (N: number, R: Rnd) => {
  const o = new Float32Array(N * 3);
  const nLobe = Math.floor(N * 0.7);
  const nTrachea = Math.floor(N * 0.05);
  let i = 0;
  let guard = 0;
  while (i < nLobe && guard++ < N * 30) {
    const s = R() < 0.5 ? -1 : 1;
    const [ux, uy, uz] = onSphere(R);
    const base = (1 - (uy + 1) / 2) ** 0.55; // apex narrow, base broad
    const w = 0.35 + 0.65 * base;
    let x = s * 0.44 + ux * 0.36 * w;
    const y = -0.1 + uy * 0.8;
    const z = uz * 0.34 * (0.6 + 0.4 * w);
    if (s * x < 0.14) x = s * (0.14 + R() * 0.012);
    if (s < 0 && y < 0.05 && y > -0.6 && s * x < 0.3) continue; // cardiac notch
    if (uy < -0.75 && R() < 0.5) continue; // concave base
    put(o, i++, x, y, z);
  }
  while (i < nLobe + nTrachea) {
    const t = R();
    const a = R() * Math.PI * 2;
    const y = 0.5 + t * 0.52;
    if (Math.sin(y * 70) < -0.4) continue;
    put(o, i++, Math.cos(a) * 0.075, y, Math.sin(a) * 0.075);
  }
  const segs: Array<[number, number, number, number, number, number, number]> = [];
  const branch = (x: number, y: number, z: number, dx: number, dy: number, dz: number, len: number, depth: number) => {
    const ex = x + dx * len, ey = y + dy * len, ez = z + dz * len;
    segs.push([x, y, z, ex, ey, ez, 0.006 + depth * 0.004]);
    if (depth === 0) return;
    for (const turn of [-0.42, 0.38]) {
      const c = Math.cos(turn + (R() - 0.5) * 0.3), sn = Math.sin(turn + (R() - 0.5) * 0.3);
      const nx = dx * c - dy * sn, ny = dx * sn + dy * c;
      const nz = dz + (R() - 0.5) * 0.7;
      const l = Math.hypot(nx, ny, nz) || 1;
      branch(ex, ey, ez, nx / l, ny / l, nz / l, len * 0.66, depth - 1);
    }
  };
  branch(0, 0.5, 0, -0.55, -0.83, 0, 0.3, 4);
  branch(0, 0.5, 0, 0.58, -0.81, 0, 0.3, 4);
  i = alongSegments(o, i, N - i, segs, R);
  while (i < N) put(o, i++, 0, 0.5, 0);
  return fit(o, 1.18);
};

/** An S-curved spine seen from the side. For chronic pain. */
const spine = (N: number, R: Rnd) => {
  const o = new Float32Array(N * 3);
  const V = 24;
  let i = 0;
  for (let k = 0; k < V; k += 1) {
    const n = k === V - 1 ? N - i : Math.floor(N / V);
    const f = k / (V - 1);
    const y = -1.25 + 2.5 * f;
    const zc = 0.17 * Math.sin((y + 1.25) * 2.4) - 0.06;
    const sc = 1.15 - 0.45 * f;
    const nBody = Math.floor(n * 0.55);
    for (let j = 0; j < nBody; j += 1) {
      const a = R() * Math.PI * 2;
      const rim = R() < 0.7 ? 1 : Math.sqrt(R());
      put(o, i++, Math.cos(a) * 0.15 * sc * rim, y + (R() - 0.5) * 0.06 * sc, zc + Math.sin(a) * 0.11 * sc * rim);
    }
    i = alongSegments(
      o,
      i,
      n - nBody,
      [
        [0, y, zc - 0.1 * sc, 0, y - 0.06, zc - 0.3 * sc, 0.012],
        [0, y, zc - 0.08 * sc, 0.2 * sc, y, zc - 0.12 * sc, 0.01],
        [0, y, zc - 0.08 * sc, -0.2 * sc, y, zc - 0.12 * sc, 0.01],
      ],
      R,
    );
  }
  while (i < N) put(o, i++, 0, 0, 0);
  return fit(o, 1.2);
};

/** A 2,3 torus knot — the gut-brain axis, abstracted. For IBS. */
const knot = (N: number, R: Rnd) => {
  const o = new Float32Array(N * 3);
  for (let i = 0; i < N; i += 1) {
    const u = R() * Math.PI * 2;
    const rr = 2 + Math.cos(3 * u);
    put(
      o,
      i,
      rr * Math.cos(2 * u) + gauss(R) * 0.09,
      rr * Math.sin(2 * u) + gauss(R) * 0.09,
      -Math.sin(3 * u) + gauss(R) * 0.09,
    );
  }
  return fit(o, 1.2);
};

/** A soft, rounded heart. For grief and loss. */
const heart = (N: number, R: Rnd) => {
  const o = new Float32Array(N * 3);
  for (let i = 0; i < N; i += 1) {
    const t = R() * Math.PI * 2;
    const hx = (16 * Math.sin(t) ** 3) / 17;
    const hy = (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t)) / 17;
    const s = R() < 0.35 ? 1 : Math.sqrt(R());
    const dome = Math.sqrt(Math.max(0, 1 - s * s)) * 0.42;
    const z = (R() < 0.5 ? -1 : 1) * dome;
    put(o, i, hx * s + gauss(R) * 0.008, hy * s + 0.1 + gauss(R) * 0.008, z);
  }
  return fit(o, 1.12);
};

/** Small groups joined by threads. For the group programme and for contact. */
const constellation = (N: number, R: Rnd) => {
  const o = new Float32Array(N * 3);
  const nodes: Array<[number, number, number]> = [[0, 0, 0]];
  for (let k = 0; k < 7; k += 1) {
    const a = (k / 7) * Math.PI * 2;
    nodes.push([Math.cos(a) * 0.95, Math.sin(a * 2) * 0.28, Math.sin(a) * 0.95]);
  }
  const nNodes = Math.floor(N * 0.62);
  let i = 0;
  for (; i < nNodes; i += 1) {
    const c = nodes[i % nodes.length];
    const [ux, uy, uz] = onSphere(R);
    const r = (i % nodes.length === 0 ? 0.26 : 0.17) * (R() < 0.75 ? 1 : Math.cbrt(R()));
    put(o, i, c[0] + ux * r, c[1] + uy * r, c[2] + uz * r);
  }
  const segs: Array<[number, number, number, number, number, number, number]> = [];
  for (let k = 1; k < nodes.length; k += 1) {
    const a = nodes[k], b = nodes[k === nodes.length - 1 ? 1 : k + 1];
    segs.push([...a, ...b, 0.006]);
    segs.push([...a, 0, 0, 0, 0.006]);
  }
  const nLines = Math.floor(N * 0.3);
  i = alongSegments(o, i, nLines, segs, R);
  while (i < N) {
    const [ux, uy, uz] = onSphere(R);
    const k = 1.1 + R() * 0.5;
    put(o, i++, ux * k, uy * k * 0.6, uz * k);
  }
  return fit(o, 1.2);
};

/** Lat/long globe. For online sessions statewide and the service areas. */
const globe = (N: number, R: Rnd) => {
  const o = new Float32Array(N * 3);
  for (let i = 0; i < N; i += 1) {
    const pick = R();
    let lat: number, lon: number;
    if (pick < 0.4) {
      lon = Math.floor(R() * 14) * ((Math.PI * 2) / 14);
      lat = (R() - 0.5) * Math.PI;
    } else if (pick < 0.75) {
      lat = (Math.floor(R() * 9) - 4) * (Math.PI / 10);
      lon = R() * Math.PI * 2;
    } else {
      const [x, y, z] = onSphere(R);
      put(o, i, x * 1.0, y * 1.0, z * 1.0);
      continue;
    }
    const k = 1 + gauss(R) * 0.006;
    put(o, i, Math.cos(lat) * Math.cos(lon) * k, Math.sin(lat) * k, Math.cos(lat) * Math.sin(lon) * k);
  }
  return o;
};

/** Foothills — the San Gabriel range sits behind every city this page names. */
const terrain = (N: number, R: Rnd) => {
  const o = new Float32Array(N * 3);
  const cols = Math.round(Math.sqrt(N * 1.8));
  const rows = Math.ceil(N / cols);
  for (let i = 0; i < N; i += 1) {
    const c = i % cols;
    const r = Math.floor(i / cols);
    const x = -1.8 + (3.6 * c) / (cols - 1) + (R() - 0.5) * 0.012;
    const z = -1.1 + (2.2 * r) / Math.max(1, rows - 1) + (R() - 0.5) * 0.012;
    const ridge = (1 - Math.abs(Math.sin(1.6 * x + 0.9 * Math.sin(1.4 * z)))) ** 2.2;
    const fine = (1 - Math.abs(Math.sin(4.3 * x + 2.1 * z))) ** 3;
    const back = smooth(1.1, -0.9, z);
    const y = (ridge * 0.95 + fine * 0.18) * (0.2 + 0.8 * back) - 0.45;
    put(o, i, x, y, z);
  }
  return o;
};

/** A lattice cube — structure and focus. For testing & academic performance. */
const lattice = (N: number, R: Rnd) => {
  const o = new Float32Array(N * 3);
  const g = [-0.72, -0.36, 0, 0.36, 0.72];
  for (let i = 0; i < N; i += 1) {
    const axis = i % 3;
    const a = g[Math.floor(R() * g.length)];
    const b = g[Math.floor(R() * g.length)];
    const t = R() < 0.12 ? g[Math.floor(R() * g.length)] + gauss(R) * 0.02 : (R() * 2 - 1) * 0.72;
    const j = () => gauss(R) * 0.006;
    if (axis === 0) put(o, i, t, a + j(), b + j());
    else if (axis === 1) put(o, i, a + j(), t, b + j());
    else put(o, i, a + j(), b + j(), t);
  }
  return o;
};

/** A Möbius ribbon — one surface, continuous motion. For sports performance. */
const ribbon = (N: number, R: Rnd) => {
  const o = new Float32Array(N * 3);
  for (let i = 0; i < N; i += 1) {
    const u = R() * Math.PI * 2;
    const v = R() * 2 - 1;
    const edge = R() < 0.3 ? Math.sign(v) : v;
    const w = edge * 0.42;
    put(
      o,
      i,
      (1 + w * Math.cos(u / 2)) * Math.cos(u),
      (1 + w * Math.cos(u / 2)) * Math.sin(u),
      w * Math.sin(u / 2),
    );
  }
  return fit(o, 1.25);
};

const GENERATORS: Record<ShapeName, (N: number, R: Rnd) => Float32Array> = {
  brain,
  spiral,
  orb,
  wave,
  rings,
  tunnel,
  storm,
  lungs,
  spine,
  knot,
  heart,
  constellation,
  globe,
  terrain,
  lattice,
  ribbon,
};

const cache = new Map<string, Float32Array>();

/** Shapes are cached per particle count; generating one costs a few ms. */
export const getShape = (name: ShapeName, N: number): Float32Array => {
  const key = `${name}:${N}`;
  let v = cache.get(key);
  if (!v) {
    v = GENERATORS[name](N, seeded(name.length * 7919 + name.charCodeAt(0) * 104729));
    cache.set(key, v);
  }
  return v;
};
