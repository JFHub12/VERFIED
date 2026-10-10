import React, { useState, useEffect, useMemo } from 'react';
import { Header } from './components/Header';
import { WelcomePage } from './components/WelcomePage';
import { AboutPage } from './components/AboutPage';
import { ProductCard } from './components/ProductCard';
import { ProductModal } from './components/ProductModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { AuthModal } from './components/AuthModal';
import { SupportModal } from './components/SupportModal';
import { ShareDeviceModal } from './components/ShareDeviceModal';
import { AdminDashboard } from './components/AdminDashboard';
import { Footer } from './components/Footer';
import { OfflineIndicator } from './components/OfflineIndicator';
import { PRODUCTS, CATEGORIES, Product } from './data/products';
import { CartAnimate } from './components/CartAnimate';
import { 
  ApiService, 
  User, 
  OrderItem, 
  SUPPORT_PHONE, 
  SUPPORT_PHONE_CALL, 
  SUPPORT_WHATSAPP 
} from './services/api';
import { 
  Phone, 
  MessageSquare, 
  HelpCircle, 
  SlidersHorizontal, 
  Sparkles, 
  ArrowUpRight,
  Lock,
  UserPlus,
  ShoppingBag,
  Smartphone,
  QrCode
} from 'lucide-react';

