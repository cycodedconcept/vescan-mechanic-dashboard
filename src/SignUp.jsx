import React, { useState } from 'react';
import { Eye, EyeOff, Wrench } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import PrivacyPolicyModal from './components/PrivacyPolicyModal';
import TermsOfUseModal from './components/TermsOfUseModal';
import VescanLoader from './components/VescanLoader';

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    phone_number: '',
    password: '',
    password_confirmation: '',
    agreeToTerms: false
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  
  const navigate = useNavigate();

  const handleChange = (e) => {
    let { name, value, type, checked } = e.target;

    // Strictly accept only numbers for phone_number
    if (name === 'phone_number') {
      value = value.replace(/\D/g, '');
    }

    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const showError = (message) => {
      Swal.fire({ icon: 'error', title: 'Oops...', text: message, confirmButtonColor: '#002C5B' });
    };

    // Frontend Validation
    if (!formData.name.trim()) return showError("Name is required.");
    if (!formData.username.trim()) return showError("Username is required.");
    if (!formData.email.trim()) return showError("Email address is required.");
    if (!formData.phone_number.trim()) return showError("Phone number is required.");
    if (!formData.password) return showError("Password is required.");

    if (formData.password !== formData.password_confirmation) {
      return showError("Passwords do not match.");
    }
    
    if (!formData.agreeToTerms) {
      return showError("You must agree to the Terms of Use and Privacy Policy.");
    }

    setLoading(true);

    try {
      const data = new FormData();
      data.append('name', formData.name);
      data.append('email', formData.email);
      data.append('phone_number', formData.phone_number); 
      data.append('country', 'Nigeria');
      data.append('password', formData.password);
      data.append('password_confirmation', formData.password_confirmation);

      // Using the requested primary API URL
      const response = await fetch('https://zubitechnologies.com/obd_final_apis/api/register_user', {
        method: 'POST',
        body: data,
      });

      const result = await response.json();

      if (response.ok && (result.status === 'success' || result.token)) {
        setSuccess(true);
        setTimeout(() => {
          navigate('/signin');
        }, 3000); // Wait 3 seconds to let the loader play
      } else {
        // Find the first error message returned by the API
        let errorMessage = 'Failed to register account. Please try again.';
        
        if (result.message && typeof result.message === 'string') {
             errorMessage = result.message;
        } else if (result.message && typeof result.message === 'object') {
             errorMessage = Object.values(result.message)[0][0] || errorMessage;
        } else if (typeof result === 'object' && Object.keys(result).length > 0 && !result.status) {
             // API often returns raw validation errors { email: ["taken"], phone: ["required"] } at root
             const firstFieldErrors = Object.values(result)[0];
             if (Array.isArray(firstFieldErrors) && firstFieldErrors.length > 0) {
                 errorMessage = firstFieldErrors[0];
             }
        }
        
        if (errorMessage.toLowerCase().includes('exist') || errorMessage.toLowerCase().includes('taken')) {
            errorMessage = "You already have an account with this email or phone. Please sign in.";
        }
        
        showError(errorMessage);
      }
    } catch (err) {
      showError('A network error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return <VescanLoader />;
  }

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

        <div className="mb-3">
          <input
            type="tel"
            name="phone_number"
            placeholder="Phone number"
            className="form-control border-top-0 border-start-0 border-end-0 rounded-0 ps-0 bg-transparent"
            value={formData.phone_number}
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

        <div className="mb-3 position-relative">
          <input
            type={showConfirmPassword ? "text" : "password"}
            name="password_confirmation"
            placeholder="Confirm Password"
            className="form-control border-top-0 border-start-0 border-end-0 rounded-0 ps-0 bg-transparent"
            value={formData.password_confirmation}
            onChange={handleChange}
            required
          />
          <button
            type="button"
            className="btn border-0 position-absolute top-50 end-0 translate-middle-y text-muted p-0"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            style={{ zIndex: 10 }}
          >
            {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
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
            I agree with <a href="#!" data-bs-toggle="modal" data-bs-target="#privacyModal" className="text-dark fw-bold text-decoration-none">Privacy Policy</a> and <a href="#!" data-bs-toggle="modal" data-bs-target="#termsModal" className="text-dark fw-bold text-decoration-none">Terms of Use</a>
          </label>
        </div>

        <button type="submit" className="btn btn-primary w-100 py-2 fw-semibold" disabled={loading}>
          {loading ? (
             <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
          ) : (
            "Sign Up"
          )}
        </button>
      </form>

      {/* Modals */}
      <PrivacyPolicyModal />
      <TermsOfUseModal />
    </>
  );
};

export default SignUp;
