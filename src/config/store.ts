/**
 * Centralized Store Configuration for kitszn.ke
 * Easily modify phone numbers, social links, store names, and delivery fees here.
 */

export const STORE_NAME = 'kitszn.ke';
export const STORE_TAGLINE = 'Football jerseys. Kenyan prices. Your style.';
export const STORE_HERO_SUBTITLE = 'Affordable football jerseys in Kenya.';

export const CURRENCY = 'KSh';

// Instagram configurations
export const INSTAGRAM_HANDLE = '@kitszn.ke';
export const INSTAGRAM_URL = 'https://www.instagram.com/kitszn.ke/';

// WhatsApp ordering configuration
// Phone number formatted without + or leading zeros for wa.me API link (e.g. 254712345678)
export const WHATSAPP_NUMBER = '254712345678';
export const WHATSAPP_DISPLAY = '+254 712 345 678';

// Business contact info
export const STORE_EMAIL = 'orders@kitszn.ke';
export const STORE_LOCATION = 'Nairobi, Kenya';

// Delivery configurations (All in KSh)
export const DELIVERY_FEES = {
  nairobi_cbd: {
    label: 'Nairobi CBD / Pick-up Point',
    fee: 150,
    time: 'Same-day (1-3 hours)',
  },
  nairobi_metro: {
    label: 'Nairobi Metropolitan (Doorstep Rider)',
    fee: 250,
    time: 'Same-day delivery (2-4 hours)',
  },
  upcountry: {
    label: 'Countrywide / Upcountry Parcel (All 47 Counties)',
    fee: 350,
    time: 'Next-day delivery (24-48 hours via Easy Coach / Wells Fargo / G4S)',
  },
} as const;

export const STANDARD_SIZES: Array<'S' | 'M' | 'L' | 'XL' | 'XXL'> = ['S', 'M', 'L', 'XL', 'XXL'];

// Helper to format Kenyan Shillings
export function formatKSh(amount: number): string {
  return `KSh ${amount.toLocaleString('en-KE')}`;
}
