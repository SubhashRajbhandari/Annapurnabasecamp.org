import React, { useState } from 'react';
import type { PackageTier } from '../../types/trek';
import { TREK_PACKAGES } from '../../data/packages';
import { 
  Sparkles, 
  ArrowRight, 
  BedDouble, 
  UserCheck, 
  ShieldCheck, 
  PlaneTakeoff, 
  Coffee, 
  Clock, 
  Award, 
  Check, 
  CheckCircle2, 
  Radio, 
  LayoutGrid, 
  Eye 
} from 'lucide-react';

interface TierSelectorProps {
  activeTier: PackageTier;
  onSelectTier: (tier: PackageTier) => void;
  onBookTier: (tier: PackageTier) => void;
}

const getTierStyle = (tier: PackageTier, isSelected: boolean) => {
  switch (tier) {
    case '5-star':
      return {
        accent: 'amber',
        text: 'text-amber-800',
        badgeBg: 'bg-amber-500 text-slate-950',
        activePill: 'bg-gradient-to-r from-amber-600 via-amber-700 to-amber-800 text-white shadow-lg ring-2 ring-amber-400/50',
        cardBorder: isSelected
          ? 'border-2 border-amber-500 ring-4 ring-amber-400/35 shadow-2xl shadow-amber-950/20 lg:-translate-y-3.5 lg:scale-[1.02] z-20 bg-gradient-to-b from-amber-50/30 via-white to-white'
          : 'border border-slate-200/90 hover:border-amber-300 opacity-75 hover:opacity-100 scale-[0.98] lg:scale-100 bg-white',
        ribbonBg: 'bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 text-white',
        ribbonText: '👑 ACTIVE SELECTION • 5★ HIMALAYAN SANCTUARY LUXURY',
        priceBg: isSelected ? 'bg-amber-50/90 border-amber-300/80 text-amber-950' : 'bg-slate-50 border-slate-200/80',
        btnBg: isSelected
          ? 'bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 text-white shadow-xl shadow-amber-600/30 hover:brightness-105 active:scale-98'
          : 'bg-white text-slate-800 border border-slate-300 hover:border-amber-500 hover:bg-amber-50/50',
        radioPill: isSelected ? 'bg-amber-500 text-slate-950 font-black' : 'bg-black/60 text-white/90',
        tableHeader: isSelected ? 'bg-amber-100 text-amber-950 border-x-2 border-amber-400 font-black shadow-xs' : 'text-amber-800',
        tableCell: isSelected ? 'bg-amber-50/80 font-bold text-slate-950 border-x-2 border-amber-300' : 'text-slate-700',
      };
    case '4-star':
      return {
        accent: 'sky',
        text: 'text-sky-700',
        badgeBg: 'bg-sky-500 text-white',
        activePill: 'bg-gradient-to-r from-sky-600 via-sky-700 to-blue-800 text-white shadow-lg ring-2 ring-sky-400/50',
        cardBorder: isSelected
          ? 'border-2 border-sky-500 ring-4 ring-sky-400/35 shadow-2xl shadow-sky-950/20 lg:-translate-y-3.5 lg:scale-[1.02] z-20 bg-gradient-to-b from-sky-50/30 via-white to-white'
          : 'border border-slate-200/90 hover:border-sky-300 opacity-75 hover:opacity-100 scale-[0.98] lg:scale-100 bg-white',
        ribbonBg: 'bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-700 text-white',
        ribbonText: '★ ACTIVE SELECTION • 4★ MOUNTAIN PREMIER (MOST POPULAR)',
        priceBg: isSelected ? 'bg-sky-50/90 border-sky-300/80 text-sky-950' : 'bg-slate-50 border-slate-200/80',
        btnBg: isSelected
          ? 'bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-700 text-white shadow-xl shadow-sky-600/30 hover:brightness-105 active:scale-98'
          : 'bg-white text-slate-800 border border-slate-300 hover:border-sky-500 hover:bg-sky-50/50',
        radioPill: isSelected ? 'bg-sky-500 text-white font-black' : 'bg-black/60 text-white/90',
        tableHeader: isSelected ? 'bg-sky-100 text-sky-950 border-x-2 border-sky-400 font-black shadow-xs' : 'text-blue-800',
        tableCell: isSelected ? 'bg-sky-50/80 font-bold text-slate-950 border-x-2 border-sky-300' : 'text-slate-700',
      };
    case '3-star':
    default:
      return {
        accent: 'emerald',
        text: 'text-emerald-700',
        badgeBg: 'bg-emerald-600 text-white',
        activePill: 'bg-gradient-to-r from-emerald-600 via-emerald-700 to-teal-800 text-white shadow-lg ring-2 ring-emerald-400/50',
        cardBorder: isSelected
          ? 'border-2 border-emerald-500 ring-4 ring-emerald-400/35 shadow-2xl shadow-emerald-950/20 lg:-translate-y-3.5 lg:scale-[1.02] z-20 bg-gradient-to-b from-emerald-50/30 via-white to-white'
          : 'border border-slate-200/90 hover:border-emerald-300 opacity-75 hover:opacity-100 scale-[0.98] lg:scale-100 bg-white',
        ribbonBg: 'bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 text-white',
        ribbonText: '✓ ACTIVE SELECTION • 3★ ALPINE EXPLORER (CLASSIC)',
        priceBg: isSelected ? 'bg-emerald-50/90 border-emerald-300/80 text-emerald-950' : 'bg-slate-50 border-slate-200/80',
        btnBg: isSelected
          ? 'bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 text-white shadow-xl shadow-emerald-600/30 hover:brightness-105 active:scale-98'
          : 'bg-white text-slate-800 border border-slate-300 hover:border-emerald-500 hover:bg-emerald-50/50',
        radioPill: isSelected ? 'bg-emerald-600 text-white font-black' : 'bg-black/60 text-white/90',
        tableHeader: isSelected ? 'bg-emerald-100 text-emerald-950 border-x-2 border-emerald-400 font-black shadow-xs' : 'text-sky-800',
        tableCell: isSelected ? 'bg-emerald-50/80 font-bold text-slate-950 border-x-2 border-emerald-300' : 'text-slate-700',
      };
  }
};

