import { Destination } from '../types';

export const DESTINATIONS: Destination[] = [
  {
    id: 'coorg',
    name: 'Coorg (Kodagu)',
    state: 'Karnataka',
    region: 'South',
    tagline: 'The Scotland of India — misty hills, lush coffee plantations & spice aromas',
    heroImage: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=1600&q=80',
    cardImage: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=800&q=80',
    tags: ['Mountains', 'Nature', 'Relaxation', 'Wildlife', 'Adventure'],
    bestMonths: ['October', 'November', 'December', 'January', 'February', 'March'],
    avoidMonths: ['June', 'July', 'August'],
    coordinates: { lat: 12.4244, lng: 75.7382 },
    transportCostFrom: {
      'Bengaluru': 2400,
      'Mumbai': 6800,
      'Delhi': 8500,
      'Chennai': 4200,
      'Hyderabad': 4800,
      'Kolkata': 9200,
      'Pune': 6200,
      'Ahmedabad': 7600,
      'Kochi': 3800,
      'Jaipur': 8900
    },
    averageDailyExpense: 1200,
    accommodationPrices: {
      'Hostel': 900,
      'Budget Hotel': 1600,
      'Homestay': 2800,
      '3-Star Hotel': 3500,
      '4-Star Hotel': 5500,
      'Luxury Resort': 11500
    },
    monthlyWeather: {
      'January': { tempMin: 13, tempMax: 26, rainChance: 5, condition: 'Crisp & Sunny', suitability: 'Excellent', summary: 'Chilly mornings, ideal for coffee plantation walks' },
      'February': { tempMin: 14, tempMax: 28, rainChance: 8, condition: 'Pleasant & Clear', suitability: 'Excellent', summary: 'Great visibility for mountain viewpoints' },
      'March': { tempMin: 16, tempMax: 31, rainChance: 15, condition: 'Warm & Dry', suitability: 'Good', summary: 'Coffee blossom season fills the air with jasmine scent' },
      'April': { tempMin: 18, tempMax: 33, rainChance: 30, condition: 'Pre-monsoon Showers', suitability: 'Good', summary: 'Occasional refreshing evening rains' },
      'May': { tempMin: 19, tempMax: 32, rainChance: 45, condition: 'Humid & Overcast', suitability: 'Moderate', summary: 'Lush greenery starting to erupt' },
      'June': { tempMin: 18, tempMax: 25, rainChance: 85, condition: 'Heavy Monsoon', suitability: 'Avoid', summary: 'Intense Western Ghats downpours; road travel can be tricky' },
      'July': { tempMin: 17, tempMax: 24, rainChance: 92, condition: 'Peak Monsoon', suitability: 'Avoid', summary: 'Waterfalls swell, but high landslide alerts' },
      'August': { tempMin: 17, tempMax: 24, rainChance: 80, condition: 'Torrential Showers', suitability: 'Moderate', summary: 'Spectacular misty streams for adventurous rain lovers' },
      'September': { tempMin: 17, tempMax: 26, rainChance: 50, condition: 'Post-Monsoon Fresh', suitability: 'Good', summary: 'Terraced valleys in full green glory' },
      'October': { tempMin: 16, tempMax: 27, rainChance: 25, condition: 'Clear Autumn', suitability: 'Excellent', summary: 'Kaveri Sankramana festival and cool evenings' },
      'November': { tempMin: 14, tempMax: 27, rainChance: 12, condition: 'Pleasant & Mild', suitability: 'Excellent', summary: 'Peak coffee harvest season begins' },
      'December': { tempMin: 12, tempMax: 25, rainChance: 4, condition: 'Misty & Cool', suitability: 'Excellent', summary: 'Crisp winter chill, morning mist, and perfect trekking conditions' }
    },
    stays: [
      {
        id: 'stay-coorg-1',
        name: 'Woodstock Plantation Estate Homestay',
        type: 'Homestay',
        pricePerNight: 2800,
        rating: 4.8,
        reviewsCount: 342,
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80',
        amenities: ['Free Authentic Kodava Breakfast', 'Plantation Tour', 'Campfire', 'High-Speed Wi-Fi', 'Balcony with Valley View'],
        location: 'Madikeri, 4 km from Town Center',
        isBestValue: true
      },
      {
        id: 'stay-coorg-2',
        name: 'Silver Brook Estate Homestay',
        type: 'Homestay',
        pricePerNight: 3200,
        rating: 4.9,
        reviewsCount: 489,
        image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=600&q=80',
        amenities: ['River Stream Access', 'Kodava Cooking Demo', 'Coffee Tasting', 'Pet Friendly'],
        location: 'Siddapura, South Coorg'
      },
      {
        id: 'stay-coorg-3',
        name: 'Evolve Back Luxury Plantation Resort',
        type: 'Luxury Resort',
        pricePerNight: 12500,
        rating: 4.9,
        reviewsCount: 920,
        image: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=600&q=80',
        amenities: ['Private Plunge Pool', 'Ayurvedic Spa', 'Infinity Pool', 'Fine Dining Pavilions'],
        location: 'Karadigodu Post, Siddapur'
      }
    ],
    situationPhotos: [
      {
        id: 'p-c-1',
        url: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=800&q=80',
        caption: 'Misty morning in a Coorg coffee estate',
        category: 'nature',
        seasons: ['December', 'January', 'November', 'February'],
        suitableGroups: ['Friends', 'Couple', 'Solo']
      },
      {
        id: 'p-c-2',
        url: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80',
        caption: 'Abbey Falls cascading after the monsoon season',
        category: 'attractions',
        seasons: ['October', 'November', 'December'],
        suitableGroups: ['Friends', 'Family', 'Couple']
      },
      {
        id: 'p-c-3',
        url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
        caption: 'Cozy homestay surrounded by plantation greenery',
        category: 'stays',
        seasons: ['December', 'January', 'February', 'November'],
        suitableGroups: ['Friends', 'Family', 'Couple']
      },
      {
        id: 'p-c-4',
        url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
        caption: 'Golden sunset over rolling valleys at Raja’s Seat',
        category: 'nature',
        seasons: ['December', 'January', 'November'],
        suitableGroups: ['Couple', 'Friends', 'Solo']
      },
      {
        id: 'p-c-5',
        url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80',
        caption: 'Winter trek through cloud-kissed forest trails',
        category: 'adventure',
        seasons: ['December', 'January', 'November'],
        suitableGroups: ['Friends', 'Solo']
      },
      {
        id: 'p-c-6',
        url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
        caption: 'Coffee plantation walk with friends tasting fresh brew',
        category: 'food',
        seasons: ['December', 'January', 'November'],
        suitableGroups: ['Friends', 'Couple', 'Family']
      },
      {
        id: 'p-c-7',
        url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
        caption: 'Warm campfire night under starry Western Ghats skies',
        category: 'night',
        seasons: ['December', 'January', 'November', 'February'],
        suitableGroups: ['Friends', 'Couple']
      },
      {
        id: 'p-c-8',
        url: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=80',
        caption: 'Namdroling Monastery golden temples in Bylakuppe',
        category: 'attractions',
        seasons: ['December', 'January', 'February', 'October'],
        suitableGroups: ['Friends', 'Family', 'Solo']
      }
    ],
    suggestedItinerary: [
      {
        day: 1,
        title: 'Arrival in Madikeri & Sunset at Raja’s Seat',
        morning: 'Scenic road drive from Bengaluru through Mysore highway; stop for Mysore filter coffee & dosas.',
        afternoon: 'Check-in to your cozy plantation homestay, freshen up, and enjoy home-cooked Kodava lunch.',
        evening: 'Witness the breathtaking panoramic golden sunset at Raja’s Seat musical fountain garden.',
        dailyCost: 1100,
        highlight: 'Golden hour mist over Madikeri valleys',
        image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80'
      },
      {
        day: 2,
        title: 'Coffee Plantation Walk & Dubare Elephant Camp',
        morning: 'Guided walking trail across Arabica & Robusta coffee plants, black pepper vines, and cardamom groves.',
        afternoon: 'Visit Dubare Elephant Camp across Kaveri river; observe elephant bathing and river rafting.',
        evening: 'Return to homestay for campfire, roasted corn, barbecue, and traditional Pandi curry or vegetarian Kodava cuisine.',
        dailyCost: 1400,
        highlight: 'Interactive plantation sensory walk',
        image: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=400&q=80'
      },
      {
        day: 3,
        title: 'Abbey Falls & Namdroling Monastery (Golden Temple)',
        morning: 'Descend through spice estates to the roaring Abbey Falls footbridge for stunning mist spray photos.',
        afternoon: 'Drive to Bylakuppe, the largest Tibetan settlement in South India, and admire the majestic 40ft golden Buddha statues.',
        evening: 'Sip Tibetan butter tea, taste authentic steamed momos, and browse prayer wheels in local markets.',
        dailyCost: 1300,
        highlight: 'Tibetan peace chanting and water mist at Abbey Falls',
        image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=400&q=80'
      },
      {
        day: 4,
        title: 'Tadiandamol Peak Trek or Talakaveri Sacred Source',
        morning: 'Early morning hike to Tadiandamol peak (highest point in Coorg) or scenic drive to Talakaveri temple origin of River Kaveri.',
        afternoon: 'Picnic lunch with valley view; explore the hanging bridge near Chelavara falls.',
        evening: 'Relaxed evening at homestay lounge with board games, acoustic music, and stargazing.',
        dailyCost: 1200,
        highlight: 'Western Ghats cloud ocean view from 1748m',
        image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=400&q=80'
      },
      {
        day: 5,
        title: 'Madikeri Fort, Spice Shopping & Departure',
        morning: 'Explore 17th-century Madikeri Fort and clock tower; visit local bazaar for homemade chocolates, estate honey, and single-origin coffee beans.',
        afternoon: 'Traditional lunch at Coorg Cuisine restaurant; start return journey back to Bengaluru.',
        evening: 'Arrive in Bengaluru rested, carrying estate coffee and fresh memories.',
        dailyCost: 1000,
        highlight: 'Taking home artisan spices and organic estate coffee',
        image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=400&q=80'
      }
    ],
    attractions: ["Raja's Seat", "Abbey Falls", "Dubare Elephant Camp", "Namdroling Golden Temple", "Tadiandamol Peak", "Madikeri Fort"],
    specialtyFood: ["Authentic Kodava Pandi Curry", "Akki Roti with Bamboo Shoot Curry", "Kadamuttu (Rice Dumplings)", "Single-Estate Filter Coffee"],
    suitabilityExplanations: {
      'default': 'Recommended because December weather is pleasant (12-25°C), homestays are widely available, and it strongly matches your interest in mountains and nature.'
    }
  },
  {
    id: 'munnar',
    name: 'Munnar',
    state: 'Kerala',
    region: 'South',
    tagline: 'Rolling emerald tea carpets, cool mountain breeze & misty waterfalls',
    heroImage: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=80',
    cardImage: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
    tags: ['Mountains', 'Nature', 'Relaxation', 'Wildlife'],
    bestMonths: ['October', 'November', 'December', 'January', 'February', 'March'],
    avoidMonths: ['June', 'July'],
    coordinates: { lat: 10.0889, lng: 77.0595 },
    transportCostFrom: {
      'Bengaluru': 3200,
      'Mumbai': 7200,
      'Delhi': 9200,
      'Chennai': 3600,
      'Hyderabad': 5200,
      'Kolkata': 9500,
      'Pune': 6800,
      'Ahmedabad': 8100,
      'Kochi': 1400,
      'Jaipur': 9400
    },
    averageDailyExpense: 1300,
    accommodationPrices: {
      'Hostel': 950,
      'Budget Hotel': 1800,
      'Homestay': 3200,
      '3-Star Hotel': 3800,
      '4-Star Hotel': 5800,
      'Luxury Resort': 13000
    },
    monthlyWeather: {
      'January': { tempMin: 10, tempMax: 22, rainChance: 4, condition: 'Frosty & Crisp', suitability: 'Excellent', summary: 'Coolest month, dramatic morning frost on tea leaves' },
      'February': { tempMin: 12, tempMax: 24, rainChance: 8, condition: 'Bright & Crisp', suitability: 'Excellent', summary: 'Crystal clear panoramic views across valleys' },
      'March': { tempMin: 14, tempMax: 27, rainChance: 15, condition: 'Pleasant & Mild', suitability: 'Good', summary: 'Mild mountain warmth, blooming orchids' },
      'April': { tempMin: 16, tempMax: 28, rainChance: 35, condition: 'Mild Showers', suitability: 'Good', summary: 'Occasional mountain showers' },
      'May': { tempMin: 17, tempMax: 27, rainChance: 50, condition: 'Misty & Overcast', suitability: 'Moderate', summary: 'Pre-monsoon clouds gather' },
      'June': { tempMin: 15, tempMax: 22, rainChance: 90, condition: 'Heavy Rain', suitability: 'Avoid', summary: 'Torrential Kerala monsoons' },
      'July': { tempMin: 15, tempMax: 21, rainChance: 95, condition: 'Peak Monsoon', suitability: 'Avoid', summary: 'Landslide warnings on mountain passes' },
      'August': { tempMin: 15, tempMax: 22, rainChance: 80, condition: 'Rain & Mist', suitability: 'Moderate', summary: 'Lush greenery, surging streams' },
      'September': { tempMin: 15, tempMax: 24, rainChance: 45, condition: 'Fresh & Green', suitability: 'Good', summary: 'Post-monsoon freshness' },
      'October': { tempMin: 14, tempMax: 24, rainChance: 25, condition: 'Mild & Sunny', suitability: 'Excellent', summary: 'Pleasant hiking climate' },
      'November': { tempMin: 12, tempMax: 23, rainChance: 12, condition: 'Cool & Sunny', suitability: 'Excellent', summary: 'Neelakurinji hills and tea harvest' },
      'December': { tempMin: 9, tempMax: 21, rainChance: 5, condition: 'Chilly & Mist-Kissed', suitability: 'Excellent', summary: 'Charming mountain chill, zero humidity, and iconic tea estate sunrises' }
    },
    stays: [
      {
        id: 'stay-munnar-1',
        name: 'Misty Mountain Tea Valley Homestay',
        type: 'Homestay',
        pricePerNight: 3200,
        rating: 4.8,
        reviewsCount: 290,
        image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=600&q=80',
        amenities: ['Tea Garden View', 'Homemade Kerala Appams', 'Campfire', 'Wi-Fi'],
        location: 'Old Munnar, 3 km from Tea Museum',
        isBestValue: true
      },
      {
        id: 'stay-munnar-2',
        name: 'The Leaf Nature Resort',
        type: '4-Star Hotel',
        pricePerNight: 6200,
        rating: 4.7,
        reviewsCount: 410,
        image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=600&q=80',
        amenities: ['Infinity Pool', 'Spa', 'Tea Plucking Tour', 'Multi-Cuisine Buffet'],
        location: 'Chithirapuram, Munnar'
      },
      {
        id: 'stay-munnar-3',
        name: 'Zostel Munnar',
        type: 'Hostel',
        pricePerNight: 950,
        rating: 4.6,
        reviewsCount: 520,
        image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=600&q=80',
        amenities: ['Dorm & Private Rooms', 'Community Lounge', 'Stargazing Balcony'],
        location: 'Devikulam Road'
      }
    ],
    situationPhotos: [
      {
        id: 'p-m-1',
        url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
        caption: 'Sunrise over endless terraced tea gardens in Munnar',
        category: 'nature',
        seasons: ['December', 'January', 'November'],
        suitableGroups: ['Friends', 'Couple', 'Family']
      },
      {
        id: 'p-m-2',
        url: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80',
        caption: 'Valley-facing balcony view at Munnar homestay',
        category: 'stays',
        seasons: ['December', 'January', 'February'],
        suitableGroups: ['Friends', 'Couple']
      },
      {
        id: 'p-m-3',
        url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80',
        caption: 'Trekking along high ridge trails towards Anamudi peak',
        category: 'adventure',
        seasons: ['December', 'January', 'November'],
        suitableGroups: ['Friends', 'Solo']
      },
      {
        id: 'p-m-4',
        url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
        caption: 'Authentic Kerala thali with steamed appams & stew',
        category: 'food',
        seasons: ['December', 'January', 'February', 'November'],
        suitableGroups: ['Friends', 'Family', 'Couple']
      },
      {
        id: 'p-m-5',
        url: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80',
        caption: 'Cascading Attukal waterfalls framed by evergreen hills',
        category: 'attractions',
        seasons: ['December', 'November', 'October'],
        suitableGroups: ['Friends', 'Family']
      },
      {
        id: 'p-m-6',
        url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
        caption: 'Crisp winter campfire evening in the Western Ghats',
        category: 'night',
        seasons: ['December', 'January'],
        suitableGroups: ['Friends', 'Couple']
      }
    ],
    suggestedItinerary: [
      {
        day: 1,
        title: 'Arrival via Cheeyappara Waterfalls & Tea Valley Check-in',
        morning: 'Scenic climb through ghat roads stopping at Cheeyappara and Valara waterfalls.',
        afternoon: 'Check-in to tea estate homestay, fresh brew tasting, and rest.',
        evening: 'Walk through local spice market and Munnar blossom international park.',
        dailyCost: 1200,
        highlight: 'Ghat drive through mist-shrouded eucalyptus hills',
        image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80'
      },
      {
        day: 2,
        title: 'Eravikulam National Park & Nilgiri Tahr Sighting',
        morning: 'Early morning safari bus into Eravikulam National Park to spot endangered Nilgiri Tahr mountain goats.',
        afternoon: 'Visit the historic KDHP Tea Museum and watch CTC tea processing.',
        evening: 'Sunset view from Pothamedu viewpoint over deep river canyons.',
        dailyCost: 1500,
        highlight: 'Spotting endangered mountain goats against Anamudi peak',
        image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=400&q=80'
      },
      {
        day: 3,
        title: 'Mattupetty Dam, Echo Point & Kundala Lake Boating',
        morning: 'Drive past Mattupetty speed-boating reservoir and test your voice at Echo Point.',
        afternoon: 'Pedal boat ride across misty Kundala Lake under pine trees.',
        evening: 'Traditional Kathakali & Kalaripayattu martial arts cultural show in town.',
        dailyCost: 1400,
        highlight: 'Echo point laughs and traditional martial arts',
        image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=400&q=80'
      },
      {
        day: 4,
        title: 'Top Station Cloud Sea & Kolukkumalai Jeep Safari',
        morning: 'Thrilling 4x4 jeep safari to Kolukkumalai (highest tea estate in the world) to witness clouds below your feet.',
        afternoon: 'Warm cardamom tea atop Top Station overlooking Tamil Nadu plains.',
        evening: 'Campfire with acoustic guitar and homemade Kerala stew.',
        dailyCost: 1600,
        highlight: 'Floating above clouds at Kolukkumalai',
        image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=400&q=80'
      },
      {
        day: 5,
        title: 'Spice Garden Tour & Return Departure',
        morning: 'Guided stroll through vanilla, clove, and cinnamon gardens; buy farm-fresh spices.',
        afternoon: 'Farewell Kerala banana leaf feast and return transit.',
        evening: 'Arrival back at home base with fresh tea leaves and memories.',
        dailyCost: 800,
        highlight: 'Authentic Sadhya lunch and aromatic spices',
        image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=400&q=80'
      }
    ],
    attractions: ['Eravikulam National Park', 'Mattupetty Dam', 'Top Station', 'Kolukkumalai Tea Estate', 'Attukal Waterfalls', 'Tea Museum'],
    specialtyFood: ['Kerala Malabar Parotta with Veg Kurma', 'Idiyappam with Coconut Milk', 'Karimeen Pollichathu', 'Fresh Hill Spiced Chai'],
    suitabilityExplanations: {
      'default': 'Recommended because December offers crisp 9-21°C weather, scenic homestay options under budget, and supreme mountain tea-garden vistas.'
    }
  },
  {
    id: 'chikmagalur',
    name: 'Chikmagalur',
    state: 'Karnataka',
    region: 'South',
    tagline: 'Birthplace of Indian coffee — rugged peaks, babbling brooks & estate trails',
    heroImage: 'https://images.unsplash.com/photo-1627894483216-2138af692e32?auto=format&fit=crop&w=1600&q=80',
    cardImage: 'https://images.unsplash.com/photo-1627894483216-2138af692e32?auto=format&fit=crop&w=800&q=80',
    tags: ['Mountains', 'Nature', 'Adventure', 'Relaxation'],
    bestMonths: ['September', 'October', 'November', 'December', 'January', 'February', 'March'],
    avoidMonths: ['June', 'July', 'August'],
    coordinates: { lat: 13.3161, lng: 75.7720 },
    transportCostFrom: {
      'Bengaluru': 1900,
      'Mumbai': 6500,
      'Delhi': 8200,
      'Chennai': 3900,
      'Hyderabad': 4500,
      'Kolkata': 8900,
      'Pune': 5900,
      'Ahmedabad': 7400,
      'Kochi': 4100,
      'Jaipur': 8600
    },
    averageDailyExpense: 1100,
    accommodationPrices: {
      'Hostel': 850,
      'Budget Hotel': 1500,
      'Homestay': 2900,
      '3-Star Hotel': 3400,
      '4-Star Hotel': 5200,
      'Luxury Resort': 11000
    },
    monthlyWeather: {
      'January': { tempMin: 14, tempMax: 27, rainChance: 3, condition: 'Sunny & Crisp', suitability: 'Excellent', summary: 'Pleasant winter weather, clear hill views' },
      'February': { tempMin: 15, tempMax: 29, rainChance: 5, condition: 'Mild & Sunny', suitability: 'Excellent', summary: 'Warm sunshine, dry trails' },
      'March': { tempMin: 17, tempMax: 32, rainChance: 12, condition: 'Warm', suitability: 'Good', summary: 'Early summer, quiet retreat' },
      'April': { tempMin: 19, tempMax: 33, rainChance: 28, condition: 'Afternoon Breezy', suitability: 'Good', summary: 'Pre-monsoon greenery' },
      'May': { tempMin: 20, tempMax: 31, rainChance: 40, condition: 'Cloudy', suitability: 'Moderate', summary: 'Occasional thunderclouds' },
      'June': { tempMin: 18, tempMax: 25, rainChance: 82, condition: 'Heavy Rain', suitability: 'Avoid', summary: 'Intense rain on Western slopes' },
      'July': { tempMin: 17, tempMax: 24, rainChance: 90, condition: 'Peak Monsoon', suitability: 'Avoid', summary: 'Heavy rain, muddy trails' },
      'August': { tempMin: 17, tempMax: 24, rainChance: 75, condition: 'Wet & Misty', suitability: 'Moderate', summary: 'Hephay falls in full force' },
      'September': { tempMin: 17, tempMax: 26, rainChance: 40, condition: 'Lush & Green', suitability: 'Good', summary: 'Pristine post-monsoon waterfalls' },
      'October': { tempMin: 16, tempMax: 27, rainChance: 20, condition: 'Clear Skies', suitability: 'Excellent', summary: 'Great peak trekking season' },
      'November': { tempMin: 15, tempMax: 27, rainChance: 8, condition: 'Pleasant & Cool', suitability: 'Excellent', summary: 'Coffee cherry harvest begins' },
      'December': { tempMin: 13, tempMax: 26, rainChance: 2, condition: 'Crisp & Cool', suitability: 'Excellent', summary: 'Perfect chill, Mullayanagiri summit clear of clouds, and cozy homestay campfires' }
    },
    stays: [
      {
        id: 'stay-chikh-1',
        name: 'Coffee County Heritage Homestay',
        type: 'Homestay',
        pricePerNight: 2900,
        rating: 4.8,
        reviewsCount: 310,
        image: 'https://images.unsplash.com/photo-1587061949409-02df41d5e562?auto=format&fit=crop&w=600&q=80',
        amenities: ['Coffee Plantation View', 'Traditional Malnad Meals', 'Bonfire', 'Trek Guide'],
        location: 'Kaimara, Mullayanagiri Road',
        isBestValue: true
      },
      {
        id: 'stay-chikh-2',
        name: 'The Serai Chikmagalur',
        type: 'Luxury Resort',
        pricePerNight: 12000,
        rating: 4.9,
        reviewsCount: 650,
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80',
        amenities: ['Private Jacuzzi Villa', 'Spa', 'Fine Dining', 'Coffee Bean Harvesting Experience'],
        location: 'KM Road, Mugthihalli'
      },
      {
        id: 'stay-chikh-3',
        name: 'Zostel Chikmagalur',
        type: 'Hostel',
        pricePerNight: 850,
        rating: 4.5,
        reviewsCount: 420,
        image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=600&q=80',
        amenities: ['Rooftop Cafe', 'Board Games', 'Backpacker Community'],
        location: 'Belur Road'
      }
    ],
    situationPhotos: [
      {
        id: 'p-ck-1',
        url: 'https://images.unsplash.com/photo-1627894483216-2138af692e32?auto=format&fit=crop&w=800&q=80',
        caption: 'Mullayanagiri peak summit staircase kissing the winter clouds',
        category: 'adventure',
        seasons: ['December', 'January', 'November'],
        suitableGroups: ['Friends', 'Solo']
      },
      {
        id: 'p-ck-2',
        url: 'https://images.unsplash.com/photo-1587061949409-02df41d5e562?auto=format&fit=crop&w=800&q=80',
        caption: 'Traditional Malnad heritage homestay with wooden porch',
        category: 'stays',
        seasons: ['December', 'January', 'November', 'February'],
        suitableGroups: ['Friends', 'Family', 'Couple']
      },
      {
        id: 'p-ck-3',
        url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80',
        caption: 'Baba Budangiri ridge trail overlooking the Bababudan hills',
        category: 'nature',
        seasons: ['December', 'January'],
        suitableGroups: ['Friends', 'Solo']
      },
      {
        id: 'p-ck-4',
        url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
        caption: 'Steaming cups of freshly brewed Chikmagalur Peaberry coffee',
        category: 'food',
        seasons: ['December', 'January', 'November'],
        suitableGroups: ['Friends', 'Couple', 'Family']
      },
      {
        id: 'p-ck-5',
        url: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80',
        caption: 'Hebbe Falls roaring deep inside Bhadra wildlife reserve',
        category: 'attractions',
        seasons: ['December', 'November', 'October'],
        suitableGroups: ['Friends', 'Adventure']
      },
      {
        id: 'p-ck-6',
        url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
        caption: 'Campfire with friends under starry Malnad skies',
        category: 'night',
        seasons: ['December', 'January'],
        suitableGroups: ['Friends']
      }
    ],
    suggestedItinerary: [
      {
        day: 1,
        title: 'Road Journey from Bengaluru & Homestay Welcome',
        morning: 'Smooth highway drive via Hassan; stop at Channarayapatna for piping hot Thatte idlis.',
        afternoon: 'Arrive in Chikmagalur; check into coffee homestay and take a refreshing walk in the pepper groves.',
        evening: 'Visit Hirekolale Lake for a peaceful mirror-reflection sunset over the hills.',
        dailyCost: 950,
        highlight: 'Mirror waters of Hirekolale Lake at dusk',
        image: 'https://images.unsplash.com/photo-1627894483216-2138af692e32?auto=format&fit=crop&w=400&q=80'
      },
      {
        day: 2,
        title: 'Trek to Mullayanagiri Peak (Highest in Karnataka)',
        morning: 'Climb 500 stone steps to Mullayanagiri summit temple (1930m); panoramic views of Western Ghats.',
        afternoon: 'Traverse along Baba Budangiri caves and Dattatreya Peetha.',
        evening: 'Taste authentic Malnad Akki Roti with Kaalu Saaru at homestay.',
        dailyCost: 1200,
        highlight: 'Standing on Karnataka’s highest peak amidst cool breeze',
        image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=400&q=80'
      },
      {
        day: 3,
        title: 'Hebbe Falls Jeep Safari & Kemmangundi Hills',
        morning: 'Exciting 4x4 forest department jeep ride through Bhadra reserve to Hebbe Falls.',
        afternoon: 'Swim in the natural pool and visit Z-point view at Kemmangundi royal gardens.',
        evening: 'Campfire with guitar music and grilled local delicacies.',
        dailyCost: 1400,
        highlight: 'Refreshing natural plunge at Hebbe Falls',
        image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=400&q=80'
      },
      {
        day: 4,
        title: 'Bhadra River Rafting & Coffee Plantation Experience',
        morning: 'Water rafting on Bhadra river or relaxed plantation walk learning roasting techniques.',
        afternoon: 'Visit Belur Chennakeshava Temple (Hoysala architectural marvel).',
        evening: 'Leisurely cafe hopping in town tasting artisanal single-origin espresso.',
        dailyCost: 1100,
        highlight: 'Intricate Hoysala stone carvings at Belur',
        image: 'https://images.unsplash.com/photo-1587061949409-02df41d5e562?auto=format&fit=crop&w=400&q=80'
      },
      {
        day: 5,
        title: 'Estate Shopping & Return Drive to Bengaluru',
        morning: 'Purchase roasted coffee beans, homemade fruit preserves, and organic spices from local co-op.',
        afternoon: 'Begin return journey to Bengaluru with lunch en route.',
        evening: 'Reach Bengaluru by early evening refreshed and rejuvenated.',
        dailyCost: 850,
        highlight: 'Bringing home authentic Malnad coffee beans',
        image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=400&q=80'
      }
    ],
    attractions: ['Mullayanagiri Peak', 'Baba Budangiri', 'Hebbe Falls', 'Hirekolale Lake', 'Belur Hoysala Temple', 'Z Point Kemmangundi'],
    specialtyFood: ['Malnad Akki Roti with Kaalu Saaru', 'Halasina Hannu (Jackfruit) Payasa', 'Fresh Roasted Coffee', 'Bamboo Shoot Stir Fry'],
    suitabilityExplanations: {
      'default': 'Recommended because Chikmagalur is easily accessible from Bengaluru, well within your ₹25k budget, and offers ideal 13-26°C December weather.'
    }
  },
  {
    id: 'ooty',
    name: 'Ooty (Udhagamandalam)',
    state: 'Tamil Nadu',
    region: 'South',
    tagline: 'Queen of Hill Stations — heritage steam train, pine forests & tea slopes',
    heroImage: 'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=1600&q=80',
    cardImage: 'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=800&q=80',
    tags: ['Mountains', 'Nature', 'Heritage', 'Relaxation'],
    bestMonths: ['October', 'November', 'December', 'January', 'February', 'March', 'April', 'May'],
    avoidMonths: ['July', 'August'],
    coordinates: { lat: 11.4102, lng: 76.6950 },
    transportCostFrom: {
      'Bengaluru': 2800,
      'Mumbai': 7100,
      'Delhi': 8800,
      'Chennai': 3400,
      'Hyderabad': 4900,
      'Kolkata': 9100,
      'Pune': 6400,
      'Ahmedabad': 7700,
      'Kochi': 3100,
      'Jaipur': 9100
    },
    averageDailyExpense: 1250,
    accommodationPrices: {
      'Hostel': 900,
      'Budget Hotel': 1700,
      'Homestay': 2900,
      '3-Star Hotel': 3600,
      '4-Star Hotel': 5600,
      'Luxury Resort': 12000
    },
    monthlyWeather: {
      'December': { tempMin: 8, tempMax: 20, rainChance: 8, condition: 'Frosty & Clear', suitability: 'Excellent', summary: 'Cold winter nights, Nilgiri heritage toy train runs smoothly' },
      'January': { tempMin: 7, tempMax: 20, rainChance: 4, condition: 'Crisp & Cold', suitability: 'Excellent', summary: 'Morning grass frost in botanical gardens' },
      'May': { tempMin: 14, tempMax: 24, rainChance: 25, condition: 'Summer Bloom', suitability: 'Good', summary: 'Annual flower festival' }
    },
    stays: [
      {
        id: 'stay-ooty-1',
        name: 'Nilgiri Heritage Cottage Homestay',
        type: 'Homestay',
        pricePerNight: 2900,
        rating: 4.7,
        reviewsCount: 280,
        image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=600&q=80',
        amenities: ['Fireplace in Room', 'Valley Garden', 'Home Cooked Meals', 'Wi-Fi'],
        location: 'Fern Hill, Ooty',
        isBestValue: true
      },
      {
        id: 'stay-ooty-2',
        name: 'Savoy - IHCL SeleQtions',
        type: 'Luxury Resort',
        pricePerNight: 13500,
        rating: 4.9,
        reviewsCount: 540,
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80',
        amenities: ['Colonial Architecture', 'High Tea Lounge', 'Spa'],
        location: 'Sylks Road, Ooty'
      },
      {
        id: 'stay-ooty-3',
        name: 'Zostel Ooty',
        type: 'Hostel',
        pricePerNight: 900,
        rating: 4.6,
        reviewsCount: 390,
        image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=600&q=80',
        amenities: ['Valley View Terrace', 'Backpacker Common Room'],
        location: 'Tiger Hill Road'
      }
    ],
    situationPhotos: [
      {
        id: 'p-o-1',
        url: 'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=800&q=80',
        caption: 'UNESCO Nilgiri Mountain Toy Train chugging through pine valleys',
        category: 'attractions',
        seasons: ['December', 'January', 'November'],
        suitableGroups: ['Friends', 'Family', 'Couple']
      },
      {
        id: 'p-o-2',
        url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
        caption: 'Misty tea slopes on the way to Doddabetta Peak',
        category: 'nature',
        seasons: ['December', 'January'],
        suitableGroups: ['Friends', 'Couple']
      }
    ],
    suggestedItinerary: [
      {
        day: 1,
        title: 'Toy Train Ride & Botanical Garden',
        morning: 'Experience the iconic UNESCO toy train from Mettupalayam or Coonoor.',
        afternoon: 'Stroll through government botanical gardens and rose garden.',
        evening: 'Boating at Ooty Lake followed by handmade chocolate shopping.',
        dailyCost: 1200,
        highlight: 'Steam train whistle echoing through tunnels',
        image: 'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=400&q=80'
      }
    ],
    attractions: ['Nilgiri Toy Train', 'Doddabetta Peak', 'Pykara Lake & Waterfalls', 'Ooty Botanical Gardens', 'Avalanche Lake'],
    specialtyFood: ['Ooty Homemade Chocolates', 'Nilgiri Tea', 'Hot Badam Milk', 'Steamed Vadas'],
    suitabilityExplanations: {
      'default': 'Recommended for cool winter climate, pine forest views, and classic Nilgiri mountain charm.'
    }
  },
  {
    id: 'goa',
    name: 'Goa',
    state: 'Goa',
    region: 'West',
    tagline: 'Sun, sand, Portuguese heritage, beach shacks & ocean sunsets',
    heroImage: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1600&q=80',
    cardImage: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80',
    tags: ['Beach', 'Culture', 'Food', 'Relaxation', 'City Life', 'Adventure'],
    bestMonths: ['November', 'December', 'January', 'February', 'March'],
    avoidMonths: ['June', 'July', 'August'],
    coordinates: { lat: 15.2993, lng: 74.1240 },
    transportCostFrom: {
      'Bengaluru': 3400,
      'Mumbai': 2600,
      'Delhi': 6500,
      'Chennai': 4100,
      'Hyderabad': 3900,
      'Kolkata': 7800,
      'Pune': 2400,
      'Ahmedabad': 5100,
      'Kochi': 4200,
      'Jaipur': 6900
    },
    averageDailyExpense: 1800,
    accommodationPrices: {
      'Hostel': 1200,
      'Budget Hotel': 2200,
      'Homestay': 3600,
      '3-Star Hotel': 4500,
      '4-Star Hotel': 7500,
      'Luxury Resort': 16000
    },
    monthlyWeather: {
      'December': { tempMin: 20, tempMax: 32, rainChance: 2, condition: 'Sunny & Coastal Breeze', suitability: 'Excellent', summary: 'Peak festive holiday season, vibrant beach shacks & Christmas glow' },
      'January': { tempMin: 19, tempMax: 31, rainChance: 1, condition: 'Dry & Breezy', suitability: 'Excellent', summary: 'Clear blue skies and gentle seas' },
      'July': { tempMin: 24, tempMax: 29, rainChance: 92, condition: 'Monsoon Torrent', suitability: 'Avoid', summary: 'Beaches closed for swimming; lush inland greenery' }
    },
    stays: [
      {
        id: 'stay-goa-1',
        name: 'Fontainhas Portuguese Heritage Villa',
        type: 'Homestay',
        pricePerNight: 3600,
        rating: 4.8,
        reviewsCount: 420,
        image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=600&q=80',
        amenities: ['Latin Quarter Architecture', 'Breakfast Included', 'Bicycle Rental', 'Wi-Fi'],
        location: 'Panaji Latin Quarter',
        isBestValue: true
      },
      {
        id: 'stay-goa-2',
        name: 'Taj Exotica Resort & Spa',
        type: 'Luxury Resort',
        pricePerNight: 18500,
        rating: 4.9,
        reviewsCount: 1100,
        image: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=600&q=80',
        amenities: ['Private Beach Access', 'Golf Course', 'Spa', 'Poolside Bar'],
        location: 'Benaulim, South Goa'
      },
      {
        id: 'stay-goa-3',
        name: 'The Funky Monkey Hostel',
        type: 'Hostel',
        pricePerNight: 1200,
        rating: 4.5,
        reviewsCount: 680,
        image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=600&q=80',
        amenities: ['Garden Bar', 'Walk to Anjuna Beach', 'Events & Live Music'],
        location: 'Anjuna, North Goa'
      }
    ],
    situationPhotos: [
      {
        id: 'p-g-1',
        url: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80',
        caption: 'Golden sunset over Palolem beach curved bay',
        category: 'nature',
        seasons: ['December', 'January', 'November', 'February'],
        suitableGroups: ['Friends', 'Couple', 'Solo']
      },
      {
        id: 'p-g-2',
        url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
        caption: 'Pastel Portuguese houses of Fontainhas Latin Quarter',
        category: 'attractions',
        seasons: ['December', 'January', 'November'],
        suitableGroups: ['Couple', 'Solo', 'Friends']
      }
    ],
    suggestedItinerary: [
      {
        day: 1,
        title: 'Panjim Heritage & Sunset River Cruise',
        morning: 'Stroll through colorful colonial streets of Fontainhas.',
        afternoon: 'Fresh Goan fish curry thali with kokum sol kadhi.',
        evening: 'Mandovi river sunset cruise with Goan folk music.',
        dailyCost: 1800,
        highlight: 'Old Portuguese alleyways and vibrant murals',
        image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=400&q=80'
      }
    ],
    attractions: ['Palolem Beach', 'Aguada Fort', 'Basilica of Bom Jesus', 'Fontainhas Latin Quarter', 'Dudhsagar Waterfalls', 'Anjuna Flea Market'],
    specialtyFood: ['Goan Fish Curry & Rice', 'Prawn Balchão', 'Bebinca Layered Cake', 'Pork Vindaloo / Mushroom Xacuti'],
    suitabilityExplanations: {
      'default': 'Recommended for warm coastal sunshine, vibrant seafood, beach relaxation, and festive holiday energy.'
    }
  },
  {
    id: 'manali',
    name: 'Manali',
    state: 'Himachal Pradesh',
    region: 'North',
    tagline: 'Snow-draped Himalayan peaks, pine forests, apple orchards & adventure',
    heroImage: 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=1600&q=80',
    cardImage: 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=800&q=80',
    tags: ['Mountains', 'Adventure', 'Nature', 'Relaxation'],
    bestMonths: ['October', 'November', 'December', 'January', 'February', 'March', 'April', 'May'],
    avoidMonths: ['July', 'August'],
    coordinates: { lat: 32.2396, lng: 77.1887 },
    transportCostFrom: {
      'Bengaluru': 8900,
      'Mumbai': 7800,
      'Delhi': 2200,
      'Chennai': 9200,
      'Hyderabad': 8100,
      'Kolkata': 7500,
      'Pune': 7900,
      'Ahmedabad': 6200,
      'Kochi': 9900,
      'Jaipur': 4200
    },
    averageDailyExpense: 1400,
    accommodationPrices: {
      'Hostel': 800,
      'Budget Hotel': 1700,
      'Homestay': 2600,
      '3-Star Hotel': 3500,
      '4-Star Hotel': 5800,
      'Luxury Resort': 12500
    },
    monthlyWeather: {
      'December': { tempMin: -2, tempMax: 12, rainChance: 15, condition: 'Snowfall & Crisp', suitability: 'Good', summary: 'Early winter snowfall in Solang and Atal Tunnel; chilly nights' },
      'January': { tempMin: -5, tempMax: 8, rainChance: 30, condition: 'Snow Storms & Skiing', suitability: 'Good', summary: 'Full winter wonderland, ski slopes active' },
      'May': { tempMin: 12, tempMax: 26, rainChance: 15, condition: 'Pleasant Summer', suitability: 'Excellent', summary: 'Escape the plains heat, blooming apple blossoms' }
    },
    stays: [
      {
        id: 'stay-manali-1',
        name: 'Old Manali Apple Tree Homestay',
        type: 'Homestay',
        pricePerNight: 2600,
        rating: 4.8,
        reviewsCount: 380,
        image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=600&q=80',
        amenities: ['Himalayan Wood Burner', 'Mountain View', 'Cafe Walk Distance', 'Wi-Fi'],
        location: 'Old Manali Village',
        isBestValue: true
      },
      {
        id: 'stay-manali-2',
        name: 'Span Resort & Spa',
        type: 'Luxury Resort',
        pricePerNight: 14000,
        rating: 4.9,
        reviewsCount: 510,
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80',
        amenities: ['Beas River Frontage', 'Helipad', 'Heated Pool', 'Fine Dining'],
        location: 'Baragarh, Kullu-Manali Highway'
      }
    ],
    situationPhotos: [
      {
        id: 'p-mn-1',
        url: 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=800&q=80',
        caption: 'Snow clad peaks framing Solang valley in winter',
        category: 'adventure',
        seasons: ['December', 'January', 'February'],
        suitableGroups: ['Friends', 'Couple']
      }
    ],
    suggestedItinerary: [
      {
        day: 1,
        title: 'Old Manali Vibe & Hadimba Temple',
        morning: 'Explore wooden architecture of ancient Hadimba Temple amidst towering deodars.',
        afternoon: 'Cafe hopping in Old Manali; taste wood-fired trout and herbal tea.',
        evening: 'Shop for Kullu shawls and warm woolen caps on Mall Road.',
        dailyCost: 1300,
        highlight: 'Cedar forest peace around Hadimba Temple',
        image: 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=400&q=80'
      }
    ],
    attractions: ['Solang Valley', 'Atal Tunnel', 'Rohtang Pass', 'Hadimba Temple', 'Jogini Waterfall', 'Old Manali Cafes'],
    specialtyFood: ['Himachali Siddu with Ghee', 'Kullu Trout Fish', 'Babru', 'Thukpa & Momos'],
    suitabilityExplanations: {
      'default': 'Recommended for travelers seeking majestic Himalayan snow, cedar forests, and thrilling mountain sports.'
    }
  },
  {
    id: 'jaipur',
    name: 'Jaipur',
    state: 'Rajasthan',
    region: 'North',
    tagline: 'The Pink City — grand royal forts, opulent palaces & heritage bazaars',
    heroImage: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1600&q=80',
    cardImage: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80',
    tags: ['Heritage', 'Culture', 'Food', 'City Life'],
    bestMonths: ['October', 'November', 'December', 'January', 'February', 'March'],
    avoidMonths: ['May', 'June', 'July'],
    coordinates: { lat: 26.9124, lng: 75.7873 },
    transportCostFrom: {
      'Bengaluru': 6200,
      'Mumbai': 4800,
      'Delhi': 1200,
      'Chennai': 6800,
      'Hyderabad': 5400,
      'Kolkata': 5800,
      'Pune': 5100,
      'Ahmedabad': 2800,
      'Kochi': 7600,
      'Jaipur': 400
    },
    averageDailyExpense: 1400,
    accommodationPrices: {
      'Hostel': 750,
      'Budget Hotel': 1600,
      'Homestay': 2500,
      '3-Star Hotel': 3200,
      '4-Star Hotel': 5400,
      'Luxury Resort': 14000
    },
    monthlyWeather: {
      'December': { tempMin: 9, tempMax: 24, rainChance: 1, condition: 'Sunny & Pleasant', suitability: 'Excellent', summary: 'Peak royal sightseeing season with crisp mornings and warm afternoon sun' },
      'January': { tempMin: 8, tempMax: 23, rainChance: 2, condition: 'Cool & Clear', suitability: 'Excellent', summary: 'Jaipur Literature Festival & kite flying on Makar Sankranti' },
      'June': { tempMin: 28, tempMax: 42, rainChance: 15, condition: 'Scorching Heat', suitability: 'Avoid', summary: 'Intense dry desert heat' }
    },
    stays: [
      {
        id: 'stay-jaipur-1',
        name: 'Rawla Rawat Haveli Homestay',
        type: 'Homestay',
        pricePerNight: 2500,
        rating: 4.8,
        reviewsCount: 390,
        image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=600&q=80',
        amenities: ['Traditional Courtyard', 'Rooftop Fort View', 'Rajasthani Thali', 'Wi-Fi'],
        location: 'Old City, near Hawa Mahal',
        isBestValue: true
      },
      {
        id: 'stay-jaipur-2',
        name: 'Rambagh Palace',
        type: 'Luxury Resort',
        pricePerNight: 35000,
        rating: 5.0,
        reviewsCount: 820,
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80',
        amenities: ['Former Royal Palace', 'Peacock Gardens', 'Polo Bar', 'Butler Service'],
        location: 'Bhawani Singh Road'
      }
    ],
    situationPhotos: [
      {
        id: 'p-j-1',
        url: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80',
        caption: 'Hawa Mahal honeycomb sandstone facade glowing in morning sun',
        category: 'attractions',
        seasons: ['December', 'January', 'November'],
        suitableGroups: ['Friends', 'Family', 'Couple', 'Solo']
      }
    ],
    suggestedItinerary: [
      {
        day: 1,
        title: 'Amber Fort & Jal Mahal',
        morning: 'Ascend to the majestic Amber Fort and explore Sheesh Mahal mirror palace.',
        afternoon: 'Stop by the floating Jal Mahal and savor authentic Dal Baati Churma.',
        evening: 'Sunset over pink city ramparts from Nahargarh Fort.',
        dailyCost: 1400,
        highlight: 'Golden reflections at Jal Mahal lake',
        image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=400&q=80'
      }
    ],
    attractions: ['Amber Fort', 'Hawa Mahal', 'City Palace', 'Nahargarh Fort', 'Jantar Mantar', 'Johari Bazaar'],
    specialtyFood: ['Dal Baati Churma', 'Pyaaz Kachori from Rawat Mishthan Bhandar', 'Ghevar Sweet', 'Laal Maas'],
    suitabilityExplanations: {
      'default': 'Recommended for history enthusiasts and culture lovers enjoying pleasant winter palace exploration.'
    }
  },
  {
    id: 'rishikesh',
    name: 'Rishikesh',
    state: 'Uttarakhand',
    region: 'North',
    tagline: 'Yoga capital of the world — sacred Ganga aarti, river rapids & ashrams',
    heroImage: 'https://images.unsplash.com/photo-1609137144822-263690d79208?auto=format&fit=crop&w=1600&q=80',
    cardImage: 'https://images.unsplash.com/photo-1609137144822-263690d79208?auto=format&fit=crop&w=800&q=80',
    tags: ['Spiritual', 'Adventure', 'Mountains', 'Culture', 'Relaxation'],
    bestMonths: ['September', 'October', 'November', 'December', 'January', 'February', 'March', 'April'],
    avoidMonths: ['July', 'August'],
    coordinates: { lat: 30.0869, lng: 78.2676 },
    transportCostFrom: {
      'Bengaluru': 7400,
      'Mumbai': 6400,
      'Delhi': 1500,
      'Chennai': 7800,
      'Hyderabad': 6900,
      'Kolkata': 6200,
      'Pune': 6600,
      'Ahmedabad': 4900,
      'Kochi': 8600,
      'Jaipur': 3200
    },
    averageDailyExpense: 1100,
    accommodationPrices: {
      'Hostel': 700,
      'Budget Hotel': 1400,
      'Homestay': 2200,
      '3-Star Hotel': 3100,
      '4-Star Hotel': 5200,
      'Luxury Resort': 13000
    },
    monthlyWeather: {
      'December': { tempMin: 8, tempMax: 22, rainChance: 4, condition: 'Cool & Clear', suitability: 'Excellent', summary: 'Crisp river breeze, crystal emerald Ganga waters, and evening Aarti fire warmth' },
      'July': { tempMin: 24, tempMax: 33, rainChance: 85, condition: 'Monsoon High River', suitability: 'Avoid', summary: 'Rafting suspended due to swollen Ganga' }
    },
    stays: [
      {
        id: 'stay-rishi-1',
        name: 'Ganga Valley Riverside Homestay',
        type: 'Homestay',
        pricePerNight: 2200,
        rating: 4.8,
        reviewsCount: 340,
        image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=600&q=80',
        amenities: ['Direct Ganga View', 'Morning Yoga Sessions', 'Sattvic Food', 'Wi-Fi'],
        location: 'Tapovan, Rishikesh',
        isBestValue: true
      }
    ],
    situationPhotos: [
      {
        id: 'p-r-1',
        url: 'https://images.unsplash.com/photo-1609137144822-263690d79208?auto=format&fit=crop&w=800&q=80',
        caption: 'Triveni Ghat evening Maha Aarti with hundreds of brass oil lamps',
        category: 'spiritual',
        seasons: ['December', 'January', 'November', 'October'],
        suitableGroups: ['Friends', 'Family', 'Solo']
      }
    ],
    suggestedItinerary: [
      {
        day: 1,
        title: 'Ram Jhula & Ganga Aarti',
        morning: 'Cross Ram Jhula suspension bridge watching playful langurs.',
        afternoon: 'Visit Beatles Ashram (Chaurasi Kutia) and explore meditation domes.',
        evening: 'Attend soul-stirring Parmarth Niketan Ganga Aarti at sunset.',
        dailyCost: 1100,
        highlight: 'Floating prayer diyas down the sacred Ganga',
        image: 'https://images.unsplash.com/photo-1609137144822-263690d79208?auto=format&fit=crop&w=400&q=80'
      }
    ],
    attractions: ['Triveni Ghat Aarti', 'Beatles Ashram', 'White Water River Rafting', 'Neer Garh Waterfall', 'Laxman Jhula'],
    specialtyFood: ['Ayurvedic Herbal Thali', 'Wood-Fired Neapolitan Pizza in Tapovan', 'Chotiwala Special Thali', 'Aloo Poori at Ghats'],
    suitabilityExplanations: {
      'default': 'Recommended for soul seekers, yoga enthusiasts, and outdoor adventure lovers.'
    }
  },
  {
    id: 'varanasi',
    name: 'Varanasi (Kashi)',
    state: 'Uttar Pradesh',
    region: 'North',
    tagline: 'The oldest living city — sacred river ghats, temple chants & sunrise boats',
    heroImage: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1600&q=80',
    cardImage: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=800&q=80',
    tags: ['Spiritual', 'Heritage', 'Culture', 'Food'],
    bestMonths: ['October', 'November', 'December', 'January', 'February', 'March'],
    avoidMonths: ['May', 'June'],
    coordinates: { lat: 25.3176, lng: 82.9739 },
    transportCostFrom: {
      'Bengaluru': 6800,
      'Mumbai': 5800,
      'Delhi': 2400,
      'Chennai': 7100,
      'Hyderabad': 5900,
      'Kolkata': 3400,
      'Pune': 6100,
      'Ahmedabad': 5200,
      'Kochi': 8200,
      'Jaipur': 4100
    },
    averageDailyExpense: 1100,
    accommodationPrices: {
      'Hostel': 650,
      'Budget Hotel': 1400,
      'Homestay': 2400,
      '3-Star Hotel': 3200,
      '4-Star Hotel': 5500,
      'Luxury Resort': 13500
    },
    monthlyWeather: {
      'December': { tempMin: 9, tempMax: 23, rainChance: 2, condition: 'Crisp & Foggy', suitability: 'Excellent', summary: 'Ethereal morning river fog, comfortable weather for temple walks' },
      'May': { tempMin: 28, tempMax: 43, rainChance: 5, condition: 'Very Hot', suitability: 'Avoid', summary: 'Intense summer sun along stone ghats' }
    },
    stays: [
      {
        id: 'stay-v-1',
        name: 'Ghatview Heritage Haveli Homestay',
        type: 'Homestay',
        pricePerNight: 2400,
        rating: 4.8,
        reviewsCount: 310,
        image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=600&q=80',
        amenities: ['Direct Ghat Terrace', 'Banaras Breakfast', 'Boat Booking', 'Wi-Fi'],
        location: 'Assi Ghat',
        isBestValue: true
      }
    ],
    situationPhotos: [
      {
        id: 'p-v-1',
        url: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=800&q=80',
        caption: 'Sunrise wooden boat glide across the misty Ganga ghats',
        category: 'spiritual',
        seasons: ['December', 'January', 'November'],
        suitableGroups: ['Family', 'Couple', 'Solo', 'Friends']
      }
    ],
    suggestedItinerary: [
      {
        day: 1,
        title: 'Subah-e-Banaras & Kashi Vishwanath',
        morning: 'Early 5:30 AM sunrise wooden boat row past 84 ghats from Assi to Manikarnika.',
        afternoon: 'Darshan at newly renovated Kashi Vishwanath Corridor.',
        evening: 'Dashashwamedh Ghat grand evening Ganga Aarti.',
        dailyCost: 1000,
        highlight: 'Sunrise reflection of thousand-year-old stone palaces on the holy river',
        image: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=400&q=80'
      }
    ],
    attractions: ['Dashashwamedh Ghat Aarti', 'Kashi Vishwanath Temple', 'Assi Ghat Subah-e-Banaras', 'Sarnath Buddhist Stupa', 'Manikarnika Ghat'],
    specialtyFood: ['Banarasi Paan', 'Kachori Sabzi & Jalebi at Ram Bhandar', 'Blue Lassi Shop Malai Lassi', 'Tamatar Chaat'],
    suitabilityExplanations: {
      'default': 'Recommended for deeply spiritual journeys, profound ancient culture, and unforgettable sunrise boat rides.'
    }
  },
  {
    id: 'andaman',
    name: 'Andaman & Nicobar Islands',
    state: 'Andaman and Nicobar Islands',
    region: 'Islands',
    tagline: 'Turquoise ocean paradises, powder white beaches & coral reefs',
    heroImage: 'https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=crop&w=1600&q=80',
    cardImage: 'https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=crop&w=800&q=80',
    tags: ['Beach', 'Nature', 'Adventure', 'Relaxation', 'Heritage'],
    bestMonths: ['October', 'November', 'December', 'January', 'February', 'March', 'April'],
    avoidMonths: ['May', 'June', 'July', 'August', 'September'],
    coordinates: { lat: 11.7401, lng: 92.6586 },
    transportCostFrom: {
      'Bengaluru': 9800,
      'Mumbai': 10500,
      'Delhi': 11800,
      'Chennai': 8200,
      'Hyderabad': 9200,
      'Kolkata': 7500,
      'Pune': 10200,
      'Ahmedabad': 11200,
      'Kochi': 9600,
      'Jaipur': 12200
    },
    averageDailyExpense: 1900,
    accommodationPrices: {
      'Hostel': 1100,
      'Budget Hotel': 2400,
      'Homestay': 3500,
      '3-Star Hotel': 4800,
      '4-Star Hotel': 8200,
      'Luxury Resort': 19000
    },
    monthlyWeather: {
      'December': { tempMin: 23, tempMax: 30, rainChance: 8, condition: 'Tropical Sun & Calm Waters', suitability: 'Excellent', summary: 'Superb underwater visibility for scuba diving & calm seas' },
      'July': { tempMin: 24, tempMax: 29, rainChance: 90, condition: 'Rough Tropical Monsoons', suitability: 'Avoid', summary: 'Inter-island ferry cancellations and rough seas' }
    },
    stays: [
      {
        id: 'stay-and-1',
        name: 'Havelock Beach Eco Cottage',
        type: 'Homestay',
        pricePerNight: 3500,
        rating: 4.8,
        reviewsCount: 260,
        image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=600&q=80',
        amenities: ['1-min walk to Beach #5', 'Fresh Seafood Cafe', 'Hammocks', 'Wi-Fi'],
        location: 'Vijay Nagar Beach, Havelock',
        isBestValue: true
      }
    ],
    situationPhotos: [
      {
        id: 'p-a-1',
        url: 'https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=crop&w=800&q=80',
        caption: 'Radhanagar Beach rated among world’s top 7 beaches with crystal azure waves',
        category: 'nature',
        seasons: ['December', 'January', 'November', 'February'],
        suitableGroups: ['Friends', 'Couple', 'Family']
      }
    ],
    suggestedItinerary: [
      {
        day: 1,
        title: 'Port Blair & Cellular Jail Light & Sound',
        morning: 'Arrive at Veer Savarkar Airport; check in and relax.',
        afternoon: 'Tour the poignant national memorial Cellular Jail.',
        evening: 'Dramatic Light and Sound narrative of India’s freedom struggle.',
        dailyCost: 1800,
        highlight: 'Cellular jail historical memorial at dusk',
        image: 'https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=crop&w=400&q=80'
      }
    ],
    attractions: ['Radhanagar Beach', 'Elephant Beach Snorkeling', 'Cellular Jail', 'Ross Island Ruins', 'Neil Island Natural Bridge'],
    specialtyFood: ['Fresh Andaman Grilled Fish', 'Crab Masala Curry', 'Coconut Prawn Curry', 'Tropical Mango Smoothies'],
    suitabilityExplanations: {
      'default': 'Recommended for pristine white beaches, world-class diving, and exotic island serenity.'
    }
  },
  {
    id: 'ladakh',
    name: 'Ladakh (Leh)',
    state: 'Ladakh',
    region: 'North',
    tagline: 'Land of High Passes — barren moonscapes, Pangong Tso & ancient gompas',
    heroImage: 'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=1600&q=80',
    cardImage: 'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=800&q=80',
    tags: ['Mountains', 'Adventure', 'Culture', 'Spiritual', 'Nature'],
    bestMonths: ['May', 'June', 'July', 'August', 'September', 'October'],
    avoidMonths: ['November', 'December', 'January', 'February'],
    coordinates: { lat: 34.1526, lng: 77.5771 },
    transportCostFrom: {
      'Bengaluru': 9500,
      'Mumbai': 8800,
      'Delhi': 4500,
      'Chennai': 9800,
      'Hyderabad': 8900,
      'Kolkata': 8200,
      'Pune': 8700,
      'Ahmedabad': 7500,
      'Kochi': 10500,
      'Jaipur': 6200
    },
    averageDailyExpense: 1700,
    accommodationPrices: {
      'Hostel': 900,
      'Budget Hotel': 1900,
      'Homestay': 2800,
      '3-Star Hotel': 3800,
      '4-Star Hotel': 6200,
      'Luxury Resort': 14000
    },
    monthlyWeather: {
      'December': { tempMin: -15, tempMax: -1, rainChance: 10, condition: 'Sub-Zero Freeze', suitability: 'Avoid', summary: 'Severe winter; high passes blocked; suitable only for extreme Chadar trek' },
      'July': { tempMin: 12, tempMax: 26, rainChance: 5, condition: 'Sunny & Crisp High Altitude', suitability: 'Excellent', summary: 'Peak season, all mountain passes open, Pangong lake shines crystal blue' }
    },
    stays: [
      {
        id: 'stay-lad-1',
        name: 'Stok Heritage Ladakhi Homestay',
        type: 'Homestay',
        pricePerNight: 2800,
        rating: 4.9,
        reviewsCount: 290,
        image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=600&q=80',
        amenities: ['Mud-Brick Traditional Warmth', 'Solar Heated Water', 'Organic Ladakhi Meals', 'Stargazing Roof'],
        location: 'Stok Village, Leh',
        isBestValue: true
      }
    ],
    situationPhotos: [
      {
        id: 'p-ld-1',
        url: 'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=800&q=80',
        caption: 'Pangong Tso shifting shades from turquoise to deep lapis lazuli',
        category: 'nature',
        seasons: ['June', 'July', 'August', 'September'],
        suitableGroups: ['Friends', 'Adventure', 'Solo']
      }
    ],
    suggestedItinerary: [
      {
        day: 1,
        title: 'Acclimatization & Shanti Stupa',
        morning: 'Rest in Leh to acclimatize to 11,500 ft altitude; drink plenty of water.',
        afternoon: 'Gentle walk through Leh Main Bazaar.',
        evening: 'Sunset over Karakoram range from Shanti Stupa.',
        dailyCost: 1500,
        highlight: 'Golden stupa overlooking the Indus valley',
        image: 'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=400&q=80'
      }
    ],
    attractions: ['Pangong Tso Lake', 'Nubra Valley Sand Dunes & Bactrian Camels', 'Khardung La Pass', 'Thiksey Monastery', 'Magnetic Hill'],
    specialtyFood: ['Thukpa Noodle Soup', 'Tingmo Steamed Breads', 'Butter Tea (Gur Gur Chai)', 'Apricot Jam & Dry Fruits'],
    suitabilityExplanations: {
      'default': 'Recommended during summer months (May-Sept) for thrilling high-altitude passes and cosmic night skies.'
    }
  },
  {
    id: 'udaipur',
    name: 'Udaipur',
    state: 'Rajasthan',
    region: 'West',
    tagline: 'The City of Lakes — royal palaces on water, mirror sunsets & timeless romance',
    heroImage: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=1600&q=80',
    cardImage: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=800&q=80',
    tags: ['Heritage', 'Culture', 'Relaxation', 'Food', 'City Life'],
    bestMonths: ['October', 'November', 'December', 'January', 'February', 'March'],
    avoidMonths: ['May', 'June'],
    coordinates: { lat: 24.5854, lng: 73.7125 },
    transportCostFrom: {
      'Bengaluru': 5800,
      'Mumbai': 3900,
      'Delhi': 2800,
      'Chennai': 6400,
      'Hyderabad': 5200,
      'Kolkata': 6100,
      'Pune': 4200,
      'Ahmedabad': 1800,
      'Kochi': 7200,
      'Jaipur': 1600
    },
    averageDailyExpense: 1500,
    accommodationPrices: {
      'Hostel': 750,
      'Budget Hotel': 1700,
      'Homestay': 2700,
      '3-Star Hotel': 3600,
      '4-Star Hotel': 6200,
      'Luxury Resort': 22000
    },
    monthlyWeather: {
      'December': { tempMin: 10, tempMax: 26, rainChance: 1, condition: 'Sunny & Pleasant', suitability: 'Excellent', summary: 'Perfect romantic weather; lake reflections are crystal clear' },
      'May': { tempMin: 27, tempMax: 41, rainChance: 8, condition: 'Dry Heat', suitability: 'Avoid', summary: 'Hot desert breeze' }
    },
    stays: [
      {
        id: 'stay-ud-1',
        name: 'Lake Pichola Haveli Homestay',
        type: 'Homestay',
        pricePerNight: 2700,
        rating: 4.8,
        reviewsCount: 370,
        image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=600&q=80',
        amenities: ['Direct Lake Pichola View', 'Rooftop Candlelight Dinner', 'Mewari Hospitality', 'Wi-Fi'],
        location: 'Lal Ghat, Old City',
        isBestValue: true
      },
      {
        id: 'stay-ud-2',
        name: 'Taj Lake Palace',
        type: 'Luxury Resort',
        pricePerNight: 38000,
        rating: 5.0,
        reviewsCount: 1400,
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80',
        amenities: ['Floating White Marble Palace', 'Boat Arrival', 'Royal Jharokhas', 'Jiva Spa Boat'],
        location: 'Lake Pichola'
      }
    ],
    situationPhotos: [
      {
        id: 'p-u-1',
        url: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=800&q=80',
        caption: 'City Palace facade reflecting over Lake Pichola at sunset',
        category: 'attractions',
        seasons: ['December', 'January', 'November', 'February'],
        suitableGroups: ['Couple', 'Family', 'Friends']
      }
    ],
    suggestedItinerary: [
      {
        day: 1,
        title: 'City Palace & Lake Pichola Boat Cruise',
        morning: 'Wander through peacock courtyards and mirrored halls of Udaipur City Palace.',
        afternoon: 'Romantic boat cruise touching Jag Mandir Island palace.',
        evening: 'Watch Dharohar cultural folk dance show at Bagore Ki Haveli.',
        dailyCost: 1500,
        highlight: 'Golden hour silhouette of marble domes across the lake',
        image: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=400&q=80'
      }
    ],
    attractions: ['City Palace Udaipur', 'Lake Pichola', 'Jag Mandir', 'Saheliyon Ki Bari', 'Bagore Ki Haveli', 'Monsoon Palace Sajjangarh'],
    specialtyFood: ['Mewari Dal Baati', 'Gatte Ki Sabzi', 'Ker Sangri', 'Jalebi with Rabdi'],
    suitabilityExplanations: {
      'default': 'Recommended for serene lakeside sunsets, majestic marble architecture, and royal Mewar hospitality.'
    }
  },
  {
    id: 'araku',
    name: 'Araku Valley',
    state: 'Andhra Pradesh',
    region: 'South',
    tagline: 'The Ooty of Andhra — misty Eastern Ghats, coffee aroma, tribal waterfalls & Borra Caves',
    heroImage: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=80',
    cardImage: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
    tags: ['Mountains', 'Nature', 'Relaxation', 'Spiritual', 'Adventure'],
    bestMonths: ['October', 'November', 'December', 'January', 'February', 'March'],
    avoidMonths: ['May', 'June'],
    coordinates: { lat: 18.3273, lng: 82.8775 },
    transportCostFrom: {
      'Visakhapatnam': 400,
      'Rajahmundry': 800,
      'Vijayawada': 1100,
      'Tirupati': 1600,
      'Araku Valley': 200,
      'Hyderabad': 1800,
      'Bengaluru': 2800,
      'Chennai': 2400,
      'Kolkata': 2600,
      'Bhubaneswar': 1400,
      'Mumbai': 4200,
      'Pune': 3800,
      'Delhi': 5200,
      'Ahmedabad': 4600,
      'Kochi': 4200,
      'Jaipur': 4900
    },
    averageDailyExpense: 750,
    accommodationPrices: {
      'Hostel': 550,
      'Budget Hotel': 1100,
      'Homestay': 1600,
      '3-Star Hotel': 2400,
      '4-Star Hotel': 4200,
      'Luxury Resort': 7500
    },
    monthlyWeather: {
      'January': { tempMin: 11, tempMax: 24, rainChance: 2, condition: 'Misty & Chilly', suitability: 'Excellent', summary: 'Cold Eastern Ghats mornings with blankets of fog' },
      'February': { tempMin: 13, tempMax: 27, rainChance: 4, condition: 'Clear & Crisp', suitability: 'Excellent', summary: 'Pleasant daytime exploration weather' },
      'March': { tempMin: 16, tempMax: 31, rainChance: 8, condition: 'Warm & Sunny', suitability: 'Good', summary: 'Mild mountain warmth and dry trails' },
      'April': { tempMin: 19, tempMax: 34, rainChance: 18, condition: 'Warm', suitability: 'Moderate', summary: 'Pre-summer hill climate' },
      'May': { tempMin: 22, tempMax: 37, rainChance: 30, condition: 'Hot & Humid', suitability: 'Avoid', summary: 'Peak summer heat in valleys' },
      'June': { tempMin: 21, tempMax: 32, rainChance: 65, condition: 'Monsoon Arrives', suitability: 'Moderate', summary: 'Fresh mountain rains awaken streams' },
      'July': { tempMin: 20, tempMax: 28, rainChance: 82, condition: 'Heavy Rain', suitability: 'Moderate', summary: 'Lush green hills and roaring Katiki falls' },
      'August': { tempMin: 20, tempMax: 28, rainChance: 78, condition: 'Wet & Lush', suitability: 'Good', summary: 'Vibrant emerald terraced coffee hills' },
      'September': { tempMin: 19, tempMax: 28, rainChance: 45, condition: 'Post-Monsoon Fresh', suitability: 'Good', summary: 'Rushing streams and clear viewpoints' },
      'October': { tempMin: 17, tempMax: 28, rainChance: 20, condition: 'Pleasant Autumn', suitability: 'Excellent', summary: 'Dussehra festival and blooming coffee shrubs' },
      'November': { tempMin: 14, tempMax: 26, rainChance: 8, condition: 'Cool & Pleasant', suitability: 'Excellent', summary: 'Coffee cherry harvesting begins' },
      'December': { tempMin: 12, tempMax: 25, rainChance: 2, condition: 'Crisp & Misty', suitability: 'Excellent', summary: 'Peak winter mist, pleasant temperatures and cozy valley campfires' }
    },
    stays: [
      {
        id: 'stay-araku-1',
        name: 'Haritha Valley Eco Resort & Cottages',
        type: 'Budget Hotel',
        pricePerNight: 1100,
        rating: 4.6,
        reviewsCount: 310,
        image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=600&q=80',
        amenities: ['Valley View Balcony', 'Traditional Andhra Breakfast', 'Campfire', 'Free Parking', 'Travel Desk'],
        location: 'Near RTC Complex, Araku Valley',
        isBestValue: true
      },
      {
        id: 'stay-araku-2',
        name: 'Coffee Country Plantation Homestay',
        type: 'Homestay',
        pricePerNight: 1600,
        rating: 4.8,
        reviewsCount: 285,
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80',
        amenities: ['Organic Coffee Tasting', 'Homemade Bamboo Chicken', 'Estate Nature Walk', 'Wi-Fi'],
        location: 'Galikonda Road, Araku'
      },
      {
        id: 'stay-araku-3',
        name: 'Tyda Jungle Bells Nature Camp',
        type: '3-Star Hotel',
        pricePerNight: 2400,
        rating: 4.7,
        reviewsCount: 420,
        image: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=600&q=80',
        amenities: ['Jungle Log Huts', 'Bird Watching Trails', 'Rock Climbing Guide', 'Multi-cuisine Dining'],
        location: 'Tyda, 35 km from Araku'
      }
    ],
    situationPhotos: [
      {
        id: 'p-ar-1',
        url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
        caption: 'Misty morning across terraced coffee slopes in Araku Valley',
        category: 'nature',
        seasons: ['December', 'January', 'November', 'February'],
        suitableGroups: ['Friends', 'Couple', 'Family', 'Solo']
      },
      {
        id: 'p-ar-2',
        url: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80',
        caption: 'Majestic million-year-old limestone formations inside Borra Caves',
        category: 'attractions',
        seasons: ['December', 'January', 'November', 'October'],
        suitableGroups: ['Family', 'Friends', 'Couple']
      },
      {
        id: 'p-ar-3',
        url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
        caption: 'Cozy eco-cottages surrounded by organic coffee groves',
        category: 'stays',
        seasons: ['December', 'January', 'February'],
        suitableGroups: ['Couple', 'Family', 'Friends']
      },
      {
        id: 'p-ar-4',
        url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
        caption: 'Authentic wood-smoked Araku Bamboo Chicken delicacy',
        category: 'food',
        seasons: ['December', 'January', 'November'],
        suitableGroups: ['Friends', 'Family', 'Couple']
      },
      {
        id: 'p-ar-5',
        url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80',
        caption: 'Scenic hill hike to Galikonda highest peak viewpoint',
        category: 'adventure',
        seasons: ['December', 'January', 'November'],
        suitableGroups: ['Friends', 'Solo']
      },
      {
        id: 'p-ar-6',
        url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
        caption: 'Winter campfire night with Dhimsa tribal folk music',
        category: 'night',
        seasons: ['December', 'January'],
        suitableGroups: ['Friends', 'Family', 'Couple']
      }
    ],
    suggestedItinerary: [
      {
        day: 1,
        title: 'Scenic Vistadome Train Journey & Araku Arrival',
        morning: 'Board the iconic glass-domed Vistadome express from Visakhapatnam passing 58 tunnels and 84 bridges.',
        afternoon: 'Check-in to valley resort/homestay and savor traditional Andhra meals with fresh filter coffee.',
        evening: 'Visit the Araku Coffee Museum and Padmapuram botanical gardens.',
        dailyCost: 700,
        highlight: 'Vistadome glass roof view through Eastern Ghats tunnels',
        image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80'
      },
      {
        day: 2,
        title: 'Borra Caves & Katiki Waterfalls Trek',
        morning: 'Explore the 150-million-year-old stalactite and stalagmite formations inside illuminated Borra Caves.',
        afternoon: '4x4 jeep safari and scenic trail walk to the cascading Katiki Waterfalls.',
        evening: 'Taste fresh Bamboo Chicken cooked over charcoal and relax by a crackling campfire.',
        dailyCost: 950,
        highlight: 'Ancient underground caverns and Katiki mist spray',
        image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=400&q=80'
      },
      {
        day: 3,
        title: 'Chaparai Water Cascades & Tribal Museum',
        morning: 'Dip your feet in the cool running waters of Chaparai natural rock cascade rapids.',
        afternoon: 'Discover local ethnic art, tools, and handicrafts at the Araku Tribal Cultural Museum.',
        evening: 'Witness an authentic Dhimsa tribal community folk dance performance.',
        dailyCost: 800,
        highlight: 'Chaparai rocky stream sliding and tribal heritage',
        image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=400&q=80'
      },
      {
        day: 4,
        title: 'Galikonda Viewpoint & Organic Coffee Trails',
        morning: 'Sunrise drive to Galikonda (the highest vantage point in Andhra Pradesh) for 360-degree mountain views.',
        afternoon: 'Guided sensory walking tour through shade-grown organic Arabica and Robusta coffee estates.',
        evening: 'Leisurely cafe hopping in town tasting single-estate brews and Madugula halwa.',
        dailyCost: 750,
        highlight: 'Panoramic Eastern Ghats sea-of-clouds view',
        image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=400&q=80'
      },
      {
        day: 5,
        title: 'Tribal Bazaar Shopping & Return Transit',
        morning: 'Shop for single-origin organic Araku coffee powder, wild forest honey, spices, and tribal woodwork.',
        afternoon: 'Farewell lunch and scenic return journey along the ghat road back to Visakhapatnam / home hub.',
        evening: 'Arrival at home hub relaxed with fragrant coffee beans and pleasant memories.',
        dailyCost: 600,
        highlight: 'Taking home GI-tagged authentic Araku valley coffee',
        image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=400&q=80'
      }
    ],
    attractions: ['Borra Caves', 'Katiki Waterfalls', 'Chaparai Waterfalls', 'Araku Coffee Museum', 'Padmapuram Gardens', 'Galikonda Viewpoint'],
    specialtyFood: ['Authentic Araku Bamboo Chicken', 'Bongu Biryani', 'Single-Origin Araku Arabica Coffee', 'Madugula Halwa'],
    suitabilityExplanations: {
      'default': 'Recommended because December offers crisp 12-25°C hill weather, highly affordable stays, and coffee harvest festivals.'
    }
  }
];

