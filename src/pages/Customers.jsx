import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useOutletContext } from 'react-router-dom';
import TopHeader from '../components/TopHeader';
import {
  Bell,
  Menu,
  Search,
  ChevronRight,
  Star,
  Phone,
  MapPin,
  ArrowLeft,
  Mail,
  Car
} from 'lucide-react';
import { CUSTOMERS, CUSTOMER_STATS } from '../data/mockData';
import VescanLoader from '../components/VescanLoader';

const Customers = () => {
  const { isSidebarOpen, toggleSidebar } = useOutletContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const brandBlue = '#008FBF';

  const handleCustomerClick = (customer) => {
    setIsLoading(true);
    // Simulate API delay
    setTimeout(() => {
      setSelectedCustomer(customer);
      setIsLoading(false);
    }, 800);
  };

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

  const renderListView = () => (
    <div className="flex-grow-1 overflow-auto">
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
      <div className="p-4">
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
                style={{ backgroundColor: 'var(--input-bg)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }}
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
                style={{ backgroundColor: 'var(--card-bg)' }}
                onClick={() => handleCustomerClick(customer)}
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
                          <h5 className="fw-bold mb-1" style={{ fontSize: '1.05rem', color: 'var(--text-primary)' }}>{customer.name}</h5>
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
                      <div className="row g-0 pt-3 border-top" style={{ borderColor: 'var(--border-color)' }}>
                        <div className="col-4">
                          <div className="text-secondary mb-1" style={{ fontSize: '0.7rem' }}>Total Services</div>
                          <div className="fw-bold" style={{ fontSize: '0.95rem', color: 'var(--text-primary)' }}>{customer.totalServices}</div>
                        </div>
                        <div className="col-4">
                          <div className="text-secondary mb-1" style={{ fontSize: '0.7rem' }}>Total Spent</div>
                          <div className="fw-bold" style={{ fontSize: '0.95rem', color: 'var(--text-primary)' }}>{customer.totalSpent}</div>
                        </div>
                        <div className="col-4">
                          <div className="text-secondary mb-1" style={{ fontSize: '0.7rem' }}>Last Service</div>
                          <div className="fw-bold" style={{ fontSize: '0.95rem', color: 'var(--text-primary)' }}>{customer.lastService}</div>
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
    </div>
  );

  const renderDetailsView = () => (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="flex-grow-1 overflow-auto"
    >
      {/* Customer Header Section */}
      <div 
        className="p-4 py-5" 
        style={{ backgroundColor: brandBlue }}
      >
        <motion.button 
          whileHover={{ x: -5 }}
          onClick={() => setSelectedCustomer(null)}
          className="btn btn-link text-white p-0 d-flex align-items-center gap-2 mb-4 border-0 shadow-none text-decoration-none"
        >
          <ArrowLeft size={18} />
          <span className="fw-medium">Back to Customers</span>
        </motion.button>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="d-flex align-items-center gap-4 mb-4"
        >
          <motion.div 
            whileHover={{ scale: 1.05, rotate: 5 }}
            className="rounded-circle d-flex align-items-center justify-content-center fw-bold text-white flex-shrink-0 shadow-lg"
            style={{ 
              width: '80px', 
              height: '80px', 
              backgroundColor: 'white',
              color: brandBlue,
              fontSize: '1.8rem'
            }}
          >
            {selectedCustomer.initials}
          </motion.div>
          <div>
            <h2 className="text-white fw-bold mb-1">{selectedCustomer.name}</h2>
            <div className="d-flex gap-1 text-warning mb-1">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  size={16} 
                  fill={i < selectedCustomer.rating ? "#F6AD55" : "none"} 
                  stroke={i < selectedCustomer.rating ? "#F6AD55" : "rgba(255,255,255,0.3)"} 
                />
              ))}
            </div>
            <div className="text-white opacity-80 small">Customer since {selectedCustomer.customerSince}</div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="row g-3"
        >
          <div className="col-4">
            <motion.div whileHover={{ scale: 1.02, backgroundColor: 'rgba(255, 255, 255, 0.15)' }} className="p-3 rounded-3 h-100 transition-all" style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}>
              <div className="text-white fw-bold h4 mb-0">{selectedCustomer.totalServices}</div>
              <div className="text-white opacity-70 small">Services</div>
            </motion.div>
          </div>
          <div className="col-4">
            <motion.div whileHover={{ scale: 1.02, backgroundColor: 'rgba(255, 255, 255, 0.15)' }} className="p-3 rounded-3 h-100 transition-all" style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}>
              <div className="text-white fw-bold h4 mb-0">{selectedCustomer.totalSpent}</div>
              <div className="text-white opacity-70 small">Total Spent</div>
            </motion.div>
          </div>
          <div className="col-4">
            <motion.div whileHover={{ scale: 1.02, backgroundColor: 'rgba(255, 255, 255, 0.15)' }} className="p-3 rounded-3 h-100 transition-all" style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}>
              <div className="text-white fw-bold h4 mb-0">{selectedCustomer.vehiclesCount}</div>
              <div className="text-white opacity-70 small">Vehicles</div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="p-4 d-flex flex-column gap-4"
      >
        {/* Contact Information */}
        <motion.div variants={itemVariants} className="card border-0 shadow-sm rounded-4">
          <div className="card-body p-4">
            <h6 className="fw-bold mb-4">Contact Information</h6>
            <div className="d-flex flex-column gap-3">
              <div className="d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center gap-3">
                  <div className="p-3 rounded-4 d-flex align-items-center justify-content-center" style={{ backgroundColor: '#E9F2FF', color: '#00214D', width: '56px', height: '56px' }}>
                    <Phone size={24} />
                  </div>
                  <div>
                    <div className="text-muted mb-1" style={{ fontSize: '0.85rem' }}>Phone</div>
                    <div className="fw-bold" style={{ fontSize: '1.1rem', color: 'var(--text-primary)' }}>{selectedCustomer.phone}</div>
                  </div>
                </div>
                <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} className="btn btn-link text-decoration-none small p-0 fw-medium" style={{ color: brandBlue, fontSize: '0.9rem' }}>Call</motion.button>
              </div>
              
              <div className="d-flex align-items-center gap-3">
                <div className="p-3 rounded-4 d-flex align-items-center justify-content-center" style={{ backgroundColor: '#F4EBFF', color: '#9800FF', width: '56px', height: '56px' }}>
                  <Mail size={24} />
                </div>
                <div>
                  <div className="text-muted mb-1" style={{ fontSize: '0.85rem' }}>Email</div>
                  <div className="fw-bold" style={{ fontSize: '1.1rem', color: 'var(--text-primary)' }}>{selectedCustomer.email}</div>
                </div>
              </div>

              <div className="d-flex align-items-center gap-3">
                <div className="p-3 rounded-4 d-flex align-items-center justify-content-center" style={{ backgroundColor: '#E6FFFA', color: '#00B5D8', width: '56px', height: '56px' }}>
                  <MapPin size={24} />
                </div>
                <div>
                  <div className="text-muted mb-1" style={{ fontSize: '0.85rem' }}>Location</div>
                  <div className="fw-bold" style={{ fontSize: '1.1rem', color: 'var(--text-primary)' }}>{selectedCustomer.location}</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Vehicles */}
        <motion.div variants={itemVariants}>
          <h6 className="fw-bold mb-3">Vehicles</h6>
          {selectedCustomer.vehicles.map((v) => (
            <motion.div 
              key={v.id} 
              whileHover={{ y: -5, boxShadow: '0 10px 30px rgba(0,0,0,0.08)' }}
              className="card border-0 shadow-sm rounded-4 overflow-hidden mb-3 transition-all"
            >
              <div className="card-body p-4">
                <div className="d-flex align-items-start gap-3 mb-4">
                  <div className="p-3 rounded-3" style={{ backgroundColor: '#EDF2F7', color: brandBlue }}>
                    <Car size={24} />
                  </div>
                  <div>
                    <h6 className="fw-bold mb-1">{v.model}</h6>
                    <div className="text-muted small mb-1">{v.plate}</div>
                    <div className="text-muted" style={{ fontSize: '0.7rem' }}>VIN: {v.vin}</div>
                  </div>
                </div>
                <div className="row g-0 pt-3 border-top" style={{ borderColor: '#F1F5F9' }}>
                  <div className="col-4 border-end text-center">
                    <div className="text-muted small mb-1" style={{ fontSize: '0.7rem' }}>Mileage</div>
                    <div className="fw-bold small" style={{ color: 'var(--text-primary)' }}>{v.mileage}</div>
                  </div>
                  <div className="col-4 border-end text-center">
                    <div className="text-secondary tiny mb-1" style={{ fontSize: '0.7rem' }}>Last Srv.</div>
                    <div className="fw-bold small" style={{ color: 'var(--text-primary)' }}>{v.lastServiceDate}</div>
                  </div>
                  <div className="col-4 text-center">
                    <div className="text-secondary tiny mb-1" style={{ fontSize: '0.7rem' }}>Next Srv.</div>
                    <div className="fw-bold small" style={{ color: 'var(--text-primary)' }}>{v.nextServiceDate}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Service History */}
        <motion.div variants={itemVariants}>
          <h6 className="fw-bold mb-3">Service History</h6>
          <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
            <div className="card-body p-0">
              <div className="list-group list-group-flush">
                {selectedCustomer.serviceHistory.map((service, idx) => (
                  <motion.div 
                    key={service.id} 
                    whileHover={{ backgroundColor: '#fafbfc' }}
                    className={`list-group-item p-4 border-0 ${idx < selectedCustomer.serviceHistory.length - 1 ? 'border-bottom' : ''}`}
                  >
                    <div className="d-flex justify-content-between align-items-start">
                      <div>
                        <h6 className="fw-bold mb-1">{service.title}</h6>
                        <div className="text-muted small mb-1">{service.car}</div>
                        <div className="text-muted" style={{ fontSize: '0.75rem' }}>{service.date}</div>
                      </div>
                      <div className="text-end">
                        <div className="fw-bold mb-2" style={{ color: 'var(--text-primary)' }}>{service.amount}</div>
                        <span className="badge rounded-pill px-3 py-1 text-success fw-medium" style={{ backgroundColor: '#EFFFF4', fontSize: '0.7rem' }}>
                          {service.status}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Notes */}
        <motion.div variants={itemVariants} className="card border-0 shadow-sm rounded-4">
          <div className="card-body p-4">
            <h6 className="fw-bold mb-3">Notes</h6>
            <p className="text-secondary small mb-0" style={{ lineHeight: '1.6' }}>
              {selectedCustomer.notes}
            </p>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex-grow-1 d-flex flex-column h-100 overflow-hidden"
      style={{ backgroundColor: 'var(--bg-primary)' }}
    >
      {/* Top Header */}
      <TopHeader title="Customer Management" />

      {isLoading ? <VescanLoader /> : (selectedCustomer ? renderDetailsView() : renderListView())}
    </motion.div>
  );
};

export default Customers;
