import React, { useState, useMemo, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Sparkles, 
  MapPin, 
  IndianRupee, 
  Calendar, 
  CloudSun, 
  Thermometer, 
  Bookmark, 
  Layers, 
  ArrowRight, 
  Check, 
  Star, 
  ShieldCheck, 
  HelpCircle,
  Filter,
  ArrowUpDown,
  Home as HomeIcon,
  RotateCcw,
  Plane,
  Clock,
  Compass,
  AlertTriangle,
  SlidersHorizontal,
  ChevronRight,
  Download,
  CalendarDays,
  Trash2,
  ExternalLink,
  Info,
  CheckCircle2,
  Navigation
} from 'lucide-react';
import { useTrip } from '../context/TripContext';
import { useAuth } from '../context/AuthContext';
import { DESTINATIONS } from '../data/destinations';
import { ComparisonDrawer } from '../components/ComparisonDrawer';
import { getBudgetBreakdownAnalysis } from '../utils/recommendationEngine';
import { RecommendationResult, PlanningMode } from '../types';
import { resolvePlace, ResolvedPlace } from '../utils/itineraryEngine';
import { exportItineraryPDF } from '../utils/pdfExport';
import { AttractionDetailsModal } from '../components/AttractionDetailsModal';
import { TouristAttraction, getAttractionById } from '../data/attractions';

