import React from 'react';
import { motion, AnimatePresence } from 'framer-motion'; // eslint-disable-line no-unused-vars
import { 
  LayoutDashboard, 
  Wrench, 
  Wallet, 
  Users, 
  Car, 
  Package, 
  ShoppingCart, 
  BarChart2, 
  LogOut, 
  Settings,
  Menu
} from 'lucide-react';

import { Link, useLocation } from 'react-router-dom';

const Sidebar = ({ isSidebarOpen, toggleSidebar }) => {
  const location = useLocation();
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 992);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: Wrench, label: 'Services', badge: '8', badgeColor: 'bg-danger', path: '/services' },
    { icon: Wallet, label: 'Financial', path: '/financial' },
    { icon: Users, label: 'Customers', path: '/customers' },
    { icon: Car, label: 'Vehicles', path: '/vehicles' },
    { icon: Package, label: 'Inventory', badge: '3', badgeColor: 'bg-danger', path: '/inventory' },
    { icon: ShoppingCart, label: 'E-Commerce', path: '/ecommerce' },
    { icon: BarChart2, label: 'Analytics', path: '/analytics' }
  ];

  return (
    <AnimatePresence mode="wait">
      {isSidebarOpen && (
        <>
          {isMobile && (
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={toggleSidebar}
              className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50"
              style={{ zIndex: 1030 }}
            />
          )}
          <motion.aside 
            key="sidebar"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 280, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="d-flex flex-column text-white" 
            style={{ 
              backgroundColor: '#001F3F', 
              overflow: 'hidden', 
              whiteSpace: 'nowrap',
              position: isMobile ? 'fixed' : 'relative',
              zIndex: 1040,
              height: '100vh',
              top: 0,
              left: 0
            }}
          >
            <div style={{ width: '280px', height: '100%', padding: '1.5rem', display: 'flex', flexDirection: 'column' }}>
              <div className="d-flex justify-content-between align-items-start mb-5 top-logo">
                <div>
                  <h4 className="fw-bold mb-1 fs-4">Vescan</h4>
                  <small className="text-white opacity-75" style={{ fontSize: '0.8rem' }}>Mechanic Dashboard</small>
                </div>
                <button onClick={toggleSidebar} className="btn btn-link text-white p-0 opacity-75 hover-opacity-100">
                  <Menu size={24} />
                </button>
              </div>

              <div className="border-bottom border-white opacity-25 w-100 mb-4"></div>

              <nav className="nav flex-column flex-grow-1 gap-1 navi">
                {navItems.map((item, index) => {
                  const isActive = location.pathname === item.path;
                  return (
                    <Link
                      key={index}
                      to={item.path} 
                      className={`nav-link d-flex align-items-center gap-3 px-3 py-3 rounded-2 ${
                        isActive 
                          ? 'text-white' 
                          : 'text-white opacity-75 hover-opacity-100'
                      }`}
                      style={{
                        backgroundColor: isActive ? 'rgba(255, 255, 255, 0.15)' : 'transparent',
                        fontWeight: isActive ? '500' : '400',
                        textDecoration: 'none'
                      }}
                    >
                      <motion.div whileHover={{ x: 5 }} className="d-flex align-items-center gap-3 w-100">
                        <item.icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                        <span style={{ fontSize: '0.95rem' }}>{item.label}</span>
                        {item.badge && (
                          <span 
                            className={`badge ${item.badgeColor} rounded-circle ms-auto d-flex align-items-center justify-content-center`}
                            style={{ width: '24px', height: '24px', fontSize: '0.75rem' }}
                          >
                            {item.badge}
                          </span>
                        )}
                      </motion.div>
                    </Link>
                  );
                })}
              </nav>

              <div className="mt-auto">
                <div 
                  className="rounded-4 p-3"
                  style={{ backgroundColor: 'rgba(23, 42, 69, 0.5)' }} // Slightly lighter/tinted bg for the card
                >
                  <div className="d-flex align-items-center gap-3 mb-4">
                    <div className="bg-white text-dark rounded-circle d-flex align-items-center justify-content-center fw-bold" style={{ width: '40px', height: '40px', fontSize: '0.9rem' }}>
                      JD
                    </div>
                    <div className="d-flex flex-column">
                      <span className="fw-medium text-white" style={{ fontSize: '0.95rem' }}>John Doe</span>
                      <small className="text-white opacity-75" style={{ fontSize: '0.75rem' }}>Master Mechanic</small>
                    </div>
                  </div>
                  
                  <div className="d-flex flex-column gap-2">
                    <a href="#" className="nav-link d-flex align-items-center gap-3 text-white opacity-75 hover-opacity-100 py-1">
                      <Settings size={18} />
                      <span style={{ fontSize: '0.9rem' }}>Settings</span>
                    </a>
                    <a href="#" className="nav-link d-flex align-items-center gap-3 text-white opacity-75 hover-opacity-100 py-1">
                      <LogOut size={18} />
                      <span style={{ fontSize: '0.9rem' }}>Logout</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};

export default Sidebar;
