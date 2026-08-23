import React from 'react';
import { Star, Heart, ShoppingBag, Eye, ShieldCheck, Zap } from 'lucide-react';
import { Product } from '../types';
import { formatAED } from '../utils/formatters';

interface ProductCardProps {
  product: Product;
  onSelect: () => void;
  onAddToCart: () => void;
  onToggleWishlist: () => void;
  isWishlisted: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onSelect,
  onAddToCart,
  onToggleWishlist,
  isWishlisted,
}) => {
  const getBadgeColor = (badge?: string) => {
    switch (badge) {
      case 'Deal':
        return 'bg-rose-500 text-white';
      case 'Best Seller':
        return 'bg-blue-600 text-white';
      case 'Dubai Exclusive':
        return 'bg-purple-600 text-white';
      case 'New':
        return 'bg-emerald-600 text-white';
      case 'Limited Stock':
        return 'bg-amber-600 text-white';
      default:
        return 'bg-slate-800 text-white';
    }
  };

  return (
    <div
      id={`product-card-${product.id}`}
      className="group bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-blue-300 transition-all duration-300 flex flex-col justify-between overflow-hidden relative"
    >
      
      {/* Top Media Container */}
      <div className="relative bg-slate-100/70 p-4 aspect-[4/3] overflow-hidden flex items-center justify-center">
        
        {/* Product Image */}
        <img
          src={product.image}
          alt={product.name}
          referrerPolicy="no-referrer"
          loading="lazy"
          className="w-full h-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-500"
        />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.badge && (
            <span className={`px-2.5 py-1 text-[11px] font-bold rounded-lg uppercase tracking-wider shadow-sm ${getBadgeColor(product.badge)}`}>
              {product.badge}
            </span>
          )}
          {product.discountPercent && product.discountPercent > 0 && (
            <span className="px-2 py-0.5 text-[10px] font-bold bg-rose-600 text-white rounded-md uppercase tracking-wider shadow-sm">
              -{product.discountPercent}%
            </span>
          )}
        </div>

        {/* Quick Action Overlay Buttons (Top Right) */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 z-10">
          {/* Wishlist Button */}
          <button
            id={`wishlist-btn-${product.id}`}
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onToggleWishlist();
            }}
            className={`p-2 rounded-xl backdrop-blur-md shadow-md transition-all ${
              isWishlisted
                ? 'bg-rose-50 text-rose-600 ring-2 ring-rose-500/20'
                : 'bg-white/90 text-slate-600 hover:text-rose-500 hover:bg-white'
            }`}
            title={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
            aria-label={`Save ${product.name} to wishlist`}
          >
            <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-500' : ''}`} />
          </button>

          {/* Quick View Button */}
          <button
            id={`quickview-btn-${product.id}`}
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onSelect();
            }}
            className="p-2 rounded-xl bg-white/90 backdrop-blur-md text-slate-600 hover:text-blue-600 hover:bg-white shadow-md transition-all opacity-0 group-hover:opacity-100"
            title="Quick Specs Preview"
            aria-label={`Quick view ${product.name}`}
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>

        {/* Stock Badge Overlay */}
        <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between text-[11px] text-slate-700 pointer-events-none">
          <span className="bg-white/90 backdrop-blur-md px-2 py-0.5 rounded-md font-medium text-slate-800 border border-slate-200/60 shadow-xs">
            {product.categoryLabel}
          </span>
          <span className="bg-emerald-500/90 text-white font-semibold px-2 py-0.5 rounded-md shadow-xs flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            Dubai Stock
          </span>
        </div>

      </div>

      {/* Card Body */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
        
        <div className="space-y-2">
          
          {/* Brand & Ratings */}
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-blue-600 tracking-wider uppercase">{product.brand}</span>
            <div className="flex items-center gap-1 text-slate-700">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span className="font-bold">{product.rating}</span>
              <span className="text-slate-500">({product.reviewsCount})</span>
            </div>
          </div>

          {/* Product Title */}
          <h3
            onClick={onSelect}
            className="text-sm sm:text-base font-bold text-slate-900 line-clamp-2 hover:text-blue-600 transition-colors cursor-pointer leading-snug"
            title={product.name}
          >
            {product.name}
          </h3>

          {/* Warranty tag */}
          <div className="flex items-center gap-1.5 text-[11px] text-slate-600 pt-0.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
            <span className="truncate">{product.warranty.replace('Official ', '')}</span>
          </div>

        </div>

        {/* Pricing & Add to Cart Footer */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
          
          <div className="flex flex-col">
            <span className="text-lg sm:text-xl font-extrabold text-slate-900 font-['Space_Grotesk'] leading-tight">
              {formatAED(product.price)}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-xs text-slate-500 line-through">
                {formatAED(product.originalPrice)}
              </span>
            )}
          </div>

          <button
            id={`card-add-btn-${product.id}`}
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart();
            }}
            className="min-h-[44px] min-w-[44px] px-3.5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md shadow-blue-600/20 hover:shadow-blue-600/30 active:scale-95 transition-all flex items-center justify-center gap-1.5 cursor-pointer group/btn"
            aria-label={`Add ${product.name} to cart`}
          >
            <ShoppingBag className="w-4 h-4 text-white group-hover/btn:scale-110 transition-transform" />
            <span className="hidden sm:inline">Add</span>
          </button>

        </div>

      </div>

    </div>
  );
};
