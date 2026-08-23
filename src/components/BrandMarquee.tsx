import React from 'react';
import { BRAND_LOGOS } from '../data/products';
import { Sparkles, ShieldCheck } from 'lucide-react';

export const BrandMarquee: React.FC = () => {
  return (
    <section aria-label="Official Brand Partners" className="py-8 bg-slate-900 border-y border-slate-800 text-slate-400 text-xs overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-2 text-cyan-400 font-bold uppercase tracking-widest text-[11px]">
            <ShieldCheck className="w-4 h-4" />
            <span>Authorized Retail Partner in the United Arab Emirates</span>
          </div>
          <span className="text-slate-400 text-xs hidden sm:inline">100% Genuine Middle East Units</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {BRAND_LOGOS.map((brand, index) => (
            <div
              key={index}
              className="bg-slate-800/60 hover:bg-slate-800 border border-slate-700/80 rounded-xl p-3 text-center transition-all flex items-center justify-center font-bold text-slate-200 text-xs tracking-wider"
            >
              {brand.name}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
