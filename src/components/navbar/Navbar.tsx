import React, { useState } from 'react';
import { Mountain, Phone, Mail, MessageSquare, ShieldCheck, Compass, Sparkles, Calendar, Menu, X, ArrowUpRight } from 'lucide-react';
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
    <header className="sticky top-0 z-50 transition-all duration-300">
      {/* Top Utility Bar - Prestigious Travel Agency Style */}
      <div className="bg-slate-900 text-slate-200 text-xs py-2 px-4 sm:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Left: Contact Info & Authority Badge */}
          <div className="flex items-center gap-4 sm:gap-6 text-[11px] sm:text-xs">
            <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Official ACAP & TIMS Authorized Portal</span>
            </div>
            <span className="hidden md:inline text-slate-600">•</span>
            <div className="hidden md:flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors">
              <Phone className="w-3 h-3 text-sky-400" />
              <span>+977 1 4700888 (KTM HQ)</span>
            </div>
            <span className="hidden lg:inline text-slate-600">•</span>
            <div className="hidden lg:flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors">
              <Mail className="w-3 h-3 text-sky-400" />
              <span>expedition@annapurnabasecamp.org</span>
            </div>
          </div>

          {/* Right: Quick Assistance & Weather note */}
          <div className="flex items-center gap-3 text-[11px]">
            <a
              href="https://wa.me/9779851082437?text=Namaste!%20I%20am%20interested%20in%20booking%20the%20Annapurna%20Base%20Camp%20Trek."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-500/30 transition-colors font-medium"
            >
              <MessageSquare className="w-3 h-3" />
              <span>WhatsApp Dispatch</span>
            </a>
            <div className="hidden sm:flex items-center gap-1.5 text-slate-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Sanctuary Trails Open (4,130m)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Luxury Navigation Bar */}
      <div className={`transition-all duration-300 px-4 sm:px-8 py-3.5 ${
        telemetry.isScrolled
          ? 'bg-white/95 backdrop-blur-xl border-b border-slate-200 shadow-md'
          : 'bg-white/90 backdrop-blur-md border-b border-slate-200/80 shadow-xs'
      }`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Brand Logo & Title */}
          <a href="#" className="flex items-center gap-3 group shrink-0">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl flex items-center justify-center overflow-hidden bg-gradient-to-br from-sky-500 via-blue-600 to-indigo-700 text-white shadow-md shadow-sky-500/20 group-hover:scale-105 transition-transform shrink-0">
              <Mountain className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-base sm:text-lg tracking-tight text-slate-900 leading-none">
                  ANNAPURNA
                </span>
                <span className="text-[10px] sm:text-[11px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider bg-amber-50 border border-amber-200 text-amber-800 whitespace-nowrap">
                  BASE CAMP 4,130M
                </span>
              </div>
              <div className="text-[10px] sm:text-[11px] font-semibold text-slate-500 tracking-wide mt-0.5 whitespace-nowrap">
                Annapurnabasecamp.org — Official Expedition Portal
              </div>
            </div>
          </a>

          {/* Desktop Navigation Links - Garnished with Balanced Spacing & No-Wrap */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2 text-[13px] xl:text-sm font-semibold text-slate-600">
            <a
              href="#packages"
              className="px-3 py-2 rounded-xl hover:text-slate-950 hover:bg-slate-100/80 transition-all whitespace-nowrap"
            >
              Expedition Tiers
            </a>
            <a
              href="#elevation"
              className="px-3 py-2 rounded-xl hover:text-slate-950 hover:bg-slate-100/80 transition-all whitespace-nowrap"
            >
              Route & Altitude
            </a>
            <a
              href="#itineraries"
              className="px-3 py-2 rounded-xl hover:text-slate-950 hover:bg-slate-100/80 transition-all whitespace-nowrap"
            >
              Itinerary
            </a>
            <a
              href="#safety"
              className="px-3 py-2 rounded-xl hover:text-slate-950 hover:bg-slate-100/80 transition-all whitespace-nowrap"
            >
              Safety & Gear
            </a>
            <a
              href="#booking"
              className="px-3 py-2 rounded-xl hover:text-slate-950 hover:bg-slate-100/80 transition-all whitespace-nowrap"
            >
              Pricing
            </a>
            <a
              href="#faq"
              className="px-3 py-2 rounded-xl hover:text-slate-950 hover:bg-slate-100/80 transition-all whitespace-nowrap"
            >
              FAQ
            </a>
          </nav>

          {/* Action CTA */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onOpenBooking}
              className="px-4 xl:px-5 py-2.5 rounded-xl font-extrabold text-xs xl:text-sm bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-600 text-white shadow-md shadow-sky-600/25 hover:shadow-sky-600/40 hover:brightness-105 active:scale-95 transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap shrink-0"
            >
              <Calendar className="w-4 h-4 shrink-0" />
              <span>Book Expedition</span>
              <ArrowUpRight className="w-3.5 h-3.5 shrink-0 opacity-80" />
            </button>

            {/* Mobile Menu Trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-800 transition cursor-pointer"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 pt-3 border-t border-slate-100 bg-white rounded-2xl p-4 flex flex-col gap-2.5 font-medium text-sm text-slate-800 shadow-xl animate-in fade-in">
            <a 
              href="#packages" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-2.5 px-3 rounded-xl hover:bg-slate-50 flex items-center gap-2 text-slate-900 font-semibold"
            >
              <Sparkles className="w-4 h-4 text-amber-500" /> Expedition Tiers (3★, 4★, 5★)
            </a>
            <a 
              href="#elevation" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-2.5 px-3 rounded-xl hover:bg-slate-50 flex items-center gap-2 text-slate-900 font-semibold"
            >
              <Compass className="w-4 h-4 text-sky-600" /> Route & Altitude Profile
            </a>
            <a 
              href="#itineraries" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-2.5 px-3 rounded-xl hover:bg-slate-50 text-slate-900 font-semibold"
            >
              Day-by-Day Journey Itinerary
            </a>
            <a 
              href="#safety" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-2.5 px-3 rounded-xl hover:bg-slate-50 flex items-center gap-2 text-slate-900 font-semibold"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-600" /> Acclimatization & Packing Checklist
            </a>
            <a 
              href="#faq" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-2.5 px-3 rounded-xl hover:bg-slate-50 text-slate-900 font-semibold"
            >
              Frequently Asked Questions (FAQ)
            </a>
            <a 
              href="#booking" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-2.5 px-3 rounded-xl hover:bg-slate-50 text-slate-900 font-semibold"
            >
              Dynamic Pricing Configurator
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full mt-2 py-3 rounded-xl font-bold text-center bg-sky-600 text-white shadow-md hover:bg-sky-500 transition cursor-pointer"
            >
              Reserve Sanctuary Trek
            </button>
          </div>
        )}
      </div>

      {/* Subtle Scroll Progress Indicator */}
      <div className="w-full h-1 bg-slate-100 relative">
        <div 
          className="h-full bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 transition-all duration-150"
          style={{ width: `${Math.max(telemetry.scrollProgress * 100, 2)}%` }}
        />
      </div>
    </header>
  );
};
