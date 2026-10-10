import React, { useState } from 'react';
import { ShoppingBag, User as UserIcon, Phone, Search, Menu, X, Shield, Sparkles, MessageSquare, BookOpen, Home, Smartphone, Share2, HelpCircle } from 'lucide-react';
import { User, SUPPORT_PHONE, SUPPORT_PHONE_CALL, SUPPORT_WHATSAPP } from '../services/api';
import { PWAInstallButton } from './PWAInstallButton';

interface HeaderProps {
  currentUser: User | null;
  onOpenAuth: (initialTab?: 'login' | 'register' | 'profile') => void;
  onOpenSupport: () => void;
  activePage: 'welcome' | 'about' | 'shop';
  onNavigate: (page: 'welcome' | 'about' | 'shop', category?: 'all' | 'cloth' | 'diffuser' | 'accessories' | 'iphones') => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentUser,
  onOpenAuth,
  onOpenSupport,
  activePage,
  onNavigate,
  searchQuery,
  onSearchChange
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/30 backdrop-blur-2xl border-b border-white/40 shadow-[0_4px_30px_rgba(0,0,0,0.05)] transition-all">
      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo & Profile Image Icon */}
          <div className="flex items-center gap-6">
            <button
              onClick={() => onNavigate('welcome')}
              className="group text-left cursor-pointer focus:outline-none flex items-center gap-3"
            >
              <img
                src="https://res.cloudinary.com/jsg7ebov/image/upload/v1791658927/download_8.jpg"
                alt="VERFIED Profile Icon"
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-full object-cover border-2 border-slate-300 shadow-[0_0_15px_rgba(203,213,225,0.7)] group-hover:scale-105 transition-transform"
              />
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-lg sm:text-xl font-bold tracking-tight text-slate-950 font-brand">
                    VERFIED
                  </span>
                </div>
                <p className="text-[9px] uppercase tracking-widest text-slate-500 font-medium">
                  Flagship Luxury & Technology
                </p>
              </div>
            </button>
          </div>

          {/* Contextual Header Button: On landing page shows "About", on About page seamlessly translates to "Welcome" */}
          <nav className="hidden lg:flex items-center gap-2 text-xs font-semibold">
            {activePage === 'welcome' ? (
              <button
                onClick={() => onNavigate('about')}
                className="px-4 py-2.5 rounded-xl transition-all cursor-pointer flex items-center gap-2 text-slate-700 hover:text-slate-950 hover:bg-slate-50 border border-slate-200/80 shadow-2xs"
              >
                <BookOpen className="w-4 h-4 text-slate-600" />
                <span>About VERFIED</span>
              </button>
            ) : (
              <button
                onClick={() => onNavigate('welcome')}
                className="px-4 py-2.5 rounded-xl transition-all cursor-pointer flex items-center gap-2 text-slate-950 bg-slate-100 font-bold shadow-2xs"
              >
                <Home className="w-4 h-4 text-slate-600" />
                <span>Welcome</span>
              </button>
            )}
          </nav>

          {/* Right Action Icons (Desktop & Mobile Hamburger) */}
          <div className="flex items-center gap-2.5 sm:gap-3">


            {/* PWA Install Button */}
            <PWAInstallButton variant="header" />

            {/* Support Hotline Button */}
            <button
              onClick={onOpenSupport}
              className="hidden lg:flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-200 hover:border-slate-400 text-slate-700 text-xs font-semibold transition-all cursor-pointer shadow-2xs"
              title="Call 059 883 0932"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-600" />
              <span>059 883 0932</span>
            </button>

            {/* Auth / Account Profile Button (Desktop) */}
            <button
              onClick={() => onOpenAuth(currentUser ? 'profile' : 'register')}
              className={`hidden lg:flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer shadow-sm ${
                currentUser
                  ? 'bg-slate-900 text-white hover:bg-slate-800'
                  : 'bg-gradient-to-r from-slate-200 via-slate-100 to-slate-300 text-slate-950 hover:from-slate-100 hover:to-slate-200 border border-slate-300/80 font-bold'
              }`}
            >
              {currentUser?.photoURL ? (
                <img
                  src={currentUser.photoURL}
                  alt={currentUser.name}
                  className="w-4 h-4 rounded-full object-cover border border-slate-400/40"
                />
              ) : (
                <UserIcon className="w-3.5 h-3.5" />
              )}
              <span>
                {currentUser ? currentUser.name.split(' ')[0] : 'Register / Login'}
              </span>
            </button>

            {/* Mobile Menu Hamburger (Visible on < 1024px / lg breakpoint) */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 text-slate-700 hover:text-slate-950 rounded-xl hover:bg-slate-100 cursor-pointer transition-colors border border-slate-200/80 bg-slate-50"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer (< 1024px) */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-5 border-t border-slate-200/90 space-y-3 animate-in fade-in duration-200 bg-white px-3 shadow-xl rounded-b-2xl">
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-2">
              Navigation & Sections
            </div>

            {activePage === 'welcome' ? (
              <button
                onClick={() => {
                  onNavigate('about');
                  setMobileMenuOpen(false);
                }}
                className="w-full text-left px-4 py-3 rounded-xl text-sm font-semibold transition-colors flex items-center gap-3 text-slate-700 hover:bg-slate-100"
              >
                <BookOpen className="w-4 h-4 text-amber-500" />
                <span>Go to About Section</span>
              </button>
            ) : (
              <button
                onClick={() => {
                  onNavigate('welcome');
                  setMobileMenuOpen(false);
                }}
                className="w-full text-left px-4 py-3 rounded-xl text-sm font-semibold transition-colors flex items-center gap-3 bg-slate-950 text-white shadow-sm"
              >
                <Home className="w-4 h-4 text-amber-400" />
                <span>Welcome</span>
              </button>
            )}

            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-2 pt-2">
              App & Offline Experience
            </div>
            <PWAInstallButton variant="mobile" />

            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-2 pt-2">
              User Account & Profile
            </div>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAuth(currentUser ? 'profile' : 'register');
              }}
              className={`w-full text-left px-4 py-3 rounded-xl text-sm font-bold transition-colors flex items-center gap-3 ${
                currentUser ? 'bg-slate-900 text-white' : 'bg-amber-400 text-slate-950'
              }`}
            >
              <UserIcon className="w-4 h-4" />
              <span>{currentUser ? `Profile: ${currentUser.name}` : 'Register & Sign In First'}</span>
            </button>

            <div className="space-y-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenSupport();
                }}
                className="w-full flex items-center justify-between p-3.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-950 font-bold text-xs"
              >
                <span className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-emerald-700" />
                  <span>Support: {SUPPORT_PHONE}</span>
                </span>
                <span className="underline">Call</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
