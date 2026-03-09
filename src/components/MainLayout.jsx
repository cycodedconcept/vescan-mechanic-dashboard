import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Sidebar from './Sidebar';

const MainLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="d-flex w-100 overflow-hidden" style={{ fontFamily: 'Arial, sans-serif', height: '100vh', backgroundColor: 'var(--bg-secondary)' }}>
      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="flex-grow-1 h-100 overflow-hidden position-relative">
        <AnimatePresence mode="wait">
          <Outlet context={{ isSidebarOpen, toggleSidebar }} key={location.pathname} />
        </AnimatePresence>
      </div>
    </div>
  );
};

export default MainLayout;
