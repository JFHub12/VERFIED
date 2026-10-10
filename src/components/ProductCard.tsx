import React, { useState } from 'react';
import { Star, ShoppingBag, Eye, Check } from 'lucide-react';
import { Product } from '../data/products';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onQuickView: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onQuickView
}) => {
  const [justAdded, setJustAdded] = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1400);
  };

  return (
    <div 
      onClick={() => onQuickView(product)}
      className="group relative bg-white rounded-3xl overflow-hidden border border-slate-200/80 hover:border-slate-400 hover:shadow-2xl transition-all duration-500 flex flex-col cursor-pointer"
    >
      {/* Image Container */}
      <div className="relative aspect-4/5 overflow-hidden bg-slate-100">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          loading="lazy"
        />

        {/* Tag (if any) */}
        {product.tag && (
          <div className="absolute top-4 left-4 bg-slate-950/90 text-amber-300 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider backdrop-blur-md shadow-sm">
            {product.tag}
          </div>
        )}

        {/* Floating Quick Action Overlay */}
        <div className="absolute inset-x-4 bottom-4 flex gap-2.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            type="button"
            onClick={handleAdd}
            className="flex-1 py-3 px-4 bg-slate-950 hover:bg-black text-white text-xs font-bold rounded-2xl backdrop-blur-md shadow-xl flex items-center justify-center gap-2 transition-all transform hover:scale-[1.02] cursor-pointer"
            aria-label={`Add ${product.name} to cart`}
          >
            {justAdded ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Added to Bag</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-4 h-4 text-amber-400" />
                <span>Add to Bag</span>
              </>
            )}
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
            className="p-3 bg-white/95 hover:bg-white text-slate-800 rounded-2xl backdrop-blur-md shadow-xl transition-transform hover:scale-105 cursor-pointer"
            title="Quick View Details"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Card Info */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          {/* Metadata line */}
          <div className="flex items-center gap-2 text-[11px] text-slate-500 uppercase tracking-wider font-semibold mb-1.5">
            <span>{product.category}</span>
            <span aria-hidden="true" className="text-slate-300">·</span>
            <span className="flex items-center gap-1 text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md font-bold">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              {product.rating}
            </span>
          </div>

          <h3 className="font-bold text-sm sm:text-base text-slate-950 group-hover:text-amber-800 transition-colors line-clamp-2 leading-snug">
            {product.name}
          </h3>
          <p className="text-xs text-slate-500 line-clamp-2 mt-1.5 leading-relaxed font-normal">
            {product.description}
          </p>
        </div>

        {/* Pricing line */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-base sm:text-lg font-extrabold text-slate-950 font-mono tracking-tight">
              GH₵{product.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-slate-400 line-through font-medium font-mono">
                GH₵{product.originalPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            )}
          </div>
          <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">
            In Stock
          </span>
        </div>
      </div>
    </div>
  );
};
