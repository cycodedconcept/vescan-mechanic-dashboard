import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SignUp from './SignUp';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<Navigate to="/signup" replace />} />
        {/* Placeholder for Sign In if needed later */}
        <Route path="/signin" element={<div>Sign In Page (To be implemented)</div>} />
      </Routes>
    </Router>
  );
}

export default App;
