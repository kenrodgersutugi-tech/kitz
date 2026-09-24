import React, { useState } from 'react';
import { Mail, CheckCircle2, ArrowRight, Bell, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const NewsletterSection: React.FC = () => {
  const { subscribeNewsletter } = useCart();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<{ type: 'idle' | 'success' | 'error'; message: string }>({
    type: 'idle',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    const result = subscribeNewsletter(email);
    if (result.success) {
      setStatus({ type: 'success', message: result.message });
      setEmail('');
    } else {
      setStatus({ type: 'error', message: result.message });
    }
  };

  return (
    <section className="py-16 md:py-20 bg-neutral-900/60 border-t border-neutral-900 relative overflow-hidden">
      {/* Background Accent glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-lime-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        {/* Kicker */}
        <div className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest text-lime-400 mb-3 bg-lime-950/40 border border-lime-800/40 px-3 py-1 rounded-full">
          <Bell className="w-3.5 h-3.5" />
          <span>VIP DROP NOTIFICATIONS</span>
        </div>

        {/* Title */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white font-display mb-3">
          JOIN THE SZN DROP LIST
        </h2>

        {/* Subtitle */}
        <p className="text-sm sm:text-base text-neutral-300 max-w-xl mx-auto mb-8">
          Get first dibs on fresh 24/25 European kits, limited retro releases, and exclusive member discounts across Kenya. Zero spam, ever.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-3">
          <div className="flex flex-col sm:flex-row items-stretch gap-2.5">
            <div className="relative flex-1">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (status.type !== 'idle') setStatus({ type: 'idle', message: '' });
                }}
                placeholder="Enter your email address..."
                className="w-full pl-10 pr-4 py-3 bg-neutral-950 border border-neutral-800 rounded-xl text-sm text-neutral-100 placeholder:text-neutral-500 focus:outline-none focus:border-lime-400 transition-colors"
              />
            </div>

            <button
              type="submit"
              className="py-3 px-6 bg-lime-400 hover:bg-lime-300 text-neutral-950 font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-lime-400/20 active:scale-95 shrink-0"
            >
              <span>Get Early Access</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Feedback messages */}
          {status.type === 'success' && (
            <div className="p-3 bg-emerald-950/60 border border-emerald-500/50 rounded-xl flex items-center gap-2 text-xs text-emerald-300 text-left animate-fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{status.message}</span>
            </div>
          )}

          {status.type === 'error' && (
            <div className="p-3 bg-red-950/60 border border-red-500/50 rounded-xl text-xs text-red-300 text-left">
              {status.message}
            </div>
          )}
        </form>

        <p className="text-[11px] text-neutral-500 mt-4">
          By subscribing you agree to receive drops & restock alerts from kitszn.ke. Unsubscribe anytime.
        </p>
      </div>
    </section>
  );
};
