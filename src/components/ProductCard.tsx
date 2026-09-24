import React from 'react';
import { ShoppingBag, Eye, Heart, CheckCircle2, Clock } from 'lucide-react';
import { formatKSh } from '../config/store';
import { useCart } from '../context/CartContext';
import { Product } from '../types';
import { JerseyImage } from './JerseyImage';

interface ProductCardProps {
  product: Product;
  onOpenDetails: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onOpenDetails }) => {
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const wishlisted = isInWishlist(product.id);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Default to 'L' or first size on quick add
    const defaultSize = product.sizes.includes('L') ? 'L' : product.sizes[0];
    addToCart(product, defaultSize, 1);
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product);
  };

  return (
    <div
      onClick={() => onOpenDetails(product)}
      className="group relative flex flex-col bg-neutral-900/70 border border-neutral-800/80 rounded-xl overflow-hidden hover:border-neutral-600 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer"
    >
      {/* Product Image Area */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-900">
        <JerseyImage
          src={product.image}
          alt={product.name}
          club={product.club}
          season={product.season || product.year}
          type={product.type}
          color={product.color}
          imageVerified={product.imageVerified}
          aspectRatioClass="aspect-[4/3]"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Minimal Unboxed Category / Drop Tag */}
        {product.isNewDrop && (
          <div className="absolute top-2.5 left-2.5 bg-neutral-950/85 backdrop-blur-sm border border-neutral-700/60 px-2 py-0.5 rounded text-[10px] font-bold text-lime-400 uppercase tracking-widest z-10">
            New Drop
          </div>
        )}
        {product.category === 'retro' && (
          <div className="absolute top-2.5 left-2.5 bg-neutral-950/85 backdrop-blur-sm border border-neutral-700/60 px-2 py-0.5 rounded text-[10px] font-bold text-amber-300 uppercase tracking-widest z-10">
            Classic {product.season || product.year || 'Retro'}
          </div>
        )}

        {/* Wishlist Button */}
        <button
          onClick={handleWishlistToggle}
          className={`absolute top-2.5 right-2.5 z-20 p-2 rounded-full backdrop-blur-md transition-all active:scale-90 ${
            wishlisted
              ? 'bg-neutral-950/90 text-pink-500 shadow-md'
              : 'bg-neutral-950/60 text-neutral-400 hover:text-white hover:bg-neutral-900'
          }`}
          title={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart className={`w-3.5 h-3.5 ${wishlisted ? 'fill-pink-500' : ''}`} />
        </button>

        {/* Quick View Overlay icon on desktop hover */}
        <div className="absolute inset-0 bg-neutral-950/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
          <span className="p-2.5 bg-neutral-900/90 text-white rounded-full shadow-lg border border-neutral-700 flex items-center gap-1.5 text-xs font-semibold">
            <Eye className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">View Details</span>
          </span>
        </div>
      </div>

      {/* Product Information */}
      <div className="p-3.5 sm:p-4 flex flex-col flex-1 justify-between gap-3">
        <div>
          {/* Club / Season Structured Tagline */}
          <div className="flex items-center justify-between text-[11px] text-neutral-400 uppercase font-mono tracking-wider mb-1">
            <span className="font-semibold text-neutral-300">{product.club}</span>
            <span className="text-lime-400 font-bold">{product.season || product.year}</span>
          </div>

          {/* Product Name */}
          <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-lime-400 transition-colors line-clamp-1">
            {product.name}
          </h3>

          {/* Colorway & Verification State Line */}
          <div className="mt-1 flex items-center gap-1.5 text-[11px]">
            {product.imageVerified ? (
              <span className="inline-flex items-center gap-1 text-emerald-400 font-medium">
                <CheckCircle2 className="w-3 h-3 shrink-0" />
                <span>Verified Match ({product.type})</span>
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 text-amber-400/90 font-medium">
                <Clock className="w-3 h-3 shrink-0" />
                <span>Awaiting Studio Photo</span>
              </span>
            )}
            <span className="text-neutral-600">•</span>
            <span className="text-neutral-400 line-clamp-1 truncate max-w-[130px]" title={product.color}>
              {product.color}
            </span>
          </div>
        </div>

        {/* Price & Action Row */}
        <div className="pt-2 border-t border-neutral-800/80 flex items-center justify-between gap-2">
          <div>
            <div className="text-base sm:text-lg font-black text-white tabular-nums">
              {formatKSh(product.price)}
            </div>
            {product.originalPrice && (
              <div className="text-[11px] text-neutral-400 line-through tabular-nums">
                {formatKSh(product.originalPrice)}
              </div>
            )}
          </div>

          {/* Add to Bag Button */}
          <button
            onClick={handleQuickAdd}
            className="p-2 sm:px-3 sm:py-2 bg-neutral-800 hover:bg-lime-400 text-neutral-200 hover:text-neutral-950 font-semibold text-xs rounded-lg transition-colors flex items-center gap-1.5 active:scale-95 cursor-pointer"
            title="Add size L to bag (click card for all sizes)"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Add</span>
          </button>
        </div>
      </div>
    </div>
  );
};
