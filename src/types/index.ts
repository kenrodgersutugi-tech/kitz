export type JerseyCategory = 'all' | 'new-drops' | 'retro' | 'training';

export type JerseySize = 'S' | 'M' | 'L' | 'XL' | 'XXL';

export type JerseyType = 'Home' | 'Away' | 'Third' | 'Retro' | 'Training';

export interface ProductVerificationDetails {
  matchVerified: boolean;
  designSummary: string;
  verifiedFeatures: string[];
  sourceNotes?: string;
}

export interface Product {
  id: string;
  name: string;
  club: string;
  team: string; // for backward compatibility
  season: string;
  type: JerseyType;
  color: string;
  category: 'new-drops' | 'retro' | 'training';
  price: number; // in KSh (Kenyan Shillings)
  originalPrice?: number;
  image?: string | null;
  imageVerified: boolean;
  verificationDetails?: ProductVerificationDetails;
  manufacturer?: string;
  sponsor?: string;
  description: string;
  details: string[];
  sizes: JerseySize[];
  isNewDrop?: boolean;
  isBestSeller?: boolean;
  year?: string;
}

export interface CartItem {
  product: Product;
  size: JerseySize;
  quantity: number;
}

export interface DeliveryDetails {
  fullName: string;
  phone: string;
  email: string;
  location: string;
  notes: string;
  paymentMethod: 'mpesa' | 'cash_on_delivery';
  deliveryArea: 'nairobi_cbd' | 'nairobi_metro' | 'upcountry';
}

export interface OrderReceipt {
  orderId: string;
  createdAt: string;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  deliveryDetails: DeliveryDetails;
}

export interface NewsletterSubscriber {
  email: string;
  subscribedAt: string;
}