export const RecommendationsPage: React.FC = () => {
  const navigate = useNavigate();
  const { 
    preferences, 
    setPreferences,
    recommendations, 
    toggleSaveDestination, 
    isSaved, 
    compareList, 
    toggleCompare, 
    updateBudget,
    activePlan,
    planningMode,
    setPlanningMode,
    toggleAttractionSelection,
    saveActivePlan,
    showToast
  } = useTrip();

  const { user, isAuthenticated } = useAuth();

  // State for inspecting a specific place in individual mode
  const [activePlaceId, setActivePlaceId] = useState<string>(() => {
    return activePlan.selectedPlaceIds[0] || '';
  });

  // Keep activePlaceId in sync if selections change
  useEffect(() => {
    if (activePlan.selectedPlaceIds.length > 0 && !activePlan.selectedPlaceIds.includes(activePlaceId)) {
      setActivePlaceId(activePlan.selectedPlaceIds[0]);
    }
  }, [activePlan.selectedPlaceIds, activePlaceId]);

  // Modal for viewing full attraction details
  const [modalAttraction, setModalAttraction] = useState<TouristAttraction | null>(null);

  // Nationwide destinations filter and sort states
  const [selectedTag, setSelectedTag] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'match' | 'cost' | 'weather' | 'rating'>('match');
  const [tempBudget, setTempBudget] = useState(preferences.budget);

  useEffect(() => {
    setTempBudget(preferences.budget);
  }, [preferences.budget]);

  const filterTags = ['All', 'Within Budget', 'Mountains', 'Nature', 'Beach', 'Heritage', 'Spiritual', 'Adventure'];

  const budgetAnalysis = useMemo(() => {
    return getBudgetBreakdownAnalysis(DESTINATIONS, preferences);
  }, [preferences]);

  const filteredAndSorted = useMemo(() => {
    let list = [...recommendations];
    if (selectedTag === 'Within Budget') {
      list = list.filter(r => r.estimatedTotalCost <= preferences.budget);
    } else if (selectedTag !== 'All') {
      list = list.filter(r => r.destination.tags.includes(selectedTag));
    }

    if (sortBy === 'match') {
      list.sort((a, b) => b.matchScore - a.matchScore);
    } else if (sortBy === 'cost') {
      list.sort((a, b) => a.estimatedTotalCost - b.estimatedTotalCost);
    } else if (sortBy === 'weather') {
      list.sort((a, b) => b.weatherFitScore - a.weatherFitScore);
    } else if (sortBy === 'rating') {
      list.sort((a, b) => {
        const ratingA = a.destination.stays[0]?.rating || 4.5;
        const ratingB = b.destination.stays[0]?.rating || 4.5;
        return ratingB - ratingA;
      });
    }

    return list;
  }, [recommendations, selectedTag, sortBy, preferences.budget]);

  // Handle PDF Export
  const handleDownloadPDF = (targetPlaceId?: string) => {
    if (activePlan.selectedPlaceIds.length === 0) {
      showToast('No Places Selected', 'Please add places to your itinerary before exporting PDF.', 'warning');
      return;
    }

    const mode = targetPlaceId ? 'individual' : planningMode;
    exportItineraryPDF(activePlan, { mode, placeId: targetPlaceId });
    showToast('Itinerary Downloaded', 'PDF itinerary generated and downloaded successfully.', 'success');
  };

  // Handle Save Plan
  const handleSavePlan = () => {
    if (activePlan.selectedPlaceIds.length === 0) {
      showToast('Empty Plan', 'Please add at least one place before saving.', 'warning');
      return;
    }

    if (!isAuthenticated) {
      navigate('/login', { state: { from: '/recommendations' } });
      return;
    }

    saveActivePlan(user);
  };

  // Resolved places from active plan
  const resolvedSelectedPlaces = useMemo(() => {
    return activePlan.selectedPlaceIds
      .map(id => resolvePlace(id))
      .filter((p): p is ResolvedPlace => p !== undefined);
  }, [activePlan.selectedPlaceIds]);

  const currentIndividualItinerary = activePlaceId ? activePlan.individualItineraries[activePlaceId] : undefined;
  const currentResolvedPlace = activePlaceId ? resolvePlace(activePlaceId) : undefined;

  // Render Nationwide Destination Card
  const renderDestinationCard = (item: RecommendationResult, index: number, isNearBudgetAlternative = false) => {
    const { destination, matchScore, matchLabel, estimatedTotalCost, costBreakdown, budgetStatus, recommendationReason, currentWeather } = item;
    const isTopPick = index === 0 && matchScore >= 88 && !isNearBudgetAlternative;
    const inCompare = compareList.includes(destination.id);
    const saved = isSaved(destination.id);
    const shortfall = estimatedTotalCost - preferences.budget;

    return (
      <div 
        key={destination.id} 
        className={`bg-white rounded-3xl overflow-hidden border transition-all duration-300 hover:shadow-premium ${
          isTopPick 
            ? 'border-saffron-500/50 ring-2 ring-saffron-500/20 shadow-md' 
            : 'border-slate-200'
        }`}
      >
        <div className="flex flex-col lg:flex-row">
          
          {/* Left Column: Image & Badges */}
          <div className="relative lg:w-2/5 h-64 lg:h-auto min-h-[260px] overflow-hidden bg-slate-900">
            <img 
              src={destination.cardImage} 
              alt={destination.name}
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />

            {/* Badges */}
            <div className="absolute top-4 left-4 flex flex-wrap gap-2">
              {isTopPick && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-saffron-500 text-white text-xs font-bold shadow-lg">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Top Recommendation</span>
                </span>
              )}
              {isNearBudgetAlternative && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-500 text-white text-xs font-bold shadow">
                  <span>+₹{shortfall.toLocaleString('en-IN')} Over Target</span>
                </span>
              )}
              <span className="px-2.5 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-white text-xs font-semibold">
                {destination.region} India
              </span>
            </div>

            {/* Save Bookmark button */}
            <button
              onClick={() => toggleSaveDestination(destination.id)}
              className={`absolute top-4 right-4 p-2.5 rounded-full backdrop-blur-md transition-colors ${
                saved 
                  ? 'bg-saffron-500 text-white' 
                  : 'bg-slate-900/60 text-white hover:bg-slate-900/90'
              }`}
              title={saved ? 'Remove from wishlist' : 'Save to wishlist'}
              aria-label={saved ? 'Remove from wishlist' : 'Save to wishlist'}
            >
              <Bookmark className={`w-4 h-4 ${saved ? 'fill-white' : ''}`} />
            </button>

            {/* Bottom Overlay Title on Image */}
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <div className="flex items-center gap-2 text-xs text-saffron-300 font-semibold mb-1">
                <MapPin className="w-3.5 h-3.5" />
                <span>{destination.state}</span>
              </div>
              <h3 className="font-serif text-2xl font-bold tracking-tight text-white drop-shadow-sm">
                {destination.name}
              </h3>
            </div>
          </div>

          {/* Right Column: Key Details & Metrics */}
          <div className="flex-1 p-6 sm:p-8 flex flex-col justify-between space-y-6">
            
            {/* Header Metrics */}
            <div>
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
                {/* Match Score */}
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-2xl bg-emerald-500/15 text-emerald-700 flex items-center justify-center font-bold text-base font-serif">
                    {matchScore}%
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 block leading-none">Algorithm Fit</span>
                    <span className="text-xs font-bold text-emerald-700">{matchLabel}</span>
                  </div>
                </div>

                {/* Weather Pill */}
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs">
                  <CloudSun className="w-4 h-4 text-amber-500" />
                  <div>
                    <span className="font-bold text-slate-800">{currentWeather.tempMin}°C - {currentWeather.tempMax}°C</span>
                    <span className="text-slate-500 ml-1">({currentWeather.condition})</span>
                  </div>
                </div>

                {/* Total Cost */}
                <div className="text-right">
                  <span className="text-xs text-slate-500 block leading-none">Est. Package ({preferences.days}D/{preferences.nights}N)</span>
                  <span className="font-serif text-xl sm:text-2xl font-bold text-slate-900">
                    ₹{estimatedTotalCost.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* Tagline & Reason */}
              <div className="mt-4">
                <p className="text-sm font-medium text-slate-700 italic">
                  "{destination.tagline}"
                </p>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <span className="font-bold text-slate-800">Why this fits: </span>
                  {recommendationReason}
                </p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mt-4">
                {destination.tags.map(tag => (
                  <span key={tag} className="text-[11px] px-2.5 py-0.5 rounded-lg bg-slate-100 text-slate-600 font-medium">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => toggleCompare(destination.id)}
                className={`text-xs font-bold px-3 py-2 rounded-xl border transition-colors flex items-center gap-1.5 cursor-pointer ${
                  inCompare
                    ? 'bg-navy-900 text-white border-navy-900'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>{inCompare ? 'In Comparison' : 'Compare'}</span>
              </button>

              <Link
                to={`/destinations/${destination.id}`}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-navy-900 hover:bg-navy-800 text-white text-xs font-bold rounded-xl transition-all shadow-sm group"
              >
                <span>View Circuit Details</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>

          </div>

        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-28">
      
      {/* Top Banner: Your Selected Destinations */}
      <section className="bg-navy-950 text-white py-10 px-4 sm:px-6 lg:px-8 border-b border-navy-800">
        <div className="max-w-7xl mx-auto">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-saffron-500/20 text-saffron-400 text-xs font-semibold mb-3 border border-saffron-500/30">
                <Navigation className="w-3.5 h-3.5" />
                <span>Active Smart Itinerary</span>
              </div>
              <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-white">
                Your Selected Destinations
              </h1>
              <p className="text-slate-300 text-xs sm:text-sm mt-1">
                Custom travel plan departing from <strong>{activePlan.originCity.name}</strong> • {activePlan.days} Days / {activePlan.nights} Nights • {activePlan.travelMonth} {activePlan.travelYear}
              </p>
            </div>

            {/* Actions: Download PDF, Save, Edit */}
            <div className="flex flex-wrap items-center gap-2.5">
              <Link
                to="/plan"
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors flex items-center gap-1.5"
              >
                <SlidersHorizontal className="w-3.5 h-3.5 text-saffron-400" />
                <span>Edit Parameters</span>
              </Link>

              <button
                type="button"
                onClick={handleSavePlan}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Bookmark className="w-3.5 h-3.5 text-amber-400" />
                <span>Save Plan</span>
              </button>

              <button
                type="button"
                onClick={() => handleDownloadPDF()}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-saffron-500 to-amber-500 hover:from-saffron-600 hover:to-amber-600 text-white text-xs font-bold shadow-md transition-all flex items-center gap-1.5 cursor-pointer active:scale-95"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Itinerary (PDF)</span>
              </button>
            </div>
          </div>

          {/* Planning Mode Selector & Trip Parameters Bar */}
          <div className="mt-8 pt-6 border-t border-navy-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            
            {/* Planning Mode Switcher */}
            <div className="flex items-center gap-2 bg-navy-900 p-1 rounded-2xl border border-navy-800 text-xs">
              <span className="text-[11px] text-slate-400 font-semibold px-2">Mode:</span>
              <button
                type="button"
                onClick={() => setPlanningMode('individual')}
                className={`px-3 py-1.5 rounded-xl font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                  planningMode === 'individual'
                    ? 'bg-saffron-500 text-white shadow-sm font-semibold'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Individual Places Mode</span>
              </button>

              <button
                type="button"
                onClick={() => setPlanningMode('combined')}
                className={`px-3 py-1.5 rounded-xl font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                  planningMode === 'combined'
                    ? 'bg-emerald-600 text-white shadow-sm font-semibold'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                <CalendarDays className="w-3.5 h-3.5" />
                <span>Combined Circuit Mode</span>
              </button>
            </div>

            {/* Quick Metrics */}
            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-300">
              <span className="px-3 py-1 rounded-xl bg-navy-900 border border-navy-800">
                Budget: <strong>₹{activePlan.budget.toLocaleString('en-IN')}</strong> ({activePlan.budgetScope === 'perPerson' ? 'Per Person' : 'Total Group'})
              </span>
              <span className="px-3 py-1 rounded-xl bg-navy-900 border border-navy-800">
                Stay: <strong>{activePlan.accommodationType}</strong>
              </span>
              <span className="px-3 py-1 rounded-xl bg-navy-900 border border-navy-800">
                Group: <strong>{activePlan.groupType} ({activePlan.travelerCount} pax)</strong>
              </span>
            </div>

          </div>

        </div>
      </section>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-12">
        
        {/* ========================================================= */}
        {/* SECTION 1: USER'S EXACT SELECTED DESTINATIONS & ITINERARY */}
        {/* ========================================================= */}
        <section aria-labelledby="selected-destinations-heading">
          
          {resolvedSelectedPlaces.length === 0 ? (
            /* ZERO PLACES CASE */
            <div className="bg-white rounded-3xl p-8 border border-amber-300 shadow-sm text-center">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 mx-auto flex items-center justify-center mb-4">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <h2 className="font-serif text-2xl font-bold text-slate-900 mb-2">
                No places currently selected in your active itinerary
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto mb-6">
                Please return to the Trip Planner and add your preferred attractions or excursions near <strong>{activePlan.originCity.name}</strong> to generate your tailored itinerary.
              </p>
              <Link
                to="/plan"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-saffron-500 to-amber-500 hover:from-saffron-600 hover:to-amber-600 text-white font-bold text-xs shadow-md transition-all"
              >
                <span>Go to Trip Planner & Add Places</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ) : planningMode === 'individual' ? (
            /* ========================================= */
            /* INDIVIDUAL PLACES MODE VIEW               */
            /* ========================================= */
            <div className="space-y-8">
              
              {/* Place Selection Ribbon / Cards */}
              <div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                  <div>
                    <h2 id="selected-destinations-heading" className="font-serif text-2xl font-bold text-slate-900">
                      Your Selected Places ({resolvedSelectedPlaces.length})
                    </h2>
                    <p className="text-xs text-slate-500 mt-0.5">
                      <strong>Individual Mode:</strong> Each place is planned as an alternative standalone trip. Budgets are evaluated independently without summing costs together.
                    </p>
                  </div>
                  
                  <span className="text-xs font-semibold text-saffron-700 bg-saffron-50 px-3 py-1 rounded-full border border-saffron-200 shrink-0 self-start sm:self-center">
                    Select a card below to view its full itinerary
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {resolvedSelectedPlaces.map((place) => {
                    const isInspected = place.id === activePlaceId;
                    const placeItin = activePlan.individualItineraries[place.id];
                    const cost = placeItin?.totalEstimatedCostINR || 0;
                    const isWithin = cost <= activePlan.budget;

                    return (
                      <div
                        key={place.id}
                        onClick={() => setActivePlaceId(place.id)}
                        className={`bg-white rounded-2xl p-4 border transition-all cursor-pointer relative flex flex-col justify-between ${
                          isInspected
                            ? 'border-saffron-500 ring-2 ring-saffron-500/20 shadow-md bg-saffron-50/10'
                            : 'border-slate-200 hover:border-slate-300 hover:shadow-sm'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <img
                            src={place.photoUrl}
                            alt={place.name}
                            className="w-16 h-16 rounded-xl object-cover shrink-0 border border-slate-200"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
                              <span>{place.city}, {place.state}</span>
                              {place.isExcursion && (
                                <span className="px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 text-[10px] font-bold">
                                  Excursion (~{place.curatedRoadDistanceKm || 100} km)
                                </span>
                              )}
                            </div>
                            <h3 className="font-bold text-sm text-slate-900 truncate mt-0.5">
                              {place.name}
                            </h3>
                            <span className="text-[11px] text-slate-600 block line-clamp-1">
                              {place.category} • Entry: {place.entryFee}
                            </span>
                          </div>
                        </div>

                        {/* Standalone Cost and Actions */}
                        <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                          <div>
                            <span className="text-[10px] text-slate-400 block leading-tight">Standalone Cost</span>
                            <span className="font-bold text-slate-900 font-serif">
                              ₹{cost.toLocaleString('en-IN')}
                            </span>
                            <span className={`text-[10px] font-semibold ml-1.5 ${isWithin ? 'text-emerald-700' : 'text-rose-600'}`}>
                              ({isWithin ? 'Within Budget' : `+₹${(cost - activePlan.budget).toLocaleString('en-IN')} over`})
                            </span>
                          </div>

                          <div className="flex items-center gap-1.5">
                            {place.rawAttraction && (
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setModalAttraction(place.rawAttraction!);
                                }}
                                className="px-2 py-1 text-[11px] font-semibold text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100"
                                title="View place details modal"
                              >
                                Details
                              </button>
                            )}

                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleAttractionSelection(place.id);
                              }}
                              className="p-1 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-slate-100 cursor-pointer"
                              title="Remove from plan"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Detailed Itinerary View for Currently Inspected Place */}
              {currentResolvedPlace && currentIndividualItinerary && (
                <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
                  
                  {/* Header for Inspected Place Itinerary */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
                    <div>
                      <div className="flex items-center gap-2 text-xs text-saffron-600 font-bold uppercase tracking-wider mb-1">
                        <Compass className="w-4 h-4" />
                        <span>Standalone Alternative Itinerary</span>
                      </div>
                      <h3 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
                        {currentResolvedPlace.name} ({currentResolvedPlace.city})
                      </h3>
                      <p className="text-xs text-slate-500 mt-1">
                        {preferences.days} Days / {preferences.nights} Nights trip from <strong>{activePlan.originCity.name}</strong> • Category: {currentResolvedPlace.category} • Entry: {currentResolvedPlace.entryFee}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleDownloadPDF(currentResolvedPlace.id)}
                      className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow-sm transition-all flex items-center gap-2 shrink-0 self-start sm:self-center cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5 text-saffron-400" />
                      <span>Download {currentResolvedPlace.name} PDF</span>
                    </button>
                  </div>

                  {/* Day-by-Day Schedule Cards */}
                  <div>
                    <h4 className="font-bold text-sm uppercase tracking-wider text-slate-800 mb-4 flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-teal-600" />
                      <span>Day-by-Day Sightseeing Schedule</span>
                    </h4>

                    <div className="space-y-4">
                      {currentIndividualItinerary.days.map((day) => (
                        <div key={day.dayNumber} className="rounded-2xl border border-slate-200 overflow-hidden">
                          <div className="bg-slate-900 text-white px-4 py-2.5 flex items-center justify-between text-xs font-bold">
                            <span>DAY {day.dayNumber}: {day.title.toUpperCase()}</span>
                            <span className="text-slate-300 font-normal">Est. Day Cost: ₹{day.dayTotalINR.toLocaleString('en-IN')}</span>
                          </div>

                          <div className="p-4 space-y-3 bg-slate-50/50">
                            {day.highlight && (
                              <p className="text-xs text-slate-600 italic">
                                <strong>Day Highlight:</strong> {day.highlight}
                              </p>
                            )}

                            <div className="space-y-2">
                              {day.scheduledVisits.map((visit, vIdx) => (
                                <div key={vIdx} className="bg-white p-3 rounded-xl border border-slate-100 text-xs">
                                  <div className="flex items-center justify-between font-bold text-slate-900 mb-0.5">
                                    <span className="text-saffron-600 uppercase text-[11px] tracking-wide">
                                      [{visit.timeOfDay}] {visit.placeName}
                                    </span>
                                    <span className="text-slate-500 font-normal">Fee: {visit.estimatedEntryFee}</span>
                                  </div>
                                  <p className="text-slate-600 text-[11px]">
                                    {visit.activity}
                                  </p>
                                </div>
                              ))}
                            </div>

                            {day.travelSegments.length > 0 && (
                              <div className="space-y-1">
                                {day.travelSegments.map((seg, sIdx) => (
                                  <div key={sIdx} className="text-[11px] p-2 rounded-lg bg-amber-50/80 border border-amber-200 text-amber-900 flex items-center justify-between">
                                    <span>
                                      <strong>Transit Segment:</strong> {seg.fromPlaceName} → {seg.toPlaceName} ({seg.transitMode}, ~{seg.estimatedDistanceKm} km, ~{seg.estimatedDuration})
                                    </span>
                                    <span className="font-bold">₹{seg.estimatedTransitCostINR.toLocaleString('en-IN')}</span>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Budget & Cost Breakdown Table */}
                  <div className="pt-4 border-t border-slate-100">
                    <h4 className="font-bold text-sm uppercase tracking-wider text-slate-800 mb-3 flex items-center gap-2">
                      <IndianRupee className="w-4 h-4 text-emerald-600" />
                      <span>Estimated Budget Breakdown (Standalone)</span>
                    </h4>

                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                      <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-center">
                        <span className="text-[10px] text-slate-500 uppercase block font-semibold">Origin Transit</span>
                        <span className="font-bold text-sm text-slate-900">₹{currentIndividualItinerary.costBreakdown.transportCost.toLocaleString('en-IN')}</span>
                      </div>
                      <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-center">
                        <span className="text-[10px] text-slate-500 uppercase block font-semibold">Local Transit</span>
                        <span className="font-bold text-sm text-slate-900">₹{currentIndividualItinerary.costBreakdown.activitiesCost.toLocaleString('en-IN')}</span>
                      </div>
                      <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-center">
                        <span className="text-[10px] text-slate-500 uppercase block font-semibold">Stay ({activePlan.accommodationType})</span>
                        <span className="font-bold text-sm text-slate-900">₹{currentIndividualItinerary.costBreakdown.accommodationCost.toLocaleString('en-IN')}</span>
                      </div>
                      <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-center">
                        <span className="text-[10px] text-slate-500 uppercase block font-semibold">Food & Meals</span>
                        <span className="font-bold text-sm text-slate-900">₹{currentIndividualItinerary.costBreakdown.dailyExpenseCost.toLocaleString('en-IN')}</span>
                      </div>
                      <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-center">
                        <span className="text-[10px] text-slate-500 uppercase block font-semibold">Activities & Entry</span>
                        <span className="font-bold text-sm text-slate-900">₹{currentIndividualItinerary.costBreakdown.activitiesCost.toLocaleString('en-IN')}</span>
                      </div>
                      <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-center">
                        <span className="text-[10px] text-emerald-800 uppercase block font-bold">Total Estimated</span>
                        <span className="font-bold text-base text-emerald-900">₹{currentIndividualItinerary.totalEstimatedCostINR.toLocaleString('en-IN')}</span>
                      </div>
                    </div>
                  </div>

                </div>
              )}

            </div>
          ) : (
            /* ========================================= */
            /* COMBINED TRIP MODE VIEW                   */
            /* ========================================= */
            <div className="space-y-8">
              
              <div>
                <h2 id="selected-destinations-heading" className="font-serif text-2xl font-bold text-slate-900">
                  Unified Multi-Destination Itinerary
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  <strong>Combined Mode:</strong> All {resolvedSelectedPlaces.length} selected places are integrated into a sequential multi-day travel circuit with scheduled transit segments and unified budget comparison.
                </p>
              </div>

              {/* Feasibility & Pacing Advisory Banner */}
              {activePlan.combinedItinerary && (
                <div className={`p-4 sm:p-5 rounded-3xl border flex items-start gap-3 ${
                  !activePlan.combinedItinerary.isFeasible || activePlan.combinedItinerary.feasibilityWarnings.length > 0
                    ? 'bg-amber-50 border-amber-300 text-amber-950'
                    : 'bg-emerald-50 border-emerald-200 text-emerald-950'
                }`}>
                  {!activePlan.combinedItinerary.isFeasible || activePlan.combinedItinerary.feasibilityWarnings.length > 0 ? (
                    <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  ) : (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  )}

                  <div className="text-xs sm:text-sm">
                    <span className="font-bold block text-sm sm:text-base">
                      {!activePlan.combinedItinerary.isFeasible 
                        ? 'Trip Pacing Advisory: Schedule is Packed for Chosen Duration' 
                        : 'Feasibility Checked: Well-Paced Route'}
                    </span>
                    <ul className="mt-1 space-y-0.5 text-xs">
                      {activePlan.combinedItinerary.feasibilityWarnings.map((warn, wIdx) => (
                        <li key={wIdx}>• {warn}</li>
                      ))}
                      {activePlan.combinedItinerary.feasibilityWarnings.length === 0 && (
                        <li>• All {resolvedSelectedPlaces.length} places comfortably fit within your {activePlan.days}-day schedule.</li>
                      )}
                    </ul>
                  </div>
                </div>
              )}

              {/* Sequential Route Circuit Ribbon */}
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-3">
                  Planned Route Sequence
                </span>

                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-3 py-1.5 rounded-xl bg-navy-950 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm">
                    <MapPin className="w-3.5 h-3.5 text-saffron-400" />
                    <span>Origin: {activePlan.originCity.name}</span>
                  </span>

                  {resolvedSelectedPlaces.map((place, idx) => (
                    <React.Fragment key={place.id}>
                      <span className="text-slate-400 font-bold text-xs">→</span>
                      <span className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs border border-slate-200 flex items-center gap-1.5">
                        <span className="w-5 h-5 rounded-full bg-saffron-500 text-white text-[10px] flex items-center justify-center font-bold">
                          {idx + 1}
                        </span>
                        <span>{place.name}</span>
                        {place.isExcursion && (
                          <span className="text-[10px] text-amber-700 font-bold">
                            (~{place.curatedRoadDistanceKm || 100} km)
                          </span>
                        )}
                      </span>
                    </React.Fragment>
                  ))}
                </div>
              </div>

              {/* Combined Day-by-Day Schedule */}
              {activePlan.combinedItinerary && (
                <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
                  
                  <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-slate-900">
                      Multi-Day Itinerary Schedule
                    </h3>
                    <button
                      type="button"
                      onClick={() => handleDownloadPDF()}
                      className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow-sm transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5 text-saffron-400" />
                      <span>Download PDF</span>
                    </button>
                  </div>

                  <div className="space-y-4">
                    {activePlan.combinedItinerary.days.map((day) => (
                      <div key={day.dayNumber} className="rounded-2xl border border-slate-200 overflow-hidden">
                        <div className="bg-slate-900 text-white px-4 py-2.5 flex items-center justify-between text-xs font-bold">
                          <span>DAY {day.dayNumber}: {day.title.toUpperCase()}</span>
                          <span className="text-slate-300 font-normal">Est. Day Expense: ₹{day.dayTotalINR.toLocaleString('en-IN')}</span>
                        </div>

                        <div className="p-4 space-y-3 bg-slate-50/50">
                          {day.highlight && (
                            <p className="text-xs text-slate-600 italic">
                              <strong>Day Theme:</strong> {day.highlight}
                            </p>
                          )}

                          <div className="space-y-2">
                            {day.scheduledVisits.map((visit, vIdx) => (
                              <div key={vIdx} className="bg-white p-3 rounded-xl border border-slate-100 text-xs">
                                <div className="flex items-center justify-between font-bold text-slate-900 mb-0.5">
                                  <span className="text-saffron-600 uppercase text-[11px] tracking-wide">
                                    [{visit.timeOfDay}] {visit.placeName}
                                  </span>
                                  <span className="text-slate-500 font-normal">Entry: {visit.estimatedEntryFee}</span>
                                </div>
                                <p className="text-slate-600 text-[11px]">
                                  {visit.activity}
                                </p>
                              </div>
                            ))}
                          </div>

                          {day.travelSegments.length > 0 && (
                            <div className="space-y-1">
                              {day.travelSegments.map((seg, sIdx) => (
                                <div key={sIdx} className="text-[11px] p-2.5 rounded-xl bg-amber-50/90 border border-amber-200 text-amber-950 flex items-center justify-between">
                                  <span>
                                    <strong>Transit Route:</strong> {seg.fromPlaceName} → {seg.toPlaceName} ({seg.transitMode}, ~{seg.estimatedDistanceKm} km, ~{seg.estimatedDuration})
                                  </span>
                                  <span className="font-bold">₹{seg.estimatedTransitCostINR.toLocaleString('en-IN')}</span>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Combined Cost Summary Table */}
                  <div className="pt-6 border-t border-slate-100">
                    <h4 className="font-bold text-sm uppercase tracking-wider text-slate-800 mb-3 flex items-center gap-2">
                      <IndianRupee className="w-4 h-4 text-emerald-600" />
                      <span>Total Combined Trip Cost vs Budget</span>
                    </h4>

                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                      <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-center">
                        <span className="text-[10px] text-slate-500 uppercase block font-semibold">Origin Transit</span>
                        <span className="font-bold text-sm text-slate-900">₹{activePlan.combinedItinerary.costBreakdown.transportCost.toLocaleString('en-IN')}</span>
                      </div>
                      <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-center">
                        <span className="text-[10px] text-slate-500 uppercase block font-semibold">Inter-Place Transit</span>
                        <span className="font-bold text-sm text-slate-900">₹{activePlan.combinedItinerary.costBreakdown.activitiesCost.toLocaleString('en-IN')}</span>
                      </div>
                      <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-center">
                        <span className="text-[10px] text-slate-500 uppercase block font-semibold">Accommodations</span>
                        <span className="font-bold text-sm text-slate-900">₹{activePlan.combinedItinerary.costBreakdown.accommodationCost.toLocaleString('en-IN')}</span>
                      </div>
                      <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-center">
                        <span className="text-[10px] text-slate-500 uppercase block font-semibold">Meals & Food</span>
                        <span className="font-bold text-sm text-slate-900">₹{activePlan.combinedItinerary.costBreakdown.dailyExpenseCost.toLocaleString('en-IN')}</span>
                      </div>
                      <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-center">
                        <span className="text-[10px] text-slate-500 uppercase block font-semibold">Entry & Activities</span>
                        <span className="font-bold text-sm text-slate-900">₹{activePlan.combinedItinerary.costBreakdown.activitiesCost.toLocaleString('en-IN')}</span>
                      </div>
                      <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-center">
                        <span className="text-[10px] text-emerald-800 uppercase block font-bold">Total Combined</span>
                        <span className="font-bold text-base text-emerald-900">₹{activePlan.combinedItinerary.totalEstimatedCostINR.toLocaleString('en-IN')}</span>
                      </div>
                    </div>

                    <div className="mt-4 p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs">
                      <span className="text-slate-600">
                        Target Budget: <strong>₹{activePlan.budget.toLocaleString('en-IN')}</strong> ({activePlan.budgetScope === 'perPerson' ? 'Per Person' : 'Total Group'})
                      </span>
                      {activePlan.combinedItinerary.totalEstimatedCostINR <= activePlan.budget ? (
                        <span className="text-emerald-700 font-bold flex items-center gap-1">
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Within Budget (Remaining: ₹{(activePlan.budget - activePlan.combinedItinerary.totalEstimatedCostINR).toLocaleString('en-IN')})</span>
                        </span>
                      ) : (
                        <span className="text-rose-600 font-bold flex items-center gap-1">
                          <AlertTriangle className="w-4 h-4" />
                          <span>Exceeds Budget by ₹{(activePlan.combinedItinerary.totalEstimatedCostINR - activePlan.budget).toLocaleString('en-IN')}</span>
                        </span>
                      )}
                    </div>
                  </div>

                </div>
              )}

            </div>
          )}

        </section>

        {/* ========================================================= */}
        {/* SECTION 2: EXPLORE MORE NATIONWIDE DESTINATION CIRCUITS   */}
        {/* ========================================================= */}
        <section aria-labelledby="nationwide-circuits-heading" className="pt-8 border-t-2 border-slate-200">
          
          <div className="mb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-200 text-slate-700 text-xs font-semibold mb-2">
              <Compass className="w-3.5 h-3.5 text-navy-800" />
              <span>Broader Travel Inspiration</span>
            </div>
            <h2 id="nationwide-circuits-heading" className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
              Explore More Destination Circuits Across India
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Looking for inspiration beyond your selected attractions? Explore top-ranked nationwide destinations calibrated for your {preferences.travelMonth} travel style.
            </p>
          </div>

          {/* Tag filters and Sort Row */}
          <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm mb-6 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            
            {/* Filter Tags */}
            <div className="flex flex-wrap gap-1.5">
              {filterTags.map(tag => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => setSelectedTag(tag)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    selectedTag === tag
                      ? 'bg-navy-900 text-white shadow-sm'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center justify-between lg:justify-end gap-3 shrink-0">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                <ArrowUpDown className="w-3.5 h-3.5" />
                <span>Sort:</span>
              </span>
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value as any)}
                className="bg-slate-100 text-slate-900 font-semibold text-xs rounded-xl px-3 py-2 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-saffron-500"
              >
                <option value="match">Best Match (Score)</option>
                <option value="cost">Lowest Estimated Cost</option>
                <option value="weather">Best Weather Suitability</option>
                <option value="rating">Highest Rated Stays</option>
              </select>
            </div>

          </div>

          {/* Filtered Destination Cards List */}
          {filteredAndSorted.length > 0 ? (
            <div className="space-y-6">
              {filteredAndSorted.map((item, index) => renderDestinationCard(item, index, false))}
            </div>
          ) : (
            <div className="p-8 bg-white rounded-2xl border border-slate-200 text-center text-xs text-slate-500">
              No nationwide destination circuits matched the selected filter. Try choosing 'All'.
            </div>
          )}

        </section>

      </div>

      {/* Attraction Details Modal */}
      <AttractionDetailsModal
        attraction={modalAttraction}
        onClose={() => setModalAttraction(null)}
      />

      {/* Docked Comparison Drawer */}
      <ComparisonDrawer />

    </div>
  );
};
