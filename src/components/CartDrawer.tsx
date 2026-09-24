import React from 'react';
import { X, Trash2, ArrowRight, ShoppingBag, MessageCircle } from 'lucide-react';
import { formatKSh, STANDARD_SIZES } from '../config/store';
import { useCart } from '../context/CartContext';
import { JerseySize } from '../types';
import { JerseyImage } from './JerseyImage';

export const CartDrawer: React.FC = () => {
  const {
    items,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    updateSize,
    clearCart,
    subtotal,
    itemCount,
    setIsCheckoutOpen,
  } = useCart();

  if (!isCartOpen) return null;

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-neutral-950/80 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-neutral-900 border-l border-neutral-800 text-neutral-100 flex flex-col shadow-2xl">
          {/* Cart Header */}
          <div className="p-4 sm:p-6 border-b border-neutral-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-lime-400" />
              <h2 className="text-lg font-bold text-white font-display">
                Shopping Bag ({itemCount})
              </h2>
            </div>
            <div className="flex items-center gap-3">
              {items.length > 0 && (
                <button
                  onClick={clearCart}
                  className="text-xs text-neutral-400 hover:text-red-400 transition-colors"
                >
                  Clear Bag
                </button>
              )}
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors"
                aria-label="Close bag"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-neutral-950 border border-neutral-800 flex items-center justify-center text-neutral-400">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white mb-1">Your bag is empty</h3>
                  <p className="text-xs text-neutral-400 max-w-xs">
                    Explore our latest 24/25 football kits, retro classics, and training tops.
                  </p>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="px-6 py-2.5 bg-lime-400 hover:bg-lime-300 text-neutral-950 font-bold text-xs uppercase tracking-wider rounded-lg transition-transform active:scale-95 cursor-pointer"
                >
                  Explore Jerseys
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={`${item.product.id}-${item.size}`}
                  className="flex gap-3.5 p-3 bg-neutral-950/70 border border-neutral-800/80 rounded-xl"
                >
                  {/* Image */}
                  <div className="w-20 h-20 bg-neutral-900 rounded-lg overflow-hidden shrink-0">
                    <JerseyImage
                      src={item.product.image}
                      alt={item.product.name}
                      category={item.product.category}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-xs sm:text-sm font-bold text-white line-clamp-1">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.product.id, item.size)}
                          className="text-neutral-400 hover:text-red-400 transition-colors p-1"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Size Selector in Cart */}
                      <div className="flex items-center gap-2 mt-1 text-xs text-neutral-400">
                        <span>Size:</span>
                        <select
                          value={item.size}
                          onChange={(e) =>
                            updateSize(item.product.id, item.size, e.target.value as JerseySize)
                          }
                          className="bg-neutral-900 border border-neutral-700 rounded px-1.5 py-0.5 text-xs text-lime-400 font-bold focus:outline-none cursor-pointer"
                        >
                          {STANDARD_SIZES.map((sz) => (
                            <option key={sz} value={sz} className="bg-neutral-900 text-white">
                              {sz}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Price & Quantity Stepper */}
                    <div className="flex items-center justify-between mt-2 pt-1 border-t border-neutral-800/50">
                      <span className="text-xs sm:text-sm font-bold text-white tabular-nums">
                        {formatKSh(item.product.price * item.quantity)}
                      </span>

                      <div className="flex items-center bg-neutral-900 border border-neutral-700 rounded">
                        <button
                          onClick={() =>
                            updateQuantity(item.product.id, item.size, item.quantity - 1)
                          }
                          className="px-2 py-0.5 text-neutral-400 hover:text-white transition-colors"
                        >
                          -
                        </button>
                        <span className="px-2 text-xs font-semibold tabular-nums text-white">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.product.id, item.size, item.quantity + 1)
                          }
                          className="px-2 py-0.5 text-neutral-400 hover:text-white transition-colors"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Cart Footer */}
          {items.length > 0 && (
            <div className="p-4 sm:p-6 border-t border-neutral-800 bg-neutral-950/60 space-y-4">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-neutral-400">
                  <span>Subtotal</span>
                  <span className="tabular-nums font-semibold text-white">
                    {formatKSh(subtotal)}
                  </span>
                </div>
                <div className="flex justify-between text-neutral-400">
                  <span>Delivery in Kenya</span>
                  <span className="text-lime-400 font-medium">Calculated at checkout</span>
                </div>
                <div className="flex justify-between text-sm sm:text-base font-bold text-white pt-2 border-t border-neutral-800">
                  <span>Estimated Total</span>
                  <span className="tabular-nums text-lime-400">{formatKSh(subtotal)}</span>
                </div>
              </div>

              <div className="space-y-2">
                <button
                  onClick={handleProceedToCheckout}
                  className="w-full py-3.5 bg-lime-400 hover:bg-lime-300 text-neutral-950 font-extrabold text-xs uppercase tracking-wider rounded-lg transition-transform active:scale-95 flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-lime-400/20"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <p className="text-[11px] text-center text-neutral-400">
                  Delivery available across Kenya · M-Pesa & Cash on Delivery
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
