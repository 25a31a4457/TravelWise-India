import React, { useEffect, useRef } from 'react';
import { X, ChevronLeft, ChevronRight, Camera, ExternalLink, ShieldCheck, AlertCircle } from 'lucide-react';
import { PhotoMetadata } from '../types';

interface AccommodationPhotoLightboxProps {
  isOpen: boolean;
  onClose: () => void;
  propertyName: string;
  photos: PhotoMetadata[];
  initialIndex?: number;
}

export const AccommodationPhotoLightbox: React.FC<AccommodationPhotoLightboxProps> = ({
  isOpen,
  onClose,
  propertyName,
  photos,
  initialIndex = 0
}) => {
  const [currentIndex, setCurrentIndex] = React.useState(initialIndex);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex, isOpen]);

  // Keyboard navigation: Left/Right arrow and Escape key to close
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        setCurrentIndex(prev => (prev - 1 + photos.length) % photos.length);
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        setCurrentIndex(prev => (prev + 1) % photos.length);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, photos.length, onClose]);

  // Trap focus inside lightbox
  useEffect(() => {
    if (isOpen) {
      containerRef.current?.focus();
    }
  }, [isOpen]);

  if (!isOpen || photos.length === 0) return null;

  const currentPhoto = photos[currentIndex] || photos[0];

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex(prev => (prev - 1 + photos.length) % photos.length);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex(prev => (prev + 1) % photos.length);
  };

  // Image status badge
  const renderStatusBadge = () => {
    switch (currentPhoto.imageType) {
      case 'verified-property-photo':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-semibold">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Verified Property Photo</span>
          </span>
        );
      case 'fallback':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-500/20 text-slate-300 border border-slate-500/40 text-xs font-semibold">
            <AlertCircle className="w-3.5 h-3.5" />
            <span>Fallback Image</span>
          </span>
        );
      case 'representative-real-photo':
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-semibold">
            <Camera className="w-3.5 h-3.5" />
            <span>Representative accommodation photo — not this specific property</span>
          </span>
        );
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Photo Gallery for ${propertyName}`}
      ref={containerRef}
      tabIndex={-1}
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/90 backdrop-blur-md animate-fade-in focus:outline-none"
    >
      <div
        onClick={e => e.stopPropagation()}
        className="relative max-w-5xl w-full bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-slate-700 flex flex-col"
      >
        {/* Header Bar */}
        <div className="p-4 sm:p-5 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-white">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-wider font-bold text-saffron-400">Photo Inspiration</span>
              <span className="text-slate-500">•</span>
              <span className="text-xs text-slate-400">{currentIndex + 1} of {photos.length}</span>
            </div>
            <h3 className="font-serif text-lg font-bold text-white mt-0.5 truncate max-w-md sm:max-w-xl">
              {propertyName}
            </h3>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2.5 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-saffron-500"
            aria-label="Close Lightbox (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Main Photo Area */}
        <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full bg-black flex items-center justify-center overflow-hidden">
          <img
            src={currentPhoto.imageUrl}
            alt={currentPhoto.alt || `${propertyName} photo`}
            className="w-full h-full object-contain select-none"
          />

          {photos.length > 1 && (
            <>
              <button
                type="button"
                onClick={handlePrev}
                className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 hover:bg-black/80 text-white backdrop-blur-sm transition-all focus:outline-none focus:ring-2 focus:ring-saffron-500"
                aria-label="Previous Photo"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 hover:bg-black/80 text-white backdrop-blur-sm transition-all focus:outline-none focus:ring-2 focus:ring-saffron-500"
                aria-label="Next Photo"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}
        </div>

        {/* Metadata & Attribution Footer */}
        <div className="p-4 sm:p-5 bg-slate-900 border-t border-slate-800 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              {renderStatusBadge()}
            </div>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              {currentPhoto.alt}
            </p>
          </div>

          <div className="text-[11px] text-slate-400 shrink-0 space-y-0.5 text-left sm:text-right">
            <div>
              Source: <span className="text-slate-200 font-semibold">{currentPhoto.source}</span>
              {currentPhoto.photographer && (
                <span> • Photo by <span className="text-slate-200">{currentPhoto.photographer}</span></span>
              )}
            </div>
            <div className="text-slate-500">
              License: {currentPhoto.license}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
