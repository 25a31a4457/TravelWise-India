export type GroupType = 'Solo' | 'Couple' | 'Family' | 'Friends';

export type AccommodationType = 
  | 'Hostel' 
  | 'Budget Hotel' 
  | 'Homestay' 
  | '3-Star Hotel' 
  | '4-Star Hotel' 
  | 'Luxury Resort';

export type TravelPace = 'Relaxed' | 'Balanced' | 'Packed';

export interface TripPreferences {
  originCity: string;
  budget: number;
  travelMonth: string;
  travelYear: number;
  days: number;
  nights: number;
  groupType: GroupType;
  accommodationType: AccommodationType;
  interests: string[];
  travelPace: TravelPace;
  budgetOnly: boolean;
}

export type PhotoImageType = 'verified-property-photo' | 'representative-real-photo' | 'fallback';

export interface PhotoMetadata {
  imageUrl: string;
  alt: string;
  source: string;
  sourcePageUrl?: string;
  photographer?: string;
  license: string;
  attribution?: string;
  propertyId?: string;
  imageType: PhotoImageType;
  notes?: string;
}

export interface StayOption {
  id: string;
  name: string;
  type: AccommodationType;
  pricePerNight: number;
  rating?: number;
  reviewsCount?: number;
  image: string;
  photoMetadata?: PhotoMetadata;
  galleryPhotos?: PhotoMetadata[];
  amenities: string[];
  location: string;
  isBestValue?: boolean;
  description?: string;
  isDemoListing?: boolean;
}

export interface SituationPhoto {
  id: string;
  url: string;
  caption: string;
  category: 'nature' | 'stays' | 'food' | 'attractions' | 'adventure' | 'night' | 'spiritual';
  seasons: string[];
  suitableGroups?: (GroupType | string)[];
  metadata?: PhotoMetadata;
}

export interface ItineraryDay {
  day: number;
  title: string;
  morning: string;
  afternoon: string;
  evening: string;
  dailyCost: number;
  highlight: string;
  image: string;
  icon?: string;
}

export interface MonthlyWeather {
  tempMin: number;
  tempMax: number;
  rainChance: number;
  condition: string;
  suitability: 'Excellent' | 'Good' | 'Moderate' | 'Avoid';
  summary: string;
}

export interface Destination {
  id: string;
  name: string;
  state: string;
  region: 'South' | 'North' | 'West' | 'East' | 'Islands';
  tagline: string;
  heroImage: string;
  cardImage: string;
  tags: string[];
  bestMonths: string[];
  avoidMonths: string[];
  transportCostFrom: Record<string, number>;
  averageDailyExpense: number;
  accommodationPrices: Record<AccommodationType, number>;
  monthlyWeather: Record<string, MonthlyWeather>;
  stays: StayOption[];
  situationPhotos: SituationPhoto[];
  suggestedItinerary: ItineraryDay[];
  attractions: string[];
  specialtyFood: string[];
  suitabilityExplanations: Record<string, string>;
  coordinates: { lat: number; lng: number };
}

export interface CostBreakdown {
  transportCost: number;
  accommodationCost: number;
  dailyExpenseCost: number;
  activitiesCost: number;
  bufferAmount: number;
  total: number;
  remainingOrExtra: number;
}

export interface RecommendationResult {
  destination: Destination;
  matchScore: number;
  matchLabel: 'Excellent Match' | 'Great Match' | 'Good Match';
  estimatedTotalCost: number;
  costBreakdown: CostBreakdown;
  weatherFitScore: number;
  budgetFitScore: number;
  interestMatchScore: number;
  accommodationFitScore: number;
  groupFitScore: number;
  budgetStatus: 'Within Budget' | 'Slightly Above Budget' | 'Premium Option';
  recommendationReason: string;
  currentWeather: MonthlyWeather;
}

export interface ForecastMonthlyPoint {
  month: string;
  actual?: number;
  forecast?: number;
  confidenceLow?: number;
  confidenceHigh?: number;
  occupancy: number;
  trend: 'Up' | 'Stable' | 'Down';
  driver: string;
  revenueEst: number;
  bookingIndex: number;
}

