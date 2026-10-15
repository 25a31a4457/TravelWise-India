import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { TripProvider } from './context/TripContext';
import { AuthProvider } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ToastContainer } from './components/ToastContainer';
import { ScrollToTop } from './components/ScrollToTop';

// Pages
import { HomePage } from './pages/HomePage';
import { TripPlannerPage } from './pages/TripPlannerPage';
import { RecommendationsPage } from './pages/RecommendationsPage';
import { DestinationDetailsPage } from './pages/DestinationDetailsPage';
import { DemandDashboardPage } from './pages/DemandDashboardPage';
import { AboutPage } from './pages/AboutPage';
import { SavedTripsPage } from './pages/SavedTripsPage';
import { CityExplorerPage } from './pages/CityExplorerPage';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <TripProvider>
        <BrowserRouter>
          <ScrollToTop />
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/plan" element={<TripPlannerPage />} />
                <Route path="/recommendations" element={<RecommendationsPage />} />
                <Route path="/destination/:id" element={<DestinationDetailsPage />} />
                <Route path="/destinations/:id" element={<DestinationDetailsPage />} />
                <Route path="/forecast" element={<DemandDashboardPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/saved" element={<SavedTripsPage />} />
                <Route path="/history" element={<SavedTripsPage />} />
                <Route path="/saved-plans" element={<Navigate to="/saved" replace />} />
                <Route path="/explore-cities" element={<CityExplorerPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>
            <Footer />
            <ToastContainer />
          </div>
        </BrowserRouter>
      </TripProvider>
    </AuthProvider>
  );
};

export default App;
