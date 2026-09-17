import React, { useState, useRef, useEffect } from 'react';
import type { PackageTier } from '../../types/trek';
import { TREK_PACKAGES } from '../../data/packages';
import { 
  Calendar, 
  MapPin, 
  Bed, 
  Utensils, 
  HeartHandshake, 
  ShieldCheck, 
  ArrowRight, 
  ArrowLeft,
  Compass, 
  Footprints, 
  Clock,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

interface ItineraryTimelineProps {
  activeTier: PackageTier;
  onSelectTier: (tier: PackageTier) => void;
  onBookTier: (tier: PackageTier) => void;
}

export const ItineraryTimeline: React.FC<ItineraryTimelineProps> = ({
  activeTier,
  onSelectTier,
  onBookTier
}) => {
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const dayButtonRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const currentPackage = TREK_PACKAGES[activeTier];
  const activeDay = currentPackage.itinerary[selectedDayIndex] || currentPackage.itinerary[0];

  // Auto-scroll when selected day changes (e.g. clicking Day 6 near edge centers it and reveals Day 7)
  useEffect(() => {
    const container = scrollContainerRef.current;
    const targetButton = dayButtonRefs.current[selectedDayIndex];
    if (!container || !targetButton) return;

    const containerRect = container.getBoundingClientRect();
    const buttonRect = targetButton.getBoundingClientRect();

    // Position of button relative to the scroll container's content
    const currentScrollLeft = container.scrollLeft;
    const buttonRelativeLeft = buttonRect.left - containerRect.left + currentScrollLeft;
    
    // Center the target day button in the container so subsequent days are clearly visible
    const targetScrollLeft = buttonRelativeLeft - (container.clientWidth / 2) + (buttonRect.width / 2);

    container.scrollTo({
      left: Math.max(0, targetScrollLeft),
      behavior: 'smooth'
    });
  }, [selectedDayIndex, activeTier]);

  // Check scroll boundary visibility for left/right chevrons
  const checkScrollability = () => {
    const el = scrollContainerRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  };

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    checkScrollability();
    el.addEventListener('scroll', checkScrollability, { passive: true });
    window.addEventListener('resize', checkScrollability);
    return () => {
      el.removeEventListener('scroll', checkScrollability);
      window.removeEventListener('resize', checkScrollability);
    };
  }, [activeTier]);

  const handleScrollBy = (direction: 'left' | 'right') => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const scrollAmount = Math.max(260, Math.floor(el.clientWidth * 0.65));
    el.scrollBy({
      left: direction === 'right' ? scrollAmount : -scrollAmount,
      behavior: 'smooth'
    });
  };

  return (
    <section id="itineraries" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-50 border border-sky-200 text-sky-800 text-xs font-bold mb-3 shadow-xs">
          <Calendar className="w-4 h-4 text-sky-600" />
          <span>Day-by-Day Expedition Journey</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight mb-4">
          Detailed Trail Itinerary ({currentPackage.durationDays} Days)
        </h2>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          Walk through each step of the trek. Compare how daily accommodation, dining, porter care, and walking routes adjust across our 3-Star, 4-Star, and 5-Star tiers.
        </p>

        {/* Tier Switcher Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mt-8">
          {(['3-star', '4-star', '5-star'] as PackageTier[]).map((t) => (
            <button
              key={t}
              onClick={() => {
                onSelectTier(t);
                setSelectedDayIndex(0);
              }}
              className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer ${
                activeTier === t
                  ? 'bg-slate-900 text-white shadow-md'
                  : 'bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {'★'.repeat(TREK_PACKAGES[t].starRating)} {TREK_PACKAGES[t].title}
            </button>
          ))}
        </div>
      </div>

      {/* Day Selector Ribbon with Auto-Scroll & Controls */}
      <div className="relative mb-8 group">
        {/* Left Scroll Arrow */}
        {canScrollLeft && (
          <button
            type="button"
            onClick={() => handleScrollBy('left')}
            className="hidden sm:flex absolute -left-4 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white shadow-lg border border-slate-200 text-slate-700 hover:text-slate-950 hover:bg-slate-50 items-center justify-center transition-all cursor-pointer"
            aria-label="Scroll days left"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        )}

        {/* Right Scroll Arrow */}
        {canScrollRight && (
          <button
            type="button"
            onClick={() => handleScrollBy('right')}
            className="hidden sm:flex absolute -right-4 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white shadow-lg border border-slate-200 text-slate-700 hover:text-slate-950 hover:bg-slate-50 items-center justify-center transition-all cursor-pointer"
            aria-label="Scroll days right"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        )}

        <div
          ref={scrollContainerRef}
          className="flex items-center gap-3 overflow-x-auto pb-4 scroll-smooth [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-track]:bg-slate-100 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-thumb]:bg-slate-300 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-slate-400"
        >
          {currentPackage.itinerary.map((dayItem, idx) => {
            const isSelected = selectedDayIndex === idx;
            return (
              <button
                key={dayItem.day}
                ref={(el) => {
                  dayButtonRefs.current[idx] = el;
                }}
                onClick={() => setSelectedDayIndex(idx)}
                className={`shrink-0 px-4 py-3 rounded-2xl text-left transition-all duration-200 border cursor-pointer ${
                  isSelected
                    ? 'bg-slate-900 border-slate-900 text-white shadow-lg scale-[1.02]'
                    : 'bg-white border-slate-200 text-slate-700 hover:border-slate-400 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between gap-3 text-xs mb-1">
                  <span className={`font-bold ${isSelected ? 'text-amber-400' : 'text-sky-700'}`}>
                    DAY {dayItem.day.toString().padStart(2, '0')}
                  </span>
                  <span className={`text-[10px] font-semibold ${isSelected ? 'text-slate-300' : 'text-slate-500'}`}>
                    {dayItem.hikingTime}
                  </span>
                </div>
                <div className={`text-xs font-bold truncate max-w-[140px] ${isSelected ? 'text-white' : 'text-slate-900'}`}>
                  {dayItem.title.split(':')[0]}
                </div>
                <div className={`text-[10px] mt-1 ${isSelected ? 'text-slate-300' : 'text-slate-500'}`}>
                  {dayItem.endAlt}m altitude
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Selected Day Detail Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm">
        {/* Top Meta Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-6 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs text-sky-700 mb-1.5 font-bold">
              <span className="px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-sky-800 font-extrabold">
                DAY {activeDay.day} OF {currentPackage.durationDays}
              </span>
              <span>{currentPackage.title} Tier</span>
              <span className="text-slate-300">•</span>
              <span className="text-slate-600">{activeDay.terrainType || 'Subtropical Forest & Alpine Trail'}</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              {activeDay.title}
            </h3>
            <div className="text-xs sm:text-sm text-slate-600 mt-1 flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-sky-600 shrink-0" />
              <span><strong>Trail Route:</strong> {activeDay.route}</span>
            </div>
          </div>

          {/* Elevation Transition Pill */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3 text-right shadow-xs">
            <div className="text-[11px] text-slate-500 uppercase font-bold">Altitude Profile</div>
            <div className="text-lg sm:text-xl font-black text-slate-900 flex items-center gap-2 justify-end">
              <span>{activeDay.startAlt}m</span>
              <ArrowRight className="w-4 h-4 text-sky-600" />
              <span className="text-sky-700">{activeDay.endAlt}m</span>
            </div>
            <div className="text-xs font-bold text-emerald-700">
              Shift: {activeDay.elevationGain}
            </div>
          </div>
        </div>

        {/* 2-Column Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left 2 Cols: Highlights & Accommodation */}
          <div className="lg:col-span-2 space-y-6">
            {/* Summit Day Photo Banner */}
            {activeDay.day === 7 && (
              <div className="relative h-56 sm:h-72 rounded-3xl overflow-hidden mb-6 shadow-md border border-slate-200">
                <img
                  src="/images/abc-sanctuary.webp"
                  alt="Annapurna Base Camp Sanctuary Cirque"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/20" />
                <div className="absolute bottom-4 left-5 right-5 flex items-center justify-between text-white">
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-amber-300">Sanctuary Goal Reached</div>
                    <div className="text-lg sm:text-xl font-black">Annapurna Base Camp (4,130m / 13,550ft)</div>
                  </div>
                  <span className="text-xs px-3 py-1 rounded-full bg-sky-500 text-white font-bold shadow">
                    360° Mountain Cirque
                  </span>
                </div>
              </div>
            )}

            {/* Trekking Highlights */}
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200/80">
              <h4 className="text-sm font-bold uppercase tracking-wider text-slate-900 mb-3 flex items-center gap-2">
                <Compass className="w-4 h-4 text-sky-600" />
                <span>Today's Highlights & Trail Features</span>
              </h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-slate-700">
                {activeDay.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-600 mt-1.5 shrink-0" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Accommodation & Meals */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200/80">
                <div className="flex items-center gap-2 text-slate-900 font-bold mb-2">
                  <Bed className="w-4 h-4 text-sky-600" />
                  <span>Overnight Accommodation</span>
                </div>
                <div className="font-extrabold text-sm text-slate-900 mb-1">
                  {activeDay.accommodation.name}
                </div>
                <div className="text-slate-600 space-y-1">
                  <div>• Room: {activeDay.accommodation.roomType}</div>
                  <div>• Category: {activeDay.accommodation.category}</div>
                  <div>• Bath: {activeDay.accommodation.bathroomType}</div>
                </div>
              </div>

              <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200/80">
                <div className="flex items-center gap-2 text-slate-900 font-bold mb-2">
                  <Utensils className="w-4 h-4 text-amber-600" />
                  <span>Dining & Nutrition</span>
                </div>
                <div className="font-extrabold text-sm text-slate-900 mb-1">
                  {activeDay.meals}
                </div>
                <p className="text-slate-600 leading-relaxed">
                  Hydration stations & freshly prepared Himalayan mountain cuisine (Dal Bhat, warm soups, pasta, porridge).
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Key Logistics & Altitude Tips */}
          <div className="space-y-4">
            {/* Trail Metrics Pill Card */}
            <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200/80 space-y-3 text-xs">
              <h4 className="font-bold text-slate-900 uppercase tracking-wider mb-2">
                Trekker Distance & Timing
              </h4>
              <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                <span className="text-slate-500 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-sky-600" /> Walking Hours:
                </span>
                <span className="font-bold text-slate-900">{activeDay.hikingTime}</span>
              </div>
              <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                <span className="text-slate-500 flex items-center gap-1.5">
                  <Footprints className="w-3.5 h-3.5 text-emerald-600" /> Distance:
                </span>
                <span className="font-bold text-slate-900">{activeDay.distance}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500 flex items-center gap-1.5">
                  <HeartHandshake className="w-3.5 h-3.5 text-amber-600" /> Porter Service:
                </span>
                <span className="font-bold text-slate-900">{activeDay.porterService}</span>
              </div>
            </div>

            {/* Altitude & Acclimatization Tip */}
            <div className="bg-emerald-50 rounded-2xl p-5 border border-emerald-200 text-xs">
              <div className="flex items-center gap-1.5 font-bold text-emerald-800 mb-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Mountain Acclimatization Tip</span>
              </div>
              <p className="text-emerald-900 leading-relaxed">
                {activeDay.altitudeSafetyTip}
              </p>
            </div>

            {/* Book This Tier CTA */}
            <div className="pt-2">
              <button
                onClick={() => onBookTier(activeTier)}
                className="w-full py-3.5 rounded-2xl font-bold text-xs uppercase tracking-wider bg-slate-900 text-white hover:bg-slate-800 shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Book This {currentPackage.title} Journey</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Day-by-Day Pagination Controls (Auto-scrolls the ribbon when advancing) */}
        <div className="flex items-center justify-between border-t border-slate-100 pt-6 mt-8">
          <button
            type="button"
            disabled={selectedDayIndex === 0}
            onClick={() => setSelectedDayIndex((prev) => Math.max(0, prev - 1))}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              selectedDayIndex === 0
                ? 'opacity-40 cursor-not-allowed text-slate-400'
                : 'text-slate-700 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 border border-slate-200 cursor-pointer'
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Previous Day (Day {selectedDayIndex > 0 ? selectedDayIndex.toString().padStart(2, '0') : '01'})</span>
          </button>

          <div className="text-xs font-bold text-slate-500">
            Day {selectedDayIndex + 1} of {currentPackage.itinerary.length}
          </div>

          <button
            type="button"
            disabled={selectedDayIndex === currentPackage.itinerary.length - 1}
            onClick={() => setSelectedDayIndex((prev) => Math.min(currentPackage.itinerary.length - 1, prev + 1))}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              selectedDayIndex === currentPackage.itinerary.length - 1
                ? 'opacity-40 cursor-not-allowed text-slate-400'
                : 'text-sky-700 hover:text-sky-950 bg-sky-50 hover:bg-sky-100 border border-sky-200 cursor-pointer'
            }`}
          >
            <span>Next Day (Day {selectedDayIndex < currentPackage.itinerary.length - 1 ? (selectedDayIndex + 2).toString().padStart(2, '0') : currentPackage.itinerary.length})</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
