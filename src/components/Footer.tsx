import React, { useState } from 'react';
import { 
  Zap, 
  MapPin, 
  Phone, 
  Mail, 
  Clock,
  ShieldCheck, 
  Send, 
  CheckCircle2, 
  ArrowUp,
  Instagram,
  Twitter,
  Facebook,
  Youtube,
  Linkedin,
  CreditCard,
  Banknote,
  Smartphone,
  Check
} from 'lucide-react';
import { DUBAI_SHOWROOM_INFO } from '../data/products';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setIsSubscribed(true);
      setNewsletterEmail('');
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="footer-section" className="bg-[#070D1E] text-slate-400 text-xs border-t border-slate-800 selection:bg-cyan-500 selection:text-slate-950">
      
      {/* Top Value Banner */}
      <div className="border-b border-slate-800/80 py-8 bg-[#0B132B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center justify-between">
            
            <div className="flex items-center gap-3.5">
              <div className="p-3 rounded-2xl bg-blue-600/20 text-cyan-400 border border-blue-500/30 flex-shrink-0">
                <Zap className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white font-['Space_Grotesk']">Volt Tech Fast-Track</h4>
                <p className="text-xs text-slate-300 mt-0.5">Orders placed before 4 PM arrive same day in Dubai.</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5">
              <div className="p-3 rounded-2xl bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 flex-shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white font-['Space_Grotesk']">Official UAE Warranty</h4>
                <p className="text-xs text-slate-300 mt-0.5">2-Year comprehensive manufacturer warranty on all devices.</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5">
              <div className="p-3 rounded-2xl bg-amber-600/20 text-amber-400 border border-amber-500/30 flex-shrink-0">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white font-['Space_Grotesk']">Downtown Dubai Flagship</h4>
                <p className="text-xs text-slate-300 mt-0.5">Sheikh Zayed Road, Trade Centre 1, Dubai, UAE.</p>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Main Footer Links & Information */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10">
          
          {/* Brand & Socials Column */}
          <div className="sm:col-span-2 lg:col-span-4 space-y-4">
            
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-400 p-0.5 flex items-center justify-center shadow-md shadow-blue-500/20">
                <div className="w-full h-full bg-[#0B132B] rounded-[10px] flex items-center justify-center">
                  <Zap className="w-5 h-5 text-cyan-400 fill-cyan-400" />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xl font-extrabold text-white font-['Space_Grotesk'] tracking-tight">VOLT</span>
                  <span className="text-xl font-medium text-cyan-400 font-['Space_Grotesk']">Electronics</span>
                </div>
                <span className="text-[11px] text-slate-400 block font-medium">ABC Electronics LLC • Dubai, UAE</span>
              </div>
            </div>

            <p className="text-slate-300 text-xs leading-relaxed max-w-sm">
              Your premier premium electronics destination in Dubai and across the Emirates. Experience authentic flagships, verified warranty, and express doorstep delivery.
            </p>

            {/* Social Icons */}
            <div className="pt-2 space-y-2">
              <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wider block">
                Connect With Us
              </span>
              <div className="flex items-center gap-2">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Volt Electronics on Instagram"
                  className="w-8 h-8 rounded-xl bg-slate-900/90 hover:bg-gradient-to-tr hover:from-pink-600 hover:to-amber-500 text-slate-300 hover:text-white border border-slate-700/80 flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-xs"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Volt Electronics on Twitter / X"
                  className="w-8 h-8 rounded-xl bg-slate-900/90 hover:bg-cyan-600 text-slate-300 hover:text-white border border-slate-700/80 flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-xs"
                >
                  <Twitter className="w-4 h-4" />
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Volt Electronics on Facebook"
                  className="w-8 h-8 rounded-xl bg-slate-900/90 hover:bg-blue-600 text-slate-300 hover:text-white border border-slate-700/80 flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-xs"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Volt Electronics on YouTube"
                  className="w-8 h-8 rounded-xl bg-slate-900/90 hover:bg-red-600 text-slate-300 hover:text-white border border-slate-700/80 flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-xs"
                >
                  <Youtube className="w-4 h-4" />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Volt Electronics on LinkedIn"
                  className="w-8 h-8 rounded-xl bg-slate-900/90 hover:bg-blue-700 text-slate-300 hover:text-white border border-slate-700/80 flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-xs"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              </div>
            </div>

          </div>

          {/* Quick Links Column: Home, Shop, About, Contact */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-['Space_Grotesk']">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button 
                  type="button" 
                  onClick={() => onNavigate('home')} 
                  className="hover:text-cyan-400 transition-colors flex items-center gap-1.5 group cursor-pointer text-slate-300"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-600 group-hover:bg-cyan-400 transition-colors" />
                  <span>Home</span>
                </button>
              </li>
              <li>
                <button 
                  type="button" 
                  onClick={() => onNavigate('shop')} 
                  className="hover:text-cyan-400 transition-colors flex items-center gap-1.5 group cursor-pointer text-slate-300"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-600 group-hover:bg-cyan-400 transition-colors" />
                  <span>Shop</span>
                </button>
              </li>
              <li>
                <button 
                  type="button" 
                  onClick={() => onNavigate('about')} 
                  className="hover:text-cyan-400 transition-colors flex items-center gap-1.5 group cursor-pointer text-slate-300"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-600 group-hover:bg-cyan-400 transition-colors" />
                  <span>About</span>
                </button>
              </li>
              <li>
                <button 
                  type="button" 
                  onClick={() => onNavigate('contact')} 
                  className="hover:text-cyan-400 transition-colors flex items-center gap-1.5 group cursor-pointer text-slate-300"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-600 group-hover:bg-cyan-400 transition-colors" />
                  <span>Contact</span>
                </button>
              </li>
              <li>
                <button 
                  type="button" 
                  onClick={() => onNavigate('deals')} 
                  className="hover:text-cyan-400 transition-colors flex items-center gap-1.5 group cursor-pointer text-slate-300"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-600 group-hover:bg-cyan-400 transition-colors" />
                  <span>Deals of the Week</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Details Column (Dubai Address, Phone, Support 9am - 9pm) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-['Space_Grotesk']">
              Contact Details
            </h4>
            
            <div className="space-y-3 text-xs text-slate-300">
              
              {/* Dubai Address */}
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white">Downtown Dubai Showroom</p>
                  <p className="text-slate-300 leading-snug mt-0.5">
                    Sheikh Zayed Road, Trade Centre 1, Downtown Dubai, UAE
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white">Direct Telephone</p>
                  <a href="tel:+97148008658" className="text-cyan-300 hover:text-cyan-200 transition-colors font-medium">
                    +971 4 800-VOLT (8658)
                  </a>
                  <span className="text-[11px] text-slate-400 block">+971 4 392 8400</span>
                </div>
              </div>

              {/* Support 9am - 9pm */}
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white">Support 9am – 9pm</p>
                  <p className="text-slate-300 text-[11px]">
                    Customer Helpdesk: Daily 9:00 AM – 9:00 PM (GST)
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white">Email Support</p>
                  <a href="mailto:support@lisrc.ae" className="text-cyan-300 hover:text-cyan-200 transition-colors">
                    support@lisrc.ae
                  </a>
                </div>
              </div>

            </div>
          </div>

          {/* Payment Methods & Newsletter */}
          <div className="sm:col-span-2 lg:col-span-3 space-y-4">
            
            {/* Payment Methods Icons (Visa, Mastercard, Apple Pay, Cash on Delivery) */}
            <div className="space-y-2.5 bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
              <span className="text-xs font-bold text-white uppercase tracking-wider font-['Space_Grotesk'] block">
                Payment Options
              </span>
              
              <div className="grid grid-cols-2 gap-2">
                
                {/* Visa */}
                <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-800/80 border border-slate-700/80 hover:border-blue-500/50 transition-colors group">
                  <div className="w-7 h-5 rounded bg-[#1A1F71] text-white flex items-center justify-center font-black italic text-[11px] tracking-tighter shadow-xs">
                    VISA
                  </div>
                  <span className="text-[11px] font-bold text-slate-200 group-hover:text-white">
                    Visa
                  </span>
                </div>

                {/* Mastercard */}
                <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-800/80 border border-slate-700/80 hover:border-amber-500/50 transition-colors group">
                  <div className="w-7 h-5 rounded bg-slate-950 flex items-center justify-center relative overflow-hidden shadow-xs">
                    <div className="w-3.5 h-3.5 rounded-full bg-[#EB001B] -mr-1.5" />
                    <div className="w-3.5 h-3.5 rounded-full bg-[#F79E1B] opacity-90" />
                  </div>
                  <span className="text-[11px] font-bold text-slate-200 group-hover:text-white">
                    Mastercard
                  </span>
                </div>

                {/* Apple Pay */}
                <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-800/80 border border-slate-700/80 hover:border-slate-400 transition-colors group">
                  <div className="w-7 h-5 rounded bg-white text-black flex items-center justify-center font-semibold text-[10px] tracking-tight shadow-xs">
                    Pay
                  </div>
                  <span className="text-[11px] font-bold text-slate-200 group-hover:text-white">
                    Apple Pay
                  </span>
                </div>

                {/* Cash on Delivery */}
                <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-800/80 border border-slate-700/80 hover:border-emerald-500/50 transition-colors group">
                  <div className="w-7 h-5 rounded bg-emerald-700 text-white flex items-center justify-center shadow-xs">
                    <Banknote className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-[10px] font-bold text-slate-200 group-hover:text-white leading-tight">
                    Cash on Del.
                  </span>
                </div>

              </div>
            </div>

            {/* Newsletter Subscription */}
            <div className="space-y-2">
              <h5 className="text-[11px] font-bold text-slate-300 uppercase tracking-wider">
                Dubai Flash Deals Alerts
              </h5>

              {isSubscribed ? (
                <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-800 text-emerald-300 text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 flex-shrink-0 text-emerald-400" />
                  <span>Subscribed! Check your inbox for AED 100 voucher.</span>
                </div>
              ) : (
                <form onSubmit={handleNewsletterSubmit} className="flex gap-1.5">
                  <input
                    type="email"
                    required
                    placeholder="Enter email..."
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    className="w-full bg-slate-900 text-slate-100 text-xs rounded-xl px-3 py-2 border border-slate-700 focus:outline-none focus:ring-1 focus:ring-cyan-400 placeholder:text-slate-500"
                  />
                  <button
                    type="submit"
                    className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center flex-shrink-0 cursor-pointer active:scale-95"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>

          </div>

        </div>

        {/* Bottom Section with specific credit line requested */}
        <div className="pt-8 mt-10 border-t border-slate-800/80 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-slate-400 text-center md:text-left">
          
          <div className="space-y-1">
            {/* The exact requested line */}
            <p className="font-semibold text-slate-200">
              Volt Electronics · built at London International · <a href="https://lisrc.ae" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">lisrc.ae</a>
            </p>
            <p className="text-slate-500 text-[10px]">
              © {new Date().getFullYear()} ABC Electronics LLC. Licensed &amp; Verified by UAE Telecommunications and Digital Government Regulatory Authority (TDRA).
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[10px] text-slate-500 hidden sm:inline">TRA Registration: UAE-TRA-8942</span>
            
            <button
              type="button"
              onClick={scrollToTop}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-all flex items-center gap-1.5 text-xs font-semibold border border-slate-700 shadow-xs active:scale-95 cursor-pointer"
              aria-label="Scroll to top of page"
            >
              <span>Back to top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

      </div>
    </footer>
  );
};
