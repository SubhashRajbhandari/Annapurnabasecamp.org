import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { useScrollTelemetry } from './hooks/useScrollTelemetry';
import { Navbar } from './components/navbar/Navbar';
import { Hero } from './components/hero/Hero';
import { ElevationProfile } from './components/elevation/ElevationProfile';
import { TierSelector } from './components/packages/TierSelector';
import { FieldGuides } from './components/guides/FieldGuides';
import { ItineraryTimeline } from './components/packages/ItineraryTimeline';
import { BookingEngine } from './components/booking/BookingEngine';
import { BookingModal } from './components/booking/BookingModal';
import { AltitudeGuide } from './components/safety/AltitudeGuide';
import { GearChecklist } from './components/safety/GearChecklist';
import { FaqSection } from './components/faq/FaqSection';
import { FloatingConcierge } from './components/common/FloatingConcierge';
import { Footer } from './components/footer/Footer';
import type { PackageTier, BookingFormState } from './types/trek';

export const App: React.FC = () => {
  const telemetry = useScrollTelemetry();
  const [activeTier, setActiveTier] = useState<PackageTier>('4-star'); // default to 4-star Mountain Premier
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [modalBookingData, setModalBookingData] = useState<BookingFormState>({
    tier: '4-star',
    porterOption: 'private-1-1',
    groupSize: 2,
    startDate: '2026-10-10',
    heliReturn: false,
    gearRental: false,
    satelliteDevice: false,
    privateJeep: false,
    currency: 'USD',
    fullName: '',
    email: '',
    nationality: '',
    phone: '',
    specialRequests: ''
  });
  const [modalPrice, setModalPrice] = useState<number>(2900);

  useEffect(() => {
    document.documentElement.classList.add('light');
    document.documentElement.classList.remove('dark');
  }, []);

  // Trigger booking jump
  const handleOpenBooking = () => {
    const bookingSection = document.getElementById('booking');
    if (bookingSection) {
      bookingSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      setModalOpen(true);
    }
  };

  const handleSelectTier = (tier: PackageTier) => {
    setActiveTier(tier);
  };

  const handleBookTier = (tier: PackageTier) => {
    setActiveTier(tier);
    const bookingSection = document.getElementById('booking');
    if (bookingSection) {
      bookingSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenModalWithState = (state: BookingFormState, totalPrice: number) => {
    setModalBookingData(state);
    setModalPrice(totalPrice);
    setModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col selection:bg-amber-500 selection:text-white w-full max-w-full overflow-x-hidden">
      {/* Prestigious Luxury Navbar with Utility Bar */}
      <Navbar
        telemetry={telemetry}
        onOpenBooking={handleOpenBooking}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full overflow-hidden">
        {/* Cinematic Hero Section with Quick-Booking Floating Bar */}
        <Hero onOpenBooking={handleOpenBooking} />

        {/* 3-Star, 4-Star, 5-Star Tiers & Comparison Matrix */}
        <TierSelector
          activeTier={activeTier}
          onSelectTier={handleSelectTier}
          onBookTier={handleBookTier}
        />

        {/* High-Authority Himalayan Field Guides & Organic Search Knowledge Hub */}
        <FieldGuides />

        {/* Interactive Mountain Trail & Altitude Elevation Guide */}
        <ElevationProfile />

        {/* Comprehensive Day-by-Day Itineraries */}
        <ItineraryTimeline
          activeTier={activeTier}
          onSelectTier={handleSelectTier}
          onBookTier={handleBookTier}
        />

        {/* Real-time Dynamic Booking & Customizer Engine */}
        <BookingEngine
          initialTier={activeTier}
          onOpenModalWithState={handleOpenModalWithState}
        />

        {/* Expedition Safety, Acclimatization Guidelines & Packing Checklist */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <AltitudeGuide />
          <GearChecklist />
        </section>

        {/* Essential Himalayan Knowledge & FAQs for Trekking in Nepal */}
        <FaqSection />
      </main>

      {/* Floating Sherpa Concierge for Instant WhatsApp Conversions */}
      <FloatingConcierge />

      {/* Floating Smooth Scroll to Top / Ascent Telemetry Button */}
      {telemetry.isScrolled && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 px-3 py-2 sm:px-4 sm:py-2.5 rounded-full bg-slate-900/90 hover:bg-slate-950 text-white backdrop-blur-md border border-slate-700/80 shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-2 cursor-pointer group animate-in fade-in"
          aria-label="Scroll back to top"
          title="Return to Trailhead (822m)"
        >
          <ArrowUp className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-sky-400 group-hover:-translate-y-0.5 transition-transform" />
          <span className="text-[11px] sm:text-xs font-bold font-mono tracking-tight">
            Top <span className="text-slate-400">({telemetry.virtualAltitude}m)</span>
          </span>
        </button>
      )}

      {/* Official Portal Footer */}
      <Footer />

      {/* Booking & Permit Registration Modal */}
      <BookingModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        bookingData={modalBookingData}
        totalPrice={modalPrice}
      />
    </div>
  );
};

export default App;
