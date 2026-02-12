import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useOutletContext } from 'react-router-dom';
import {
  Bell,
  Menu,
  Search,
  ChevronRight,
  Star,
  Phone,
  MapPin
} from 'lucide-react';
import { CUSTOMERS, CUSTOMER_STATS } from '../data/mockData';

const Customers = () => {
  const { isSidebarOpen, toggleSidebar } = useOutletContext();
  const [searchTerm, setSearchTerm] = useState('');

  const brandBlue = '#008FBF';

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex-grow-1 d-flex flex-column h-100 overflow-y-auto custom-scrollbar"
      style={{ backgroundColor: '#F7FAFC' }}
    >
      {/* Top Header */}
      <header className="bg-white px-4 py-3 d-flex justify-content-between align-items-center shadow-sm border-bottom">
        <div className="d-flex align-items-center gap-3">
          <button 
            onClick={toggleSidebar}
            className="btn btn-link p-0 text-dark d-lg-none"
          >
            <Menu size={24} />
          </button>
          <div>
            <h5 className="fw-bold mb-0 text-dark">Customer Management</h5>
            <small className="text-muted">Manage your business operations</small>
          </div>
        </div>
        
        <div className="d-flex align-items-center gap-3">
          <div className="position-relative">
            <Bell size={20} className="text-secondary cursor-pointer" />
            <span 
              className="position-absolute translate-middle p-1 bg-danger border border-light rounded-circle"
              style={{ top: '2px', right: '-8px' }}
            ></span>
          </div>
          <div 
            className="rounded-circle d-flex align-items-center justify-content-center fw-bold text-white shadow-sm"
            style={{ width: '38px', height: '38px', backgroundColor: '#1A202C', fontSize: '0.85rem' }}
          >
            JD
          </div>
        </div>
      </header>

      {/* Blue Stats Section */}
      <div 
        className="p-4 py-5" 
        style={{ backgroundColor: brandBlue }}
      >
        <h4 className="text-white fw-bold mb-4">Customer Management</h4>
        <div className="row g-4">
          <div className="col-12 col-md-4">
            <motion.div 
              whileHover={{ y: -5 }}
              className="p-4 rounded-4 h-100"
              style={{ backgroundColor: 'rgba(255, 255, 255, 0.12)', border: '1px solid rgba(255, 255, 255, 0.1)' }}
            >
              <h2 className="text-white fw-bold mb-1 border-0" style={{ fontSize: '2.5rem' }}>{CUSTOMER_STATS.total}</h2>
              <div className="text-white opacity-90 small fw-medium">Total Customers</div>
            </motion.div>
          </div>
          <div className="col-12 col-md-4">
            <motion.div 
              whileHover={{ y: -5 }}
              className="p-4 rounded-4 h-100"
              style={{ backgroundColor: 'rgba(255, 255, 255, 0.12)', border: '1px solid rgba(255, 255, 255, 0.1)' }}
            >
              <h2 className="text-white fw-bold mb-1 border-0" style={{ fontSize: '2.5rem' }}>{CUSTOMER_STATS.activeWeek}</h2>
              <div className="text-white opacity-90 small fw-medium">Active This Week</div>
            </motion.div>
          </div>
          <div className="col-12 col-md-4">
            <motion.div 
              whileHover={{ y: -5 }}
              className="p-4 rounded-4 h-100"
              style={{ backgroundColor: 'rgba(255, 255, 255, 0.12)', border: '1px solid rgba(255, 255, 255, 0.1)' }}
            >
              <h2 className="text-white fw-bold mb-1 border-0" style={{ fontSize: '2.5rem' }}>{CUSTOMER_STATS.newMonth}</h2>
              <div className="text-white opacity-90 small fw-medium">New This Month</div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-4 flex-grow-1">
        <div className="container-fluid p-0">
          
          {/* Search Bar */}
          <div className="mb-4">
            <div className="position-relative">
              <Search 
                size={20} 
                className="position-absolute top-50 translate-middle-y text-muted" 
                style={{ left: '20px' }}
              />
              <input 
                type="text" 
                placeholder="Search customers..."
                className="form-control border-0 shadow-sm ps-5 py-3 rounded-3"
                style={{ backgroundColor: 'white', border: '1px solid #E2E8F0' }}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Customers List */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="d-flex flex-column gap-3"
          >
            {CUSTOMERS.filter(c => c.name.toLowerCase().includes(searchTerm.toLowerCase())).map((customer) => (
              <motion.div 
                key={customer.id}
                variants={itemVariants}
                whileHover={{ y: -3, boxShadow: '0 12px 25px rgba(0,0,0,0.06)' }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="card border-0 shadow-sm rounded-4 overflow-hidden cursor-pointer"
              >
                <div className="card-body p-4">
                  <div className="d-flex align-items-start gap-4">
                    {/* Initials Circle */}
                    <div 
                      className="rounded-circle d-flex align-items-center justify-content-center fw-bold flex-shrink-0"
                      style={{ 
                        width: '56px', 
                        height: '56px', 
                        backgroundColor: customer.color || '#EFFFF4',
                        color: customer.textColor || '#28a745',
                        fontSize: '1.2rem'
                      }}
                    >
                      {customer.initials}
                    </div>

                    {/* Customer Info */}
                    <div className="flex-grow-1">
                      <div className="d-flex justify-content-between align-items-start mb-1">
                        <div>
                          <h5 className="fw-bold mb-1 text-dark" style={{ fontSize: '1.05rem' }}>{customer.name}</h5>
                          <div className="d-flex gap-1 text-warning mb-2">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                size={12} 
                                fill={i < customer.rating ? "#F6AD55" : "none"} 
                                stroke={i < customer.rating ? "#F6AD55" : "#E2E8F0"} 
                              />
                            ))}
                          </div>
                        </div>
                        <ChevronRight size={18} className="text-secondary opacity-40" />
                      </div>

                      <div className="mb-4">
                        <div className="d-flex align-items-center gap-2 text-secondary mb-1" style={{ fontSize: '0.85rem' }}>
                          <Phone size={14} className="opacity-75" />
                          <span>{customer.phone}</span>
                        </div>
                        <div className="d-flex align-items-center gap-2 text-secondary" style={{ fontSize: '0.85rem' }}>
                          <MapPin size={14} className="opacity-75" />
                          <span>{customer.location}</span>
                        </div>
                      </div>

                      {/* Stats Row */}
                      <div className="row g-0 pt-3 border-top" style={{ borderColor: '#edf2f7' }}>
                        <div className="col-4">
                          <div className="text-muted mb-1" style={{ fontSize: '0.7rem', color: '#718096' }}>Total Services</div>
                          <div className="fw-bold text-dark" style={{ fontSize: '0.95rem' }}>{customer.totalServices}</div>
                        </div>
                        <div className="col-4">
                          <div className="text-muted mb-1" style={{ fontSize: '0.7rem', color: '#718096' }}>Total Spent</div>
                          <div className="fw-bold text-dark" style={{ fontSize: '0.95rem' }}>{customer.totalSpent}</div>
                        </div>
                        <div className="col-4">
                          <div className="text-muted mb-1" style={{ fontSize: '0.7rem', color: '#718096' }}>Last Service</div>
                          <div className="fw-bold text-dark" style={{ fontSize: '0.95rem' }}>{customer.lastService}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </div>
    </motion.div>
  );
};

export default Customers;
