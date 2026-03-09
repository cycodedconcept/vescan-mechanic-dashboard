import React from 'react';

const TermsOfUseModal = () => {
  return (
    <div className="modal fade" id="termsModal" tabIndex="-1" aria-labelledby="termsModalLabel" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header border-0 pb-0">
            <h5 className="modal-title fw-bold" id="termsModalLabel">Terms of Use</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body text-muted small">
            <p className="mb-2">Last updated: {new Date().toLocaleDateString()}</p>
            <h6 className="fw-semibold text-dark mt-3">1. Acceptance of Terms</h6>
            <p>By accessing and using the Vescan Mechanic Dashboard, you agree to be bound by these Terms of Use and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using this platform.</p>
            
            <h6 className="fw-semibold text-dark mt-3">2. Service Agent Responsibilities</h6>
            <p>As a registered mechanic or service agent, you agree to provide accurate information regarding your skills and experience. You are responsible for fulfilling service requests accepted through the platform in a professional and timely manner.</p>
            
            <h6 className="fw-semibold text-dark mt-3">3. Payments and Invoicing</h6>
            <p>Vescan facilitates payments between clients and mechanics. You agree to utilize the platform's invoicing system for all jobs sourced through Vescan. Circumventing the payment system is a violation of these terms.</p>

            <h6 className="fw-semibold text-dark mt-3">4. Account Termination</h6>
            <p>We reserve the right to suspend or terminate your account at our sole discretion, without notice, for conduct that we believe violates these Terms of Use or is harmful to other users, us, or third parties.</p>
          </div>
          <div className="modal-footer border-0 pt-0">
            <button type="button" className="btn btn-primary w-100" data-bs-dismiss="modal">I Agree</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfUseModal;
