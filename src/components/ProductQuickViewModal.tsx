import React, { useState } from 'react';
import { 
  X, 
  Star, 
  ShieldCheck, 
  Truck, 
  CheckCircle, 
  Zap, 
  Plus, 
  Minus, 
  Store,
  Share2
} from 'lucide-react';
import { Product } from '../types';
import { formatAED } from '../utils/formatters';

interface ProductQuickViewModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number, color?: string) => void;
}

export const ProductQuickViewModal: React.FC<ProductQuickViewModalProps> = ({
  product,
  onClose,
  onAddToCart,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState<string>(
    product?.colors?.[0] || 'Default'
  );

  if (!product) return null;

  const handleIncrement = () => {
    if (quantity < product.stockCount) {
      setQuantity((prev) => prev + 1);
    }
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleAdd = () => {
    onAddToCart(product, quantity, selectedColor);
    onClose();
  };

  return (
    <div
      id="product-quickview-backdrop"
      className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        id="product-quickview-modal"
        className="bg-white text-slate-900 rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl border border-slate-200 relative my-auto animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          id="close-quickview-btn"
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-slate-100/90 text-slate-600 hover:bg-slate-200 hover:text-slate-900 transition-colors"
          aria-label="Close product view"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          
          {/* Left Column: Image Container */}
          <div className="bg-slate-100 p-6 flex flex-col justify-between relative">
            
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-white border border-slate-200 shadow-inner flex items-center justify-center">
              <img
                src={product.image}
                alt={product.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />

              {product.badge && (
                <span className="absolute top-3 left-3 px-3 py-1 text-xs font-bold rounded-lg bg-blue-600 text-white shadow-md">
                  {product.badge}
                </span>
              )}
            </div>

            {/* Quick Dubai trust guarantee box */}
            <div className="mt-4 bg-white/90 backdrop-blur p-3.5 rounded-xl border border-slate-200/80 text-xs space-y-2">
              <div className="flex items-center gap-2 text-emerald-700 font-semibold">
                <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>{product.warranty}</span>
              </div>
              <div className="flex items-center gap-2 text-blue-700">
                <Truck className="w-4 h-4 text-blue-600 flex-shrink-0" />
                <span>Same-day doorstep delivery available across Dubai</span>
              </div>
              <div className="flex items-center gap-2 text-slate-600">
                <Store className="w-4 h-4 text-slate-500 flex-shrink-0" />
                <span>Downtown Showroom ready for pickup</span>
              </div>
            </div>

          </div>

          {/* Right Column: Specs & Buy Controls */}
          <div className="p-6 sm:p-8 flex flex-col justify-between max-h-[85vh] overflow-y-auto space-y-5">
            
            <div className="space-y-4">
              {/* Brand & Category */}
              <div className="flex items-center justify-between text-xs">
                <span className="font-extrabold text-blue-600 uppercase tracking-wider">{product.brand}</span>
                <span className="text-slate-400 font-mono">SKU: {product.sku}</span>
              </div>

              {/* Title */}
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight leading-snug">
                {product.name}
              </h2>

              {/* Ratings */}
              <div className="flex items-center gap-2 text-xs">
                <div className="flex items-center text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating) ? 'fill-amber-400' : 'text-slate-200 fill-slate-200'
                      }`}
                    />
                  ))}
                </div>
                <span className="font-bold text-slate-900">{product.rating}</span>
                <span className="text-slate-400">({product.reviewsCount} UAE Customer Reviews)</span>
              </div>

              {/* Pricing */}
              <div className="flex items-baseline gap-3 pt-2">
                <span className="text-3xl font-extrabold text-slate-900 font-['Space_Grotesk']">
                  {formatAED(product.price)}
                </span>
                {product.originalPrice && product.originalPrice > product.price && (
                  <span className="text-base text-slate-400 line-through">
                    {formatAED(product.originalPrice)}
                  </span>
                )}
                {product.discountPercent && (
                  <span className="px-2.5 py-1 text-xs font-bold bg-rose-100 text-rose-700 rounded-lg">
                    Save {product.discountPercent}%
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                {product.description}
              </p>

              {/* Color options if available */}
              {product.colors && product.colors.length > 0 && (
                <div className="space-y-2 pt-2">
                  <label className="text-xs font-bold text-slate-800">
                    Finish / Color: <span className="text-blue-600 font-normal">{selectedColor}</span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {product.colors.map((color) => (
                      <button
                        key={color}
                        type="button"
                        onClick={() => setSelectedColor(color)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                          selectedColor === color
                            ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                            : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Technical Specs List */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Key Specifications
                </h4>
                <div className="bg-slate-50 rounded-xl p-3 divide-y divide-slate-200/60 text-xs">
                  {Object.entries(product.specs).map(([key, val]) => (
                    <div key={key} className="py-1.5 flex justify-between gap-4">
                      <span className="text-slate-500 font-medium">{key}</span>
                      <span className="text-slate-800 font-semibold text-right">{val}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Quantity Selector & Add to Cart Button */}
            <div className="space-y-3 pt-4 border-t border-slate-200">
              
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700">Quantity</span>
                <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-xl border border-slate-200">
                  <button
                    type="button"
                    onClick={handleDecrement}
                    disabled={quantity <= 1}
                    className="p-1.5 rounded-lg bg-white text-slate-700 hover:bg-slate-50 disabled:opacity-40 transition-colors shadow-xs"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-8 text-center text-xs font-bold font-mono">{quantity}</span>
                  <button
                    type="button"
                    onClick={handleIncrement}
                    disabled={quantity >= product.stockCount}
                    className="p-1.5 rounded-lg bg-white text-slate-700 hover:bg-slate-50 disabled:opacity-40 transition-colors shadow-xs"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Total & Action */}
              <div className="flex items-center gap-3">
                <button
                  id="modal-add-to-cart-btn"
                  type="button"
                  onClick={handleAdd}
                  className="flex-1 py-3.5 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-lg shadow-blue-600/30 active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                  <Zap className="w-4 h-4 text-cyan-300" />
                  <span>Add {quantity} to Cart • {formatAED(product.price * quantity)}</span>
                </button>
              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
