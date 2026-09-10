'use client';

/* ---------------------------------------------------------------------------
   Pasadena Hypnosis — image assets.

   Every entry below is a REAL client asset, harvested 2026-09-09 from the live
   site's own media library. static.wixstatic.com returns CloudFront 403 to this
   environment directly; the images.weserv.nl proxy fetches server-side from its
   own infrastructure and re-serves, which is how these were retrieved.

   Each is embedded as a base64 data URI rather than a URL. MagicPath extracts
   data URIs on submit and rehosts them at an unsigned, non-expiring
   storage.googleapis.com path. A signed CDN URL would 401 roughly 30 minutes
   after issue while the rasterised preview kept looking correct — a clean
   preview proves nothing about a live link.

   PORTRAIT and OFFICE_INTERIOR came from a different source: the practice's
   own Google Business Profile, read through the Places API. That is outside
   the Wix domain entirely, which is why they resolve where the 37-image
   static.wixstatic.com sweep did not. Both were uploaded by the business's own
   GBP account. Neither carries a name field in any API response, so neither is
   captioned with a claim the source cannot support — see the notes on each.

   The generated AMBIENT_ROOM interim image that stood in for the office is
   retired as of this revision; a real photograph replaces it.
--------------------------------------------------------------------------- */

/* The practice's real wordmark, on a BLACK plate. FINAL — this ground has been
   round-tripped white -> black -> white -> black; black is the settled answer,
   chosen on the look of it with the numbers agreeing. Brand colours untouched:
   PASADENA is #0E75BB and HYPNOSIS is #5DBA47, sampled as the modal colour of
   the interior ink pixels rather than averaged with the antialiased edges.

     ground        blue      green     spiral
     #000000       4.24:1    8.58:1    12.33:1
     #FFFFFF       4.91:1    2.45:1     1.70:1
     #E6EFFF       4.24:1    2.12:1     1.47:1   (the live site's header tint)
     #2E2F3D       2.69:1    5.40:1     7.75:1   (the footer navy)

   White is the only ground that favours the blue, and it costs the green 6.13
   points. Black gives up 0.67 on the blue to buy that back, and it is the only
   ground where all three inks clear 4:1. Still no recolouring of the artwork:
   that is a brand decision and this concept does not make it.

   THE KEYING MATTERS MORE THAN THE PLATE, and it is where revisions 1-5 went
   wrong. Sitting on black requires the white ground to be transparent, and the
   naive white-to-alpha conversion (alpha = 1 minus min(rgb)/255) reads a PALE
   INK as "mostly background". The spiral forming the O in HYPNOSIS is exactly
   that: its darkest pixel is #D8C4A1, a cream. Naive keying turns it into a
   saturated brown at 37 percent alpha, which composites on black to #372300 and
   vanishes — destroying the one ink black is best for.

   So the alpha ramp carries a ceiling: coverage is divided by K=0.30 and
   clamped, which makes anything at or below #D8C4A1 fully opaque at its ORIGINAL
   colour, and leaves only true antialiasing partially transparent. Those partial
   pixels are unpremultiplied against white so the soft edge composites correctly
   onto any ground. Resampling to 940px is done PREMULTIPLIED and then undone, so
   transparent pixels cannot bleed a pale halo into the ink — the artefact that
   makes keyed logos look outlined on dark grounds.

   Measured off the rendered page against #000000: blue #0C76BE, green #5DBA47 —
   the inks survive the round trip unchanged — and the spiral reads far better
   here than it ever did on white.

   IF THE PLATE EVER GOES BACK TO WHITE, this asset must go with it. The keyed
   artwork is correct on any ground, but the un-keyed white-ground version (rev
   448446183850012672) is the smaller file and the better choice for that case.

   Cropped tight to the ink from the 1200x1553 original, lossless PNG. Rehosted
   under revision 448449783124860928 and referenced by URL rather than
   re-embedded — these paths are unsigned and do not expire, so pointing at the
   existing one is a clean reuse, not a stale link. */
export const LOGO_W = 940;
export const LOGO_H = 292;
export const LOGO = '/assets/ff2e93841bed4b4d850a45f41c4e464367617fda3ad45f43c022f354278f2485.png';

/* Hypnosis Motivation Institute, Tarzana CA. 'Diploma in Clinical
   Hypnotherapy with Honors', Jason Meissner, dated October 8 2016. Read off
   the document itself: the asset manifest recorded 2018, and the diploma says
   2016. The document wins. */
export const DIPLOMA_HMI_W = 1000;
export const DIPLOMA_HMI_H = 750;
export const DIPLOMA_HMI = '/assets/497f5cb6507faf1745101eef9a4613de13e982c13cbe66b7d184487d117d45f6.jpg';

/* AHA Certified Specialist, Hypnosis and Pain Management. March 8 2016, cert #140250. */
export const CERT_PAIN_W = 800;
export const CERT_PAIN_H = 618;
export const CERT_PAIN = '/assets/0bde6b8152fac3924cbcb240e71ff461761f6adc34cb192ea251df0cb6f8703e.jpg';

