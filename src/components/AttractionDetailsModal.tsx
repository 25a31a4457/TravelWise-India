import React, { useState } from 'react';
import { 
  X, 
  MapPin, 
  Clock, 
  IndianRupee, 
  Check, 
  Plus, 
  Compass, 
  Sparkles, 
  AlertTriangle,
  Calendar,
  Share2
} from 'lucide-react';
import { TouristAttraction } from '../data/attractions';
import { useTrip } from '../context/TripContext';

interface AttractionDetailsModalProps {
  attraction: TouristAttraction | null;
  onClose: () => void;
}

export const AttractionDetailsModal: React.FC<AttractionDetailsModalProps> = ({
  attraction,
  onClose
}) => {
  const { toggleAttractionSelection, isAttractionSelected, showToast } = useTrip();
  const [imageError, setImageError] = useState(false);

  if (!attraction) return null;

  const selected = isAttractionSelected(attraction.id);
  const fallbackImage = 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80';

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast('Link Copied', `${attraction.name} details link copied to clipboard.`, 'success');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fade-in">
      <div 
        className="relative bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-slate-200"
        onClick={e => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-slate-950/60 hover:bg-slate-950/90 text-white flex items-center justify-center backdrop-blur-md transition-colors"
          aria-label="Close attraction details"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Hero Image */}
        <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-slate-950">
          <img
            src={imageError ? fallbackImage : attraction.photoUrl}
            alt={attraction.name}
            onError={() => setImageError(true)}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />

          {/* Badges */}
          <div className="absolute top-4 left-4 flex flex-wrap gap-2">
            <span className="px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-xs font-bold text-slate-800 shadow">
              {attraction.category}
            </span>
            {(attraction.isCuratedExcursion || attraction.isExcursion) && (
              <span className="px-3 py-1 rounded-full bg-amber-500 text-white text-xs font-bold shadow flex items-center gap-1">
                <Compass className="w-3.5 h-3.5" />
                <span>Day Trip Excursion</span>
              </span>
            )}
          </div>

          {/* Heading overlay */}
          <div className="absolute bottom-4 left-6 right-6 text-white">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold">
              {attraction.name}
            </h2>
            <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-200 mt-1">
              <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
              <span>
                {attraction.city}, {attraction.state} • {attraction.curatedRoadDistanceKm ? `~${attraction.curatedRoadDistanceKm} km road distance` : (attraction.distanceKm !== undefined ? `${attraction.distanceKm} km (approx. straight-line)` : 'Nearby')} from center
              </span>
            </div>
            {attraction.photoMetadata && (
              <p className="text-[10px] text-slate-300 mt-1">
                Photo by {attraction.photoMetadata.photographer} on {attraction.photoMetadata.source} ({attraction.photoMetadata.license})
              </p>
            )}
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[60vh] overflow-y-auto">
          
          {/* Key Facts Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">Travel Time</span>
              <span className="text-xs font-bold text-slate-800">{attraction.estimatedTravelTime}</span>
            </div>
            <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">Entry Fee</span>
              <span className="text-xs font-bold text-slate-800">{attraction.entryFee}</span>
            </div>
            <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">Best Hours</span>
              <span className="text-xs font-bold text-slate-800">{attraction.bestTimeToVisit}</span>
            </div>
            <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">Visit Time</span>
              <span className="text-xs font-bold text-slate-800">{attraction.typicalVisitDuration}</span>
            </div>
          </div>

          {/* Excursion notice */}
          {(attraction.isCuratedExcursion || attraction.isExcursion) && attraction.excursionNotice && (
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div className="text-xs text-amber-900 leading-relaxed">
                <span className="font-bold block mb-0.5">Day Trip Excursion Advisory:</span>
                {attraction.excursionNotice}
              </div>
            </div>
          )}

          {/* Description */}
          <div>
            <h4 className="font-serif text-lg font-bold text-slate-900 mb-2">About this Attraction</h4>
            <p className="text-sm text-slate-600 leading-relaxed">
              {attraction.description}
            </p>
          </div>

          {/* Highlights */}
          <div>
            <h4 className="font-serif text-lg font-bold text-slate-900 mb-2.5">Key Highlights</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {attraction.highlights.map((h, i) => (
                <div key={i} className="flex items-center gap-2 text-xs font-medium text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  <Sparkles className="w-3.5 h-3.5 text-saffron-500 shrink-0" />
                  <span>{h}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Modal Footer Actions */}
        <div className="p-6 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={handleShare}
            className="px-4 py-3 rounded-2xl bg-white hover:bg-slate-100 text-slate-700 text-xs font-semibold border border-slate-200 flex items-center gap-2 transition-colors"
          >
            <Share2 className="w-4 h-4" />
            <span className="hidden sm:inline">Share</span>
          </button>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-3 rounded-2xl bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-bold transition-colors"
            >
              Close
            </button>

            <button
              type="button"
              onClick={() => toggleAttractionSelection(attraction.id)}
              className={`px-6 py-3 rounded-2xl text-xs font-bold flex items-center gap-2 transition-all shadow-md active:scale-95 ${
                selected
                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                  : 'bg-navy-900 hover:bg-navy-800 text-white'
              }`}
            >
              {selected ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Added to Itinerary</span>
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4" />
                  <span>Add to My Itinerary</span>
                </>
              )}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
