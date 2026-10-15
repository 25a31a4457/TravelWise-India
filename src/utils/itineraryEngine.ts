import { 
  ActiveTripPlan, 
  PlaceItinerary, 
  CombinedPlanItinerary, 
  PlanDayItinerary, 
  PlanVisit, 
  TravelSegment, 
  TripPreferences,
  PhotoMetadata,
  CostBreakdown,
  Destination
} from '../types';
import { TouristAttraction, TOURIST_ATTRACTIONS, getAttractionById } from '../data/attractions';
import { DESTINATIONS } from '../data/destinations';
import { calculateHaversineDistanceKm } from './distance';

export interface ResolvedPlace {
  id: string;
  name: string;
  city: string;
  state: string;
  category: string;
  shortDescription: string;
  description: string;
  highlights: string[];
  photoUrl: string;
  photoMetadata?: PhotoMetadata;
  entryFee: string;
  isExcursion: boolean;
  curatedRoadDistanceKm?: number;
  latitude: number;
  longitude: number;
  estimatedTransitCostINR: number;
  sourceType: 'attraction' | 'destination';
  rawAttraction?: TouristAttraction;
  rawDestination?: Destination;
}

/**
 * Resolves any place ID to either a curated TouristAttraction or a Destination circuit.
 */
export function resolvePlace(id: string): ResolvedPlace | undefined {
  if (!id) return undefined;

  // 1. Check Attractions
  const attraction = getAttractionById(id);
  if (attraction) {
    return {
      id: attraction.id,
      name: attraction.name,
      city: attraction.city,
      state: attraction.state,
      category: attraction.category,
      shortDescription: attraction.shortDescription,
      description: attraction.description,
      highlights: attraction.highlights,
      photoUrl: attraction.photoUrl,
      photoMetadata: attraction.photoMetadata,
      entryFee: attraction.entryFee,
      isExcursion: Boolean(attraction.isCuratedExcursion || attraction.isExcursion),
      curatedRoadDistanceKm: attraction.curatedRoadDistanceKm,
      latitude: attraction.latitude,
      longitude: attraction.longitude,
      estimatedTransitCostINR: attraction.estimatedTransitCostINR,
      sourceType: 'attraction',
      rawAttraction: attraction
    };
  }

  // 2. Check Destinations
  const dest = DESTINATIONS.find(d => d.id === id);
  if (dest) {
    return {
      id: dest.id,
      name: dest.name,
      city: dest.name,
      state: dest.state,
      category: 'Destination Circuit',
      shortDescription: dest.tagline,
      description: dest.tagline,
      highlights: dest.attractions,
      photoUrl: dest.cardImage,
      entryFee: 'Check local site fees',
      isExcursion: false,
      curatedRoadDistanceKm: 180,
      latitude: dest.coordinates.lat,
      longitude: dest.coordinates.lng,
      estimatedTransitCostINR: 1200,
      sourceType: 'destination',
      rawDestination: dest
    };
  }

  return undefined;
}

/**
 * Accommodation tier base price per night estimate.
 */
const ACCOMMODATION_TIER_RATES: Record<string, number> = {
  'Hostel': 850,
  'Budget Hotel': 1600,
  'Homestay': 2600,
  '3-Star Hotel': 3400,
  '4-Star Hotel': 5800,
  'Luxury Resort': 9500
};

/**
 * Traveler count multiplier based on group type.
 */
export function getTravelerCount(groupType: string): number {
  switch (groupType) {
    case 'Solo': return 1;
    case 'Couple': return 2;
    case 'Family': return 4;
    case 'Friends': return 4;
    default: return 2;
  }
}

/**
 * Builds an Individual Plan Itinerary for a single selected place.
 * Evaluates the place as a standalone alternative holiday for the entered duration & budget.
 */
