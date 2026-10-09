import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { assets } from '../data/assets';

gsap.registerPlugin(ScrollTrigger);

interface OrnamentProps {
  className?: string;
  variant?: 'large' | 'small' | 'gold' | 'leaf';
}

const ornamentSrc: Record<string, string> = {
  large: assets.flowerLarge,
  small: assets.flowerSmall,
  gold: assets.goldLily,
  leaf: assets.leafLine,
};

export const Ornament: React.FC<OrnamentProps> = ({ className = '', variant = 'large' }) => {
  return (
    <img
      src={ornamentSrc[variant]}
      alt=""
      aria-hidden="true"
      loading="lazy"
      className={`pointer-events-none absolute select-none opacity-45 ${className}`}
    />
  );
};

interface MandalaProps {
  className?: string;
  reverse?: boolean;
  parallax?: boolean;
}

export const SpinningMandala: React.FC<MandalaProps> = ({
  className = '',
  reverse = false,
  parallax = true,
}) => {
  const parallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!parallax) return;
    const el = parallaxRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { y: -40 },
        {
          y: 40,
          ease: 'none',
          scrollTrigger: {
            trigger: el.closest('section') || el,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.2,
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [parallax]);

  return (
    <div className={`pointer-events-none absolute select-none ${className}`}>
      <div ref={parallaxRef} className="h-full w-full will-change-transform">
        <img
          src={assets.mandalaOrange}
          alt=""
          aria-hidden="true"
          loading="lazy"
          className={`h-full w-full object-contain opacity-25 mix-blend-multiply ${
            reverse ? 'animate-spin-soft-reverse' : 'animate-spin-soft'
          }`}
          style={{ transformOrigin: 'center center' }}
        />
      </div>
    </div>
  );
};

export const StandardGoldMandala: React.FC<{ className?: string; color?: string }> = ({
  className = 'w-16 h-16',
  color = '#C5A059',
}) => {
  return (
    <svg
      viewBox="0 0 100 100"
      className={`pointer-events-none select-none ${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Central Bindu & Concentric Rings */}
      <circle cx="50" cy="50" r="4" fill={color} />
      <circle cx="50" cy="50" r="10" stroke={color} strokeWidth="1.2" strokeDasharray="1.5 1.5" />
      <circle cx="50" cy="50" r="16" stroke={color} strokeWidth="1" />
      <circle cx="50" cy="50" r="28" stroke={color} strokeWidth="1.2" />
      <circle cx="50" cy="50" r="38" stroke={color} strokeWidth="1" strokeDasharray="2 2" />
      <circle cx="50" cy="50" r="46" stroke={color} strokeWidth="1.4" />

      {/* 8 Inner Lotus Petals */}
      <g stroke={color} strokeWidth="1.1" fill="none">
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
          <path
            key={`inner-${angle}`}
            d="M 50 34 C 47 40 47 44 50 50 C 53 44 53 40 50 34 Z"
            transform={`rotate(${angle} 50 50)`}
          />
        ))}
      </g>

      {/* 16 Outer Decorative Petals */}
      <g stroke={color} strokeWidth="1.2" fill="none">
        {[0, 22.5, 45, 67.5, 90, 112.5, 135, 157.5, 180, 202.5, 225, 247.5, 270, 292.5, 315, 337.5].map((angle) => (
          <path
            key={`outer-${angle}`}
            d="M 50 12 C 45 22 46 28 50 28 C 54 28 55 22 50 12 Z"
            transform={`rotate(${angle} 50 50)`}
          />
        ))}
      </g>

      {/* 8 Ornamental Crest Dots */}
      <g fill={color}>
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
          <circle
            key={`dot-${angle}`}
            cx="50"
            cy="7"
            r="1.8"
            transform={`rotate(${angle} 50 50)`}
          />
        ))}
      </g>
    </svg>
  );
};

export const TraditionalCornerDecor: React.FC<{ className?: string; color?: string }> = ({
  className = '',
  color = '#C5A059',
}) => {
  return (
    <svg
      viewBox="0 0 40 40"
      className={`pointer-events-none select-none ${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M 2 38 L 2 12 C 2 6 6 2 12 2 L 38 2"
        stroke={color}
        strokeWidth="1.8"
      />
      <path
        d="M 7 35 L 7 14 C 7 10 10 7 14 7 L 35 7"
        stroke={color}
        strokeWidth="0.8"
        strokeDasharray="2 2"
      />
      <circle cx="12" cy="12" r="2.5" fill={color} />
      <circle cx="2" cy="2" r="1.5" fill={color} />
      <path
        d="M 14 14 C 18 18 20 22 22 26 M 14 14 C 18 18 22 20 26 22"
        stroke={color}
        strokeWidth="1"
      />
    </svg>
  );
};
