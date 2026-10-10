import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Phone, ShieldCheck, Lock, UserPlus } from 'lucide-react';
import { OrderItem, User, SUPPORT_PHONE, SUPPORT_PHONE_CALL } from '../services/api';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: OrderItem[];
  currentUser: User | null;
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onProceedToCheckout: () => void;
  onRequireAuth: () => void;
  onOpenSupport: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  currentUser,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  onRequireAuth,
  onOpenSupport
}) => {
  // Lock body scroll when cart drawer is open
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const freeShippingThreshold = 2000;
  const isFreeShipping = subtotal >= freeShippingThreshold;
  const progressToFreeShipping = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  const backdropBg = "https://res.cloudinary.com/jsg7ebov/image/upload/v1791656996/1c71f385-1593-44bc-844b-7cc4938cd65d.jpg";
  const profileIconImg = "https://res.cloudinary.com/jsg7ebov/image/upload/v1791658927/download_8.jpg";

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/85 backdrop-blur-lg animate-in fade-in duration-200 overscroll-none">
      {/* Background Image Backdrop */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center filter blur-xs scale-105 opacity-40 pointer-events-none fixed"
        style={{ backgroundImage: `url(${backdropBg})` }}
      />

      {/* Animated Organic Liquid Blobs */}
      <div className="absolute top-1/4 right-1/4 w-72 h-72 bg-amber-500/20 rounded-full blur-[90px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-slate-400/15 rounded-full blur-[100px] pointer-events-none" />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10 z-10">
        <div className="w-screen max-w-md bg-slate-950/85 backdrop-blur-2xl shadow-[0_25px_60px_rgba(0,0,0,0.8)] flex flex-col border-l border-white/20 text-white">
          {/* Header with Attached Profile Icon next to Title */}
          <div className="px-6 py-5 bg-white/5 border-b border-white/10 flex items-center justify-between shrink-0 relative">
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent" />
            <div className="flex items-center gap-3">
              <img
                src={profileIconImg}
                alt="VERFIED Icon"
                className="w-8 h-8 rounded-full object-cover border border-slate-300 shadow-sm"
              />
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold font-brand tracking-wide text-white">Your Shopping Bag</h2>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-white/10 text-slate-200 border border-white/10 font-bold">
                  {items.reduce((acc, i) => acc + i.quantity, 0)}
                </span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full text-slate-400 hover:text-white bg-white/5 hover:bg-white/15 transition-all cursor-pointer"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress */}
          <div className="px-6 py-3 bg-white/5 border-b border-white/10 text-xs shrink-0 backdrop-blur-md">
            {subtotal >= freeShippingThreshold ? (
              <div className="text-emerald-300 font-semibold flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" /> You've qualified for FREE priority express delivery!
              </div>
            ) : (
              <div className="text-slate-300">
                Add <strong className="text-white font-mono">GH₵{(freeShippingThreshold - subtotal).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</strong> more for FREE shipping
              </div>
            )}
            <div className="w-full bg-white/10 h-1.5 rounded-full mt-2 overflow-hidden">
              <div
                className="bg-gradient-to-r from-slate-200 via-slate-100 to-slate-300 h-full rounded-full transition-all duration-300"
                style={{ width: `${progressToFreeShipping}%` }}
              />
            </div>
          </div>

          {/* Cart Items List with Sleek Custom Scrollbar */}
          <div className="flex-1 overflow-y-auto px-6 py-4 divide-y divide-white/10 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-slate-950/40 [&::-webkit-scrollbar-thumb]:bg-slate-700/60 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-slate-500/80">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-16 space-y-3">
                <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 backdrop-blur-md">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="font-bold text-white text-base">Your bag is currently empty</h3>
                <p className="text-xs text-slate-300 max-w-xs">
                  Explore our luxury clothing, calming diffusers, premium accessories, or latest iPhones!
                </p>
                <button
                  onClick={onClose}
                  className="mt-2 px-5 py-2.5 bg-gradient-to-r from-slate-200 via-slate-100 to-slate-300 hover:from-slate-100 hover:to-white text-slate-950 text-xs font-bold rounded-xl transition-colors cursor-pointer shadow-md"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div key={item.id} className="py-4 flex gap-3.5">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-18 h-18 object-cover rounded-xl border border-white/15 shrink-0 bg-slate-900 shadow-sm"
                  />
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start gap-1">
                        <h4 className="text-xs font-bold text-white line-clamp-2 leading-snug">
                          {item.name}
                        </h4>
                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="text-slate-400 hover:text-rose-400 p-0.5 transition-colors shrink-0 cursor-pointer"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Variant tags */}
                      <div className="flex flex-wrap gap-1.5 mt-1 text-[11px] text-slate-300">
                        {item.selectedSize && <span>Size: {item.selectedSize}</span>}
                        {item.selectedColor && <span>• {item.selectedColor}</span>}
                        {item.selectedStorage && <span>• {item.selectedStorage}</span>}
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-2 pt-1">
                      {/* Quantity controls */}
                      <div className="flex items-center border border-white/15 rounded-xl bg-white/5 backdrop-blur-xs">
                        <button
                          onClick={() => onUpdateQuantity(item.id, -1)}
                          className="px-2.5 py-1 text-slate-300 hover:text-white text-xs cursor-pointer"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-bold text-white min-w-6 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, 1)}
                          className="px-2.5 py-1 text-slate-300 hover:text-white text-xs cursor-pointer"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="text-right font-extrabold text-sm text-emerald-400 font-mono">
                        GH₵{(item.price * item.quantity).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout button */}
          {items.length > 0 && (
            <div className="border-t border-white/10 bg-white/5 p-6 space-y-4 shrink-0 backdrop-blur-md">
              {/* Subtotal & Total Summary Card */}
              <div className="bg-slate-900/70 border border-white/10 rounded-2xl p-4.5 space-y-2.5 backdrop-blur-md shadow-inner">
                <div className="flex justify-between items-center text-xs text-slate-300">
                  <span className="font-medium tracking-wide">Cart Subtotal</span>
                  <span className="text-white font-bold tracking-tight font-mono">
                    GH₵{subtotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>
                <div className="flex justify-between items-center text-xs text-slate-300">
                  <span className="font-medium tracking-wide flex items-center gap-1.5">
                    Estimated Express Shipping
                    {isFreeShipping && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/25 font-bold uppercase tracking-wider">
                        Free Tier
                      </span>
                    )}
                  </span>
                  <span className={isFreeShipping ? 'text-emerald-300 font-bold' : 'text-white font-bold font-mono'}>
                    {isFreeShipping ? 'FREE' : 'GH₵50.00'}
                  </span>
                </div>
                <div className="flex justify-between items-baseline text-sm font-bold text-white pt-2.5 border-t border-white/10">
                  <span className="tracking-wide">Estimated Total</span>
                  <span className="text-emerald-400 font-extrabold text-lg tracking-tight font-mono">
                    GH₵{(subtotal + (isFreeShipping ? 0 : 50)).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>
              </div>

              {/* Action buttons */}
              {!currentUser ? (
                <div className="space-y-2">
                  <div className="p-3 bg-amber-500/15 border border-amber-500/30 rounded-xl text-amber-200 text-xs flex items-start gap-2 backdrop-blur-md">
                    <Lock className="w-4 h-4 text-amber-300 shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-amber-200 font-bold">Registration Required to Buy</strong>
                      <span className="text-amber-100/90 text-[11px]">All customers must register and sign in first before proceeding to checkout.</span>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      onClose();
                      onRequireAuth();
                    }}
                    className="w-full py-3.5 px-4 bg-gradient-to-r from-slate-200 via-slate-100 to-slate-300 hover:from-slate-100 hover:to-white text-slate-950 font-extrabold text-sm rounded-xl transition-all shadow-xl flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <UserPlus className="w-4 h-4" />
                    Register / Sign In First to Checkout
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    onClose();
                    onProceedToCheckout();
                  }}
                  className="w-full py-3.5 px-4 bg-gradient-to-r from-slate-200 via-slate-100 to-slate-300 hover:from-slate-100 hover:to-white text-slate-950 font-bold text-sm rounded-xl transition-all shadow-xl flex items-center justify-center gap-2 group cursor-pointer"
                >
                  Proceed to Checkout
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              )}
            </div>
          )}

          {/* Moved Hotline Banner to the Bottom with Native Silver Touch */}
          <div className="bg-slate-900/90 text-slate-300 px-6 py-3 flex flex-wrap items-center justify-between text-xs border-t border-white/10 gap-2 shrink-0 backdrop-blur-md">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Need ordering help? Call <strong>{SUPPORT_PHONE}</strong></span>
            </div>
            <div className="flex items-center gap-2">
              <a
                href={SUPPORT_PHONE_CALL}
                className="text-slate-300 hover:text-white underline font-semibold transition-colors"
              >
                Call Hotline
              </a>
              <span className="text-slate-600">|</span>
              <button
                onClick={onOpenSupport}
                className="text-slate-300 hover:text-white underline font-semibold transition-colors cursor-pointer"
              >
                Help Concierge
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
