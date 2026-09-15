import React from 'react';
import { SAFETY_AMS_GUIDELINES } from '../../data/gearList';
import { ShieldAlert, HeartPulse, PlaneTakeoff } from 'lucide-react';

export const AltitudeGuide: React.FC = () => {
  return (
    <div className="glass-panel hud-border rounded-3xl p-6 sm:p-10 mb-12">
      <div className="flex items-center gap-2 text-xs font-mono text-emerald-700 font-bold mb-2">
        <ShieldAlert className="w-4 h-4 text-emerald-600" />
        <span>OFFICIAL EXPEDITION SAFETY PROTOCOL</span>
      </div>
      <h3 className="text-2xl sm:text-4xl font-black text-slate-950 tracking-tight mb-4">
        ALTITUDE ACCLIMATIZATION & MEDICAL INTELLIGENCE
      </h3>
      <p className="text-slate-600 text-xs sm:text-sm max-w-3xl leading-relaxed mb-8">
        At 4,130m (13,550ft), effective atmospheric oxygen drops to approximately 62.4% of sea-level density. Our itineraries strictly follow Wilderness Medical Society (WMS) acclimatization thresholds.
      </p>

      {/* 4 Safety Protocols */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 font-mono">
        {SAFETY_AMS_GUIDELINES.map((item, i) => (
          <div key={i} className="bg-white rounded-2xl p-5 border border-sky-100 flex items-start gap-4 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-sky-50 border border-sky-200 text-sky-600 flex items-center justify-center shrink-0">
              <HeartPulse className="w-5 h-5" />
            </div>
            <div>
              <div className="text-slate-900 font-bold text-sm mb-1">{item.rule}</div>
              <p className="text-xs text-slate-600 leading-relaxed font-sans">
                {item.detail}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Emergency Helicopter & Medical Standby Banner */}
      <div className="bg-gradient-to-r from-red-50/90 via-white to-sky-50/90 border border-red-200 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-red-100 border border-red-200 text-red-600 flex items-center justify-center shrink-0">
            <PlaneTakeoff className="w-6 h-6" />
          </div>
          <div>
            <div className="text-sm font-mono font-bold text-slate-900 uppercase flex items-center gap-2">
              <span>RAPID H125 HELICOPTER DISPATCH ON STANDBY</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-red-100 text-red-700 font-mono font-bold border border-red-200">
                25-MIN EVAC
              </span>
            </div>
            <p className="text-xs text-slate-600 font-sans mt-1">
              Direct emergency evacuation coordination with Nepal Civil Aviation & Pokhara Heliport. Our lead guides are equipped with satellite transponders for instant coordinate relays.
            </p>
          </div>
        </div>

        <div className="shrink-0 flex items-center gap-3 text-xs font-mono">
          <div className="bg-white px-4 py-2.5 rounded-xl border border-sky-200 text-sky-700 font-bold shadow-xs">
            Dispatch Tel: <strong>+977 (01) 4700-ABC</strong>
          </div>
        </div>
      </div>
    </div>
  );
};
