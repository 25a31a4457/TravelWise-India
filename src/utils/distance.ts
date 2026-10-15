/**
 * Distance calculation and formatting utilities for TravelWise India.
 * 
 * Rules:
 * - Use calculated straight-line distance only if clearly labeled as approximate straight-line distance.
 * - Do not present straight-line distance as driving distance.
 * - Use curated road/travel distance only when present in verified local data.
 * - If distance is unknown, do not invent it: display "Distance information unavailable".
 * - Classify primary nearby attractions using a consistent threshold (approx 50 km).
 * - Classify farther attractions as Day Trip or Excursion.
 */

export const DISTANCE_CONFIG = {
  /** Maximum distance in km for immediate city/nearby attractions */
  NEARBY_THRESHOLD_KM: 50,
  /** Maximum distance in km for single-day excursions from the city */
  EXCURSION_MAX_KM: 160,
  /** Estimated driving road factor when converting straight-line to road approximation */
  ROAD_FACTOR: 1.25,
};

/**
 * Calculates Great-Circle straight-line distance between two coordinates in kilometers using the Haversine formula.
 */
export function calculateHaversineDistanceKm(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  if (
    lat1 === undefined || lon1 === undefined ||
    lat2 === undefined || lon2 === undefined ||
    isNaN(lat1) || isNaN(lon1) || isNaN(lat2) || isNaN(lon2)
  ) {
    return NaN;
  }

  const R = 6371; // Earth's mean radius in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c);
}

export interface DistanceInfo {
  distanceKm: number | null;
  /** True if this is a verified curated road distance */
  isCuratedRoadDistance: boolean;
  /** Formatted user-facing label (e.g. "~14 km (approx. road)" or "~115 km (approx. straight-line)") */
  displayLabel: string;
  /** Whether this qualifies as a day-trip excursion */
  isExcursion: boolean;
  /** Category badge label */
  classification: 'nearby' | 'excursion' | 'distant';
}

/**
 * Formats distance with honest labeling distinguishing straight-line from curated road distance.
 */
export function getDistanceInfo(
  calculatedStraightLineKm: number | null | undefined,
  curatedRoadDistanceKm?: number | null,
  forceExcursionFlag?: boolean
): DistanceInfo {
  // If curated road distance is verified and available
  if (typeof curatedRoadDistanceKm === 'number' && curatedRoadDistanceKm > 0) {
    const isExcursion = forceExcursionFlag || curatedRoadDistanceKm > DISTANCE_CONFIG.NEARBY_THRESHOLD_KM;
    return {
      distanceKm: curatedRoadDistanceKm,
      isCuratedRoadDistance: true,
      displayLabel: `~${curatedRoadDistanceKm} km`,
      isExcursion,
      classification: curatedRoadDistanceKm <= DISTANCE_CONFIG.NEARBY_THRESHOLD_KM 
        ? 'nearby' 
        : curatedRoadDistanceKm <= DISTANCE_CONFIG.EXCURSION_MAX_KM 
          ? 'excursion' 
          : 'distant'
    };
  }

  // If calculated straight-line distance is available
  if (typeof calculatedStraightLineKm === 'number' && !isNaN(calculatedStraightLineKm) && calculatedStraightLineKm >= 0) {
    const isExcursion = forceExcursionFlag || calculatedStraightLineKm > DISTANCE_CONFIG.NEARBY_THRESHOLD_KM;
    return {
      distanceKm: calculatedStraightLineKm,
      isCuratedRoadDistance: false,
      displayLabel: `~${calculatedStraightLineKm} km (approx. straight-line)`,
      isExcursion,
      classification: calculatedStraightLineKm <= DISTANCE_CONFIG.NEARBY_THRESHOLD_KM 
        ? 'nearby' 
        : calculatedStraightLineKm <= DISTANCE_CONFIG.EXCURSION_MAX_KM 
          ? 'excursion' 
          : 'distant'
    };
  }

  // Distance unknown
  return {
    distanceKm: null,
    isCuratedRoadDistance: false,
    displayLabel: 'Distance information unavailable',
    isExcursion: Boolean(forceExcursionFlag),
    classification: forceExcursionFlag ? 'excursion' : 'nearby'
  };
}
