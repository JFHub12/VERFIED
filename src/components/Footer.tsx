import React from 'react';
import { Phone, MessageSquare, ShieldCheck, Mail, MapPin } from 'lucide-react';
import { SUPPORT_PHONE, SUPPORT_PHONE_CALL, SUPPORT_WHATSAPP } from '../services/api';

interface FooterProps {
  onNavigate: (page: 'welcome' | 'about' | 'shop', cat?: 'all' | 'cloth' | 'diffuser' | 'accessories' | 'iphones') => void;
  onOpenSupport: () => void;
  onOpenAuth: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpenSupport,
  onOpenAuth
}) => {
  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800 font-sans">
      {/* Sleek, minimal, low-height footer with horizontal departments & contact details */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-6">
        
        {/* Top Row: Brand & Horizontal Contact Details */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pb-6 border-b border-slate-900">
          <div className="flex items-center gap-3">
            <img
              src="https://res.cloudinary.com/jsg7ebov/image/upload/v1791658927/download_8.jpg"
              alt="VERFIED Profile Icon"
              className="w-8 h-8 rounded-full object-cover border border-slate-400/80 shadow-[0_0_10px_rgba(255,255,255,0.1)]"
            />
            <span className="text-xl font-black font-brand text-white tracking-wider">
              VERFIED
            </span>
          </div>

          {/* Contact Details Streamlined Horizontally */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-slate-300" />
              <span>Concierge Hotline:</span>
              <a href={SUPPORT_PHONE_CALL} className="font-extrabold text-white hover:underline">
                {SUPPORT_PHONE}
              </a>
            </div>
            <span className="text-slate-800 hidden sm:inline">·</span>
            <a
              href={SUPPORT_WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-400 hover:underline font-semibold flex items-center gap-1.5"
            >
              <MessageSquare className="w-3.5 h-3.5" /> WhatsApp Support
            </a>
            <span className="text-slate-800 hidden sm:inline">·</span>
            <button onClick={onOpenSupport} className="hover:text-white underline cursor-pointer">
              Support Desk
            </button>
          </div>
        </div>

        {/* Middle Row: Streamlined Departments Horizontally */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="text-slate-500 font-medium uppercase tracking-wider text-[11px]">
            Departments:
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-slate-300">
            <button
              onClick={() => onNavigate('shop', 'cloth')}
              className="hover:text-white transition-colors font-medium cursor-pointer"
            >
              1. Cloth & Apparel
            </button>
            <span className="text-slate-800">·</span>
            <button
              onClick={() => onNavigate('shop', 'diffuser')}
              className="hover:text-white transition-colors font-medium cursor-pointer"
            >
              2. Diffusers & Scents
            </button>
            <span className="text-slate-800">·</span>
            <button
              onClick={() => onNavigate('shop', 'accessories')}
              className="hover:text-white transition-colors font-medium cursor-pointer"
            >
              3. Accessories
            </button>
            <span className="text-slate-800">·</span>
            <button
              onClick={() => onNavigate('shop', 'iphones')}
              className="hover:text-white transition-colors font-medium cursor-pointer"
            >
              4. Apple iPhones
            </button>
          </div>
        </div>

        {/* Bottom Row: Legal & Copyright */}
        <div className="pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-3">
          <div>
            © {new Date().getFullYear()} VERFIED Inc. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span>Privacy Policy</span>
            <span>·</span>
            <span>Terms of Service</span>
            <span>·</span>
            <button onClick={onOpenAuth} className="hover:text-white underline cursor-pointer">
              Member Portal
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
