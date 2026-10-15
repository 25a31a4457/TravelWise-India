import React, { useState } from 'react';
import { 
  Compass, 
  Sparkles, 
  Target, 
  Cpu, 
  Database, 
  Layers, 
  TrendingUp, 
  Users, 
  Mail, 
  Send, 
  CheckCircle2, 
  ShieldAlert,
  Code2,
  Heart
} from 'lucide-react';
import { useTrip } from '../context/TripContext';

export const AboutPage: React.FC = () => {
  const { showToast } = useTrip();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email) {
      showToast('Message Received!', `Thank you ${formData.name}, we will respond within 24 hours.`, 'success');
      setFormData({ name: '', email: '', message: '' });
    }
  };

  const team = [
    { name: 'Aarav Sharma', role: 'Lead Product Architect', bio: 'Specializing in Indian tourism logistics & AI decision support models.', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80' },
    { name: 'Priya Venkatesh', role: 'Head of UX & Visual Design', bio: 'Passionate about cultural storytelling, Indian color theory & micro-interactions.', image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80' },
    { name: 'Karthik Rao', role: 'Data Visualization & Forecasting', bio: 'Time-series predictive analytics and seasonal hospitality demand forecasting.', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80' },
    { name: 'Ananya Deshmukh', role: 'Full-Stack Web Engineer', bio: 'Modern React ecosystem specialist, responsive styling, and web performance.', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80' }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-24">
      
      {/* Hero Header */}
      <section className="bg-navy-950 text-white py-16 px-4 sm:px-6 lg:px-8 border-b border-navy-800">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-saffron-500/20 text-saffron-400 text-xs font-semibold mb-4 border border-saffron-500/30">
            <Compass className="w-4 h-4" />
            <span>Behind TravelWise India</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white">
            Transforming How India Travels
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Bridging traveler intent with climate suitability, genuine homestay hospitality, and predictive tourism planning intelligence.
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 space-y-12">
        
        {/* PURPOSE & PROBLEM STATEMENT */}
        <section className="bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-slate-200 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <div className="w-10 h-10 rounded-xl bg-saffron-500/10 text-saffron-600 flex items-center justify-center font-bold mb-3">
              <Target className="w-5 h-5" />
            </div>
            <h2 className="font-serif text-2xl font-bold text-slate-900 mb-2">
              The Problem We Solve
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              India boasts unmatched geographic and cultural variety—from the freezing trans-Himalayan desert of Ladakh to tropical Kerala backwaters. Yet travelers frequently get stranded during sudden Western Ghats monsoons, suffer from hidden peak-season flight and hotel surcharges, or pick destinations misaligned with their group style.
            </p>
          </div>

          <div>
            <div className="w-10 h-10 rounded-xl bg-teal-500/10 text-teal-600 flex items-center justify-center font-bold mb-3">
              <Sparkles className="w-5 h-5" />
            </div>
            <h2 className="font-serif text-2xl font-bold text-slate-900 mb-2">
              Our Vision
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              <strong>TravelWise India</strong> is built to be a smart, transparent decision-support system. It empowers travelers to set realistic INR budgets, checks seasonal weather advisories, matches travelers with regional homestays, and assists tourism boards in understanding upcoming demand shifts.
            </p>
          </div>
        </section>

        {/* HOW RECOMMENDATION ENGINE WORKS */}
        <section className="bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-slate-200 space-y-6">
          <div className="flex items-center gap-2 text-saffron-600 font-bold text-xs uppercase tracking-wider">
            <Cpu className="w-4 h-4" />
            <span>Mathematical Methodology</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
            How the Recommendation Engine Calculates Matches
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Our multi-objective scoring formula balances financial viability, climate safety, personal interests, stay suitability, and group dynamics into a single normalized percentage score:
          </p>

          <div className="bg-slate-900 text-slate-100 p-5 rounded-2xl font-mono text-xs overflow-x-auto leading-loose border border-slate-800">
            <span className="text-emerald-400 font-bold">// 1. Total Cost Accumulation</span><br />
            stayCost = numberOfNights × selectedAccommodationPrice<br />
            dailyExpenseCost = numberOfDays × destinationAverageDailyExpense<br />
            totalCost = transportCost + stayCost + dailyExpenseCost + activitiesCost + bufferAmount<br /><br />
            <span className="text-saffron-400 font-bold">// 2. Weighted Suitability Formulation (100% Total)</span><br />
            finalScore = (0.40 × budgetFit) + (0.25 × weatherFit) + (0.20 × interestMatch) + (0.10 × accommodationFit) + (0.05 × groupFit)
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 text-xs">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <strong className="text-slate-900 block mb-1">Budget Fit (40%)</strong>
              <p className="text-slate-600">Calculates whether total cost fits comfortably within your INR target, penalizing severe overshoots.</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <strong className="text-slate-900 block mb-1">Weather Suitability (25%)</strong>
              <p className="text-slate-600">Cross-checks month-by-month historical temperature, rain probability, and monsoon alerts.</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <strong className="text-slate-900 block mb-1">Stay & Style (35%)</strong>
              <p className="text-slate-600">Combines interest tags (Mountains, Nature), group profile (Friends, Family), and signature homestays.</p>
            </div>
          </div>
        </section>

        {/* DEMAND FORECASTING METHODOLOGY */}
        <section className="bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-slate-200 space-y-4">
          <div className="flex items-center gap-2 text-teal-600 font-bold text-xs uppercase tracking-wider">
            <TrendingUp className="w-4 h-4" />
            <span>Forecasting Framework</span>
          </div>
          <h2 className="font-serif text-2xl font-bold text-slate-900">
            How Tourism Demand Forecasting Works
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            The Demand Forecasting module simulates time-series econometric modeling combining:
          </p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-700">
            <li className="flex items-start gap-2 bg-slate-50 p-3 rounded-xl border border-slate-200">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>Seasonality & Festivals:</strong> Diwali, Christmas, New Year, Kaveri Sankramana, and regional carnivals.</span>
            </li>
            <li className="flex items-start gap-2 bg-slate-50 p-3 rounded-xl border border-slate-200">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>Weather Elasticity:</strong> Inverse tourist volumes during heavy monsoon downpours vs. peak winter sunshine.</span>
            </li>
            <li className="flex items-start gap-2 bg-slate-50 p-3 rounded-xl border border-slate-200">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>Inventory & Occupancy:</strong> Hotel and certified homestay capacity constraints during holiday weekends.</span>
            </li>
            <li className="flex items-start gap-2 bg-slate-50 p-3 rounded-xl border border-slate-200">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>Confidence Intervals:</strong> Upper and lower forecast envelopes accounting for unexpected transit variations.</span>
            </li>
          </ul>
        </section>

        {/* TECH STACK & DATA SOURCES NOTE */}
        <section className="bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-slate-200 space-y-6">
          <div className="flex items-center gap-2 text-navy-900 font-bold text-xs uppercase tracking-wider">
            <Code2 className="w-4 h-4" />
            <span>Engineering & Architecture</span>
          </div>
          <h2 className="font-serif text-2xl font-bold text-slate-900">
            Modern Web Technologies
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-center font-semibold">
              React 18 + Vite
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-center font-semibold">
              TypeScript
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-center font-semibold">
              Tailwind CSS
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-center font-semibold">
              Recharts 2.15
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-center font-semibold">
              React Router 6
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-center font-semibold">
              Lucide React Icons
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-center font-semibold">
              Local Storage Sync
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-center font-semibold">
              CSS Print Styles
            </div>
          </div>

          {/* Sample Data Disclaimer Box */}
          <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 text-xs text-amber-900 flex items-start gap-3">
            <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <strong className="block font-bold">Data Sources & Sample Data Notice</strong>
              <p className="mt-0.5 leading-relaxed text-amber-800">
                All accommodation tariffs, weather statistics, transport costs, and monthly demand projections are curated sample/demo data to show realistic planning simulations without requiring commercial API keys.
              </p>
            </div>
          </div>
        </section>

        {/* TEAM CARDS */}
        <section className="bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-slate-200">
          <div className="mb-6">
            <span className="text-xs font-bold uppercase tracking-wider text-saffron-600 block mb-1">
              The Minds Behind It
            </span>
            <h2 className="font-serif text-2xl font-bold text-slate-900">
              Meet the Development Team
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map(member => (
              <div key={member.name} className="text-center p-4 bg-slate-50 rounded-2xl border border-slate-200/80">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-20 h-20 rounded-full mx-auto object-cover mb-3 shadow"
                />
                <h3 className="font-bold text-slate-900 text-sm">{member.name}</h3>
                <span className="text-[11px] text-saffron-600 font-semibold block">{member.role}</span>
                <p className="text-[11px] text-slate-500 mt-2 leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </section>

        {/* INTERACTIVE CONTACT FORM */}
        <section className="bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-slate-200">
          <div className="max-w-xl mx-auto text-center mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-600 block mb-1">
              Get in Touch
            </span>
            <h2 className="font-serif text-2xl font-bold text-slate-900">
              Questions, Feedback, or Tourism Partnerships?
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Send us a message and our team will get back to you promptly.
            </p>
          </div>

          <form onSubmit={handleContactSubmit} className="max-w-xl mx-auto space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Ramesh Kumar"
                  className="w-full px-3.5 py-2.5 text-xs bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-saffron-500"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  placeholder="ramesh@example.com"
                  className="w-full px-3.5 py-2.5 text-xs bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-saffron-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Your Message
              </label>
              <textarea
                rows={4}
                required
                value={formData.message}
                onChange={e => setFormData({ ...formData, message: e.target.value })}
                placeholder="Ask about destination recommendations, algorithms, or regional onboarding..."
                className="w-full px-3.5 py-2.5 text-xs bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-saffron-500"
              />
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-3 bg-navy-900 hover:bg-navy-800 text-white font-bold text-xs rounded-xl shadow transition-all active:scale-95"
            >
              <span>Send Message</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </section>

      </div>

    </div>
  );
};
