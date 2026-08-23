import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  ArrowRight, 
  Truck, 
  ShieldCheck, 
  Tag, 
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { CartItem } from '../types';
import { formatAED } from '../utils/formatters';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
  onProceedToCheckout: (cartData: {
    subtotal: number;
    discount: number;
    shippingFee: number;
    total: number;
    promoCode: string;
    shippingType: 'standard' | 'express';
  }) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onProceedToCheckout,
}) => {
  const [promoCodeInput, setPromoCodeInput] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<{ code: string; discountPercent: number; discountFixed: number } | null>(null);
  const [promoError, setPromoError] = useState('');
  const [shippingType, setShippingType] = useState<'standard' | 'express'>('standard');

  if (!isOpen) return null;

  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  let discount = 0;
  if (appliedPromo) {
    if (appliedPromo.discountPercent > 0) {
      discount = Math.round((subtotal * appliedPromo.discountPercent) / 100);
    } else if (appliedPromo.discountFixed > 0) {
      discount = Math.min(subtotal, appliedPromo.discountFixed);
    }
  }

  const shippingFee = shippingType === 'express' ? 25 : subtotal > 200 ? 0 : 20;
  const total = Math.max(0, subtotal - discount + shippingFee);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError('');
    const code = promoCodeInput.trim().toUpperCase();

    if (code === 'DUBAI10') {
      setAppliedPromo({ code: 'DUBAI10', discountPercent: 10, discountFixed: 0 });
      setPromoCodeInput('');
    } else if (code === 'WELCOME50') {
      setAppliedPromo({ code: 'WELCOME50', discountPercent: 0, discountFixed: 50 });
      setPromoCodeInput('');
    } else {
      setPromoError('Invalid coupon code. Try "DUBAI10" for 10% off.');
    }
  };

  const handleCheckoutClick = () => {
    onProceedToCheckout({
      subtotal,
      discount,
      shippingFee,
      total,
      promoCode: appliedPromo?.code || '',
      shippingType,
    });
  };

  return (
    <div
      id="cart-drawer-backdrop"
      className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex justify-end animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        id="cart-drawer-panel"
        className="w-full max-w-md bg-white text-slate-900 h-full shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300 relative"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 bg-[#0B132B] text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-blue-600/30 border border-blue-500/40 text-cyan-300">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold font-['Space_Grotesk']">Your Cart</h2>
              <p className="text-xs text-slate-300">
                {items.length} {items.length === 1 ? 'item' : 'items'} in basket
              </p>
            </div>
          </div>

          <button
            id="close-cart-btn"
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            aria-label="Close cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Dubai Free Shipping Progress Bar */}
        <div className="bg-blue-50/80 px-4 py-2.5 border-b border-blue-100 text-xs">
          {subtotal >= 200 ? (
            <div className="flex items-center gap-1.5 text-emerald-700 font-semibold">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>You have unlocked <strong>Free Standard Delivery across UAE!</strong></span>
            </div>
          ) : (
            <div className="text-slate-700">
              Add <strong className="text-blue-600">{formatAED(200 - subtotal)}</strong> more for <strong>Free UAE Delivery</strong>!
            </div>
          )}
        </div>

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 divide-y divide-slate-100">
          {items.length > 0 ? (
            items.map((item) => (
              <div
                key={`${item.product.id}-${item.selectedColor || ''}`}
                className="py-4 first:pt-0 last:pb-0 flex gap-3.5 items-start group"
              >
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  referrerPolicy="no-referrer"
                  className="w-16 h-16 object-cover rounded-xl bg-slate-100 border border-slate-200 flex-shrink-0"
                />

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900 line-clamp-1">
                      {item.product.name}
                    </h4>
                    <button
                      type="button"
                      onClick={() => onRemoveItem(item.product.id)}
                      className="text-slate-400 hover:text-rose-600 p-1 transition-colors"
                      title="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {item.selectedColor && (
                    <span className="text-[11px] text-slate-500 font-medium block mt-0.5">
                      Finish: {item.selectedColor}
                    </span>
                  )}

                  <div className="flex items-center justify-between mt-2.5">
                    <span className="text-xs font-bold text-blue-600">
                      {formatAED(item.product.price * item.quantity)}
                    </span>

                    {/* Stepper */}
                    <div className="flex items-center gap-1.5 bg-slate-100 rounded-lg p-0.5 border border-slate-200">
                      <button
                        type="button"
                        onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                        className="p-1 rounded bg-white text-slate-700 hover:bg-slate-50 disabled:opacity-40"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-6 text-center text-xs font-bold font-mono">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                        disabled={item.quantity >= item.product.stockCount}
                        className="p-1 rounded bg-white text-slate-700 hover:bg-slate-50 disabled:opacity-40"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center p-8 space-y-4">
              <div className="w-20 h-20 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center">
                <ShoppingBag className="w-10 h-10" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">Your basket is empty</h3>
                <p className="text-xs text-slate-500 mt-1">
                  Browse our high-performance laptops, phones, and sound systems to add items.
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl bg-blue-600 text-white text-xs font-bold shadow-md hover:bg-blue-700 transition-colors"
              >
                Start Exploring
              </button>
            </div>
          )}
        </div>

        {/* Footer with Calculations, Delivery & Checkout */}
        {items.length > 0 && (
          <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-200 space-y-4">
            
            {/* Promo Code Input */}
            <form onSubmit={handleApplyPromo} className="space-y-1.5">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={promoCodeInput}
                    onChange={(e) => setPromoCodeInput(e.target.value)}
                    placeholder="Coupon code (e.g. DUBAI10)"
                    className="w-full bg-white text-xs rounded-xl px-3 py-2 border border-slate-300 focus:outline-none focus:ring-1 focus:ring-blue-500 uppercase font-mono"
                  />
                  <Tag className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
                <button
                  type="submit"
                  className="px-3.5 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-xl text-xs font-bold transition-colors"
                >
                  Apply
                </button>
              </div>
              {appliedPromo && (
                <div className="flex items-center justify-between text-[11px] text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                  <span>Coupon <strong>{appliedPromo.code}</strong> applied!</span>
                  <button
                    type="button"
                    onClick={() => setAppliedPromo(null)}
                    className="text-emerald-900 font-bold hover:underline"
                  >
                    Remove
                  </button>
                </div>
              )}
              {promoError && (
                <p className="text-[11px] text-rose-600">{promoError}</p>
              )}
            </form>

            {/* Delivery Method Options */}
            <div className="space-y-1.5">
              <span className="text-xs font-bold text-slate-700 block">Delivery Method:</span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setShippingType('standard')}
                  className={`p-2.5 rounded-xl border text-left text-xs transition-all ${
                    shippingType === 'standard'
                      ? 'bg-blue-50/80 border-blue-500 text-blue-900 ring-1 ring-blue-500'
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <span className="font-bold block">Standard UAE</span>
                  <span className="text-[10px] text-slate-500">1-2 Days • {subtotal >= 200 ? 'FREE' : 'AED 20'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setShippingType('express')}
                  className={`p-2.5 rounded-xl border text-left text-xs transition-all ${
                    shippingType === 'express'
                      ? 'bg-blue-50/80 border-blue-500 text-blue-900 ring-1 ring-blue-500'
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <span className="font-bold flex items-center gap-1">
                    Dubai 3-Hr VIP <Sparkles className="w-3 h-3 text-amber-500" />
                  </span>
                  <span className="text-[10px] text-slate-500">Same-Day • AED 25</span>
                </button>
              </div>
            </div>

            {/* Price Calculations */}
            <div className="space-y-1.5 text-xs text-slate-600 border-t border-slate-200 pt-3">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-slate-800">{formatAED(subtotal)}</span>
              </div>

              {discount > 0 && (
                <div className="flex justify-between text-emerald-600 font-semibold">
                  <span>Discount ({appliedPromo?.code})</span>
                  <span>-{formatAED(discount)}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Shipping ({shippingType === 'express' ? 'VIP Express Dubai' : 'Standard UAE'})</span>
                <span className="font-semibold text-slate-800">
                  {shippingFee === 0 ? <strong className="text-emerald-600">FREE</strong> : formatAED(shippingFee)}
                </span>
              </div>

              <div className="flex justify-between text-[11px] text-slate-400">
                <span>Includes 5% UAE VAT</span>
                <span>{formatAED(Math.round(total * 0.05))}</span>
              </div>

              <div className="flex justify-between items-baseline pt-2 border-t border-slate-300/80 text-slate-900 font-extrabold text-base">
                <span>Total Due</span>
                <span className="text-xl text-blue-600 font-['Space_Grotesk']">
                  {formatAED(total)}
                </span>
              </div>
            </div>

            {/* Checkout Action Button */}
            <button
              id="cart-proceed-checkout-btn"
              type="button"
              onClick={handleCheckoutClick}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-sm shadow-lg shadow-blue-600/30 active:scale-98 transition-all flex items-center justify-center gap-2"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

          </div>
        )}

      </div>
    </div>
  );
};
