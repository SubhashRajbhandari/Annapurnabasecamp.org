import React from 'react';

interface BrandLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  isLightHeader?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  className = '',
  size = 'md',
  showText = false,
  isLightHeader = false,
}) => {
  // Dimension mapping for the emblem
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10 sm:w-11 sm:h-11',
    lg: 'w-12 h-12 sm:w-14 sm:h-14',
    xl: 'w-16 h-16 sm:w-20 sm:h-20'
  }[size];

  return (
    <div className={`flex items-center gap-2.5 sm:gap-3 group shrink-0 ${className}`}>
      {/* Handcrafted Himalayan Expedition Sketch Emblem */}
      <div className={`relative ${sizeClasses} rounded-2xl overflow-hidden shadow-md shadow-sky-950/30 group-hover:scale-105 group-hover:shadow-sky-500/25 transition-all duration-300 shrink-0`}>
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          <defs>
            {/* Deep Mountain Dusk Background */}
            <linearGradient id="sketchBg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0B1528" />
              <stop offset="50%" stopColor="#0F2445" />
              <stop offset="100%" stopColor="#060C17" />
            </linearGradient>

            {/* Warm Golden Sun Halo */}
            <radialGradient id="sketchSunGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FDE047" stopOpacity="0.9" />
              <stop offset="60%" stopColor="#F59E0B" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#F59E0B" stopOpacity="0" />
            </radialGradient>

            {/* Subtle Texture Filter for Hand-Etched feel */}
            <linearGradient id="goldInk" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FEF08A" />
              <stop offset="100%" stopColor="#F59E0B" />
            </linearGradient>
          </defs>

          {/* Emblem Background Squircle */}
          <rect width="100" height="100" rx="22" fill="url(#sketchBg)" />

          {/* Vintage Field Expedition Compass Outer Ring */}
          <circle cx="50" cy="50" r="44" stroke="rgba(255, 255, 255, 0.12)" strokeWidth="1" strokeDasharray="3 3" />
          <circle cx="50" cy="50" r="41" stroke="rgba(255, 255, 255, 0.22)" strokeWidth="0.75" />

          {/* Cardinal Compass Ticks */}
          <line x1="50" y1="6" x2="50" y2="10" stroke="rgba(245, 158, 11, 0.8)" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="50" y1="90" x2="50" y2="94" stroke="rgba(255, 255, 255, 0.3)" strokeWidth="1.2" strokeLinecap="round" />
          <line x1="6" y1="50" x2="10" y2="50" stroke="rgba(255, 255, 255, 0.3)" strokeWidth="1.2" strokeLinecap="round" />
          <line x1="90" y1="50" x2="94" y2="50" stroke="rgba(255, 255, 255, 0.3)" strokeWidth="1.2" strokeLinecap="round" />

          {/* ============================================================ */}
          {/* HIMALAYAN SUN WITH SKETCHED BURST RAYS                        */}
          {/* ============================================================ */}
          <circle cx="70" cy="28" r="14" fill="url(#sketchSunGlow)" />
          <circle cx="70" cy="28" r="6" fill="#FDE047" stroke="#F59E0B" strokeWidth="0.8" />
          
          {/* Hand-drawn Sun Rays */}
          <g stroke="url(#goldInk)" strokeWidth="1" strokeLinecap="round" opacity="0.85">
            <line x1="70" y1="16" x2="70" y2="19" />
            <line x1="70" y1="37" x2="70" y2="40" />
            <line x1="58" y1="28" x2="61" y2="28" />
            <line x1="79" y1="28" x2="82" y2="28" />
            <line x1="61.5" y1="19.5" x2="63.5" y2="21.5" />
            <line x1="76.5" y1="34.5" x2="78.5" y2="36.5" />
            <line x1="61.5" y1="36.5" x2="63.5" y2="34.5" />
            <line x1="76.5" y1="21.5" x2="78.5" y2="19.5" />
          </g>

          {/* ============================================================ */}
          {/* MOUNTAIN 1: ANNAPURNA I (8,091m) - Hand-drawn Main Ridge     */}
          {/* ============================================================ */}
          {/* Main Peak Contour Silhouette */}
          <path
            d="M 12 76 L 24 56 L 36 24 L 46 44 L 56 62 L 62 76"
            stroke="#FFFFFF"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Annapurna Arête (Center Spine Line) */}
          <path
            d="M 36 24 Q 38 42 42 58 Q 45 68 48 76"
            stroke="#FFFFFF"
            strokeWidth="1.6"
            strokeLinecap="round"
          />

          {/* Jagged Snow Cap Contours */}
          <path
            d="M 28 40 Q 32 43 36 38 Q 40 43 43 39"
            stroke="#BAE6FD"
            strokeWidth="1"
            strokeLinecap="round"
          />
          <path
            d="M 22 52 Q 28 55 34 49 Q 38 54 44 48"
            stroke="#BAE6FD"
            strokeWidth="1"
            strokeLinecap="round"
          />

          {/* Shaded Eastern Face: Fine Hand-Drawn Etched Hatching Lines */}
          <g stroke="#38BDF8" strokeWidth="0.9" strokeLinecap="round" opacity="0.85">
            <line x1="37" y1="30" x2="42" y2="34" />
            <line x1="38" y1="36" x2="45" y2="41" />
            <line x1="39" y1="42" x2="48" y2="48" />
            <line x1="40" y1="48" x2="51" y2="55" />
            <line x1="41" y1="54" x2="54" y2="62" />
            <line x1="43" y1="60" x2="57" y2="69" />
            <line x1="45" y1="66" x2="60" y2="76" />
          </g>

          {/* ============================================================ */}
          {/* MOUNTAIN 2: MACHAPUCHARE (Fishtail 6,993m) - Iconic Silhouette*/}
          {/* ============================================================ */}
          {/* Twin-Peaked Summit Contour Outline */}
          <path
            d="M 48 84 L 56 64 L 64 34 Q 67 42 70 36 L 78 54 L 88 84"
            stroke="#FFFFFF"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Machapuchare Notch & Central Spine */}
          <path
            d="M 67 42 Q 68 56 66 70 Q 64 78 62 84"
            stroke="#FFFFFF"
            strokeWidth="1.6"
            strokeLinecap="round"
          />

          {/* Fishtail Twin Horn Rock Hatching (Hand-drawn shadow lines) */}
          <g stroke="#93C5FD" strokeWidth="1" strokeLinecap="round" opacity="0.9">
            {/* Left horn shadow ticks */}
            <line x1="61" y1="44" x2="66" y2="48" />
            <line x1="59" y1="52" x2="66" y2="57" />
            {/* Right horn dark precipice hatching */}
            <line x1="68" y1="44" x2="73" y2="42" />
            <line x1="68" y1="50" x2="75" y2="49" />
            <line x1="67" y1="56" x2="76" y2="56" />
            <line x1="66" y1="62" x2="78" y2="63" />
            <line x1="65" y1="68" x2="80" y2="70" />
            <line x1="64" y1="74" x2="83" y2="77" />
            <line x1="63" y1="80" x2="86" y2="84" />
          </g>

          {/* Cross-hatch texture on darkest ridge wall */}
          <g stroke="#60A5FA" strokeWidth="0.75" strokeLinecap="round" opacity="0.6">
            <line x1="72" y1="46" x2="69" y2="54" />
            <line x1="75" y1="53" x2="71" y2="62" />
            <line x1="78" y1="60" x2="73" y2="70" />
          </g>

          {/* ============================================================ */}
          {/* VALLEY FLOOR, GLACIAL RIVER & HAND-SKETCHED PINE RIDGE       */}
          {/* ============================================================ */}
          {/* Sanctuary Base Contour Lines */}
          <path
            d="M 10 82 Q 30 76 50 82 Q 70 78 90 84"
            stroke="rgba(255, 255, 255, 0.35)"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
          <path
            d="M 12 88 Q 32 82 52 87 Q 72 84 88 90"
            stroke="rgba(255, 255, 255, 0.2)"
            strokeWidth="0.8"
            strokeLinecap="round"
          />

          {/* Meandering Modi Khola Glacial Stream */}
          <path
            d="M 48 82 Q 52 86 46 91 Q 42 95 50 100"
            stroke="#38BDF8"
            strokeWidth="1.6"
            strokeLinecap="round"
          />

          {/* Hand-Sketched Himalayan Evergreen Pines in Foothills */}
          {/* Tree 1 */}
          <path d="M 16 82 L 16 75 M 14 78 L 16 75 L 18 78 M 14.5 81 L 16 78 L 17.5 81" stroke="#38BDF8" strokeWidth="0.9" strokeLinecap="round" />
          {/* Tree 2 */}
          <path d="M 22 81 L 22 72 M 19.5 76 L 22 72 L 24.5 76 M 20 79 L 22 76 L 24 79" stroke="#67E8F9" strokeWidth="1" strokeLinecap="round" />
          {/* Tree 3 */}
          <path d="M 28 83 L 28 76 M 26 79 L 28 76 L 30 79 M 26.5 82 L 28 79 L 29.5 82" stroke="#38BDF8" strokeWidth="0.9" strokeLinecap="round" />

          {/* Golden Summit Star Sparkle at Annapurna I Crest */}
          <path
            d="M 36 17 L 37.5 21.5 L 42 23 L 37.5 24.5 L 36 29 L 34.5 24.5 L 30 23 L 34.5 21.5 Z"
            fill="#FEF08A"
            stroke="#F59E0B"
            strokeWidth="0.5"
          />

          {/* "4130M" Etched Elevation Badge at Base */}
          <text
            x="50"
            y="94"
            textAnchor="middle"
            fill="#FDE047"
            fontSize="5.5"
            fontWeight="900"
            letterSpacing="0.8"
            fontFamily="monospace"
            opacity="0.9"
          >
            4130M • ABC
          </text>

          {/* Precision Outer Shield Edge Sheen */}
          <rect
            x="0.75"
            y="0.75"
            width="98.5"
            height="98.5"
            rx="21.25"
            stroke="rgba(255, 255, 255, 0.22)"
            strokeWidth="1.5"
            fill="none"
          />
        </svg>
      </div>

      {/* Optional Full Brand Typography Lockup */}
      {showText && (
        <div className="min-w-0">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <span
              className={`font-black text-sm sm:text-lg tracking-tight leading-none transition-colors duration-500 ${
                isLightHeader
                  ? 'text-slate-900'
                  : 'text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]'
              }`}
            >
              ANNAPURNA
            </span>
            <span
              className={`text-[9px] sm:text-[11px] px-1.5 sm:px-2 py-0.5 rounded-full font-bold uppercase tracking-wider transition-all duration-500 shrink-0 ${
                isLightHeader
                  ? 'bg-amber-50 border border-amber-200 text-amber-800'
                  : 'bg-black/40 border border-white/25 text-amber-300 backdrop-blur-md'
              }`}
            >
              4,130M
            </span>
          </div>
          <div
            className={`text-[10px] sm:text-[11px] font-semibold tracking-wide mt-0.5 hidden sm:block truncate transition-colors duration-500 ${
              isLightHeader
                ? 'text-slate-500'
                : 'text-slate-200/90 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]'
            }`}
          >
            Annapurnabasecamp.org — Official Expedition Portal
          </div>
        </div>
      )}
    </div>
  );
};
