import React from 'react';
import { motion } from 'framer-motion';

const VescanLoader = ({ className = "flex-grow-1" }) => {
  const brandBlue = '#008FBF';

  return (
    <div className={`${className} d-flex flex-column align-items-center justify-content-center`} style={{ minHeight: '400px' }}>
      <div className="position-relative" style={{ width: '140px', height: '60px' }}>
        {/* Car Silhouette SVG Path */}
        {/* Base Layer (Inactive) */}
        <svg 
          viewBox="0 0 140 60" 
          className="position-absolute top-0 start-0 w-100 h-100"
          style={{ opacity: 0.3 }}
        >
          {/* Top Curve (Roofline) */}
          <path 
            d="M10,40 C30,38 40,15 70,15 C100,15 110,25 130,15" 
            fill="none" 
            stroke="#CBD5E0" 
            strokeWidth="4" 
            strokeLinecap="round"
          />
          {/* Bottom Curve (Body) */}
          <path 
            d="M5,42 C40,38 100,38 120,25" 
            fill="none" 
            stroke="#CBD5E0" 
            strokeWidth="4" 
            strokeLinecap="round"
          />
        </svg>

        {/* Active Layer (Scanning Light) */}
        <motion.div
          className="position-absolute top-0 start-0 w-100 h-100"
          initial={{ 
            WebkitMaskPosition: '-150% 0',
            maskPosition: '-150% 0'
          }}
          animate={{ 
            WebkitMaskPosition: '250% 0',
            maskPosition: '250% 0'
          }}
          transition={{ 
            duration: 1.2, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          style={{
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 50%, transparent 100%)',
            maskImage: 'linear-gradient(to right, transparent 0%, black 50%, transparent 100%)',
            WebkitMaskSize: '50% 100%',
            maskSize: '50% 100%',
            WebkitMaskRepeat: 'no-repeat',
            maskRepeat: 'no-repeat'
          }}
        >
          <svg viewBox="0 0 140 60" className="w-100 h-100">
            {/* Top Curve (Roofline) */}
            <path 
              d="M10,40 C30,38 40,15 70,15 C100,15 110,25 130,15" 
              fill="none" 
              stroke={brandBlue} 
              strokeWidth="4" 
              strokeLinecap="round"
            />
            {/* Bottom Curve (Body) */}
            <path 
              d="M5,42 C40,38 100,38 120,25" 
              fill="none" 
              stroke={brandBlue} 
              strokeWidth="4" 
              strokeLinecap="round"
            />
          </svg>
        </motion.div>
      </div>
      
      <div className="mt-2 text-muted fw-medium small text-uppercase" style={{ letterSpacing: '2px', fontSize: '0.75rem' }}>
        LOADING PROFILE
      </div>
    </div>
  );
};

export default VescanLoader;
