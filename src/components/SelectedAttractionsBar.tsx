import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Sparkles, 
  MapPin, 
  IndianRupee, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowRight, 
  Trash2,
  Layers,
  Calendar,
  X,
  ChevronUp,
  ChevronDown
} from 'lucide-react';
import { useTrip } from '../context/TripContext';
import { validatePacingAndDuration } from '../utils/attractionRecommendations';

export const SelectedAttractionsBar: React.FC = () => {
  const { 
    selectedAttractions, 
    preferences, 
    clearSelectedAttractions, 
    toggleAttractionSelection,
    localAttractionsCost,
    planningMode,
    setPlanningMode,
    commitActivePlan
  } = useTrip();

  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);

  if (selectedAttractions.length === 0) return null;

  const pacing = validatePacingAndDuration(selectedAttractions, preferences.days);

  const handleProceed = () => {
    commitActivePlan();
    navigate('/recommendations');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <aside
      aria-label="Trip Itinerary Attractions Summary"
      className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-xl border-t border-slate-200 shadow-2xl transition-all animate-slide-up"
    >
      {/* Expanded Places Drawer */}
      {isExpanded && (
        <div className="max-w-7xl mx-auto px-4 pt-3 pb-2 border-b border-slate-100 max-h-48 overflow-y-auto">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Selected Places in Active Plan ({selectedAttractions.length})
            </span>
            <button
              onClick={() => setIsExpanded(false)}
              className="text-xs text-slate-400 hover:text-slate-600 flex items-center gap-1 cursor-pointer"
            >
              <ChevronDown className="w-3.5 h-3.5" />
              <span>Collapse</span>
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {selectedAttractions.map(attraction => (
              <span
                key={attraction.id}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100 text-slate-800 text-xs border border-slate-200"
              >
                <span className="font-medium">{attraction.name}</span>
                <span className="text-[10px] text-slate-500">
                  {attraction.isCuratedExcursion ? '(Excursion)' : `(${attraction.city})`}
                </span>
                <button
                  type="button"
                  onClick={() => toggleAttractionSelection(attraction.id)}
                  className="p-0.5 text-slate-400 hover:text-rose-600 rounded-full cursor-pointer ml-1"
                  aria-label={`Remove ${attraction.name}`}
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Main Action Bar */}
      <div className="max-w-7xl mx-auto p-3.5 sm:p-4 flex flex-col md:flex-row items-center justify-between gap-3 sm:gap-4">
        
        {/* Left: Counts and Cost */}
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsExpanded(prev => !prev)}
              className="w-10 h-10 rounded-2xl bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-700 flex items-center justify-center font-bold text-sm shadow-sm transition-colors cursor-pointer group"
              title="Toggle selected places drawer"
            >
              <span>{selectedAttractions.length}</span>
              <span className="sr-only">Toggle places view</span>
            </button>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="font-bold text-slate-900 text-sm">
                  <span>Selected for {preferences.originCity} Trip</span>
                </h4>
                <button
                  onClick={() => setIsExpanded(prev => !prev)}
                  className="text-[11px] text-saffron-600 hover:text-saffron-700 font-semibold flex items-center gap-0.5 cursor-pointer"
                >
                  {isExpanded ? <ChevronDown className="w-3 h-3" /> : <ChevronUp className="w-3 h-3" />}
                  <span>{isExpanded ? 'Hide' : 'Review Places'}</span>
                </button>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                <span>
                  {pacing.nearbyCount} Nearby • {pacing.excursionCount} Excursion{pacing.excursionCount === 1 ? '' : 's'}
                </span>
                <span>•</span>
                <span className="font-semibold text-emerald-700 flex items-center gap-0.5">
                  <IndianRupee className="w-3 h-3" />
                  <span>Est. local transit: ₹{localAttractionsCost.toLocaleString('en-IN')}</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Center: Planning Mode Selector Pill */}
        <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-2xl border border-slate-200 text-xs">
          <button
            type="button"
            onClick={() => setPlanningMode('individual')}
            className={`px-3 py-1.5 rounded-xl font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
              planningMode === 'individual'
                ? 'bg-white text-slate-900 shadow-sm font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Layers className="w-3.5 h-3.5 text-saffron-500" />
            <span>Individual Plans</span>
          </button>
          <button
            type="button"
            onClick={() => setPlanningMode('combined')}
            className={`px-3 py-1.5 rounded-xl font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
              planningMode === 'combined'
                ? 'bg-white text-slate-900 shadow-sm font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Calendar className="w-3.5 h-3.5 text-emerald-600" />
            <span>Combined Circuit</span>
          </button>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2.5 w-full md:w-auto justify-end">
          <button
            type="button"
            onClick={clearSelectedAttractions}
            className="px-3 py-2 rounded-xl hover:bg-slate-100 text-slate-500 hover:text-rose-600 text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
            title="Clear all selected attractions"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Clear</span>
          </button>

          <button
            type="button"
            onClick={handleProceed}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-saffron-500 to-amber-500 hover:from-saffron-600 hover:to-amber-600 text-white text-xs font-bold flex items-center gap-2 shadow-md transition-all active:scale-95 cursor-pointer"
          >
            <span>Proceed to Results</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </aside>
  );
};
