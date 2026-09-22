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

      {/* Altitude & Atmospheric Oxygen Telemetry Table */}
      <div className="mb-8 overflow-hidden rounded-2xl border border-slate-200 shadow-2xs">
        <div className="bg-slate-900 text-white px-5 py-3 text-xs font-bold uppercase tracking-wider flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
          <span>Trail Waypoint Altitude, Oxygen & Acclimatization Index</span>
          <span className="text-amber-400 font-mono text-[11px]">Wilderness Medical Society Standards</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-100/90 text-slate-700 font-bold border-b border-slate-200">
                <th className="p-3">Waypoint / Station</th>
                <th className="p-3">Altitude (m / ft)</th>
                <th className="p-3">Effective Oxygen</th>
                <th className="p-3">Barometric Pressure</th>
                <th className="p-3">Acclimatization Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
              <tr className="hover:bg-slate-50/80 transition-colors">
                <td className="p-3 font-bold text-slate-900">Pokhara Lakeside</td>
                <td className="p-3 font-mono">822m / 2,697ft</td>
                <td className="p-3 text-emerald-600 font-bold">100% (Sea Level Baseline)</td>
                <td className="p-3 font-mono">690 mmHg</td>
                <td className="p-3 text-slate-500">Normal Baseline</td>
              </tr>
              <tr className="hover:bg-slate-50/80 transition-colors">
                <td className="p-3 font-bold text-slate-900">Jhinu Danda (Hot Springs)</td>
                <td className="p-3 font-mono">1,780m / 5,840ft</td>
                <td className="p-3 text-emerald-600 font-bold">82.1%</td>
                <td className="p-3 font-mono">618 mmHg</td>
                <td className="p-3 text-emerald-700">Safe Hiking Zone</td>
              </tr>
              <tr className="hover:bg-slate-50/80 transition-colors">
                <td className="p-3 font-bold text-slate-900">Chhomrong Village</td>
                <td className="p-3 font-mono">2,170m / 7,119ft</td>
                <td className="p-3 text-emerald-600 font-bold">78.4%</td>
                <td className="p-3 font-mono">590 mmHg</td>
                <td className="p-3 text-emerald-700">Pre-Acclimatization</td>
              </tr>
              <tr className="hover:bg-slate-50/80 transition-colors">
                <td className="p-3 font-bold text-slate-900">Bamboo / Dovan</td>
                <td className="p-3 font-mono">2,500m / 8,202ft</td>
                <td className="p-3 text-amber-600 font-bold">75.2%</td>
                <td className="p-3 font-mono">565 mmHg</td>
                <td className="p-3 text-amber-700">Altitude Threshold (Drink 3L+ Water)</td>
              </tr>
              <tr className="hover:bg-slate-50/80 transition-colors">
                <td className="p-3 font-bold text-slate-900">Deurali Canyon</td>
                <td className="p-3 font-mono">3,230m / 10,597ft</td>
                <td className="p-3 text-amber-600 font-bold">69.1%</td>
                <td className="p-3 font-mono">520 mmHg</td>
                <td className="p-3 text-amber-700 font-semibold">Active Acclimatization Protocol</td>
              </tr>
              <tr className="hover:bg-slate-50/80 transition-colors">
                <td className="p-3 font-bold text-slate-900">Machapuchare Base Camp (MBC)</td>
                <td className="p-3 font-mono">3,700m / 12,139ft</td>
                <td className="p-3 text-red-600 font-bold">65.3%</td>
                <td className="p-3 font-mono">491 mmHg</td>
                <td className="p-3 text-red-700 font-semibold">High Altitude Cirque Gateway</td>
              </tr>
              <tr className="bg-sky-50/50 hover:bg-sky-50 transition-colors">
                <td className="p-3 font-black text-sky-900">Annapurna Base Camp (ABC)</td>
                <td className="p-3 font-mono font-bold text-sky-900">4,130m / 13,550ft</td>
                <td className="p-3 text-red-600 font-black">62.4% (~38% oxygen drop)</td>
                <td className="p-3 font-mono font-bold">468 mmHg</td>
                <td className="p-3 text-sky-800 font-bold">Sacred Sanctuary Summit</td>
              </tr>
            </tbody>
          </table>
        </div>
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
