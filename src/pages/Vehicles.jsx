
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useOutletContext } from 'react-router-dom';
import {
  Bell,
  Menu,
  Search,
  Car,
  Calendar,
  AlertCircle,
  Wrench,
  AlertTriangle,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { VEHICLES, VEHICLE_STATS } from '../data/mockData';
import VescanLoader from '../components/VescanLoader';

const Vehicles = () => {
  const { isSidebarOpen, toggleSidebar } = useOutletContext();
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('All Vehicles');
  const [searchQuery, setSearchQuery] = useState('');

  // Brand Colors
  const brandBlue = '#008FBF';

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  // Filter Logic
  const filteredVehicles = VEHICLES.filter(vehicle => {
    const matchesSearch = 
      vehicle.make.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vehicle.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vehicle.plate.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vehicle.vin.toLowerCase().includes(searchQuery.toLowerCase());

    if (activeTab === 'All Vehicles') return matchesSearch;
    if (activeTab === 'Active') return matchesSearch && vehicle.status === 'Active';
    if (activeTab === 'Maintenance Due') return matchesSearch && vehicle.status === 'Maintenance Due'; // Assuming status map or derivation
    return matchesSearch;
  });

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
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 24 }
    }
  };

  if (isLoading) {
    return <VescanLoader />;
  }

  return (
    <div className="d-flex flex-column h-100 bg-light overflow-hidden">
      {/* Header */}
      <header className="bg-white border-bottom py-3 px-4 d-flex justify-content-between align-items-center flex-shrink-0">
        <div className="d-flex align-items-center gap-3">
          {!isSidebarOpen && (
            <button 
              onClick={toggleSidebar} 
              className="btn btn-link p-0 text-dark me-2"
            >
              <Menu size={24} />
            </button>
          )}
          <div>
            <h5 className="fw-bold mb-0">Vehicle Management</h5>
            <small className="text-muted">Manage your business operations</small>
          </div>
        </div>
        <motion.div 
          className="d-flex align-items-center gap-3"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <button className="btn btn-light position-relative rounded-circle p-2">
            <Bell size={20} />
            <span className="position-absolute top-0 start-100 translate-middle p-1 bg-danger border border-light rounded-circle">
              <span className="visually-hidden">New alerts</span>
            </span>
          </button>
          <div className="bg-dark text-white rounded-circle d-flex align-items-center justify-content-center fw-bold" style={{ width: '40px', height: '40px' }}>
            JD
          </div>
        </motion.div>
      </header>

      {/* Main Content */}
      <div className="flex-grow-1 overflow-auto p-4">
        
        {/* Stats Banner */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="rounded-0 p-4 mb-4 text-white d-flex flex-column justify-content-center"
          style={{ backgroundColor: brandBlue, margin: '-1.5rem -1.5rem 1.5rem -1.5rem', paddingBottom: '3rem' }}
        >
          <div className="px-4">
            <h4 className="fw-bold mb-4">Vehicle Management</h4>
            <div className="row g-4">
              <div className="col-4">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.02, backgroundColor: 'rgba(255, 255, 255, 0.15)' }}
                  transition={{ delay: 0.1 }}
                  className="p-4 rounded-3 h-100 transition-all card-hover-effect"
                  style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
                >
                  <h3 className="fw-bold mb-1">{VEHICLE_STATS.total}</h3>
                  <small className="opacity-75">Total Vehicles</small>
                </motion.div>
              </div>
              <div className="col-4">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.02, backgroundColor: 'rgba(255, 255, 255, 0.15)' }}
                  transition={{ delay: 0.2 }}
                  className="p-4 rounded-3 h-100 transition-all card-hover-effect"
                  style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
                >
                  <h3 className="fw-bold mb-1">{VEHICLE_STATS.active}</h3>
                  <small className="opacity-75">Active</small>
                </motion.div>
              </div>
              <div className="col-4">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.02, backgroundColor: 'rgba(255, 255, 255, 0.15)' }}
                  transition={{ delay: 0.3 }}
                  className="p-4 rounded-3 h-100 transition-all card-hover-effect"
                  style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
                >
                  <h3 className="fw-bold mb-1">{VEHICLE_STATS.dueService}</h3>
                  <small className="opacity-75">Due Service</small>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Filters & Search */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white p-3 rounded-3 shadow-sm mb-4"
        >
           <div className="position-relative mb-3">
              <Search className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted" size={18} />
              <input 
                type="text" 
                className="form-control ps-5 border-light bg-light" 
                placeholder="Search by make, model, plate, VIN..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
           </div>
           
           <div className="d-flex gap-2">
              {['All Vehicles', 'Active', 'Maintenance Due'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`btn btn-sm px-4 py-2 fw-medium ${activeTab === tab ? 'btn-dark' : 'btn-light'}`}
                  style={{ 
                    backgroundColor: activeTab === tab ? '#001F3F' : '#F8F9FA',
                    color: activeTab === tab ? '#fff' : '#6c757d'
                  }}
                >
                  {tab}
                </button>
              ))}
           </div>
        </motion.div>

        {/* Vehicle List */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="d-flex flex-column gap-3"
        >
          <AnimatePresence>
             {filteredVehicles.map((vehicle) => (
               <motion.div 
                 key={vehicle.id}
                 layout
                 variants={itemVariants}
                 initial="hidden"
                 animate="visible"
                 exit={{ opacity: 0, scale: 0.95 }}
                 whileHover={{ y: -5, boxShadow: '0 15px 30px rgba(0,0,0,0.1)' }}
                 className="card border-0 shadow-sm rounded-4 overflow-hidden"
               >
                <div className="card-body p-4">
                  {/* Card Header */}
                  <div className="d-flex justify-content-between align-items-start mb-4">
                    <div className="d-flex align-items-start gap-3">
                      <div 
                        className="rounded-3 d-flex align-items-center justify-content-center flex-shrink-0"
                        style={{ width: '48px', height: '48px', backgroundColor: '#E0F2FE', color: brandBlue }}
                      >
                        <Car size={24} />
                      </div>
                      <div>
                        <h6 className="fw-bold mb-1 text-dark" style={{ fontSize: '1.1rem' }}>{vehicle.year} {vehicle.make} {vehicle.model}</h6>
                        <div className="text-muted small mb-1 fw-medium">{vehicle.plate}</div>
                        <div className="small text-secondary fw-medium">
                          Owner: {vehicle.owner}
                        </div>
                      </div>
                    </div>
                    {vehicle.status === 'Maintenance Due' && (
                      <span 
                        className="badge rounded-1 px-2 py-1 fw-semibold" 
                        style={{ backgroundColor: '#FFEDD5', color: '#F97316', fontSize: '0.75rem' }}
                      >
                        Service Due
                      </span>
                    )}
                  </div>

                  {/* Details Grid (2x2) */}
                  <div className="row g-3 mb-4">
                    <div className="col-6">
                       <div className="p-3 bg-light rounded-3 h-100" style={{ backgroundColor: '#F8FAFC' }}>
                          <small className="text-muted d-block mb-1" style={{ fontSize: '0.75rem', fontWeight: 500 }}>VIN</small>
                          <div className="fw-bold text-dark" style={{ fontSize: '0.85rem' }}>{vehicle.vin}</div>
                       </div>
                    </div>
                    <div className="col-6">
                        <div className="p-3 bg-light rounded-3 h-100" style={{ backgroundColor: '#F8FAFC' }}>
                          <small className="text-muted d-block mb-1" style={{ fontSize: '0.75rem', fontWeight: 500 }}>Mileage</small>
                          <div className="fw-bold text-dark" style={{ fontSize: '0.85rem' }}>{vehicle.mileage}</div>
                       </div>
                    </div>
                    <div className="col-6">
                        <div className="p-3 bg-light rounded-3 h-100" style={{ backgroundColor: '#F8FAFC' }}>
                          <small className="text-muted d-block mb-1" style={{ fontSize: '0.75rem', fontWeight: 500 }}>Transmission</small>
                          <div className="fw-bold text-dark" style={{ fontSize: '0.85rem' }}>{vehicle.transmission}</div>
                       </div>
                    </div>
                    <div className="col-6">
                        <div className="p-3 bg-light rounded-3 h-100" style={{ backgroundColor: '#F8FAFC' }}>
                          <small className="text-muted d-block mb-1" style={{ fontSize: '0.75rem', fontWeight: 500 }}>Fuel Type</small>
                          <div className="fw-bold text-dark" style={{ fontSize: '0.85rem' }}>{vehicle.fuelType}</div>
                       </div>
                    </div>
                  </div>

                  {/* Service Schedule Section */}
                  <div className="p-3 rounded-3 mb-4" style={{ backgroundColor: '#EFF6FF', border: '1px solid #DBEAFE' }}>
                     <div className="d-flex align-items-center gap-2 mb-3">
                        <Calendar size={16} className="text-primary" />
                        <span className="fw-bold small text-primary" style={{ fontSize: '0.8rem' }}>Service Schedule</span>
                     </div>
                     <div className="d-flex justify-content-between">
                        <div>
                           <small className="text-muted d-block mb-1" style={{ fontSize: '0.75rem', fontWeight: 500 }}>Last Service</small>
                           <div className="fw-bold text-primary small" style={{ fontSize: '0.85rem' }}>{vehicle.lastService}</div>
                        </div>
                        <div className="text-start">
                           <small className="text-muted d-block mb-1" style={{ fontSize: '0.75rem', fontWeight: 500 }}>Next Service</small>
                           <div className="fw-bold text-primary small" style={{ fontSize: '0.85rem' }}>{vehicle.nextService}</div>
                        </div>
                     </div>
                  </div>

                  {/* Recent Error Codes (Conditional) */}
                  {vehicle.errorCodes && vehicle.errorCodes.length > 0 && (
                    <div className="p-3 rounded-3 mb-4" style={{ backgroundColor: '#FEF2F2' }}>
                       <div className="d-flex align-items-center gap-2 mb-2 text-danger">
                          <AlertTriangle size={16} />
                          <span className="fw-bold small" style={{ fontSize: '0.8rem' }}>Recent Error Codes</span>
                       </div>
                       <div className="d-flex gap-2">
                          {vehicle.errorCodes.map(code => (
                            <span 
                              key={code} 
                              className="badge text-white rounded-1 px-2 py-1"
                              style={{ backgroundColor: '#9B2C2C', fontSize: '0.75rem', fontWeight: 600 }}
                            >
                              {code}
                            </span>
                          ))}
                       </div>
                    </div>
                  )}

                  {/* Footer Stats (Services/Diagnostics) */}
                  <div className="d-flex align-items-center gap-4 mb-4 text-secondary">
                     <div className="d-flex align-items-center gap-2" style={{ fontSize: '0.85rem', fontWeight: 500 }}>
                        <CheckCircle2 size={16} className="text-muted" />
                        <span>{vehicle.serviceCount} Services</span>
                     </div>
                     <div className="d-flex align-items-center gap-2" style={{ fontSize: '0.85rem', fontWeight: 500 }}>
                        <AlertTriangle size={16} className="text-muted" />
                        <span>{vehicle.diagnosticCount} Diagnostics</span>
                     </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="d-flex gap-3">
                     <button className="btn w-100 py-2 fw-bold text-white border-0" style={{ backgroundColor: '#001F3F', borderRadius: '8px' }}>
                        View Details
                     </button>
                     <button className="btn btn-outline-secondary py-2 px-4 shadow-sm fw-medium flex-shrink-0" style={{ borderRadius: '8px', color: '#4A5568', borderColor: '#E2E8F0', whiteSpace: 'nowrap' }}>
                        Schedule Service
                     </button>
                  </div>
                </div>
             </motion.div>
           ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default Vehicles;
