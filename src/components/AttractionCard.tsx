import React, { useState } from 'react';
import { 
  MapPin, 
  Clock, 
  IndianRupee, 
  Check, 
  Plus, 
  Info, 
  Sparkles, 
  AlertTriangle,
  Compass,
  Palmtree,
  Landmark,
  Trees,
  Mountain,
  Flame,
  Activity,
  Bird,
  Eye
} from 'lucide-react';
import { TouristAttraction, AttractionCategory } from '../data/attractions';
import { useTrip } from '../context/TripContext';

interface AttractionCardProps {
  attraction: TouristAttraction;
  selectedCityName?: string;
  onViewDetails?: (attraction: TouristAttraction) => void;
}

const CATEGORY_ICONS: Record<AttractionCategory, React.ReactNode> = {
  'Beach': <Palmtree className="w-3.5 h-3.5" />,
  'Temple': <Sparkles className="w-3.5 h-3.5" />,
  'Nature': <Trees className="w-3.5 h-3.5" />,
  'Heritage': <Landmark className="w-3.5 h-3.5" />,
  'Adventure': <Activity className="w-3.5 h-3.5" />,
  'Museum': <Landmark className="w-3.5 h-3.5" />,
  'Viewpoint': <Mountain className="w-3.5 h-3.5" />,
  'Palace': <Landmark className="w-3.5 h-3.5" />,
  'Lake': <Compass className="w-3.5 h-3.5" />,
  'Wildlife': <Bird className="w-3.5 h-3.5" />,
  'Spiritual': <Sparkles className="w-3.5 h-3.5" />
};

const CATEGORY_COLORS: Record<AttractionCategory, string> = {
  'Beach': 'bg-cyan-500/10 text-cyan-700 border-cyan-300/40',
  'Temple': 'bg-amber-500/10 text-amber-700 border-amber-300/40',
  'Nature': 'bg-emerald-500/10 text-emerald-700 border-emerald-300/40',
  'Heritage': 'bg-rose-500/10 text-rose-700 border-rose-300/40',
  'Adventure': 'bg-orange-500/10 text-orange-700 border-orange-300/40',
  'Museum': 'bg-purple-500/10 text-purple-700 border-purple-300/40',
  'Viewpoint': 'bg-teal-500/10 text-teal-700 border-teal-300/40',
  'Palace': 'bg-saffron-500/10 text-saffron-700 border-saffron-300/40',
  'Lake': 'bg-blue-500/10 text-blue-700 border-blue-300/40',
  'Wildlife': 'bg-lime-500/10 text-lime-700 border-lime-300/40',
  'Spiritual': 'bg-purple-500/10 text-purple-700 border-purple-300/40'
};

