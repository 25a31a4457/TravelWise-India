import React, { useState, useMemo, useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Compass, 
  MapPin, 
  IndianRupee, 
  Calendar, 
  Clock, 
  Users, 
  Building, 
  Sliders, 
  Sparkles, 
  Check, 
  AlertCircle, 
  Info, 
  ArrowRight, 
  RotateCcw,
  Mountain,
  Palmtree,
  Trees,
  Landmark,
  Flame,
  Activity,
  Bird,
  Utensils,
  Building2,
  Coffee,
  CheckCircle2,
  Layers,
  CalendarDays
} from 'lucide-react';
import { useTrip } from '../context/TripContext';
import { GroupType, AccommodationType, TravelPace, TripPreferences, PlanningMode } from '../types';
import { SearchableCitySelect } from '../components/SearchableCitySelect';
import { TouristAttraction } from '../data/attractions';
import { 
  getAttractionsForOrigin, 
  validatePacingAndDuration, 
  calculateLocalTransitEstimate 
} from '../utils/attractionRecommendations';
import { AttractionCard } from '../components/AttractionCard';
import { AttractionDetailsModal } from '../components/AttractionDetailsModal';
import { SelectedAttractionsBar } from '../components/SelectedAttractionsBar';
import { OriginChangeModal } from '../components/OriginChangeModal';

const INTEREST_ICONS: Record<string, React.ReactNode> = {
  'Mountains': <Mountain className="w-4 h-4" />,
  'Nature': <Trees className="w-4 h-4" />,
  'Beach': <Palmtree className="w-4 h-4" />,
  'Heritage': <Landmark className="w-4 h-4" />,
  'Culture': <Flame className="w-4 h-4" />,
  'Spiritual': <Sparkles className="w-4 h-4" />,
  'Adventure': <Activity className="w-4 h-4" />,
  'Wildlife': <Bird className="w-4 h-4" />,
  'Food': <Utensils className="w-4 h-4" />,
  'City Life': <Building2 className="w-4 h-4" />,
  'Relaxation': <Coffee className="w-4 h-4" />
};

