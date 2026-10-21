import type { Metadata } from 'next';
import Link from 'next/link';
import { pageMeta } from '../../components/seo';
import { LegalDocument, type LegalSection } from '../../components/LegalDocument';
import { NAP } from '../../components/content';

// Target keywords (profile.ts targetKeywords['/privacy']): "pasadena hypnosis
// privacy policy". Navigational/legal only.
export const metadata: Metadata = pageMeta({
  title: 'Privacy Policy',
  description: 'How Pasadena Hypnosis collects, uses and protects your information, including bookings made through Wix.',
  path: '/privacy',
});

/* Written 2026-10-20 to match the site as built (see LegalDocument.tsx):
   no site forms, no site cookies or analytics, Wix Bookings for booking and
   payment, Google Maps embed on /contact, Vercel hosting. No consent or
   opt-out mechanism is promised because none exists yet. Keep it that way:
   add a promise only in the same change that ships the mechanism. To be
   reviewed by Jason's counsel. */
const EFFECTIVE = 'October 20, 2026';

const contactBlock = (
  <p>
    <strong>{NAP.name}</strong>
    <br />
    {NAP.street}, {NAP.city}, {NAP.state} {NAP.zip}
    <br />
    Phone: <a href={NAP.phoneHref}>{NAP.phone}</a>
    <br />
    Email: <a href={`mailto:${NAP.email}`}>{NAP.email}</a>
  </p>
);