export default function App() {
  // Page routing: 'welcome' (Page 1) | 'about' (Page 2) | 'shop' (Page 3 / Catalog)
  const [activePage, setActivePage] = useState<'welcome' | 'about' | 'shop'>('welcome');
  
  // Category & filtering state
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'cloth' | 'diffuser' | 'accessories' | 'iphones'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');

  // Modals & Drawers state
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authInitialTab, setAuthInitialTab] = useState<'login' | 'register' | 'profile'>('register');
  const [authRequiredReason, setAuthRequiredReason] = useState<string | null>(null);
  const [pendingAction, setPendingAction] = useState<(() => void) | null>(null);

  const [isSupportOpen, setIsSupportOpen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isAdminEnabled, setIsAdminEnabled] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.shiftKey && e.key.toLowerCase() === 'd') {
        e.preventDefault();
        setIsAdminEnabled(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Handle SEO Sitelinks, search query, category filters, and product deep links
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const cat = params.get('category');
      const q = params.get('q');
      const prodId = params.get('product');
      const action = params.get('action');

      if (cat && ['cloth', 'diffuser', 'accessories', 'iphones'].includes(cat)) {
        setActivePage('shop');
        setSelectedCategory(cat as any);
      }

      if (q) {
        setActivePage('shop');
        setSearchQuery(q);
      }

      if (prodId) {
        const found = PRODUCTS.find(p => p.id === prodId);
        if (found) {
          setActivePage('shop');
          setSelectedCategory(found.category);
          setSelectedProduct(found);
        }
      }

      if (action === 'concierge' || action === 'support') {
        setIsSupportOpen(true);
      } else if (action === 'auth') {
        setIsAuthOpen(true);
        setAuthInitialTab('login');
      } else if (action === 'orders') {
        setIsAuthOpen(true);
        setAuthInitialTab('profile');
      }
    } catch (e) {
      console.warn('[SEO] Deep link routing note:', e);
    }
  }, []);

  // Cart & User state
  const [cartItems, setCartItems] = useState<OrderItem[]>(() => {
    try {
      const saved = localStorage.getItem('verified_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    return ApiService.getCurrentUser();
  });

  // Subscribe to real-time Firebase Auth state
  useEffect(() => {
    const unsubscribe = ApiService.subscribeToAuth((user) => {
      setCurrentUser(user);
    });
    return () => unsubscribe();
  }, []);

  // Save cart to local storage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('verified_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.error('Failed to save cart:', e);
    }
  }, [cartItems]);

  // Page navigation helper
  const handleNavigate = (
    page: 'welcome' | 'about' | 'shop',
    category?: 'all' | 'cloth' | 'diffuser' | 'accessories' | 'iphones'
  ) => {
    setActivePage(page);
    if (category) {
      setSelectedCategory(category);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Cart operations
  const handleAddToCartInternal = (product: Product, options?: { size?: string; color?: string; storage?: string }) => {
    setCartItems(prev => {
      const itemKey = `${product.id}-${options?.size || ''}-${options?.color || ''}-${options?.storage || ''}`;
      const existing = prev.find(item => item.id === itemKey);

      if (existing) {
        return prev.map(item => 
          item.id === itemKey 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      } else {
        const newItem: OrderItem = {
          id: itemKey,
          name: product.name,
          price: product.price,
          quantity: 1,
          category: product.category,
          image: product.image,
          selectedSize: options?.size,
          selectedColor: options?.color,
          selectedStorage: options?.storage
        };
        return [...prev, newItem];
      }
    });
  };

  // Gated purchasing: A user MUST register and sign in before buying any item!
  const handleAttemptAddToCart = (
    product: Product,
    options?: { size?: string; color?: string; storage?: string },
    isBuyNow: boolean = false
  ) => {
    if (!currentUser) {
      // Gatekeeper triggered: Must register / sign in first!
      setAuthInitialTab('register');
      setAuthRequiredReason(
        `Before you can buy "${product.name}", you must register and sign in first as a verified member.`
      );
      setPendingAction(() => () => {
        handleAddToCartInternal(product, options);
        if (isBuyNow) {
          setIsCheckoutOpen(true);
        } else {
          setIsCartOpen(true);
        }
      });
      setIsAuthOpen(true);
      return;
    }

    // User is logged in, add item to cart
    handleAddToCartInternal(product, options);
    if (isBuyNow) {
      setIsCheckoutOpen(true);
    }
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems(prev => 
      prev
        .map(item => item.id === id ? { ...item, quantity: item.quantity + delta } : item)
        .filter(item => item.quantity > 0)
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const openAuthWithTab = (tab: 'login' | 'register' | 'profile' = 'register', reason: string | null = null) => {
    setAuthInitialTab(tab);
    setAuthRequiredReason(reason);
    setIsAuthOpen(true);
  };

  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [notification, setNotification] = useState<{ show: boolean; success: boolean; message: string } | null>(null);

  const showBannerNotification = (success: boolean, message: string) => {
    setNotification({ show: true, success, message });
    setTimeout(() => {
      setNotification(prev => prev ? { ...prev, show: false } : null);
    }, 4000);
  };

  const fetchProducts = () => {
    setIsLoading(true);
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        if (data.products && Array.isArray(data.products) && data.products.length > 0) {
          setProducts(data.products);
        } else {
          setProducts(PRODUCTS);
        }
        setIsLoading(false);
      })
      .catch(err => {
        console.warn('[Products] Fetch failed, using local verified catalog:', err);
        setProducts(PRODUCTS);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Filter & sort products for shop page
  const filteredProducts = useMemo(() => {
    let list = products;

    if (selectedCategory !== 'all') {
      list = list.filter(p => p.category === selectedCategory);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(p => 
        p.name.toLowerCase().includes(q) || 
        p.description.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        (p.specs && p.specs.some(s => s.toLowerCase().includes(q)))
      );
    }

    switch (sortBy) {
      case 'price-asc':
        return [...list].sort((a, b) => a.price - b.price);
      case 'price-desc':
        return [...list].sort((a, b) => b.price - a.price);
      case 'rating':
        return [...list].sort((a, b) => b.rating - a.rating);
      case 'featured':
      default:
        return [...list].sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }
  }, [selectedCategory, searchQuery, sortBy]);

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-amber-300 selection:text-slate-950 font-sans">
      {/* Top Header */}
      <Header
        currentUser={currentUser}
        onOpenAuth={(tab) => openAuthWithTab(tab)}
        onOpenSupport={() => setIsSupportOpen(true)}
        activePage={activePage}
        onNavigate={handleNavigate}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* PAGE 1: Welcoming Message Page */}
      {activePage === 'welcome' && (
        <WelcomePage
          onNavigateToAbout={() => handleNavigate('about')}
          onNavigateToShop={(cat) => handleNavigate('shop', cat)}
          onOpenAuth={(tab) => openAuthWithTab(tab)}
          onOpenSupport={() => setIsSupportOpen(true)}
          onOpenShare={() => setIsShareOpen(true)}
          currentUser={currentUser}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
      )}

      {/* PAGE 2: What the Website is About */}
      {activePage === 'about' && (
        <AboutPage
          onNavigateToShop={(cat) => handleNavigate('shop', cat)}
          onNavigateToWelcome={() => handleNavigate('welcome')}
          onOpenAuth={(tab) => openAuthWithTab(tab)}
          onOpenSupport={() => setIsSupportOpen(true)}
          currentUser={currentUser}
        />
      )}

      {/* PAGE 3: The Complete Shopping Store */}
      {activePage === 'shop' && (
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-in fade-in duration-300">
          {/* Member Registration Requirement Banner if unauthenticated */}
          {!currentUser && (
            <div className="mb-6 p-4 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex flex-col sm:flex-row items-center justify-between gap-3 text-amber-950">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-bold shrink-0">
                  <Lock className="w-5 h-5" />
                </div>
                <div>
                  <strong className="block text-sm font-bold text-amber-900">
                    Registration & Sign In Required Before Buying
                  </strong>
                  <span className="text-xs text-amber-900/90">
                    Before adding items or checking out, first-time shoppers must create an account.
                  </span>
                </div>
              </div>

              <button
                onClick={() => openAuthWithTab('register', 'Please create your free account to unlock shopping & checkout.')}
                className="px-4 py-2 bg-slate-950 hover:bg-slate-900 text-white font-bold text-xs rounded-xl transition-colors shrink-0 flex items-center gap-1.5 cursor-pointer"
              >
                <UserPlus className="w-4 h-4 text-amber-400" />
                <span>Register / Sign In First</span>
              </button>
            </div>
          )}

          {/* Category Header & Filter Bar */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-slate-200">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-700">
                <Sparkles className="w-3.5 h-3.5" />
                <span>
                  {selectedCategory === 'all'
                    ? 'All 4 Curated Departments'
                    : CATEGORIES.find(c => c.id === selectedCategory)?.badge}
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold font-brand tracking-tight text-slate-950 mt-1">
                {selectedCategory === 'all'
                  ? 'Complete VERFIED Collection'
                  : CATEGORIES.find(c => c.id === selectedCategory)?.name}
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">
                {selectedCategory === 'all'
                  ? 'Browse across our luxury clothing line, ambient ultrasonic diffusers, crafted accessories, and official Apple iPhones.'
                  : CATEGORIES.find(c => c.id === selectedCategory)?.description}
              </p>
            </div>

            {/* Filter Pills & Sorting */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Category Segmented Tabs */}
              <div className="flex items-center gap-1 p-1 bg-slate-200/70 rounded-xl overflow-x-auto max-w-full">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                    selectedCategory === 'all'
                      ? 'bg-white text-slate-950 shadow-xs font-bold'
                      : 'text-slate-600 hover:text-slate-950'
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setSelectedCategory('cloth')}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                    selectedCategory === 'cloth'
                      ? 'bg-white text-slate-950 shadow-xs font-bold'
                      : 'text-slate-600 hover:text-slate-950'
                  }`}
                >
                  1. Cloth
                </button>
                <button
                  onClick={() => setSelectedCategory('diffuser')}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                    selectedCategory === 'diffuser'
                      ? 'bg-white text-slate-950 shadow-xs font-bold'
                      : 'text-slate-600 hover:text-slate-950'
                  }`}
                >
                  2. Diffusers
                </button>
                <button
                  onClick={() => setSelectedCategory('accessories')}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                    selectedCategory === 'accessories'
                      ? 'bg-white text-slate-950 shadow-xs font-bold'
                      : 'text-slate-600 hover:text-slate-950'
                  }`}
                >
                  3. Accessories
                </button>
                <button
                  onClick={() => setSelectedCategory('iphones')}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                    selectedCategory === 'iphones'
                      ? 'bg-white text-slate-950 shadow-xs font-bold'
                      : 'text-slate-600 hover:text-slate-950'
                  }`}
                >
                  4. iPhones
                </button>
              </div>

              {/* Sort Dropdown */}
              <div className="flex items-center gap-1.5 bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-medium text-slate-700 shadow-2xs">
                <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-transparent focus:outline-none cursor-pointer"
                >
                  <option value="featured">Featured First</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating">Top Customer Rated</option>
                </select>
              </div>
            </div>
          </div>

          {/* Support Helpline Bar */}
          <div className="my-6 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-amber-950">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-amber-400 text-slate-950 flex items-center justify-center font-bold shrink-0">
                <Phone className="w-4 h-4" />
              </div>
              <div>
                <span className="font-bold">Need sizing advice, aroma recommendations, or iPhone specifications?</span>
                <p className="text-slate-600 text-[11px]">
                  Call or WhatsApp our concierge team anytime at <strong className="text-slate-950">{SUPPORT_PHONE}</strong>.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <a
                href={SUPPORT_PHONE_CALL}
                className="px-3.5 py-1.5 bg-slate-950 hover:bg-slate-800 text-white rounded-lg font-bold text-xs transition-colors flex items-center gap-1.5"
              >
                <Phone className="w-3 h-3 text-amber-300" /> Dial {SUPPORT_PHONE}
              </a>
              <a
                href={SUPPORT_WHATSAPP}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-1.5 bg-[#25D366] hover:opacity-90 text-white rounded-lg font-bold text-xs transition-opacity flex items-center gap-1.5"
              >
                <MessageSquare className="w-3 h-3" /> WhatsApp
              </a>
            </div>
          </div>

          {/* Product Grid / Loading State / Empty Category State */}
          {isLoading ? (
            <div className="py-16">
              <CartAnimate size="lg" text="Loading VERFIED collections..." />
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 shadow-sm">
              <CartAnimate size="md" text="No products found in this category or search" />
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setSearchQuery('');
                }}
                className="mt-4 px-5 py-2.5 bg-slate-950 text-white text-xs font-bold rounded-xl hover:bg-slate-900 transition-colors cursor-pointer shadow-md"
              >
                Reset Filters & View All
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={(prod) => handleAttemptAddToCart(prod, undefined, false)}
                  onQuickView={(prod) => setSelectedProduct(prod)}
                />
              ))}
            </div>
          )}

          {/* Category Sections when viewing 'all' */}
          {selectedCategory === 'all' && !searchQuery && (
            <div className="mt-16 space-y-16">
              {CATEGORIES.map((category) => {
                const catProducts = PRODUCTS.filter(p => p.category === category.id).slice(0, 4);
                return (
                  <section key={category.id} className="pt-6 border-t border-slate-200">
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <div className="text-xs font-bold text-amber-700 uppercase tracking-wider">
                          {category.badge}
                        </div>
                        <h3 className="text-xl sm:text-2xl font-bold font-brand text-slate-950 mt-0.5">
                          {category.name}
                        </h3>
                        <p className="text-xs text-slate-500 mt-0.5">
                          {category.subtitle}
                        </p>
                      </div>

                      <button
                        onClick={() => {
                          setSelectedCategory(category.id as any);
                          window.scrollTo({ top: 100, behavior: 'smooth' });
                        }}
                        className="inline-flex items-center gap-1 text-xs font-bold text-slate-900 hover:text-amber-700 group cursor-pointer"
                      >
                        <span>Explore all {category.name}</span>
                        <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                      {catProducts.map((product) => (
                        <ProductCard
                          key={product.id}
                          product={product}
                          onAddToCart={(prod) => handleAttemptAddToCart(prod, undefined, false)}
                          onQuickView={(prod) => setSelectedProduct(prod)}
                        />
                      ))}
                    </div>
                  </section>
                );
              })}
            </div>
          )}
        </main>
      )}



      {/* Product Quick View & Detail Modal */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={(prod, opts) => handleAttemptAddToCart(prod, opts, false)}
        onBuyNow={(prod, opts) => handleAttemptAddToCart(prod, opts, true)}
      />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        currentUser={currentUser}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onProceedToCheckout={() => setIsCheckoutOpen(true)}
        onRequireAuth={() => openAuthWithTab('register', 'Registration is required before checking out.')}
        onOpenSupport={() => setIsSupportOpen(true)}
      />

      {/* Checkout & Payment Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cartItems}
        currentUser={currentUser}
        onClearCart={handleClearCart}
        onOpenAuth={() => openAuthWithTab('register', 'Registration is required to complete your order.')}
        onOpenSupport={() => setIsSupportOpen(true)}
      />

      {/* Authentication & Profile Modal with Purchase Gating */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => {
          setIsAuthOpen(false);
          setAuthRequiredReason(null);
          setPendingAction(null);
        }}
        currentUser={currentUser}
        onUserChange={setCurrentUser}
        initialTab={authInitialTab}
        requiredReason={authRequiredReason}
        onSuccessAction={() => {
          if (pendingAction) {
            pendingAction();
            setPendingAction(null);
          }
          setAuthRequiredReason(null);
        }}
      />

      {/* Customer Support Modal */}
      <SupportModal
        isOpen={isSupportOpen}
        onClose={() => setIsSupportOpen(false)}
      />

      {/* Multi-Device Run & QR Modal */}
      <ShareDeviceModal
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
      />
      
      {/* Sleek Success / Fail Banner Notification from Above */}
      {notification?.show && (
        <div className="fixed top-0 left-0 right-0 z-50 flex justify-center p-4 pointer-events-none transition-all duration-300 transform translate-y-0">
          <div className={`pointer-events-auto max-w-md w-full px-5 py-3.5 rounded-2xl shadow-2xl flex items-center justify-between text-xs font-semibold backdrop-blur-md border ${
            notification.success 
              ? 'bg-emerald-950/95 text-emerald-200 border-emerald-500/50 shadow-emerald-900/30' 
              : 'bg-rose-950/95 text-rose-200 border-rose-500/50 shadow-rose-900/30'
          }`}>
            <div className="flex items-center gap-3">
              <span className={`w-2.5 h-2.5 rounded-full ${notification.success ? 'bg-emerald-400 animate-pulse' : 'bg-rose-400 animate-pulse'}`} />
              <span>{notification.message}</span>
            </div>
            <button 
              onClick={() => setNotification(prev => prev ? { ...prev, show: false } : null)}
              className="text-slate-400 hover:text-white p-1"
            >
              ✕
            </button>
          </div>
        </div>
      )}
      
      {/* Admin Dashboard */}
      <AdminDashboard
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        onProductUpdated={(result) => {
          fetchProducts();
          if (result) {
            showBannerNotification(result.success, result.message);
          } else {
            showBannerNotification(true, 'Product successfully published and live on public catalog!');
          }
        }}
      />

      {/* Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenSupport={() => setIsSupportOpen(true)}
        onOpenAuth={() => openAuthWithTab(currentUser ? 'profile' : 'register')}
      />

      {/* Offline Connectivity Status Toast */}
      <OfflineIndicator />

      {/* Admin Button trigger */}
      {isAdminEnabled && (
        <button 
          onClick={() => setIsAdminOpen(true)}
          className="fixed bottom-20 left-6 z-50 bg-gradient-to-r from-slate-200 via-slate-100 to-slate-300 text-slate-950 font-bold text-xs px-4 py-3 rounded-2xl shadow-2xl border border-slate-300 hover:from-slate-100 hover:to-slate-200 transition-all cursor-pointer"
        >
          Admin Console
        </button>
      )}
    </div>
  );
}
