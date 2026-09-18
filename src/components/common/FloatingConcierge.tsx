import React, { useState } from 'react';
import { MessageSquare, X } from 'lucide-react';
import { trackWhatsAppClick } from '../../lib/analytics';

export const FloatingConcierge: React.FC = () => {
  const [minimized, setMinimized] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < 640;
    }
    return false;
  });

  return (
    <div className="fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-40">
      {!minimized ? (
        <div className="bg-white/95 backdrop-blur-xl border border-slate-200/90 shadow-2xl rounded-3xl p-3.5 sm:p-4 max-w-[calc(100vw-2rem)] w-80 text-slate-900 transition-all duration-300 animate-fadeIn relative">
          <button
            onClick={() => setMinimized(true)}
            className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs shadow-md hover:bg-slate-800 transition-colors"
            title="Minimize"
          >
            <X className="w-3.5 h-3.5" />
          </button>
          
          <div className="flex items-center gap-3 mb-2.5">
            <div className="relative">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-500 to-sky-600 text-white flex items-center justify-center font-black text-sm shadow-md">
                AS
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 ring-2 ring-white"></span>
            </div>
            <div>
              <div className="text-xs font-black text-slate-900 flex items-center gap-1">
                <span>Ang Sherpa</span>
                <span className="text-[10px] text-amber-600 font-semibold">• Lead Guide</span>
              </div>
              <div className="text-[10px] text-slate-500">Live from Pokhara Base</div>
            </div>
          </div>

          <p className="text-xs text-slate-600 leading-snug mb-3">
            Planning your Annapurna trek? Get instant route advice & season dates directly on WhatsApp.
          </p>

          <a
            href="https://wa.me/9779820107807?text=Namaste%20Ang%20Sherpa!%20I%20am%20planning%20an%20Annapurna%20Base%20Camp%20trek%20and%20would%20love%20some%20guidance."
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackWhatsAppClick('Floating Concierge')}
            className="w-full py-2 px-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-emerald-500/25 transition-all"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Chat on WhatsApp</span>
          </a>
        </div>
      ) : (
        <button
          onClick={() => setMinimized(false)}
          className="bg-emerald-500 hover:bg-emerald-600 text-white p-3 sm:p-3.5 rounded-full shadow-2xl flex items-center gap-2 group cursor-pointer transition-all hover:scale-105 active:scale-95"
          title="Open Sherpa Concierge"
        >
          <div className="relative">
            <MessageSquare className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-amber-300 animate-ping"></span>
          </div>
          <span className="hidden sm:inline text-xs font-extrabold pr-1">Chat with Guide</span>
        </button>
      )}
    </div>
  );
};
