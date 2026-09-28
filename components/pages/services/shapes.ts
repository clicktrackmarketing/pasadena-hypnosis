/* ---------------------------------------------------------------------------
   Which particle figure opens each service page.

   DELIBERATELY A PLAIN MODULE, NOT 'use client'. /services/[slug]/page.tsx is
   a Server Component and it CALLS serviceScene() while rendering. Every export
   of a client module reaches the server as a client reference rather than a
   function, so putting this map in any of the animated section files beside it
   would throw at request time ("Attempted to call ... from the server") while
   `tsc` stayed perfectly green. See the same note in components/price.ts.

   The figures are anatomy and abstraction, chosen to sit on the right side of
   the line this practice draws (no pocket watches):
     - a brain for depression, lungs for smoking, a spine for pain, a knot for
       the gut, a heart for grief;
     - a storm for anxiety that settles into a calm orb while hovered;
     - formats as forms: a constellation for the group, a globe for online,
       rings (a conversation) for the discovery call, a spiral for the session.
--------------------------------------------------------------------------- */

import type { ShapeName } from '../../scene/shapes';

export type ServiceScene = { scene: ShapeName; hover?: ShapeName };

export const SERVICE_SCENES: Record<string, ServiceScene> = {
  'depression-bipolar-support': { scene: 'brain' },
  'stress-and-anxiety': { scene: 'storm', hover: 'orb' },
  'smoking-cessation': { scene: 'lungs' },
  'chronic-pain': { scene: 'spine' },
  ibs: { scene: 'knot' },
  'grief-and-loss': { scene: 'heart' },
  'group-hypnotherapy-program': { scene: 'constellation' },
  'hypnotherapy-sessions': { scene: 'spiral' },
  'online-hypnotherapy': { scene: 'globe' },
  'discovery-call': { scene: 'rings' },
  'childhood-stress-anxiety': { scene: 'orb' },
  'testing-and-academic-performance': { scene: 'lattice' },
  'sports-performance': { scene: 'ribbon' },
  'past-life-regression': { scene: 'tunnel' },
};

/** Falls back to the spiral so a newly added service still gets a figure. */
export const serviceScene = (slug: string): ServiceScene => SERVICE_SCENES[slug] ?? { scene: 'spiral' };

/** The figures the hub's hero cycles through: a sample of the service pages' own. */
export const HUB_SCENE_CYCLE: ShapeName[] = ['spiral', 'brain', 'lungs', 'spine', 'heart'];
