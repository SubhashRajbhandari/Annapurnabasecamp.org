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

  const videoRef = useRef<HTMLVideoElement>(null);
  const START_TIME = 95; // 1:35 in seconds (95s)

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const startPlayback = () => {
      if (video.currentTime < START_TIME) {
        video.currentTime = START_TIME;
      }
      video.play().then(() => {
        setIsPlaying(true);
        setIsVideoReady(true);
      }).catch(() => setIsPlaying(false));
    };

    if (video.readyState >= 2) {
      startPlayback();
    }

    const onLoaded = () => startPlayback();
    const onPlaying = () => setIsVideoReady(true);
    const onEnded = () => {
      video.currentTime = START_TIME;
      video.play().catch(() => {});
    };

    video.addEventListener('loadedmetadata', onLoaded);
    video.addEventListener('playing', onPlaying);
    video.addEventListener('ended', onEnded);

    return () => {
      video.removeEventListener('loadedmetadata', onLoaded);
      video.removeEventListener('playing', onPlaying);
      video.removeEventListener('ended', onEnded);
    };
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      if (video.currentTime < START_TIME) {
        video.currentTime = START_TIME;
      }
      video.play().then(() => setIsPlaying(true)).catch(() => {});
    } else {
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
    <section className="relative min-h-[92vh] flex flex-col justify-center pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden bg-slate-900 text-white">
      {/* Cinematic High-Resolution Mountain Video Background (Starts at 1:35 and loops) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Fallback clean mountain image while video loads */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105 transition-all duration-1000"
          style={{ backgroundImage: `url('/images/hero-annapurna-white.jpg')` }}
        />
        {/* Ambient Trekking Video with Smooth Fade-In */}
        <video
          ref={videoRef}
          className={`absolute inset-0 w-full h-full object-cover scale-105 transition-opacity duration-1000 ${
            isVideoReady ? 'opacity-100' : 'opacity-0'
          }`}
          poster="/images/hero-annapurna-white.jpg"
          autoPlay
          muted
          playsInline
          preload="auto"
          onPlaying={() => setIsVideoReady(true)}
          onLoadedMetadata={(e) => {
            e.currentTarget.currentTime = START_TIME;
            e.currentTarget.play().catch(() => {});
          }}
          onEnded={(e) => {
            e.currentTarget.currentTime = START_TIME;
            e.currentTarget.play().catch(() => {});
          }}
        >
          <source src="/videos/nepal-annapurna-trek.mp4" type="video/mp4" />
          <source src="/Nepal - Annapurna Base Camp Trek.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Warm Gradient Scrim - Clean, High Contrast for Supreme Legibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/75 via-slate-900/45 to-slate-950/90 pointer-events-none" />

      {/* Main Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto w-full flex flex-col items-center text-center my-auto">
        {/* Top Authority Pill Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs sm:text-sm font-semibold mb-6 backdrop-blur-md shadow-sm">
          <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
          <span>Official Trekking Guidance & Luxury Booking Portal • 4,130m / 13,550ft</span>
        </div>

        {/* Main Headline - High-Impact Target SEO Heading */}
        <h1 className="text-3xl xs:text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-white max-w-5xl leading-[1.14] mb-5 drop-shadow-[0_4px_20px_rgba(0,0,0,0.85)]">
          Annapurna Base Camp Trek{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-sky-300 to-cyan-200">
            (ABC Nepal 4,130m)
          </span>
        </h1>

        {/* Subtitle with Primary Search Keywords */}
        <p className="text-sm sm:text-lg md:text-xl text-slate-100 max-w-3xl leading-relaxed mb-8 font-medium drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
          The official authority portal for premier trekking in Nepal. Handcrafted Annapurna Base Camp (ABC) expeditions with certified Sherpa leaders, dedicated 1:1 porters, boutique mountain lodges, and direct VIP helicopter descents.
        </p>

        {/* Interactive Floating Quick-Booking Bar (Fishtail Tours Style) */}
        <form
          onSubmit={handleQuickSearch}
          className="w-full max-w-5xl bg-white/95 backdrop-blur-2xl p-3 sm:p-5 rounded-3xl shadow-2xl border border-white/40 text-slate-800 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 items-center text-left mb-10"
        >
          {/* Field 1: Expedition Tier */}
          <div className="px-3 py-2 border-b sm:border-b-0 sm:border-r border-slate-200">
            <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-500 mb-0.5">
              Service Tier
            </label>
            <div className="relative">
              <select
                value={selectedTier}
                onChange={(e) => setSelectedTier(e.target.value as PackageTier)}
                className="w-full text-xs sm:text-sm font-bold text-slate-900 focus:outline-none bg-transparent cursor-pointer appearance-none pr-6"
              >
                <option value="4-star">4★ Mountain Premier (1:1 Porter)</option>
                <option value="5-star">5★ Sanctuary Luxury (VIP Heli)</option>
                <option value="3-star">3★ Alpine Explorer (1:2 Porter)</option>
              </select>
              <ChevronDown className="w-4 h-4 text-slate-400 absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Field 2: Departure Season / Month */}
          <div className="px-3 py-2 border-b sm:border-b-0 lg:border-r border-slate-200">
            <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-500 mb-0.5 flex items-center gap-1">
              <Calendar className="w-3 h-3 text-sky-600" />
              <span>Expedition Window</span>
            </label>
            <div className="relative">
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="w-full text-xs sm:text-sm font-bold text-slate-900 focus:outline-none bg-transparent cursor-pointer appearance-none pr-6"
              >
                <option value="October 2026 (Peak Autumn)">Oct - Nov 2026 (Autumn Clear Skies)</option>
                <option value="April 2026 (Spring Blooms)">Mar - May 2026 (Rhododendron Season)</option>
                <option value="December 2026 (Winter Snow)">Dec - Jan 2026 (Crisp Winter Snow)</option>
                <option value="Custom 2027">2027 Advance Booking</option>
              </select>
              <ChevronDown className="w-4 h-4 text-slate-400 absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Field 3: Group Size */}
          <div className="px-3 py-2 border-b sm:border-b-0 sm:border-r border-slate-200">
            <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-500 mb-0.5 flex items-center gap-1">
              <Users className="w-3 h-3 text-sky-600" />
              <span>Group Size</span>
            </label>
            <div className="relative">
              <select
                value={partySize}
                onChange={(e) => setPartySize(Number(e.target.value))}
                className="w-full text-xs sm:text-sm font-bold text-slate-900 focus:outline-none bg-transparent cursor-pointer appearance-none pr-6"
              >
                <option value={1}>1 Solo Trekker (Private Guide)</option>
                <option value={2}>2 Trekkers (Couple / Friends)</option>
                <option value={4}>4 Trekkers (Small Group)</option>
                <option value={6}>6+ Trekkers (Private Group)</option>
              </select>
              <ChevronDown className="w-4 h-4 text-slate-400 absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Action Search Button */}
          <div className="p-1 sm:p-0">
            <button
              type="submit"
              className="w-full py-3.5 px-6 rounded-2xl font-black text-xs sm:text-sm uppercase tracking-wider bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-700 text-white shadow-xl shadow-sky-600/30 hover:shadow-sky-500/50 hover:brightness-105 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Check Rates & Book</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>

        {/* Social Proof & Trust Pillars Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-5xl w-full text-left">
          {/* Trust 1 */}
          <div className="bg-slate-950/60 backdrop-blur-md border border-white/10 rounded-2xl p-3.5 sm:p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-400/40 text-amber-400 flex items-center justify-center shrink-0">
              <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
            </div>
            <div>
              <div className="text-xs sm:text-sm font-extrabold text-white">4.98 / 5 Rating</div>
              <div className="text-[10px] text-slate-300">1,400+ Verified Trekkers</div>
            </div>
          </div>

          {/* Trust 2 */}
          <div className="bg-slate-950/60 backdrop-blur-md border border-white/10 rounded-2xl p-3.5 sm:p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-400 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs sm:text-sm font-extrabold text-white">Official ACAP & TIMS</div>
              <div className="text-[10px] text-slate-300">Govt. Certified Permits</div>
            </div>
          </div>

          {/* Trust 3 */}
          <div className="bg-slate-950/60 backdrop-blur-md border border-white/10 rounded-2xl p-3.5 sm:p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-sky-500/20 border border-sky-400/40 text-sky-400 flex items-center justify-center shrink-0">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs sm:text-sm font-extrabold text-white">1:1 Dedicated Porter</div>
              <div className="text-[10px] text-slate-300">Ethical Sherpa Care</div>
            </div>
          </div>

          {/* Trust 4 */}
          <div className="bg-slate-950/60 backdrop-blur-md border border-white/10 rounded-2xl p-3.5 sm:p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/20 border border-indigo-400/40 text-indigo-300 flex items-center justify-center shrink-0">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs sm:text-sm font-extrabold text-white">VIP Heli Evacuation</div>
              <div className="text-[10px] text-slate-300">25-Min Standby in Pokhara</div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Ambient Video Control Pill */}
      <div className="absolute bottom-3 right-4 sm:bottom-5 sm:right-6 z-20 flex items-center gap-2.5 bg-slate-950/75 backdrop-blur-md border border-white/20 px-3.5 py-1.5 rounded-full text-xs text-white shadow-xl pointer-events-auto">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
        <span className="hidden sm:inline text-[11px] font-semibold tracking-wide text-slate-200">
          Annapurna Sanctuary 4K (1:35 Loop)
        </span>
        <button
          type="button"
          onClick={togglePlay}
          aria-label={isPlaying ? 'Pause video' : 'Play video'}
          className="p-1 rounded-full hover:bg-white/20 transition-colors cursor-pointer text-slate-200 hover:text-white"
          title={isPlaying ? 'Pause' : 'Play'}
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
