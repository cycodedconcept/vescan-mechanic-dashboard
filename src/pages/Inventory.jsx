import { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import TopHeader from '../components/TopHeader';
import { Search, Plus, AlertCircle, Box, ShoppingCart } from 'lucide-react';

import { inventoryData, transactionData } from '../data/mockData';

const ORDER_HISTORY_URL = 'https://zubitechnologies.com/obd_final_apis/api/customer_order_history';

const Inventory = () => {
  const { isSidebarOpen, toggleSidebar } = useOutletContext();
  const [activeTab, setActiveTab] = useState(() => new URLSearchParams(window.location.search).get('tab') === 'orders' ? 'orders' : 'inventory');
  const [searchQuery, setSearchQuery] = useState('');

  const [orderHistory, setOrderHistory] = useState([]);
  const [isLoadingOrders, setIsLoadingOrders] = useState(false);
  const [ordersError, setOrdersError] = useState(null);
  const [fetchTrigger, setFetchTrigger] = useState(0);

  useEffect(() => {
    if (activeTab !== 'orders') return;
    const controller = new AbortController();

    const fetchOrders = async () => {
      setIsLoadingOrders(true);
      setOrdersError(null);
      try {
        const token = localStorage.getItem('vescan_token');
        const res = await fetch(ORDER_HISTORY_URL, {
          method: 'GET',
          headers: token ? { 'Authorization': `Bearer ${token}` } : {},
          signal: controller.signal,
        });
        const text = await res.text();
        console.log('[Orders] status:', res.status, '| body:', text.slice(0, 800));
        if (!res.ok) throw new Error(`Server returned ${res.status}`);
        let data;
        try { data = JSON.parse(text); } catch { throw new Error('Invalid response from server'); }

        // Handle all common API response shapes
        let orders = [];
        if (Array.isArray(data)) {
          orders = data;
        } else if (Array.isArray(data?.data)) {
          orders = data.data;
        } else if (Array.isArray(data?.orders)) {
          orders = data.orders;
        } else if (data?.status === 'success' && data?.order) {
          orders = Array.isArray(data.order) ? data.order : [data.order];
        } else if (data && typeof data === 'object') {
          // PHP-style numeric-keyed object: { "0": {...}, "1": {...} }
          const vals = Object.values(data).filter(v => v && typeof v === 'object');
          if (vals.length > 0) orders = vals;
        }
        console.log('[Orders] parsed count:', orders.length, '| first item:', orders.length > 0 ? JSON.stringify(orders[0]).slice(0, 300) : 'none');
        const sorted = [...orders].sort((a, b) => {
          // Sort by date if available, otherwise by id descending (newest first)
          if (a.created_at && b.created_at) return new Date(b.created_at) - new Date(a.created_at);
          return Number(b.id || 0) - Number(a.id || 0);
        });
        setOrderHistory(sorted);
      } catch (err) {
        if (err.name === 'AbortError') return; // StrictMode cleanup — ignore
        console.error('[Orders] fetch error:', err);
        setOrdersError(err.message || 'Failed to load orders. Please try again.');
      } finally {
        if (!controller.signal.aborted) setIsLoadingOrders(false);
      }
    };

    fetchOrders();
    return () => controller.abort();
  }, [activeTab, fetchTrigger]);

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
      className="d-flex flex-column h-100"
      style={{ backgroundColor: 'var(--bg-primary)' }}
    >
      {/* Top Header */}
      <TopHeader title="Inventory & E-commerce" />

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

        <div className="flex-grow-1" style={{ backgroundColor: 'var(--bg-primary)' }}>
          {/* Tabs */}
          <div className="border-bottom px-4 pt-3">
          <ul className="nav nav-tabs border-0" style={{ gap: '2rem' }}>
            <li className="nav-item">
              <button 
                className={`nav-link border-0 bg-transparent px-0 pb-3 ${activeTab === 'inventory' ? 'active' : ''}`}
                style={{ 
                  color: activeTab === 'inventory' ? 'var(--text-primary)' : 'var(--text-secondary)',
                  borderBottom: activeTab === 'inventory' ? '2px solid var(--text-primary)' : '2px solid transparent',
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
                  color: activeTab === 'orders' ? 'var(--text-primary)' : 'var(--text-secondary)',
                  borderBottom: activeTab === 'orders' ? '2px solid var(--text-primary)' : '2px solid transparent',
                  fontWeight: activeTab === 'orders' ? '600' : '400'
                }}
                onClick={() => setActiveTab('orders')}
              >
                Orders {orderHistory.length > 0 && `(${orderHistory.length})`}
              </button>
            </li>
            <li className="nav-item">
              <button 
                className={`nav-link border-0 bg-transparent px-0 pb-3 ${activeTab === 'ewallet' ? 'active' : ''}`}
                style={{ 
                  color: activeTab === 'ewallet' ? '#F25C05' : 'var(--text-secondary)',
                  borderBottom: activeTab === 'ewallet' ? '2px solid #F25C05' : '2px solid transparent',
                  fontWeight: activeTab === 'ewallet' ? '600' : '400'
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
                  <Search className="position-absolute top-50 translate-middle-y" style={{ left: '16px', color: 'var(--text-muted)' }} size={18} />
                  <input 
                    type="text" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="form-control rounded-3" 
                    placeholder="Search parts by name, category, or sku..." 
                    style={{ paddingLeft: '44px', paddingRight: '16px', py: '12px', backgroundColor: 'var(--input-bg)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
                  />
                </div>

                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  whileHover={{ scale: 1.01 }}
                  className="alert d-flex align-items-center justify-content-between p-3 rounded-3 mb-4 shadow-sm" 
                  style={{ backgroundColor: 'rgba(239, 68, 68, 0.05)', border: '1px solid rgba(239, 68, 68, 0.2)', cursor: 'pointer' }}
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
                  style={{ backgroundColor: 'var(--sidebar-bg)', fontWeight: 500 }}
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
                      className="border rounded-3 p-4 transition-all"
                      style={{ cursor: 'pointer', backgroundColor: 'var(--card-bg)', borderColor: 'var(--border-color)' }}
                    >
                      <div className="d-flex justify-content-between align-items-start mb-4">
                        <div className="d-flex align-items-start gap-3">
                          <div className="rounded p-2" style={{ backgroundColor: item.iconBg, color: item.iconColor }}>
                            <item.icon size={24} />
                          </div>
                          <div>
                            <h6 className="mb-1 fw-bold" style={{ color: 'var(--text-primary)' }}>{item.name}</h6>
                            <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '0.25rem' }}>{item.category}</div>
                            <div style={{ color: 'var(--text-secondary)', fontSize: '0.75rem', letterSpacing: '0.5px' }} className="text-uppercase">{item.sku}</div>
                          </div>
                        </div>
                        <span 
                          className="badge rounded-pill fw-medium"
                          style={{ 
                            backgroundColor: item.status === 'In Stock' ? 'rgba(16, 185, 129, 0.15)' : item.status === 'Low Stock' ? 'rgba(245, 158, 11, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                            color: item.status === 'In Stock' ? '#10b981' : item.status === 'Low Stock' ? '#f59e0b' : '#ef4444',
                            padding: '0.4rem 0.8rem',
                            fontSize: '0.75rem'
                          }}
                        >
                          {item.status}
                        </span>
                      </div>

                      <div className="row g-3 px-3 py-3 mb-4 rounded" style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
                         <div className="col-4 text-center border-end" style={{ borderColor: 'var(--border-color)' }}>
                           <div className={`fs-5 fw-bold ${item.inStock === 0 ? 'text-danger' : item.inStock <= item.minStock ? 'text-danger' : 'text-primary'}`} style={{ color: (item.inStock === 0 || item.inStock <= item.minStock) ? '#dc2626' : 'var(--text-primary)' }}>{item.inStock}</div>
                           <div style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>In Stock</div>
                         </div>
                         <div className="col-4 text-center border-end" style={{ borderColor: 'var(--border-color)' }}>
                           <div className="fs-5 fw-bold" style={{ color: 'var(--text-primary)' }}>{item.unitPrice}</div>
                           <div style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>Unit Price</div>
                         </div>
                         <div className="col-4 text-center">
                           <div className="fs-5 fw-bold" style={{ color: 'var(--text-primary)' }}>{item.used}</div>
                           <div style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>Used</div>
                         </div>
                      </div>

                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Min Stock: {item.minStock}</span>
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Last Used: {item.lastUsed}</span>
                      </div>

                      {(item.status === 'Low Stock' || item.status === 'Out of Stock') && (
                        <motion.button 
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="btn w-100 text-white rounded-3 py-2 d-flex align-items-center justify-content-center gap-2 mt-2 shadow-sm" 
                          style={{ backgroundColor: 'var(--sidebar-bg)', fontWeight: 500 }}
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
                {/* Loading */}
                {isLoadingOrders && (
                  <div className="d-flex flex-column align-items-center justify-content-center py-5 gap-3">
                    <div className="spinner-border" style={{ color: 'var(--sidebar-bg)', width: '2rem', height: '2rem' }} role="status" />
                    <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Loading your orders...</span>
                  </div>
                )}

                {/* Error */}
                {!isLoadingOrders && ordersError && (
                  <div className="d-flex flex-column align-items-center justify-content-center py-5 gap-3 text-center">
                    <AlertCircle size={40} style={{ color: '#ef4444' }} />
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{ordersError}</p>
                    <button
                      className="btn btn-sm px-4"
                      style={{ backgroundColor: 'var(--sidebar-bg)', color: 'white', borderRadius: '8px' }}
                      onClick={() => setFetchTrigger(n => n + 1)}
                    >
                      Retry
                    </button>
                  </div>
                )}

                {/* Empty */}
                {!isLoadingOrders && !ordersError && orderHistory.length === 0 && (
                  <div className="d-flex flex-column align-items-center justify-content-center py-5 gap-3 text-center">
                    <ShoppingCart size={48} style={{ color: 'var(--text-secondary)', opacity: 0.4 }} />
                    <p className="fw-medium mb-0" style={{ color: 'var(--text-primary)' }}>No orders yet</p>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Your order history will appear here after your first purchase.</p>
                  </div>
                )}

                {/* Order cards */}
                {!isLoadingOrders && !ordersError && orderHistory.map((order, idx) => {
                  // API returns delivery_status (uppercase e.g. "PENDING") or delivery
                  const rawStatus = (order.delivery_status || order.delivery || 'pending').toLowerCase();
                  const statusColors = {
                    delivered: { bg: 'rgba(16,185,129,0.12)', text: '#10b981' },
                    pending:   { bg: 'rgba(245,158,11,0.12)',  text: '#f59e0b' },
                    shipped:   { bg: 'rgba(59,130,246,0.12)',  text: '#3b82f6' },
                  };
                  const { bg: statusBg, text: statusText } = statusColors[rawStatus] || { bg: 'rgba(100,116,139,0.12)', text: '#64748b' };

                  // API may return a flat item or an order with nested products
                  const isFlat = !Array.isArray(order.product);
                  const products = isFlat ? [order] : order.product;

                  // Image: API uses "LINK" (uppercase) or "image_url"
                  const getImage  = (item) => item.LINK || item.image_url || item.link || null;
                  const getName   = (item) => item.product_name || item.name || 'Product';
                  const getQty    = (item) => item.product_quantity || item.quantity || '—';
                  const getPrice  = (item) => item.product_price || item.price || null;

                  const orderId   = order.id || order.order_id || (idx + 1);
                  const orderDate = order.created_at || order.date || null;
                  const totalAmt  = order.total_amount || order.amount || null;
                  const deliveryAddress = order.destination_address || order.product?.[0]?.destination_address;
                  const deliveryState   = order.state || order.product?.[0]?.state;

                  return (
                    <motion.div
                      key={orderId}
                      variants={itemVariants}
                      initial="hidden"
                      animate="show"
                      whileHover={{ y: -2, boxShadow: '0 8px 20px -5px rgba(0,0,0,0.08)' }}
                      className="border rounded-3 p-4"
                      style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border-color)' }}
                    >
                      {/* Header row */}
                      <div className="d-flex justify-content-between align-items-start mb-3">
                        <div>
                          <div className="d-flex align-items-center gap-2 mb-1">
                            <h6 className="mb-0 fw-bold" style={{ color: 'var(--text-primary)', fontSize: '0.95rem' }}>
                              ORD-{orderId}
                            </h6>
                            <span
                              className="badge rounded-pill fw-medium px-2 py-1"
                              style={{ backgroundColor: statusBg, color: statusText, fontSize: '0.7rem' }}
                            >
                              {rawStatus.charAt(0).toUpperCase() + rawStatus.slice(1)}
                            </span>
                          </div>
                          {orderDate && (
                            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                              {orderDate}
                            </div>
                          )}
                        </div>
                        {totalAmt && (
                          <div className="fw-bold" style={{ color: 'var(--text-primary)', fontSize: '1.05rem' }}>
                            ₦{Number(totalAmt).toLocaleString()}
                          </div>
                        )}
                      </div>

                      {/* Products */}
                      <div className="rounded-3 p-3 mb-3" style={{ backgroundColor: 'var(--bg-tertiary)' }}>
                        <div className="mb-2 fw-medium" style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                          Order Items ({products.length})
                        </div>
                        <div className="d-flex flex-column gap-2">
                          {products.map((item, i) => (
                            <div key={i} className="d-flex align-items-center gap-3">
                              {getImage(item) ? (
                                <img
                                  src={getImage(item)}
                                  alt={getName(item)}
                                  className="rounded-2 flex-shrink-0"
                                  style={{ width: '40px', height: '40px', objectFit: 'cover' }}
                                />
                              ) : (
                                <div className="rounded-2 flex-shrink-0 d-flex align-items-center justify-content-center"
                                  style={{ width: '40px', height: '40px', backgroundColor: 'var(--border-color)' }}>
                                  <Box size={16} style={{ color: 'var(--text-secondary)' }} />
                                </div>
                              )}
                              <div className="flex-grow-1">
                                <div style={{ fontSize: '0.85rem', color: 'var(--text-primary)', fontWeight: 500 }}>{getName(item)}</div>
                                <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>Qty: {getQty(item)}</div>
                              </div>
                              {getPrice(item) && (
                                <div className="fw-medium" style={{ fontSize: '0.85rem', color: 'var(--text-primary)' }}>
                                  ₦{Number(getPrice(item)).toLocaleString()}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Delivery info */}
                      {(deliveryAddress || deliveryState) && (
                        <div className="d-flex align-items-start gap-2" style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                          <span className="fw-medium" style={{ color: 'var(--text-primary)', flexShrink: 0 }}>Delivery:</span>
                          <span>{[deliveryAddress, deliveryState].filter(Boolean).join(', ')}</span>
                        </div>
                      )}
                    </motion.div>
                  );
                })}
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
                  style={{ backgroundColor: 'var(--sidebar-bg)' }}
                >
                  <div className="position-relative z-1">
                    <div className="opacity-75 mb-1" style={{ fontSize: '0.9rem' }}>E-Wallet Balance</div>
                    <div className="fw-bold mb-4" style={{ fontSize: '2.5rem' }}>₦45,230</div>
                    
                    <div className="d-flex gap-3">
                      <motion.button 
                        whileHover={{ scale: 1.02, backgroundColor: 'rgba(255, 255, 255, 0.9)' }}
                        whileTap={{ scale: 0.98 }}
                        className="btn w-50 py-3 fw-bold rounded-3 shadow-sm border-0"
                        style={{ backgroundColor: 'white', color: '#00bfff', transition: 'background-color 0.2s' }}
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
                  <h6 className="fw-bold mb-1" style={{ color: 'var(--text-primary)', fontSize: '1.1rem' }}>Wallet Transactions</h6>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>All transactions related to parts purchases</div>
                </div>

                {/* Transactions List */}
                <motion.div 
                  variants={containerVariants}
                  initial="hidden"
                  animate="show"
                  className="border rounded-3 p-1"
                  style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border-color)' }}
                >
                  {transactionData.map((trx, index) => (
                    <motion.div 
                      key={trx.id}
                      variants={itemVariants}
                      whileHover={{ backgroundColor: 'var(--hover-bg)' }}
                      className={`d-flex align-items-center justify-content-between p-3 ${index !== transactionData.length - 1 ? 'border-bottom' : ''}`}
                      style={{ transition: 'background-color 0.2s', cursor: 'pointer', borderBottomColor: 'var(--border-color)' }}
                    >
                      <div className="d-flex align-items-center gap-3">
                        <div className="rounded p-2 d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px', backgroundColor: trx.iconBg, color: trx.iconColor }}>
                          <trx.icon size={20} />
                        </div>
                        <div>
                          <div className="fw-medium mb-1" style={{ fontSize: '0.9rem', color: 'var(--text-primary)' }}>{trx.title}</div>
                          <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{trx.time}</div>
                        </div>
                      </div>
                      <div className="fw-bold" style={{ color: trx.type === 'credit' ? '#10b981' : 'var(--text-primary)', fontSize: '0.95rem' }}>
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
