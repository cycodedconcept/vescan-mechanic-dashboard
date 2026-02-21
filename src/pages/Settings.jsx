import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { motion } from 'framer-motion';
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
  Save
} from 'lucide-react';

const tabs = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'account', label: 'Account', icon: Lock },
  { id: 'notifications', label: 'Notifications', icon: BellRing },
  { id: 'business', label: 'Business', icon: Briefcase },
  { id: 'payment', label: 'Payment', icon: CreditCard },
  { id: 'integrations', label: 'Integrations', icon: Plug },
  { id: 'appearance', label: 'Appearance', icon: Palette }
];

const Settings = () => {
  const { isSidebarOpen, toggleSidebar } = useOutletContext();
  const [activeTab, setActiveTab] = useState('profile');

  return (
    <div className="d-flex flex-column h-100 bg-light" style={{ fontFamily: 'Inter, sans-serif' }}>
      {/* Top Header */}
      <div className="bg-white border-bottom px-4 py-3 d-flex justify-content-between align-items-center flex-shrink-0">
        <div className="d-flex align-items-center gap-3">
          {!isSidebarOpen && (
            <button 
              onClick={toggleSidebar} 
              className="btn btn-link text-dark p-0 me-2"
            >
              <Menu size={24} />
            </button>
          )}
          <div>
            <h4 className="mb-0 fw-bold" style={{ color: '#001F3F' }}>Settings</h4>
            <span className="text-muted" style={{ fontSize: '0.85rem' }}>Manage your business operations</span>
          </div>
        </div>
        
        <div className="d-flex align-items-center gap-3">
          <div className="position-relative cursor-pointer">
            <Bell size={20} className="text-muted" />
            <span 
              className="position-absolute translate-middle rounded-circle bg-danger"
              style={{ width: '8px', height: '8px', top: '2px', right: '-8px' }}
            ></span>
          </div>
          <div 
            className="rounded-circle d-flex align-items-center justify-content-center text-white fw-bold ms-2"
            style={{ width: '35px', height: '35px', backgroundColor: '#001F3F', fontSize: '0.9rem' }}
          >
            JD
          </div>
        </div>
      </div>

      <div className="flex-grow-1 overflow-auto p-4">
        <div className="w-100">
          
          {/* Tabs Navigation */}
          <div className="rounded-pill p-1 d-flex flex-wrap overflow-hidden mb-4" style={{ backgroundColor: '#f3f4f6' }}>
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`btn flex-grow-1 rounded-pill d-flex align-items-center justify-content-center gap-2 border-0 py-2 transition-all ${activeTab === tab.id ? 'bg-white shadow-sm' : ''}`}
                style={{ 
                  color: activeTab === tab.id ? '#1f2937' : '#6b7280',
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
          <div className="bg-white rounded-4 border p-4 p-md-5">
            {activeTab === 'profile' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="mb-5">
                  <h6 className="fw-bold mb-1" style={{ color: '#111827', fontSize: '1.05rem' }}>Personal Information</h6>
                  <p className="text-muted mb-4" style={{ fontSize: '0.85rem' }}>Update your personal and professional details</p>
                  
                  {/* Profile Photo Upload */}
                  <div className="d-flex align-items-center gap-4 mb-5 pb-4 border-bottom">
                    <div className="position-relative">
                      <div 
                        className="rounded-circle d-flex align-items-center justify-content-center text-white fw-bold shadow-sm"
                        style={{ width: '80px', height: '80px', backgroundColor: '#001F3F', fontSize: '1.8rem' }}
                      >
                        JD
                      </div>
                      <button 
                        className="btn btn-light rounded-circle position-absolute d-flex align-items-center justify-content-center p-0 border shadow-sm"
                        style={{ width: '32px', height: '32px', bottom: '-4px', right: '-4px', backgroundColor: 'white' }}
                      >
                        <Upload size={14} className="text-muted" />
                      </button>
                    </div>
                    <div>
                      <h6 className="mb-1 fw-bold" style={{ fontSize: '0.9rem', color: '#111827' }}>Profile Photo</h6>
                      <p className="text-muted mb-2" style={{ fontSize: '0.8rem' }}>JPG, PNG or GIF. Max size 2MB</p>
                      <button className="btn btn-sm btn-outline-secondary px-3 py-1 bg-white border d-flex align-items-center gap-2" style={{ fontSize: '0.85rem' }}>
                        <Upload size={14} /> Upload Photo
                      </button>
                    </div>
                  </div>

                  {/* Input Grid */}
                  <div className="row g-4">
                    <div className="col-md-6">
                      <label className="form-label fw-medium text-dark" style={{ fontSize: '0.85rem' }}>First Name</label>
                      <input 
                        type="text" 
                        className="form-control border-0" 
                        defaultValue="John"
                        style={{ backgroundColor: '#f3f4f6', fontSize: '0.9rem', padding: '0.6rem 1rem' }}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-medium text-dark" style={{ fontSize: '0.85rem' }}>Last Name</label>
                      <input 
                        type="text" 
                        className="form-control border-0" 
                        defaultValue="Doe"
                        style={{ backgroundColor: '#f3f4f6', fontSize: '0.9rem', padding: '0.6rem 1rem' }}
                      />
                    </div>
                    
                    <div className="col-md-6">
                      <label className="form-label fw-medium text-dark" style={{ fontSize: '0.85rem' }}>Email Address</label>
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
                      <label className="form-label fw-medium text-dark" style={{ fontSize: '0.85rem' }}>Phone Number</label>
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
                      <label className="form-label fw-medium text-dark" style={{ fontSize: '0.85rem' }}>Professional Title</label>
                      <input 
                        type="text" 
                        className="form-control border-0" 
                        defaultValue="Master Mechanic"
                        style={{ backgroundColor: '#f3f4f6', fontSize: '0.9rem', padding: '0.6rem 1rem' }}
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label fw-medium text-dark" style={{ fontSize: '0.85rem' }}>Specialization</label>
                      <select 
                        className="form-select border-0" 
                        style={{ backgroundColor: '#f3f4f6', fontSize: '0.9rem', padding: '0.6rem 1rem', color: '#111827' }}
                      >
                        <option value="european">European Cars</option>
                        <option value="domestic">Domestic Vehicles</option>
                        <option value="asian">Asian Imports</option>
                      </select>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-medium text-dark" style={{ fontSize: '0.85rem' }}>Years of Experience</label>
                      <input 
                        type="number" 
                        className="form-control border-0" 
                        defaultValue="15"
                        style={{ backgroundColor: '#f3f4f6', fontSize: '0.9rem', padding: '0.6rem 1rem' }}
                      />
                    </div>

                    <div className="col-12">
                      <label className="form-label fw-medium text-dark" style={{ fontSize: '0.85rem' }}>Certifications</label>
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
                        backgroundColor: '#000511', 
                        fontSize: '1rem', 
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
            
            {activeTab !== 'profile' && (
              <div className="text-center py-5 text-muted">
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
