/* ---------------------------------------------------------------------------
   Helpers over CREDENTIALS for /our-team. A plain module (no 'use client') so
   the page's Server Component and the client sections can both call it.

   NOTHING HERE ADDS A FACT. The short labels are cut out of the award wording
   printed on each certificate ("Certified Specialist — Hypnosis and Pain
   Management" -> "Pain Management"); the issuer abbreviations are the ones
   printed on the artwork itself (the AHA seal) and already used in
   PRACTITIONER.credentials ("HMI graduate, with Honors").
--------------------------------------------------------------------------- */

import { CREDENTIALS } from '../../content';

export type Credential = (typeof CREDENTIALS)[number];

/** Sorted by the date PRINTED ON THE DOCUMENT, never by array order. */
export const chronological = (): Credential[] =>
  [...CREDENTIALS].sort((a, b) => {
    if (!a.date || !b.date) return a.date ? -1 : b.date ? 1 : 0; // undated last
    return new Date(a.date).getTime() - new Date(b.date).getTime();
  });

/** Only documents with an issue date printed on them, for the timelines. */
export const dated = (): Credential[] => chronological().filter((c) => c.date);

/** What the paper says about when: "October 8, 2016", or "Valid to March 2017". */
export const dateLabel = (c: Credential) => c.date || (c.validTo ? `Valid to ${c.validTo}` : '');

export const issuerShort = (issuer: string) =>
  issuer === 'Hypnosis Motivation Institute'
    ? 'HMI'
    : issuer === 'American Hypnosis Association'
      ? 'AHA'
      : issuer === 'Hypnotherapists Union Local 472'
        ? 'HU 472' // as printed on the certificate's own badge
        : issuer;

/** "Certified Specialist — Hypnosis and Pain Management" -> "Pain Management";
    "Diploma in Clinical Hypnotherapy, with Honors" -> "Diploma in Clinical Hypnotherapy". */
export const shortAward = (award: string) => {
  const dash = award.split('—');
  if (dash.length > 1) return dash[1].trim().replace(/^Hypnosis and /, '');
  return award.split(',')[0].trim();
};

/** "October 8, 2016" -> { month: "Oct", day: "8", year: "2016" } */
export const splitDate = (d: string) => {
  const parsed = new Date(d);
  if (Number.isNaN(parsed.getTime())) return { month: '', day: '', year: d };
  return {
    month: parsed.toLocaleString('en-US', { month: 'short' }),
    day: String(parsed.getDate()),
    year: String(parsed.getFullYear()),
  };
};
