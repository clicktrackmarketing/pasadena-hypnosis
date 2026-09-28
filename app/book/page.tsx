import type { Metadata } from 'next';
import { NAP, HOURS, STEPS } from '../../components/content';
import { serviceImage, GALLERY } from '../../components/unsplash';
import { PhoneIcon, ShieldCheckIcon, ClockIcon, CheckIcon } from '../../components/Icons';
import { BookingForm } from '../../components/BookingForm';
import { PageHero, heroPrimaryBtn, heroGhostBtn } from '../../components/PageHero';
import { Reveal, Stagger, StaggerItem } from '../../components/Motion';
import { ImageStrip } from '../../components/Bands';

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

export default function BookPage() {
  return (
    <div>
      <PageHero
        eyebrow="Book"
        title="Book a free discovery call"
        image={serviceImage('discovery-call')}
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
        <a href={NAP.phoneHref} className={heroPrimaryBtn}>
          <PhoneIcon className="h-4 w-4" />
          Call {NAP.phone}
        </a>
        <a href="#request" className={heroGhostBtn}>
          Or send a request
        </a>
      </PageHero>

      <section className="bg-[#E6EFFF] py-16 sm:py-24">
        <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
          <div>
            <Stagger className="flex flex-col gap-3" as="ul" gap={0.08}>
              {REASSURANCES.map((r) => (
                <StaggerItem key={r} as="li" distance={14}>
                  <span className="flex items-start gap-3 text-[16px] leading-[1.6] text-[#2E2F3D]">
                    <CheckIcon className="mt-1 h-4 w-4 flex-shrink-0 text-[#5DBA47]" />
                    {r}
                  </span>
                </StaggerItem>
              ))}
            </Stagger>

            {/* The real three-step process, from content.ts. The call is step
                one of a real sequence rather than a lead-capture event. */}
            <Reveal delay={0.1}>
              <h2 className="mb-6 mt-12 font-heading text-[1.5rem] text-[#2E2F3D]">What happens next</h2>
            </Reveal>
            <Stagger className="flex flex-col gap-6" as="ol" gap={0.1}>
              {STEPS.map((s) => (
                <StaggerItem key={s.n} as="li">
                  <div className="flex gap-5">
                    <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full border border-[#D7DEEA] bg-white font-heading text-[15px] text-[#46699F]">
                      {s.n}
                    </span>
                    <div>
                      <h3 className="mb-1.5 font-heading text-[1.15rem] text-[#2E2F3D]">{s.title}</h3>
                      <p className="max-w-[48ch] text-[14.5px] leading-[1.68] text-[#4B5468]">{s.body}</p>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>

            <Reveal delay={0.1}>
              <div className="mt-10 rounded-[18px] border border-[#D7DEEA] bg-white p-6">
                <p className="mb-4 inline-flex items-center gap-2.5 text-[11.5px] font-bold uppercase tracking-[0.14em] text-[#46699F]">
                  <ClockIcon className="h-4 w-4" />
                  When you can call
                </p>
                <dl>
                  {HOURS.map((h) => (
                    <div
                      key={h.days}
                      className="flex items-baseline justify-between gap-6 border-b border-[#D7DEEA] py-2 last:border-0"
                    >
                      <dt className="text-[14.5px] text-[#4B5468]">{h.days}</dt>
                      <dd className="text-[14.5px] font-semibold tabular-nums text-[#2E2F3D]">{h.time}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </Reveal>

            <Reveal delay={0.12}>
              <div className="mt-6 flex items-start gap-3.5 rounded-[18px] border border-[#D7DEEA] bg-[#E9F3EF] p-6">
                <ShieldCheckIcon className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#454659]" />
                <p className="text-[14.5px] leading-[1.68] text-[#2E2F3D]">
                  Pasadena Hypnosis is a complementary practice, not a substitute for medical or psychiatric care.
                </p>
              </div>
            </Reveal>
          </div>

          <div id="request" className="scroll-mt-28">
            <Reveal delay={0.08}>
              <BookingForm />
            </Reveal>
          </div>
        </div>
      </section>

      <ImageStrip images={GALLERY} speed={90} className="bg-[#E6EFFF] pb-20" />
    </div>
  );
}
