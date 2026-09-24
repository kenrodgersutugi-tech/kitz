import React, { useState, useEffect } from 'react';
import { ShoppingBag, Menu, X, Instagram, Heart } from 'lucide-react';
import { INSTAGRAM_URL, STORE_NAME } from '../config/store';
import { useCart } from '../context/CartContext';
import { JerseyCategory } from '../types';

interface HeaderProps {
  activeCategory: JerseyCategory;
  onSelectCategory: (category: JerseyCategory) => void;
  onNavigateHome: () => void;
  onNavigateSection: (sectionId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeCategory,
  onSelectCategory,
  onNavigateHome,
  onNavigateSection,
}) => {
  const { itemCount, setIsCartOpen, wishlist, setIsWishlistOpen } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (category: JerseyCategory | 'home' | 'about' | 'delivery') => {
    setMobileMenuOpen(false);
    if (category === 'home') {
      onNavigateHome();
    } else if (category === 'about' || category === 'delivery') {
      onNavigateSection(category);
    } else {
      onSelectCategory(category);
      onNavigateSection('shop-section');
    }
  };

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-neutral-950/90 backdrop-blur-md border-b border-neutral-800/80 py-3 shadow-2xl'
            : 'bg-neutral-950/70 backdrop-blur-sm border-b border-neutral-900 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Zone 1: Single text element wordmark */}
            <button
              onClick={() => handleNavClick('home')}
              className="text-xl sm:text-2xl font-black tracking-tighter uppercase font-display text-white hover:text-lime-400 transition-colors focus-visible:outline-none cursor-pointer"
              aria-label="kitszn.ke Home"
            >
              {STORE_NAME}
            </button>

            {/* Zone 2: Navigation Links (Desktop) */}
            <nav className="hidden md:flex items-center gap-7 text-sm font-medium">
              <button
                onClick={() => handleNavClick('home')}
                className="text-neutral-300 hover:text-white transition-colors cursor-pointer"
              >
                Home
              </button>
              <button
                onClick={() => handleNavClick('all')}
                className={`transition-colors cursor-pointer ${
                  activeCategory === 'all' ? 'text-lime-400 font-semibold' : 'text-neutral-300 hover:text-white'
                }`}
              >
                Shop
              </button>
              <button
                onClick={() => handleNavClick('new-drops')}
                className={`transition-colors cursor-pointer ${
                  activeCategory === 'new-drops' ? 'text-lime-400 font-semibold' : 'text-neutral-300 hover:text-white'
                }`}
              >
                New Drops
              </button>
              <button
                onClick={() => handleNavClick('retro')}
                className={`transition-colors cursor-pointer ${
                  activeCategory === 'retro' ? 'text-lime-400 font-semibold' : 'text-neutral-300 hover:text-white'
                }`}
              >
                Retro
              </button>
              <button
                onClick={() => handleNavClick('training')}
                className={`transition-colors cursor-pointer ${
                  activeCategory === 'training' ? 'text-lime-400 font-semibold' : 'text-neutral-300 hover:text-white'
                }`}
              >
                Training
              </button>
            </nav>

            {/* Zone 3: Actions (Instagram + Wishlist + Bag + Mobile Toggle) */}
            <div className="flex items-center gap-1.5 sm:gap-3">
              {/* Instagram Link */}
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-neutral-400 hover:text-white transition-colors hover:scale-105 active:scale-95"
                title="Follow us on Instagram @kitszn.ke"
                aria-label="Instagram @kitszn.ke"
              >
                <Instagram className="w-5 h-5" />
              </a>

              {/* Wishlist Button */}
              <button
                onClick={() => setIsWishlistOpen(true)}
                className="relative p-2 text-neutral-300 hover:text-pink-400 transition-colors cursor-pointer flex items-center justify-center rounded-lg hover:bg-neutral-900 active:scale-95"
                title={`Saved wishlist (${wishlist.length} kits)`}
                aria-label={`Wishlist with ${wishlist.length} items`}
              >
                <Heart className={`w-5 h-5 ${wishlist.length > 0 ? 'text-pink-500 fill-pink-500' : ''}`} />
                {wishlist.length > 0 && (
                  <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 bg-pink-500 text-white font-bold text-[10px] rounded-full flex items-center justify-center tabular-nums">
                    {wishlist.length}
                  </span>
                )}
              </button>

              {/* Shopping Bag Button */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 text-neutral-200 hover:text-white transition-colors cursor-pointer flex items-center justify-center rounded-lg hover:bg-neutral-900 active:scale-95"
                aria-label={`Shopping bag with ${itemCount} items`}
              >
                <ShoppingBag className="w-5 h-5" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 min-w-[20px] h-[20px] px-1 bg-lime-400 text-neutral-950 font-bold text-xs rounded-full flex items-center justify-center tabular-nums animate-pulse">
                    {itemCount}
                  </span>
                )}
              </button>

              {/* Mobile Hamburger Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 text-neutral-300 hover:text-white rounded-lg hover:bg-neutral-900 transition-colors"
                aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-[60px] z-30 bg-neutral-950/98 backdrop-blur-xl md:hidden border-b border-neutral-800 transition-all flex flex-col justify-between p-6">
          <div className="flex flex-col space-y-4 pt-2">
            <button
              onClick={() => handleNavClick('home')}
              className="text-left text-xl font-bold text-neutral-100 hover:text-lime-400 transition-colors py-2 border-b border-neutral-900"
            >
              Home
            </button>
            <button
              onClick={() => handleNavClick('all')}
              className="text-left text-xl font-bold text-neutral-100 hover:text-lime-400 transition-colors py-2 border-b border-neutral-900 flex items-center justify-between"
            >
              <span>Shop All Jerseys</span>
              <span className="text-xs text-neutral-500 font-normal">KSh 800 - 1,000</span>
            </button>
            <button
              onClick={() => handleNavClick('new-drops')}
              className="text-left text-xl font-bold text-neutral-100 hover:text-lime-400 transition-colors py-2 border-b border-neutral-900 flex items-center justify-between"
            >
              <span>New Drops</span>
              <span className="text-xs text-lime-400 font-mono uppercase tracking-wider">Fresh Season</span>
            </button>
            <button
              onClick={() => handleNavClick('retro')}
              className="text-left text-xl font-bold text-neutral-100 hover:text-lime-400 transition-colors py-2 border-b border-neutral-900 flex items-center justify-between"
            >
              <span>Retro Classics</span>
              <span className="text-xs text-neutral-500 font-mono">1998 - 2006</span>
            </button>
            <button
              onClick={() => handleNavClick('training')}
              className="text-left text-xl font-bold text-neutral-100 hover:text-lime-400 transition-colors py-2 border-b border-neutral-900 flex items-center justify-between"
            >
              <span>Training Gear</span>
              <span className="text-xs text-neutral-500">Drills & Lifestyle</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setIsWishlistOpen(true);
              }}
              className="text-left text-lg font-bold text-pink-400 hover:text-pink-300 transition-colors py-2 border-b border-neutral-900 flex items-center justify-between"
            >
              <span className="flex items-center gap-2">
                <Heart className="w-4 h-4 fill-pink-500" />
                <span>My Wishlist</span>
              </span>
              <span className="text-xs text-neutral-400">{wishlist.length} saved</span>
            </button>
            <button
              onClick={() => handleNavClick('delivery')}
              className="text-left text-base text-neutral-400 hover:text-white transition-colors py-2"
            >
              Delivery Across Kenya
            </button>
            <button
              onClick={() => handleNavClick('about')}
              className="text-left text-base text-neutral-400 hover:text-white transition-colors py-2"
            >
              About kitszn.ke
            </button>
          </div>

          <div className="pt-6 border-t border-neutral-900 flex flex-col gap-4">
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-3 px-4 bg-neutral-900 text-neutral-200 hover:text-white rounded-lg text-sm font-semibold transition-colors"
            >
              <Instagram className="w-4 h-4 text-pink-400" />
              <span>Follow @kitszn.ke on Instagram</span>
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setIsCartOpen(true);
              }}
              className="w-full py-3.5 bg-lime-400 hover:bg-lime-300 text-neutral-950 font-bold rounded-lg text-sm flex items-center justify-center gap-2 transition-transform active:scale-95"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>View Shopping Bag ({itemCount})</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

