import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  MessageSquare, 
  Send, 
  CheckCircle2,
  ExternalLink,
  Sparkles
} from 'lucide-react';
import { DUBAI_SHOWROOM_INFO } from '../data/products';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: 'product-inquiry',
    message: '',
  });

  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSent(true);
  };

  return (
    <section id="contact-section" aria-label="Contact and Showroom Location" className="py-16 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider border border-blue-200">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Connect with Dubai Team</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-['Space_Grotesk']">
            Contact &amp; Showroom Visit
          </h2>
          <p className="text-slate-600 text-base leading-relaxed">
            Have questions regarding device specifications, corporate bulk orders, or Dubai express shipping? Our specialists are available 7 days a week.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Dubai Showroom Information & Map Card */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="bg-[#0B132B] text-white rounded-3xl p-6 sm:p-7 shadow-xl border border-slate-800 space-y-6">
              
              <div>
                <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
                  Flagship Store &amp; Service Hub
                </span>
                <h3 className="text-xl font-bold font-['Space_Grotesk'] text-white mt-1">
                  {DUBAI_SHOWROOM_INFO.name}
                </h3>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-slate-300">
                
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-blue-600/30 text-cyan-300 border border-blue-500/30 flex-shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="font-bold text-white">Location</h5>
                    <p className="text-slate-300">{DUBAI_SHOWROOM_INFO.address}</p>
                    <p className="text-slate-400 text-xs mt-0.5">{DUBAI_SHOWROOM_INFO.location}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-emerald-600/30 text-emerald-300 border border-emerald-500/30 flex-shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="font-bold text-white">Opening Hours</h5>
                    <p className="text-slate-300">{DUBAI_SHOWROOM_INFO.openingHours.weekdays}</p>
                    <p className="text-slate-300">{DUBAI_SHOWROOM_INFO.openingHours.friday}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-purple-600/30 text-purple-300 border border-purple-500/30 flex-shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="font-bold text-white">Direct Phone</h5>
                    <p className="text-slate-200 font-mono font-semibold">{DUBAI_SHOWROOM_INFO.phone}</p>
                    <p className="text-slate-400 text-xs">Toll-free across UAE</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-rose-600/30 text-rose-300 border border-rose-500/30 flex-shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="font-bold text-white">Email</h5>
                    <p className="text-slate-200">{DUBAI_SHOWROOM_INFO.email}</p>
                  </div>
                </div>

              </div>

              {/* Quick WhatsApp Action Button */}
              <div className="pt-2 border-t border-slate-800">
                <a
                  href={`https://wa.me/${DUBAI_SHOWROOM_INFO.whatsapp.replace(/[^0-9]/g, '')}?text=Hello%20ABC%20Electronics%20Dubai,%20I%20have%20an%20inquiry%20regarding%20products.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  id="contact-whatsapp-btn"
                  className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-600/20 transition-all flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Chat on WhatsApp ({DUBAI_SHOWROOM_INFO.whatsapp})</span>
                </a>
              </div>

            </div>

          </div>

          {/* Right Column: Interactive Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md">
              
              <div className="mb-6">
                <h3 className="text-xl font-bold text-slate-900 font-['Space_Grotesk']">
                  Send Us a Direct Message
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Our Dubai customer support team responds within 30 minutes during showroom hours.
                </p>
              </div>

              {isSent ? (
                <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-8 text-center space-y-4 animate-in fade-in">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-lg font-bold text-slate-900">Message Received!</h4>
                  <p className="text-xs text-slate-600 max-w-sm mx-auto">
                    Thank you {formData.name || 'valued customer'}. A representative from our Sheikh Zayed Road tech center will reach you shortly.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setIsSent(false);
                      setFormData({ name: '', phone: '', email: '', subject: 'product-inquiry', message: '' });
                    }}
                    className="text-xs font-bold text-blue-600 hover:underline"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Your Name</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Rashid Al Nuaimi"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full text-xs p-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Mobile (+971)</label>
                      <input
                        type="tel"
                        required
                        placeholder="+971 5X XXX XXXX"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full text-xs p-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
                      <input
                        type="email"
                        required
                        placeholder="name@domain.ae"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full text-xs p-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Subject</label>
                      <select
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full text-xs p-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                      >
                        <option value="product-inquiry">Product &amp; Specification Question</option>
                        <option value="delivery">Dubai Same-Day Delivery Inquiry</option>
                        <option value="corporate">Corporate / Bulk B2B Pricing</option>
                        <option value="warranty">Warranty &amp; Service Claim</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Message</label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Tell us what you're looking for or which item you need assistance with..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full text-xs p-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <button
                    id="contact-submit-btn"
                    type="submit"
                    className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-600/30 active:scale-95 transition-all flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Submit Inquiry</span>
                  </button>

                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
