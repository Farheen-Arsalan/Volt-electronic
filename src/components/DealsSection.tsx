import React, { useState, useEffect } from 'react';
import { Flame, Clock, Zap, ArrowRight } from 'lucide-react';
import { Product } from '../types';
import { ProductCard } from './ProductCard';

interface DealsSectionProps {
  dealProducts: Product[];
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  wishlistIds: Set<string>;
  onNavigate: (sectionId: string) => void;
}

export const DealsSection: React.FC<DealsSectionProps> = ({
  dealProducts,
  onSelectProduct,
  onAddToCart,
  onToggleWishlist,
  wishlistIds,
  onNavigate,
}) => {
  // 14 hours countdown timer for flash sale
  const [timeLeft, setTimeLeft] = useState({
    hours: 13,
    minutes: 42,
    seconds: 19,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 14, minutes: 0, seconds: 0 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatDigit = (num: number) => num.toString().padStart(2, '0');

  return (
    <section id="deals-section" aria-label="Dubai Flash Deals" className="py-14 bg-gradient-to-b from-slate-900 to-[#0B132B] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Countdown Timer */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-slate-800">
          
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs font-bold uppercase tracking-wider">
              <Flame className="w-3.5 h-3.5 text-rose-400" />
              <span>Limited-Time Dubai Mega Sale</span>
            </div>
            
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-['Space_Grotesk']">
              Today&apos;s Super Deals
            </h2>
            <p className="text-slate-300 text-sm">
              Instant savings on flagships, gaming consoles, and audio tech with same-day express dispatch.
            </p>
          </div>

          {/* Flash Sale Countdown Timer Widget */}
          <div className="flex items-center gap-3 bg-slate-800/80 p-3.5 sm:p-4 rounded-2xl border border-slate-700/80 shadow-xl backdrop-blur-sm self-start lg:self-auto">
            <div className="flex items-center gap-2 text-amber-400 font-semibold text-xs sm:text-sm mr-2">
              <Clock className="w-4 h-4 animate-pulse" />
              <span className="hidden sm:inline">Offer Ends In:</span>
            </div>

            <div className="flex items-center gap-1.5 font-mono">
              <div className="bg-[#0B132B] px-2.5 py-1.5 rounded-lg border border-slate-700 text-center min-w-[40px]">
                <span className="text-base sm:text-lg font-bold text-white">{formatDigit(timeLeft.hours)}</span>
                <span className="block text-[9px] text-slate-400 font-sans uppercase">Hrs</span>
              </div>
              <span className="text-slate-500 font-bold text-lg">:</span>
              <div className="bg-[#0B132B] px-2.5 py-1.5 rounded-lg border border-slate-700 text-center min-w-[40px]">
                <span className="text-base sm:text-lg font-bold text-cyan-400">{formatDigit(timeLeft.minutes)}</span>
                <span className="block text-[9px] text-slate-400 font-sans uppercase">Min</span>
              </div>
              <span className="text-slate-500 font-bold text-lg">:</span>
              <div className="bg-[#0B132B] px-2.5 py-1.5 rounded-lg border border-slate-700 text-center min-w-[40px]">
                <span className="text-base sm:text-lg font-bold text-rose-400">{formatDigit(timeLeft.seconds)}</span>
                <span className="block text-[9px] text-slate-400 font-sans uppercase">Sec</span>
              </div>
            </div>
          </div>

        </div>

        {/* Deals Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 pt-8">
          {dealProducts.slice(0, 4).map((product) => (
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

        {/* Bottom CTA to view all catalog */}
        <div className="mt-10 text-center">
          <button
            id="deals-view-all-btn"
            type="button"
            onClick={() => onNavigate('shop')}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 hover:text-white border border-blue-500/40 font-semibold text-sm transition-all"
          >
            <span>Explore All 12+ Deals in Dubai Catalog</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
