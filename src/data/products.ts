export interface Product {
  id: string;
  name: string;
  category: 'cloth' | 'diffuser' | 'accessories' | 'iphones';
  price: number;
  originalPrice?: number;
  description: string;
  image: string;
  rating: number;
  reviewsCount: number;
  inStock: boolean;
  featured?: boolean;
  tag?: string;
  sizes?: string[];
  colors?: string[];
  storage?: string[];
  specs?: string[];
}

export const CURRENCY_SYMBOL = 'GH₵';
export const CURRENCY_CODE = 'GHS';

export const formatCurrency = (amount: number): string => {
  return `${CURRENCY_SYMBOL}${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};

export const CATEGORIES = [
  {
    id: 'cloth',
    name: 'Cloth & Apparel',
    subtitle: 'Luxury Streetwear & Tailored Silhouettes',
    description: 'Curated premium garments crafted from heavyweight French terry, Italian silk, and refined organic cotton.',
    badge: 'Category 01'
  },
  {
    id: 'diffuser',
    name: 'Diffusers & Scents',
    subtitle: 'Ultrasonic & Ambient Aromatherapy',
    description: 'Sculptural stone and ceramic aroma diffusers engineered for therapeutic botanical dispersion and tranquil living.',
    badge: 'Category 02'
  },
  {
    id: 'accessories',
    name: 'Curated Accessories',
    subtitle: 'Chrono Timepieces & Artisan Leather',
    description: 'Statement jewelry, sapphire crystal watches, and handmade Italian leather accessories for discerning style.',
    badge: 'Category 03'
  },
  {
    id: 'iphones',
    name: 'Apple iPhones & Tech',
    subtitle: 'Factory Unlocked & Official Warranty',
    description: 'Brand new, sealed Apple iPhone devices with full international warranty, MagSafe ecosystems, and custom specs.',
    badge: 'Category 04'
  }
] as const;

export const PRODUCTS: Product[] = [
  // 1. CLOTH SHOPPING
  {
    id: 'c1',
    name: 'VERFIED Signature Heavyweight Hoodie',
    category: 'cloth',
    price: 1400,
    originalPrice: 1800,
    description: '500 GSM ultra-dense organic cotton hoodie with custom VERFIED tonal embroidery and double-lined architectural hood.',
    image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    reviewsCount: 128,
    inStock: true,
    featured: true,
    tag: 'Best Seller',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Onyx Black', 'Stone Greige', 'Deep Olive'],
    specs: ['500 GSM French Terry', 'Pre-shrunk organic cotton', 'Hidden kangaroo pocket', 'Drop shoulder fit']
  },
  {
    id: 'c2',
    name: 'Architectural Trench Overcoat',
    category: 'cloth',
    price: 3200,
    originalPrice: 3900,
    description: 'Double-breasted storm flap trench coat featuring water-repellent gabardine twill with horn buttons and waist tie belt.',
    image: 'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=800&q=80',
    rating: 5.0,
    reviewsCount: 64,
    inStock: true,
    tag: 'Runway Edition',
    sizes: ['M', 'L', 'XL'],
    colors: ['Desert Khaki', 'Midnight Charcoal'],
    specs: ['100% Gabardine twill', 'Bemberg cupro lining', 'Storm guard collar', 'Made in Portugal']
  },
  {
    id: 'c3',
    name: 'Minimalist Relaxed Mercerized Tee',
    category: 'cloth',
    price: 650,
    originalPrice: 850,
    description: 'Mercerized Egyptian Giza cotton t-shirt with a silk-like sheen, reinforced ribbed neckline, and relaxed drop silhouette.',
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80',
    rating: 4.8,
    reviewsCount: 92,
    inStock: true,
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Chalk White', 'Matte Black', 'Sand Dune'],
    specs: ['280 GSM Egyptian Cotton', 'Silk-mercerized finish', 'Anti-twist side seams']
  },
  {
    id: 'c4',
    name: 'Tailored Pleated Wool-Blend Trousers',
    category: 'cloth',
    price: 1950,
    originalPrice: 2400,
    description: 'Wide-leg relaxed trousers with deep front double pleats, concealed clasp closure, and fluid drape for elevated daywear.',
    image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=800&q=80',
    rating: 4.7,
    reviewsCount: 47,
    inStock: true,
    sizes: ['30', '32', '34', '36'],
    colors: ['Charcoal Heather', 'Smoked Espresso'],
    specs: ['Italian virgin wool blend', 'High-rise relaxed taper', 'Adjustable waistband tabs']
  },
  {
    id: 'c5',
    name: 'Structured Raw Denim Chore Jacket',
    category: 'cloth',
    price: 2100,
    originalPrice: 2600,
    description: '14oz Japanese selvedge raw denim utility jacket with brass rivets, three patch pockets, and reinforced flat-felled seams.',
    image: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    reviewsCount: 53,
    inStock: true,
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Indigo Raw', 'Washed Ash'],
    specs: ['14oz Kuroki Mills Selvedge', 'Unwashed rigid cotton', 'Custom brass hardware']
  },

  // 2. DIFFUSER SHOPPING
  {
    id: 'd1',
    name: 'VERFIED Ceramic Flame Mist Diffuser',
    category: 'diffuser',
    price: 950,
    originalPrice: 1300,
    description: 'Handcrafted matte ceramic ultrasonic diffuser featuring simulated warm ambient flame LED lighting and whisper-quiet ultrasonic atomization.',
    image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    reviewsCount: 142,
    inStock: true,
    featured: true,
    tag: 'Staff Favorite',
    colors: ['Stone White', 'Terracotta', 'Basalt Black'],
    specs: ['280ml water tank', 'Whisper <20dB technology', 'Ambient flame lighting', 'Auto shut-off when dry']
  },
  {
    id: 'd2',
    name: 'Nordic Cast Stone Smart Aroma Diffuser',
    category: 'diffuser',
    price: 1200,
    originalPrice: 1550,
    description: 'Architectural cast-concrete textured diffuser with app-controlled mist intensity, scheduled ambient timers, and warm bedside glow.',
    image: 'https://images.unsplash.com/photo-1616401784845-180882ba9ba8?auto=format&fit=crop&w=800&q=80',
    rating: 5.0,
    reviewsCount: 89,
    inStock: true,
    colors: ['Smoked Sandstone', 'Concrete Slate'],
    specs: ['Ultrasonic 2.4MHz vibration', '500ml long-run reservoir (14 hours)', 'Timer presets (1h/3h/6h)']
  },
  {
    id: 'd3',
    name: 'Artisan Amber Glass Reed Diffuser Set',
    category: 'diffuser',
    price: 580,
    originalPrice: 750,
    description: 'Hand-poured 250ml organic carrier oil infused with French lavender, smoked cedar, and bergamot with black rattan reeds.',
    image: 'https://images.unsplash.com/photo-1602928321679-560bb453f190?auto=format&fit=crop&w=800&q=80',
    rating: 4.8,
    reviewsCount: 110,
    inStock: true,
    colors: ['Amber Glass', 'Smoked Obsidian'],
    specs: ['250ml essential oil blend', '8 thick porous reeds', 'Continuous diffusion for 90+ days']
  },
  {
    id: 'd4',
    name: 'Waterless Cold-Air Nebulizing Diffuser',
    category: 'diffuser',
    price: 1450,
    originalPrice: 1900,
    description: 'Professional-grade pure nebulizer that atomizes 100% pure essential oils directly without water or heat, preserving therapeutic terpene profiles.',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    reviewsCount: 76,
    inStock: true,
    colors: ['Anodized Space Gray', 'Brushed Rose Gold'],
    specs: ['No water required', 'Covers up to 1,200 sq ft', 'Touch sensory intensity control']
  },

  // 3. ACCESSORIES SHOPPING
  {
    id: 'a1',
    name: 'VERFIED Chrono Sapphire Watch 41mm',
    category: 'accessories',
    price: 2850,
    originalPrice: 3500,
    description: 'Precision Japanese Miyota chronograph movement housed in 316L brushed stainless steel with anti-reflective double-domed sapphire crystal.',
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80',
    rating: 5.0,
    reviewsCount: 165,
    inStock: true,
    featured: true,
    tag: 'Premium Craft',
    colors: ['Silver & Sunburst Dial', 'Matte Black Ceramic', 'Rose Gold Mesh'],
    specs: ['50M Water resistance', 'Sapphire crystal glass', 'Quick-release Italian leather strap']
  },
  {
    id: 'a2',
    name: 'Italian Full-Grain Leather Card Wallet',
    category: 'accessories',
    price: 750,
    originalPrice: 950,
    description: 'Hand-stitched Tuscan vegetable-tanned leather bi-fold with RFID shielding, 6 card slots, and an ultra-slim 8mm profile.',
    image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    reviewsCount: 180,
    inStock: true,
    colors: ['Cognac Tan', 'Midnight Black', 'Forest Green'],
    specs: ['Vegetable tanned Italian leather', 'RFID blocking inner lining', 'Hand-waxed edges']
  },
  {
    id: 'a3',
    name: 'Titanium D-Frame Polarized Sunglasses',
    category: 'accessories',
    price: 1600,
    originalPrice: 2100,
    description: 'Featherlight Japanese beta-titanium frame weighing only 18 grams, fitted with category 3 UV400 polarized nylon lenses.',
    image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80',
    rating: 4.8,
    reviewsCount: 94,
    inStock: true,
    colors: ['Matte Gunmetal', 'Champagne Gold', 'Obsidian Black'],
    specs: ['100% UV400 Polarized', 'Beta-titanium temples', 'Anti-scratch oleophobic coating']
  },
  {
    id: 'a4',
    name: '18K Gold Plated Cuban Link Chain 6mm',
    category: 'accessories',
    price: 1350,
    originalPrice: 1750,
    description: 'Solid 316L stainless steel base triple-dipped in 18K yellow gold with diamond-cut beveling and custom security clasp.',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    reviewsCount: 112,
    inStock: true,
    colors: ['18K Yellow Gold', 'White Gold Rhodium'],
    specs: ['Tarnish-proof PVD plating', 'Hypoallergenic nickel-free', 'Length: 20" & 22" options']
  },

  // 4. IPHONES SHOPPING
  {
    id: 'p1',
    name: 'Apple iPhone 16 Pro Max (1TB / 512GB / 256GB)',
    category: 'iphones',
    price: 18990,
    originalPrice: 20500,
    description: 'Grade-A Brand New Sealed. Grade 5 Titanium design with 6.9-inch Super Retina XDR display, A18 Pro chip, 48MP Fusion camera system with 4K 120 fps Dolby Vision, and revolutionary Camera Control button.',
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=800&q=80',
    rating: 5.0,
    reviewsCount: 230,
    inStock: true,
    featured: true,
    tag: 'Flagship Edition',
    storage: ['256GB', '512GB', '1TB'],
    colors: ['Desert Titanium', 'Natural Titanium', 'White Titanium', 'Black Titanium'],
    specs: ['Apple A18 Pro Chip (3nm)', '6.9" ProMotion 120Hz OLED', 'Camera Control button', '1-Year Official Apple Warranty']
  },
  {
    id: 'p2',
    name: 'Apple iPhone 16 Pro (512GB / 256GB / 128GB)',
    category: 'iphones',
    price: 16500,
    originalPrice: 17900,
    description: 'Pro performance in an ergonomic 6.3-inch form factor. Features titanium finish, 5x Telephoto optical zoom, Action button, and all-day battery life.',
    image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    reviewsCount: 174,
    inStock: true,
    tag: 'Top Pick',
    storage: ['128GB', '256GB', '512GB'],
    colors: ['Natural Titanium', 'Desert Titanium', 'Black Titanium'],
    specs: ['Apple A18 Pro Silicon', '5x Optical Zoom Camera', 'Action Button + Camera Control', 'USB-C 3.0 Speeds (10Gb/s)']
  },
  {
    id: 'p3',
    name: 'Apple iPhone 16 (256GB / 128GB)',
    category: 'iphones',
    price: 12500,
    originalPrice: 13500,
    description: 'Next-generation iPhone 16 equipped with A18 chip, color-infused back glass, Camera Control, 48MP dual camera, and satellite SOS features.',
    image: 'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&w=800&q=80',
    rating: 4.8,
    reviewsCount: 139,
    inStock: true,
    storage: ['128GB', '256GB'],
    colors: ['Ultramarine', 'Teal', 'Pink', 'White', 'Black'],
    specs: ['Apple A18 Chip', '48MP 2-in-1 Fusion Camera', 'Dynamic Island with HDR', 'Factory Unlocked Dual SIM / eSIM']
  },
  {
    id: 'p4',
    name: 'Apple iPhone 15 Pro (256GB / 128GB) Brand New',
    category: 'iphones',
    price: 13900,
    originalPrice: 15200,
    description: 'Sealed aerospace-grade titanium iPhone 15 Pro with A17 Pro gaming chip, customizable Action button, and 48MP Pro camera system.',
    image: 'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    reviewsCount: 205,
    inStock: true,
    tag: 'Special Offer',
    storage: ['128GB', '256GB'],
    colors: ['Natural Titanium', 'Blue Titanium', 'Black Titanium'],
    specs: ['Apple A17 Pro Chip', 'ProMotion 120Hz display', 'Titanium band construction', 'Official 1-Year Apple Care eligible']
  }
];
