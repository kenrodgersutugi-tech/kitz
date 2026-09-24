import React, { useState, useMemo } from 'react';
import { CartProvider, useCart } from './context/CartContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CategoryFilter } from './components/CategoryFilter';
import { ProductCard } from './components/ProductCard';
import { ProductDetailsModal } from './components/ProductDetailsModal';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderSuccessModal } from './components/OrderSuccessModal';
import { NewsletterSection } from './components/NewsletterSection';
import { AboutSection } from './components/AboutSection';
import { DeliverySection } from './components/DeliverySection';
import { Footer } from './components/Footer';
import { PRODUCTS, LOCAL_ASSETS } from './data/products';
import { JerseyCategory, Product } from './types';
import { Sparkles, History, Dumbbell, ArrowRight, Instagram, Check } from 'lucide-react';
import { INSTAGRAM_HANDLE, INSTAGRAM_URL, formatKSh } from './config/store';

const MainAppContent: React.FC = () => {
  const {
    selectedProductForDetails,
    setSelectedProductForDetails,
    toastMessage,
  } = useCart();

  const [activeCategory, setActiveCategory] = useState<JerseyCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');

  // Filtered and sorted products for main shop
  const filteredProducts = useMemo(() => {
    let list = [...PRODUCTS];

    // Category filter
    if (activeCategory !== 'all') {
      list = list.filter((p) => p.category === activeCategory);
    }

    // Search filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.team.toLowerCase().includes(q) ||
          (p.year && p.year.includes(q)) ||
          p.description.toLowerCase().includes(q)
      );
    }

    // Sorting
    switch (sortBy) {
      case 'price-asc':
        list.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        list.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        list.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'featured':
      default:
        // Prioritize best sellers and new drops
        list.sort((a, b) => {
          if (a.isBestSeller && !b.isBestSeller) return -1;
          if (!a.isBestSeller && b.isBestSeller) return 1;
          return 0;
        });
        break;
    }

    return list;
  }, [activeCategory, searchQuery, sortBy]);

  // Featured sections data
  const newDropsList = useMemo(() => PRODUCTS.filter((p) => p.category === 'new-drops').slice(0, 4), []);
  const retroList = useMemo(() => PRODUCTS.filter((p) => p.category === 'retro').slice(0, 4), []);
  const trainingList = useMemo(() => PRODUCTS.filter((p) => p.category === 'training').slice(0, 4), []);

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectCategory = (cat: JerseyCategory) => {
    setActiveCategory(cat);
    scrollToSection('shop-section');
  };

  const handleNavigateHome = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col font-sans selection:bg-lime-400 selection:text-black">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-neutral-900 border border-lime-400/80 text-white px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2.5 text-xs font-semibold animate-bounce">
          <div className="w-5 h-5 rounded-full bg-lime-400 text-neutral-950 flex items-center justify-center shrink-0">
            <Check className="w-3.5 h-3.5 stroke-[3]" />
          </div>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <Header
        activeCategory={activeCategory}
        onSelectCategory={handleSelectCategory}
        onNavigateHome={handleNavigateHome}
        onNavigateSection={scrollToSection}
      />

      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onShopClick={(cat) => {
            if (cat) setActiveCategory(cat);
            scrollToSection('shop-section');
          }}
        />

        {/* SECTION 1: NEW DROPS SHOWCASE */}
        <section id="new-drops" className="py-14 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-lime-400 mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>2024 / 2025 Collections</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-white font-display">
                NEW DROPS
              </h2>
              <p className="text-sm text-neutral-400 mt-1">
                Fresh kits. Fresh season. The latest club releases ready for dispatch.
              </p>
            </div>
            <button
              onClick={() => handleSelectCategory('new-drops')}
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-lime-400 hover:text-lime-300 transition-colors cursor-pointer group"
            >
              <span>View All New Drops</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {newDropsList.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onOpenDetails={setSelectedProductForDetails}
              />
            ))}
          </div>
        </section>

        {/* SECTION 2: RETRO VAULT SHOWCASE */}
        <section id="retro" className="py-14 sm:py-20 bg-neutral-900/30 border-y border-neutral-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
              <div>
                <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-400 mb-2">
                  <History className="w-3.5 h-3.5" />
                  <span>The Heritage Archives</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-white font-display">
                  RETRO CLASSICS
                </h2>
                <p className="text-sm text-neutral-400 mt-1">
                  Legendary moments and iconic football shirts that shaped football history.
                </p>
              </div>
              <button
                onClick={() => handleSelectCategory('retro')}
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400 hover:text-amber-300 transition-colors cursor-pointer group"
              >
                <span>Browse All Retro</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {retroList.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onOpenDetails={setSelectedProductForDetails}
                />
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 3: TRAINING & LIFESTYLE */}
        <section id="training" className="py-14 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-lime-400 mb-2">
                <Dumbbell className="w-3.5 h-3.5" />
                <span>Performance & Everyday Streetwear</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-white font-display">
                TRAINING TOPS
              </h2>
              <p className="text-sm text-neutral-400 mt-1">
                Moisture-absorbing drill jerseys built for the pitch, gym, and street.
              </p>
            </div>
            <button
              onClick={() => handleSelectCategory('training')}
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-lime-400 hover:text-lime-300 transition-colors cursor-pointer group"
            >
              <span>Explore Training Gear</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {trainingList.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onOpenDetails={setSelectedProductForDetails}
              />
            ))}
          </div>
        </section>

        {/* SECTION 4: COMPLETE CATALOGUE & BROWSE */}
        <section id="shop-section" className="py-16 sm:py-24 bg-neutral-900/20 border-t border-neutral-900 scroll-mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
              <span className="text-xs font-mono uppercase tracking-widest text-neutral-400 block mb-2">
                Full Collection
              </span>
              <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white font-display">
                THE CATALOGUE
              </h2>
              <p className="text-sm text-neutral-400 mt-1">
                All club jerseys, retro editions, and training tops. KSh 800 - 1,000 flat.
              </p>
            </div>

            {/* Filter and Search Bar */}
            <CategoryFilter
              activeCategory={activeCategory}
              onSelectCategory={setActiveCategory}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              sortBy={sortBy}
              onSortChange={setSortBy}
              totalResults={filteredProducts.length}
            />

            {/* Products Grid */}
            {filteredProducts.length === 0 ? (
              <div className="py-16 text-center bg-neutral-900/40 border border-neutral-800 rounded-2xl p-8">
                <p className="text-base font-bold text-white mb-2">No kits found matching your search</p>
                <p className="text-xs text-neutral-400 mb-6">
                  Try searching for another team (e.g. Arsenal, Real Madrid, United) or clear filters.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setActiveCategory('all');
                  }}
                  className="px-5 py-2.5 bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg text-xs font-semibold"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onOpenDetails={setSelectedProductForDetails}
                  />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* SECTION 5: INSTAGRAM COMMUNITY CALLOUT */}
        <section className="py-12 bg-neutral-950 border-t border-neutral-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-neutral-900 via-neutral-900 to-neutral-950 border border-neutral-800 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-2 text-center md:text-left">
                <div className="inline-flex items-center gap-2 text-xs font-mono text-pink-400 font-bold uppercase tracking-wider">
                  <Instagram className="w-4 h-4" />
                  <span>Join {INSTAGRAM_HANDLE}</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black uppercase text-white font-display">
                  TAG US IN YOUR MATCHDAY FIT
                </h3>
                <p className="text-xs sm:text-sm text-neutral-400 max-w-lg">
                  Follow us on Instagram for unboxing videos, restock drops, and styling tips from football fans in Kenya.
                </p>
              </div>

              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 bg-neutral-100 hover:bg-white text-neutral-950 font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg flex items-center gap-2 shrink-0 active:scale-95"
              >
                <Instagram className="w-4 h-4 text-pink-600" />
                <span>Follow on Instagram</span>
              </a>
            </div>
          </div>
        </section>

        {/* SECTION 6: DROP LIST NEWSLETTER */}
        <NewsletterSection />

        {/* SECTION 7: DELIVERY INFORMATION */}
        <DeliverySection />

        {/* SECTION 8: ABOUT KITSZN.KE */}
        <AboutSection />
      </main>

      {/* Footer */}
      <Footer
        onSelectCategory={handleSelectCategory}
        onNavigateSection={scrollToSection}
      />

      {/* Modals & Drawers */}
      <CartDrawer />
      <WishlistDrawer />
      <CheckoutModal />
      <OrderSuccessModal />
      {selectedProductForDetails && (
        <ProductDetailsModal
          product={selectedProductForDetails}
          onClose={() => setSelectedProductForDetails(null)}
        />
      )}
    </div>
  );
};

export default function App() {
  return (
    <CartProvider>
      <MainAppContent />
    </CartProvider>
  );
}
