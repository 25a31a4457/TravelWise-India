import React from 'react';
import { Destination } from '../types';
import { useTrip } from '../context/TripContext';
import { evaluateDestination } from '../utils/recommendationEngine';
import { X, Check, ArrowRight, ShieldCheck, Thermometer, IndianRupee, BedDouble, Compass } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ComparisonModalProps {
  destinations: Destination[];
  onClose: () => void;
}

export const ComparisonModal: React.FC<ComparisonModalProps> = ({ destinations, onClose }) => {
  const { preferences } = useTrip();

  const evaluated = destinations.map(dest => evaluateDestination(dest, preferences));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/80 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-5xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-8 max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 bg-navy-900 text-white shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-saffron-500/20 text-saffron-400 flex items-center justify-center">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-serif text-xl font-bold">Side-by-Side Trip Comparison</h2>
              <p className="text-xs text-slate-300">
                Comparing for {preferences.days}D/{preferences.nights}N from {preferences.originCity} • Budget: ₹{preferences.budget.toLocaleString('en-IN')}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-white/10 transition-colors"
            aria-label="Close Comparison"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Comparison Content */}
        <div className="overflow-x-auto overflow-y-auto flex-1 p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 min-w-[700px]">
            {evaluated.map(({ destination, matchScore, matchLabel, estimatedTotalCost, budgetStatus, currentWeather, costBreakdown }) => {
              const stayPrice = destination.accommodationPrices[preferences.accommodationType] || 2500;
              const isBest = matchScore >= 88;

              return (
                <div
                  key={destination.id}
                  className={`flex flex-col rounded-2xl border transition-all ${
                    isBest ? 'border-emerald-500/60 shadow-lg ring-2 ring-emerald-500/20' : 'border-slate-200 shadow-sm'
                  } bg-white overflow-hidden`}
                >
                  {/* Top Image & Badge */}
                  <div className="relative h-44 w-full overflow-hidden">
                    <img
                      src={destination.cardImage}
                      alt={destination.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                    
                    {isBest && (
                      <div className="absolute top-3 left-3 bg-emerald-600 text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>Top Recommended</span>
                      </div>
                    )}

                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <h3 className="font-serif text-lg font-bold leading-tight drop-shadow">{destination.name}</h3>
                      <p className="text-xs text-slate-200 font-medium">{destination.state}</p>
                    </div>
                  </div>

                  {/* Body Comparison Fields */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-5 text-sm">
                    {/* Match Score */}
                    <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                      <span className="text-slate-500 font-medium text-xs">Suitability Match</span>
                      <div className="flex items-center gap-2">
                        <span className="text-xl font-bold text-slate-900">{matchScore}%</span>
                        <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                          matchScore >= 88 ? 'bg-emerald-100 text-emerald-800' : 'bg-teal-100 text-teal-800'
                        }`}>
                          {matchLabel}
                        </span>
                      </div>
                    </div>

                    {/* Total Cost */}
                    <div className="pb-3 border-b border-slate-100">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-500 font-medium text-xs">Total Estimated Cost</span>
                        <span className="text-lg font-bold text-slate-900">
                          ₹{estimatedTotalCost.toLocaleString('en-IN')}
                        </span>
                      </div>
                      <div className="flex items-center justify-between mt-1 text-xs">
                        <span className="text-slate-400">Budget Status</span>
                        <span className={`font-semibold ${
                          budgetStatus === 'Within Budget' ? 'text-emerald-600' : 'text-amber-600'
                        }`}>
                          {budgetStatus}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-1">
                        {costBreakdown.remainingOrExtra >= 0
                          ? `₹${costBreakdown.remainingOrExtra.toLocaleString('en-IN')} under budget`
                          : `₹${Math.abs(costBreakdown.remainingOrExtra).toLocaleString('en-IN')} over target`}
                      </p>
                    </div>

                    {/* Weather Suitability */}
                    <div className="pb-3 border-b border-slate-100">
                      <span className="text-slate-500 font-medium text-xs block mb-1.5">
                        {preferences.travelMonth} Weather
                      </span>
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-1.5 font-semibold text-slate-800">
                          <Thermometer className="w-4 h-4 text-saffron-500" />
                          <span>{currentWeather.tempMin}°C - {currentWeather.tempMax}°C</span>
                        </span>
                        <span className="px-2 py-0.5 text-xs bg-slate-100 text-slate-700 rounded-md font-medium">
                          {currentWeather.condition}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-1 leading-snug">{currentWeather.summary}</p>
                    </div>

                    {/* Stay Option */}
                    <div className="pb-3 border-b border-slate-100">
                      <span className="text-slate-500 font-medium text-xs block mb-1">
                        {preferences.accommodationType} Tariff
                      </span>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-700 font-medium text-xs">Avg. per night</span>
                        <span className="font-semibold text-slate-900">₹{stayPrice.toLocaleString('en-IN')}</span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-1">
                        {preferences.nights} nights total: ₹{(stayPrice * preferences.nights).toLocaleString('en-IN')}
                      </p>
                    </div>

                    {/* Key Tags */}
                    <div>
                      <span className="text-slate-500 font-medium text-xs block mb-1.5">Key Highlights</span>
                      <div className="flex flex-wrap gap-1.5">
                        {destination.tags.slice(0, 4).map(tag => (
                          <span
                            key={tag}
                            className="text-[11px] px-2 py-0.5 bg-slate-100 text-slate-600 rounded-md font-medium"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* CTA button */}
                    <div className="pt-2">
                      <Link
                        to={`/destination/${destination.id}`}
                        onClick={onClose}
                        className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-navy-900 hover:bg-navy-800 text-white text-xs font-semibold rounded-xl shadow transition-colors"
                      >
                        <span>View Full Itinerary & Cost</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500 shrink-0">
          <span>Tip: You can change budget in the top bar to update cost projections dynamically.</span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 font-semibold rounded-lg transition-colors"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
