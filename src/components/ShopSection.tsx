import React, { useState, useMemo } from 'react';
import { 
  Filter, 
  SlidersHorizontal, 
  ArrowUpDown, 
  Check, 
  RotateCcw, 
  Search,
  Sparkles,
  ShoppingBag
} from 'lucide-react';
import { Product } from '../types';
import { ProductCard } from './ProductCard';

interface ShopSectionProps {
  products: Product[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  wishlistIds: Set<string>;
  searchQuery: string;
}

export const ShopSection: React.FC<ShopSectionProps> = ({
  products,
  selectedCategory,
  onSelectCategory,
  onSelectProduct,
  onAddToCart,
  onToggleWishlist,
  wishlistIds,
  searchQuery,
}) => {
  const [selectedBrand, setSelectedBrand] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'rating' | 'discount'>('featured');
  const [dealsOnly, setDealsOnly] = useState<boolean>(false);
  const [maxPrice, setMaxPrice] = useState<number>(10000);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState<boolean>(false);

  // Extract unique brands
  const brands = useMemo(() => {
    const set = new Set<string>();
    products.forEach((p) => set.add(p.brand));
    return Array.from(set).sort();
  }, [products]);

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        // Global search query match
        if (searchQuery.trim() !== '') {
          const q = searchQuery.toLowerCase();
          const matches =
            product.name.toLowerCase().includes(q) ||
            product.brand.toLowerCase().includes(q) ||
            product.categoryLabel.toLowerCase().includes(q) ||
            product.description.toLowerCase().includes(q);
          if (!matches) return false;
        }

        // Category filter
        if (selectedCategory !== 'all' && product.category !== selectedCategory) {
          return false;
        }

        // Brand filter
        if (selectedBrand !== 'all' && product.brand !== selectedBrand) {
          return false;
        }

        // Deals only
        if (dealsOnly && !product.isDeal) {
          return false;
        }

        // Price ceiling
        if (product.price > maxPrice) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        switch (sortBy) {
          case 'price-low':
            return a.price - b.price;
          case 'price-high':
            return b.price - a.price;
          case 'rating':
            return b.rating - a.rating;
          case 'discount':
            return (b.discountPercent || 0) - (a.discountPercent || 0);
          default:
            return 0; // default order
        }
      });
  }, [products, selectedCategory, selectedBrand, dealsOnly, maxPrice, sortBy, searchQuery]);

  const handleResetFilters = () => {
    onSelectCategory('all');
    setSelectedBrand('all');
    setDealsOnly(false);
    setMaxPrice(10000);
    setSortBy('featured');
  };

  const hasActiveFilters =
    selectedCategory !== 'all' ||
    selectedBrand !== 'all' ||
    dealsOnly ||
    maxPrice < 10000;

  return (
    <section id="shop-section" aria-label="Electronics Catalog" className="py-14 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Full Store Inventory</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-['Space_Grotesk']">
              Explore Our Collection
            </h2>
          </div>
          
          <p className="text-sm text-slate-500">
            Showing <span className="font-bold text-slate-900">{filteredProducts.length}</span> of {products.length} electronics in Dubai warehouse
          </p>
        </div>

        {/* Filter Toolbar Card */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-sm mb-8 space-y-4">
          
          {/* Top Row: Quick Pill Filters & Mobile Filter Toggle */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            
            {/* Brand Dropdown */}
            <div className="flex items-center gap-2">
              <label htmlFor="brand-filter-select" className="text-xs font-semibold text-slate-700">
                Brand:
              </label>
              <select
                id="brand-filter-select"
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                className="bg-slate-50 text-slate-800 text-xs font-medium rounded-xl px-3 py-2 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Brands</option>
                {brands.map((b) => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
            </div>

            {/* Deals Toggle Button */}
            <button
              id="deals-toggle-btn"
              type="button"
              onClick={() => setDealsOnly(!dealsOnly)}
              className={`px-3 py-2 rounded-xl text-xs font-semibold border transition-colors flex items-center gap-1.5 ${
                dealsOnly
                  ? 'bg-rose-50 border-rose-300 text-rose-700 ring-2 ring-rose-500/20'
                  : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${dealsOnly ? 'bg-rose-600' : 'bg-slate-400'}`} />
              <span>Discounted Deals Only</span>
            </button>

            {/* Price Max Slider Quick Filter */}
            <div className="hidden sm:flex items-center gap-3">
              <label htmlFor="max-price-range" className="text-xs font-semibold text-slate-700 whitespace-nowrap">
                Max Price: <span className="text-blue-600 font-bold">AED {maxPrice.toLocaleString()}</span>
              </label>
              <input
                id="max-price-range"
                type="range"
                min="500"
                max="10000"
                step="250"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-28 sm:w-36 h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
            </div>

            {/* Sort By Dropdown */}
            <div className="flex items-center gap-2 ml-auto">
              <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
              <label htmlFor="shop-sort-select" className="text-xs font-semibold text-slate-700 hidden sm:inline">
                Sort:
              </label>
              <select
                id="shop-sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-slate-50 text-slate-800 text-xs font-medium rounded-xl px-3 py-2 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="featured">Featured & Best Matches</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Customer Rating</option>
                <option value="discount">Biggest Discount (%)</option>
              </select>
            </div>

          </div>

          {/* Active Filters Pill Bar */}
          {hasActiveFilters && (
            <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center gap-2 text-xs">
              <span className="text-slate-600 font-semibold">Active filters:</span>
              
              {selectedCategory !== 'all' && (
                <span className="bg-blue-50 text-blue-700 px-2.5 py-1 rounded-lg border border-blue-200 flex items-center gap-1 font-medium">
                  Category: {selectedCategory}
                  <button type="button" onClick={() => onSelectCategory('all')} className="hover:text-blue-900 font-bold ml-1">×</button>
                </span>
              )}

              {selectedBrand !== 'all' && (
                <span className="bg-blue-50 text-blue-700 px-2.5 py-1 rounded-lg border border-blue-200 flex items-center gap-1 font-medium">
                  Brand: {selectedBrand}
                  <button type="button" onClick={() => setSelectedBrand('all')} className="hover:text-blue-900 font-bold ml-1">×</button>
                </span>
              )}

              {dealsOnly && (
                <span className="bg-rose-50 text-rose-700 px-2.5 py-1 rounded-lg border border-rose-200 flex items-center gap-1 font-medium">
                  Deals Only
                  <button type="button" onClick={() => setDealsOnly(false)} className="hover:text-rose-900 font-bold ml-1">×</button>
                </span>
              )}

              {maxPrice < 10000 && (
                <span className="bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg border border-slate-200 flex items-center gap-1 font-medium">
                  Under AED {maxPrice.toLocaleString()}
                  <button type="button" onClick={() => setMaxPrice(10000)} className="hover:text-slate-900 font-bold ml-1">×</button>
                </span>
              )}

              <button
                id="reset-all-filters-btn"
                type="button"
                onClick={handleResetFilters}
                className="text-blue-600 hover:text-blue-800 font-bold underline ml-2 flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" />
                Reset all
              </button>
            </div>
          )}

        </div>

        {/* Products Grid or Empty State */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onSelect={() => onSelectProduct(product)}
                onAddToCart={() => onAddToCart(product)}
                onToggleWishlist={() => onToggleWishlist(product)}
                isWishlisted={wishlistIds.has(product.id)}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-sm max-w-lg mx-auto space-y-4">
            <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
              <Search className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">No electronics match your criteria</h3>
            <p className="text-sm text-slate-500">
              Try adjusting your price range, clearing brand filters, or searching for other tech terms.
            </p>
            <button
              id="empty-state-reset-btn"
              type="button"
              onClick={handleResetFilters}
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-md shadow-blue-600/20"
            >
              Reset All Filters
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
