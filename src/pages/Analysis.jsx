import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import TopHeader from '../components/TopHeader';
import { 
  Bell, 
  Menu,
  DollarSign,
  Wrench,
  Users,
  Star,
  Calendar,
  TrendingUp
} from 'lucide-react';
import { ANALYSIS_DATA, metricIcons } from '../data/mockData';

const Analysis = () => {
  const { isSidebarOpen, toggleSidebar } = useOutletContext();
  const [activeDateRange, setActiveDateRange] = useState('This Week');

  // Currently active data based on segmented control state
  const currentData = ANALYSIS_DATA[activeDateRange] || ANALYSIS_DATA['This Week'];

  return (
    <div className="d-flex flex-column h-100" style={{ fontFamily: 'Inter, sans-serif', backgroundColor: 'var(--bg-primary)' }}>
      {/* Top Header */}
      <TopHeader title="Analytics & Reports" />

      <div className="flex-grow-1 overflow-auto d-flex flex-column">
        {/* Blue Banner Section */}
        <div className="px-4 py-4 flex-shrink-0" style={{ backgroundColor: '#008CBA' }}>
          <h5 className="text-white mb-3 fw-semibold">Analytics & Reports</h5>
          
          {/* Date Segmented Control */}
          <div className="d-flex gap-2">
            {['This Week', 'This Month', 'This Year'].map(range => (
              <button
                key={range}
                onClick={() => setActiveDateRange(range)}
                className={`btn flex-grow-1 border-0 py-2 fw-medium ${activeDateRange === range ? 'bg-white shadow-sm rounded-3 text-info' : 'text-white'}`}
                style={{ 
                  fontSize: '0.9rem', 
                  transition: 'all 0.2s ease-in-out',
                  backgroundColor: activeDateRange === range ? 'white' : 'rgba(255,255,255,0.15)',
                  color: activeDateRange === range ? '#00BFFF' : 'white'
                }}
              >
                {range}
              </button>
            ))}
          </div>
        </div>
        
        <div className="p-4 flex-grow-1">
          {/* Primary Metrics Grid */}
          <div className="row g-4 mb-5">
            {currentData.primaryMetrics?.map((metric, index) => (
              <div key={index} className="col-md-6">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -4, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}
                  className="rounded-3 p-4 h-100 transition-all"
                  style={{ cursor: 'pointer', backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-color)' }}
                >
                  <div className="d-flex align-items-center gap-2 mb-3">
                    <div className="rounded p-1 d-flex align-items-center justify-content-center" style={{ width: '28px', height: '28px', backgroundColor: metric.iconBg, color: metric.iconColor }}>
                      <metric.icon size={16} />
                    </div>
                    <span className="fw-medium" style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{metric.title}</span>
                  </div>
                  
                  <h3 className="fw-bold mb-2" style={{ color: 'var(--text-primary)' }}>{metric.value}</h3>
                  
                  <div className="d-flex align-items-center gap-1" style={{ color: metric.isPositive ? '#10b981' : '#ef4444', fontSize: '0.85rem', fontWeight: '500' }}>
                    <TrendingUp size={14} />
                    <span>{metric.change}</span>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>

          {/* Weekly Performance - only show if activeDateRange is 'This Week' */}
          {activeDateRange === 'This Week' && (
            <div className="rounded-3 p-4 mb-4" style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-color)' }}>
              <h6 className="fw-bold mb-4" style={{ color: 'var(--text-primary)' }}>Weekly Performance</h6>
              <div className="d-flex justify-content-between align-items-end mt-5 pt-5 mb-2 px-2" style={{ height: '120px' }}>
                {currentData.weeklyPerformance?.map((day, idx) => (
                  <div key={idx} className="d-flex flex-column align-items-center justify-content-end" style={{ width: '12%' }}>
                    {day.count ? (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="d-flex flex-column align-items-center mb-2"
                      >
                        <span className="fw-bold" style={{ color: 'var(--text-primary)', fontSize: '0.9rem' }}>{day.count}</span>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{day.rev}</span>
                      </motion.div>
                    ) : (
                      <div className="w-100 mb-2" style={{ height: '3px', backgroundColor: '#00BFFF', borderRadius: '2px' }}></div>
                    )}
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }} className="mt-2">{day.day}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Service Breakdown */}
          <div className="rounded-3 p-4 mb-4" style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-color)' }}>
            <h6 className="fw-bold mb-4" style={{ color: 'var(--text-primary)' }}>Service Breakdown</h6>
            <div className="d-flex flex-column gap-3">
              {currentData.serviceBreakdown?.map((item, idx) => (
                <div key={idx}>
                  <div className="d-flex justify-content-between align-items-center mb-1">
                    <span className="fw-medium" style={{ fontSize: '0.9rem', color: 'var(--text-primary)' }}>{item.name}</span>
                    <span className="fw-bold" style={{ fontSize: '0.9rem' }}>{item.percent}%</span>
                  </div>
                  <div className="progress mb-1" style={{ height: '6px', backgroundColor: 'var(--hover-bg)' }}>
                    <motion.div 
                      key={`${activeDateRange}-${item.percent}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${item.percent}%` }}
                      transition={{ duration: 1, ease: 'easeOut' }}
                      className="progress-bar rounded-pill" 
                      style={{ backgroundColor: '#00BFFF' }}
                    ></motion.div>
                  </div>
                  <div className="d-flex justify-content-between align-items-center">
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{item.services}</span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{item.rev}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Business Metrics */}
          <div className="rounded-3 p-4 mb-4" style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-color)' }}>
            <h6 className="fw-bold mb-3" style={{ color: 'var(--text-primary)' }}>Business Metrics</h6>
            <div className="row g-3">
              {currentData.businessMetrics?.map((metric, idx) => (
                <div key={idx} className="col-6">
                  <div className="rounded p-3 h-100" style={{ backgroundColor: 'var(--bg-tertiary)' }}>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }} className="mb-1">{metric.title}</div>
                    <div className="fw-bold fs-5" style={{ color: 'var(--text-primary)' }}>{metric.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Customers */}
          <div className="rounded-3 p-4 mb-4" style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-color)' }}>
            <h6 className="fw-bold mb-1" style={{ color: 'var(--text-primary)' }}>Top Customers</h6>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }} className="d-block mb-4">Ranked by total spending</span>
            
            <div className="d-flex flex-column">
              {currentData.topCustomers?.map((customer, idx) => (
                <motion.div 
                  key={idx}
                  whileHover={{ backgroundColor: 'var(--hover-bg)' }}
                  className={`d-flex align-items-center justify-content-between py-3 ${idx !== currentData.topCustomers.length - 1 ? 'border-bottom' : ''}`}
                  style={{ borderBottomColor: 'var(--border-color)' }}
                >
                  <div className="d-flex align-items-center gap-3">
                    <div 
                      className="rounded-circle d-flex align-items-center justify-content-center fw-bold text-info" 
                      style={{ width: '32px', height: '32px', backgroundColor: 'rgba(0, 191, 255, 0.15)', fontSize: '0.85rem' }}
                    >
                      {customer.rank}
                    </div>
                    <div>
                      <div className="fw-medium mb-1" style={{ fontSize: '0.95rem', color: 'var(--text-primary)' }}>{customer.name}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{customer.services} • Last: {customer.lastVisit}</div>
                    </div>
                  </div>
                  <div className="fw-bold" style={{ color: 'var(--text-primary)', fontSize: '0.95rem' }}>
                    {customer.spent}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Export Button */}
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className="btn w-100 text-white rounded-3 py-3 d-flex align-items-center justify-content-center gap-2 fw-bold shadow-sm"
            style={{ backgroundColor: '#00BFFF', fontSize: '1rem' }}
          >
            <Calendar size={20} />
            Export Full Report
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default Analysis;
