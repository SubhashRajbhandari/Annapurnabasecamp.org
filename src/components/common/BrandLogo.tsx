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
      {/* Precision Vector Emblem */}
      <div className={`relative ${sizeClasses} rounded-2xl overflow-hidden shadow-lg shadow-sky-600/20 group-hover:scale-105 group-hover:shadow-sky-500/35 transition-all duration-300 shrink-0`}>
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          <defs>
            {/* Deep Alpine Sky Gradient */}
            <linearGradient id="abcSkyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0284C7" />
              <stop offset="45%" stopColor="#0369A1" />
              <stop offset="100%" stopColor="#0F172A" />
            </linearGradient>

            {/* Golden Himalayan Dawn Glow */}
            <radialGradient id="abcDawnSun" cx="72%" cy="28%" r="35%">
              <stop offset="0%" stopColor="#FEF08A" stopOpacity="1" />
              <stop offset="50%" stopColor="#F59E0B" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#F59E0B" stopOpacity="0" />
            </radialGradient>

            {/* Snow Facet Gradients */}
            <linearGradient id="abcSnowLight" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="100%" stopColor="#E0F2FE" />
            </linearGradient>

            <linearGradient id="abcSnowShadow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#BAE6FD" />
              <stop offset="100%" stopColor="#38BDF8" />
            </linearGradient>

            <linearGradient id="abcRockDark" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0C4A6E" />
              <stop offset="100%" stopColor="#082F49" />
            </linearGradient>

            {/* Glacial River Gradient */}
            <linearGradient id="abcGlacierRiver" x1="50%" y1="0%" x2="50%" y2="100%">
              <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#0284C7" stopOpacity="0.4" />
            </linearGradient>
          </defs>

          {/* Emblem Background Squircle */}
          <rect width="100" height="100" rx="22" fill="url(#abcSkyGrad)" />

          {/* Subtle Ambient Starlight / Alpine Sparkles */}
          <circle cx="24" cy="22" r="1.2" fill="#FFFFFF" opacity="0.8" />
          <circle cx="16" cy="38" r="0.9" fill="#FFFFFF" opacity="0.6" />
          <circle cx="84" cy="18" r="1.4" fill="#FEF08A" opacity="0.9" />

          {/* Himalayan Morning Sun Rising behind the Sanctuary */}
          <circle cx="72" cy="28" r="18" fill="url(#abcDawnSun)" />
          <circle cx="72" cy="28" r="7.5" fill="#FEF08A" />

          {/* Mountain Massif 1: Annapurna I (8,091m) Main Summit */}
          {/* Lit Western Face */}
          <polygon
            points="38,24 14,78 44,78"
            fill="url(#abcSnowLight)"
          />
          {/* Shaded Eastern Ridge Face */}
          <polygon
            points="38,24 44,78 64,78"
            fill="url(#abcSnowShadow)"
          />
          {/* Summit Ice Cap */}
          <polygon
            points="38,24 28,44 38,40 48,46"
            fill="#FFFFFF"
          />

          {/* Mountain Massif 2: Machapuchare (Fishtail 6,993m) Iconic Twin Horns */}
          {/* Left Horn */}
          <polygon
            points="66,36 50,86 68,86"
            fill="url(#abcSnowLight)"
          />
          {/* Fishtail Notch and Right Horn */}
          <polygon
            points="74,38 68,86 88,86"
            fill="url(#abcRockDark)"
          />
          {/* Twin-Peak Razor Crest */}
          <polygon
            points="66,36 70,44 74,38 72,50 66,48"
            fill="#FFFFFF"
          />

          {/* Sacred Cirque / Valley Floor & Moraine Ridge */}
          <path
            d="M 6 82 Q 32 68 50 78 Q 72 70 94 82 L 94 100 L 6 100 Z"
            fill="#082F49"
            opacity="0.95"
          />

          {/* Glacial Modi Khola River Ribbon */}
          <path
            d="M 46 76 C 52 82, 44 88, 52 100 L 44 100 C 38 88, 44 82, 40 76 Z"
            fill="url(#abcGlacierRiver)"
          />

          {/* Golden Sunbeam Peak Accent */}
          <polygon
            points="38,18 40,23 45,24 40,25 38,30 36,25 31,24 36,23"
            fill="#FDE047"
            opacity="0.95"
          />

          {/* Refined Border Sheen */}
          <rect
            x="0.75"
            y="0.75"
            width="98.5"
            height="98.5"
            rx="21.25"
            stroke="rgba(255, 255, 255, 0.2)"
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