/* AHA Certified Specialist, Hypnosis and Smoking Cessation. April 21 2016, cert #140251. */
export const CERT_SMOKING_W = 800;
export const CERT_SMOKING_H = 618;
export const CERT_SMOKING = '/assets/a99998d6d25ac1500f17de3021d8481364ead1c7b80804d0420a34aebb0b1e78.jpg';

/* AHA Certified Specialist, Hypnosis and Sports Performance. April 19 2016, cert #140533. */
export const CERT_SPORTS_W = 800;
export const CERT_SPORTS_H = 618;
export const CERT_SPORTS = '/assets/c050cf9789361c2e0c84185a8d02e41c56230e12a5abae75ab2f7a0751a67141.jpg';

/* AHA Certified Specialist, Hypnosis and ADD-ADHD. April 14 2016, cert #140534.
   This specialty appears in no intake note or Call 1 transcript — the
   certificate is the only record of it. */
export const CERT_ADHD_W = 800;
export const CERT_ADHD_H = 618;
export const CERT_ADHD = '/assets/5cc7a6676ab2175cfcdb1973ad6a8c07909d346ed2b4e66aa68e1a379497860e.jpg';

/* Real 5-star Google review screenshots. The reviewer names are already
   greyed out in the client's own crops, so these cannot become Review schema
   (which requires an author) and are presented as what they are: screenshots.
   No name is invented for any of them. */
export const REVIEW_IBS_W = 900;
export const REVIEW_IBS_H = 631;
export const REVIEW_IBS = '/assets/5bdd6d9eed9d46d4421f159d8efc6eeac0e12a7e0d44e4fa1b4b0d25d6be2b7a.jpg';

export const REVIEW_SMOKING_30YR_W = 900;
export const REVIEW_SMOKING_30YR_H = 536;
export const REVIEW_SMOKING_30YR = '/assets/64696cd97912c0f6d8234b4678a2da477f95803a804e9d387c48995930cbbcde.jpg';

export const REVIEW_SMOKING_13YR_W = 900;
export const REVIEW_SMOKING_13YR_H = 690;
export const REVIEW_SMOKING_13YR = '/assets/7357906a94db1b5d9c5840817656381a90f484cfd5a6c8aa0dc38f7b6b5e3646.jpg';

export const REVIEW_CONFIDENCE_W = 900;
export const REVIEW_CONFIDENCE_H = 517;
export const REVIEW_CONFIDENCE = '/assets/1eb2596f57740b002423118d711b48709f67c505b8ceceaae95f417994556bb9.jpg';

export const REVIEW_GROWTH_W = 900;
export const REVIEW_GROWTH_H = 611;
export const REVIEW_GROWTH = '/assets/16a8dbfd1e505caecc565d7be0232017f6fee64a7e11c3aedb46e84752cb2b00.jpg';

export const REVIEW_RELATIONSHIP_W = 900;
export const REVIEW_RELATIONSHIP_H = 533;
export const REVIEW_RELATIONSHIP = '/assets/d769110794eaa4a58cab12e5a85b3c3cc8572ea1904786c1494d176d2c59dc32.jpg';

/* Practitioner portrait. Real photograph, from the Pasadena Hypnosis LLC
   Google Business Profile via the Places API (photo attribution: the business
   itself). Retrieved 2026-09-09.

   PROVENANCE LIMIT, and it decides the caption: the GBP photo endpoint returns
   no subject name on any field. That the business's own listing account posted
   a professional headshot makes Jason Meissner overwhelmingly the likely
   subject, but 'likely' is not 'stated', so the page never asserts it in
   words. The image sits in the practitioner slot beside a card that names him
   — an editorial placement the source supports — and carries no
   'verified' or 'pictured above' language. Worth one sentence of confirmation
   from Jason before launch.

   Cropped to 4:5 from the 985x1115 original, centred on the face, so the frame
   needs no object-fit crop and nothing is lost to a container mismatch. */
export const PORTRAIT_W = 880;
export const PORTRAIT_H = 1100;
export const PORTRAIT_ALT =
  'Headshot of a bearded man in dark-rimmed glasses and a navy patterned button-down shirt, photographed outdoors against green foliage.';
export const PORTRAIT = '/assets/d9aa12f2dd313baad58d388e2ad7df23f8bf2a3b5f43b901ba1de09e90ae64c6.jpg';

/* Office interior. Real photograph, same source and same retrieval date as
   PORTRAIT, and the same provenance limit: the Places API names no location
   for it. It is the practice's own uploaded photo, so it is presented as the
   practice's room — but the alt text and caption describe what is in the
   frame rather than asserting a street address, and the suite number remains
   unconfirmed elsewhere on the page. Native portrait ratio kept; cropping this
   one to a banner would cut either the shelf or the couch, which are the two
   things that make it read as a real consulting room. */
export const OFFICE_INTERIOR_W = 760;
export const OFFICE_INTERIOR_H = 1131;
export const OFFICE_INTERIOR_ALT =
  'A consulting room corner: a deep blue-grey tufted sofa with a cream cushion, a black arc floor lamp, and a wooden shelf holding plants, a framed print and a brass clock against a white wall.';
export const OFFICE_INTERIOR = '/assets/df9995eabaad5a0b5f2b3e68b9a810f4e883467077a2e98c1f8555392d2773ca.jpg';
