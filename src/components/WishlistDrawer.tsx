import React from 'react';
import { X, Heart, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { Product } from '../types';
import { formatAED } from '../utils/formatters';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistProducts: Product[];
  onRemoveWishlist: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlistProducts,
  onRemoveWishlist,
  onAddToCart,
  onSelectProduct,
}) => {
  if (!isOpen) return null;

  return (
    <div
      id="wishlist-drawer-backdrop"
      className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex justify-end animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        id="wishlist-drawer-panel"
        className="w-full max-w-md bg-white text-slate-900 h-full shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 bg-[#0B132B] text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-rose-600/30 border border-rose-500/40 text-rose-300">
              <Heart className="w-5 h-5 fill-rose-300" />
            </div>
            <div>
              <h3 className="text-base font-bold font-['Space_Grotesk']">Saved Items</h3>
              <p className="text-xs text-slate-300">
                {wishlistProducts.length} {wishlistProducts.length === 1 ? 'gadget' : 'gadgets'} saved
              </p>
            </div>
          </div>

          <button
            id="close-wishlist-btn"
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 divide-y divide-slate-100">
          {wishlistProducts.length > 0 ? (
            wishlistProducts.map((product) => (
              <div key={product.id} className="py-4 first:pt-0 last:pb-0 flex gap-3.5 items-center">
                <img
                  src={product.image}
                  alt={product.name}
                  referrerPolicy="no-referrer"
                  className="w-16 h-16 object-cover rounded-xl bg-slate-100 border border-slate-200 flex-shrink-0 cursor-pointer"
                  onClick={() => {
                    onSelectProduct(product);
                    onClose();
                  }}
                />

                <div className="flex-1 min-w-0">
                  <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">{product.brand}</span>
                  <h4
                    className="text-xs sm:text-sm font-bold text-slate-900 line-clamp-1 hover:text-blue-600 cursor-pointer"
                    onClick={() => {
                      onSelectProduct(product);
                      onClose();
                    }}
                  >
                    {product.name}
                  </h4>
                  <span className="text-xs font-bold text-slate-900 block mt-1">
                    {formatAED(product.price)}
                  </span>
                </div>

                <div className="flex flex-col gap-1.5 items-end">
                  <button
                    type="button"
                    onClick={() => {
                      onAddToCart(product);
                      onRemoveWishlist(product);
                    }}
                    className="p-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs flex items-center gap-1"
                    title="Move to Cart"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Move</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => onRemoveWishlist(product)}
                    className="text-slate-400 hover:text-rose-600 p-1 transition-colors text-xs"
                    title="Remove"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center p-8 space-y-4">
              <div className="w-16 h-16 rounded-full bg-rose-50 text-rose-400 flex items-center justify-center">
                <Heart className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">Your wishlist is empty</h3>
                <p className="text-xs text-slate-500 mt-1">
                  Tap the heart icon on any device to save it for later comparison.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        {wishlistProducts.length > 0 && (
          <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-200">
            <button
              type="button"
              onClick={() => {
                wishlistProducts.forEach((p) => onAddToCart(p));
                onClose();
              }}
              className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md transition-colors flex items-center justify-center gap-2"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Move All to Cart ({wishlistProducts.length} items)</span>
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
