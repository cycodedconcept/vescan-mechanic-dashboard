import React from 'react';
import { Menu, Bell } from 'lucide-react';
import { useOutletContext } from 'react-router-dom';

const TopHeader = ({ title, subtitle = "Manage your business operations" }) => {
  const { isSidebarOpen, toggleSidebar } = useOutletContext();
  
  return (
    <div className="px-4 py-3 d-flex justify-content-between align-items-center flex-shrink-0 sticky-top" style={{ zIndex: 100, backgroundColor: 'var(--card-bg)', borderBottom: '1px solid var(--border-color)' }}>
      <div className="d-flex align-items-center gap-3">
        {!isSidebarOpen && (
          <button 
            onClick={toggleSidebar} 
            className="btn btn-link p-0 me-2"
            style={{ color: 'var(--text-primary)' }}
          >
            <Menu size={24} />
          </button>
        )}
        <div className="d-flex flex-column justify-content-center">
          <h4 className="mb-0 fw-bold" style={{ color: 'var(--text-primary)', lineHeight: '1.2' }}>{title}</h4>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{subtitle}</span>
        </div>
      </div>
      <div className="d-flex align-items-center gap-4">
        <div className="position-relative cursor-pointer">
          <Bell size={20} style={{ color: 'var(--text-secondary)' }} />
          <span className="position-absolute top-0 start-100 translate-middle bg-danger border border-white rounded-circle" style={{ width: '8px', height: '8px', padding: 0 }}>
            <span className="visually-hidden">New alerts</span>
          </span>
        </div>
        <div className="text-white rounded-circle d-flex align-items-center justify-content-center fw-bold" style={{ width: '32px', height: '32px', fontSize: '0.8rem', backgroundColor: 'var(--sidebar-bg)' }}>
          JD
        </div>
      </div>
    </div>
  );
};

export default TopHeader;
