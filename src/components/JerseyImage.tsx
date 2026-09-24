import React, { useState } from 'react';
import { Camera, ShieldAlert, CheckCircle2 } from 'lucide-react';

interface JerseyImageProps {
  src?: string | null;
  alt: string;
  club?: string;
  season?: string;
  type?: string;
  color?: string;
  imageVerified?: boolean;
  className?: string;
  priority?: boolean;
  aspectRatioClass?: string;
  showBadge?: boolean;
}

export const JerseyImage: React.FC<JerseyImageProps> = ({
  src,
  alt,
  club = 'Football Kit',
  season = '2024/25',
  type = 'Home',
  color,
  imageVerified = false,
  className = 'w-full h-full object-cover',
  priority = false,
  aspectRatioClass = 'aspect-[4/5]',
  showBadge = true,
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // If there is no image provided, not verified, or failed to load:
  // Strictly DO NOT substitute another season or club's jersey.
  // Instead, display the clearly marked product-image fallback.
  const isFallback = !src || !imageVerified || hasError;

  if (isFallback) {
    return (
      <div
        className={`relative w-full ${aspectRatioClass} bg-neutral-900 border border-neutral-800 rounded-lg overflow-hidden flex flex-col justify-between p-4 select-none group`}
        role="img"
        aria-label={`${club} ${season} ${type} - Official photo pending verification`}
      >
        {/* Subtle geometric kit silhouette watermark */}
        <div className="absolute inset-0 opacity-10 pointer-events-none flex items-center justify-center">
          <svg
            className="w-36 h-36 text-white stroke-current fill-none"
            viewBox="0 0 24 24"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z" />
          </svg>
        </div>

        {/* Top: Status & Season Pill */}
        <div className="relative z-10 flex items-center justify-between gap-2">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[10px] font-mono font-bold uppercase tracking-wider">
            <Camera className="w-3 h-3" />
            Photo Pending
          </span>
          <span className="text-[10px] font-mono text-neutral-400 font-medium">
            {season}
          </span>
        </div>

        {/* Center: Explicit Jersey Specifications */}
        <div className="relative z-10 my-auto text-center space-y-1.5 py-4">
          <p className="text-[11px] font-mono uppercase tracking-widest text-lime-400/90 font-semibold">
            {club}
          </p>
          <h4 className="text-sm font-black text-white uppercase tracking-tight font-display leading-tight line-clamp-2">
            {type} Jersey
          </h4>
          {color && (
            <p className="text-[11px] text-neutral-400 line-clamp-1 italic">
              Color: {color}
            </p>
          )}
        </div>

        {/* Bottom: Honest kitszn.ke verification policy guarantee */}
        <div className="relative z-10 pt-2 border-t border-neutral-800/80">
          <div className="flex items-center gap-1.5 text-[10px] text-neutral-400 leading-tight">
            <ShieldAlert className="w-3.5 h-3.5 text-neutral-500 shrink-0" />
            <span>Strict zero-false-match policy: We never display generic or wrong-season photos.</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative w-full ${aspectRatioClass} overflow-hidden bg-neutral-900 rounded-lg flex items-center justify-center`}>
      {/* Subtle loader shimmer */}
      {isLoading && (
        <div className="absolute inset-0 bg-neutral-850 animate-pulse flex items-center justify-center">
          <div className="w-8 h-8 rounded-full border border-neutral-700 border-t-lime-400 animate-spin" />
        </div>
      )}

      <img
        src={src}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        referrerPolicy="no-referrer"
        onLoad={() => setIsLoading(false)}
        onError={() => setHasError(true)}
        className={`${className} transition-opacity duration-300 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
      />

      {/* Verified Kit match badge overlay */}
      {showBadge && imageVerified && !isLoading && (
        <div className="absolute bottom-2 left-2 z-10">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-neutral-950/85 backdrop-blur-md border border-neutral-800 rounded text-[10px] font-mono text-emerald-400 font-medium">
            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
            Verified {season} {type}
          </span>
        </div>
      )}
    </div>
  );
};
