import React, { useState } from 'react';
import { 
  X, 
  Copy, 
  Check, 
  Smartphone, 
  Share2, 
  QrCode, 
  Laptop, 
  Phone, 
  ExternalLink, 
  Download, 
  MessageSquare,
  Globe
} from 'lucide-react';
import { SUPPORT_PHONE, SUPPORT_PHONE_CALL } from '../services/api';

interface ShareDeviceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SHAREABLE_APP_URL = "https://ais-pre-2fgyza2mz6k6kcrtisn7wu-76987360731.europe-west2.run.app";

export const ShareDeviceModal: React.FC<ShareDeviceModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'link' | 'qr' | 'guide'>('link');

  if (!isOpen) return null;

  // Use the live public URL or current location
  const appUrl = typeof window !== 'undefined' && window.location.origin.includes('run.app')
    ? window.location.origin
    : SHAREABLE_APP_URL;

  const handleCopy = async () => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(appUrl);
      } else {
        const input = document.createElement('input');
        input.value = appUrl;
        document.body.appendChild(input);
        input.select();
        document.execCommand('copy');
        document.body.removeChild(input);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'VERFIED - Luxury Shopping',
          text: 'Shop luxury clothing, ambient diffusers, curated accessories, and Apple iPhones on VERFIED.',
          url: appUrl,
        });
      } catch {
        // User cancelled or share failed
      }
    } else {
      handleCopy();
    }
  };

  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=260x260&data=${encodeURIComponent(appUrl)}&color=0a0a0c&bgcolor=ffffff&margin=10`;
  const whatsappShareUrl = `https://wa.me/?text=${encodeURIComponent(`Check out VERFIED Luxury Shopping: ${appUrl}`)}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="bg-slate-950 text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-full transition-colors cursor-pointer"
            aria-label="Close share dialog"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-1">
            <span className="text-xl font-black font-brand tracking-wider text-white">VERFIED</span>
            <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold uppercase tracking-wider border border-emerald-500/30">
              Multi-Device Ready
            </span>
          </div>

          <h3 className="text-xl font-bold tracking-tight text-white">
            Run on Any Phone, Tablet or Laptop
          </h3>
          <p className="text-xs text-slate-300 mt-1">
            Access this store on iPhone, Android, iPad, Mac, and Windows with full responsive support and offline caching.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-200 bg-slate-50 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('link')}
            className={`flex-1 py-3 border-b-2 transition-colors cursor-pointer flex items-center justify-center gap-1.5 ${
              activeTab === 'link' 
                ? 'border-slate-950 text-slate-950 bg-white' 
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            <span>Store Link</span>
          </button>
          <button
            onClick={() => setActiveTab('qr')}
            className={`flex-1 py-3 border-b-2 transition-colors cursor-pointer flex items-center justify-center gap-1.5 ${
              activeTab === 'qr' 
                ? 'border-slate-950 text-slate-950 bg-white' 
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <QrCode className="w-3.5 h-3.5" />
            <span>Scan QR Code</span>
          </button>
          <button
            onClick={() => setActiveTab('guide')}
            className={`flex-1 py-3 border-b-2 transition-colors cursor-pointer flex items-center justify-center gap-1.5 ${
              activeTab === 'guide' 
                ? 'border-slate-950 text-slate-950 bg-white' 
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Device Instructions</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
          {activeTab === 'link' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                  Universal Public URL
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    readOnly
                    value={appUrl}
                    className="flex-1 px-3.5 py-2.5 text-xs font-mono bg-slate-100 border border-slate-300 rounded-xl text-slate-800 focus:outline-none select-all"
                  />
                  <button
                    onClick={handleCopy}
                    className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer shrink-0 shadow-sm ${
                      copied 
                        ? 'bg-emerald-600 text-white' 
                        : 'bg-slate-950 hover:bg-slate-900 text-white'
                    }`}
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-200" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span>Copy Link</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-2 gap-3 pt-1">
                <a
                  href={whatsappShareUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#25D366] hover:opacity-90 text-white text-xs font-bold transition-all shadow-sm"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Send via WhatsApp</span>
                </a>

                <button
                  onClick={handleNativeShare}
                  className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-900 text-xs font-bold transition-colors cursor-pointer"
                >
                  <Share2 className="w-4 h-4" />
                  <span>Share Menu</span>
                </button>
              </div>

              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                  <Laptop className="w-4 h-4 text-slate-700" />
                  <span>Compatibility on Every Device:</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Open this link in Safari, Chrome, Edge, or Samsung Internet on any smartphone, iPad, tablet, or computer. The layout automatically adapts to touch screens, keyboards, and high-density retina displays.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'qr' && (
            <div className="space-y-4 text-center">
              <p className="text-xs text-slate-600">
                Point your iPhone or Android phone camera at the screen to open the store instantly on your device:
              </p>

              <div className="p-4 bg-white border-2 border-slate-200 rounded-2xl inline-block shadow-sm">
                <img
                  src={qrCodeUrl}
                  alt="QR Code for VERFIED store"
                  className="w-56 h-56 mx-auto rounded-lg object-contain"
                />
              </div>

              <div className="text-xs font-mono text-slate-500 break-all px-4">
                {appUrl}
              </div>

              <button
                onClick={handleCopy}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-lg transition-colors cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied URL!' : 'Copy Direct URL'}</span>
              </button>
            </div>
          )}

          {activeTab === 'guide' && (
            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                How to Install VERFIED on Any Device (PWA)
              </h4>

              <div className="space-y-3 text-xs">
                {/* iPhone / iOS */}
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                  <div className="font-bold text-slate-900 flex items-center gap-1.5">
                    <Smartphone className="w-4 h-4 text-slate-800" />
                    <span>Apple iPhone & iPad (Safari)</span>
                  </div>
                  <ol className="list-decimal list-inside text-slate-600 space-y-1 pl-1">
                    <li>Open this link in Safari on your iPhone.</li>
                    <li>Tap the <strong>Share</strong> button (box with upward arrow) at the bottom.</li>
                    <li>Scroll down and tap <strong>"Add to Home Screen"</strong>.</li>
                    <li>Tap <strong>Add</strong>. The VERFIED icon now appears on your home screen like a native app!</li>
                  </ol>
                </div>

                {/* Android */}
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                  <div className="font-bold text-slate-900 flex items-center gap-1.5">
                    <Smartphone className="w-4 h-4 text-emerald-600" />
                    <span>Android (Google Chrome / Samsung Internet)</span>
                  </div>
                  <ol className="list-decimal list-inside text-slate-600 space-y-1 pl-1">
                    <li>Open this link in Chrome or Samsung Internet.</li>
                    <li>Tap the <strong>three dots menu (⋮)</strong> in the top-right corner.</li>
                    <li>Select <strong>"Install App"</strong> or <strong>"Add to Home Screen"</strong>.</li>
                    <li>Confirm installation. The app will open standalone without browser bars!</li>
                  </ol>
                </div>

                {/* Desktop */}
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                  <div className="font-bold text-slate-900 flex items-center gap-1.5">
                    <Laptop className="w-4 h-4 text-blue-600" />
                    <span>Desktop PC / Mac (Chrome / Edge)</span>
                  </div>
                  <p className="text-slate-600">
                    Click the <strong>Install</strong> icon in the address bar (looks like a monitor or download icon) to launch VERFIED in its own desktop window.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Assistance contact */}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Trouble opening on your phone?</span>
            <a
              href={SUPPORT_PHONE_CALL}
              className="font-bold text-slate-900 hover:text-amber-700 underline flex items-center gap-1"
            >
              <Phone className="w-3 h-3 text-amber-600" />
              <span>Call {SUPPORT_PHONE}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
