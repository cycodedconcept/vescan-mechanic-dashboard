import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Link } from 'react-router-dom';

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    rememberMe: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Add logic here (e.g., API call)
  };

  return (
    <div className="container-fluid min-vh-100 p-0">
      <div className="row g-0 min-vh-100">
        {/* Left Side - Image */}
        <div className="col-lg-6 mechanic-bg">
        </div>
        
        {/* Right Side - Form */}
        <div className="col-lg-6 d-flex justify-content-center align-items-center bg-white py-5">
          <div className="w-100 p-4" style={{ maxWidth: '400px' }}>
            <h1 className="fw-bold mb-2 text-dark">Sign In</h1>
            <p className="text-muted mb-4">
              Don't have an account yet? <Link to="/signup" className="text-decoration-none fw-semibold text-custom-blue">Sign Up</Link>
            </p>

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <input
                  type="text"
                  name="username"
                  placeholder="Your username or email address"
                  className="form-control border-top-0 border-start-0 border-end-0 rounded-0 ps-0 bg-transparent"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3 position-relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  className="form-control border-top-0 border-start-0 border-end-0 rounded-0 ps-0 bg-transparent"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  className="btn border-0 position-absolute top-50 end-0 translate-middle-y text-muted p-0"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ zIndex: 10 }}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              <div className="mb-4 d-flex justify-content-between align-items-center">
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="rememberMe"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                  />
                  <label htmlFor="rememberMe" className="form-check-label text-muted small">
                    Remember me
                  </label>
                </div>
                <Link to="/forgot-password" className="text-decoration-none small text-dark fw-bold">
                  Forgot Password?
                </Link>
              </div>

              <button type="submit" className="btn btn-primary w-100 py-2 fw-semibold">
                Sign In
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
