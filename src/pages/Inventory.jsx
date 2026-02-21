import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bell, 
  Search, 
  Plus, 
  AlertCircle,
  Box,
  Droplets,
  Wind,
  Zap,
  ShoppingCart,
  TrendingDown,
  TrendingUp,
  Menu
} from 'lucide-react';

const inventoryData = [
  {
    id: 1,
    name: 'Oxygen Sensor',
    category: 'Engine',
    sku: 'OX-SEN-001',
    inStock: 3,
    unitPrice: '₦12,000',
    used: 8,
    minStock: 5,
    lastUsed: '2 days ago',
    status: 'Low Stock',
    icon: Box,
    iconColor: '#f59e0b',
    iconBg: '#fef3c7'
  },
  {
    id: 2,
    name: 'Brake Pads (Front)',
    category: 'Brakes',
    sku: 'BRK-PAD-F01',
    inStock: 12,
    unitPrice: '₦15,000',
    used: 24,
    minStock: 8,
    lastUsed: '1 week ago',
    status: 'In Stock',
    icon: Box,
    iconColor: '#10b981',
    iconBg: '#d1fae5'
  },
  {
    id: 3,
    name: 'Engine Oil (5W-30)',
    category: 'Fluids',
    sku: 'OIL-5W30-001',
    inStock: 28,
    unitPrice: '₦3,600',
    used: 45,
    minStock: 15,
    lastUsed: '3 days ago',
    status: 'In Stock',
    icon: Box,
    iconColor: '#10b981',
    iconBg: '#d1fae5'
  },
  {
    id: 4,
    name: 'Air Filter',
    category: 'Engine',
    sku: 'AIR-FLT-001',
    inStock: 2,
    unitPrice: '₦3,500',
    used: 18,
    minStock: 10,
    lastUsed: '2 days ago',
    status: 'Low Stock',
    icon: Box,
    iconColor: '#f59e0b',
    iconBg: '#fef3c7'
  },
  {
    id: 5,
    name: 'Cabin Filter',
    category: 'Interior',
    sku: 'CAB-FLT-001',
    inStock: 0,
    unitPrice: '₦4,500',
    used: 12,
    minStock: 8,
    lastUsed: '1 week ago',
    status: 'Out of Stock',
    icon: Box,
    iconColor: '#ef4444',
    iconBg: '#fee2e2'
  },
  {
    id: 6,
    name: 'Spark Plugs (Set of 4)',
    category: 'Engine',
    sku: 'SPK-PLG-004',
    inStock: 15,
    unitPrice: '₦8,000',
    used: 20,
    minStock: 12,
    lastUsed: '5 days ago',
    status: 'In Stock',
    icon: Box,
    iconColor: '#10b981',
    iconBg: '#d1fae5'
  }
];

const ordersData = [
  {
    id: 'ORD-2024-045',
    status: 'pending',
    vendor: 'Auto Parts Nigeria',
    total: '₦95,000',
    items: [
      { name: 'Oxygen Sensor', qty: 5, price: '₦60,000' },
      { name: 'Air Filter', qty: 10, price: '₦35,000' }
    ],
    orderedDate: 'Jan 14, 2026',
    expectedDate: 'Jan 18, 2026',
    payment: 'E-Wallet'
  },
  {
    id: 'ORD-2024-044',
    status: 'shipped',
    vendor: 'Premium Auto Supply',
    total: '₦140,000',
    items: [
      { name: 'Brake Pads (Front)', qty: 8, price: '₦120,000' },
      { name: 'Brake Fluid', qty: 10, price: '₦20,000' }
    ],
    orderedDate: 'Jan 12, 2026',
    expectedDate: 'Jan 15, 2026',
    payment: 'E-Wallet'
  },
  {
    id: 'ORD-2024-043',
    status: 'delivered',
    vendor: 'Oil Masters Ltd',
    total: '₦72,000',
    items: [
      { name: 'Engine Oil (5W-30)', qty: 20, price: '₦72,000' }
    ],
    orderedDate: 'Jan 10, 2026',
    expectedDate: 'Jan 13, 2026',
    payment: 'E-Wallet'
  }
];

