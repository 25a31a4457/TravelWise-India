import React, { useState, useRef, useEffect } from 'react';
import { MapPin, Search, ChevronDown, Check, X, AlertCircle } from 'lucide-react';
import { CityOption, searchCities, getCityByName } from '../data/cities';

interface SearchableCitySelectProps {
  value: string;
  onChange: (city: string) => void;
  error?: string;
  label?: string;
  placeholder?: string;
  helperText?: string;
  className?: string;
  compact?: boolean;
}

export const SearchableCitySelect: React.FC<SearchableCitySelectProps> = ({
  value,
  onChange,
  error,
  label = 'Origin',
  placeholder = 'Enter your starting city',
  helperText = 'Transport costs, local attractions, and travel durations are calculated relative to your origin hub.',
  className = '',
  compact = false
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const selectedCityObj = getCityByName(value);
  const filteredCities = searchCities(searchTerm);

  // Close on outside click
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  // Reset active index when filtered cities change
  useEffect(() => {
    setActiveIndex(0);
  }, [searchTerm]);

  const handleSelect = (cityName: string) => {
    onChange(cityName);
    setSearchTerm('');
    setIsOpen(false);
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange('');
    setSearchTerm('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) {
      if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        setIsOpen(true);
      }
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex(prev => (prev + 1 < filteredCities.length ? prev + 1 : 0));
      scrollActiveIntoView((activeIndex + 1) % filteredCities.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex(prev => (prev - 1 >= 0 ? prev - 1 : filteredCities.length - 1));
      scrollActiveIntoView((activeIndex - 1 + filteredCities.length) % filteredCities.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredCities.length > 0 && activeIndex < filteredCities.length) {
        handleSelect(filteredCities[activeIndex].name);
      }
    } else if (e.key === 'Escape') {
      e.preventDefault();
      setIsOpen(false);
    }
  };

  const scrollActiveIntoView = (index: number) => {
    if (listRef.current) {
      const items = listRef.current.getElementsByTagName('li');
      if (items[index]) {
        items[index].scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      }
    }
  };

  return (
    <div className={`relative ${className}`} ref={containerRef}>
      {label && !compact && (
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2 flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-saffron-600" />
            <span>{label}</span>
          </span>
          <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
            Origin Hub
          </span>
        </label>
      )}

      {/* Main Trigger / Search Field */}
      <div className="relative">
        <button
          type="button"
          onClick={() => {
            setIsOpen(prev => !prev);
            setTimeout(() => inputRef.current?.focus(), 50);
          }}
          onKeyDown={handleKeyDown}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-label={label ? `${label}: ${value || 'Select origin city'}` : 'Select origin city'}
          className={`w-full text-left bg-slate-50 hover:bg-slate-100/90 text-slate-900 font-semibold text-sm rounded-xl ${
            compact ? 'px-3 py-2.5' : 'px-4 py-3.5'
          } border transition-all flex items-center justify-between gap-2 shadow-sm ${
            error
              ? 'border-rose-500 bg-rose-50/30'
              : isOpen
              ? 'border-saffron-500 ring-2 ring-saffron-500/20 bg-white'
              : 'border-slate-200'
          }`}
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <MapPin className="w-4 h-4 text-saffron-600 shrink-0" />
            <span className="truncate">
              {value ? (
                <>
                  <span className="font-bold text-slate-900">{value}</span>
                  {selectedCityObj && (
                    <span className="text-slate-500 font-normal text-xs ml-1.5 hidden sm:inline">
                      ({selectedCityObj.state})
                    </span>
                  )}
                </>
              ) : (
                <span className="text-slate-400 font-normal">{placeholder}</span>
              )}
            </span>
          </div>

          <div className="flex items-center gap-1.5 shrink-0 text-slate-400">
            {value && (
              <>
                <span className="text-[10px] bg-slate-200 text-slate-700 px-2 py-0.5 rounded-full font-bold uppercase hidden xs:inline">
                  {selectedCityObj?.region || 'India'}
                </span>
                <button
                  type="button"
                  onClick={handleClear}
                  aria-label="Clear selected origin city"
                  title="Clear origin"
                  className="p-1 hover:bg-slate-200 text-slate-400 hover:text-slate-700 rounded-full transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </>
            )}
            <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180 text-saffron-600' : ''}`} />
          </div>
        </button>
      </div>

      {/* Helper text / error */}
      {error ? (
        <p className="text-xs text-rose-600 mt-1 flex items-center gap-1">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          <span>{error}</span>
        </p>
      ) : (
        helperText && !compact && (
          <p className="text-[11px] text-slate-500 mt-1.5 leading-tight">
            {helperText}
          </p>
        )
      )}

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute z-50 left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-fade-in">
          {/* Search Input in Dropdown */}
          <div className="p-3 border-b border-slate-100 bg-slate-50/70">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                ref={inputRef}
                type="text"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type city name (e.g. Visakhapatnam, Hyderabad, Bengaluru)..."
                className="w-full pl-9 pr-8 py-2 bg-white rounded-xl border border-slate-200 text-xs font-semibold text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-saffron-500 focus:border-saffron-500"
              />
              {searchTerm && (
                <button
                  type="button"
                  onClick={() => setSearchTerm('')}
                  aria-label="Clear search input"
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* City Options List */}
          <ul
            ref={listRef}
            role="listbox"
            className="max-h-60 overflow-y-auto py-1 divide-y divide-slate-100 text-xs"
          >
            {filteredCities.length > 0 ? (
              filteredCities.map((city, idx) => {
                const isSelected = city.name.toLowerCase() === value.toLowerCase();
                const isActive = idx === activeIndex;

                return (
                  <li
                    key={city.name}
                    role="option"
                    aria-selected={isSelected}
                    onClick={() => handleSelect(city.name)}
                    onMouseEnter={() => setActiveIndex(idx)}
                    className={`px-4 py-2.5 cursor-pointer flex items-center justify-between transition-colors ${
                      isActive ? 'bg-saffron-50/60 text-slate-900' : 'hover:bg-slate-50'
                    } ${isSelected ? 'font-bold bg-amber-50/40' : ''}`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 ${
                        isSelected ? 'bg-saffron-500 text-white' : 'bg-slate-100 text-slate-500'
                      }`}>
                        <MapPin className="w-3 h-3" />
                      </div>
                      <div>
                        <span className="font-bold text-slate-900 block leading-tight">
                          {city.name}
                        </span>
                        <span className="text-[11px] text-slate-500 leading-tight">
                          {city.state}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold uppercase bg-slate-100 text-slate-600">
                        {city.region}
                      </span>
                      {isSelected && <Check className="w-4 h-4 text-saffron-600 stroke-[3]" />}
                    </div>
                  </li>
                );
              })
            ) : (
              <li className="p-6 text-center text-slate-500">
                <MapPin className="w-6 h-6 mx-auto mb-2 text-slate-400 opacity-60" />
                <p className="font-bold text-slate-800 text-xs mb-1">
                  No matching city found. Try a different city name.
                </p>
                <p className="text-[11px] text-slate-500 max-w-xs mx-auto">
                  Try searching supported origin hubs like <strong>Visakhapatnam</strong>, <strong>Hyderabad</strong>, <strong>Bengaluru</strong>, <strong>Chennai</strong>, or <strong>Delhi</strong>.
                </p>
              </li>
            )}
          </ul>

          {/* Quick Popular Picks Footer */}
          {!searchTerm && (
            <div className="p-2.5 bg-slate-50 border-t border-slate-100 text-[11px] flex flex-wrap items-center gap-1.5">
              <span className="text-slate-400 font-bold uppercase text-[9px] px-1">Quick:</span>
              {['Visakhapatnam', 'Vijayawada', 'Araku Valley', 'Bengaluru', 'Hyderabad'].map(c => (
                <button
                  key={c}
                  type="button"
                  onClick={() => handleSelect(c)}
                  className="px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700 hover:bg-saffron-50 hover:text-saffron-700 transition-colors"
                >
                  {c}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
