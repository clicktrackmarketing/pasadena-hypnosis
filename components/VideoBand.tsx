'use client';

/* ---------------------------------------------------------------------------
   VIDEO BAND — one of Jason's own YouTube videos (his channel "Pasadena
   Hypnotherapy"), chosen 2026-10-21 from the three he sent; see
   docs/jason-copy-round.md for why only the two short explainers are used.

   CLICK TO LOAD. Until someone presses play the band is a still frame and a
   button: no YouTube script, no iframe, no cookies, so pages stay fast and
   the privacy policy's "no cookies of its own" stays true. The player, once
   asked for, is youtube-nocookie.com, and it starts playing at once.
--------------------------------------------------------------------------- */

import { useState } from 'react';
import { SectionHeading } from './SectionHeading';
import { Reveal } from './Motion';

export type Video = {
  /** YouTube video id. */
  id: string;
  /** The video's own title on YouTube. */
  title: string;
  /** m:ss, as YouTube shows it. */
  length: string;
};

export const YouTubeLite = ({ video }: { video: Video }) => {
  const [playing, setPlaying] = useState(false);
  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-[20px] border border-[#D7DEEA] bg-[#1F2030] shadow-[0_30px_60px_-40px_rgba(46,47,61,0.55)]">
      {playing ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&rel=0`}
          title={video.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          className="group absolute inset-0 h-full w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#A9C4EE]"
        >
          {/* hqdefault is 4:3 with black bars; object-cover crops them off. */}
          <img
            src={`https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`}
            alt=""
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover opacity-85 transition-opacity duration-300 group-hover:opacity-100"
          />
          <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[#1F2030]/80 via-transparent to-transparent" />
          <span className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-[0_12px_30px_-10px_rgba(0,0,0,0.7)] transition-transform duration-300 group-hover:scale-110 sm:h-20 sm:w-20">
            <svg viewBox="0 0 24 24" aria-hidden="true" className="ml-1 h-7 w-7 fill-[#2E2F3D] sm:h-8 sm:w-8">
              <path d="M8 5.5v13l10.5-6.5z" />
            </svg>
          </span>
          <span className="absolute bottom-4 left-5 right-5 text-left text-[14px] font-semibold text-white sm:bottom-5 sm:left-6 sm:text-[15px]">
            <span className="sr-only">Play video: </span>
            {video.title}
            <span className="ml-2 font-normal text-[#D9E1F0]">{video.length}</span>
          </span>
        </button>
      )}
    </div>
  );
};

export const VideoBand = ({
  eyebrow,
  heading,
  video,
  className = 'bg-white',
}: {
  eyebrow: string;
  heading: string;
  video: Video;
  className?: string;
}) => (
  <section className={`relative py-16 sm:py-28 ${className}`}>
    <div className="mx-auto max-w-[960px] px-4 sm:px-6 lg:px-8">
      <SectionHeading
        className="mb-10 sm:mb-12"
        eyebrow={eyebrow}
        title={heading}
        lede={<p>A short video from Jason&rsquo;s YouTube channel.</p>}
      />
      <Reveal delay={0.1}>
        <YouTubeLite video={video} />
      </Reveal>
    </div>
  </section>
);
