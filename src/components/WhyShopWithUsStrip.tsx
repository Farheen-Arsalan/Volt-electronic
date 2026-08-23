import React from 'react';
import { 
  ShieldCheck, 
  Award, 
  Truck, 
  RotateCcw, 
  Banknote,
  CheckCircle2
} from 'lucide-react';

export const WhyShopWithUsStrip: React.FC = () => {
  const perks = [
    {
      id: 'perk-genuine',
      title: 'Genuine Products',
      subtitle: '100% Authentic & Sealed',
      icon: <ShieldCheck className="w-6 h-6 text-cyan-400" />,
      badge: 'Official',
      bgGlow: 'from-cyan-500/20 to-blue-500/10',
    },
    {
      id: 'perk-warranty',
      title: '1 Year Warranty',
      subtitle: 'Comprehensive Coverage',
      icon: <Award className="w-6 h-6 text-blue-400" />,
      badge: 'Guaranteed',
      bgGlow: 'from-blue-500/20 to-indigo-500/10',
    },
    {
      id: 'perk-delivery',
      title: 'Free UAE Delivery',
      subtitle: 'Fast Dubai Express',
      icon: <Truck className="w-6 h-6 text-emerald-400" />,
      badge: 'Same-Day',
      bgGlow: 'from-emerald-500/20 to-teal-500/10',
    },
    {
      id: 'perk-returns',
      title: 'Easy 7-Day Returns',
      subtitle: 'Hassle-Free Exchange',
      icon: <RotateCcw className="w-6 h-6 text-amber-400" />,
      badge: 'Simple',
      bgGlow: 'from-amber-500/20 to-orange-500/10',
    },
    {
      id: 'perk-cod',
      title: 'Cash on Delivery',
      subtitle: 'Pay at Your Doorstep',
      icon: <Banknote className="w-6 h-6 text-violet-400" />,
      badge: 'Flexible',
      bgGlow: 'from-violet-500/20 to-purple-500/10',
    },
  ];

  return (
    <section 
      id="why-shop-with-us" 
      aria-label="Why shop with us" 
      className="py-10 bg-[#0B132B] border-y border-slate-800 text-white relative overflow-hidden"
    >
      {/* Subtle Background Glows */}
      <div className="absolute inset-0 bg-[radial-gradient(#1e3a8a_1px,transparent_1px)] [background-size:20px_20px] opacity-15 pointer-events-none" />
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-72 h-32 bg-blue-500/10 blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-72 h-32 bg-cyan-500/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Header Title */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-6">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white font-['Space_Grotesk'] tracking-wide">
                Why shop with us
              </h2>
            </div>
          </div>
          <span className="text-xs text-slate-400 font-medium hidden sm:inline">
            Trusted by over 45,000 tech enthusiasts across the UAE
          </span>
        </div>

        {/* 5 Icons Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-4">
          {perks.map((perk) => (
            <div
              key={perk.id}
              className="group relative bg-slate-900/80 hover:bg-slate-800/90 border border-slate-700/80 hover:border-cyan-400/50 rounded-2xl p-4 sm:p-5 transition-all duration-300 shadow-md hover:shadow-cyan-500/10 flex flex-col items-center text-center"
            >
              {/* Top Accent Icon */}
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${perk.bgGlow} border border-slate-700/80 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300 shadow-inner`}>
                {perk.icon}
              </div>

              {/* Title & Subtitle */}
              <h3 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors font-['Space_Grotesk']">
                {perk.title}
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                {perk.subtitle}
              </p>

              {/* Mini Pill Tag */}
              <span className="mt-3 inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-800 text-slate-300 border border-slate-700 group-hover:border-cyan-500/40 group-hover:text-cyan-300 transition-colors">
                {perk.badge}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
