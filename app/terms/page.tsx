import type { Metadata } from 'next';
import Link from 'next/link';
import { pageMeta } from '../../components/seo';
import { LegalDocument, type LegalSection } from '../../components/LegalDocument';
import { NAP } from '../../components/content';

export const metadata: Metadata = pageMeta({
  title: 'Terms of Service',
  description: 'Terms for using the Pasadena Hypnosis website and booking sessions.',
  path: '/terms',
});

/* Written 2026-10-20 from the CTM terms template, cut down to what applies to
   a one-practitioner hypnotherapy practice that books through Wix. Booking,
   cancellation and refund rules are NOT invented here: they are whatever Wix
   shows at checkout. Governing-law wording names the county, not the state:
   the client's rule bans that word site-wide (markup #7/#33/#85, enforced by
   scripts/audit-markups.mjs). Signed off by Click Track Marketing (Bilal) 2026-10-23. */
const EFFECTIVE = 'October 20, 2026';

const SECTIONS: LegalSection[] = [
  {
    id: 'agreement',
    title: 'Agreement',
    body: (
      <p>
        These terms apply to your use of pasadenahypnosis.com (the &ldquo;Site&rdquo;), run by {NAP.name}
        (&ldquo;Pasadena Hypnosis,&rdquo; &ldquo;we,&rdquo; &ldquo;us&rdquo;). By using the Site you agree to them and
        to our <Link href="/privacy">Privacy Policy</Link>. If you do not agree, please do not use the Site.
      </p>
    ),
  },
  {
    id: 'not-medical-care',
    title: 'Hypnotherapy is not medical care',
    body: (
      <>
        <p>
          Jason Meissner is a certified hypnotherapist. Hypnotherapy is not a substitute for medical or psychiatric
          care, and nothing on the Site is medical, psychological or psychiatric advice. Keep seeing your doctor,
          therapist or psychiatrist, and do not stop or change any medication without talking to them.
        </p>
        <p>
          People respond to hypnotherapy differently, so we cannot promise a particular result. If you are in crisis,
          call or text 988 (Suicide &amp; Crisis Lifeline) or 911.
        </p>
      </>
    ),
  },
  {
    id: 'booking',
    title: 'Booking, payment and cancellations',
    body: (
      <>
        <p>
          Sessions are booked and paid for through our Wix Bookings calendar. The price, and the cancellation and
          rescheduling terms, shown when you book are the ones that apply to that booking. Prices on the Site are
          current when published and may change; the price at checkout is the one you pay.
        </p>
        <p>
          Sessions for anyone under 18 must be booked by a parent or guardian, who agrees to these terms for them.
        </p>
      </>
    ),
  },
  {
    id: 'using-the-site',
    title: 'Using the Site',
    body: (
      <>
        <p>Please use the Site lawfully. Do not:</p>
        <ul>
          <li>try to get unauthorized access to the Site or the systems behind it;</li>
          <li>copy the Site&rsquo;s content in bulk with automated tools;</li>
          <li>book under a false identity or give false information when booking.</li>
        </ul>
      </>
    ),
  },
  {
    id: 'content',
    title: 'Our content',
    body: (
      <p>
        The text, design, logo and Jason&rsquo;s own photographs and documents on the Site belong to Pasadena Hypnosis
        or are used under license from their owners. You are welcome to read, print and share pages for personal use.
        Please ask before using our content for anything commercial.
      </p>
    ),
  },
  {
    id: 'other-services',
    title: 'Other websites and services',
    body: (
      <p>
        The Site links to and embeds other services, including Wix (booking and payment) and Google Maps. Those
        services have their own terms and privacy policies, and we are not responsible for their content or how they
        operate.
      </p>
    ),
  },
  {
    id: 'liability',
    title: 'Disclaimers and limits of liability',
    body: (
      <>
        <p>
          The Site is provided &ldquo;as is.&rdquo; We work to keep it accurate and available, but we do not promise
          that it will always be error-free or online.
        </p>
        <p>
          As far as the law allows, Pasadena Hypnosis is not liable for indirect or consequential losses arising from
          your use of the Site, and our total liability for any claim about the Site itself is limited to one hundred
          U.S. dollars ($100). Nothing in these terms limits liability that cannot be limited by law.
        </p>
      </>
    ),
  },
  {
    id: 'law',
    title: 'Governing law',
    body: (
      <p>
        These terms are governed by the laws that apply where our office is located, in Los Angeles County, without
        regard to conflict-of-law rules. Any dispute about them or the Site will be handled by the state or federal
        courts in Los Angeles County.
      </p>
    ),
  },
  {
    id: 'changes',
    title: 'Changes to these terms',
    body: (
      <p>
        We may update these terms. The effective date at the top shows the latest version, and continuing to use the
        Site after a change means you accept it.
      </p>
    ),
  },
  {
    id: 'contact',
    title: 'Contact',
    body: (
      <p>
        <strong>{NAP.name}</strong>
        <br />
        {NAP.street}, {NAP.city}, {NAP.state} {NAP.zip}
        <br />
        Phone: <a href={NAP.phoneHref}>{NAP.phone}</a>
        <br />
        Email: <a href={`mailto:${NAP.email}`}>{NAP.email}</a>
      </p>
    ),
  },
];

export default function TermsPage() {
  return (
    <LegalDocument
      title="Terms of Service"
      intro="The terms for using this website and booking sessions with Pasadena Hypnosis."
      effective={EFFECTIVE}
      sections={SECTIONS}
    />
  );
}
