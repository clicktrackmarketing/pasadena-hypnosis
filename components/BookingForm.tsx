'use client';

import { useState } from 'react';
import { NAP } from './content';
import { PhoneIcon } from './Icons';

/**
 * UI ONLY — wired to nothing. `compliance.collectsSensitiveData` is true in
 * profile.ts (a "what would you like help with" field is regulated health
 * context) and `sensitiveDataEndpoint` is deliberately unset until a
 * BAA/DPA-covered endpoint is chosen. Do NOT wire this to Formspree, a
 * generic webhook, an email relay, or anything "temporary to test the UI."
 * On submit it only shows a static acknowledgment — no network call, no
 * `action`/`onSubmit` fetch of any kind. See profile.ts's file header and
 * the site-build skill's compliance gate.
 */
export const BookingForm = () => {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="rounded-[14px] border border-[#D7DEEA] bg-[#E9F3EF] p-8 text-center">
        <p className="font-heading text-xl text-[#2E2F3D] mb-2">Thanks — we'll be in touch.</p>
        <p className="text-sm text-[#4B5468] leading-relaxed">
          This form is a design placeholder and does not send anywhere yet. To actually book a free discovery
          call today, please call <a href={`tel:${NAP.phone.replace(/[^\d+]/g, '')}`} className="font-medium text-[#46699F] hover:underline">{NAP.phone}</a>.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSubmitted(true);
      }}
      className="rounded-[14px] border border-[#D7DEEA] bg-white p-6 sm:p-8 flex flex-col gap-5"
    >
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-[#2E2F3D] mb-1.5">Name</label>
        <input id="name" name="name" type="text" required className="w-full rounded-[10px] border border-[#454659] px-3.5 py-2.5 text-sm text-[#2E2F3D] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#454659]" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-[#2E2F3D] mb-1.5">Phone</label>
          <input id="phone" name="phone" type="tel" required className="w-full rounded-[10px] border border-[#454659] px-3.5 py-2.5 text-sm text-[#2E2F3D] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#454659]" />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-[#2E2F3D] mb-1.5">Email</label>
          <input id="email" name="email" type="email" className="w-full rounded-[10px] border border-[#454659] px-3.5 py-2.5 text-sm text-[#2E2F3D] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#454659]" />
        </div>
      </div>
      <div>
        <label htmlFor="preferred" className="block text-sm font-medium text-[#2E2F3D] mb-1.5">Preferred contact method</label>
        <select id="preferred" name="preferred" className="w-full rounded-[10px] border border-[#454659] px-3.5 py-2.5 text-sm text-[#2E2F3D] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#454659]">
          <option>Phone call</option>
          <option>Text message</option>
          <option>Email</option>
        </select>
      </div>
      <div>
        <label htmlFor="notes" className="block text-sm font-medium text-[#2E2F3D] mb-1.5">What would you like to talk about? (optional)</label>
        <textarea id="notes" name="notes" rows={3} className="w-full rounded-[10px] border border-[#454659] px-3.5 py-2.5 text-sm text-[#2E2F3D] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#454659]" />
      </div>
      <button
        type="submit"
        className="rounded-[10px] bg-[#454659] text-white px-6 py-3.5 text-sm sm:text-base font-medium hover:bg-[#33344A] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#454659] focus-visible:ring-offset-2"
      >
        Request a Free Discovery Call
      </button>
      <p className="flex items-center gap-2 text-xs text-[#4B5468]">
        <PhoneIcon className="h-3.5 w-3.5 flex-shrink-0" />
        Prefer to talk now? Call {NAP.phone}.
      </p>
    </form>
  );
};
