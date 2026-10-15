import React from 'react';
import { Destination, TripPreferences, CostBreakdown } from '../types';
import { Printer, X, Compass, CheckCircle2, Calendar, Users, MapPin, IndianRupee } from 'lucide-react';

interface PrintableItineraryModalProps {
  destination: Destination;
  preferences: TripPreferences;
  costs: CostBreakdown;
  onClose: () => void;
}

export const PrintableItineraryModal: React.FC<PrintableItineraryModalProps> = ({
  destination,
  preferences,
  costs,
  onClose
}) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/80 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-6 max-h-[92vh] flex flex-col">
        
        {/* Modal Controls (Not printed) */}
        <div className="flex items-center justify-between px-6 py-4 bg-navy-900 text-white shrink-0 print:hidden">
          <div className="flex items-center gap-2">
            <Compass className="w-5 h-5 text-saffron-400" />
            <span className="font-semibold text-sm">Printable Trip Summary & Itinerary</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-saffron-500 to-amber-500 hover:from-saffron-600 hover:to-amber-600 text-white text-xs font-semibold rounded-xl shadow transition-all"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Save PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Document Body */}
        <div className="overflow-y-auto p-8 sm:p-12 text-slate-900 bg-white" id="printable-area">
          {/* Header */}
          <div className="border-b-2 border-slate-900 pb-6 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
            <div>
              <div className="flex items-center gap-2 text-saffron-600 font-bold text-xs uppercase tracking-widest mb-1">
                <Compass className="w-4 h-4" />
                <span>TravelWise India • Official Itinerary</span>
              </div>
              <h1 className="font-serif text-3xl sm:text-4xl font-black text-slate-950">
                {destination.name}, {destination.state}
              </h1>
              <p className="text-slate-600 text-sm mt-1">{destination.tagline}</p>
            </div>
            <div className="text-left sm:text-right bg-slate-50 p-4 rounded-xl border border-slate-200 shrink-0">
              <span className="text-xs text-slate-500 block uppercase font-bold tracking-wider">Estimated Total</span>
              <span className="text-2xl font-black text-slate-950 font-serif">
                ₹{costs.total.toLocaleString('en-IN')}
              </span>
              <span className="text-[11px] text-emerald-700 block font-semibold">
                Budget: ₹{preferences.budget.toLocaleString('en-IN')}
              </span>
            </div>
          </div>

          {/* Trip Summary Meta Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 my-6 text-xs bg-slate-50 p-4 rounded-2xl border border-slate-200">
            <div>
              <span className="text-slate-500 block">Origin City</span>
              <span className="font-bold text-slate-900 flex items-center gap-1 mt-0.5">
                <MapPin className="w-3.5 h-3.5 text-saffron-500" />
                {preferences.originCity}
              </span>
            </div>
            <div>
              <span className="text-slate-500 block">Duration & Timing</span>
              <span className="font-bold text-slate-900 flex items-center gap-1 mt-0.5">
                <Calendar className="w-3.5 h-3.5 text-teal-600" />
                {preferences.days} Days / {preferences.nights} Nights ({preferences.travelMonth} {preferences.travelYear})
              </span>
            </div>
            <div>
              <span className="text-slate-500 block">Travel Style</span>
              <span className="font-bold text-slate-900 flex items-center gap-1 mt-0.5">
                <Users className="w-3.5 h-3.5 text-amber-500" />
                {preferences.groupType} • {preferences.travelPace} Pace
              </span>
            </div>
            <div>
              <span className="text-slate-500 block">Preferred Stay</span>
              <span className="font-bold text-slate-900 mt-0.5 block">
                {preferences.accommodationType}
              </span>
            </div>
          </div>

          {/* Cost Breakdown Grid */}
          <div className="my-8">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-3">
              Cost Breakdown (INR)
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-slate-500 block">Round-Trip Transit</span>
                <span className="font-bold text-slate-900 text-sm mt-1 block">₹{costs.transportCost.toLocaleString('en-IN')}</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-slate-500 block">{preferences.nights} Nights Stay</span>
                <span className="font-bold text-slate-900 text-sm mt-1 block">₹{costs.accommodationCost.toLocaleString('en-IN')}</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-slate-500 block">Food & Local Transit</span>
                <span className="font-bold text-slate-900 text-sm mt-1 block">₹{costs.dailyExpenseCost.toLocaleString('en-IN')}</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-slate-500 block">Sightseeing & Entry</span>
                <span className="font-bold text-slate-900 text-sm mt-1 block">₹{costs.activitiesCost.toLocaleString('en-IN')}</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-slate-500 block">Emergency Buffer</span>
                <span className="font-bold text-slate-900 text-sm mt-1 block">₹{costs.bufferAmount.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>

          {/* Day by Day Plan */}
          <div className="my-8">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-4">
              Suggested Day-by-Day Itinerary
            </h2>
            <div className="space-y-4">
              {destination.suggestedItinerary.slice(0, preferences.days).map((dayPlan, idx) => (
                <div key={dayPlan.day || idx} className="p-4 rounded-xl border border-slate-200 bg-white">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2 mb-2">
                    <span className="font-bold text-slate-900 text-sm">
                      Day {dayPlan.day}: {dayPlan.title}
                    </span>
                    <span className="text-xs font-semibold text-slate-500">
                      Approx. Day Expense: ₹{dayPlan.dailyCost.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-700">
                    <div>
                      <strong className="text-saffron-600 block mb-0.5">Morning</strong>
                      <p className="leading-relaxed">{dayPlan.morning}</p>
                    </div>
                    <div>
                      <strong className="text-teal-700 block mb-0.5">Afternoon</strong>
                      <p className="leading-relaxed">{dayPlan.afternoon}</p>
                    </div>
                    <div>
                      <strong className="text-navy-700 block mb-0.5">Evening</strong>
                      <p className="leading-relaxed">{dayPlan.evening}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Key Advice & Food Notes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 my-6 pt-4 border-t border-slate-200 text-xs">
            <div>
              <h3 className="font-bold text-slate-900 mb-2">Must-Taste Regional Cuisine</h3>
              <ul className="space-y-1 text-slate-600 list-disc list-inside">
                {destination.specialtyFood.map(food => (
                  <li key={food}>{food}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-slate-900 mb-2">Essential Travel Tips</h3>
              <ul className="space-y-1 text-slate-600">
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Carry light woolens for chilly evenings in {preferences.travelMonth}.</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Reserve homestay check-ins early for peak holiday dates.</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Keep digital offline maps downloaded for Western Ghats hill trails.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Footer note */}
          <div className="mt-8 pt-4 border-t border-slate-200 text-center text-[11px] text-slate-400">
            Generated by TravelWise India (Demo System) • Plan smarter. Travel beautifully.
          </div>
        </div>

      </div>
    </div>
  );
};
