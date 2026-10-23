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

/* Written 2026-10-20 to match the site as built (see LegalDocument.tsx).
   Updated 2026-10-23 when analytics shipped: Google Tag Manager + Google
   Analytics with Consent Mode (components/Analytics.tsx) and the
   visit-source record in localStorage (components/attribution.ts). Still no
   site forms; Wix Bookings for booking and payment, Google Maps embed on
   /contact, Vercel hosting. Every statement here must stay true of the code:
   add a promise only in the same change that ships the mechanism, and change
   this page whenever Analytics.tsx or attribution.ts changes. Signed off by
   Click Track Marketing (Bilal) 2026-10-23, including the analytics wording. */
const EFFECTIVE = 'October 23, 2026';

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
          <strong>On this Site itself.</strong> The Site has no sign-up or contact forms and runs no advertising tags.
          Like any website, our hosting provider receives standard technical information when your browser loads a
          page: your IP address, browser and device type, the page requested, the referring page and the time of the
          request.
        </p>
        <p>
          <strong>Analytics.</strong> We use Google Analytics, loaded through Google Tag Manager, to see how visitors
          find and use the Site: the pages you view, how you arrived (for example a search engine, an AI assistant, a
          link on another site or an email), the campaign tags in the link you followed, your approximate location
          (city level, from your IP address) and your browser and device type. Google Analytics does not receive your
          name, email address or phone number from us.
        </p>
        <p>
          <strong>How you found us.</strong> The Site also keeps a small record in your own browser&rsquo;s local
          storage of how you first arrived and how you most recently arrived: the referring site, any campaign tags or
          ad-click identifiers in the link, the first page you landed on, and when. It stays on your device; we only
          receive it if you later send us a form on this Site, and the Site has no forms today.
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
        <li>To understand which pages help people and how they find us, using the analytics described above.</li>
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
            <strong>YouTube</strong>: a few pages show a still image of one of our videos, loaded from YouTube, which
            receives your IP address. The video player itself loads only if you press play, from YouTube&rsquo;s
            privacy-enhanced (youtube-nocookie.com) service, which may then store information in your browser.
          </li>
          <li>
            <strong>Google Analytics and Google Tag Manager</strong>: measure how the Site is used, as described in
            section 2. Google processes this information under its own privacy policy. We have not enabled advertising
            features: the signals Google uses for ads and personalisation are switched off on this Site.
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
          Google Analytics sets its own cookies on this Site (named <code>_ga</code> and <code>_ga_</code> followed by an
          identifier) to recognise repeat visits; they last up to two years. The visit record described in section 2 is
          kept in your browser&rsquo;s local storage rather than a cookie. The Wix booking pages and the Google map
          described in section 5 may set cookies when they load, and a YouTube video may once you press play.
        </p>
        <p>
          <strong>Visitors in Europe, the UK and Switzerland.</strong> We do not ask for cookie consent, so for visitors
          in the European Economic Area, the United Kingdom and Switzerland, Google Analytics stores no cookies and
          sends only cookieless measurements that do not identify your browser.
        </p>
        <p>
          <strong>Global Privacy Control.</strong> If your browser sends a Global Privacy Control signal, Google
          Analytics on this Site stores no cookies and sends only cookieless measurements that do not identify your browser, the same as for
          visitors in Europe. The Site does not respond differently to &ldquo;Do Not Track&rdquo; signals, which have
          no agreed meaning; use Global Privacy Control instead.
        </p>
        <p>
          You can also block or delete cookies and local storage in your browser settings, or install Google&rsquo;s
          opt-out browser add-on for Google Analytics. The booking calendar may not work if Wix&rsquo;s cookies are
          blocked, in which case you can book by phone instead.
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
        If we change how we handle information, for example by adding a contact form or advertising to the Site, we
        will update this page and the effective date at the top before the change takes effect. See also our{' '}
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
