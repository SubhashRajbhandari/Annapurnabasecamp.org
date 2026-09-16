import React from 'react';
import { SAFETY_AMS_GUIDELINES } from '../../data/gearList';
import { ShieldCheck, HeartPulse, PlaneTakeoff, PhoneCall } from 'lucide-react';

export const AltitudeGuide: React.FC = () => {
  return (
    <div className="bg-white rounded-3xl p-6 sm:p-10 mb-12 border border-slate-200 shadow-sm">
      <div className="flex items-center gap-2 text-xs text-emerald-700 font-bold mb-2">
        <ShieldCheck className="w-4 h-4 text-emerald-600" />
        <span>Expert Mountain Safety Protocols</span>
      </div>
      <h3 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight mb-3">
        Altitude Health & Acclimatization Guidelines
      </h3>
      <p className="text-slate-600 text-sm sm:text-base max-w-3xl leading-relaxed mb-8">
        At 4,130m (13,550ft), effective atmospheric oxygen drops to approximately 62.4% of sea-level density. Our itineraries strictly adhere to Wilderness Medical Society (WMS) acclimatization thresholds with measured daily elevation gain.
      </p>

      {/* 4 Safety Protocols */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {SAFETY_AMS_GUIDELINES.map((item, i) => (
          <div key={i} className="bg-slate-50 rounded-2xl p-5 border border-slate-200/80 flex items-start gap-4 shadow-2xs">
            <div className="w-11 h-11 rounded-2xl bg-white border border-slate-200 text-sky-600 flex items-center justify-center shrink-0 shadow-xs">
              <HeartPulse className="w-5 h-5 text-sky-600" />
            </div>
            <div>
              <div className="text-slate-900 font-bold text-sm sm:text-base mb-1">{item.rule}</div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {item.detail}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Emergency Helicopter & Medical Standby Banner */}
      <div className="bg-gradient-to-r from-red-50/80 via-white to-sky-50/80 border border-red-200 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-red-100 border border-red-200 text-red-600 flex items-center justify-center shrink-0">
            <PlaneTakeoff className="w-6 h-6" />
          </div>
          <div>
            <div className="text-sm sm:text-base font-bold text-slate-900 flex items-center gap-2">
              <span>Rapid H125 Helicopter Evacuation on Standby</span>
              <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-red-100 text-red-800 font-bold border border-red-200">
                25-Min Response
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Direct emergency evacuation coordination with Nepal Civil Aviation & Pokhara Heliport. Our lead Sherpas carry satellite transponders for instant coordinate relays.
            </p>
          </div>
        </div>

        <div className="shrink-0 flex items-center gap-3 text-xs">
          <div className="bg-white px-4 py-2.5 rounded-xl border border-slate-200 text-slate-900 font-semibold shadow-xs flex items-center gap-2">
            <PhoneCall className="w-4 h-4 text-sky-600" />
            <span>Emergency Dispatch: <a href="tel:+97714700888" className="font-bold hover:text-sky-600 transition-colors">+977 1 4700888</a></span>
          </div>
        </div>
      </div>
    </div>
  );
};
