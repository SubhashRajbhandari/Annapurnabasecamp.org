import React, { useState } from 'react';
import {
  X,
  Send,
  CheckCircle2,
  Sparkles,
  HelpCircle,
  Mail,
  Phone,
  User,
  Calendar,
  Loader2,
  Compass
} from 'lucide-react';
import { sendGeneralInquiryEmail } from '../../services/emailService';
import { trackEvent } from '../../lib/analytics';
import confetti from 'canvas-confetti';

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTopic?: string;
}

export const InquiryModal: React.FC<InquiryModalProps> = ({
  isOpen,
  onClose,
  defaultTopic = 'Custom Itinerary & Dates'
}) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [topic, setTopic] = useState(defaultTopic);
  const [preferredSeason, setPreferredSeason] = useState('Autumn 2026 (Oct - Nov)');
  const [message, setMessage] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const result = await sendGeneralInquiryEmail({
        fullName,
        email,
        phone,
        topic,
        preferredSeason,
        message
      });

      if (result.success) {
        setIsSubmitted(true);
        trackEvent('generate_lead', {
          lead_type: 'General Website Inquiry',
          topic
        });
        try {
          confetti({
            particleCount: 50,
            spread: 60,
            origin: { y: 0.6 }
          });
        } catch {
          // ignore if canvas-confetti fails
        }
      } else {
        setSubmitError(result.message || 'Failed to dispatch inquiry. Please try again.');
      }
    } catch (err: unknown) {
      setSubmitError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setFullName('');
    setEmail('');
    setPhone('');
    setMessage('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Ribbon */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950 text-white p-6 sm:p-7 relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-2 text-sky-400 text-xs font-bold uppercase tracking-wider mb-1.5">
            <Compass className="w-4 h-4 animate-spin-slow" />
            <span>Expedition Command • Direct Inquiries</span>
          </div>

          <h3 className="text-xl sm:text-2xl font-black tracking-tight text-white">
            Ask a Question or Request Custom Itinerary
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Have questions about dates, fitness, luxury lodges, or helicopter charters? Our team in Pokhara will email you right back.
          </p>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-7">
          {isSubmitted ? (
            <div className="text-center py-8 space-y-4 animate-in zoom-in-95 duration-300">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center shadow-inner">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <div>
                <h4 className="text-xl font-black text-slate-900">Namaste, {fullName}!</h4>
                <p className="text-sm text-slate-600 mt-1.5 max-w-md mx-auto">
                  Your query regarding <span className="font-bold text-slate-800">&ldquo;{topic}&rdquo;</span> has been sent to our Expedition Command at <span className="font-semibold text-slate-800">subhash.link123@gmail.com</span>.
                </p>
                <div className="mt-4 p-3.5 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-600 max-w-sm mx-auto">
                  <span>We will reply directly to </span>
                  <span className="font-mono font-bold text-sky-700">{email}</span>
                  <span> within 2 to 4 hours.</span>
                </div>
              </div>

              <div className="pt-4">
                <button
                  onClick={handleReset}
                  className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
                >
                  Close & Continue Exploring
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {submitError && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-center gap-2">
                  <span className="font-bold">Error:</span> {submitError}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Your Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Subhash / Sarah Jenkins"
                      className="w-full pl-9 pr-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500 bg-slate-50/50"
                    />
                  </div>
                </div>

                {/* Email Address */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@example.com"
                      className="w-full pl-9 pr-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500 bg-slate-50/50"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Phone / WhatsApp */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Phone / WhatsApp <span className="text-slate-400 font-normal">(Optional)</span>
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+1 (555) 000-0000"
                      className="w-full pl-9 pr-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500 bg-slate-50/50"
                    />
                  </div>
                </div>

                {/* Preferred Season */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Estimated Travel Season
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <select
                      value={preferredSeason}
                      onChange={(e) => setPreferredSeason(e.target.value)}
                      className="w-full pl-9 pr-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500 bg-slate-50/50 appearance-none"
                    >
                      <option value="Autumn 2026 (Oct - Nov)">Autumn 2026 (Oct – Nov)</option>
                      <option value="Spring 2027 (Mar - May)">Spring 2027 (Mar – May)</option>
                      <option value="Winter 2026/27 (Dec - Jan)">Winter 2026/27 (Dec – Jan)</option>
                      <option value="Autumn 2027">Autumn 2027</option>
                      <option value="Just inquiring / Dates flexible">Dates flexible / Just exploring</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Inquiry Topic */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Inquiry Topic
                </label>
                <div className="relative">
                  <HelpCircle className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <select
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    className="w-full pl-9 pr-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500 bg-slate-50/50 appearance-none"
                  >
                    <option value="Custom Itinerary & Dates">Custom Itinerary & Specific Dates</option>
                    <option value="Helicopter Charter Return Rates">Helicopter Charter & Return Rates</option>
                    <option value="Group / Private Family Trek">Group / Private Family Trek</option>
                    <option value="Trek Difficulty & Physical Training">Trek Difficulty & Physical Training</option>
                    <option value="Permits & Mandatory Guide Rules">Permits & Mandatory Guide Rules</option>
                    <option value="Dietary / Solo Female Traveler">Dietary Requirements / Solo Traveler</option>
                    <option value="General Question">General Question</option>
                  </select>
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Your Question or Custom Request *
                </label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us what you have in mind (e.g. how many days you have, any dietary needs, preferred pace, or questions about trail conditions)..."
                  className="w-full p-3.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500 bg-slate-50/50 resize-none leading-relaxed"
                />
              </div>

              {/* Notice & Submit Button */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                  <span>Delivered directly to lead expedition guides</span>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-sky-500/20 transition-all cursor-pointer disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Dispatching Query...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send Inquiry</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
