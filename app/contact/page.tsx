import type { Metadata } from 'next';
import { NAP } from '../../components/content';
import { PASADENA_CITY_HALL } from '../../components/unsplash';
import { PhoneIcon, MailIcon } from '../../components/Icons';
import { PageHero, heroPrimaryBtn, heroGhostBtn } from '../../components/PageHero';
import { Magnetic } from '../../components/Motion';
import { RollText } from '../../components/MotionFx';
import { ContactTiles, OfficeBlock, ContactForm } from '../../components/pages/contact/ContactSections';

// Target keywords (profile.ts targetKeywords['/contact']): "pasadena hypnosis
// contact", "hypnotherapy south pasadena phone".
export const metadata: Metadata = {
  title: 'Contact Pasadena Hypnosis',
  description: `Call ${NAP.phone}, book a free discovery call, or visit Pasadena Hypnosis at ${NAP.street} in ${NAP.city}, CA.`,
  alternates: { canonical: '/contact' },
};

/*
 * REDESIGNED 2026-09-28 — each band moves differently:
 *   hero     a particle constellation; the H1 settles down from slightly large
 *   tiles    four ways to reach Jason, lit under the cursor and leaning to it
 *   office   the real consulting room uncovered by a sweeping panel, and a
 *            route line that draws itself to a pin
 *   form     the shared BookingForm, unchanged, in a ground of slow rings
 */
export default function ContactPage() {
  return (
    <div>
      <PageHero
        eyebrow="Contact"
        title="Get in touch"
        image={PASADENA_CITY_HALL}
        scene="constellation"
        intro="scale"
        facts={[
          { k: 'Phone', v: '(626) 616-0143' },
          { k: 'Address', v: '1910 Huntington Dr' },
          { k: 'Open until', v: '21:00 most evenings' },
          { k: 'Also', v: 'Video, statewide' },
        ]}
        lede={
          <p>
            Call, book a free discovery call online, or visit the South Pasadena office directly. Jason answers his
            own phone.
          </p>
        }
      >
        <Magnetic>
          <a href={NAP.phoneHref} className={heroPrimaryBtn}>
            <PhoneIcon className="h-4 w-4" />
            <RollText>{NAP.phone}</RollText>
          </a>
        </Magnetic>
        <a href={`mailto:${NAP.email}`} className={`group ${heroGhostBtn}`}>
          <MailIcon className="h-4 w-4" />
          <RollText>Email instead</RollText>
        </a>
      </PageHero>

      <ContactTiles />

      <OfficeBlock />

      <ContactForm />
    </div>
  );
}
