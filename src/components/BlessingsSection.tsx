import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Heart, Sparkles, Layers, List } from 'lucide-react';
import { Ornament, SpinningMandala } from './Ornaments';
import { RevealOnScroll } from './RevealOnScroll';
import { fetchBlessings, addBlessing, BlessingItem } from '../lib/supabase';
import { weddingConfig, weddingData } from '../wedding.config';

interface BlessingStackProps {
  items: BlessingItem[];
  currentIndex: number;
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
}

const BlessingCardDeck: React.FC<BlessingStackProps> = ({ items, currentIndex, setCurrentIndex }) => {
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (items.length < 2 || isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [items.length, isPaused, setCurrentIndex]);

  if (items.length === 0) {
    return (
      <div className="paper-card flex min-h-64 items-center justify-center p-6 text-center">
        <p className="font-display text-2xl text-muted-foreground">Be the first to bless the couple.</p>
      </div>
    );
  }

  const prevCard = () => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  const nextCard = () => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
  };

  return (
    <div
      className="relative mx-auto max-w-md"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="relative h-72 sm:h-64">
        {items.map((item, idx) => {
          const offset = (idx - currentIndex + items.length) % items.length;
          if (offset > 2) return null;

          return (
            <article
              key={item.id}
              className="paper-card absolute inset-x-0 top-0 px-7 py-8 text-center transition-all duration-700 ease-out shadow-sm"
              style={{
                transform: `translateY(${offset * 14}px) scale(${1 - offset * 0.05}) rotate(${
                  offset === 0 ? 0 : offset % 2 === 0 ? 1.4 : -1.4
                }deg)`,
                opacity: offset === 0 ? 1 : 0.55 - offset * 0.15,
                zIndex: 10 - offset,
              }}
            >
              <div className="flex items-center justify-center gap-1.5 text-gold-deep">
                <Heart className="size-3.5 fill-gold-deep/20" />
                <span className="eyebrow !tracking-[0.2em]">Aashirwad</span>
              </div>
              <p className="mt-4 font-display text-xl leading-snug sm:text-2xl line-clamp-4">
                “{item.message}”
              </p>
              <div className="rule-gold mx-auto mt-5 w-20" />
              <p className="mt-3 font-title text-sm tracking-widest uppercase text-gold-deep">
                {item.name}
                {item.city ? ` · ${item.city}` : ''}
              </p>
            </article>
          );
        })}
      </div>

      {/* Card Controls */}
      {items.length > 1 && (
        <div className="mt-6 flex items-center justify-between px-2">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={prevCard}
              aria-label="Previous blessing"
              className="flex size-8 items-center justify-center rounded-full border border-gold/40 text-gold-deep transition-colors hover:bg-gold/15"
            >
              <ChevronLeft className="size-4" />
            </button>
            <button
              type="button"
              onClick={nextCard}
              aria-label="Next blessing"
              className="flex size-8 items-center justify-center rounded-full border border-gold/40 text-gold-deep transition-colors hover:bg-gold/15"
            >
              <ChevronRight className="size-4" />
            </button>
          </div>
          <span className="font-mono text-xs text-muted-foreground">
            {currentIndex + 1} of {items.length}
          </span>
        </div>
      )}
    </div>
  );
};

const BlessingListView: React.FC<{ items: BlessingItem[] }> = ({ items }) => {
  if (items.length === 0) {
    return (
      <div className="paper-card flex min-h-64 items-center justify-center p-6 text-center">
        <p className="font-display text-2xl text-muted-foreground">Be the first to bless the couple.</p>
      </div>
    );
  }

  return (
    <div className="max-h-[380px] space-y-4 overflow-y-auto pr-2 scrollbar-thin">
      {items.map((item) => (
        <article key={item.id} className="paper-card px-5 py-4 text-left shadow-sm">
          <p className="font-display text-base leading-snug sm:text-lg">“{item.message}”</p>
          <div className="mt-2 flex items-center justify-between border-t border-gold/20 pt-2 text-xs">
            <span className="font-title uppercase tracking-wider text-gold-deep">
              {item.name}
              {item.city ? ` · ${item.city}` : ''}
            </span>
          </div>
        </article>
      ))}
    </div>
  );
};

