import React, { useState } from 'react';
import { CheckCircle2, MessageCircle, Copy, Check, X, ArrowRight, ShieldCheck, MapPin } from 'lucide-react';
import { formatKSh, WHATSAPP_NUMBER } from '../config/store';
import { useCart } from '../context/CartContext';

export const OrderSuccessModal: React.FC = () => {
  const { lastReceipt, setLastReceipt } = useCart();
  const [copied, setCopied] = useState(false);

  if (!lastReceipt) return null;

  const handleCopyDetails = () => {
    let text = `kitszn.ke Order ${lastReceipt.orderId}\n`;
    text += `Customer: ${lastReceipt.deliveryDetails.fullName}\n`;
    text += `Phone: ${lastReceipt.deliveryDetails.phone}\n`;
    text += `Location: ${lastReceipt.deliveryDetails.location}\n`;
    text += `Total: ${formatKSh(lastReceipt.total)}\n`;
    text += `Items:\n`;
    lastReceipt.items.forEach((item) => {
      text += `- ${item.product.name} (Size: ${item.size}) x${item.quantity}\n`;
    });

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleOpenWhatsAppAgain = () => {
    let msg = `Hi kitszn.ke, checking in on my order *${lastReceipt.orderId}* (${formatKSh(
      lastReceipt.total
    )}).`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-neutral-950/85 backdrop-blur-md transition-opacity"
        onClick={() => setLastReceipt(null)}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-lg bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden shadow-2xl z-10 my-auto text-neutral-100 p-6 sm:p-8">
        <button
          onClick={() => setLastReceipt(null)}
          className="absolute top-4 right-4 p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <div className="w-14 h-14 mx-auto mb-3 bg-emerald-950/60 border border-emerald-500/50 rounded-full flex items-center justify-center text-emerald-400">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-black text-white font-display">
            Order Submitted!
          </h2>
          <p className="text-xs text-neutral-400 mt-1">
            Order Reference:{' '}
            <span className="font-mono text-lime-400 font-bold">{lastReceipt.orderId}</span>
          </p>
        </div>

        {/* Itemized summary */}
        <div className="bg-neutral-950 border border-neutral-800 rounded-xl p-4 mb-6 space-y-3">
          <div className="text-xs font-semibold text-neutral-300 border-b border-neutral-800 pb-2 flex justify-between">
            <span>Customer & Delivery</span>
            <span className="text-emerald-400">Received</span>
          </div>

          <div className="text-xs text-neutral-400 space-y-1">
            <div><strong className="text-neutral-200">Name:</strong> {lastReceipt.deliveryDetails.fullName}</div>
            <div><strong className="text-neutral-200">Phone:</strong> {lastReceipt.deliveryDetails.phone}</div>
            <div className="flex items-start gap-1">
              <MapPin className="w-3.5 h-3.5 text-lime-400 shrink-0 mt-0.5" />
              <span>{lastReceipt.deliveryDetails.location}</span>
            </div>
          </div>

          <div className="text-xs font-semibold text-neutral-300 border-t border-neutral-800 pt-2 pb-1">
            Order Items:
          </div>
          <div className="space-y-1.5 max-h-32 overflow-y-auto">
            {lastReceipt.items.map((item) => (
              <div
                key={`${item.product.id}-${item.size}`}
                className="flex justify-between text-xs text-neutral-300"
              >
                <span>
                  {item.product.name} <span className="text-lime-400 font-bold">({item.size})</span> × {item.quantity}
                </span>
                <span className="tabular-nums font-mono text-white">
                  {formatKSh(item.product.price * item.quantity)}
                </span>
              </div>
            ))}
          </div>

          <div className="border-t border-neutral-800 pt-2 flex justify-between text-sm font-bold text-white">
            <span>Total Amount:</span>
            <span className="text-lime-400 tabular-nums">{formatKSh(lastReceipt.total)}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-2.5">
          <button
            onClick={handleOpenWhatsAppAgain}
            className="w-full py-3.5 bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-emerald-500/20"
          >
            <MessageCircle className="w-4 h-4 fill-neutral-950" />
            <span>Open in WhatsApp</span>
          </button>

          <button
            onClick={handleCopyDetails}
            className="w-full py-3 bg-neutral-800 hover:bg-neutral-700 text-white font-semibold text-xs rounded-xl transition-colors flex items-center justify-center gap-2"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Copied to Clipboard!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-neutral-400" />
                <span>Copy Order Summary</span>
              </>
            )}
          </button>

          <button
            onClick={() => setLastReceipt(null)}
            className="w-full py-2.5 text-xs text-neutral-400 hover:text-white transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};