export function generateIndividualItinerary(
  place: ResolvedPlace,
  prefs: TripPreferences
): PlaceItinerary {
  const travelers = getTravelerCount(prefs.groupType);
  const stayRate = ACCOMMODATION_TIER_RATES[prefs.accommodationType] || 2500;
  
  // Accommodation cost (shared room for couples/friends/family)
  const roomsNeeded = Math.ceil(travelers / 2);
  const accommodationCost = stayRate * prefs.nights * roomsNeeded;
  
  // Base round-trip transit from Origin
  const baseTransitPerPerson = place.curatedRoadDistanceKm 
    ? Math.max(400, place.curatedRoadDistanceKm * 6)
    : 1200;
  const transportCost = baseTransitPerPerson * travelers;

  // Daily food & incidentals
  const dailyFoodPerPerson = 850;
  const dailyExpenseCost = dailyFoodPerPerson * prefs.days * travelers;

  // Activities & local sightseeing
  const activitiesCost = (place.estimatedTransitCostINR + 400) * travelers;

  // Buffer
  const bufferAmount = Math.round((transportCost + accommodationCost + dailyExpenseCost + activitiesCost) * 0.1);
  const total = transportCost + accommodationCost + dailyExpenseCost + activitiesCost + bufferAmount;

  const costBreakdown: CostBreakdown = {
    transportCost,
    accommodationCost,
    dailyExpenseCost,
    activitiesCost,
    bufferAmount,
    total,
    remainingOrExtra: prefs.budget - (prefs.budgetOnly ? total : (total / travelers))
  };

  // Generate day-by-day plan
  const days: PlanDayItinerary[] = [];
  const primaryHighlight = place.highlights[0] || place.name;
  const secondaryHighlight = place.highlights[1] || 'Scenic viewpoint & sunset walk';
  const culturalHighlight = place.highlights[2] || 'Local heritage market & culinary stops';
  const planDaysCount = Math.max(1, prefs.days || 1);

  for (let i = 1; i <= planDaysCount; i++) {
    const isFirstDay = i === 1;
    const isLastDay = i === planDaysCount;
    const isMiddleDay = !isFirstDay && !isLastDay;

    let theme = `${place.name} Exploration`;
    if (isFirstDay) theme = `Arrival & Settling into ${place.city}`;
    else if (isLastDay) theme = `Morning Leisure & Departure`;
    else if (place.isExcursion) theme = `Full Day Excursion Experience`;
    else theme = `Deep Dive: ${place.category} & Culture`;

    const visits: PlanVisit[] = [];

    if (isFirstDay) {
      visits.push({
        placeId: place.id,
        placeName: `Check-in & Welcome at ${place.city}`,
        timeOfDay: 'Morning',
        activity: `Arrive from ${prefs.originCity || 'Origin'}, check into ${prefs.accommodationType}, and relax after transit.`,
        highlights: ['Orientation', 'Welcome drink', 'Settling in'],
        typicalDuration: '2 hours',
        estimatedEntryFee: 'Included',
        estimatedCostINR: 0
      });
      visits.push({
        placeId: place.id,
        placeName: place.name,
        timeOfDay: 'Afternoon',
        activity: `First visit to ${place.name}: ${place.shortDescription}`,
        highlights: [primaryHighlight],
        typicalDuration: '2.5 - 3 hours',
        estimatedEntryFee: place.entryFee,
        estimatedCostINR: 150
      });
      visits.push({
        placeId: place.id,
        placeName: `${place.city} Evening Promenades`,
        timeOfDay: 'Evening',
        activity: `Relaxed twilight walk, tasting regional street delicacies, and taking in local vistas.`,
        highlights: [secondaryHighlight],
        typicalDuration: '2 hours',
        estimatedEntryFee: 'Free',
        estimatedCostINR: 300
      });
    } else if (isLastDay) {
      visits.push({
        placeId: place.id,
        placeName: `${place.name} Morning Photography`,
        timeOfDay: 'Morning',
        activity: `Gentle early morning stroll around ${place.name} during golden hour.`,
        highlights: ['Golden hour photography', 'Peaceful atmosphere'],
        typicalDuration: '1.5 hours',
        estimatedEntryFee: 'Free',
        estimatedCostINR: 100
      });
      visits.push({
        placeId: place.id,
        placeName: `Souvenir Shopping & Local Craft`,
        timeOfDay: 'Afternoon',
        activity: `Browse local artisanal shops, coffee / spice stalls, and prepare for departure back to ${prefs.originCity || 'Origin'}.`,
        highlights: ['Artisan crafts', 'Local specialties'],
        typicalDuration: '2 hours',
        estimatedEntryFee: 'Free',
        estimatedCostINR: 500
      });
    } else {
      // Middle day
      visits.push({
        placeId: place.id,
        placeName: place.name,
        timeOfDay: 'Morning',
        activity: `In-depth exploration of ${place.name} highlights and guided walks.`,
        highlights: [primaryHighlight, culturalHighlight],
        typicalDuration: '3 hours',
        estimatedEntryFee: place.entryFee,
        estimatedCostINR: 200
      });
      visits.push({
        placeId: place.id,
        placeName: `${place.city} Regional Highlights`,
        timeOfDay: 'Afternoon',
        activity: `Scenic lunch followed by visits to nearby viewpoints and cultural sites in ${place.city}.`,
        highlights: [secondaryHighlight],
        typicalDuration: '2.5 hours',
        estimatedEntryFee: 'Check fee',
        estimatedCostINR: 250
      });
      visits.push({
        placeId: place.id,
        placeName: 'Sunset Gathering & Local Dinner',
        timeOfDay: 'Evening',
        activity: `Savor authentic regional cuisine suited for ${prefs.groupType} travelers.`,
        highlights: ['Regional specialties', 'Campfire or cafe relaxation'],
        typicalDuration: '2 hours',
        estimatedEntryFee: 'Free',
        estimatedCostINR: 400
      });
    }

    days.push({
      dayNumber: i,
      title: `Day ${i}: ${theme}`,
      theme,
      placeIds: [place.id],
      scheduledVisits: visits,
      travelSegments: [
        {
          fromPlaceId: isFirstDay ? `origin-${prefs.originCity || 'hub'}` : place.id,
          fromPlaceName: isFirstDay ? (prefs.originCity || 'Origin Hub') : `${place.name} Base`,
          toPlaceId: place.id,
          toPlaceName: place.name,
          estimatedDistanceKm: isFirstDay ? (place.curatedRoadDistanceKm || 20) : 8,
          distanceType: place.curatedRoadDistanceKm ? 'curated-road' : 'approx-straight-line',
          estimatedDuration: isFirstDay ? 'Transit from Origin' : '15-25 min',
          transitMode: isFirstDay ? 'Intercity Cab / Train' : 'Local Auto / Cab',
          estimatedTransitCostINR: Math.round(transportCost / planDaysCount)
        }
      ],
      estimatedDailyExpenseINR: Math.round(dailyExpenseCost / planDaysCount),
      dayTotalINR: Math.round(total / planDaysCount),
      highlight: isFirstDay ? primaryHighlight : (isLastDay ? 'Relaxed departure' : secondaryHighlight)
    });
  }

  const effectiveBudget = prefs.budgetOnly ? prefs.budget : prefs.budget * travelers;
  const difference = effectiveBudget - total;

  return {
    placeId: place.id,
    placeName: place.name,
    cityName: place.city,
    state: place.state,
    planningMode: 'individual',
    days,
    totalEstimatedCostINR: total,
    costBreakdown,
    budgetComparison: {
      budget: effectiveBudget,
      difference,
      status: difference >= 0 ? 'within' : 'over'
    },
    assumptions: [
      `Alternative Standalone Plan: Treats ${place.name} as a dedicated ${prefs.days}-day trip without combining other distant destinations.`,
      `Accommodation tier: ${prefs.accommodationType} (${roomsNeeded} room${roomsNeeded > 1 ? 's' : ''} for ${travelers} traveler${travelers > 1 ? 's' : ''}).`,
      `Round-trip transit calculated relative to Origin: ${prefs.originCity}.`,
      `Entry fees and local auto/cab fares are indicative demo estimates.`
    ],
    feasibilityWarnings: place.isExcursion
      ? [`${place.name} is a day-trip excursion (~${place.curatedRoadDistanceKm || 80} km). A full day of travel and dedicated transport is allocated.`]
      : []
  };
}

