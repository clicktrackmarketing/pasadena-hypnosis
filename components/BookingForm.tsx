'use client';

import { useState } from 'react';
import { NAP } from './content';
import { PhoneIcon, CheckIcon, ArrowRightIcon, ShieldCheckIcon } from './Icons';
import { motion, useReducedMotion, EASE_OUT_SOFT } from './Motion';

/**
 * UI ONLY — wired to nothing. `compliance.collectsSensitiveData` is true in
 * profile.ts (a "what would you like help with" field is regulated health
 * context) and `sensitiveDataEndpoint` is deliberately unset until a
 * BAA/DPA-covered endpoint is chosen. Do NOT wire this to Formspree, a
 * generic webhook, an email relay, or anything "temporary to test the UI."
 * On submit it only shows a static acknowledgment — no network call, no
 * `action`/`onSubmit` fetch of any kind. See profile.ts's file header and the
 * site-build skill's compliance gate.
 *
 * RESTYLED 2026-09-16. Two things in here are compliance surface rather than
 * decoration, and both survived the visual pass intact:
 *
 *   1. THE SUCCESS STATE STILL SAYS THE FORM DOES NOT SEND. It would be very
 *      easy, and very wrong, for a redesign to replace that with a confident
 *      "Thanks, we'll be in touch within 24 hours" — the message a prospect
 *      would then act on by waiting for a call that is never coming. It gives
 *      them the phone number instead.
 *   2. THE FREE-TEXT FIELD STAYS OPTIONAL and is labelled so, with a line
 *      under it saying not to put clinical detail in writing. That field is
 *      the regulated one; encouraging people to fill it before there is a
 *      covered endpoint would be the actual harm.
 */

const field =
  'w-full rounded-[12px] border border-[#D7DEEA] bg-white px-4 py-3 text-[15px] text-[#2E2F3D] transition-colors duration-200 placeholder:text-[#4B5468]/55 hover:border-[#46699F]/60 focus:border-[#46699F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#454659] focus-visible:ring-offset-1';

const label = 'mb-2 block text-[13.5px] font-semibold text-[#2E2F3D]';

export const BookingForm = () => {
  const [submitted, setSubmitted] = useState(false);
  const reduce = useReducedMotion();

  if (submitted) {
    return (
      <motion.div
        initial={reduce ? false : { opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: EASE_OUT_SOFT }}
        className="rounded-[20px] border border-[#D7DEEA] bg-[#E9F3EF] p-8 text-center sm:p-10"
      >
        <span className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-white">
          <CheckIcon className="h-6 w-6 text-[#5DBA47]" />
        </span>
        <p className="mb-3 font-heading text-[1.4rem] text-[#2E2F3D]">Thanks &mdash; one thing first.</p>
        <p className="mx-auto max-w-[46ch] text-[15px] leading-[1.7] text-[#4B5468]">
          This form is a design placeholder and does not send anywhere yet. To actually book a free discovery call
          today, please call{' '}
          <a href={NAP.phoneHref} className="font-semibold text-[#46699F] underline underline-offset-2">
            {NAP.phone}
          </a>
          .
        </p>
        <a
          href={NAP.phoneHref}
          className="mt-7 inline-flex items-center gap-2.5 rounded-[12px] bg-[#454659] px-6 py-3.5 text-[15px] font-semibold text-white transition-colors duration-300 hover:bg-[#33344A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#454659] focus-visible:ring-offset-2"
        >
          <PhoneIcon className="h-4 w-4" />
          Call {NAP.phone}
        </a>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSubmitted(true);
      }}
      className="flex flex-col gap-5 rounded-[20px] border border-[#D7DEEA] bg-white p-6 shadow-[0_26px_60px_-38px_rgba(46,47,61,0.4)] sm:p-8"
    >
      <div>
        <h2 className="font-heading text-[1.5rem] text-[#2E2F3D]">Request a free discovery call</h2>
        <p className="mt-2 text-[14.5px] leading-[1.6] text-[#4B5468]">
          Jason calls you back himself. The discovery call is free.
        </p>
      </div>

      <div>
        <label htmlFor="name" className={label}>
          Name
        </label>
        <input id="name" name="name" type="text" autoComplete="name" required className={field} />
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="phone" className={label}>
            Phone
          </label>
          <input id="phone" name="phone" type="tel" autoComplete="tel" required className={field} />
        </div>
        <div>
          <label htmlFor="email" className={label}>
            Email <span className="font-normal text-[#4B5468]">(optional)</span>
          </label>
          <input id="email" name="email" type="email" autoComplete="email" className={field} />
        </div>
      </div>

      <div>
        <label htmlFor="preferred" className={label}>
          Preferred contact method
        </label>
        <select id="preferred" name="preferred" className={field}>
          <option>Phone call</option>
          <option>Text message</option>
          <option>Email</option>
        </select>
      </div>

      <div>
        <label htmlFor="notes" className={label}>
          What would you like to talk about? <span className="font-normal text-[#4B5468]">(optional)</span>
        </label>
        <textarea id="notes" name="notes" rows={3} className={field} />
        <p className="mt-2 flex items-start gap-2 text-[12.5px] leading-[1.55] text-[#4B5468]">
          <ShieldCheckIcon className="mt-0.5 h-3.5 w-3.5 flex-shrink-0" />
          A sentence is plenty. Detailed medical or psychiatric history is better discussed on the call than typed
          into a web form.
        </p>
      </div>

      <button
        type="submit"
        className="group mt-1 inline-flex items-center justify-center gap-2.5 rounded-[12px] bg-[#454659] px-6 py-4 text-[15px] font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#33344A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#454659] focus-visible:ring-offset-2 sm:text-base"
      >
        Request a Free Discovery Call
        <ArrowRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
      </button>

      <p className="flex items-center justify-center gap-2 text-[13px] text-[#4B5468]">
        <PhoneIcon className="h-3.5 w-3.5 flex-shrink-0" />
        Prefer to talk now?{' '}
        <a href={NAP.phoneHref} className="ph-tap ph-underline font-semibold text-[#46699F]">
          {NAP.phone}
        </a>
      </p>
    </form>
  );
};