export const BlessingsSection: React.FC = () => {
  const [items, setItems] = useState<BlessingItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'deck' | 'list'>('deck');

  const loadData = async () => {
    const list = await fetchBlessings();
    setItems(list);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) {
      setFeedback('Please enter your name and a heartfelt blessing.');
      return;
    }

    setIsSubmitting(true);
    setFeedback(null);
    try {
      const added = await addBlessing(name, city, message);
      // Optimistically update list so the new card appears immediately beside the form
      setItems((prev) => [added, ...prev.filter((b) => b.id !== added.id)]);
      setCurrentIndex(0);
      setName('');
      setCity('');
      setMessage('');
      setFeedback('Your blessing has been saved and added to the cards!');
    } catch (_) {
      setFeedback("That didn't go through. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass =
    'w-full border-b border-gold/40 bg-transparent px-1 py-3 font-sans text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-gold';

  const brideGroomText = `${weddingData.bride} & ${weddingData.groom}`;

  return (
    <section id="blessings" className="relative overflow-hidden px-5 py-24 sm:py-32">
      <SpinningMandala className="-right-20 top-1/2 w-48 sm:w-64" />
      <Ornament variant="gold" className="-left-8 top-14 w-36 rotate-6 sm:w-48" />
      <Ornament variant="leaf" className="-right-10 bottom-10 w-36 -rotate-6 sm:w-52" />

      <div className="relative mx-auto max-w-5xl">
        <RevealOnScroll className="text-center">
          <p className="eyebrow">{weddingConfig.blessings?.eyebrow || 'Aashirvadam'}</p>
          <h2 className="mt-4 font-display text-4xl sm:text-6xl">
            {weddingConfig.blessings?.title || 'Bless the couple'}
          </h2>
          <p className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-muted-foreground">
            {weddingConfig.blessings?.prompt ||
              `Leave a few words for ${brideGroomText}. Every blessing is saved and displayed here for all guests to cherish.`}
          </p>
        </RevealOnScroll>

        <div className="mt-16 grid gap-14 md:grid-cols-2 md:items-start md:gap-12">
          {/* Left Column: Blessing Form */}
          <RevealOnScroll>
            <form className="paper-card px-7 py-9 sm:px-9" onSubmit={handleSubmit}>
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="size-4 text-gold-deep" />
                <h3 className="font-title text-base uppercase tracking-wider text-gold-deep">Write a Blessing</h3>
              </div>

              <input
                className={inputClass}
                placeholder="Your name *"
                maxLength={60}
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <input
                className={`${inputClass} mt-6`}
                placeholder="Where you're writing from (optional)"
                maxLength={60}
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
              <textarea
                className={`${inputClass} mt-6 resize-none`}
                placeholder={`Your blessing for ${brideGroomText} *`}
                rows={4}
                maxLength={500}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-8 w-full border border-gold/60 py-4 text-[0.7rem] uppercase tracking-[0.3em] text-gold-deep transition-colors hover:bg-gold/10 disabled:opacity-50"
              >
                {isSubmitting ? 'Saving blessing...' : 'Send blessing'}
              </button>
              {feedback && (
                <p className="mt-4 text-center font-title text-xs tracking-wider text-maroon animate-fade-in">
                  {feedback}
                </p>
              )}
            </form>
          </RevealOnScroll>

          {/* Right Column: Displayed Beside the Form */}
          <RevealOnScroll delay={0.1}>
            <div className="space-y-4">
              {/* Header with counter and view toggle */}
              <div className="flex items-center justify-between px-1">
                <div className="flex items-center gap-2">
                  <Heart className="size-4 text-maroon fill-maroon/20" />
                  <span className="font-title text-xs uppercase tracking-wider text-muted-foreground">
                    {items.length} {items.length === 1 ? 'Blessing' : 'Blessings'} Received
                  </span>
                </div>
                <div className="flex items-center gap-1 rounded-full border border-gold/30 p-0.5">
                  <button
                    type="button"
                    onClick={() => setActiveTab('deck')}
                    className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-[0.65rem] uppercase tracking-wider transition-colors ${
                      activeTab === 'deck'
                        ? 'bg-gold-deep text-paper font-semibold'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <Layers className="size-3" />
                    Cards
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('list')}
                    className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-[0.65rem] uppercase tracking-wider transition-colors ${
                      activeTab === 'list'
                        ? 'bg-gold-deep text-paper font-semibold'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <List className="size-3" />
                    All ({items.length})
                  </button>
                </div>
              </div>

              {loading ? (
                <div className="paper-card flex min-h-64 items-center justify-center">
                  <p className="eyebrow animate-pulse">Gathering blessings...</p>
                </div>
              ) : activeTab === 'deck' ? (
                <BlessingCardDeck
                  items={items}
                  currentIndex={currentIndex}
                  setCurrentIndex={setCurrentIndex}
                />
              ) : (
                <BlessingListView items={items} />
              )}
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
};
