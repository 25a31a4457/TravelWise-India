# TravelWise India 🧭
> **Tagline:** “Plan smarter. Travel beautifully.”

TravelWise India is an intelligent tourism planning and demand forecasting web application designed specifically for the diverse travel landscapes of India. The platform helps travelers discover affordable, weather-safe, and personalized itineraries matching their budget, travel month, stay preference, group style, and travel interests.

In addition, it provides a comprehensive **Tourism Demand Forecasting Dashboard** for travel planners, homestay operators, and administrators to evaluate upcoming seasonal influx and hotel occupancy.

---

## 🌟 Key Features

### 1. 🧳 Trip Planner & Budget Calibration
- **Origin City Awareness**: Pre-calculated round-trip transit estimates from 10 major Indian hubs: *Bengaluru, Mumbai, Delhi, Chennai, Hyderabad, Kolkata, Pune, Ahmedabad, Kochi, and Jaipur*.
- **INR Budget Fit**: Calibrates total costs including transit, stays, food, sightseeing, and emergency buffers.
- **Duration & Style**: Customize days, nights, group types (*Solo, Couple, Family, Friends*), accommodation tiers (*Hostel, Budget Hotel, Homestay, 3-Star, 4-Star, Luxury Resort*), and travel pace (*Relaxed, Balanced, Packed*).
- **Default Demo Preset**: Easily one-click reset to the default demo scenario (*Bengaluru, ₹25,000, December 2026, 5 Days/4 Nights, Friends, Homestay, Mountains & Nature*).

### 2. 🎯 Recommendation Engine
- **Weighted 5-Pillar Scoring Model**:
  $$\text{Final Score} = 0.40 \times \text{BudgetFit} + 0.25 \times \text{WeatherFit} + 0.20 \times \text{InterestMatch} + 0.10 \times \text{StayFit} + 0.05 \times \text{GroupFit}$$
- **12+ Iconic Indian Destinations**: Coorg, Munnar, Chikmagalur, Ooty, Goa, Manali, Jaipur, Rishikesh, Varanasi, Andaman & Nicobar, Ladakh, Udaipur.
- **Dynamic Reasoning**: Meaningful qualitative explanations on why each destination was picked.
- **Instant Budget Slider**: Tweak your budget on the recommendations page and see re-ranking happen in real time.

### 3. 🔍 Side-by-Side Trip Comparison
- Compare up to 3 destinations side-by-side with match score breakdowns, weather summaries, stay tariffs, and cost savings.

### 4. 📸 Situation-Aware Photo Gallery
- Curated high-resolution destination galleries contextualized to the travel month, season, group type, and weather conditions.
- Categorized filters: *All, Nature, Stays, Food, Attractions, Adventure, Night View* with interactive lightbox view.

### 5. 🗺️ Day-by-Day Dynamic Itineraries & Printable PDF
- Morning, afternoon, and evening timelines with daily expense estimates and highlights.
- Integrated **Printable Itinerary Modal** with native print formatting.

### 6. 📊 Tourism Demand Forecasting Dashboard
- 12-month historical demand curve vs. 3, 6, or 12-month predictive forecasts.
- Recharts Composed Area/Line charts with 95% confidence interval bands.
- Dynamic metric selector: *Tourist Arrivals, Hotel Occupancy %, Estimated Tourism Revenue, and Booking Demand Index*.
- Qualitative insight generator explaining seasonal drivers (monsoons, festivals, school holidays).

---

## 🛠️ Technology Stack
- **Framework:** React 18 + Vite + TypeScript
- **Styling:** Tailwind CSS (custom Indian travel brand theme)
- **Icons:** Lucide React
- **Routing:** React Router DOM (v6)
- **Visualizations:** Recharts (v2.15)
- **Data Persistence:** LocalStorage for saved trips & user preferences

---

## 🚀 Getting Started

### 1. Set Active Workspace
Open this directory in your IDE or terminal:
```bash
cd C:\Users\KALYAN\.gemini\antigravity\scratch\travelwise-india
```

### 2. Run the Development Server
```bash
npm run dev
```
Open your browser at `http://localhost:3000` (or the port displayed in terminal).

### 3. Build for Production
```bash
npm run build
npm run preview
```

---

## 📌 Demo Data Disclaimer
*TravelWise India* is a concept application. All pricing models, weather forecasts, and predictive metrics represent curated mock/demo data for decision support demonstration.
