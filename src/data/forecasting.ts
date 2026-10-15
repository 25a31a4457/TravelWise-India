import { DestinationForecastData } from '../types';

export const FORECAST_DESTINATIONS: Record<string, DestinationForecastData> = {
  'coorg': {
    destinationId: 'coorg',
    destinationName: 'Coorg, Karnataka',
    currentMonthlyArrivals: 84500,
    nextMonthForecast: 99800,
    growthRatePct: 18.1,
    confidenceScore: 94,
    forecastedOccupancyPct: 82,
    trend: 'Up',
    factors: [
      { factor: 'Weather Suitability', impact: 'High', direction: 'Positive', score: 96, description: 'Crisp 12-25°C winter climate with zero monsoon rain and misty morning hills.' },
      { factor: 'School & Winter Holidays', impact: 'High', direction: 'Positive', score: 92, description: 'Year-end vacations drive massive family and friend group bookings from Bengaluru and Mysuru.' },
      { factor: 'Festival & Harvest Events', impact: 'Medium', direction: 'Positive', score: 88, description: 'Coffee harvest celebrations and local Kodava cultural festivities in full swing.' },
      { factor: 'Homestay Availability', impact: 'Medium', direction: 'Positive', score: 85, description: 'Over 650 certified homestays providing resilient flexible inventory.' },
      { factor: 'Search Interest Surge', impact: 'High', direction: 'Positive', score: 91, description: 'Google & OTA searches for "Coorg homestays" up 34% month-over-month.' },
      { factor: 'Travel Affordability', impact: 'Medium', direction: 'Positive', score: 89, description: 'Road drive connectivity keeps transit costs significantly lower than flight-dependent spots.' },
      { factor: 'Seasonal Factor', impact: 'High', direction: 'Positive', score: 95, description: 'Q4 represents the annual peak tourism demand quarter for Kodagu district.' }
    ],
    monthlyData: [
      // 12 months historical (Nov 2025 - Oct 2026)
      { month: 'Nov 2025', actual: 78000, occupancy: 71, trend: 'Up', driver: 'Coffee harvest start', revenueEst: 39000000, bookingIndex: 124 },
      { month: 'Dec 2025', actual: 96000, occupancy: 84, trend: 'Up', driver: 'Year-end holidays', revenueEst: 52000000, bookingIndex: 165 },
      { month: 'Jan 2026', actual: 82000, occupancy: 73, trend: 'Down', driver: 'Post-holiday lull', revenueEst: 41000000, bookingIndex: 130 },
      { month: 'Feb 2026', actual: 71000, occupancy: 65, trend: 'Down', driver: 'Off-peak winter', revenueEst: 35000000, bookingIndex: 112 },
      { month: 'Mar 2026', actual: 64000, occupancy: 58, trend: 'Down', driver: 'Exam season', revenueEst: 32000000, bookingIndex: 98 },
      { month: 'Apr 2026', actual: 79000, occupancy: 70, trend: 'Up', driver: 'Summer break begins', revenueEst: 43000000, bookingIndex: 128 },
      { month: 'May 2026', actual: 88000, occupancy: 78, trend: 'Up', driver: 'Peak summer escape', revenueEst: 48000000, bookingIndex: 145 },
      { month: 'Jun 2026', actual: 42000, occupancy: 39, trend: 'Down', driver: 'Monsoon onset', revenueEst: 19000000, bookingIndex: 62 },
      { month: 'Jul 2026', actual: 36000, occupancy: 32, trend: 'Down', driver: 'Peak monsoon alerts', revenueEst: 16000000, bookingIndex: 52 },
      { month: 'Aug 2026', actual: 44000, occupancy: 41, trend: 'Up', driver: 'Independence day weekend', revenueEst: 21000000, bookingIndex: 68 },
      { month: 'Sep 2026', actual: 61000, occupancy: 55, trend: 'Up', driver: 'Post-monsoon freshness', revenueEst: 31000000, bookingIndex: 94 },
      { month: 'Oct 2026', actual: 74000, occupancy: 67, trend: 'Up', driver: 'Dussehra & Diwali', revenueEst: 38000000, bookingIndex: 118 },
      // Forecast Next 12 months (Nov 2026 - Oct 2027)
      { month: 'Nov 2026', actual: 84500, forecast: 84500, confidenceLow: 81000, confidenceHigh: 88000, occupancy: 74, trend: 'Up', driver: 'Kaveri Sankramana & harvest', revenueEst: 44000000, bookingIndex: 135 },
      { month: 'Dec 2026', forecast: 99800, confidenceLow: 94000, confidenceHigh: 105600, occupancy: 82, trend: 'Up', driver: 'Christmas & New Year peaks', revenueEst: 56000000, bookingIndex: 172 },
      { month: 'Jan 2027', forecast: 86500, confidenceLow: 81000, confidenceHigh: 92000, occupancy: 75, trend: 'Down', driver: 'Pongal / Sankranti travel', revenueEst: 45000000, bookingIndex: 138 },
      { month: 'Feb 2027', forecast: 74000, confidenceLow: 69000, confidenceHigh: 79000, occupancy: 66, trend: 'Down', driver: 'Couples & weekenders', revenueEst: 37000000, bookingIndex: 115 },
      { month: 'Mar 2027', forecast: 67000, confidenceLow: 61000, confidenceHigh: 73000, occupancy: 60, trend: 'Down', driver: 'Pre-summer lull', revenueEst: 33000000, bookingIndex: 102 },
      { month: 'Apr 2027', forecast: 83000, confidenceLow: 77000, confidenceHigh: 89000, occupancy: 73, trend: 'Up', driver: 'Summer holidays start', revenueEst: 46000000, bookingIndex: 132 },
      { month: 'May 2027', forecast: 92000, confidenceLow: 85000, confidenceHigh: 99000, occupancy: 80, trend: 'Up', driver: 'Peak summer retreat', revenueEst: 51000000, bookingIndex: 152 },
      { month: 'Jun 2027', forecast: 44000, confidenceLow: 38000, confidenceHigh: 50000, occupancy: 40, trend: 'Down', driver: 'Monsoon downpours', revenueEst: 20000000, bookingIndex: 65 },
      { month: 'Jul 2027', forecast: 38000, confidenceLow: 32000, confidenceHigh: 44000, occupancy: 34, trend: 'Down', driver: 'Heavy rains', revenueEst: 17000000, bookingIndex: 55 },
      { month: 'Aug 2027', forecast: 47000, confidenceLow: 41000, confidenceHigh: 53000, occupancy: 43, trend: 'Up', driver: 'Long weekend getaways', revenueEst: 22000000, bookingIndex: 72 },
      { month: 'Sep 2027', forecast: 65000, confidenceLow: 59000, confidenceHigh: 71000, occupancy: 58, trend: 'Up', driver: 'Post-monsoon waterfalls', revenueEst: 33000000, bookingIndex: 99 },
      { month: 'Oct 2027', forecast: 78000, confidenceLow: 71000, confidenceHigh: 85000, occupancy: 70, trend: 'Up', driver: 'Festive season kickoff', revenueEst: 41000000, bookingIndex: 122 }
    ],
    insights: [
      'Demand for Coorg is projected to increase by 18.1% in December because of pleasant weather, school holidays, and strong homestay availability.',
      'Hotel & homestay occupancy will likely peak at 82% during the last two weeks of December.',
      'South India drive-in tourist traffic accounts for over 72% of total arrivals in Kodagu during Q4.',
      'Monsoon months (June-July) drop below 40% occupancy, presenting an opportunity for targeted monsoon eco-tourism deals.'
    ]
  },
  'munnar': {
    destinationId: 'munnar',
    destinationName: 'Munnar, Kerala',
    currentMonthlyArrivals: 91000,
    nextMonthForecast: 108000,
    growthRatePct: 18.7,
    confidenceScore: 92,
    forecastedOccupancyPct: 86,
    trend: 'Up',
    factors: [
      { factor: 'Weather Suitability', impact: 'High', direction: 'Positive', score: 95, description: 'Chilly 9-21°C weather draws travelers seeking misty tea estate views.' },
      { factor: 'School & Winter Holidays', impact: 'High', direction: 'Positive', score: 93, description: 'Massive surge from Kochi, Bengaluru, and Chennai weekenders.' },
      { factor: 'Festival & Events', impact: 'Medium', direction: 'Positive', score: 86, description: 'Christmas illuminations across hill tea plantations and church bells.' },
      { factor: 'Hotel Availability', impact: 'High', direction: 'Neutral', score: 79, description: 'Resorts reporting 78% advance reservations for Christmas week.' },
      { factor: 'Search Interest Surge', impact: 'High', direction: 'Positive', score: 90, description: 'Searches for "Munnar resort with tea view" spiking sharply.' },
      { factor: 'Travel Affordability', impact: 'Medium', direction: 'Positive', score: 84, description: 'Accessible via Kochi airport (110 km) and direct bus routes.' },
      { factor: 'Seasonal Factor', impact: 'High', direction: 'Positive', score: 94, description: 'Winter represents Kerala highland tourism apex.' }
    ],
    monthlyData: [
      { month: 'Nov 2025', actual: 82000, occupancy: 74, trend: 'Up', driver: 'Post-monsoon tea bloom', revenueEst: 45000000, bookingIndex: 132 },
      { month: 'Dec 2025', actual: 104000, occupancy: 88, trend: 'Up', driver: 'Year-end vacation rush', revenueEst: 61000000, bookingIndex: 178 },
      { month: 'Jan 2026', actual: 89000, occupancy: 76, trend: 'Down', driver: 'Sankranti travel', revenueEst: 49000000, bookingIndex: 142 },
      { month: 'Feb 2026', actual: 75000, occupancy: 67, trend: 'Down', driver: 'Pleasant winter breeze', revenueEst: 39000000, bookingIndex: 119 },
      { month: 'Mar 2026', actual: 68000, occupancy: 61, trend: 'Down', driver: 'Warm afternoons', revenueEst: 34000000, bookingIndex: 105 },
      { month: 'Apr 2026', actual: 85000, occupancy: 75, trend: 'Up', driver: 'Summer break family rush', revenueEst: 47000000, bookingIndex: 138 },
      { month: 'May 2026', actual: 96000, occupancy: 83, trend: 'Up', driver: 'Peak summer escape', revenueEst: 55000000, bookingIndex: 158 },
      { month: 'Jun 2026', actual: 39000, occupancy: 35, trend: 'Down', driver: 'Kerala monsoon start', revenueEst: 18000000, bookingIndex: 58 },
      { month: 'Jul 2026', actual: 31000, occupancy: 29, trend: 'Down', driver: 'Heavy monsoon rains', revenueEst: 14000000, bookingIndex: 46 },
      { month: 'Aug 2026', actual: 48000, occupancy: 42, trend: 'Up', driver: 'Onam holiday preparation', revenueEst: 23000000, bookingIndex: 74 },
      { month: 'Sep 2026', actual: 67000, occupancy: 59, trend: 'Up', driver: 'Onam festival peak', revenueEst: 36000000, bookingIndex: 106 },
      { month: 'Oct 2026', actual: 79000, occupancy: 70, trend: 'Up', driver: 'Diwali & clean skies', revenueEst: 42000000, bookingIndex: 125 },
      // Forecast
      { month: 'Nov 2026', actual: 91000, forecast: 91000, confidenceLow: 87000, confidenceHigh: 95000, occupancy: 77, trend: 'Up', driver: 'Winter arrival', revenueEst: 48000000, bookingIndex: 140 },
      { month: 'Dec 2026', forecast: 108000, confidenceLow: 101000, confidenceHigh: 115000, occupancy: 86, trend: 'Up', driver: 'Peak holiday boom', revenueEst: 63000000, bookingIndex: 184 },
      { month: 'Jan 2027', forecast: 93000, confidenceLow: 87000, confidenceHigh: 99000, occupancy: 78, trend: 'Down', driver: 'Winter lovers & honeymooners', revenueEst: 51000000, bookingIndex: 148 },
      { month: 'Feb 2027', forecast: 79000, confidenceLow: 73000, confidenceHigh: 85000, occupancy: 69, trend: 'Down', driver: 'Post-holiday stabilization', revenueEst: 41000000, bookingIndex: 123 },
      { month: 'Mar 2027', forecast: 71000, confidenceLow: 65000, confidenceHigh: 77000, occupancy: 63, trend: 'Down', driver: 'Pre-summer lull', revenueEst: 36000000, bookingIndex: 108 },
      { month: 'Apr 2027', forecast: 89000, confidenceLow: 82000, confidenceHigh: 96000, occupancy: 77, trend: 'Up', driver: 'Easter & summer school vacations', revenueEst: 49000000, bookingIndex: 142 },
      { month: 'May 2027', forecast: 101000, confidenceLow: 93000, confidenceHigh: 109000, occupancy: 85, trend: 'Up', driver: 'Summer mountain retreat', revenueEst: 58000000, bookingIndex: 165 },
      { month: 'Jun 2027', forecast: 41000, confidenceLow: 35000, confidenceHigh: 47000, occupancy: 36, trend: 'Down', driver: 'Southwest monsoon arrival', revenueEst: 19000000, bookingIndex: 60 }
    ],
    insights: [
      'Munnar demand will rise by 18.7% in December with holiday occupancy touching 86%.',
      'Tea estate boutique homestays and treehouses show the highest price resilience and advance occupancy.',
      'The Kolukkumalai sunrise jeep trails are operating near maximum capacity during weekend slots.'
    ]
  },
  'goa': {
    destinationId: 'goa',
    destinationName: 'Goa (North & South)',
    currentMonthlyArrivals: 185000,
    nextMonthForecast: 245000,
    growthRatePct: 32.4,
    confidenceScore: 96,
    forecastedOccupancyPct: 91,
    trend: 'Up',
    factors: [
      { factor: 'Weather Suitability', impact: 'High', direction: 'Positive', score: 98, description: '31°C sunny beach days with ocean breezes and zero rainfall.' },
      { factor: 'School & Winter Holidays', impact: 'High', direction: 'Positive', score: 97, description: 'National and international vacationers arrive en masse.' },
      { factor: 'Festival & Music Events', impact: 'High', direction: 'Positive', score: 99, description: 'Sunburn festival, Christmas midnight mass, and New Year beach parties.' },
      { factor: 'Hotel Availability', impact: 'High', direction: 'Negative', score: 55, description: 'Severe room crunch in North Goa; peak holiday tariffs up 60-100%.' },
      { factor: 'Search Interest Surge', impact: 'High', direction: 'Positive', score: 98, description: 'Goa tops flight and hotel searches across all Indian metros.' },
      { factor: 'Travel Affordability', impact: 'Medium', direction: 'Negative', score: 62, description: 'Airfares spike 2.5x from Delhi and Mumbai during late December.' },
      { factor: 'Seasonal Factor', impact: 'High', direction: 'Positive', score: 99, description: 'December is undeniably the pinnacle of the Goa tourism calendar.' }
    ],
    monthlyData: [
      { month: 'Nov 2025', actual: 160000, occupancy: 78, trend: 'Up', driver: 'Charter flights & shack openings', revenueEst: 145000000, bookingIndex: 150 },
      { month: 'Dec 2025', actual: 235000, occupancy: 93, trend: 'Up', driver: 'Christmas & New Year festivals', revenueEst: 260000000, bookingIndex: 230 },
      { month: 'Jan 2026', actual: 195000, occupancy: 82, trend: 'Down', driver: 'Winter charter season', revenueEst: 175000000, bookingIndex: 170 },
      { month: 'Feb 2026', actual: 170000, occupancy: 76, trend: 'Down', driver: 'Goa Carnival festivities', revenueEst: 150000000, bookingIndex: 155 },
      { month: 'Mar 2026', actual: 145000, occupancy: 68, trend: 'Down', driver: 'Holi beach vacations', revenueEst: 125000000, bookingIndex: 130 },
      { month: 'Apr 2026', actual: 125000, occupancy: 58, trend: 'Down', driver: 'Rising humidity', revenueEst: 98000000, bookingIndex: 110 },
      { month: 'May 2026', actual: 110000, occupancy: 52, trend: 'Down', driver: 'Pre-monsoon season closing', revenueEst: 82000000, bookingIndex: 95 },
      { month: 'Jun 2026', actual: 55000, occupancy: 33, trend: 'Down', driver: 'Monsoon watersport closure', revenueEst: 38000000, bookingIndex: 48 },
      { month: 'Jul 2026', actual: 48000, occupancy: 29, trend: 'Down', driver: 'Peak monsoon; lush hinterland', revenueEst: 32000000, bookingIndex: 41 },
      { month: 'Aug 2026', actual: 65000, occupancy: 42, trend: 'Up', driver: 'Monsoon wellness travel', revenueEst: 46000000, bookingIndex: 56 },
      { month: 'Sep 2026', actual: 95000, occupancy: 55, trend: 'Up', driver: 'Post-monsoon reopening', revenueEst: 72000000, bookingIndex: 82 },
      { month: 'Oct 2026', actual: 135000, occupancy: 69, trend: 'Up', driver: 'Diwali beach getaways', revenueEst: 110000000, bookingIndex: 120 },
      // Forecast
      { month: 'Nov 2026', actual: 185000, forecast: 185000, confidenceLow: 175000, confidenceHigh: 195000, occupancy: 80, trend: 'Up', driver: 'IFFI & shack season kickoff', revenueEst: 165000000, bookingIndex: 165 },
      { month: 'Dec 2026', forecast: 245000, confidenceLow: 230000, confidenceHigh: 260000, occupancy: 91, trend: 'Up', driver: 'New Year peak super-season', revenueEst: 280000000, bookingIndex: 240 },
      { month: 'Jan 2027', forecast: 205000, confidenceLow: 192000, confidenceHigh: 218000, occupancy: 83, trend: 'Down', driver: 'Sun seekers & international guests', revenueEst: 185000000, bookingIndex: 178 },
      { month: 'Feb 2027', forecast: 178000, confidenceLow: 166000, confidenceHigh: 190000, occupancy: 77, trend: 'Down', driver: 'Goa Carnival parade crowds', revenueEst: 158000000, bookingIndex: 160 }
    ],
    insights: [
      'Goa demand will jump 32.4% in December, with hotel occupancy surging to 91% state-wide.',
      'South Goa homestays and luxury resorts are filling faster with family segments seeking quiet escapes.',
      'Peak season surcharges may require budget-conscious travelers to book at least 6 weeks in advance.'
    ]
  },
  'jaipur': {
    destinationId: 'jaipur',
    destinationName: 'Jaipur, Rajasthan',
    currentMonthlyArrivals: 135000,
    nextMonthForecast: 168000,
    growthRatePct: 24.4,
    confidenceScore: 93,
    forecastedOccupancyPct: 84,
    trend: 'Up',
    factors: [
      { factor: 'Weather Suitability', impact: 'High', direction: 'Positive', score: 97, description: 'Mild 9-24°C winter sun, ideal for walking heritage forts and open courtyards.' },
      { factor: 'Heritage & Wedding Tourism', impact: 'High', direction: 'Positive', score: 95, description: 'December brings massive destination wedding demand and royal palace banquets.' },
      { factor: 'Proximity to Delhi NCR', impact: 'High', direction: 'Positive', score: 94, description: 'Expressway access drives effortless 4-hour weekend road trips.' },
      { factor: 'Hotel Availability', impact: 'Medium', direction: 'Neutral', score: 76, description: 'Heritage havelis booking fast; budget city hotels remain available.' }
    ],
    monthlyData: [
      { month: 'Nov 2025', actual: 120000, occupancy: 73, trend: 'Up', driver: 'Pushkar Fair ripple effect', revenueEst: 96000000, bookingIndex: 135 },
      { month: 'Dec 2025', actual: 158000, occupancy: 85, trend: 'Up', driver: 'Winter palace holidays', revenueEst: 135000000, bookingIndex: 175 },
      { month: 'Jan 2026', actual: 165000, occupancy: 87, trend: 'Up', driver: 'Jaipur Literature Festival & kites', revenueEst: 142000000, bookingIndex: 182 },
      { month: 'Feb 2026', actual: 138000, occupancy: 78, trend: 'Down', driver: 'Pleasant winter walks', revenueEst: 112000000, bookingIndex: 148 },
      { month: 'Mar 2026', actual: 110000, occupancy: 65, trend: 'Down', driver: 'Elephant festival & Holi', revenueEst: 85000000, bookingIndex: 120 },
      { month: 'Apr 2026', actual: 75000, occupancy: 49, trend: 'Down', driver: 'Rising summer heat', revenueEst: 54000000, bookingIndex: 82 },
      { month: 'May 2026', actual: 48000, occupancy: 35, trend: 'Down', driver: 'Desert heat 42°C', revenueEst: 33000000, bookingIndex: 52 },
      { month: 'Jun 2026', actual: 42000, occupancy: 32, trend: 'Down', driver: 'Peak summer lull', revenueEst: 28000000, bookingIndex: 45 },
      { month: 'Jul 2026', actual: 58000, occupancy: 42, trend: 'Up', driver: 'Teej festival monsoon showers', revenueEst: 41000000, bookingIndex: 64 },
      { month: 'Aug 2026', actual: 69000, occupancy: 48, trend: 'Up', driver: 'Raksha Bandhan weekend', revenueEst: 49000000, bookingIndex: 76 },
      { month: 'Sep 2026', actual: 88000, occupancy: 58, trend: 'Up', driver: 'Autumn season begins', revenueEst: 66000000, bookingIndex: 98 },
      { month: 'Oct 2026', actual: 112000, occupancy: 70, trend: 'Up', driver: 'Navratri & Diwali shopping', revenueEst: 88000000, bookingIndex: 126 },
      // Forecast
      { month: 'Nov 2026', actual: 135000, forecast: 135000, confidenceLow: 128000, confidenceHigh: 142000, occupancy: 76, trend: 'Up', driver: 'Diwali & royal weddings', revenueEst: 108000000, bookingIndex: 145 },
      { month: 'Dec 2026', forecast: 168000, confidenceLow: 158000, confidenceHigh: 178000, occupancy: 84, trend: 'Up', driver: 'Winter holiday peaks', revenueEst: 142000000, bookingIndex: 180 },
      { month: 'Jan 2027', forecast: 175000, confidenceLow: 164000, confidenceHigh: 186000, occupancy: 88, trend: 'Up', driver: 'JLF 2027 international crowds', revenueEst: 152000000, bookingIndex: 190 },
      { month: 'Feb 2027', forecast: 146000, confidenceLow: 136000, confidenceHigh: 156000, occupancy: 80, trend: 'Down', driver: 'Cool spring heritage trails', revenueEst: 119000000, bookingIndex: 155 }
    ],
    insights: [
      'Jaipur arrivals will jump 24.4% in December, followed by another peak in January for the Literature Festival.',
      'Destination wedding demand ties up 40% of palace resort capacity between late November and mid-January.',
      'Fort night viewings and sound-and-light shows report record advance reservations.'
    ]
  },
  'manali': {
    destinationId: 'manali',
    destinationName: 'Manali, Himachal Pradesh',
    currentMonthlyArrivals: 72000,
    nextMonthForecast: 98000,
    growthRatePct: 36.1,
    confidenceScore: 91,
    forecastedOccupancyPct: 83,
    trend: 'Up',
    factors: [
      { factor: 'Snowfall Anticipation', impact: 'High', direction: 'Positive', score: 98, description: 'First snowfalls in Solang Valley and Atal Tunnel magnetize travelers across north India.' },
      { factor: 'Adventure Sports', impact: 'Medium', direction: 'Positive', score: 88, description: 'Skiing, snowboarding, snowmobiles, and winter trekking.' },
      { factor: 'Road Accessibility', impact: 'High', direction: 'Neutral', score: 72, description: 'Atal tunnel open; snow clearing teams active on Manali-Solang route.' }
    ],
    monthlyData: [
      { month: 'Nov 2025', actual: 64000, occupancy: 58, trend: 'Up', driver: 'Autumn chill & apple harvest', revenueEst: 38000000, bookingIndex: 105 },
      { month: 'Dec 2025', actual: 92000, occupancy: 81, trend: 'Up', driver: 'White Christmas & New Year', revenueEst: 65000000, bookingIndex: 162 },
      { month: 'Jan 2026', actual: 88000, occupancy: 78, trend: 'Down', driver: 'Peak snowfall & skiing', revenueEst: 59000000, bookingIndex: 150 },
      { month: 'Feb 2026', actual: 69000, occupancy: 62, trend: 'Down', driver: 'Winter sports continuations', revenueEst: 44000000, bookingIndex: 115 },
      { month: 'Mar 2026', actual: 62000, occupancy: 55, trend: 'Down', driver: 'Spring thaw', revenueEst: 38000000, bookingIndex: 98 },
      { month: 'Apr 2026', actual: 84000, occupancy: 72, trend: 'Up', driver: 'Summer plains escape begins', revenueEst: 54000000, bookingIndex: 134 },
      { month: 'May 2026', actual: 135000, occupancy: 92, trend: 'Up', driver: 'Peak summer holiday rush', revenueEst: 95000000, bookingIndex: 215 },
      { month: 'Jun 2026', actual: 142000, occupancy: 94, trend: 'Up', driver: 'School vacation peak', revenueEst: 102000000, bookingIndex: 228 },
      { month: 'Jul 2026', actual: 38000, occupancy: 32, trend: 'Down', driver: 'Monsoon landslide warnings', revenueEst: 22000000, bookingIndex: 55 },
      { month: 'Aug 2026', actual: 32000, occupancy: 27, trend: 'Down', driver: 'Rainy mountain lull', revenueEst: 18000000, bookingIndex: 45 },
      { month: 'Sep 2026', actual: 55000, occupancy: 49, trend: 'Up', driver: 'Roads cleared, green valleys', revenueEst: 32000000, bookingIndex: 86 },
      { month: 'Oct 2026', actual: 68000, occupancy: 61, trend: 'Up', driver: 'Dussehra Kullu festival', revenueEst: 42000000, bookingIndex: 112 },
      // Forecast
      { month: 'Nov 2026', actual: 72000, forecast: 72000, confidenceLow: 68000, confidenceHigh: 76000, occupancy: 63, trend: 'Up', driver: 'Early frost & hotel preparations', revenueEst: 45000000, bookingIndex: 116 },
      { month: 'Dec 2026', forecast: 98000, confidenceLow: 91000, confidenceHigh: 105000, occupancy: 83, trend: 'Up', driver: 'Snow festival & New Year party', revenueEst: 71000000, bookingIndex: 172 },
      { month: 'Jan 2027', forecast: 92000, confidenceLow: 85000, confidenceHigh: 99000, occupancy: 79, trend: 'Down', driver: 'Ski season in Solang', revenueEst: 64000000, bookingIndex: 156 }
    ],
    insights: [
      'Manali visitor volume will surge 36.1% in December propelled by snow enthusiasts and party groups.',
      'Hotels in Old Manali and Naggar command higher occupancy than congested Mall Road.',
      'Early snowfall events historically generate immediate +25% weekend booking spikes within 48 hours.'
    ]
  },
  'rishikesh': {
    destinationId: 'rishikesh',
    destinationName: 'Rishikesh, Uttarakhand',
    currentMonthlyArrivals: 88000,
    nextMonthForecast: 104000,
    growthRatePct: 18.2,
    confidenceScore: 92,
    forecastedOccupancyPct: 78,
    trend: 'Up',
    factors: [
      { factor: 'Spiritual & Yoga Retreats', impact: 'High', direction: 'Positive', score: 94, description: 'Global wellness seekers flock to ashrams for year-end meditation cycles.' },
      { factor: 'River Rafting & Camping', impact: 'High', direction: 'Positive', score: 91, description: 'Ganga river water is crystal emerald green; pleasant 22°C daytime temperatures.' },
      { factor: 'Delhi NCR Road Drive', impact: 'Medium', direction: 'Positive', score: 90, description: 'Smooth expressway access creates heavy weekend influx.' }
    ],
    monthlyData: [
      { month: 'Nov 2025', actual: 82000, occupancy: 71, trend: 'Up', driver: 'Post-Diwali camping season', revenueEst: 46000000, bookingIndex: 125 },
      { month: 'Dec 2025', actual: 98000, occupancy: 80, trend: 'Up', driver: 'Year-end yoga retreats & camps', revenueEst: 58000000, bookingIndex: 155 },
      { month: 'Jan 2026', actual: 84000, occupancy: 69, trend: 'Down', driver: 'Chilly river mornings', revenueEst: 47000000, bookingIndex: 128 },
      { month: 'Feb 2026', actual: 89000, occupancy: 74, trend: 'Up', driver: 'International Yoga Festival buildup', revenueEst: 52000000, bookingIndex: 139 },
      { month: 'Mar 2026', actual: 115000, occupancy: 86, trend: 'Up', driver: 'International Yoga Festival & Holi', revenueEst: 72000000, bookingIndex: 180 },
      { month: 'Apr 2026', actual: 108000, occupancy: 82, trend: 'Down', driver: 'Peak river rafting period', revenueEst: 67000000, bookingIndex: 168 },
      { month: 'May 2026', actual: 96000, occupancy: 74, trend: 'Down', driver: 'Rising plains warmth', revenueEst: 58000000, bookingIndex: 145 },
      { month: 'Jun 2026', actual: 62000, occupancy: 49, trend: 'Down', driver: 'Rafting season closing', revenueEst: 34000000, bookingIndex: 88 },
      { month: 'Jul 2026', actual: 35000, occupancy: 31, trend: 'Down', driver: 'Monsoon Ganga swell & Kanwar Yatra', revenueEst: 18000000, bookingIndex: 46 },
      { month: 'Aug 2026', actual: 41000, occupancy: 36, trend: 'Up', driver: 'Kanwar Yatra conclusion', revenueEst: 22000000, bookingIndex: 58 },
      { month: 'Sep 2026', actual: 68000, occupancy: 58, trend: 'Up', driver: 'Rafting reopen & clear water', revenueEst: 38000000, bookingIndex: 102 },
      { month: 'Oct 2026', actual: 81000, occupancy: 68, trend: 'Up', driver: 'Autumn aarti & camping peak', revenueEst: 45000000, bookingIndex: 122 },
      // Forecast
      { month: 'Nov 2026', actual: 88000, forecast: 88000, confidenceLow: 83000, confidenceHigh: 93000, occupancy: 72, trend: 'Up', driver: 'Ashram retreats & crystal rapids', revenueEst: 49000000, bookingIndex: 130 },
      { month: 'Dec 2026', forecast: 104000, confidenceLow: 97000, confidenceHigh: 111000, occupancy: 78, trend: 'Up', driver: 'Holiday beach camping along Ganga', revenueEst: 62000000, bookingIndex: 160 },
      { month: 'Jan 2027', forecast: 89000, confidenceLow: 82000, confidenceHigh: 96000, occupancy: 70, trend: 'Down', driver: 'Winter wellness seekers', revenueEst: 50000000, bookingIndex: 133 }
    ],
    insights: [
      'Rishikesh visitors will grow by 18.2% in December with high preference for riverside luxury glamping and ashrams.',
      'The emerald winter waters of the Ganga allow the most scenic Grade III-IV rafting of the entire year.',
      'Bookings from corporate wellness groups are up 28% year-over-year.'
    ]
  },
  'visakhapatnam': {
    destinationId: 'visakhapatnam',
    destinationName: 'Visakhapatnam (Vizag), Andhra Pradesh',
    currentMonthlyArrivals: 112000,
    nextMonthForecast: 138000,
    growthRatePct: 23.2,
    confidenceScore: 92,
    forecastedOccupancyPct: 84,
    trend: 'Up',
    factors: [
      { factor: 'Coastal Beach Season', impact: 'High', direction: 'Positive', score: 95, description: 'Mild winter breeze and clean shores at RK Beach and Rushikonda draw heavy coastal travelers.' },
      { factor: 'Araku Valley Coffee Harvest', impact: 'High', direction: 'Positive', score: 94, description: 'Peak scenic glass-dome Vistadome train bookings into the Araku hills.' },
      { factor: 'Year-End Coastal Tourism', impact: 'Medium', direction: 'Positive', score: 88, description: 'Surge in corporate offsites and family weekenders from Hyderabad and Odisha.' }
    ],
    monthlyData: [
      { month: 'Nov 2025', actual: 95000, occupancy: 68, trend: 'Up', driver: 'Early coastal winter', revenueEst: 48000000, bookingIndex: 118 },
      { month: 'Dec 2025', actual: 128000, occupancy: 82, trend: 'Up', driver: 'Winter holidays & Araku peak', revenueEst: 68000000, bookingIndex: 160 },
      { month: 'Jan 2026', actual: 115000, occupancy: 75, trend: 'Down', driver: 'Sankranti travel surge', revenueEst: 59000000, bookingIndex: 142 },
      { month: 'Feb 2026', actual: 92000, occupancy: 64, trend: 'Down', driver: 'Pleasant beach weather', revenueEst: 46000000, bookingIndex: 115 },
      { month: 'Mar 2026', actual: 78000, occupancy: 55, trend: 'Down', driver: 'Rising humidity', revenueEst: 38000000, bookingIndex: 96 },
      { month: 'Apr 2026', actual: 88000, occupancy: 62, trend: 'Up', driver: 'Summer coastal evening breaks', revenueEst: 44000000, bookingIndex: 110 },
      { month: 'May 2026', actual: 94000, occupancy: 66, trend: 'Up', driver: 'School holiday beach crowds', revenueEst: 48000000, bookingIndex: 118 },
      { month: 'Jun 2026', actual: 65000, occupancy: 46, trend: 'Down', driver: 'Southwest monsoon arrival', revenueEst: 32000000, bookingIndex: 80 },
      { month: 'Jul 2026', actual: 58000, occupancy: 41, trend: 'Down', driver: 'Monsoon sea restrictions', revenueEst: 28000000, bookingIndex: 72 },
      { month: 'Aug 2026', actual: 72000, occupancy: 52, trend: 'Up', driver: 'Varalakshmi festival weekend', revenueEst: 36000000, bookingIndex: 90 },
      { month: 'Sep 2026', actual: 84000, occupancy: 60, trend: 'Up', driver: 'Clear coastal skies', revenueEst: 42000000, bookingIndex: 105 },
      { month: 'Oct 2026', actual: 98000, occupancy: 69, trend: 'Up', driver: 'Dussehra & Navy Day buildup', revenueEst: 50000000, bookingIndex: 122 },
      // Forecast
      { month: 'Nov 2026', actual: 112000, forecast: 112000, confidenceLow: 106000, confidenceHigh: 118000, occupancy: 73, trend: 'Up', driver: 'Winter beach peak begins', revenueEst: 57000000, bookingIndex: 135 },
      { month: 'Dec 2026', forecast: 138000, confidenceLow: 129000, confidenceHigh: 147000, occupancy: 84, trend: 'Up', driver: 'Christmas beach carnival & Araku tours', revenueEst: 72000000, bookingIndex: 170 },
      { month: 'Jan 2027', forecast: 122000, confidenceLow: 114000, confidenceHigh: 130000, occupancy: 77, trend: 'Down', driver: 'Sankranti coastal festival', revenueEst: 63000000, bookingIndex: 148 }
    ],
    insights: [
      'Demand across Visakhapatnam beaches and Araku Valley peaks in December with 23.2% projected increase.',
      'Vistadome train tickets to Araku Valley typically sell out 45 days in advance during winter.',
      'Hotel occupancy across Beach Road and Rushikonda averages 84% in late December.'
    ]
  },
  'hyderabad': {
    destinationId: 'hyderabad',
    destinationName: 'Hyderabad, Telangana',
    currentMonthlyArrivals: 185000,
    nextMonthForecast: 215000,
    growthRatePct: 16.2,
    confidenceScore: 90,
    forecastedOccupancyPct: 79,
    trend: 'Up',
    factors: [
      { factor: 'Heritage & Culinary Tourism', impact: 'High', direction: 'Positive', score: 96, description: 'Mild winter nights drive Charminar food walks, Golconda sound-and-light, and Chowmahalla visits.' },
      { factor: 'MICE & Tech Conferences', impact: 'High', direction: 'Positive', score: 91, description: 'Year-end tech summits in Hitec City boost premium business hotel occupancy.' }
    ],
    monthlyData: [
      { month: 'Nov 2025', actual: 165000, occupancy: 72, trend: 'Up', driver: 'Pleasant winter evenings', revenueEst: 85000000, bookingIndex: 122 },
      { month: 'Dec 2025', actual: 198000, occupancy: 81, trend: 'Up', driver: 'Year-end heritage tourism', revenueEst: 105000000, bookingIndex: 155 },
      { month: 'Jan 2026', actual: 172000, occupancy: 74, trend: 'Down', driver: 'Numaish exhibition kickoff', revenueEst: 90000000, bookingIndex: 132 },
      { month: 'Feb 2026', actual: 158000, occupancy: 68, trend: 'Down', driver: 'Spring city walks', revenueEst: 82000000, bookingIndex: 120 },
      { month: 'Mar 2026', actual: 142000, occupancy: 62, trend: 'Down', driver: 'Rising Deccan heat', revenueEst: 74000000, bookingIndex: 108 },
      { month: 'Apr 2026', actual: 135000, occupancy: 59, trend: 'Down', driver: 'Peak summer daytime heat', revenueEst: 70000000, bookingIndex: 102 },
      { month: 'May 2026', actual: 140000, occupancy: 61, trend: 'Up', driver: 'Ramoji Film City holiday crowds', revenueEst: 73000000, bookingIndex: 106 },
      { month: 'Jun 2026', actual: 148000, occupancy: 64, trend: 'Up', driver: 'Monsoon showers arrive', revenueEst: 78000000, bookingIndex: 112 },
      { month: 'Jul 2026', actual: 152000, occupancy: 66, trend: 'Up', driver: 'Bonalu festival season', revenueEst: 80000000, bookingIndex: 115 },
      { month: 'Aug 2026', actual: 160000, occupancy: 70, trend: 'Up', driver: 'Independence day long weekend', revenueEst: 84000000, bookingIndex: 120 },
      { month: 'Sep 2026', actual: 168000, occupancy: 72, trend: 'Up', driver: 'Ganesh Visarjan at Hussain Sagar', revenueEst: 88000000, bookingIndex: 125 },
      { month: 'Oct 2026', actual: 174000, occupancy: 74, trend: 'Up', driver: 'Dussehra & pleasant autumn', revenueEst: 92000000, bookingIndex: 128 },
      // Forecast
      { month: 'Nov 2026', actual: 185000, forecast: 185000, confidenceLow: 175000, confidenceHigh: 195000, occupancy: 76, trend: 'Up', driver: 'Autumn heritage walks', revenueEst: 98000000, bookingIndex: 138 },
      { month: 'Dec 2026', forecast: 215000, confidenceLow: 202000, confidenceHigh: 228000, occupancy: 79, trend: 'Up', driver: 'Winter holidays & Biryani trails', revenueEst: 115000000, bookingIndex: 162 },
      { month: 'Jan 2027', forecast: 190000, confidenceLow: 178000, confidenceHigh: 202000, occupancy: 75, trend: 'Down', driver: 'Numaish All-India Industrial Exhibition', revenueEst: 100000000, bookingIndex: 142 }
    ],
    insights: [
      'December draws heavy heritage tourism to Golconda Fort and Chowmahalla Palace with evening temperatures around 16°C.',
      'The Old City culinary and night trails experience 35% higher footfalls on weekends.',
      'Combined business and leisure trips drive steady hotel occupancy across Banjara Hills and Hitec City.'
    ]
  },
  'bengaluru': {
    destinationId: 'bengaluru',
    destinationName: 'Bengaluru, Karnataka',
    currentMonthlyArrivals: 210000,
    nextMonthForecast: 245000,
    growthRatePct: 16.7,
    confidenceScore: 93,
    forecastedOccupancyPct: 81,
    trend: 'Up',
    factors: [
      { factor: 'Garden City Winter Climate', impact: 'High', direction: 'Positive', score: 97, description: 'Mild 16-28°C weather ideal for Lalbagh flower displays and Cubbon Park morning strolls.' },
      { factor: 'Nandi Hills Sunrise Excursions', impact: 'High', direction: 'Positive', score: 92, description: 'Massive early morning weekend drive interest from local and regional travelers.' }
    ],
    monthlyData: [
      { month: 'Nov 2025', actual: 190000, occupancy: 73, trend: 'Up', driver: 'Bengaluru Tech Summit & crisp winter', revenueEst: 110000000, bookingIndex: 125 },
      { month: 'Dec 2025', actual: 230000, occupancy: 82, trend: 'Up', driver: 'Year-end leisure & dining hubs', revenueEst: 135000000, bookingIndex: 158 },
      { month: 'Jan 2026', actual: 198000, occupancy: 75, trend: 'Down', driver: 'Lalbagh Republic Day flower show', revenueEst: 118000000, bookingIndex: 135 },
      { month: 'Feb 2026', actual: 180000, occupancy: 70, trend: 'Down', driver: 'Pleasant spring weeks', revenueEst: 105000000, bookingIndex: 122 },
      { month: 'Mar 2026', actual: 170000, occupancy: 66, trend: 'Down', driver: 'Warm afternoons', revenueEst: 98000000, bookingIndex: 114 },
      { month: 'Apr 2026', actual: 165000, occupancy: 64, trend: 'Down', driver: 'Summer city lull', revenueEst: 94000000, bookingIndex: 110 },
      { month: 'May 2026', actual: 172000, occupancy: 67, trend: 'Up', driver: 'Pre-monsoon thunderstorms', revenueEst: 100000000, bookingIndex: 115 },
      { month: 'Jun 2026', actual: 180000, occupancy: 70, trend: 'Up', driver: 'Cool monsoon respite', revenueEst: 105000000, bookingIndex: 120 },
      { month: 'Jul 2026', actual: 185000, occupancy: 71, trend: 'Up', driver: 'Green parks & pleasant rain', revenueEst: 108000000, bookingIndex: 123 },
      { month: 'Aug 2026', actual: 195000, occupancy: 74, trend: 'Up', driver: 'Independence Day flower show', revenueEst: 115000000, bookingIndex: 130 },
      { month: 'Sep 2026', actual: 192000, occupancy: 73, trend: 'Down', driver: 'Regular business & weekend trips', revenueEst: 112000000, bookingIndex: 127 },
      { month: 'Oct 2026', actual: 200000, occupancy: 75, trend: 'Up', driver: 'Dussehra holidays', revenueEst: 120000000, bookingIndex: 134 },
      // Forecast
      { month: 'Nov 2026', actual: 210000, forecast: 210000, confidenceLow: 200000, confidenceHigh: 220000, occupancy: 77, trend: 'Up', driver: 'Winter events kickoff', revenueEst: 125000000, bookingIndex: 140 },
      { month: 'Dec 2026', forecast: 245000, confidenceLow: 232000, confidenceHigh: 258000, occupancy: 81, trend: 'Up', driver: 'Year-end leisure & Nandi Hills excursions', revenueEst: 148000000, bookingIndex: 165 },
      { month: 'Jan 2027', forecast: 215000, confidenceLow: 202000, confidenceHigh: 228000, occupancy: 76, trend: 'Down', driver: 'Republic Day flower display', revenueEst: 128000000, bookingIndex: 144 }
    ],
    insights: [
      'December visitor volume peaks around Nandi Hills sunrise treks and central heritage venues like Bangalore Palace.',
      'Average hotel rates in central Bengaluru rise 15-20% in late December.',
      'Day-trip car rentals to Nandi Hills and Mysore experience peak demand.'
    ]
  },
  'chennai': {
    destinationId: 'chennai',
    destinationName: 'Chennai, Tamil Nadu',
    currentMonthlyArrivals: 145000,
    nextMonthForecast: 172000,
    growthRatePct: 18.6,
    confidenceScore: 91,
    forecastedOccupancyPct: 80,
    trend: 'Up',
    factors: [
      { factor: 'Marghazi Music & Dance Season', impact: 'High', direction: 'Positive', score: 98, description: 'World-renowned December Carnatic music and Bharatanatyam festival across Mylapore sabhas.' },
      { factor: 'Pleasant Coastal Winter', impact: 'High', direction: 'Positive', score: 93, description: 'Cooler sea breezes make Marina Beach and Mahabalipuram excursions exceptionally pleasant.' }
    ],
    monthlyData: [
      { month: 'Nov 2025', actual: 125000, occupancy: 68, trend: 'Up', driver: 'Post-monsoon clearing', revenueEst: 65000000, bookingIndex: 116 },
      { month: 'Dec 2025', actual: 162000, occupancy: 79, trend: 'Up', driver: 'Marghazi music festival & Mahabalipuram', revenueEst: 88000000, bookingIndex: 154 },
      { month: 'Jan 2026', actual: 150000, occupancy: 74, trend: 'Down', driver: 'Pongal beach crowds', revenueEst: 80000000, bookingIndex: 140 },
      { month: 'Feb 2026', actual: 130000, occupancy: 66, trend: 'Down', driver: 'Moderate coastal winter', revenueEst: 69000000, bookingIndex: 120 },
      { month: 'Mar 2026', actual: 118000, occupancy: 60, trend: 'Down', driver: 'Early summer humidity', revenueEst: 62000000, bookingIndex: 108 },
      { month: 'Apr 2026', actual: 112000, occupancy: 58, trend: 'Down', driver: 'Humid coastal days', revenueEst: 58000000, bookingIndex: 102 },
      { month: 'May 2026', actual: 116000, occupancy: 59, trend: 'Up', driver: 'Marina Beach evening crowds', revenueEst: 60000000, bookingIndex: 105 },
      { month: 'Jun 2026', actual: 120000, occupancy: 61, trend: 'Up', driver: 'Pre-monsoon coastal breeze', revenueEst: 62000000, bookingIndex: 108 },
      { month: 'Jul 2026', actual: 124000, occupancy: 63, trend: 'Up', driver: 'Cultural weekenders', revenueEst: 65000000, bookingIndex: 112 },
      { month: 'Aug 2026', actual: 130000, occupancy: 66, trend: 'Up', driver: 'Temple festival season', revenueEst: 68000000, bookingIndex: 118 },
      { month: 'Sep 2026', actual: 128000, occupancy: 65, trend: 'Down', driver: 'Late summer transition', revenueEst: 67000000, bookingIndex: 116 },
      { month: 'Oct 2026', actual: 132000, occupancy: 67, trend: 'Up', driver: 'Northeast monsoon onset', revenueEst: 70000000, bookingIndex: 120 },
      // Forecast
      { month: 'Nov 2026', actual: 145000, forecast: 145000, confidenceLow: 136000, confidenceHigh: 154000, occupancy: 72, trend: 'Up', driver: 'Marghazi season buildup', revenueEst: 78000000, bookingIndex: 132 },
      { month: 'Dec 2026', forecast: 172000, confidenceLow: 161000, confidenceHigh: 183000, occupancy: 80, trend: 'Up', driver: 'Peak Marghazi music season & East Coast Road trips', revenueEst: 95000000, bookingIndex: 160 },
      { month: 'Jan 2027', forecast: 158000, confidenceLow: 148000, confidenceHigh: 168000, occupancy: 75, trend: 'Down', driver: 'Pongal festival vacations', revenueEst: 85000000, bookingIndex: 145 }
    ],
    insights: [
      'December represents Chennai’s primary cultural season, with Mylapore sabhas drawing global music and dance patrons.',
      'East Coast Road resorts towards Mahabalipuram achieve over 85% weekend occupancy.',
      'Pleasant temperatures around 22-29°C make winter the most visited quarter in Tamil Nadu’s capital.'
    ]
  }
};

