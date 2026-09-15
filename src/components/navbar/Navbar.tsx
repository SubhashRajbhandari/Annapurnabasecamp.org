import React, { useState } from 'react';
import { Mountain, Compass, ShieldAlert, Sparkles, Menu, X, ArrowUpRight, Radio, Activity } from 'lucide-react';
import type { ScrollTelemetry } from '../../hooks/useScrollTelemetry';

interface NavbarProps {
  telemetry: ScrollTelemetry;
  onOpenBooking: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  telemetry,
  onOpenBooking
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      {/* Top Telemetry Ticker Bar - Glacier White */}
      <div className="bg-white/95 border-b border-sky-200/90 text-slate-700 text-[11px] font-mono-hud py-1.5 px-4 sm:px-8 flex items-center justify-between overflow-x-auto whitespace-nowrap shadow-xs backdrop-blur-md">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 font-bold tracking-wider uppercase text-sky-700">
            <Radio className="w-3.5 h-3.5 animate-pulse text-sky-600" />
            <span>Official Portal // Sanctuary Telemetry</span>
          </div>
          <span className="text-slate-300">|</span>
          <div className="hidden md:flex items-center gap-1.5">
            <span className="text-slate-500 font-medium">GPS:</span>
            <span className="font-bold text-slate-800">28.5306° N, 83.8780° E</span>
          </div>
          <span className="text-slate-300">|</span>
          <div className="hidden lg:flex items-center gap-1.5">
            <span className="text-slate-500 font-medium">SANCTUARY STATUS:</span>
            <span className="text-emerald-700 font-bold">TRAILS OPEN & CLEAR</span>
          </div>
        </div>

        {/* Live Virtual Altitude Gauge synced to scroll position */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 rounded-full px-3.5 py-0.5 border text-[11px] bg-sky-50 border-sky-300/80 text-slate-900 shadow-xs">
            <div className="flex items-center gap-1 font-bold text-sky-700">
              <Activity className="w-3 h-3 animate-pulse text-sky-600" />
              <span>ALTITUDE HUD:</span>
            </div>
            <span className="font-black tracking-wider">
              {telemetry.virtualAltitude.toLocaleString()} m
            </span>
            <span className="text-slate-500 text-[10px] font-medium">
              ({telemetry.virtualAltitudeFeet.toLocaleString()} ft)
            </span>
            <span className="text-slate-300">|</span>
            <span className="text-amber-700 font-black">
              O₂: {telemetry.oxygenPercentage}%
            </span>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className={`transition-all duration-300 px-4 sm:px-8 py-3.5 ${
        telemetry.isScrolled
          ? 'bg-white/95 backdrop-blur-xl border-b border-sky-200/90 shadow-sm'
          : 'bg-white/80 backdrop-blur-md border-b border-sky-100'
      }`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo & Brand */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 rounded-xl flex items-center justify-center overflow-hidden bg-gradient-to-br from-sky-500 to-blue-600 text-white shadow-md shadow-sky-500/20">
              <Mountain className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-lg sm:text-xl tracking-tight text-slate-950 group-hover:text-sky-600 transition-colors">
                  ANNAPURNA
                </span>
                <span className="text-[11px] px-2 py-0.5 rounded font-mono font-bold tracking-wider bg-sky-100 border border-sky-200 text-sky-800">
                  BASE CAMP
                </span>
              </div>
              <div className="text-[10px] tracking-widest text-slate-500 font-mono uppercase font-semibold">
                Annapurnabasecamp.org // 4,130M
              </div>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-bold text-slate-700">
            <a href="#elevation" className="hover:text-sky-600 transition-colors flex items-center gap-1.5">
              <Compass className="w-4 h-4 text-sky-600" />
              <span>Route & Altitude</span>
            </a>
            <a href="#packages" className="hover:text-sky-600 transition-colors flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Trek Tiers (3★, 4★, 5★)</span>
            </a>
            <a href="#itineraries" className="hover:text-sky-600 transition-colors">
              Full Itineraries
            </a>
            <a href="#safety" className="hover:text-sky-600 transition-colors flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4 text-emerald-600" />
              <span>Safety & Gear</span>
            </a>
          </nav>

          {/* Right Action CTA */}
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenBooking}
              className="relative group overflow-hidden px-5 sm:px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-lg shadow-sky-500/25 hover:from-sky-400 hover:to-blue-500 transition-all active:scale-95 flex items-center gap-2"
            >
              <span className="relative z-10 uppercase tracking-wider">Book Expedition</span>
              <ArrowUpRight className="w-4 h-4 relative z-10 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>

            {/* Mobile Menu Trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg bg-slate-100 border border-slate-300 text-slate-800"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-4 pt-4 border-t border-sky-100 bg-white rounded-2xl p-4 flex flex-col gap-3 font-medium text-sm text-slate-800 shadow-xl">
            <a 
              href="#elevation" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-3 rounded-lg hover:bg-sky-50 flex items-center gap-2 text-sky-600 font-semibold"
            >
              <Compass className="w-4 h-4" /> Route & Altitude Profile
            </a>
            <a 
              href="#packages" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-3 rounded-lg hover:bg-sky-50 flex items-center gap-2 text-amber-600 font-semibold"
            >
              <Sparkles className="w-4 h-4" /> Package Tiers (3★, 4★, 5★)
            </a>
            <a 
              href="#itineraries" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-3 rounded-lg hover:bg-sky-50 font-semibold"
            >
              Detailed Day-by-Day Itineraries
            </a>
            <a 
              href="#safety" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-3 rounded-lg hover:bg-sky-50 flex items-center gap-2 text-emerald-600 font-semibold"
            >
              <ShieldAlert className="w-4 h-4" /> Safety Protocol & Gear Checklist
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full mt-2 py-3 rounded-xl font-bold text-center bg-sky-500 text-white shadow-md"
            >
              Book / Configure Package
            </button>
          </div>
        )}
      </div>

      {/* Persistent Virtual Elevation Progress Line */}
      <div className="w-full h-0.5 bg-sky-100 relative">
        <div 
          className="h-full bg-gradient-to-r from-sky-500 via-cyan-400 to-amber-500 transition-all duration-150"
          style={{ width: `${Math.max(telemetry.scrollProgress * 100, 2)}%` }}
        />
      </div>
    </header>
  );
};
