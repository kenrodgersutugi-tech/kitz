import React from 'react';
import { ArrowRight, ShieldCheck, Truck, Zap } from 'lucide-react';
import { LOCAL_ASSETS } from '../data/products';
import { JerseyCategory } from '../types';

interface HeroProps {
  onShopClick: (category?: JerseyCategory) => void;
}

export const Hero: React.FC<HeroProps> = ({ onShopClick }) => {
  return (
    <section className="relative w-full min-h-[88vh] md:min-h-[85vh] flex items-center justify-center overflow-hidden bg-neutral-950">
      {/* Background Photography with Scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src={LOCAL_ASSETS.hero}
          alt="kitszn.ke football jersey streetwear"
          className="w-full h-full object-cover object-center filter brightness-[0.78] contrast-[1.08] scale-[1.02]"
          loading="eager"
        />
        {/* Measured cinematic contrast gradient scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/65 to-black/35" />
        <div className="absolute inset-0 bg-gradient-to-r from-neutral-950/85 via-neutral-950/40 to-transparent" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 w-full flex flex-col justify-center">
        <div className="max-w-2xl">
          {/* Subtle editorial kicker */}
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-lime-400 mb-4 bg-lime-950/40 border border-lime-800/40 px-3 py-1 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-lime-400 animate-ping" />
            <span>2024/25 Season & Retro Archives</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight text-white font-display leading-[0.95] mb-5 text-balance">
            YOUR KIT. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-200 to-lime-400">
              YOUR STYLE.
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-lg sm:text-xl text-neutral-300 font-normal mb-8 max-w-xl text-balance">
            Affordable football jerseys in Kenya. Premium quality club kits, iconic retro shirts, and drill tops from KSh 800.
          </p>

          {/* Call to Action Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-12">
            <button
              onClick={() => onShopClick('all')}
              className="px-8 py-4 bg-lime-400 hover:bg-lime-300 text-neutral-950 font-extrabold text-sm uppercase tracking-wider rounded-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-lime-400/20"
            >
              <span>SHOP JERSEYS</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => onShopClick('new-drops')}
              className="px-8 py-4 bg-neutral-900/80 hover:bg-neutral-800 text-white font-semibold text-sm uppercase tracking-wider rounded-lg border border-neutral-700 hover:border-neutral-500 transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 cursor-pointer backdrop-blur-sm"
            >
              <span>NEW DROPS</span>
            </button>
          </div>

          {/* Key Value Propositions */}
          <div className="grid grid-cols-3 gap-3 pt-6 border-t border-neutral-800/80 text-xs text-neutral-300">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-lime-400 shrink-0" />
              <span className="font-medium">KSh 800 - 1,000 Flat</span>
            </div>
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-lime-400 shrink-0" />
              <span className="font-medium">Fast Kenya Delivery</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-lime-400 shrink-0" />
              <span className="font-medium">M-Pesa Verified</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
