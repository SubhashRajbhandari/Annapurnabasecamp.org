import React from 'react';
import type { PackageTier } from '../../types/trek';
import { TREK_PACKAGES } from '../../data/packages';
import { Sparkles, ArrowRight, BedDouble, UserCheck, ShieldCheck, PlaneTakeoff, Coffee, Clock, Award } from 'lucide-react';

interface TierSelectorProps {
  activeTier: PackageTier;
  onSelectTier: (tier: PackageTier) => void;
  onBookTier: (tier: PackageTier) => void;
}

export const TierSelector: React.FC<TierSelectorProps> = ({
  activeTier,
  onSelectTier,
  onBookTier
}) => {
  const tiers: PackageTier[] = ['3-star', '4-star', '5-star'];

  return (
    <section id="packages" className="py-14 sm:py-20 px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full max-w-full">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
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

        {/* Tier Switcher Pills */}
        <div className="flex max-w-full overflow-x-auto p-1 sm:p-1.5 rounded-2xl bg-white border border-slate-200 mt-6 sm:mt-8 shadow-sm justify-start sm:justify-center gap-1">
          {tiers.map((tier) => {
            const pkg = TREK_PACKAGES[tier];
            const isActive = activeTier === tier;
            return (
              <button
                key={tier}
                onClick={() => onSelectTier(tier)}
                className={`px-3 sm:px-6 py-2 sm:py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all duration-200 flex items-center gap-1.5 cursor-pointer shrink-0 whitespace-nowrap ${
                  isActive
                    ? 'bg-slate-900 text-white shadow-md'
                    : 'text-slate-600 hover:text-slate-950 hover:bg-slate-50'
                }`}
              >
                <span className="text-amber-400">{'★'.repeat(pkg.starRating)}</span>
                <span>{pkg.title}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tiers Grid - Modeled after Fishtail PopularTours Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {tiers.map((tier) => {
          const pkg = TREK_PACKAGES[tier];
          const isSelected = activeTier === tier;
          const isLuxury = tier === '5-star';
          const isPremier = tier === '4-star';

          return (
            <div
              key={tier}
              onClick={() => onSelectTier(tier)}
              className={`luxury-card cursor-pointer overflow-hidden flex flex-col justify-between group ${
                isSelected
                  ? 'border-sky-500 shadow-2xl ring-2 ring-sky-300/60'
                  : 'hover:border-slate-300'
              }`}
            >
              <div>
                {/* Image Header with Pills */}
                {pkg.image && (
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={pkg.image}
                      alt={pkg.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-black/20" />
                    
                    {/* Top Badges */}
                    <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-950/80 text-white backdrop-blur-md flex items-center gap-1">
                        <Clock className="w-3 h-3 text-sky-400" />
                        {pkg.durationDays} Days / {pkg.durationDays - 1} Nights
                      </span>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold shadow-sm ${
                          isLuxury
                            ? 'bg-amber-500 text-slate-950'
                            : isPremier
                            ? 'bg-sky-500 text-white'
                            : 'bg-emerald-600 text-white'
                        }`}
                      >
                        {pkg.heroBadge}
                      </span>
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
                <div className="p-6">
                  {/* Category & Title */}
                  <div className="flex items-center gap-1.5 text-[11px] font-bold text-sky-700 uppercase tracking-wider mb-1.5">
                    <Award className="w-3.5 h-3.5" />
                    <span>{pkg.subtitle}</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 mb-2 group-hover:text-sky-600 transition-colors">
                    {pkg.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed min-h-[44px]">
                    {pkg.tagline}
                  </p>

                  {/* Price Tag Box */}
                  <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80 my-5 flex items-baseline justify-between">
                    <div>
                      <span className="text-[10px] text-slate-500 font-bold uppercase block">Starting From</span>
                      <div className="flex items-baseline gap-1">
                        <span className="text-3xl font-black text-slate-900">${pkg.basePriceUsd}</span>
                        <span className="text-xs font-medium text-slate-500">USD / trekker</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-bold text-emerald-700 block">All Permits Included</span>
                      <span className="text-[10px] text-slate-500">Approx. NPR {pkg.basePriceNpr.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Key Highlights */}
                  <div className="space-y-2.5 mb-6 text-xs text-slate-700">
                    <div className="flex items-start gap-2.5">
                      <BedDouble className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                      <span>
                        <strong className="text-slate-900">City Lodging:</strong> {pkg.keySpecs.hotelKathmandu}
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
                      <div className="flex items-start gap-2 text-xs text-amber-900 font-bold bg-amber-50 p-3 rounded-xl border border-amber-200">
                        <PlaneTakeoff className="w-4 h-4 shrink-0 mt-0.5 text-amber-600" />
                        <span>Direct VIP Helicopter descent from ABC back to Pokhara!</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="p-6 pt-0">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectTier(tier);
                    onBookTier(tier);
                  }}
                  className={`w-full py-3.5 rounded-2xl font-bold text-sm tracking-wide flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-slate-900 text-white shadow-lg hover:bg-slate-800'
                      : 'bg-white text-slate-800 border border-slate-300 hover:border-slate-500 hover:bg-slate-50'
                  }`}
                >
                  <span>Select & Reserve {pkg.title}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Clean Feature Comparison Matrix */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm">
        <h3 className="text-xl sm:text-2xl font-black text-slate-900 mb-2">
          Side-by-Side Logistics & Inclusions Comparison
        </h3>
        <p className="text-slate-600 text-xs sm:text-sm mb-6">
          Clear comparison across hotel accommodation grades, porter ratios, medical safety equipment, and mountain transfers.
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-slate-800">
                <th className="py-3 px-4 font-bold">Logistics Feature</th>
                <th className="py-3 px-4 text-sky-800 font-bold">3★ Alpine Explorer</th>
                <th className="py-3 px-4 text-blue-800 font-bold">4★ Mountain Premier</th>
                <th className="py-3 px-4 text-amber-800 font-bold">5★ Sanctuary Luxury</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              <tr className="hover:bg-slate-50/60">
                <td className="py-3.5 px-4 font-semibold text-slate-900">Kathmandu Stay</td>
                <td className="py-3.5 px-4">Mandala Boutique (3★)</td>
                <td className="py-3.5 px-4">Aloft Kathmandu (4★ Deluxe)</td>
                <td className="py-3.5 px-4 text-amber-800 font-bold">The Dwarika's Palace (5★)</td>
              </tr>
              <tr className="hover:bg-slate-50/60">
                <td className="py-3.5 px-4 font-semibold text-slate-900">Pokhara Stay</td>
                <td className="py-3.5 px-4">Mount View Lakeside (3★)</td>
                <td className="py-3.5 px-4">Temple Tree Resort (4★)</td>
                <td className="py-3.5 px-4 text-amber-800 font-bold">The Pavilions Himalayas (5★)</td>
              </tr>
              <tr className="hover:bg-slate-50/60">
                <td className="py-3.5 px-4 font-semibold text-slate-900">Porter Ratio</td>
                <td className="py-3.5 px-4">1:2 (Shared, 18-20kg total)</td>
                <td className="py-3.5 px-4 text-sky-700 font-bold">1:1 Dedicated (15kg private)</td>
                <td className="py-3.5 px-4 text-amber-800 font-bold">1:1 Elite Sherpa Porter</td>
              </tr>
              <tr className="hover:bg-slate-50/60">
                <td className="py-3.5 px-4 font-semibold text-slate-900">Trail Room & Baths</td>
                <td className="py-3.5 px-4">Cozy authentic teahouses</td>
                <td className="py-3.5 px-4 text-sky-700 font-semibold">Attached private bath & heated beds</td>
                <td className="py-3.5 px-4 text-amber-800 font-semibold">Luxury chalets & heated down duvets</td>
              </tr>
              <tr className="hover:bg-slate-50/60">
                <td className="py-3.5 px-4 font-semibold text-slate-900">Mountain Transfers</td>
                <td className="py-3.5 px-4">Deluxe Coach + Shared Jeep</td>
                <td className="py-3.5 px-4 text-sky-700 font-semibold">Private 4WD Scorpio Jeep</td>
                <td className="py-3.5 px-4 text-amber-800 font-semibold">Private Land Cruiser + Heli</td>
              </tr>
              <tr className="hover:bg-slate-50/60">
                <td className="py-3.5 px-4 font-semibold text-slate-900">VIP Heli Return (ABC ➔ PKR)</td>
                <td className="py-3.5 px-4 text-slate-400">Optional (+$850)</td>
                <td className="py-3.5 px-4 text-sky-700 font-semibold">Optional (+$750)</td>
                <td className="py-3.5 px-4 text-amber-800 font-bold">Integrated Included</td>
              </tr>
              <tr className="hover:bg-slate-50/60">
                <td className="py-3.5 px-4 font-semibold text-slate-900">Medical & Oxygen</td>
                <td className="py-3.5 px-4">First Aid & Daily SpO2</td>
                <td className="py-3.5 px-4">Wilderness Responder + O2</td>
                <td className="py-3.5 px-4 text-amber-800 font-semibold">O2 Cylinder + Gamow Bag + UIAGM Lead</td>
              </tr>
              <tr className="hover:bg-slate-50/60">
                <td className="py-3.5 px-4 font-semibold text-slate-900">Hot Showers & Charging</td>
                <td className="py-3.5 px-4 text-slate-500">Local teahouse fee (~$3)</td>
                <td className="py-3.5 px-4 text-sky-700 font-semibold">100% Complimentary Covered</td>
                <td className="py-3.5 px-4 text-amber-800 font-semibold">Unlimited + Spa Voucher</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};
