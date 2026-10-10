import React from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  Phone, 
  UserPlus, 
  ShoppingBag, 
  CheckCircle2, 
  Shirt, 
  Flame, 
  Watch, 
  Smartphone, 
  CreditCard, 
  Truck, 
  Lock 
} from 'lucide-react';
import { SUPPORT_PHONE, SUPPORT_PHONE_CALL, SUPPORT_WHATSAPP, User } from '../services/api';

interface AboutPageProps {
  onNavigateToShop: (category?: 'all' | 'cloth' | 'diffuser' | 'accessories' | 'iphones') => void;
  onNavigateToWelcome: () => void;
  onOpenAuth: (tab: 'login' | 'register') => void;
  onOpenSupport: () => void;
  currentUser: User | null;
}

export const AboutPage: React.FC<AboutPageProps> = ({
  onNavigateToShop,
  onNavigateToWelcome,
  onOpenAuth,
  onOpenSupport,
  currentUser
}) => {
  return (
    <div className="animate-in fade-in duration-300 bg-white">
      {/* Editorial Header */}
      <section className="relative text-white py-24 px-4 sm:px-6 lg:px-8 border-b border-white/20">
        {/* Background Image with Partial Shade */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://res.cloudinary.com/jsg7ebov/image/upload/v1791656489/1fa334b0-71a2-4e36-ad50-4fac9e31be1d.jpg')" }}
        />
        <div className="absolute inset-0 z-0 bg-slate-950/60" />

        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-4">
          <h1 className="text-3xl sm:text-5xl font-black font-brand tracking-tight">
            What VERFIED Is About
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto">
            A certified e-commerce ecosystem created to eliminate counterfeit risk, poor fabrics, and unreliable deliveries. Here is our story, our 4 departments, and how our member-first shopping process works.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={onNavigateToWelcome}
              className="text-xs text-slate-400 hover:text-white underline cursor-pointer"
            >
              ← Back to Welcome Message (Page 1)
            </button>
            <span className="text-slate-600">·</span>
            <button
              onClick={() => onNavigateToShop('all')}
              className="px-5 py-2.5 bg-gradient-to-b from-white via-slate-100 to-slate-300 hover:from-white hover:via-slate-50 hover:to-slate-200 text-slate-950 font-extrabold text-xs rounded-xl transition-all shadow-[0_4px_16px_rgba(255,255,255,0.4),0_2px_4px_rgba(0,0,0,0.15),inset_0_1px_2px_rgba(255,255,255,0.9),inset_0_-1px_1px_rgba(0,0,0,0.2)] border border-white/80 active:scale-[0.98] cursor-pointer"
            >
              Proceed to Shopping Catalog →
            </button>
          </div>
        </div>
      </section>

      {/* Mandatory Registration Notice Banner */}
      <section className="bg-amber-50 border-y border-amber-200/80 py-5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <Lock className="w-5 h-5 text-amber-800 shrink-0 mt-0.5" />
            <div className="text-xs text-amber-950">
              <strong className="block text-sm font-bold text-amber-900 mb-0.5">
                Buying Rule: Register & Sign In First
              </strong>
              <span>
                To ensure authenticated orders, genuine warranty tracking, and secure delivery dispatch, <strong>every customer must register and sign in before buying any item</strong>.
              </span>
            </div>
          </div>

          {!currentUser ? (
            <button
              onClick={() => onOpenAuth('register')}
              className="px-4 py-2 bg-slate-950 text-white font-bold text-xs rounded-xl hover:bg-slate-900 transition-colors shrink-0 cursor-pointer"
            >
              Register Account Now
            </button>
          ) : (
            <span className="text-xs font-semibold text-emerald-800 bg-emerald-100 px-3 py-1.5 rounded-lg shrink-0">
              ✓ Signed in as {currentUser.name}
            </span>
          )}
        </div>
      </section>

      {/* Section 1: The 4 Core Collections in Detail */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-16">
        <div className="text-center max-w-2xl mx-auto">
          <div className="text-xs font-bold uppercase tracking-wider text-amber-700">
            Our 4 Curated Departments
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-brand text-slate-950 mt-1">
            Carefully Selected. Rigorously Verified.
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-2">
            VERFIED specializes in four specific lifestyle pillars, ensuring depth of quality rather than an endless catalog of unvetted goods.
          </p>
        </div>

        {/* 1. Cloth Shopping */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-slate-50 p-6 sm:p-10 rounded-3xl border border-slate-200">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-800 uppercase tracking-wider">
              <Shirt className="w-4 h-4 text-amber-600" />
              <span>Department 01 · Cloth & Apparel</span>
            </div>
            <h3 className="text-2xl font-bold font-brand text-slate-950">
              Luxury Streetwear & Tailored Silhouettes
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Our clothing selection centers on timeless minimalism and exceptional fabric weights. From 500 GSM double-terry organic hoodies to Italian pleated virgin wool trousers and Japanese raw denim jackets, every piece is made to endure washes without loss of shape or color.
            </p>
            <ul className="space-y-1.5 text-xs text-slate-700">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Heavyweight French terry, silk-mercerized Egyptian cotton</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Pre-shrunk, reinforced seam stitching, anti-twist cuts</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Sizes S to XXL with exact fit guides</span>
              </li>
            </ul>
            <button
              onClick={() => onNavigateToShop('cloth')}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-slate-950 text-white text-xs font-bold rounded-xl hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <span>Explore Clothing Collection</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="rounded-2xl overflow-hidden aspect-4/3 bg-slate-200 shadow-md">
            <img
              src="https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80"
              alt="Clothing collection"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>

        {/* 2. Diffuser Shopping */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-slate-50 p-6 sm:p-10 rounded-3xl border border-slate-200">
          <div className="rounded-2xl overflow-hidden aspect-4/3 bg-slate-200 shadow-md order-2 md:order-1">
            <img
              src="https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=800&q=80"
              alt="Aroma diffuser"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="space-y-4 order-1 md:order-2">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-800 uppercase tracking-wider">
              <Flame className="w-4 h-4 text-amber-600" />
              <span>Department 02 · Diffusers & Ambient Scents</span>
            </div>
            <h3 className="text-2xl font-bold font-brand text-slate-950">
              Sculptural Stone & Ultrasonic Aromatherapy
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Atmosphere shapes mindset. VERFIED curates sculptural ceramic flame mist diffusers, cast-stone architectural aroma dispensers, and cold-air nebulizers that atomize pure essential oils without degrading their therapeutic botanical terpenes.
            </p>
            <ul className="space-y-1.5 text-xs text-slate-700">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Whisper-silent ultrasonic operation under 20dB</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Warm flame ambient illumination and sleep-safe auto shut-off</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Amber glass reed diffuser sets with 90+ day dispersion</span>
              </li>
            </ul>
            <button
              onClick={() => onNavigateToShop('diffuser')}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-slate-950 text-white text-xs font-bold rounded-xl hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <span>Explore Diffuser Collection</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* 3. Accessories Shopping */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-slate-50 p-6 sm:p-10 rounded-3xl border border-slate-200">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-800 uppercase tracking-wider">
              <Watch className="w-4 h-4 text-amber-600" />
              <span>Department 03 · Curated Accessories</span>
            </div>
            <h3 className="text-2xl font-bold font-brand text-slate-950">
              Chrono Sapphire Timepieces & Artisan Leather
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Accessories define individuality. We curate Japanese Miyota chronograph watches with scratch-proof double-domed sapphire glass, Italian vegetable-tanned leather RFID card wallets, ultralight Japanese beta-titanium eyewear, and 18K gold-plated jewelry.
            </p>
            <ul className="space-y-1.5 text-xs text-slate-700">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>316L surgical stainless steel & sapphire crystals</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Hand-waxed Tuscan leather goods with RFID shielding</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>100% UV400 polarized nylon lenses</span>
              </li>
            </ul>
            <button
              onClick={() => onNavigateToShop('accessories')}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-slate-950 text-white text-xs font-bold rounded-xl hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <span>Explore Accessories Collection</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="rounded-2xl overflow-hidden aspect-4/3 bg-slate-200 shadow-md">
            <img
              src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80"
              alt="Accessories collection"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>

        {/* 4. iPhones Shopping */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-slate-50 p-6 sm:p-10 rounded-3xl border border-slate-200">
          <div className="rounded-2xl overflow-hidden aspect-4/3 bg-slate-200 shadow-md order-2 md:order-1">
            <img
              src="https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=800&q=80"
              alt="Apple iPhones"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="space-y-4 order-1 md:order-2">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-800 uppercase tracking-wider">
              <Smartphone className="w-4 h-4 text-amber-600" />
              <span>Department 04 · Apple iPhones</span>
            </div>
            <h3 className="text-2xl font-bold font-brand text-slate-950">
              Factory Sealed Apple iPhones & International Warranty
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Never gamble on refurbished or unlocked clones. At VERFIED, every iPhone (from iPhone 16 Pro Max to iPhone 15 Pro) is factory-sealed, unlocked for any network worldwide, and verifiable through Apple's official warranty check before dispatch.
            </p>
            <ul className="space-y-1.5 text-xs text-slate-700">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>100% Brand new sealed in original box with serial verification</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Factory unlocked: works on all local and international SIMs/eSIMs</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>1-Year full official manufacturer warranty</span>
              </li>
            </ul>
            <button
              onClick={() => onNavigateToShop('iphones')}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-slate-950 text-white text-xs font-bold rounded-xl hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <span>Explore Apple iPhones</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* Section 2: How Purchasing Works at VERFIED */}
      {/* Section 2: How Buying Works at VERFIED with Image Backdrop and Liquid Morphism */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 border-b border-white/20">
        {/* Background Image */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://res.cloudinary.com/jsg7ebov/image/upload/v1791656996/1c71f385-1593-44bc-844b-7cc4938cd65d.jpg')" }}
        />
        <div className="absolute inset-0 z-0 bg-slate-950/40" />

        <div className="relative z-10 max-w-5xl mx-auto space-y-12">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-extrabold font-brand text-white mt-1 drop-shadow-md">
              How Buying Works at VERFIED
            </h2>
            <p className="text-xs sm:text-sm text-white/80 mt-2 font-medium">
              Follow our simple, secure 4-step workflow to place and receive your items.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { id: 1, title: "Register First", desc: "Create your verified profile to link your address and orders." },
              { id: 2, title: "Add to Bag", desc: "Select options and apply code VERFIED10 for 10% off." },
              { id: 3, title: "Secure Payment", desc: "Pay via Mobile Money, Card, or Apple Pay." },
              { id: 4, title: "Receive Order", desc: "Get official VRF ID receipt and direct delivery." },
            ].map((step) => (
              <div key={step.id} className="bg-white/10 backdrop-blur-[8px] p-6 rounded-3xl border border-white/20 flex flex-col justify-between shadow-lg">
                <div>
                  <div className="w-10 h-10 rounded-2xl bg-white/20 text-white flex items-center justify-center font-bold mb-4 border border-white/30">
                    {step.id}
                  </div>
                  <h4 className="font-bold text-base text-white">{step.title}</h4>
                  <p className="text-xs text-white/70 mt-2 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3: Dedicated Support Hotline 059 883 0932 */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-center space-y-6">
        {/* Silver Glossy Phone SVG Icon Container */}
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-b from-white via-slate-200 to-slate-400 text-slate-950 flex items-center justify-center mx-auto shadow-[0_8px_24px_rgba(0,0,0,0.12),inset_0_2px_3px_rgba(255,255,255,0.95),inset_0_-2px_4px_rgba(0,0,0,0.25)] border border-white/80 ring-1 ring-slate-300/60 transition-transform hover:scale-105">
          <Phone className="w-8 h-8 text-slate-900 drop-shadow-[0_1px_1px_rgba(255,255,255,0.85)]" />
        </div>

        <div>
          <span className="inline-block px-3 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200 text-xs font-bold uppercase tracking-widest">
            Always Here For You
          </span>
          <h3 className="text-2xl sm:text-3xl font-extrabold font-brand text-slate-950 mt-2">
            Having Any Problem? Contact 059 883 0932
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto mt-2 leading-relaxed">
            If you experience any difficulties registering, selecting sizes, making a payment, or tracking delivery, call or WhatsApp our personal concierge line immediately.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <a
            href={SUPPORT_PHONE_CALL}
            className="px-6 py-3 rounded-xl bg-slate-950 text-white font-bold text-xs hover:bg-slate-900 transition-colors flex items-center gap-2 shadow-sm"
          >
            <div className="w-4 h-4 rounded bg-gradient-to-b from-white to-slate-300 flex items-center justify-center shadow-[inset_0_1px_1px_rgba(255,255,255,0.9)]">
              <Phone className="w-2.5 h-2.5 text-slate-950" />
            </div>
            <span>Call Hotline: {SUPPORT_PHONE}</span>
          </a>

          <a
            href={SUPPORT_WHATSAPP}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-xl bg-[#25D366] text-white font-bold text-xs hover:opacity-90 transition-opacity flex items-center gap-2"
          >
            <span>WhatsApp: {SUPPORT_PHONE}</span>
          </a>

          <button
            onClick={onOpenSupport}
            className="px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold text-xs transition-colors"
          >
            Open Support Ticket Modal
          </button>
        </div>

        {/* Final CTA to Shop */}
        <div className="pt-8 border-t border-slate-200 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={() => onNavigateToShop('all')}
            className="px-8 py-4 bg-slate-950 hover:bg-slate-900 text-white font-extrabold text-sm rounded-xl transition-all shadow-xl flex items-center gap-2 cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4 text-amber-400" />
            <span>Ready to Shop the Collections →</span>
          </button>

          {!currentUser && (
            <button
              onClick={() => onOpenAuth('register')}
              className="px-8 py-4 bg-gradient-to-b from-white via-slate-100 to-slate-300 hover:from-white hover:via-slate-50 hover:to-slate-200 text-slate-950 font-extrabold text-sm rounded-xl transition-all shadow-[0_8px_25px_rgba(255,255,255,0.35),0_2px_4px_rgba(0,0,0,0.15),inset_0_1px_2px_rgba(255,255,255,0.9),inset_0_-1px_1px_rgba(0,0,0,0.2)] border border-white/80 ring-1 ring-slate-300/60 flex items-center gap-2 cursor-pointer active:scale-95"
            >
              <UserPlus className="w-4 h-4 text-slate-950" />
              <span>Register First (Required)</span>
            </button>
          )}
        </div>
      </section>
    </div>
  );
};
