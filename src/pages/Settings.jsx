import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { motion } from 'framer-motion';
import TopHeader from '../components/TopHeader';
import { 
  Bell, 
  Menu,
  User,
  Lock,
  BellRing,
  Briefcase,
  CreditCard,
  Plug,
  Palette,
  Upload,
  Save,
  Eye,
  EyeOff,
  ShieldCheck,
  Smartphone,
  Monitor,
  Building2,
  MapPin,
  Clock,
  Wallet,
  Plus,
  CheckCircle2,
  Zap,
  Wrench,
  Boxes,
  FileBarChart,
  RefreshCw,
  AlertCircle,
  Globe
} from 'lucide-react';

import { settingsTabs as tabs } from '../data/mockData';

const Settings = () => {
  const { isSidebarOpen, toggleSidebar } = useOutletContext();
  const [activeTab, setActiveTab] = useState('profile');
  const [smsEnabled, setSmsEnabled] = useState(false);
  const [authAppEnabled, setAuthAppEnabled] = useState(false);

  // Email Notifications State
  const [emailService, setEmailService] = useState(true);
  const [emailDiag, setEmailDiag] = useState(true);
  const [emailPay, setEmailPay] = useState(true);
  const [emailMsg, setEmailMsg] = useState(false);

  // Push Notifications State
  const [pushService, setPushService] = useState(true);
  const [pushUrgent, setPushUrgent] = useState(true);
  const [pushPay, setPushPay] = useState(true);
  const [pushInv, setPushInv] = useState(false);

  // SMS Notifications State
  const [smsService, setSmsService] = useState(true);
  const [smsPay, setSmsPay] = useState(false);

  // Business Section State
  const [autoAccept, setAutoAccept] = useState(false);
  const [mobileService, setMobileService] = useState(false);
  const [emergencyService, setEmergencyService] = useState(false);

  // Payment Section State
  const [autoWithdraw, setAutoWithdraw] = useState(false);
  const [payCredit, setPayCredit] = useState(true);
  const [payWallet, setPayWallet] = useState(true);
  const [payCash, setPayCash] = useState(false);
  const [payBank, setPayBank] = useState(false);

  // Integrations Section State
  const [vescanApi, setVescanApi] = useState(true);
  const [diagnosticTools, setDiagnosticTools] = useState(true);

  // Appearance Section State
  const { theme, setTheme } = useTheme();
  const [compactMode, setCompactMode] = useState(false);
  const [showLabels, setShowLabels] = useState(true);
  const [showBadges, setShowBadges] = useState(true);

  return (
    <div className="d-flex flex-column h-100" style={{ fontFamily: 'Inter, sans-serif', backgroundColor: 'var(--bg-secondary)', color: 'var(--text-primary)' }}>
      {/* Top Header */}
      <TopHeader title="Settings" />

      <div className="flex-grow-1 overflow-auto p-4">
        <div className="w-100">
          
          {/* Tabs Navigation */}
          <div className="rounded-pill p-1 d-flex flex-wrap overflow-hidden mb-4" style={{ backgroundColor: 'var(--bg-tertiary)' }}>
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`btn flex-grow-1 rounded-pill d-flex align-items-center justify-content-center gap-2 border-0 py-2 transition-all ${activeTab === tab.id ? 'shadow-sm' : ''}`}
                style={{ 
                  backgroundColor: activeTab === tab.id ? 'var(--card-bg)' : 'transparent',
                  color: activeTab === tab.id ? 'var(--text-primary)' : 'var(--text-secondary)',
                  fontWeight: activeTab === tab.id ? '500' : '400',
                  fontSize: '0.9rem'
                }}
              >
                <tab.icon size={16} />
                <span className="d-none d-md-inline">{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Tab Content Area */}
          <div className="rounded-4 border p-4 p-md-5" style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--card-border)' }}>
            {activeTab === 'profile' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="mb-5">
                  <h6 className="fw-bold mb-1" style={{ color: 'var(--text-primary)', fontSize: '1.05rem' }}>Personal Information</h6>
                  <p className="mb-4" style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Update your personal and professional details</p>
                  
                  {/* Profile Photo Upload */}
                  <div className="d-flex align-items-center gap-4 mb-5 pb-4 border-bottom">
                    <div className="position-relative">
                      <div 
                        className="rounded-circle d-flex align-items-center justify-content-center text-white fw-bold shadow-sm"
                        style={{ width: '80px', height: '80px', backgroundColor: 'var(--sidebar-bg)', fontSize: '1.8rem' }}
                      >
                        JD
                      </div>
                      <button 
                        className="btn btn-light rounded-circle position-absolute d-flex align-items-center justify-content-center p-0 border shadow-sm"
                        style={{ width: '32px', height: '32px', bottom: '-4px', right: '-4px', backgroundColor: 'var(--card-bg)', borderColor: 'var(--border-color)' }}
                      >
                        <Upload size={14} style={{ color: 'var(--text-secondary)' }} />
                      </button>
                    </div>
                    <div>
                      <h6 className="mb-1 fw-bold" style={{ fontSize: '0.9rem', color: 'var(--text-primary)' }}>Profile Photo</h6>
                      <p className="mb-2" style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>JPG, PNG or GIF. Max size 2MB</p>
                      <button className="btn btn-sm btn-outline-secondary px-3 py-1 bg-white border d-flex align-items-center gap-2" style={{ fontSize: '0.85rem' }}>
                        <Upload size={14} /> Upload Photo
                      </button>
                    </div>
                  </div>

                  {/* Input Grid */}
                  <div className="row g-4">
                    <div className="col-md-6">
                      <label className="form-label fw-medium" style={{ fontSize: '0.85rem', color: 'var(--text-primary)' }}>First Name</label>
                      <input 
                        type="text" 
                        className="form-control border-0" 
                        defaultValue="John"
                        style={{ backgroundColor: '#f3f4f6', fontSize: '0.9rem', padding: '0.6rem 1rem' }}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-medium" style={{ fontSize: '0.85rem', color: 'var(--text-primary)' }}>Last Name</label>
                      <input 
                        type="text" 
                        className="form-control border-0" 
                        defaultValue="Doe"
                        style={{ backgroundColor: '#f3f4f6', fontSize: '0.9rem', padding: '0.6rem 1rem' }}
                      />
                    </div>
                    
                    <div className="col-md-6">
                      <label className="form-label fw-medium" style={{ fontSize: '0.85rem', color: 'var(--text-primary)' }}>Email Address</label>
                      <div className="input-group">
                        <span className="input-group-text border-0" style={{ backgroundColor: '#f3f4f6', paddingLeft: '1rem', color: '#9ca3af' }}>
                          <i className="bi bi-envelope"></i>
                        </span>
                        <input 
                          type="email" 
                          className="form-control border-0 px-2" 
                          defaultValue="john.doe@mechanic.com"
                          style={{ backgroundColor: '#f3f4f6', fontSize: '0.9rem', padding: '0.6rem 0' }}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-medium" style={{ fontSize: '0.85rem', color: 'var(--text-primary)' }}>Phone Number</label>
                      <div className="input-group">
                        <span className="input-group-text border-0" style={{ backgroundColor: '#f3f4f6', paddingLeft: '1rem', color: '#9ca3af' }}>
                          <i className="bi bi-telephone"></i>
                        </span>
                        <input 
                          type="tel" 
                          className="form-control border-0 px-2" 
                          defaultValue="+1 (555) 123-4567"
                          style={{ backgroundColor: '#f3f4f6', fontSize: '0.9rem', padding: '0.6rem 0' }}
                        />
                      </div>
                    </div>

                    <div className="col-12">
                      <label className="form-label fw-medium" style={{ fontSize: '0.85rem', color: 'var(--text-primary)' }}>Professional Title</label>
                      <input 
                        type="text" 
                        className="form-control border-0" 
                        defaultValue="Master Mechanic"
                        style={{ backgroundColor: '#f3f4f6', fontSize: '0.9rem', padding: '0.6rem 1rem' }}
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label fw-medium" style={{ fontSize: '0.85rem', color: 'var(--text-primary)' }}>Specialization</label>
                      <select 
                        className="form-select border-0" 
                        style={{ backgroundColor: 'var(--input-bg)', fontSize: '0.9rem', padding: '0.6rem 1rem', color: 'var(--text-primary)' }}
                      >
                        <option value="european">European Cars</option>
                        <option value="domestic">Domestic Vehicles</option>
                        <option value="asian">Asian Imports</option>
                      </select>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-medium" style={{ fontSize: '0.85rem', color: 'var(--text-primary)' }}>Years of Experience</label>
                      <input 
                        type="number" 
                        className="form-control border-0" 
                        defaultValue="15"
                        style={{ backgroundColor: '#f3f4f6', fontSize: '0.9rem', padding: '0.6rem 1rem' }}
                      />
                    </div>

                    <div className="col-12">
                      <label className="form-label fw-medium" style={{ fontSize: '0.85rem', color: 'var(--text-primary)' }}>Certifications</label>
                      <textarea 
                        className="form-control border-0" 
                        placeholder="List your certifications (comma separated)"
                        rows="3"
                        style={{ backgroundColor: '#f3f4f6', fontSize: '0.9rem', padding: '0.6rem 1rem' }}
                      ></textarea>
                    </div>
                  </div>

                  <div className="d-flex justify-content-end mt-5 pt-3">
                    <button 
                      className="btn text-white d-flex align-items-center gap-2 px-4 py-2"
                      style={{ 
                        backgroundColor: 'var(--sidebar-bg)', 
                        borderColor: 'var(--border-color)',
                        color: '#ffffff', 
                        fontWeight: '500',
                        borderRadius: '0.75rem' 
                      }}
                    >
                      <Save size={18} className="me-2" strokeWidth={1.5} />
                      Save Changes
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
            
            {activeTab === 'account' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {/* Password & Security */}
                <div className="mb-5 border rounded-4 p-4" style={{ borderColor: 'var(--border-color)' }}>
                  <h6 className="fw-bold mb-1" style={{ color: 'var(--text-primary)', fontSize: '1.05rem' }}>Password & Security</h6>
                  <p className="mb-4" style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Manage your password and security preferences</p>
                  
                  <div className="row g-4 mb-4">
                    <div className="col-12">
                      <label className="form-label fw-medium" style={{ fontSize: '0.85rem', color: 'var(--text-primary)' }}>Current Password</label>
                      <div className="input-group">
                        <span className="input-group-text border-0" style={{ backgroundColor: '#f3f4f6', paddingLeft: '1rem', color: '#9ca3af' }}>
                          <Lock size={18} />
                        </span>
                        <input 
                          type="password" 
                          className="form-control border-0 px-2" 
                          placeholder="Enter current password"
                          style={{ backgroundColor: '#f3f4f6', fontSize: '0.9rem', padding: '0.6rem 0' }}
                        />
                        <span className="input-group-text border-0" style={{ backgroundColor: '#f3f4f6', paddingRight: '1rem', color: '#9ca3af', cursor: 'pointer' }}>
                          <Eye size={18} />
                        </span>
                      </div>
                    </div>
                    
                    <div className="col-12">
                      <label className="form-label fw-medium" style={{ fontSize: '0.85rem', color: 'var(--text-primary)' }}>New Password</label>
                      <div className="input-group">
                        <span className="input-group-text border-0" style={{ backgroundColor: '#f3f4f6', paddingLeft: '1rem', color: '#9ca3af' }}>
                          <Lock size={18} />
                        </span>
                        <input 
                          type="password" 
                          className="form-control border-0 px-2" 
                          placeholder="Enter new password"
                          style={{ backgroundColor: '#f3f4f6', fontSize: '0.9rem', padding: '0.6rem 0' }}
                        />
                        <span className="input-group-text border-0" style={{ backgroundColor: '#f3f4f6', paddingRight: '1rem', color: '#9ca3af', cursor: 'pointer' }}>
                          <Eye size={18} />
                        </span>
                      </div>
                    </div>

                    <div className="col-12">
                      <label className="form-label fw-medium" style={{ fontSize: '0.85rem', color: 'var(--text-primary)' }}>Confirm New Password</label>
                      <div className="input-group">
                        <span className="input-group-text border-0" style={{ backgroundColor: '#f3f4f6', paddingLeft: '1rem', color: '#9ca3af' }}>
                          <Lock size={18} />
                        </span>
                        <input 
                          type="password" 
                          className="form-control border-0 px-2" 
                          placeholder="Confirm new password"
                          style={{ backgroundColor: '#f3f4f6', fontSize: '0.9rem', padding: '0.6rem 0' }}
                        />
                        <span className="input-group-text border-0 shadow-none" style={{ backgroundColor: '#f3f4f6', paddingRight: '1rem', color: '#9ca3af', opacity: 0 }}>
                          <Eye size={18} />
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 mb-4 rounded-3 d-flex align-items-center gap-3" style={{ backgroundColor: '#e0f7ff', color: '#007095', fontSize: '0.85rem' }}>
                    <span className="fw-bold">Password requirements:</span>
                    <span>At least 8 characters, including uppercase, lowercase, number, and special character.</span>
                  </div>

                  <button 
                    className="btn btn-dark d-flex align-items-center gap-2 px-3 py-2"
                    style={{ borderRadius: '0.5rem', backgroundColor: '#000511' }}
                  >
                    <ShieldCheck size={18} />
                    Update Password
                  </button>
                </div>

                {/* Two-Factor Authentication */}
                <div className="mb-5 border rounded-4 p-4" style={{ borderColor: 'var(--border-color)' }}>
                  <h6 className="fw-bold mb-1" style={{ color: 'var(--text-primary)', fontSize: '1.05rem' }}>Two-Factor Authentication</h6>
                  <p className="mb-4" style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Add an extra layer of security to your account</p>
                  
                  <div className="d-flex flex-column gap-3">
                    <div className="p-3 bg-light rounded-3 d-flex align-items-center justify-content-between border">
                      <div className="d-flex align-items-center gap-3">
                        <div className="bg-white p-2 rounded-3 border d-flex align-items-center justify-content-center" style={{ width: '45px', height: '45px', color: '#001F3F' }}>
                          <ShieldCheck size={20} />
                        </div>
                        <div>
                          <h6 className="mb-0 fw-bold" style={{ fontSize: '0.9rem' }}>SMS Authentication</h6>
                          <p className="mb-0" style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Receive codes via text message</p>
                        </div>
                      </div>
                      <div className="form-check form-switch text-end">
                        <input 
                          className="form-check-input shadow-none cursor-pointer" 
                          type="checkbox" 
                          checked={smsEnabled}
                          onChange={(e) => setSmsEnabled(e.target.checked)}
                          style={{ 
                            width: '2.5rem', 
                            height: '1.25rem',
                            backgroundColor: smsEnabled ? '#001F3F' : '#e5e7eb',
                            borderColor: smsEnabled ? '#001F3F' : '#e5e7eb',
                          }} 
                        />
                      </div>
                    </div>

                    <div className="p-3 bg-light rounded-3 d-flex align-items-center justify-content-between border">
                      <div className="d-flex align-items-center gap-3">
                        <div className="bg-white p-2 rounded-3 border d-flex align-items-center justify-content-center" style={{ width: '45px', height: '45px', color: '#001F3F' }}>
                          <Smartphone size={20} />
                        </div>
                        <div>
                          <h6 className="mb-0 fw-bold" style={{ fontSize: '0.9rem' }}>Authenticator App</h6>
                          <p className="mb-0" style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Use Google Authenticator or similar</p>
                        </div>
                      </div>
                      <div className="form-check form-switch">
                        <input 
                          className="form-check-input shadow-none cursor-pointer" 
                          type="checkbox" 
                          checked={authAppEnabled}
                          onChange={(e) => setAuthAppEnabled(e.target.checked)}
                          style={{ 
                            width: '2.5rem', 
                            height: '1.25rem',
                            backgroundColor: authAppEnabled ? '#001F3F' : '#e5e7eb',
                            borderColor: authAppEnabled ? '#001F3F' : '#e5e7eb',
                          }} 
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Active Sessions */}
                <div className="border rounded-4 p-4" style={{ borderColor: 'var(--border-color)' }}>
                  <h6 className="fw-bold mb-1" style={{ color: 'var(--text-primary)', fontSize: '1.05rem' }}>Active Sessions</h6>
                  <p className="mb-4" style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Manage devices where you're currently logged in</p>
                  
                  <div className="d-flex flex-column gap-3 mb-4">
                    <div className="p-3 bg-white rounded-3 d-flex align-items-center justify-content-between border">
                      <div className="d-flex align-items-center gap-3">
                        <div className="bg-light p-2 rounded-3 border-0 d-flex align-items-center justify-content-center" style={{ width: '45px', height: '45px', color: '#10b981', backgroundColor: '#f0fdf4' }}>
                          <Monitor size={20} />
                        </div>
                        <div>
                          <h6 className="mb-0 fw-bold" style={{ fontSize: '0.9rem' }}>Chrome on Windows</h6>
                          <p className="mb-0" style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Last active: Just now • Current device</p>
                        </div>
                      </div>
                      <span className="badge bg-transparent border-0 text-success fw-medium" style={{ fontSize: '0.8rem' }}>Active</span>
                    </div>

                    <div className="p-3 bg-white rounded-3 d-flex align-items-center justify-content-between border">
                      <div className="d-flex align-items-center gap-3">
                        <div className="bg-light p-2 rounded-3 border-0 d-flex align-items-center justify-content-center" style={{ width: '45px', height: '45px', color: '#6b7280' }}>
                          <Smartphone size={20} />
                        </div>
                        <div>
                          <h6 className="mb-0 fw-bold" style={{ fontSize: '0.9rem' }}>Mobile App - iPhone</h6>
                          <p className="mb-0" style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Last active: 2 hours ago</p>
                        </div>
                      </div>
                      <button className="btn btn-outline-secondary btn-sm px-3" style={{ fontSize: '0.85rem', borderRadius: '0.5rem' }}>Revoke</button>
                    </div>
                  </div>

                  <button className="btn btn-danger px-4 py-2" style={{ borderRadius: '0.5rem', backgroundColor: '#e11d48', border: 'none' }}>
                    Sign Out All Devices
                  </button>
                </div>
              </motion.div>
            )}
            
            {activeTab === 'notifications' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {/* Email Notifications */}
                <div className="mb-5 border rounded-4 p-4" style={{ borderColor: 'var(--border-color)' }}>
                  <h6 className="fw-bold mb-1" style={{ color: 'var(--text-primary)', fontSize: '1.05rem' }}>Email Notifications</h6>
                  <p className="mb-4" style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Choose what you want to be notified about via email</p>
                  
                  <div className="d-flex flex-column gap-4">
                    {[
                      { id: 'emailService', label: 'New Service Requests', desc: 'Get notified when customers request services', state: emailService, setter: setEmailService },
                      { id: 'emailDiag', label: 'Diagnostic Alerts', desc: 'Receive alerts for vehicle diagnostic reports', state: emailDiag, setter: setEmailDiag },
                      { id: 'emailPay', label: 'Payment Notifications', desc: 'Updates on payments and transactions', state: emailPay, setter: setEmailPay },
                      { id: 'emailMsg', label: 'Customer Messages', desc: 'Direct messages from customers', state: emailMsg, setter: setEmailMsg }
                    ].map((item) => (
                      <div key={item.id} className="d-flex align-items-center justify-content-between">
                        <div>
                          <h6 className="mb-0 fw-bold" style={{ fontSize: '0.9rem', color: 'var(--text-primary)' }}>{item.label}</h6>
                          <p className="mb-0" style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{item.desc}</p>
                        </div>
                        <div className="form-check form-switch">
                          <input 
                            className="form-check-input shadow-none cursor-pointer" 
                            type="checkbox" 
                            checked={item.state}
                            onChange={(e) => item.setter(e.target.checked)}
                            style={{ 
                              width: '2.5rem', 
                              height: '1.25rem',
                              backgroundColor: item.state ? '#001F3F' : '#e5e7eb',
                              borderColor: item.state ? '#001F3F' : '#e5e7eb',
                            }} 
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Push Notifications */}
                <div className="mb-5 border rounded-4 p-4">
                  <h6 className="fw-bold mb-1" style={{ color: 'var(--text-primary)', fontSize: '1.05rem' }}>Push Notifications</h6>
                  <p className="mb-4" style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Receive notifications on your mobile device</p>
                  
                  <div className="d-flex flex-column gap-4">
                    {[
                      { id: 'pushService', label: 'New Service Requests', desc: 'Instant alerts for new service bookings', state: pushService, setter: setPushService },
                      { id: 'pushUrgent', label: 'Urgent Diagnostics', desc: 'Critical vehicle diagnostic alerts', state: pushUrgent, setter: setPushUrgent },
                      { id: 'pushPay', label: 'Payment Received', desc: 'When you receive payments', state: pushPay, setter: setPushPay },
                      { id: 'pushInv', label: 'Low Inventory Alerts', desc: 'When parts are running low', state: pushInv, setter: setPushInv }
                    ].map((item) => (
                      <div key={item.id} className="d-flex align-items-center justify-content-between">
                        <div>
                          <h6 className="mb-0 fw-bold" style={{ fontSize: '0.9rem', color: 'var(--text-primary)' }}>{item.label}</h6>
                          <p className="mb-0" style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{item.desc}</p>
                        </div>
                        <div className="form-check form-switch">
                          <input 
                            className="form-check-input shadow-none cursor-pointer" 
                            type="checkbox" 
                            checked={item.state}
                            onChange={(e) => item.setter(e.target.checked)}
                            style={{ 
                              width: '2.5rem', 
                              height: '1.25rem',
                              backgroundColor: item.state ? '#001F3F' : '#e5e7eb',
                              borderColor: item.state ? '#001F3F' : '#e5e7eb',
                            }} 
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* SMS Notifications */}
                <div className="mb-5 border rounded-4 p-4">
                  <h6 className="fw-bold mb-1" style={{ color: 'var(--text-primary)', fontSize: '1.05rem' }}>SMS Notifications</h6>
                  <p className="mb-4" style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Receive text messages for important updates</p>
                  
                  <div className="d-flex flex-column gap-4">
                    {[
                      { id: 'smsService', label: 'Urgent Service Requests', desc: 'Emergency or high-priority requests', state: smsService, setter: setSmsService },
                      { id: 'smsPay', label: 'Payment Confirmations', desc: 'Confirmation for completed payments', state: smsPay, setter: setSmsPay }
                    ].map((item) => (
                      <div key={item.id} className="d-flex align-items-center justify-content-between">
                        <div>
                          <h6 className="mb-0 fw-bold" style={{ fontSize: '0.9rem', color: 'var(--text-primary)' }}>{item.label}</h6>
                          <p className="mb-0" style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{item.desc}</p>
                        </div>
                        <div className="form-check form-switch">
                          <input 
                            className="form-check-input shadow-none cursor-pointer" 
                            type="checkbox" 
                            checked={item.state}
                            onChange={(e) => item.setter(e.target.checked)}
                            style={{ 
                              width: '2.5rem', 
                              height: '1.25rem',
                              backgroundColor: item.state ? '#001F3F' : '#e5e7eb',
                              borderColor: item.state ? '#001F3F' : '#e5e7eb',
                            }} 
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="d-flex justify-content-end mb-4">
                  <button 
                    className="btn btn-dark d-flex align-items-center gap-2 px-4 py-2"
                    style={{ borderRadius: '0.5rem', backgroundColor: '#000511' }}
                  >
                    <Save size={18} />
                    Save Preferences
                  </button>
                </div>
              </motion.div>
            )}
            
            {activeTab === 'business' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {/* Business Information */}
                <div className="mb-5 border rounded-4 p-4" style={{ borderColor: 'var(--border-color)' }}>
                  <h6 className="fw-bold mb-1" style={{ color: 'var(--text-primary)', fontSize: '1.05rem' }}>Business Information</h6>
                  <p className="mb-4" style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Update your business profile and details</p>
                  
                  <div className="row g-4 mb-4">
                    <div className="col-12">
                      <label className="form-label fw-medium" style={{ fontSize: '0.85rem', color: 'var(--text-primary)' }}>Business Name</label>
                      <div className="input-group">
                        <span className="input-group-text border-0" style={{ backgroundColor: '#f3f4f6', paddingLeft: '1rem', color: '#9ca3af' }}>
                          <Building2 size={18} />
                        </span>
                        <input 
                          type="text" 
                          className="form-control border-0 px-2" 
                          defaultValue="Doe Auto Repair"
                          style={{ backgroundColor: '#f3f4f6', fontSize: '0.9rem', padding: '0.6rem 0' }}
                        />
                      </div>
                    </div>

                    <div className="col-12">
                      <label className="form-label fw-medium" style={{ fontSize: '0.85rem', color: 'var(--text-primary)' }}>Business Type</label>
                      <select 
                        className="form-select border-0" 
                        style={{ backgroundColor: 'var(--input-bg)', fontSize: '0.9rem', padding: '0.6rem 1rem', color: 'var(--text-primary)' }}
                      >
                        <option value="independent">Independent Mechanic</option>
                        <option value="dealership">Dealership</option>
                        <option value="franchise">Franchise Shop</option>
                      </select>
                    </div>

                    <div className="col-12">
                      <label className="form-label fw-medium" style={{ fontSize: '0.85rem', color: 'var(--text-primary)' }}>Business Address</label>
                      <div className="input-group">
                        <span className="input-group-text border-0" style={{ backgroundColor: '#f3f4f6', paddingLeft: '1rem', color: '#9ca3af' }}>
                          <MapPin size={18} />
                        </span>
                        <input 
                          type="text" 
                          className="form-control border-0 px-2" 
                          defaultValue="123 Main St, City, State 12345"
                          style={{ backgroundColor: '#f3f4f6', fontSize: '0.9rem', padding: '0.6rem 0' }}
                        />
                      </div>
                    </div>

                    <div className="col-md-6">
                      <label className="form-label fw-medium" style={{ fontSize: '0.85rem', color: 'var(--text-primary)' }}>Tax ID / EIN</label>
                      <input 
                        type="text" 
                        className="form-control border-0" 
                        placeholder="XX-XXXXXXX"
                        style={{ backgroundColor: '#f3f4f6', fontSize: '0.9rem', padding: '0.6rem 1rem' }}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-medium" style={{ fontSize: '0.85rem', color: 'var(--text-primary)' }}>License Number</label>
                      <input 
                        type="text" 
                        className="form-control border-0" 
                        defaultValue="MEC-123456"
                        style={{ backgroundColor: '#f3f4f6', fontSize: '0.9rem', padding: '0.6rem 1rem' }}
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label fw-medium" style={{ fontSize: '0.85rem', color: 'var(--text-primary)' }}>Operating Hours</label>
                      <div className="input-group">
                        <span className="input-group-text border-0" style={{ backgroundColor: '#f3f4f6', paddingLeft: '1rem', color: '#9ca3af' }}>
                          <Clock size={18} />
                        </span>
                        <input 
                          type="text" 
                          className="form-control border-0 px-2" 
                          defaultValue="8:00 AM - 6:00 PM"
                          style={{ backgroundColor: '#f3f4f6', fontSize: '0.9rem', padding: '0.6rem 0' }}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-medium" style={{ fontSize: '0.85rem', color: 'var(--text-primary)' }}>Working Days</label>
                      <input 
                        type="text" 
                        className="form-control border-0" 
                        defaultValue="Monday - Saturday"
                        style={{ backgroundColor: '#f3f4f6', fontSize: '0.9rem', padding: '0.6rem 1rem' }}
                      />
                    </div>
                  </div>

                  <div className="d-flex justify-content-end">
                    <button 
                      className="btn btn-dark d-flex align-items-center gap-2 px-4 py-2"
                      style={{ borderRadius: '0.5rem', backgroundColor: '#000511' }}
                    >
                      <Save size={18} />
                      Save Changes
                    </button>
                  </div>
                </div>

                {/* Service Preferences */}
                <div className="border rounded-4 p-4" style={{ borderColor: 'var(--border-color)' }}>
                  <h6 className="fw-bold mb-1" style={{ color: 'var(--text-primary)', fontSize: '1.05rem' }}>Service Preferences</h6>
                  <p className="mb-4" style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Configure your service delivery preferences</p>
                  
                  <div className="d-flex flex-column gap-4 mb-4">
                    {[
                      { id: 'autoAccept', label: 'Auto-Accept Service Requests', desc: 'Automatically accept incoming service requests', state: autoAccept, setter: setAutoAccept },
                      { id: 'mobileService', label: 'Mobile Service Available', desc: 'Offer on-site/mobile repair services', state: mobileService, setter: setMobileService },
                      { id: 'emergencyService', label: 'Emergency Services', desc: 'Accept emergency/after-hours requests', state: emergencyService, setter: setEmergencyService }
                    ].map((item) => (
                      <div key={item.id} className="d-flex align-items-center justify-content-between">
                        <div>
                          <h6 className="mb-0 fw-bold" style={{ fontSize: '0.9rem', color: 'var(--text-primary)' }}>{item.label}</h6>
                          <p className="mb-0" style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{item.desc}</p>
                        </div>
                        <div className="form-check form-switch">
                          <input 
                            className="form-check-input shadow-none cursor-pointer" 
                            type="checkbox" 
                            checked={item.state}
                            onChange={(e) => item.setter(e.target.checked)}
                            style={{ 
                              width: '2.5rem', 
                              height: '1.25rem',
                              backgroundColor: item.state ? '#001F3F' : '#e5e7eb',
                              borderColor: item.state ? '#001F3F' : '#e5e7eb',
                            }} 
                          />
                        </div>
                      </div>
                    ))}
                    
                    <div>
                      <label className="form-label fw-medium" style={{ fontSize: '0.85rem', color: 'var(--text-primary)' }}>Service Radius (miles)</label>
                      <input 
                        type="number" 
                        className="form-control border-0" 
                        defaultValue="25"
                        style={{ backgroundColor: '#f3f4f6', fontSize: '0.9rem', padding: '0.6rem 1rem', maxWidth: '100%' }}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
            
            {activeTab === 'payment' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {/* Payment & Pricing */}
                <div className="mb-5 border rounded-4 p-4">
                  <h6 className="fw-bold mb-1" style={{ color: 'var(--text-primary)', fontSize: '1.05rem' }}>Payment & Pricing</h6>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }} className="mb-4">Configure payment methods and pricing settings</p>
                  
                  <div className="row g-4 mb-4">
                    <div className="col-md-6">
                      <label className="form-label fw-medium" style={{ fontSize: '0.85rem', color: 'var(--text-primary)' }}>Default Currency</label>
                      <select 
                        className="form-select border-0" 
                        style={{ backgroundColor: 'var(--input-bg)', fontSize: '0.9rem', padding: '0.6rem 1rem', color: 'var(--text-primary)' }}
                      >
                        <option value="usd">USD - US Dollar</option>
                        <option value="eur">EUR - Euro</option>
                        <option value="gbp">GBP - British Pound</option>
                      </select>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-medium" style={{ fontSize: '0.85rem', color: 'var(--text-primary)' }}>Tax Rate (%)</label>
                      <input 
                        type="text" 
                        className="form-control border-0" 
                        defaultValue="8.5"
                        style={{ backgroundColor: '#f3f4f6', fontSize: '0.9rem', padding: '0.6rem 1rem' }}
                      />
                    </div>
                    <div className="col-12">
                      <label className="form-label fw-medium" style={{ fontSize: '0.85rem', color: 'var(--text-primary)' }}>Platform Commission Rate (%)</label>
                      <input 
                        type="text" 
                        className="form-control border-0" 
                        defaultValue="15"
                        readOnly
                        style={{ backgroundColor: '#f3f4f6', fontSize: '0.9rem', padding: '0.6rem 1rem', color: '#6b7280' }}
                      />
                      <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }} className="mt-2">Set by Vescan platform</p>
                    </div>
                  </div>

                  <div className="d-flex justify-content-end">
                    <button 
                      className="btn btn-dark d-flex align-items-center gap-2 px-4 py-2"
                      style={{ borderRadius: '0.5rem', backgroundColor: '#000511' }}
                    >
                      <Save size={18} />
                      Save Settings
                    </button>
                  </div>
                </div>

                {/* Wallet Settings */}
                <div className="mb-5 border rounded-4 p-4">
                  <h6 className="fw-bold mb-1" style={{ color: 'var(--text-primary)', fontSize: '1.05rem' }}>Wallet Settings</h6>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }} className="mb-4">Manage your Vescan wallet and withdrawal preferences</p>
                  
                  <div 
                    className="p-5 rounded-4 mb-4 text-white d-flex flex-column gap-3"
                    style={{ background: 'linear-gradient(180deg, #001F3F 0%, #265688 100%)' }}
                  >
                    <div>
                      <p className="mb-1" style={{ opacity: 0.8, fontSize: '0.9rem' }}>Current Balance</p>
                      <h2 className="mb-0 fw-bold" style={{ fontSize: '2.5rem' }}>$3,245.80</h2>
                    </div>
                    <button 
                      className="btn btn-light d-flex align-items-center gap-2 px-4 py-2 fw-medium"
                      style={{ width: 'fit-content', borderRadius: '0.5rem', fontSize: '0.9rem' }}
                    >
                      <Wallet size={18} />
                      Withdraw Funds
                    </button>
                  </div>

                  <div className="row g-4 align-items-center">
                    <div className="col-12 d-flex align-items-center justify-content-between mb-2">
                      <div>
                        <h6 className="mb-0 fw-bold" style={{ fontSize: '0.9rem', color: 'var(--text-primary)' }}>Auto-Withdraw</h6>
                        <p className="mb-0" style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Automatically withdraw funds weekly</p>
                      </div>
                      <div className="form-check form-switch">
                        <input 
                          className="form-check-input shadow-none cursor-pointer" 
                          type="checkbox" 
                          checked={autoWithdraw}
                          onChange={(e) => setAutoWithdraw(e.target.checked)}
                          style={{ 
                            width: '2.5rem', 
                            height: '1.25rem',
                            backgroundColor: autoWithdraw ? '#001F3F' : '#e5e7eb',
                            borderColor: autoWithdraw ? '#001F3F' : '#e5e7eb',
                          }} 
                        />
                      </div>
                    </div>
                    <div className="col-12">
                      <label className="form-label fw-medium" style={{ fontSize: '0.85rem', color: 'var(--text-primary)' }}>Minimum Withdrawal Amount ($)</label>
                      <input 
                        type="number" 
                        className="form-control border-0" 
                        defaultValue="100"
                        style={{ backgroundColor: '#f3f4f6', fontSize: '0.9rem', padding: '0.6rem 1rem' }}
                      />
                    </div>
                  </div>
                </div>

                {/* Bank Account */}
                <div className="mb-5 border rounded-4 p-4">
                  <h6 className="fw-bold mb-1" style={{ color: 'var(--text-primary)', fontSize: '1.05rem' }}>Bank Account</h6>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }} className="mb-4">Linked bank account for withdrawals</p>
                  
                  <div className="p-3 bg-white rounded-3 d-flex align-items-center justify-content-between border mb-4">
                    <div className="d-flex align-items-center gap-3">
                      <div className="bg-light p-2 rounded-3 border-0 d-flex align-items-center justify-content-center" style={{ width: '45px', height: '45px', color: '#001F3F' }}>
                        <CreditCard size={20} />
                      </div>
                      <div>
                        <h6 className="mb-0 fw-bold" style={{ fontSize: '0.9rem' }}>Chase Bank •••• 4532</h6>
                        <p className="mb-0" style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Primary withdrawal account</p>
                      </div>
                    </div>
                    <div className="d-flex align-items-center gap-1 text-success fw-medium" style={{ fontSize: '0.85rem' }}>
                      <CheckCircle2 size={16} />
                      Verified
                    </div>
                  </div>

                  <button 
                    className="btn btn-outline-secondary d-flex align-items-center gap-2 px-3 py-2"
                    style={{ borderRadius: '0.5rem', fontSize: '0.85rem' }}
                  >
                    <Plus size={18} />
                    Add Another Account
                  </button>
                </div>

                {/* Accepted Payment Methods */}
                <div className="border rounded-4 p-4">
                  <h6 className="fw-bold mb-1" style={{ color: 'var(--text-primary)', fontSize: '1.05rem' }}>Accepted Payment Methods</h6>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }} className="mb-4">Choose which payment methods you accept from customers</p>
                  
                  <div className="d-flex flex-column gap-4">
                    {[
                      { id: 'payCredit', label: 'Credit/Debit Cards', desc: 'Visa, Mastercard, Amex', state: payCredit, setter: setPayCredit },
                      { id: 'payWallet', label: 'Vescan Wallet', desc: 'Customer wallet balance', state: payWallet, setter: setPayWallet },
                      { id: 'payCash', label: 'Cash Payment', desc: 'Accept cash on delivery', state: payCash, setter: setPayCash },
                      { id: 'payBank', label: 'Bank Transfer', desc: 'Direct bank transfers', state: payBank, setter: setPayBank }
                    ].map((item) => (
                      <div key={item.id} className="d-flex align-items-center justify-content-between">
                        <div>
                          <h6 className="mb-0 fw-bold" style={{ fontSize: '0.9rem', color: 'var(--text-primary)' }}>{item.label}</h6>
                          <p className="mb-0" style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{item.desc}</p>
                        </div>
                        <div className="form-check form-switch">
                          <input 
                            className="form-check-input shadow-none cursor-pointer" 
                            type="checkbox" 
                            checked={item.state}
                            onChange={(e) => item.setter(e.target.checked)}
                            style={{ 
                              width: '2.5rem', 
                              height: '1.25rem',
                              backgroundColor: item.state ? '#001F3F' : '#e5e7eb',
                              borderColor: item.state ? '#001F3F' : '#e5e7eb',
                            }} 
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
            
            {activeTab === 'integrations' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {/* Vescan Integrations */}
                <div className="mb-5 border rounded-4 p-4">
                  <h6 className="fw-bold mb-1" style={{ color: 'var(--text-primary)', fontSize: '1.05rem' }}>Vescan Integrations</h6>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }} className="mb-4">Connect with Vescan ecosystem services</p>
                  
                  <div className="d-flex flex-column gap-3">
                    {[
                      { id: 'vescanApi', label: 'Vescan API', desc: 'Core platform integration', icon: <Zap size={20} />, active: vescanApi, setter: setVescanApi, status: 'Connected', iconBg: '#eff6ff', iconColor: '#3b82f6' },
                      { id: 'diagnosticTools', label: 'Diagnostic Tools', desc: 'OBD-II and diagnostic equipment', icon: <Wrench size={20} />, active: diagnosticTools, setter: setDiagnosticTools, status: 'Connected', iconBg: '#f5f3ff', iconColor: '#8b5cf6' },
                      { id: 'inventorySync', label: 'Inventory Sync', desc: 'Auto-sync with parts suppliers', icon: <Boxes size={20} />, active: false, status: 'Connect', iconBg: '#f9fafb', iconColor: '#6b7280' },
                      { id: 'accountingSoftware', label: 'Accounting Software', desc: 'QuickBooks, Xero integration', icon: <FileBarChart size={20} />, active: false, status: 'Connect', iconBg: '#f9fafb', iconColor: '#6b7280' }
                    ].map((item) => (
                      <div key={item.id} className="p-3 border rounded-3 d-flex align-items-center justify-content-between">
                        <div className="d-flex align-items-center gap-3">
                          <div className="d-flex align-items-center justify-content-center rounded-3" style={{ width: '45px', height: '45px', backgroundColor: item.iconBg, color: item.iconColor }}>
                            {item.icon}
                          </div>
                          <div>
                            <h6 className="mb-0 fw-bold" style={{ fontSize: '0.9rem' }}>{item.label}</h6>
                            <p className="mb-0" style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{item.desc}</p>
                          </div>
                        </div>
                        <div className="d-flex align-items-center gap-2">
                          {item.id === 'vescanApi' || item.id === 'diagnosticTools' ? (
                            <>
                              <span className="text-success fw-medium" style={{ fontSize: '0.85rem' }}>{item.status}</span>
                              <div className="form-check form-switch p-0 m-0">
                                <input 
                                  className="form-check-input shadow-none cursor-pointer m-0" 
                                  type="checkbox" 
                                  checked={item.active}
                                  onChange={(e) => item.setter(e.target.checked)}
                                  style={{ 
                                    width: '2.5rem', 
                                    height: '1.25rem',
                                    backgroundColor: item.active ? '#000' : '#e5e7eb',
                                    borderColor: item.active ? '#000' : '#e5e7eb',
                                  }} 
                                />
                              </div>
                            </>
                          ) : (
                            <button className="btn btn-outline-secondary btn-sm px-3" style={{ borderRadius: '0.5rem', fontSize: '0.85rem' }}>{item.status}</button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* API Keys */}
                <div className="border rounded-4 p-4">
                  <h6 className="fw-bold mb-1" style={{ color: 'var(--text-primary)', fontSize: '1.05rem' }}>API Keys</h6>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }} className="mb-4">Manage your API keys for third-party integrations</p>
                  
                  <div className="d-flex flex-column gap-4 mb-4">
                    <div className="bg-light p-4 rounded-4 border-0">
                      <div className="d-flex align-items-center justify-content-between mb-3">
                        <h6 className="mb-0 fw-bold" style={{ fontSize: '0.9rem' }}>Production API Key</h6>
                        <button className="btn btn-sm d-flex align-items-center gap-2 border px-3 py-1-5 shadow-sm" style={{ borderRadius: '0.5rem', fontSize: '0.85rem', color: 'var(--text-primary)', backgroundColor: 'var(--card-bg)' }}>
                          <RefreshCw size={16} />
                          Regenerate
                        </button>
                      </div>
                      <div className="input-group">
                        <input 
                          type="text" 
                          className="form-control border-0 bg-white" 
                          value="vs_prod_••••••••••••••••••••••••••••••5a8f"
                          readOnly
                          style={{ fontSize: '0.9rem', padding: '0.75rem 1rem' }}
                        />
                        <button className="btn px-4 fw-medium border-start" style={{ backgroundColor: 'var(--bg-tertiary)', color: 'var(--text-primary)', fontSize: '0.85rem' }}>Copy</button>
                      </div>
                    </div>

                    <div className="bg-light p-4 rounded-4 border-0">
                      <div className="d-flex align-items-center justify-content-between mb-3">
                        <h6 className="mb-0 fw-bold" style={{ fontSize: '0.9rem' }}>Development API Key</h6>
                        <button className="btn btn-sm d-flex align-items-center gap-2 border px-3 py-1-5 shadow-sm" style={{ borderRadius: '0.5rem', fontSize: '0.85rem', color: 'var(--text-primary)', backgroundColor: 'var(--card-bg)' }}>
                          <RefreshCw size={16} />
                          Regenerate
                        </button>
                      </div>
                      <div className="input-group">
                        <input 
                          type="text" 
                          className="form-control border-0 bg-white" 
                          value="vs_dev_••••••••••••••••••••••••••••••2b4c"
                          readOnly
                          style={{ fontSize: '0.9rem', padding: '0.75rem 1rem' }}
                        />
                        <button className="btn px-4 fw-medium border-start" style={{ backgroundColor: 'var(--bg-tertiary)', color: 'var(--text-primary)', fontSize: '0.85rem' }}>Copy</button>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 rounded-3 d-flex align-items-start gap-3" style={{ border: '1px solid #fde68a', backgroundColor: '#fffbeb' }}>
                    <div style={{ color: '#d97706' }}>
                      <AlertCircle size={20} />
                    </div>
                    <div>
                      <h6 className="mb-1 fw-bold" style={{ fontSize: '0.9rem', color: '#92400e' }}>Keep your API keys secure</h6>
                      <p className="mb-0" style={{ fontSize: '0.8rem', color: '#d97706', opacity: 0.9 }}>Never share your API keys publicly. Regenerate immediately if compromised.</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
            
            {activeTab === 'appearance' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {/* Display Preferences */}
                <div className="mb-5 border rounded-4 p-4">
                  <h6 className="fw-bold mb-1" style={{ color: 'var(--text-primary)', fontSize: '1.05rem' }}>Display Preferences</h6>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }} className="mb-4">Customize how the dashboard looks and feels</p>
                  
                  <div className="mb-4">
                      <label className="form-label fw-medium mb-3" style={{ fontSize: '0.85rem', color: 'var(--text-primary)' }}>Theme</label>
                    <div className="row g-3">
                      {[
                        { id: 'light', label: 'Light', innerBg: '#fff', innerBorder: '#e2e8f0' },
                        { id: 'dark', label: 'Dark', innerBg: '#1e1e1e', innerBorder: '#3c4043' },
                        { id: 'auto', label: 'Auto', innerBg: 'linear-gradient(180deg, #edf2f7 0%, #1e1e1e 100%)', innerBorder: '#cbd5e0' }
                      ].map((t) => (
                        <div key={t.id} className="col-4">
                          <div 
                            className="p-1 cursor-pointer transition-all"
                            onClick={() => setTheme(t.id)}
                            style={{ 
                              border: theme === t.id ? '2px solid #3182ce' : '1px solid var(--border-color)',
                              backgroundColor: theme === t.id ? 'var(--hover-bg)' : 'var(--card-bg)',
                              borderRadius: '0.75rem'
                            }}
                          >
                            <div 
                              className="d-flex align-items-center justify-content-center"
                              style={{ height: '80px' }}
                            >
                              <div 
                                className="rounded-3 shadow-sm" 
                                style={{ 
                                  width: '42px', 
                                  height: '42px', 
                                  background: t.innerBg, 
                                  border: `1.5px solid ${t.innerBorder}`,
                                  borderRadius: '0.8rem'
                                }}
                              ></div>
                            </div>
                            <div className="text-center pb-2">
                              <span className="fw-medium" style={{ fontSize: '0.85rem', color: 'var(--text-primary)' }}>{t.label}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="row g-4">
                    <div className="col-12">
                      <label className="form-label fw-medium" style={{ fontSize: '0.85rem', color: 'var(--text-primary)' }}>Language</label>
                      <select 
                        className="form-select border-0 shadow-none" 
                        style={{ backgroundColor: 'var(--input-bg)', fontSize: '0.9rem', padding: '0.6rem 1rem', color: 'var(--text-primary)' }}
                      >
                        <option value="en">English</option>
                        <option value="es">Spanish</option>
                        <option value="fr">French</option>
                      </select>
                    </div>

                    <div className="col-12">
                      <label className="form-label fw-medium" style={{ fontSize: '0.85rem', color: 'var(--text-primary)' }}>Timezone</label>
                      <div className="input-group">
                        <span className="input-group-text border-0" style={{ backgroundColor: '#f3f4f6', paddingLeft: '1rem', color: '#9ca3af' }}>
                          <Globe size={18} />
                        </span>
                        <select 
                          className="form-select border-0 shadow-none px-2" 
                          style={{ backgroundColor: '#f3f4f6', fontSize: '0.9rem', padding: '0.6rem 0' }}
                        >
                          <option value="est">Eastern Time (ET)</option>
                          <option value="pst">Pacific Time (PT)</option>
                          <option value="utc">UTC</option>
                        </select>
                      </div>
                    </div>

                    <div className="col-12">
                      <label className="form-label fw-medium" style={{ fontSize: '0.85rem', color: 'var(--text-primary)' }}>Date Format</label>
                      <select 
                        className="form-select border-0 shadow-none" 
                        style={{ backgroundColor: 'var(--input-bg)', fontSize: '0.9rem', padding: '0.6rem 1rem', color: 'var(--text-primary)' }}
                      >
                        <option value="mdy">MM/DD/YYYY</option>
                        <option value="dmy">DD/MM/YYYY</option>
                        <option value="ymd">YYYY/MM/DD</option>
                      </select>
                    </div>
                  </div>

                  <div className="d-flex justify-content-end mt-4">
                    <button 
                      className="btn btn-dark d-flex align-items-center gap-2 px-4 py-2"
                      style={{ borderRadius: '0.5rem', backgroundColor: '#000511' }}
                    >
                      <Save size={18} />
                      Save Preferences
                    </button>
                  </div>
                </div>

                {/* Dashboard Layout */}
                <div className="border rounded-4 p-4">
                  <h6 className="fw-bold mb-1" style={{ color: 'var(--text-primary)', fontSize: '1.05rem' }}>Dashboard Layout</h6>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }} className="mb-4">Customize your dashboard layout preferences</p>
                  
                  <div className="d-flex flex-column gap-4">
                    {[
                      { id: 'compact', label: 'Compact Mode', desc: 'Reduce spacing and padding', state: compactMode, setter: setCompactMode },
                      { id: 'sidebar', label: 'Show Sidebar Labels', desc: 'Display text labels in sidebar', state: showLabels, setter: setShowLabels },
                      { id: 'badges', label: 'Show Status Badges', desc: 'Display notification badges', state: showBadges, setter: setShowBadges }
                    ].map((item) => (
                      <div key={item.id} className="d-flex align-items-center justify-content-between">
                        <div>
                          <h6 className="mb-0 fw-bold" style={{ fontSize: '0.9rem', color: 'var(--text-primary)' }}>{item.label}</h6>
                          <p className="mb-0" style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{item.desc}</p>
                        </div>
                        <div className="form-check form-switch p-0 m-0">
                          <input 
                            className="form-check-input shadow-none cursor-pointer m-0" 
                            type="checkbox" 
                            checked={item.state}
                            onChange={(e) => item.setter(e.target.checked)}
                            style={{ 
                              width: '2.5rem', 
                              height: '1.25rem',
                              backgroundColor: item.state ? '#001F3F' : '#e5e7eb',
                              borderColor: item.state ? '#001F3F' : '#e5e7eb',
                            }} 
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
            
            {(activeTab !== 'profile' && activeTab !== 'account' && activeTab !== 'notifications' && activeTab !== 'business' && activeTab !== 'payment' && activeTab !== 'integrations' && activeTab !== 'appearance') && (
              <div className="text-center py-5" style={{ color: 'var(--text-muted)' }}>
                <i className="bi bi-tools fs-1 mb-3 d-block"></i>
                <h5>This section is currently under development</h5>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
