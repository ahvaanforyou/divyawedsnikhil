import React, { useRef, useState, useEffect, useCallback } from 'react';
import gsap from 'gsap';
import { ChevronDown } from 'lucide-react';
import { assets } from '../data/assets';
import { weddingConfig, weddingData } from '../wedding.config';
import { playAudio } from '../lib/audio';
import { TraditionalCornerDecor } from './Ornaments';

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
  const videoRef = useRef<HTMLVideoElement>(null);
  const doorTlRef = useRef<gsap.core.Timeline | null>(null);
  const cardTlRef = useRef<gsap.core.Timeline | null>(null);

  const [doorsOpen, setDoorsOpen] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [videoStarted, setVideoStarted] = useState(false);
  const [fadingVideo, setFadingVideo] = useState(false);
  const [videoFinished, setVideoFinished] = useState(false);
  const [opened, setOpened] = useState(false);

  // Lock scroll until video ends and whole invitation card is open
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

  // Video Finish & Transition to Main Invitation
  const handleVideoEnd = useCallback(() => {
    if (videoFinished || fadingVideo) return;
    setFadingVideo(true);

    // Play card reveal timeline as video fades out
    cardTlRef.current?.play();

    setTimeout(() => {
      setVideoFinished(true);
      setOpened(true);
    }, 1100);
  }, [videoFinished, fadingVideo]);

  // Smooth pre-emptive fadeout before last frame to avoid any freeze
  const handleTimeUpdate = useCallback(() => {
    const vid = videoRef.current;
    if (!vid || fadingVideo || videoFinished) return;
    if (vid.duration && vid.duration > 2 && vid.currentTime >= vid.duration - 0.7) {
      handleVideoEnd();
    }
  }, [fadingVideo, videoFinished, handleVideoEnd]);

  // Setup GSAP door open and invitation reveal animations
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      // 1. Door opening timeline
      const doorTl = gsap.timeline({
        paused: true,
        onComplete: () => {
          setDoorsOpen(true);
        },
      });

      doorTl
        .to('.doors-button', { autoAlpha: 0, duration: 0.25, pointerEvents: 'none', ease: 'power2.out' }, 'open')
        .to('.door-l', { rotateY: -104, duration: prefersReduced ? 0.3 : 1.9, ease: 'power3.inOut' }, 'open')
        .to('.door-r', { rotateY: 104, duration: prefersReduced ? 0.3 : 1.9, ease: 'power3.inOut' }, 'open')
        .to('.doors-container', { autoAlpha: 0, duration: 0.35, pointerEvents: 'none', ease: 'power2.out' }, 'open+=1.8')
        .to('.door-shadow', { autoAlpha: 0, duration: 1.2 }, 'open');

      doorTlRef.current = doorTl;

      // 2. Invitation card reveal timeline (plays after video fades out)
      const cardTl = gsap.timeline({
        paused: true,
        onComplete: () => setOpened(true),
      });

      cardTl
        .fromTo('.temple', { scale: 1.18, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 2.0, ease: 'power2.out' }, 0)
        .fromTo(
          '.paper',
          { autoAlpha: 0, x: 0, y: 60, scale: 0.4, rotate: 0 },
          {
            autoAlpha: 1,
            x: (i) => paperCards[i].x,
            y: (i) => paperCards[i].y,
            scale: 1,
            rotate: (i) => paperCards[i].r,
            duration: 1.8,
            ease: 'power2.out',
            stagger: 0.07,
          },
          0.3
        )
        .fromTo(
          '.invite-card',
          { autoAlpha: 0, y: 130, scale: 0.65, rotateX: 35 },
          { autoAlpha: 1, y: 0, scale: 1, rotateX: 0, duration: 1.5, ease: 'power4.out' },
          0.5
        )
        .fromTo(
          '.invite-line',
          { autoAlpha: 0, y: 20 },
          { autoAlpha: 1, y: 0, duration: 0.8, stagger: 0.12, ease: 'power3.out' },
          '-=0.7'
        );

      cardTlRef.current = cardTl;
    }, section);

    return () => ctx.revert();
  }, []);

  // User taps "Open Invitation"
  const handleOpen = () => {
    if (clicked) return;
    setClicked(true);

    // 1. Start audio immediately on direct user gesture
    playAudio();

    // 2. Start video playing immediately behind the closed doors
    // This allows the browser to buffer, decode, and render the stream in memory
    // so when the doors swing open, playback is already butter-smooth with ZERO lag or white gap!
    const vid = videoRef.current;
    if (vid) {
      vid.muted = true;
      vid.defaultMuted = true;
      const playPromise = vid.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setVideoStarted(true);
          })
          .catch((err) => {
            console.warn('Video playback warning:', err);
          });
      }
    }

    // 3. Play door opening animation
    doorTlRef.current?.play();
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

            {/* Couple Names on Same Line with Imperial Script Font (from Hitesh wedding invitation) */}
            <h1 className="invite-line my-4 sm:my-6 flex flex-wrap items-center justify-center gap-x-2.5 sm:gap-x-4 font-imperial text-5xl min-[360px]:text-6xl sm:text-7xl md:text-8xl leading-none text-[#5A1A1A] font-normal drop-shadow-sm break-words whitespace-nowrap">
              <span>Divya</span>
              <span className="font-title text-xl sm:text-3xl md:text-4xl text-[#8B2500] align-middle -mt-1 sm:-mt-2">&amp;</span>
              <span>Nikhil</span>
            </h1>

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

          {/* Centered Monogram Logo & Button (No White Card) */}
          {!clicked && (
            <div
              onClick={handleOpen}
              className="doors-button absolute inset-0 z-40 flex flex-col items-center justify-center px-4 transition-opacity duration-500 ease-out cursor-pointer select-none"
            >
              {/* Couple Monogram Gold Logo on Temple Doors */}
              <div className="relative mb-5 sm:mb-7 flex items-center justify-center transition-transform duration-500 hover:scale-105 active:scale-95">
                <img
                  src={assets.coupleLogo}
                  alt="Divya & Nikhil Monogram"
                  className="w-44 sm:w-56 md:w-64 max-w-[72vw] h-auto object-contain drop-shadow-[0_10px_35px_rgba(0,0,0,0.85)] filter contrast-110 brightness-105"
                />
              </div>

              {/* Normal Button: TAP TO OPEN THE INVITATION */}
              <button
                type="button"
                onClick={handleOpen}
                aria-label="Tap to open the wedding invitation"
                className="group relative overflow-hidden rounded-full border border-[#FFE8A3] bg-gradient-to-r from-[#B8860B] via-[#D4AF37] to-[#AA771C] px-8 sm:px-10 py-3.5 sm:py-4 transition-all duration-300 hover:brightness-110 hover:shadow-[0_0_28px_rgba(212,175,55,0.6)] active:scale-95 cursor-pointer shadow-[0_6px_24px_rgba(0,0,0,0.65)]"
              >
                <span className="relative font-title text-xs sm:text-sm uppercase tracking-[0.28em] text-[#2C1802] font-bold">
                  {weddingConfig.invitation.doorsButtonText || 'TAP TO OPEN THE INVITATION'}
                </span>
              </button>

              {/* Subtitle */}
              <p className="mt-3 text-[0.66rem] sm:text-xs uppercase tracking-[0.24em] text-[#F3E3C0] font-medium text-center drop-shadow-[0_2px_4px_rgba(0,0,0,0.85)]">
                {weddingConfig.invitation.doorsSubText || 'Music will play softly'}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Door Shadow Overlay (Clean, no darkness) */}
      <div className="door-shadow pointer-events-none absolute inset-0 z-40 bg-black/5" />

      {/* ── Video Overlay (Decodes and plays behind doors, revealed smoothly without lag or glitch) ── */}
      {!videoFinished && (
        <div
          className="fixed inset-0 z-[25] w-screen h-[100svh] overflow-hidden bg-black transition-opacity duration-1000 ease-out"
          style={{
            opacity: fadingVideo ? 0 : 1,
            pointerEvents: fadingVideo || !doorsOpen ? 'none' : 'auto',
          }}
        >
          {/* HTML5 Video element configured for zero-latency autoplay and hardware acceleration */}
          <video
            ref={videoRef}
            src="/client-images/intro.mp4"
            poster="/client-images/intro-poster.jpg"
            muted
            playsInline
            autoPlay={false}
            preload="auto"
            disablePictureInPicture
            disableRemotePlayback
            onPlaying={() => setVideoStarted(true)}
            onTimeUpdate={handleTimeUpdate}
            onEnded={handleVideoEnd}
            onError={handleVideoEnd}
            className="absolute inset-0 h-full w-full object-cover object-center"
            style={{
              width: '100vw',
              height: '100svh',
              transform: 'translateZ(0)',
              WebkitBackfaceVisibility: 'hidden',
              backfaceVisibility: 'hidden',
            }}
          />

          {/* Skip Intro button — appears gently once doors are open and video is playing */}
          {doorsOpen && !fadingVideo && (
            <button
              type="button"
              onClick={handleVideoEnd}
              aria-label="Skip video"
              className="absolute bottom-6 right-5 z-20 rounded-full border border-gold/70 bg-black/50 px-5 py-2 font-title text-[0.7rem] uppercase tracking-[0.22em] text-[#FFFDF5] font-semibold shadow-2xl backdrop-blur-md transition-all duration-300 hover:bg-black/75 hover:scale-105 active:scale-95 cursor-pointer sm:bottom-10 sm:right-10"
            >
              Skip
            </button>
          )}
        </div>
      )}
    </section>
  );
};
