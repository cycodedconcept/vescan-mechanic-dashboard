import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; // eslint-disable-line no-unused-vars
import { useOutletContext } from 'react-router-dom';
import TopHeader from '../components/TopHeader';
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
        style={{ backgroundColor: 'var(--bg-primary)' }}
      >
        {/* Header */}
        <TopHeader title="Service Management" />

        <div className="p-4 flex-grow-1 overflow-auto" style={{ backgroundColor: 'var(--bg-secondary)' }}>
          {/* Blue Banner with Stats */}
          <div className="card border-0 mb-4 overflow-hidden text-white" style={{ backgroundColor: 'var(--sidebar-bg)', borderRadius: '12px' }}>
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
                      ? 'text-primary'
                      : 'text-secondary'
                  }`}
                  style={activeTab === tabKey ? { color: 'var(--text-primary)', fontWeight: 'bold' } : { color: 'var(--text-secondary)' }}
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
                      style={{ height: '3px', backgroundColor: 'var(--text-primary)' }}
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
                      <h5 className="fw-bold mb-0" style={{ color: 'var(--text-primary)' }}>Recent Completions</h5>
                      <small style={{ color: 'var(--text-secondary)' }}>Last 7 days</small>
                   </div>
                   <button className="btn d-flex align-items-center gap-2 border" style={{ backgroundColor: 'var(--card-bg)', color: 'var(--text-secondary)', borderColor: 'var(--border-color)' }}>
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
                  style={{ backgroundColor: 'var(--card-bg)' }}
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
                               <h5 className="fw-bold mb-1" style={{ color: 'var(--text-primary)' }}>{job.customer}</h5>
                               <div style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>{job.car}</div>
                             </div>
                          </div>
                          <div style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>{job.timeAgo}</div>
                        </div>

                        <div className="ps-2 mb-4">
                           <div className="d-flex align-items-center gap-2 mb-2">
                             <span className="badge bg-dark text-white rounded-1 px-2 py-1" style={{ fontSize: '0.75rem' }}>{job.errorCode}</span>
                             <span className={`badge ${job.severity === 'High Severity' ? 'bg-danger bg-opacity-10 text-danger pulse-animation' : 'bg-warning bg-opacity-10 text-warning'} rounded-1 px-2 py-1`} style={{ fontSize: '0.75rem' }}>{job.severity}</span>
                           </div>
                           <div className="fw-medium mb-3" style={{ color: 'var(--text-primary)' }}>{job.service}</div>

                           {/* Customer Notes */}
                           <div className="p-3 rounded-2 mb-3" style={{ backgroundColor: 'var(--bg-tertiary)' }}>
                              <small className="d-block mb-1" style={{ color: 'var(--text-secondary)' }}>Customer Notes:</small>
                              <div className="small" style={{ color: 'var(--text-secondary)' }}>{job.customerNotes}</div>
                           </div>
                           
                           <div className="d-flex flex-wrap gap-4 small mb-3" style={{ color: 'var(--text-secondary)' }}>
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
                          <button className="btn btn-dark flex-grow-1 py-2 text-white border-0" style={{ backgroundColor: 'var(--sidebar-bg)' }}>
                            Call Customer
                          </button>
                          <button className="btn btn-info flex-grow-1 py-2 text-white border-0" style={{ backgroundColor: '#00BFFF' }}>
                            Schedule Service
                          </button>
                          <button className="btn border px-3 py-2" style={{ backgroundColor: 'var(--card-bg)', color: 'var(--text-secondary)', borderColor: 'var(--border-color)' }}>
                            View Media
                          </button>
                        </div>
                      </>
                    ) : job.category === 'completed' ? (
                      // Completed Job Design
                      <>
                        <div className="d-flex justify-content-between align-items-start mb-2">
                          <div className="d-flex align-items-center gap-2">
                            <h5 className="fw-bold mb-0" style={{ color: 'var(--text-primary)' }}>{job.customer}</h5>
                            {job.isVerified && <CheckCircle size={16} className="text-success" fill="none" />}
                            {!job.isVerified && job.paymentStatus === 'Payment Pending' && (
                              <span className="badge bg-warning bg-opacity-10 text-warning fw-normal px-2 py-1 pulse-animation" style={{ fontSize: '0.75rem' }}>Payment Pending</span>
                            )}
                          </div>
                          <div className="text-end">
                             <h5 className="fw-bold mb-0" style={{ color: 'var(--text-primary)' }}>{job.price}</h5>
                             <small style={{ color: 'var(--text-secondary)' }}>{job.laborTime}</small>
                          </div>
                        </div>
                        
                        <div style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '0.75rem' }}>{job.car}</div>
                        <div className="fw-medium mb-3">{job.service}</div>
                        
                        <div className="d-flex justify-content-between align-items-end border-top pt-3" style={{ borderColor: 'var(--border-color)' }}>
                          <div style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>{job.started}</div>
                          <div className="d-flex gap-1">
                             {[...Array(5)].map((_, i) => (
                               <span key={i} className={i < job.rating ? "text-warning" : "text-muted"} style={{ color: i < job.rating ? '#ffc107' : 'var(--text-muted)' }}>★</span>
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
                              <h5 className="fw-bold mb-1 d-flex align-items-center gap-2" style={{ color: 'var(--text-primary)' }}>
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
                              <div style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '0.25rem' }}>{job.car}</div>
                              <div className="fw-medium" style={{ color: 'var(--text-primary)' }}>{job.service}</div>
                            </div>
                          </div>

                          {/* Time Block */}
                          <div className="d-flex gap-4 p-3 rounded-3 mb-3" style={{ backgroundColor: 'var(--bg-tertiary)' }}>
                            <div className="d-flex align-items-center gap-2">
                              <div className="text-primary" style={{ color: 'var(--text-primary)' }}><Clock size={16} /></div>
                              <span className="small fw-medium" style={{ color: 'var(--text-primary)' }}>{job.started}</span>
                            </div>
                            <div className="d-flex align-items-center gap-2">
                              <div className="text-primary" style={{ color: 'var(--text-primary)' }}><Clock size={16} /></div>
                              <span className="small fw-medium" style={{ color: 'var(--text-primary)' }}>{job.laborTime}</span>
                            </div>
                          </div>

                          {/* Notes */}
                          {job.notes && (
                            <div className="mb-4">
                              <small className="d-block mb-1" style={{ color: 'var(--text-secondary)' }}>Notes:</small>
                              <div className="p-3 rounded-2 small" style={{ backgroundColor: 'var(--bg-tertiary)', color: 'var(--text-secondary)' }}>
                                {job.notes}
                              </div>
                            </div>
                          )}

                          {/* Actions */}
                          <div className="d-flex gap-2">
                            <button className="btn btn-dark flex-grow-1 py-2 text-white border-0" style={{ backgroundColor: 'var(--sidebar-bg)' }}>
                              Start Service
                            </button>
                            <button className="btn border px-4 py-2" style={{ backgroundColor: 'var(--card-bg)', color: 'var(--text-secondary)', borderColor: 'var(--border-color)' }}>
                              Reschedule
                            </button>
                          </div>
                        </>
                      ) : (
                        // Active/Other Job Design
                        <>
                          <div className="d-flex justify-content-between align-items-start mb-2">
                            <div>
                              <h5 className="fw-bold mb-1 d-flex align-items-center gap-2" style={{ color: 'var(--text-primary)' }}>
                                {job.customer}
                                {job.status === 'Paused' && (
                                  <span className="badge bg-warning fw-normal" style={{ fontSize: '0.75rem', color: 'var(--text-primary)' }}>Paused</span>
                                )}
                                {job.category === 'alerts' && (
                                   <span className="badge bg-danger bg-opacity-10 text-danger fw-normal pulse-animation" style={{ fontSize: '0.75rem' }}>Critical</span>
                                )}
                              </h5>
                              <div style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '0.25rem' }}>{job.car}</div>
                              <div className="fw-medium" style={{ color: 'var(--text-primary)' }}>{job.service}</div>
                            </div>
                            <div className="text-end">
                              <h5 className="fw-bold mb-0" style={{ color: 'var(--text-primary)' }}>{job.price}</h5>
                              <small style={{ color: 'var(--text-secondary)' }}>{job.laborTime}</small>
                            </div>
                          </div>

                          {/* Progress Bar */}
                          <div className="d-flex align-items-center gap-3 mb-3">
                            <small style={{ color: 'var(--text-secondary)' }}>Progress</small>
                            <div className="progress flex-grow-1" style={{ height: '6px', backgroundColor: 'var(--bg-tertiary)' }}>
                              <motion.div 
                                className="progress-bar" 
                                role="progressbar" 
                                initial={{ width: 0 }}
                                animate={{ width: `${job.progress}%` }}
                                transition={{ duration: 1, ease: "easeOut" }}
                                style={{ backgroundColor: 'var(--accent-primary)' }} 
                                aria-valuenow={job.progress} 
                                aria-valuemin="0" 
                                aria-valuemax="100"
                              />
                            </div>
                            <small className="fw-medium" style={{ color: 'var(--text-primary)' }}>{job.progress}%</small>
                          </div>

                          {/* Timestamps */}
                          <div className="d-flex gap-4 mb-3" style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
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
                            <small className="me-1 pt-1" style={{ color: 'var(--text-secondary)' }}>Parts Used:</small>
                            {job.parts.length > 0 ? job.parts.map((part, i) => (
                              <span key={i} className="badge fw-normal py-2 px-3 border" style={{ color: 'var(--text-primary)', backgroundColor: 'var(--bg-tertiary)', borderColor: 'var(--border-color)' }}>
                                {part}
                              </span>
                            )) : <span className="small pt-1 fst-italic" style={{ color: 'var(--text-secondary)', opacity: 0.7 }}>No parts recorded</span>}
                          </div>

                          {/* Actions */}
                          <div className="d-flex gap-2">
                            <motion.button 
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              className="btn btn-dark flex-grow-1 d-flex align-items-center justify-content-center gap-2" 
                              style={{ backgroundColor: 'var(--sidebar-bg)' }}
                            >
                              {job.status === 'Paused' ? <PlayCircle size={18} /> : <PauseCircle size={18} />}
                              {job.status === 'Paused' ? 'Resume' : 'Pause'}
                            </motion.button>
                            <motion.button 
                              initial={{ backgroundColor: 'var(--card-bg)', color: 'var(--text-secondary)', borderColor: 'var(--border-color)' }}
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
                               initial={{ backgroundColor: 'var(--card-bg)', color: 'var(--text-secondary)', borderColor: 'var(--border-color)' }}
                               whileHover={{ 
                                 scale: 1.03, 
                                 backgroundColor: 'var(--sidebar-bg)', 
                                 color: '#ffffff', 
                                 borderColor: 'var(--sidebar-bg)',
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
                className="text-center py-5" style={{ color: 'var(--text-secondary)' }}
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
              className="rounded-3 shadow-lg overflow-hidden"
              style={{ width: '800px', maxWidth: '95%', backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-color)' }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4 border-bottom d-flex justify-content-between align-items-start" style={{ borderColor: 'var(--border-color)' }}>
                <div>
                  <h4 className="fw-bold mb-1" style={{ color: 'var(--text-primary)' }}>Job Details</h4>
                  <p className="mb-0" style={{ color: 'var(--text-secondary)' }}>{selectedJob.car}</p>
                </div>
                <button onClick={() => setSelectedJob(null)} className="btn btn-link p-0" style={{ color: 'var(--text-secondary)' }}>
                  <Menu size={24} style={{ transform: 'rotate(45deg)' }} /> {/* Using Menu as X icon substitute or import X */}
                </button>
              </div>

              <div className="p-4" style={{ backgroundColor: 'var(--card-bg)', maxHeight: '70vh', overflowY: 'auto' }}>
                <div className="row g-4 mb-4">
                  <div className="col-md-6">
                    <label className="small mb-1" style={{ color: 'var(--text-secondary)' }}>Customer</label>
                    <div className="fw-bold fs-5" style={{ color: 'var(--text-primary)' }}>{selectedJob.customer}</div>
                  </div>
                  <div className="col-md-6">
                    <label className="small mb-1" style={{ color: 'var(--text-secondary)' }}>Status</label>
                    <div>
                      <span className="badge bg-opacity-10 px-3 py-2 rounded-pill" style={{ backgroundColor: 'rgba(0, 191, 255, 0.15)', color: '#00BFFF' }}>
                        {selectedJob.status}
                      </span>
                    </div>
                  </div>
                  <div className="col-12">
                    <label className="small mb-1" style={{ color: 'var(--text-secondary)' }}>Service Type</label>
                    <div className="fw-bold fs-5" style={{ color: 'var(--text-primary)' }}>{selectedJob.service}</div>
                  </div>
                  <div className="col-md-4">
                    <label className="small mb-1" style={{ color: 'var(--text-secondary)' }}>Start Time</label>
                    <div className="fw-bold fs-5" style={{ color: 'var(--text-primary)' }}>{selectedJob.started}</div>
                  </div>
                  <div className="col-md-4">
                    <label className="small mb-1" style={{ color: 'var(--text-secondary)' }}>Labor Hours</label>
                    <div className="fw-bold fs-5" style={{ color: 'var(--text-primary)' }}>{selectedJob.laborTime}</div>
                  </div>
                  <div className="col-md-4">
                    <label className="small mb-1" style={{ color: 'var(--text-secondary)' }}>Total Amount</label>
                    <div className="fw-bold fs-5" style={{ color: 'var(--text-primary)' }}>{selectedJob.price}</div>
                  </div>
                </div>

                <div className="mb-4">
                  <label className="small mb-2" style={{ color: 'var(--text-secondary)' }}>Parts Used</label>
                  <div className="d-flex flex-wrap gap-2">
                    {selectedJob.parts.length > 0 ? selectedJob.parts.map((part, i) => (
                      <span key={i} className="border px-3 py-2 rounded-2" style={{ backgroundColor: 'var(--bg-tertiary)', color: 'var(--text-primary)', borderColor: 'var(--border-color)' }}>
                        {part}
                      </span>
                    )) : <span className="fst-italic" style={{ color: 'var(--text-secondary)', opacity: 0.7 }}>No parts recorded</span>}
                  </div>
                </div>

                <div className="mb-4">
                  <label className="small mb-2" style={{ color: 'var(--text-secondary)' }}>Progress</label>
                  <div className="progress mb-2" style={{ height: '12px', backgroundColor: 'var(--bg-tertiary)' }}>
                    <div 
                      className="progress-bar" 
                      role="progressbar" 
                      style={{ width: `${selectedJob.progress}%`, backgroundColor: 'var(--accent-primary)' }}
                    ></div>
                  </div>
                  <div className="small" style={{ color: 'var(--text-secondary)' }}>{selectedJob.progress}% Complete</div>
                </div>
              </div>

              <div className="p-4 border-top d-flex gap-3 align-items-center" style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border-color)' }}>
                 <button className="btn btn-info flex-grow-1 py-3 border-0 fw-medium text-white" style={{ backgroundColor: '#00BFFF', fontSize: '1.1rem' }}>
                    Update Progress
                 </button>
                 <button onClick={() => setSelectedJob(null)} className="btn border px-4 py-3 fw-medium" style={{ backgroundColor: 'var(--card-bg)', color: 'var(--text-secondary)', borderColor: 'var(--border-color)' }}>
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
