import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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

const Sidebar = ({ isSidebarOpen, toggleSidebar }) => {
  return (
    <AnimatePresence mode="wait">
      {isSidebarOpen && (
        <motion.aside 
          key="sidebar"
          initial={{ x: -280, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -280, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="d-flex flex-column text-white p-3" 
          style={{ width: '280px', backgroundColor: '#001F3F' }}
        >
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h4 className="fw-bold mb-0">Vescan</h4>
              <small className="text-white-50">Mechanic Dashboard</small>
            </div>
            <button onClick={toggleSidebar} className="btn btn-link text-white p-0">
              <Menu size={24} />
            </button>
          </div>

          <nav className="nav nav-pills flex-column flex-grow-1 gap-2">
            {[
              { icon: LayoutDashboard, label: 'Dashboard', active: true },
              { icon: Wrench, label: 'Services', badge: '8', badgeColor: 'bg-danger' },
              { icon: Wallet, label: 'Financial' },
              { icon: Users, label: 'Customers' },
              { icon: Car, label: 'Vehicles' },
              { icon: Package, label: 'Inventory', badge: '3', badgeColor: 'bg-danger' },
              { icon: ShoppingCart, label: 'E-Commerce' },
              { icon: BarChart2, label: 'Analytics' }
            ].map((item, index) => (
              <motion.a 
                key={index}
                href="#" 
                whileHover={{ x: 5, backgroundColor: item.active ? '' : 'rgba(255,255,255,0.1)' }}
                className={`nav-link d-flex align-items-center gap-3 ${item.active ? 'bg-white text-primary fw-medium' : 'text-white opacity-75'} hover-opacity-100`}
              >
                <item.icon size={20} />
                {item.label}
                {item.badge && <span className={`badge ${item.badgeColor} ms-auto`}>{item.badge}</span>}
              </motion.a>
            ))}
          </nav>

          <div className="mt-auto pt-4 border-top border-white-50">
            <div className="d-flex align-items-center gap-3 mb-3 px-2">
              <div className="bg-white text-primary rounded-circle d-flex align-items-center justify-content-center fw-bold" style={{ width: '40px', height: '40px' }}>
                JD
              </div>
              <div className="d-flex flex-column">
                <span className="fw-medium">John Doe</span>
                <small className="text-white-50">Master Mechanic</small>
              </div>
            </div>
            <a href="#" className="nav-link d-flex align-items-center gap-3 text-white opacity-75 hover-opacity-100 mb-2">
              <Settings size={20} />
              Settings
            </a>
            <a href="#" className="nav-link d-flex align-items-center gap-3 text-white opacity-75 hover-opacity-100">
              <LogOut size={20} />
              Logout
            </a>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
};

export default Sidebar;
