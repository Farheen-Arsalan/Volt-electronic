import React from 'react';
import { 
  Flame, 
  Sparkles, 
  ArrowRight, 
  Tag, 
  Clock, 
  Zap, 
  ShoppingBag,
  Percent
} from 'lucide-react';

interface DealsOfTheWeekBannerProps {
  onNavigate: (sectionId: string) => void;
}

export const DealsOfTheWeekBanner: React.FC<DealsOfTheWeekBannerProps> = ({ onNavigate }) => {
  return (
    <section 
      id="deals-of-the-week-banner" 
      aria-label="Deals of the week" 
      className="py-8 sm:py-12 bg-slate-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Colourful Hero-style Deal Card */}
        <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-r from-blue-700 via-indigo-600 to-cyan-500 border border-blue-400/30 p-6 sm:p-8 lg:p-10 text-white">
          
          {/* Background Lighting & Vector Tech Circles */}
          <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-cyan-400/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/3 -mb-10 w-80 h-40 bg-pink-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

          <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-8 space-y-4">
              
              {/* Badge & Timer Row */}
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-yellow-400 text-slate-950 text-xs font-black uppercase tracking-wider shadow-md">
                  <Flame className="w-3.5 h-3.5 fill-slate-950" />
                  Limited Time Offers
                </span>

                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-white border border-white/20 text-xs font-semibold">
                  <Clock className="w-3.5 h-3.5 text-cyan-200" />
                  Ends this Sunday midnight
                </span>

                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-rose-500 text-white text-xs font-extrabold shadow-sm">
                  <Percent className="w-3 h-3" />
                  Up to 40% OFF
                </span>
              </div>

              {/* Main Headline */}
              <div className="space-y-1.5">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight font-['Space_Grotesk']">
                  Deals of the week
                </h2>
                <p className="text-sm sm:text-base text-blue-100 max-w-2xl font-normal leading-relaxed">
                  Grab unbeatable Dubai tech prices on Apple MacBooks, Samsung OLEDs, Sony noise-cancelling headphones, and gaming gear. Save up to AED 1,200 with instant checkout vouchers!
                </p>
              </div>

              {/* Promo Code Pill & Feature Highlights */}
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-950/40 backdrop-blur-md border border-white/20 text-xs text-white">
                  <Tag className="w-4 h-4 text-yellow-300" />
                  <span>Use Voucher:</span>
                  <span className="font-mono font-black text-yellow-300 bg-slate-900/60 px-2 py-0.5 rounded border border-yellow-300/40">
                    DUBAI10
                  </span>
                  <span className="text-cyan-200 text-[11px]">Extra 10% off</span>
                </div>

                <div className="hidden sm:flex items-center gap-2 text-xs text-blue-100 font-medium">
                  <Zap className="w-4 h-4 text-cyan-300" />
                  <span>Free Same-Day Delivery across Dubai &amp; Abu Dhabi</span>
                </div>
              </div>

            </div>

            {/* Right Action CTA Button */}
            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col items-start lg:items-end justify-center gap-3">
              
              <button
                id="deals-of-the-week-cta-btn"
                type="button"
                onClick={() => onNavigate('deals')}
                className="w-full sm:w-auto lg:w-full py-4 px-6 rounded-2xl bg-yellow-400 hover:bg-yellow-300 text-slate-950 font-black text-sm sm:text-base shadow-xl shadow-yellow-500/30 hover:shadow-yellow-400/50 transition-all flex items-center justify-center gap-2.5 active:scale-95 cursor-pointer group"
              >
                <ShoppingBag className="w-5 h-5 text-slate-950" />
                <span>Claim Deals of the week</span>
                <ArrowRight className="w-5 h-5 text-slate-950 transition-transform group-hover:translate-x-1.5" />
              </button>

              <button
                type="button"
                onClick={() => onNavigate('shop')}
                className="w-full sm:w-auto lg:w-full py-2.5 px-4 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/20 transition-colors text-center"
              >
                Browse all weekly discounts
              </button>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
