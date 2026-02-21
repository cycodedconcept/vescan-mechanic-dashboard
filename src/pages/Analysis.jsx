import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
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
const metricIcons = {
  revenue: { icon: DollarSign, iconColor: '#10b981', iconBg: '#d1fae5' },
  services: { icon: Wrench, iconColor: '#3b82f6', iconBg: '#dbeafe' },
  customers: { icon: Users, iconColor: '#a855f7', iconBg: '#f3e8ff' },
  satisfaction: { icon: Star, iconColor: '#f59e0b', iconBg: '#fef3c7' }
};
const mockData = {
  'This Week': {
    primaryMetrics: [
      {
        title: 'Revenue',
        value: '₦124.5k',
        change: '+18%',
        isPositive: true,
        ...metricIcons.revenue
      },
      {
        title: 'Services',
        value: '32',
        change: '+12%',
        isPositive: true,
        ...metricIcons.services
      },
      {
        title: 'Customers',
        value: '24',
        change: '+8%',
        isPositive: true,
        ...metricIcons.customers
      },
      {
        title: 'Satisfaction',
        value: '4.8/5.0',
        change: '+0.2',
        isPositive: true,
        ...metricIcons.satisfaction
      }
    ],
    weeklyPerformance: [
      { day: 'Mon', count: 4, rev: '₦29k' },
      { day: 'Tue', count: 6, rev: '₦45k' },
      { day: 'Wed', count: 5, rev: '₦39k' },
      { day: 'Thu', count: 7, rev: '₦52k' },
      { day: 'Fri', count: 5, rev: '₦41k' },
      { day: 'Sat', count: 8, rev: '₦68k' },
      { day: 'Sun', count: null, rev: null }
    ],
    serviceBreakdown: [
      { name: 'Engine Diagnostics', percent: 38, services: '12 services', rev: '₦340k' },
      { name: 'Brake Service', percent: 25, services: '8 services', rev: '₦180k' },
      { name: 'Oil Change', percent: 19, services: '6 services', rev: '₦72k' },
      { name: 'Full Service', percent: 12, services: '4 services', rev: '₦140k' },
      { name: 'Other', percent: 6, services: '2 services', rev: '₦48k' }
    ],
    businessMetrics: [
      { title: 'Avg Job Value', value: '₦3,890' },
      { title: 'Labor Efficiency', value: '92%' },
      { title: 'Parts Used', value: '45' },
      { title: 'ROI', value: '285%' }
    ],
    topCustomers: [
      { rank: 1, name: 'David Okonkwo', services: '15 services', lastVisit: '3 days ago', spent: '₦420k' },
      { rank: 2, name: 'John Adeyemi', services: '12 services', lastVisit: '2 days ago', spent: '₦285k' },
      { rank: 3, name: 'Peter Obi', services: '9 services', lastVisit: '1 week ago', spent: '₦245k' },
      { rank: 4, name: 'Sarah Ibrahim', services: '8 services', lastVisit: '1 week ago', spent: '₦156k' },
      { rank: 5, name: 'Mary Johnson', services: '6 services', lastVisit: '2 weeks ago', spent: '₦124k' }
    ]
  },
  'This Month': {
    primaryMetrics: [
      {
        title: 'Revenue',
        value: '₦485.0k',
        change: '+24%',
        isPositive: true,
        ...metricIcons.revenue
      },
      {
        title: 'Services',
        value: '128',
        change: '+15%',
        isPositive: true,
        ...metricIcons.services
      },
      {
        title: 'Customers',
        value: '86',
        change: '+22%',
        isPositive: true,
        ...metricIcons.customers
      },
      {
        title: 'Satisfaction',
        value: '4.7/5.0',
        change: '+0.1',
        isPositive: true,
        ...metricIcons.satisfaction
      }
    ],
    weeklyPerformance: [], // The prompt mockup does not show the weekly performance graph when 'This Month' is active, but we need the shape to avoid crashes or we just hide the component below
    serviceBreakdown: [
      { name: 'Engine Diagnostics', percent: 38, services: '12 services', rev: '₦340k' },
      { name: 'Brake Service', percent: 25, services: '8 services', rev: '₦180k' },
      { name: 'Oil Change', percent: 19, services: '6 services', rev: '₦72k' },
      { name: 'Full Service', percent: 12, services: '4 services', rev: '₦140k' },
      { name: 'Other', percent: 6, services: '2 services', rev: '₦48k' }
    ],
    businessMetrics: [
      { title: 'Avg Job Value', value: '₦3,789' },
      { title: 'Labor Efficiency', value: '89%' },
      { title: 'Parts Used', value: '182' },
      { title: 'ROI', value: '312%' }
    ],
    topCustomers: [
      { rank: 1, name: 'David Okonkwo', services: '15 services', lastVisit: '3 days ago', spent: '₦420k' },
      { rank: 2, name: 'John Adeyemi', services: '12 services', lastVisit: '2 days ago', spent: '₦285k' },
      { rank: 3, name: 'Peter Obi', services: '9 services', lastVisit: '1 week ago', spent: '₦245k' },
      { rank: 4, name: 'Sarah Ibrahim', services: '8 services', lastVisit: '1 week ago', spent: '₦156k' },
      { rank: 5, name: 'Mary Johnson', services: '6 services', lastVisit: '2 weeks ago', spent: '₦124k' }
    ]
  },
  'This Year': {
     primaryMetrics: [
      {
        title: 'Revenue',
        value: '₦5240.0k',
        change: '+32%',
        isPositive: true,
        ...metricIcons.revenue
      },
      {
        title: 'Services',
        value: '1456',
        change: '+28%',
        isPositive: true,
        ...metricIcons.services
      },
      {
        title: 'Customers',
        value: '412',
        change: '+35%',
        isPositive: true,
        ...metricIcons.customers
      },
      {
        title: 'Satisfaction',
        value: '4.6/5.0',
        change: '+0.3',
        isPositive: true,
        ...metricIcons.satisfaction
      }
    ],
     weeklyPerformance: [], // The prompt mockup does not show the weekly performance graph when 'This Year' is active, so we leave it empty since it's hidden.
     serviceBreakdown: [
      { name: 'Engine Diagnostics', percent: 38, services: '12 services', rev: '₦340k' },
      { name: 'Brake Service', percent: 25, services: '8 services', rev: '₦180k' },
      { name: 'Oil Change', percent: 19, services: '6 services', rev: '₦72k' },
      { name: 'Full Service', percent: 12, services: '4 services', rev: '₦140k' },
      { name: 'Other', percent: 6, services: '2 services', rev: '₦48k' }
    ],
     businessMetrics: [
      { title: 'Avg Job Value', value: '₦3,599' },
      { title: 'Labor Efficiency', value: '87%' },
      { title: 'Parts Used', value: '2048' },
      { title: 'ROI', value: '298%' }
    ],
     topCustomers: [
      { rank: 1, name: 'David Okonkwo', services: '15 services', lastVisit: '3 days ago', spent: '₦420k' },
      { rank: 2, name: 'John Adeyemi', services: '12 services', lastVisit: '2 days ago', spent: '₦285k' },
      { rank: 3, name: 'Peter Obi', services: '9 services', lastVisit: '1 week ago', spent: '₦245k' },
      { rank: 4, name: 'Sarah Ibrahim', services: '8 services', lastVisit: '1 week ago', spent: '₦156k' },
      { rank: 5, name: 'Mary Johnson', services: '6 services', lastVisit: '2 weeks ago', spent: '₦124k' }
    ]
  }
};

