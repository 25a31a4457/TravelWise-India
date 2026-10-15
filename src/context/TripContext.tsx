import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { 
  TripPreferences, 
  Destination, 
  RecommendationResult, 
  ActiveTripPlan, 
  PlanningMode, 
  SavedPlanHistoryRecord,
  User,
  EMPTY_PREFERENCES
} from '../types';
import { DESTINATIONS } from '../data/destinations';
import { rankDestinations } from '../utils/recommendationEngine';
import { TouristAttraction, getAttractionById } from '../data/attractions';
import { buildActiveTripPlan } from '../utils/itineraryEngine';
import { useAuth } from './AuthContext';

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  title: string;
  message?: string;
}

interface TripContextType {
  preferences: TripPreferences;
  setPreferences: React.Dispatch<React.SetStateAction<TripPreferences>>;
  recommendations: RecommendationResult[];
  savedDestinations: string[]; // destination IDs
  toggleSaveDestination: (id: string) => void;
  isSaved: (id: string) => boolean;
  compareList: string[]; // destination IDs
  toggleCompare: (id: string) => void;
  removeFromCompare: (id: string) => void;
  clearCompare: () => void;
  selectedAttractionIds: string[];
  selectedAttractions: TouristAttraction[];
  toggleAttractionSelection: (id: string) => void;
  isAttractionSelected: (id: string) => boolean;
  clearSelectedAttractions: () => void;
  localAttractionsCost: number;
  toasts: ToastMessage[];
  showToast: (title: string, message?: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
  removeToast: (id: string) => void;
  isAnalyzing: boolean;
  triggerSearch: (newPrefs?: TripPreferences) => Promise<void>;
  updateBudget: (newBudget: number) => void;
  
  // Shared Active Trip Plan & Planning Mode
  planningMode: PlanningMode;
  setPlanningMode: (mode: PlanningMode) => void;
  activePlan: ActiveTripPlan;
  commitActivePlan: (customPrefs?: TripPreferences, customIds?: string[], mode?: PlanningMode) => ActiveTripPlan;
  
  // Saved Plans & History
  savedPlans: SavedPlanHistoryRecord[];
  saveActivePlan: (user?: User | null) => SavedPlanHistoryRecord;
  deleteSavedPlan: (planId: string) => void;
  loadSavedPlanIntoActive: (planId: string) => ActiveTripPlan | undefined;
  
  // Reset
  resetPlan: () => void;
}

const TripContext = createContext<TripContextType | undefined>(undefined);

export const TripProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isAuthenticated } = useAuth();

  const [preferences, setPreferences] = useState<TripPreferences>(() => {
    try {
      const saved = localStorage.getItem('travelwise_preferences');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      // fallback
    }
    return EMPTY_PREFERENCES;
  });

  const [savedDestinations, setSavedDestinations] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('travelwise_saved');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      // fallback
    }
    return [];
  });

  const [compareList, setCompareList] = useState<string[]>([]);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Planning Mode state ('individual' | 'combined')
  const [planningMode, setPlanningMode] = useState<PlanningMode>(() => {
    try {
      const saved = localStorage.getItem('travelwise_planning_mode');
      if (saved === 'individual' || saved === 'combined') return saved;
    } catch (e) {}
    return 'individual';
  });

  useEffect(() => {
    try {
      localStorage.setItem('travelwise_planning_mode', planningMode);
    } catch (e) {}
  }, [planningMode]);

  // Selected Attractions state
  const [selectedAttractionIds, setSelectedAttractionIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('travelwise_selected_attractions');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return [];
  });

  useEffect(() => {
    try {
      localStorage.setItem('travelwise_selected_attractions', JSON.stringify(selectedAttractionIds));
    } catch (e) {}
  }, [selectedAttractionIds]);

  const selectedAttractions = useMemo(() => {
    return selectedAttractionIds
      .map(id => getAttractionById(id))
      .filter((a): a is TouristAttraction => a !== undefined);
  }, [selectedAttractionIds]);

  const localAttractionsCost = useMemo(() => {
    return selectedAttractions.reduce((sum, a) => sum + (a.estimatedTransitCostINR || a.suggestedTransportCost || 0), 0);
  }, [selectedAttractions]);

  // Active Trip Plan State
  const [activePlan, setActivePlan] = useState<ActiveTripPlan>(() => {
    try {
      const stored = localStorage.getItem('travelwise_active_plan');
      if (stored) return JSON.parse(stored);
    } catch (e) {}
    return buildActiveTripPlan(EMPTY_PREFERENCES, [], 'individual');
  });

  // Recompute active plan whenever preferences, selected places, or planning mode changes
  useEffect(() => {
    const updatedPlan = buildActiveTripPlan(preferences, selectedAttractionIds, planningMode);
    setActivePlan(updatedPlan);
    try {
      localStorage.setItem('travelwise_active_plan', JSON.stringify(updatedPlan));
    } catch (e) {}
  }, [preferences, selectedAttractionIds, planningMode]);

  // User-scoped Saved Plans History State
  const [savedPlans, setSavedPlans] = useState<SavedPlanHistoryRecord[]>([]);

  // Synchronize saved plans strictly with authenticated user
  useEffect(() => {
    if (isAuthenticated && user?.id) {
      try {
        const userKey = `travelwise_saved_plans_${user.id}`;
        const stored = localStorage.getItem(userKey);
        if (stored) {
          setSavedPlans(JSON.parse(stored));
          return;
        }

        // Migrate from legacy un-scoped key if exists
        const legacy = localStorage.getItem('travelwise_saved_plans');
        if (legacy) {
          const parsedLegacy: SavedPlanHistoryRecord[] = JSON.parse(legacy);
          const userSpecific = parsedLegacy.filter(p => !p.userId || p.userId === user.id || p.userId === 'guest');
          if (userSpecific.length > 0) {
            localStorage.setItem(userKey, JSON.stringify(userSpecific));
            setSavedPlans(userSpecific);
          } else {
            setSavedPlans([]);
          }
          localStorage.removeItem('travelwise_saved_plans');
          return;
        }
      } catch (e) {
        console.warn('Failed to load user-scoped saved plans', e);
      }
      setSavedPlans([]);
    } else {
      // Clear in-memory caches and saved history on logout/signed-out state
      setSavedPlans([]);
    }
  }, [isAuthenticated, user?.id]);

  const commitActivePlan = (
    customPrefs?: TripPreferences, 
    customIds?: string[], 
    mode?: PlanningMode
  ): ActiveTripPlan => {
    const prefs = customPrefs || preferences;
    const ids = customIds || selectedAttractionIds;
    const pMode = mode || planningMode;

    const newPlan = buildActiveTripPlan(prefs, ids, pMode);
    setActivePlan(newPlan);
    try {
      localStorage.setItem('travelwise_active_plan', JSON.stringify(newPlan));
    } catch (e) {}
    return newPlan;
  };

  const saveActivePlan = (currentUser?: User | null): SavedPlanHistoryRecord => {
    const activeUser = currentUser || user;
    const record: SavedPlanHistoryRecord = {
      ...activePlan,
      isSaved: true,
      userId: activeUser?.id || 'guest',
      savedAt: new Date().toISOString()
    };

    setSavedPlans(prev => {
      // Replace existing plan if same planId or prepend
      const existingIdx = prev.findIndex(p => p.planId === record.planId);
      const updated = existingIdx >= 0
        ? prev.map((p, idx) => idx === existingIdx ? record : p)
        : [record, ...prev];

      if (activeUser?.id) {
        try {
          localStorage.setItem(`travelwise_saved_plans_${activeUser.id}`, JSON.stringify(updated));
        } catch (e) {}
      }
      return updated;
    });

    setActivePlan(prev => ({ ...prev, isSaved: true }));
    showToast('Trip Plan Saved!', 'Your itinerary snapshot is saved to My Trip History.', 'success');
    return record;
  };

  const deleteSavedPlan = (planId: string) => {
    setSavedPlans(prev => {
      const updated = prev.filter(p => p.planId !== planId);
      if (user?.id) {
        try {
          localStorage.setItem(`travelwise_saved_plans_${user.id}`, JSON.stringify(updated));
        } catch (e) {}
      }
      return updated;
    });
    showToast('Plan Deleted', 'Trip plan removed from your history.', 'info');
  };

  const loadSavedPlanIntoActive = (planId: string): ActiveTripPlan | undefined => {
    const target = savedPlans.find(p => p.planId === planId);
    if (!target) return undefined;

    setPreferences(prev => ({
      ...prev,
      originCity: target.originCity.name,
      budget: target.budget,
      travelMonth: target.travelMonth,
      travelYear: target.travelYear,
      days: target.days,
      nights: target.nights,
      groupType: target.groupType,
      accommodationType: target.accommodationType,
      interests: target.interests,
      budgetOnly: target.budgetScope === 'total'
    }));
    setSelectedAttractionIds(target.selectedPlaceIds);
    setPlanningMode(target.planningMode);
    setActivePlan(target);

    showToast('Plan Loaded', `Loaded "${target.title}" into active trip planner.`, 'success');
    return target;
  };

  const resetPlan = () => {
    // 1. Clear ONLY draft trip inputs, selections, and itineraries
    setSelectedAttractionIds([]);
    setPreferences(EMPTY_PREFERENCES);
    setPlanningMode('individual');
    const freshPlan = buildActiveTripPlan(EMPTY_PREFERENCES, [], 'individual');
    setActivePlan(freshPlan);

    // 2. Remove draft storage keys ONLY - NEVER touch user session or permanent history
    try {
      localStorage.removeItem('travelwise_selected_attractions');
      localStorage.removeItem('travelwise_preferences');
      localStorage.removeItem('travelwise_active_plan');
      localStorage.removeItem('travelwise_planning_mode');
      localStorage.removeItem('travelwise_forecast_selection');
    } catch (e) {}

    // 3. Explicit notification required by specification
    showToast('Plan Reset', 'Your current plan has been reset. You are still signed in.', 'info');
  };

  const toggleAttractionSelection = (id: string) => {
    const attraction = getAttractionById(id);
    const name = attraction ? attraction.name : 'Attraction';
    if (selectedAttractionIds.includes(id)) {
      setSelectedAttractionIds(prev => prev.filter(item => item !== id));
      showToast('Removed from Itinerary', `${name} removed from your trip plan.`, 'info');
    } else {
      setSelectedAttractionIds(prev => [...prev, id]);
      showToast('Added to Itinerary!', `${name} added to your ${preferences.originCity} trip plan.`, 'success');
    }
  };

  const isAttractionSelected = (id: string) => selectedAttractionIds.includes(id);

  const clearSelectedAttractions = () => {
    setSelectedAttractionIds([]);
    showToast('Itinerary Cleared', 'All selected attractions have been cleared.', 'info');
  };

  // Recommendations calculated whenever preferences change
  const [recommendations, setRecommendations] = useState<RecommendationResult[]>(() => 
    rankDestinations(DESTINATIONS, EMPTY_PREFERENCES)
  );

  useEffect(() => {
    setRecommendations(rankDestinations(DESTINATIONS, preferences));
    try {
      localStorage.setItem('travelwise_preferences', JSON.stringify(preferences));
    } catch (e) {}
  }, [preferences]);

  useEffect(() => {
    try {
      localStorage.setItem('travelwise_saved', JSON.stringify(savedDestinations));
    } catch (e) {}
  }, [savedDestinations]);

  const showToast = (title: string, message?: string, type: 'success' | 'info' | 'warning' | 'error' = 'success') => {
    const id = Date.now().toString() + Math.random().toString();
    setToasts(prev => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const toggleSaveDestination = (id: string) => {
    const dest = DESTINATIONS.find(d => d.id === id);
    const name = dest ? dest.name : 'Destination';
    if (savedDestinations.includes(id)) {
      setSavedDestinations(prev => prev.filter(item => item !== id));
      showToast('Removed from Saved Trips', `${name} has been removed from your wishlist.`, 'info');
    } else {
      setSavedDestinations(prev => [...prev, id]);
      showToast('Saved to My Trips!', `${name} is added to your saved journey list.`, 'success');
    }
  };

  const isSaved = (id: string) => savedDestinations.includes(id);

  const toggleCompare = (id: string) => {
    const dest = DESTINATIONS.find(d => d.id === id);
    const name = dest ? dest.name : 'Destination';
    if (compareList.includes(id)) {
      setCompareList(prev => prev.filter(item => item !== id));
    } else {
      if (compareList.length >= 3) {
        showToast('Comparison limit reached', 'You can compare up to 3 destinations side-by-side.', 'warning');
        return;
      }
      setCompareList(prev => [...prev, id]);
      showToast('Added to Comparison', `${name} is ready for side-by-side comparison.`, 'info');
    }
  };

  const removeFromCompare = (id: string) => {
    setCompareList(prev => prev.filter(item => item !== id));
  };

  const clearCompare = () => {
    setCompareList([]);
  };

  const updateBudget = (newBudget: number) => {
    setPreferences(prev => ({ ...prev, budget: newBudget }));
    showToast('Budget Updated', `Recommendations recalculated for ₹${newBudget.toLocaleString('en-IN')}`, 'info');
  };

  const triggerSearch = async (newPrefs?: TripPreferences) => {
    if (newPrefs) {
      setPreferences(newPrefs);
    }
    setIsAnalyzing(true);
    await new Promise(res => setTimeout(res, 900));
    setIsAnalyzing(false);
  };

  return (
    <TripContext.Provider
      value={{
        preferences,
        setPreferences,
        recommendations,
        savedDestinations,
        toggleSaveDestination,
        isSaved,
        compareList,
        toggleCompare,
        removeFromCompare,
        clearCompare,
        selectedAttractionIds,
        selectedAttractions,
        toggleAttractionSelection,
        isAttractionSelected,
        clearSelectedAttractions,
        localAttractionsCost,
        toasts,
        showToast,
        removeToast,
        isAnalyzing,
        triggerSearch,
        updateBudget,
        planningMode,
        setPlanningMode,
        activePlan,
        commitActivePlan,
        savedPlans,
        saveActivePlan,
        deleteSavedPlan,
        loadSavedPlanIntoActive,
        resetPlan
      }}
    >
      {children}
    </TripContext.Provider>
  );
};

export const useTrip = () => {
  const context = useContext(TripContext);
  if (!context) {
    throw new Error('useTrip must be used within a TripProvider');
  }
  return context;
};
