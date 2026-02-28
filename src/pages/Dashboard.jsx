import React from 'react';
import { motion, AnimatePresence } from 'framer-motion'; // eslint-disable-line no-unused-vars
import { useOutletContext } from 'react-router-dom';
import TopHeader from '../components/TopHeader';
import {
  AlertTriangle,
  Menu,
  X,
  Clock,
  CheckCircle2,
  Bell,
  Wallet,
  Package,
  BarChart2,
  Users
} from 'lucide-react';

import { DIAGNOSTIC_ALERTS } from '../data/mockData';

const Dashboard = () => {
  const { isSidebarOpen, toggleSidebar } = useOutletContext();
  const [selectedAlert, setSelectedAlert] = React.useState(null);

  return (
    <>
      {/* Main Content */}
      <motion.main 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="flex-grow-1 p-4 overflow-auto h-100" 
      >
        {/* Header */}
        <div style={{ margin: '-1.5rem -1.5rem 1.5rem -1.5rem' }}>
          <TopHeader title="Dashboard Overview" />
        </div>

        {/* Stats Grid */}
        <div className="row g-4 mb-4">
          <div className="col-md-3">
            <motion.div 
              whileHover={{ y: -10, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)", scale: 1.02 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="card h-100 p-3"
              style={{ 
                backgroundColor: 'var(--card-bg)', 
                color: 'var(--text-primary)',
                border: '1px solid var(--card-border-glow)',
                boxShadow: 'var(--premium-shadow)',
                backdropFilter: 'blur(10px)',
                borderRadius: '16px'
              }}
            >
              <div className="d-flex align-items-start justify-content-between mb-3">
                <div className="p-3 rounded-3 text-white" style={{ backgroundColor: '#2B7FFF' }}>
                  <Clock size={24} />
                </div>
              </div>
              <h3 className="fw-bold mb-1" style={{ color: 'var(--text-primary)' }}>8</h3>
              <p className="mb-0" style={{ color: 'var(--text-secondary)' }}>Active Jobs</p>
              <small style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>+2 today</small>
            </motion.div>
          </div>
          <div className="col-md-3">
              <motion.div 
                whileHover={{ y: -10, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)", scale: 1.02 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="card h-100 p-3"
                style={{ 
                  backgroundColor: 'var(--card-bg)', 
                  color: 'var(--text-primary)',
                  border: '1px solid var(--card-border-glow)',
                  boxShadow: 'var(--premium-shadow)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: '16px'
                }}
              >
                <div className="d-flex align-items-start justify-content-between mb-3">
                  <div className="p-3 rounded-3 text-white" style={{ backgroundColor: '#00C950' }}>
                    <CheckCircle2 size={24} />
                  </div>
                </div>
                <h3 className="fw-bold mb-1" style={{ color: 'var(--text-primary)' }}>5</h3>
                <p className="mb-0" style={{ color: 'var(--text-secondary)' }}>Completed Today</p>
                <small style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>3 pending payment</small>
              </motion.div>
          </div>
          <div className="col-md-3">
            <motion.div 
              whileHover={{ y: -10, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)", scale: 1.02 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="card h-100 p-3"
              style={{ 
                backgroundColor: 'var(--card-bg)', 
                color: 'var(--text-primary)',
                border: '1px solid var(--card-border-glow)',
                boxShadow: 'var(--premium-shadow)',
                backdropFilter: 'blur(10px)',
                borderRadius: '16px'
              }}
            >
              <div className="d-flex align-items-start justify-content-between mb-3">
                <div className="p-3 rounded-3 text-white" style={{ backgroundColor: '#AD46FF' }}>
                  <Wallet size={24} />
                </div>
              </div>
              <h3 className="fw-bold mb-1" style={{ color: 'var(--text-primary)' }}>₦45,230</h3>
              <p className="mb-0" style={{ color: 'var(--text-secondary)' }}>Wallet Balance</p>
              <small style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>+₦12,400 this week</small>
            </motion.div>
          </div>
          <div className="col-md-3">
            <motion.div 
              whileHover={{ y: -10, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)", scale: 1.02 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="card h-100 p-3"
              style={{ 
                backgroundColor: 'var(--card-bg)', 
                color: 'var(--text-primary)',
                border: '1px solid var(--card-border-glow)',
                boxShadow: 'var(--premium-shadow)',
                backdropFilter: 'blur(10px)',
                borderRadius: '16px'
              }}
            >
              <div className="d-flex align-items-start justify-content-between mb-3">
                <div className="p-3 rounded-3 text-white" style={{ backgroundColor: '#FF6900' }}>
                  <AlertTriangle size={24} />
                </div>
              </div>
              <h3 className="fw-bold mb-1" style={{ color: 'var(--text-primary)' }}>3</h3>
              <p className="mb-0" style={{ color: 'var(--text-secondary)' }}>Diagnostic Alerts</p>
              <small style={{ color: 'var(--text-secondary)' }}>New from users</small>
            </motion.div>
          </div>
        </div>

        {/* Diagnostic Alerts */}
        <div className="card mb-4" style={{ backgroundColor: 'var(--card-bg)', color: 'var(--text-primary)', border: '1px solid var(--card-border-glow)', boxShadow: 'var(--premium-shadow)', backdropFilter: 'blur(10px)', borderRadius: '16px' }}>
          <div className="card-header border-0 py-3 d-flex justify-content-between align-items-center" style={{ backgroundColor: 'transparent' }}>
            <div>
              <h5 className="fw-bold mb-1" style={{ color: 'var(--text-primary)' }}>Diagnostic Alerts</h5>
              <p className="mb-0 small" style={{ color: 'var(--text-secondary)' }}>Real-time error codes from users</p>
            </div>
            <button className="btn btn-link text-decoration-none" style={{ color: 'var(--text-secondary)' }}>View All</button>
          </div>
          <div className="card-body">
            <div className="vstack gap-3">
              {DIAGNOSTIC_ALERTS.map((alert) => (
                <motion.div 
                  key={alert.id}
                  whileHover={{ scale: 1.02, backgroundColor: 'var(--hover-bg)' }}
                  className="p-3 border rounded-3"
                  style={{ backgroundColor: 'var(--input-bg)', borderColor: 'var(--border-color)' }}
                  layout
                >
                  <div className="d-flex justify-content-between mb-2">
                    <div className="d-flex gap-3">
                      <div className={`${alert.iconBg} bg-opacity-10 p-2 rounded ${alert.iconColor} h-auto align-self-start`}>
                        <AlertTriangle size={20} />
                      </div>
                      <div>
                        <h6 className="fw-bold mb-1" style={{ color: 'var(--text-primary)' }}>{alert.vehicle}</h6>
                        <p className="small mb-2" style={{ color: 'var(--text-secondary)' }}>{alert.owner}</p>
                        <div className="d-flex gap-2 align-items-center">
                          <span className="badge bg-opacity-10" style={{ backgroundColor: 'var(--bg-tertiary)', color: 'var(--text-secondary)' }}>{alert.code}</span>
                          {alert.severity && (
                            <span className={`badge ${alert.severityBadge} bg-opacity-10 text-danger`}>{alert.severity}</span>
                          )}
                        </div>
                        <p className="small mt-2 mb-0" style={{ color: 'var(--text-secondary)' }}>{alert.description}</p>
                      </div>
                    </div>
                    <small style={{ color: 'var(--text-secondary)' }}>{alert.time}</small>
                  </div>
                  <div className="d-flex gap-2 mt-3 ps-5">
                    <button 
                      className="btn flex-grow-1 text-white" 
                      style={{ backgroundColor: 'var(--accent-primary)', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                      onClick={() => setSelectedAlert(alert)}
                    >
                      Respond
                    </button>
                    <button className="btn border" style={{ backgroundColor: 'var(--card-bg)', color: 'var(--text-secondary)', borderColor: 'var(--border-color)' }}>Details</button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Upcoming Appointments */}
        <div className="card mb-4" style={{ backgroundColor: 'var(--card-bg)', color: 'var(--text-primary)', border: '1px solid var(--card-border-glow)', boxShadow: 'var(--premium-shadow)', backdropFilter: 'blur(10px)', borderRadius: '16px' }}>
          <div className="card-header border-0 py-3 d-flex justify-content-between align-items-center" style={{ backgroundColor: 'transparent' }}>
            <div>
              <h5 className="fw-bold mb-1" style={{ color: 'var(--text-primary)' }}>Upcoming Appointments</h5>
              <p className="text-secondary mb-0 small" style={{ color: 'var(--text-secondary)' }}>Next 24 hours</p>
            </div>
            <button className="btn btn-link text-decoration-none" style={{ color: 'var(--text-secondary)' }}>View All</button>
          </div>
          <div className="card-body p-0">
            <div className="list-group list-group-flush">
              <motion.div 
                whileHover={{ x: 5, backgroundColor: 'var(--hover-bg)' }}
                className="list-group-item p-3 d-flex align-items-center justify-content-between"
                style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border-color)' }}
              >
                <div className="d-flex align-items-center gap-3">
                  <div className="bg-primary bg-opacity-10 p-2 rounded-circle text-primary">
                    <Clock size={20} />
                  </div>
                  <div>
                    <h6 className="fw-bold mb-0" style={{ color: 'var(--text-primary)' }}>Mary Johnson</h6>
                    <small style={{ color: 'var(--text-secondary)' }}>2018 Mercedes C-Class</small>
                    <div className="small mt-1" style={{ color: 'var(--text-secondary)' }}>
                      Full Service • Today, 2:00 PM
                    </div>
                  </div>
                </div>
                <span className="badge bg-success bg-opacity-10 text-success">confirmed</span>
              </motion.div>
              <motion.div 
                whileHover={{ x: 5, backgroundColor: 'var(--hover-bg)' }}
                className="list-group-item p-3 d-flex align-items-center justify-content-between"
                style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border-color)' }}
              >
                <div className="d-flex align-items-center gap-3">
                  <div className="bg-primary bg-opacity-10 p-2 rounded-circle text-primary">
                    <Clock size={20} />
                  </div>
                  <div>
                    <h6 className="fw-bold mb-0" style={{ color: 'var(--text-primary)' }}>Peter Obi</h6>
                    <small style={{ color: 'var(--text-secondary)' }}>2020 BMW X5</small>
                    <div className="small mt-1" style={{ color: 'var(--text-secondary)' }}>
                      Brake Inspection • Today, 4:30 PM
                    </div>
                  </div>
                </div>
                <span className="badge bg-success bg-opacity-10 text-success">confirmed</span>
              </motion.div>
              <motion.div 
                whileHover={{ x: 5, backgroundColor: 'var(--hover-bg)' }}
                className="list-group-item p-3 d-flex align-items-center justify-content-between"
                style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border-color)' }}
              >
                <div className="d-flex align-items-center gap-3">
                  <div className="bg-primary bg-opacity-10 p-2 rounded-circle text-primary">
                    <Clock size={20} />
                  </div>
                  <div>
                    <h6 className="fw-bold mb-0" style={{ color: 'var(--text-primary)' }}>Grace Eze</h6>
                    <small style={{ color: 'var(--text-secondary)' }}>2019 Audi A4</small>
                    <div className="small mt-1" style={{ color: 'var(--text-secondary)' }}>
                      Oil Change • Tomorrow, 10:00 AM
                    </div>
                  </div>
                </div>
                <span className="badge bg-warning bg-opacity-10 text-warning">pending</span>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Action Buttons Grid */}
        <div className="row g-4">
          <div className="col-md-3">
            <motion.button 
              whileHover={{ scale: 1.05, y: -5, boxShadow: 'var(--premium-shadow)' }}
              whileTap={{ scale: 0.95 }}
              className="btn text-white w-100 p-4 d-flex flex-column align-items-center justify-content-center gap-2 border-0" 
              style={{ backgroundColor: 'var(--accent-primary)', borderRadius: '16px', boxShadow: 'var(--premium-shadow)' }}
            >
              <Package size={24} />
              <span className="fw-medium">Order Parts</span>
            </motion.button>
          </div>
          <div className="col-md-3">
            <motion.button 
              whileHover={{ scale: 1.05, y: -5, boxShadow: 'var(--premium-shadow)' }}
              whileTap={{ scale: 0.95 }}
              className="btn w-100 p-4 d-flex flex-column align-items-center justify-content-center gap-2 border"
              style={{ backgroundColor: 'var(--card-bg)', color: 'var(--text-primary)', borderColor: 'var(--card-border-glow)', borderRadius: '16px', boxShadow: 'var(--premium-shadow)' }}
            >
              <BarChart2 size={24} />
              <span className="fw-medium">View Reports</span>
            </motion.button>
          </div>
          <div className="col-md-3">
            <motion.button 
              whileHover={{ scale: 1.05, y: -5, boxShadow: 'var(--premium-shadow)' }}
              whileTap={{ scale: 0.95 }}
              className="btn w-100 p-4 d-flex flex-column align-items-center justify-content-center gap-2 border"
              style={{ backgroundColor: 'var(--card-bg)', color: 'var(--text-primary)', borderColor: 'var(--card-border-glow)', borderRadius: '16px', boxShadow: 'var(--premium-shadow)' }}
            >
              <Clock size={24} />
              <span className="fw-medium">Schedule Service</span>
            </motion.button>
          </div>
          <div className="col-md-3">
            <motion.button 
              whileHover={{ scale: 1.05, y: -5, boxShadow: 'var(--premium-shadow)' }}
              whileTap={{ scale: 0.95 }}
              className="btn w-100 p-4 d-flex flex-column align-items-center justify-content-center gap-2 border"
              style={{ backgroundColor: 'var(--card-bg)', color: 'var(--text-primary)', borderColor: 'var(--card-border-glow)', borderRadius: '16px', boxShadow: 'var(--premium-shadow)' }}
            >
              <Users size={24} />
              <span className="fw-medium">Manage Customers</span>
            </motion.button>
          </div>
        </div>
      </motion.main>

      {/* Alert Response Popup */}
      <AnimatePresence>
        {selectedAlert && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
            style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1050 }}
            onClick={() => setSelectedAlert(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="rounded-3 shadow-lg overflow-hidden"
              style={{ width: '600px', maxWidth: '90%', backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-color)' }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4 border-bottom d-flex justify-content-between align-items-start" style={{ borderColor: 'var(--border-color)' }}>
                <div>
                  <h4 className="fw-bold mb-1" style={{ color: 'var(--text-primary)' }}>Diagnostic Alert Details</h4>
                  <p className="mb-0" style={{ color: 'var(--text-secondary)' }}>{selectedAlert.vehicle}</p>
                </div>
                <button onClick={() => setSelectedAlert(null)} className="btn btn-link p-0" style={{ color: 'var(--text-secondary)' }}>
                  <X size={24} />
                </button>
              </div>
              
              <div className="p-4">
                <div className="mb-4">
                  <label className="small fw-bold text-uppercase mb-2" style={{ color: 'var(--text-secondary)' }}>Error Code</label>
                  <div className="d-flex align-items-center gap-2 mb-3">
                    <span className="badge text-white p-2 rounded" style={{ fontSize: '1rem', backgroundColor: 'var(--sidebar-bg)' }}>
                      {selectedAlert.details.errorCode}
                    </span>
                    {selectedAlert.severity && (
                       <span className={`badge ${selectedAlert.details.severityColor} p-2 rounded`}>
                         {selectedAlert.details.severityText}
                       </span>
                    )}
                  </div>
                  
                  <label className="small fw-bold text-uppercase mb-1" style={{ color: 'var(--text-secondary)' }}>Description</label>
                  <p className="fw-medium mb-3" style={{ color: 'var(--text-primary)' }}>{selectedAlert.description}</p>
                  
                  <div className="row mb-4">
                    <div className="col-6">
                      <label className="small fw-bold text-uppercase mb-1" style={{ color: 'var(--text-secondary)' }}>Customer</label>
                      <p className="fw-medium mb-0" style={{ color: 'var(--text-primary)' }}>{selectedAlert.owner}</p>
                    </div>
                    <div className="col-6">
                      <label className="small fw-bold text-uppercase mb-1" style={{ color: 'var(--text-secondary)' }}>Time Received</label>
                      <p className="fw-medium mb-0" style={{ color: 'var(--text-primary)' }}>{selectedAlert.details.timeReceived}</p>
                    </div>
                  </div>
                  
                  <label className="small fw-bold text-uppercase mb-2" style={{ color: 'var(--text-secondary)' }}>Recommended Actions</label>
                  <div className="p-3 rounded-3" style={{ backgroundColor: 'var(--bg-tertiary)' }}>
                    <ul className="list-unstyled mb-0 d-flex flex-column gap-2 text-primary" style={{ color: 'var(--text-primary)' }}>
                      {selectedAlert.details.actions.map((action, index) => (
                        <li key={index} className="d-flex align-items-center gap-2" style={{ color: 'var(--text-secondary)' }}>
                          <div className="rounded-circle" style={{ width: '6px', height: '6px', backgroundColor: 'var(--text-muted)' }}></div>
                          {action}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div className="d-flex gap-3">
                  <button className="btn flex-grow-1 py-2 text-white border-0" style={{ backgroundColor: 'var(--accent-primary)' }}>
                    Schedule Service
                  </button>
                  <button onClick={() => setSelectedAlert(null)} className="btn border py-2 px-4" style={{ backgroundColor: 'var(--card-bg)', color: 'var(--text-secondary)', borderColor: 'var(--border-color)' }}>
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Dashboard;
