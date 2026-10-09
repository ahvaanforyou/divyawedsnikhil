import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  MapPin,
  Calendar,
  Clock,
  Navigation,
  Shirt,
  ArrowRight,
  X,
  Sparkles,
} from 'lucide-react';
import { assets } from '../data/assets';
import { weddingConfig } from '../wedding.config';
import { SpinningMandala, StandardGoldMandala } from './Ornaments';
import { RevealOnScroll } from './RevealOnScroll';

gsap.registerPlugin(ScrollTrigger);

interface EventItem {
  id?: string;
  name: string;
  tagline?: string;
  day: string;
  time: string;
  place: string;
  address?: string;
  mapsUrl: string;
  embedUrl?: string;
  note: string;
  dressCode?: string;
}

export const EventsSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeEvent, setActiveEvent] = useState<EventItem | null>(null);

  const events = weddingConfig.events as unknown as EventItem[];

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const cards = Array.from(el.querySelectorAll<HTMLElement>('.event-card'));

    const ctx = gsap.context(() => {
      cards.forEach((card, idx) => {
        const nextCard = cards[idx + 1];
        if (nextCard) {
          gsap.to(card, {
            scale: 0.94,
            ease: 'none',
            scrollTrigger: {
              trigger: nextCard,
              start: 'top 75%',
              end: 'top 18%',
              scrub: true,
            },
          });
        }
      });
    }, el);

    return () => ctx.revert();
  }, []);

  // Lock scroll when modal is open
  useEffect(() => {
    if (activeEvent) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') setActiveEvent(null);
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [activeEvent]);

  return (
    <section ref={sectionRef} id="events" className="relative overflow-clip px-4 sm:px-5 py-24 sm:py-28">
      <SpinningMandala className="-left-24 bottom-8 w-52 sm:w-72" />
      <img
        src={assets.mandalaGold}
        alt=""
        aria-hidden="true"
        loading="lazy"
        width={1024}
        height={1024}
        className="pointer-events-none absolute -right-24 top-10 w-72 opacity-25 animate-float-slow"
      />

      <div className="mx-auto max-w-5xl">
        <RevealOnScroll className="text-center">
          <p className="eyebrow flex items-center justify-center gap-2">
            <Sparkles className="size-3.5 text-gold-deep" />
            The Celebrations
            <Sparkles className="size-3.5 text-gold-deep" />
          </p>
          <h2 className="mt-4 font-display text-3xl min-[360px]:text-4xl sm:text-6xl">Order of events</h2>
          <p className="mx-auto mt-4 max-w-md text-xs sm:text-sm text-muted-foreground px-2">
            Tap any celebration card to view venue details, street address &amp; Google Maps directions
          </p>
          <div className="rule-gold mx-auto mt-6 w-28" />
        </RevealOnScroll>

        <div className="relative mt-14 pb-[2vh]">
          {events.map((event, idx) => (
            <div
              key={event.name + idx}
              className="event-card sticky top-[12vh] sm:top-[14vh] mb-[6vh] sm:mb-[8vh] origin-top will-change-transform"
              style={{ zIndex: idx + 1 }}
            >
              <article
                onClick={() => setActiveEvent(event)}
                className="paper-card group relative mx-auto min-h-[42vh] max-w-3xl overflow-hidden px-5 py-9 text-center sm:min-h-[46vh] sm:px-14 sm:py-14 cursor-pointer transition-all duration-300 hover:shadow-2xl hover:border-gold/60"
              >
                {/* Safe top-right background number (no text collision) */}
                <span className="absolute right-4 top-3 sm:right-7 sm:top-5 font-serif text-4xl sm:text-7xl text-gold/15 pointer-events-none select-none font-bold">
                  0{idx + 1}
                </span>

                <div className="flex items-center justify-center gap-2">
                  <span className="inline-flex size-5 sm:size-6 items-center justify-center rounded-full border border-gold/50 bg-paper font-title text-[9px] sm:text-xs font-semibold text-gold-deep shadow-xs">
                    0{idx + 1}
                  </span>
                  <p className="eyebrow !tracking-[0.25em] text-xs sm:text-sm">{event.day}</p>
                </div>

                <h3 className="mx-auto mt-5 max-w-xl font-display text-2xl min-[360px]:text-3xl sm:text-5xl leading-tight px-1 break-words">
                  {event.name}
                </h3>

                <div className="rule-gold mx-auto mt-5 sm:mt-6 w-24 sm:w-28" />

                <p className="mt-5 sm:mt-6 font-title text-lg sm:text-2xl text-foreground font-semibold">
                  {event.time}
                </p>

                <p className="mt-2 text-xs sm:text-sm text-muted-foreground flex items-center justify-center gap-1.5 px-2">
                  <MapPin className="size-4 text-gold-deep shrink-0" />
                  <span>{event.place}</span>
                </p>

                <p className="mx-auto mt-5 max-w-md text-[11px] sm:text-xs uppercase tracking-[0.18em] text-muted-foreground px-2">
                  {event.note}
                </p>

                {/* View Details Button on Each Card */}
                <div className="mt-7 sm:mt-8 flex justify-center">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveEvent(event);
                    }}
                    className="inline-flex items-center gap-2 rounded-full border border-gold/70 bg-paper/60 px-5 sm:px-6 py-2.5 font-title text-xs uppercase tracking-[0.22em] text-gold-deep transition-all duration-300 group-hover:bg-gold-deep group-hover:text-paper group-hover:scale-105 shadow-sm"
                  >
                    <span>View Details &amp; Map</span>
                    <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>

      {/* ── Expandable Event Details Modal with Real Google Maps Integration ── */}
      {activeEvent && (
        <div
          onClick={() => setActiveEvent(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-3 sm:p-6 backdrop-blur-sm transition-opacity duration-300"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="paper-card arch-top relative max-h-[92vh] w-full max-w-lg overflow-y-auto border-2 border-gold/70 p-5 sm:p-8 text-center shadow-2xl animate-fade-in"
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setActiveEvent(null)}
              aria-label="Close details"
              className="absolute right-3.5 top-3.5 z-20 flex size-8 sm:size-9 items-center justify-center rounded-full border border-gold/40 bg-paper/80 text-foreground transition-all hover:bg-gold-deep hover:text-paper hover:scale-105"
            >
              <X className="size-4 sm:size-5" />
            </button>

            {/* Top Standard Gold Mandala (standard solid color, NO shifting gradient) */}
            <div className="mx-auto -mt-1 mb-2.5 flex justify-center">
              <div className="rounded-full bg-paper p-1 border border-gold/40 shadow-sm">
                <StandardGoldMandala className="size-14 sm:size-16 animate-[spin_26s_linear_infinite]" color="#C5A059" />
              </div>
            </div>

            <span className="eyebrow !tracking-[0.25em]">Celebration Details</span>

            <h3 className="mt-2 font-display text-2xl sm:text-4xl text-foreground font-semibold px-2 break-words">
              {activeEvent.name}
            </h3>

            {activeEvent.tagline && (
              <p className="mt-1 font-title text-xs uppercase tracking-wider text-gold-deep">
                {activeEvent.tagline}
              </p>
            )}

            <div className="rule-gold mx-auto my-4 w-32" />

            {/* Date & Time Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-left">
              <div className="flex items-center gap-3 rounded-xl border border-gold/30 bg-paper/50 p-3">
                <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-gold-deep/15 text-gold-deep">
                  <Calendar className="size-4" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">
                    Date
                  </p>
                  <p className="font-title text-xs sm:text-sm font-semibold text-foreground">
                    {activeEvent.day}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-xl border border-gold/30 bg-paper/50 p-3">
                <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-gold-deep/15 text-gold-deep">
                  <Clock className="size-4" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">
                    Time
                  </p>
                  <p className="font-title text-xs sm:text-sm font-semibold text-foreground">
                    {activeEvent.time}
                  </p>
                </div>
              </div>
            </div>

            {/* Venue & Street Address */}
            <div className="mt-2.5 rounded-xl border border-gold/30 bg-paper/50 p-3.5 text-left">
              <div className="flex items-start gap-3">
                <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-gold-deep/15 text-gold-deep mt-0.5">
                  <MapPin className="size-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">
                    Venue &amp; Location
                  </p>
                  <p className="font-display text-base sm:text-lg font-semibold text-foreground mt-0.5 break-words">
                    {activeEvent.place}
                  </p>
                  {activeEvent.address && (
                    <p className="mt-1 text-xs text-muted-foreground leading-relaxed break-words">
                      {activeEvent.address}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Interactive Google Maps Integration Embed */}
            <div className="mt-3 overflow-hidden rounded-xl border border-gold/40 shadow-sm bg-muted/20">
              <iframe
                title={`Map location for ${activeEvent.place}`}
                src={
                  activeEvent.embedUrl ||
                  `https://maps.google.com/maps?q=${encodeURIComponent(
                    activeEvent.address || activeEvent.place
                  )}&output=embed`
                }
                width="100%"
                height="170"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            {/* Celebration Note */}
            <div className="mt-2.5 rounded-xl border border-gold/25 bg-gold/5 p-3 text-center">
              <p className="font-title text-xs italic leading-relaxed text-foreground">
                &ldquo;{activeEvent.note}&rdquo;
              </p>
            </div>

            {/* Dress Code (if present) */}
            {activeEvent.dressCode && (
              <div className="mt-2.5 flex items-center gap-3 rounded-xl border border-gold/30 bg-paper/50 p-3 text-left">
                <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-gold-deep/15 text-gold-deep">
                  <Shirt className="size-3.5" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">
                    Suggested Attire
                  </p>
                  <p className="font-title text-xs font-medium text-foreground">
                    {activeEvent.dressCode}
                  </p>
                </div>
              </div>
            )}

            {/* Direct Google Maps Action Button (Universal Google Maps Navigation Link) */}
            <a
              href={
                activeEvent.mapsUrl ||
                `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  activeEvent.address || activeEvent.place
                )}`
              }
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 sm:mt-5 flex w-full items-center justify-center gap-2 rounded-full border border-gold/70 bg-gold-deep py-3.5 px-6 font-title text-xs uppercase tracking-[0.24em] text-paper font-bold shadow-lg transition-all duration-300 hover:bg-gold-deep/90 hover:scale-[1.01] active:scale-[0.98]"
            >
              <Navigation className="size-4" />
              <span>Get Directions on Google Maps</span>
            </a>
          </div>
        </div>
      )}
    </section>
  );
};

