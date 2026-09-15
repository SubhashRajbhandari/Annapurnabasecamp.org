import React from 'react';
import { Mountain, PhoneCall, Mail, Radio, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-sky-200 bg-slate-50 text-slate-600 font-mono text-xs pt-16 pb-12 px-4 sm:px-6 lg:px-8 transition-colors">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Col 1: Brand & Authority */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-400 to-blue-600 text-white flex items-center justify-center shadow-sm">
                <Mountain className="w-5 h-5" />
              </div>
              <div>
                <div className="text-slate-950 font-black text-base tracking-tight font-sans">
                  ANNAPURNA BASE CAMP
                </div>
                <div className="text-[10px] text-sky-600 tracking-wider font-bold">
                  ANNAPURNABASECAMP.ORG
                </div>
              </div>
            </div>
            <p className="text-slate-600 text-xs font-sans leading-relaxed">
              The official authority portal and luxury booking gateway for the Annapurna Sanctuary (4,130m / 13,550ft), Nepal Himalayas.
            </p>
            <div className="flex items-center gap-2 text-[11px] text-emerald-600 font-bold">
              <Radio className="w-3.5 h-3.5 animate-pulse" />
              <span>ACAP & TIMS OFFICIAL AUTHORIZED</span>
            </div>
          </div>

          {/* Col 2: Expedition Tiers */}
          <div>
            <h4 className="text-slate-900 font-bold uppercase tracking-wider mb-4 flex items-center gap-1.5">
              <span>Expedition Tiers</span>
            </h4>
            <ul className="space-y-2.5 font-sans">
              <li>
                <a href="#packages" className="hover:text-sky-600 transition-colors">
                  ★ 3-Star Alpine Explorer (Standard 1:2 Porter)
                </a>
              </li>
              <li>
                <a href="#packages" className="hover:text-sky-600 transition-colors">
                  ★★ 4-Star Mountain Premier (Private 1:1 Porter)
                </a>
              </li>
              <li>
                <a href="#packages" className="hover:text-sky-600 transition-colors">
                  ★★★ 5-Star Himalayan Sanctuary Luxury
                </a>
              </li>
              <li>
                <a href="#booking" className="hover:text-sky-600 transition-colors text-amber-600 font-semibold">
                  🚁 Direct VIP Helicopter Descent Booking
                </a>
              </li>
              <li>
                <a href="#booking" className="hover:text-sky-600 transition-colors">
                  Dynamic Price & Group Configurator
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Sanctuary Protocols */}
          <div>
            <h4 className="text-slate-900 font-bold uppercase tracking-wider mb-4">
              Sanctuary Regulations
            </h4>
            <ul className="space-y-2 font-sans text-xs text-slate-600">
              <li>• ACAP Conservation Permit mandatory</li>
              <li>• Single-use plastic bottles banned beyond Chhomrong</li>
              <li>• Mt. Machapuchare (6,993m) is sacred & strictly unclimbed</li>
              <li>• Porters insured to standard 1:2 and 1:1 labor codes</li>
              <li>• Gamow hyperbaric protocol for high-altitude safety</li>
            </ul>
          </div>

          {/* Col 4: Dispatch & Emergency */}
          <div className="space-y-3">
            <h4 className="text-slate-900 font-bold uppercase tracking-wider mb-2">
              Expedition Command
            </h4>
            <div className="bg-white p-4 rounded-2xl border border-sky-200 space-y-2 text-xs shadow-xs">
              <div className="flex items-center gap-2 text-slate-900 font-semibold">
                <PhoneCall className="w-3.5 h-3.5 text-sky-600" />
                <span>+977 (01) 4700-ABC (KTM HQ)</span>
              </div>
              <div className="flex items-center gap-2 text-slate-900 font-semibold">
                <Mail className="w-3.5 h-3.5 text-sky-600" />
                <span>expedition@annapurnabasecamp.org</span>
              </div>
              <div className="text-[10px] text-slate-500 pt-1 border-t border-slate-100">
                Dispatch Base: Lakeside Pokhara & Thamel Kathmandu
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            © {new Date().getFullYear()} Annapurnabasecamp.org — All Rights Reserved. Official Expedition Portal.
          </div>
          <div className="flex items-center gap-1 text-slate-600 font-medium">
            <span>Crafted for Himalayan Explorers with</span>
            <Heart className="w-3 h-3 text-red-500 fill-red-500 inline" />
            <span>in Nepal</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