export const TierSelector: React.FC<TierSelectorProps> = ({
  activeTier,
  onSelectTier,
  onBookTier
}) => {
  const tiers: PackageTier[] = ['3-star', '4-star', '5-star'];
  const [viewMode, setViewMode] = useState<'grid' | 'focus'>('grid');
  const activePkg = TREK_PACKAGES[activeTier];

  return (
    <section id="packages" className="py-14 sm:py-20 px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
        <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold mb-3 shadow-xs">
          <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
          <span>Handcrafted Himalayan Journey Tiers</span>
        </div>
        <h2 className="text-2xl xs:text-3xl sm:text-5xl font-black text-slate-900 tracking-tight mb-3 sm:mb-4">
          Choose Your Expedition Experience
        </h2>
        <p className="text-slate-600 text-xs sm:text-base leading-relaxed px-2">
          Every trekker has distinct comfort and logistical desires. Compare our authentic 3-Star Alpine Explorer, the popular 4-Star Mountain Premier with 1:1 dedicated porters, and the 5-Star Himalayan Sanctuary Luxury featuring VIP helicopter returns.
        </p>

        {/* Tier Switcher Pills with Distinct Color Themes */}
        <div className="flex max-w-full overflow-x-auto p-1.5 rounded-2xl bg-white border border-slate-200 mt-6 sm:mt-8 shadow-sm justify-start sm:justify-center gap-1.5">
          {tiers.map((tier) => {
            const pkg = TREK_PACKAGES[tier];
            const isActive = activeTier === tier;
            const style = getTierStyle(tier, isActive);

            return (
              <button
                key={tier}
                onClick={() => onSelectTier(tier)}
                className={`px-3.5 sm:px-5 py-2.5 rounded-xl font-black text-xs sm:text-sm transition-all duration-200 flex items-center gap-2 cursor-pointer shrink-0 whitespace-nowrap ${
                  isActive
                    ? style.activePill
                    : 'text-slate-700 hover:text-slate-950 hover:bg-slate-100 border border-transparent'
                }`}
                aria-pressed={isActive}
              >
                <span className={isActive ? 'text-amber-300' : 'text-amber-500'}>
                  {'★'.repeat(pkg.starRating)}
                </span>
                <span>{pkg.title}</span>
                <span className={`text-[11px] px-1.5 py-0.5 rounded font-bold ${
                  isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
                }`}>
                  ${pkg.basePriceUsd}
                </span>
                {isActive && <Check className="w-3.5 h-3.5 text-white shrink-0 ml-0.5" />}
              </button>
            );
          })}
        </div>

        {/* View Mode Toggle: Compare All vs Focus View */}
        <div className="flex items-center justify-center gap-1.5 p-1 bg-slate-100/90 rounded-xl border border-slate-200 max-w-fit mx-auto mt-4">
          <button
            type="button"
            onClick={() => setViewMode('grid')}
            className={`px-3 sm:px-4 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              viewMode === 'grid'
                ? 'bg-white text-slate-900 shadow-xs border border-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5 text-slate-600" />
            <span>Compare All 3 Tiers</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode('focus')}
            className={`px-3 sm:px-4 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              viewMode === 'focus'
                ? 'bg-white text-slate-900 shadow-xs border border-slate-200'
                : 'text-slate-600 hover:text-slate-950'
            }`}
          >
            <Eye className="w-3.5 h-3.5 text-sky-600" />
            <span>Focus View: {activePkg.title} ({activePkg.starRating}★)</span>
          </button>
        </div>
      </div>

      {/* VIEW MODE 1: SIDE-BY-SIDE 3-CARD GRID WITH DRAMATIC SELECTION HIGHLIGHT */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-10 items-stretch">
          {tiers.map((tier) => {
            const pkg = TREK_PACKAGES[tier];
            const isSelected = activeTier === tier;
            const isLuxury = tier === '5-star';
            const isPremier = tier === '4-star';
            const style = getTierStyle(tier, isSelected);

            return (
              <div
                key={tier}
                onClick={() => onSelectTier(tier)}
                className={`luxury-card cursor-pointer overflow-hidden flex flex-col justify-between group rounded-3xl transition-all duration-300 relative ${
                  style.cardBorder
                }`}
              >
                <div>
                  {/* Distinctive Top Status Ribbon */}
                  {isSelected ? (
                    <div className={`py-2 px-3 text-center text-[11px] font-black uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-sm ${style.ribbonBg}`}>
                      <Check className="w-4 h-4 shrink-0" />
                      <span>{style.ribbonText}</span>
                    </div>
                  ) : (
                    <div className="py-1.5 px-3 text-center text-[10px] font-bold text-slate-600 bg-slate-100/90 border-b border-slate-200 flex items-center justify-center gap-1 hover:text-slate-900">
                      <span>Click to select {pkg.title}</span>
                    </div>
                  )}

                  {/* Image Header with Pills */}
                  {pkg.image && (
                    <div className="relative h-56 overflow-hidden">
                      <img
                        src={pkg.image}
                        alt={pkg.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-transparent to-black/25" />
                      
                      {/* Top Badges */}
                      <div className="absolute top-3.5 left-3.5 flex flex-wrap gap-1.5">
                        <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-slate-950/85 text-white backdrop-blur-md flex items-center gap-1">
                          <Clock className="w-3 h-3 text-sky-400" />
                          {pkg.durationDays} Days / {pkg.durationDays - 1} Nights
                        </span>
                        <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold shadow-sm ${
                          isLuxury
                            ? 'bg-amber-500 text-slate-950'
                            : isPremier
                            ? 'bg-sky-500 text-white'
                            : 'bg-emerald-600 text-white'
                        }`}>
                          {pkg.heroBadge}
                        </span>
                      </div>

                      {/* Top Right Active Radio Indicator */}
                      <div className="absolute top-3.5 right-3.5">
                        {isSelected ? (
                          <span className="px-2.5 py-1 rounded-full text-[11px] font-black flex items-center gap-1 shadow-lg bg-white text-slate-950 border border-white">
                            <CheckCircle2 className="w-3.5 h-3.5 text-sky-600" />
                            <span>Selected</span>
                          </span>
                        ) : (
                          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold flex items-center gap-1 bg-black/60 text-white/90 backdrop-blur-sm group-hover:bg-black/80 transition-colors">
                            <Radio className="w-3 h-3 text-white/60" />
                            <span>Select</span>
                          </span>
                        )}
                      </div>

                      {/* Bottom Star & Rating */}
                      <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white">
                        <div className="flex items-center text-amber-400 text-sm font-bold">
                          {'★'.repeat(pkg.starRating)}
                          <span className="text-white text-xs ml-1 font-semibold">({pkg.starRating}.0 Rating)</span>
                        </div>
                        <span className="text-xs font-bold bg-white/20 backdrop-blur-md px-2.5 py-0.5 rounded-full">
                          Max 4,130m
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Card Content */}
                  <div className="p-5 sm:p-6">
                    {/* Category & Title */}
                    <div className="flex items-center gap-1.5 text-[11px] font-black uppercase tracking-wider mb-1">
                      <Award className={`w-3.5 h-3.5 ${style.text}`} />
                      <span className={style.text}>{pkg.subtitle}</span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-black text-slate-900 mb-2 group-hover:text-sky-600 transition-colors">
                      {pkg.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed min-h-[44px]">
                      {pkg.tagline}
                    </p>

                    {/* Price Tag Box */}
                    <div className={`rounded-2xl p-3.5 sm:p-4 border my-4 sm:my-5 flex items-baseline justify-between transition-colors ${style.priceBg}`}>
                      <div>
                        <div className="flex items-center gap-1.5 mb-0.5">
                          <span className="text-[10px] text-slate-500 font-bold uppercase">Starting From</span>
                          {isSelected && (
                            <span className="text-[9px] font-black uppercase tracking-wider px-1.5 py-0.2 rounded bg-white text-slate-800 border border-slate-200">
                              Active
                            </span>
                          )}
                        </div>
                        <div className="flex items-baseline gap-1">
                          <span className="text-2xl sm:text-3xl font-black text-slate-900">${pkg.basePriceUsd}</span>
                          <span className="text-xs font-medium text-slate-500">USD / trekker</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-black text-emerald-700 block">All Permits Included</span>
                        <span className="text-[10px] text-slate-500 font-medium">Approx. NPR {pkg.basePriceNpr.toLocaleString()}</span>
                      </div>
                    </div>

                    {/* Key Highlights */}
                    <div className="space-y-2 mb-4 sm:mb-6 text-xs text-slate-700">
                      <div className="flex items-start gap-2.5">
                        <BedDouble className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                        <span>
                          <strong className="text-slate-900">City Stay:</strong> {pkg.keySpecs.hotelKathmandu}
                        </span>
                      </div>

                      <div className="flex items-start gap-2.5">
                        <UserCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>
                          <strong className="text-slate-900">Porters:</strong> {pkg.keySpecs.defaultPorterRatio}
                        </span>
                      </div>

                      <div className="flex items-start gap-2.5">
                        <ShieldCheck className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                        <span>
                          <strong className="text-slate-900">Trail Lodging:</strong> {pkg.keySpecs.trailAccommodation}
                        </span>
                      </div>

                      <div className="flex items-start gap-2.5">
                        <Coffee className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                        <span>
                          <strong className="text-slate-900">Dining Plan:</strong> {pkg.keySpecs.diningPlan}
                        </span>
                      </div>

                      {isLuxury && (
                        <div className="flex items-start gap-2 text-xs text-amber-950 font-bold bg-amber-50 p-2.5 rounded-xl border border-amber-200 mt-2">
                          <PlaneTakeoff className="w-4 h-4 shrink-0 mt-0.5 text-amber-600" />
                          <span>Direct VIP Helicopter flight from ABC back to Pokhara!</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Action Button */}
                <div className="p-5 sm:p-6 pt-0">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectTier(tier);
                      onBookTier(tier);
                    }}
                    className={`w-full py-3.5 rounded-2xl font-black text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      style.btnBg
                    }`}
                  >
                    {isSelected ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Book Selected {pkg.title}</span>
                      </>
                    ) : (
                      <>
                        <span>Select & Reserve {pkg.title}</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* VIEW MODE 2: DEDICATED FOCUS SHOWCASE OF CURRENTLY SELECTED TIER */}
      {viewMode === 'focus' && (
        <div className="bg-white rounded-3xl p-5 sm:p-8 border-2 border-slate-200 shadow-xl mb-10 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left: Big Hero Image & Visual Highlights */}
            <div className="lg:col-span-5 relative rounded-2xl overflow-hidden shadow-lg h-72 sm:h-96">
              <img
                src={activePkg.image}
                alt={activePkg.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-black/30" />
              
              <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-950/85 text-white backdrop-blur-md flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-sky-400" />
                  {activePkg.durationDays} Days / {activePkg.durationDays - 1} Nights
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-black bg-amber-500 text-slate-950 shadow-sm">
                  {activePkg.heroBadge}
                </span>
              </div>

              <div className="absolute bottom-4 left-4 right-4 text-white">
                <div className="flex items-center text-amber-400 text-base font-black mb-1">
                  {'★'.repeat(activePkg.starRating)}
                  <span className="text-white text-xs ml-2 font-semibold">({activePkg.starRating}.0 Rating)</span>
                </div>
                <div className="text-xl sm:text-2xl font-black text-white">{activePkg.title}</div>
                <div className="text-xs text-slate-200">{activePkg.subtitle}</div>
              </div>
            </div>

            {/* Right: Detailed Breakdown & Booking */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <span className="text-[11px] font-black uppercase tracking-wider text-sky-700 bg-sky-50 px-2.5 py-0.5 rounded-md border border-sky-200">
                    Currently Selected Plan
                  </span>
                  <span className="text-xs font-bold text-slate-500">
                    Max Elevation: 4,130m / 13,550ft
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mb-2">
                  {activePkg.title} Expedition
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-5">
                  {activePkg.overview}
                </p>

                {/* Price Breakdown Banner */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-wrap items-baseline justify-between gap-3 mb-6">
                  <div>
                    <span className="text-[10px] font-black uppercase text-slate-500 block">Base Expedition Rate</span>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-3xl sm:text-4xl font-black text-slate-900">${activePkg.basePriceUsd}</span>
                      <span className="text-xs font-semibold text-slate-600">USD per trekker (approx. NPR {activePkg.basePriceNpr.toLocaleString()})</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-black text-emerald-700 block">✓ All ACAP & TIMS Permits</span>
                    <span className="text-xs text-slate-600 font-medium">Licensed Sherpa Leader Included</span>
                  </div>
                </div>

                {/* Inclusions Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-700 mb-6">
                  <div className="p-3 rounded-xl bg-slate-50/80 border border-slate-200/80">
                    <div className="font-bold text-slate-900 mb-1 flex items-center gap-1.5">
                      <BedDouble className="w-3.5 h-3.5 text-sky-600" />
                      <span>City Lodging</span>
                    </div>
                    <div>{activePkg.keySpecs.hotelKathmandu} & Pokhara ({activePkg.keySpecs.hotelPokhara})</div>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50/80 border border-slate-200/80">
                    <div className="font-bold text-slate-900 mb-1 flex items-center gap-1.5">
                      <UserCheck className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Porter Logistics</span>
                    </div>
                    <div>{activePkg.keySpecs.defaultPorterRatio}</div>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50/80 border border-slate-200/80">
                    <div className="font-bold text-slate-900 mb-1 flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
                      <span>Trail Accommodations</span>
                    </div>
                    <div>{activePkg.keySpecs.trailAccommodation}</div>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50/80 border border-slate-200/80">
                    <div className="font-bold text-slate-900 mb-1 flex items-center gap-1.5">
                      <Coffee className="w-3.5 h-3.5 text-sky-600" />
                      <span>Dining & Wellness</span>
                    </div>
                    <div>{activePkg.keySpecs.diningPlan}</div>
                  </div>
                </div>
              </div>

              {/* Focus View Action Bar */}
              <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                <button
                  onClick={() => onBookTier(activeTier)}
                  className="w-full sm:w-auto py-3.5 px-8 rounded-2xl font-black text-xs sm:text-sm uppercase tracking-wider bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-700 text-white shadow-xl shadow-sky-600/30 hover:brightness-105 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Reserve {activePkg.title} Now</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('grid')}
                  className="w-full sm:w-auto py-3.5 px-6 rounded-2xl font-bold text-xs sm:text-sm text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <LayoutGrid className="w-4 h-4" />
                  <span>Compare with Other Tiers</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Selected Tier Sticky / Dynamic Inclusions Bar */}
      <div className={`p-4 sm:p-5 rounded-2xl border transition-all mb-12 sm:mb-14 flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm ${
        activeTier === '5-star'
          ? 'bg-amber-50/80 border-amber-300 text-amber-950'
          : activeTier === '4-star'
          ? 'bg-sky-50/80 border-sky-300 text-sky-950'
          : 'bg-emerald-50/80 border-emerald-300 text-emerald-950'
      }`}>
        <div className="flex items-center gap-3.5 w-full md:w-auto">
          <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 shadow-sm ${
            activeTier === '5-star'
              ? 'bg-amber-500 text-slate-950'
              : activeTier === '4-star'
              ? 'bg-sky-600 text-white'
              : 'bg-emerald-600 text-white'
          }`}>
            <Award className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/90 border border-black/10">
                Active Selection
              </span>
              <span className="text-sm sm:text-base font-black">
                {activePkg.starRating}★ {activePkg.title} (${activePkg.basePriceUsd} USD)
              </span>
            </div>
            <p className="text-xs text-slate-700 mt-0.5 line-clamp-1">
              {activePkg.keySpecs.defaultPorterRatio} • {activePkg.keySpecs.hotelKathmandu} • {activePkg.keySpecs.trailAccommodation}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto justify-end">
          <div className="text-right hidden sm:block">
            <div className="text-base font-black text-slate-900">${activePkg.basePriceUsd} USD</div>
            <div className="text-[10px] text-slate-500 font-medium">All Permits Included</div>
          </div>
          <button
            onClick={() => onBookTier(activeTier)}
            className={`w-full sm:w-auto px-5 py-2.5 rounded-xl font-black text-xs uppercase tracking-wider text-white shadow-md cursor-pointer shrink-0 transition-transform active:scale-95 ${
              activeTier === '5-star'
                ? 'bg-amber-600 hover:bg-amber-500'
                : activeTier === '4-star'
                ? 'bg-sky-600 hover:bg-sky-500'
                : 'bg-emerald-600 hover:bg-emerald-500'
            }`}
          >
            Reserve Selected Plan →
          </button>
        </div>
      </div>

      {/* Clean Feature Comparison Matrix with Real-Time Active Column Highlighting */}
      <div className="bg-white rounded-3xl p-5 sm:p-8 md:p-10 border border-slate-200 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
          <div>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 mb-1">
              Side-by-Side Logistics & Inclusions Comparison
            </h3>
            <p className="text-slate-600 text-xs sm:text-sm">
              Clear comparison across hotel accommodation grades, porter ratios, medical safety equipment, and mountain transfers. Active selection column is highlighted below.
            </p>
          </div>
          <div className="text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-sky-800 shrink-0 self-start sm:self-auto">
            Highlighted: {activePkg.title}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm border-collapse min-w-[620px]">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-slate-800">
                <th className="py-3 px-4 font-bold text-slate-900 w-[28%]">Logistics Feature</th>
                
                {/* 3-Star Header */}
                <th 
                  onClick={() => onSelectTier('3-star')}
                  className={`py-3 px-4 font-bold cursor-pointer transition-colors w-[24%] ${
                    getTierStyle('3-star', activeTier === '3-star').tableHeader
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>3★ Alpine Explorer</span>
                    {activeTier === '3-star' && (
                      <span className="text-[9px] bg-emerald-700 text-white px-1.5 py-0.5 rounded font-black">
                        ACTIVE
                      </span>
                    )}
                  </div>
                </th>

                {/* 4-Star Header */}
                <th 
                  onClick={() => onSelectTier('4-star')}
                  className={`py-3 px-4 font-bold cursor-pointer transition-colors w-[24%] ${
                    getTierStyle('4-star', activeTier === '4-star').tableHeader
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>4★ Mountain Premier</span>
                    {activeTier === '4-star' && (
                      <span className="text-[9px] bg-sky-700 text-white px-1.5 py-0.5 rounded font-black">
                        ACTIVE
                      </span>
                    )}
                  </div>
                </th>

                {/* 5-Star Header */}
                <th 
                  onClick={() => onSelectTier('5-star')}
                  className={`py-3 px-4 font-bold cursor-pointer transition-colors w-[24%] ${
                    getTierStyle('5-star', activeTier === '5-star').tableHeader
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>5★ Sanctuary Luxury</span>
                    {activeTier === '5-star' && (
                      <span className="text-[9px] bg-amber-700 text-white px-1.5 py-0.5 rounded font-black">
                        ACTIVE
                      </span>
                    )}
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              <tr className="hover:bg-slate-50/60">
                <td className="py-3.5 px-4 font-semibold text-slate-900">Kathmandu Stay</td>
                <td className={`py-3.5 px-4 ${getTierStyle('3-star', activeTier === '3-star').tableCell}`}>Mandala Boutique (3★)</td>
                <td className={`py-3.5 px-4 ${getTierStyle('4-star', activeTier === '4-star').tableCell}`}>Aloft Kathmandu (4★ Deluxe)</td>
                <td className={`py-3.5 px-4 ${getTierStyle('5-star', activeTier === '5-star').tableCell}`}>The Dwarika's Palace (5★)</td>
              </tr>
              <tr className="hover:bg-slate-50/60">
                <td className="py-3.5 px-4 font-semibold text-slate-900">Pokhara Stay</td>
                <td className={`py-3.5 px-4 ${getTierStyle('3-star', activeTier === '3-star').tableCell}`}>Mount View Lakeside (3★)</td>
                <td className={`py-3.5 px-4 ${getTierStyle('4-star', activeTier === '4-star').tableCell}`}>Temple Tree Resort (4★)</td>
                <td className={`py-3.5 px-4 ${getTierStyle('5-star', activeTier === '5-star').tableCell}`}>The Pavilions Himalayas (5★)</td>
              </tr>
              <tr className="hover:bg-slate-50/60">
                <td className="py-3.5 px-4 font-semibold text-slate-900">Porter Ratio</td>
                <td className={`py-3.5 px-4 ${getTierStyle('3-star', activeTier === '3-star').tableCell}`}>1:2 (Shared, 18-20kg total)</td>
                <td className={`py-3.5 px-4 ${getTierStyle('4-star', activeTier === '4-star').tableCell}`}>1:1 Dedicated (15kg private)</td>
                <td className={`py-3.5 px-4 ${getTierStyle('5-star', activeTier === '5-star').tableCell}`}>1:1 Elite Sherpa Porter</td>
              </tr>
              <tr className="hover:bg-slate-50/60">
                <td className="py-3.5 px-4 font-semibold text-slate-900">Trail Room & Baths</td>
                <td className={`py-3.5 px-4 ${getTierStyle('3-star', activeTier === '3-star').tableCell}`}>Cozy authentic teahouses</td>
                <td className={`py-3.5 px-4 ${getTierStyle('4-star', activeTier === '4-star').tableCell}`}>Attached private bath & heated beds</td>
                <td className={`py-3.5 px-4 ${getTierStyle('5-star', activeTier === '5-star').tableCell}`}>Luxury chalets & heated down duvets</td>
              </tr>
              <tr className="hover:bg-slate-50/60">
                <td className="py-3.5 px-4 font-semibold text-slate-900">Mountain Transfers</td>
                <td className={`py-3.5 px-4 ${getTierStyle('3-star', activeTier === '3-star').tableCell}`}>Deluxe Coach + Shared Jeep</td>
                <td className={`py-3.5 px-4 ${getTierStyle('4-star', activeTier === '4-star').tableCell}`}>Private 4WD Scorpio Jeep</td>
                <td className={`py-3.5 px-4 ${getTierStyle('5-star', activeTier === '5-star').tableCell}`}>Private Land Cruiser + Heli</td>
              </tr>
              <tr className="hover:bg-slate-50/60">
                <td className="py-3.5 px-4 font-semibold text-slate-900">VIP Heli Return (ABC ➔ PKR)</td>
                <td className={`py-3.5 px-4 ${getTierStyle('3-star', activeTier === '3-star').tableCell}`}>Optional (+$850)</td>
                <td className={`py-3.5 px-4 ${getTierStyle('4-star', activeTier === '4-star').tableCell}`}>Optional (+$750)</td>
                <td className={`py-3.5 px-4 ${getTierStyle('5-star', activeTier === '5-star').tableCell}`}>Integrated Included</td>
              </tr>
              <tr className="hover:bg-slate-50/60">
                <td className="py-3.5 px-4 font-semibold text-slate-900">Medical & Oxygen</td>
                <td className={`py-3.5 px-4 ${getTierStyle('3-star', activeTier === '3-star').tableCell}`}>First Aid & Daily SpO2</td>
                <td className={`py-3.5 px-4 ${getTierStyle('4-star', activeTier === '4-star').tableCell}`}>Wilderness Responder + O2</td>
                <td className={`py-3.5 px-4 ${getTierStyle('5-star', activeTier === '5-star').tableCell}`}>O2 Cylinder + Gamow Bag + UIAGM Lead</td>
              </tr>
              <tr className="hover:bg-slate-50/60">
                <td className="py-3.5 px-4 font-semibold text-slate-900">Hot Showers & Charging</td>
                <td className={`py-3.5 px-4 ${getTierStyle('3-star', activeTier === '3-star').tableCell}`}>Local teahouse fee (~$3)</td>
                <td className={`py-3.5 px-4 ${getTierStyle('4-star', activeTier === '4-star').tableCell}`}>100% Complimentary Covered</td>
                <td className={`py-3.5 px-4 ${getTierStyle('5-star', activeTier === '5-star').tableCell}`}>Unlimited + Spa Voucher</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};