const transactionData = [
  {
    id: 1,
    title: 'Parts Order - ORD-2024-045',
    time: 'Yesterday',
    amount: '₦95,000',
    type: 'debit',
    icon: ShoppingCart,
    iconColor: '#ef4444',
    iconBg: '#fee2e2'
  },
  {
    id: 2,
    title: 'Parts Order - ORD-2024-044',
    time: '3 days ago',
    amount: '₦140,000',
    type: 'debit',
    icon: ShoppingCart,
    iconColor: '#ef4444',
    iconBg: '#fee2e2'
  },
  {
    id: 3,
    title: 'Wallet Top-up',
    time: '4 days ago',
    amount: '+₦200,000',
    type: 'credit',
    icon: TrendingUp,
    iconColor: '#10b981',
    iconBg: '#d1fae5'
  },
  {
    id: 4,
    title: 'Parts Order - ORD-2024-043',
    time: '5 days ago',
    amount: '₦72,000',
    type: 'debit',
    icon: ShoppingCart,
    iconColor: '#ef4444',
    iconBg: '#fee2e2'
  }
];

const Inventory = () => {
  const { isSidebarOpen, toggleSidebar } = useOutletContext();
  const [activeTab, setActiveTab] = useState('inventory');
  const [searchQuery, setSearchQuery] = useState('');

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    in: { opacity: 1, y: 0 },
    out: { opacity: 0, y: -20 }
  };

  const pageTransition = {
    type: 'tween',
    ease: 'anticipate',
    duration: 0.5
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.2 } }
  };

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      className="d-flex flex-column h-100 bg-light"
    >
      {/* Top Header */}
      <div className="bg-white border-bottom px-4 py-3 d-flex justify-content-between align-items-center">
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
            <h4 className="mb-0 fw-bold" style={{ color: '#001F3F' }}>Inventory & E-commerce</h4>
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
        {/* Stats Banner */}
        <div className="px-4 py-4 flex-shrink-0" style={{ backgroundColor: '#008CBA' }}>
          <h5 className="text-white mb-3 fw-semibold">Inventory & E-commerce</h5>
          <div className="row g-3">
            <div className="col-md-4">
              <motion.div 
                whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 255, 255, 0.2)' }} 
                transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                className="p-3 rounded" 
                style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', cursor: 'pointer' }}
              >
                <div className="fs-3 fw-bold text-white mb-1">6</div>
                <div className="text-white opacity-75" style={{ fontSize: '0.85rem' }}>Total Parts</div>
              </motion.div>
            </div>
            <div className="col-md-4">
              <motion.div 
                whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 255, 255, 0.2)' }} 
                transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                className="p-3 rounded" 
                style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', cursor: 'pointer' }}
              >
                <div className="fs-3 fw-bold text-white mb-1">3</div>
                <div className="text-white opacity-75" style={{ fontSize: '0.85rem' }}>Low/Out Stock</div>
              </motion.div>
            </div>
            <div className="col-md-4">
              <motion.div 
                whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 255, 255, 0.2)' }} 
                transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                className="p-3 rounded" 
                style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', cursor: 'pointer' }}
              >
                <div className="fs-3 fw-bold text-white mb-1">1</div>
                <div className="text-white opacity-75" style={{ fontSize: '0.85rem' }}>Pending Orders</div>
              </motion.div>
            </div>
          </div>
        </div>

        <div className="flex-grow-1 bg-white">
          {/* Tabs */}
          <div className="border-bottom px-4 pt-3">
          <ul className="nav nav-tabs border-0" style={{ gap: '2rem' }}>
            <li className="nav-item">
              <button 
                className={`nav-link border-0 bg-transparent px-0 pb-3 ${activeTab === 'inventory' ? 'active' : ''}`}
                style={{ 
                  color: activeTab === 'inventory' ? '#001F3F' : '#6c757d',
                  borderBottom: activeTab === 'inventory' ? '2px solid #001F3F' : '2px solid transparent',
                  fontWeight: activeTab === 'inventory' ? '600' : '400'
                }}
                onClick={() => setActiveTab('inventory')}
              >
                Parts Inventory
              </button>
            </li>
            <li className="nav-item">
              <button 
                className={`nav-link border-0 bg-transparent px-0 pb-3 ${activeTab === 'orders' ? 'active' : ''}`}
                style={{ 
                  color: activeTab === 'orders' ? '#001F3F' : '#6c757d',
                  borderBottom: activeTab === 'orders' ? '2px solid #001F3F' : '2px solid transparent',
                  fontWeight: activeTab === 'orders' ? '600' : '400'
                }}
                onClick={() => setActiveTab('orders')}
              >
                Orders (3)
              </button>
            </li>
            <li className="nav-item">
              <button 
                className={`nav-link border-0 bg-transparent px-0 pb-3 ${activeTab === 'ewallet' ? 'active' : ''}`}
                style={{ 
                  color: activeTab === 'ewallet' ? '#F25C05' : '#6c757d',
                  borderBottom: activeTab === 'ewallet' ? '2px solid #F25C05' : '2px solid transparent',
                  fontWeight: activeTab === 'ewallet' ? '500' : '400'
                }}
                onClick={() => setActiveTab('ewallet')}
              >
                E-Wallet
              </button>
            </li>
          </ul>
        </div>

        <div className="p-4">
          <AnimatePresence mode="wait">
            {activeTab === 'inventory' && (
              <motion.div
                key="inventory-content"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {/* Main content below tabs */}
                <div className="mb-4 position-relative">
                  <Search className="position-absolute top-50 translate-middle-y text-muted" style={{ left: '16px' }} size={18} />
                  <input 
                    type="text" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="form-control rounded-3" 
                    placeholder="Search parts by name, category, or sku..." 
                    style={{ paddingLeft: '44px', paddingRight: '16px', py: '12px' }}
                  />
                </div>

                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  whileHover={{ scale: 1.01 }}
                  className="alert d-flex align-items-center justify-content-between p-3 rounded-3 mb-4" 
                  style={{ backgroundColor: '#fff5f5', border: '1px solid #ffe3e3', cursor: 'pointer' }}
                >
                  <div className="d-flex align-items-center gap-3">
                    <AlertCircle className="text-danger" size={20} />
                    <div>
                      <h6 className="mb-0 text-danger fw-semibold" style={{ fontSize: '0.9rem' }}>Low Stock Alert</h6>
                      <span className="text-danger opacity-75" style={{ fontSize: '0.8rem' }}>3 items need restocking</span>
                    </div>
                  </div>
                  <button className="btn btn-link text-danger p-0 text-decoration-none" style={{ fontSize: '0.9rem', fontWeight: 500 }}>
                    View All
                  </button>
                </motion.div>

                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="btn w-100 text-white rounded-3 py-2 d-flex align-items-center justify-content-center gap-2 mb-4 shadow-sm" 
                  style={{ backgroundColor: '#001F3F', fontWeight: 500 }}
                >
                  <Plus size={18} />
                  Add New Part
                </motion.button>

                {/* Parts List */}
                <motion.div 
                  variants={containerVariants}
                  initial="hidden"
                  animate="show"
                  className="d-flex flex-column gap-3"
                >
                  <AnimatePresence>
                  {inventoryData.filter(item => {
                    if (!searchQuery) return true;
                    return item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           item.category.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           item.sku.toLowerCase().includes(searchQuery.toLowerCase());
                  }).map((item) => (
                    <motion.div 
                      key={item.id} 
                      layout
                      variants={itemVariants}
                      initial="hidden"
                      animate="show"
                      exit="exit"
                      whileHover={{ y: -4, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)' }}
                      className="bg-white border rounded-3 p-4 transition-all"
                      style={{ cursor: 'pointer' }}
                    >
                      <div className="d-flex justify-content-between align-items-start mb-4">
                        <div className="d-flex align-items-start gap-3">
                          <div className="rounded p-2" style={{ backgroundColor: item.iconBg, color: item.iconColor }}>
                            <item.icon size={24} />
                          </div>
                          <div>
                            <h6 className="mb-1 fw-bold" style={{ color: '#001F3F' }}>{item.name}</h6>
                            <div className="text-muted mb-1" style={{ fontSize: '0.85rem' }}>{item.category}</div>
                            <div className="text-muted text-uppercase" style={{ fontSize: '0.75rem', letterSpacing: '0.5px' }}>{item.sku}</div>
                          </div>
                        </div>
                        <span 
                          className="badge rounded-pill fw-medium"
                          style={{ 
                            backgroundColor: item.status === 'In Stock' ? '#d1fae5' : item.status === 'Low Stock' ? '#fef3c7' : '#fee2e2',
                            color: item.status === 'In Stock' ? '#059669' : item.status === 'Low Stock' ? '#d97706' : '#dc2626',
                            padding: '0.4rem 0.8rem',
                            fontSize: '0.75rem'
                          }}
                        >
                          {item.status}
                        </span>
                      </div>

                      <div className="row g-3 px-3 py-3 mb-4 rounded" style={{ backgroundColor: '#f8f9fa' }}>
                         <div className="col-4 text-center border-end">
                           <div className={`fs-5 fw-bold ${item.inStock === 0 ? 'text-danger' : item.inStock <= item.minStock ? 'text-danger' : 'text-dark'}`}>{item.inStock}</div>
                           <div className="text-muted" style={{ fontSize: '0.8rem' }}>In Stock</div>
                         </div>
                         <div className="col-4 text-center border-end">
                           <div className="fs-5 fw-bold text-dark">{item.unitPrice}</div>
                           <div className="text-muted" style={{ fontSize: '0.8rem' }}>Unit Price</div>
                         </div>
                         <div className="col-4 text-center">
                           <div className="fs-5 fw-bold text-dark">{item.used}</div>
                           <div className="text-muted" style={{ fontSize: '0.8rem' }}>Used</div>
                         </div>
                      </div>

                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <span className="text-muted" style={{ fontSize: '0.8rem' }}>Min Stock: {item.minStock}</span>
                        <span className="text-muted" style={{ fontSize: '0.8rem' }}>Last Used: {item.lastUsed}</span>
                      </div>

                      {(item.status === 'Low Stock' || item.status === 'Out of Stock') && (
                        <motion.button 
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="btn w-100 text-white rounded-3 py-2 d-flex align-items-center justify-content-center gap-2 mt-2 shadow-sm" 
                          style={{ backgroundColor: '#001F3F', fontWeight: 500 }}
                        >
                          <ShoppingCart size={18} />
                          Reorder Now
                        </motion.button>
                      )}
                    </motion.div>
                  ))}
                  </AnimatePresence>
                </motion.div>
              </motion.div>
            )}

            {activeTab === 'orders' && (
              <motion.div
                key="orders-content"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="d-flex flex-column gap-3"
              >
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="btn w-100 text-white rounded-3 py-2 d-flex align-items-center justify-content-center gap-2 mb-2 shadow-sm" 
                  style={{ backgroundColor: '#001F3F', fontWeight: 500 }}
                >
                  <Plus size={18} />
                  Create New Order
                </motion.button>

                {ordersData.map((order) => (
                  <motion.div 
                    key={order.id} 
                    variants={itemVariants}
                    initial="hidden"
                    animate="show"
                    whileHover={{ y: -2, boxShadow: '0 8px 20px -5px rgba(0, 0, 0, 0.08)' }}
                    className="bg-white border rounded-3 p-4 transition-all"
                  >
                    <div className="d-flex justify-content-between align-items-start mb-3">
                      <div>
                        <div className="d-flex align-items-center gap-2 mb-1">
                          <h6 className="mb-0 fw-bold" style={{ color: '#001F3F' }}>{order.id}</h6>
                          <motion.span 
                            animate={{ opacity: [0.7, 1, 0.7], scale: [0.98, 1.02, 0.98] }}
                            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                            className="badge rounded-pill fw-medium px-2 py-1"
                            style={{ 
                              backgroundColor: order.status === 'delivered' ? '#d1fae5' : order.status === 'pending' ? '#fef3c7' : '#dbeafe',
                              color: order.status === 'delivered' ? '#059669' : order.status === 'pending' ? '#d97706' : '#2563eb',
                              fontSize: '0.7rem'
                            }}
                          >
                            {order.status}
                          </motion.span>
                        </div>
                        <div className="text-muted" style={{ fontSize: '0.85rem' }}>{order.vendor}</div>
                      </div>
                      <div className="fs-5 fw-bold" style={{ color: '#111827' }}>
                        {order.total}
                      </div>
                    </div>

                    <div className="bg-light rounded p-3 mb-4">
                      <div className="text-muted mb-2" style={{ fontSize: '0.8rem' }}>Order Items:</div>
                      {order.items.map((item, idx) => (
                        <div key={idx} className="d-flex justify-content-between align-items-center mb-1">
                          <span style={{ fontSize: '0.85rem', color: '#4b5563' }}>{item.qty}x {item.name}</span>
                          <span className="fw-medium" style={{ fontSize: '0.85rem' }}>{item.price}</span>
                        </div>
                      ))}
                    </div>

                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <span className="text-muted" style={{ fontSize: '0.8rem' }}>Ordered: {order.orderedDate}</span>
                      <span className="text-muted" style={{ fontSize: '0.8rem' }}>Expected: {order.expectedDate}</span>
                    </div>

                    <div className="d-flex align-items-center gap-2 mt-3">
                      <span className="text-muted" style={{ fontSize: '0.8rem' }}>Payment:</span>
                      <span 
                        className="badge" 
                        style={{ 
                          backgroundColor: '#f3e8ff', 
                          color: '#9333ea',
                          padding: '0.3rem 0.6rem',
                          fontSize: '0.75rem',
                          fontWeight: 500
                        }}
                      >
                        {order.payment}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {activeTab === 'ewallet' && (
              <motion.div
                key="ewallet-content"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="d-flex flex-column gap-4"
              >
                {/* E-Wallet Balance Card */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="rounded-4 p-4 text-white position-relative overflow-hidden"
                  style={{ backgroundColor: '#001F3F' }}
                >
                  <div className="position-relative z-1">
                    <div className="opacity-75 mb-1" style={{ fontSize: '0.9rem' }}>E-Wallet Balance</div>
                    <div className="fw-bold mb-4" style={{ fontSize: '2.5rem' }}>₦45,230</div>
                    
                    <div className="d-flex gap-3">
                      <motion.button 
                        whileHover={{ scale: 1.02, backgroundColor: 'rgba(255, 255, 255, 1)' }}
                        whileTap={{ scale: 0.98 }}
                        className="btn bg-white w-50 py-3 fw-bold rounded-3 shadow-sm border-0"
                        style={{ color: '#00bfff', transition: 'background-color 0.2s' }}
                      >
                        Top Up Wallet
                      </motion.button>
                      <motion.button 
                        whileHover={{ scale: 1.02, backgroundColor: '#00a6e0' }}
                        whileTap={{ scale: 0.98 }}
                        className="btn w-50 py-3 fw-bold rounded-3 shadow-sm text-white"
                        style={{ backgroundColor: '#00bfff', transition: 'background-color 0.2s' }}
                      >
                        Withdraw
                      </motion.button>
                    </div>
                  </div>
                </motion.div>

                {/* Transactions Title */}
                <div>
                  <h6 className="fw-bold mb-1" style={{ color: '#001F3F', fontSize: '1.1rem' }}>Wallet Transactions</h6>
                  <div className="text-muted" style={{ fontSize: '0.85rem' }}>All transactions related to parts purchases</div>
                </div>

                {/* Transactions List */}
                <motion.div 
                  variants={containerVariants}
                  initial="hidden"
                  animate="show"
                  className="bg-white border rounded-3 p-1"
                >
                  {transactionData.map((trx, index) => (
                    <motion.div 
                      key={trx.id}
                      variants={itemVariants}
                      whileHover={{ backgroundColor: '#f8f9fa' }}
                      className={`d-flex align-items-center justify-content-between p-3 ${index !== transactionData.length - 1 ? 'border-bottom' : ''}`}
                      style={{ transition: 'background-color 0.2s', cursor: 'pointer' }}
                    >
                      <div className="d-flex align-items-center gap-3">
                        <div className="rounded p-2 d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px', backgroundColor: trx.iconBg, color: trx.iconColor }}>
                          <trx.icon size={20} />
                        </div>
                        <div>
                          <div className="fw-medium text-dark mb-1" style={{ fontSize: '0.9rem' }}>{trx.title}</div>
                          <div className="text-muted" style={{ fontSize: '0.8rem' }}>{trx.time}</div>
                        </div>
                      </div>
                      <div className="fw-bold" style={{ color: trx.type === 'credit' ? '#10b981' : '#111827', fontSize: '0.95rem' }}>
                        {trx.amount}
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      </div>
    </motion.div>
  );
};

export default Inventory;
