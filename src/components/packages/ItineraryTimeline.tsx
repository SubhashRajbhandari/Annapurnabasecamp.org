import React, { useState } from 'react';
import type { PackageTier, DayItinerary } from '../../types/trek';
import { TREK_PACKAGES } from '../../data/packages';
import { Calendar, Clock, ArrowRight, Bed, Utensils, HeartPulse, UserCheck, Sparkles } from 'lucide-react';

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
  const currentPackage = TREK_PACKAGES[activeTier];
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);

  const activeDay: DayItinerary = currentPackage.itinerary[selectedDayIndex] || currentPackage.itinerary[0];

  return (
    <section id="itineraries" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Title */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-50 border border-sky-200 text-sky-700 text-xs font-mono mb-3 shadow-xs font-bold">
          <Calendar className="w-4 h-4 text-sky-600" />
          <span>EXPEDITION TIMELINE // DAY-BY-DAY INTEL</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-slate-950 tracking-tight mb-4">
          FULL DAY-BY-DAY ITINERARY
        </h2>
        <p className="max-w-2xl mx-auto text-slate-600 text-sm sm:text-base font-medium">
          Showing complete schedule for <span className="text-sky-700 font-black">{currentPackage.title} ({currentPackage.starRating}★)</span>. 
          Accommodations, porter logistics, meal schedules, and medical safety pacing adapt specifically to your chosen tier.
        </p>

        {/* Tier Switcher inside Itinerary */}
        <div className="flex justify-center gap-2 mt-6">
          {(['3-star', '4-star', '5-star'] as PackageTier[]).map((t) => (
            <button
              key={t}
              onClick={() => {
                onSelectTier(t);
                setSelectedDayIndex(0);
              }}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all shadow-xs ${
                activeTier === t
                  ? 'bg-sky-500 text-white shadow-md shadow-sky-500/25 scale-[1.02]'
                  : 'bg-white text-slate-700 hover:text-slate-950 hover:bg-sky-50 border border-sky-200'
              }`}
            >
              {'★'.repeat(TREK_PACKAGES[t].starRating)} {TREK_PACKAGES[t].title}
            </button>
          ))}
        </div>
      </div>

      {/* Day Selector Ribbon */}
      <div className="relative mb-8">
        <div className="flex items-center gap-2.5 overflow-x-auto pb-4 scrollbar-thin">
          {currentPackage.itinerary.map((dayItem, idx) => {
            const isSelected = selectedDayIndex === idx;
            return (
              <button
                key={dayItem.day}
                onClick={() => setSelectedDayIndex(idx)}
                className={`shrink-0 px-4 py-3 rounded-2xl font-mono text-left transition-all duration-200 border ${
                  isSelected
                    ? 'bg-sky-500 border-sky-400 text-white shadow-lg shadow-sky-500/25 scale-[1.03]'
                    : 'bg-white border-sky-200/80 text-slate-700 hover:bg-sky-50 hover:border-sky-300'
                }`}
              >
                <div className="flex items-center justify-between gap-3 text-xs mb-1">
                  <span className={`font-black ${isSelected ? 'text-white' : 'text-sky-700'}`}>
                    DAY {dayItem.day.toString().padStart(2, '0')}
                  </span>
                  <span className={`text-[10px] font-semibold ${isSelected ? 'text-white/90' : 'text-slate-500'}`}>{dayItem.elevationGain}</span>
                </div>
                <div className={`text-xs font-black truncate max-w-[130px] ${isSelected ? 'text-white' : 'text-slate-900'}`}>
                  {dayItem.title.split(':')[0]}
                </div>
                <div className={`text-[10px] font-bold mt-0.5 ${isSelected ? 'text-white/80' : 'text-slate-500'}`}>
                  {dayItem.endAlt}m
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Selected Day Detail Card */}
      <div className="glass-panel hud-border rounded-3xl p-6 sm:p-10 bg-white/95 border border-sky-200 shadow-lg">
        {/* Top Meta Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-sky-100 pb-6 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-sky-700 mb-1 font-bold">
              <span className="px-2.5 py-0.5 rounded bg-sky-100 border border-sky-200 font-extrabold">
                DAY {activeDay.day} OF {currentPackage.durationDays}
              </span>
              <span>{currentPackage.title} Tier</span>
              <span className="text-slate-300">|</span>
              <span className="text-slate-600">{activeDay.terrainType}</span>
            </div>
            <h3 className="text-2xl sm:text-4xl font-black text-slate-950 tracking-tight">
              {activeDay.title}
            </h3>
            <div className="text-sm font-mono text-slate-700 mt-1 flex items-center gap-2">
              <span className="text-sky-700 font-extrabold">Route:</span> {activeDay.route}
            </div>
          </div>

          {/* Elevation Change Pill */}
          <div className="bg-sky-50 border border-sky-200 rounded-2xl px-5 py-3 text-right font-mono shadow-xs">
            <div className="text-xs text-slate-500 uppercase font-bold">Altitude Transition</div>
            <div className="text-lg sm:text-xl font-black text-slate-950 flex items-center gap-2 justify-end">
              <span>{activeDay.startAlt}m</span>
              <ArrowRight className="w-4 h-4 text-sky-600" />
              <span className="text-sky-700">{activeDay.endAlt}m</span>
            </div>
            <div className="text-xs font-black text-emerald-700">
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
              <div className="relative h-48 sm:h-64 rounded-2xl overflow-hidden mb-6 shadow-md border border-sky-200">
                <img
                  src="/images/abc-sanctuary.jpg"
                  alt="Annapurna Base Camp Sanctuary Cirque"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white font-mono">
                  <div>
                    <div className="text-xs font-black uppercase tracking-wider text-cyan-300">Sanctuary Goal Reached</div>
                    <div className="text-sm sm:text-base font-black">Annapurna Base Camp (4,130m / 13,550ft)</div>
                  </div>
                  <span className="text-xs px-2.5 py-1 rounded-full bg-sky-500 text-white font-black shadow">
                    360° Glacial Amphitheatre
                  </span>
                </div>
              </div>
            )}

            {/* Trail Metrics Quick Pills */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 font-mono text-xs">
              <div className="bg-sky-50/70 rounded-xl p-3 border border-sky-200 shadow-xs flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-sky-600" />
                <div>
                  <div className="text-slate-500 text-[10px] font-semibold">DURATION</div>
                  <div className="text-slate-950 font-black">{activeDay.hikingTime}</div>
                </div>
              </div>

              <div className="bg-amber-50/70 rounded-xl p-3 border border-amber-200 shadow-xs flex items-center gap-2.5">
                <Calendar className="w-4 h-4 text-amber-600" />
                <div>
                  <div className="text-slate-500 text-[10px] font-semibold">DISTANCE</div>
                  <div className="text-slate-950 font-black">{activeDay.distance}</div>
                </div>
              </div>

              <div className="bg-emerald-50/70 rounded-xl p-3 border border-emerald-200 shadow-xs flex items-center gap-2.5 col-span-2 sm:col-span-1">
                <Utensils className="w-4 h-4 text-emerald-600" />
                <div>
                  <div className="text-slate-500 text-[10px] font-semibold">MEAL PLAN</div>
                  <div className="text-slate-950 font-black truncate">{activeDay.meals}</div>
                </div>
              </div>
            </div>

            {/* Day Highlights */}
            <div className="bg-sky-50/50 rounded-2xl p-5 border border-sky-200">
              <h4 className="text-sm font-mono font-bold uppercase tracking-wider text-sky-900 mb-3 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-sky-600" />
                <span>Expedition Highlights & Scenic Milestones</span>
              </h4>
              <ul className="space-y-2.5">
                {activeDay.highlights.map((highlight, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-slate-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-500 mt-2 shrink-0" />
                    <span className="font-medium">{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Accommodation for this specific Tier */}
            <div className="bg-white rounded-2xl p-5 border border-sky-200 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-mono font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
                  <Bed className="w-4 h-4 text-amber-500" />
                  <span>Lodging & Rest Quality ({currentPackage.title} Tier)</span>
                </h4>
                <span className="text-xs font-mono text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200 font-black">
                  {'★'.repeat(activeDay.accommodation.starRating)} {activeDay.accommodation.category}
                </span>
              </div>

              <div className="text-lg font-black text-sky-800 mb-1">
                {activeDay.accommodation.name}
              </div>
              <div className="text-xs text-slate-600 mb-3">
                Room Specification: <strong className="text-slate-950 font-bold">{activeDay.accommodation.roomType}</strong> • Bathroom: <span className="text-emerald-700 font-black">{activeDay.accommodation.bathroomType}</span>
              </div>

              {/* Amenity tags */}
              <div className="flex flex-wrap gap-2">
                {activeDay.accommodation.amenities.map((amenity, i) => (
                  <span
                    key={i}
                    className="text-[11px] font-mono px-2.5 py-1 rounded-lg bg-sky-50 border border-sky-200 text-slate-800 font-semibold"
                  >
                    ✓ {amenity}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Col: Porter Logistics & Altitude Advice */}
          <div className="space-y-6">
            {/* Porter Duties for Day */}
            <div className="bg-white rounded-2xl p-5 border border-sky-200 font-mono shadow-sm">
              <div className="text-xs uppercase tracking-wider text-emerald-700 font-black mb-2 flex items-center gap-2">
                <UserCheck className="w-4 h-4 text-emerald-600" />
                <span>Porter & Baggage Protocol</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed font-sans font-medium">
                {activeDay.porterService}
              </p>
              <div className="mt-3 pt-3 border-t border-sky-100 text-[11px] text-slate-500 font-semibold">
                Standard Ratio: <strong className="text-slate-950 font-bold">{currentPackage.keySpecs.defaultPorterRatio}</strong>
              </div>
            </div>

            {/* Altitude Safety Advisory */}
            <div className="bg-amber-50/80 rounded-2xl p-5 border border-amber-200 font-mono shadow-sm">
              <div className="text-xs uppercase tracking-wider text-amber-800 font-black mb-2 flex items-center gap-2">
                <HeartPulse className="w-4 h-4 text-amber-600" />
                <span>Altitude & Acclimatization Advisory</span>
              </div>
              <p className="text-xs text-amber-900 leading-relaxed font-sans font-medium">
                {activeDay.altitudeSafetyTip}
              </p>
              <div className="mt-3 pt-3 border-t border-amber-200 text-[11px] text-amber-800 font-bold">
                Daily SpO2 saturation check mandatory before rest.
              </div>
            </div>

            {/* Book This Tier CTA Card */}
            <div className="glass-panel rounded-2xl p-5 border border-sky-300 text-center shadow-md bg-white">
              <div className="text-xs text-slate-500 mb-1 font-medium">Ready for this itinerary?</div>
              <div className="text-lg font-black text-slate-950 mb-3">
                {currentPackage.title} (${currentPackage.basePriceUsd} USD)
              </div>
              <button
                onClick={() => onBookTier(activeTier)}
                className="w-full py-3 rounded-xl font-bold text-xs uppercase tracking-wider bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-lg shadow-sky-500/25 hover:brightness-105 transition-all"
              >
                Configure This Trek
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
