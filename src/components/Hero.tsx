import React, { useState } from 'react';
import { 
  Zap, 
  ArrowRight, 
  ShieldCheck, 
  Truck, 
  Sparkles, 
  Star, 
  CheckCircle2, 
  Flame,
  ChevronLeft,
  ChevronRight,
  Smartphone,
  Laptop,
  Headphones,
  Watch,
  ShoppingBag
} from 'lucide-react';
import { Product } from '../types';
import { formatAED } from '../utils/formatters';

interface HeroProps {
  featuredProducts: Product[];
  onSelectProduct: (product: Product) => void;
  onNavigate: (sectionId: string) => void;
  onAddToCart: (product: Product) => void;
  onSelectCategory?: (categoryId: string) => void;
}

export const Hero: React.FC<HeroProps> = ({
  featuredProducts,
  onSelectProduct,
  onNavigate,
  onAddToCart,
  onSelectCategory,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroSlides = featuredProducts.slice(0, 3);
  const activeProduct = heroSlides[currentSlide] || featuredProducts[0];

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  const categoryCards = [
    {
      id: 'cat-phones',
      name: 'Phones',
      slug: 'smartphones',
      subtext: 'Flagships & 5G',
      icon: <Smartphone className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-400" />,
      tag: 'New Gen',
    },
    {
      id: 'cat-laptops',
      name: 'Laptops',
      slug: 'laptops',
      subtext: 'MacBooks & Pro PCs',
      icon: <Laptop className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400" />,
      tag: 'M3 & RTX',
    },
    {
      id: 'cat-audio',
      name: 'Audio',
      slug: 'audio',
      subtext: 'ANC & Hi-Fi Sound',
      icon: <Headphones className="w-5 h-5 sm:w-6 sm:h-6 text-sky-400" />,
      tag: 'Spatial Audio',
    },
    {
      id: 'cat-wearables',
      name: 'Wearables',
      slug: 'wearables',
      subtext: 'Smartwatches & Fit',
      icon: <Watch className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-400" />,
      tag: 'Health Tracking',
    },
  ];

  const handleCategoryClick = (slug: string) => {
    if (onSelectCategory) {
      onSelectCategory(slug);
    } else {
      onNavigate('shop');
    }
  };

  return (
    <section id="hero-section" aria-label="Hero Spotlight" className="relative bg-gradient-to-b from-[#0B132B] via-[#0D1838] to-[#080E24] text-white pt-6 pb-12 sm:pb-16 overflow-hidden border-b border-slate-800/80">
      
      {/* Background Tech Glow & Grid Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(#1e3a8a_1px,transparent_1px)] [background-size:24px_24px] opacity-20 pointer-events-none" />
      <div className="absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-10 right-10 w-80 h-80 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12">
        
        {/* Top Tag & Dubai Trust Badge */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/30 text-cyan-300 text-xs font-semibold tracking-wide">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>DUBAI'S PREMIER SMART TECH DESTINATION</span>
          </div>

          <div className="hidden md:flex items-center gap-6 text-xs text-slate-300 font-medium">
            <span className="flex items-center gap-1.5 text-emerald-400">
              <CheckCircle2 className="w-4 h-4" />
              100% Genuine TRA UAE Registered
            </span>
            <span className="flex items-center gap-1.5 text-blue-400">
              <Truck className="w-4 h-4" />
              Dubai Express Same-Day Delivery
            </span>
          </div>
        </div>

        {/* Main Hero Banner: Headline, Subline, Bright Yellow "Shop now" CTA & Spotlight Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Headlines, Subline & Call to Actions */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="space-y-3.5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-blue-500/20 text-cyan-300 border border-blue-400/30 text-xs font-bold uppercase tracking-wider">
                <Zap className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                <span>Next-Gen Smart Electronics</span>
              </div>
              
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.12] font-['Space_Grotesk']">
                Dubai’s smart <br className="hidden sm:inline" />
                <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-sky-300 bg-clip-text text-transparent">
                  electronics store
                </span>
              </h1>
              
              <p className="text-slate-300 text-base sm:text-lg max-w-2xl leading-relaxed font-normal">
                Discover authentic flagship smartphones, pro creator laptops, audiophile sound, and smart wearables with same-day Dubai delivery and official 2-year UAE warranties.
              </p>
            </div>

            {/* Bright Yellow "Shop now" Main CTA + Secondary Action */}
            <div className="flex flex-wrap items-center gap-3.5 pt-1">
              <button
                id="hero-shop-now-btn"
                type="button"
                onClick={() => onNavigate('shop')}
                className="px-7 py-3.5 sm:py-4 rounded-xl bg-yellow-400 hover:bg-yellow-300 text-[#0B132B] font-extrabold text-sm sm:text-base shadow-xl shadow-yellow-400/25 hover:shadow-yellow-400/40 transition-all flex items-center justify-center gap-2.5 group active:scale-95 cursor-pointer ring-2 ring-yellow-400/50"
              >
                <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 text-[#0B132B]" />
                <span>Shop now</span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-[#0B132B] transition-transform group-hover:translate-x-1" />
              </button>

              <button
                id="hero-explore-deals-btn"
                type="button"
                onClick={() => onNavigate('deals')}
                className="px-6 py-3.5 sm:py-4 rounded-xl bg-slate-800/90 hover:bg-slate-800 text-cyan-300 hover:text-white font-bold text-sm sm:text-base border border-blue-500/30 hover:border-cyan-400/60 shadow-lg transition-all active:scale-95 flex items-center gap-2"
              >
                <Flame className="w-4 h-4 text-rose-400" />
                <span>Dubai Super Deals</span>
              </button>
            </div>

            {/* Trust Highlights Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5 pt-4 border-t border-slate-800/80">
              <div className="flex items-start gap-2.5">
                <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20 flex-shrink-0">
                  <Truck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Free UAE Delivery</h4>
                  <p className="text-[11px] text-slate-400">On orders over AED 200</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 flex-shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">2-Year Warranty</h4>
                  <p className="text-[11px] text-slate-400">Official UAE Agency</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5 col-span-2 sm:col-span-1">
                <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20 flex-shrink-0">
                  <Zap className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Sheikh Zayed Road</h4>
                  <p className="text-[11px] text-slate-400">Downtown Showroom</p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Featured Spotlight Device Card */}
          {activeProduct && (
            <div className="lg:col-span-5">
              <div className="relative bg-gradient-to-b from-slate-800/90 to-slate-900/95 border border-slate-700/70 rounded-3xl p-5 sm:p-6 shadow-2xl shadow-black/50 backdrop-blur-xl">
                
                {/* Top Badge & Slider Controls */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-bold uppercase tracking-wider border border-cyan-500/30 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    Spotlight Device
                  </span>

                  <div className="flex items-center gap-1.5">
                    <button
                      id="hero-slide-prev-btn"
                      type="button"
                      onClick={handlePrevSlide}
                      className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 border border-slate-700 transition-colors"
                      aria-label="Previous featured product"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <span className="text-xs text-slate-400 px-1 font-mono">
                      {currentSlide + 1} / {heroSlides.length}
                    </span>
                    <button
                      id="hero-slide-next-btn"
                      type="button"
                      onClick={handleNextSlide}
                      className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 border border-slate-700 transition-colors"
                      aria-label="Next featured product"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Product Image Frame */}
                <div 
                  className="relative h-52 sm:h-60 rounded-2xl overflow-hidden bg-slate-950/80 border border-slate-800 group cursor-pointer"
                  onClick={() => onSelectProduct(activeProduct)}
                >
                  <img
                    src={activeProduct.image}
                    alt={activeProduct.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent" />
                  
                  {activeProduct.badge && (
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-blue-600 text-white text-xs font-bold shadow-md">
                      {activeProduct.badge}
                    </span>
                  )}

                  {activeProduct.discountPercent && activeProduct.discountPercent > 0 && (
                    <span className="absolute top-3 right-3 px-2.5 py-1 rounded-md bg-rose-600 text-white text-xs font-bold shadow-md">
                      Save {activeProduct.discountPercent}%
                    </span>
                  )}

                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-slate-300">
                    <span className="bg-slate-900/80 backdrop-blur px-2.5 py-1 rounded-md text-cyan-300 font-medium">
                      {activeProduct.categoryLabel}
                    </span>
                    <span className="flex items-center gap-1 text-amber-400 font-semibold bg-slate-900/80 backdrop-blur px-2 py-1 rounded-md">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      {activeProduct.rating} ({activeProduct.reviewsCount})
                    </span>
                  </div>
                </div>

                {/* Product Info & Pricing */}
                <div className="mt-4 space-y-3">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span className="font-bold text-blue-400 uppercase tracking-wider">{activeProduct.brand}</span>
                    <span className="text-emerald-400 flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                      In Stock ({activeProduct.stockCount} left in Dubai)
                    </span>
                  </div>

                  <h3 
                    onClick={() => onSelectProduct(activeProduct)}
                    className="text-base sm:text-lg font-bold text-white hover:text-cyan-300 transition-colors line-clamp-1 cursor-pointer"
                  >
                    {activeProduct.name}
                  </h3>

                  <div className="flex items-baseline gap-3">
                    <span className="text-2xl font-extrabold text-cyan-400 font-['Space_Grotesk']">
                      {formatAED(activeProduct.price)}
                    </span>
                    {activeProduct.originalPrice && activeProduct.originalPrice > activeProduct.price && (
                      <span className="text-sm text-slate-400 line-through">
                        {formatAED(activeProduct.originalPrice)}
                      </span>
                    )}
                  </div>

                  {/* Actions inside card */}
                  <div className="grid grid-cols-2 gap-2 pt-2">
                    <button
                      id={`hero-quickview-${activeProduct.id}`}
                      type="button"
                      onClick={() => onSelectProduct(activeProduct)}
                      className="py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors text-center"
                    >
                      View Specs
                    </button>
                    <button
                      id={`hero-addcart-${activeProduct.id}`}
                      type="button"
                      onClick={() => onAddToCart(activeProduct)}
                      className="py-2.5 px-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white text-xs font-bold shadow-md shadow-blue-600/30 transition-all flex items-center justify-center gap-1.5"
                    >
                      <Zap className="w-3.5 h-3.5" />
                      <span>Add to Cart</span>
                    </button>
                  </div>
                </div>

                {/* Slide indicator dots */}
                <div className="flex items-center justify-center gap-2 mt-4 pt-3 border-t border-slate-800">
                  {heroSlides.map((_, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => setCurrentSlide(index)}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        currentSlide === index ? 'w-6 bg-cyan-400' : 'w-2 bg-slate-700 hover:bg-slate-600'
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>

              </div>
            </div>
          )}

        </div>

        {/* "Shop by category" Row with Four Cards: Phones, Laptops, Audio, Wearables */}
        <div className="pt-6 sm:pt-8 border-t border-slate-800/80">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 sm:mb-6">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              <h2 className="text-base sm:text-lg font-bold text-white uppercase tracking-wider font-['Space_Grotesk']">
                Shop by category
              </h2>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('categories')}
              className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1 group self-start sm:self-auto"
            >
              <span>View all categories</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {categoryCards.map((card) => (
              <button
                key={card.id}
                id={`hero-category-${card.slug}`}
                type="button"
                onClick={() => handleCategoryClick(card.slug)}
                className="group relative bg-[#0F1A3A]/80 hover:bg-[#14234E] border border-blue-500/20 hover:border-cyan-400/60 rounded-2xl p-4 sm:p-5 text-left transition-all duration-200 shadow-lg hover:shadow-cyan-500/10 active:scale-[0.98] flex flex-col justify-between overflow-hidden"
              >
                {/* Glow accent on hover */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/10 rounded-full blur-xl group-hover:bg-cyan-500/20 transition-all pointer-events-none" />

                <div className="flex items-start justify-between gap-2 mb-3">
                  <div className="p-2.5 sm:p-3 rounded-xl bg-[#0B132B] border border-blue-500/30 text-white shadow-inner group-hover:border-cyan-400/50 group-hover:scale-110 transition-all duration-200">
                    {card.icon}
                  </div>
                  <span className="text-[10px] sm:text-[11px] font-bold px-2 py-0.5 rounded-full bg-blue-900/60 border border-blue-700/50 text-cyan-300">
                    {card.tag}
                  </span>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="text-base sm:text-lg font-bold text-white font-['Space_Grotesk'] group-hover:text-cyan-300 transition-colors">
                      {card.name}
                    </h3>
                    <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-300 group-hover:translate-x-1 transition-all" />
                  </div>
                  <p className="text-xs text-slate-400 mt-1">
                    {card.subtext}
                  </p>
                </div>
              </button>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
