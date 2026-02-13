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
  Menu,
  AlertTriangle,
  MapPin,
  Phone
} from 'lucide-react';

import { JOBS, STATS } from '../data/mockData';

const Services = () => {
  const { isSidebarOpen, toggleSidebar } = useOutletContext();
  const [activeTab, setActiveTab] = useState('active');
  const [selectedJob, setSelectedJob] = useState(null);

  const filteredJobs = JOBS.filter(job => job.category === activeTab);

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
              <button 
                onClick={toggleSidebar} 
                className="btn btn-link p-0 text-dark me-2"
              >
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
                {STATS.map((stat, index) => (
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
            {['Active Jobs (3)', 'Upcoming (3)', 'Alerts (3)', 'Completed'].map((tab) => {
              const tabKey = tab.split(' ')[0].toLowerCase();
              const isAlerts = tab.startsWith('Alerts');
              const isActive = activeTab === tabKey || (tabKey === 'active' && activeTab === 'active'); // simplified logic relying on tabKey alignment
              
              // Map 'Active Jobs' to 'active' key if needed, or just use the first word lowercased
              // Current state uses 'active', 'upcoming', 'alerts', 'completed'
              // 'Active Jobs' -> 'active' (via split)
              
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tabKey)}
                  className={`btn rounded-0 border-0 px-4 py-3 fw-medium position-relative ${
                    activeTab === tabKey
                      ? 'text-dark'
                      : 'text-muted'
                  }`}
                  style={activeTab === tabKey ? { color: '#001F3F', fontWeight: 'bold' } : {}}
                >
                  <span className="position-relative">
                    {tab}
                    {isAlerts && (
                      <span 
                        className="position-absolute border border-white rounded-circle bg-danger"
                        style={{ 
                          width: '8px', 
                          height: '8px', 
                          top: '-2px', 
                          right: '-8px' 
                        }}
                      />
                    )}
                  </span>
                  {activeTab === tabKey && (
                    <motion.div
                      layoutId="activeTab"
                      className="position-absolute bottom-0 start-0 w-100"
                      style={{ height: '3px', backgroundColor: '#001F3F' }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Job List */}
          <motion.div layout className="d-flex flex-column gap-3">
            <AnimatePresence mode="popLayout">
              {activeTab === 'completed' && (
                <motion.div 
                   key="completed-header"
                   initial={{ opacity: 0, y: -10 }}
                   animate={{ opacity: 1, y: 0 }}
                   exit={{ opacity: 0, y: -10 }}
                   className="d-flex justify-content-between align-items-center mb-2 px-1"
                >
                   <div>
                      <h5 className="fw-bold mb-0">Recent Completions</h5>
                      <small className="text-muted">Last 7 days</small>
                   </div>
                   <button className="btn btn-white border d-flex align-items-center gap-2 bg-white text-secondary">
                      <Filter size={16} />
                      Filter
                   </button>
                </motion.div>
              )}

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
                  <div className={`card-body p-4 ${job.category === 'alerts' ? 'position-relative' : ''}`}>
                    {job.category === 'alerts' && (
                        <div 
                          className="position-absolute start-0 top-0 bottom-0 rounded-start-3" 
                          style={{ 
                            width: '4px', 
                            backgroundColor: job.severity === 'High Severity' ? '#dc3545' : '#fd7e14' 
                          }} 
                        />
                    )}

                    {job.category === 'alerts' ? (
                      // Alert Job Design
                      <>
                        <div className="d-flex justify-content-between align-items-start mb-3 ps-2">
                          <div className="d-flex gap-3">
                             <div 
                               className={`rounded-circle d-flex align-items-center justify-content-center flex-shrink-0 ${job.severity === 'High Severity' ? 'bg-danger bg-opacity-10 text-danger' : 'bg-warning bg-opacity-10 text-warning'}`}
                               style={{ width: '40px', height: '40px' }}
                             >
                                <AlertTriangle size={20} className={job.status === 'Critical' ? 'pulse-animation' : ''} />
                             </div>
                             <div>
                               <h5 className="fw-bold mb-1">{job.customer}</h5>
                               <div className="text-muted small">{job.car}</div>
                             </div>
                          </div>
                          <div className="text-muted small">{job.timeAgo}</div>
                        </div>

                        <div className="ps-2 mb-4">
                           <div className="d-flex align-items-center gap-2 mb-2">
                             <span className="badge bg-dark text-white rounded-1 px-2 py-1" style={{ fontSize: '0.75rem' }}>{job.errorCode}</span>
                             <span className={`badge ${job.severity === 'High Severity' ? 'bg-danger bg-opacity-10 text-danger pulse-animation' : 'bg-warning bg-opacity-10 text-warning'} rounded-1 px-2 py-1`} style={{ fontSize: '0.75rem' }}>{job.severity}</span>
                           </div>
                           <div className="fw-medium mb-3">{job.service}</div>

                           {/* Customer Notes */}
                           <div className="p-3 bg-light rounded-2 mb-3">
                              <small className="text-muted d-block mb-1">Customer Notes:</small>
                              <div className="small text-secondary">{job.customerNotes}</div>
                           </div>
                           
                           <div className="d-flex flex-wrap gap-4 text-muted small mb-3">
                              {job.location && (
                                <div className="d-flex align-items-center gap-1">
                                  <MapPin size={14} className="text-danger" />
                                  <span>{job.location}</span>
                                </div>
                              )}
                              {job.phone && (
                                <div className="d-flex align-items-center gap-1">
                                  <Phone size={14} />
                                  <span>{job.phone}</span>
                                </div>
                              )}
                           </div>

                           <div className="d-flex gap-2">
                              {job.imagesCount > 0 && <span className="badge bg-primary bg-opacity-10 text-primary fw-normal px-2 py-1">{job.imagesCount} {job.imagesCount === 1 ? 'Image' : 'Images'}</span>}
                              {job.videoCount > 0 && <span className="badge bg-purple bg-opacity-10 text-purple fw-normal px-2 py-1" style={{ color: '#6f42c1', backgroundColor: 'rgba(111, 66, 193, 0.1)' }}>{job.videoCount} {job.videoCount === 1 ? 'Video' : 'Videos'}</span>}
                           </div>
                        </div>

                        {/* Actions */}
                        <div className="d-flex gap-2 ps-2">
                          <button className="btn btn-dark flex-grow-1 py-2 text-white border-0" style={{ backgroundColor: '#001F3F' }}>
                            Call Customer
                          </button>
                          <button className="btn btn-info flex-grow-1 py-2 text-white border-0" style={{ backgroundColor: '#00BFFF' }}>
                            Schedule Service
                          </button>
                          <button className="btn btn-white border px-3 py-2 text-secondary bg-white">
                            View Media
                          </button>
                        </div>
                      </>
                    ) : job.category === 'completed' ? (
                      // Completed Job Design
                      <>
                        <div className="d-flex justify-content-between align-items-start mb-2">
                          <div className="d-flex align-items-center gap-2">
                            <h5 className="fw-bold mb-0">{job.customer}</h5>
                            {job.isVerified && <CheckCircle size={16} className="text-success" fill="none" />}
                            {!job.isVerified && job.paymentStatus === 'Payment Pending' && (
                              <span className="badge bg-warning bg-opacity-10 text-warning fw-normal px-2 py-1 pulse-animation" style={{ fontSize: '0.75rem' }}>Payment Pending</span>
                            )}
                          </div>
                          <div className="text-end">
                             <h5 className="fw-bold mb-0">{job.price}</h5>
                             <small className="text-muted">{job.laborTime}</small>
                          </div>
                        </div>
                        
                        <div className="text-muted small mb-3">{job.car}</div>
                        <div className="fw-medium mb-3">{job.service}</div>
                        
                        <div className="d-flex justify-content-between align-items-end border-top pt-3">
                          <div className="text-muted small">{job.started}</div>
                          <div className="d-flex gap-1">
                             {[...Array(5)].map((_, i) => (
                               <span key={i} className={i < job.rating ? "text-warning" : "text-muted"}>★</span>
                             ))}
                          </div>
                        </div>
                       </>
                    ) : job.category === 'upcoming' ? (
                        // ... existing upcoming code ... (keep as is)

                        // Upcoming Job Design
                        <>
                          <div className="d-flex justify-content-between align-items-start mb-3">
                            <div>
                              <h5 className="fw-bold mb-1 d-flex align-items-center gap-2">
                                {job.customer}
                                <span 
                                  className={`badge ${
                                    job.status === 'Confirmed' 
                                      ? 'bg-success bg-opacity-10 text-success' 
                                      : 'bg-warning bg-opacity-10 text-warning pulse-animation'
                                  } px-2 py-1 rounded-1 fw-normal`} 
                                  style={{ fontSize: '0.75rem' }}
                                >
                                  {job.status === 'Confirmed' ? 'confirmed' : 'pending'}
                                </span>
                              </h5>
                              <div className="text-muted small mb-1">{job.car}</div>
                              <div className="fw-medium">{job.service}</div>
                            </div>
                          </div>

                          {/* Time Block */}
                          <div className="d-flex gap-4 p-3 rounded-3 mb-3" style={{ backgroundColor: '#F0F7FF' }}>
                            <div className="d-flex align-items-center gap-2">
                              <div className="text-primary"><Clock size={16} /></div>
                              <span className="small fw-medium text-dark">{job.started}</span>
                            </div>
                            <div className="d-flex align-items-center gap-2">
                              <div className="text-primary"><Clock size={16} /></div>
                              <span className="small fw-medium text-dark">{job.laborTime}</span>
                            </div>
                          </div>

                          {/* Notes */}
                          {job.notes && (
                            <div className="mb-4">
                              <small className="text-muted d-block mb-1">Notes:</small>
                              <div className="p-3 bg-light rounded-2 small text-secondary">
                                {job.notes}
                              </div>
                            </div>
                          )}

                          {/* Actions */}
                          <div className="d-flex gap-2">
                            <button className="btn btn-dark flex-grow-1 py-2 text-white border-0" style={{ backgroundColor: '#001F3F' }}>
                              Start Service
                            </button>
                            <button className="btn btn-white border px-4 py-2 text-secondary bg-white">
                              Reschedule
                            </button>
                          </div>
                        </>
                      ) : (
                        // Active/Other Job Design
                        <>
                          <div className="d-flex justify-content-between align-items-start mb-2">
                            <div>
                              <h5 className="fw-bold mb-1 d-flex align-items-center gap-2">
                                {job.customer}
                                {job.status === 'Paused' && (
                                  <span className="badge bg-warning text-dark fw-normal" style={{ fontSize: '0.75rem' }}>Paused</span>
                                )}
                                {job.category === 'alerts' && (
                                   <span className="badge bg-danger bg-opacity-10 text-danger fw-normal pulse-animation" style={{ fontSize: '0.75rem' }}>Critical</span>
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
                        </>
                      )}
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
            key="job-details-modal"
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
