import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import PrivacyPolicyModal from './components/PrivacyPolicyModal';
import TermsOfUseModal from './components/TermsOfUseModal';
import VescanLoader from './components/VescanLoader';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1: Email, 2: OTP, 3: New Password
  
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  
  const [isLoading, setIsLoading] = useState(false);

  // Helper function for API calls testing both URLs
  const fetchWithFallback = async (endpoint, formData) => {
    const urls = [
      `https://zubitechnologies.com/obd_final_apis/api/${endpoint}`
    ];
    
    let lastError = null;

    for (const url of urls) {
      try {
        const response = await fetch(url, {
          method: 'POST',
          body: formData,
        });

        const data = await response.json();
        
        // If the request was successful, return the data
        if (response.ok && data.status !== "false" && data.status !== false && data.status !== "error") {
          return data;
        } else {
          // It's a structured error from the server (e.g. wrong OTP)
          throw new Error(data.message || 'API error');
        }
      } catch (err) {
        lastError = err;
        // If the error seems to be a network error (like ERR_NAME_NOT_RESOLVED), try the next URL
        if (err.message === 'Failed to fetch' || err.name === 'TypeError') {
            continue;
        } else {
            // It was a recognized API error (like "Invalid OTP"), so break the loop and throw it
            break;
        }
      }
    }

    throw lastError || new Error("Failed to connect to the server.");
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append('email', email);

      const data = await fetchWithFallback('user_email_confirm', formData);
      
      Swal.fire({
        icon: 'success',
        title: 'Email Confirmed',
        text: 'An OTP has been sent to your email address.',
        confirmButtonColor: '#0055ba'
      });
      
      setStep(2);
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: err.message || 'Could not verify email. Please try again.',
        confirmButtonColor: '#0055ba'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append('email', email);
      formData.append('otp', otp);

      const data = await fetchWithFallback('user_verify_otp', formData);
      
      Swal.fire({
        icon: 'success',
        title: 'OTP Verified',
        text: 'Please enter your new password.',
        timer: 1500,
        showConfirmButton: false
      });
      
      setStep(3);
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid OTP',
        text: err.message || 'The OTP entered is incorrect. Please try again.',
        confirmButtonColor: '#0055ba'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    
    if (password !== passwordConfirm) {
      Swal.fire({
        icon: 'error',
        title: 'Passwords Mismatch',
        text: 'The passwords do not match. Please try again.',
        confirmButtonColor: '#0055ba'
      });
      return;
    }

    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append('email', email);
      formData.append('password', password);
      formData.append('password_confirmation', passwordConfirm);

      const data = await fetchWithFallback('user_update_password', formData);
      
      Swal.fire({
        icon: 'success',
        title: 'Password Updated!',
        text: 'Your password has been successfully reset.',
        confirmButtonColor: '#0055ba'
      }).then(() => {
        navigate('/signin');
      });
      
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Error Reseting Password',
        text: err.message || 'Something went wrong. Please try again.',
        confirmButtonColor: '#0055ba'
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center w-100" style={{ minHeight: '300px' }}>
        <VescanLoader />
      </div>
    );
  }

  return (
    <>
      <h1 className="fw-bold mb-2 text-dark">
        {step === 1 && "Forgot Password"}
        {step === 2 && "Verification Code"}
        {step === 3 && "Reset Password"}
      </h1>
      <p className="text-muted mb-4">
        {step === 1 && "Enter your email address and we'll send you an OTP to reset your password."}
        {step === 2 && `Enter the OTP sent to ${email}.`}
        {step === 3 && "Create a new strong password for your account."}
      </p>

      {step === 1 && (
        <form onSubmit={handleEmailSubmit}>
          <div className="mb-4">
            <input
              type="email"
              name="email"
              placeholder="Your email address"
              className="form-control border-top-0 border-start-0 border-end-0 rounded-0 ps-0 bg-transparent"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100 py-2 fw-semibold mb-3">
            Send Reset Code
          </button>
          
          <div className="text-center">
            <Link to="/signin" className="text-decoration-none fw-semibold text-custom-blue">
              Back to Sign In
            </Link>
          </div>
        </form>
      )}

      {step === 2 && (
        <form onSubmit={handleOtpSubmit}>
          <div className="mb-4">
            <input
              type="text"
              name="otp"
              placeholder="Enter OTP Code"
              className="form-control border-top-0 border-start-0 border-end-0 rounded-0 ps-0 bg-transparent"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100 py-2 fw-semibold mb-3">
            Verify OTP
          </button>
          
          <div className="text-center">
            <button 
              type="button" 
              className="btn btn-link text-decoration-none fw-semibold text-custom-blue p-0"
              onClick={() => setStep(1)}
            >
              Go Back
            </button>
          </div>
        </form>
      )}

      {step === 3 && (
        <form onSubmit={handlePasswordSubmit}>
          <div className="mb-4">
            <input
              type="password"
              name="password"
              placeholder="New Password"
              className="form-control border-top-0 border-start-0 border-end-0 rounded-0 ps-0 bg-transparent mb-3"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <input
              type="password"
              name="passwordConfirm"
              placeholder="Confirm New Password"
              className="form-control border-top-0 border-start-0 border-end-0 rounded-0 ps-0 bg-transparent"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100 py-2 fw-semibold mb-3">
            Reset Password
          </button>
        </form>
      )}
      
      {step === 1 && (
        <div className="text-center mt-5">
          <small className="text-muted">
            By continuing, you agree to our <a href="#!" data-bs-toggle="modal" data-bs-target="#privacyModal" className="text-dark text-decoration-none fw-semibold">Privacy Policy</a> and <a href="#!" data-bs-toggle="modal" data-bs-target="#termsModal" className="text-dark text-decoration-none fw-semibold">Terms of Use</a>.
          </small>
        </div>
      )}

      {/* Modals */}
      <PrivacyPolicyModal />
      <TermsOfUseModal />
    </>
  );
};

export default ForgotPassword;
