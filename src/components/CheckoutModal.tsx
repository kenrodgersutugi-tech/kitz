import React, { useState } from 'react';
import { X, MessageCircle, CheckCircle2, ShieldCheck, MapPin, Phone, User, Mail, FileText, ArrowRight } from 'lucide-react';
import { DELIVERY_FEES, formatKSh, WHATSAPP_NUMBER } from '../config/store';
import { useCart } from '../context/CartContext';
import { DeliveryDetails, OrderReceipt } from '../types';

export const CheckoutModal: React.FC = () => {
  const { items, subtotal, isCheckoutOpen, setIsCheckoutOpen, clearCart, setLastReceipt } = useCart();

  const [formData, setFormData] = useState<DeliveryDetails>({
    fullName: '',
    phone: '',
    email: '',
    location: '',
    notes: '',
    paymentMethod: 'mpesa',
    deliveryArea: 'nairobi_cbd',
  });

  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isCheckoutOpen) return null;

  const currentDeliveryFee = DELIVERY_FEES[formData.deliveryArea].fee;
  const grandTotal = subtotal + currentDeliveryFee;

  const validateForm = () => {
    const errors: { [key: string]: string } = {};
    if (!formData.fullName.trim()) {
      errors.fullName = 'Please enter your full name';
    }
    if (!formData.phone.trim()) {
      errors.phone = 'Please provide an active Kenyan phone number (e.g. 0712 345 678)';
    } else if (formData.phone.replace(/[\s-]/g, '').length < 9) {
      errors.phone = 'Please enter a valid phone number';
    }
    if (!formData.location.trim()) {
      errors.location = 'Please specify your estate, street, or town';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  /**
   * Generates the WhatsApp formatted message
   */
  const generateWhatsAppMessage = (orderId: string) => {
    let msg = `🛒 *NEW ORDER: ${orderId} - kitszn.ke*\n\n`;
    msg += `👤 *Customer:* ${formData.fullName.trim()}\n`;
    msg += `📞 *Phone:* ${formData.phone.trim()}\n`;
    if (formData.email.trim()) {
      msg += `✉️ *Email:* ${formData.email.trim()}\n`;
    }
    msg += `📍 *Delivery Location:* ${formData.location.trim()} (${DELIVERY_FEES[formData.deliveryArea].label})\n`;
    msg += `💳 *Payment Method:* ${formData.paymentMethod === 'mpesa' ? 'M-Pesa' : 'Cash on Delivery'}\n\n`;
    
    msg += `👕 *ORDERED JERSEYS:*\n`;
    items.forEach((item, index) => {
      const itemTotal = item.product.price * item.quantity;
      msg += `${index + 1}. *${item.product.name}*\n`;
      msg += `   - Size: *${item.size}*\n`;
      msg += `   - Qty: *${item.quantity}* × ${formatKSh(item.product.price)}\n`;
      msg += `   - Item Total: *${formatKSh(itemTotal)}*\n\n`;
    });

    msg += `💰 *Subtotal:* ${formatKSh(subtotal)}\n`;
    msg += `🚚 *Delivery Fee:* ${formatKSh(currentDeliveryFee)}\n`;
    msg += `🔥 *TOTAL AMOUNT:* *${formatKSh(grandTotal)}*\n\n`;

    if (formData.notes.trim()) {
      msg += `📝 *Notes / Special Instructions:* ${formData.notes.trim()}\n\n`;
    }

    msg += `_Order submitted via kitszn.ke website. Please confirm availability and delivery timeframe._`;

    return msg;
  };

  const handleOrderSubmission = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    const orderId = `#KZN-${Math.floor(1000 + Math.random() * 9000)}`;

    const receipt: OrderReceipt = {
      orderId,
      createdAt: new Date().toLocaleDateString('en-KE', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
      items: [...items],
      subtotal,
      deliveryFee: currentDeliveryFee,
      total: grandTotal,
      deliveryDetails: { ...formData },
    };

    // Construct WhatsApp URL
    const message = generateWhatsAppMessage(orderId);
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;

    // Store receipt and clear cart
    setLastReceipt(receipt);
    clearCart();
    setIsCheckoutOpen(false);

    // Open WhatsApp in new tab / app
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-neutral-950/85 backdrop-blur-md transition-opacity"
        onClick={() => setIsCheckoutOpen(false)}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden shadow-2xl z-10 my-auto text-neutral-100 max-h-[94vh] flex flex-col">
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-neutral-800 flex items-center justify-between bg-neutral-950/60">
          <div>
            <h2 className="text-xl font-extrabold text-white font-display">
              Checkout & Delivery
            </h2>
            <p className="text-xs text-neutral-400">
              Direct WhatsApp order confirmation & delivery across Kenya
            </p>
          </div>
          <button
            onClick={() => setIsCheckoutOpen(false)}
            className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors"
            aria-label="Close checkout"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleOrderSubmission} className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {/* Order Summary Pill list */}
          <div className="p-3.5 bg-neutral-950/80 border border-neutral-800 rounded-xl space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-neutral-400">
              <span>Selected Kits ({items.length})</span>
              <span className="text-lime-400">{formatKSh(subtotal)}</span>
            </div>
            <div className="max-h-24 overflow-y-auto space-y-1.5 pr-1">
              {items.map((item) => (
                <div
                  key={`${item.product.id}-${item.size}`}
                  className="flex items-center justify-between text-xs text-neutral-300"
                >
                  <span className="truncate pr-2">
                    {item.product.name} (Size {item.size}) × {item.quantity}
                  </span>
                  <span className="tabular-nums font-mono shrink-0">
                    {formatKSh(item.product.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Customer Details Form */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-lime-400 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5" />
              <span>Customer Information</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Full Name */}
              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                  Full Name <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="e.g. Brian Omwamba"
                    className="w-full pl-9 pr-3 py-2.5 bg-neutral-950 border border-neutral-800 rounded-lg text-sm text-neutral-100 placeholder:text-neutral-600 focus:outline-none focus:border-lime-400 transition-colors"
                  />
                </div>
                {formErrors.fullName && (
                  <p className="text-[11px] text-red-400 mt-1">{formErrors.fullName}</p>
                )}
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                  Phone Number (M-Pesa / Calls) <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="e.g. 0712 345 678"
                    className="w-full pl-9 pr-3 py-2.5 bg-neutral-950 border border-neutral-800 rounded-lg text-sm text-neutral-100 placeholder:text-neutral-600 focus:outline-none focus:border-lime-400 transition-colors"
                  />
                </div>
                {formErrors.phone && (
                  <p className="text-[11px] text-red-400 mt-1">{formErrors.phone}</p>
                )}
              </div>
            </div>

            {/* Email Address */}
            <div>
              <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                Email Address <span className="text-neutral-500">(Optional for receipt)</span>
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="e.g. brian@example.com"
                  className="w-full pl-9 pr-3 py-2.5 bg-neutral-950 border border-neutral-800 rounded-lg text-sm text-neutral-100 placeholder:text-neutral-600 focus:outline-none focus:border-lime-400 transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Delivery Region Selection */}
          <div className="space-y-3 pt-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-lime-400 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5" />
              <span>Delivery Option (Kenya)</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {(Object.keys(DELIVERY_FEES) as Array<keyof typeof DELIVERY_FEES>).map((key) => {
                const option = DELIVERY_FEES[key];
                const isSelected = formData.deliveryArea === key;
                return (
                  <label
                    key={key}
                    className={`p-3 rounded-xl border flex flex-col justify-between cursor-pointer transition-all ${
                      isSelected
                        ? 'border-lime-400 bg-lime-950/20 shadow-md'
                        : 'border-neutral-800 bg-neutral-950/80 hover:border-neutral-700'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-1 mb-2">
                      <span className="text-xs font-bold text-white leading-tight">
                        {option.label}
                      </span>
                      <input
                        type="radio"
                        name="deliveryArea"
                        checked={isSelected}
                        onChange={() => setFormData({ ...formData, deliveryArea: key })}
                        className="accent-lime-400 mt-0.5"
                      />
                    </div>
                    <div>
                      <div className="text-sm font-extrabold text-lime-400 tabular-nums">
                        {formatKSh(option.fee)}
                      </div>
                      <div className="text-[10px] text-neutral-400 mt-0.5">{option.time}</div>
                    </div>
                  </label>
                );
              })}
            </div>

            {/* Delivery Location Exact Street / Estate */}
            <div>
              <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                Exact Delivery Location / Estate / Town <span className="text-red-400">*</span>
              </label>
              <textarea
                rows={2}
                required
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="e.g. Westlands, Mpaka Road, The Mirage 4th Floor, or Kisumu CBD"
                className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-sm text-neutral-100 placeholder:text-neutral-600 focus:outline-none focus:border-lime-400 transition-colors"
              />
              {formErrors.location && (
                <p className="text-[11px] text-red-400 mt-1">{formErrors.location}</p>
              )}
            </div>

            {/* Additional Notes */}
            <div>
              <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                Additional Notes / Special Instructions
              </label>
              <input
                type="text"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="e.g. Call upon arrival, leave with security, etc."
                className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-sm text-neutral-100 placeholder:text-neutral-600 focus:outline-none focus:border-lime-400 transition-colors"
              />
            </div>
          </div>

          {/* Payment Method */}
          <div className="space-y-3 pt-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-lime-400 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Payment Option</span>
            </h3>

            <div className="grid grid-cols-2 gap-3">
              <label
                className={`p-3.5 rounded-xl border flex items-center gap-3 cursor-pointer transition-all ${
                  formData.paymentMethod === 'mpesa'
                    ? 'border-emerald-500 bg-emerald-950/20'
                    : 'border-neutral-800 bg-neutral-950 hover:border-neutral-700'
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="mpesa"
                  checked={formData.paymentMethod === 'mpesa'}
                  onChange={() => setFormData({ ...formData, paymentMethod: 'mpesa' })}
                  className="accent-emerald-500"
                />
                <div>
                  <div className="text-xs font-bold text-white">M-Pesa</div>
                  <div className="text-[10px] text-emerald-400">Paybill / Till after order confirmation</div>
                </div>
              </label>

              <label
                className={`p-3.5 rounded-xl border flex items-center gap-3 cursor-pointer transition-all ${
                  formData.paymentMethod === 'cash_on_delivery'
                    ? 'border-lime-400 bg-lime-950/20'
                    : 'border-neutral-800 bg-neutral-950 hover:border-neutral-700'
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cash_on_delivery"
                  checked={formData.paymentMethod === 'cash_on_delivery'}
                  onChange={() => setFormData({ ...formData, paymentMethod: 'cash_on_delivery' })}
                  className="accent-lime-400"
                />
                <div>
                  <div className="text-xs font-bold text-white">Cash on Delivery</div>
                  <div className="text-[10px] text-neutral-400">Nairobi & environs upon arrival</div>
                </div>
              </label>
            </div>
          </div>

          {/* Grand Total breakdown */}
          <div className="p-4 bg-neutral-950 border border-neutral-800 rounded-xl space-y-2">
            <div className="flex justify-between text-xs text-neutral-400">
              <span>Subtotal ({items.length} kits)</span>
              <span className="tabular-nums font-mono text-white">{formatKSh(subtotal)}</span>
            </div>
            <div className="flex justify-between text-xs text-neutral-400">
              <span>Delivery Fee ({DELIVERY_FEES[formData.deliveryArea].label})</span>
              <span className="tabular-nums font-mono text-white">
                {formatKSh(currentDeliveryFee)}
              </span>
            </div>
            <div className="flex justify-between text-base font-extrabold text-white pt-2 border-t border-neutral-800">
              <span>Total Payable</span>
              <span className="tabular-nums text-lime-400">{formatKSh(grandTotal)}</span>
            </div>
          </div>

          {/* Submit & WhatsApp Button */}
          <div className="space-y-3">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-black text-sm uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xl shadow-emerald-500/20 active:scale-98"
            >
              <MessageCircle className="w-5 h-5 fill-neutral-950 text-neutral-950" />
              <span>Complete & Order via WhatsApp</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>

            <p className="text-[11px] text-center text-neutral-400 leading-normal">
              Clicking will generate your itemized order receipt and open WhatsApp directly with kitszn.ke customer care for immediate dispatch.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};
