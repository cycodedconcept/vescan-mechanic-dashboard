import React, { useState } from 'react';
import { Eye, EyeOff, Wrench } from 'lucide-react';
import { Link } from 'react-router-dom';

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    agreeToTerms: false
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
    <>
      <h1 className="fw-bold mb-2 text-dark">Sign up</h1>
      <p className="text-muted mb-4">
        Already have an account? <Link to="/signin" className="text-decoration-none fw-semibold text-custom-blue">Sign In</Link>
      </p>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            type="text"
            name="name"
            placeholder="Your name"
            className="form-control border-top-0 border-start-0 border-end-0 rounded-0 ps-0 bg-transparent"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <input
            type="text"
            name="username"
            placeholder="Username"
            className="form-control border-top-0 border-start-0 border-end-0 rounded-0 ps-0 bg-transparent"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <input
            type="email"
            name="email"
            placeholder="Email address"
            className="form-control border-top-0 border-start-0 border-end-0 rounded-0 ps-0 bg-transparent"
            value={formData.email}
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

        <div className="mb-4 form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="agreeToTerms"
            name="agreeToTerms"
            checked={formData.agreeToTerms}
            onChange={handleChange}
            required
          />
          <label htmlFor="agreeToTerms" className="form-check-label text-muted small">
            I agree with <b className="text-dark">Privacy Policy</b> and <b className="text-dark">Terms of Use</b>
          </label>
        </div>

        <button type="submit" className="btn btn-primary w-100 py-2 fw-semibold">
          Sign Up
        </button>
      </form>
    </>
  );
};

export default SignUp;
