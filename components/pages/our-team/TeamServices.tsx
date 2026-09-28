'use client';

/* ---------------------------------------------------------------------------
   OUR TEAM — what Jason actually treats.

   The certificates above map onto real services; these are the first three
   in SERVICES, his own ranked priority. The cards flip up into place in 3D
   (FlipItem), which is this band's own entrance, and each card keeps its
   usual pointer tilt. Copy unchanged from the previous version of the page.
--------------------------------------------------------------------------- */

import Link from 'next/link';
import { SERVICES } from '../../content';
import { ArrowRightIcon } from '../../Icons';
import { SectionHeading } from '../../SectionHeading';
import { ServiceCard } from '../../ServiceCard';
import { Stagger } from '../../Motion';
import { FlipItem, RollText } from '../../MotionFx';

export const TeamServices = () => {
  const top = SERVICES.slice(0, 3);
  return (
    <section className="relative overflow-hidden bg-white py-16 sm:py-32">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <SectionHeading
          className="mb-12 sm:mb-14"
          eyebrow="The work"
          title="What Jason actually treats"
          lede={
            <p>
              The certificates above map onto real services. These are the three he leads with; there are{' '}
              {SERVICES.length} in total.
            </p>
          }
          aside={
            <Link
              href="/services"
              className="group inline-flex items-center gap-2 rounded-full border border-[#2E2F3D]/15 px-5 py-2.5 text-sm font-medium text-[#2E2F3D] transition-all duration-300 hover:border-[#454659] hover:bg-[#454659] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#454659] focus-visible:ring-offset-2"
            >
              <RollText>All {SERVICES.length} services</RollText>
              <ArrowRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          }
        />

        <Stagger className="grid auto-rows-fr grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-3" gap={0.12}>
          {top.map((s) => (
            <FlipItem key={s.slug} className="h-full">
              <ServiceCard service={s} variant="brief" />
            </FlipItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
};
