import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from '../components/Sidebar';
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

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);
  const [selectedAlert, setSelectedAlert] = React.useState(null);

  const diagnosticAlerts = [
    {
      id: 1,
      vehicle: "2020 Toyota Camry",
      owner: "John Adeyemi",
      code: "P0420",
      severity: "Urgent",
      severityBadge: "bg-danger",
      description: "Catalyst System Efficiency Below Threshold",
      time: "15 mins ago",
      iconColor: "text-danger",
      iconBg: "bg-danger",
      details: {
        errorCode: "P0428",
        severityText: "High Severity",
        severityColor: "bg-danger bg-opacity-10 text-danger",
        actions: [
          "Inspect oxygen sensor and exhaust system",
          "Check for exhaust leaks",
          "Verify catalytic converter efficiency",
          "Run full diagnostic scan"
        ],
        timeReceived: "10:45 AM"
      }
    },
    {
      id: 2,
      vehicle: "2019 Honda Accord",
      owner: "Sarah Ibrahim",
      code: "P0171",
      severity: null,
      description: "System Too Lean (Bank 1)",
      time: "1 hour ago",
      iconColor: "text-warning",
      iconBg: "bg-warning",
      details: {
        errorCode: "P0171",
        severityText: "Medium Severity",
        severityColor: "bg-warning bg-opacity-10 text-warning",
        actions: [
          "Check mass air flow sensor",
          "Inspect vacuum lines for leaks",
          "Check fuel pressure"
        ],
        timeReceived: "09:30 AM"
      }
    },
    {
      id: 3,
      vehicle: "2021 Lexus ES",
      owner: "David Okonkwo",
      code: "P0300",
      severity: "Urgent",
      severityBadge: "bg-danger",
      description: "Random/Multiple Cylinder Misfire Detected",
      time: "2 hours ago",
      iconColor: "text-danger",
      iconBg: "bg-danger",
      details: {
        errorCode: "P0300",
        severityText: "High Severity",
        severityColor: "bg-danger bg-opacity-10 text-danger",
        actions: [
          "Check spark plugs and coils",
          "Inspect fuel injectors",
          "Compression test cylinders"
        ],
        timeReceived: "08:15 AM"
      }
    }
  ];

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="d-flex min-vh-100 bg-light" style={{ fontFamily: 'Arial, sans-serif' }}>
      {/* Sidebar */}
      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main Content */}
      <motion.main 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex-grow-1 p-4 overflow-auto" 
        style={{ maxHeight: '100vh' }}
      >
        {/* Header */}
        <header className="d-flex justify-content-between align-items-center mb-4">
          <div className="d-flex align-items-center gap-3">
            {!isSidebarOpen && (
              <button onClick={toggleSidebar} className="btn btn-link text-dark p-0 me-2">
                <Menu size={24} />
              </button>
            )}
            <div>
              <h2 className="fw-bold mb-1">Dashboard Overview</h2>
              <p className="text-secondary mb-0">Manage your business operations</p>
            </div>
          </div>
          <div className="d-flex align-items-center gap-3">
            <button className="btn btn-link text-secondary p-0 position-relative">
              <Bell size={24} />
              <span className="position-absolute top-0 start-100 translate-middle p-1 bg-danger border border-light rounded-circle">
                <span className="visually-hidden">New alerts</span>
              </span>
            </button>
            <div className="bg-dark text-white rounded-circle d-flex align-items-center justify-content-center fw-bold" style={{ width: '40px', height: '40px' }}>
              JD
            </div>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="row g-4 mb-4">
          <div className="col-md-3">
            <motion.div 
              whileHover={{ y: -5, boxShadow: "0 .5rem 1rem rgba(0,0,0,.15)" }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="card border-0 shadow-sm h-100 p-3"
            >
              <div className="d-flex align-items-start justify-content-between mb-3">
                <div className="bg-primary bg-opacity-10 p-3 rounded-3 text-primary">
                  <Clock size={24} />
                </div>
              </div>
              <h3 className="fw-bold mb-1">8</h3>
              <p className="text-secondary mb-0">Active Jobs</p>
              <small className="text-success">+2 today</small>
            </motion.div>
          </div>
          <div className="col-md-3">
            <motion.div 
              whileHover={{ y: -5, boxShadow: "0 .5rem 1rem rgba(0,0,0,.15)" }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="card border-0 shadow-sm h-100 p-3"
            >
              <div className="d-flex align-items-start justify-content-between mb-3">
                <div className="bg-success bg-opacity-10 p-3 rounded-3 text-success">
                  <CheckCircle2 size={24} />
                </div>
              </div>
              <h3 className="fw-bold mb-1">5</h3>
              <p className="text-secondary mb-0">Completed Today</p>
              <small className="text-secondary">3 pending payment</small>
            </motion.div>
          </div>
          <div className="col-md-3">
            <motion.div 
              whileHover={{ y: -5, boxShadow: "0 .5rem 1rem rgba(0,0,0,.15)" }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="card border-0 shadow-sm h-100 p-3"
            >
              <div className="d-flex align-items-start justify-content-between mb-3">
                <div className="bg-info bg-opacity-10 p-3 rounded-3 text-info">
                  <Wallet size={24} />
                </div>
              </div>
              <h3 className="fw-bold mb-1">₦45,230</h3>
              <p className="text-secondary mb-0">Wallet Balance</p>
              <small className="text-secondary">+₦12,400 this week</small>
            </motion.div>
          </div>
          <div className="col-md-3">
            <motion.div 
              whileHover={{ y: -5, boxShadow: "0 .5rem 1rem rgba(0,0,0,.15)" }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="card border-0 shadow-sm h-100 p-3"
            >
              <div className="d-flex align-items-start justify-content-between mb-3">
                <div className="bg-warning bg-opacity-10 p-3 rounded-3 text-warning">
                  <AlertTriangle size={24} />
                </div>
              </div>
              <h3 className="fw-bold mb-1">3</h3>
              <p className="text-secondary mb-0">Diagnostic Alerts</p>
              <small className="text-secondary">New from users</small>
            </motion.div>
          </div>
        </div>

        {/* Diagnostic Alerts */}
        <div className="card border-0 shadow-sm mb-4">
          <div className="card-header bg-white border-0 py-3 d-flex justify-content-between align-items-center">
            <div>
              <h5 className="fw-bold mb-1">Diagnostic Alerts</h5>
              <p className="text-secondary mb-0 small">Real-time error codes from users</p>
            </div>
            <button className="btn btn-link text-decoration-none text-secondary">View All</button>
          </div>
          <div className="card-body">
            <div className="vstack gap-3">
              {diagnosticAlerts.map((alert) => (
                <motion.div 
                  key={alert.id}
                  whileHover={{ scale: 1.02, backgroundColor: 'rgba(248,249,250, 0.8)' }}
                  className="p-3 border rounded-3 bg-light bg-opacity-50"
                  layout
                >
                  <div className="d-flex justify-content-between mb-2">
                    <div className="d-flex gap-3">
                      <div className={`${alert.iconBg} bg-opacity-10 p-2 rounded ${alert.iconColor} h-auto align-self-start`}>
                        <AlertTriangle size={20} />
                      </div>
                      <div>
                        <h6 className="fw-bold mb-1">{alert.vehicle}</h6>
                        <p className="text-secondary small mb-2">{alert.owner}</p>
                        <div className="d-flex gap-2 align-items-center">
                          <span className="badge bg-secondary bg-opacity-10 text-secondary">{alert.code}</span>
                          {alert.severity && (
                            <span className={`badge ${alert.severityBadge} bg-opacity-10 text-danger`}>{alert.severity}</span>
                          )}
                        </div>
                        <p className="text-secondary small mt-2 mb-0">{alert.description}</p>
                      </div>
                    </div>
                    <small className="text-secondary">{alert.time}</small>
                  </div>
                  <div className="d-flex gap-2 mt-3 ps-5">
                    <button 
                      className="btn btn-primary flex-grow-1" 
                      style={{ backgroundColor: '#001F3F' }}
                      onClick={() => setSelectedAlert(alert)}
                    >
                      Respond
                    </button>
                    <button className="btn btn-outline-secondary">Details</button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Upcoming Appointments */}
        <div className="card border-0 shadow-sm mb-4">
          <div className="card-header bg-white border-0 py-3 d-flex justify-content-between align-items-center">
            <div>
              <h5 className="fw-bold mb-1">Upcoming Appointments</h5>
              <p className="text-secondary mb-0 small">Next 24 hours</p>
            </div>
            <button className="btn btn-link text-decoration-none text-secondary">View All</button>
          </div>
          <div className="card-body p-0">
            <div className="list-group list-group-flush">
              <motion.div 
                whileHover={{ x: 5, backgroundColor: 'rgba(0,0,0,0.02)' }}
                className="list-group-item p-3 d-flex align-items-center justify-content-between"
              >
                <div className="d-flex align-items-center gap-3">
                  <div className="bg-primary bg-opacity-10 p-2 rounded-circle text-primary">
                    <Clock size={20} />
                  </div>
                  <div>
                    <h6 className="fw-bold mb-0">Mary Johnson</h6>
                    <small className="text-secondary">2018 Mercedes C-Class</small>
                    <div className="small text-secondary mt-1">
                      Full Service • Today, 2:00 PM
                    </div>
                  </div>
                </div>
                <span className="badge bg-success bg-opacity-10 text-success">confirmed</span>
              </motion.div>
              <motion.div 
                whileHover={{ x: 5, backgroundColor: 'rgba(0,0,0,0.02)' }}
                className="list-group-item p-3 d-flex align-items-center justify-content-between"
              >
                <div className="d-flex align-items-center gap-3">
                  <div className="bg-primary bg-opacity-10 p-2 rounded-circle text-primary">
                    <Clock size={20} />
                  </div>
                  <div>
                    <h6 className="fw-bold mb-0">Peter Obi</h6>
                    <small className="text-secondary">2020 BMW X5</small>
                    <div className="small text-secondary mt-1">
                      Brake Inspection • Today, 4:30 PM
                    </div>
                  </div>
                </div>
                <span className="badge bg-success bg-opacity-10 text-success">confirmed</span>
              </motion.div>
              <motion.div 
                whileHover={{ x: 5, backgroundColor: 'rgba(0,0,0,0.02)' }}
                className="list-group-item p-3 d-flex align-items-center justify-content-between"
              >
                <div className="d-flex align-items-center gap-3">
                  <div className="bg-primary bg-opacity-10 p-2 rounded-circle text-primary">
                    <Clock size={20} />
                  </div>
                  <div>
                    <h6 className="fw-bold mb-0">Grace Eze</h6>
                    <small className="text-secondary">2019 Audi A4</small>
                    <div className="small text-secondary mt-1">
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
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn btn-info text-white w-100 p-4 d-flex flex-column align-items-center justify-content-center gap-2 border-0" 
              style={{ backgroundColor: '#00BFFF' }}
            >
              <Package size={24} />
              <span className="fw-medium">Order Parts</span>
            </motion.button>
          </div>
          <div className="col-md-3">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn btn-white w-100 p-4 d-flex flex-column align-items-center justify-content-center gap-2 border shadow-sm bg-white"
            >
              <BarChart2 size={24} />
              <span className="fw-medium">View Reports</span>
            </motion.button>
          </div>
          <div className="col-md-3">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn btn-white w-100 p-4 d-flex flex-column align-items-center justify-content-center gap-2 border shadow-sm bg-white"
            >
              <Clock size={24} />
              <span className="fw-medium">Schedule Service</span>
            </motion.button>
          </div>
          <div className="col-md-3">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn btn-white w-100 p-4 d-flex flex-column align-items-center justify-content-center gap-2 border shadow-sm bg-white"
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
              className="bg-white rounded-3 shadow-lg overflow-hidden"
              style={{ width: '600px', maxWidth: '90%' }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4 border-bottom d-flex justify-content-between align-items-start">
                <div>
                  <h4 className="fw-bold mb-1">Diagnostic Alert Details</h4>
                  <p className="text-secondary mb-0">{selectedAlert.vehicle}</p>
                </div>
                <button onClick={() => setSelectedAlert(null)} className="btn btn-link text-secondary p-0">
                  <X size={24} />
                </button>
              </div>
              
              <div className="p-4">
                <div className="mb-4">
                  <label className="text-secondary small fw-bold text-uppercase mb-2">Error Code</label>
                  <div className="d-flex align-items-center gap-2 mb-3">
                    <span className="badge bg-dark text-white p-2 rounded" style={{ fontSize: '1rem' }}>
                      {selectedAlert.details.errorCode}
                    </span>
                    {selectedAlert.severity && (
                       <span className={`badge ${selectedAlert.details.severityColor} p-2 rounded`}>
                         {selectedAlert.details.severityText}
                       </span>
                    )}
                  </div>
                  
                  <label className="text-secondary small fw-bold text-uppercase mb-1">Description</label>
                  <p className="fw-medium mb-3">{selectedAlert.description}</p>
                  
                  <div className="row mb-4">
                    <div className="col-6">
                      <label className="text-secondary small fw-bold text-uppercase mb-1">Customer</label>
                      <p className="fw-medium mb-0">{selectedAlert.owner}</p>
                    </div>
                    <div className="col-6">
                      <label className="text-secondary small fw-bold text-uppercase mb-1">Time Received</label>
                      <p className="fw-medium mb-0">{selectedAlert.details.timeReceived}</p>
                    </div>
                  </div>
                  
                  <label className="text-secondary small fw-bold text-uppercase mb-2">Recommended Actions</label>
                  <div className="bg-light p-3 rounded-3">
                    <ul className="list-unstyled mb-0 d-flex flex-column gap-2">
                      {selectedAlert.details.actions.map((action, index) => (
                        <li key={index} className="d-flex align-items-center gap-2">
                          <div className="bg-secondary rounded-circle" style={{ width: '6px', height: '6px' }}></div>
                          {action}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div className="d-flex gap-3">
                  <button className="btn btn-primary flex-grow-1 py-2 text-white border-0" style={{ backgroundColor: '#00BFFF' }}>
                    Schedule Service
                  </button>
                  <button onClick={() => setSelectedAlert(null)} className="btn btn-outline-secondary py-2 px-4">
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Dashboard;
