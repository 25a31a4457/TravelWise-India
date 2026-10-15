import React from 'react';
import { X, Building, MapPin, Check, Camera, Info, IndianRupee, Star, ShieldCheck, AlertCircle } from 'lucide-react';
import { StayOption } from '../types';

interface AccommodationDetailsModalProps {
  stay: StayOption | null;
  onClose: () => void;
  onOpenPhotos: () => void;
}

export const AccommodationDetailsModal: React.FC<AccommodationDetailsModalProps> = ({
  stay,
  onClose,
  onOpenPhotos
}) => {
  if (!stay) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Details for ${stay.name}`}
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-sm animate-fade-in"
    >
      <div
        onClick={e => e.stopPropagation()}
        className="relative max-w-2xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-200 flex flex-col"
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-slate-900/60 hover:bg-slate-900/90 text-white flex items-center justify-center backdrop-blur-sm transition-colors focus:outline-none focus:ring-2 focus:ring-saffron-500"
          aria-label="Close details (Esc)"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Hero Photo Banner */}
        <div className="relative h-60 w-full overflow-hidden bg-slate-900">
          <img
            src={stay.image}
            alt={stay.photoMetadata?.alt || stay.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />

          {/* Badges */}
          <div className="absolute top-4 left-4 flex flex-wrap gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-navy-900/80 backdrop-blur-sm text-white font-semibold text-xs border border-white/20">
              {stay.type}
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-amber-500/90 text-white font-bold text-xs shadow-sm">
              Demo Listing
            </span>
          </div>

          <div className="absolute bottom-4 left-6 right-6 text-white">
            <h3 className="font-serif text-2xl font-bold leading-tight">
              {stay.name}
            </h3>
            <p className="text-xs text-slate-300 mt-1 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              <span>{stay.location}</span>
            </p>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[60vh] overflow-y-auto">
          
          {/* Read-Only Inspiration Notice */}
          <div className="p-3.5 bg-slate-100 rounded-2xl border border-slate-200 flex items-start gap-3 text-xs text-slate-700 leading-relaxed">
            <Info className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-slate-900 block mb-0.5">Browsing & Inspiration Only</span>
              For viewing and inspiration only. Accommodation selection and booking are not available.
            </div>
          </div>

          {/* Representative Photo Notice */}
          <div className="p-3.5 bg-amber-50 rounded-2xl border border-amber-200 flex items-start gap-3 text-xs text-amber-900 leading-relaxed">
            <Camera className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold block mb-0.5">Photo Status:</span>
              {stay.photoMetadata?.notes || 'Representative accommodation photo — not this specific property.'}
              {stay.photoMetadata?.photographer && (
                <span className="block text-[11px] text-amber-800 mt-0.5">
                  Real photo by {stay.photoMetadata.photographer} via {stay.photoMetadata.source} ({stay.photoMetadata.license}).
                </span>
              )}
            </div>
          </div>

          {/* Description */}
          {stay.description && (
            <div>
              <h4 className="font-bold text-slate-900 text-sm mb-1.5">About This Stay Style</h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {stay.description}
              </p>
            </div>
          )}

          {/* Verified Amenities */}
          <div>
            <h4 className="font-bold text-slate-900 text-sm mb-2.5">Typical Amenities</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {stay.amenities.map(amenity => (
                <div key={amenity} className="flex items-center gap-2 text-xs text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>{amenity}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Indicative Tariff Note */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Indicative Tariff</span>
              <div className="flex items-baseline gap-1">
                <span className="font-bold text-slate-900 text-lg">
                  ₹{stay.pricePerNight.toLocaleString('en-IN')}
                </span>
                <span className="text-xs text-slate-500">/ night (Demo estimate)</span>
              </div>
            </div>
            {stay.rating && (
              <div className="flex items-center gap-1 px-3 py-1.5 bg-amber-50 rounded-xl border border-amber-200 text-amber-900 text-xs font-bold">
                <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                <span>{stay.rating}</span>
                <span className="text-slate-400 text-[10px] font-normal">({stay.reviewsCount || 100}+ reviews)</span>
              </div>
            )}
          </div>

        </div>

        {/* Footer Actions - STRICTLY READ-ONLY */}
        <div className="p-4 sm:p-6 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={onOpenPhotos}
            className="px-5 py-2.5 rounded-xl bg-navy-900 hover:bg-navy-800 text-white text-xs font-bold flex items-center gap-2 transition-colors focus:outline-none focus:ring-2 focus:ring-navy-900"
          >
            <Camera className="w-4 h-4" />
            <span>View Photos</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-bold transition-colors focus:outline-none"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
