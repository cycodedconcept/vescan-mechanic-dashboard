import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useOutletContext } from 'react-router-dom';
import {
  Bell,
  Menu,
  Download,
  Wallet,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  Search,
  Filter,
  MoreHorizontal,
  ChevronRight,
  Share2,
  DollarSign
} from 'lucide-react';
import { FINANCIAL_STATS, TRANSACTIONS, INVOICES, COMMISSIONS } from '../data/mockData';

const Financial = () => {
  const { isSidebarOpen, toggleSidebar } = useOutletContext();
  const [activeTab, setActiveTab] = useState('Overview');

  // Custom blue color from image
  const brandBlue = '#008FBF'; 

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex-grow-1 d-flex flex-column h-100 overflow-hidden bg-light"
    >
      {/* Standard White Top Bar */}
      <header className="bg-white border-bottom py-3 px-4 d-flex justify-content-between align-items-center flex-shrink-0">
        <div className="d-flex align-items-center gap-3">
          {!isSidebarOpen && (
            <motion.button 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleSidebar} 
              className="btn btn-link text-dark p-0"
            >
              <Menu size={24} />
            </motion.button>
          )}
          <div>
            <h5 className="fw-bold mb-0">Financial Tools</h5>
            <small className="text-muted">Manage your business operations</small>
          </div>
        </div>
        <div className="d-flex align-items-center gap-3">
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="btn btn-light position-relative rounded-circle p-2"
          >
            <Bell size={20} />
            <span className="position-absolute top-0 start-100 translate-middle p-1 bg-danger border border-light rounded-circle">
              <span className="visually-hidden">New alerts</span>
            </span>
          </motion.button>
          <motion.div 
            whileHover={{ scale: 1.1 }}
            className="bg-dark text-white rounded-circle d-flex align-items-center justify-content-center fw-bold cursor-pointer" 
            style={{ width: '40px', height: '40px' }}
          >
            JD
          </motion.div>
        </div>
      </header>

      {/* Scrollable Area */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex-grow-1 overflow-auto"
      >
        {/* Blue Section Wrapper  */}
        <div className="text-white p-4 mb-4" style={{ backgroundColor: brandBlue }}>
          {/* Section Title & Export */}
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h4 className="fw-bold mb-0">Financial Tools</h4>
            <motion.button 
              whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.2)' }}
              whileTap={{ scale: 0.95 }}
              className="btn btn-outline-light d-flex align-items-center gap-2 btn-sm rounded-3 py-2 px-3"
            >
              <Download size={16} />
              Export
            </motion.button>
          </div>

          {/* Glassmorphic Balance Card */}
          <motion.div 
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            className="rounded-4 p-4 shadow-sm mb-4 border border-white border-opacity-10" 
            style={{ 
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)'
            }}
          >
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <div className="d-flex align-items-center gap-2 mb-2 opacity-75">
                  <Wallet size={18} />
                  <span className="small">Wallet Balance</span>
                </div>
                <motion.h1 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="display-5 fw-bold mb-1"
                >
                  {FINANCIAL_STATS.balance}
                </motion.h1>
                <div className="small opacity-75">Available to withdraw</div>
              </div>
              <motion.button 
                whileHover={{ scale: 1.05, boxShadow: '0 5px 15px rgba(0,0,0,0.1)' }}
                whileTap={{ scale: 0.95 }}
                className="btn bg-white fw-bold px-4 py-2 rounded-3 border-0" 
                style={{ color: brandBlue }}
              >
                Withdraw
              </motion.button>
            </div>
          </motion.div>

          {/* Individual Stats Cards */}
          <div className="row g-3">
            {[
              { label: 'Today', value: FINANCIAL_STATS.today },
              { label: 'This Week', value: FINANCIAL_STATS.thisWeek },
              { label: 'Commission', value: FINANCIAL_STATS.commission }
            ].map((stat, i) => (
              <div key={stat.label} className="col-4">
                <motion.div 
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: 0.4 + (i * 0.1) }}
                  className="rounded-4 p-3 border border-white border-opacity-10 h-100"
                  style={{ backgroundColor: 'rgba(255, 255, 255, 0.08)' }}
                >
                  <h5 className="fw-bold mb-1">{stat.value}</h5>
                  <small className="opacity-75">{stat.label}</small>
                </motion.div>
              </div>
            ))}
          </div>
        </div>

        <div className="d-flex flex-column gap-4 px-4 pb-4">
          
          {/* Tabs */}
          <motion.div variants={itemVariants} className="border-bottom border-light">
            <div className="d-flex gap-4">
              {['Overview', 'Invoices', 'Transactions', 'Commissions'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className="btn border-0 p-0 pb-2 rounded-0 small position-relative"
                  style={{ 
                    color: activeTab === tab ? '#00C2FF' : '#718096',
                    fontWeight: activeTab === tab ? '600' : '400',
                    fontSize: '0.9rem'
                  }}
                >
                  {tab}
                  {activeTab === tab && (
                    <motion.div
                      layoutId="activeFinancialTab"
                      className="position-absolute bottom-0 start-0 w-100"
                      style={{ height: '2.5px', backgroundColor: '#00C2FF' }}
                    />
                  )}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Tab Content */}
          <motion.div
            key={activeTab}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="d-flex flex-column gap-4"
          >
            {activeTab === 'Overview' && (
              <>
                {/* Revenue Trends */}
                <motion.div 
                  variants={itemVariants}
                  whileHover={{ boxShadow: '0 10px 25px rgba(0,0,0,0.05)' }}
                  className="card border-0 shadow-sm rounded-4"
                >
                  <div className="card-body p-4">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <h6 className="fw-bold mb-0">Revenue Trends</h6>
                      <small className="text-success d-flex align-items-center gap-1">
                         <ArrowUpRight size={16} />
                         Last 7 days
                      </small>
                    </div>
                    
                    {/* Fake Chart Visualization */}
                    <div className="d-flex justify-content-between align-items-end" style={{ height: '150px' }}>
                       {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => {
                          const barHeight = [30, 45, 35, 60, 50, 75, 55][i];
                          return (
                            <div key={day} className="d-flex flex-column align-items-center gap-2 flex-grow-1">
                               <motion.div 
                                 initial={{ height: 0 }}
                                 animate={{ height: `${barHeight}%` }}
                                 transition={{ duration: 1, delay: 0.2 + (i * 0.1), ease: "easeOut" }}
                                 className="rounded-top"
                                 style={{ 
                                     backgroundColor: brandBlue,
                                     width: '60%',
                                     opacity: 0.8
                                 }}
                               ></motion.div>
                               <small className="text-muted" style={{ fontSize: '10px' }}>{day}</small>
                            </div>
                          );
                       })}
                    </div>
                  </div>
                </motion.div>

                {/* Stats Row */}
                <div className="row g-4">
                  {[
                    { 
                      label: 'Total Revenue', 
                      value: FINANCIAL_STATS.totalRevenue, 
                      sub: `+18% from last month`, 
                      icon: ArrowDownRight, 
                      color: '#28a745', 
                      bgColor: '#EFFFF4' 
                    },
                    { 
                      label: 'Pending', 
                      value: FINANCIAL_STATS.pending, 
                      sub: `${FINANCIAL_STATS.pendingCount} unpaid invoices`, 
                      icon: Clock, 
                      color: '#007bff', 
                      bgColor: '#DBEAFE' 
                    }
                  ].map((stat, i) => (
                    <div key={stat.label} className="col-md-6">
                      <motion.div 
                        variants={itemVariants}
                        whileHover={{ y: -5 }}
                        className="card border-0 shadow-sm rounded-4 h-100"
                      >
                        <div className="card-body p-4">
                          <div className="d-flex align-items-center gap-3 mb-3">
                            <div 
                              className="rounded-3 d-flex align-items-center justify-content-center"
                              style={{ width: '40px', height: '40px', backgroundColor: stat.bgColor, color: stat.color }}
                            >
                              <stat.icon size={20} />
                            </div>
                            <span className="text-muted small fw-medium">{stat.label}</span>
                          </div>
                          <div>
                            <h3 className="fw-bold mb-2" style={{ color: '#1a202c' }}>{stat.value}</h3>
                            <small 
                              className="fw-medium" 
                              style={{ color: stat.label === 'Total Revenue' ? '#28a745' : '#718096' }}
                            >
                              {stat.sub}
                            </small>
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  ))}
                </div>

                {/* Recent Transactions */}
                <motion.div variants={itemVariants} className="card border-0 shadow-sm rounded-4 overflow-hidden">
                   <div className="card-body p-4">
                      <h6 className="fw-bold mb-4">Recent Transactions</h6>
                      <div className="d-flex flex-column gap-4">
                         {TRANSACTIONS.map((tx, idx) => (
                            <motion.div 
                              key={tx.id} 
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.2 + (idx * 0.1) }}
                              whileHover={{ x: 5 }}
                              className="d-flex align-items-center justify-content-between cursor-pointer"
                            >
                               <div className="d-flex align-items-center gap-3">
                                  <motion.div 
                                    whileHover={{ rotate: 15 }}
                                    className={`p-2 rounded-circle ${
                                      tx.type === 'income' ? 'bg-success bg-opacity-10 text-success' :
                                      tx.type === 'expense' ? 'bg-danger bg-opacity-10 text-danger' :
                                      'bg-warning bg-opacity-10 text-warning'
                                  }`}>
                                     {tx.type === 'income' ? <ArrowDownRight size={18} /> : 
                                      tx.type === 'expense' ? <ArrowUpRight size={18} /> :
                                      <Clock size={18} />}
                                  </motion.div>
                                  <div>
                                     <div className="fw-medium text-dark">{tx.title}</div>
                                     <small className="text-muted">{tx.time}</small>
                                  </div>
                               </div>
                               <div className={`fw-bold ${
                                  tx.type === 'income' ? 'text-success' : 
                                  tx.type === 'expense' ? 'text-dark' : 
                                  'text-success' 
                               }`}>
                                  {tx.amount}
                               </div>
                            </motion.div>
                         ))}
                      </div>
                   </div>
                </motion.div>
              </>
            )}

            {activeTab === 'Invoices' && (
              <div className="d-flex flex-column gap-4">
                {INVOICES.map((invoice) => (
                  <motion.div 
                    key={invoice.id}
                    variants={itemVariants}
                    whileHover={{ y: -5, boxShadow: '0 12px 30px rgba(0,0,0,0.1)' }}
                    transition={{ type: 'spring', stiffness: 300 }}
                    className="card border-0 shadow-sm rounded-4 overflow-hidden cursor-pointer"
                  >
                    <div className="card-body p-4">
                      {/* Card Header: Invoice #, Status, Amount */}
                      <div className="d-flex justify-content-between align-items-start mb-2">
                        <div className="d-flex align-items-center gap-2">
                          <h6 className="fw-bold mb-0 text-dark">{invoice.id}</h6>
                          <span 
                            className="badge rounded-1 px-2 py-1 small fw-medium" 
                            style={{ 
                              fontSize: '0.65rem',
                              backgroundColor: invoice.status === 'Paid' ? '#EFFFF4' : '#FFEDD4',
                              color: invoice.status === 'Paid' ? '#28a745' : '#CA3500'
                            }}
                          >
                            <motion.span
                              animate={invoice.status !== 'Paid' ? {
                                opacity: [1, 0.6, 1],
                              } : {}}
                              transition={invoice.status !== 'Paid' ? {
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut"
                              } : {}}
                            >
                              {invoice.status}
                            </motion.span>
                          </span>
                        </div>
                        <h6 className="fw-bold mb-0 text-dark">{invoice.amount}</h6>
                      </div>

                      {/* Customer Info */}
                      <div className="mb-4">
                        <div className="text-secondary small">{invoice.customer}</div>
                        <div className="text-muted small" style={{ fontSize: '0.75rem' }}>{invoice.car}</div>
                      </div>

                      {/* Line Items Table-like UI */}
                      <div className="bg-light bg-opacity-50 p-3 rounded-3 mb-3 border border-secondary border-opacity-10">
                        {invoice.items.map((item, idx) => (
                          <motion.div 
                            key={idx} 
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 * idx, duration: 0.3 }}
                            className={`d-flex justify-content-between align-items-center ${idx < invoice.items.length - 1 ? 'border-bottom border-light pb-2 mb-2' : ''}`}
                          >
                            <span className="small text-secondary">{item.name}</span>
                            <span className="small fw-bold text-dark">{item.price}</span>
                          </motion.div>
                        ))}
                      </div>

                      {/* Footer: Dates */}
                      <div className="d-flex justify-content-between align-items-center mb-4 small text-muted">
                        <div className="d-flex align-items-center gap-1">
                          <Clock size={12} className="opacity-50" />
                          <span>Issue: {invoice.issueDate}</span>
                        </div>
                        <span>Due: {invoice.dueDate}</span>
                      </div>

                      {/* Actions */}
                      <div className="d-flex gap-2">
                        <motion.button 
                          whileHover={{ scale: 1.02, backgroundColor: '#002a5a' }}
                          whileTap={{ scale: 0.98 }}
                          className="btn btn-dark flex-grow-1 d-flex align-items-center justify-content-center gap-2 py-2 fw-medium rounded-3 border-0 transition-all shadow-sm" 
                          style={{ backgroundColor: '#001B39', color: 'white', fontSize: '0.9rem' }}
                        >
                          <Download size={18} /> Download
                        </motion.button>
                        <motion.button 
                          whileHover={{ scale: 1.05, backgroundColor: '#f0f4f8' }}
                          whileTap={{ scale: 0.95 }}
                          className="btn btn-outline-light px-3 py-2 rounded-3 border border-light shadow-sm bg-white text-secondary d-flex align-items-center justify-content-center"
                        >
                          <Share2 size={18} />
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {activeTab === 'Transactions' && (
              <div className="d-flex flex-column gap-1">
                <div className="mb-3">
                  <h5 className="fw-bold mb-0 text-dark">All Transactions</h5>
                  <small className="text-muted">Complete transaction history</small>
                </div>

                <motion.div 
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="card border-0 shadow-sm rounded-4 overflow-hidden"
                >
                  <div className="card-body p-0">
                    <div className="list-group list-group-flush">
                      {TRANSACTIONS.map((tx, idx) => (
                        <motion.div 
                          key={tx.id}
                          variants={itemVariants}
                          whileHover={{ backgroundColor: '#fcfcfc' }}
                          className={`list-group-item border-0 px-4 py-3 d-flex align-items-center justify-content-between ${idx < TRANSACTIONS.length - 1 ? 'border-bottom' : ''}`}
                        >
                          <div className="d-flex align-items-center gap-3">
                            {/* Icon Container */}
                            <div 
                              className="rounded-3 d-flex align-items-center justify-content-center"
                              style={{ 
                                width: '40px', 
                                height: '40px', 
                                backgroundColor: tx.type === 'income' ? '#EFFFF4' : tx.type === 'expense' ? '#FFF5F5' : '#FFF7ED',
                                color: tx.type === 'income' ? '#28a745' : tx.type === 'expense' ? '#EF4444' : '#F97316'
                              }}
                            >
                              {tx.type === 'income' ? <ArrowDownRight size={20} /> : tx.type === 'expense' ? <ArrowUpRight size={20} /> : <Clock size={20} />}
                            </div>

                            {/* Details */}
                            <div>
                              <div className="fw-bold text-dark" style={{ fontSize: '0.95rem' }}>{tx.title}</div>
                              <div className="d-flex flex-column" style={{ fontSize: '0.8rem' }}>
                                <span className="text-muted">{tx.time}</span>
                                <span className="text-muted opacity-50">{tx.refId}</span>
                              </div>
                            </div>
                          </div>

                          {/* Amount & Status */}
                          <div className="text-end">
                            <div 
                              className="fw-bold" 
                              style={{ 
                                color: tx.type === 'income' ? '#28a745' : '#1a202c',
                                fontSize: '1rem' 
                              }}
                            >
                              {tx.amount}
                            </div>
                            <div 
                              className="small fw-medium" 
                              style={{ 
                                color: tx.status === 'completed' ? '#22C55E' : '#CA3500',
                                fontSize: '0.75rem'
                              }}
                            >
                              {tx.status}
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>
            )}

            {activeTab === 'Commissions' && (
              <div className="d-flex flex-column gap-4">
                {/* Total Commission Banner */}
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 rounded-4 d-flex align-items-center justify-content-between"
                  style={{ backgroundColor: '#EFFFF4', border: '1px solid rgba(40, 167, 69, 0.1)' }}
                >
                  <div className="d-flex align-items-center gap-4">
                    <div 
                      className="rounded-3 d-flex align-items-center justify-content-center"
                      style={{ width: '56px', height: '56px', backgroundColor: '#28a745', color: 'white' }}
                    >
                      <DollarSign size={28} />
                    </div>
                    <div>
                      <div className="text-success fw-medium mb-1">Total Commission Earned</div>
                      <h2 className="fw-bold mb-0 text-dark">₦5,680</h2>
                    </div>
                  </div>
                  <div className="text-success small opacity-75 d-none d-md-block">
                    Earn 10% commission on every auto-part sale through your referrals
                  </div>
                </motion.div>

                <div>
                  <h5 className="fw-bold mb-0 text-dark">Commission History</h5>
                  <small className="text-muted">Auto-parts sales from your customers</small>
                </div>

                {/* Commissions List */}
                <motion.div 
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="d-flex flex-column gap-3"
                >
                  {COMMISSIONS.map((comm) => (
                    <motion.div 
                      key={comm.id}
                      variants={itemVariants}
                      whileHover={{ y: -2, boxShadow: '0 8px 20px rgba(0,0,0,0.05)' }}
                      className="card border-0 shadow-sm rounded-4 overflow-hidden"
                    >
                      <div className="card-body p-4">
                        <div className="d-flex justify-content-between align-items-start">
                          <div>
                            <div className="d-flex align-items-center gap-2 mb-1">
                              <h6 className="fw-bold mb-0 text-dark">{comm.customer}</h6>
                              <span 
                                className="badge rounded-1 px-2 py-0.5" 
                                style={{ 
                                  fontSize: '0.65rem',
                                  backgroundColor: comm.status === 'credited' ? '#EFFFF4' : '#FFF7ED',
                                  color: comm.status === 'credited' ? '#28a745' : '#F97316'
                                }}
                              >
                                {comm.status}
                              </span>
                            </div>
                            <div className="text-secondary small mb-3">{comm.item}</div>
                            
                            <div className="d-flex flex-column gap-1">
                              <span className="text-muted" style={{ fontSize: '0.75rem' }}>Order Value:</span>
                              <span className="fw-bold text-dark small">{comm.orderValue}</span>
                            </div>
                          </div>

                          <div className="text-end">
                            <div className="fw-bold text-success mb-1" style={{ fontSize: '1.1rem' }}>{comm.commission}</div>
                            <div className="text-muted small mb-3">{comm.rate}</div>
                            <div className="text-muted" style={{ fontSize: '0.75rem' }}>{comm.date}</div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            )}
          </motion.div>

        </div>
      </motion.div>
    </motion.div>
  );
};

export default Financial;
