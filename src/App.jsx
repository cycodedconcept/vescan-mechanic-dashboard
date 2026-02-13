import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import SignUp from './SignUp';
import SignIn from './SignIn';
import Dashboard from './pages/Dashboard';
import Services from './pages/Services';
import Financial from './pages/Financial';
import Customers from './pages/Customers';
import Vehicles from './pages/Vehicles';
import PageTransition from './PageTransition';
import './App.css';

import MainLayout from './components/MainLayout';

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
      <Routes location={location}>
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
        </Route>

        <Route path="/" element={<Navigate to="/signup" replace />} />
      </Routes>
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