/**
 * Builds a Combined Plan Itinerary unifying ALL selected places into a single cohesive schedule.
 */
export function generateCombinedItinerary(
  places: ResolvedPlace[],
  prefs: TripPreferences
): CombinedPlanItinerary {
  const travelers = getTravelerCount(prefs.groupType);
  const stayRate = ACCOMMODATION_TIER_RATES[prefs.accommodationType] || 2500;
  const roomsNeeded = Math.ceil(travelers / 2);

  // 1. Order places geographically
  // Sequence by proximity to Origin and clustering
  const orderedPlaces = [...places].sort((a, b) => {
    // Put non-excursions first, excursions later
    if (a.isExcursion && !b.isExcursion) return 1;
    if (!a.isExcursion && b.isExcursion) return -1;
    return (a.curatedRoadDistanceKm || 0) - (b.curatedRoadDistanceKm || 0);
  });

  const orderedPlaceIds = orderedPlaces.map(p => p.id);
  const excursionCount = orderedPlaces.filter(p => p.isExcursion).length;
  const totalPlaces = orderedPlaces.length;

  // 2. Feasibility Evaluation
  // Rule: Excursion requires 1 full day. Local city attractions take ~0.5 day each.
  const requiredDaysEstimate = Math.max(excursionCount + Math.ceil((totalPlaces - excursionCount) / 2), 2);
  const isFeasible = prefs.days >= requiredDaysEstimate;

  const feasibilityWarnings: string[] = [];
  const unfittedPlaceIds: string[] = [];

  if (!isFeasible) {
    feasibilityWarnings.push(
      `Pacing Advisory: You selected ${totalPlaces} destinations (${excursionCount} day-trip excursion${excursionCount === 1 ? '' : 's'}) for a ${prefs.days}-day schedule. Comfortably enjoying this combined circuit typically requires at least ${requiredDaysEstimate} days.`
    );
    if (excursionCount > prefs.days) {
      feasibilityWarnings.push(
        `Excursions Exceed Days: ${excursionCount} day trips cannot each receive a dedicated day in a ${prefs.days}-day trip. Some excursions will require accelerated visits.`
      );
    }
  }

  // 3. Distribute places across available days
  const days: PlanDayItinerary[] = [];
  const planDaysCount = Math.max(1, prefs.days || 1);
  
  // Allocate places to day buckets
  const dayBuckets: ResolvedPlace[][] = Array.from({ length: planDaysCount }, () => []);
  orderedPlaces.forEach((place, idx) => {
    const targetDayIndex = idx % planDaysCount;
    dayBuckets[targetDayIndex].push(place);
  });

  let cumulativeActivitiesCost = 0;
  const allTravelSegments: TravelSegment[] = [];

  for (let d = 0; d < planDaysCount; d++) {
    const dayNumber = d + 1;
    const bucketPlaces = dayBuckets[d];
    const isFirstDay = dayNumber === 1;
    const isLastDay = dayNumber === planDaysCount;

    const scheduledVisits: PlanVisit[] = [];
    const daySegments: TravelSegment[] = [];

    if (bucketPlaces.length === 0) {
      // Leisure or scenic day
      scheduledVisits.push({
        placeId: `leisure-${dayNumber}`,
        placeName: `Leisure & Local Exploration in ${orderedPlaces[0]?.city || prefs.originCity || 'Destination'}`,
        timeOfDay: 'Morning',
        activity: `Free exploration of local markets, cafes, and resting between travel segments.`,
        highlights: ['Leisure walking', 'Regional photography'],
        typicalDuration: '3 hours',
        estimatedEntryFee: 'Free',
        estimatedCostINR: 150
      });
    } else {
      bucketPlaces.forEach((place, pIdx) => {
        const timeOfDay = pIdx === 0 ? 'Morning' : (pIdx === 1 ? 'Afternoon' : 'Evening');
        const visitCost = 150 * travelers;
        cumulativeActivitiesCost += visitCost;

        scheduledVisits.push({
          placeId: place.id,
          placeName: place.name,
          timeOfDay,
          activity: `Explore ${place.name}: ${place.shortDescription}`,
          highlights: place.highlights.slice(0, 3),
          typicalDuration: place.isExcursion ? '4 - 6 hours' : '2.5 hours',
          estimatedEntryFee: place.entryFee,
          estimatedCostINR: visitCost
        });

        // Inter-place travel segment
        const prevPlace = pIdx > 0 ? bucketPlaces[pIdx - 1] : (d > 0 && dayBuckets[d - 1].length > 0 ? dayBuckets[d - 1][dayBuckets[d - 1].length - 1] : null);
        if (prevPlace && prevPlace.id !== place.id) {
          const distKm = place.curatedRoadDistanceKm || Math.round(calculateHaversineDistanceKm(prevPlace.latitude, prevPlace.longitude, place.latitude, place.longitude)) || 15;
          const segment: TravelSegment = {
            fromPlaceId: prevPlace.id,
            fromPlaceName: prevPlace.name,
            toPlaceId: place.id,
            toPlaceName: place.name,
            estimatedDistanceKm: distKm,
            distanceType: place.curatedRoadDistanceKm ? 'curated-road' : 'approx-straight-line',
            estimatedDuration: distKm > 50 ? `${Math.round(distKm / 40)} hrs drive` : `${Math.max(15, Math.round(distKm * 2.5))} min`,
            transitMode: distKm > 50 ? 'Tourist Cab / Highway' : 'Local Cab / Auto',
            estimatedTransitCostINR: Math.round(distKm * 18)
          };
          daySegments.push(segment);
          allTravelSegments.push(segment);
        }
      });
    }

    // Daily theme
    const theme = bucketPlaces.length > 0
      ? bucketPlaces.map(p => p.name).join(' & ')
      : `Leisure Day in ${orderedPlaces[0]?.city || 'Destination'}`;

    days.push({
      dayNumber,
      title: `Day ${dayNumber}: ${theme}`,
      theme,
      placeIds: bucketPlaces.map(p => p.id),
      scheduledVisits,
      travelSegments: daySegments,
      estimatedDailyExpenseINR: 900 * travelers,
      dayTotalINR: 0, // will compute after total breakdown
      highlight: bucketPlaces[0]?.highlights[0] || 'Scenic regional discovery'
    });
  }

  // 4. Combined Costs (Shared accommodation, non-duplicated transit)
  const accommodationCost = stayRate * prefs.nights * roomsNeeded;
  const roundTripOriginTransit = 800 * travelers;
  const interPlaceTransit = allTravelSegments.reduce((sum, seg) => sum + seg.estimatedTransitCostINR, 0);
  const transportCost = roundTripOriginTransit + interPlaceTransit;
  const dailyExpenseCost = 900 * (prefs.days || 1) * travelers;
  const activitiesCost = cumulativeActivitiesCost;
  const bufferAmount = Math.round((transportCost + accommodationCost + dailyExpenseCost + activitiesCost) * 0.1);
  const total = transportCost + accommodationCost + dailyExpenseCost + activitiesCost + bufferAmount;

  // Distribute day totals
  days.forEach(d => {
    d.dayTotalINR = Math.round(total / planDaysCount);
  });

  const costBreakdown: CostBreakdown = {
    transportCost,
    accommodationCost,
    dailyExpenseCost,
    activitiesCost,
    bufferAmount,
    total,
    remainingOrExtra: prefs.budget - (prefs.budgetOnly ? total : (total / travelers))
  };

  const effectiveBudget = prefs.budgetOnly ? prefs.budget : prefs.budget * travelers;
  const difference = effectiveBudget - total;

  return {
    planningMode: 'combined',
    orderedPlaceIds,
    days,
    totalEstimatedCostINR: total,
    costBreakdown,
    budgetComparison: {
      budget: effectiveBudget,
      difference,
      status: difference >= 0 ? 'within' : 'over'
    },
    assumptions: [
      `Combined Multi-Destination Circuit: Unifies all ${totalPlaces} selected places into a single schedule starting from ${prefs.originCity}.`,
      `Shared Accommodation: ${prefs.accommodationType} for ${prefs.nights} nights (${roomsNeeded} room${roomsNeeded > 1 ? 's' : ''} for ${travelers} traveler${travelers > 1 ? 's' : ''}), avoiding double-booked hotel costs.`,
      `Inter-destination travel segments are sequenced by geographic proximity; transit durations reflect average road conditions.`,
      `All costs are indicative demo estimates.`
    ],
    feasibilityWarnings,
    isFeasible,
    unfittedPlaceIds: isFeasible ? undefined : unfittedPlaceIds
  };
}

