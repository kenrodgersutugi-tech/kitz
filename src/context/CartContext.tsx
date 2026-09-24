import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, JerseySize, NewsletterSubscriber, OrderReceipt, Product } from '../types';

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, size: JerseySize, quantity?: number) => void;
  removeFromCart: (productId: string, size: JerseySize) => void;
  updateQuantity: (productId: string, size: JerseySize, quantity: number) => void;
  updateSize: (productId: string, oldSize: JerseySize, newSize: JerseySize) => void;
  clearCart: () => void;
  subtotal: number;
  total: number;
  itemCount: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  selectedProductForDetails: Product | null;
  setSelectedProductForDetails: (product: Product | null) => void;
  lastReceipt: OrderReceipt | null;
  setLastReceipt: (receipt: OrderReceipt | null) => void;
  toastMessage: string | null;
  showToast: (msg: string) => void;

  // Wishlist
  wishlist: Product[];
  isWishlistOpen: boolean;
  setIsWishlistOpen: (open: boolean) => void;
  isInWishlist: (productId: string) => boolean;
  toggleWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  moveToCartFromWishlist: (product: Product, size: JerseySize) => void;
  clearWishlist: () => void;

  // Newsletter
  subscribers: NewsletterSubscriber[];
  subscribeNewsletter: (email: string) => { success: boolean; message: string };
}

const CART_STORAGE_KEY = 'kitszn_ke_cart_v1';
const WISHLIST_STORAGE_KEY = 'kitszn_ke_wishlist_v1';
const SUBSCRIBERS_STORAGE_KEY = 'kitszn_ke_subscribers_v1';

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Cart Items State
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Error loading cart from localStorage', e);
    }
    return [];
  });

  // Wishlist State
  const [wishlist, setWishlist] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem(WISHLIST_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Error loading wishlist from localStorage', e);
    }
    return [];
  });

  // Subscribers State
  const [subscribers, setSubscribers] = useState<NewsletterSubscriber[]>(() => {
    try {
      const saved = localStorage.getItem(SUBSCRIBERS_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Error loading subscribers from localStorage', e);
    }
    return [];
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedProductForDetails, setSelectedProductForDetails] = useState<Product | null>(null);
  const [lastReceipt, setLastReceipt] = useState<OrderReceipt | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Persist Cart
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.error('Error saving cart to localStorage', e);
    }
  }, [items]);

  // Persist Wishlist
  useEffect(() => {
    try {
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist));
    } catch (e) {
      console.error('Error saving wishlist to localStorage', e);
    }
  }, [wishlist]);

  // Persist Subscribers
  useEffect(() => {
    try {
      localStorage.setItem(SUBSCRIBERS_STORAGE_KEY, JSON.stringify(subscribers));
    } catch (e) {
      console.error('Error saving subscribers to localStorage', e);
    }
  }, [subscribers]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 2800);
  };

  const addToCart = (product: Product, size: JerseySize, quantity: number = 1) => {
    setItems((prevItems) => {
      const existingIndex = prevItems.findIndex(
        (item) => item.product.id === product.id && item.size === size
      );

      if (existingIndex > -1) {
        const updated = [...prevItems];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity,
        };
        return updated;
      } else {
        return [...prevItems, { product, size, quantity }];
      }
    });

    showToast(`Added ${product.name} (Size ${size}) to bag`);
  };

  const removeFromCart = (productId: string, size: JerseySize) => {
    setItems((prev) => prev.filter((item) => !(item.product.id === productId && item.size === size)));
  };

  const updateQuantity = (productId: string, size: JerseySize, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId, size);
      return;
    }
    setItems((prev) =>
      prev.map((item) => {
        if (item.product.id === productId && item.size === size) {
          return { ...item, quantity };
        }
        return item;
      })
    );
  };

  const updateSize = (productId: string, oldSize: JerseySize, newSize: JerseySize) => {
    if (oldSize === newSize) return;

    setItems((prev) => {
      const targetItem = prev.find((item) => item.product.id === productId && item.size === oldSize);
      if (!targetItem) return prev;

      const existingWithNewSizeIndex = prev.findIndex(
        (item) => item.product.id === productId && item.size === newSize
      );

      if (existingWithNewSizeIndex > -1) {
        return prev
          .filter((item) => !(item.product.id === productId && item.size === oldSize))
          .map((item, idx) => {
            if (idx === (existingWithNewSizeIndex > prev.findIndex(i => i.product.id === productId && i.size === oldSize) ? existingWithNewSizeIndex - 1 : existingWithNewSizeIndex)) {
              return { ...item, quantity: item.quantity + targetItem.quantity };
            }
            return item;
          });
      } else {
        return prev.map((item) => {
          if (item.product.id === productId && item.size === oldSize) {
            return { ...item, size: newSize };
          }
          return item;
        });
      }
    });
  };

  const clearCart = () => {
    setItems([]);
  };

  // Wishlist Functions
  const isInWishlist = (productId: string) => {
    return wishlist.some((item) => item.id === productId);
  };

  const toggleWishlist = (product: Product) => {
    if (isInWishlist(product.id)) {
      setWishlist((prev) => prev.filter((item) => item.id !== product.id));
      showToast(`Removed ${product.name} from wishlist`);
    } else {
      setWishlist((prev) => [...prev, product]);
      showToast(`Saved ${product.name} to wishlist`);
    }
  };

  const removeFromWishlist = (productId: string) => {
    setWishlist((prev) => prev.filter((item) => item.id !== productId));
  };

  const moveToCartFromWishlist = (product: Product, size: JerseySize) => {
    addToCart(product, size, 1);
    removeFromWishlist(product.id);
    showToast(`Moved ${product.name} to your bag`);
  };

  const clearWishlist = () => {
    setWishlist([]);
  };

  // Newsletter Subscription
  const subscribeNewsletter = (email: string) => {
    const trimmed = email.trim().toLowerCase();
    if (!trimmed || !trimmed.includes('@')) {
      return { success: false, message: 'Please enter a valid email address.' };
    }

    const alreadySubscribed = subscribers.some((s) => s.email.toLowerCase() === trimmed);
    if (alreadySubscribed) {
      return { success: true, message: 'You are already subscribed to the kitszn.ke VIP drop list!' };
    }

    const newSubscriber: NewsletterSubscriber = {
      email: trimmed,
      subscribedAt: new Date().toISOString(),
    };

    setSubscribers((prev) => [...prev, newSubscriber]);
    showToast('Subscribed to drop list! Check your inbox for secret drops.');
    return {
      success: true,
      message: 'Welcome to the kitszn.ke drop list! You will get priority access to 24/25 drops and retro vaults.',
    };
  };

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const total = subtotal;
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        updateSize,
        clearCart,
        subtotal,
        total,
        itemCount,
        isCartOpen,
        setIsCartOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        selectedProductForDetails,
        setSelectedProductForDetails,
        lastReceipt,
        setLastReceipt,
        toastMessage,
        showToast,
        wishlist,
        isWishlistOpen,
        setIsWishlistOpen,
        isInWishlist,
        toggleWishlist,
        removeFromWishlist,
        moveToCartFromWishlist,
        clearWishlist,
        subscribers,
        subscribeNewsletter,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
