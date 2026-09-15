import React, { useState } from 'react';
import { GEAR_ITEMS } from '../../data/gearList';
import { CheckSquare, Square, Package, Weight, Filter } from 'lucide-react';

export const GearChecklist: React.FC = () => {
  const [checkedIds, setCheckedIds] = useState<Set<string>>(new Set(['g-boots', 'g-down-jacket']));
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', 'Essential Thermal & Shell', 'Footwear & Traction', 'Sleeping & Camp Pack', 'Technical & Power', 'Medical & Acclimatization'];

  const toggleItem = (id: string) => {
    const next = new Set(checkedIds);
    if (next.has(id)) {
      next.delete(id);
    } else {
      next.add(id);
    }
    setCheckedIds(next);
  };

  const filteredItems = activeCategory === 'All'
    ? GEAR_ITEMS
    : GEAR_ITEMS.filter(item => item.category === activeCategory);

  // Total weight calculations
  const totalWeightGrams = Array.from(checkedIds).reduce((sum, id) => {
    const item = GEAR_ITEMS.find(g => g.id === id);
    return sum + (item ? item.weightGrams : 0);
  }, 0);

  const totalWeightKg = (totalWeightGrams / 1000).toFixed(2);
  const totalWeightLbs = (totalWeightGrams * 0.00220462).toFixed(1);

  const mandatoryCount = GEAR_ITEMS.filter(i => i.mandatory).length;
  const mandatoryChecked = GEAR_ITEMS.filter(i => i.mandatory && checkedIds.has(i.id)).length;
  const packProgress = Math.round((mandatoryChecked / mandatoryCount) * 100);

  return (
    <div id="safety" className="glass-panel hud-border rounded-3xl p-6 sm:p-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-sky-700 font-bold mb-1">
            <Package className="w-4 h-4 text-sky-600" />
            <span>INTERACTIVE GEAR & DUFFEL INVENTORY</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-black text-slate-950">
            SANCTUARY PACKING CHECKLIST & WEIGHT GAUGE
          </h3>
          <p className="text-slate-600 text-xs sm:text-sm mt-1">
            Track your gear preparedness. Weight limits: 15kg for 1:1 Porter, 10kg/person for 1:2 Shared Porter.
          </p>
        </div>

        {/* Live Weight Telemetry Pill */}
        <div className="bg-sky-50/90 border border-sky-200 rounded-2xl p-4 font-mono text-right shrink-0 shadow-xs">
          <div className="text-[11px] text-slate-500 flex items-center justify-end gap-1 mb-1">
            <Weight className="w-3.5 h-3.5 text-sky-600" />
            <span>CALCULATED PACK WEIGHT</span>
          </div>
          <div className="text-xl sm:text-2xl font-black text-slate-950">
            {totalWeightKg} kg <span className="text-xs text-sky-700 font-normal">({totalWeightLbs} lbs)</span>
          </div>
          <div className="text-[11px] text-emerald-600 font-bold mt-1">
            Mandatory Gear: {packProgress}% Ready
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-200 rounded-full h-2.5 mb-8 overflow-hidden border border-sky-100">
        <div
          className="bg-gradient-to-r from-sky-500 via-cyan-500 to-emerald-500 h-full transition-all duration-300"
          style={{ width: `${packProgress}%` }}
        />
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 scrollbar-thin">
        <Filter className="w-4 h-4 text-slate-400 shrink-0 ml-1" />
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`shrink-0 px-3.5 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all cursor-pointer ${
              activeCategory === cat
                ? 'bg-sky-600 text-white shadow-xs'
                : 'bg-white text-slate-700 hover:text-slate-950 border border-sky-200 hover:border-sky-300'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Checklist Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 font-mono text-xs">
        {filteredItems.map((item) => {
          const isChecked = checkedIds.has(item.id);
          return (
            <div
              key={item.id}
              onClick={() => toggleItem(item.id)}
              className={`p-3.5 rounded-2xl border cursor-pointer flex items-start justify-between gap-3 transition-all ${
                isChecked
                  ? 'bg-sky-50/90 border-sky-400 text-slate-900 ring-1 ring-sky-300 shadow-xs'
                  : 'bg-white border-sky-200 text-slate-700 hover:border-sky-300 shadow-xs'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="mt-0.5 text-sky-600">
                  {isChecked ? (
                    <CheckSquare className="w-4 h-4 text-sky-600 fill-sky-500/20" />
                  ) : (
                    <Square className="w-4 h-4 text-slate-300" />
                  )}
                </div>
                <div>
                  <div className="font-bold flex items-center gap-2">
                    <span className={isChecked ? 'text-slate-950' : 'text-slate-800'}>
                      {item.name}
                    </span>
                    {item.mandatory && (
                      <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-50 text-amber-800 border border-amber-200">
                        Required
                      </span>
                    )}
                  </div>
                  <div className="text-[11px] text-slate-500 font-sans mt-0.5 leading-relaxed">
                    {item.description}
                  </div>
                </div>
              </div>

              <div className="text-right shrink-0">
                <span className="text-slate-600 font-bold">{item.weightGrams}g</span>
                {item.rentalAvailable && (
                  <div className="text-[10px] text-sky-700 font-semibold">Rental: ${item.rentalCostUsd}</div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