const SECTIONS: LegalSection[] = [
  {
    id: 'who-we-are',
    title: 'Who we are',
    body: (
      <>
        <p>
          This policy explains how {NAP.name} (&ldquo;Pasadena Hypnosis,&rdquo; &ldquo;we,&rdquo; &ldquo;us&rdquo;)
          handles information about visitors to pasadenahypnosis.com (the &ldquo;Site&rdquo;) and about people who book
          or contact us. Pasadena Hypnosis is a hypnotherapy practice run by Jason Meissner, a certified hypnotherapist,
          at {NAP.street} in {NAP.city}.
        </p>
      </>
    ),
  },
  {
    id: 'what-we-collect',
    title: 'Information we collect',
    body: (
      <>
        <p>
          <strong>On this Site itself.</strong> The Site has no sign-up or contact forms, and it does not set its own
          cookies or run its own analytics or advertising tags. Like any website, our hosting provider receives standard
          technical information when your browser loads a page: your IP address, browser and device type, the page
          requested, the referring page and the time of the request.
        </p>
        <p>
          <strong>When you book.</strong> Appointments and payments are handled by Wix Bookings, shown inside our booking
          pages. To book, you give Wix your name, email address, phone number, the appointment you choose, any notes you
          add, and your payment details. Payment card details are processed by Wix&rsquo;s payment providers; we do not
          see or store your full card number.
        </p>
        <p>
          <strong>When you contact us.</strong> If you call, text or email us, we receive whatever you choose to share,
          along with your phone number or email address.
        </p>
        <p>
          <strong>In sessions.</strong> What you share in a session, and any notes Jason keeps about your sessions, are
          treated as confidential (see section 4).
        </p>
      </>
    ),
  },
  {
    id: 'how-we-use-it',
    title: 'How we use it',
    body: (
      <ul>
        <li>To schedule, confirm, reschedule and provide your sessions, and to take payment for them.</li>
        <li>To reply to your calls, texts and emails.</li>
        <li>To keep basic records of the sessions we provide, as a professional practice should.</li>
        <li>To keep the Site secure and working, using the hosting information described above.</li>
        <li>To meet legal obligations.</li>
      </ul>
    ),
  },
  {
    id: 'confidentiality',
    title: 'Confidentiality of what you share',
    body: (
      <>
        <p>
          Anything you tell Jason about your health, history or circumstances is kept confidential. We do not share it
          with anyone unless you ask us to in writing, or the law requires it (for example, where there is a serious
          risk of harm to you or someone else, or a valid court order).
        </p>
        <p>
          Please keep booking notes brief. You do not need to put health details into the booking form; you can talk
          them through on your discovery call or in your session instead.
        </p>
      </>
    ),
  },
  {
    id: 'third-parties',
    title: 'Services we rely on',
    body: (
      <>
        <p>
          We use a small number of outside services. Each handles information under its own privacy policy, and we
          share with them only what they need to do their job:
        </p>
        <ul>
          <li>
            <strong>Wix (Wix Bookings)</strong>: online booking, scheduling, reminders and payment. Wix&rsquo;s booking
            pages use their own cookies, and may include Google Analytics and Google Ads measurement tags that record how
            the booking pages are used.
          </li>
          <li>
            <strong>Google Maps</strong>: the map on our Contact page is loaded from Google, which may set cookies and
            receive your IP address when the map loads.
          </li>
          <li>
            <strong>Vercel</strong>: hosts this Site and receives the standard technical information described in
            section 2.
          </li>
          <li>
            <strong>Our phone and email providers</strong>: carry the calls, texts and emails you send us.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: 'sharing',
    title: 'Selling and sharing',
    body: (
      <>
        <p>
          <strong>We do not sell your personal information.</strong> We do not give or rent your contact details or
          anything you tell us to anyone for their own marketing. Apart from the services listed in section 5, we
          disclose information only when the law requires it, to protect someone&rsquo;s safety, or as part of a sale
          or transfer of the practice, in which case this policy continues to apply.
        </p>
      </>
    ),
  },
  {
    id: 'cookies',
    title: 'Cookies and browser signals',
    body: (
      <>
        <p>
          This Site does not set cookies of its own. The Wix booking pages and the Google map described in section 5 may
          set cookies when they load. You can block or delete cookies in your browser settings; the booking calendar
          may not work if Wix&rsquo;s cookies are blocked, in which case you can book by phone instead.
        </p>
        <p>
          The Site does not currently respond differently to &ldquo;Do Not Track&rdquo; browser signals, because it
          does not track visitors itself.
        </p>
      </>
    ),
  },
  {
    id: 'retention-security',
    title: 'How long we keep it, and how we protect it',
    body: (
      <>
        <p>
          We keep booking and session records for as long as we need them to provide your care, run the practice and
          meet our legal, tax and professional obligations, and then delete them. We use reasonable safeguards to
          protect the information we hold, but no website, email or online service is completely secure.
        </p>
      </>
    ),
  },
  {
    id: 'your-rights',
    title: 'Your choices and rights',
    body: (
      <>
        <p>You can ask us at any time to:</p>
        <ul>
          <li>tell you what personal information we hold about you and where it came from;</li>
          <li>correct information that is wrong;</li>
          <li>delete your information, unless we have to keep it by law;</li>
          <li>stop contacting you about anything other than sessions you have booked.</li>
        </ul>
        <p>
          Depending on where you live, you may have further rights under privacy law; we will honor them. Send requests
          to <a href={`mailto:${NAP.email}`}>{NAP.email}</a> or call <a href={NAP.phoneHref}>{NAP.phone}</a>. We may
          need to confirm your identity first, and we will not treat you differently for making a request.
        </p>
      </>
    ),
  },
  {
    id: 'children',
    title: 'Children',
    body: (
      <p>
        This Site is meant for adults. Sessions for children and teenagers are booked, and consented to, by a parent or
        guardian. We do not knowingly collect information online directly from children under 13; if we learn we have,
        we will delete it.
      </p>
    ),
  },
  {
    id: 'changes',
    title: 'Changes to this policy',
    body: (
      <p>
        If we change how we handle information, for example by adding analytics to the Site, we will update this page
        and the effective date at the top before the change takes effect. See also our{' '}
        <Link href="/terms">Terms of Service</Link>.
      </p>
    ),
  },
  {
    id: 'contact',
    title: 'Contact us',
    body: (
      <>
        <p>Questions about this policy or your information:</p>
        {contactBlock}
      </>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <LegalDocument
      title="Privacy Policy"
      intro="What information Pasadena Hypnosis collects, how it is used, who it is shared with, and the choices you have."
      effective={EFFECTIVE}
      sections={SECTIONS}
    />
  );
}