export const TripPlannerPage: React.FC = () => {
  const navigate = useNavigate();
  const { 
    preferences, 
    setPreferences, 
    triggerSearch, 
    isAnalyzing, 
    selectedAttractions, 
    localAttractionsCost, 
    clearSelectedAttractions,
    showToast,
    planningMode,
    setPlanningMode,
    commitActivePlan
  } = useTrip();

  // Local form state initialized directly with context preferences
  const [formData, setFormData] = useState<TripPreferences>(preferences);
  const [rawBudget, setRawBudget] = useState<string>(
    preferences.budget > 0 ? String(preferences.budget) : ''
  );
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [modalAttraction, setModalAttraction] = useState<TouristAttraction | null>(null);
  const [attractionCategory, setAttractionCategory] = useState<string>('All');

  // Synchronize with context preferences if changed from Home quick search or plan reset
  useEffect(() => {
    setFormData(preferences);
    setRawBudget(preferences.budget > 0 ? String(preferences.budget) : '');
  }, [preferences]);

  // Confirmation modal when changing origin with active selections
  const [pendingOriginChange, setPendingOriginChange] = useState<string | null>(null);
  const [isOriginModalOpen, setIsOriginModalOpen] = useState(false);

  // Zero-place validation and scrolling ref
  const [highlightAttractions, setHighlightAttractions] = useState(false);
  const attractionsSectionRef = useRef<HTMLDivElement>(null);

  // Clear place validation error as soon as user adds any attraction
  useEffect(() => {
    if (selectedAttractions.length > 0 && (errors.places || highlightAttractions)) {
      setErrors(prev => ({ ...prev, places: '' }));
      setHighlightAttractions(false);
    }
  }, [selectedAttractions.length, errors.places, highlightAttractions]);

  // Attractions for currently chosen origin city
  const attractionResult = useMemo(
    () => getAttractionsForOrigin(formData.originCity, attractionCategory),
    [formData.originCity, attractionCategory]
  );
  const pacing = useMemo(
    () => validatePacingAndDuration(selectedAttractions, formData.days),
    [selectedAttractions, formData.days]
  );

  const handleOriginChange = (city: string) => {
    if (city.toLowerCase() === formData.originCity.toLowerCase()) return;

    if (selectedAttractions.length > 0) {
      setPendingOriginChange(city);
      setIsOriginModalOpen(true);
    } else {
      setFormData(prev => ({ ...prev, originCity: city }));
      setPreferences(prev => ({ ...prev, originCity: city }));
      if (errors.originCity) setErrors(prev => ({ ...prev, originCity: '' }));
    }
  };

  const handleKeepAndUpdateOrigin = () => {
    if (!pendingOriginChange) return;
    const newCity = pendingOriginChange;
    setFormData(prev => ({ ...prev, originCity: newCity }));
    setPreferences(prev => ({ ...prev, originCity: newCity }));
    setIsOriginModalOpen(false);
    setPendingOriginChange(null);
    showToast(
      'Origin Updated',
      `Origin set to ${newCity}. Preserved all ${selectedAttractions.length} attraction(s) and recomputed transit metrics.`,
      'success'
    );
  };

  const handleClearForNewCityOrigin = () => {
    if (!pendingOriginChange) return;
    const newCity = pendingOriginChange;
    clearSelectedAttractions();
    setFormData(prev => ({ ...prev, originCity: newCity }));
    setPreferences(prev => ({ ...prev, originCity: newCity }));
    setIsOriginModalOpen(false);
    setPendingOriginChange(null);
    showToast(
      'Origin Updated',
      `Cleared previous selections. Explore and add attractions around ${newCity}.`,
      'info'
    );
  };

  const handleCancelOriginChange = () => {
    setIsOriginModalOpen(false);
    setPendingOriginChange(null);
  };

  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const groupTypes: { type: GroupType; desc: string }[] = [
    { type: 'Solo', desc: 'Independent journeys & quiet self-discovery' },
    { type: 'Couple', desc: 'Romantic retreats, sunsets & scenic stays' },
    { type: 'Friends', desc: 'Group bonding, trekking, campfires & fun' },
    { type: 'Family', desc: 'Comfortable resorts, kid-friendly sightseeing' }
  ];

  const accommodationTypes: { type: AccommodationType; badge: string; desc: string }[] = [
    { type: 'Hostel', badge: 'Economy', desc: 'Bunks & social community dorms (₹550 - ₹1,200)' },
    { type: 'Budget Hotel', badge: 'Budget', desc: 'Clean basic private rooms (₹1,100 - ₹2,000)' },
    { type: 'Homestay', badge: 'Authentic', desc: 'Signature plantation & local hospitality (₹1,600 - ₹3,600)' },
    { type: '3-Star Hotel', badge: 'Comfort', desc: 'Full amenities & standard dining (₹2,400 - ₹4,500)' },
    { type: '4-Star Hotel', badge: 'Premium', desc: 'Superior comfort, pool & fitness (₹4,200 - ₹8,000)' },
    { type: 'Luxury Resort', badge: 'Opulent', desc: 'Palaces, private villas & 5-star spas (₹7,500+)' }
  ];

  const allInterests = [
    'Mountains', 'Nature', 'Beach', 'Heritage', 'Culture', 'Spiritual', 'Adventure', 'Wildlife', 'Food', 'City Life', 'Relaxation'
  ];

  const travelPaces: { pace: TravelPace; desc: string }[] = [
    { pace: 'Relaxed', desc: '1-2 key highlights per day, plenty of leisure time' },
    { pace: 'Balanced', desc: 'Optimal sightseeing with relaxed evenings' },
    { pace: 'Packed', desc: 'Fast-paced, maximize every attraction and tour' }
  ];

  // Budget Input Handler - Clean, natural typing without leading zeros bug
  const handleBudgetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputVal = e.target.value;
    const digitsOnly = inputVal.replace(/[^0-9]/g, '');

    if (digitsOnly === '') {
      setRawBudget('');
      setFormData(prev => ({ ...prev, budget: 0 }));
      if (errors.budget) setErrors(prev => ({ ...prev, budget: '' }));
      return;
    }

    // Strip accidental leading zeros like "07000" -> "7000" unless single "0"
    const sanitized = digitsOnly.length > 1 && digitsOnly.startsWith('0')
      ? String(parseInt(digitsOnly, 10))
      : digitsOnly;

    setRawBudget(sanitized);
    const numVal = parseInt(sanitized, 10);
    setFormData(prev => ({ ...prev, budget: isNaN(numVal) ? 0 : numVal }));
    if (errors.budget) setErrors(prev => ({ ...prev, budget: '' }));
  };

  const handlePresetBudget = (val: number) => {
    setRawBudget(String(val));
    setFormData(prev => ({ ...prev, budget: val }));
    if (errors.budget) setErrors(prev => ({ ...prev, budget: '' }));
  };

  // Validation
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.budget || formData.budget <= 0) {
      newErrors.budget = 'Please enter a valid trip budget greater than ₹0.';
    } else if (formData.budget < 2500) {
      newErrors.budget = 'Recommended minimum budget is ₹2,500 for realistic multi-day transit & stay.';
    }

    if (!formData.originCity || !formData.originCity.trim()) {
      newErrors.originCity = 'Please select a valid origin city.';
    }

    if (!formData.travelMonth || !formData.travelMonth.trim()) {
      newErrors.travelMonth = 'Please select a travel month.';
    }

    if (!formData.days || formData.days < 2) {
      newErrors.days = 'Number of days must be at least 2 for a full trip.';
    }

    if (formData.nights > formData.days) {
      newErrors.nights = 'Number of nights cannot exceed number of travel days.';
    }

    if (!formData.interests || formData.interests.length === 0) {
      newErrors.interests = 'Please select at least one travel interest.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInterestToggle = (interest: string) => {
    setFormData(prev => {
      const exists = prev.interests.includes(interest);
      const updated = exists
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest];
      
      // Clear interest error if at least one selected
      if (updated.length > 0 && errors.interests) {
        setErrors(err => ({ ...err, interests: '' }));
      }
      return { ...prev, interests: updated };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    // Zero place validation requirement
    if (selectedAttractions.length === 0) {
      setErrors(prev => ({ ...prev, places: 'Please add at least one place to your itinerary.' }));
      setHighlightAttractions(true);
      showToast('Selection Required', 'Please add at least one place to your itinerary.', 'warning');
      attractionsSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    setPreferences(formData);
    commitActivePlan(formData, selectedAttractions.map(a => a.id), planningMode);
    await triggerSearch(formData);
    navigate('/recommendations');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleResetDemo = () => {
    const demo: TripPreferences = {
      originCity: 'Bengaluru',
      budget: 25000,
      travelMonth: 'December',
      travelYear: 2026,
      days: 5,
      nights: 4,
      groupType: 'Friends',
      accommodationType: 'Homestay',
      interests: ['Mountains', 'Nature'],
      travelPace: 'Balanced',
      budgetOnly: false
    };
    setRawBudget('25000');
    setFormData(demo);
    setErrors({});
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      
      {/* Loading Modal if Analyzing */}
      {isAnalyzing && (
        <div className="fixed inset-0 z-50 bg-navy-950/85 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full text-center shadow-2xl border border-slate-200">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-saffron-500 to-amber-400 mx-auto flex items-center justify-center text-white shadow-lg animate-bounce mb-5">
              <Compass className="w-8 h-8 animate-spin" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-slate-900 mb-2">
              Analyzing Best Destinations
            </h3>
            <p className="text-xs text-slate-600 mb-6 leading-relaxed">
              Evaluating December weather suitability, origin transit from {formData.originCity}, and accommodation availability within ₹{formData.budget.toLocaleString('en-IN')}...
            </p>

            <div className="space-y-3 text-left text-xs bg-slate-50 p-4 rounded-2xl border border-slate-100">
              <div className="flex items-center gap-2 text-emerald-700 font-semibold">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Checking seasonal temperature & rainfall models</span>
              </div>
              <div className="flex items-center gap-2 text-emerald-700 font-semibold">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Calibrating {formData.nights} nights {formData.accommodationType} prices</span>
              </div>
              <div className="flex items-center gap-2 text-saffron-700 font-semibold animate-pulse">
                <Sparkles className="w-4 h-4 text-saffron-600" />
                <span>Matching {formData.interests.join(' & ')} travel styles</span>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-4xl mx-auto">
        
        {/* Header with Title and Reset Demo Button */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-saffron-100 text-saffron-800 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-saffron-600" />
            <span>AI-Calibrated Trip Recommender</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-slate-900 tracking-tight">
            Plan Your Ideal Indian Journey
          </h1>
          <p className="mt-3 text-slate-600 text-sm sm:text-base max-w-xl mx-auto">
            Input your travel parameters below. Our algorithm calculates accurate costs, checks weather suitability, and curates personalized itineraries.
          </p>

          <div className="mt-5 flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={handleResetDemo}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-100 shadow-sm transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
              <span>Reset to Coorg Demo Scenario (₹25k / Dec / Friends)</span>
            </button>
          </div>
        </div>

        {/* The Planning Form Card */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-3xl shadow-premium border border-slate-200/80 p-6 sm:p-10 space-y-10"
        >
          
          {/* SECTION 1: ORIGIN & BUDGET */}
          <div>
            <h2 className="text-base font-bold text-slate-900 uppercase tracking-wider mb-4 flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-navy-900 text-white text-xs flex items-center justify-center font-bold">1</span>
              <span>Origin & Budget</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Searchable Origin City */}
              <div>
                <SearchableCitySelect
                  value={formData.originCity}
                  onChange={handleOriginChange}
                  error={errors.originCity}
                  label="Origin"
                  placeholder="Select your origin"
                  helperText="Search any Indian city. Round-trip transit and nearby tourist attractions are calculated relative to your origin hub."
                />
              </div>

              {/* Total Budget in INR */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <IndianRupee className="w-4 h-4 text-emerald-600" />
                    <span>Total Trip Budget (Per Person in INR)</span>
                  </span>
                  <span className="text-emerald-700 font-bold font-serif text-sm">
                    {formData.budget > 0 ? `₹${formData.budget.toLocaleString('en-IN')}` : '₹0'}
                  </span>
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-slate-500">₹</span>
                  <input
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    placeholder="Enter your total budget"
                    value={rawBudget}
                    onChange={handleBudgetChange}
                    className={`w-full bg-slate-50 text-slate-900 font-bold text-base rounded-xl pl-9 pr-4 py-3.5 border ${
                      errors.budget ? 'border-rose-500 bg-rose-50/30' : 'border-slate-200'
                    } focus:outline-none focus:ring-2 focus:ring-saffron-500 transition-colors placeholder:text-slate-400 placeholder:font-normal`}
                  />
                </div>
                {errors.budget ? (
                  <p className="text-xs text-rose-600 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errors.budget}</span>
                  </p>
                ) : (
                  <p className="text-[11px] text-slate-500 mt-1.5 leading-tight">
                    Estimated budget per person covering transit, stays, daily food & activities.
                  </p>
                )}

                {/* Quick Budget Presets */}
                <div className="flex flex-wrap gap-2 mt-2.5">
                  {[5000, 7000, 15000, 25000, 40000, 60000].map(val => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => handlePresetBudget(val)}
                      className={`text-[11px] px-2.5 py-1 rounded-lg border font-semibold transition-colors ${
                        formData.budget === val
                          ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border-slate-200'
                      }`}
                    >
                      ₹{val.toLocaleString('en-IN')}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* DYNAMIC NEARBY TOURIST ATTRACTIONS NEAR ORIGIN */}
          <div 
            ref={attractionsSectionRef}
            className={`pt-6 border-t border-slate-100 transition-all rounded-3xl p-3 -mx-3 ${
              highlightAttractions || errors.places 
                ? 'ring-4 ring-amber-400/50 bg-amber-50/20 shadow-lg' 
                : ''
            }`}
          >
            {/* Zero Place Validation Alert Banner */}
            {errors.places && (
              <div 
                role="alert" 
                className="mb-6 p-4 rounded-2xl bg-amber-500/15 border-2 border-amber-500 text-amber-950 flex items-start gap-3 shadow-md animate-bounce"
              >
                <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div className="text-xs sm:text-sm">
                  <span className="font-bold block text-amber-900 text-sm sm:text-base">
                    Please add at least one place to your itinerary.
                  </span>
                  <p className="text-amber-800 text-xs mt-0.5">
                    Click "Add to Itinerary" on any of the curated attractions or day-trip excursions below to build your trip plan from {formData.originCity}.
                  </p>
                </div>
              </div>
            )}

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-saffron-600 mb-1">
                  <Compass className="w-4 h-4" />
                  <span>Curated Local Discovery</span>
                  {selectedAttractions.length > 0 && (
                    <span className="ml-2 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold border border-emerald-300">
                      {selectedAttractions.length} place{selectedAttractions.length > 1 ? 's' : ''} selected
                    </span>
                  )}
                </div>
                <h2 className="font-serif text-xl sm:text-2xl font-bold text-slate-900">
                  Explore Places Near {attractionResult.originCity?.name || formData.originCity}
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Discover verified attractions and day trips relative to your origin. Low budget does not hide local attractions.
                </p>
              </div>

              <Link
                to={`/explore-cities?city=${encodeURIComponent(formData.originCity)}`}
                className="text-xs font-bold text-saffron-600 hover:text-saffron-700 flex items-center gap-1 shrink-0 self-start sm:self-center"
              >
                <span>Full City Explorer</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-1.5 mb-6">
              {['All', 'Beach', 'Nature', 'Temple', 'Heritage', 'Museum', 'Adventure', 'Viewpoint'].map(cat => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setAttractionCategory(cat)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    attractionCategory === cat
                      ? 'bg-navy-900 text-white shadow-sm'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  {cat === 'All' ? 'All Places' : cat}
                </button>
              ))}
            </div>

            {/* Pacing Advisory Notice */}
            {selectedAttractions.length > 0 && (
              <div className={`p-4 rounded-2xl mb-6 border flex items-start gap-3 ${
                pacing.isOverloaded 
                  ? 'bg-amber-50 border-amber-200 text-amber-900' 
                  : 'bg-emerald-50 border-emerald-200 text-emerald-900'
              }`}>
                {pacing.isOverloaded ? (
                  <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                ) : (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                )}
                <div className="text-xs leading-relaxed">
                  <span className="font-bold block mb-0.5">
                    {pacing.isOverloaded ? 'Duration & Pacing Advisory:' : 'Pacing Check Passed:'}
                  </span>
                  {pacing.message}
                  <span className="block mt-1 text-[11px] font-semibold text-slate-700">
                    Estimated local transit demo estimate: ₹{localAttractionsCost.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>
            )}

            {attractionResult.isSupported ? (
              <div className="space-y-6">
                {/* Section A: Popular Places in & Around City (<= 50km) */}
                <div>
                  <div className="flex items-center justify-between mb-3 border-b border-slate-100 pb-2">
                    <h3 className="font-bold text-sm text-slate-800 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                      <span>Popular Places in & Around {attractionResult.originCity?.name} (≤ 50 km)</span>
                    </h3>
                    <span className="text-xs text-slate-400 font-semibold">{attractionResult.nearby.length} places</span>
                  </div>
                  {attractionResult.nearby.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {attractionResult.nearby.slice(0, 4).map(attraction => (
                        <AttractionCard
                          key={attraction.id}
                          attraction={attraction}
                          selectedCityName={formData.originCity}
                          onViewDetails={setModalAttraction}
                        />
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-slate-500 py-3">No nearby places in this category.</p>
                  )}
                </div>

                {/* Section B: Nearby Day Trips & Excursions (> 50km) */}
                {attractionResult.excursions.length > 0 && (
                  <div className="pt-2">
                    <div className="flex items-center justify-between mb-3 border-b border-slate-100 pb-2">
                      <h3 className="font-bold text-sm text-slate-800 flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-amber-500" />
                        <span>Nearby Day Trips & Excursions (&gt; 50 km)</span>
                      </h3>
                      <span className="text-xs text-slate-400 font-semibold">{attractionResult.excursions.length} excursions</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {attractionResult.excursions.slice(0, 2).map(attraction => (
                        <AttractionCard
                          key={attraction.id}
                          attraction={attraction}
                          selectedCityName={formData.originCity}
                          onViewDetails={setModalAttraction}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : !formData.originCity ? (
              <div className="p-8 rounded-2xl bg-slate-50 border border-dashed border-slate-200 text-center text-xs text-slate-600">
                <Compass className="w-8 h-8 text-saffron-500 mx-auto mb-2" />
                <p className="font-semibold text-slate-800 text-sm mb-1">
                  Select your Origin city above to explore nearby attractions
                </p>
                <p className="text-[11px] text-slate-500 max-w-md mx-auto">
                  Search any starting city (e.g. Visakhapatnam, Hyderabad, Bengaluru, Chennai, Delhi) to see top local sights, beaches, temples, and day-trip excursions.
                </p>
              </div>
            ) : (
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-center text-xs text-slate-600">
                <AlertCircle className="w-6 h-6 text-slate-400 mx-auto mb-2" />
                <p className="font-semibold text-slate-800 mb-1">
                  We do not yet have curated nearby attraction data for this city. Please try one of the supported cities.
                </p>
                <p className="text-[11px] text-slate-500">
                  Try selecting <strong>Visakhapatnam</strong>, <strong>Hyderabad</strong>, <strong>Bengaluru</strong>, <strong>Chennai</strong>, or <strong>Delhi</strong>.
                </p>
              </div>
            )}
          </div>

          {/* SECTION 2: DATES & DURATION */}
          <div className="pt-6 border-t border-slate-100">
            <h2 className="text-base font-bold text-slate-900 uppercase tracking-wider mb-4 flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-navy-900 text-white text-xs flex items-center justify-center font-bold">2</span>
              <span>Travel Dates & Duration</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Month */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2 flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-teal-600" />
                  <span>Travel Month</span>
                </label>
                <select
                  value={formData.travelMonth}
                  onChange={e => {
                    setFormData({ ...formData, travelMonth: e.target.value });
                    if (errors.travelMonth) setErrors(prev => ({ ...prev, travelMonth: '' }));
                  }}
                  className={`w-full bg-slate-50 ${
                    !formData.travelMonth ? 'text-slate-400 font-normal' : 'text-slate-900 font-semibold'
                  } text-sm rounded-xl px-3.5 py-3 border ${
                    errors.travelMonth ? 'border-rose-500 bg-rose-50/30' : 'border-slate-200'
                  } focus:outline-none focus:ring-2 focus:ring-saffron-500`}
                >
                  <option value="" disabled>Select travel month</option>
                  {months.map(m => (
                    <option key={m} value={m} className="text-slate-900 font-semibold">{m}</option>
                  ))}
                </select>
                {errors.travelMonth && <p className="text-xs text-rose-600 mt-1">{errors.travelMonth}</p>}
              </div>

              {/* Year */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  <span>Travel Year</span>
                </label>
                <select
                  value={formData.travelYear}
                  onChange={e => setFormData({ ...formData, travelYear: Number(e.target.value) })}
                  className="w-full bg-slate-50 text-slate-900 font-semibold text-sm rounded-xl px-3.5 py-3 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-saffron-500"
                >
                  <option value={2026}>2026</option>
                  <option value={2027}>2027</option>
                </select>
              </div>

              {/* Number of Days */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2 flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-amber-500" />
                  <span>Number of Days</span>
                </label>
                <div className="flex items-center">
                  <button
                    type="button"
                    onClick={() => {
                      if (formData.days > 2) {
                        const newDays = formData.days - 1;
                        const newNights = formData.nights >= newDays ? newDays - 1 : formData.nights;
                        setFormData({ ...formData, days: newDays, nights: newNights });
                        if (errors.days || errors.nights) setErrors(prev => ({ ...prev, days: '', nights: '' }));
                      }
                    }}
                    className="w-10 h-11 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-l-xl border border-r-0 border-slate-200 flex items-center justify-center text-base"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min={2}
                    max={21}
                    placeholder="4"
                    value={formData.days > 0 ? formData.days : ''}
                    onChange={e => {
                      const val = Number(e.target.value);
                      const newNights = formData.nights >= val ? Math.max(1, val - 1) : formData.nights;
                      setFormData({ ...formData, days: val, nights: newNights });
                      if (errors.days || errors.nights) setErrors(prev => ({ ...prev, days: '', nights: '' }));
                    }}
                    className="w-full text-center bg-slate-50 font-bold text-slate-900 border-y border-slate-200 h-11 focus:outline-none placeholder:text-slate-400 placeholder:font-normal"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const newDays = formData.days > 0 ? formData.days + 1 : 4;
                      const newNights = formData.nights > 0 ? formData.nights : 3;
                      setFormData({ ...formData, days: newDays, nights: newNights });
                      if (errors.days) setErrors(prev => ({ ...prev, days: '' }));
                    }}
                    className="w-10 h-11 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-r-xl border border-l-0 border-slate-200 flex items-center justify-center text-base"
                  >
                    +
                  </button>
                </div>
                {errors.days && <p className="text-xs text-rose-600 mt-1">{errors.days}</p>}
              </div>

              {/* Number of Nights */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  <span>Number of Nights</span>
                </label>
                <div className="flex items-center">
                  <button
                    type="button"
                    onClick={() => {
                      if (formData.nights > 1) {
                        setFormData({ ...formData, nights: formData.nights - 1 });
                        if (errors.nights) setErrors(prev => ({ ...prev, nights: '' }));
                      }
                    }}
                    className="w-10 h-11 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-l-xl border border-r-0 border-slate-200 flex items-center justify-center text-base"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min={1}
                    max={formData.days || 20}
                    placeholder="3"
                    value={formData.nights > 0 ? formData.nights : ''}
                    onChange={e => {
                      setFormData({ ...formData, nights: Number(e.target.value) });
                      if (errors.nights) setErrors(prev => ({ ...prev, nights: '' }));
                    }}
                    className="w-full text-center bg-slate-50 font-bold text-slate-900 border-y border-slate-200 h-11 focus:outline-none placeholder:text-slate-400 placeholder:font-normal"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const newNights = formData.nights > 0 ? formData.nights + 1 : 3;
                      setFormData({ ...formData, nights: newNights });
                      if (errors.nights) setErrors(prev => ({ ...prev, nights: '' }));
                    }}
                    className="w-10 h-11 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-r-xl border border-l-0 border-slate-200 flex items-center justify-center text-base"
                  >
                    +
                  </button>
                </div>
                {errors.nights && <p className="text-xs text-rose-600 mt-1">{errors.nights}</p>}
              </div>

            </div>
          </div>

          {/* SECTION 3: GROUP TYPE & ACCOMMODATION */}
          <div className="pt-6 border-t border-slate-100">
            <h2 className="text-base font-bold text-slate-900 uppercase tracking-wider mb-4 flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-navy-900 text-white text-xs flex items-center justify-center font-bold">3</span>
              <span>Travel Group & Accommodation Style</span>
            </h2>

            {/* Travel Group Radio Cards */}
            <div className="mb-6">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-3 flex items-center gap-1.5">
                <Users className="w-4 h-4 text-saffron-600" />
                <span>Travel Group</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {groupTypes.map(({ type, desc }) => {
                  const selected = formData.groupType === type;
                  return (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setFormData({ ...formData, groupType: type })}
                      className={`p-4 rounded-2xl border text-left transition-all ${
                        selected
                          ? 'border-saffron-500 bg-saffron-50/40 ring-2 ring-saffron-500/20 shadow-sm'
                          : 'border-slate-200 bg-slate-50 hover:bg-slate-100/60'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="font-bold text-sm text-slate-900">{type}</span>
                        {selected && <Check className="w-4 h-4 text-saffron-600 stroke-[3]" />}
                      </div>
                      <p className="text-[11px] text-slate-500 leading-snug">{desc}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Accommodation Type Cards */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-3 flex items-center gap-1.5">
                <Building className="w-4 h-4 text-teal-600" />
                <span>Preferred Accommodation</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {accommodationTypes.map(({ type, badge, desc }) => {
                  const selected = formData.accommodationType === type;
                  return (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setFormData({ ...formData, accommodationType: type })}
                      className={`p-4 rounded-2xl border text-left transition-all ${
                        selected
                          ? 'border-teal-600 bg-teal-50/40 ring-2 ring-teal-600/20 shadow-sm'
                          : 'border-slate-200 bg-slate-50 hover:bg-slate-100/60'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-sm text-slate-900">{type}</span>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
                          selected ? 'bg-teal-600 text-white' : 'bg-slate-200 text-slate-700'
                        }`}>
                          {badge}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 leading-snug">{desc}</p>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* SECTION 4: INTERESTS & PACE */}
          <div className="pt-6 border-t border-slate-100">
            <h2 className="text-base font-bold text-slate-900 uppercase tracking-wider mb-4 flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-navy-900 text-white text-xs flex items-center justify-center font-bold">4</span>
              <span>Travel Interests & Pace</span>
            </h2>

            {/* Interests Multi-Select */}
            <div className="mb-6">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2 flex items-center justify-between">
                <span>Travel Interests (Select all that apply)</span>
                <span className="text-slate-400 font-normal text-[11px]">
                  {formData.interests.length} selected
                </span>
              </label>
              
              <div className="flex flex-wrap gap-2.5">
                {allInterests.map(interest => {
                  const selected = formData.interests.includes(interest);
                  return (
                    <button
                      key={interest}
                      type="button"
                      onClick={() => handleInterestToggle(interest)}
                      className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl border text-xs font-semibold transition-all ${
                        selected
                          ? 'bg-navy-900 text-white border-navy-900 shadow-md ring-2 ring-navy-900/10'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100 hover:border-slate-300'
                      }`}
                    >
                      <span className={selected ? 'text-saffron-400' : 'text-slate-500'}>
                        {INTEREST_ICONS[interest]}
                      </span>
                      <span>{interest}</span>
                      {selected && <Check className="w-3.5 h-3.5 ml-1 text-white stroke-[3]" />}
                    </button>
                  );
                })}
              </div>
              {errors.interests && (
                <p className="text-xs text-rose-600 mt-2 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{errors.interests}</span>
                </p>
              )}
            </div>

            {/* Travel Pace */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-3 flex items-center gap-1.5">
                <Sliders className="w-4 h-4 text-emerald-600" />
                <span>Travel Pace</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {travelPaces.map(({ pace, desc }) => {
                  const selected = formData.travelPace === pace;
                  return (
                    <button
                      key={pace}
                      type="button"
                      onClick={() => setFormData({ ...formData, travelPace: pace })}
                      className={`p-4 rounded-2xl border text-left transition-all ${
                        selected
                          ? 'border-emerald-600 bg-emerald-50/40 ring-2 ring-emerald-600/20 shadow-sm'
                          : 'border-slate-200 bg-slate-50 hover:bg-slate-100/60'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-sm text-slate-900">{pace}</span>
                        {selected && <Check className="w-4 h-4 text-emerald-600 stroke-[3]" />}
                      </div>
                      <p className="text-[11px] text-slate-500 leading-snug">{desc}</p>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* SECTION 5: PLANNING MODE & SUBMIT */}
          <div className="pt-6 border-t border-slate-100 space-y-6">
            
            {/* Planning Mode Selector */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-3 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-saffron-600" />
                  <span>Itinerary Planning Mode</span>
                </span>
                <span className="text-[11px] text-slate-500 font-normal">
                  How should your selected places be scheduled?
                </span>
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setPlanningMode('individual')}
                  className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                    planningMode === 'individual'
                      ? 'border-saffron-500 bg-saffron-50/40 ring-2 ring-saffron-500/20 shadow-sm'
                      : 'border-slate-200 bg-slate-50 hover:bg-slate-100/60'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-sm text-slate-900 flex items-center gap-1.5">
                      <Layers className="w-4 h-4 text-saffron-600" />
                      <span>Individual Places Mode</span>
                    </span>
                    {planningMode === 'individual' && <Check className="w-4 h-4 text-saffron-600 stroke-[3]" />}
                  </div>
                  <p className="text-[11px] text-slate-600 leading-snug">
                    Plans each selected place as an alternative standalone trip. Budgets & schedules are evaluated separately without summing costs together.
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setPlanningMode('combined')}
                  className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                    planningMode === 'combined'
                      ? 'border-emerald-600 bg-emerald-50/40 ring-2 ring-emerald-600/20 shadow-sm'
                      : 'border-slate-200 bg-slate-50 hover:bg-slate-100/60'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-sm text-slate-900 flex items-center gap-1.5">
                      <CalendarDays className="w-4 h-4 text-emerald-600" />
                      <span>Combined Trip Mode</span>
                    </span>
                    {planningMode === 'combined' && <Check className="w-4 h-4 text-emerald-600 stroke-[3]" />}
                  </div>
                  <p className="text-[11px] text-slate-600 leading-snug">
                    Integrates all selected places into a single unified multi-destination route with sequential travel segments, combined budget comparison, and pacing checks.
                  </p>
                </button>
              </div>
            </div>

            {/* Budget filter toggle and Submit row */}
            <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              
              {/* Budget only toggle */}
              <label className="flex items-center gap-3 cursor-pointer select-none">
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={formData.budgetOnly}
                    onChange={e => setFormData({ ...formData, budgetOnly: e.target.checked })}
                    className="sr-only"
                  />
                  <div className={`block w-12 h-7 rounded-full transition-colors ${
                    formData.budgetOnly ? 'bg-saffron-500' : 'bg-slate-300'
                  }`} />
                  <div className={`dot absolute left-1 top-1 bg-white w-5 h-5 rounded-full transition-transform ${
                    formData.budgetOnly ? 'transform translate-x-5' : ''
                  }`} />
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-900 block">
                    Show only destinations within my budget
                  </span>
                  <span className="text-[11px] text-slate-500 block">
                    Hides spots that exceed ₹{formData.budget.toLocaleString('en-IN')}
                  </span>
                </div>
              </label>

              {/* Submit Button with count badge */}
              <div className="w-full sm:w-auto flex flex-col sm:items-end gap-1.5">
                {selectedAttractions.length > 0 ? (
                  <span className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{selectedAttractions.length} place{selectedAttractions.length > 1 ? 's' : ''} selected for your {formData.originCity} trip</span>
                  </span>
                ) : (
                  <span className="text-[11px] text-amber-700 font-medium">
                    Select at least 1 place above to proceed
                  </span>
                )}
                
                <button
                  type="submit"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-saffron-500 via-saffron-600 to-amber-500 hover:from-saffron-600 hover:to-amber-600 text-white font-bold text-base rounded-2xl shadow-premium hover:shadow-glow transition-all duration-300 active:scale-95 cursor-pointer"
                >
                  <Sparkles className="w-5 h-5 text-amber-100" />
                  <span>Find My Perfect Trip</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </button>
              </div>

            </div>

          </div>

        </form>

      </div>

      {/* Origin Change Confirmation Modal */}
      <OriginChangeModal
        isOpen={isOriginModalOpen}
        previousOrigin={formData.originCity}
        newOrigin={pendingOriginChange || ''}
        selectedCount={selectedAttractions.length}
        onKeepAndUpdate={handleKeepAndUpdateOrigin}
        onClearForNewCity={handleClearForNewCityOrigin}
        onCancel={handleCancelOriginChange}
      />

      {/* Attraction Details Modal */}
      <AttractionDetailsModal
        attraction={modalAttraction}
        onClose={() => setModalAttraction(null)}
      />

      {/* Selected Attractions Sticky Bar */}
      <SelectedAttractionsBar />

    </div>
  );
};
