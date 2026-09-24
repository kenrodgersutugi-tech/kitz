import React from 'react';
import { Truck, MapPin, Clock, ShieldCheck } from 'lucide-react';
import { DELIVERY_FEES, formatKSh } from '../config/store';

export const DeliverySection: React.FC = () => {
  return (
    <section id="delivery" className="py-16 md:py-24 bg-neutral-900/30 border-t border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest text-lime-400 mb-2">
            <Truck className="w-3.5 h-3.5" />
            <span>Shipping & Logistics</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-white font-display mb-3">
            DELIVERY ACROSS KENYA
          </h2>
          <p className="text-sm text-neutral-400">
            From Nairobi CBD to Mombasa, Kisumu, Eldoret, Nakuru, and all 47 counties. Fast, secure, and tracked delivery to your doorstep or nearest parcel office.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Nairobi CBD */}
          <div className="bg-neutral-950 border border-neutral-800 rounded-2xl p-6 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-lime-400 mb-4">
                <MapPin className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white mb-1">
                {DELIVERY_FEES.nairobi_cbd.label}
              </h3>
              <p className="text-xs text-neutral-400 mb-4">
                Pick up in Nairobi CBD or quick drop-off at your office or central meeting spot.
              </p>
            </div>
            <div className="pt-4 border-t border-neutral-900 flex items-center justify-between">
              <span className="text-xs text-neutral-400 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-lime-400" />
                <span>{DELIVERY_FEES.nairobi_cbd.time}</span>
              </span>
              <span className="text-sm font-black text-lime-400 tabular-nums">
                {formatKSh(DELIVERY_FEES.nairobi_cbd.fee)}
              </span>
            </div>
          </div>

          {/* Card 2: Nairobi Metropolitan Doorstep */}
          <div className="bg-neutral-950 border border-neutral-800 rounded-2xl p-6 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-lime-400 text-neutral-950 font-extrabold text-[10px] uppercase px-3 py-1 rounded-bl-lg">
              Popular
            </div>
            <div>
              <div className="w-10 h-10 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-lime-400 mb-4">
                <Truck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white mb-1">
                {DELIVERY_FEES.nairobi_metro.label}
              </h3>
              <p className="text-xs text-neutral-400 mb-4">
                Direct rider delivery to Westlands, Kilimani, Roysambu, Kasarani, South B, Ngong Rd, Karen, and Greater Nairobi.
              </p>
            </div>
            <div className="pt-4 border-t border-neutral-900 flex items-center justify-between">
              <span className="text-xs text-neutral-400 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-lime-400" />
                <span>{DELIVERY_FEES.nairobi_metro.time}</span>
              </span>
              <span className="text-sm font-black text-lime-400 tabular-nums">
                {formatKSh(DELIVERY_FEES.nairobi_metro.fee)}
              </span>
            </div>
          </div>

          {/* Card 3: Upcountry Kenya */}
          <div className="bg-neutral-950 border border-neutral-800 rounded-2xl p-6 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-lime-400 mb-4">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white mb-1">
                {DELIVERY_FEES.upcountry.label}
              </h3>
              <p className="text-xs text-neutral-400 mb-4">
                Sent via reputable parcel courier (Easy Coach, Fargo Courier, Wells Fargo, or 2NK) with parcel tracking.
              </p>
            </div>
            <div className="pt-4 border-t border-neutral-900 flex items-center justify-between">
              <span className="text-xs text-neutral-400 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-lime-400" />
                <span>{DELIVERY_FEES.upcountry.time}</span>
              </span>
              <span className="text-sm font-black text-lime-400 tabular-nums">
                {formatKSh(DELIVERY_FEES.upcountry.fee)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
