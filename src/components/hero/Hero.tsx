import React, { useState, useRef, useEffect } from 'react';
import { Compass, Calendar, Users, ShieldCheck, ArrowRight, Star, HeartHandshake, ChevronDown, Volume2, VolumeX, Play, Pause, Check, Award } from 'lucide-react';
import type { PackageTier } from '../../types/trek';

interface TierOption {
  value: PackageTier;
  stars: string;
  name: string;
  badge?: string;
  badgeColor?: string;
  tagline: string;
  price: string;
}

const TIER_OPTIONS: TierOption[] = [
  {
    value: '4-star',
    stars: '4★',
    name: 'Mountain Premier',
    badge: 'Most Popular',
    badgeColor: 'bg-amber-100 text-amber-800 border-amber-300',
    tagline: 'Dedicated 1:1 Porter • Private En-suite Lodges',
    price: '$1,450',
  },
  {
    value: '5-star',
    stars: '5★',
    name: 'Sanctuary Luxury',
    badge: 'VIP Heli Flight',
    badgeColor: 'bg-purple-100 text-purple-800 border-purple-300',
    tagline: 'Airbus H125 Return from ABC • 5★ Pokhara Resort',
    price: '$2,890',
  },
  {
    value: '3-star',
    stars: '3★',
    name: 'Alpine Explorer',
    badge: 'Classic Trek',
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    tagline: 'Authentic Mountain Teahouse • 1:2 Shared Porter',
    price: '$890',
  },
];

interface MonthOption {
  value: string;
  title: string;
  badge?: string;
  badgeColor?: string;
  season: string;
  highlights: string;
}

const MONTH_OPTIONS: MonthOption[] = [
  {
    value: 'October 2026 (Peak Autumn)',
    title: 'Oct – Nov 2026',
    badge: 'Peak Clear Skies',
    badgeColor: 'bg-amber-100 text-amber-800 border-amber-300',
    season: 'Autumn Season',
    highlights: '50km+ crystal visibility • Stable dry weather',
  },
  {
    value: 'April 2026 (Spring Blooms)',
    title: 'Mar – May 2026',
    badge: 'Rhododendrons',
    badgeColor: 'bg-rose-100 text-rose-800 border-rose-300',
    season: 'Spring Season',
    highlights: 'Red rhododendron forest trails • Mild temperatures',
  },
  {
    value: 'December 2026 (Winter Snow)',
    title: 'Dec – Jan 2026/27',
    badge: 'Pristine Solitude',
    badgeColor: 'bg-sky-100 text-sky-800 border-sky-300',
    season: 'Crisp Winter',
    highlights: 'Deep snow sanctuary • Quiet trails & solitude',
  },
  {
    value: 'Custom 2027',
    title: '2027 Season',
    badge: 'Early Bird Lock',
    badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-300',
    season: 'Advance Booking',
    highlights: 'Price-lock guarantee • Guaranteed luxury lodge dates',
  },
];

interface PartyOption {
  value: number;
  label: string;
  badge?: string;
  badgeColor?: string;
  details: string;
}

const PARTY_OPTIONS: PartyOption[] = [
  {
    value: 1,
    label: '1 Solo Trekker',
    badge: 'Solo Private',
    badgeColor: 'bg-slate-100 text-slate-800 border-slate-300',
    details: 'Dedicated private Sherpa guide & 1:1 personal porter',
  },
  {
    value: 2,
    label: '2 Trekkers',
    badge: 'Couples / Friends',
    badgeColor: 'bg-sky-100 text-sky-800 border-sky-300',
    details: 'Private twin/double room pacing with lead guide',
  },
  {
    value: 4,
    label: '4 Trekkers',
    badge: 'Small Group',
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    details: 'Private alpine party with dedicated porters',
  },
  {
    value: 6,
    label: '6+ Trekkers',
    badge: 'Custom Team',
    badgeColor: 'bg-purple-100 text-purple-800 border-purple-300',
    details: 'Lead guide + assistant guide + group discount savings',
  },
];

