import React, { useState, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Bookmark, 
  Share2, 
  Download, 
  MapPin, 
  Calendar, 
  Clock, 
  Users, 
  Building, 
  ShieldCheck, 
  Thermometer, 
  CloudRain, 
  Sun, 
  IndianRupee, 
  Check, 
  Star, 
  Sparkles, 
  Info, 
  Eye, 
  ChevronRight, 
  Printer,
  CloudSun,
  Camera
} from 'lucide-react';
import { DESTINATIONS } from '../data/destinations';
import { useTrip } from '../context/TripContext';
import { evaluateDestination } from '../utils/recommendationEngine';
import { PrintableItineraryModal } from '../components/PrintableItineraryModal';
import { SituationGalleryModal } from '../components/SituationGalleryModal';
import { AccommodationPhotoLightbox } from '../components/AccommodationPhotoLightbox';
import { AccommodationDetailsModal } from '../components/AccommodationDetailsModal';
import { StayOption } from '../types';
import { getStayPhotoMetadata, getStayGalleryPhotos } from '../utils/photoHelpers';

export const DestinationDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { preferences, isSaved, toggleSaveDestination, showToast } = useTrip();

  // Find destination
  const destination = DESTINATIONS.find(d => d.id === id) || DESTINATIONS[0];
  const evalResult = useMemo(() => evaluateDestination(destination, preferences), [destination, preferences]);

  // Gallery filter
  const [galleryFilter, setGalleryFilter] = useState<string>('all');
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);
  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);

  // View-Only Accommodation modals
  const [selectedStayForModal, setSelectedStayForModal] = useState<StayOption | null>(null);
  const [selectedStayForLightbox, setSelectedStayForLightbox] = useState<StayOption | null>(null);

  // Filter photos
  const filteredPhotos = useMemo(() => {
    if (galleryFilter === 'all') return destination.situationPhotos;
    return destination.situationPhotos.filter(p => p.category === galleryFilter);
  }, [destination, galleryFilter]);

  const saved = isSaved(destination.id);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast('Link Copied!', 'Destination share link has been copied to your clipboard.', 'success');
    }
  };

  const weather = evalResult.currentWeather;

  // Costs derived cleanly from the recommendation engine without tampering from clicking stay cards
  const costs = evalResult.costBreakdown;

  // Mock 5-day mini weather forecast for this destination
  const miniForecast = [
    { day: 'Day 1', temp: `${weather.tempMin + 1}° - ${weather.tempMax - 1}°`, condition: 'Clear Skies', rain: '5%' },
    { day: 'Day 2', temp: `${weather.tempMin}° - ${weather.tempMax}°`, condition: 'Morning Mist', rain: '2%' },
    { day: 'Day 3', temp: `${weather.tempMin + 2}° - ${weather.tempMax + 1}°`, condition: 'Sunny & Crisp', rain: '0%' },
    { day: 'Day 4', temp: `${weather.tempMin}° - ${weather.tempMax - 1}°`, condition: 'Mild Breeze', rain: '10%' },
    { day: 'Day 5', temp: `${weather.tempMin - 1}° - ${weather.tempMax}°`, condition: 'Clear Sky', rain: '0%' }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-24">
      
      {/* 1. HERO HEADER */}
      <section className="relative h-[60vh] min-h-[420px] bg-navy-950 overflow-hidden text-white flex items-end">
        <img
          src={destination.heroImage}
          alt={destination.name}
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/60 to-navy-950/30" />
        
        {/* Top Floating Navigation Back */}
        <div className="absolute top-6 left-4 sm:left-8 right-4 sm:right-8 flex items-center justify-between z-10">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-navy-900/80 backdrop-blur-md text-white text-xs font-semibold hover:bg-navy-900 transition-colors shadow"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Recommendations</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="p-2.5 rounded-xl bg-navy-900/80 backdrop-blur-md text-white hover:bg-navy-900 transition-colors shadow"
              title="Share Trip Plan"
              aria-label="Share Trip Plan"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => toggleSaveDestination(destination.id)}
              className={`p-2.5 rounded-xl backdrop-blur-md transition-colors shadow ${
                saved ? 'bg-rose-500 text-white' : 'bg-navy-900/80 text-white hover:bg-navy-900'
              }`}
              title={saved ? 'Saved' : 'Save to My Trips'}
              aria-label="Save Trip"
            >
              <Bookmark className={`w-4 h-4 ${saved ? 'fill-white' : ''}`} />
            </button>
          </div>
        </div>

        {/* Hero Title and Badges */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 w-full z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="px-3 py-1 rounded-full bg-saffron-500 text-white font-bold text-xs uppercase tracking-wider shadow">
                  {destination.state}
                </span>
                <span className="text-xs text-slate-300 font-medium flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-saffron-400" />
                  <span>{destination.region} India</span>
                </span>
              </div>

              <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight">
                {destination.name}
              </h1>
              <p className="mt-2 text-sm sm:text-base text-slate-200 max-w-2xl leading-relaxed">
                {destination.tagline}
              </p>

              {/* Tags */}
              <div className="mt-4 flex flex-wrap gap-2">
                {destination.tags.map(t => (
                  <span
                    key={t}
                    className="text-xs font-semibold px-3 py-1 bg-white/15 backdrop-blur-md text-white rounded-lg border border-white/20"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Match Score Radial / Card */}
            <div className="bg-white/10 backdrop-blur-md border border-white/20 p-5 rounded-3xl text-center shrink-0">
              <span className="text-[11px] uppercase tracking-wider text-slate-300 font-semibold block">
                Trip Match Score
              </span>
              <div className="text-4xl font-black text-white font-serif my-1">
                {evalResult.matchScore}%
              </div>
              <span className="text-xs font-bold px-3 py-0.5 rounded-full bg-emerald-500/80 text-white inline-block">
                {evalResult.matchLabel}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 space-y-12">
        
        {/* SECTION A: YOUR TRAVEL MATCH */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200">
          <div className="flex items-center gap-2 text-saffron-600 font-bold text-xs uppercase tracking-wider mb-2">
            <Sparkles className="w-4 h-4" />
            <span>Algorithm Breakdown</span>
          </div>
          <h2 className="font-serif text-2xl font-bold text-slate-900 mb-6">
            Your Travel Match Dimensions
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            
            {/* 1. Budget Fit */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-700">Budget Fit (40%)</span>
                <span className="text-sm font-bold text-emerald-700">{evalResult.budgetFitScore}%</span>
              </div>
              <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-emerald-600 h-full rounded-full transition-all duration-1000"
                  style={{ width: `${evalResult.budgetFitScore}%` }}
                />
              </div>
              <span className="text-[11px] text-slate-500 mt-2 block">
                ₹{costs.total.toLocaleString('en-IN')} vs ₹{preferences.budget.toLocaleString('en-IN')} target
              </span>
            </div>

            {/* 2. Weather Fit */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-700">Weather Fit (25%)</span>
                <span className="text-sm font-bold text-teal-700">{evalResult.weatherFitScore}%</span>
              </div>
              <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-teal-600 h-full rounded-full transition-all duration-1000"
                  style={{ width: `${evalResult.weatherFitScore}%` }}
                />
              </div>
              <span className="text-[11px] text-slate-500 mt-2 block">
                {weather.suitability} ({weather.tempMin}-{weather.tempMax}°C)
              </span>
            </div>

            {/* 3. Interest Match */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-700">Interests (20%)</span>
                <span className="text-sm font-bold text-saffron-700">{evalResult.interestMatchScore}%</span>
              </div>
              <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-saffron-500 h-full rounded-full transition-all duration-1000"
                  style={{ width: `${evalResult.interestMatchScore}%` }}
                />
              </div>
              <span className="text-[11px] text-slate-500 mt-2 block truncate">
                Matches {preferences.interests.join(', ')}
              </span>
            </div>

            {/* 4. Stay Fit */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-700">Stay Style (10%)</span>
                <span className="text-sm font-bold text-navy-800">{evalResult.accommodationFitScore}%</span>
              </div>
              <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-navy-900 h-full rounded-full transition-all duration-1000"
                  style={{ width: `${evalResult.accommodationFitScore}%` }}
                />
              </div>
              <span className="text-[11px] text-slate-500 mt-2 block">
                {preferences.accommodationType} availability
              </span>
            </div>

            {/* 5. Group Suitability */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-700">Group Fit (5%)</span>
                <span className="text-sm font-bold text-amber-700">{evalResult.groupFitScore}%</span>
              </div>
              <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-amber-500 h-full rounded-full transition-all duration-1000"
                  style={{ width: `${evalResult.groupFitScore}%` }}
                />
              </div>
              <span className="text-[11px] text-slate-500 mt-2 block">
                Curated for {preferences.groupType} trip
              </span>
            </div>

          </div>
        </section>

        {/* SECTION B: COST BREAKDOWN */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2 text-emerald-600 font-bold text-xs uppercase tracking-wider mb-1">
                <IndianRupee className="w-4 h-4" />
                <span>Financial Clarity</span>
              </div>
              <h2 className="font-serif text-2xl font-bold text-slate-900">
                Detailed Cost Breakdown (INR)
              </h2>
            </div>

            {/* Total Badge */}
            <div className="text-left sm:text-right bg-emerald-50 px-5 py-3 rounded-2xl border border-emerald-200">
              <span className="text-[11px] text-emerald-800 font-bold uppercase tracking-wider block">
                Total Estimated Cost
              </span>
              <span className="text-2xl font-black text-emerald-900 font-serif">
                ₹{costs.total.toLocaleString('en-IN')}
              </span>
              <span className="text-xs text-emerald-700 font-semibold block mt-0.5">
                {costs.remainingOrExtra >= 0
                  ? `₹${costs.remainingOrExtra.toLocaleString('en-IN')} remaining within budget`
                  : `₹${Math.abs(costs.remainingOrExtra).toLocaleString('en-IN')} over your ₹${preferences.budget.toLocaleString('en-IN')} target`}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            
            {/* 1. Round-Trip Transit */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="text-[11px] text-slate-500 uppercase font-bold tracking-wider block">
                Round-Trip Travel
              </span>
              <span className="text-xl font-bold text-slate-900 mt-1 block">
                ₹{costs.transportCost.toLocaleString('en-IN')}
              </span>
              <p className="text-[11px] text-slate-600 mt-1 leading-snug">
                From {preferences.originCity} to {destination.name} (train/bus/cab base estimate).
              </p>
            </div>

            {/* 2. Accommodation */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="text-[11px] text-slate-500 uppercase font-bold tracking-wider block">
                Accommodation ({preferences.nights} Nights)
              </span>
              <span className="text-xl font-bold text-slate-900 mt-1 block">
                ₹{costs.accommodationCost.toLocaleString('en-IN')}
              </span>
              <p className="text-[11px] text-slate-600 mt-1 leading-snug">
                Based on {preferences.nights} nights in {preferences.accommodationType} tier (est. ₹{(costs.accommodationCost / preferences.nights).toLocaleString('en-IN')}/night).
              </p>
            </div>

            {/* 3. Food & Local Transit */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="text-[11px] text-slate-500 uppercase font-bold tracking-wider block">
                Food & Local Transport
              </span>
              <span className="text-xl font-bold text-slate-900 mt-1 block">
                ₹{costs.dailyExpenseCost.toLocaleString('en-IN')}
              </span>
              <p className="text-[11px] text-slate-600 mt-1 leading-snug">
                {preferences.days} days × ₹{destination.averageDailyExpense.toLocaleString('en-IN')}/day for meals, autos, and incidentals.
              </p>
            </div>

            {/* 4. Activities & Sightseeing */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="text-[11px] text-slate-500 uppercase font-bold tracking-wider block">
                Activities & Sightseeing
              </span>
              <span className="text-xl font-bold text-slate-900 mt-1 block">
                ₹{costs.activitiesCost.toLocaleString('en-IN')}
              </span>
              <p className="text-[11px] text-slate-600 mt-1 leading-snug">
                Entry tickets, plantation permits, guides, and cultural shows.
              </p>
            </div>

            {/* 5. Buffer Amount */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="text-[11px] text-slate-500 uppercase font-bold tracking-wider block">
                Emergency & Buffer
              </span>
              <span className="text-xl font-bold text-slate-900 mt-1 block">
                ₹{costs.bufferAmount.toLocaleString('en-IN')}
              </span>
              <p className="text-[11px] text-slate-600 mt-1 leading-snug">
                Reserved safety margin for unexpected medical or travel changes.
              </p>
            </div>

          </div>
        </section>

        {/* SECTION C: WEATHER INFORMATION */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200">
          <div className="flex items-center gap-2 text-teal-600 font-bold text-xs uppercase tracking-wider mb-2">
            <CloudSun className="w-4 h-4" />
            <span>Seasonal Intelligence</span>
          </div>
          <h2 className="font-serif text-2xl font-bold text-slate-900 mb-6">
            Weather in {preferences.travelMonth}
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            
            {/* Left: Summary cards */}
            <div className="lg:col-span-4 bg-teal-50/60 border border-teal-200/80 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold text-teal-900 uppercase tracking-wider">
                  Suitability Status
                </span>
                <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                  weather.suitability === 'Excellent' ? 'bg-emerald-600 text-white' : 'bg-teal-600 text-white'
                }`}>
                  {weather.suitability}
                </span>
              </div>

              <div className="flex items-center gap-4 my-3">
                <div className="w-14 h-14 rounded-2xl bg-teal-500/20 text-teal-700 flex items-center justify-center">
                  <Sun className="w-8 h-8" />
                </div>
                <div>
                  <span className="text-2xl font-black text-slate-900">
                    {weather.tempMin}°C - {weather.tempMax}°C
                  </span>
                  <span className="text-xs text-slate-600 block mt-0.5">
                    {weather.condition}
                  </span>
                </div>
              </div>

              <p className="text-xs text-slate-700 leading-relaxed mt-4 pt-3 border-t border-teal-200">
                {weather.summary}
              </p>
            </div>

            {/* Right: 5-Day Mini Forecast */}
            <div className="lg:col-span-8">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                5-Day Mini Forecast Sample ({preferences.travelMonth})
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-xs">
                {miniForecast.map((item, idx) => (
                  <div key={idx} className="p-3 bg-slate-50 rounded-2xl border border-slate-200 text-center">
                    <span className="text-slate-500 font-bold block mb-1">{item.day}</span>
                    <CloudSun className="w-5 h-5 text-saffron-500 mx-auto my-1.5" />
                    <span className="font-bold text-slate-900 block">{item.temp}</span>
                    <span className="text-[10px] text-slate-600 block mt-0.5">{item.condition}</span>
                    <span className="text-[10px] text-teal-600 font-semibold block mt-1">Rain: {item.rain}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </section>

        {/* SECTION D: ACCOMMODATION OPTIONS (VIEW-ONLY INSPIRATION) */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
            <div>
              <div className="flex items-center gap-2 text-teal-600 font-bold text-xs uppercase tracking-wider mb-1">
                <Building className="w-4 h-4" />
                <span>Handpicked Stays</span>
              </div>
              <h2 className="font-serif text-2xl font-bold text-slate-900">
                Featured Accommodations in {destination.name}
              </h2>
              <p className="text-xs text-slate-500 mt-1 italic">
                For viewing and inspiration only. Accommodation selection and booking are not available.
              </p>
            </div>
            <span className="text-xs text-slate-500 hidden sm:block">
              Indicative demo estimates for {preferences.travelMonth}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {destination.stays.map(stay => {
              const photoMeta = getStayPhotoMetadata(stay);

              return (
                <div
                  key={stay.id}
                  className="bg-white rounded-2xl border border-slate-200 hover:shadow-md transition-all flex flex-col justify-between overflow-hidden"
                >
                  <div>
                    {/* Stay Image with badge */}
                    <div className="relative h-44 w-full overflow-hidden bg-slate-900">
                      <img
                        src={stay.image}
                        alt={photoMeta.alt}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-3 left-3 flex gap-2">
                        {stay.isBestValue && (
                          <span className="px-2.5 py-0.5 rounded-full bg-saffron-500 text-white font-bold text-[11px] shadow">
                            Best Value
                          </span>
                        )}
                        <span className="px-2.5 py-0.5 rounded-full bg-navy-900/80 backdrop-blur-sm text-white font-medium text-[11px]">
                          {stay.type}
                        </span>
                      </div>
                      <div className="absolute bottom-2 left-2 right-2 bg-slate-950/75 backdrop-blur-sm text-[10px] text-slate-300 px-2 py-1 rounded">
                        Representative accommodation photo — not this specific property
                      </div>
                    </div>

                    {/* Stay Details */}
                    <div className="p-5 space-y-3">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-bold text-slate-900 text-base leading-tight">
                          {stay.name}
                        </h3>
                        {stay.rating && (
                          <div className="flex items-center gap-1 text-amber-500 font-bold text-xs shrink-0">
                            <Star className="w-3.5 h-3.5 fill-amber-500" />
                            <span>{stay.rating}</span>
                          </div>
                        )}
                      </div>

                      <p className="text-xs text-slate-500 flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        <span>{stay.location}</span>
                      </p>

                      {/* Amenities */}
                      <div className="space-y-1 pt-1">
                        {stay.amenities.map(amenity => (
                          <div key={amenity} className="flex items-center gap-1.5 text-xs text-slate-600">
                            <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                            <span>{amenity}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Tariff & Read-Only Actions */}
                  <div className="p-5 pt-0 border-t border-slate-100 mt-4 space-y-3">
                    <div className="pt-3 flex items-baseline justify-between">
                      <span className="text-[10px] text-slate-400 uppercase font-bold">Demo Tariff</span>
                      <span className="font-bold text-slate-900 text-base">
                        ₹{stay.pricePerNight.toLocaleString('en-IN')}
                        <span className="text-xs text-slate-500 font-normal"> / night (Demo estimate)</span>
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setSelectedStayForLightbox(stay)}
                        className="flex-1 py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors focus:outline-none"
                      >
                        <Camera className="w-3.5 h-3.5" />
                        <span>View Photos</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setSelectedStayForModal(stay)}
                        className="flex-1 py-2 px-3 rounded-xl bg-navy-900 hover:bg-navy-800 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors focus:outline-none"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>View Details</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* SECTION E: SITUATION-AWARE PHOTO GALLERY */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2 text-saffron-600 font-bold text-xs uppercase tracking-wider mb-1">
                <Eye className="w-4 h-4" />
                <span>Visual Inspiration</span>
              </div>
              <h2 className="font-serif text-2xl font-bold text-slate-900">
                Situation-Aware Photo Gallery
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Curated specifically for <strong>{preferences.travelMonth}</strong> travel, <strong>{preferences.groupType}</strong>, and <strong>{preferences.interests.join(' & ')}</strong> interests.
              </p>
            </div>

            {/* Gallery Category Filter Chips */}
            <div className="flex flex-wrap gap-1.5">
              {['all', 'nature', 'stays', 'food', 'attractions', 'adventure', 'night'].map(cat => (
                <button
                  key={cat}
                  onClick={() => setGalleryFilter(cat)}
                  className={`text-xs px-3 py-1.5 rounded-lg capitalize font-medium transition-colors ${
                    galleryFilter === cat
                      ? 'bg-navy-900 text-white font-bold'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {cat === 'all' ? 'All' : cat}
                </button>
              ))}
            </div>
          </div>

          {/* Photo Grid (6 to 9 items) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredPhotos.map((photo, index) => (
              <div
                key={photo.id}
                onClick={() => setSelectedPhotoIndex(index)}
                className="group relative h-64 rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-premium transition-all duration-300"
              >
                <img
                  src={photo.url}
                  alt={photo.caption}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />
                
                <span className="absolute top-3 right-3 text-[10px] font-bold px-2 py-0.5 rounded-md bg-white/90 backdrop-blur-sm text-slate-800 uppercase">
                  {photo.category}
                </span>

                <div className="absolute bottom-3 left-4 right-4 text-white">
                  <p className="font-serif text-sm font-bold leading-snug drop-shadow">
                    “{photo.caption}”
                  </p>
                  <span className="text-[11px] text-amber-300 block mt-1">
                    Click to view full photo →
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION F: SUGGESTED ITINERARY */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <div className="flex items-center gap-2 text-saffron-600 font-bold text-xs uppercase tracking-wider mb-1">
                <Calendar className="w-4 h-4" />
                <span>Day-by-Day Timeline</span>
              </div>
              <h2 className="font-serif text-2xl font-bold text-slate-900">
                Suggested {preferences.days}-Day Itinerary ({preferences.travelPace} Pace)
              </h2>
            </div>

            <button
              onClick={() => setIsPrintModalOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold transition-colors"
            >
              <Printer className="w-4 h-4" />
              <span>Print Itinerary</span>
            </button>
          </div>

          <div className="space-y-6">
            {destination.suggestedItinerary.slice(0, preferences.days).map(dayPlan => (
              <div
                key={dayPlan.day}
                className="p-6 rounded-2xl border border-slate-200 bg-slate-50/60 hover:bg-white hover:shadow-sm transition-all"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3 mb-4">
                  <div className="flex items-center gap-3">
                    <span className="w-9 h-9 rounded-xl bg-saffron-500 text-white font-bold flex items-center justify-center text-sm shadow">
                      {dayPlan.day}
                    </span>
                    <h3 className="font-serif text-lg font-bold text-slate-900">
                      Day {dayPlan.day}: {dayPlan.title}
                    </h3>
                  </div>
                  <span className="text-xs font-semibold text-slate-600 bg-white px-3 py-1 rounded-lg border border-slate-200">
                    Est. Day Cost: ₹{dayPlan.dailyCost.toLocaleString('en-IN')}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                  <div className="p-3 bg-white rounded-xl border border-slate-100">
                    <strong className="text-saffron-600 uppercase font-bold tracking-wider text-[10px] block mb-1">
                      Morning
                    </strong>
                    <p className="text-slate-700 leading-relaxed">{dayPlan.morning}</p>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-slate-100">
                    <strong className="text-teal-600 uppercase font-bold tracking-wider text-[10px] block mb-1">
                      Afternoon
                    </strong>
                    <p className="text-slate-700 leading-relaxed">{dayPlan.afternoon}</p>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-slate-100">
                    <strong className="text-navy-900 uppercase font-bold tracking-wider text-[10px] block mb-1">
                      Evening
                    </strong>
                    <p className="text-slate-700 leading-relaxed">{dayPlan.evening}</p>
                  </div>
                </div>

                {dayPlan.highlight && (
                  <div className="mt-3 text-[11px] text-slate-500 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    <span>Highlight: <strong>{dayPlan.highlight}</strong></span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* SECTION G: ACTIONS BAR */}
        <section className="bg-navy-900 text-white rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div>
            <h3 className="font-serif text-xl font-bold">Ready to embark on this journey?</h3>
            <p className="text-xs text-slate-300 mt-1">
              Save to your wishlist or download a complete printable summary with contact numbers.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => toggleSaveDestination(destination.id)}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-bold transition-all ${
                saved
                  ? 'bg-rose-500 text-white'
                  : 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
              }`}
            >
              <Bookmark className={`w-4 h-4 ${saved ? 'fill-white' : ''}`} />
              <span>{saved ? 'Saved in Wishlist' : 'Save Trip'}</span>
            </button>

            <button
              onClick={() => setIsPrintModalOpen(true)}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-saffron-500 to-amber-500 hover:from-saffron-600 hover:to-amber-600 text-white text-xs font-bold rounded-xl shadow-lg transition-all"
            >
              <Download className="w-4 h-4" />
              <span>Download Itinerary</span>
            </button>

            <button
              onClick={handleShare}
              className="flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-bold transition-all bg-white/10 hover:bg-white/20 text-white border border-white/20"
            >
              <Share2 className="w-4 h-4" />
              <span>Share Plan</span>
            </button>

            <Link
              to="/recommendations"
              className="px-4 py-3 text-slate-300 hover:text-white text-xs font-semibold transition-colors flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Recommendations</span>
            </Link>
          </div>
        </section>

      </div>

      {/* Printable Itinerary Modal */}
      {isPrintModalOpen && (
        <PrintableItineraryModal
          destination={destination}
          preferences={preferences}
          costs={costs}
          onClose={() => setIsPrintModalOpen(false)}
        />
      )}

      {/* Lightbox Photo Gallery Modal */}
      {selectedPhotoIndex !== null && (
        <SituationGalleryModal
          photos={filteredPhotos}
          currentIndex={selectedPhotoIndex}
          onClose={() => setSelectedPhotoIndex(null)}
          onSelectIndex={setSelectedPhotoIndex}
        />
      )}

      {/* Accommodation Details Modal */}
      {selectedStayForModal && (
        <AccommodationDetailsModal
          stay={selectedStayForModal}
          onClose={() => setSelectedStayForModal(null)}
          onOpenPhotos={() => {
            const stay = selectedStayForModal;
            setSelectedStayForModal(null);
            setSelectedStayForLightbox(stay);
          }}
        />
      )}

      {/* Accommodation Photo Lightbox */}
      {selectedStayForLightbox && (
        <AccommodationPhotoLightbox
          isOpen={true}
          onClose={() => setSelectedStayForLightbox(null)}
          propertyName={selectedStayForLightbox.name}
          photos={getStayGalleryPhotos(selectedStayForLightbox)}
        />
      )}

    </div>
  );
};
