import React, { useState } from 'react';
import { ArrowRight, ShoppingBag, Phone, Lock, UserPlus, BookOpen, Smartphone, Search, Shirt, Flame, Watch, ExternalLink } from 'lucide-react';
import { SUPPORT_PHONE, SUPPORT_PHONE_CALL, SUPPORT_WHATSAPP, User } from '../services/api';

interface WelcomePageProps {
  onNavigateToAbout: () => void;
  onNavigateToShop: (category?: 'all' | 'cloth' | 'diffuser' | 'accessories' | 'iphones') => void;
  onOpenAuth: (tab: 'login' | 'register') => void;
  onOpenSupport: () => void;
  onOpenShare: () => void;
  currentUser: User | null;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const WelcomePage: React.FC<WelcomePageProps> = ({
  onNavigateToAbout,
  onNavigateToShop,
  onOpenAuth,
  onOpenSupport,
  onOpenShare,
  currentUser,
  searchQuery,
  onSearchChange
}) => {
  const [localSearch, setLocalSearch] = useState(searchQuery);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearchChange(localSearch);
    onNavigateToShop('all');
  };

  const desktopBg = "https://res.cloudinary.com/jsg7ebov/image/upload/v1791652801/66ec5abb-2938-4080-b130-ac67e3bd30f2.jpg";
  const mobileBg = "https://res.cloudinary.com/jsg7ebov/image/upload/v1791652801/9679808c-ebdf-4a37-85bb-4aee29b8d9a1.jpg";