interface HeroProps {
  onOpenBooking: (tier?: PackageTier) => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking }) => {
  const [selectedTier, setSelectedTier] = useState<PackageTier>('4-star');
  const [selectedMonth, setSelectedMonth] = useState('October 2026 (Peak Autumn)');
  const [partySize, setPartySize] = useState(2);
  const [openDropdown, setOpenDropdown] = useState<'tier' | 'month' | 'party' | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [isVideoReady, setIsVideoReady] = useState(false);

  const heroSectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const userPausedRef = useRef<boolean>(false);
  const [scrollY, setScrollY] = useState(0);

  // Close dropdowns on outside click or Escape key
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (formRef.current && !formRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (window.scrollY < 1200) {
            setScrollY(window.scrollY);
          }
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Explicitly set DOM muted properties so browsers allow instant autoplay
    video.defaultMuted = true;
    video.muted = true;

    const startPlayback = () => {
      if (userPausedRef.current) return;
      video.play().then(() => {
        setIsPlaying(true);
        setIsVideoReady(true);
      }).catch((err) => {
        console.warn('Autoplay waiting for interaction:', err);
      });
    };

    if (video.readyState >= 2) {
      startPlayback();
    }

    const onPlaying = () => {
      setIsPlaying(true);
      setIsVideoReady(true);
    };

    video.addEventListener('loadeddata', startPlayback);
    video.addEventListener('canplay', startPlayback);
    video.addEventListener('playing', onPlaying);

    // Pause video when scrolled out of view to preserve 100% CPU/GPU on low-end PCs
    const section = heroSectionRef.current;
    let observer: IntersectionObserver | null = null;
    if (section && 'IntersectionObserver' in window) {
      observer = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          if (entry.isIntersecting) {
            if (!userPausedRef.current && video.paused) {
              video.play().then(() => setIsPlaying(true)).catch(() => {});
            }
          } else {
            if (!video.paused) {
              video.pause();
              setIsPlaying(false);
            }
          }
        },
        { threshold: 0.1 }
      );
      observer.observe(section);
    }

    return () => {
      video.removeEventListener('loadeddata', startPlayback);
      video.removeEventListener('canplay', startPlayback);
      video.removeEventListener('playing', onPlaying);
      if (observer) observer.disconnect();
    };
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      userPausedRef.current = false;
      video.play().then(() => {
        setIsPlaying(true);
        setIsVideoReady(true);
      }).catch(() => {});
    } else {
      userPausedRef.current = true;
      video.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  const handleQuickSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setOpenDropdown(null);
    const bookingSection = document.getElementById('booking');
    if (bookingSection) {
      bookingSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      onOpenBooking(selectedTier);
    }
  };

  const currentTier = TIER_OPTIONS.find((t) => t.value === selectedTier) || TIER_OPTIONS[0];
  const currentMonth = MONTH_OPTIONS.find((m) => m.value === selectedMonth) || MONTH_OPTIONS[0];
  const currentParty = PARTY_OPTIONS.find((p) => p.value === partySize) || PARTY_OPTIONS[1];

  return (
    <section
      ref={heroSectionRef}
      className="relative min-h-[95vh] flex flex-col justify-center pt-28 sm:pt-32 pb-14 sm:pb-16 px-3 sm:px-6 lg:px-8 overflow-hidden bg-slate-900 text-white w-full max-w-full"
    >
      {/* Cinematic High-Resolution Mountain Video Background with Parallax Glide */}
      <div 
        className="absolute inset-0 overflow-hidden pointer-events-none"
        style={{ transform: `translate3d(0, ${scrollY * 0.28}px, 0)`, willChange: 'transform' }}
      >
        {/* Fallback clean mountain image while video loads */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-700"
          style={{ 
            backgroundImage: `url('/images/hero-annapurna-white.webp')`,
            filter: 'brightness(1.28) contrast(1.05)'
          }}
        />
        {/* Ambient Trekking Video with Zero-Copy Hardware Compositing & High Brightness Boost */}
        <video
          ref={videoRef}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 transform-gpu ${
            isVideoReady ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ 
            transform: 'translate3d(0, 0, 0)', 
            backfaceVisibility: 'hidden',
            filter: 'brightness(1.32) contrast(1.06) saturate(1.12)'
          }}
          poster="/images/hero-annapurna-white.webp"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        >
          <source src="/videos/nepal-annapurna-trek-optimized.mp4" type="video/mp4" />
          <source src="/videos/nepal-annapurna-trek.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Ultra-Light Luminous Scrim - Clear Center allows video to shine through with full brightness */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-black/45 pointer-events-none" />

      {/* Main Content Container with Parallax Elevation */}
      <div 
        className="relative z-10 max-w-7xl mx-auto w-full flex flex-col items-center text-center my-auto transition-transform duration-75"
        style={{ 
          transform: `translate3d(0, -${scrollY * 0.1}px, 0)`,
          opacity: Math.max(0, 1 - scrollY / 650),
          willChange: 'transform, opacity'
        }}
      >
        {/* Top Authority Pill Badge */}
        <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-slate-950/75 border border-amber-400/40 text-amber-300 text-[10px] sm:text-sm font-semibold mb-4 sm:mb-6 shadow-sm max-w-full">
          <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400 shrink-0" />
          <span className="truncate">Official Trekking Guidance & Luxury Portal • 4,130m / 13,550ft</span>
        </div>

        {/* Main Headline - High-Impact Target SEO Heading */}
        <h1 className="text-2xl xs:text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-white max-w-5xl leading-[1.14] mb-3 sm:mb-5 drop-shadow-[0_4px_20px_rgba(0,0,0,0.85)]">
          Annapurna Base Camp Trek{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-sky-300 to-cyan-200">
            (ABC Nepal 4,130m)
          </span>
        </h1>

        {/* Subtitle with Primary Search Keywords */}
        <p className="text-xs sm:text-lg md:text-xl text-slate-100 max-w-3xl leading-relaxed mb-6 sm:mb-8 font-medium drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)] px-2">
          The official authority portal for premier trekking in Nepal. Handcrafted Annapurna Base Camp (ABC) expeditions with certified Sherpa leaders, dedicated 1:1 porters, boutique mountain lodges, and direct VIP helicopter descents.
        </p>

        {/* Interactive Floating Quick-Booking Bar (Fishtail Tours Style) - Luxury Frosted Popovers */}
        <form
          ref={formRef}
          onSubmit={handleQuickSearch}
          className="w-full max-w-5xl bg-white/45 backdrop-blur-md p-2.5 sm:p-3.5 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.45)] border border-white/70 text-slate-950 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3 items-stretch text-left mb-8 sm:mb-10 hover:bg-white/55 transition-all duration-300 relative z-30"
        >
          {/* Field 1: Expedition Tier */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setOpenDropdown(openDropdown === 'tier' ? null : 'tier')}
              className={`w-full h-[62px] text-left px-3.5 py-2 rounded-2xl transition-all duration-200 cursor-pointer border flex flex-col justify-between select-none ${
                openDropdown === 'tier'
                  ? 'bg-white shadow-xl border-sky-500 ring-2 ring-sky-400/30'
                  : 'bg-white/70 hover:bg-white/90 border-white/80 hover:border-sky-300 shadow-sm'
              }`}
              aria-haspopup="listbox"
              aria-expanded={openDropdown === 'tier'}
            >
              <div className="flex items-center justify-between gap-1 w-full">
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-600 flex items-center gap-1">
                  <Award className="w-3 h-3 text-amber-600 shrink-0" />
                  <span>Service Tier</span>
                </span>
                <span className="text-[10px] font-black text-sky-700 bg-sky-100/80 px-1.5 py-0.5 rounded-md leading-none">
                  {currentTier.price}
                </span>
              </div>

              <div className="flex items-center justify-between gap-1 w-full">
                <div className="min-w-0 pr-1">
                  <div className="text-xs sm:text-sm font-black text-slate-950 truncate">
                    {currentTier.stars} {currentTier.name}
                  </div>
                  <div className="text-[10px] text-slate-500 truncate font-semibold">
                    {currentTier.badge}
                  </div>
                </div>
                <ChevronDown
                  className={`w-4 h-4 text-slate-600 shrink-0 transition-transform duration-200 ${
                    openDropdown === 'tier' ? 'rotate-180 text-sky-600' : ''
                  }`}
                />
              </div>
            </button>

            {/* Dropdown Popover */}
            {openDropdown === 'tier' && (
              <div
                className="absolute top-[calc(100%+8px)] left-0 z-50 w-full sm:w-[360px] bg-white/98 backdrop-blur-2xl rounded-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.4)] border border-slate-200/90 p-2 text-slate-900 ring-1 ring-black/5 animate-in fade-in zoom-in-95 duration-150"
                role="listbox"
              >
                <div className="px-2.5 py-1.5 text-[10px] font-bold text-slate-500 uppercase tracking-wider border-b border-slate-100 flex items-center justify-between">
                  <span>Select Expedition Tier</span>
                  <span className="text-sky-600 font-black">All-Inclusive</span>
                </div>
                <div className="space-y-1 mt-1.5">
                  {TIER_OPTIONS.map((opt) => {
                    const isSelected = selectedTier === opt.value;
                    return (
                      <div
                        key={opt.value}
                        onClick={() => {
                          setSelectedTier(opt.value);
                          setOpenDropdown(null);
                        }}
                        className={`p-2.5 rounded-xl cursor-pointer transition-all duration-150 border text-left ${
                          isSelected
                            ? 'bg-sky-50/90 border-sky-300 text-sky-950 shadow-sm'
                            : 'bg-white hover:bg-slate-50 border-transparent text-slate-800'
                        }`}
                        role="option"
                        aria-selected={isSelected}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-1.5 min-w-0">
                            <span className="text-xs font-black text-amber-700 shrink-0">{opt.stars}</span>
                            <span className="text-xs sm:text-sm font-black truncate">{opt.name}</span>
                            {opt.badge && (
                              <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold border shrink-0 ${opt.badgeColor}`}>
                                {opt.badge}
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-1.5 shrink-0">
                            <span className="text-xs font-black text-slate-900">{opt.price}</span>
                            {isSelected ? (
                              <Check className="w-4 h-4 text-sky-600" />
                            ) : (
                              <div className="w-4 h-4" />
                            )}
                          </div>
                        </div>
                        <p className="text-[11px] text-slate-500 font-medium mt-1 leading-snug">
                          {opt.tagline}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Field 2: Departure Season / Month */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setOpenDropdown(openDropdown === 'month' ? null : 'month')}
              className={`w-full h-[62px] text-left px-3.5 py-2 rounded-2xl transition-all duration-200 cursor-pointer border flex flex-col justify-between select-none ${
                openDropdown === 'month'
                  ? 'bg-white shadow-xl border-sky-500 ring-2 ring-sky-400/30'
                  : 'bg-white/70 hover:bg-white/90 border-white/80 hover:border-sky-300 shadow-sm'
              }`}
              aria-haspopup="listbox"
              aria-expanded={openDropdown === 'month'}
            >
              <div className="flex items-center justify-between gap-1 w-full">
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-600 flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-sky-600 shrink-0" />
                  <span>Expedition Window</span>
                </span>
                <span className="text-[10px] font-black text-emerald-700 bg-emerald-100/80 px-1.5 py-0.5 rounded-md leading-none">
                  {currentMonth.season}
                </span>
              </div>

              <div className="flex items-center justify-between gap-1 w-full">
                <div className="min-w-0 pr-1">
                  <div className="text-xs sm:text-sm font-black text-slate-950 truncate">
                    {currentMonth.title}
                  </div>
                  <div className="text-[10px] text-slate-500 truncate font-semibold">
                    {currentMonth.badge}
                  </div>
                </div>
                <ChevronDown
                  className={`w-4 h-4 text-slate-600 shrink-0 transition-transform duration-200 ${
                    openDropdown === 'month' ? 'rotate-180 text-sky-600' : ''
                  }`}
                />
              </div>
            </button>

            {/* Dropdown Popover */}
            {openDropdown === 'month' && (
              <div
                className="absolute top-[calc(100%+8px)] left-0 z-50 w-full sm:w-[350px] bg-white/98 backdrop-blur-2xl rounded-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.4)] border border-slate-200/90 p-2 text-slate-900 ring-1 ring-black/5 animate-in fade-in zoom-in-95 duration-150"
                role="listbox"
              >
                <div className="px-2.5 py-1.5 text-[10px] font-bold text-slate-500 uppercase tracking-wider border-b border-slate-100 flex items-center justify-between">
                  <span>Trek Season & Weather</span>
                  <span className="text-sky-600 font-black">Optimal Timing</span>
                </div>
                <div className="space-y-1 mt-1.5">
                  {MONTH_OPTIONS.map((opt) => {
                    const isSelected = selectedMonth === opt.value;
                    return (
                      <div
                        key={opt.value}
                        onClick={() => {
                          setSelectedMonth(opt.value);
                          setOpenDropdown(null);
                        }}
                        className={`p-2.5 rounded-xl cursor-pointer transition-all duration-150 border text-left ${
                          isSelected
                            ? 'bg-sky-50/90 border-sky-300 text-sky-950 shadow-sm'
                            : 'bg-white hover:bg-slate-50 border-transparent text-slate-800'
                        }`}
                        role="option"
                        aria-selected={isSelected}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-1.5 min-w-0">
                            <span className="text-xs sm:text-sm font-black truncate">{opt.title}</span>
                            {opt.badge && (
                              <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold border shrink-0 ${opt.badgeColor}`}>
                                {opt.badge}
                              </span>
                            )}
                          </div>
                          <div className="shrink-0">
                            {isSelected ? (
                              <Check className="w-4 h-4 text-sky-600" />
                            ) : (
                              <div className="w-4 h-4" />
                            )}
                          </div>
                        </div>
                        <p className="text-[11px] text-slate-500 font-medium mt-1 leading-snug">
                          {opt.highlights}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Field 3: Group Size */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setOpenDropdown(openDropdown === 'party' ? null : 'party')}
              className={`w-full h-[62px] text-left px-3.5 py-2 rounded-2xl transition-all duration-200 cursor-pointer border flex flex-col justify-between select-none ${
                openDropdown === 'party'
                  ? 'bg-white shadow-xl border-sky-500 ring-2 ring-sky-400/30'
                  : 'bg-white/70 hover:bg-white/90 border-white/80 hover:border-sky-300 shadow-sm'
              }`}
              aria-haspopup="listbox"
              aria-expanded={openDropdown === 'party'}
            >
              <div className="flex items-center justify-between gap-1 w-full">
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-600 flex items-center gap-1">
                  <Users className="w-3 h-3 text-sky-600 shrink-0" />
                  <span>Group Size</span>
                </span>
                <span className="text-[10px] font-black text-indigo-700 bg-indigo-100/80 px-1.5 py-0.5 rounded-md leading-none">
                  Private
                </span>
              </div>

              <div className="flex items-center justify-between gap-1 w-full">
                <div className="min-w-0 pr-1">
                  <div className="text-xs sm:text-sm font-black text-slate-950 truncate">
                    {currentParty.label}
                  </div>
                  <div className="text-[10px] text-slate-500 truncate font-semibold">
                    {currentParty.badge || 'Private Trek'}
                  </div>
                </div>
                <ChevronDown
                  className={`w-4 h-4 text-slate-600 shrink-0 transition-transform duration-200 ${
                    openDropdown === 'party' ? 'rotate-180 text-sky-600' : ''
                  }`}
                />
              </div>
            </button>

            {/* Dropdown Popover */}
            {openDropdown === 'party' && (
              <div
                className="absolute top-[calc(100%+8px)] left-0 lg:left-auto lg:right-0 z-50 w-full sm:w-[330px] bg-white/98 backdrop-blur-2xl rounded-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.4)] border border-slate-200/90 p-2 text-slate-900 ring-1 ring-black/5 animate-in fade-in zoom-in-95 duration-150"
                role="listbox"
              >
                <div className="px-2.5 py-1.5 text-[10px] font-bold text-slate-500 uppercase tracking-wider border-b border-slate-100 flex items-center justify-between">
                  <span>Party Selection</span>
                  <span className="text-sky-600 font-black">Private Sherpa</span>
                </div>
                <div className="space-y-1 mt-1.5">
                  {PARTY_OPTIONS.map((opt) => {
                    const isSelected = partySize === opt.value;
                    return (
                      <div
                        key={opt.value}
                        onClick={() => {
                          setPartySize(opt.value);
                          setOpenDropdown(null);
                        }}
                        className={`p-2.5 rounded-xl cursor-pointer transition-all duration-150 border text-left ${
                          isSelected
                            ? 'bg-sky-50/90 border-sky-300 text-sky-950 shadow-sm'
                            : 'bg-white hover:bg-slate-50 border-transparent text-slate-800'
                        }`}
                        role="option"
                        aria-selected={isSelected}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-1.5 min-w-0">
                            <span className="text-xs sm:text-sm font-black truncate">{opt.label}</span>
                            {opt.badge && (
                              <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold border shrink-0 ${opt.badgeColor}`}>
                                {opt.badge}
                              </span>
                            )}
                          </div>
                          <div className="shrink-0">
                            {isSelected ? (
                              <Check className="w-4 h-4 text-sky-600" />
                            ) : (
                              <div className="w-4 h-4" />
                            )}
                          </div>
                        </div>
                        <p className="text-[11px] text-slate-500 font-medium mt-1 leading-snug">
                          {opt.details}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Action Search Button */}
          <div className="h-[62px] flex items-center">
            <button
              type="submit"
              className="w-full h-full py-3 px-6 rounded-2xl font-black text-xs sm:text-sm uppercase tracking-wider bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-700 text-white shadow-xl shadow-sky-600/30 hover:shadow-sky-500/50 hover:brightness-105 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer select-none"
            >
              <span>Check Rates & Book</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>

        {/* Social Proof & Trust Pillars Grid (Zero-blur GPU fast path) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4 max-w-5xl w-full text-left">
          {/* Trust 1 */}
          <div className="bg-slate-950/80 border border-white/15 rounded-2xl p-2.5 sm:p-4 flex items-center gap-2.5 sm:gap-3 min-w-0 shadow-lg">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-amber-500/20 border border-amber-400/40 text-amber-400 flex items-center justify-center shrink-0">
              <Star className="w-4 h-4 sm:w-5 sm:h-5 fill-amber-400 text-amber-400" />
            </div>
            <div className="min-w-0">
              <div className="text-xs sm:text-sm font-extrabold text-white truncate">4.98 / 5 Rating</div>
              <div className="text-[9px] sm:text-[10px] text-slate-300 truncate">1,400+ Trekkers</div>
            </div>
          </div>

          {/* Trust 2 */}
          <div className="bg-slate-950/80 border border-white/15 rounded-2xl p-2.5 sm:p-4 flex items-center gap-2.5 sm:gap-3 min-w-0 shadow-lg">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-400 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div className="min-w-0">
              <div className="text-xs sm:text-sm font-extrabold text-white truncate">ACAP & TIMS</div>
              <div className="text-[9px] sm:text-[10px] text-slate-300 truncate">Govt. Permits</div>
            </div>
          </div>

          {/* Trust 3 */}
          <div className="bg-slate-950/80 border border-white/15 rounded-2xl p-2.5 sm:p-4 flex items-center gap-2.5 sm:gap-3 min-w-0 shadow-lg">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-sky-500/20 border border-sky-400/40 text-sky-400 flex items-center justify-center shrink-0">
              <HeartHandshake className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div className="min-w-0">
              <div className="text-xs sm:text-sm font-extrabold text-white truncate">1:1 Porter</div>
              <div className="text-[9px] sm:text-[10px] text-slate-300 truncate">Ethical Care</div>
            </div>
          </div>

          {/* Trust 4 */}
          <div className="bg-slate-950/80 border border-white/15 rounded-2xl p-2.5 sm:p-4 flex items-center gap-2.5 sm:gap-3 min-w-0 shadow-lg">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-indigo-500/20 border border-indigo-400/40 text-indigo-300 flex items-center justify-center shrink-0">
              <Compass className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div className="min-w-0">
              <div className="text-xs sm:text-sm font-extrabold text-white truncate">VIP Heli Evac</div>
              <div className="text-[9px] sm:text-[10px] text-slate-300 truncate">25-Min Standby</div>
            </div>
          </div>
        </div>

        {/* Animated Scroll Down Indicator */}
        <div className={`mt-6 sm:mt-8 transition-opacity duration-300 ${scrollY > 60 ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
          <a
            href="#packages"
            className="inline-flex flex-col items-center gap-1.5 text-[10px] sm:text-[11px] font-extrabold tracking-widest uppercase text-slate-300/80 hover:text-white transition-colors"
          >
            <span>Scroll to Explore Expedition</span>
            <div className="w-5 h-8 rounded-full border-2 border-slate-400/60 flex items-start justify-center p-1 shadow-md">
              <div className="w-1.5 h-2 rounded-full bg-sky-400 animate-bounce" />
            </div>
          </a>
        </div>
      </div>

      {/* Floating Ambient Video Control Pill */}
      <div className="absolute bottom-3 right-4 sm:bottom-5 sm:right-6 z-20 flex items-center gap-2.5 bg-slate-950/85 border border-white/20 px-3.5 py-1.5 rounded-full text-xs text-white shadow-xl pointer-events-auto">
        <span className={`w-2 h-2 rounded-full ${isPlaying ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`}></span>
        <span className="hidden sm:inline text-[11px] font-semibold tracking-wide text-slate-200">
          {isPlaying ? 'Sanctuary 4K • 60 FPS' : 'Photo Mode (Low Power)'}
        </span>
        <button
          type="button"
          onClick={togglePlay}
          aria-label={isPlaying ? 'Pause video' : 'Play video'}
          className="p-1 rounded-full hover:bg-white/20 transition-colors cursor-pointer text-slate-200 hover:text-white"
          title={isPlaying ? 'Pause Video (Show High-Res Photo)' : 'Play Ambient Video'}
        >
          {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
        </button>
        <button
          type="button"
          onClick={toggleMute}
          aria-label={isMuted ? 'Unmute video' : 'Mute video'}
          className="p-1 rounded-full hover:bg-white/20 transition-colors cursor-pointer text-slate-200 hover:text-white"
          title={isMuted ? 'Unmute' : 'Mute'}
        >
          {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
        </button>
      </div>
    </section>
  );
};
