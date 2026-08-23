import React, { useState } from 'react';
import { 
  X, 
  CheckCircle2, 
  CreditCard, 
  Truck, 
  ShieldCheck, 
  Banknote, 
  Smartphone, 
  Sparkles, 
  MapPin,
  Clock,
  ArrowRight
} from 'lucide-react';
import { CartItem } from '../types';
import { formatAED } from '../utils/formatters';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  cartData: {
    subtotal: number;
    discount: number;
    shippingFee: number;
    total: number;
    promoCode: string;
    shippingType: 'standard' | 'express';
  };
  onOrderSuccess: (orderId: string) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  cartData,
  onOrderSuccess,
}) => {
  const [formData, setFormData] = useState({
    fullName: 'Ahmed Al Mansoori',
    email: 'ahmed.m@example.ae',
    phone: '+971 50 123 4567',
    emirate: 'Dubai',
    area: 'Downtown Dubai / Burj Khalifa Boulevard',
    building: 'Boulevard Heights, Tower 1, Apt 1402',
    notes: 'Please call upon arrival at the security gate',
    paymentMethod: 'apple-pay', // 'apple-pay' | 'card' | 'cod' | 'tabby'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [generatedOrderId, setGeneratedOrderId] = useState('');

  if (!isOpen) return null;

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Front-end simulation of order placement
    setTimeout(() => {
      const orderId = `ABC-DXB-${Math.floor(100000 + Math.random() * 900000)}`;
      setGeneratedOrderId(orderId);
      setIsSubmitting(false);
      setIsSuccess(true);
      onOrderSuccess(orderId);
    }, 1200);
  };

  const handleFinish = () => {
    setIsSuccess(false);
    onClose();
  };

  return (
    <div
      id="checkout-modal-backdrop"
      className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-in fade-in duration-200"
    >
      <div
        id="checkout-modal-panel"
        className="bg-white text-slate-900 rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-slate-200 relative my-auto animate-in zoom-in-95 duration-200"
      >
        
        {/* Modal Header */}
        <div className="bg-[#0B132B] text-white p-5 sm:p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-blue-600/30 border border-blue-500/40 text-cyan-300">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold font-['Space_Grotesk']">
                {isSuccess ? 'Order Confirmed!' : 'Express Checkout'}
              </h3>
              <p className="text-xs text-slate-300">
                {isSuccess ? 'Your electronics order has been placed in Dubai' : 'ABC Electronics • Volt Tech UAE Dispatch'}
              </p>
            </div>
          </div>

          {!isSuccess && (
            <button
              id="close-checkout-btn"
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Modal Content */}
        {isSuccess ? (
          <div className="p-6 sm:p-8 text-center space-y-6">
            <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner animate-bounce">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-extrabold text-slate-900 font-['Space_Grotesk']">
                Shukran! Your Order is Placed
              </h2>
              <p className="text-sm text-slate-600 max-w-md mx-auto">
                We have received your order for {items.length} electronic item(s). Our Sheikh Zayed Road warehouse is preparing dispatch.
              </p>
            </div>

            <div className="bg-slate-50 rounded-2xl p-4 sm:p-5 border border-slate-200 text-left max-w-md mx-auto space-y-3 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500 font-medium">Order Reference:</span>
                <span className="font-mono font-bold text-blue-600">{generatedOrderId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 font-medium">Estimated Arrival:</span>
                <span className="font-semibold text-emerald-600">
                  {cartData.shippingType === 'express' ? 'Today within 3 Hours (VIP Dubai)' : 'Tomorrow by 4:00 PM'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 font-medium">Delivery Address:</span>
                <span className="font-semibold text-slate-800 text-right">{formData.area}, {formData.emirate}</span>
              </div>
              <div className="flex justify-between border-t border-slate-200 pt-2 font-bold text-sm">
                <span>Total Amount Paid:</span>
                <span className="text-blue-600 font-['Space_Grotesk']">{formatAED(cartData.total)}</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                id="checkout-success-continue-btn"
                type="button"
                onClick={handleFinish}
                className="px-8 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md transition-all"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmitOrder} className="p-6 sm:p-8 space-y-6 max-h-[75vh] overflow-y-auto">
            
            {/* Delivery Details */}
            <div className="space-y-4">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-blue-600" />
                <span>1. UAE Delivery Information</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">UAE Mobile (+971)</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Emirate</label>
                  <select
                    value={formData.emirate}
                    onChange={(e) => setFormData({ ...formData, emirate: e.target.value })}
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  >
                    <option value="Dubai">Dubai</option>
                    <option value="Abu Dhabi">Abu Dhabi</option>
                    <option value="Sharjah">Sharjah</option>
                    <option value="Ajman">Ajman</option>
                    <option value="Ras Al Khaimah">Ras Al Khaimah</option>
                    <option value="Fujairah">Fujairah</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Area / Community</label>
                  <input
                    type="text"
                    required
                    value={formData.area}
                    onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                    placeholder="e.g. Downtown, Marina, Business Bay"
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Building & Apartment / Villa No.</label>
                <input
                  type="text"
                  required
                  value={formData.building}
                  onChange={(e) => setFormData({ ...formData, building: e.target.value })}
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="space-y-3 pt-2 border-t border-slate-200">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <CreditCard className="w-4 h-4 text-blue-600" />
                <span>2. Payment Option (Placeholder)</span>
              </h4>

              <div className="grid grid-cols-2 gap-3">
                
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, paymentMethod: 'apple-pay' })}
                  className={`p-3 rounded-xl border text-left text-xs transition-all flex flex-col gap-1 ${
                    formData.paymentMethod === 'apple-pay'
                      ? 'border-blue-600 bg-blue-50/80 ring-1 ring-blue-600 text-blue-900'
                      : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between font-bold">
                    <span> Apple Pay</span>
                    {formData.paymentMethod === 'apple-pay' && <CheckCircle2 className="w-4 h-4 text-blue-600" />}
                  </div>
                  <span className="text-[10px] text-slate-500">1-Touch Express Dubai</span>
                </button>

                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, paymentMethod: 'card' })}
                  className={`p-3 rounded-xl border text-left text-xs transition-all flex flex-col gap-1 ${
                    formData.paymentMethod === 'card'
                      ? 'border-blue-600 bg-blue-50/80 ring-1 ring-blue-600 text-blue-900'
                      : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between font-bold">
                    <span>Credit / Debit Card</span>
                    {formData.paymentMethod === 'card' && <CheckCircle2 className="w-4 h-4 text-blue-600" />}
                  </div>
                  <span className="text-[10px] text-slate-500">Visa, Mastercard, AMEX</span>
                </button>

                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, paymentMethod: 'tabby' })}
                  className={`p-3 rounded-xl border text-left text-xs transition-all flex flex-col gap-1 ${
                    formData.paymentMethod === 'tabby'
                      ? 'border-blue-600 bg-blue-50/80 ring-1 ring-blue-600 text-blue-900'
                      : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between font-bold">
                    <span>Tabby / Tamara</span>
                    {formData.paymentMethod === 'tabby' && <CheckCircle2 className="w-4 h-4 text-blue-600" />}
                  </div>
                  <span className="text-[10px] text-slate-500">4 interest-free payments</span>
                </button>

                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, paymentMethod: 'cod' })}
                  className={`p-3 rounded-xl border text-left text-xs transition-all flex flex-col gap-1 ${
                    formData.paymentMethod === 'cod'
                      ? 'border-blue-600 bg-blue-50/80 ring-1 ring-blue-600 text-blue-900'
                      : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between font-bold">
                    <span>Cash on Delivery</span>
                    {formData.paymentMethod === 'cod' && <CheckCircle2 className="w-4 h-4 text-blue-600" />}
                  </div>
                  <span className="text-[10px] text-slate-500">Pay courier upon arrival</span>
                </button>

              </div>
            </div>

            {/* Order Final Summary */}
            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 space-y-2 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Items Total ({items.length} items):</span>
                <span className="font-semibold text-slate-800">{formatAED(cartData.subtotal)}</span>
              </div>
              {cartData.discount > 0 && (
                <div className="flex justify-between text-emerald-600 font-semibold">
                  <span>Promotional Discount:</span>
                  <span>-{formatAED(cartData.discount)}</span>
                </div>
              )}
              <div className="flex justify-between text-slate-600">
                <span>Delivery:</span>
                <span className="font-semibold text-slate-800">
                  {cartData.shippingFee === 0 ? 'FREE' : formatAED(cartData.shippingFee)}
                </span>
              </div>
              <div className="flex justify-between items-baseline pt-2 border-t border-slate-200 text-slate-900 font-extrabold text-sm">
                <span>Total Amount to Pay:</span>
                <span className="text-blue-600 text-base font-['Space_Grotesk']">{formatAED(cartData.total)}</span>
              </div>
            </div>

            {/* Submit Button */}
            <button
              id="confirm-place-order-btn"
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-lg shadow-blue-600/30 active:scale-98 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isSubmitting ? (
                <span>Securing your order...</span>
              ) : (
                <>
                  <span>Place Order • {formatAED(cartData.total)}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

          </form>
        )}

      </div>
    </div>
  );
};
