import React, { useState, useRef, useEffect } from 'react';
import { Compass, Calendar, Users, ShieldCheck, ArrowRight, Star, HeartHandshake, ChevronDown, Volume2, VolumeX, Play, Pause } from 'lucide-react';
import type { PackageTier } from '../../types/trek';

interface HeroProps {
  onOpenBooking: (tier?: PackageTier) => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking }) => {
  const [selectedTier, setSelectedTier] = useState<PackageTier>('4-star');
  const [selectedMonth, setSelectedMonth] = useState('October 2026 (Peak Autumn)');
  const [partySize, setPartySize] = useState(2);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [isVideoReady, setIsVideoReady] = useState(false);

  const heroSectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const userPausedRef = useRef<boolean>(false);
  const [scrollY, setScrollY] = useState(0);

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
    const bookingSection = document.getElementById('booking');
    if (bookingSection) {
      bookingSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      onOpenBooking(selectedTier);
    }
  };

  return (
    <section
      ref={heroSectionRef}
      className="relative min-h-[92vh] flex flex-col justify-center pt-20 sm:pt-24 pb-14 sm:pb-16 px-3 sm:px-6 lg:px-8 overflow-hidden bg-slate-900 text-white w-full max-w-full"
    >
      {/* Cinematic High-Resolution Mountain Video Background with Parallax Glide */}
      <div 
        className="absolute inset-0 overflow-hidden pointer-events-none"
        style={{ transform: `translate3d(0, ${scrollY * 0.28}px, 0)`, willChange: 'transform' }}
      >
        {/* Fallback clean mountain image while video loads */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-700"
          style={{ backgroundImage: `url('/images/hero-annapurna-white.webp')` }}
        />
        {/* Ambient Trekking Video with Zero-Copy Hardware Compositing */}
        <video
          ref={videoRef}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 transform-gpu ${
            isVideoReady ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ transform: 'translate3d(0, 0, 0)', backfaceVisibility: 'hidden' }}
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

      {/* Warm Gradient Scrim - Clean, High Contrast for Supreme Legibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/75 via-slate-900/45 to-slate-950/90 pointer-events-none" />

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

        {/* Interactive Floating Quick-Booking Bar (Fishtail Tours Style) - High Transparency Frosted Glass */}
        <form
          onSubmit={handleQuickSearch}
          className="w-full max-w-5xl bg-white/40 sm:bg-white/45 backdrop-blur-[2px] p-3 sm:p-5 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.45)] border border-white/60 text-slate-950 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 items-center text-left mb-8 sm:mb-10 hover:bg-white/55 transition-all duration-300"
        >
          {/* Field 1: Expedition Tier */}
          <div className="px-3 py-2 border-b sm:border-b-0 sm:border-r border-slate-400/60 bg-white/40 sm:bg-transparent rounded-2xl sm:rounded-none">
            <label className="block text-[10px] font-black uppercase tracking-wider text-slate-800 mb-0.5">
              Service Tier
            </label>
            <div className="relative">
              <select
                value={selectedTier}
                onChange={(e) => setSelectedTier(e.target.value as PackageTier)}
                className="w-full text-xs sm:text-sm font-black text-slate-950 focus:outline-none bg-transparent cursor-pointer appearance-none pr-6"
              >
                <option value="4-star" className="bg-white text-slate-900">4★ Mountain Premier (1:1 Porter)</option>
                <option value="5-star" className="bg-white text-slate-900">5★ Sanctuary Luxury (VIP Heli)</option>
                <option value="3-star" className="bg-white text-slate-900">3★ Alpine Explorer (1:2 Porter)</option>
              </select>
              <ChevronDown className="w-4 h-4 text-slate-800 absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Field 2: Departure Season / Month */}
          <div className="px-3 py-2 border-b sm:border-b-0 lg:border-r border-slate-400/60 bg-white/40 sm:bg-transparent rounded-2xl sm:rounded-none">
            <label className="block text-[10px] font-black uppercase tracking-wider text-slate-800 mb-0.5 flex items-center gap-1">
              <Calendar className="w-3 h-3 text-sky-800" />
              <span>Expedition Window</span>
            </label>
            <div className="relative">
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="w-full text-xs sm:text-sm font-black text-slate-950 focus:outline-none bg-transparent cursor-pointer appearance-none pr-6"
              >
                <option value="October 2026 (Peak Autumn)" className="bg-white text-slate-900">Oct - Nov 2026 (Autumn Clear Skies)</option>
                <option value="April 2026 (Spring Blooms)" className="bg-white text-slate-900">Mar - May 2026 (Rhododendron Season)</option>
                <option value="December 2026 (Winter Snow)" className="bg-white text-slate-900">Dec - Jan 2026 (Crisp Winter Snow)</option>
                <option value="Custom 2027" className="bg-white text-slate-900">2027 Advance Booking</option>
              </select>
              <ChevronDown className="w-4 h-4 text-slate-800 absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Field 3: Group Size */}
          <div className="px-3 py-2 border-b sm:border-b-0 sm:border-r border-slate-400/60 bg-white/40 sm:bg-transparent rounded-2xl sm:rounded-none">
            <label className="block text-[10px] font-black uppercase tracking-wider text-slate-800 mb-0.5 flex items-center gap-1">
              <Users className="w-3 h-3 text-sky-800" />
              <span>Group Size</span>
            </label>
            <div className="relative">
              <select
                value={partySize}
                onChange={(e) => setPartySize(Number(e.target.value))}
                className="w-full text-xs sm:text-sm font-black text-slate-950 focus:outline-none bg-transparent cursor-pointer appearance-none pr-6"
              >
                <option value={1} className="bg-white text-slate-900">1 Solo Trekker (Private Guide)</option>
                <option value={2} className="bg-white text-slate-900">2 Trekkers (Couple / Friends)</option>
                <option value={4} className="bg-white text-slate-900">4 Trekkers (Small Group)</option>
                <option value={6} className="bg-white text-slate-900">6+ Trekkers (Private Group)</option>
              </select>
              <ChevronDown className="w-4 h-4 text-slate-800 absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Action Search Button */}
          <div className="p-1 sm:p-0">
            <button
              type="submit"
              className="w-full py-3 sm:py-3.5 px-6 rounded-2xl font-black text-xs sm:text-sm uppercase tracking-wider bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-700 text-white shadow-xl shadow-sky-600/30 hover:shadow-sky-500/50 hover:brightness-105 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
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
