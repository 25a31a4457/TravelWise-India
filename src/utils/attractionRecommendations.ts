import { CityOption, getCityByName } from '../data/cities';
import { TouristAttraction, TOURIST_ATTRACTIONS, AttractionCategory } from '../data/attractions';
import { 
  calculateHaversineDistanceKm, 
  getDistanceInfo, 
  DistanceInfo, 
  DISTANCE_CONFIG 
} from './distance';

export interface AttractionWithDistance extends TouristAttraction {
  distanceInfo: DistanceInfo;
  calculatedDistanceKm: number | null;
}

export interface AttractionRecommendationResult {
  originCity: CityOption | undefined;
  isSupported: boolean;
  unsupportedMessage?: string;
  nearby: AttractionWithDistance[];
  excursions: AttractionWithDistance[];
  allFound: AttractionWithDistance[];
  totalCount: number;
}

/**
 * Normalizes category queries to match AttractionCategory.
 */
function matchesCategory(attractionCategory: AttractionCategory, filter: string): boolean {
  if (!filter || filter === 'All') return true;
  const f = filter.toLowerCase();
  const c = attractionCategory.toLowerCase();

  if (f === 'beaches' || f === 'beach') return c === 'beach';
  if (f === 'temples' || f === 'temple' || f === 'spiritual') return c === 'temple' || c === 'spiritual';
  if (f === 'nature' || f === 'parks') return c === 'nature' || c === 'lake';
  if (f === 'heritage' || f === 'forts') return c === 'heritage' || c === 'palace';
  if (f === 'museums' || f === 'museum') return c === 'museum';
  if (f === 'adventure') return c === 'adventure';
  if (f === 'wildlife') return c === 'wildlife';
  if (f === 'viewpoints' || f === 'viewpoint') return c === 'viewpoint';

  return c === f;
}

/**
 * Gets tourist recommendations for an Origin city.
 * Divides results into:
 *   A. Popular Places in and Around [Origin] (within ~50 km)
 *   B. Nearby Day Trips and Excursions (> 50 km and <= 160 km)
 * Distant attractions (> 160 km) are excluded from the city results.
 */
export function getAttractionsForOrigin(
  originCityName: string,
  categoryFilter?: string
): AttractionRecommendationResult {
  const originCity = getCityByName(originCityName);

  if (!originCity) {
    return {
      originCity: undefined,
      isSupported: false,
      unsupportedMessage: 'No matching city found. Try a different city name.',
      nearby: [],
      excursions: [],
      allFound: [],
      totalCount: 0
    };
  }

  // Check if city has curated attractions or coordinates
  const matchedAttractions: AttractionWithDistance[] = [];

  for (const attraction of TOURIST_ATTRACTIONS) {
    const isDirectCityMatch = 
      attraction.cityId.toLowerCase() === originCity.id.toLowerCase() ||
      attraction.city.toLowerCase() === originCity.name.toLowerCase();

    // Calculate straight-line distance using Haversine formula
    const straightLineKm = calculateHaversineDistanceKm(
      originCity.latitude,
      originCity.longitude,
      attraction.latitude,
      attraction.longitude
    );

    if (isDirectCityMatch) {
      // Direct city attraction: use curated distance if present, otherwise straight-line
      const distanceInfo = getDistanceInfo(
        straightLineKm,
        attraction.curatedRoadDistanceKm,
        attraction.isCuratedExcursion
      );

      matchedAttractions.push({
        ...attraction,
        distanceInfo,
        calculatedDistanceKm: distanceInfo.distanceKm
      });
    } else if (!isNaN(straightLineKm) && straightLineKm <= DISTANCE_CONFIG.EXCURSION_MAX_KM) {
      // Nearby regional attraction within excursion range
      const distanceInfo = getDistanceInfo(
        straightLineKm,
        attraction.curatedRoadDistanceKm ? Math.round(straightLineKm * DISTANCE_CONFIG.ROAD_FACTOR) : null,
        true // marked as excursion since it's from another neighboring area
      );

      matchedAttractions.push({
        ...attraction,
        distanceInfo,
        calculatedDistanceKm: distanceInfo.distanceKm,
        excursionNotice: `Approx. ${distanceInfo.displayLabel} from ${originCity.name}. Additional travel time or a full day is needed.`
      });
    }
  }

  // If no attractions found for this city
  if (matchedAttractions.length === 0) {
    return {
      originCity,
      isSupported: false,
      unsupportedMessage: 'We do not yet have curated nearby attraction data for this city. Please try one of the supported cities.',
      nearby: [],
      excursions: [],
      allFound: [],
      totalCount: 0
    };
  }

  // Apply optional category filter
  const filtered = categoryFilter && categoryFilter !== 'All'
    ? matchedAttractions.filter(a => matchesCategory(a.category, categoryFilter))
    : matchedAttractions;

  // Separate into Section A (Nearby <= 50km and not excursion) and Section B (Excursions)
  const nearby = filtered
    .filter(a => a.distanceInfo.classification === 'nearby')
    .sort((a, b) => (a.calculatedDistanceKm || 0) - (b.calculatedDistanceKm || 0));

  const excursions = filtered
    .filter(a => a.distanceInfo.classification === 'excursion')
    .sort((a, b) => (a.calculatedDistanceKm || 0) - (b.calculatedDistanceKm || 0));

  return {
    originCity,
    isSupported: true,
    nearby,
    excursions,
    allFound: filtered,
    totalCount: filtered.length
  };
}

/**
 * Pacing and Duration Validation
 * Warns if selected attractions cannot reasonably fit into the trip duration.
 */
export function validatePacingAndDuration(
  selectedAttractions: TouristAttraction[],
  tripDays: number
): {
  isOverloaded: boolean;
  message: string;
  excursionCount: number;
  nearbyCount: number;
} {
  const excursionCount = selectedAttractions.filter(a => a.isCuratedExcursion).length;
  const nearbyCount = selectedAttractions.length - excursionCount;

  if (selectedAttractions.length === 0) {
    return {
      isOverloaded: false,
      message: 'No attractions selected yet.',
      excursionCount: 0,
      nearbyCount: 0
    };
  }

  // Rule 1: Excursions require full days or extra travel time
  if (excursionCount > tripDays) {
    return {
      isOverloaded: true,
      message: `You have selected ${excursionCount} day-trip excursions for a ${tripDays}-day trip. Each excursion typically requires a full day of travel and sightseeing. Consider extending your trip duration or prioritizing 1–2 favorites.`,
      excursionCount,
      nearbyCount
    };
  }

  // Rule 2: High total place count compared to trip days
  const totalPlaces = selectedAttractions.length;
  if (totalPlaces > tripDays * 3.5) {
    return {
      isOverloaded: true,
      message: `You have selected ${totalPlaces} attractions for a ${tripDays}-day trip. This schedule might feel very packed. Consider relaxing your pace for a more enjoyable journey.`,
      excursionCount,
      nearbyCount
    };
  }

  return {
    isOverloaded: false,
    message: `Balanced schedule! ${selectedAttractions.length} attraction${selectedAttractions.length > 1 ? 's' : ''} (${nearbyCount} nearby, ${excursionCount} excursion${excursionCount === 1 ? '' : 's'}) fit well into your ${tripDays}-day itinerary.`,
    excursionCount,
    nearbyCount
  };
}

/**
 * Calculates estimated local transport / activities cost transparently labeled as a demo estimate.
 */
export function calculateLocalTransitEstimate(selectedAttractions: TouristAttraction[]): number {
  return selectedAttractions.reduce((sum, a) => sum + (a.estimatedTransitCostINR || 0), 0);
}