export interface InfluencingFactor {
  factor: string;
  impact: 'High' | 'Medium' | 'Low';
  direction: 'Positive' | 'Neutral' | 'Negative';
  score: number;
  description: string;
}

export interface DestinationForecastData {
  destinationId: string;
  destinationName: string;
  currentMonthlyArrivals: number;
  nextMonthForecast: number;
  growthRatePct: number;
  confidenceScore: number;
  forecastedOccupancyPct: number;
  trend: 'Up' | 'Stable' | 'Down';
  factors: InfluencingFactor[];
  monthlyData: ForecastMonthlyPoint[];
  insights: string[];
}

// ==========================================
// SHARED ACTIVE TRIP PLAN & ITINERARY TYPES
// ==========================================

export type PlanningMode = 'individual' | 'combined';

export interface TravelSegment {
  fromPlaceId: string;
  fromPlaceName: string;
  toPlaceId: string;
  toPlaceName: string;
  estimatedDistanceKm: number;
  distanceType: 'curated-road' | 'approx-straight-line';
  estimatedDuration: string;
  transitMode: string;
  estimatedTransitCostINR: number;
}

export interface PlanVisit {
  placeId: string;
  placeName: string;
  timeOfDay: 'Morning' | 'Afternoon' | 'Evening';
  activity: string;
  highlights: string[];
  typicalDuration: string;
  estimatedEntryFee: string;
  estimatedCostINR: number;
}

export interface PlanDayItinerary {
  dayNumber: number;
  title: string;
  theme: string;
  placeIds: string[];
  scheduledVisits: PlanVisit[];
  travelSegments: TravelSegment[];
  estimatedDailyExpenseINR: number;
  dayTotalINR: number;
  highlight: string;
}

export interface PlaceItinerary {
  placeId: string;
  placeName: string;
  cityName: string;
  state: string;
  planningMode: 'individual';
  days: PlanDayItinerary[];
  totalEstimatedCostINR: number;
  costBreakdown: CostBreakdown;
  budgetComparison: {
    budget: number;
    difference: number;
    status: 'within' | 'over';
  };
  assumptions: string[];
  feasibilityWarnings: string[];
}

export interface CombinedPlanItinerary {
  planningMode: 'combined';
  orderedPlaceIds: string[];
  days: PlanDayItinerary[];
  totalEstimatedCostINR: number;
  costBreakdown: CostBreakdown;
  budgetComparison: {
    budget: number;
    difference: number;
    status: 'within' | 'over';
  };
  assumptions: string[];
  feasibilityWarnings: string[];
  isFeasible: boolean;
  unfittedPlaceIds?: string[];
}

export interface ActiveTripPlan {
  planId: string;
  title: string;
  originCity: {
    id: string;
    name: string;
    state: string;
  };
  budget: number;
  budgetScope: 'total' | 'perPerson';
  travelMonth: string;
  travelYear: number;
  days: number;
  nights: number;
  groupType: GroupType;
  travelerCount: number;
  interests: string[];
  accommodationType: AccommodationType;
  selectedPlaceIds: string[]; // Attraction IDs or Destination IDs
  planningMode: PlanningMode;
  individualItineraries: Record<string, PlaceItinerary>;
  combinedItinerary: CombinedPlanItinerary | null;
  createdAt: string;
  updatedAt: string;
  isSaved: boolean;
}

// ==========================================
// USER AUTHENTICATION & HISTORY TYPES
// ==========================================

export interface User {
  id: string;
  name: string;
  email: string;
  isGuest?: boolean;
  createdAt: string;
}

export interface SavedPlanHistoryRecord extends ActiveTripPlan {
  userId: string;
  savedAt: string;
}

export type AuthStatus = 'initializing' | 'authenticated' | 'unauthenticated';

export const EMPTY_PREFERENCES: TripPreferences = {
  originCity: '',
  budget: 0,
  travelMonth: '',
  travelYear: 2026,
  days: 0,
  nights: 0,
  groupType: 'Friends',
  accommodationType: 'Homestay',
  interests: [],
  travelPace: 'Balanced',
  budgetOnly: false
};

