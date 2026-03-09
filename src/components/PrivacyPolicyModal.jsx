import React from 'react';

const PrivacyPolicyModal = () => {
  return (
    <div className="modal fade" id="privacyModal" tabIndex="-1" aria-labelledby="privacyModalLabel" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header border-0 pb-0">
            <h5 className="modal-title fw-bold" id="privacyModalLabel">Privacy Policy</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body text-muted small">
            <p className="mb-2">Last updated: {new Date().toLocaleDateString()}</p>
            <h6 className="fw-semibold text-dark mt-3">1. Information We Collect</h6>
            <p>We collect information that you provide directly to us, including but not limited to your name, email address, phone number, and location. For mechanics, we also collect professional details, certifications, and banking information for payouts.</p>
            
            <h6 className="fw-semibold text-dark mt-3">2. How We Use Your Information</h6>
            <p>We use the information we collect to operate, maintain, and provide the features and functionality of the Vescan Service Agent Dashboard. This includes managing your bookings, processing payments, and verifying your identity and device.</p>
            
            <h6 className="fw-semibold text-dark mt-3">3. Information Sharing</h6>
            <p>We may share your professional profile (name, ratings, experience) with customers seeking mechanic services. We do not sell your personal data to third-party marketers.</p>

            <h6 className="fw-semibold text-dark mt-3">4. Security</h6>
            <p>We implement commercially reasonable security measures to protect your personal information, including the use of secure JWT tokens for session management and encrypted data transmission. However, no security system is impenetrable.</p>
          </div>
          <div className="modal-footer border-0 pt-0">
            <button type="button" className="btn btn-primary w-100" data-bs-dismiss="modal">I Understand</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyModal;
