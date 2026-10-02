import type { Metadata } from 'next';
import { NAP } from '../../components/content';
import { serviceImage } from '../../components/unsplash';
import { PhoneIcon, ArrowRightIcon } from '../../components/Icons';
import { PageHero } from '../../components/PageHero';
import { heroPrimaryBtn, heroGhostBtn } from '../../components/buttons';
import { Magnetic } from '../../components/Motion';
import { RollText } from '../../components/MotionFx';
import { BookFormBand, StepsPath } from '../../components/pages/book/BookSections';

// Target keywords (profile.ts targetKeywords['/book']): "book hypnotherapy
// appointment pasadena".
export const metadata: Metadata = {
  title: 'Book a Free Discovery Call',
  description:
    'A free discovery call with Jason Meissner to talk through your situation before booking a hypnotherapy session — in person in South Pasadena or online anywhere.',
  alternates: { canonical: '/book' },
};

/* Positive statements only — the client's rule against "not" phrases (#55). */
const REASSURANCES = [
  'It is free',
  'You talk to Jason directly',
  'Talk through what you want to accomplish',
  'Then choose in the office or online',
];

/*
 * REDESIGNED 2026-09-28 — each band moves differently:
 *   hero    concentric rings: a voice travelling outward, the discovery call
 *   form    the request form in a glass panel with a light running round its
 *           edge; the decoration around it parts under the pointer, the form
 *           itself never moves
 *   steps   the real three-step process strung on a line that draws itself
 *   (the scope band that closed this page was removed — markup #77/#73:
 *   the disclaimer lives in the footer, the scope note on /our-team only)
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
          { k: 'Sessions', v: 'In the office or online' },
          { k: 'Then', v: '$200 per session' },
        ]}
        lede={
          <p>
            A free conversation with Jason Meissner to talk through your situation before you book a hypnotherapy
            session &mdash; in person in South Pasadena or online anywhere.
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
    </div>
  );
}
