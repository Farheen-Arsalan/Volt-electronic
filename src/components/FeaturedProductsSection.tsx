import React from 'react';
import { 
  Star, 
  ShoppingBag, 
  Sparkles, 
  Heart, 
  Eye, 
  Check, 
  ShieldCheck, 
  Zap, 
  Flame 
} from 'lucide-react';
import { Product } from '../types';
import { FEATURED_ELECTRONICS, FeaturedProductItem } from '../data/featuredProducts';
import { formatAED } from '../utils/formatters';

interface FeaturedProductsSectionProps {
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  wishlistIds: Set<string>;
  onNavigate?: (sectionId: string) => void;
}

export const FeaturedProductsSection: React.FC<FeaturedProductsSectionProps> = ({
  onSelectProduct,
  onAddToCart,
  onToggleWishlist,
  wishlistIds,
  onNavigate,
}) => {
  return (
    <section 
      id="featured-products-section" 
      aria-label="Featured Products" 
      className="py-12 sm:py-16 bg-slate-100/70 border-b border-slate-200/80"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 sm:mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>Handpicked Flagships</span>
            </div>
            
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B132B] tracking-tight font-['Space_Grotesk']">
              Featured products
            </h2>
            
            <p className="text-sm text-slate-600 mt-1 max-w-xl">
              Dubai’s most sought-after gadgets with official manufacturer warranty, instant UAE dispatch, and guaranteed authenticity.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 font-medium hidden sm:inline">
              8 premium devices in stock
            </span>
            {onNavigate && (
              <button
                type="button"
                onClick={() => onNavigate('shop')}
                className="px-4 py-2 rounded-xl bg-white hover:bg-slate-50 text-blue-600 hover:text-blue-700 border border-slate-200 font-bold text-xs shadow-xs transition-colors"
              >
                View full catalog
              </button>
            )}
          </div>
        </div>

        {/* Responsive Grid of 8 Product Cards */}
        {/* Mobile: 1 or 2 per row (grid-cols-1 sm:grid-cols-2), Desktop: 4 per row (lg:grid-cols-4) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {FEATURED_ELECTRONICS.map((item: FeaturedProductItem) => {
            const isWishlisted = wishlistIds.has(item.id);

            return (
              <div
                key={item.id}
                id={`featured-card-${item.id}`}
                className="group relative bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/90 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between"
              >
                
                {/* Top Image Frame & Badges */}
                <div className="relative">
                  
                  {/* Red "Sale" Badge for the two marked cards */}
                  {item.hasSaleBadge && (
                    <div className="absolute top-2 left-2 z-10">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-red-600 text-white text-[11px] font-bold shadow-md shadow-red-600/30 uppercase tracking-wide">
                        <Flame className="w-3 h-3 fill-white" />
                        Sale
                      </span>
                    </div>
                  )}

                  {/* Category Pill on non-sale cards */}
                  {!item.hasSaleBadge && item.categoryLabel && (
                    <div className="absolute top-2 left-2 z-10">
                      <span className="px-2.5 py-0.5 rounded-full bg-slate-900/80 backdrop-blur-xs text-white text-[10px] font-semibold tracking-wide shadow-xs">
                        {item.categoryLabel}
                      </span>
                    </div>
                  )}

                  {/* Wishlist Button */}
                  <button
                    type="button"
                    onClick={() => onToggleWishlist(item)}
                    aria-label={isWishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
                    className={`absolute top-2 right-2 z-10 p-2 rounded-xl backdrop-blur-xs transition-all shadow-xs ${
                      isWishlisted
                        ? 'bg-rose-50 text-rose-600 border border-rose-200'
                        : 'bg-white/90 text-slate-400 hover:text-rose-600 hover:bg-white border border-slate-200'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-600' : ''}`} />
                  </button>

                  {/* Product Image */}
                  <div 
                    className="relative w-full h-48 sm:h-52 bg-slate-50 rounded-xl overflow-hidden cursor-pointer border border-slate-100 flex items-center justify-center p-2 group-hover:bg-slate-100/60 transition-colors"
                    onClick={() => onSelectProduct(item)}
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover rounded-lg group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Hover Quick View Overlay */}
                    <div className="absolute inset-0 bg-[#0B132B]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center pointer-events-none">
                      <span className="px-3 py-1.5 rounded-xl bg-white/95 text-[#0B132B] text-xs font-bold shadow-lg flex items-center gap-1.5">
                        <Eye className="w-3.5 h-3.5 text-blue-600" />
                        Quick View
                      </span>
                    </div>
                  </div>

                </div>

                {/* Card Content & Details */}
                <div className="mt-4 flex-1 flex flex-col justify-between space-y-3">
                  
                  <div>
                    {/* Brand & Star Rating Row */}
                    <div className="flex items-center justify-between gap-2 text-xs mb-1.5">
                      <span className="font-bold text-blue-600 uppercase tracking-wider text-[11px]">
                        {item.brand}
                      </span>
                      
                      <div className="flex items-center gap-1 text-amber-500 font-semibold text-xs bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200/60">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span>{item.rating.toFixed(1)}</span>
                        <span className="text-slate-400 text-[10px]">({item.reviewsCount})</span>
                      </div>
                    </div>

                    {/* Product Name */}
                    <h3 
                      onClick={() => onSelectProduct(item)}
                      className="text-sm sm:text-base font-bold text-slate-900 line-clamp-1 hover:text-blue-600 transition-colors cursor-pointer"
                      title={item.name}
                    >
                      {item.name}
                    </h3>

                    {/* One-Line Spec */}
                    <p className="text-xs text-slate-500 mt-1 line-clamp-1 font-normal" title={item.oneLineSpec}>
                      {item.oneLineSpec}
                    </p>
                  </div>

                  {/* Price & Add to Cart Section */}
                  <div className="pt-3 border-t border-slate-100 flex flex-col gap-3">
                    
                    {/* Price Row */}
                    <div className="flex items-baseline justify-between">
                      <div className="flex items-baseline gap-2">
                        <span className="text-lg sm:text-xl font-extrabold text-[#0B132B] font-['Space_Grotesk']">
                          {formatAED(item.price)}
                        </span>
                        
                        {item.originalPrice && item.originalPrice > item.price && (
                          <span className="text-xs text-slate-400 line-through">
                            {formatAED(item.originalPrice)}
                          </span>
                        )}
                      </div>

                      <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                        In Stock
                      </span>
                    </div>

                    {/* "Add to Cart" Action Button */}
                    <button
                      id={`featured-add-cart-btn-${item.id}`}
                      type="button"
                      onClick={() => onAddToCart(item)}
                      className="w-full py-2.5 sm:py-3 px-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm shadow-md shadow-blue-600/20 hover:shadow-blue-600/30 transition-all flex items-center justify-center gap-2 active:scale-98 cursor-pointer"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add to cart</span>
                    </button>

                  </div>

                </div>

              </div>
            );
          })}
        </div>

        {/* Bottom Trust Assurance Strip */}
        <div className="mt-10 p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm grid grid-cols-1 sm:grid-cols-3 gap-4 text-center sm:text-left items-center">
          <div className="flex items-center justify-center sm:justify-start gap-3">
            <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600 border border-blue-100 flex-shrink-0">
              <Zap className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900">Same-Day Dubai Express</h4>
              <p className="text-[11px] text-slate-500">Order by 4 PM for evening delivery</p>
            </div>
          </div>

          <div className="flex items-center justify-center sm:justify-start gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100 flex-shrink-0">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900">100% Genuine UAE Stock</h4>
              <p className="text-[11px] text-slate-500">Official TRA &amp; manufacturer warranty</p>
            </div>
          </div>

          <div className="flex items-center justify-center sm:justify-start gap-3">
            <div className="p-2.5 rounded-xl bg-amber-50 text-amber-600 border border-amber-100 flex-shrink-0">
              <Check className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900">Hassle-Free 14-Day Returns</h4>
              <p className="text-[11px] text-slate-500">Easy exchange at Downtown Showroom</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
