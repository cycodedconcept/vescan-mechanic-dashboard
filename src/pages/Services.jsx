import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; // eslint-disable-line no-unused-vars
import { useOutletContext } from 'react-router-dom';
import {
  Bell,
  Search,
  Filter,
  MoreVertical,
  PlayCircle,
  PauseCircle,
  Clock,
  Wrench,
  CheckCircle,
  AlertCircle,
  Menu
} from 'lucide-react';

const Services = () => {
  const { isSidebarOpen, toggleSidebar } = useOutletContext();
  const [activeTab, setActiveTab] = useState('active');
  const [selectedJob, setSelectedJob] = useState(null);

  const stats = [
    { title: 'Active Jobs', value: '3', color: 'bg-primary' },
    { title: 'Upcoming', value: '2', color: 'bg-info' },
    { title: 'New Alerts', value: '1', color: 'bg-danger' },
  ];

  const jobs = [
    {
      id: 1,
      category: 'active',
      customer: 'John Adeyemi',
      car: '2020 Toyota Camry • ABC-123-XY',
      service: 'Engine Diagnostic & Repair',
      price: '₦28,500',
      laborTime: '3.5h labor',
      progress: 65,
      status: 'In Progress',
      started: '9:00 AM',
      eta: '2:30 PM',
      parts: ['Oxygen Sensor', 'Air Filter']
    },
    {
      id: 2,
      category: 'active',
      customer: 'Sarah Ibrahim',
      car: '2019 Honda Accord • XYZ-456-AB',
      service: 'Brake System Service',
      price: '₦22,000',
      laborTime: '2h labor',
      progress: 30,
      status: 'In Progress',
      started: '10:30 AM',
      eta: '1:00 PM',
      parts: ['Brake Pads (Front)', 'Brake Fluid']
    },
    {
      id: 3,
      category: 'active',
      customer: 'David Okonkwo',
      car: '2021 Lexus ES • DEF-789-CD',
      service: 'Full Service',
      price: '₦35,000',
      laborTime: '1.5h labor',
      progress: 45,
      status: 'Paused',
      started: '8:00 AM',
      eta: 'Waiting for parts',
      parts: ['Oil Filter', 'Engine Oil (5W-30)', 'Cabin Filter']
    },
    {
      id: 4,
      category: 'upcoming',
      customer: 'Chinedu Eze',
      car: '2018 Ford Explorer • LND-555-FR',
      service: 'Transmission Fluid Change',
      price: '₦18,000',
      laborTime: '1h labor',
      progress: 0,
      status: 'Scheduled',
      started: 'Tomorrow',
      eta: '11:00 AM',
      parts: ['Transmission Fluid']
    },
    {
      id: 5,
      category: 'upcoming',
      customer: 'Mary Johnson',
      car: '2015 Hyundai Elantra • KJA-111-LG',
      service: 'Wheel Alignment',
      price: '₦12,000',
      laborTime: '45m labor',
      progress: 0,
      status: 'Scheduled',
      started: 'Tomorrow',
      eta: '2:00 PM',
      parts: []
    },
    {
      id: 6,
      category: 'alerts',
      customer: 'Ibrahim Musa',
      car: '2012 Toyota Corolla • ABJ-888-KW',
      service: 'Overheating Issue',
      price: 'Pending',
      laborTime: 'TBD',
      progress: 10,
      status: 'Critical',
      started: '11:15 AM',
      eta: 'Check Required',
      parts: []
    },
    {
      id: 7,
      category: 'completed',
      customer: 'Anita George',
      car: '2016 Nissan Altima • LAG-222-MN',
      service: 'Oil Change & Filter',
      price: '₦15,000',
      laborTime: '30m labor',
      progress: 100,
      status: 'Completed',
      started: 'Yesterday',
      eta: 'Completed',
      parts: ['Oil Filter', 'Engine Oil (5W-20)']
    }
  ];

  const filteredJobs = jobs.filter(job => job.category === activeTab);

  return (
      <motion.div 
        layout
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="flex-grow-1 d-flex flex-column h-100 overflow-hidden"
      >
        {/* Header */}
        <header className="bg-white border-bottom py-3 px-4 d-flex justify-content-between align-items-center flex-shrink-0">
          <div className="d-flex align-items-center gap-3">
            {!isSidebarOpen && (
              <button onClick={toggleSidebar} className="btn btn-link text-dark p-0">
                <Menu size={24} />
              </button>
            )}
            <div>
              <h5 className="fw-bold mb-0">Service Management</h5>
              <small className="text-muted">Manage your business operations</small>
            </div>
          </div>
          <div className="d-flex align-items-center gap-3">
            <button className="btn btn-light position-relative rounded-circle p-2">
              <Bell size={20} />
              <span className="position-absolute top-0 start-100 translate-middle p-1 bg-danger border border-light rounded-circle">
                <span className="visually-hidden">New alerts</span>
              </span>
            </button>
            <div className="bg-dark text-white rounded-circle d-flex align-items-center justify-content-center fw-bold" style={{ width: '40px', height: '40px' }}>
              JD
            </div>
          </div>
        </header>

        <div className="p-4 flex-grow-1 overflow-auto" style={{ backgroundColor: '#F8F9FA' }}>
          {/* Blue Banner with Stats */}
          <div className="card border-0 mb-4 overflow-hidden text-white" style={{ backgroundColor: '#001F3F', borderRadius: '12px' }}>
            <div className="card-body p-4">
              <h5 className="mb-4">Service Management</h5>
              <div className="row g-4">
                {stats.map((stat, index) => (
                  <div key={index} className="col-md-4">
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="p-3 rounded-3" 
                      style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
                    >
                      <h3 className="fw-bold mb-1">{stat.value}</h3>
                      <span className="opacity-75">{stat.title}</span>
                    </motion.div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="d-flex border-bottom mb-4 overflow-auto">
            {['Active (3)', 'Upcoming (2)', 'Alerts (1)', 'Completed'].map((tab) => {
              const tabKey = tab.split(' ')[0].toLowerCase();
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tabKey)}
                  className={`btn rounded-0 border-0 px-4 py-2 fw-medium position-relative ${
                    activeTab === tabKey
                      ? 'text-primary'
                      : 'text-muted'
                  }`}
                >
                  {tab}
                  {activeTab === tabKey && (
                    <motion.div
                      layoutId="activeTab"
                      className="position-absolute bottom-0 start-0 w-100 bg-primary"
                      style={{ height: '2px' }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Job List */}
          <motion.div layout className="d-flex flex-column gap-3">
            <AnimatePresence mode="popLayout">
              {filteredJobs.map((job) => (
                <motion.div
                  key={job.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  whileHover={{ scale: 1.01, boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}
                  transition={{ duration: 0.2 }}
                  className="card border-0 shadow-sm rounded-3 overflow-hidden"
                >
                  <div className="card-body p-4">
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <div>
                        <h5 className="fw-bold mb-1 d-flex align-items-center gap-2">
                          {job.customer}
                          {job.status === 'Paused' && (
                            <span className="badge bg-warning text-dark fw-normal" style={{ fontSize: '0.75rem' }}>Paused</span>
                          )}
                          {job.category === 'alerts' && (
                             <span className="badge bg-danger bg-opacity-10 text-danger fw-normal" style={{ fontSize: '0.75rem' }}>Critical</span>
                          )}
                        </h5>
                        <div className="text-muted small mb-1">{job.car}</div>
                        <div className="fw-medium">{job.service}</div>
                      </div>
                      <div className="text-end">
                        <h5 className="fw-bold mb-0">{job.price}</h5>
                        <small className="text-muted">{job.laborTime}</small>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="d-flex align-items-center gap-3 mb-3">
                      <small className="text-muted">Progress</small>
                      <div className="progress flex-grow-1" style={{ height: '6px' }}>
                        <motion.div 
                          className="progress-bar" 
                          role="progressbar" 
                          initial={{ width: 0 }}
                          animate={{ width: `${job.progress}%` }}
                          transition={{ duration: 1, ease: "easeOut" }}
                          style={{ backgroundColor: '#001F3F' }} 
                          aria-valuenow={job.progress} 
                          aria-valuemin="0" 
                          aria-valuemax="100"
                        />
                      </div>
                      <small className="fw-medium">{job.progress}%</small>
                    </div>

                    {/* Timestamps */}
                    <div className="d-flex gap-4 mb-3 text-muted small">
                      <div className="d-flex align-items-center gap-1">
                        <Clock size={14} />
                        <span>Started: {job.started}</span>
                      </div>
                      <div className="d-flex align-items-center gap-1">
                        <Clock size={14} />
                        <span>ETA: {job.eta}</span>
                      </div>
                    </div>

                    {/* Parts Tags */}
                    <div className="d-flex flex-wrap gap-2 mb-4">
                      <small className="text-muted me-1 pt-1">Parts Used:</small>
                      {job.parts.length > 0 ? job.parts.map((part, i) => (
                        <span key={i} className="badge bg-light text-dark border fw-normal py-2 px-3">
                          {part}
                        </span>
                      )) : <span className="text-muted small pt-1 fst-italic">No parts recorded</span>}
                    </div>

                    {/* Actions */}
                    <div className="d-flex gap-2">
                      <motion.button 
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="btn btn-dark flex-grow-1 d-flex align-items-center justify-content-center gap-2" 
                        style={{ backgroundColor: '#001F3F' }}
                      >
                        {job.status === 'Paused' ? <PlayCircle size={18} /> : <PauseCircle size={18} />}
                        {job.status === 'Paused' ? 'Resume' : 'Pause'}
                      </motion.button>
                      <motion.button 
                        initial={{ backgroundColor: '#ffffff', color: '#6c757d', borderColor: '#dee2e6' }}
                        whileHover={{ 
                          scale: 1.03, 
                          backgroundColor: '#00BFFF', 
                          color: '#ffffff', 
                          borderColor: '#00BFFF',
                          boxShadow: '0 4px 15px rgba(0, 191, 255, 0.25)' 
                        }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 400, damping: 17 }}
                        className="btn border px-4 shadow-none"
                        onClick={(e) => {
                          e.target.blur();
                          setSelectedJob(job);
                        }}
                      >
                        Update
                      </motion.button>
                      <motion.button 
                         initial={{ backgroundColor: '#ffffff', color: '#6c757d', borderColor: '#dee2e6' }}
                         whileHover={{ 
                           scale: 1.03, 
                           backgroundColor: '#001F3F', 
                           color: '#ffffff', 
                           borderColor: '#001F3F',
                           boxShadow: '0 4px 15px rgba(0, 31, 63, 0.25)' 
                         }}
                         whileTap={{ scale: 0.95 }}
                         transition={{ type: "spring", stiffness: 400, damping: 17 }}
                         className="btn border px-4 shadow-none"
                         onClick={(e) => {
                           e.target.blur();
                           setSelectedJob(job);
                         }}
                      >
                         Details
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            {filteredJobs.length === 0 && (
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                className="text-center py-5 text-muted"
              >
                <div className="mb-3 opacity-50"><CheckCircle size={48} /></div>
                <h5>No jobs found</h5>
                <p>There are no jobs in this category.</p>
              </motion.div>
            )}
          </motion.div>
        </div>

      {/* Job Details Modal */}
      <AnimatePresence>
        {selectedJob && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
            style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1050 }}
            onClick={() => setSelectedJob(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="bg-white rounded-3 shadow-lg overflow-hidden"
              style={{ width: '800px', maxWidth: '95%' }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4 border-bottom d-flex justify-content-between align-items-start">
                <div>
                  <h4 className="fw-bold mb-1">Job Details</h4>
                  <p className="text-secondary mb-0">{selectedJob.car}</p>
                </div>
                <button onClick={() => setSelectedJob(null)} className="btn btn-link text-secondary p-0">
                  <Menu size={24} style={{ transform: 'rotate(45deg)' }} /> {/* Using Menu as X icon substitute or import X */}
                </button>
              </div>

              <div className="p-4" style={{ backgroundColor: '#fff', maxHeight: '70vh', overflowY: 'auto' }}>
                <div className="row g-4 mb-4">
                  <div className="col-md-6">
                    <label className="text-secondary small mb-1">Customer</label>
                    <div className="fw-bold fs-5">{selectedJob.customer}</div>
                  </div>
                  <div className="col-md-6">
                    <label className="text-secondary small mb-1">Status</label>
                    <div>
                      <span className="badge bg-primary bg-opacity-10 text-primary px-3 py-2 rounded-pill">
                        {selectedJob.status}
                      </span>
                    </div>
                  </div>
                  <div className="col-12">
                    <label className="text-secondary small mb-1">Service Type</label>
                    <div className="fw-bold fs-5">{selectedJob.service}</div>
                  </div>
                  <div className="col-md-4">
                    <label className="text-secondary small mb-1">Start Time</label>
                    <div className="fw-bold fs-5">{selectedJob.started}</div>
                  </div>
                  <div className="col-md-4">
                    <label className="text-secondary small mb-1">Labor Hours</label>
                    <div className="fw-bold fs-5">{selectedJob.laborTime}</div>
                  </div>
                  <div className="col-md-4">
                    <label className="text-secondary small mb-1">Total Amount</label>
                    <div className="fw-bold fs-5">{selectedJob.price}</div>
                  </div>
                </div>

                <div className="mb-4">
                  <label className="text-secondary small mb-2">Parts Used</label>
                  <div className="d-flex flex-wrap gap-2">
                    {selectedJob.parts.length > 0 ? selectedJob.parts.map((part, i) => (
                      <span key={i} className="bg-light border px-3 py-2 rounded-2">
                        {part}
                      </span>
                    )) : <span className="text-muted fst-italic">No parts recorded</span>}
                  </div>
                </div>

                <div className="mb-4">
                  <label className="text-secondary small mb-2">Progress</label>
                  <div className="progress mb-2" style={{ height: '12px' }}>
                    <div 
                      className="progress-bar" 
                      role="progressbar" 
                      style={{ width: `${selectedJob.progress}%`, backgroundColor: '#00BFFF' }}
                    ></div>
                  </div>
                  <div className="text-secondary small">{selectedJob.progress}% Complete</div>
                </div>
              </div>

              <div className="p-4 border-top bg-white d-flex gap-3 align-items-center">
                 <button className="btn btn-primary flex-grow-1 py-3 border-0 fw-medium text-white" style={{ backgroundColor: '#00BFFF', fontSize: '1.1rem' }}>
                    Update Progress
                 </button>
                 <button onClick={() => setSelectedJob(null)} className="btn btn-white border px-4 py-3 fw-medium bg-white text-secondary">
                    Close
                 </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Services;
