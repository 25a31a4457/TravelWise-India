import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Compass, Lock, Mail, ShieldAlert, ArrowRight, UserCheck, User as UserIcon } from 'lucide-react';

export const SignupPage: React.FC = () => {
  const { signup, loginAsGuest } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const returnTo = (location.state as any)?.from || '/recommendations';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    const res = await signup(name, email, password);
    setIsSubmitting(false);

    if (res.success) {
      navigate(returnTo, { replace: true });
    } else {
      setError(res.error || 'Failed to create account. Please check your information.');
    }
  };

  const handleGuest = () => {
    loginAsGuest();
    navigate(returnTo, { replace: true });
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center px-4">
        <Link to="/" className="inline-flex items-center gap-2 mb-4 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-saffron-500 to-amber-600 flex items-center justify-center text-white shadow-lg group-hover:scale-105 transition-transform">
            <Compass className="w-6 h-6 animate-spin-slow" />
          </div>
          <span className="font-serif text-2xl font-bold tracking-tight text-white">
            TravelWise <span className="text-saffron-400">India</span>
          </span>
        </Link>
        <h2 className="text-2xl font-bold font-serif tracking-tight text-white">
          Create your TravelWise Account
        </h2>
        <p className="mt-1 text-xs text-slate-400">
          Save trip itineraries, track plans, and download verified PDF guides.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4">
        <div className="bg-slate-800/90 backdrop-blur-md py-8 px-6 shadow-2xl rounded-3xl border border-slate-700/80 sm:px-10">
          {/* Device-Local Mode Notice */}
          <div className="mb-6 p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-2.5 text-xs text-amber-200">
            <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong>Device-Local Mode:</strong> Authentication backend is not connected (device-local mode). User sessions and plans are stored device-local in your browser.
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Full Name
              </label>
              <div className="relative">
                <UserIcon className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Aditi Rao"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl py-2.5 pl-10 pr-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-saffron-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="traveler@example.com"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl py-2.5 pl-10 pr-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-saffron-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl py-2.5 pl-10 pr-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-saffron-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full mt-2 py-3 px-4 rounded-xl bg-gradient-to-r from-saffron-500 to-amber-600 hover:from-saffron-600 hover:to-amber-700 text-white font-semibold text-sm shadow-md transition-all flex items-center justify-center gap-2 group cursor-pointer"
            >
              <span>{isSubmitting ? 'Creating account...' : 'Create Account & Continue'}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-slate-700/60">
            <button
              type="button"
              onClick={handleGuest}
              className="w-full py-2.5 px-4 rounded-xl bg-slate-700/60 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-600/60 transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <UserCheck className="w-4 h-4 text-saffron-400" />
              <span>Continue as Guest (No Sign-In Required)</span>
            </button>
          </div>

          <div className="mt-5 text-center text-xs text-slate-400">
            Already have an account?{' '}
            <Link
              to="/login"
              state={{ from: returnTo }}
              className="text-saffron-400 hover:text-saffron-300 font-semibold underline underline-offset-2"
            >
              Sign in here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
