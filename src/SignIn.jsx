import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import PrivacyPolicyModal from './components/PrivacyPolicyModal';
import TermsOfUseModal from './components/TermsOfUseModal';
import VescanLoader from './components/VescanLoader';

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
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

    if (!formData.email.trim()) return showError("Email address is required.");
    if (!formData.password) return showError("Password is required.");

    setLoading(true);

    // Helper function for API calls testing both URLs
    const fetchWithFallback = async (endpoint, payloadData) => {
      const urls = [
        `https://zubitechnologies.com/obd_final_apis/api/${endpoint}`
      ];
      
      let lastError = null;

      for (const url of urls) {
        try {
          const response = await fetch(url, {
            method: 'POST',
            body: payloadData,
          });

          const result = await response.json();
          
          if (response.ok && (result.token || result.status === 'success')) {
            return { ok: true, result };
          } else {
             lastError = { ok: false, result };
             if (response.status === 400 || response.status === 401) {
                 // Try the other URL in case account exists there
                 continue;
             }
             break;
          }
        } catch (err) {
          lastError = { ok: false, error: err };
          continue;
        }
      }
      return lastError;
    };

    try {
      const data = new FormData();
      data.append('email', formData.email);
      data.append('password', formData.password);

      const responseObj = await fetchWithFallback('login_user', data);

      if (responseObj && responseObj.ok) {
        const result = responseObj.result;
        // Save the token if rememberMe is checked, or use standard localStorage
        localStorage.setItem('vescan_token', result.token);
        if (result.user) localStorage.setItem('vescan_user', JSON.stringify(result.user));
        
        setSuccess(true);
        setTimeout(() => {
          navigate('/dashboard');
        }, 3000);
      } else {
        const result = responseObj?.result || {};
        let errorMessage = 'Failed to sign in. Please check your credentials.';
        
        if (result.message && typeof result.message === 'string') {
             errorMessage = result.message;
        } else if (result.message && typeof result.message === 'object') {
             errorMessage = Object.values(result.message)[0][0] || errorMessage;
        } else if (typeof result === 'object' && Object.keys(result).length > 0 && !result.status) {
             const firstFieldErrors = Object.values(result)[0];
             if (Array.isArray(firstFieldErrors) && firstFieldErrors.length > 0) {
                 errorMessage = firstFieldErrors[0];
             }
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
      <h1 className="fw-bold mb-2 text-dark">Sign In</h1>
      <p className="text-muted mb-4">
        Don't have an account yet? <Link to="/signup" className="text-decoration-none fw-semibold text-custom-blue">Sign Up</Link>
      </p>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            type="email"
            name="email"
            placeholder="Your email address"
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

        <button type="submit" className="btn btn-primary w-100 py-2 fw-semibold" disabled={loading}>
          {loading ? (
             <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
          ) : (
            "Sign In"
          )}
        </button>
      </form>
      
      <div className="text-center mt-4">
        <small className="text-muted">
          By signing in, you agree to our <a href="#!" data-bs-toggle="modal" data-bs-target="#privacyModal" className="text-dark text-decoration-none fw-semibold">Privacy Policy</a> and <a href="#!" data-bs-toggle="modal" data-bs-target="#termsModal" className="text-dark text-decoration-none fw-semibold">Terms of Use</a>.
        </small>
      </div>

      {/* Modals */}
      <PrivacyPolicyModal />
      <TermsOfUseModal />
    </>
  );
};

export default SignIn;
