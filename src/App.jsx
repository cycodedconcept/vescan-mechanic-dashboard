import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import SignUp from './SignUp';
import SignIn from './SignIn';
import Dashboard from './pages/Dashboard';
import Services from './pages/Services';
import Financial from './pages/Financial';
import Customers from './pages/Customers';
import Vehicles from './pages/Vehicles';
import Ecommerce from './pages/Ecommerce';
import PageTransition from './PageTransition';
import AuthLayout from './components/AuthLayout';
import './App.css';

import MainLayout from './components/MainLayout';

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Auth Routes with Shared Layout */}
        <Route element={<AuthLayout />}>
          <Route 
            path="/signup" 
            element={
              <PageTransition>
                <SignUp />
              </PageTransition>
            } 
          />
          <Route 
            path="/signin" 
            element={
              <PageTransition>
                <SignIn />
              </PageTransition>
            } 
          />
        </Route>
        
        {/* Protected Dashboard Routes */}
        <Route element={<MainLayout />}>
          <Route 
            path="/dashboard" 
            element={<Dashboard />} 
          />
          <Route 
            path="/services" 
            element={<Services />} 
          />
          <Route 
            path="/financial" 
            element={<Financial />} 
          />
          <Route 
            path="/customers" 
            element={<Customers />} 
          />
          <Route 
            path="/vehicles" 
            element={<Vehicles />} 
          />
          <Route 
            path="/ecommerce" 
            element={<Ecommerce />} 
          />
        </Route>

        <Route path="/" element={<Navigate to="/signup" replace />} />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <Router>
      <AnimatedRoutes />
    </Router>
  );
}

export default App;
