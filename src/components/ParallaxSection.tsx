import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { assets } from '../data/assets';
import { weddingConfig } from '../wedding.config';

gsap.registerPlugin(ScrollTrigger);

export const ParallaxSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.parallax-img',
        { yPercent: -6, scale: 1.15 },
        {
          yPercent: 6,
          scale: 1.15,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, []);

  const { banner } = weddingConfig;

  return (
    <div ref={containerRef} className="relative h-[62vh] min-h-[440px] overflow-hidden bg-[#24080e] sm:h-[75vh]">
      <img
        src={banner.image || assets.hands}
        alt={banner.alt || 'Wedding ceremony quote banner'}
        loading="lazy"
        width={1200}
        height={1500}
        className="parallax-img absolute -top-[15%] left-0 h-[130%] w-full object-cover object-center will-change-transform"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/35 to-black/50" />
      <div className="absolute inset-0 flex items-center justify-center px-4 sm:px-8 text-center">
        <div className="max-w-3xl rounded-2xl sm:rounded-3xl bg-black/40 p-5 sm:p-10 backdrop-blur-[3px] border border-gold/40 shadow-2xl">
          <p className="font-display text-lg min-[360px]:text-xl sm:text-3xl md:text-4xl leading-relaxed text-[#FFFDF5] drop-shadow-[0_2px_6px_rgba(0,0,0,0.7)]">
            “{banner.quote}”
          </p>
        </div>
      </div>
    </div>
  );
};