  return (
    <div className="min-h-[calc(100vh-100px)] flex flex-col justify-between text-slate-900 animate-in fade-in duration-200 relative overflow-hidden">
      {/* Background Images for Mobile and Desktop with Pure Opacity (No Dark Slate Overlays) */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat block sm:hidden"
        style={{ backgroundImage: `url(${mobileBg})` }}
      />
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat hidden sm:block"
        style={{ backgroundImage: `url(${desktopBg})` }}
      />

      {/* Main Centered Welcome Content with Search & Pre-populated Action Grid */}
      <div className="px-4 sm:px-6 pb-20 relative z-10">
        <div className="mt-[8cm] max-w-2xl w-full mx-auto text-center space-y-6 bg-gradient-to-br from-white/45 via-white/20 to-white/10 backdrop-blur-2xl p-6 sm:p-10 rounded-[32px] shadow-[0_30px_60px_rgba(0,0,0,0.2)] border border-white/60 ring-1 ring-white/40 relative overflow-hidden">
          
          {/* Liquid Morphic Specular Refraction Highlight */}
          <div className="absolute -top-16 -left-16 w-48 h-48 bg-amber-300/30 rounded-full blur-3xl pointer-events-none animate-pulse" />
          <div className="absolute -bottom-16 -right-16 w-48 h-48 bg-emerald-300/20 rounded-full blur-3xl pointer-events-none" />

          {/* Welcome Message & Subtext */}
          <div className="relative z-10 space-y-2 max-w-lg mx-auto pt-1">
            <h2 className="text-xl sm:text-2xl font-bold font-brand text-slate-950">
              Welcome to our shopping website.
            </h2>
            <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-semibold">
              Explore our verified collections of luxury clothing, ambient diffusers, crafted accessories, and genuine Apple iPhones.
            </p>
          </div>

          {/* Search Bar Underneath Subtext in the Middle of Landing Page */}
          <div className="relative z-10 max-w-xl mx-auto w-full">
            <form onSubmit={handleSearchSubmit} className="relative flex items-center shadow-xl rounded-2xl overflow-hidden border border-white/80 focus-within:border-slate-950 transition-all bg-white/90 backdrop-blur-md">
              <Search className="w-5 h-5 text-slate-400 absolute left-4" />
              <input
                type="text"
                value={localSearch}
                onChange={(e) => {
                  setLocalSearch(e.target.value);
                  onSearchChange(e.target.value);
                }}
                placeholder="Search clothing, diffusers, accessories, iPhones..."
                className="w-full pl-12 pr-28 py-3.5 text-sm sm:text-base bg-transparent focus:outline-none text-slate-900 placeholder:text-slate-400 font-medium"
              />
              <button
                type="submit"
                className="absolute right-1.5 px-5 py-2.5 bg-slate-950 hover:bg-slate-900 text-white font-bold text-xs sm:text-sm rounded-xl transition-colors cursor-pointer shadow-md"
              >
                Search
              </button>
            </form>
          </div>

          {/* Pre-Populated Different Buttons / Category Grid Over Landing Page */}
          <div className="relative z-10 pt-2">
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-3">
              Quick Department & Action Launchpad
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 max-w-2xl mx-auto">
              <button
                onClick={() => onNavigateToShop('cloth')}
                className="p-3 rounded-2xl border border-white/70 bg-white/75 backdrop-blur-md hover:bg-slate-950 hover:text-white hover:border-slate-950 transition-all text-left group cursor-pointer shadow-sm"
              >
                <div className="text-xs font-bold text-slate-900 group-hover:text-amber-300">1. Cloth & Apparel</div>
                <div className="text-[10px] text-slate-600 group-hover:text-slate-300 mt-0.5">Heavyweight & Tailored</div>
              </button>

              <button
                onClick={() => onNavigateToShop('diffuser')}
                className="p-3 rounded-2xl border border-white/70 bg-white/75 backdrop-blur-md hover:bg-slate-950 hover:text-white hover:border-slate-950 transition-all text-left group cursor-pointer shadow-sm"
              >
                <div className="text-xs font-bold text-slate-900 group-hover:text-amber-300">2. Diffusers</div>
                <div className="text-[10px] text-slate-600 group-hover:text-slate-300 mt-0.5">Ultrasonic & Ceramic</div>
              </button>

              <button
                onClick={() => onNavigateToShop('accessories')}
                className="p-3 rounded-2xl border border-white/70 bg-white/75 backdrop-blur-md hover:bg-slate-950 hover:text-white hover:border-slate-950 transition-all text-left group cursor-pointer shadow-sm"
              >
                <div className="text-xs font-bold text-slate-900 group-hover:text-amber-300">3. Accessories</div>
                <div className="text-[10px] text-slate-600 group-hover:text-slate-300 mt-0.5">Watches & Leather</div>
              </button>

              <button
                onClick={() => onNavigateToShop('iphones')}
                className="p-3 rounded-2xl border border-white/70 bg-white/75 backdrop-blur-md hover:bg-slate-950 hover:text-white hover:border-slate-950 transition-all text-left group cursor-pointer shadow-sm"
              >
                <div className="text-xs font-bold text-slate-900 group-hover:text-amber-300">4. Apple iPhones</div>
                <div className="text-[10px] text-slate-600 group-hover:text-slate-300 mt-0.5">Sealed Pro Max & Pro</div>
              </button>
            </div>
          </div>

          {/* Primary Action Buttons */}
          <div className="relative z-10 flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={() => onNavigateToShop('all')}
              className="w-full sm:w-auto px-8 py-3.5 bg-slate-950 hover:bg-slate-900 text-white font-bold text-sm rounded-2xl transition-all shadow-xl flex items-center justify-center gap-2 cursor-pointer group"
            >
              <ShoppingBag className="w-4 h-4 text-amber-400" />
              <span>Browse All Collections</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={onNavigateToAbout}
              className="w-full sm:w-auto px-6 py-3.5 bg-white/80 hover:bg-white text-slate-950 font-bold text-sm rounded-2xl border border-white/80 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md backdrop-blur-md"
            >
              <BookOpen className="w-4 h-4 text-slate-700" />
              <span>About VERFIED (Page 2)</span>
            </button>
          </div>

          {/* Registration Notice & Multi-device trigger */}
          <div className="relative z-10 pt-2 space-y-2">
            {!currentUser ? (
              <p className="text-xs text-slate-700 font-semibold">
                First-time customer?{' '}
                <button
                  onClick={() => onOpenAuth('register')}
                  className="font-extrabold text-slate-950 underline hover:text-amber-800 cursor-pointer"
                >
                  Register and sign in first to buy
                </button>
              </p>
            ) : (
              <p className="text-xs text-emerald-900 font-extrabold">
                ✓ Signed in as {currentUser.name}. You're ready to shop!
              </p>
            )}

            <div>
              <button
                onClick={onOpenShare}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white/80 hover:bg-white border border-white/80 text-slate-900 text-xs font-semibold transition-colors cursor-pointer shadow-sm backdrop-blur-md"
              >
                <Smartphone className="w-3.5 h-3.5 text-amber-600" />
                <span>Run on Any Device (iPhone / Android / Tablet)</span>
                <span className="text-[10px] text-slate-600">· QR & Link</span>
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Simple Quiet Footer Strip with Support Hotline */}
      <div className="border-t border-white/30 py-6 px-4 bg-white/80 backdrop-blur-md relative z-10">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between text-xs text-slate-700 gap-3 font-medium">
          <div className="flex items-center gap-2">
            <Phone className="w-3.5 h-3.5 text-amber-600 shrink-0" />
            <span>Having any problem? Contact our support line:</span>
            <a
              href={SUPPORT_PHONE_CALL}
              className="font-bold text-slate-950 hover:underline"
            >
              {SUPPORT_PHONE}
            </a>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={SUPPORT_WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-800 hover:underline font-bold"
            >
              WhatsApp Us
            </a>
            <span className="text-slate-400">·</span>
            <button
              onClick={onOpenSupport}
              className="text-slate-800 hover:text-slate-950 underline cursor-pointer font-bold"
            >
              Concierge Desk
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
