import React, { useState } from 'react';
import { useTrip } from '../context/TripContext';
import { DESTINATIONS } from '../data/destinations';
import { Layers, X, ArrowRight } from 'lucide-react';
import { ComparisonModal } from './ComparisonModal';

export const ComparisonDrawer: React.FC = () => {
  const { compareList, removeFromCompare, clearCompare } = useTrip();
  const [modalOpen, setModalOpen] = useState(false);

  if (compareList.length === 0) return null;

  const comparedDestinations = DESTINATIONS.filter(d => compareList.includes(d.id));

  return (
    <>
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-navy-900/95 backdrop-blur-lg border border-navy-700 text-white rounded-2xl shadow-2xl px-5 py-3.5 flex items-center gap-4 max-w-2xl w-[92vw] animate-slide-up">
        <div className="flex items-center gap-2 border-r border-navy-700 pr-4 shrink-0">
          <div className="w-8 h-8 rounded-lg bg-saffron-500/20 text-saffron-400 flex items-center justify-center">
            <Layers className="w-4 h-4" />
          </div>
          <div>
            <span className="text-xs font-semibold block">Comparing</span>
            <span className="text-[11px] text-slate-400">{compareList.length} of 3 destinations</span>
          </div>
        </div>

        {/* Selected Destination Badges */}
        <div className="flex items-center gap-2 overflow-x-auto flex-1 py-1">
          {comparedDestinations.map(dest => (
            <div
              key={dest.id}
              className="flex items-center gap-2 bg-navy-800 border border-navy-700/80 rounded-xl px-2.5 py-1.5 shrink-0"
            >
              <img
                src={dest.cardImage}
                alt={dest.name}
                className="w-6 h-6 rounded-md object-cover"
              />
              <span className="text-xs font-medium text-slate-200">{dest.name}</span>
              <button
                onClick={() => removeFromCompare(dest.id)}
                className="text-slate-400 hover:text-white transition-colors"
                aria-label={`Remove ${dest.name}`}
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setModalOpen(true)}
            className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-saffron-500 to-amber-500 hover:from-saffron-600 hover:to-amber-600 text-white text-xs font-semibold rounded-xl shadow-md transition-all active:scale-95"
          >
            <span>Compare Now</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={clearCompare}
            className="text-slate-400 hover:text-slate-200 text-xs px-2 py-1 transition-colors"
          >
            Clear
          </button>
        </div>
      </div>

      {modalOpen && (
        <ComparisonModal
          destinations={comparedDestinations}
          onClose={() => setModalOpen(false)}
        />
      )}
    </>
  );
};