/**
 * Builds the complete ActiveTripPlan commitment snapshot.
 */
export function buildActiveTripPlan(
  prefs: TripPreferences,
  selectedPlaceIds: string[],
  planningMode: 'individual' | 'combined' = 'combined'
): ActiveTripPlan {
  const resolvedPlaces = selectedPlaceIds
    .map(id => resolvePlace(id))
    .filter((p): p is ResolvedPlace => p !== undefined);

  // Generate individual itineraries for every selected place
  const individualItineraries: Record<string, PlaceItinerary> = {};
  resolvedPlaces.forEach(place => {
    individualItineraries[place.id] = generateIndividualItinerary(place, prefs);
  });

  // Generate combined itinerary if at least 1 place selected
  const combinedItinerary = resolvedPlaces.length > 0
    ? generateCombinedItinerary(resolvedPlaces, prefs)
    : null;

  const planId = `plan-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
  const title = resolvedPlaces.length > 0
    ? `${prefs.originCity || 'Trip'} to ${resolvedPlaces.slice(0, 2).map(p => p.name).join(' & ')} ${resolvedPlaces.length > 2 ? `+${resolvedPlaces.length - 2} more` : ''}`
    : (prefs.originCity ? `Trip from ${prefs.originCity}` : 'New Trip Draft');

  return {
    planId,
    title,
    originCity: {
      id: prefs.originCity ? prefs.originCity.toLowerCase().replace(/\s+/g, '-') : '',
      name: prefs.originCity || '',
      state: resolvedPlaces[0]?.state || 'India'
    },
    budget: prefs.budget,
    budgetScope: prefs.budgetOnly ? 'total' : 'perPerson',
    travelMonth: prefs.travelMonth,
    travelYear: prefs.travelYear,
    days: prefs.days,
    nights: prefs.nights,
    groupType: prefs.groupType,
    travelerCount: getTravelerCount(prefs.groupType),
    interests: prefs.interests,
    accommodationType: prefs.accommodationType,
    selectedPlaceIds,
    planningMode,
    individualItineraries,
    combinedItinerary,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    isSaved: false
  };
}
