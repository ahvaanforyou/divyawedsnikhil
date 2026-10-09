import React from 'react';
import { assets } from '../data/assets';
import { weddingData } from '../data/weddingData';
import { Ornament, SpinningMandala } from './Ornaments';
import { RevealOnScroll } from './RevealOnScroll';

export const GratitudeSection: React.FC = () => {
  return (
    <section className="relative overflow-hidden px-5 py-24 sm:py-32">
      <SpinningMandala reverse className="-left-24 bottom-4 w-56 sm:w-80" />
      <Ornament variant="gold" className="-left-10 top-10 w-36 rotate-6 sm:w-52" />
      <Ornament variant="gold" className="-right-8 bottom-10 w-32 -rotate-12 sm:w-48" />

      <RevealOnScroll className="relative mx-auto max-w-4xl">
        <div className="paper-card relative overflow-hidden px-6 py-14 text-center sm:px-16 sm:py-20">
          <img
            src={assets.leafLine}
            alt=""
            aria-hidden="true"
            loading="lazy"
            width={1024}
            height={1024}
            className="pointer-events-none absolute -left-16 -top-10 w-64 opacity-[0.13] sm:w-80"
          />
          <img
            src={assets.leafLine}
            alt=""
            aria-hidden="true"
            loading="lazy"
            width={1024}
            height={1024}
            className="pointer-events-none absolute -bottom-16 -right-14 w-64 rotate-180 opacity-[0.13] sm:w-80"
          />
          <span className="pointer-events-none absolute inset-4 border border-gold/30" />

          <div className="relative">
            <img
              src={assets.kalash}
              alt="Traditional ceremonial kalash with mango leaves and coconut"
              loading="lazy"
              className="mx-auto w-20 sm:w-24"
            />
            <p className="eyebrow mt-7">With gratitude from both families</p>
            <div className="my-4 sm:my-6 text-center px-1">
              <h2 className="font-serif text-2xl min-[360px]:text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#5A1A1A] leading-tight break-words">
                {weddingData.bride}
              </h2>
              <div className="my-1.5 sm:my-2.5 flex items-center justify-center gap-2 sm:gap-3">
                <div className="h-[1px] w-8 sm:w-16 bg-gradient-to-r from-transparent via-[#C5A059] to-[#C5A059]" />
                <span className="font-serif italic text-lg sm:text-2xl font-bold text-[#8B2500]">&amp;</span>
                <div className="h-[1px] w-8 sm:w-16 bg-gradient-to-l from-transparent via-[#C5A059] to-[#C5A059]" />
              </div>
              <h2 className="font-serif text-2xl min-[360px]:text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#5A1A1A] leading-tight break-words">
                {weddingData.groom}
              </h2>
            </div>
            <p className="mt-5 sm:mt-7 font-title text-sm uppercase tracking-[0.32em] text-maroon sm:text-base">
              Thank you for blessing us
            </p>
            <img
              src={assets.lotusDivider}
              alt=""
              aria-hidden="true"
              loading="lazy"
              className="mx-auto mt-6 w-full max-w-sm opacity-90"
            />
            <p className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-muted-foreground">
              Your presence, prayers and affection make this beginning complete. We invite you once again to join us at{' '}
              {weddingData.venue}, {weddingData.city} on {weddingData.dateLabel}.
            </p>
            <img
              src={assets.coupleNamaste}
              alt={`Illustration of ${weddingData.bride} and ${weddingData.groom} greeting guests with folded hands`}
              loading="lazy"
              className="mx-auto mt-10 w-48 sm:w-60"
            />
            <p className="whitespace-pre-line font-title text-[0.7rem] uppercase leading-[1.7] tracking-[0.22em] text-gold-deep sm:text-[0.8rem]">
              {weddingData.familyLine}
            </p>
            <p className="mt-3 text-xs uppercase tracking-[0.22em] text-muted-foreground">
              {weddingData.hashtag}
            </p>
          </div>
        </div>
      </RevealOnScroll>
    </section>
  );
};
