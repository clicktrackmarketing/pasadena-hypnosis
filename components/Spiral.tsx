/**
 * The spiral motif.
 *
 * WHY THIS EXISTS RATHER THAN A CROPPED PIECE OF THE LOGO: the real wordmark
 * contains a spiral forming the O in HYPNOSIS, and assets.ts documents at
 * length how fragile that artwork is to re-keying. Slicing it up for
 * decoration would risk exactly the halo artefact that work was done to avoid.
 * This is a separate, purely geometric mark that rhymes with the logo's spiral
 * without touching the brand asset.
 *
 * It is ALWAYS decorative. Every usage is aria-hidden and none of it carries
 * meaning a text alternative would need to convey, which is also why it is
 * safe to rotate it indefinitely.
 *
 * Deterministic: the points are computed from constants, so server and client
 * render byte-identical markup and React does not report a hydration mismatch.
 */
const spiralPath = (turns: number, steps: number, rInner: number, rOuter: number) => {
  const pts: string[] = [];
  for (let i = 0; i <= steps; i += 1) {
    const t = i / steps;
    const angle = t * turns * Math.PI * 2;
    const r = rInner + (rOuter - rInner) * t;
    const x = 50 + r * Math.cos(angle);
    const y = 50 + r * Math.sin(angle);
    pts.push(`${i === 0 ? 'M' : 'L'}${x.toFixed(2)} ${y.toFixed(2)}`);
  }
  return pts.join(' ');
};

const PATH = spiralPath(3.6, 320, 1.5, 46);

export const Spiral = ({
  className,
  strokeWidth = 0.7,
  opacity = 1,
}: {
  className?: string;
  strokeWidth?: number;
  opacity?: number;
}) => (
  <svg viewBox="0 0 100 100" className={className} aria-hidden="true" focusable="false" style={{ opacity }}>
    <path
      d={PATH}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      vectorEffect="non-scaling-stroke"
    />
  </svg>
);

/** Concentric rings — the same idea at lower visual weight, for grounds. */
export const Rings = ({ className, count = 6 }: { className?: string; count?: number }) => (
  <svg viewBox="0 0 100 100" className={className} aria-hidden="true" focusable="false">
    {Array.from({ length: count }, (_, i) => (
      <circle
        key={i}
        cx="50"
        cy="50"
        r={6 + i * (42 / count)}
        fill="none"
        stroke="currentColor"
        strokeWidth="0.35"
        vectorEffect="non-scaling-stroke"
        opacity={1 - i / (count + 2)}
      />
    ))}
  </svg>
);
