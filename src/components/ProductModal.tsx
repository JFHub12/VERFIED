import React, { useState } from 'react';
import { X, Star, Check, ShieldCheck, Truck, RotateCcw, ShoppingBag, Phone } from 'lucide-react';
import { Product } from '../data/products';
import { SUPPORT_PHONE, SUPPORT_PHONE_CALL } from '../services/api';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, options: { size?: string; color?: string; storage?: string }) => void;
  onBuyNow: (product: Product, options: { size?: string; color?: string; storage?: string }) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onBuyNow
}) => {
  if (!product) return null;

  const [selectedSize, setSelectedSize] = useState<string | undefined>(
    product.sizes ? product.sizes[0] : undefined
  );
  const [selectedColor, setSelectedColor] = useState<string | undefined>(
    product.colors ? product.colors[0] : undefined
  );
  const [selectedStorage, setSelectedStorage] = useState<string | undefined>(
    product.storage ? product.storage[0] : undefined
  );
  const [addedEffect, setAddedEffect] = useState(false);

  const handleAdd = () => {
    onAddToCart(product, {
      size: selectedSize,
      color: selectedColor,
      storage: selectedStorage
    });
    setAddedEffect(true);
    setTimeout(() => setAddedEffect(false), 1500);
  };

  const handleBuy = () => {
    onBuyNow(product, {
      size: selectedSize,
      color: selectedColor,
      storage: selectedStorage
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200 max-h-[92vh] flex flex-col md:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 hover:bg-white text-slate-700 hover:text-black shadow-sm transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Product Image */}
        <div className="md:w-1/2 bg-slate-100 relative min-h-[300px] md:min-h-[480px]">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
          {product.tag && (
            <div className="absolute top-4 left-4 bg-slate-950/90 backdrop-blur-md text-amber-300 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              {product.tag}
            </div>
          )}
        </div>

        {/* Product Details */}
        <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-between overflow-y-auto">
          <div className="space-y-4">
            <div>
              <div className="flex items-center gap-2 text-xs text-slate-500 uppercase tracking-wider font-semibold">
                <span>{product.category}</span>
                <span>•</span>
                <span className="text-emerald-700 font-bold">100% Authentic VERFIED</span>
              </div>
              <h2 className="text-xl md:text-2xl font-bold font-brand text-slate-950 mt-1">
                {product.name}
              </h2>
            </div>

            {/* Price & Rating */}
            <div className="flex items-center justify-between">
              <div className="flex items-baseline gap-2.5">
                <span className="text-2xl font-black text-slate-950 font-mono">
                  GH₵{product.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-slate-400 line-through font-mono">
                    GH₵{product.originalPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-1 text-xs text-slate-600 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span className="font-bold text-slate-900">{Number(product.rating || 5.0).toFixed(1)}</span>
                <span>({product.reviewsCount || 48} reviews)</span>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              {product.description}
            </p>

            {/* Options: Storage for iPhones */}
            {product.storage && (
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-800 uppercase tracking-wide">
                  Select Storage Capacity:
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.storage.map((st) => (
                    <button
                      key={st}
                      type="button"
                      onClick={() => setSelectedStorage(st)}
                      className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all ${
                        selectedStorage === st
                          ? 'bg-slate-950 text-white border-slate-950 shadow-sm'
                          : 'bg-white text-slate-700 border-slate-200 hover:border-slate-400'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Options: Sizes for Cloth */}
            {product.sizes && (
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-800 uppercase tracking-wide">
                  Select Garment Size:
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((sz) => (
                    <button
                      key={sz}
                      type="button"
                      onClick={() => setSelectedSize(sz)}
                      className={`min-w-10 px-2.5 py-1.5 text-xs font-semibold rounded-lg border transition-all ${
                        selectedSize === sz
                          ? 'bg-slate-950 text-white border-slate-950 shadow-sm'
                          : 'bg-white text-slate-700 border-slate-200 hover:border-slate-400'
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Options: Colors */}
            {product.colors && (
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-800 uppercase tracking-wide">
                  Select Finish / Color:
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((cl) => (
                    <button
                      key={cl}
                      type="button"
                      onClick={() => setSelectedColor(cl)}
                      className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all ${
                        selectedColor === cl
                          ? 'bg-slate-950 text-white border-slate-950 shadow-sm'
                          : 'bg-white text-slate-700 border-slate-200 hover:border-slate-400'
                      }`}
                    >
                      {cl}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Specs Bullet Points */}
            {product.specs && (
              <div className="pt-2 border-t border-slate-100">
                <div className="text-xs font-bold text-slate-700 mb-1.5">Key Specifications:</div>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-[11px] text-slate-500">
                  {product.specs.map((sp, idx) => (
                    <li key={idx} className="flex items-center gap-1.5">
                      <Check className="w-3 h-3 text-emerald-600 shrink-0" />
                      <span>{sp}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Action CTAs */}
          <div className="pt-5 border-t border-slate-100 space-y-3 mt-4">
            <div className="flex gap-2.5">
              <button
                onClick={handleAdd}
                className="flex-1 py-3 px-4 rounded-xl border-2 border-slate-950 bg-white hover:bg-slate-50 text-slate-950 font-bold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                {addedEffect ? 'Added to Bag!' : 'Add to Bag'}
              </button>
              <button
                onClick={handleBuy}
                className="flex-1 py-3 px-4 rounded-xl bg-slate-950 hover:bg-slate-900 text-white font-bold text-xs transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                Direct Buy Now
              </button>
            </div>

            {/* Support reminder */}
            <div className="text-center text-[11px] text-slate-500 flex items-center justify-center gap-1.5">
              <Phone className="w-3 h-3 text-amber-600" />
              <span>Questions or custom request? Call concierge:</span>
              <a href={SUPPORT_PHONE_CALL} className="font-bold text-slate-900 underline hover:text-amber-700">
                {SUPPORT_PHONE}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
