import React, { useState } from 'react';
import { Instagram, MessageCircle, ArrowUp, Mail, CheckCircle2, Heart } from 'lucide-react';
import { INSTAGRAM_URL, INSTAGRAM_HANDLE, STORE_NAME, STORE_TAGLINE, WHATSAPP_DISPLAY, WHATSAPP_NUMBER } from '../config/store';
import { useCart } from '../context/CartContext';
import { JerseyCategory } from '../types';

interface FooterProps {
  onSelectCategory: (category: JerseyCategory) => void;
  onNavigateSection: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectCategory, onNavigateSection }) => {
  const { subscribeNewsletter, setIsWishlistOpen, wishlist } = useCart();
  const [email, setEmail] = useState('');
  const [feedback, setFeedback] = useState<{ type: 'idle' | 'success' | 'error'; message: string }>({
    type: 'idle',
    message: '',
  });

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCategoryClick = (cat: JerseyCategory) => {
    onSelectCategory(cat);
    onNavigateSection('shop-section');
  };

  const handleFooterSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    const res = subscribeNewsletter(email);
    if (res.success) {
      setFeedback({ type: 'success', message: res.message });
      setEmail('');
    } else {
      setFeedback({ type: 'error', message: res.message });
    }
  };

  return (
    <footer className="bg-neutral-950 border-t border-neutral-900 text-neutral-400 py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
          {/* Brand Info */}
          <div className="md:col-span-4 space-y-4">
            <h3 className="text-2xl font-black uppercase tracking-tight text-white font-display">
              {STORE_NAME}
            </h3>
            <p className="text-sm text-neutral-300 max-w-sm">
              {STORE_TAGLINE}
            </p>
            <p className="text-xs text-neutral-400 leading-relaxed max-w-md">
              Kenya’s premier online football jersey destination. Sourcing top-tier matchday, retro classics, and drill training gear at student and fan-friendly Kenyan prices (KSh 800 - 1,000).
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-pink-400 rounded-lg transition-colors"
                aria-label="Instagram @kitszn.ke"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-emerald-400 rounded-lg transition-colors"
                aria-label="WhatsApp orders"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
              <button
                onClick={() => setIsWishlistOpen(true)}
                className="p-2.5 bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-pink-400 rounded-lg transition-colors relative"
                aria-label="Open wishlist"
                title="Open Wishlist"
              >
                <Heart className={`w-5 h-5 ${wishlist.length > 0 ? 'text-pink-500 fill-pink-500' : ''}`} />
                {wishlist.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-pink-500 text-white font-bold text-[9px] rounded-full flex items-center justify-center">
                    {wishlist.length}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Collections */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-widest text-neutral-200">
              Collections
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => handleCategoryClick('all')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Shop All Jerseys
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategoryClick('new-drops')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  New Drops 24/25
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategoryClick('retro')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Retro Kits
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategoryClick('training')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Training Tops
                </button>
              </li>
            </ul>
          </div>

          {/* Customer Care & Social */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-widest text-neutral-200">
              Support & Social
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigateSection('delivery')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Delivery Across Kenya
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('about')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  About kitszn.ke
                </button>
              </li>
              <li>
                <button
                  onClick={() => setIsWishlistOpen(true)}
                  className="hover:text-pink-400 transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <Heart className="w-3.5 h-3.5 text-pink-500" />
                  <span>My Wishlist ({wishlist.length})</span>
                </button>
              </li>
              <li>
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Instagram {INSTAGRAM_HANDLE}
                </a>
              </li>
              <li>
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  WhatsApp: {WHATSAPP_DISPLAY}
                </a>
              </li>
            </ul>
          </div>

          {/* Quick Newsletter in Footer */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-widest text-neutral-200">
              Newsletter & Drops
            </h4>
            <p className="text-xs text-neutral-400">
              Subscribe for secret drops, restock alerts, and new kits before they sell out.
            </p>
            <form onSubmit={handleFooterSubscribe} className="space-y-2">
              <div className="flex gap-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address..."
                  className="flex-1 px-3 py-2 bg-neutral-900 border border-neutral-800 rounded-lg text-xs text-white placeholder:text-neutral-500 focus:outline-none focus:border-lime-400"
                />
                <button
                  type="submit"
                  className="px-3 py-2 bg-lime-400 hover:bg-lime-300 text-neutral-950 font-bold text-xs rounded-lg transition-transform active:scale-95 cursor-pointer shrink-0"
                >
                  Join
                </button>
              </div>

              {feedback.type === 'success' && (
                <div className="text-[11px] text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{feedback.message}</span>
                </div>
              )}
              {feedback.type === 'error' && (
                <div className="text-[11px] text-red-400">
                  {feedback.message}
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-400">
          <p>© 2026 {STORE_NAME}. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span>Prices strictly in Kenyan Shillings (KSh)</span>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 text-neutral-400 hover:text-white transition-colors cursor-pointer"
            >
              <span>Back to top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
