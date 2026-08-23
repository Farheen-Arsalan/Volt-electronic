import React from 'react';
import { Truck, ShieldCheck, PhoneCall, Sparkles } from 'lucide-react';
import { DUBAI_SHOWROOM_INFO } from '../data/products';

export const AnnouncementBar: React.FC = () => {
  return (
    <aside aria-label="Store Announcements" id="top-announcement-bar" className="bg-[#070D1E] text-slate-300 text-xs py-2 border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-2">
        
        {/* Left: Dubai Shipping Highlights */}
        <div className="flex items-center gap-4 text-[11px] sm:text-xs">
          <div className="flex items-center gap-1.5 text-blue-400 font-medium">
            <Truck className="w-3.5 h-3.5" />
            <span className="text-slate-200">Express Delivery:</span>
            <span className="text-slate-300">Same-Day in Dubai & Sharjah on orders before 4 PM</span>
          </div>
          <div className="hidden lg:flex items-center gap-1.5 text-emerald-400">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span className="text-slate-300">Official UAE 2-Year Warranty</span>
          </div>
        </div>

        {/* Right: Flagship & Support info */}
        <div className="flex items-center gap-4 text-[11px] sm:text-xs">
          <span className="hidden md:inline-flex items-center gap-1 text-slate-400">
            <Sparkles className="w-3 h-3 text-amber-400" />
            <span>Sheikh Zayed Road Showroom</span>
          </span>
          <a
            href={`tel:${DUBAI_SHOWROOM_INFO.phone}`}
            id="header-phone-link"
            className="flex items-center gap-1.5 text-slate-300 hover:text-blue-400 transition-colors"
          >
            <PhoneCall className="w-3 h-3 text-blue-400" />
            <span className="font-semibold text-white">{DUBAI_SHOWROOM_INFO.phone}</span>
          </a>
          <span className="bg-blue-900/60 text-blue-300 text-[10px] font-bold px-2 py-0.5 rounded border border-blue-700/50 uppercase tracking-wider">
            AED • Dubai
          </span>
        </div>

      </div>
    </aside>
  );
};
