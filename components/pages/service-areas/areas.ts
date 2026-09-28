/* ---------------------------------------------------------------------------
   Service-area helpers, shared by /service-areas and /service-areas/[slug].

   PLAIN .ts ON PURPOSE — no 'use client'. The route files are Server
   Components and call areaSlug() while building static params and metadata;
   a function exported from a client module cannot be called there.
--------------------------------------------------------------------------- */

import { SERVICE_AREAS } from '../../content';

export const areaSlug = (a: string) => a.split(',')[0].trim().toLowerCase().replace(/\s+/g, '-');
export const areaCity = (a: string) => a.split(',')[0].trim();
export const findArea = (slug: string) => SERVICE_AREAS.find((a) => areaSlug(a) === slug);

/*
 * NATIVE PIXEL SIZE of each photograph a service-area frame can show, read off
 * the files in public/assets/unsplash. The frames on these pages take their
 * shape FROM the picture rather than cropping every picture to one shape:
 * Pasadena's City Hall is a tall 2:3 portrait, Glendale's is a 4:1 panorama,
 * and forcing either into a 16:9 card either beheads the dome or upscales a
 * 297px-tall strip until it goes soft. Unknown files fall back to 3:2.
 */
const DIMS: Record<string, [number, number]> = {
  '/assets/unsplash/area-pasadena.jpg': [1200, 1800],
  '/assets/unsplash/area-glendale.jpg': [1200, 297],
  '/assets/unsplash/area-arcadia.jpg': [1200, 798],
  '/assets/unsplash/area-eagle-rock.jpg': [1200, 801],
  '/assets/unsplash/foothill-range.jpg': [1600, 1067],
  '/assets/unsplash/svc-online-video.jpg': [1100, 619],
};

/** Width / height of a known photograph. */
export const imageRatio = (src: string) => {
  const d = DIMS[src];
  return d ? d[0] / d[1] : 3 / 2;
};
