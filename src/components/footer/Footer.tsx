import React from 'react';
import { Mountain, Phone, Mail, MessageSquare, ShieldCheck, MapPin, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 text-xs pt-16 pb-12 px-4 sm:px-6 lg:px-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Col 1: Brand & Authority */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-sky-500 via-blue-600 to-indigo-700 text-white flex items-center justify-center shadow-md">
                <Mountain className="w-5 h-5" />
              </div>
              <div>
                <div className="text-white font-black text-base tracking-tight">
                  ANNAPURNA BASE CAMP
                </div>
                <div className="text-[10px] text-sky-400 tracking-wider font-bold uppercase">
                  ANNAPURNABASECAMP.ORG
                </div>
              </div>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              The official authority portal and luxury booking gateway for the Annapurna Sanctuary (4,130m / 13,550ft), Nepal Himalayas.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-400 font-semibold">
              <ShieldCheck className="w-4 h-4" />
              <span>ACAP & TIMS Government Authorized</span>
            </div>
          </div>

          {/* Col 2: Expedition Tiers */}
          <div>
            <h4 className="text-white font-bold uppercase tracking-wider mb-4 text-xs">
              Expedition Portfolios
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <a href="#packages" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <span className="text-amber-400">★</span> 3-Star Alpine Explorer (1:2 Porter)
                </a>
              </li>
              <li>
                <a href="#packages" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <span className="text-amber-400">★★</span> 4-Star Mountain Premier (1:1 Dedicated)
                </a>
              </li>
              <li>
                <a href="#packages" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <span className="text-amber-400">★★★</span> 5-Star Himalayan Sanctuary Luxury
                </a>
              </li>
              <li>
                <a href="#booking" className="hover:text-white text-amber-300 transition-colors flex items-center gap-1.5 font-semibold">
                  <span>🚁 VIP Helicopter Return Flights</span>
                </a>
              </li>
              <li>
                <a href="#elevation" className="hover:text-white transition-colors">
                  Topographic Route & Altitude Profile
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-white transition-colors">
                  ABC Trekking FAQs & Guide
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Sanctuary Regulations & Ethics */}
          <div>
            <h4 className="text-white font-bold uppercase tracking-wider mb-4 text-xs">
              Sanctuary Regulations & Ethics
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>• ACAP Conservation Permit mandatory</li>
              <li>• Single-use plastic bottles banned beyond Chhomrong</li>
              <li>• Mt. Machapuchare (6,993m) is sacred & strictly unclimbed</li>
              <li>• Porter welfare code strictly enforced (1:1 & 1:2 ratios)</li>
              <li>• Wilderness Medical Society AMS emergency protocols</li>
            </ul>
          </div>

          {/* Col 4: Dispatch Command & Contacts */}
          <div className="space-y-3">
            <h4 className="text-white font-bold uppercase tracking-wider mb-2 text-xs">
              Expedition Command & Support
            </h4>
            <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700 space-y-2.5 text-xs">
              <div className="flex items-center gap-2 text-white font-medium">
                <Phone className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                <a href="tel:+97714700888" className="hover:text-sky-300 transition-colors">+977 1 4700888 (KTM HQ)</a>
              </div>
              <div className="flex items-center gap-2 text-white font-medium">
                <MessageSquare className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <a href="https://wa.me/9779851082437?text=Namaste!%20I%20am%20interested%20in%20the%20Annapurna%20Base%20Camp%20Trek." target="_blank" rel="noopener noreferrer" className="hover:text-emerald-300 transition-colors">+977 9851-082437 (WhatsApp 24/7)</a>
              </div>
              <div className="flex items-center gap-2 text-white font-medium">
                <Mail className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                <a href="mailto:expedition@annapurnabasecamp.org" className="hover:text-sky-300 transition-colors">expedition@annapurnabasecamp.org</a>
              </div>
              <div className="flex items-center gap-2 text-slate-400 pt-1 border-t border-slate-700 text-[11px]">
                <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                <span>Lakeside Pokhara & Thamel Kathmandu</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <div>
            © {new Date().getFullYear()} Annapurnabasecamp.org — All Rights Reserved. Official Expedition Portal.
          </div>
          <div className="flex items-center gap-1.5 text-slate-400 font-medium">
            <span>Crafted for Himalayan Explorers with</span>
            <Heart className="w-3 h-3 text-red-500 fill-red-500 inline" />
            <span>in Nepal</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
