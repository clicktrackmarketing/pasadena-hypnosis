/* ---------------------------------------------------------------------------
   Above-the-fold heading words, animated by CSS (app/globals.css,
   .ph-hero-rise / .ph-hero-mask). Launch audit 2026-10-20.

   Why not SplitHeading here: its framer-motion spans are server-rendered at
   opacity 0 and only reveal after hydration, which held back the page's
   largest text (LCP). These start animating on first paint, with or without
   JavaScript, and stop under prefers-reduced-motion.

   Each word is real text. The space between words sits OUTSIDE the
   inline-block span, so the DOM, crawlers and screen readers read normal
   spaced words, and nothing needs aria-label or aria-hidden.
--------------------------------------------------------------------------- */

export const HeroWords = ({
  text,
  variant = 'rise',
  delay = 0,
  stagger = 0.036,
  duration,
}: {
  text: string;
  variant?: 'rise' | 'mask';
  delay?: number;
  stagger?: number;
  duration?: number;
}) => {
  const words = text.split(' ');
  return (
    <>
      {words.map((w, i) => {
        const style = {
          animationDelay: `${(delay + i * stagger).toFixed(3)}s`,
          ...(duration ? { animationDuration: `${duration}s` } : {}),
        };
        const word =
          variant === 'mask' ? (
            <span className="inline-block overflow-hidden pb-[0.12em] align-top">
              <span className="ph-hero-mask" style={style}>
                {w}
              </span>
            </span>
          ) : (
            <span className="ph-hero-rise" style={style}>
              {w}
            </span>
          );
        return (
          <span key={`${w}-${i}`}>
            {word}
            {i < words.length - 1 ? ' ' : ''}
          </span>
        );
      })}
    </>
  );
};
