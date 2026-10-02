import type { Service } from './content';

/* ---------------------------------------------------------------------------
   Price formatting.

   THIS FILE EXISTS BECAUSE OF THE RSC BOUNDARY, not because one function
   deserves its own module. `priceLabel` first lived in ServiceCard.tsx, which
   carries 'use client'. Every export of a client module is a client REFERENCE,
   not a function — so the server-rendered /services/[slug] page calling
   priceLabel(service) threw at request time:

       Attempted to call priceLabel() from the server but priceLabel is on the
       client. It's not possible to invoke a client function from the server.

   Worth noting that `tsc --noEmit` passes on that code. TypeScript has no
   model of the server/client boundary, so a type check will never catch it;
   only rendering the route does. Anything a Server Component needs to CALL has
   to live in a module without 'use client'. Client components import it from
   here perfectly happily — the restriction only runs one way.
--------------------------------------------------------------------------- */

/**
 * SHORT price label, for badges and pills.
 *
 * A null price does NOT fall back to `priceQualifier`. That field is a full
 * sentence on at least one service, and rendering it inside a pill produced a
 * badge wider than the card it sat on. Null means a figure is genuinely
 * unresolved, so the short form says where the number will come from rather
 * than inventing one. (No service is null since markup round one: the client
 * settled smoking cessation at $400.)
 * Use `priceQualifier` directly wherever there is room for the sentence.
 */
export const priceLabel = (s: Service) =>
  s.price === null ? 'On your call' : s.price === 0 ? 'Free' : `$${s.price}`;
