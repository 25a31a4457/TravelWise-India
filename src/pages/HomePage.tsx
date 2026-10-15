import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Sparkles, 
  Compass, 
  MapPin, 
  Calendar, 
  ShieldCheck, 
  ArrowRight, 
  CloudSun, 
  IndianRupee, 
  Home as HomeIcon, 
  CheckCircle2, 
  Sliders, 
  TrendingUp, 
  Bookmark,
  Layers,
  ChevronRight,
  Star,
  AlertCircle
} from 'lucide-react';
import { useTrip } from '../context/TripContext';
import { DESTINATIONS } from '../data/destinations';
import { SearchableCitySelect } from '../components/SearchableCitySelect';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { preferences, setPreferences, commitActivePlan, showToast } = useTrip();

  // Quick Starter form states - start empty with clean placeholders
  const [quickOrigin, setQuickOrigin] = useState<string>(preferences.originCity || '');
  const [rawQuickBudget, setRawQuickBudget] = useState<string>(
    preferences.budget > 0 ? String(preferences.budget) : ''
  );
  const [quickMonth, setQuickMonth] = useState<string>(preferences.travelMonth || '');
  const [quickError, setQuickError] = useState<string | null>(null);
  const [heroImageError, setHeroImageError] = useState(false);

  // Sync when preferences change (e.g. loaded saved plan or plan reset)
  useEffect(() => {
    setQuickOrigin(preferences.originCity || '');
    setRawQuickBudget(preferences.budget > 0 ? String(preferences.budget) : '');
    setQuickMonth(preferences.travelMonth || '');
  }, [preferences.originCity, preferences.budget, preferences.travelMonth]);

  const handleQuickBudgetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digitsOnly = e.target.value.replace(/[^0-9]/g, '');
    const sanitized = digitsOnly.length > 1 && digitsOnly.startsWith('0')
      ? String(parseInt(digitsOnly, 10))
      : digitsOnly;
    setRawQuickBudget(sanitized);
    if (quickError) setQuickError(null);
  };

  const handleQuickSearch = (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Validate Origin
    if (!quickOrigin || !quickOrigin.trim()) {
      setQuickError('Please select your starting origin city.');
      showToast('Origin Required', 'Please select your starting origin city.', 'warning');
      return;
    }

    // 2. Validate Travel Month
    if (!quickMonth || !quickMonth.trim()) {
      setQuickError('Please select your planned travel month.');
      showToast('Travel Month Required', 'Please choose a travel month.', 'warning');
      return;
    }

    // 3. Validate Budget
    const numBudget = parseInt(rawQuickBudget, 10);
    if (isNaN(numBudget) || numBudget <= 0) {
      setQuickError('Please enter a valid trip budget greater than ₹0.');
      showToast('Budget Required', 'Please enter a valid trip budget greater than ₹0.', 'warning');
      return;
    }

    setQuickError(null);

    // 4. Save exact user values to shared active plan & preferences
    const updatedPrefs = {
      ...preferences,
      originCity: quickOrigin.trim(),
      budget: numBudget,
      travelMonth: quickMonth,
      days: preferences.days > 0 ? preferences.days : 4,
      nights: preferences.nights > 0 ? preferences.nights : 3
    };

    setPreferences(updatedPrefs);
    commitActivePlan(updatedPrefs);

    // 5. Navigate to Trip Planner as specified in flow
    navigate('/plan');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const popularDestinationsList = [
    'coorg', 'munnar', 'araku', 'goa', 'jaipur', 'manali', 'varanasi', 'rishikesh', 'andaman', 'ooty'
  ];

  const popularDestinations = DESTINATIONS.filter(d => popularDestinationsList.includes(d.id));

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[90vh] flex items-center justify-center bg-slate-950 overflow-hidden text-white">
        {/* Authentic Indian Landscape Background with Natural Contrast Overlays */}
        <div className="absolute inset-0 bg-slate-950">
          {!heroImageError ? (
            <img
              src="https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=2000&q=85"
              alt="Lush Western Ghats Tea Estates and Mountain Valleys, India"
              className="w-full h-full object-cover object-center transform scale-100 transition-opacity duration-700"
              onError={() => setHeroImageError(true)}
              loading="eager"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-slate-950 via-slate-900 to-navy-950 opacity-90" />
          )}

          {/* Subtle natural dark vignette & linear gradients for text contrast (No harsh neon blue glow) */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/65 to-slate-950/35" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-transparent to-slate-950/40" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 z-10 w-full">
          <div className="max-w-3xl">
            
            {/* Top Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-amber-300 text-xs font-semibold mb-6 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-saffron-400" />
              <span>Next-Gen Tourism Planning & Forecasting for India</span>
            </div>

            {/* Main Heading */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
              Discover India <br />
              <span className="bg-gradient-to-r from-saffron-400 via-amber-300 to-emerald-400 bg-clip-text text-transparent">
                Your Way
              </span>
            </h1>

            {/* Subtitle */}
            <p className="mt-6 text-lg sm:text-xl text-slate-200 font-normal leading-relaxed max-w-2xl">
              Find destinations that match your budget, weather, stay preference, and travel style. Experience authentic homestays, dynamic itineraries, and predictive demand forecasts.
            </p>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                to="/plan"
                className="inline-flex items-center gap-2.5 px-7 py-4 bg-gradient-to-r from-saffron-500 to-amber-500 hover:from-saffron-600 hover:to-amber-600 text-white font-bold rounded-2xl shadow-premium hover:shadow-glow transition-all duration-300 hover:-translate-y-0.5"
              >
                <Sparkles className="w-5 h-5 text-amber-100" />
                <span>Plan My Trip</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </Link>

              <Link
                to="/recommendations"
                className="inline-flex items-center gap-2.5 px-6 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/25 text-white font-semibold rounded-2xl transition-all hover:-translate-y-0.5"
              >
                <Compass className="w-5 h-5 text-emerald-400" />
                <span>Explore Destinations</span>
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="mt-12 pt-8 border-t border-white/15 flex flex-wrap items-center gap-6 sm:gap-10 text-xs sm:text-sm text-slate-300">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
                <span className="font-semibold text-white">Budget-aware</span>
                <span className="text-slate-400 hidden sm:inline">• INR calibrated</span>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-teal-500/20 text-teal-400 flex items-center justify-center">
                  <CloudSun className="w-3.5 h-3.5" />
                </div>
                <span className="font-semibold text-white">Weather-smart</span>
                <span className="text-slate-400 hidden sm:inline">• Monsoon & season safe</span>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-saffron-500/20 text-saffron-400 flex items-center justify-center">
                  <Sparkles className="w-3.5 h-3.5" />
                </div>
                <span className="font-semibold text-white">Personalized plans</span>
                <span className="text-slate-400 hidden sm:inline">• {DESTINATIONS.length}+ iconic regions</span>
              </div>
            </div>

          </div>

          {/* Quick Starter Interactive Bar */}
          <div className="mt-12 bg-white/95 backdrop-blur-xl text-slate-900 p-4 sm:p-6 rounded-3xl shadow-2xl border border-white/40 max-w-4xl relative z-20">
            <form onSubmit={handleQuickSearch} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
              
              {/* Origin City */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-saffron-500" />
                  <span>Origin</span>
                </label>
                <SearchableCitySelect
                  value={quickOrigin}
                  onChange={(val) => {
                    setQuickOrigin(val);
                    if (quickError) setQuickError(null);
                  }}
                  placeholder="Select your origin"
                  compact={true}
                />
              </div>

              {/* Month */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5 flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-teal-600" />
                  <span>Travel Month</span>
                </label>
                <select
                  value={quickMonth}
                  onChange={e => {
                    setQuickMonth(e.target.value);
                    if (quickError) setQuickError(null);
                  }}
                  className={`w-full bg-slate-100 hover:bg-slate-200/80 text-slate-900 font-semibold text-sm rounded-xl px-3 py-2.5 h-[46px] border ${
                    !quickMonth ? 'text-slate-500' : 'text-slate-900'
                  } border-slate-200 focus:outline-none focus:ring-2 focus:ring-saffron-500`}
                >
                  <option value="" disabled>Select travel month</option>
                  {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map(m => (
                    <option key={m} value={m} className="text-slate-900">{m} 2026</option>
                  ))}
                </select>
              </div>

              {/* Budget INR */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5 flex items-center justify-between">
                  <span className="flex items-center gap-1">
                    <IndianRupee className="w-3 h-3 text-emerald-600" />
                    <span>Total Budget</span>
                  </span>
                  {rawQuickBudget && (
                    <span className="text-[11px] font-bold text-emerald-700">
                      ₹{parseInt(rawQuickBudget, 10).toLocaleString('en-IN')}
                    </span>
                  )}
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-bold text-slate-500 text-sm">₹</span>
                  <input
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    placeholder="Enter your total budget"
                    value={rawQuickBudget}
                    onChange={handleQuickBudgetChange}
                    className="w-full bg-slate-100 hover:bg-slate-200/80 text-slate-900 font-semibold text-sm rounded-xl pl-8 pr-3 py-2.5 h-[46px] border border-slate-200 focus:outline-none focus:ring-2 focus:ring-saffron-500 placeholder:text-slate-400"
                  />
                </div>
              </div>

              {/* Quick Submit */}
              <div>
                <button
                  type="submit"
                  className="w-full h-[46px] bg-gradient-to-r from-saffron-500 to-amber-500 hover:from-saffron-600 hover:to-amber-600 text-white font-bold text-sm rounded-xl shadow-md flex items-center justify-center gap-2 transition-all hover:shadow-lg active:scale-95 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-amber-100" />
                  <span>Plan My Trip</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </form>

            {/* Validation Notice if Error */}
            {quickError && (
              <div className="mt-3 text-xs text-rose-600 bg-rose-50 border border-rose-200 py-2 px-3 rounded-xl flex items-center gap-2 animate-fade-in">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
                <span>{quickError}</span>
              </div>
            )}
          </div>

        </div>
      </section>

      {/* 2. HOW IT WORKS SECTION */}
      <section className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-saffron-600 mb-2 block">
              Effortless Intelligence
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900">
              How TravelWise India Works
            </h2>
            <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
              Our 5-pillar recommendation formula scores destinations dynamically across travel logistics, seasonal weather, and accommodation styles.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            
            {/* Step 1 */}
            <div className="relative p-6 rounded-3xl bg-slate-50 border border-slate-200 hover:shadow-premium hover:-translate-y-1 transition-all duration-300 group">
              <div className="w-12 h-12 rounded-2xl bg-saffron-500/10 text-saffron-600 flex items-center justify-center font-bold text-lg mb-5 group-hover:bg-saffron-500 group-hover:text-white transition-colors shadow-sm">
                1
              </div>
              <h3 className="font-serif text-xl font-bold text-slate-900 mb-2">
                Enter trip details
              </h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                Choose your origin city, INR budget, dates, group type (Solo, Friends, Couple, Family), and travel pace.
              </p>
            </div>

            {/* Step 2 */}
            <div className="relative p-6 rounded-3xl bg-slate-50 border border-slate-200 hover:shadow-premium hover:-translate-y-1 transition-all duration-300 group">
              <div className="w-12 h-12 rounded-2xl bg-teal-500/10 text-teal-600 flex items-center justify-center font-bold text-lg mb-5 group-hover:bg-teal-600 group-hover:text-white transition-colors shadow-sm">
                2
              </div>
              <h3 className="font-serif text-xl font-bold text-slate-900 mb-2">
                Check weather & budget fit
              </h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                Smart climate models evaluate monsoon risks, temperature ranges, and total transit plus daily expenses.
              </p>
            </div>

            {/* Step 3 */}
            <div className="relative p-6 rounded-3xl bg-slate-50 border border-slate-200 hover:shadow-premium hover:-translate-y-1 transition-all duration-300 group">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center font-bold text-lg mb-5 group-hover:bg-emerald-600 group-hover:text-white transition-colors shadow-sm">
                3
              </div>
              <h3 className="font-serif text-xl font-bold text-slate-900 mb-2">
                Compare stays & destinations
              </h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                Review verified homestays, mountain cottages, and resorts with side-by-side comparison tools.
              </p>
            </div>

            {/* Step 4 */}
            <div className="relative p-6 rounded-3xl bg-slate-50 border border-slate-200 hover:shadow-premium hover:-translate-y-1 transition-all duration-300 group">
              <div className="w-12 h-12 rounded-2xl bg-navy-900/10 text-navy-900 flex items-center justify-center font-bold text-lg mb-5 group-hover:bg-navy-900 group-hover:text-white transition-colors shadow-sm">
                4
              </div>
              <h3 className="font-serif text-xl font-bold text-slate-900 mb-2">
                Get a personalized plan
              </h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                Receive day-by-day morning-to-evening itineraries, situation-aware photo galleries, and printable summaries.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* 3. POPULAR DESTINATIONS SECTION */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-teal-600 mb-1.5 block">
                Handpicked Circuits
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900">
                Popular Destinations Across India
              </h2>
              <p className="text-slate-600 text-sm mt-1 max-w-xl">
                From misty Western Ghats coffee estates and Himalayan trails to sacred river ghats and azure islands.
              </p>
            </div>

            <Link
              to="/recommendations"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-saffron-600 hover:text-saffron-700 transition-colors"
            >
              <span>View all {DESTINATIONS.length} destinations</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {popularDestinations.map(dest => {
              const decWeather = dest.monthlyWeather['December'];
              const stayPrice = dest.accommodationPrices['Homestay'] || dest.accommodationPrices['Budget Hotel'];

              return (
                <div
                  key={dest.id}
                  className="group bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-premium hover:-translate-y-1.5 transition-all duration-300 flex flex-col"
                >
                  {/* Image container */}
                  <div className="relative h-52 w-full overflow-hidden">
                    <img
                      src={dest.cardImage}
                      alt={dest.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                    
                    <span className="absolute top-3 right-3 text-[11px] font-bold px-2.5 py-1 bg-white/90 backdrop-blur-md text-slate-900 rounded-full shadow">
                      {dest.state}
                    </span>

                    <div className="absolute bottom-3 left-4 right-4 text-white">
                      <h3 className="font-serif text-xl font-bold">{dest.name}</h3>
                      <div className="flex items-center gap-2 text-xs text-slate-200 mt-0.5">
                        <CloudSun className="w-3.5 h-3.5 text-amber-300" />
                        <span>{decWeather?.tempMin}°-{decWeather?.tempMax}°C in Dec</span>
                      </div>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {dest.tagline}
                    </p>

                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                      <div>
                        <span className="text-slate-400 block text-[10px] uppercase font-bold">Homestay avg.</span>
                        <span className="font-bold text-slate-900 text-sm">₹{stayPrice.toLocaleString('en-IN')}<span className="text-[11px] text-slate-500 font-normal">/nt</span></span>
                      </div>
                      <Link
                        to={`/destination/${dest.id}`}
                        className="px-3.5 py-1.5 bg-slate-100 hover:bg-saffron-50 hover:text-saffron-700 text-slate-800 text-xs font-semibold rounded-xl transition-colors"
                      >
                        Explore
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 4. WHY TRAVELWISE INDIA SECTION */}
      <section className="py-20 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-saffron-600 mb-2 block">
                Travel With Confidence
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 leading-tight">
                Why TravelWise India?
              </h2>
              <p className="mt-4 text-slate-600 text-base leading-relaxed">
                Traveling across India is magical, but seasonal rains, price surges, and logistics can complicate planning. TravelWise transforms guesswork into clarity.
              </p>

              <div className="mt-8 space-y-5">
                
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-saffron-500/10 text-saffron-600 flex items-center justify-center shrink-0 mt-1">
                    <IndianRupee className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">Affordable, Transparent Planning</h4>
                    <p className="text-xs sm:text-sm text-slate-600 mt-0.5 leading-relaxed">
                      Every recommendation calculates round-trip origin transit, accommodation, daily food, and sightseeing so you never encounter surprise costs.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-teal-500/10 text-teal-600 flex items-center justify-center shrink-0 mt-1">
                    <CloudSun className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">Weather & Monsoon-Smart Matching</h4>
                    <p className="text-xs sm:text-sm text-slate-600 mt-0.5 leading-relaxed">
                      Automatically detects when hill roads have landslide alerts or when coastal waters are closed, guiding you only to season-optimal spots.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0 mt-1">
                    <HomeIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">Authentic Homestay & Stay Matching</h4>
                    <p className="text-xs sm:text-sm text-slate-600 mt-0.5 leading-relaxed">
                      Directly pairs you with authentic coffee estate homestays, heritage havelis, and eco-cottages tailored to couples, friends, or families.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-navy-900/10 text-navy-900 flex items-center justify-center shrink-0 mt-1">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">Predictive Tourism Demand Forecasting</h4>
                    <p className="text-xs sm:text-sm text-slate-600 mt-0.5 leading-relaxed">
                      Empowers administrators, hotel managers, and smart travelers with occupancy projections, tourist influx trends, and seasonal drivers.
                    </p>
                  </div>
                </div>

              </div>

              <div className="mt-10">
                <Link
                  to="/plan"
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-navy-900 hover:bg-navy-800 text-white font-bold text-sm rounded-xl shadow-md transition-all"
                >
                  <span>Start Planning for Free</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Visual showcase card */}
            <div className="relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200">
                <img
                  src="https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=1000&q=80"
                  alt="Coorg Coffee Estate Walk"
                  className="w-full h-[520px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-950/30 to-transparent" />

                {/* Floating Mock Preview Widget */}
                <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-md rounded-2xl p-5 shadow-2xl border border-white/40">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-saffron-600 uppercase tracking-wider">Top Match Highlight</span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold">
                      92% Match
                    </span>
                  </div>
                  <h4 className="font-serif text-lg font-bold text-slate-900">
                    Coorg (Kodagu), Karnataka
                  </h4>
                  <p className="text-xs text-slate-600 mt-1">
                    December: 12-25°C • Coffee Harvest • Homestays available • ₹22,400 for 5 Days from Bengaluru
                  </p>
                  <div className="mt-3 flex items-center justify-between text-xs pt-3 border-t border-slate-100">
                    <span className="text-emerald-700 font-semibold">₹2,600 Under Budget</span>
                    <Link to="/destination/coorg" className="font-bold text-navy-900 hover:underline">
                      View Demo Plan →
                    </Link>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 5. CALL TO ACTION BANNER */}
      <section className="py-20 bg-gradient-to-r from-navy-950 via-navy-900 to-navy-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#f97316_1px,transparent_1px)] [background-size:16px_16px]" />
        
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-saffron-500/20 text-saffron-300 text-xs font-semibold mb-4 border border-saffron-500/30">
            <Compass className="w-4 h-4" />
            <span>Ready for your next adventure?</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white max-w-2xl mx-auto leading-tight">
            Plan smarter. Travel beautifully across Incredible India.
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-xl mx-auto leading-relaxed">
            Enter your dates and budget to get instant, weather-verified destination recommendations with daily cost breakdowns.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/plan"
              className="inline-flex items-center gap-2.5 px-8 py-4 bg-gradient-to-r from-saffron-500 to-amber-500 hover:from-saffron-600 hover:to-amber-600 text-white font-bold rounded-2xl shadow-premium transition-all hover:scale-105"
            >
              <Sparkles className="w-5 h-5 text-amber-100" />
              <span>Launch Trip Planner</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>

            <Link
              to="/forecast"
              className="inline-flex items-center gap-2 px-6 py-4 bg-navy-800 hover:bg-navy-700 border border-navy-700 text-white font-semibold rounded-2xl transition-all"
            >
              <TrendingUp className="w-5 h-5 text-teal-400" />
              <span>View Tourism Forecasts</span>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};
