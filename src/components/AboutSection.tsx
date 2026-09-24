import React from 'react';
import { Instagram, Sparkles, Shirt, ShieldCheck, Flame } from 'lucide-react';
import { INSTAGRAM_URL, INSTAGRAM_HANDLE, STORE_NAME } from '../config/store';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-16 md:py-24 bg-neutral-950 border-t border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Text */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-lime-400">
              <Flame className="w-3.5 h-3.5" />
              <span>The Philosophy</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white font-display">
              ABOUT {STORE_NAME}
            </h2>

            <p className="text-lg sm:text-xl font-medium text-neutral-200">
              Football culture meets everyday streetwear.
            </p>

            <p className="text-sm sm:text-base text-neutral-400 leading-relaxed">
              {STORE_NAME} brings affordable football jerseys to fans across Kenya. We believe you
              shouldn’t have to break the bank to rep your club, rock timeless 90s vintage silhouettes,
              or stunt on matchdays.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="p-4 bg-neutral-900/60 border border-neutral-800 rounded-xl">
                <Shirt className="w-5 h-5 text-lime-400 mb-2" />
                <h4 className="text-sm font-bold text-white mb-1">Authentic Quality</h4>
                <p className="text-xs text-neutral-400">
                  Durable fabric, crisp embroidered crests, and breathable moisture-control weave.
                </p>
              </div>

              <div className="p-4 bg-neutral-900/60 border border-neutral-800 rounded-xl">
                <ShieldCheck className="w-5 h-5 text-lime-400 mb-2" />
                <h4 className="text-sm font-bold text-white mb-1">Fair Kenyan Pricing</h4>
                <p className="text-xs text-neutral-400">
                  Every kit priced between KSh 800 and KSh 1,000. Transparent and accessible.
                </p>
              </div>
            </div>

            <div className="pt-2">
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 hover:border-neutral-500 rounded-lg text-xs font-bold text-white transition-colors"
              >
                <Instagram className="w-4 h-4 text-pink-400" />
                <span>Join our community on Instagram {INSTAGRAM_HANDLE}</span>
              </a>
            </div>
          </div>

          {/* Right Visual Badge Grid */}
          <div className="bg-neutral-900/40 border border-neutral-800 rounded-2xl p-6 sm:p-8 space-y-6">
            <h3 className="text-xs font-mono uppercase tracking-widest text-neutral-400 border-b border-neutral-800 pb-3">
              Why Football Fans Trust Us
            </h3>

            <div className="space-y-4">
              <div className="flex gap-4">
                <span className="text-lime-400 font-mono text-sm font-bold shrink-0">01</span>
                <div>
                  <h4 className="text-sm font-bold text-white">Curated Season Drops</h4>
                  <p className="text-xs text-neutral-400 mt-0.5">
                    We stock the latest 24/25 European and international kits right as they drop.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <span className="text-lime-400 font-mono text-sm font-bold shrink-0">02</span>
                <div>
                  <h4 className="text-sm font-bold text-white">Nostalgic Retro Vault</h4>
                  <p className="text-xs text-neutral-400 mt-0.5">
                    Thierry Henry’s Highbury Redcurrant, Zidane’s 2002 Glasgow volley, R9 Brazil 1998, and United’s 1999 Treble.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <span className="text-lime-400 font-mono text-sm font-bold shrink-0">03</span>
                <div>
                  <h4 className="text-sm font-bold text-white">Speed & Reliability</h4>
                  <p className="text-xs text-neutral-400 mt-0.5">
                    Riders on standby for Nairobi orders and trusted courier partners reaching all 47 counties.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
