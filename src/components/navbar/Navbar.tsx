import React, { useState, useEffect } from 'react';
import { Mountain, MessageSquare, ShieldCheck, Compass, Sparkles, Calendar, Menu, X, ArrowUpRight, BookOpen } from 'lucide-react';
import { trackWhatsAppClick } from '../../lib/analytics';
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
  const [scrollY, setScrollY] = useState(0);

  // Smooth real-time scroll tracking
  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Gradual multi-stage transition:
  // 1. 0px to 80px: 100% Transparent (no sudden change upon initial scroll)
  // 2. 80px to 320px: Translucent (frosted glass, mountain video visible through glass)
  // 3. 320px to 520px: Transitioning to Opaque
  // 4. 520px+: 100% Opaque white luxury navbar with bottom border & elevation shadow
  const fadeStart = 80;
  const fadeEnd = 500;
  const scrollRatio = Math.min(Math.max((scrollY - fadeStart) / (fadeEnd - fadeStart), 0), 1);

  // High-contrast text switch at 40% threshold
  const isLightHeader = scrollRatio > 0.4;

  const navLinks = [
    { href: '#packages', label: 'Expedition Tiers' },
    { href: '#guides', label: 'Field Guides' },
    { href: '#elevation', label: 'Route & Altitude' },
    { href: '#itineraries', label: 'Itinerary' },
    { href: '#safety', label: 'Safety & Gear' },
    { href: '#booking', label: 'Pricing' },
    { href: '#faq', label: 'FAQ' }
  ];

  return (
    <header className="fixed top-0 inset-x-0 z-50 w-full pointer-events-auto">
      {/* Main Luxury Navigation Bar with Dynamic Scroll-Interpolated Glass */}
      <div 
        className="px-3 sm:px-8 py-3 sm:py-3.5 relative border-b transition-[border-color,box-shadow] duration-200"
        style={{
          backgroundColor: `rgba(255, 255, 255, ${scrollRatio * 0.96})`,
          backdropFilter: `blur(${scrollRatio * 16}px)`,
          WebkitBackdropFilter: `blur(${scrollRatio * 16}px)`,
          borderBottomColor: scrollRatio > 0.1 ? `rgba(226, 232, 240, ${scrollRatio})` : 'transparent',
          boxShadow: scrollRatio > 0.2 
            ? `0 4px 20px -2px rgba(15, 23, 42, ${scrollRatio * 0.08})` 
            : 'none'
        }}
      >
        {/* Soft top gradient scrim that smoothly fades OUT as the white glass fades in */}
        <div 
          className="absolute inset-0 pointer-events-none transition-opacity duration-300 bg-gradient-to-b from-black/75 via-black/25 to-transparent"
          style={{ opacity: Math.max(0, 1 - scrollRatio * 2.2) }}
        />

        <div className="relative z-10 max-w-7xl mx-auto flex items-center justify-between gap-2">
          
          {/* Brand Logo & Title */}
          <a href="#" className="flex items-center gap-2 sm:gap-3 group shrink-0 min-w-0">
            <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-2xl flex items-center justify-center overflow-hidden bg-gradient-to-br from-sky-500 via-blue-600 to-indigo-700 text-white shadow-md shadow-sky-500/20 group-hover:scale-105 transition-transform shrink-0">
              <Mountain className="w-4 h-4 sm:w-6 sm:h-6" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className={`font-black text-sm sm:text-lg tracking-tight leading-none transition-colors duration-300 ${
                  isLightHeader ? 'text-slate-900' : 'text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]'
                }`}>
                  ANNAPURNA
                </span>
                <span className={`text-[9px] sm:text-[11px] px-1.5 sm:px-2 py-0.5 rounded-full font-bold uppercase tracking-wider transition-all duration-300 shrink-0 ${
                  isLightHeader
                    ? 'bg-amber-50 border border-amber-200 text-amber-800'
                    : 'bg-black/40 border border-white/25 text-amber-300 backdrop-blur-md'
                }`}>
                  4,130M
                </span>

                {/* Live Altitude Telemetry Badge (Gradually reveals as you descend the trail) */}
                {scrollRatio > 0.35 && (
                  <span className="hidden xl:inline-flex items-center gap-1.5 text-[11px] font-bold font-mono px-2.5 py-0.5 rounded-full bg-sky-50 text-sky-700 border border-sky-200/80 animate-in fade-in shrink-0 transition-opacity duration-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                    <span>▲ {telemetry.virtualAltitude.toLocaleString()}m ({telemetry.currentWaypoint.name})</span>
                  </span>
                )}
              </div>
              <div className={`text-[10px] sm:text-[11px] font-semibold tracking-wide mt-0.5 hidden sm:block truncate transition-colors duration-300 ${
                isLightHeader ? 'text-slate-500' : 'text-slate-200/90 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]'
              }`}>
                Annapurnabasecamp.org — Official Expedition Portal
              </div>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2 text-[13px] xl:text-sm font-semibold">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`px-3 py-2 rounded-xl transition-all whitespace-nowrap ${
                  isLightHeader
                    ? 'text-slate-600 hover:text-slate-950 hover:bg-slate-100/80'
                    : 'text-white/90 hover:text-white hover:bg-white/15 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]'
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Action CTA & Quick Contact */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* WhatsApp Direct Chat */}
            <a
              href="https://wa.me/9779820107807?text=Namaste!%20I%20am%20interested%20in%20booking%20the%20Annapurna%20Base%20Camp%20Trek."
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackWhatsAppClick('Navbar Direct Chat')}
              className={`hidden md:flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                isLightHeader
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100'
                  : 'bg-emerald-500/25 text-emerald-300 border border-emerald-400/30 hover:bg-emerald-500/35 backdrop-blur-md drop-shadow-sm'
              }`}
              title="Chat with Sherpa Team on WhatsApp"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </a>

            {/* Desktop / Tablet Book Button */}
            <button
              onClick={onOpenBooking}
              className="hidden sm:flex px-4 xl:px-5 py-2.5 rounded-xl font-extrabold text-xs xl:text-sm bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-600 text-white shadow-md shadow-sky-600/25 hover:shadow-sky-600/40 hover:brightness-105 active:scale-95 transition-all items-center gap-2 cursor-pointer whitespace-nowrap shrink-0"
            >
              <Calendar className="w-4 h-4 shrink-0" />
              <span>Book Expedition</span>
              <ArrowUpRight className="w-3.5 h-3.5 shrink-0 opacity-80" />
            </button>

            {/* Mobile Compact Book Button */}
            <button
              onClick={onOpenBooking}
              className="sm:hidden px-2.5 py-1.5 rounded-xl font-extrabold text-xs bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-600 text-white shadow-sm flex items-center gap-1 cursor-pointer shrink-0"
              aria-label="Book Expedition"
            >
              <Calendar className="w-3.5 h-3.5 shrink-0" />
              <span>Book</span>
            </button>

            {/* Mobile Menu Trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`lg:hidden p-2 sm:p-2.5 rounded-xl border transition cursor-pointer shrink-0 ${
                isLightHeader
                  ? 'bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-800'
                  : 'bg-black/40 hover:bg-black/60 border-white/25 text-white backdrop-blur-md shadow-sm'
              }`}
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className={`relative z-20 lg:hidden mt-3 pt-3 border-t rounded-2xl p-4 flex flex-col gap-2.5 font-medium text-sm shadow-2xl animate-in fade-in duration-200 ${
            isLightHeader
              ? 'bg-white border-slate-100 text-slate-800'
              : 'bg-slate-950/95 border-slate-800 text-white backdrop-blur-xl'
          }`}>
            <a 
              href="#packages" 
              onClick={() => setMobileMenuOpen(false)}
              className={`py-2.5 px-3 rounded-xl flex items-center gap-2 font-semibold ${
                isLightHeader ? 'hover:bg-slate-50 text-slate-900' : 'hover:bg-slate-800 text-white'
              }`}
            >
              <Sparkles className="w-4 h-4 text-amber-500" /> Expedition Tiers (3★, 4★, 5★)
            </a>
            <a 
              href="#guides" 
              onClick={() => setMobileMenuOpen(false)}
              className={`py-2.5 px-3 rounded-xl flex items-center gap-2 font-semibold ${
                isLightHeader ? 'hover:bg-slate-50 text-slate-900' : 'hover:bg-slate-800 text-white'
              }`}
            >
              <BookOpen className="w-4 h-4 text-sky-500" /> Expedition Field Guides & Knowledge Hub
            </a>
            <a 
              href="#elevation" 
              onClick={() => setMobileMenuOpen(false)}
              className={`py-2.5 px-3 rounded-xl flex items-center gap-2 font-semibold ${
                isLightHeader ? 'hover:bg-slate-50 text-slate-900' : 'hover:bg-slate-800 text-white'
              }`}
            >
              <Compass className="w-4 h-4 text-sky-500" /> Route & Altitude Profile
            </a>
            <a 
              href="#itineraries" 
              onClick={() => setMobileMenuOpen(false)}
              className={`py-2.5 px-3 rounded-xl font-semibold ${
                isLightHeader ? 'hover:bg-slate-50 text-slate-900' : 'hover:bg-slate-800 text-white'
              }`}
            >
              Day-by-Day Journey Itinerary
            </a>
            <a 
              href="#safety" 
              onClick={() => setMobileMenuOpen(false)}
              className={`py-2.5 px-3 rounded-xl flex items-center gap-2 font-semibold ${
                isLightHeader ? 'hover:bg-slate-50 text-slate-900' : 'hover:bg-slate-800 text-white'
              }`}
            >
              <ShieldCheck className="w-4 h-4 text-emerald-500" /> Acclimatization & Packing Checklist
            </a>
            <a 
              href="#faq" 
              onClick={() => setMobileMenuOpen(false)}
              className={`py-2.5 px-3 rounded-xl font-semibold ${
                isLightHeader ? 'hover:bg-slate-50 text-slate-900' : 'hover:bg-slate-800 text-white'
              }`}
            >
              Frequently Asked Questions (FAQ)
            </a>
            <a 
              href="#booking" 
              onClick={() => setMobileMenuOpen(false)}
              className={`py-2.5 px-3 rounded-xl font-semibold ${
                isLightHeader ? 'hover:bg-slate-50 text-slate-900' : 'hover:bg-slate-800 text-white'
              }`}
            >
              Dynamic Pricing Configurator
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full mt-2 py-3 rounded-xl font-bold text-center bg-sky-600 hover:bg-sky-500 text-white shadow-md transition cursor-pointer"
            >
              Reserve Sanctuary Trek
            </button>
          </div>
        )}
      </div>

      {/* Luminous Alpine Scroll Progress Indicator (Smoothly fades in as you scroll down) */}
      <div 
        className="w-full h-[3px] transition-opacity duration-200 relative overflow-visible"
        style={{ opacity: scrollRatio }}
      >
        <div 
          className="h-full bg-gradient-to-r from-sky-400 via-blue-600 to-amber-400 transition-all duration-150 relative shadow-[0_0_10px_rgba(2,132,199,0.7)]"
          style={{ width: `${Math.max(telemetry.scrollProgress * 100, 2)}%` }}
        >
          {/* Glowing Beacon Head on the leading edge */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-2.5 h-2.5 rounded-full bg-amber-300 border-2 border-slate-900 shadow-[0_0_8px_#fbbf24] transition-transform duration-150" />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
