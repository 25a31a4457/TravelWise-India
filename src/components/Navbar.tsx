import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Compass, 
  Sparkles, 
  TrendingUp, 
  Bookmark, 
  Menu, 
  X, 
  ArrowRight, 
  Layers, 
  RotateCcw,
  User,
  LogOut,
  AlertTriangle,
  ChevronDown
} from 'lucide-react';
import { useTrip } from '../context/TripContext';
import { useAuth } from '../context/AuthContext';

export const Navbar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { savedDestinations, compareList, savedPlans, resetPlan } = useTrip();
  const { user, isAuthenticated, logout } = useAuth();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [resetConfirmOpen, setResetConfirmOpen] = useState(false);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Trip Planner', path: '/plan' },
    { name: 'Destinations', path: '/recommendations' },
    { name: 'Demand Forecast', path: '/forecast', icon: TrendingUp, badge: 'Analytics' },
    { name: 'Saved Plans', path: '/history', icon: Bookmark, badge: savedPlans.length > 0 ? String(savedPlans.length) : undefined },
    { name: 'About', path: '/about' },
  ];

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && (location.pathname.startsWith(path) || (path === '/history' && location.pathname === '/saved'))) return true;
    return false;
  };

  const handleConfirmReset = () => {
    resetPlan();
    setResetConfirmOpen(false);
    setMobileMenuOpen(false);
    navigate('/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const userInitials = user?.name
    ? user.name
        .split(' ')
        .map((n: string) => n[0])
        .slice(0, 2)
        .join('')
        .toUpperCase()
    : 'U';

  return (
    <>
      <header className="sticky top-0 z-40 bg-navy-900/95 backdrop-blur-md border-b border-navy-700/60 text-white shadow-sm transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Brand Logo */}
            <Link to="/" className="flex items-center gap-3 group focus:outline-none">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-saffron-600 via-saffron-500 to-amber-400 flex items-center justify-center shadow-lg shadow-saffron-600/30 group-hover:scale-105 transition-transform duration-300">
                <Compass className="w-6 h-6 text-white stroke-[2.2]" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-serif text-2xl font-bold tracking-tight text-white group-hover:text-amber-300 transition-colors">
                    TravelWise
                  </span>
                  <span className="bg-gradient-to-r from-saffron-400 to-amber-300 bg-clip-text text-transparent font-sans font-bold text-xs uppercase tracking-wider px-1.5 py-0.5 rounded border border-saffron-400/40">
                    India
                  </span>
                </div>
                <p className="text-[11px] text-slate-300 font-medium tracking-wide">
                  Plan smarter. Travel beautifully.
                </p>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-1 lg:gap-2">
              {navLinks.map(link => {
                const active = isActive(link.path);
                const Icon = link.icon;
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`relative px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                      active
                        ? 'text-white bg-white/10 shadow-sm font-semibold'
                        : 'text-slate-300 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {Icon && <Icon className="w-4 h-4 text-emerald-400" />}
                    <span>{link.name}</span>
                    {link.badge && (
                      <span className="text-[10px] px-1.5 py-0.2 bg-saffron-500/20 text-saffron-300 font-semibold rounded-full border border-saffron-500/40">
                        {link.badge}
                      </span>
                    )}
                    {active && (
                      <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-saffron-500 rounded-full" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Right Action Icons & Auth / Reset CTA */}
            <div className="hidden md:flex items-center gap-3">
              
              {/* Reset Plan Button */}
              <button
                type="button"
                onClick={() => setResetConfirmOpen(true)}
                className="px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-300 hover:text-white hover:bg-white/10 border border-slate-700/60 transition-colors flex items-center gap-1.5 cursor-pointer"
                title="Reset active draft plan and return home"
              >
                <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
                <span>Reset Plan</span>
              </button>

              {/* Compare shortcut if any */}
              {compareList.length > 0 && (
                <Link
                  to="/recommendations"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-teal-500/10 border border-teal-500/30 text-teal-300 text-xs font-semibold hover:bg-teal-500/20 transition-colors"
                  title="View comparisons"
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>Compare ({compareList.length})</span>
                </Link>
              )}

              {/* User Profile / Auth State */}
              {isAuthenticated && user ? (
                <div className="relative">
                  <button
                    onClick={() => setUserDropdownOpen(prev => !prev)}
                    className="flex items-center gap-2 p-1.5 pr-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold border border-slate-700 transition-colors cursor-pointer"
                  >
                    <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-saffron-500 to-amber-500 text-white flex items-center justify-center font-bold text-xs shadow-sm">
                      {userInitials}
                    </div>
                    <span className="max-w-[100px] truncate">{user.name}</span>
                    <ChevronDown className="w-3 h-3 text-slate-400" />
                  </button>

                  {userDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl py-2 z-50 text-xs animate-fade-in">
                      <div className="px-3 py-2 border-b border-slate-800">
                        <p className="font-bold text-white truncate">{user.name}</p>
                        <p className="text-slate-400 text-[11px] truncate">{user.email}</p>
                      </div>
                      <Link
                        to="/history"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2 px-3 py-2 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
                      >
                        <Bookmark className="w-3.5 h-3.5 text-saffron-400" />
                        <span>My Trip History ({savedPlans.length})</span>
                      </Link>
                      <button
                        type="button"
                        onClick={() => {
                          logout();
                          setUserDropdownOpen(false);
                        }}
                        className="w-full text-left flex items-center gap-2 px-3 py-2 text-rose-400 hover:text-rose-300 hover:bg-slate-800 transition-colors cursor-pointer"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  to="/login"
                  className="px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-200 hover:text-white bg-slate-800/80 hover:bg-slate-800 border border-slate-700 transition-colors flex items-center gap-1.5"
                >
                  <User className="w-3.5 h-3.5 text-saffron-400" />
                  <span>Sign In</span>
                </Link>
              )}

              {/* Primary Action Button */}
              <Link
                to="/plan"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-saffron-500 to-amber-500 hover:from-saffron-600 hover:to-amber-600 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-md transition-all active:scale-95"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-100" />
                <span>Plan Trip</span>
              </Link>

            </div>

            {/* Mobile Hamburger Button */}
            <div className="flex md:hidden items-center gap-2">
              <button
                type="button"
                onClick={() => setResetConfirmOpen(true)}
                className="p-2 text-slate-300 hover:text-white"
                title="Reset Plan"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors focus:outline-none"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Drawer Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-navy-800 bg-navy-950/98 backdrop-blur-xl px-4 pt-3 pb-6 space-y-3 animate-fade-in">
            <div className="space-y-1">
              {navLinks.map(link => {
                const active = isActive(link.path);
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                      active
                        ? 'bg-white/10 text-white font-bold'
                        : 'text-slate-300 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>

            <div className="pt-3 border-t border-navy-800 flex flex-col gap-2">
              {isAuthenticated && user ? (
                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-saffron-500 text-white font-bold text-xs flex items-center justify-center">
                      {userInitials}
                    </div>
                    <div>
                      <p className="font-bold text-white text-xs">{user.name}</p>
                      <p className="text-[10px] text-slate-400">{user.email}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                    className="text-xs text-rose-400 font-semibold"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-2.5 rounded-xl text-center text-xs font-bold bg-slate-800 text-slate-200 hover:bg-slate-700"
                >
                  Sign In / Create Account
                </Link>
              )}

              <Link
                to="/plan"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-saffron-500 to-amber-500 text-white text-center font-bold text-xs shadow-md"
              >
                Plan My Trip
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Reset Confirmation Dialog */}
      {resetConfirmOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-slate-200 text-slate-800">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mb-4 border border-amber-200">
              <RotateCcw className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl font-bold text-slate-900">
              Reset Trip Plan & Return Home?
            </h3>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              This will clear your active draft selections and restore default settings. Your saved trip history will not be affected.
            </p>
            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setResetConfirmOpen(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmReset}
                className="px-4 py-2 rounded-xl bg-saffron-600 hover:bg-saffron-700 text-white text-xs font-bold shadow transition-colors cursor-pointer"
              >
                Yes, Reset & Go Home
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
