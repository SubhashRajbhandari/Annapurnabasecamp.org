import React from 'react';
import { MountainCanvas } from './MountainCanvas';
import { ArrowRight, Compass, ShieldCheck, Sparkles, Navigation, CloudSnow, Wind, Zap } from 'lucide-react';
import { LIVE_TELEMETRY_DATA } from '../../data/elevationRoute';

interface HeroProps {
  onOpenBooking: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking }) => {
  return (
    <section className="relative min-h-[96vh] flex items-center justify-center pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Real Mountain Panorama Photographic Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-700 scale-105"
        style={{ backgroundImage: `url('/images/hero-annapurna-white.jpg')` }}
      />

      {/* Atmospheric Frosted Glass & Gradient Overlays - Seamless into white */}
      <div className="absolute inset-0 backdrop-blur-[2px] bg-gradient-to-b from-white/85 via-white/65 to-[#F8FAFD]" />

      {/* 3D Topographic Wireframe & Snow Crystals Canvas */}
      <MountainCanvas />

      {/* Ambient Lighting Blurs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-sky-400/20 blur-[130px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto w-full flex flex-col items-center text-center">
        {/* Futuristic Status Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs sm:text-sm font-mono tracking-wide mb-6 shadow-md backdrop-blur-xl border bg-white/95 border-sky-300 text-sky-900 shadow-sky-500/10">
          <span className="w-2 h-2 rounded-full bg-sky-500 animate-ping" />
          <span className="font-black tracking-wider">ANNAPURNABASECAMP.ORG</span>
          <span className="text-slate-400">//</span>
          <span className="font-bold text-sky-700">OFFICIAL EXPEDITION PORTAL</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight max-w-5xl leading-[1.06] mb-6 drop-shadow-xs text-slate-950">
          JOURNEY TO THE{' '}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-sky-600 via-cyan-600 to-blue-700">
            SACRED SANCTUARY
          </span>
        </h1>

        {/* Subtitle */}
        <p className="max-w-2xl text-base sm:text-lg md:text-xl font-medium leading-relaxed mb-8 drop-shadow-2xs text-slate-700">
          The official authority portal and luxury booking gateway for Annapurna Base Camp (4,130m). 
          Choose your comfort tier from <span className="text-sky-700 font-extrabold">3-Star Explorer</span>, <span className="text-blue-700 font-extrabold">4-Star Premier</span>, to <span className="text-amber-700 font-extrabold">5-Star Royal Sanctuary</span> with dedicated 1:1 Sherpa porters and VIP helicopter descents.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-14 w-full sm:w-auto">
          <button
            onClick={onOpenBooking}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl font-black text-sm sm:text-base bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 text-white shadow-xl shadow-sky-500/30 hover:shadow-sky-400/45 hover:scale-[1.02] transition-all flex items-center justify-center gap-3 active:scale-95 tracking-wide"
          >
            <span>CONFIGURE & BOOK EXPEDITION</span>
            <ArrowRight className="w-5 h-5" />
          </button>

          <a
            href="#packages"
            className="w-full sm:w-auto px-7 py-4 rounded-2xl font-bold text-sm sm:text-base border backdrop-blur-xl transition-all flex items-center justify-center gap-2.5 bg-white/95 hover:bg-white text-slate-900 border-sky-300 shadow-md hover:shadow-lg"
          >
            <Sparkles className="w-5 h-5 text-amber-500" />
            <span>Explore 3★, 4★, 5★ Tiers</span>
          </a>
        </div>

        {/* Cyber-Alpine Telemetry HUD Card */}
        <div className="w-full max-w-5xl glass-panel hud-border rounded-3xl p-5 sm:p-7 text-left shadow-xl backdrop-blur-2xl bg-white/95 border border-sky-200">
          <div className="flex items-center justify-between border-b border-sky-200/60 pb-3 mb-4 flex-wrap gap-2">
            <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-widest uppercase text-sky-700">
              <Navigation className="w-4 h-4 animate-spin text-sky-600" style={{ animationDuration: '10s' }} />
              <span>REAL-TIME SANCTUARY TELEMETRY</span>
            </div>
            <div className="flex items-center gap-2 text-[11px] font-mono text-emerald-700 font-extrabold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>SATELLITE LINK: ACTIVE ({LIVE_TELEMETRY_DATA.satelliteConnection})</span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-5 font-mono">
            {/* Stat 1: Target Elevation */}
            <div className="rounded-2xl p-4 border transition-all bg-white/95 border-sky-200 shadow-xs">
              <div className="text-[11px] text-slate-500 uppercase tracking-wider flex items-center gap-1.5 mb-1 font-semibold">
                <Compass className="w-3.5 h-3.5 text-sky-600" />
                <span>Target Elevation</span>
              </div>
              <div className="text-2xl sm:text-3xl font-black text-slate-950">4,130 m</div>
              <div className="text-[10px] text-sky-700 font-extrabold">13,550 FT ALTITUDE</div>
            </div>

            {/* Stat 2: O2 Saturation */}
            <div className="rounded-2xl p-4 border transition-all bg-white/95 border-amber-200 shadow-xs">
              <div className="text-[11px] text-slate-500 uppercase tracking-wider flex items-center gap-1.5 mb-1 font-semibold">
                <Wind className="w-3.5 h-3.5 text-amber-500" />
                <span>Summit O₂ Ratio</span>
              </div>
              <div className="text-2xl sm:text-3xl font-black text-amber-700">62.4 %</div>
              <div className="text-[10px] text-slate-500 font-medium">Supplemental O2 Ready</div>
            </div>

            {/* Stat 3: Weather */}
            <div className="rounded-2xl p-4 border transition-all bg-white/95 border-sky-200 shadow-xs">
              <div className="text-[11px] text-slate-500 uppercase tracking-wider flex items-center gap-1.5 mb-1 font-semibold">
                <CloudSnow className="w-3.5 h-3.5 text-sky-600" />
                <span>Current ABC Temp</span>
              </div>
              <div className="text-2xl sm:text-3xl font-black text-slate-950">{LIVE_TELEMETRY_DATA.currentTempAbc}</div>
              <div className="text-[10px] text-sky-700 font-extrabold">{LIVE_TELEMETRY_DATA.windSpeedAbc}</div>
            </div>

            {/* Stat 4: Porter Ratio Support */}
            <div className="rounded-2xl p-4 border transition-all bg-white/95 border-emerald-200 shadow-xs">
              <div className="text-[11px] text-slate-500 uppercase tracking-wider flex items-center gap-1.5 mb-1 font-semibold">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Porter Ratios</span>
              </div>
              <div className="text-2xl sm:text-3xl font-black text-emerald-700">1:1 or 1:2</div>
              <div className="text-[10px] text-emerald-700 font-extrabold">Insured Alpine Porters</div>
            </div>
          </div>

          {/* Quick Feature Highlights row */}
          <div className="mt-4 pt-3 border-t border-sky-100 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-700 font-sans">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-sky-600" />
              <span>Full Permits Included: <strong className="text-slate-950 font-black">ACAP & TIMS</strong></span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-amber-500 font-black">★ 3 Tiers:</span>
              <span className="font-medium">3★ Standard, 4★ Deluxe, 5★ Dwarika\'s & Pavilions</span>
            </div>
            <div className="flex items-center gap-2 text-sky-700 font-mono font-bold">
              <span>🚁 Airbus H125 Heli Flight Back Option</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
