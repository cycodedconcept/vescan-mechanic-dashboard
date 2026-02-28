import React, { useState, useMemo } from 'react';
import { useOutletContext } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import TopHeader from '../components/TopHeader';
import { Search, ShoppingCart, Star, ChevronDown, Plus, Check, Menu, ArrowLeft, Trash2, Wallet, CreditCard, Building2 } from 'lucide-react';

import { rawProducts, categoryLabels } from '../data/mockData';


const Ecommerce = () => {
  const { isSidebarOpen, toggleSidebar } = useOutletContext();
  const [activeCondition, setActiveCondition] = useState("New");
  const [activeCategory, setActiveCategory] = useState("All Products");
  const [searchQuery, setSearchQuery] = useState("");
  const [cartItems, setCartItems] = useState([
    { id: 1, name: "Premium Brake Pads Set", price: 15000, quantity: 1, image: rawProducts[0].image, category: 'Brake System', seller: 'Premium Auto Supply' },
    { id: 3, name: "Synthetic Engine Oil 5W-30", price: 4500, quantity: 1, image: rawProducts[2].image, category: 'Fluids & Oils', seller: 'Oil Masters Ltd' },
    { id: 6, name: "Brake Fluid DOT 4", price: 2800, quantity: 1, image: rawProducts[5].image, category: 'Fluids & Oils', seller: 'Premium Auto Supply' }
  ]);
  const [viewState, setViewState] = useState('products'); // 'products', 'cart', 'checkout'
  const [selectedPayment, setSelectedPayment] = useState('wallet');
  const [showNotification, setShowNotification] = useState(false);
  const [isConditionOpen, setIsConditionOpen] = useState(false);

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const deliveryFee = cartItems.length > 0 ? 2500 : 0;
  const cartTotal = cartSubtotal + deliveryFee;

  // Filter based on selected condition (New/Tokunbo/Show All)
  const conditionFilteredProducts = useMemo(() => {
    if (activeCondition === "Show All") return rawProducts;
    return rawProducts.filter(p => p.condition === activeCondition);
  }, [activeCondition]);

  // Dynamic counts for category pills based on the selected condition
  const categoriesWithCounts = useMemo(() => {
    return categoryLabels.map(cat => ({
      name: cat,
      count: cat === "All Products" ? conditionFilteredProducts.length : conditionFilteredProducts.filter(p => p.category === cat).length
    }));
  }, [conditionFilteredProducts]);

  const addToCart = (product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1, seller: "Premium Auto Supply" }];
    });
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 2000);
  };

  const updateQuantity = (id, delta) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        const newQ = item.quantity + delta;
        return { ...item, quantity: newQ > 0 ? newQ : 1 };
      }
      return item;
    }));
  };

  const removeItem = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const finalFilteredProducts = useMemo(() => {
    return conditionFilteredProducts.filter(product => {
      const matchesCategory = activeCategory === "All Products" || product.category === activeCategory;
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [conditionFilteredProducts, activeCategory, searchQuery]);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  return (
    <div className="h-100 overflow-auto position-relative" style={{ fontFamily: 'Inter, sans-serif', backgroundColor: 'var(--bg-primary)' }}>
      <AnimatePresence>
        {showNotification && (
          <motion.div 
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 20 }}
            exit={{ opacity: 0, y: -50 }}
            className="position-fixed top-0 start-50 translate-middle-x bg-success text-white px-4 py-2 rounded-pill shadow-lg d-flex align-items-center gap-2"
            style={{ zIndex: 9999 }}
          >
            <Check size={18} /> Added to cart!
          </motion.div>
        )}
      </AnimatePresence>

      <TopHeader title="E-Commerce Marketplace" />

      {viewState === 'cart' ? (
        <div className="flex-grow-1 overflow-auto d-flex flex-column">
          {/* Blue Banner Section for Cart */}
          <div className="p-4 flex-shrink-0" style={{ backgroundColor: '#0099C2' }}>
            <button onClick={() => setViewState('products')} className="btn text-white p-0 mb-4 d-flex align-items-center gap-2 border-0 bg-transparent shadow-none" style={{ transition: 'opacity 0.2s' }}>
              <ArrowLeft size={20} /> <h4 className="fw-bold mb-0">Shopping Cart</h4>
            </button>
            <div className="p-3 rounded-3" style={{ backgroundColor: 'rgba(255,255,255,0.15)', color: 'white' }}>
              <small className="opacity-75">Cart Total</small>
              <h3 className="fw-bold mb-1">₦{cartTotal.toLocaleString()}</h3>
              <small className="opacity-75">{cartCount} items</small>
            </div>
          </div>

          <div className="p-4 flex-grow-1" style={{ backgroundColor: 'var(--bg-primary)' }}>
            {cartItems.length === 0 ? (
              <div className="text-center py-5">
                <ShoppingCart size={48} className="text-secondary opacity-50 mb-3" />
                <h5 style={{ color: 'var(--text-primary)' }}>Your cart is empty</h5>
                <button onClick={() => setViewState('products')} className="btn mt-3 text-white px-4 py-2" style={{ backgroundColor: '#001F3F' }}>Continue Shopping</button>
              </div>
            ) : (
              <div className="pb-4">
                {/* Cart Items */}
                <div className="d-flex flex-column gap-3 mb-4">
                  <AnimatePresence>
                    {cartItems.map((item) => (
                      <motion.div 
                        key={item.id} 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95, height: 0, marginBottom: 0 }}
                        className="card border p-3" 
                        style={{ borderRadius: '12px', borderColor: 'var(--border-color)', backgroundColor: 'var(--card-bg)' }}
                      >
                        <div className="d-flex position-relative">
                          <div className="rounded-2 overflow-hidden me-3" style={{ width: '80px', height: '80px', flexShrink: 0, backgroundColor: 'var(--bg-tertiary)' }}>
                            <img src={item.image} alt={item.name} className="w-100 h-100 object-fit-cover" />
                          </div>
                          <div className="flex-grow-1">
                            <div className="d-flex justify-content-between align-items-start mb-1">
                              <h6 className="fw-semibold mb-0" style={{ color: 'var(--text-primary)', fontSize: '0.95rem' }}>{item.name}</h6>
                              <button onClick={() => removeItem(item.id)} className="btn btn-link p-0 text-danger border-0" style={{ backgroundColor: 'transparent' }}><Trash2 size={18} /></button>
                            </div>
                            <small className="text-secondary d-block mb-2">{item.seller}</small>
                            <h6 className="fw-bold mb-0" style={{ color: 'var(--text-primary)' }}>₦{item.price.toLocaleString()}</h6>
                          </div>
                        </div>
                        
                        <div className="d-flex justify-content-between align-items-center mt-3 pt-3 border-top" style={{ borderColor: 'var(--border-color)' }}>
                          <div className="d-flex align-items-center rounded-pill px-2 py-1" style={{ backgroundColor: 'var(--bg-tertiary)' }}>
                            <button onClick={() => updateQuantity(item.id, -1)} className="btn btn-link p-0 text-secondary border-0 text-decoration-none d-flex align-items-center justify-content-center" style={{ width: '28px', height: '28px', backgroundColor: 'var(--card-bg)', borderRadius: '50%' }}>-</button>
                            <span className="mx-3 fw-bold" style={{ color: 'var(--text-primary)' }}>{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.id, 1)} className="btn btn-link p-0 text-secondary border-0 text-decoration-none d-flex align-items-center justify-content-center" style={{ width: '28px', height: '28px', backgroundColor: 'var(--card-bg)', borderRadius: '50%' }}>+</button>
                          </div>
                          <h6 className="fw-bold mb-0" style={{ color: 'var(--text-primary)' }}>₦{(item.price * item.quantity).toLocaleString()}</h6>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

                {/* Order Summary */}
                <div className="card shadow-sm p-4 mb-4" style={{ backgroundColor: 'var(--card-bg)', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
                  <h6 className="fw-bold mb-4" style={{ color: 'var(--text-primary)' }}>Order Summary</h6>
                  
                  <div className="d-flex justify-content-between mb-2">
                    <span className="text-secondary" style={{ fontSize: '0.9rem' }}>Subtotal</span>
                    <span className="fw-medium" style={{ color: 'var(--text-primary)' }}>₦{cartSubtotal.toLocaleString()}</span>
                  </div>
                  
                  <div className="d-flex justify-content-between mb-3 pb-3 border-bottom" style={{ borderColor: 'var(--border-color)' }}>
                    <span className="text-secondary" style={{ fontSize: '0.9rem' }}>Delivery Fee</span>
                    <span className="fw-medium" style={{ color: 'var(--text-primary)' }}>₦{deliveryFee.toLocaleString()}</span>
                  </div>
                  
                  <div className="d-flex justify-content-between mb-0">
                    <span className="fw-bold" style={{ color: 'var(--text-primary)' }}>Total</span>
                    <span className="fw-bold" style={{ color: 'var(--text-primary)' }}>₦{cartTotal.toLocaleString()}</span>
                  </div>
                </div>

                {/* Checkout Button */}
                <button onClick={() => setViewState('checkout')} className="btn w-100 py-3 fw-bold text-white border-0 shadow-sm" style={{ backgroundColor: '#001F3F', borderRadius: '10px' }}>
                  Proceed to Checkout
                </button>
              </div>
            )}
          </div>
        </div>
      ) : viewState === 'checkout' ? (
        <div className="flex-grow-1 overflow-auto d-flex flex-column">
          {/* Blue Banner Section for Checkout */}
          <div className="p-4 flex-shrink-0" style={{ backgroundColor: '#0099C2' }}>
            <button onClick={() => setViewState('cart')} className="btn text-white p-0 d-flex align-items-center gap-2 border-0 bg-transparent shadow-none" style={{ transition: 'opacity 0.2s' }}>
              <ArrowLeft size={20} /> <h4 className="fw-bold mb-0">Checkout</h4>
            </button>
          </div>

          <div className="p-4 flex-grow-1" style={{ backgroundColor: 'var(--bg-primary)' }}>
            <div className="pb-4">
              
              {/* Order Items */}
              <div className="card shadow-sm mb-4" style={{ backgroundColor: 'var(--card-bg)', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                <div className="card-header bg-transparent border-bottom-0 pt-4 pb-2 px-4">
                  <h6 className="fw-bold mb-0" style={{ color: 'var(--text-primary)' }}>Order Items ({cartCount})</h6>
                </div>
                <div className="card-body px-4 pb-4 pt-2">
                  <div className="d-flex flex-column gap-3">
                    {cartItems.map(item => (
                      <div key={item.id} className="d-flex justify-content-between align-items-center">
                        <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{item.quantity}x {item.name}</span>
                        <span className="fw-medium" style={{ color: 'var(--text-primary)', fontSize: '0.9rem' }}>₦{(item.price * item.quantity).toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Delivery Address */}
              <div className="card shadow-sm mb-4" style={{ backgroundColor: 'var(--card-bg)', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                <div className="card-header bg-transparent border-bottom-0 pt-4 pb-2 px-4">
                  <h6 className="fw-bold mb-0" style={{ color: 'var(--text-primary)' }}>Delivery Address</h6>
                </div>
                <div className="card-body px-4 pb-4 pt-2">
                  <div className="p-3 rounded" style={{ backgroundColor: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}>
                    <p className="mb-1 fw-medium" style={{ color: 'var(--text-primary)', fontSize: '0.9rem' }}>Auto Repair Shop</p>
                    <p className="mb-0 text-secondary" style={{ fontSize: '0.85rem' }}>123 Lagos-Ibadan Expressway<br/>Lagos, Nigeria<br/>+234 800 123 4567</p>
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="card shadow-sm mb-4" style={{ backgroundColor: 'var(--card-bg)', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                <div className="card-header bg-transparent border-bottom-0 pt-4 pb-2 px-4">
                  <h6 className="fw-bold mb-0" style={{ color: 'var(--text-primary)' }}>Payment Method</h6>
                </div>
                <div className="card-body px-4 pb-4 pt-2 d-flex flex-column gap-3">
                  
                  {/* E-Wallet */}
                  <div 
                    onClick={() => setSelectedPayment('wallet')}
                    className={`p-3 rounded d-flex align-items-center cursor-pointer transition-all ${selectedPayment === 'wallet' ? 'border-primary' : ''}`}
                    style={{ 
                      backgroundColor: selectedPayment === 'wallet' ? 'var(--bg-tertiary)' : 'transparent', 
                      border: `1px solid ${selectedPayment === 'wallet' ? '#0099C2' : 'var(--border-color)'}`
                    }}
                  >
                    <div className="d-flex align-items-center justify-content-center rounded-circle me-3" style={{ width: '40px', height: '40px', backgroundColor: 'rgba(168, 85, 247, 0.1)', color: '#a855f7' }}>
                      <Wallet size={20} />
                    </div>
                    <div className="flex-grow-1">
                      <h6 className="mb-0 fw-medium" style={{ color: 'var(--text-primary)', fontSize: '0.95rem' }}>E-Wallet</h6>
                      <small className="text-secondary" style={{ fontSize: '0.8rem' }}>Balance: ₦45,230</small>
                    </div>
                    {selectedPayment === 'wallet' && <Check size={20} style={{ color: '#0099C2' }} />}
                  </div>

                  {/* Debit/Credit Card */}
                  <div 
                    onClick={() => setSelectedPayment('card')}
                    className={`p-3 rounded d-flex align-items-center cursor-pointer transition-all ${selectedPayment === 'card' ? 'border-primary' : ''}`}
                    style={{ 
                      backgroundColor: selectedPayment === 'card' ? 'var(--bg-tertiary)' : 'transparent', 
                      border: `1px solid ${selectedPayment === 'card' ? '#0099C2' : 'var(--border-color)'}`
                    }}
                  >
                    <div className="d-flex align-items-center justify-content-center rounded-circle me-3" style={{ width: '40px', height: '40px', backgroundColor: 'rgba(100, 116, 139, 0.1)', color: '#64748b' }}>
                      <CreditCard size={20} />
                    </div>
                    <div className="flex-grow-1">
                      <h6 className="mb-0 fw-medium" style={{ color: 'var(--text-primary)', fontSize: '0.95rem' }}>Debit/Credit Card</h6>
                      <small className="text-secondary" style={{ fontSize: '0.8rem' }}>Pay with card</small>
                    </div>
                    {selectedPayment === 'card' && <Check size={20} style={{ color: '#0099C2' }} />}
                  </div>

                  {/* Bank Transfer */}
                  <div 
                    onClick={() => setSelectedPayment('bank')}
                    className={`p-3 rounded d-flex align-items-center cursor-pointer transition-all ${selectedPayment === 'bank' ? 'border-primary' : ''}`}
                    style={{ 
                      backgroundColor: selectedPayment === 'bank' ? 'var(--bg-tertiary)' : 'transparent', 
                      border: `1px solid ${selectedPayment === 'bank' ? '#0099C2' : 'var(--border-color)'}`
                    }}
                  >
                    <div className="d-flex align-items-center justify-content-center rounded-circle me-3" style={{ width: '40px', height: '40px', backgroundColor: 'rgba(100, 116, 139, 0.1)', color: '#64748b' }}>
                      <Building2 size={20} />
                    </div>
                    <div className="flex-grow-1">
                      <h6 className="mb-0 fw-medium" style={{ color: 'var(--text-primary)', fontSize: '0.95rem' }}>Bank Transfer</h6>
                      <small className="text-secondary" style={{ fontSize: '0.8rem' }}>Pay via bank transfer</small>
                    </div>
                    {selectedPayment === 'bank' && <Check size={20} style={{ color: '#0099C2' }} />}
                  </div>

                </div>
              </div>

              {/* Payment Summary */}
              <div className="card shadow-sm p-4 mb-4" style={{ backgroundColor: 'var(--card-bg)', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                <h6 className="fw-bold mb-4" style={{ color: 'var(--text-primary)' }}>Payment Summary</h6>
                
                <div className="d-flex justify-content-between mb-2">
                  <span className="text-secondary" style={{ fontSize: '0.9rem' }}>Subtotal</span>
                  <span className="fw-medium" style={{ color: 'var(--text-primary)' }}>₦{cartSubtotal.toLocaleString()}</span>
                </div>
                
                <div className="d-flex justify-content-between mb-3 pb-3 border-bottom" style={{ borderColor: 'var(--border-color)' }}>
                  <span className="text-secondary" style={{ fontSize: '0.9rem' }}>Delivery Fee</span>
                  <span className="fw-medium" style={{ color: 'var(--text-primary)' }}>₦{deliveryFee.toLocaleString()}</span>
                </div>
                
                <div className="d-flex justify-content-between mb-0">
                  <span className="fw-bold" style={{ color: 'var(--text-primary)' }}>Total Amount</span>
                  <span className="fw-bold fs-5" style={{ color: 'var(--text-primary)' }}>₦{cartTotal.toLocaleString()}</span>
                </div>
              </div>

              {/* Complete Payment Button */}
              <button 
                className="btn w-100 py-3 fw-bold text-white border-0 shadow-sm mt-3" 
                style={{ backgroundColor: '#001F3F', borderRadius: '10px' }}
                onClick={() => {
                  setShowNotification(true);
                  setTimeout(() => setShowNotification(false), 2000);
                  // Optional: Empty cart after successful checkout, return to products
                  // setCartItems([]);
                  // setViewState('products');
                }}
              >
                Complete Payment
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-grow-1 d-flex flex-column overflow-auto">
          {/* Blue Banner Section */}
          <div className="p-4" style={{ backgroundColor: '#0099C2' }}>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h4 className="fw-bold text-white mb-0">E-Commerce Marketplace</h4>
              <button onClick={() => setViewState('cart')} className="btn position-relative p-2 rounded-3 bg-white bg-opacity-25 shadow-sm border-0">
                <ShoppingCart size={24} className="text-white" />
                {cartCount > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-circle bg-danger" style={{ fontSize: '0.65rem', border: '2px solid #0099C2', marginTop: '-2px' }}>
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
            
            <div className="position-relative">
              <Search className="position-absolute top-50 translate-middle-y ms-3 text-secondary" size={18} />
              <input 
                type="text" 
                placeholder="Search for auto parts..." 
                className="form-control border-0 py-3 ps-5 rounded-3 shadow-inner"
                style={{ backgroundColor: 'var(--input-bg)', color: 'var(--text-primary)', borderColor: 'var(--border-color)' }}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

      <div className="p-4">
        {/* Condition Dropdown (New/Tokunbo) & Category Pills */}
        <div className="d-flex flex-wrap align-items-center gap-3 mb-4">
          <div className="dropdown">
            <button 
              onClick={() => setIsConditionOpen(!isConditionOpen)}
              className="btn border border-secondary border-opacity-25 d-flex align-items-center gap-2 px-3 py-2 fw-semibold"
              style={{ fontSize: '0.9rem', color: 'var(--text-primary)', backgroundColor: 'var(--card-bg)', borderColor: 'var(--border-color)' }}
            >
              {activeCondition} <ChevronDown size={14} className={isConditionOpen ? "rotate-180" : ""} />
            </button>
            <motion.div 
              initial={false}
              animate={{ height: isConditionOpen ? 'auto' : 0, opacity: isConditionOpen ? 1 : 0 }}
              className="mt-2 overflow-hidden position-absolute shadow-lg rounded-3 border"
              style={{ minWidth: '150px', zIndex: 1000, backgroundColor: 'var(--card-bg)', borderColor: 'var(--border-color)' }}
            >
              <div className="p-2 d-flex flex-column gap-1">
                {["Show All", "New", "Tokunbo"].map((cond, i) => (
                  <button 
                    key={i}
                    onClick={() => { setActiveCondition(cond); setIsConditionOpen(false); }}
                    className={`btn btn-link text-start text-decoration-none px-3 py-2 rounded-2 ${activeCondition === cond ? 'bg-primary text-white' : 'hover-bg-light'}`}
                    style={{ color: activeCondition === cond ? '#ffffff' : 'var(--text-primary)', fontSize: '0.85rem' }}
                  >
                    {cond}
                  </button>
                ))}
              </div>
            </motion.div>
          </div>
          
          <div className="d-flex gap-2 flex-wrap">
            {categoriesWithCounts.map((cat, idx) => (
              <button 
                key={idx}
                onClick={() => setActiveCategory(cat.name)}
                className={`btn rounded-pill px-3 py-2 border-0 d-flex align-items-center gap-2 transition-all ${
                  activeCategory === cat.name ? 'text-white' : 'text-secondary'
                }`}
                style={{ 
                  fontSize: '0.85rem', 
                  backgroundColor: activeCategory === cat.name ? 'var(--sidebar-bg)' : 'var(--bg-secondary)',
                  fontWeight: '500',
                  border: activeCategory === cat.name ? 'none' : '1px solid var(--border-color)'
                }}
              >
                {cat.name} <span className="opacity-75">({cat.count})</span>
              </button>
            ))}
          </div>
        </div>

        <p className="text-secondary mb-4" style={{ fontSize: '0.9rem' }}>{finalFilteredProducts.length} products found</p>

        {/* Product Grid */}
        <AnimatePresence mode="wait">
          <motion.div 
            key={activeCondition + activeCategory + searchQuery}
            variants={container}
            initial="hidden"
            animate="show"
            className="row g-4"
          >
            {finalFilteredProducts.length > 0 ? (
              finalFilteredProducts.map((product) => (
                <motion.div key={product.id} variants={item} className="col-12 col-md-6">
                  <div className="card border-0 shadow-sm h-100 rounded-4 overflow-hidden product-card position-relative" style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-color)' }}>
                    {/* Condition Badge on top left of image */}
                    <div 
                      className="position-absolute top-0 start-0 m-3 px-2 py-1 rounded-pill text-white fw-bold shadow-sm"
                      style={{ 
                        zIndex: 10, 
                        fontSize: '0.7rem', 
                        backgroundColor: product.condition === 'New' ? '#0099C2' : '#64748b',
                        textTransform: 'uppercase'
                      }}
                    >
                      {product.condition}
                    </div>

                    <div className="bg-light d-flex align-items-center justify-content-center p-0 overflow-hidden" style={{ height: '350px' }}>
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-100 h-100 object-fit-cover" 
                      />
                    </div>
                    <div className="card-body p-4 d-flex flex-column" style={{ minHeight: '180px' }}>
                      <h6 className="fw-semibold mb-1" style={{ fontSize: '1.05rem', color: 'var(--text-primary)' }}>{product.name}</h6>
                      <div className="d-flex align-items-center gap-1 mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            size={14} 
                            className={i < product.rating ? "text-warning fill-warning" : "text-secondary opacity-25"} 
                            fill={i < product.rating ? "currentColor" : "none"}
                          />
                        ))}
                        <small className="text-secondary ms-1">({product.reviews})</small>
                      </div>
                      <h5 className="fw-bold mb-4 mt-auto" style={{ color: 'var(--text-primary)' }}>₦{product.price.toLocaleString()}</h5>
                      <motion.button 
                        whileTap={{ scale: 0.98 }}
                        onClick={() => addToCart(product)}
                        className="btn w-100 py-3 d-flex align-items-center justify-content-center gap-2 text-white border-0"
                        style={{ backgroundColor: '#001F3F', fontSize: '0.9rem', borderRadius: '10px' }}
                      >
                        <Plus size={18} /> Add to Cart
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="col-12 text-center py-5">
                <p className="text-secondary">No products found for this selection.</p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
      </div>
      )}

      <style>{`
        .product-card {
          transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          border: 1px solid #f1f5f9 !important;
        }
        .product-card:hover { transform: translateY(-8px); box-shadow: 0 15px 30px -10px rgba(0,31,63,0.15) !important; }
        .object-fit-cover { object-fit: cover; }
        .shadow-inner { box-shadow: inset 0 2px 4px 0 rgba(0, 0, 0, 0.05); }
        .transition-all { transition: all 0.25s ease; }
        .hover-bg-light:hover { background-color: #f8f9fa; }
        .rotate-180 { transform: rotate(180deg); transition: transform 0.2s; }
      `}</style>
    </div>
  );
};

export default Ecommerce;
