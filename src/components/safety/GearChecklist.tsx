import React, { useState } from 'react';
import { GEAR_ITEMS } from '../../data/gearList';
import { CheckSquare, Square, Package, Weight, Filter, CheckCircle2 } from 'lucide-react';

export const GearChecklist: React.FC = () => {
  const [checkedIds, setCheckedIds] = useState<Set<string>>(new Set(['g-boots', 'g-down-jacket', 'g-fleece', 'g-sun-hat']));
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
    <div id="safety" className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 text-xs text-sky-700 font-bold mb-1">
            <Package className="w-4 h-4 text-sky-600" />
            <span>Interactive Expedition Packing Guide</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-black text-slate-900">
            Sanctuary Gear Checklist & Duffel Weight Guide
          </h3>
          <p className="text-slate-600 text-xs sm:text-sm mt-1">
            Ensure your duffel bag is fully prepped for high-altitude conditions. Standard porter limits: 15kg for 1:1 Private Porter, 10kg/person for 1:2 Shared Porter.
          </p>
        </div>

        {/* Live Weight Gauge Pill */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-right shrink-0 shadow-xs">
          <div className="text-[11px] text-slate-500 font-semibold flex items-center justify-end gap-1 mb-0.5">
            <Weight className="w-3.5 h-3.5 text-sky-600" />
            <span>Estimated Pack Weight</span>
          </div>
          <div className="text-xl sm:text-2xl font-black text-slate-900">
            {totalWeightKg} kg <span className="text-xs text-slate-500 font-normal">({totalWeightLbs} lbs)</span>
          </div>
          <div className="text-[11px] text-emerald-700 font-bold mt-0.5 flex items-center justify-end gap-1">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
            <span>Essential Gear: {packProgress}% Complete</span>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-100 rounded-full h-2.5 mb-8 overflow-hidden border border-slate-200">
        <div
          className="bg-gradient-to-r from-sky-500 via-blue-600 to-emerald-500 h-full transition-all duration-300"
          style={{ width: `${packProgress}%` }}
        />
      </div>

      {/* Category Filter Buttons */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 scrollbar-thin">
        <Filter className="w-4 h-4 text-slate-400 shrink-0 ml-1" />
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`shrink-0 px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              activeCategory === cat
                ? 'bg-slate-900 text-white shadow-sm'
                : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Checklist Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 text-xs">
        {filteredItems.map((item) => {
          const isChecked = checkedIds.has(item.id);
          return (
            <div
              key={item.id}
              onClick={() => toggleItem(item.id)}
              className={`p-4 rounded-2xl border cursor-pointer flex items-start justify-between gap-3 transition-all ${
                isChecked
                  ? 'bg-sky-50/70 border-sky-300 text-slate-900 shadow-2xs'
                  : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="mt-0.5 text-sky-600">
                  {isChecked ? (
                    <CheckSquare className="w-4 h-4 text-sky-600 fill-sky-100" />
                  ) : (
                    <Square className="w-4 h-4 text-slate-300" />
                  )}
                </div>
                <div>
                  <div className="font-bold flex items-center gap-2">
                    <span className={isChecked ? 'text-slate-950 font-extrabold' : 'text-slate-800'}>
                      {item.name}
                    </span>
                    {item.mandatory && (
                      <span className="text-[10px] px-2 py-0.2 rounded-full bg-amber-50 text-amber-800 border border-amber-200 font-bold">
                        Mandatory
                      </span>
                    )}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                    {item.description}
                  </div>
                </div>
              </div>

              <div className="text-right shrink-0">
                <span className="text-slate-600 font-bold block">{item.weightGrams}g</span>
                {item.rentalAvailable && (
                  <span className="text-[10px] text-sky-700 font-semibold">Rent: ${item.rentalCostUsd}</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
