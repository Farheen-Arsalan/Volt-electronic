import React, { useEffect } from 'react';
import { CheckCircle2, Heart, ShoppingBag, Info, X } from 'lucide-react';
import { ToastNotification } from '../types';

interface ToastProps {
  toasts: ToastNotification[];
  onDismiss: (id: string) => void;
}

export const Toast: React.FC<ToastProps> = ({ toasts, onDismiss }) => {
  useEffect(() => {
    if (toasts.length > 0) {
      const timer = setTimeout(() => {
        onDismiss(toasts[0].id);
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [toasts, onDismiss]);

  if (toasts.length === 0) return null;

  return (
    <div
      id="toast-container"
      className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none"
    >
      {toasts.map((toast) => {
        const getIcon = () => {
          switch (toast.type) {
            case 'cart':
              return <ShoppingBag className="w-5 h-5 text-cyan-400" />;
            case 'wishlist':
              return <Heart className="w-5 h-5 text-rose-400 fill-rose-400" />;
            case 'success':
              return <CheckCircle2 className="w-5 h-5 text-emerald-400" />;
            default:
              return <Info className="w-5 h-5 text-blue-400" />;
          }
        };

        return (
          <div
            key={toast.id}
            className="pointer-events-auto bg-[#0B132B] text-white p-3.5 sm:p-4 rounded-2xl shadow-2xl border border-blue-500/30 flex items-start gap-3 animate-in slide-in-from-bottom-5 duration-200"
          >
            <div className="p-2 rounded-xl bg-slate-800/90 border border-slate-700 flex-shrink-0">
              {getIcon()}
            </div>

            <div className="flex-1 min-w-0">
              <h5 className="text-xs font-bold text-white font-['Space_Grotesk']">
                {toast.title}
              </h5>
              <p className="text-[11px] text-slate-300 mt-0.5 line-clamp-2">
                {toast.message}
              </p>
            </div>

            <button
              type="button"
              onClick={() => onDismiss(toast.id)}
              className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors flex-shrink-0"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
