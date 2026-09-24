import React, { useState } from 'react';
import { X, ShoppingBag, ArrowRight, ShieldCheck, Truck, Check, Heart, CheckCircle2, AlertCircle, Info } from 'lucide-react';
import { formatKSh } from '../config/store';
import { useCart } from '../context/CartContext';
import { JerseySize, Product } from '../types';
import { JerseyImage } from './JerseyImage';

interface ProductDetailsModalProps {
  product: Product;
  onClose: () => void;
}

export const ProductDetailsModal: React.FC<ProductDetailsModalProps> = ({ product, onClose }) => {
  const { addToCart, setIsCheckoutOpen, toggleWishlist, isInWishlist } = useCart();
  const wishlisted = isInWishlist(product.id);
  const [selectedSize, setSelectedSize] = useState<JerseySize>(
    product.sizes.includes('M') ? 'M' : product.sizes[0]
  );
  const [quantity, setQuantity] = useState(1);
  const [addedAnimation, setAddedAnimation] = useState(false);

  const handleAddToCart = () => {
    addToCart(product, selectedSize, quantity);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1200);
  };

  const handleBuyNow = () => {
    addToCart(product, selectedSize, quantity);
    onClose();
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-neutral-950/85 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-4xl bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden shadow-2xl z-10 my-auto text-neutral-100 max-h-[92vh] flex flex-col md:flex-row">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 text-neutral-400 hover:text-white bg-neutral-950/60 hover:bg-neutral-800 rounded-full transition-colors cursor-pointer"
          aria-label="Close details"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left: Product Image */}
        <div className="relative w-full md:w-1/2 aspect-square md:aspect-auto md:min-h-[480px] bg-neutral-950 overflow-hidden shrink-0 flex items-center justify-center p-2 sm:p-4">
          <JerseyImage
            src={product.image}
            alt={product.name}
            club={product.club}
            season={product.season || product.year}
            type={product.type}
            color={product.color}
            imageVerified={product.imageVerified}
            aspectRatioClass="aspect-square md:aspect-auto h-full"
            className="w-full h-full object-cover"
            priority={true}
          />
          {product.isNewDrop && (
            <div className="absolute top-4 left-4 bg-lime-400 text-neutral-950 px-2.5 py-1 rounded text-xs font-bold uppercase tracking-wider z-10">
              New Season Drop
            </div>
          )}
          {product.category === 'retro' && (
            <div className="absolute top-4 left-4 bg-amber-400 text-neutral-950 px-2.5 py-1 rounded text-xs font-bold uppercase tracking-wider z-10">
              Retro Classic {product.season || product.year}
            </div>
          )}
        </div>

        {/* Right: Product Info & Actions */}
        <div className="p-6 md:p-8 flex flex-col justify-between flex-1 overflow-y-auto max-h-[85vh]">
          <div>
            {/* Structured Club, Season, and Type Badges */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono uppercase tracking-wider mb-2">
              <span className="text-lime-400 font-bold bg-lime-950/60 px-2 py-0.5 rounded border border-lime-800/40">
                {product.club}
              </span>
              <span className="text-neutral-300 font-semibold bg-neutral-800 px-2 py-0.5 rounded">
                Season {product.season || product.year}
              </span>
              <span className="text-neutral-400 bg-neutral-800/60 px-2 py-0.5 rounded">
                {product.type} Kit
              </span>
            </div>

            {/* Product Title */}
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display leading-tight mb-2">
              {product.name}
            </h2>

            {/* Price Row */}
            <div className="flex items-baseline gap-3 mb-4 pb-3 border-b border-neutral-800">
              <span className="text-2xl sm:text-3xl font-black text-white tabular-nums">
                {formatKSh(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-sm sm:text-base text-neutral-400 line-through tabular-nums">
                  {formatKSh(product.originalPrice)}
                </span>
              )}
              <span className="text-xs text-emerald-400 font-semibold bg-emerald-950/60 border border-emerald-800/40 px-2 py-0.5 rounded">
                In Stock · Nairobi CBD
              </span>
            </div>

            {/* Exact Match Verification Panel */}
            <div className="mb-5 p-3.5 rounded-xl border text-xs leading-relaxed space-y-2 bg-neutral-950/80 border-neutral-800">
              <div className="flex items-center justify-between">
                <span className="font-mono uppercase tracking-wider font-semibold text-neutral-400 text-[11px]">
                  Jersey Verification Audit
                </span>
                {product.imageVerified ? (
                  <span className="inline-flex items-center gap-1 text-emerald-400 font-bold text-[11px]">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Exact Image Match
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-amber-400 font-bold text-[11px]">
                    <AlertCircle className="w-3.5 h-3.5" />
                    Studio Shot Pending
                  </span>
                )}
              </div>

              {product.imageVerified ? (
                <div className="space-y-1.5 pt-1 text-neutral-300 text-[11px]">
                  <p className="text-neutral-300">
                    {product.verificationDetails?.designSummary || 'Verified authentic photo corresponding exactly to the club, season, and edition.'}
                  </p>
                  {product.verificationDetails?.verifiedFeatures && (
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-neutral-400 text-[10px]">
                      {product.verificationDetails.verifiedFeatures.map((feat, idx) => (
                        <li key={idx} className="flex items-center gap-1.5">
                          <span className="text-emerald-400">•</span>
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ) : (
                <div className="pt-1 text-neutral-400 text-[11px] space-y-1">
                  <p className="text-amber-300/90 font-medium">
                    kitszn.ke policy: We never display wrong-season or generic stock photos.
                  </p>
                  <p>
                    Physical stock is available in our Nairobi store. Official studio photography is scheduled for catalog upload.
                  </p>
                </div>
              )}

              {/* Structured specifications breakdown */}
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-neutral-850 text-[11px] font-mono">
                <div>
                  <span className="text-neutral-500">Colorway: </span>
                  <span className="text-neutral-300">{product.color}</span>
                </div>
                {product.manufacturer && (
                  <div>
                    <span className="text-neutral-500">Maker: </span>
                    <span className="text-neutral-300">{product.manufacturer}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed mb-5">
              {product.description}
            </p>

            {/* Size Selector */}
            <div className="mb-5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-neutral-300">
                  Select Size
                </span>
                <span className="text-xs text-neutral-400">Regular athletic fit</span>
              </div>
              <div className="grid grid-cols-5 gap-2">
                {product.sizes.map((size) => {
                  const isSelected = selectedSize === size;
                  return (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`py-2 text-xs font-bold uppercase rounded-lg border transition-all cursor-pointer ${
                        isSelected
                          ? 'border-lime-400 bg-lime-400 text-neutral-950 shadow-md'
                          : 'border-neutral-800 bg-neutral-950 text-neutral-300 hover:border-neutral-700 hover:text-white'
                      }`}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quantity Stepper */}
            <div className="flex items-center gap-4 mb-6">
              <span className="text-xs font-semibold uppercase tracking-wider text-neutral-300">
                Quantity
              </span>
              <div className="flex items-center bg-neutral-950 border border-neutral-800 rounded-lg overflow-hidden">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-3 py-1 text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer"
                >
                  -
                </button>
                <span className="px-4 py-1 text-sm font-semibold tabular-nums text-white">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="px-3 py-1 text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 pt-3 border-t border-neutral-800">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={handleAddToCart}
                className={`py-3 px-4 rounded-lg font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  addedAnimation
                    ? 'bg-emerald-500 text-white'
                    : 'bg-neutral-800 hover:bg-neutral-700 text-white border border-neutral-700'
                }`}
              >
                {addedAnimation ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Added to Bag!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Bag</span>
                  </>
                )}
              </button>

              <button
                onClick={handleBuyNow}
                className="py-3 px-4 bg-lime-400 hover:bg-lime-300 text-neutral-950 font-extrabold text-xs uppercase tracking-wider rounded-lg transition-transform active:scale-95 flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-lime-400/20"
              >
                <span>Buy Now (Checkout)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Wishlist quick toggle button */}
            <button
              onClick={() => toggleWishlist(product)}
              className={`w-full py-2 px-4 rounded-lg border text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer ${
                wishlisted
                  ? 'border-pink-500/50 bg-pink-950/20 text-pink-400'
                  : 'border-neutral-800 bg-neutral-950 text-neutral-300 hover:text-white hover:border-neutral-700'
              }`}
            >
              <Heart className={`w-4 h-4 ${wishlisted ? 'fill-pink-500 text-pink-500' : ''}`} />
              <span>{wishlisted ? 'Saved in Your Wishlist' : 'Add to Wishlist'}</span>
            </button>

            {/* Trust Markers */}
            <div className="flex items-center justify-between text-[11px] text-neutral-400 pt-1">
              <div className="flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5 text-lime-400" />
                <span>Delivery across Kenya</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-lime-400" />
                <span>M-Pesa / Cash on Delivery</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
