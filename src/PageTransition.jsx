import React from 'react';
import { motion } from 'framer-motion'; // eslint-disable-line no-unused-vars

const PageTransition = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -10 }}
      transition={{ 
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1] // Custom cubic-bezier for a "premium" feel
      }}
      className="w-100"
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;
