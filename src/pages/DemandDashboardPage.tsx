import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  TrendingUp, 
  BarChart3, 
  Compass, 
  Calendar, 
  Users, 
  Building, 
  ArrowUpRight, 
  ArrowDownRight, 
  Minus, 
  CloudSun, 
  Info, 
  ShieldAlert, 
  Sparkles, 
  DollarSign, 
  Layers, 
  HelpCircle,
  IndianRupee,
  Activity,
  AlertCircle,
  CheckCircle2,
  Navigation,
  ArrowRight,
  MapPin
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  ComposedChart, 
  Area, 
  Line, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Legend, 
  CartesianGrid 
} from 'recharts';
import { FORECAST_DESTINATIONS } from '../data/forecasting';
import { useTrip } from '../context/TripContext';
import { resolvePlace } from '../utils/itineraryEngine';
import { DestinationForecastData } from '../types';

export const DemandDashboardPage: React.FC = () => {
  const { activePlan } = useTrip();

  // List of resolved places currently selected in active plan
  const selectedPlaces = useMemo(() => {
    return activePlan.selectedPlaceIds
      .map(id => resolvePlace(id))
      .filter((p): p is NonNullable<ReturnType<typeof resolvePlace>> => p !== undefined);
  }, [activePlan.selectedPlaceIds]);

  // Selected place key - starts empty unless exactly 1 place exists in plan or stored in session
  const [selectedPlaceKey, setSelectedPlaceKey] = useState<string>(() => {
    try {
      const stored = sessionStorage.getItem('travelwise_forecast_selection') || localStorage.getItem('travelwise_forecast_selection');
      if (stored) return stored;
    } catch (e) {}
    if (activePlan.selectedPlaceIds.length === 1) {
      return activePlan.selectedPlaceIds[0];
    }
    return '';
  });

  const [horizonMonths, setHorizonMonths] = useState<number>(6); // 3, 6, 12
  const [selectedMetric, setSelectedMetric] = useState<'arrivals' | 'occupancy' | 'revenue' | 'booking'>('arrivals');

  // Handle place selection and persistence
  const handleSelectPlace = (key: string) => {
    setSelectedPlaceKey(key);
    try {
      if (key) {
        sessionStorage.setItem('travelwise_forecast_selection', key);
      } else {
        sessionStorage.removeItem('travelwise_forecast_selection');
      }
    } catch (e) {}
  };

  // Reset integration: clear forecast selection when plan is reset
  useEffect(() => {
    try {
      const stored = sessionStorage.getItem('travelwise_forecast_selection') || localStorage.getItem('travelwise_forecast_selection');
      if (!stored && activePlan.selectedPlaceIds.length === 0) {
        setSelectedPlaceKey('');
      } else if (activePlan.selectedPlaceIds.length === 1 && !selectedPlaceKey) {
        setSelectedPlaceKey(activePlan.selectedPlaceIds[0]);
      }
    } catch (e) {}
  }, [activePlan.selectedPlaceIds.length, selectedPlaceKey]);

  // Resolve forecast data, honest provenance note, and existence
  const { destinationData, provenanceNote, hasData, selectedDisplayName } = useMemo<{
    destinationData: DestinationForecastData | null;
    provenanceNote?: string;
    hasData: boolean;
    selectedDisplayName: string;
  }>(() => {
    if (!selectedPlaceKey) {
      return { destinationData: null, hasData: false, selectedDisplayName: '' };
    }

    const keyLower = selectedPlaceKey.toLowerCase();

    // 1. Direct forecast match (e.g. 'coorg', 'visakhapatnam', 'bengaluru', etc.)
    if (FORECAST_DESTINATIONS[keyLower]) {
      const data = FORECAST_DESTINATIONS[keyLower];
      return {
        destinationData: data,
        hasData: true,
        selectedDisplayName: data.destinationName
      };
    }

    // 2. Check if selected place is an attraction in active plan or database
    const targetPlace = selectedPlaces.find(p => p.id === selectedPlaceKey) || resolvePlace(selectedPlaceKey);
    if (targetPlace) {
      if (FORECAST_DESTINATIONS[targetPlace.id.toLowerCase()]) {
        const data = FORECAST_DESTINATIONS[targetPlace.id.toLowerCase()];
        return {
          destinationData: data,
          hasData: true,
          selectedDisplayName: data.destinationName
        };
      }

      // City-level regional pattern matching
      const cityClean = targetPlace.city.toLowerCase().replace(/[^a-z0-9]/g, '');
      const matchedCityKey = Object.keys(FORECAST_DESTINATIONS).find(k =>
        k === cityClean || targetPlace.city.toLowerCase().includes(k) || k.includes(cityClean)
      );

      if (matchedCityKey && FORECAST_DESTINATIONS[matchedCityKey]) {
        const cityData = FORECAST_DESTINATIONS[matchedCityKey];
        return {
          destinationData: {
            ...cityData,
            destinationName: `${targetPlace.name} (${targetPlace.city})`
          },
          provenanceNote: `Demand forecasting data for ${targetPlace.name} is currently estimated using regional patterns (${cityData.destinationName}).`,
          hasData: true,
          selectedDisplayName: `${targetPlace.name} (${targetPlace.city})`
        };
      }

      // No regional data available
      return {
        destinationData: null,
        provenanceNote: `Demand forecasting data for ${targetPlace.name} is currently unavailable. Historical telemetry is being gathered.`,
        hasData: false,
        selectedDisplayName: targetPlace.name
      };
    }

    return {
      destinationData: null,
      provenanceNote: `Demand forecasting data for "${selectedPlaceKey}" is currently unavailable.`,
      hasData: false,
      selectedDisplayName: selectedPlaceKey
    };
  }, [selectedPlaceKey, selectedPlaces]);

  // Slice historical data + forecast horizon
  const chartData = useMemo(() => {
    if (!hasData || !destinationData) return [];

    const historical = destinationData.monthlyData.filter(d => d.actual !== undefined);
    const forecastPoints = destinationData.monthlyData
      .filter(d => d.forecast !== undefined)
      .slice(0, horizonMonths);

    return [...historical, ...forecastPoints].map(d => {
      let actualVal = d.actual;
      let forecastVal = d.forecast;
      let confLow = d.confidenceLow;
      let confHigh = d.confidenceHigh;

      if (selectedMetric === 'occupancy') {
        actualVal = d.actual ? d.occupancy : undefined;
        forecastVal = d.forecast ? d.occupancy : undefined;
        confLow = d.forecast ? Math.max(20, d.occupancy - 6) : undefined;
        confHigh = d.forecast ? Math.min(100, d.occupancy + 6) : undefined;
      } else if (selectedMetric === 'revenue') {
        actualVal = d.actual ? Math.round(d.revenueEst / 100000) : undefined;
        forecastVal = d.forecast ? Math.round(d.revenueEst / 100000) : undefined;
        confLow = d.confidenceLow ? Math.round((d.confidenceLow * 450) / 100000) : undefined;
        confHigh = d.confidenceHigh ? Math.round((d.confidenceHigh * 550) / 100000) : undefined;
      } else if (selectedMetric === 'booking') {
        actualVal = d.actual ? d.bookingIndex : undefined;
        forecastVal = d.forecast ? d.bookingIndex : undefined;
        confLow = d.confidenceLow ? Math.round(d.bookingIndex * 0.92) : undefined;
        confHigh = d.confidenceHigh ? Math.round(d.bookingIndex * 1.08) : undefined;
      }

      return {
        month: d.month,
        actual: actualVal,
        forecast: forecastVal,
        confidenceLow: confLow,
        confidenceHigh: confHigh,
        rawDriver: d.driver,
        rawOccupancy: d.occupancy,
        trend: d.trend
      };
    });
  }, [destinationData, horizonMonths, selectedMetric, hasData]);

  // Metric formatters
  const getMetricLabel = () => {
    switch (selectedMetric) {
      case 'occupancy': return 'Hotel Occupancy (%)';
      case 'revenue': return 'Estimated Tourism Revenue (₹ Lakhs)';
      case 'booking': return 'Booking Demand Index (Base 100)';
      default: return 'Tourist Arrivals (Visitors)';
    }
  };

  const formatTooltipValue = (value: number) => {
    if (selectedMetric === 'occupancy') return `${value}%`;
    if (selectedMetric === 'revenue') return `₹${value.toLocaleString('en-IN')} Lakhs`;
    return value ? value.toLocaleString('en-IN') : 'N/A';
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-24">
      
      {/* Header Banner */}
      <section className="bg-navy-950 text-white border-b border-navy-800 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 text-xs font-semibold mb-3 border border-teal-500/30">
                <BarChart3 className="w-3.5 h-3.5" />
                <span>Tourism Analytics & Forecasting Engine</span>
              </div>
              <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-white">
                Tourism Demand Forecasting Dashboard
              </h1>
              <p className="text-slate-300 text-xs sm:text-sm mt-1.5 max-w-2xl">
                Anticipate visitor influx, hotel occupancy, and seasonal demand drivers synchronized with your travel plan or across broader Indian circuits.
              </p>
            </div>

            {/* Demo Data Disclaimer Badge */}
            <div className="bg-navy-900 border border-amber-500/40 p-3.5 rounded-2xl max-w-xs text-xs text-amber-200 flex items-start gap-2.5">
              <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-amber-300 uppercase tracking-wider text-[10px]">
                  Sample / Demo Data
                </strong>
                <p className="text-[11px] text-slate-300 mt-0.5 leading-snug">
                  Projections simulate historical seasonal trends, festival spikes, and weather indices for planning evaluation.
                </p>
              </div>
            </div>
          </div>

          {/* DASHBOARD CONTROLS BAR */}
          <div className="mt-8 bg-navy-900/90 border border-navy-700 p-4 sm:p-5 rounded-3xl grid grid-cols-1 md:grid-cols-4 gap-4 backdrop-blur-md">
            
            {/* Control 1: Destination / Place Select (Unified & Prominent) */}
            <div className="md:col-span-2">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5 flex items-center justify-between">
                <span>Select Destination or Circuit</span>
                {selectedPlaces.length > 0 && (
                  <span className="text-[10px] text-saffron-400 font-semibold">
                    {selectedPlaces.length} in Active Plan
                  </span>
                )}
              </label>
              
              <select
                value={selectedPlaceKey}
                onChange={e => handleSelectPlace(e.target.value)}
                className="w-full bg-navy-800 text-white font-semibold text-xs sm:text-sm rounded-xl px-3.5 py-2.5 border border-navy-700 focus:outline-none focus:ring-2 focus:ring-saffron-500 cursor-pointer"
              >
                <option value="" disabled>Select a destination to analyze tourism demand...</option>
                {selectedPlaces.length > 0 && (
                  <optgroup label="My Selected Places">
                    {selectedPlaces.map(p => (
                      <option key={p.id} value={p.id}>
                        ★ {p.name} ({p.city})
                      </option>
                    ))}
                  </optgroup>
                )}
                <optgroup label="All Supported Destinations">
                  <option value="visakhapatnam">Visakhapatnam, Andhra Pradesh</option>
                  <option value="hyderabad">Hyderabad, Telangana</option>
                  <option value="bengaluru">Bengaluru, Karnataka</option>
                  <option value="chennai">Chennai, Tamil Nadu</option>
                  <option value="coorg">Coorg, Karnataka</option>
                  <option value="munnar">Munnar, Kerala</option>
                  <option value="goa">Goa (North & South)</option>
                  <option value="jaipur">Jaipur, Rajasthan</option>
                  <option value="manali">Manali, Himachal Pradesh</option>
                  <option value="rishikesh">Rishikesh, Uttarakhand</option>
                </optgroup>
              </select>
            </div>

            {/* Control 2: Forecast Horizon */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                Forecast Horizon
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[3, 6, 12].map(h => (
                  <button
                    key={h}
                    type="button"
                    onClick={() => setHorizonMonths(h)}
                    className={`py-2 px-3 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                      horizonMonths === h
                        ? 'bg-saffron-500 text-white border-saffron-500 shadow-sm'
                        : 'bg-navy-800 text-slate-300 border-navy-700 hover:bg-navy-750'
                    }`}
                  >
                    {h}M
                  </button>
                ))}
              </div>
            </div>

            {/* Control 3: Select Metric */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                Target Metric
              </label>
              <select
                value={selectedMetric}
                onChange={e => setSelectedMetric(e.target.value as any)}
                className="w-full bg-navy-800 text-white font-semibold text-xs sm:text-sm rounded-xl px-3.5 py-2.5 border border-navy-700 focus:outline-none focus:ring-2 focus:ring-saffron-500 cursor-pointer"
              >
                <option value="arrivals">Tourist Arrivals (Headcount)</option>
                <option value="occupancy">Hotel & Homestay Occupancy (%)</option>
                <option value="revenue">Estimated Tourism Revenue (₹)</option>
                <option value="booking">Booking Demand Index</option>
              </select>
            </div>

          </div>

          {/* Regional Provenance Disclosure Notice */}
          {provenanceNote && selectedPlaceKey && (
            <div className="mt-4 p-3 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center gap-2.5 text-xs text-amber-200">
              <Info className="w-4 h-4 text-amber-400 shrink-0" />
              <span>{provenanceNote}</span>
            </div>
          )}

        </div>
      </section>

      {/* Main Dashboard Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-10">
        
        {/* CASE 1: UNSELECTED STATE (INVITING PROMPT) */}
        {!selectedPlaceKey ? (
          <div className="bg-white rounded-3xl p-8 sm:p-14 border border-slate-200 text-center shadow-sm max-w-2xl mx-auto space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-saffron-500 to-amber-400 text-white mx-auto flex items-center justify-center shadow-lg shadow-saffron-500/20">
              <TrendingUp className="w-8 h-8" />
            </div>
            <div>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
                Select a destination to analyze tourism demand.
              </h3>
              <p className="text-slate-600 text-xs sm:text-sm mt-2 max-w-md mx-auto leading-relaxed">
                Anticipate visitor influx, hotel & homestay occupancy rates, and seasonal travel surges for destinations in your active plan or across popular Indian travel circuits.
              </p>
            </div>

            {selectedPlaces.length > 0 && (
              <div className="pt-4 border-t border-slate-100">
                <span className="block text-[11px] font-bold uppercase tracking-wider text-saffron-700 mb-2.5">
                  My Selected Places ({selectedPlaces.length})
                </span>
                <div className="flex flex-wrap items-center justify-center gap-2">
                  {selectedPlaces.map(p => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => handleSelectPlace(p.id)}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-saffron-50 hover:bg-saffron-100 text-saffron-900 border border-saffron-200 text-xs font-semibold transition-all shadow-sm hover:scale-105 cursor-pointer"
                    >
                      <MapPin className="w-3.5 h-3.5 text-saffron-600" />
                      <span>{p.name} ({p.city})</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="pt-2">
              <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2.5">
                All Supported Destinations
              </span>
              <div className="flex flex-wrap items-center justify-center gap-2">
                {[
                  { id: 'visakhapatnam', name: 'Visakhapatnam, AP' },
                  { id: 'hyderabad', name: 'Hyderabad, Telangana' },
                  { id: 'bengaluru', name: 'Bengaluru, Karnataka' },
                  { id: 'chennai', name: 'Chennai, Tamil Nadu' },
                  { id: 'coorg', name: 'Coorg, Karnataka' },
                  { id: 'munnar', name: 'Munnar, Kerala' },
                  { id: 'goa', name: 'Goa' },
                  { id: 'jaipur', name: 'Jaipur, Rajasthan' },
                  { id: 'manali', name: 'Manali, HP' },
                  { id: 'rishikesh', name: 'Rishikesh, UK' }
                ].map(dest => (
                  <button
                    key={dest.id}
                    type="button"
                    onClick={() => handleSelectPlace(dest.id)}
                    className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-medium transition-colors cursor-pointer"
                  >
                    {dest.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : !hasData || !destinationData ? (
          /* CASE 2: MISSING FORECAST DATA FOR SELECTED PLACE */
          <div className="bg-white rounded-3xl p-10 border border-slate-200 text-center shadow-sm max-w-xl mx-auto">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 mx-auto flex items-center justify-center mb-4">
              <AlertCircle className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-slate-900 mb-2">
              Forecast Data Unavailable
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mb-6 leading-relaxed">
              {provenanceNote || `Historical visitor telemetry for "${selectedDisplayName}" is currently being collected.`}
            </p>
            <div className="flex justify-center gap-3">
              <button
                type="button"
                onClick={() => handleSelectPlace('coorg')}
                className="px-4 py-2 rounded-xl bg-navy-900 text-white text-xs font-bold hover:bg-navy-800 transition-colors cursor-pointer"
              >
                View Coorg Demo Forecast
              </button>
              <button
                type="button"
                onClick={() => handleSelectPlace('')}
                className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold hover:bg-slate-200 transition-colors cursor-pointer"
              >
                Choose Another Destination
              </button>
            </div>
          </div>
        ) : (
          /* CASE 3: VALID DESTINATION FORECAST AVAILABLE */
          <>
            {/* COMPONENT A: KEY METRICS CARDS */}
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              
              {/* Card 1: Current Monthly Arrivals */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                <span className="text-slate-500 text-[11px] font-bold uppercase tracking-wider block">
                  Current Month Arrivals
                </span>
                <div className="flex items-baseline gap-2 mt-2">
                  <span className="text-2xl font-black text-slate-900 font-serif">
                    {destinationData.currentMonthlyArrivals.toLocaleString('en-IN')}
                  </span>
                </div>
                <span className="text-[11px] text-slate-500 block mt-1">
                  Active visitor flow
                </span>
              </div>

              {/* Card 2: Forecast Next Month */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                <span className="text-slate-500 text-[11px] font-bold uppercase tracking-wider block">
                  Forecast Next Month
                </span>
                <div className="flex items-baseline gap-2 mt-2">
                  <span className="text-2xl font-black text-saffron-600 font-serif">
                    {destinationData.nextMonthForecast.toLocaleString('en-IN')}
                  </span>
                  <span className="text-xs font-bold text-emerald-600 flex items-center">
                    <ArrowUpRight className="w-3.5 h-3.5" />
                    +{destinationData.growthRatePct}%
                  </span>
                </div>
                <span className="text-[11px] text-slate-500 block mt-1">
                  Anticipated monthly surge
                </span>
              </div>

              {/* Card 3: Forecast Confidence */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                <span className="text-slate-500 text-[11px] font-bold uppercase tracking-wider block">
                  Forecast Confidence
                </span>
                <div className="flex items-baseline gap-2 mt-2">
                  <span className="text-2xl font-black text-teal-700 font-serif">
                    {destinationData.confidenceScore}%
                  </span>
                  <span className="text-[11px] font-bold px-1.5 py-0.5 rounded bg-teal-100 text-teal-800">
                    High
                  </span>
                </div>
                <span className="text-[11px] text-slate-500 block mt-1">
                  Historical model accuracy
                </span>
              </div>

              {/* Card 4: Hotel Occupancy Forecast */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                <span className="text-slate-500 text-[11px] font-bold uppercase tracking-wider block">
                  Hotel Occupancy Forecast
                </span>
                <div className="flex items-baseline gap-2 mt-2">
                  <span className="text-2xl font-black text-navy-900 font-serif">
                    {destinationData.forecastedOccupancyPct}%
                  </span>
                </div>
                <span className="text-[11px] text-slate-500 block mt-1">
                  Holiday peak capacity
                </span>
              </div>

              {/* Card 5: Demand Trend Indicator */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                <span className="text-slate-500 text-[11px] font-bold uppercase tracking-wider block">
                  Demand Momentum
                </span>
                <div className="flex items-center gap-2 mt-2">
                  <span className={`text-xl font-bold ${
                    destinationData.trend === 'Up' ? 'text-emerald-700' : 'text-slate-700'
                  }`}>
                    {destinationData.trend === 'Up' ? 'High Surge' : 'Steady Season'}
                  </span>
                  {destinationData.trend === 'Up' && (
                    <TrendingUp className="w-5 h-5 text-emerald-600" />
                  )}
                </div>
                <span className="text-[11px] text-slate-500 block mt-1">
                  30-day forecast projection
                </span>
              </div>

            </section>

            {/* COMPONENT B: MAIN FORECAST CHART */}
            <section className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-saffron-600 block">
                    Telemetry Projection
                  </span>
                  <h2 className="font-serif text-2xl font-bold text-slate-900">
                    {destinationData.destinationName} — {getMetricLabel()}
                  </h2>
                </div>
                <div className="flex items-center gap-4 text-xs font-semibold text-slate-500">
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-navy-900" />
                    <span>Historical Actuals</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-saffron-500" />
                    <span>Forecast Projection</span>
                  </div>
                </div>
              </div>

              <div className="h-80 sm:h-96 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={chartData} margin={{ top: 10, right: 30, left: 10, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis 
                      dataKey="month" 
                      tick={{ fontSize: 11, fill: '#64748b' }} 
                      tickMargin={8} 
                    />
                    <YAxis 
                      tick={{ fontSize: 11, fill: '#64748b' }} 
                      tickFormatter={val => val.toLocaleString('en-IN')} 
                    />
                    <Tooltip 
                      formatter={(val: any) => [formatTooltipValue(Number(val)), getMetricLabel()]} 
                      contentStyle={{ borderRadius: 12, border: '1px solid #cbd5e1' }}
                    />
                    <Legend />
                    <Area 
                      type="monotone" 
                      dataKey="confidenceHigh" 
                      fill="#fed7aa" 
                      stroke="none" 
                      name="Confidence Range High" 
                    />
                    <Area 
                      type="monotone" 
                      dataKey="confidenceLow" 
                      fill="#ffffff" 
                      stroke="none" 
                      name="Confidence Range Low" 
                    />
                    <Line 
                      type="monotone" 
                      dataKey="actual" 
                      stroke="#0f172a" 
                      strokeWidth={3} 
                      name="Actuals" 
                      dot={{ r: 4 }} 
                    />
                    <Line 
                      type="monotone" 
                      dataKey="forecast" 
                      stroke="#f97316" 
                      strokeWidth={3} 
                      strokeDasharray="5 5" 
                      name="Forecast" 
                      dot={{ r: 5 }} 
                    />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </section>

            {/* COMPONENT C: DRIVERS & FACTORS */}
            <section className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm">
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-slate-900 mb-6">
                Key Demand Drivers & Influencing Factors
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {destinationData.factors.map((f, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="font-bold text-sm text-slate-900">{f.factor}</span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          f.impact === 'High' ? 'bg-saffron-100 text-saffron-800' : 'bg-slate-200 text-slate-700'
                        }`}>
                          {f.impact} Impact
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed mt-1">
                        {f.description}
                      </p>
                    </div>

                    <div className="mt-3 pt-2 border-t border-slate-200 flex items-center justify-between text-xs">
                      <span className="text-slate-500 font-semibold">Direction</span>
                      <span className={`font-bold ${
                        f.direction === 'Positive' ? 'text-emerald-700' : 'text-slate-700'
                      }`}>
                        {f.direction} (+{f.score} pts)
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </>
        )}

      </div>

    </div>
  );
};
