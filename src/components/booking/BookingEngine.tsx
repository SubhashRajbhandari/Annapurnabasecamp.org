import React, { useState } from 'react';
import type { PackageTier, PorterOption, BookingFormState } from '../../types/trek';
import { TREK_PACKAGES } from '../../data/packages';
import { Calculator, Users, Calendar, PlaneTakeoff, ShieldCheck, DollarSign, ArrowRight, Zap, Sparkles, Truck } from 'lucide-react';

interface BookingEngineProps {
  initialTier?: PackageTier;
  onOpenModalWithState: (state: BookingFormState, totalPrice: number) => void;
}

export const BookingEngine: React.FC<BookingEngineProps> = ({
  initialTier = '3-star',
  onOpenModalWithState
}) => {
  const [tier, setTier] = useState<PackageTier>(initialTier);
  const [porterOption, setPorterOption] = useState<PorterOption>('shared-1-2');
  const [groupSize, setGroupSize] = useState<number>(2);
  const [startDate, setStartDate] = useState<string>('2026-10-10');
  const [currency, setCurrency] = useState<'USD' | 'NPR'>('USD');

  // Add-ons
  const [heliReturn, setHeliReturn] = useState<boolean>(false);
  const [gearRental, setGearRental] = useState<boolean>(false);
  const [satelliteDevice, setSatelliteDevice] = useState<boolean>(false);
  const [privateJeep, setPrivateJeep] = useState<boolean>(false);

  const currentPkg = TREK_PACKAGES[tier];

  // Pricing calculations
  const basePricePerPerson = currency === 'USD' ? currentPkg.basePriceUsd : currentPkg.basePriceNpr;

  // Porter surcharge calculation
  let porterSurchargePerPerson = 0;
  if (tier === '3-star') {
    if (porterOption === 'private-1-1') {
      porterSurchargePerPerson = currency === 'USD' ? currentPkg.privatePorterAddonUsd : currentPkg.privatePorterAddonUsd * 133;
    } else if (porterOption === 'guide-only') {
      porterSurchargePerPerson = currency === 'USD' ? -80 : -10600;
    }
  }

  // Heli surcharge
  const heliCostPerPerson = heliReturn
    ? currency === 'USD'
      ? currentPkg.heliReturnAddonUsd
      : currentPkg.heliReturnAddonUsd * 133
    : 0;

  // Gear rental (per person)
  const gearCostPerPerson = gearRental ? (currency === 'USD' ? 45 : 6000) : 0;

  // Satellite device (per group)
  const satelliteCostGroup = satelliteDevice ? (currency === 'USD' ? 55 : 7300) : 0;

  // Private Jeep (per group)
  const jeepCostGroup = privateJeep ? (currency === 'USD' ? 120 : 16000) : 0;

  // Group discount
  let groupDiscountRate = 0;
  if (groupSize >= 8) groupDiscountRate = 0.10; // 10% off
  else if (groupSize >= 4) groupDiscountRate = 0.05; // 5% off

  const subtotalPerPerson = basePricePerPerson + porterSurchargePerPerson + heliCostPerPerson + gearCostPerPerson;
  const rawTotal = subtotalPerPerson * groupSize + satelliteCostGroup + jeepCostGroup;
  const discountAmount = Math.round(rawTotal * groupDiscountRate);
  const finalTotal = rawTotal - discountAmount;

  const handleLaunchModal = () => {
    const bookingData: BookingFormState = {
      tier,
      porterOption,
      groupSize,
      startDate,
      heliReturn,
      gearRental,
      satelliteDevice,
      privateJeep,
      currency,
      fullName: '',
      email: '',
      nationality: '',
      phone: '',
      specialRequests: ''
    };
    onOpenModalWithState(bookingData, finalTotal);
  };

  return (
    <section id="booking" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center mb-14">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-50 border border-sky-200 text-sky-700 text-xs font-mono mb-3 shadow-xs font-bold">
          <Calculator className="w-4 h-4 text-sky-600" />
          <span>REAL-TIME EXPEDITION PRICING & LOGISTICS ENGINE</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-slate-950 tracking-tight mb-4">
          CUSTOMIZE & BOOK EXPEDITION
        </h2>
        <p className="max-w-2xl mx-auto text-slate-600 text-sm sm:text-base font-medium">
          Configure your preferred tier, porter ratio (1:2 shared or 1:1 private), party size, and luxury add-ons with transparent instant quoting.
        </p>

        {/* Currency Switcher */}
        <div className="flex justify-center items-center gap-3 mt-6 font-mono text-xs">
          <span className="text-slate-500 font-bold">CURRENCY:</span>
          <div className="inline-flex rounded-xl bg-white border border-sky-200 p-1 shadow-sm">
            <button
              onClick={() => setCurrency('USD')}
              className={`px-3.5 py-1 rounded-lg font-bold transition-all ${
                currency === 'USD' ? 'bg-sky-500 text-white shadow-xs' : 'text-slate-600 hover:text-slate-950'
              }`}
            >
              USD ($)
            </button>
            <button
              onClick={() => setCurrency('NPR')}
              className={`px-3.5 py-1 rounded-lg font-bold transition-all ${
                currency === 'NPR' ? 'bg-sky-500 text-white shadow-xs' : 'text-slate-600 hover:text-slate-950'
              }`}
            >
              NPR (Rs)
            </button>
          </div>
        </div>
      </div>

      {/* 2-Column Customizer Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left 7 Cols: Interactive Controls */}
        <div className="lg:col-span-7 space-y-8 glass-panel hud-border rounded-3xl p-6 sm:p-8 bg-white/95 border border-sky-200 shadow-md">
          {/* Step 1: Package Tier */}
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-sky-800 font-bold mb-3 flex items-center gap-2">
              <span>01 // Select Accommodation Tier</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {(['3-star', '4-star', '5-star'] as PackageTier[]).map((t) => {
                const pkg = TREK_PACKAGES[t];
                const isSelected = tier === t;
                return (
                  <button
                    key={t}
                    onClick={() => setTier(t)}
                    className={`p-4 rounded-2xl text-left border transition-all ${
                      isSelected
                        ? 'bg-sky-50/90 border-sky-500 shadow-md shadow-sky-500/15 ring-2 ring-sky-400'
                        : 'bg-white border-sky-200 hover:border-sky-300 hover:bg-sky-50/50'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs text-amber-500 mb-1">
                      <span>{'★'.repeat(pkg.starRating)}</span>
                      <span className="font-mono text-slate-500 font-bold">{pkg.durationDays}D</span>
                    </div>
                    <div className="font-black text-slate-950 text-sm">{pkg.title}</div>
                    <div className="text-xs font-mono text-sky-700 font-bold mt-1">
                      {currency === 'USD' ? `$${pkg.basePriceUsd}` : `NPR ${pkg.basePriceNpr.toLocaleString()}`}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 2: Porter Configuration */}
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-emerald-800 font-bold mb-3 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>02 // Porter Logistics Ratio</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <button
                onClick={() => setPorterOption('shared-1-2')}
                className={`p-3.5 rounded-2xl border text-left transition-all ${
                  porterOption === 'shared-1-2'
                    ? 'bg-emerald-50 border-emerald-500 text-slate-950 ring-2 ring-emerald-300 shadow-sm'
                    : 'bg-white border-sky-200 text-slate-700 hover:border-sky-300'
                }`}
              >
                <div className="font-black text-slate-950 mb-0.5">1:2 Shared Porter</div>
                <div className="text-[11px] text-slate-500">1 porter per 2 trekkers (18kg total limit)</div>
                <div className="text-[11px] text-emerald-700 font-mono font-bold mt-1">Standard Included</div>
              </button>

              <button
                onClick={() => setPorterOption('private-1-1')}
                className={`p-3.5 rounded-2xl border text-left transition-all ${
                  porterOption === 'private-1-1'
                    ? 'bg-sky-50 border-sky-500 text-slate-950 ring-2 ring-sky-400 shadow-sm'
                    : 'bg-white border-sky-200 text-slate-700 hover:border-sky-300'
                }`}
              >
                <div className="font-black text-slate-950 mb-0.5">1:1 Dedicated Porter</div>
                <div className="text-[11px] text-slate-500">Your own private porter (15kg dedicated)</div>
                <div className="text-[11px] text-sky-700 font-mono font-bold mt-1">
                  {tier === '3-star' ? (currency === 'USD' ? '+$180 / person' : '+NPR 24,000') : 'Included in Tier'}
                </div>
              </button>

              <button
                onClick={() => setPorterOption('guide-only')}
                className={`p-3.5 rounded-2xl border text-left transition-all ${
                  porterOption === 'guide-only'
                    ? 'bg-blue-50 border-blue-500 text-slate-950 ring-2 ring-blue-300 shadow-sm'
                    : 'bg-white border-sky-200 text-slate-700 hover:border-sky-300'
                }`}
              >
                <div className="font-black text-slate-950 mb-0.5">Independent Trekker</div>
                <div className="text-[11px] text-slate-500">Lead guide only, carry your own gear</div>
                <div className="text-[11px] text-amber-700 font-mono font-bold mt-1">
                  {tier === '3-star' ? (currency === 'USD' ? '-$80 discount' : '-NPR 10,600') : 'Guide Required'}
                </div>
              </button>
            </div>
          </div>

          {/* Step 3: Group Size Slider & Date */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <div className="flex items-center justify-between text-xs font-mono mb-2">
                <span className="text-slate-700 font-bold uppercase flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-sky-600" />
                  <span>Number of Trekkers</span>
                </span>
                <span className="text-sky-700 font-black text-sm">{groupSize} Trekkers</span>
              </div>
              <input
                type="range"
                min="1"
                max="12"
                value={groupSize}
                onChange={(e) => setGroupSize(parseInt(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-sky-600"
              />
              <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-1 font-semibold">
                <span>Solo (1)</span>
                <span>Group Discount (4+ = 5%, 8+ = 10%)</span>
                <span>Group (12)</span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-slate-700 font-bold mb-2 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-amber-600" />
                <span>Expedition Departure Date</span>
              </label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full bg-white border border-sky-200 rounded-xl px-3 py-2 text-xs font-mono text-slate-900 focus:outline-none focus:border-sky-500 shadow-xs font-medium"
              />
            </div>
          </div>

          {/* Step 4: High-Tech Upgrades & Add-ons */}
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-amber-800 font-bold mb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>03 // Expedition Enhancements & Add-ons</span>
            </label>
            <div className="space-y-3 font-mono text-xs">
              {/* Heli Return */}
              <div
                onClick={() => setHeliReturn(!heliReturn)}
                className={`p-4 rounded-2xl border cursor-pointer flex items-center justify-between transition-all ${
                  heliReturn
                    ? 'bg-amber-50 border-amber-400 text-slate-950 shadow-md ring-2 ring-amber-300'
                    : 'bg-white border-sky-200 text-slate-700 hover:border-sky-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-xl ${heliReturn ? 'bg-amber-500 text-white' : 'bg-slate-100 text-slate-600'}`}>
                    <PlaneTakeoff className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-black text-slate-950 flex items-center gap-2">
                      <span>VIP Airbus H125 Heli Flight (ABC ➔ Pokhara)</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-300 font-bold">
                        Saves 3-4 Days Trekking
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-500 font-sans mt-0.5 font-medium">
                      Fly over Annapurna South & Machapuchare directly to your resort poolside.
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-black text-amber-700">
                    +{currency === 'USD' ? `$${currentPkg.heliReturnAddonUsd}` : `NPR ${(currentPkg.heliReturnAddonUsd * 133).toLocaleString()}`}
                  </div>
                  <div className="text-[10px] text-slate-500 font-semibold">per person</div>
                </div>
              </div>

              {/* Gear Pack Rental */}
              <div
                onClick={() => setGearRental(!gearRental)}
                className={`p-3.5 rounded-2xl border cursor-pointer flex items-center justify-between transition-all ${
                  gearRental
                    ? 'bg-sky-50 border-sky-500 text-slate-950 ring-2 ring-sky-300 shadow-xs'
                    : 'bg-white border-sky-200 text-slate-700 hover:border-sky-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-xl ${gearRental ? 'bg-sky-500 text-white' : 'bg-slate-100 text-slate-600'}`}>
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-black text-slate-950">Full Expedition Gear Pack Rental</div>
                    <div className="text-[11px] text-slate-500 font-sans font-medium">
                      Includes 800-fill Down Jacket (-20°C) + 4-Season Sleeping bag + Trekking Poles
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-black text-sky-700">
                    +{currency === 'USD' ? '$45' : 'NPR 6,000'}
                  </div>
                  <div className="text-[10px] text-slate-500 font-semibold">per person</div>
                </div>
              </div>

              {/* Satellite inReach */}
              <div
                onClick={() => setSatelliteDevice(!satelliteDevice)}
                className={`p-3.5 rounded-2xl border cursor-pointer flex items-center justify-between transition-all ${
                  satelliteDevice
                    ? 'bg-sky-50 border-sky-500 text-slate-950 ring-2 ring-sky-300 shadow-xs'
                    : 'bg-white border-sky-200 text-slate-700 hover:border-sky-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-xl ${satelliteDevice ? 'bg-sky-500 text-white' : 'bg-slate-100 text-slate-600'}`}>
                    <Zap className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-black text-slate-950">Garmin inReach Satellite Live Tracker</div>
                    <div className="text-[11px] text-slate-500 font-sans font-medium">
                      Unlimited 2-way satellite messaging for family & SOS GPS beacon.
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-black text-sky-700">
                    +{currency === 'USD' ? '$55' : 'NPR 7,300'}
                  </div>
                  <div className="text-[10px] text-slate-500 font-semibold">per group</div>
                </div>
              </div>

              {/* Private 4WD Jeep Upgrade */}
              <div
                onClick={() => setPrivateJeep(!privateJeep)}
                className={`p-3.5 rounded-2xl border cursor-pointer flex items-center justify-between transition-all ${
                  privateJeep
                    ? 'bg-sky-50 border-sky-500 text-slate-950 ring-2 ring-sky-300 shadow-xs'
                    : 'bg-white border-sky-200 text-slate-700 hover:border-sky-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-xl ${privateJeep ? 'bg-sky-500 text-white' : 'bg-slate-100 text-slate-600'}`}>
                    <Truck className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-black text-slate-950">Private 4WD Mahindra Scorpio Jeep</div>
                    <div className="text-[11px] text-slate-500 font-sans font-medium">
                      Direct trailhead door-to-door transfer from Pokhara to Matque.
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-black text-sky-700">
                    +{currency === 'USD' ? '$120' : 'NPR 16,000'}
                  </div>
                  <div className="text-[10px] text-slate-500 font-semibold">per group</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right 5 Cols: Live Price Breakdown & Summary Card */}
        <div className="lg:col-span-5 sticky top-28 glass-panel hud-border rounded-3xl p-6 sm:p-8 font-mono shadow-xl bg-white/95 border border-sky-200">
          <div className="flex items-center justify-between border-b border-sky-100 pb-4 mb-6">
            <h3 className="text-lg font-black text-slate-950 flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-sky-600" />
              <span>EXPEDITION QUOTE INVOICE</span>
            </h3>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold border border-emerald-300">
              OFFICIAL RATES
            </span>
          </div>

          {/* Itemized Lines */}
          <div className="space-y-3 text-xs text-slate-700 border-b border-sky-100 pb-6 mb-6">
            <div className="flex justify-between items-center">
              <span>{currentPkg.title} Base Package ({groupSize}x)</span>
              <span className="text-slate-950 font-black">
                {currency === 'USD' ? `$${basePricePerPerson * groupSize}` : `NPR ${(basePricePerPerson * groupSize).toLocaleString()}`}
              </span>
            </div>

            {porterSurchargePerPerson !== 0 && (
              <div className="flex justify-between items-center text-sky-700 font-bold">
                <span>Porter Adjustment: {porterOption}</span>
                <span>
                  {porterSurchargePerPerson > 0 ? '+' : ''}
                  {currency === 'USD' ? `$${porterSurchargePerPerson * groupSize}` : `NPR ${(porterSurchargePerPerson * groupSize).toLocaleString()}`}
                </span>
              </div>
            )}

            {heliReturn && (
              <div className="flex justify-between items-center text-amber-700 font-bold">
                <span>VIP Helicopter Flight ({groupSize}x)</span>
                <span>
                  +{currency === 'USD' ? `$${heliCostPerPerson * groupSize}` : `NPR ${(heliCostPerPerson * groupSize).toLocaleString()}`}
                </span>
              </div>
            )}

            {gearRental && (
              <div className="flex justify-between items-center text-sky-700 font-bold">
                <span>Gear Pack Rental ({groupSize}x)</span>
                <span>
                  +{currency === 'USD' ? `$${gearCostPerPerson * groupSize}` : `NPR ${(gearCostPerPerson * groupSize).toLocaleString()}`}
                </span>
              </div>
            )}

            {satelliteDevice && (
              <div className="flex justify-between items-center text-sky-700 font-bold">
                <span>Garmin inReach Satellite Unit</span>
                <span>
                  +{currency === 'USD' ? `$${satelliteCostGroup}` : `NPR ${satelliteCostGroup.toLocaleString()}`}
                </span>
              </div>
            )}

            {groupDiscountRate > 0 && (
              <div className="flex justify-between items-center text-emerald-700 font-black">
                <span>Group Discount ({(groupDiscountRate * 100)}%)</span>
                <span>
                  -{currency === 'USD' ? `$${discountAmount}` : `NPR ${discountAmount.toLocaleString()}`}
                </span>
              </div>
            )}
          </div>

          {/* Grand Total */}
          <div className="mb-6">
            <div className="text-[11px] text-slate-500 uppercase tracking-wider mb-1 font-bold">
              Guaranteed All-Inclusive Total
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-3xl sm:text-4xl font-black text-sky-700">
                {currency === 'USD' ? `$${finalTotal.toLocaleString()}` : `NPR ${finalTotal.toLocaleString()}`}
              </span>
              <span className="text-xs text-slate-500 font-sans font-semibold">
                ({currency === 'USD' ? `$${Math.round(finalTotal / groupSize)}` : `NPR ${Math.round(finalTotal / groupSize).toLocaleString()}`} / trekker)
              </span>
            </div>
            <div className="text-[10px] text-emerald-700 font-black mt-1">
              ✓ Includes all ACAP permits, TIMS, logistics taxes & guide insurance.
            </div>
          </div>

          {/* Action Button */}
          <button
            onClick={handleLaunchModal}
            className="w-full py-4 rounded-2xl font-black text-sm uppercase tracking-wider bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 text-white shadow-xl shadow-sky-500/25 hover:shadow-sky-400/40 hover:scale-[1.02] transition-all flex items-center justify-center gap-2 active:scale-95"
          >
            <span>Proceed to Reservation</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <div className="mt-4 text-center text-[11px] text-slate-500 font-sans font-medium">
            🔒 No upfront card charge required for preliminary quotation & permit reservation.
          </div>
        </div>
      </div>
    </section>
  );
};
