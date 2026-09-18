import React, { useState } from 'react';
import type { BookingFormState } from '../../types/trek';
import { TREK_PACKAGES } from '../../data/packages';
import { createBooking } from '../../services/bookingService';
import { isSupabaseConfigured } from '../../lib/supabase';
import { trackEvent } from '../../lib/analytics';
import confetti from 'canvas-confetti';
import {
  X,
  CheckCircle2,
  ShieldCheck,
  Download,
  Calendar,
  Users,
  Send,
  UploadCloud,
  FileCheck,
  AlertCircle,
  Loader2,
  Database
} from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookingData: BookingFormState;
  totalPrice: number;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  bookingData,
  totalPrice
}) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [nationality, setNationality] = useState('');
  const [dietary, setDietary] = useState('Standard Himalayan Full Board');
  const [passportFile, setPassportFile] = useState<File | null>(null);
  const [insuranceFile, setInsuranceFile] = useState<File | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isMock, setIsMock] = useState(!isSupabaseConfigured);
  const [reservationCode, setReservationCode] = useState('');

  if (!isOpen) return null;

  const currentPkg = TREK_PACKAGES[bookingData.tier];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const basePrice = currentPkg.basePriceUsd * bookingData.groupSize;
      const addOnPrice = Math.max(0, totalPrice - basePrice);

      const result = await createBooking({
        tier: bookingData.tier,
        porterOption: bookingData.porterOption,
        groupSize: bookingData.groupSize,
        startDate: bookingData.startDate,
        heliReturn: bookingData.heliReturn,
        gearRental: bookingData.gearRental,
        satelliteDevice: bookingData.satelliteDevice,
        privateJeep: bookingData.privateJeep,
        currency: bookingData.currency,
        basePrice,
        addOnPrice,
        totalPrice,
        fullName,
        email,
        phone,
        nationality,
        dietary,
        passportFile,
        insuranceFile
      });

      if (result.success) {
        setReservationCode(result.bookingCode);
        setIsMock(result.isMock);
        setIsSubmitted(true);

        // Track official conversion in Google Analytics 4
        trackEvent('purchase', {
          transaction_id: result.bookingCode,
          value: totalPrice,
          currency: bookingData.currency,
          items: [{ item_name: currentPkg.title, price: totalPrice }]
        });
        trackEvent('generate_lead', {
          currency: bookingData.currency,
          value: totalPrice,
          lead_type: 'Sanctuary Trek Reservation'
        });

        try {
          confetti({
            particleCount: 120,
            spread: 80,
            origin: { y: 0.6 },
            colors: ['#0284C7', '#38BDF8', '#F59E0B', '#10B981']
          });
        } catch {
          // safe fallback
        }
      } else {
        setSubmitError(result.error || 'Failed to submit reservation. Please check connection and try again.');
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'An unexpected error occurred during submission.';
      setSubmitError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm overflow-y-auto animate-in fade-in">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-2xl my-8 text-slate-900 max-h-[92vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2.5 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSubmitted ? (
          <div>
            {/* Modal Title */}
            <div className="mb-6">
              <div className="text-xs text-amber-700 uppercase tracking-wider mb-1 flex items-center gap-1.5 font-bold">
                <ShieldCheck className="w-4 h-4 text-amber-600" />
                <span>Official Government ACAP Permit & Registration</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900">
                Reserve Your Sanctuary Expedition
              </h3>
              <p className="text-slate-600 text-xs sm:text-sm mt-1">
                Lock in your certified mountain guides, dedicated porters, and lodge permits for Annapurna Base Camp (4,130m).
              </p>
            </div>

            {/* Selected Summary Pill */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 mb-6 text-xs grid grid-cols-2 sm:grid-cols-4 gap-3 shadow-xs">
              <div>
                <span className="text-slate-500 block text-[11px] font-semibold">Service Tier:</span>
                <span className="text-slate-900 font-extrabold">{currentPkg.title} ({currentPkg.starRating}★)</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[11px] font-semibold">Trek Party:</span>
                <span className="text-sky-700 font-extrabold flex items-center gap-1">
                  <Users className="w-3.5 h-3.5 text-sky-600" /> {bookingData.groupSize} Trekkers
                </span>
              </div>
              <div>
                <span className="text-slate-500 block text-[11px] font-semibold">Start Date:</span>
                <span className="text-amber-700 font-extrabold flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-amber-500" /> {bookingData.startDate}
                </span>
              </div>
              <div>
                <span className="text-slate-500 block text-[11px] font-semibold">Total Quote:</span>
                <span className="text-emerald-700 font-black text-sm">
                  {bookingData.currency === 'USD' ? `$${totalPrice.toLocaleString()}` : `NPR ${totalPrice.toLocaleString()}`}
                </span>
              </div>
            </div>

            {/* Error banner if submission failed */}
            {submitError && (
              <div className="mb-4 p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2.5">
                <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                <span>{submitError}</span>
              </div>
            )}

            {/* Lead Trekker Details Form */}
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-800 mb-1.5 font-bold uppercase text-[11px]">Lead Trekker Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Johnathan Doe"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white text-sm"
                  />
                </div>

                <div>
                  <label className="block text-slate-800 mb-1.5 font-bold uppercase text-[11px]">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="john@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-800 mb-1.5 font-bold uppercase text-[11px]">WhatsApp / Phone Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+1 (555) 000-0000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white text-sm"
                  />
                </div>

                <div>
                  <label className="block text-slate-800 mb-1.5 font-bold uppercase text-[11px]">Nationality (For ACAP Permit) *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. United States, Germany, India, Nepal"
                    value={nationality}
                    onChange={(e) => setNationality(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-800 mb-1.5 font-bold uppercase text-[11px]">Dietary & Meal Preferences</label>
                <select
                  value={dietary}
                  onChange={(e) => setDietary(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white text-sm"
                >
                  <option value="Standard Himalayan Full Board">Standard Himalayan Full Board (Dal Bhat, Pasta, Warm Soups)</option>
                  <option value="Vegetarian / Vegan">Strict Vegetarian / Plant-based</option>
                  <option value="Gluten-Free">Gluten-Free Mountain Meals</option>
                  <option value="High-Protein Gourmet">High-Protein Gourmet Athlete Nutrition</option>
                </select>
              </div>

              {/* Document Storage Uploads */}
              <div className="pt-2">
                <div className="text-xs font-bold uppercase text-slate-800 mb-2 flex items-center justify-between">
                  <span>Permit Documents (Optional at Checkout)</span>
                  <span className="text-[11px] text-slate-500 font-normal">Can also be submitted via WhatsApp later</span>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Passport Upload */}
                  <label className="border border-dashed border-slate-300 hover:border-sky-500 rounded-2xl p-3.5 flex flex-col items-center justify-center text-center cursor-pointer transition-all bg-slate-50 hover:bg-sky-50/50">
                    <input
                      type="file"
                      accept="image/*,.pdf"
                      onChange={(e) => setPassportFile(e.target.files?.[0] || null)}
                      className="hidden"
                    />
                    {passportFile ? (
                      <div className="flex items-center gap-1.5 text-emerald-700 font-bold">
                        <FileCheck className="w-4 h-4 text-emerald-600" />
                        <span className="truncate max-w-[180px]">{passportFile.name}</span>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center gap-1 text-slate-600">
                        <UploadCloud className="w-5 h-5 text-sky-600" />
                        <span className="font-bold text-xs text-slate-800">Passport Copy Scan</span>
                        <span className="text-[10px] text-slate-400">PDF, JPG, PNG up to 10MB</span>
                      </div>
                    )}
                  </label>

                  {/* Travel Insurance Upload */}
                  <label className="border border-dashed border-slate-300 hover:border-sky-500 rounded-2xl p-3.5 flex flex-col items-center justify-center text-center cursor-pointer transition-all bg-slate-50 hover:bg-sky-50/50">
                    <input
                      type="file"
                      accept="image/*,.pdf"
                      onChange={(e) => setInsuranceFile(e.target.files?.[0] || null)}
                      className="hidden"
                    />
                    {insuranceFile ? (
                      <div className="flex items-center gap-1.5 text-emerald-700 font-bold">
                        <FileCheck className="w-4 h-4 text-emerald-600" />
                        <span className="truncate max-w-[180px]">{insuranceFile.name}</span>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center gap-1 text-slate-600">
                        <UploadCloud className="w-5 h-5 text-sky-600" />
                        <span className="font-bold text-xs text-slate-800">Travel Medical Insurance</span>
                        <span className="text-[10px] text-slate-400">Coverage up to 5,000m</span>
                      </div>
                    )}
                  </label>
                </div>
              </div>

              <div className="pt-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-2xl font-extrabold text-sm uppercase tracking-wider bg-slate-900 text-white shadow-xl hover:bg-slate-800 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Confirming Sanctuary Reservation...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Confirm Official Sanctuary Reservation</span>
                    </>
                  )}
                </button>
              </div>

              <div className="text-[11px] text-slate-500 text-center">
                🔒 Protected under the Annapurna Conservation Area Project (ACAP) ethical trekking code. Official permit pre-allocation guaranteed.
              </div>
            </form>
          </div>
        ) : (
          /* Confirmation State */
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto animate-bounce">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold">
                Expedition Reservation Assigned
              </span>
              {isMock ? (
                <span className="px-2.5 py-0.5 rounded-full bg-slate-100 border border-slate-300 text-slate-600 text-[10px] flex items-center gap-1 font-semibold">
                  <Database className="w-3 h-3" /> Demo Sandbox Mode
                </span>
              ) : (
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-800 text-[10px] flex items-center gap-1 font-semibold">
                  <Database className="w-3 h-3 text-emerald-600" /> Supabase Database Verified
                </span>
              )}
            </div>

            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
              Namaste & Welcome, {fullName}!
            </h3>
            <p className="text-slate-600 text-sm max-w-md mx-auto">
              Your registration has been officially assigned. Our senior expedition leader in Kathmandu & Pokhara has received your dossier.
            </p>

            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 text-left max-w-md mx-auto text-xs space-y-2.5 shadow-xs">
              <div className="flex justify-between border-b border-slate-200 pb-2">
                <span className="text-slate-500">Dispatch Reference:</span>
                <span className="text-slate-900 font-extrabold">{reservationCode}</span>
              </div>
              <div className="flex justify-between border-b border-slate-200 pb-2">
                <span className="text-slate-500">Selected Tier:</span>
                <span className="text-slate-900 font-bold">{currentPkg.title} ({currentPkg.starRating}★)</span>
              </div>
              <div className="flex justify-between border-b border-slate-200 pb-2">
                <span className="text-slate-500">Porter Service:</span>
                <span className="text-emerald-700 font-bold">{bookingData.porterOption}</span>
              </div>
              <div className="flex justify-between border-b border-slate-200 pb-2">
                <span className="text-slate-500">Expedition Start:</span>
                <span className="text-amber-700 font-bold">{bookingData.startDate}</span>
              </div>
              <div className="flex justify-between border-b border-slate-200 pb-2">
                <span className="text-slate-500">Documents:</span>
                <span className="text-slate-800 font-semibold">
                  {passportFile ? 'Passport Attached' : 'Submit via WhatsApp Later'}
                </span>
              </div>
              <div className="flex justify-between pt-1">
                <span className="text-slate-500 font-semibold">Total Quote:</span>
                <span className="text-slate-900 font-black text-base">
                  {bookingData.currency === 'USD' ? `$${totalPrice.toLocaleString()}` : `NPR ${totalPrice.toLocaleString()}`}
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                onClick={() => {
                  alert(`Official Expedition Dossier for #${reservationCode} saved to your device!`);
                }}
                className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-sky-600 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-sky-500 shadow-md transition cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Download Expedition Dossier PDF</span>
              </button>

              <button
                onClick={onClose}
                className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs uppercase transition cursor-pointer"
              >
                Return to Portal
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
