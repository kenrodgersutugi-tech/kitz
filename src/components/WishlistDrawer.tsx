import React, { useState } from 'react';
import { X, Heart, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { formatKSh, STANDARD_SIZES } from '../config/store';
import { useCart } from '../context/CartContext';
import { JerseySize } from '../types';
import { JerseyImage } from './JerseyImage';

export const WishlistDrawer: React.FC = () => {
  const {
    wishlist,
    isWishlistOpen,
    setIsWishlistOpen,
    removeFromWishlist,
    moveToCartFromWishlist,
    clearWishlist,
    setIsCartOpen,
  } = useCart();

  // Selected size for each item before moving to cart
  const [selectedSizes, setSelectedSizes] = useState<{ [productId: string]: JerseySize }>({});

  if (!isWishlistOpen) return null;

  const handleSizeChange = (productId: string, size: JerseySize) => {
    setSelectedSizes((prev) => ({ ...prev, [productId]: size }));
  };

  const handleMoveToCart = (product: typeof wishlist[0]) => {
    const size = selectedSizes[product.id] || (product.sizes.includes('M') ? 'M' : product.sizes[0]);
    moveToCartFromWishlist(product, size);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-neutral-950/80 backdrop-blur-sm transition-opacity"
        onClick={() => setIsWishlistOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-neutral-900 border-l border-neutral-800 text-neutral-100 flex flex-col shadow-2xl">
          {/* Wishlist Header */}
          <div className="p-4 sm:p-6 border-b border-neutral-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-pink-500 fill-pink-500" />
              <h2 className="text-lg font-bold text-white font-display">
                Wishlist ({wishlist.length})
              </h2>
            </div>
            <div className="flex items-center gap-3">
              {wishlist.length > 0 && (
                <button
                  onClick={clearWishlist}
                  className="text-xs text-neutral-400 hover:text-red-400 transition-colors"
                >
                  Clear All
                </button>
              )}
              <button
                onClick={() => setIsWishlistOpen(false)}
                className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors"
                aria-label="Close wishlist"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Wishlist Items List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
            {wishlist.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-neutral-950 border border-neutral-800 flex items-center justify-center text-neutral-500">
                  <Heart className="w-8 h-8 stroke-[1.5]" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white mb-1">Your wishlist is empty</h3>
                  <p className="text-xs text-neutral-400 max-w-xs">
                    Tap the heart icon on any football kit to save it for later or compare styles.
                  </p>
                </div>
                <button
                  onClick={() => setIsWishlistOpen(false)}
                  className="px-6 py-2.5 bg-lime-400 hover:bg-lime-300 text-neutral-950 font-bold text-xs uppercase tracking-wider rounded-lg transition-transform active:scale-95 cursor-pointer"
                >
                  Browse Kits
                </button>
              </div>
            ) : (
              wishlist.map((product) => {
                const currentSize =
                  selectedSizes[product.id] || (product.sizes.includes('M') ? 'M' : product.sizes[0]);

                return (
                  <div
                    key={product.id}
                    className="flex gap-3.5 p-3.5 bg-neutral-950/70 border border-neutral-800/80 rounded-xl"
                  >
                    {/* Jersey Image */}
                    <div className="w-20 h-20 bg-neutral-900 rounded-lg overflow-hidden shrink-0">
                      <JerseyImage
                        src={product.image}
                        alt={product.name}
                        category={product.category}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Jersey Info */}
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-1">
                          <div>
                            <span className="text-[10px] font-mono uppercase tracking-wider text-lime-400 block">
                              {product.team}
                            </span>
                            <h4 className="text-xs sm:text-sm font-bold text-white line-clamp-1">
                              {product.name}
                            </h4>
                          </div>
                          <button
                            onClick={() => removeFromWishlist(product.id)}
                            className="text-neutral-500 hover:text-red-400 transition-colors p-1"
                            title="Remove from wishlist"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <div className="text-xs font-black text-white tabular-nums mt-1">
                          {formatKSh(product.price)}
                        </div>
                      </div>

                      {/* Size picker & Move to Cart */}
                      <div className="flex items-center gap-2 mt-2 pt-2 border-t border-neutral-800/60">
                        <select
                          value={currentSize}
                          onChange={(e) =>
                            handleSizeChange(product.id, e.target.value as JerseySize)
                          }
                          className="bg-neutral-900 border border-neutral-700 rounded px-2 py-1 text-xs text-neutral-200 font-medium focus:outline-none cursor-pointer"
                        >
                          {STANDARD_SIZES.map((sz) => (
                            <option key={sz} value={sz} className="bg-neutral-900 text-white">
                              Size {sz}
                            </option>
                          ))}
                        </select>

                        <button
                          onClick={() => handleMoveToCart(product)}
                          className="flex-1 py-1.5 px-2.5 bg-lime-400 hover:bg-lime-300 text-neutral-950 font-bold text-xs rounded transition-transform active:scale-95 flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <ShoppingBag className="w-3 h-3" />
                          <span>Move to Bag</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer of Wishlist */}
          {wishlist.length > 0 && (
            <div className="p-4 sm:p-6 border-t border-neutral-800 bg-neutral-950/60">
              <button
                onClick={() => {
                  // Move all items to cart
                  wishlist.forEach((p) => {
                    const size = selectedSizes[p.id] || (p.sizes.includes('M') ? 'M' : p.sizes[0]);
                    moveToCartFromWishlist(p, size);
                  });
                  setIsWishlistOpen(false);
                  setIsCartOpen(true);
                }}
                className="w-full py-3.5 bg-lime-400 hover:bg-lime-300 text-neutral-950 font-extrabold text-xs uppercase tracking-wider rounded-lg transition-transform active:scale-95 flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-lime-400/20"
              >
                <span>Move All ({wishlist.length}) to Bag</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
