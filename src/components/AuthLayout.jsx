import React from 'react';
import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
  return (
    <div className="container-fluid min-vh-100 p-0">
      <div className="row g-0 min-vh-100">
        {/* Left Side - Image (Constant across transitions) */}
        <div className="col-lg-6 mechanic-bg">
        </div>
        
        {/* Right Side - Form Container */}
        <div className="col-lg-6 d-flex justify-content-center align-items-center bg-white py-5">
          <div className="w-100 p-4" style={{ maxWidth: '400px' }}>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
