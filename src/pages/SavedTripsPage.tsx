import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Bookmark, 
  ArrowRight, 
  Trash2, 
  MapPin, 
  IndianRupee, 
  Calendar, 
  Clock, 
  Download, 
  Edit3, 
  Eye, 
  Layers, 
  CalendarDays, 
  Sparkles,
  AlertTriangle,
  X,
  Compass
} from 'lucide-react';
import { useTrip } from '../context/TripContext';
import { DESTINATIONS } from '../data/destinations';
import { evaluateDestination } from '../utils/recommendationEngine';
import { exportItineraryPDF } from '../utils/pdfExport';
import { SavedPlanHistoryRecord } from '../types';
import { useAuth } from '../context/AuthContext';

export const SavedTripsPage: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const { 
    savedPlans, 
    deleteSavedPlan, 
    loadSavedPlanIntoActive, 
    savedDestinations, 
    toggleSaveDestination, 
    preferences 
  } = useTrip();

  const [activeTab, setActiveTab] = useState<'plans' | 'wishlist'>('plans');
  const [deleteConfirmPlanId, setDeleteConfirmPlanId] = useState<string | null>(null);

  const savedList = DESTINATIONS.filter(d => savedDestinations.includes(d.id));

  const handleViewItinerary = (plan: SavedPlanHistoryRecord) => {
    loadSavedPlanIntoActive(plan.planId);
    navigate('/recommendations');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleEditPlanAgain = (plan: SavedPlanHistoryRecord) => {
    loadSavedPlanIntoActive(plan.planId);
    navigate('/plan');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDownloadPDF = (plan: SavedPlanHistoryRecord) => {
    exportItineraryPDF(plan, { mode: plan.planningMode });
  };

  const confirmDelete = () => {
    if (deleteConfirmPlanId) {
      deleteSavedPlan(deleteConfirmPlanId);
      setDeleteConfirmPlanId(null);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-28">
      
      {/* Banner */}
      <section className="bg-navy-950 text-white py-12 px-4 sm:px-6 lg:px-8 border-b border-navy-800">
        <div className="max-w-7xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-saffron-500/20 text-saffron-400 text-xs font-semibold mb-3 border border-saffron-500/30">
            <Bookmark className="w-3.5 h-3.5 fill-saffron-400" />
            <span>My Travel History & Saved Plans</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Saved Trip Plans & Itineraries
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm mt-1">
            Access your saved custom itineraries, re-download verified PDF plans, or pick up planning right where you left off.
          </p>

          {/* Navigation Tabs */}
          <div className="mt-8 flex gap-3 border-b border-navy-800">
            <button
              type="button"
              onClick={() => setActiveTab('plans')}
              className={`pb-3 text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'plans'
                  ? 'border-saffron-500 text-saffron-400'
                  : 'border-transparent text-slate-400 hover:text-white'
              }`}
            >
              <Compass className="w-4 h-4" />
              <span>Saved Trip Itineraries {isAuthenticated ? `(${savedPlans.length})` : ''}</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('wishlist')}
              className={`pb-3 text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'wishlist'
                  ? 'border-saffron-500 text-saffron-400'
                  : 'border-transparent text-slate-400 hover:text-white'
              }`}
            >
              <Bookmark className="w-4 h-4" />
              <span>Wishlist Circuits ({savedList.length})</span>
            </button>
          </div>

        </div>
      </section>

      {/* Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* ========================================= */}
        {/* TAB 1: SAVED TRIP PLANS (PRIMARY)         */}
        {/* ========================================= */}
        {activeTab === 'plans' && (
          <div>
            {!isAuthenticated ? (
              <div className="bg-white rounded-3xl p-10 sm:p-14 text-center border border-slate-200 max-w-lg mx-auto shadow-sm">
                <div className="w-14 h-14 rounded-2xl bg-saffron-100 text-saffron-700 flex items-center justify-center mx-auto mb-4">
                  <Bookmark className="w-7 h-7" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-slate-900 mb-2">
                  Sign In to View Saved Trips
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mb-6 leading-relaxed max-w-sm mx-auto">
                  Saved itineraries and roadtrip snapshots are stored privately in your account. Sign in or register to access them anytime.
                </p>
                <div className="flex justify-center gap-3">
                  <Link
                    to="/login"
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-saffron-500 to-amber-500 text-white font-bold text-xs shadow-md hover:from-saffron-600 hover:to-amber-600 transition-all"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/signup"
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition-all"
                  >
                    Create Free Account
                  </Link>
                </div>
              </div>
            ) : savedPlans.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {savedPlans.map((plan) => {
                  const savedDate = new Date(plan.savedAt || plan.createdAt).toLocaleDateString('en-IN', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric'
                  });

                  return (
                    <div
                      key={plan.planId}
                      className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-premium transition-all flex flex-col justify-between space-y-5"
                    >
                      <div>
                        {/* Header Badges */}
                        <div className="flex items-center justify-between gap-2 mb-3">
                          <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${
                            plan.planningMode === 'combined'
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-saffron-100 text-saffron-800'
                          }`}>
                            {plan.planningMode === 'combined' ? 'Combined Circuit' : 'Individual Plans'}
                          </span>

                          <span className="text-[11px] text-slate-400">
                            Saved on {savedDate}
                          </span>
                        </div>

                        {/* Title */}
                        <h3 className="font-serif text-xl font-bold text-slate-900 leading-snug line-clamp-2">
                          {plan.title}
                        </h3>

                        {/* Origin & Meta */}
                        <div className="mt-3 space-y-1.5 text-xs text-slate-600">
                          <div className="flex items-center gap-1.5">
                            <MapPin className="w-3.5 h-3.5 text-saffron-600 shrink-0" />
                            <span>Origin: <strong>{plan.originCity.name}</strong></span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                            <span>Duration: <strong>{plan.days} Days / {plan.nights} Nights</strong> ({plan.travelMonth} {plan.travelYear})</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <IndianRupee className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                            <span>Budget: <strong>₹{plan.budget.toLocaleString('en-IN')}</strong> ({plan.budgetScope})</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-[11px] text-slate-500 pt-1">
                            <span>Places: <strong>{plan.selectedPlaceIds.length} attraction{plan.selectedPlaceIds.length === 1 ? '' : 's'} included</strong></span>
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="pt-4 border-t border-slate-100 flex flex-col gap-2">
                        <div className="grid grid-cols-2 gap-2">
                          <button
                            type="button"
                            onClick={() => handleViewItinerary(plan)}
                            className="w-full py-2 px-3 rounded-xl bg-navy-900 hover:bg-navy-800 text-white text-xs font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>View Itinerary</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => handleDownloadPDF(plan)}
                            className="w-full py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                          >
                            <Download className="w-3.5 h-3.5 text-saffron-600" />
                            <span>Download PDF</span>
                          </button>
                        </div>

                        <div className="flex items-center justify-between pt-1">
                          <button
                            type="button"
                            onClick={() => handleEditPlanAgain(plan)}
                            className="text-xs font-semibold text-saffron-600 hover:text-saffron-700 flex items-center gap-1 cursor-pointer"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                            <span>Edit / Plan Again</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => setDeleteConfirmPlanId(plan.planId)}
                            className="text-xs font-semibold text-rose-500 hover:text-rose-700 flex items-center gap-1 cursor-pointer"
                            title="Delete this saved plan"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Delete</span>
                          </button>
                        </div>
                      </div>

                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 max-w-md mx-auto shadow-sm">
                <div className="w-14 h-14 rounded-2xl bg-saffron-100 text-saffron-600 flex items-center justify-center mx-auto mb-4">
                  <Compass className="w-7 h-7" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-slate-900 mb-2">
                  No Saved Itineraries Yet
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mb-6 leading-relaxed">
                  Plan your journey from your starting origin city, select attractions, and click "Save Plan" to preserve snapshot itineraries here.
                </p>
                <Link
                  to="/plan"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-saffron-500 to-amber-500 text-white font-bold text-xs shadow-md hover:from-saffron-600 hover:to-amber-600 transition-all"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Start Planning a Trip</span>
                </Link>
              </div>
            )}
          </div>
        )}

        {/* ========================================= */}
        {/* TAB 2: SAVED WISHLIST CIRCUITS            */}
        {/* ========================================= */}
        {activeTab === 'wishlist' && (
          <div>
            {savedList.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {savedList.map(dest => {
                  const evalRes = evaluateDestination(dest, preferences);

                  return (
                    <div
                      key={dest.id}
                      className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-premium transition-all flex flex-col justify-between"
                    >
                      <div>
                        {/* Image */}
                        <div className="relative h-48 w-full overflow-hidden bg-slate-900">
                          <img
                            src={dest.cardImage}
                            alt={dest.name}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                          
                          <div className="absolute top-3 right-3">
                            <button
                              onClick={() => toggleSaveDestination(dest.id)}
                              className="p-2 rounded-full bg-rose-500 text-white shadow-md hover:bg-rose-600 transition-colors cursor-pointer"
                              title="Remove from saved"
                              aria-label="Remove from Saved"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>

                          <div className="absolute bottom-3 left-4 right-4 text-white">
                            <h2 className="font-serif text-xl font-bold">{dest.name}</h2>
                            <span className="text-xs text-slate-200">{dest.state}</span>
                          </div>
                        </div>

                        {/* Content */}
                        <div className="p-5 space-y-3">
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-slate-500">Trip Match:</span>
                            <span className="font-bold text-emerald-700 font-serif text-sm">
                              {evalRes.matchScore}% ({evalRes.matchLabel})
                            </span>
                          </div>

                          <div className="flex items-center justify-between text-xs">
                            <span className="text-slate-500">Estimated Cost:</span>
                            <span className="font-bold text-slate-900 text-sm">
                              ₹{evalRes.estimatedTotalCost.toLocaleString('en-IN')}
                            </span>
                          </div>

                          <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed pt-2 border-t border-slate-100">
                            {dest.tagline}
                          </p>
                        </div>
                      </div>

                      {/* Action Link */}
                      <div className="p-5 pt-0">
                        <Link
                          to={`/destinations/${dest.id}`}
                          className="w-full py-2.5 px-4 rounded-xl bg-navy-900 hover:bg-navy-800 text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5"
                        >
                          <span>Explore Details</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>

                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 max-w-md mx-auto shadow-sm">
                <Bookmark className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <h3 className="font-serif text-xl font-bold text-slate-800 mb-1">
                  Wishlist is Empty
                </h3>
                <p className="text-xs text-slate-500 mb-6">
                  Bookmark nationwide destinations while exploring recommendations to save them here.
                </p>
                <Link
                  to="/recommendations"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-navy-900 text-white font-bold text-xs hover:bg-navy-800 transition-colors"
                >
                  <span>Browse Recommendations</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            )}
          </div>
        )}

      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirmPlanId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-slate-200 text-slate-800">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mb-4">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl font-bold text-slate-900">
              Delete Saved Plan?
            </h3>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              Are you sure you want to delete this trip itinerary from your history? This action cannot be undone.
            </p>
            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setDeleteConfirmPlanId(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmDelete}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow transition-colors cursor-pointer"
              >
                Yes, Delete Plan
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
