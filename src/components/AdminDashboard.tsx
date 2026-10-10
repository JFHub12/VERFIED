import React, { useState, useRef } from 'react';
import { X, Save, Plus, Edit2, ShieldAlert, ChevronRight, Upload, ToggleLeft, ToggleRight, Trash2, Star, Sparkles, Coins } from 'lucide-react';
import { ApiService, PAYMENT_API_KEY } from '../services/api';

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  onProductUpdated: (result?: { success: boolean; message: string }) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ isOpen, onClose, onProductUpdated }) => {
  const [products, setProducts] = useState<any[]>([]);
  const [activeCategory, setActiveCategory] = useState<'all' | 'cloth' | 'diffuser' | 'accessories' | 'iphones'>('all');
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDeleteConfirm = async () => {
    if (!editingProduct?.id) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/products`, {
        method: 'DELETE',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${PAYMENT_API_KEY}`
        },
        body: JSON.stringify({ id: editingProduct.id })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        const itemName = editingProduct?.name || 'Product';
        setShowDeleteConfirm(false);
        setEditingProduct(null);
        await fetchProducts();
        onProductUpdated({ success: true, message: `${itemName} successfully deleted.` });
      } else {
        onProductUpdated({ success: false, message: data.error || 'Failed to delete product.' });
      }
    } catch (err: any) {
      onProductUpdated({ success: false, message: err.message || 'Network error while deleting product.' });
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    if (isOpen) fetchProducts();
  }, [isOpen]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/products');
      const data = await res.json();
      setProducts(data.products || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditingProduct({ ...editingProduct, image: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async (product: any) => {
    if (!product.name || !product.price || !product.category) {
      onProductUpdated({ success: false, message: 'Please fill in required product details (Name, Price in GH₵, Category).' });
      return;
    }
    setLoading(true);
    try {
      const method = product.id ? 'PUT' : 'POST';
      const payload = {
        ...product,
        price: parseFloat(product.price) || 0,
        rating: product.rating !== undefined ? parseFloat(product.rating) : 5.0,
        in_stock: product.in_stock ? 1 : 0
      };

      const res = await fetch('/api/products', {
        method,
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${PAYMENT_API_KEY}`
        },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setEditingProduct(null);
        setHoverRating(null);
        await fetchProducts();
        const actionType = product.id ? 'updated' : 'published';
        onProductUpdated({ 
          success: true, 
          message: `${product.name} successfully ${actionType} with ${payload.rating.toFixed(1)}★ rating at GH₵${payload.price.toLocaleString()}!` 
        });
      } else {
        onProductUpdated({ success: false, message: data.error || 'Failed to publish product. Please check details.' });
      }
    } catch (err: any) {
      onProductUpdated({ success: false, message: err.message || 'Network error while publishing product.' });
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = activeCategory === 'all' ? products : products.filter(p => p.category === activeCategory);

  const getRatingDescriptor = (score: number) => {
    if (score >= 4.95) return 'Flawless 5.0';
    if (score >= 4.8) return 'Exceptional';
    if (score >= 4.5) return 'Superior';
    if (score >= 4.0) return 'Very Good';
    if (score >= 3.0) return 'Standard';
    return 'Under Review';
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="bg-slate-950 text-white w-full max-w-6xl h-[88vh] rounded-3xl flex overflow-hidden border border-slate-800 shadow-2xl">
        {/* Sidebar */}
        <aside className="w-64 bg-slate-900 border-r border-slate-800 p-6 flex flex-col justify-between">
          <div>
            <h2 className="text-lg font-bold mb-3 flex items-center gap-2 text-slate-200">
              <ShieldAlert size={20} className="text-amber-400" /> Admin Console
            </h2>

            {/* Currency Status Indicator */}
            <div className="mb-6 p-3 bg-slate-950/80 border border-slate-800 rounded-2xl space-y-1">
              <div className="flex items-center justify-between text-[11px] text-slate-400">
                <span className="flex items-center gap-1.5 font-semibold">
                  <Coins size={13} className="text-amber-400" /> Store Currency
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              </div>
              <div className="text-sm font-extrabold text-white font-mono flex items-center gap-1.5">
                <span className="text-amber-300">GH₵</span>
                <span>(Ghana Cedi - GHS)</span>
              </div>
              <div className="text-[10px] text-slate-400">
                Live across catalog & receipts
              </div>
            </div>

            <nav className="space-y-1">
              {['all', 'cloth', 'diffuser', 'accessories', 'iphones'].map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat as any)}
                  className={`w-full text-left px-4 py-3 rounded-xl text-xs font-bold capitalize flex items-center justify-between transition-all ${
                    activeCategory === cat ? 'bg-gradient-to-r from-slate-200 via-slate-100 to-slate-300 text-slate-950 shadow-sm' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <span>{cat === 'all' ? 'All Collections' : cat}</span>
                  {activeCategory === cat && <ChevronRight size={14} className="text-slate-900" />}
                </button>
              ))}
            </nav>
          </div>

          <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
            <span className="text-[11px] text-slate-500 font-mono">VERFIED v2.6</span>
            <button onClick={onClose} className="text-slate-400 hover:text-white text-xs font-bold transition-colors cursor-pointer">
              Close Console
            </button>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 p-8 overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-slate-950/40 [&::-webkit-scrollbar-thumb]:bg-slate-800 [&::-webkit-scrollbar-thumb]:rounded-full">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-2xl font-bold capitalize flex items-center gap-2">
                <span>{activeCategory === 'all' ? 'Complete Catalog' : `${activeCategory} Products`}</span>
                <span className="text-xs font-normal text-slate-400 bg-slate-900 px-2.5 py-1 rounded-full border border-slate-800">
                  {filteredProducts.length} items
                </span>
              </h1>
              <p className="text-xs text-slate-400 mt-1">
                Manage inventory, configure prices in Ghanaian Cedis (GH₵), and assign dynamic star ratings.
              </p>
            </div>

            <button 
              onClick={() => setEditingProduct({ 
                name: '', 
                price: '', 
                category: activeCategory === 'all' ? 'cloth' : activeCategory, 
                image: '', 
                description: '', 
                rating: 5.0, 
                in_stock: 1 
              })}
              className="bg-gradient-to-r from-slate-200 via-slate-100 to-slate-300 text-slate-950 px-5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 hover:from-slate-100 hover:to-white transition-all shadow-md cursor-pointer"
            >
              <Plus size={16} /> Add New Item
            </button>
          </div>

          {/* Product Creation / Edit Form */}
          {editingProduct && (
            <div className="bg-slate-900/90 p-6 rounded-3xl mb-8 border border-slate-800 shadow-xl backdrop-blur-md animate-in fade-in zoom-in-95 duration-200">
              <div className="flex items-center justify-between mb-5 pb-3 border-b border-slate-800">
                <h3 className="font-bold text-sm text-white flex items-center gap-2">
                  <Sparkles size={16} className="text-amber-400" />
                  <span>{editingProduct.id ? `Edit Item #${editingProduct.id}` : 'Publish New Luxury Item'}</span>
                </h3>
                <span className="text-[11px] font-mono text-amber-300 bg-amber-500/10 border border-amber-500/20 px-2.5 py-0.5 rounded-full">
                  Currency: GH₵ (GHS)
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                    Product Title *
                  </label>
                  <input 
                    className="w-full bg-slate-800 p-3 rounded-xl text-xs border border-slate-700 text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-400" 
                    placeholder="e.g. VERFIED Signature Oversized Hoodie" 
                    value={editingProduct.name} 
                    onChange={e => setEditingProduct({ ...editingProduct, name: e.target.value })} 
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                    Price in Ghana Cedi (GH₵) *
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-3 text-xs font-bold text-amber-400 font-mono pointer-events-none">
                      GH₵
                    </span>
                    <input 
                      className="w-full bg-slate-800 pl-12 pr-3 py-3 rounded-xl text-xs border border-slate-700 text-white font-mono font-bold placeholder:text-slate-500 focus:outline-none focus:border-amber-400" 
                      placeholder="e.g. 1400.00" 
                      type="number" 
                      step="any"
                      value={editingProduct.price} 
                      onChange={e => setEditingProduct({ ...editingProduct, price: e.target.value })} 
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                    Department / Category *
                  </label>
                  <select 
                    className="w-full bg-slate-800 p-3 rounded-xl text-xs border border-slate-700 text-white focus:outline-none focus:border-amber-400 capitalize" 
                    value={editingProduct.category} 
                    onChange={e => setEditingProduct({ ...editingProduct, category: e.target.value })}
                  >
                    <option value="cloth">Cloth & Apparel</option>
                    <option value="diffuser">Diffusers & Scents</option>
                    <option value="accessories">Curated Accessories</option>
                    <option value="iphones">Apple iPhones & Tech</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                    Stock Availability
                  </label>
                  <button 
                    type="button"
                    onClick={() => setEditingProduct({ ...editingProduct, in_stock: editingProduct.in_stock ? 0 : 1 })} 
                    className={`w-full flex items-center justify-between text-xs p-3 rounded-xl border transition-colors cursor-pointer ${
                      editingProduct.in_stock 
                        ? 'bg-emerald-950/70 border-emerald-700/80 text-emerald-300' 
                        : 'bg-rose-950/70 border-rose-700/80 text-rose-300'
                    }`}
                  >
                    <span className="font-bold flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${editingProduct.in_stock ? 'bg-emerald-400' : 'bg-rose-400'}`} />
                      {editingProduct.in_stock ? 'In Stock (Ready to Dispatch)' : 'Out of Stock (Catalog Disabled)'}
                    </span>
                    {editingProduct.in_stock ? <ToggleRight size={22} className="text-emerald-400" /> : <ToggleLeft size={22} className="text-rose-400" />}
                  </button>
                </div>

                {/* DYNAMIC STAR RATING METER */}
                <div className="col-span-1 sm:col-span-2 bg-slate-950/90 border border-slate-800 rounded-2xl p-4.5 space-y-3 shadow-inner">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <label className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                      <Star size={15} className="fill-amber-400 text-amber-400" />
                      <span>Product Star Rating Meter</span>
                    </label>

                    <div className="flex items-center gap-2">
                      <span className="text-amber-400 font-extrabold text-sm font-mono tracking-tight bg-amber-500/10 px-2.5 py-0.5 rounded-lg border border-amber-500/20 flex items-center gap-1">
                        <Star size={12} className="fill-amber-400 text-amber-400" />
                        <span>{(hoverRating !== null ? hoverRating : (editingProduct.rating ?? 5.0)).toFixed(1)} / 5.0</span>
                      </span>
                      <span className="text-[10px] text-slate-300 bg-slate-800 px-2.5 py-1 rounded-full border border-slate-700 font-semibold uppercase tracking-wider">
                        {getRatingDescriptor(hoverRating !== null ? hoverRating : (editingProduct.rating ?? 5.0))}
                      </span>
                    </div>
                  </div>

                  <p className="text-[11px] text-slate-400">
                    Set the exact star score for this item. This seamlessly updates product cards, quick views, and sorting.
                  </p>

                  <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                    {/* Interactive 5-Star Click & Hover Meter */}
                    <div 
                      className="flex items-center gap-2 bg-slate-900/90 px-4 py-2.5 rounded-xl border border-slate-800" 
                      onMouseLeave={() => setHoverRating(null)}
                    >
                      {[1, 2, 3, 4, 5].map((starNum) => {
                        const currentScore = hoverRating !== null ? hoverRating : (editingProduct.rating ?? 5.0);
                        const isFilled = currentScore >= starNum;
                        const isPartial = !isFilled && currentScore >= starNum - 0.5;

                        return (
                          <button
                            key={starNum}
                            type="button"
                            onMouseEnter={() => setHoverRating(starNum)}
                            onClick={() => {
                              setEditingProduct({ ...editingProduct, rating: starNum });
                              setHoverRating(null);
                            }}
                            className="p-1 transition-transform hover:scale-125 cursor-pointer focus:outline-none"
                            title={`Assign ${starNum} Stars`}
                          >
                            <Star
                              size={24}
                              className={`transition-colors ${
                                isFilled
                                  ? 'fill-amber-400 text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.6)]'
                                  : isPartial
                                  ? 'fill-amber-400/50 text-amber-400'
                                  : 'text-slate-600 hover:text-amber-300'
                              }`}
                            />
                          </button>
                        );
                      })}
                    </div>

                    {/* Quick Preset Buttons & Exact Decimal Input */}
                    <div className="flex flex-wrap items-center gap-2">
                      <div className="flex items-center gap-1 bg-slate-900/80 p-1 rounded-xl border border-slate-800">
                        {[4.5, 4.7, 4.8, 4.9, 5.0].map((score) => (
                          <button
                            key={score}
                            type="button"
                            onClick={() => {
                              setEditingProduct({ ...editingProduct, rating: score });
                              setHoverRating(null);
                            }}
                            className={`px-2 py-1 text-[11px] rounded-lg font-bold transition-all cursor-pointer ${
                              Number(editingProduct.rating) === score
                                ? 'bg-amber-400 text-slate-950 shadow-sm'
                                : 'text-slate-400 hover:text-white hover:bg-slate-800'
                            }`}
                          >
                            {score.toFixed(1)}★
                          </button>
                        ))}
                      </div>

                      <div className="flex items-center gap-1.5 pl-2 border-l border-slate-800">
                        <span className="text-[11px] text-slate-400 font-semibold">Exact:</span>
                        <input
                          type="number"
                          min="1.0"
                          max="5.0"
                          step="0.1"
                          value={editingProduct.rating !== undefined ? editingProduct.rating : 5.0}
                          onChange={(e) => {
                            const val = Math.min(5.0, Math.max(1.0, parseFloat(e.target.value) || 1.0));
                            setEditingProduct({ ...editingProduct, rating: val });
                          }}
                          className="w-16 bg-slate-900 px-2.5 py-1.5 rounded-lg text-xs font-mono font-bold text-amber-300 border border-slate-700 text-center focus:border-amber-400 focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Image Upload Area */}
                <div 
                  onClick={() => fileInputRef.current?.click()} 
                  className="col-span-1 sm:col-span-2 border-2 border-dashed border-slate-700 rounded-2xl p-6 text-center cursor-pointer hover:border-amber-400 transition-colors bg-slate-950/40"
                >
                  <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileChange} />
                  {editingProduct.image ? (
                    <div className="space-y-2">
                      <img src={editingProduct.image} alt="Preview" className="h-32 mx-auto rounded-xl object-cover shadow-md" />
                      <span className="text-[11px] text-slate-400 block">Click to change picture</span>
                    </div>
                  ) : (
                    <div className="text-slate-400 space-y-1">
                      <Upload className="mx-auto mb-2 text-slate-500" size={24} />
                      <div className="text-xs font-bold text-slate-300">Click to upload product image</div>
                      <div className="text-[11px] text-slate-500">Supports JPG, PNG, WebP</div>
                    </div>
                  )}
                </div>

                {/* Description */}
                <div className="col-span-1 sm:col-span-2">
                  <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                    Product Description
                  </label>
                  <textarea 
                    rows={3}
                    className="w-full bg-slate-800 p-3 rounded-xl text-xs border border-slate-700 text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-400 leading-relaxed" 
                    placeholder="Provide bespoke luxury product craftsmanship details, materials, and origin..." 
                    value={editingProduct.description} 
                    onChange={e => setEditingProduct({ ...editingProduct, description: e.target.value })} 
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between mt-6 pt-4 border-t border-slate-800">
                <div className="flex gap-3">
                  <button 
                    onClick={() => handleSave(editingProduct)} 
                    disabled={loading}
                    className="bg-emerald-600 text-white px-6 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 hover:bg-emerald-500 transition-colors shadow-sm cursor-pointer disabled:opacity-50"
                  >
                    <Save size={14} /> {editingProduct.id ? 'Save Updates' : 'Publish to Catalog'}
                  </button>
                  <button 
                    onClick={() => { setEditingProduct(null); setHoverRating(null); }} 
                    className="bg-slate-800 text-slate-300 hover:text-white px-6 py-2.5 rounded-xl text-xs font-bold hover:bg-slate-700 transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
                {editingProduct.id && (
                  <button 
                    onClick={() => setShowDeleteConfirm(true)}
                    className="px-4 py-2.5 bg-rose-950/80 hover:bg-rose-900 text-rose-300 rounded-xl text-xs font-bold flex items-center gap-2 border border-rose-800/60 transition-colors cursor-pointer"
                  >
                    <Trash2 size={14} /> Delete Product
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Delete Confirmation Modal */}
          {showDeleteConfirm && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xs p-4">
              <div className="bg-slate-900 border border-slate-700 p-6 rounded-3xl max-w-sm w-full text-center space-y-4 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
                <div className="w-12 h-12 bg-rose-950 text-rose-400 rounded-full flex items-center justify-center mx-auto border border-rose-800/50">
                  <Trash2 size={24} />
                </div>
                <h3 className="text-base font-bold text-white">Permanently Delete Product?</h3>
                <p className="text-xs text-slate-400">
                  This will remove "{editingProduct?.name}" from the live catalogue and backend database.
                </p>
                <div className="flex gap-3 pt-2">
                  <button
                    onClick={handleDeleteConfirm}
                    disabled={loading}
                    className="flex-1 bg-rose-600 hover:bg-rose-500 text-white font-bold py-2.5 rounded-xl text-xs transition-colors cursor-pointer"
                  >
                    Yes, Delete
                  </button>
                  <button
                    onClick={() => setShowDeleteConfirm(false)}
                    disabled={loading}
                    className="flex-1 bg-slate-800 hover:bg-slate-700 text-white font-bold py-2.5 rounded-xl text-xs transition-colors cursor-pointer"
                  >
                    Keep Item
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Product Items Table / Cards */}
          <div className="grid grid-cols-1 gap-3">
            {filteredProducts.map(p => (
              <div 
                key={p.id} 
                className="bg-slate-900/90 p-4 rounded-2xl flex justify-between items-center border border-slate-800 hover:border-slate-700 transition-colors shadow-sm"
              >
                <div className="flex items-center gap-4 min-w-0">
                  <img 
                    src={p.image || 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=400&q=80'} 
                    alt={p.name} 
                    className="w-14 h-14 rounded-xl object-cover border border-slate-800 bg-slate-950 shrink-0" 
                  />
                  <div className="min-w-0">
                    <div className="text-sm font-bold text-white truncate">{p.name}</div>
                    <div className="text-[11px] text-slate-400 flex items-center gap-2 flex-wrap mt-1">
                      <span className="capitalize font-semibold text-slate-300">{p.category}</span>
                      <span className="text-slate-600">•</span>
                      <span className="text-emerald-400 font-extrabold font-mono text-xs">
                        GH₵{Number(p.price).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </span>
                      <span className="text-slate-600">•</span>
                      <span className="inline-flex items-center gap-1 text-amber-300 font-bold bg-amber-500/15 border border-amber-500/25 px-2 py-0.5 rounded-md text-[10px]">
                        <Star size={11} className="fill-amber-400 text-amber-400" />
                        <span>{Number(p.rating !== undefined ? p.rating : 5.0).toFixed(1)}</span>
                      </span>
                      <span className="text-slate-600">•</span>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                        p.in_stock !== 0 ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/25' : 'bg-rose-500/15 text-rose-300 border border-rose-500/25'
                      }`}>
                        {p.in_stock !== 0 ? 'In Stock' : 'Out of Stock'}
                      </span>
                    </div>
                  </div>
                </div>
                <button 
                  onClick={() => setEditingProduct({ ...p, rating: p.rating !== undefined ? Number(p.rating) : 5.0 })} 
                  className="p-2.5 bg-slate-800 hover:bg-slate-700 rounded-xl text-slate-300 hover:text-white transition-colors cursor-pointer shrink-0 ml-4"
                  title="Edit product"
                >
                  <Edit2 size={16} />
                </button>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};
