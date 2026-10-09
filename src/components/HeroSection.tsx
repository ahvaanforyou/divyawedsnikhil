import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ChevronDown, Sparkles } from 'lucide-react';
import { assets } from '../data/assets';
import { weddingConfig, weddingData } from '../wedding.config';
import { playAudio } from '../lib/audio';
import { StandardGoldMandala, TraditionalCornerDecor } from './Ornaments';

const paperCards = [
  { x: -320, y: 180, r: -24, d: 0, w: 120, h: 158 },
  { x: 300, y: 220, r: 18, d: 0.08, w: 96, h: 126 },
  { x: -190, y: -160, r: 32, d: 0.16, w: 84, h: 110 },
  { x: 230, y: -140, r: -30, d: 0.24, w: 108, h: 142 },
  { x: -400, y: -40, r: 12, d: 0.32, w: 76, h: 100 },
  { x: 420, y: 40, r: -14, d: 0.4, w: 88, h: 116 },
];

export const HeroSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const [opened, setOpened] = useState(false);
  const [clicked, setClicked] = useState(false);

  // Lock scroll until opened
  useEffect(() => {
    const docEl = document.documentElement;
    if (opened) {
      document.body.classList.remove('doors-locked');
      docEl.classList.remove('doors-locked');
      return;
    }
    window.scrollTo(0, 0);
    document.body.classList.add('doors-locked');
    docEl.classList.add('doors-locked');

    const prevent = (e: Event) => e.preventDefault();
    const handleKey = (e: KeyboardEvent) => {
      if (['Space', 'ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End'].includes(e.code)) {
        e.preventDefault();
      }
    };

    window.addEventListener('wheel', prevent, { passive: false });
    window.addEventListener('touchmove', prevent, { passive: false });
    window.addEventListener('keydown', handleKey, { passive: false });

    return () => {
      document.body.classList.remove('doors-locked');
      docEl.classList.remove('doors-locked');
      window.removeEventListener('wheel', prevent);
      window.removeEventListener('touchmove', prevent);
      window.removeEventListener('keydown', handleKey);
    };
  }, [opened]);

  // Setup GSAP animation
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        paused: true,
        onComplete: () => setOpened(true),
      });

      tl.to('.doors-button', { autoAlpha: 0, duration: 0.25, pointerEvents: 'none', ease: 'power2.out' }, 'open')
        .to('.door-l', { rotateY: -104, duration: prefersReduced ? 0.3 : 2.1, ease: 'power3.inOut' }, 'open')
        .to('.door-r', { rotateY: 104, duration: prefersReduced ? 0.3 : 2.1, ease: 'power3.inOut' }, 'open')
        .to('.doors-container', { autoAlpha: 0, duration: 0.4, pointerEvents: 'none', ease: 'power2.out', onComplete: () => setOpened(true) }, 'open+=1.9')
        .to('.door-shadow', { autoAlpha: 0, duration: 1.4 }, 'open')
        .fromTo('.temple', { scale: 1.18, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 2.2, ease: 'power2.out' }, 'open+=0.2')
        .fromTo(
          '.paper',
          { autoAlpha: 0, x: 0, y: 60, scale: 0.4, rotate: 0 },
          {
            autoAlpha: 1,
            x: (i) => paperCards[i].x,
            y: (i) => paperCards[i].y,
            scale: 1,
            rotate: (i) => paperCards[i].r,
            duration: 1.9,
            ease: 'power2.out',
            stagger: 0.07,
          },
          'open+=0.85'
        )
        .fromTo(
          '.invite-card',
          { autoAlpha: 0, y: 140, scale: 0.62, rotateX: 42 },
          { autoAlpha: 1, y: 0, scale: 1, rotateX: 0, duration: 1.6, ease: 'power4.out' },
          'open+=1.15'
        )
        .fromTo(
          '.invite-line',
          { autoAlpha: 0, y: 22 },
          { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.13, ease: 'power3.out' },
          '-=0.85'
        );

      tlRef.current = tl;
    }, section);

    return () => ctx.revert();
  }, []);

  const handleOpen = () => {
    if (clicked) return;
    setClicked(true);
    playAudio();
    tlRef.current?.play();
  };

  return (
    <section
      ref={sectionRef}
      className={`${
        opened ? 'relative' : 'fixed inset-0 z-[100]'
      } flex min-h-[100svh] w-full items-center justify-center overflow-hidden bg-background`}
    >
      {/* Temple Backdrop (Crisp, sharp, no blur) */}
      <img
        src={assets.temple}
        alt="Temple gopuram archway"
        className="temple pointer-events-none absolute inset-0 h-full w-full scale-105 object-cover opacity-0"
      />
      <div className="pointer-events-none absolute inset-0 bg-background/45" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-[var(--gradient-veil)]" />

      {/* Floating Paper Cards */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        {paperCards.map((card, i) => (
          <div
            key={i}
            className="paper absolute opacity-0 shadow-[var(--shadow-card)]"
            style={{ width: `${card.w}px`, height: `${card.h}px` }}
          >
            <div className="h-full w-full border border-gold/40 bg-paper">
              <div className="m-2 h-full border border-gold/25 bg-[radial-gradient(circle_at_50%_30%,color-mix(in_oklab,var(--gold)_18%,transparent),transparent_70%)]" />
            </div>
          </div>
        ))}
      </div>

      {/* Main Invitation Card (After Doors Open) */}
      <div className="relative z-20 w-full px-4 sm:px-5 [perspective:1400px]">
        <div className="invite-card mx-auto max-w-xl opacity-0">
          <div className="paper-card arch-top relative px-5 py-10 text-center sm:px-12 sm:py-16 shadow-2xl border-2 border-gold/60">
            {/* Darker Gold Mandala (Centered in wrapper so it rotates in-place without horizontal drift) */}
            <div className="pointer-events-none absolute -top-14 sm:-top-18 left-1/2 -translate-x-1/2 flex items-center justify-center">
              <img
                src={assets.mandalaGold}
                alt=""
                aria-hidden="true"
                className="w-28 sm:w-36 origin-center animate-[spin_32s_linear_infinite] [filter:brightness(0.55)_contrast(1.6)_saturate(2)] drop-shadow-[0_2px_4px_rgba(70,25,5,0.35)]"
              />
            </div>

            <p className="invite-line eyebrow mt-6 sm:mt-7 font-title tracking-[0.3em]">{weddingData.dateShort}</p>

            {/* Symmetrical Couple Names with Great Vibes Font and Solid Bold Color */}
            <div className="invite-line my-3 sm:my-5 text-center px-1">
              <h1 className="font-script text-4xl min-[360px]:text-5xl sm:text-6xl md:text-7xl font-bold tracking-normal text-[#5A1A1A] leading-tight break-words">
                {weddingData.bride}
              </h1>
              <div className="my-1 sm:my-1.5 flex items-center justify-center gap-2 sm:gap-3">
                <div className="h-[1px] w-10 sm:w-20 bg-gradient-to-r from-transparent via-[#C5A059] to-[#C5A059]" />
                <span className="font-script text-2xl sm:text-4xl font-bold text-[#8B2500]">&amp;</span>
                <div className="h-[1px] w-10 sm:w-20 bg-gradient-to-l from-transparent via-[#C5A059] to-[#C5A059]" />
              </div>
              <h1 className="font-script text-4xl min-[360px]:text-5xl sm:text-6xl md:text-7xl font-bold tracking-normal text-[#5A1A1A] leading-tight break-words">
                {weddingData.groom}
              </h1>
            </div>

            <div className="invite-line rule-gold mx-auto my-4 w-2/3" />
            <p className="invite-line mx-auto mt-4 max-w-sm text-xs sm:text-sm leading-relaxed text-muted-foreground px-2">
              {weddingData.invitationLine}
            </p>
            <p className="invite-line mt-6 sm:mt-7 font-title text-base sm:text-lg tracking-wide text-foreground font-semibold">
              {weddingData.dateLabel}
            </p>
            <p className="invite-line mt-1 text-xs sm:text-sm text-muted-foreground">
              {weddingData.muhurtham} · {weddingData.venue}, {weddingData.city}
            </p>
            {weddingData.feast && (
              <p className="invite-line mt-1.5 text-xs uppercase tracking-wider text-gold-deep font-semibold">
                {weddingData.feast}
              </p>
            )}

            {/* Scroll Down Indicator (inside card) */}
            <a
              href="#intro"
              onClick={(e) => {
                e.preventDefault();
                const target = document.getElementById('intro');
                if (target) {
                  target.scrollIntoView({ behavior: 'smooth' });
                } else {
                  window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
                }
              }}
              aria-label="Scroll down to invitation details"
              className="invite-line group mt-7 sm:mt-8 flex flex-col items-center gap-1 cursor-pointer focus:outline-none transition-transform duration-300 hover:scale-105"
            >
              <span className="font-title text-xs sm:text-sm uppercase tracking-[0.26em] text-maroon font-bold select-none text-center animate-scroll-blink">
                Scroll Down
              </span>
              <div className="animate-arrow-down flex items-center justify-center">
                <ChevronDown className="size-4 sm:size-5 text-gold-deep stroke-[2.5] drop-shadow-[0_1px_2px_rgba(255,255,255,0.9)] group-hover:text-maroon transition-colors" />
              </div>
            </a>
          </div>
        </div>
      </div>

      {/* ── Temple Doors (Bright, sharp, no blur) ── */}
      {!opened && (
        <div className="doors-container absolute inset-0 z-30 flex [perspective:1600px]">
          <div
            className="door-l relative h-full w-1/2 origin-left bg-cover bg-right"
            style={{ backgroundImage: `url(${assets.templeDoor})`, transformStyle: 'preserve-3d' }}
          />
          <div
            className="door-r relative h-full w-1/2 origin-right bg-cover bg-left"
            style={{ backgroundImage: `url(${assets.templeDoor})`, transformStyle: 'preserve-3d' }}
          />

          {/* Centered Arch-Top Card Overlay with Traditional Decor */}
          {!clicked && (
            <div
              onClick={handleOpen}
              className="doors-button absolute inset-0 z-40 flex flex-col items-center justify-center px-4 transition-opacity duration-500 ease-out cursor-pointer"
            >
              <div className="relative flex flex-col items-center px-6 py-9 text-center sm:px-10 sm:py-12 w-[94%] max-w-[360px] sm:max-w-[430px] rounded-t-[150px] sm:rounded-t-[185px] rounded-b-2xl border-2 border-[#C5A059] bg-gradient-to-b from-[#FFFDF8] via-[#FAF5EC] to-[#F5ECE0] shadow-[0_25px_60px_-12px_rgba(80,25,10,0.45)]">
                {/* Delicate inner gold border */}
                <div className="pointer-events-none absolute inset-1.5 sm:inset-2.5 rounded-t-[142px] sm:rounded-t-[175px] rounded-b-xl border border-[#C5A059]/40" />
                
                {/* Traditional Corner Decor on bottom corners */}
                <div className="pointer-events-none absolute bottom-2.5 left-2.5 w-5 sm:w-6 opacity-60">
                  <TraditionalCornerDecor className="w-full h-full" color="#C5A059" />
                </div>
                <div className="pointer-events-none absolute bottom-2.5 right-2.5 w-5 sm:w-6 opacity-60 -scale-x-100">
                  <TraditionalCornerDecor className="w-full h-full" color="#C5A059" />
                </div>

                {/* Darker Gold Mandala centered above arch */}
                <div className="pointer-events-none absolute -top-10 sm:-top-12 left-1/2 -translate-x-1/2 flex items-center justify-center">
                  <img
                    src={assets.mandalaGold}
                    alt=""
                    aria-hidden="true"
                    className="w-22 sm:w-26 origin-center animate-[spin_24s_linear_infinite] [filter:brightness(0.55)_contrast(1.6)_saturate(2)] drop-shadow-[0_2px_4px_rgba(70,25,5,0.35)]"
                  />
                </div>

                {/* Auspicious Invocation */}
                <p className="mt-8 sm:mt-9 font-title text-[9.5px] sm:text-[11px] tracking-[0.3em] uppercase text-[#8B2500] font-bold">
                  || OM SRI GANESHAYA NAMAHA ||
                </p>

                {/* Date */}
                <p className="eyebrow mt-1 text-[0.68rem] sm:text-xs text-gold-deep font-semibold">
                  {weddingData.dateShort}
                </p>

                {/* Symmetrically Aligned Couple Names with Great Vibes Font */}
                <div className="w-full text-center my-2.5 sm:my-3.5 px-3">
                  <h2 className="font-script text-3xl min-[360px]:text-4xl sm:text-5xl font-bold tracking-wide text-[#5C1D1D] drop-shadow-sm leading-tight">
                    {weddingData.bride}
                  </h2>
                  <div className="my-1 sm:my-1.5 flex items-center justify-center gap-2 sm:gap-3">
                    <div className="h-[1px] w-8 sm:w-14 bg-gradient-to-r from-transparent via-[#C5A059] to-[#C5A059]" />
                    <span className="font-script text-2xl sm:text-3xl font-bold text-[#8B2500]">&amp;</span>
                    <div className="h-[1px] w-8 sm:w-14 bg-gradient-to-l from-transparent via-[#C5A059] to-[#C5A059]" />
                  </div>
                  <h2 className="font-script text-3xl min-[360px]:text-4xl sm:text-5xl font-bold tracking-wide text-[#5C1D1D] drop-shadow-sm leading-tight">
                    {weddingData.groom}
                  </h2>
                </div>

                {/* Auspicious Divider */}
                <div className="rule-gold mx-auto my-2 w-28 sm:w-36 opacity-75" />

                {/* Tap to open button */}
                <button
                  type="button"
                  onClick={handleOpen}
                  aria-label="Open the wedding invitation"
                  className="group relative mt-2.5 sm:mt-3.5 overflow-hidden rounded-full border border-[#FFE8A3] bg-gradient-to-r from-[#B8860B] via-[#D4AF37] to-[#AA771C] px-8 py-3 transition-all duration-300 hover:brightness-110 active:scale-95 cursor-pointer shadow-[0_4px_16px_rgba(184,134,11,0.35)]"
                >
                  <span className="relative font-title text-xs sm:text-sm uppercase tracking-[0.28em] text-[#2C1802] font-bold">
                    {weddingConfig.invitation.doorsButtonText || 'Open Invitation'}
                  </span>
                </button>

                {/* Subtitle */}
                <p className="mt-2.5 text-[0.62rem] sm:text-xs uppercase tracking-[0.24em] text-muted-foreground text-center">
                  {weddingConfig.invitation.doorsSubText || 'Music will play softly'}
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Door Shadow Overlay (Clean, no darkness) */}
      <div className="door-shadow pointer-events-none absolute inset-0 z-40 bg-black/5" />
    </section>
  );
};
