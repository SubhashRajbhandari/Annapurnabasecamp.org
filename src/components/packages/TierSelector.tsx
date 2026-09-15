import React from 'react';
import type { PackageTier } from '../../types/trek';
import { TREK_PACKAGES } from '../../data/packages';
import { Sparkles, ArrowRight, BedDouble, UserCheck, ShieldCheck, PlaneTakeoff, Coffee } from 'lucide-react';

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
    <section id="packages" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center mb-14">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-mono mb-3 shadow-xs font-bold">
          <Sparkles className="w-4 h-4 text-amber-600" />
          <span>HIMALAYAN HOSPITALITY & LOGISTICS TIERS</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-slate-950 tracking-tight mb-4">
          EXPEDITION PACKAGE TIERS
        </h2>
        <p className="max-w-2xl mx-auto text-slate-600 text-sm sm:text-base font-medium">
          Every trekker has unique comfort and logistical requirements. Choose from our 3-Star Alpine Explorer, 4-Star Mountain Premier with private porters, or the 5-Star Himalayan Sanctuary Luxury featuring VIP helicopter descent.
        </p>

        {/* Tab Buttons - Even Glacier White pill */}
        <div className="inline-flex p-1.5 rounded-2xl bg-white border border-sky-200/90 mt-8 shadow-md">
          {tiers.map((tier) => {
            const pkg = TREK_PACKAGES[tier];
            const isActive = activeTier === tier;
            return (
              <button
                key={tier}
                onClick={() => onSelectTier(tier)}
                className={`px-4 sm:px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all duration-200 flex items-center gap-2 ${
                  isActive
                    ? 'bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-md shadow-sky-500/25 scale-[1.02]'
                    : 'text-slate-600 hover:text-slate-950 hover:bg-sky-50'
                }`}
              >
                <span className="text-amber-400">{'★'.repeat(pkg.starRating)}</span>
                <span>{pkg.title}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tiers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-16">
        {tiers.map((tier) => {
          const pkg = TREK_PACKAGES[tier];
          const isSelected = activeTier === tier;
          const isLuxury = tier === '5-star';
          const isPremier = tier === '4-star';

          return (
            <div
              key={tier}
              onClick={() => onSelectTier(tier)}
              className={`cursor-pointer rounded-3xl p-6 sm:p-8 transition-all duration-300 relative flex flex-col justify-between overflow-hidden bg-white border ${
                isSelected
                  ? 'border-sky-400 shadow-2xl shadow-sky-500/15 scale-[1.02] ring-2 ring-sky-300'
                  : 'border-sky-200/80 hover:border-sky-400 hover:shadow-lg'
              }`}
            >
              {/* Image Banner */}
              {pkg.image && (
                <div className="relative h-44 -mx-6 -mt-6 sm:-mx-8 sm:-mt-8 mb-6 overflow-hidden group">
                  <img
                    src={pkg.image}
                    alt={pkg.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span
                      className={`text-xs font-mono font-black px-3 py-1 rounded-full shadow-md backdrop-blur-md ${
                        isLuxury
                          ? 'bg-amber-400 text-slate-950'
                          : isPremier
                          ? 'bg-sky-500 text-white'
                          : 'bg-emerald-500 text-white'
                      }`}
                    >
                      {pkg.heroBadge}
                    </span>
                  </div>
                  <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white font-mono">
                    <span className="text-xs font-black tracking-wider">{pkg.durationDays} DAYS ITINERARY</span>
                    <div className="flex items-center text-amber-400 text-sm font-bold">
                      {'★'.repeat(pkg.starRating)}
                    </div>
                  </div>
                </div>
              )}

              {/* Title & Tagline */}
              <div className="mb-6">
                <h3 className="text-2xl font-black text-slate-950 mb-1">{pkg.title}</h3>
                <div className="text-xs text-sky-700 font-mono font-bold mb-3">
                  {pkg.subtitle}
                </div>
                <p className="text-xs text-slate-600 leading-relaxed min-h-[48px] font-medium">
                  {pkg.tagline}
                </p>
              </div>

              {/* Price Block */}
              <div className="bg-sky-50/80 rounded-2xl p-4 border border-sky-200 mb-6 font-mono">
                <div className="text-[11px] text-slate-500 uppercase tracking-wider mb-1 font-semibold">
                  Starting Expedition Rate
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl sm:text-4xl font-black text-slate-950">
                    ${pkg.basePriceUsd}
                  </span>
                  <span className="text-xs text-slate-500 font-sans">/ trekker</span>
                </div>
                <div className="text-[11px] text-sky-800 font-bold mt-0.5">
                  Approx. NPR {pkg.basePriceNpr.toLocaleString()} • {pkg.durationDays} Days
                </div>
              </div>

              {/* Key Highlights list */}
              <div className="space-y-3 mb-8 flex-1">
                <div className="text-xs font-mono uppercase tracking-wider text-slate-500 mb-2 font-semibold">
                  Key Inclusions:
                </div>

                <div className="flex items-start gap-2.5 text-xs text-slate-700">
                  <BedDouble className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-slate-900">Hotels:</strong> {pkg.keySpecs.hotelKathmandu}
                  </span>
                </div>

                <div className="flex items-start gap-2.5 text-xs text-slate-700">
                  <UserCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-slate-900">Porters:</strong> {pkg.keySpecs.defaultPorterRatio}
                  </span>
                </div>

                <div className="flex items-start gap-2.5 text-xs text-slate-700">
                  <ShieldCheck className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-slate-900">Lodging:</strong> {pkg.keySpecs.trailAccommodation}
                  </span>
                </div>

                <div className="flex items-start gap-2.5 text-xs text-slate-700">
                  <Coffee className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-slate-900">Dining:</strong> {pkg.keySpecs.diningPlan}
                  </span>
                </div>

                {isLuxury && (
                  <div className="flex items-start gap-2.5 text-xs text-amber-900 font-bold bg-amber-50 p-2.5 rounded-xl border border-amber-200">
                    <PlaneTakeoff className="w-4 h-4 shrink-0 mt-0.5 text-amber-600" />
                    <span>Direct VIP Helicopter flight from ABC back to Pokhara!</span>
                  </div>
                )}
              </div>

              {/* Select & Action Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectTier(tier);
                  onBookTier(tier);
                }}
                className={`w-full py-3.5 rounded-xl font-bold text-sm tracking-wider uppercase flex items-center justify-center gap-2 transition-all ${
                  isSelected
                    ? 'bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-lg shadow-sky-500/25 hover:brightness-105'
                    : 'bg-white text-slate-800 border border-sky-300 hover:border-sky-500 hover:bg-sky-50'
                }`}
              >
                <span>Configure {pkg.title}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          );
        })}
      </div>

      {/* Feature Comparison Matrix */}
      <div className="glass-panel hud-border rounded-3xl p-6 sm:p-8 bg-white/95 border border-sky-200 shadow-lg">
        <h3 className="text-xl sm:text-2xl font-black text-slate-950 mb-2 flex items-center gap-2">
          <span>TIER SPECIFICATION & PORTER COMPARISON MATRIX</span>
        </h3>
        <p className="text-slate-600 text-xs sm:text-sm mb-6 font-mono font-medium">
          Detailed side-by-side logistics comparison across accommodation grades, porter ratios, safety protocols, and transit modes.
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm border-collapse font-mono">
            <thead>
              <tr className="border-b border-sky-200 bg-sky-50 text-slate-800">
                <th className="py-3 px-4 uppercase font-black">Specification</th>
                <th className="py-3 px-4 text-sky-800 font-black">3★ Alpine Explorer</th>
                <th className="py-3 px-4 text-blue-800 font-black">4★ Mountain Premier</th>
                <th className="py-3 px-4 text-amber-800 font-black">5★ Sanctuary Luxury</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sky-100 text-slate-700">
              <tr className="hover:bg-sky-50/40">
                <td className="py-3.5 px-4 font-bold text-slate-950">Kathmandu Stay</td>
                <td className="py-3.5 px-4">Mandala Boutique (3★)</td>
                <td className="py-3.5 px-4">Aloft Kathmandu (4★ Deluxe)</td>
                <td className="py-3.5 px-4 text-amber-800 font-bold">The Dwarika\'s Palace (5★)</td>
              </tr>
              <tr className="hover:bg-sky-50/40">
                <td className="py-3.5 px-4 font-bold text-slate-950">Pokhara Stay</td>
                <td className="py-3.5 px-4">Mount View Lakeside (3★)</td>
                <td className="py-3.5 px-4">Temple Tree Resort (4★)</td>
                <td className="py-3.5 px-4 text-amber-800 font-bold">The Pavilions Himalayas (5★)</td>
              </tr>
              <tr className="hover:bg-sky-50/40">
                <td className="py-3.5 px-4 font-bold text-slate-950">Porter Ratio</td>
                <td className="py-3.5 px-4">1:2 (Shared, 18-20kg total)</td>
                <td className="py-3.5 px-4 text-sky-700 font-bold">1:1 Dedicated (15kg private)</td>
                <td className="py-3.5 px-4 text-amber-800 font-bold">1:1 Elite Sherpa Porter</td>
              </tr>
              <tr className="hover:bg-sky-50/40">
                <td className="py-3.5 px-4 font-bold text-slate-950">Trail Room & Baths</td>
                <td className="py-3.5 px-4">Cozy authentic teahouses</td>
                <td className="py-3.5 px-4 text-sky-700 font-semibold">Attached private bath & heated beds</td>
                <td className="py-3.5 px-4 text-amber-800 font-semibold">Luxury chalets & heated down duvets</td>
              </tr>
              <tr className="hover:bg-sky-50/40">
                <td className="py-3.5 px-4 font-bold text-slate-950">Mountain Transfers</td>
                <td className="py-3.5 px-4">Deluxe Coach + Shared Jeep</td>
                <td className="py-3.5 px-4 text-sky-700 font-semibold">Private 4WD Scorpio Jeep</td>
                <td className="py-3.5 px-4 text-amber-800 font-semibold">Private Land Cruiser + Heli</td>
              </tr>
              <tr className="hover:bg-sky-50/40">
                <td className="py-3.5 px-4 font-bold text-slate-950">VIP Heli Return (ABC ➔ PKR)</td>
                <td className="py-3.5 px-4 text-slate-400">Optional (+$850)</td>
                <td className="py-3.5 px-4 text-sky-700 font-semibold">Optional (+$750)</td>
                <td className="py-3.5 px-4 text-amber-800 font-bold">Available (+$650) / Integrated</td>
              </tr>
              <tr className="hover:bg-sky-50/40">
                <td className="py-3.5 px-4 font-bold text-slate-950">Medical & Oxygen</td>
                <td className="py-3.5 px-4">First Aid & Daily SpO2</td>
                <td className="py-3.5 px-4">Wilderness Responder + O2</td>
                <td className="py-3.5 px-4 text-amber-800 font-semibold">O2 Cylinder + Gamow Bag + UIAGM Lead</td>
              </tr>
              <tr className="hover:bg-sky-50/40">
                <td className="py-3.5 px-4 font-bold text-slate-950">Hot Showers & Charging</td>
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
