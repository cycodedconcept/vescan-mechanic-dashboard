import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import SignUp from './SignUp';
import SignIn from './SignIn';
import Dashboard from './pages/Dashboard';
import PageTransition from './PageTransition';
import './App.css';

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
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
        <Route 
          path="/dashboard" 
          element={
            <PageTransition>
              <Dashboard />
            </PageTransition>
          } 
        />
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
