import type { Metadata } from 'next';
import { NAP } from '../../components/content';
import { serviceImage } from '../../components/unsplash';
import { PhoneIcon, ArrowRightIcon } from '../../components/Icons';
import { PageHero } from '../../components/PageHero';
import { heroPrimaryBtn, heroGhostBtn } from '../../components/buttons';
import { Magnetic } from '../../components/Motion';
import { RollText } from '../../components/MotionFx';
import { BookFormBand, StepsPath, ScopeScrub } from '../../components/pages/book/BookSections';

// Target keywords (profile.ts targetKeywords['/book']): "book hypnotherapy
// appointment pasadena".
export const metadata: Metadata = {
  title: 'Book a Free Discovery Call',
  description:
    'A free, no-obligation discovery call with Jason Meissner to talk through your situation before booking a paid hypnotherapy session.',
  alternates: { canonical: '/book' },
};

const REASSURANCES = [
  'It costs nothing, and no card is taken',
  'You talk to Jason, not to a receptionist',
  'No written intake form before you speak',
  'No obligation to book a session afterwards',
];

/*
 * REDESIGNED 2026-09-28 — each band moves differently:
 *   hero    concentric rings: a voice travelling outward, the discovery call
 *   form    the request form in a glass panel with a light running round its
 *           edge; the decoration around it parts under the pointer, the form
 *           itself never moves
 *   steps   the real three-step process strung on a line that draws itself
 *   scope   the scope sentence reads itself in with the scroll
 */
export default function BookPage() {
  return (
    <div>
      <PageHero
        eyebrow="Book"
        title="Book a free discovery call"
        image={serviceImage('discovery-call')}
        scene="rings"
        intro="rise"
        facts={[
          { k: 'Cost', v: 'Free' },
          { k: 'You speak to', v: 'Jason, directly' },
          { k: 'Obligation', v: 'None' },
          { k: 'Then', v: '$200 per session' },
        ]}
        lede={
          <p>
            A no-cost conversation with Jason Meissner to talk through your situation before booking a paid
            hypnotherapy session &mdash; in person in South Pasadena or online anywhere in California.
          </p>
        }
      >
        <Magnetic>
          <a href={NAP.phoneHref} className={heroPrimaryBtn}>
            <PhoneIcon className="h-4 w-4" />
            <RollText>Call {NAP.phone}</RollText>
          </a>
        </Magnetic>
        <a href="#request" className={`group ${heroGhostBtn}`}>
          <RollText>Or send a request</RollText>
          <ArrowRightIcon className="h-4 w-4 rotate-90 transition-transform duration-300 group-hover:translate-y-0.5" />
        </a>
      </PageHero>

      <BookFormBand reassurances={REASSURANCES} />

      <StepsPath />

      <ScopeScrub />
    </div>
  );
}
