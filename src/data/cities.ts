export interface CityOption {
  id: string;
  name: string;
  state: string;
  region: 'South' | 'North' | 'West' | 'East' | 'Central' | 'Northeast';
  aliases: string[];
  popular?: boolean;
  latitude: number;
  longitude: number;
  coordinates: {
    lat: number;
    lng: number;
  };
  supported: boolean;
}

export const INDIAN_CITIES: CityOption[] = [
  // --- Andhra Pradesh ---
  {
    id: 'visakhapatnam',
    name: 'Visakhapatnam',
    state: 'Andhra Pradesh',
    region: 'South',
    aliases: ['vizag', 'waltair', 'city of destiny'],
    popular: true,
    latitude: 17.6868,
    longitude: 83.2185,
    coordinates: { lat: 17.6868, lng: 83.2185 },
    supported: true
  },
  {
    id: 'vijayawada',
    name: 'Vijayawada',
    state: 'Andhra Pradesh',
    region: 'South',
    aliases: ['bezawada', 'kanaka durga city'],
    popular: true,
    latitude: 16.5062,
    longitude: 80.6480,
    coordinates: { lat: 16.5062, lng: 80.6480 },
    supported: true
  },
  {
    id: 'rajahmundry',
    name: 'Rajahmundry',
    state: 'Andhra Pradesh',
    region: 'South',
    aliases: ['rajamahendravaram', 'godavari city'],
    popular: true,
    latitude: 17.0005,
    longitude: 81.8040,
    coordinates: { lat: 17.0005, lng: 81.8040 },
    supported: true
  },
  {
    id: 'tirupati',
    name: 'Tirupati',
    state: 'Andhra Pradesh',
    region: 'South',
    aliases: ['tirumala', 'balaji', 'spiritual capital of ap'],
    popular: true,
    latitude: 13.6288,
    longitude: 79.4192,
    coordinates: { lat: 13.6288, lng: 79.4192 },
    supported: true
  },
  {
    id: 'araku-valley',
    name: 'Araku Valley',
    state: 'Andhra Pradesh',
    region: 'South',
    aliases: ['araku', 'andhra ooty', 'coffee valley'],
    popular: true,
    latitude: 18.3273,
    longitude: 82.8775,
    coordinates: { lat: 18.3273, lng: 82.8775 },
    supported: true
  },
  {
    id: 'guntur',
    name: 'Guntur',
    state: 'Andhra Pradesh',
    region: 'South',
    aliases: ['chilli city'],
    latitude: 16.3067,
    longitude: 80.4365,
    coordinates: { lat: 16.3067, lng: 80.4365 },
    supported: true
  },
  {
    id: 'nellore',
    name: 'Nellore',
    state: 'Andhra Pradesh',
    region: 'South',
    aliases: ['simhapuri'],
    latitude: 14.4426,
    longitude: 79.9865,
    coordinates: { lat: 14.4426, lng: 79.9865 },
    supported: true
  },
  {
    id: 'kurnool',
    name: 'Kurnool',
    state: 'Andhra Pradesh',
    region: 'South',
    aliases: ['gateway to rayalaseema'],
    latitude: 15.8281,
    longitude: 78.0373,
    coordinates: { lat: 15.8281, lng: 78.0373 },
    supported: true
  },
  {
    id: 'kakinada',
    name: 'Kakinada',
    state: 'Andhra Pradesh',
    region: 'South',
    aliases: ['cocanada', 'fertilizer city'],
    latitude: 16.9891,
    longitude: 82.2475,
    coordinates: { lat: 16.9891, lng: 82.2475 },
    supported: true
  },
  {
    id: 'anantapur',
    name: 'Anantapur',
    state: 'Andhra Pradesh',
    region: 'South',
    aliases: ['anantapuramu'],
    latitude: 14.6819,
    longitude: 77.6006,
    coordinates: { lat: 14.6819, lng: 77.6006 },
    supported: true
  },

  // --- Telangana ---
  {
    id: 'hyderabad',
    name: 'Hyderabad',
    state: 'Telangana',
    region: 'South',
    aliases: ['secunderabad', 'cyberabad', 'city of pearls', 'hyd'],
    popular: true,
    latitude: 17.3850,
    longitude: 78.4867,
    coordinates: { lat: 17.3850, lng: 78.4867 },
    supported: true
  },
  {
    id: 'warangal',
    name: 'Warangal',
    state: 'Telangana',
    region: 'South',
    aliases: ['orugallu', 'ekasila nagaram'],
    latitude: 17.9689,
    longitude: 79.5941,
    coordinates: { lat: 17.9689, lng: 79.5941 },
    supported: true
  },

  // --- Karnataka ---
  {
    id: 'bengaluru',
    name: 'Bengaluru',
    state: 'Karnataka',
    region: 'South',
    aliases: ['bangalore', 'silicon valley of india', 'garden city', 'blr'],
    popular: true,
    latitude: 12.9716,
    longitude: 77.5946,
    coordinates: { lat: 12.9716, lng: 77.5946 },
    supported: true
  },
  {
    id: 'coorg',
    name: 'Coorg (Madikeri)',
    state: 'Karnataka',
    region: 'South',
    aliases: ['coorg', 'madikeri', 'kodagu', 'scotland of india'],
    popular: true,
    latitude: 12.4244,
    longitude: 75.7382,
    coordinates: { lat: 12.4244, lng: 75.7382 },
    supported: true
  },
  {
    id: 'chikmagalur',
    name: 'Chikmagalur',
    state: 'Karnataka',
    region: 'South',
    aliases: ['chikkamagaluru', 'coffee land of karnataka', 'mullayanagiri'],
    popular: true,
    latitude: 13.3161,
    longitude: 75.7720,
    coordinates: { lat: 13.3161, lng: 75.7720 },
    supported: true
  },
  {
    id: 'mysuru',
    name: 'Mysuru',
    state: 'Karnataka',
    region: 'South',
    aliases: ['mysore', 'heritage city of karnataka', 'palace city'],
    popular: true,
    latitude: 12.2958,
    longitude: 76.6394,
    coordinates: { lat: 12.2958, lng: 76.6394 },
    supported: true
  },
  {
    id: 'mangaluru',
    name: 'Mangaluru',
    state: 'Karnataka',
    region: 'South',
    aliases: ['mangalore', 'kudla'],
    latitude: 12.9141,
    longitude: 74.8560,
    coordinates: { lat: 12.9141, lng: 74.8560 },
    supported: true
  },
  {
    id: 'hubballi',
    name: 'Hubballi',
    state: 'Karnataka',
    region: 'South',
    aliases: ['hubli', 'chhota mumbai'],
    latitude: 15.3647,
    longitude: 75.1240,
    coordinates: { lat: 15.3647, lng: 75.1240 },
    supported: true
  },

  // --- Tamil Nadu ---
  {
    id: 'chennai',
    name: 'Chennai',
    state: 'Tamil Nadu',
    region: 'South',
    aliases: ['madras', 'gateway to south india', 'detroit of asia'],
    popular: true,
    latitude: 13.0827,
    longitude: 80.2707,
    coordinates: { lat: 13.0827, lng: 80.2707 },
    supported: true
  },
  {
    id: 'ooty',
    name: 'Ooty',
    state: 'Tamil Nadu',
    region: 'South',
    aliases: ['udhagamandalam', 'queen of hill stations', 'nilgiris'],
    popular: true,
    latitude: 11.4102,
    longitude: 76.6950,
    coordinates: { lat: 11.4102, lng: 76.6950 },
    supported: true
  },
  {
    id: 'coimbatore',
    name: 'Coimbatore',
    state: 'Tamil Nadu',
    region: 'South',
    aliases: ['kovai', 'manchester of south india'],
    popular: true,
    latitude: 11.0168,
    longitude: 76.9558,
    coordinates: { lat: 11.0168, lng: 76.9558 },
    supported: true
  },
  {
    id: 'madurai',
    name: 'Madurai',
    state: 'Tamil Nadu',
    region: 'South',
    aliases: ['temple city', 'city of nectar', 'thoonga nagaram'],
    latitude: 9.9252,
    longitude: 78.1198,
    coordinates: { lat: 9.9252, lng: 78.1198 },
    supported: true
  },

  // --- Kerala ---
  {
    id: 'kochi',
    name: 'Kochi',
    state: 'Kerala',
    region: 'South',
    aliases: ['cochin', 'ernakulam', 'queen of the arabian sea'],
    popular: true,
    latitude: 9.9312,
    longitude: 76.2673,
    coordinates: { lat: 9.9312, lng: 76.2673 },
    supported: true
  },
  {
    id: 'munnar',
    name: 'Munnar',
    state: 'Kerala',
    region: 'South',
    aliases: ['kashmir of south india', 'tea garden hills', 'idukki'],
    popular: true,
    latitude: 10.0889,
    longitude: 77.0595,
    coordinates: { lat: 10.0889, lng: 77.0595 },
    supported: true
  },
  {
    id: 'thiruvananthapuram',
    name: 'Thiruvananthapuram',
    state: 'Kerala',
    region: 'South',
    aliases: ['trivandrum'],
    latitude: 8.5241,
    longitude: 76.9366,
    coordinates: { lat: 8.5241, lng: 76.9366 },
    supported: true
  },
  {
    id: 'kozhikode',
    name: 'Kozhikode',
    state: 'Kerala',
    region: 'South',
    aliases: ['calicut', 'city of spices'],
    latitude: 11.2588,
    longitude: 75.7804,
    coordinates: { lat: 11.2588, lng: 75.7804 },
    supported: true
  },

  // --- Maharashtra ---
  {
    id: 'mumbai',
    name: 'Mumbai',
    state: 'Maharashtra',
    region: 'West',
    aliases: ['bombay', 'financial capital', 'city of dreams', 'bom'],
    popular: true,
    latitude: 19.0760,
    longitude: 72.8777,
    coordinates: { lat: 19.0760, lng: 72.8777 },
    supported: true
  },
  {
    id: 'pune',
    name: 'Pune',
    state: 'Maharashtra',
    region: 'West',
    aliases: ['poona', 'oxford of the east'],
    popular: true,
    latitude: 18.5204,
    longitude: 73.8567,
    coordinates: { lat: 18.5204, lng: 73.8567 },
    supported: true
  },
  {
    id: 'nagpur',
    name: 'Nagpur',
    state: 'Maharashtra',
    region: 'Central',
    aliases: ['orange city'],
    popular: true,
    latitude: 21.1458,
    longitude: 79.0882,
    coordinates: { lat: 21.1458, lng: 79.0882 },
    supported: true
  },
  {
    id: 'nashik',
    name: 'Nashik',
    state: 'Maharashtra',
    region: 'West',
    aliases: ['wine capital of india'],
    latitude: 19.9975,
    longitude: 73.7898,
    coordinates: { lat: 19.9975, lng: 73.7898 },
    supported: true
  },

  // --- Delhi NCR ---
  {
    id: 'delhi',
    name: 'Delhi',
    state: 'National Capital Territory of Delhi',
    region: 'North',
    aliases: ['new delhi', 'ncr', 'delhi ncr', 'capital', 'dilli'],
    popular: true,
    latitude: 28.6139,
    longitude: 77.2090,
    coordinates: { lat: 28.6139, lng: 77.2090 },
    supported: true
  },

  // --- Rajasthan ---
  {
    id: 'jaipur',
    name: 'Jaipur',
    state: 'Rajasthan',
    region: 'North',
    aliases: ['pink city', 'rajputana capital'],
    popular: true,
    latitude: 26.9124,
    longitude: 75.7873,
    coordinates: { lat: 26.9124, lng: 75.7873 },
    supported: true
  },
  {
    id: 'udaipur',
    name: 'Udaipur',
    state: 'Rajasthan',
    region: 'North',
    aliases: ['city of lakes', 'venice of the east', 'white city'],
    popular: true,
    latitude: 24.5854,
    longitude: 73.7125,
    coordinates: { lat: 24.5854, lng: 73.7125 },
    supported: true
  },
  {
    id: 'jodhpur',
    name: 'Jodhpur',
    state: 'Rajasthan',
    region: 'North',
    aliases: ['blue city', 'sun city'],
    latitude: 26.2389,
    longitude: 73.0243,
    coordinates: { lat: 26.2389, lng: 73.0243 },
    supported: true
  },

  // --- Goa ---
  {
    id: 'goa',
    name: 'Goa',
    state: 'Goa',
    region: 'West',
    aliases: ['panaji', 'madgaon', 'north goa', 'south goa', 'calangute'],
    popular: true,
    latitude: 15.2993,
    longitude: 74.1240,
    coordinates: { lat: 15.2993, lng: 74.1240 },
    supported: true
  },

  // --- Himachal Pradesh ---
  {
    id: 'manali',
    name: 'Manali',
    state: 'Himachal Pradesh',
    region: 'North',
    aliases: ['kullu manali', 'valley of the gods', 'solang'],
    popular: true,
    latitude: 32.2396,
    longitude: 77.1887,
    coordinates: { lat: 32.2396, lng: 77.1887 },
    supported: true
  },
  {
    id: 'shimla',
    name: 'Shimla',
    state: 'Himachal Pradesh',
    region: 'North',
    aliases: ['queen of hills', 'simla'],
    latitude: 31.1048,
    longitude: 77.1734,
    coordinates: { lat: 31.1048, lng: 77.1734 },
    supported: true
  },

  // --- Uttarakhand ---
  {
    id: 'rishikesh',
    name: 'Rishikesh',
    state: 'Uttarakhand',
    region: 'North',
    aliases: ['yoga capital of the world', 'gateway to garhwal himalayas', 'haridwar rishikesh'],
    popular: true,
    latitude: 30.0869,
    longitude: 78.2676,
    coordinates: { lat: 30.0869, lng: 78.2676 },
    supported: true
  },
  {
    id: 'dehradun',
    name: 'Dehradun',
    state: 'Uttarakhand',
    region: 'North',
    aliases: ['doon valley'],
    latitude: 30.3165,
    longitude: 78.0322,
    coordinates: { lat: 30.3165, lng: 78.0322 },
    supported: true
  },

  // --- Uttar Pradesh ---
  {
    id: 'varanasi',
    name: 'Varanasi',
    state: 'Uttar Pradesh',
    region: 'North',
    aliases: ['kashi', 'banaras', 'benares', 'spiritual capital of india'],
    popular: true,
    latitude: 25.3176,
    longitude: 82.9739,
    coordinates: { lat: 25.3176, lng: 82.9739 },
    supported: true
  },
  {
    id: 'agra',
    name: 'Agra',
    state: 'Uttar Pradesh',
    region: 'North',
    aliases: ['taj city', 'city of the taj mahal'],
    latitude: 27.1767,
    longitude: 78.0081,
    coordinates: { lat: 27.1767, lng: 78.0081 },
    supported: true
  },
  {
    id: 'lucknow',
    name: 'Lucknow',
    state: 'Uttar Pradesh',
    region: 'North',
    aliases: ['city of nawabs'],
    popular: true,
    latitude: 26.8467,
    longitude: 80.9462,
    coordinates: { lat: 26.8467, lng: 80.9462 },
    supported: true
  },

  // --- Gujarat ---
  {
    id: 'ahmedabad',
    name: 'Ahmedabad',
    state: 'Gujarat',
    region: 'West',
    aliases: ['amdavad', 'manchester of india'],
    popular: true,
    latitude: 23.0225,
    longitude: 72.5714,
    coordinates: { lat: 23.0225, lng: 72.5714 },
    supported: true
  },
  {
    id: 'surat',
    name: 'Surat',
    state: 'Gujarat',
    region: 'West',
    aliases: ['diamond city of the world'],
    latitude: 21.1702,
    longitude: 72.8311,
    coordinates: { lat: 21.1702, lng: 72.8311 },
    supported: true
  },

  // --- West Bengal ---
  {
    id: 'kolkata',
    name: 'Kolkata',
    state: 'West Bengal',
    region: 'East',
    aliases: ['calcutta', 'city of joy', 'cultural capital'],
    popular: true,
    latitude: 22.5726,
    longitude: 88.3639,
    coordinates: { lat: 22.5726, lng: 88.3639 },
    supported: true
  },

  // --- Punjab & Chandigarh ---
  {
    id: 'chandigarh',
    name: 'Chandigarh',
    state: 'Punjab / Haryana',
    region: 'North',
    aliases: ['the city beautiful'],
    popular: true,
    latitude: 30.7333,
    longitude: 76.7794,
    coordinates: { lat: 30.7333, lng: 76.7794 },
    supported: true
  },
  {
    id: 'amritsar',
    name: 'Amritsar',
    state: 'Punjab',
    region: 'North',
    aliases: ['golden temple city', 'ambarsar'],
    popular: true,
    latitude: 31.6340,
    longitude: 74.8723,
    coordinates: { lat: 31.6340, lng: 74.8723 },
    supported: true
  },

  // --- Madhya Pradesh ---
  {
    id: 'bhopal',
    name: 'Bhopal',
    state: 'Madhya Pradesh',
    region: 'Central',
    aliases: ['city of lakes mp'],
    popular: true,
    latitude: 23.2599,
    longitude: 77.4126,
    coordinates: { lat: 23.2599, lng: 77.4126 },
    supported: true
  },
  {
    id: 'indore',
    name: 'Indore',
    state: 'Madhya Pradesh',
    region: 'Central',
    aliases: ['cleanest city in india', 'commercial capital of mp'],
    popular: true,
    latitude: 22.7196,
    longitude: 75.8577,
    coordinates: { lat: 22.7196, lng: 75.8577 },
    supported: true
  },

  // --- Odisha & Assam ---
  {
    id: 'bhubaneswar',
    name: 'Bhubaneswar',
    state: 'Odisha',
    region: 'East',
    aliases: ['temple city of india'],
    latitude: 20.2961,
    longitude: 85.8245,
    coordinates: { lat: 20.2961, lng: 85.8245 },
    supported: true
  },
  {
    id: 'guwahati',
    name: 'Guwahati',
    state: 'Assam',
    region: 'Northeast',
    aliases: ['gateway to northeast india'],
    popular: true,
    latitude: 26.1445,
    longitude: 91.7362,
    coordinates: { lat: 26.1445, lng: 91.7362 },
    supported: true
  }
];

/**
 * Searches cities with whitespace normalization, case-insensitive partial matching, and alias support.
 */
export function searchCities(query: string): CityOption[] {
  const cleanQuery = query.trim().toLowerCase().replace(/\s+/g, ' ');
  if (!cleanQuery) {
    return INDIAN_CITIES.filter(c => c.popular);
  }

  return INDIAN_CITIES.filter(city => {
    const nameMatch = city.name.toLowerCase().includes(cleanQuery);
    const stateMatch = city.state.toLowerCase().includes(cleanQuery);
    const idMatch = city.id.toLowerCase().includes(cleanQuery);
    const aliasMatch = city.aliases.some(a => a.toLowerCase().includes(cleanQuery));
    return nameMatch || stateMatch || idMatch || aliasMatch;
  });
}

/**
 * Finds a city by name, id, or alias.
 */
export function getCityByName(nameOrId: string): CityOption | undefined {
  if (!nameOrId) return undefined;
  const clean = nameOrId.trim().toLowerCase().replace(/\s+/g, ' ');
  return INDIAN_CITIES.find(
    c => c.name.toLowerCase() === clean || 
         c.id.toLowerCase() === clean || 
         c.aliases.some(a => a.toLowerCase() === clean)
  );
}