const Analysis = () => {
  const { isSidebarOpen, toggleSidebar } = useOutletContext();
  const [activeDateRange, setActiveDateRange] = useState('This Week');

  // Currently active data based on segmented control state
  const currentData = mockData[activeDateRange] || mockData['This Week'];

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
            <h4 className="mb-0 fw-bold" style={{ color: '#001F3F' }}>Analytics & Reports</h4>
            <span className="text-muted" style={{ fontSize: '0.85rem' }}>Manage your business operations</span>
          </div>
        </div>
        <div className="d-flex align-items-center gap-3">
          <div className="position-relative">
            <Bell size={20} className="text-muted" />
            <span className="position-absolute top-0 start-100 translate-middle p-1 bg-danger border border-light rounded-circle">
              <span className="visually-hidden">New alerts</span>
            </span>
          </div>
          <div className="bg-dark text-white rounded-circle d-flex align-items-center justify-content-center fw-bold" style={{ width: '32px', height: '32px', fontSize: '0.8rem' }}>
            JD
          </div>
        </div>
      </div>

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
                  className="bg-white rounded-3 p-4 border h-100 transition-all"
                  style={{ cursor: 'pointer' }}
                >
                  <div className="d-flex align-items-center gap-2 mb-3">
                    <div className="rounded p-1 d-flex align-items-center justify-content-center" style={{ width: '28px', height: '28px', backgroundColor: metric.iconBg, color: metric.iconColor }}>
                      <metric.icon size={16} />
                    </div>
                    <span className="text-muted fw-medium" style={{ fontSize: '0.9rem' }}>{metric.title}</span>
                  </div>
                  
                  <h3 className="fw-bold mb-2" style={{ color: '#001F3F' }}>{metric.value}</h3>
                  
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
            <div className="bg-white rounded-3 p-4 border mb-4">
              <h6 className="fw-bold mb-4" style={{ color: '#001F3F' }}>Weekly Performance</h6>
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
                        <span className="fw-bold" style={{ color: '#001F3F', fontSize: '0.9rem' }}>{day.count}</span>
                        <span className="text-muted" style={{ fontSize: '0.75rem' }}>{day.rev}</span>
                      </motion.div>
                    ) : (
                      <div className="w-100 mb-2" style={{ height: '3px', backgroundColor: '#00BFFF', borderRadius: '2px' }}></div>
                    )}
                    <span className="text-muted mt-2" style={{ fontSize: '0.8rem' }}>{day.day}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Service Breakdown */}
          <div className="bg-white rounded-3 p-4 border mb-4">
            <h6 className="fw-bold mb-4" style={{ color: '#001F3F' }}>Service Breakdown</h6>
            <div className="d-flex flex-column gap-3">
              {currentData.serviceBreakdown?.map((item, idx) => (
                <div key={idx}>
                  <div className="d-flex justify-content-between align-items-center mb-1">
                    <span className="text-dark fw-medium" style={{ fontSize: '0.9rem' }}>{item.name}</span>
                    <span className="fw-bold" style={{ fontSize: '0.9rem' }}>{item.percent}%</span>
                  </div>
                  <div className="progress mb-1" style={{ height: '6px', backgroundColor: '#f1f5f9' }}>
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
                    <span className="text-muted" style={{ fontSize: '0.75rem' }}>{item.services}</span>
                    <span className="text-muted" style={{ fontSize: '0.75rem' }}>{item.rev}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Business Metrics */}
          <div className="bg-white rounded-3 p-4 border mb-4">
            <h6 className="fw-bold mb-3" style={{ color: '#001F3F' }}>Business Metrics</h6>
            <div className="row g-3">
              {currentData.businessMetrics?.map((metric, idx) => (
                <div key={idx} className="col-6">
                  <div className="rounded p-3 h-100" style={{ backgroundColor: '#f8f9fa' }}>
                    <div className="text-muted mb-1" style={{ fontSize: '0.8rem' }}>{metric.title}</div>
                    <div className="fw-bold fs-5" style={{ color: '#111827' }}>{metric.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Customers */}
          <div className="bg-white rounded-3 p-4 border mb-4">
            <h6 className="fw-bold mb-1" style={{ color: '#001F3F' }}>Top Customers</h6>
            <span className="text-muted d-block mb-4" style={{ fontSize: '0.8rem' }}>Ranked by total spending</span>
            
            <div className="d-flex flex-column">
              {currentData.topCustomers?.map((customer, idx) => (
                <motion.div 
                  key={idx}
                  whileHover={{ backgroundColor: '#f8f9fa' }}
                  className={`d-flex align-items-center justify-content-between py-3 ${idx !== currentData.topCustomers.length - 1 ? 'border-bottom' : ''}`}
                >
                  <div className="d-flex align-items-center gap-3">
                    <div 
                      className="rounded-circle d-flex align-items-center justify-content-center fw-bold text-info" 
                      style={{ width: '32px', height: '32px', backgroundColor: 'rgba(0, 191, 255, 0.15)', fontSize: '0.85rem' }}
                    >
                      {customer.rank}
                    </div>
                    <div>
                      <div className="fw-medium text-dark mb-1" style={{ fontSize: '0.95rem' }}>{customer.name}</div>
                      <div className="text-muted" style={{ fontSize: '0.75rem' }}>{customer.services} • Last: {customer.lastVisit}</div>
                    </div>
                  </div>
                  <div className="fw-bold" style={{ color: '#111827', fontSize: '0.95rem' }}>
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
