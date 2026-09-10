/**
 * Hand-rolled inline icon set — no external icon package dependency.
 * Stroke-based, currentColor, 24x24 viewBox unless noted. Reused verbatim
 * from the dedicated-dental-src reference build.
 */
import type { SVGProps } from 'react';
const base = (props: SVGProps<SVGSVGElement>) => ({
  width: 20,
  height: 20,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.75,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  ...props
});
export const PhoneIcon = (props: SVGProps<SVGSVGElement>) => <svg {...base(props)}>
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92Z" />
  </svg>;
export const MenuIcon = (props: SVGProps<SVGSVGElement>) => <svg {...base(props)}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </svg>;
export const CloseIcon = (props: SVGProps<SVGSVGElement>) => <svg {...base(props)}>
    <path d="M18 6 6 18M6 6l12 12" />
  </svg>;
export const ChevronDownIcon = (props: SVGProps<SVGSVGElement>) => <svg {...base(props)}>
    <path d="m6 9 6 6 6-6" />
  </svg>;
export const ArrowRightIcon = (props: SVGProps<SVGSVGElement>) => <svg {...base(props)}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>;
export const CheckIcon = (props: SVGProps<SVGSVGElement>) => <svg {...base(props)}>
    <path d="M20 6 9 17l-5-5" />
  </svg>;
export const ShieldCheckIcon = (props: SVGProps<SVGSVGElement>) => <svg {...base(props)}>
    <path d="M12 3 4 6v6c0 5 3.5 7.8 8 9 4.5-1.2 8-4 8-9V6l-8-3Z" />
    <path d="m9 12 2 2 4-4" />
  </svg>;
export const MapPinIcon = (props: SVGProps<SVGSVGElement>) => <svg {...base(props)}>
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>;
export const ClockIcon = (props: SVGProps<SVGSVGElement>) => <svg {...base(props)}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 3" />
  </svg>;
export const MailIcon = (props: SVGProps<SVGSVGElement>) => <svg {...base(props)}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3 7 9 6 9-6" />
  </svg>;
export const QuoteIcon = (props: SVGProps<SVGSVGElement>) => <svg {...base(props)} strokeWidth={1.4}>
    <path d="M7 7c-2.2 1.2-3.5 3.2-3.5 5.9 0 2.4 1.6 4.1 3.7 4.1 1.8 0 3.2-1.3 3.2-3 0-1.6-1.1-2.8-2.6-2.9.2-1.6 1.4-3 3-3.7L7 7Zm10 0c-2.2 1.2-3.5 3.2-3.5 5.9 0 2.4 1.6 4.1 3.7 4.1 1.8 0 3.2-1.3 3.2-3 0-1.6-1.1-2.8-2.6-2.9.2-1.6 1.4-3 3-3.7L17 7Z" fill="currentColor" stroke="none" />
  </svg>;
export const StarIcon = (props: SVGProps<SVGSVGElement>) => <svg {...base(props)} fill="currentColor" stroke="none">
    <path d="M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6-5.9-3.3-5.9 3.3 1.3-6.6-4.9-4.6 6.6-.8L12 2.5Z" />
  </svg>;
export const BrainIcon = (props: SVGProps<SVGSVGElement>) => <svg {...base(props)}>
    <path d="M9.5 3.5a2.5 2.5 0 0 0-2.45 2 2.5 2.5 0 0 0-1.55 4 2.6 2.6 0 0 0-.5 1.5 2.5 2.5 0 0 0 1.5 2.29V15a3.5 3.5 0 0 0 3.5 3.5" />
    <path d="M14.5 3.5a2.5 2.5 0 0 1 2.45 2 2.5 2.5 0 0 1 1.55 4 2.6 2.6 0 0 1 .5 1.5 2.5 2.5 0 0 1-1.5 2.29V15a3.5 3.5 0 0 1-3.5 3.5" />
    <path d="M9.5 3.5v15M14.5 3.5v15" />
  </svg>;