export const AttractionCard: React.FC<AttractionCardProps> = ({
  attraction,
  selectedCityName,
  onViewDetails
}) => {
  const { toggleAttractionSelection, isAttractionSelected } = useTrip();
  const [imageError, setImageError] = useState(false);
  const selected = isAttractionSelected(attraction.id);
  const isExcursion = Boolean(attraction.isCuratedExcursion || attraction.isExcursion);

  const fallbackImage = 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80';

  return (
    <div 
      className={`group bg-white rounded-3xl overflow-hidden border transition-all duration-300 flex flex-col justify-between ${
        selected 
          ? 'border-emerald-500 ring-2 ring-emerald-500/20 shadow-md bg-emerald-50/10' 
          : 'border-slate-200 hover:border-slate-300 hover:shadow-premium'
      }`}
    >
      <div>
        {/* Card Image Banner */}
        <div className="relative h-52 w-full overflow-hidden bg-slate-900">
          <img
            src={imageError ? fallbackImage : attraction.photoUrl}
            alt={attraction.name}
            onError={() => setImageError(true)}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent" />

          {/* Category Tag (Top Left) */}
          <div className="absolute top-3 left-3 flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-xs font-bold shadow-sm">
            <span className={CATEGORY_COLORS[attraction.category] || 'text-slate-800'}>
              {CATEGORY_ICONS[attraction.category]}
            </span>
            <span className="text-slate-800">{attraction.category}</span>
          </div>

          {/* Excursion vs Nearby Badge (Top Right) */}
          <div className="absolute top-3 right-3">
            {isExcursion ? (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-500/90 backdrop-blur-md text-white text-[11px] font-bold shadow-sm">
                <Compass className="w-3 h-3" />
                <span>Day Trip Excursion</span>
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-600/90 backdrop-blur-md text-white text-[11px] font-bold shadow-sm">
                <MapPin className="w-3 h-3" />
                <span>Nearby</span>
              </span>
            )}
          </div>

          {/* Title & Distance (Bottom of Image) */}
          <div className="absolute bottom-3 left-4 right-4 text-white">
            <h3 className="font-serif text-xl font-bold leading-tight group-hover:text-amber-200 transition-colors">
              {attraction.name}
            </h3>
            <div className="flex items-center gap-2 text-xs text-slate-200 mt-1">
              <span className="flex items-center gap-1 text-amber-300 font-semibold">
                <MapPin className="w-3 h-3" />
                <span>
                  {attraction.curatedRoadDistanceKm 
                    ? `~${attraction.curatedRoadDistanceKm} km` 
                    : (attraction.distanceKm !== undefined ? `${attraction.distanceKm} km (approx. straight-line)` : 'Nearby')}
                </span>
              </span>
              <span>•</span>
              <span className="text-slate-300 truncate">
                {attraction.city}, {attraction.state}
              </span>
            </div>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-5 space-y-4">
          
          {/* Travel Logistics Bar */}
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs bg-slate-50 p-2.5 rounded-xl border border-slate-100">
            <div className="flex items-center gap-1.5 text-slate-700">
              <Clock className="w-3.5 h-3.5 text-teal-600 shrink-0" />
              <span className="font-medium truncate">{attraction.estimatedTravelTime}</span>
            </div>
            <div className="flex items-center gap-1 text-slate-900 font-semibold">
              <IndianRupee className="w-3.5 h-3.5 text-emerald-600" />
              <span>{attraction.entryFee}</span>
            </div>
          </div>

          {/* Excursion Warning if applicable */}
          {isExcursion && attraction.excursionNotice && (
            <div className="flex items-start gap-2 p-2.5 rounded-xl bg-amber-50/80 border border-amber-200/70 text-amber-900 text-xs leading-relaxed">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <span>{attraction.excursionNotice}</span>
            </div>
          )}

          {/* Description */}
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3">
            {attraction.description}
          </p>

          {/* Highlights Chips */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {attraction.highlights.slice(0, 3).map((h, i) => (
              <span 
                key={i}
                className="text-[11px] font-medium bg-slate-100 hover:bg-slate-200/70 text-slate-700 px-2.5 py-0.5 rounded-lg border border-slate-200/60 transition-colors"
              >
                {h}
              </span>
            ))}
          </div>

        </div>
      </div>

      {/* Card Actions Footer */}
      <div className="p-5 pt-0">
        <div className="pt-3 border-t border-slate-100 flex items-center gap-2">
          
          {/* Quick Details Trigger */}
          {onViewDetails && (
            <button
              type="button"
              onClick={() => onViewDetails(attraction)}
              className="px-3.5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors focus:outline-none"
              title="View full attraction details"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Details</span>
            </button>
          )}

          {/* Add / Remove from Itinerary Button */}
          <button
            type="button"
            onClick={() => toggleAttractionSelection(attraction.id)}
            className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all active:scale-95 shadow-sm ${
              selected
                ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/20'
                : 'bg-navy-900 hover:bg-navy-800 text-white shadow-navy-900/10'
            }`}
          >
            {selected ? (
              <>
                <Check className="w-4 h-4 text-white" />
                <span>Added to Itinerary</span>
              </>
            ) : (
              <>
                <Plus className="w-4 h-4 text-white" />
                <span>Add to Itinerary</span>
              </>
            )}
          </button>

        </div>
      </div>

    </div>
  );
};
