import React from 'react';
import { 
  Building2, 
  ShieldCheck, 
  Award, 
  Users, 
  MapPin, 
  Clock, 
  Sparkles, 
  CheckCircle,
  Truck
} from 'lucide-react';
import { DUBAI_SHOWROOM_INFO } from '../data/products';

export const AboutSection: React.FC = () => {
  return (
    <section id="about-section" aria-label="About ABC Electronics" className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider border border-blue-200">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Dubai Tech Heritage</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-['Space_Grotesk']">
            About ABC Electronics &amp; Volt Tech
          </h2>
          <p className="text-slate-600 text-base leading-relaxed">
            Founded in Dubai, ABC Electronics (operating our flagship Volt Tech concept) is the United Arab Emirates’ premier destination for authenticated luxury technology, gaming hardware, and audio engineering.
          </p>
        </div>

        {/* 2-Column Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-16">
          
          {/* Left Column: Visual Card */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200 aspect-[4/3] bg-slate-900">
              <img
                src="https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&w=1000&q=80"
                alt="ABC Electronics Dubai Flagship Showroom"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B132B] via-transparent to-transparent" />
              
              <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                <span className="px-3 py-1 bg-blue-600 text-white rounded-lg text-xs font-bold uppercase tracking-wider">
                  Sheikh Zayed Road Flagship
                </span>
                <h3 className="text-xl font-bold font-['Space_Grotesk']">
                  Experience Tech Hands-On in Downtown Dubai
                </h3>
                <p className="text-xs text-slate-300">
                  Interactive demo pods, creator workstations, and certified Apple &amp; Sony specialists.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Values & Credentials */}
          <div className="lg:col-span-6 space-y-6">
            
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-slate-900 font-['Space_Grotesk']">
                Why Dubai Chooses ABC Electronics
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                We believe premium electronics require exceptional service. Every unit in our inventory is strictly registered with the UAE Telecommunications and Digital Government Regulatory Authority (TDRA) and comes with manufacturer warranty coverage.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold text-slate-900">100% Genuine TRA Certified</h4>
                <p className="text-xs text-slate-500">Official Middle East models with direct brand backing.</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                <div className="w-9 h-9 rounded-xl bg-cyan-100 text-cyan-600 flex items-center justify-center">
                  <Truck className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold text-slate-900">VIP Same-Day Dispatch</h4>
                <p className="text-xs text-slate-500">Fast doorstep deliveries across Dubai, Abu Dhabi &amp; Sharjah.</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center">
                  <Award className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold text-slate-900">2-Year Volt Warranty</h4>
                <p className="text-xs text-slate-500">Complimentary hardware check &amp; repair concierge.</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
                  <Building2 className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold text-slate-900">Physical Store Pickup</h4>
                <p className="text-xs text-slate-500">Ready in 60 minutes at Trade Centre 1 Showroom.</p>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
