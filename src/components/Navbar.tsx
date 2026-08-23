import React, { useState, useEffect, useRef } from 'react';
import { 
  Zap, 
  Search, 
  ShoppingBag, 
  Heart, 
  Menu, 
  X, 
  ChevronRight, 
  ArrowRight,
  Sparkles,
  MapPin,
  Clock
} from 'lucide-react';
import { Product } from '../types';
import { formatAED } from '../utils/formatters';
import { DUBAI_SHOWROOM_INFO } from '../data/products';

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  products: Product[];
  onSelectProduct: (product: Product) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  onNavigate,
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  searchQuery,
  onSearchChange,
  products,
  onSelectProduct,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Monitor scroll for shadow/backdrop enhancement
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close search suggestions on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'shop', label: 'Shop' },
    { id: 'categories', label: 'Categories' },
    { id: 'deals', label: 'Deals', badge: 'Hot' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' },
  ];

  // Filtered search preview items
  const searchResults = searchQuery.trim() === ''
    ? []
    : products.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5);

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      id="main-sticky-header"
      className={`sticky top-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0B132B]/95 backdrop-blur-md shadow-lg shadow-black/20 border-b border-blue-900/40'
          : 'bg-[#0B132B] border-b border-slate-800'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-3 md:gap-6">
          
          {/* Mobile Menu Button */}
          <div className="flex items-center lg:hidden">
            <button
              id="mobile-menu-toggle-btn"
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2.5 rounded-xl text-slate-200 hover:text-white hover:bg-slate-800/80 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Brand Logo: Volt Electronics with lightning bolt icon & ABC Electronics */}
          <div className="flex items-center flex-shrink-0">
            <button
              id="brand-logo-button"
              type="button"
              onClick={() => handleLinkClick('home')}
              className="flex items-center gap-3 text-left group focus:outline-none"
            >
              {/* Electric Bolt Icon Container */}
              <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-400 p-0.5 shadow-md shadow-blue-500/20 group-hover:shadow-blue-500/40 transition-all duration-300 flex items-center justify-center">
                <div className="w-full h-full bg-[#0B132B] rounded-[10px] flex items-center justify-center group-hover:bg-[#0f1b3d] transition-colors">
                  <Zap className="w-6 h-6 text-cyan-400 fill-cyan-400 transition-transform group-hover:scale-110" />
                </div>
              </div>

              {/* Brand Typography */}
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="text-xl font-extrabold text-white tracking-tight font-['Space_Grotesk']">
                    VOLT
                  </span>
                  <span className="text-xl font-medium text-cyan-400 font-['Space_Grotesk']">
                    Electronics
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                  <span className="font-semibold text-blue-400">ABC Electronics</span>
                  <span className="text-slate-600">•</span>
                  <span className="text-slate-300">Dubai</span>
                </div>
              </div>
            </button>
          </div>

          {/* Desktop Navigation Links */}
          <nav aria-label="Primary Navigation" className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  id={`nav-link-${link.id}`}
                  type="button"
                  onClick={() => handleLinkClick(link.id)}
                  className={`relative px-3.5 py-2 rounded-xl text-sm font-medium transition-all duration-200 flex items-center gap-1.5 ${
                    isActive
                      ? 'text-white bg-blue-600/20 text-blue-400 border border-blue-500/30 font-semibold'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <span>{link.label}</span>
                  {link.badge && (
                    <span className="px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-md bg-gradient-to-r from-amber-500 to-rose-500 text-white shadow-sm">
                      {link.badge}
                    </span>
                  )}
                  {isActive && (
                    <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Search Bar with live autocomplete */}
          <div ref={searchContainerRef} className="relative flex-1 max-w-xs md:max-w-sm lg:max-w-md hidden sm:block">
            <div className="relative">
              <input
                id="header-search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                placeholder="Search iPhone, MacBook, Sony, PS5..."
                className="w-full bg-slate-900/90 text-slate-100 placeholder-slate-400 text-sm rounded-xl pl-10 pr-10 py-2.5 border border-slate-700/80 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 focus:outline-none transition-all shadow-inner"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              
              {searchQuery && (
                <button
                  id="clear-search-btn"
                  type="button"
                  onClick={() => onSearchChange('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white p-0.5 rounded-full hover:bg-slate-800"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Instant Search Results Dropdown */}
            {isSearchFocused && searchQuery.trim() !== '' && (
              <div
                id="search-autocomplete-dropdown"
                className="absolute top-full mt-2 left-0 right-0 bg-white text-slate-900 rounded-2xl shadow-2xl border border-slate-200 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-150"
              >
                <div className="p-3 bg-slate-50 border-b border-slate-100 flex items-center justify-between text-xs text-slate-600">
                  <span className="font-semibold">Products matching &quot;{searchQuery}&quot;</span>
                  <span>{searchResults.length} found</span>
                </div>

                <div className="divide-y divide-slate-100 max-h-80 overflow-y-auto">
                  {searchResults.length > 0 ? (
                    searchResults.map((product) => (
                      <button
                        key={product.id}
                        id={`search-item-${product.id}`}
                        type="button"
                        onClick={() => {
                          onSelectProduct(product);
                          setIsSearchFocused(false);
                        }}
                        className="w-full p-3 flex items-center gap-3 hover:bg-blue-50/70 transition-colors text-left group"
                      >
                        <img
                          src={product.image}
                          alt={product.name}
                          referrerPolicy="no-referrer"
                          className="w-12 h-12 object-cover rounded-lg bg-slate-100 border border-slate-200 flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider">{product.brand}</p>
                          <p className="text-sm font-medium text-slate-900 truncate group-hover:text-blue-600 transition-colors">
                            {product.name}
                          </p>
                          <p className="text-xs font-bold text-slate-900 mt-0.5">
                            {formatAED(product.price)}
                          </p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all flex-shrink-0" />
                      </button>
                    ))
                  ) : (
                    <div className="p-6 text-center text-slate-500">
                      <p className="text-sm">No electronic items found matching &quot;{searchQuery}&quot;</p>
                      <p className="text-xs text-slate-400 mt-1">Try searching for &quot;iPhone&quot;, &quot;Sony&quot;, or &quot;OLED&quot;</p>
                    </div>
                  )}
                </div>

                <div className="p-2.5 bg-slate-50 border-t border-slate-100 text-center">
                  <button
                    type="button"
                    onClick={() => {
                      onNavigate('shop');
                      setIsSearchFocused(false);
                    }}
                    className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center justify-center gap-1 mx-auto"
                  >
                    <span>View all matching products in catalog</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right Action Icons: Wishlist & Cart */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Wishlist Button */}
            <button
              id="navbar-wishlist-btn"
              type="button"
              onClick={onOpenWishlist}
              className="relative p-2.5 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800/80 transition-colors"
              title="Saved Wishlist"
              aria-label={`Wishlist with ${wishlistCount} items`}
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-rose-500 text-white text-[11px] font-bold rounded-full flex items-center justify-center border-2 border-[#0B132B] shadow-sm animate-pulse">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Cart Button with Animated Badge */}
            <button
              id="navbar-cart-btn"
              type="button"
              onClick={onOpenCart}
              className="relative flex items-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl shadow-md shadow-blue-600/30 hover:shadow-blue-600/50 transition-all duration-200 active:scale-95 group font-medium cursor-pointer"
              aria-label={`Shopping cart with ${cartCount} items`}
            >
              <div className="relative">
                <ShoppingBag className="w-5 h-5 text-white transition-transform group-hover:scale-110" />
                {cartCount > 0 && (
                  <span 
                    key={`cart-badge-${cartCount}`}
                    className="absolute -top-2.5 -right-3 bg-rose-600 text-white text-[10px] sm:text-[11px] font-black min-w-[20px] h-5 px-1 rounded-full flex items-center justify-center border-2 border-[#0B132B] shadow-md animate-bounce"
                    style={{ animationIterationCount: 2 }}
                  >
                    {cartCount > 99 ? '99+' : cartCount}
                  </span>
                )}
              </div>
              <span className="hidden sm:inline text-xs sm:text-sm font-semibold tracking-wide">
                Cart
              </span>
            </button>

          </div>

        </div>

        {/* Mobile Search Bar Row (When on small screens) */}
        <div className="pb-3 sm:hidden">
          <div className="relative">
            <input
              id="mobile-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search gadgets, audio, laptops..."
              className="w-full bg-slate-900 text-slate-100 placeholder-slate-400 text-sm rounded-xl pl-10 pr-8 py-2 border border-slate-700 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-500 focus:outline-none"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            {searchQuery && (
              <button
                type="button"
                onClick={() => onSearchChange('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation Menu */}
      {isMobileMenuOpen && (
        <div id="mobile-nav-drawer" className="lg:hidden bg-[#070D1E] border-t border-slate-800 animate-in slide-in-from-top-4 duration-200 shadow-2xl">
          <div className="max-w-7xl mx-auto px-4 py-4 space-y-1">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  id={`mobile-nav-link-${link.id}`}
                  type="button"
                  onClick={() => handleLinkClick(link.id)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                    isActive
                      ? 'bg-blue-600 text-white font-semibold shadow-md'
                      : 'text-slate-200 hover:bg-slate-800/80'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    {link.label}
                    {link.badge && (
                      <span className="px-2 py-0.5 text-[10px] font-bold uppercase rounded bg-rose-500 text-white">
                        {link.badge}
                      </span>
                    )}
                  </span>
                  <ChevronRight className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                </button>
              );
            })}

            {/* Mobile Cart & Wishlist Quick Buttons */}
            <div className="grid grid-cols-2 gap-2 pt-2">
              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenCart();
                }}
                className="flex items-center justify-center gap-2 p-3 rounded-xl bg-blue-600 text-white font-bold text-sm shadow-md"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Cart ({cartCount})</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenWishlist();
                }}
                className="flex items-center justify-center gap-2 p-3 rounded-xl bg-slate-800 text-slate-200 hover:text-white font-bold text-sm border border-slate-700"
              >
                <Heart className="w-4 h-4 text-rose-400" />
                <span>Wishlist ({wishlistCount})</span>
              </button>
            </div>

            {/* Mobile Showroom Info card */}
            <div className="mt-4 pt-4 border-t border-slate-800/80 bg-[#0B132B] p-4 rounded-xl text-xs text-slate-300 space-y-2">
              <div className="flex items-center gap-2 text-cyan-400 font-semibold">
                <MapPin className="w-4 h-4" />
                <span>Downtown Dubai Showroom</span>
              </div>
              <p className="text-slate-400">{DUBAI_SHOWROOM_INFO.address}</p>
              <div className="flex items-center gap-2 text-slate-400 pt-1">
                <Clock className="w-3.5 h-3.5 text-blue-400" />
                <span>Open today until 11:00 PM</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
