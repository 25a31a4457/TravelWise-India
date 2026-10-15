import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Compass, Mail, Phone, MapPin, Heart, ShieldCheck, Sparkles, Send } from 'lucide-react';
import { useTrip } from '../context/TripContext';

export const Footer: React.FC = () => {
  const { showToast } = useTrip();
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      showToast('Subscribed Successfully!', 'You will receive monthly seasonal Indian travel insights and tariff alerts.', 'success');
      setEmail('');
    }
  };

  return (
    <footer className="bg-navy-950 text-slate-300 border-t border-navy-800">
      {/* Top Value Banner */}
      <div className="bg-gradient-to-r from-navy-900 via-navy-850 to-navy-900 border-b border-navy-800/80 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-saffron-500/10 border border-saffron-500/30 flex items-center justify-center text-saffron-400 shrink-0">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm">Budget-Smart Calibration</h4>
              <p className="text-xs text-slate-400 mt-0.5">Calculates all travel, homestays & food within your INR budget</p>
            </div>
          </div>

          <div className="flex items-center justify-center md:justify-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400 shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm">Weather Suitability Engine</h4>
              <p className="text-xs text-slate-400 mt-0.5">Monsoon-aware and seasonal temperature matching across India</p>
            </div>
          </div>

          <div className="flex items-center justify-center md:justify-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
              <Compass className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm">Predictive Demand Analytics</h4>
              <p className="text-xs text-slate-400 mt-0.5">Assists travelers and planners with tourist influx forecasting</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-saffron-600 to-amber-400 flex items-center justify-center shadow-md">
                <Compass className="w-5 h-5 text-white" />
              </div>
              <span className="font-serif text-2xl font-bold text-white">TravelWise India</span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              “Plan smarter. Travel beautifully.” Intelligent tourism recommendation, cost optimization, and demand forecasting tailored specifically for the incredible diversity of India.
            </p>
            <div className="pt-2 text-xs text-slate-400 space-y-1.5">
              <p className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-saffron-400 shrink-0" />
                <span>Pan-India Coverage • Built in Bengaluru, Karnataka</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-teal-400 shrink-0" />
                <span>support@travelwiseindia.demo</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>+91 80 4920 1800 (Mon - Sat, 9 AM - 6 PM IST)</span>
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white text-sm font-semibold uppercase tracking-wider mb-4 border-b border-navy-800 pb-2">
              Explore Tools
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/plan" className="hover:text-amber-400 transition-colors">Trip Planner Engine</Link>
              </li>
              <li>
                <Link to="/recommendations" className="hover:text-amber-400 transition-colors">Top Destination Matches</Link>
              </li>
              <li>
                <Link to="/forecast" className="hover:text-amber-400 transition-colors">Tourism Demand Dashboard</Link>
              </li>
              <li>
                <Link to="/saved" className="hover:text-amber-400 transition-colors">Saved Itineraries</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-amber-400 transition-colors">Algorithm & Methodology</Link>
              </li>
            </ul>
          </div>

          {/* Featured Destinations */}
          <div>
            <h4 className="text-white text-sm font-semibold uppercase tracking-wider mb-4 border-b border-navy-800 pb-2">
              Featured Circuits
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li><Link to="/destination/coorg" className="hover:text-white transition-colors">Coorg (Kodagu) Coffee Trail</Link></li>
              <li><Link to="/destination/munnar" className="hover:text-white transition-colors">Munnar High Tea Hills</Link></li>
              <li><Link to="/destination/chikmagalur" className="hover:text-white transition-colors">Chikmagalur Malnad Peaks</Link></li>
              <li><Link to="/destination/goa" className="hover:text-white transition-colors">Goa Coastal & Heritage</Link></li>
              <li><Link to="/destination/jaipur" className="hover:text-white transition-colors">Jaipur Royal Havelis</Link></li>
              <li><Link to="/destination/rishikesh" className="hover:text-white transition-colors">Rishikesh Yoga & Rapids</Link></li>
            </ul>
          </div>

          {/* Newsletter / Updates */}
          <div>
            <h4 className="text-white text-sm font-semibold uppercase tracking-wider mb-4 border-b border-navy-800 pb-2">
              Seasonal Travel Alerts
            </h4>
            <p className="text-xs text-slate-400 mb-3 leading-relaxed">
              Get notified when seasonal flight and homestay rates drop for your favorite states.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-3.5 py-2 text-xs rounded-lg bg-navy-900 border border-navy-700 text-white placeholder-slate-500 focus:outline-none focus:border-saffron-500 focus:ring-1 focus:ring-saffron-500"
              />
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-gradient-to-r from-saffron-600 to-amber-600 hover:from-saffron-500 hover:to-amber-500 text-white text-xs font-semibold rounded-lg shadow transition-all"
              >
                <span>Subscribe</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>

        </div>

        {/* Project Disclaimer Box */}
        <div className="mt-12 pt-6 border-t border-navy-800/80">
          <div className="bg-navy-900/60 rounded-xl p-4 border border-navy-800 text-xs text-slate-400 leading-relaxed flex flex-col md:flex-row items-start md:items-center gap-3">
            <div className="px-2 py-0.5 bg-amber-500/20 text-amber-300 font-semibold rounded border border-amber-500/30 text-[11px] shrink-0">
              Demo Project Disclaimer
            </div>
            <p className="flex-1">
              <strong>TravelWise India</strong> is an intelligent tourism planning and demand forecasting concept web application. All price estimations, weather forecasts, visitor projections, and accommodation options represent curated sample/mock data designed to demonstrate decision-support capabilities. Real travel costs may vary based on live seasonal availability and bookings.
            </p>
          </div>
        </div>

        {/* Copyright and Credits */}
        <div className="mt-8 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} TravelWise India. Designed & Developed for Indian Tourism Innovation.</p>
          <p className="flex items-center gap-1.5">
            Crafted with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> for travelers exploring Incredible India.
          </p>
        </div>

      </div>
    </footer>
  );
};
