import React, { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { 
  Compass, 
  MapPin, 
  Search, 
  SlidersHorizontal, 
  Sparkles, 
  Palmtree, 
  Landmark, 
  Trees, 
  Mountain, 
  Activity, 
  Building2, 
  ChevronRight, 
  ArrowRight,
  Info,
  Calendar,
  AlertCircle
} from 'lucide-react';
import { SearchableCitySelect } from '../components/SearchableCitySelect';
import { AttractionCard } from '../components/AttractionCard';
import { AttractionDetailsModal } from '../components/AttractionDetailsModal';
import { SelectedAttractionsBar } from '../components/SelectedAttractionsBar';
import { 
  TouristAttraction, 
  AttractionCategory 
} from '../data/attractions';
import { getAttractionsForOrigin } from '../utils/attractionRecommendations';
import { DESTINATIONS } from '../data/destinations';
import { useTrip } from '../context/TripContext';

const POPULAR_HUBS = [
  'Visakhapatnam',
  'Hyderabad',
  'Bengaluru',
  'Chennai',
  'Mumbai',
  'Delhi',
  'Vijayawada',
  'Tirupati',
  'Rajahmundry',
  'Araku Valley',
  'Jaipur',
  'Kochi'
];

const CATEGORIES: { label: string; value: string; icon: React.ReactNode }[] = [
  { label: 'All Places', value: 'All', icon: <Sparkles className="w-3.5 h-3.5" /> },
  { label: 'Beaches', value: 'Beach', icon: <Palmtree className="w-3.5 h-3.5" /> },
  { label: 'Temples & Spiritual', value: 'Temple', icon: <Sparkles className="w-3.5 h-3.5" /> },
  { label: 'Nature & Parks', value: 'Nature', icon: <Trees className="w-3.5 h-3.5" /> },
  { label: 'Heritage & Forts', value: 'Heritage', icon: <Landmark className="w-3.5 h-3.5" /> },
  { label: 'Viewpoints', value: 'Viewpoint', icon: <Mountain className="w-3.5 h-3.5" /> },
  { label: 'Museums & Culture', value: 'Museum', icon: <Building2 className="w-3.5 h-3.5" /> },
  { label: 'Adventure', value: 'Adventure', icon: <Activity className="w-3.5 h-3.5" /> }
];

export const CityExplorerPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { preferences, setPreferences } = useTrip();

  // Selected city initialized from query param or TripContext
  const initialCity = searchParams.get('city') || preferences.originCity || 'Visakhapatnam';
  const [selectedCity, setSelectedCity] = useState<string>(initialCity);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [modalAttraction, setModalAttraction] = useState<TouristAttraction | null>(null);

  // Sync city selection
  const handleCityChange = (newCity: string) => {
    setSelectedCity(newCity);
    setSearchParams({ city: newCity });
    setPreferences(prev => ({ ...prev, originCity: newCity }));
  };

  // Get recommendations for selected origin city
  const attractionResult = useMemo(() => {
    return getAttractionsForOrigin(selectedCity, selectedCategory);
  }, [selectedCity, selectedCategory]);

  const city = attractionResult.originCity;
  const nearby = attractionResult.nearby;
  const excursions = attractionResult.excursions;
  const totalCount = attractionResult.totalCount;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-32">
      
      {/* 1. HERO HEADER */}
      <section className="relative bg-navy-950 text-white pt-16 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Subtle background overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:20px_20px] opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-900/60 via-transparent to-navy-950" />

        <div className="relative max-w-5xl mx-auto text-center space-y-4">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-amber-300 text-xs font-semibold shadow-sm">
            <Compass className="w-3.5 h-3.5 text-saffron-400" />
            <span>Geographic City Tourist Explorer</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
            Explore Places Near{' '}
            <span className="bg-gradient-to-r from-saffron-400 via-amber-300 to-emerald-400 bg-clip-text text-transparent">
              {city ? `${city.name}` : selectedCity}
            </span>
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Discover verified beaches, temples, viewpoints, and heritage landmarks in and around{' '}
            <span className="font-semibold text-white">{city?.name || selectedCity}</span>. 
            Separate local city highlights from longer-distance day-trip excursions.
          </p>

          {/* Search Bar Container */}
          <div className="mt-8 max-w-2xl mx-auto bg-white/95 backdrop-blur-md p-3 sm:p-4 rounded-3xl shadow-2xl border border-white/40 text-left">
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-saffron-600" />
              <span>Origin</span>
            </label>
            <SearchableCitySelect
              value={selectedCity}
              onChange={handleCityChange}
              label="Origin"
              placeholder="Enter your starting city"
              compact={true}
            />

            {/* Quick Hub Chips */}
            <div className="mt-3 pt-3 border-t border-slate-100 flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider shrink-0">
                Popular:
              </span>
              {POPULAR_HUBS.map(hub => (
                <button
                  key={hub}
                  type="button"
                  onClick={() => handleCityChange(hub)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                    selectedCity.toLowerCase() === hub.toLowerCase()
                      ? 'bg-navy-900 text-white shadow-sm'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  {hub}
                </button>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* 2. CATEGORY FILTERS BAR */}
      <section className="sticky top-20 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider shrink-0 flex items-center gap-1 mr-1">
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Filter:</span>
            </span>
            {CATEGORIES.map(cat => (
              <button
                key={cat.value}
                type="button"
                onClick={() => setSelectedCategory(cat.value)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap flex items-center gap-1.5 transition-all ${
                  selectedCategory === cat.value
                    ? 'bg-navy-900 text-white shadow-sm ring-2 ring-navy-900/10'
                    : 'bg-slate-100 hover:bg-slate-200/80 text-slate-700'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 3. MAIN RESULTS CONTAINER */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 space-y-16">
        
        {/* City Information Header */}
        {city ? (
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-saffron-600 mb-1">
                <MapPin className="w-3.5 h-3.5" />
                <span>Origin: {city.name}, {city.state}</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
                Tourist Attractions in and Around {city.name}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Showing {totalCount} tourist destination{totalCount === 1 ? '' : 's'} geographically relevant to {city.name}.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Link
                to="/plan"
                className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold flex items-center gap-1.5 transition-colors"
              >
                <span>Trip Planner</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ) : (
          /* Empty State when city is unknown */
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8 max-w-xl mx-auto">
            <div className="w-16 h-16 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-8 h-8" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-slate-900 mb-2">
              City Not Supported Yet
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mb-6 leading-relaxed">
              We do not yet have curated nearby attraction data for this city. Please try one of the supported cities.
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {POPULAR_HUBS.slice(0, 6).map(hub => (
                <button
                  key={hub}
                  type="button"
                  onClick={() => handleCityChange(hub)}
                  className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-saffron-50 hover:text-saffron-700 text-slate-800 text-xs font-semibold border border-slate-200 transition-colors"
                >
                  {hub}
                </button>
              ))}
            </div>
          </div>
        )}

        {city && (
          <>
            {/* SECTION A: POPULAR PLACES IN AND AROUND CITY (<= 50km) */}
            <section className="space-y-6">
              <div className="flex items-baseline justify-between border-b border-slate-200 pb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-slate-900">
                      Popular Places in & Around {city.name}
                    </h3>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    Nearby city beaches, temples, parks, viewpoints, and museums within ~50 km.
                  </p>
                </div>
                <span className="text-xs font-bold text-slate-400">
                  {nearby.length} place{nearby.length === 1 ? '' : 's'}
                </span>
              </div>

              {nearby.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {nearby.map((attraction: TouristAttraction) => (
                    <AttractionCard
                      key={attraction.id}
                      attraction={attraction}
                      selectedCityName={city.name}
                      onViewDetails={setModalAttraction}
                    />
                  ))}
                </div>
              ) : (
                <div className="p-8 rounded-2xl bg-white border border-slate-200 text-center text-slate-500 text-xs sm:text-sm">
                  No nearby attractions found in {city.name} matching the "{selectedCategory}" category filter. 
                  Try selecting "All Places".
                </div>
              )}
            </section>

            {/* SECTION B: NEARBY DAY TRIPS & EXCURSIONS (> 50km or isExcursion) */}
            <section className="space-y-6 pt-6">
              <div className="flex items-baseline justify-between border-b border-slate-200 pb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-slate-900">
                      Nearby Day Trips & Excursions from {city.name}
                    </h3>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    Scenic destinations outside the immediate city area (typically 50–150 km). Additional travel time or a full day is recommended.
                  </p>
                </div>
                <span className="text-xs font-bold text-slate-400">
                  {excursions.length} excursion{excursions.length === 1 ? '' : 's'}
                </span>
              </div>

              {excursions.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {excursions.map((attraction: TouristAttraction) => (
                    <AttractionCard
                      key={attraction.id}
                      attraction={attraction}
                      selectedCityName={city.name}
                      onViewDetails={setModalAttraction}
                    />
                  ))}
                </div>
              ) : (
                <div className="p-8 rounded-2xl bg-white border border-slate-200 text-center text-slate-500 text-xs sm:text-sm">
                  No day-trip excursions matching "{selectedCategory}" found within 150 km of {city.name}.
                </div>
              )}
            </section>

            {/* SECTION C: OTHER DESTINATIONS ACROSS INDIA (Nationwide Holiday Discovery) */}
            <section className="space-y-6 pt-10 border-t border-slate-200">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-teal-600 block mb-1">
                    Nationwide Circuits
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-slate-900">
                    Other Holiday Destinations Across India
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1">
                    Planning a complete multi-day vacation circuit outside {city.name}? Explore our 13 flagship destination itineraries.
                  </p>
                </div>

                <Link
                  to="/recommendations"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-saffron-600 hover:text-saffron-700 transition-colors shrink-0"
                >
                  <span>Explore all {DESTINATIONS.length} circuits</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {DESTINATIONS.slice(0, 4).map(dest => (
                  <Link
                    key={dest.id}
                    to={`/destination/${dest.id}`}
                    className="group bg-white rounded-2xl overflow-hidden border border-slate-200 hover:shadow-premium hover:-translate-y-1 transition-all"
                  >
                    <div className="relative h-40 w-full overflow-hidden">
                      <img
                        src={dest.cardImage}
                        alt={dest.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                      <div className="absolute bottom-2.5 left-3 right-3 text-white">
                        <span className="text-[10px] font-bold text-amber-300 block">{dest.state}</span>
                        <h4 className="font-serif text-base font-bold">{dest.name}</h4>
                      </div>
                    </div>
                    <div className="p-3.5 flex items-center justify-between text-xs">
                      <span className="text-slate-500 truncate">{dest.tagline}</span>
                      <span className="font-bold text-navy-900 group-hover:text-saffron-600 shrink-0 ml-2">View →</span>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          </>
        )}

      </main>

      {/* 4. MODAL & STICKY SUMMARY */}
      <AttractionDetailsModal
        attraction={modalAttraction}
        onClose={() => setModalAttraction(null)}
      />

      <SelectedAttractionsBar />

    </div>
  );
};
