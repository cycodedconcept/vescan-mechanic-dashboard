import React, { useState, useMemo, useEffect } from 'react';
import { useOutletContext, useSearchParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import TopHeader from '../components/TopHeader';
import { Search, ShoppingCart, Star, ChevronDown, Plus, Check, Menu, ArrowLeft, Trash2, Wallet, CreditCard, Building2, X } from 'lucide-react';
import VescanLoader from '../components/VescanLoader';

const BASE_URL = 'https://zubitechnologies.com/obd_final_apis/api';

const Ecommerce = () => {
  const { isSidebarOpen, toggleSidebar } = useOutletContext();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const viewState = searchParams.get('view') || 'products';
  const setViewState = (view) => setSearchParams(view === 'products' ? {} : { view });

  const [activeCondition, setActiveCondition] = useState("Show All");
  const [activeCategory, setActiveCategory] = useState("All Products");
  const [activeCategoryId, setActiveCategoryId] = useState(null);
  const [activeSubCategoryId, setActiveSubCategoryId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('vescan_cart');
      return saved ? JSON.parse(saved) : [];
    } catch { return []; }
  });
  const [selectedPayment, setSelectedPayment] = useState('paystack');
  const [showNotification, setShowNotification] = useState(false);
  const [isConditionOpen, setIsConditionOpen] = useState(false);

  const [isPaymentLoading, setIsPaymentLoading] = useState(false);
  const [isVerifyingPayment, setIsVerifyingPayment] = useState(false);
  const [paymentReference, setPaymentReference] = useState('');
  const [paymentTotal, setPaymentTotal] = useState(0);
  const [paidCartItems, setPaidCartItems] = useState([]);
  const [productReviews, setProductReviews] = useState({}); // { [id]: { rating, text } }
  const [submittedReviewIds, setSubmittedReviewIds] = useState(new Set());
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);

  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [deliveryState, setDeliveryState] = useState('');
  const [deliveryPhone, setDeliveryPhone] = useState(() => {
    try { const u = JSON.parse(localStorage.getItem('vescan_user') || '{}'); return u.phone_number || u.phone || ''; } catch { return ''; }
  });

  const [apiCategories, setApiCategories] = useState([]);
  const [apiProducts, setApiProducts] = useState([]);
  const [categoryCounts, setCategoryCounts] = useState({}); // { all: N, p_26: N, s_23: N, ... }
  const [openDropdownId, setOpenDropdownId] = useState(null);

  const [isLoadingProducts, setIsLoadingProducts] = useState(true);
  const [productError, setProductError] = useState(null);

  const [selectedProductDetails, setSelectedProductDetails] = useState(null);
  const [isModalLoading, setIsModalLoading] = useState(false);

  useEffect(() => {
    localStorage.setItem('vescan_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Detect Paystack redirect back after payment, verify with backend, then show success
  useEffect(() => {
    const paymentStatus = searchParams.get('payment');
    const reference = searchParams.get('reference') || searchParams.get('trxref');
    if (!paymentStatus || !reference) return;

    const verifyAndShowSuccess = async () => {
      // Read localStorage immediately (sync) before any async work so StrictMode's
      // double-invoke doesn't read empty values after the first run clears them.
      const savedCart = JSON.parse(localStorage.getItem('vescan_cart') || '[]');
      const savedTotal = Number(localStorage.getItem('vescan_payment_total') || 0);
      const cartId = localStorage.getItem('vescan_cart_id') || '';

      setIsVerifyingPayment(true);
      setSearchParams({ view: 'verifying' }, { replace: true });

      try {
        const token = localStorage.getItem('vescan_token');
        const formData = new FormData();
        formData.append('cart_id', cartId);
        formData.append('reference', reference);
        const vpRes = await fetch(`${BASE_URL}/verify_payments`, {
          method: 'POST',
          headers: token ? { 'Authorization': `Bearer ${token}` } : {},
          body: formData,
        });
        const vpText = await vpRes.text();
        console.log('[verify_payments] status:', vpRes.status, '| body:', vpText.slice(0, 300));
      } catch (err) {
        console.error('[verify_payments] error:', err);
      } finally {
        // Always proceed to success page — payment happened on Paystack regardless
        setPaymentReference(reference);
        setPaymentTotal(savedTotal);
        setPaidCartItems(savedCart);
        const initReviews = {};
        savedCart.forEach(item => { initReviews[item.id] = { rating: 0, text: '' }; });
        setProductReviews(initReviews);
        setIsVerifyingPayment(false);
        setCartItems([]);
        localStorage.removeItem('vescan_cart');
        localStorage.removeItem('vescan_cart_id');
        localStorage.removeItem('vescan_payment_total');
        setSearchParams({ view: 'success' }, { replace: true });
      }
    };

    verifyAndShowSuccess();
  }, []);

  const handleCompletePayment = async () => {
    if (selectedPayment !== 'paystack') return;
    const user = JSON.parse(localStorage.getItem('vescan_user') || '{}');
    const email = user.email;
    if (!email) {
      alert('Could not find your email. Please sign in again.');
      return;
    }
    setIsPaymentLoading(true);
    console.log('[payment] vescan_user fields:', Object.keys(user), '| phone_number:', user.phone_number, '| phone:', user.phone);
    try {
      const token = localStorage.getItem('vescan_token');
      const headers = token ? { 'Authorization': `Bearer ${token}` } : {};

      // Step 1: verify_checkout_products — creates backend order and returns real cart_id
      if (!deliveryAddress.trim() || !deliveryState.trim() || !deliveryPhone.trim()) {
        alert('Please fill in your phone number, street address, and state before proceeding.');
        setIsPaymentLoading(false);
        return;
      }
      const products = cartItems.map(item => ({
        product_name: item.name,
        product_price: String(item.price),
        product_id: String(item.id),
        owner_id: String(item.owner_id || ''),
        phone_number: item.phone_number || deliveryPhone.trim(),
        state: deliveryState.trim(),
        destination_address: deliveryAddress.trim(),
        product_quantity: String(item.quantity),
        product_image: item.image || '',
        image_url: item.image || '',
        LINK: item.image || '',
      }));

      console.log('[verify_checkout_products] sending products:', JSON.stringify(products).slice(0, 600));
      console.log('[verify_checkout_products] total_amount:', cartSubtotal);

      const vcpFormData = new FormData();
      vcpFormData.append('products', JSON.stringify(products));
      vcpFormData.append('total_amount', cartSubtotal);
      vcpFormData.append('phone_number', deliveryPhone.trim());
      vcpFormData.append('state', deliveryState.trim());
      vcpFormData.append('destination_address', deliveryAddress.trim());

      let cartId = null;
      try {
        const vcpRes = await fetch(`${BASE_URL}/verify_checkout_products`, {
          method: 'POST',
          headers,
          body: vcpFormData,
        });
        const vcpText = await vcpRes.text();
        console.log('[verify_checkout_products] status:', vcpRes.status, '| body:', vcpText.slice(0, 400));
        const vcpResult = JSON.parse(vcpText);
        cartId = vcpResult.cart_id ?? vcpResult.data?.cart_id ?? null;
        console.log('[verify_checkout_products] cart_id:', cartId, '| full result:', JSON.stringify(vcpResult).slice(0, 200));
      } catch (vcpErr) {
        console.error('[verify_checkout_products] error:', vcpErr);
      }

      if (cartId) localStorage.setItem('vescan_cart_id', String(cartId));
      localStorage.setItem('vescan_payment_total', cartTotal);

      // Step 2: initialize_payment — get Paystack authorization URL
      const callbackUrl = `${window.location.origin}/ecommerce?payment=success`;
      const ipFormData = new FormData();
      ipFormData.append('email', email);
      ipFormData.append('amount', cartTotal);
      ipFormData.append('link', callbackUrl);

      const res = await fetch(`${BASE_URL}/initialize_payment`, {
        method: 'POST',
        headers,
        body: ipFormData,
      });
      const result = await res.json();
      console.log('[initialize_payment] status:', res.status, '| result:', JSON.stringify(result).slice(0, 400));
      if (result.status && result.data?.authorization_url) {
        window.location.href = result.data.authorization_url;
      } else {
        alert(result.message || 'Payment initialization failed. Please try again.');
        setIsPaymentLoading(false);
      }
    } catch (err) {
      console.error(err);
      alert('Network error. Please check your connection and try again.');
      setIsPaymentLoading(false);
    }
  };

  const handleContinueShopping = () => {
    setCartItems([]);
    localStorage.removeItem('vescan_cart');
    localStorage.removeItem('vescan_payment_total');
    setViewState('products');
  };

  const handleReviewChange = (productId, field, value) => {
    setProductReviews(prev => ({ ...prev, [productId]: { ...prev[productId], [field]: value } }));
  };

  const handleSubmitProductReview = async (product) => {
    const review = productReviews[product.id];
    if (!review || review.rating === 0) return;
    setIsSubmittingReview(true);
    try {
      const token = localStorage.getItem('vescan_token');
      const formData = new FormData();
      formData.append('product_id', product.id);
      formData.append('rating', review.rating);
      formData.append('reviews', review.text);
      await fetch(`${BASE_URL}/review_product`, {
        method: 'POST',
        headers: token ? { 'Authorization': `Bearer ${token}` } : {},
        body: formData,
      });
      setSubmittedReviewIds(prev => new Set([...prev, product.id]));
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmittingReview(false);
    }
  };

  const fetchProducts = React.useCallback(async (parentCatId = null, subCategoryId = null) => {
    setIsLoadingProducts(true);
    setProductError(null);

    const token = localStorage.getItem('vescan_token');
    const headers = token ? { 'Authorization': `Bearer ${token}` } : {};

    let allProducts = [];
    let page = 1;
    let hasMore = true;

    try {
      while (hasMore) {
        let url = `${BASE_URL}/get_user_product?page=${page}`;
        if (subCategoryId !== null) {
          url = `${BASE_URL}/get_user_product?sub_category=${subCategoryId}&page=${page}`;
        } else if (parentCatId !== null) {
          url = `${BASE_URL}/get_user_product?parent_cat_id=${parentCatId}&page=${page}`;
        }

        const res = await fetch(url, { headers });
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const result = await res.json();

        if (result && Array.isArray(result.data)) {
          if (page === 1 && result.data[0]) console.log('[fetchProducts] raw first product keys:', Object.keys(result.data[0]), '| sample:', JSON.stringify(result.data[0]).slice(0, 400));
          const mapped = result.data.map((p, index) => ({
            id: p.id,
            name: p.product_name || 'Unknown Product',
            price: Number(p.product_price) || 0,
            image: p.product_image,
            rating: p.rating || 4,
            reviews: p.reviews || 0,
            condition: (allProducts.length + index) % 2 === 0 ? 'New' : 'Tokunbo',
            owner_id: p.owner_id,
            phone_number: p.phone_number,
          }));
          allProducts = [...allProducts, ...mapped];
          hasMore = result.next_page_url !== null;
          page++;
        } else {
          hasMore = false;
        }
      }
      const seen = new Set();
      const unique = allProducts.filter(p => seen.has(p.id) ? false : seen.add(p.id));
      setApiProducts(unique);
    } catch (err) {
      console.error(err);
      setProductError(err.message || "Failed to fetch products");
    } finally {
      setIsLoadingProducts(false);
    }
  }, []);

  const fetchCategoryCounts = React.useCallback(async (categories) => {
    const token = localStorage.getItem('vescan_token');
    const headers = token ? { 'Authorization': `Bearer ${token}` } : {};

    const keys = ['all'];
    const requests = [fetch(`${BASE_URL}/get_user_product?page=1`, { headers }).then(r => r.json()).catch(() => null)];

    for (const cat of categories) {
      keys.push(`p_${cat.parent_id}`);
      requests.push(fetch(`${BASE_URL}/get_user_product?parent_cat_id=${cat.parent_id}&page=1`, { headers }).then(r => r.json()).catch(() => null));
      for (const sub of (cat.sub_category || [])) {
        keys.push(`s_${sub.id}`);
        requests.push(fetch(`${BASE_URL}/get_user_product?sub_category=${sub.id}&page=1`, { headers }).then(r => r.json()).catch(() => null));
      }
    }

    const results = await Promise.all(requests);
    const counts = {};
    results.forEach((data, i) => { counts[keys[i]] = data?.total ?? 0; });
    setCategoryCounts(counts);
  }, []);

  React.useEffect(() => {
    const token = localStorage.getItem('vescan_token');
    const headers = token ? { 'Authorization': `Bearer ${token}` } : {};

    const fetchAllByCategory = async (cats) => {
      setIsLoadingProducts(true);
      setProductError(null);
      try {
        // Fetch every parent category in parallel (all pages each)
        const fetchCatPages = async (parentId) => {
          const items = [];
          let page = 1;
          let hasMore = true;
          while (hasMore) {
            const res = await fetch(`${BASE_URL}/get_user_product?parent_cat_id=${parentId}&page=${page}`, { headers });
            if (!res.ok) break;
            const result = await res.json();
            if (result && Array.isArray(result.data)) {
              items.push(...result.data);
              hasMore = result.next_page_url !== null;
              page++;
            } else { hasMore = false; }
          }
          return items;
        };

        const perCatResults = await Promise.all(cats.map(cat => fetchCatPages(cat.parent_id)));
        const combined = perCatResults.flat();

        const seen = new Set();
        const unique = combined.filter(p => seen.has(p.id) ? false : seen.add(p.id));

        const mapped = unique.map((p, index) => ({
          id: p.id,
          name: p.product_name || 'Unknown Product',
          price: Number(p.product_price) || 0,
          image: p.product_image,
          rating: p.rating || 4,
          reviews: p.reviews || 0,
          condition: index % 2 === 0 ? 'New' : 'Tokunbo',
          owner_id: p.owner_id,
          phone_number: p.phone_number,
        }));

        setApiProducts(mapped);
      } catch (err) {
        console.error(err);
        setProductError(err.message || 'Failed to fetch products');
      } finally {
        setIsLoadingProducts(false);
      }
    };

    fetch(`${BASE_URL}/get_parent_category`)
      .then(res => res.json())
      .then(data => {
        const cats = Array.isArray(data) ? data : (data?.data || []);
        setApiCategories(cats);
        fetchCategoryCounts(cats);
        fetchAllByCategory(cats);
      })
      .catch(console.error);
  }, [fetchCategoryCounts]);

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const deliveryFee = cartItems.length > 0 ? 2500 : 0;
  const cartTotal = cartSubtotal + deliveryFee;

  // Filter based on selected condition (New/Tokunbo/Show All)
  const conditionFilteredProducts = useMemo(() => {
    if (activeCondition === "Show All") return apiProducts;
    return apiProducts.filter(p => p.condition === activeCondition);
  }, [activeCondition, apiProducts]);

  // categoriesWithCounts just passes through apiCategories — counts come from the API fetch per category
  const categoriesWithCounts = apiCategories;

  const addToCart = (product) => {
    // Determine the correctly formatted product data structure (grid item vs detailed api item)
    const productToAdd = {
      id: product.id,
      name: product.product_name || product.name,
      price: Number(product.product_price) || product.price,
      image: product.product_image || product.image,
      seller: "Premium Auto Supply",
      owner_id: product.owner_id,
      phone_number: product.phone_number,
    };

    setCartItems(prev => {
      const existing = prev.find(item => item.id === productToAdd.id);
      if (existing) {
        return prev.map(item => item.id === productToAdd.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...productToAdd, quantity: 1 }];
    });
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 2000);
  };

  const handleProductClick = async (product) => {
    setSelectedProductDetails(product); // Set basic grid info instantly
    setIsModalLoading(true);
    try {
      const response = await fetch(`https://zubitechnologies.com/obd_final_apis/api/get_product_details/${product.id}`);
      const data = await response.json();
      if (data && !data.error) {
        // Merge the extra details from the API response
        setSelectedProductDetails(prev => ({
          ...prev,
          ...data
        }));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsModalLoading(false);
    }
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
      const productName = product.name || "";
      return productName.toLowerCase().includes((searchQuery || "").toLowerCase());
    });
  }, [conditionFilteredProducts, searchQuery]);

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
                <div className="card-body px-4 pb-4 pt-2 d-flex flex-column gap-3">
                  <div>
                    <label className="form-label mb-1" style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', fontWeight: 500 }}>Phone Number</label>
                    <input
                      type="tel"
                      className="form-control"
                      placeholder="e.g. 08012345678"
                      value={deliveryPhone}
                      onChange={e => setDeliveryPhone(e.target.value.replace(/[^0-9+]/g, ''))}
                      style={{ backgroundColor: 'var(--input-bg)', borderColor: 'var(--border-color)', color: 'var(--text-primary)', borderRadius: '8px', fontSize: '0.9rem' }}
                    />
                  </div>
                  <div>
                    <label className="form-label mb-1" style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', fontWeight: 500 }}>Street Address</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="e.g. 12 Adeola Odeku Street, Victoria Island"
                      value={deliveryAddress}
                      onChange={e => setDeliveryAddress(e.target.value)}
                      style={{ backgroundColor: 'var(--input-bg)', borderColor: 'var(--border-color)', color: 'var(--text-primary)', borderRadius: '8px', fontSize: '0.9rem' }}
                    />
                  </div>
                  <div>
                    <label className="form-label mb-1" style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', fontWeight: 500 }}>State</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="e.g. Lagos"
                      value={deliveryState}
                      onChange={e => setDeliveryState(e.target.value)}
                      style={{ backgroundColor: 'var(--input-bg)', borderColor: 'var(--border-color)', color: 'var(--text-primary)', borderRadius: '8px', fontSize: '0.9rem' }}
                    />
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="card shadow-sm mb-4" style={{ backgroundColor: 'var(--card-bg)', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                <div className="card-header bg-transparent border-bottom-0 pt-4 pb-2 px-4">
                  <h6 className="fw-bold mb-0" style={{ color: 'var(--text-primary)' }}>Payment Method</h6>
                </div>
                <div className="card-body px-4 pb-4 pt-2 d-flex flex-column gap-3">
                  
                  {/* E-Wallet (coming soon) */}
                  <div
                    className="p-3 rounded d-flex align-items-center"
                    style={{
                      backgroundColor: 'var(--bg-tertiary)',
                      border: '1px solid var(--border-color)',
                      opacity: 0.55,
                      cursor: 'not-allowed',
                    }}
                  >
                    <div className="d-flex align-items-center justify-content-center rounded-circle me-3" style={{ width: '40px', height: '40px', backgroundColor: 'rgba(168, 85, 247, 0.1)', color: '#a855f7' }}>
                      <Wallet size={20} />
                    </div>
                    <div className="flex-grow-1">
                      <h6 className="mb-0 fw-medium" style={{ color: 'var(--text-primary)', fontSize: '0.95rem' }}>E-Wallet</h6>
                      <small className="text-secondary" style={{ fontSize: '0.8rem' }}>Balance: ₦45,230</small>
                    </div>
                    <span className="badge text-white" style={{ backgroundColor: '#0099C2', fontSize: '0.7rem' }}>Coming Soon</span>
                  </div>

                  {/* Pay with Paystack */}
                  <div
                    onClick={() => setSelectedPayment('paystack')}
                    className="p-3 rounded d-flex align-items-center"
                    style={{
                      backgroundColor: selectedPayment === 'paystack' ? 'var(--bg-tertiary)' : 'transparent',
                      border: `1px solid ${selectedPayment === 'paystack' ? '#0099C2' : 'var(--border-color)'}`,
                      cursor: 'pointer',
                    }}
                  >
                    <div className="d-flex align-items-center justify-content-center rounded-circle me-3 fw-bold text-white" style={{ width: '40px', height: '40px', backgroundColor: '#00C3F7', fontSize: '0.75rem', letterSpacing: '-0.5px' }}>
                      Pay
                    </div>
                    <div className="flex-grow-1">
                      <h6 className="mb-0 fw-medium" style={{ color: 'var(--text-primary)', fontSize: '0.95rem' }}>Pay with Paystack</h6>
                      <small className="text-secondary" style={{ fontSize: '0.8rem' }}>Secure card &amp; bank payment</small>
                    </div>
                    {selectedPayment === 'paystack' && <Check size={20} style={{ color: '#0099C2' }} />}
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
                className="btn w-100 py-3 fw-bold text-white border-0 shadow-sm mt-3 d-flex align-items-center justify-content-center gap-2"
                style={{ backgroundColor: '#001F3F', borderRadius: '10px', opacity: isPaymentLoading ? 0.75 : 1 }}
                onClick={handleCompletePayment}
                disabled={isPaymentLoading}
              >
                {isPaymentLoading ? (
                  <>
                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    Initializing Payment...
                  </>
                ) : (
                  'Complete Payment'
                )}
              </button>
            </div>
          </div>
        </div>
      ) : viewState === 'verifying' ? (
        <div className="flex-grow-1 d-flex flex-column align-items-center justify-content-center gap-3 text-center p-4">
          <div className="spinner-border mb-2" style={{ color: '#0099C2', width: '3rem', height: '3rem' }} role="status" />
          <h5 className="fw-bold mb-0" style={{ color: 'var(--text-primary)' }}>Verifying Payment...</h5>
          <p className="text-secondary mb-0" style={{ fontSize: '0.9rem' }}>Please wait while we confirm your payment with Paystack.</p>
        </div>
      ) : viewState === 'success' ? (
        <div className="flex-grow-1 overflow-auto d-flex flex-column">
          {/* Green success banner */}
          <div className="d-flex flex-column align-items-center justify-content-center py-5 px-4 text-white" style={{ backgroundColor: '#1a9e5c', minHeight: '220px' }}>
            <div className="rounded-circle d-flex align-items-center justify-content-center mb-3 bg-white" style={{ width: '72px', height: '72px' }}>
              <Check size={36} style={{ color: '#1a9e5c' }} strokeWidth={3} />
            </div>
            <h4 className="fw-bold mb-1">Order Successful!</h4>
            <p className="mb-0 opacity-75" style={{ fontSize: '0.95rem' }}>Your order has been placed successfully</p>
          </div>

          <div className="p-4 flex-grow-1" style={{ backgroundColor: 'var(--bg-primary)' }}>

            {/* Order details card */}
            <div className="card shadow-sm mb-4" style={{ backgroundColor: 'var(--card-bg)', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
              <div className="card-body p-4">
                <p className="text-secondary text-center mb-1" style={{ fontSize: '0.85rem' }}>Order Number</p>
                <h5 className="fw-bold text-center mb-4" style={{ color: 'var(--text-primary)', letterSpacing: '0.5px' }}>
                  ORD-{new Date().getFullYear()}-{paymentReference ? paymentReference.slice(-3).toUpperCase() : Math.floor(Math.random() * 900 + 100)}
                </h5>
                <div className="d-flex justify-content-between py-3 border-top" style={{ borderColor: 'var(--border-color)' }}>
                  <span className="text-secondary" style={{ fontSize: '0.9rem' }}>Payment Method:</span>
                  <span className="fw-medium" style={{ color: 'var(--text-primary)', fontSize: '0.9rem' }}>Paystack</span>
                </div>
                <div className="d-flex justify-content-between py-3 border-top" style={{ borderColor: 'var(--border-color)' }}>
                  <span className="text-secondary" style={{ fontSize: '0.9rem' }}>Total Paid:</span>
                  <span className="fw-medium" style={{ color: 'var(--text-primary)', fontSize: '0.9rem' }}>₦{paymentTotal.toLocaleString()}</span>
                </div>
                <div className="d-flex justify-content-between py-3 border-top" style={{ borderColor: 'var(--border-color)' }}>
                  <span className="text-secondary" style={{ fontSize: '0.9rem' }}>Estimated Delivery:</span>
                  <span className="fw-medium" style={{ color: 'var(--text-primary)', fontSize: '0.9rem' }}>3-5 business days</span>
                </div>
              </div>
            </div>

            {/* Info note */}
            <div className="rounded-3 p-3 mb-4" style={{ backgroundColor: 'rgba(26, 158, 92, 0.08)', border: '1px solid rgba(26, 158, 92, 0.2)' }}>
              <p className="mb-0" style={{ color: '#1a9e5c', fontSize: '0.88rem' }}>
                We'll send you updates about your order via SMS and email. You can track your order in the Inventory section.
              </p>
            </div>

            {/* Rate your purchases */}
            {paidCartItems.length > 0 && (
              <div className="card shadow-sm mb-4" style={{ backgroundColor: 'var(--card-bg)', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
                <div className="card-header bg-transparent pt-4 pb-3 px-4" style={{ borderColor: 'var(--border-color)' }}>
                  <h6 className="fw-bold mb-0" style={{ color: 'var(--text-primary)' }}>Rate your purchases</h6>
                  <small className="text-secondary">Your feedback helps other mechanics find the right parts</small>
                </div>
                <div className="card-body px-4 pb-4 pt-2 d-flex flex-column gap-4">
                  {paidCartItems.map(product => {
                    const review = productReviews[product.id] || { rating: 0, text: '' };
                    const submitted = submittedReviewIds.has(product.id);
                    return (
                      <div key={product.id} className="rounded-3 p-3" style={{ backgroundColor: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}>
                        {/* Product info */}
                        <div className="d-flex align-items-center gap-3 mb-3">
                          {product.image ? (
                            <img src={product.image} alt={product.name} className="rounded-2 object-fit-cover flex-shrink-0" style={{ width: '48px', height: '48px' }} />
                          ) : (
                            <div className="rounded-2 flex-shrink-0 d-flex align-items-center justify-content-center" style={{ width: '48px', height: '48px', backgroundColor: 'var(--border-color)' }}>
                              <ShoppingCart size={20} style={{ color: 'var(--text-secondary)' }} />
                            </div>
                          )}
                          <div className="flex-grow-1">
                            <p className="fw-semibold mb-0" style={{ color: 'var(--text-primary)', fontSize: '0.9rem' }}>{product.name}</p>
                            <small className="text-secondary">₦{product.price?.toLocaleString()}</small>
                          </div>
                          {submitted && (
                            <span className="badge text-white d-flex align-items-center gap-1" style={{ backgroundColor: '#1a9e5c', borderRadius: '20px', fontSize: '0.75rem' }}>
                              <Check size={12} /> Reviewed
                            </span>
                          )}
                        </div>

                        {submitted ? (
                          <p className="text-secondary mb-0" style={{ fontSize: '0.85rem' }}>Thank you for your review!</p>
                        ) : (
                          <>
                            {/* Star rating */}
                            <div className="d-flex gap-1 mb-3">
                              {[1,2,3,4,5].map(star => (
                                <motion.button
                                  key={star}
                                  whileTap={{ scale: 0.85 }}
                                  onClick={() => handleReviewChange(product.id, 'rating', star)}
                                  className="btn p-0 border-0 bg-transparent shadow-none"
                                >
                                  <Star
                                    size={28}
                                    fill={star <= review.rating ? '#f59e0b' : 'none'}
                                    style={{ color: star <= review.rating ? '#f59e0b' : 'var(--border-color)', transition: 'color 0.15s' }}
                                  />
                                </motion.button>
                              ))}
                            </div>
                            {/* Text input */}
                            <textarea
                              className="form-control mb-3"
                              rows={2}
                              placeholder="Share your experience (optional)..."
                              value={review.text}
                              onChange={e => handleReviewChange(product.id, 'text', e.target.value)}
                              style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)', border: '1px solid var(--border-color)', borderRadius: '8px', resize: 'none', fontSize: '0.88rem' }}
                            />
                            <motion.button
                              whileTap={{ scale: 0.97 }}
                              onClick={() => handleSubmitProductReview(product)}
                              disabled={review.rating === 0 || isSubmittingReview}
                              className="btn py-2 px-4 fw-semibold text-white border-0 d-flex align-items-center gap-2"
                              style={{ backgroundColor: review.rating === 0 ? '#ccc' : '#001F3F', borderRadius: '8px', fontSize: '0.88rem', transition: 'background-color 0.2s' }}
                            >
                              {isSubmittingReview ? <><span className="spinner-border spinner-border-sm" /> Submitting...</> : 'Submit Review'}
                            </motion.button>
                          </>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Action buttons */}
            <button
              onClick={handleContinueShopping}
              className="btn w-100 py-3 fw-bold text-white border-0 shadow-sm mb-3"
              style={{ backgroundColor: '#001F3F', borderRadius: '10px' }}
            >
              Continue Shopping
            </button>
            <button
              onClick={() => navigate('/inventory?tab=orders')}
              className="btn w-100 py-3 fw-bold text-white border-0 shadow-sm"
              style={{ backgroundColor: '#0099C2', borderRadius: '10px' }}
            >
              View My Orders
            </button>
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
            {/* All Products pill */}
            <button
              onClick={() => {
                setActiveCategory("All Products");
                setActiveCategoryId(null);
                setActiveSubCategoryId(null);
                setOpenDropdownId(null);
                fetchProducts();
              }}
              className={`btn rounded-pill px-3 py-2 border-0 d-flex align-items-center gap-2 transition-all ${
                activeCategory === "All Products" ? 'text-white' : 'text-secondary'
              }`}
              style={{ 
                fontSize: '0.85rem', 
                backgroundColor: activeCategory === "All Products" ? 'var(--sidebar-bg)' : 'var(--bg-secondary)',
                fontWeight: '500',
                border: activeCategory === "All Products" ? 'none' : '1px solid var(--border-color)'
              }}
            >
              All Products <span className="opacity-75">({apiProducts.length})</span>
            </button>

            {/* API Categories */}
            {categoriesWithCounts.map((cat) => {
              const hasSub = cat.sub_category && cat.sub_category.length > 0;
              const isCatActive = activeCategoryId === Number(cat.parent_id);

              return (
                <div key={cat.parent_id} className="position-relative">
                  <button
                    onClick={() => {
                      if (hasSub) {
                        setOpenDropdownId(openDropdownId === cat.parent_id ? null : cat.parent_id);
                      } else {
                        setActiveCategory(cat.parent_category_name);
                        setActiveCategoryId(Number(cat.parent_id));
                        setActiveSubCategoryId(null);
                        setOpenDropdownId(null);
                        fetchProducts(cat.parent_id);
                      }
                    }}
                    className={`btn rounded-pill px-3 py-2 border-0 d-flex align-items-center gap-2 transition-all ${
                      isCatActive ? 'text-white' : 'text-secondary'
                    }`}
                    style={{ 
                      fontSize: '0.85rem', 
                      backgroundColor: isCatActive ? 'var(--sidebar-bg)' : 'var(--bg-secondary)',
                      fontWeight: '500',
                      border: isCatActive ? 'none' : '1px solid var(--border-color)',
                      textTransform: 'capitalize'
                    }}
                  >
                    {cat.parent_category_name}
                    {!hasSub && <span className="opacity-75">({categoryCounts[`p_${cat.parent_id}`] ?? 0})</span>}
                    {hasSub && <ChevronDown size={14} className={openDropdownId === cat.parent_id ? "rotate-180" : ""} />}
                  </button>

                  {/* Dropdown Menu */}
                  {hasSub && (
                    <motion.div 
                      initial={false}
                      animate={{ 
                        opacity: openDropdownId === cat.parent_id ? 1 : 0,
                        y: openDropdownId === cat.parent_id ? 5 : -5,
                        pointerEvents: openDropdownId === cat.parent_id ? 'auto' : 'none'
                      }}
                      className="position-absolute mt-1 shadow-sm rounded-3 border overflow-hidden"
                      style={{ minWidth: '150px', zIndex: 1000, left: 0, backgroundColor: 'var(--card-bg)', borderColor: 'var(--border-color)' }}
                    >
                      <div className="d-flex flex-column p-1">
                        <button
                          onClick={() => {
                            setActiveCategory(cat.parent_category_name);
                            setActiveCategoryId(Number(cat.parent_id));
                            setActiveSubCategoryId(null);
                            setOpenDropdownId(null);
                            fetchProducts(cat.parent_id);
                          }}
                          className={`btn btn-link text-start text-decoration-none px-3 py-2 hover-bg-light d-flex justify-content-between align-items-center gap-3 ${activeCategoryId === Number(cat.parent_id) && activeSubCategoryId === null ? 'fw-bold' : ''}`}
                          style={{ fontSize: '0.85rem', color: 'var(--text-primary)' }}
                        >
                          <span>All {cat.parent_category_name}</span>
                          <span className="text-secondary" style={{ fontSize: '0.8rem' }}>({categoryCounts[`p_${cat.parent_id}`] ?? 0})</span>
                        </button>
                        {cat.sub_category.map(sub => (
                          <button
                            key={sub.id}
                            onClick={() => {
                              setActiveCategory(sub.name);
                              setActiveCategoryId(Number(cat.parent_id));
                              setActiveSubCategoryId(Number(sub.id));
                              setOpenDropdownId(null);
                              fetchProducts(null, sub.id);
                            }}
                            className={`btn btn-link text-start text-decoration-none px-3 py-2 hover-bg-light d-flex justify-content-between align-items-center gap-3 ${activeSubCategoryId === Number(sub.id) ? 'fw-bold' : ''}`}
                            style={{ fontSize: '0.85rem', textTransform: 'capitalize', color: 'var(--text-primary)' }}
                          >
                            <span>{sub.name}</span>
                            <span className="text-secondary" style={{ fontSize: '0.8rem' }}>({categoryCounts[`s_${sub.id}`] ?? 0})</span>
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <p className="text-secondary mb-4" style={{ fontSize: '0.9rem' }}>{finalFilteredProducts.length} products found</p>

        {/* Product Grid */}
        <AnimatePresence mode="wait">
          <motion.div 
            key={activeCondition + activeCategory + searchQuery + (isLoadingProducts ? 'loading' : 'loaded')}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="row g-4"
          >
            {isLoadingProducts ? (
              <div className="col-12 py-5">
                <VescanLoader text="LOADING PRODUCTS" />
              </div>
            ) : productError ? (
              <div className="col-12 text-center py-5">
                <div className="alert alert-danger d-inline-block px-4 py-3" role="alert">
                  <h6 className="fw-bold mb-1">Error Loading Products</h6>
                  <p className="mb-0 small">{productError}</p>
                </div>
              </div>
            ) : finalFilteredProducts.length > 0 ? (
              finalFilteredProducts.map((product, index) => (
                <motion.div 
                  key={product.id} 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="col-12 col-md-6"
                >
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

                    <div 
                      className="bg-light d-flex align-items-center justify-content-center p-0 overflow-hidden cursor-pointer" 
                      style={{ height: '350px', cursor: 'pointer' }}
                      onClick={() => handleProductClick(product)}
                    >
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
                      {(() => {
                        const cartItem = cartItems.find(item => item.id === product.id);
                        if (cartItem) {
                          return (
                            <div className="d-flex align-items-center gap-2 w-100" style={{ height: '48px' }}>
                              <motion.button
                                whileTap={{ scale: 0.92 }}
                                onClick={() => removeItem(product.id)}
                                className="btn d-flex align-items-center justify-content-center border-0 text-white flex-shrink-0"
                                style={{ backgroundColor: '#c0392b', borderRadius: '10px', width: '44px', height: '44px' }}
                              >
                                <Trash2 size={16} />
                              </motion.button>
                              <div className="d-flex align-items-center justify-content-between flex-grow-1 px-3 rounded-3 text-white fw-semibold" style={{ backgroundColor: '#001F3F', height: '44px', fontSize: '0.95rem' }}>
                                <motion.button
                                  whileTap={{ scale: 0.85 }}
                                  onClick={() => updateQuantity(product.id, -1)}
                                  className="btn p-0 text-white border-0 bg-transparent shadow-none d-flex align-items-center justify-content-center"
                                  style={{ width: '28px', height: '28px', fontSize: '1.3rem', lineHeight: 1 }}
                                >
                                  −
                                </motion.button>
                                <span>{cartItem.quantity}</span>
                                <motion.button
                                  whileTap={{ scale: 0.85 }}
                                  onClick={() => updateQuantity(product.id, 1)}
                                  className="btn p-0 text-white border-0 bg-transparent shadow-none d-flex align-items-center justify-content-center"
                                  style={{ width: '28px', height: '28px', fontSize: '1.3rem', lineHeight: 1 }}
                                >
                                  +
                                </motion.button>
                              </div>
                            </div>
                          );
                        }
                        return (
                          <motion.button
                            whileTap={{ scale: 0.98 }}
                            onClick={() => addToCart(product)}
                            className="btn w-100 py-3 d-flex align-items-center justify-content-center gap-2 text-white border-0"
                            style={{ backgroundColor: '#001F3F', fontSize: '0.9rem', borderRadius: '10px' }}
                          >
                            <Plus size={18} /> Add to Cart
                          </motion.button>
                        );
                      })()}
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

      {/* Product Details Modal Overlay */}
      <AnimatePresence>
        {selectedProductDetails && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
            style={{ zIndex: 1050, backgroundColor: 'rgba(0,0,0,0.6)', padding: '20px', backdropFilter: 'blur(3px)' }}
            onClick={() => setSelectedProductDetails(null)}
          >
            <motion.div 
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="rounded-4 overflow-hidden shadow-lg position-relative d-flex flex-column flex-md-row border"
              style={{ maxWidth: '900px', width: '100%', maxHeight: '90vh', backgroundColor: 'var(--card-bg)', borderColor: 'var(--border-color)' }}
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                className="btn position-absolute top-0 end-0 m-3 p-2 rounded-circle shadow-sm d-flex align-items-center justify-content-center"
                onClick={() => setSelectedProductDetails(null)}
                style={{ zIndex: 10, border: '1px solid var(--border-color)', width: '36px', height: '36px', backgroundColor: 'var(--card-bg)', color: 'var(--text-primary)' }}
              >
                <X size={18} />
              </button>
              
              <div className="d-flex align-items-center justify-content-center border-end" style={{ flex: '1 1 50%', minHeight: '300px', backgroundColor: 'var(--bg-tertiary)', borderColor: 'var(--border-color)' }}>
                <img 
                  src={selectedProductDetails.product_image || selectedProductDetails.image} 
                  alt={selectedProductDetails.product_name || selectedProductDetails.name} 
                  className="w-100 h-100 object-fit-cover" 
                  style={{ maxHeight: '90vh' }}
                />
              </div>

              <div className="p-4 p-md-5 d-flex flex-column overflow-auto" style={{ flex: '1 1 50%' }}>
                {isModalLoading ? (
                   <div className="d-flex flex-column justify-content-center align-items-center h-100">
                     <VescanLoader text="LOADING DETAILS" className="" />
                   </div>
                ) : (
                  <>
                    <div className="mb-3">
                      <span 
                        className="px-3 py-1 rounded-pill text-white fw-bold shadow-sm" 
                        style={{ fontSize: '0.75rem', backgroundColor: selectedProductDetails.condition === 'New' ? '#0099C2' : '#64748b', textTransform: 'uppercase' }}
                      >
                        {selectedProductDetails.condition || 'New'}
                      </span>
                    </div>
                    <h3 className="fw-bold mb-2" style={{ color: 'var(--text-primary)' }}>
                      {selectedProductDetails.product_name || selectedProductDetails.name}
                    </h3>
                    
                    <div className="d-flex align-items-center gap-2 mb-4">
                      <div className="d-flex text-warning">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            size={18} 
                            fill={i < (selectedProductDetails.rating || 4) ? "currentColor" : "none"} 
                            className={i < (selectedProductDetails.rating || 4) ? "" : "opacity-25"} 
                            style={{ color: i < (selectedProductDetails.rating || 4) ? '' : 'var(--text-secondary)' }}
                          />
                        ))}
                      </div>
                      <span className="fw-medium" style={{ fontSize: '0.95rem', color: 'var(--text-secondary)' }}>
                        ({selectedProductDetails.reviews || 24} reviews)
                      </span>
                    </div>
                    
                    <h2 className="fw-bold mb-4" style={{ color: 'var(--text-primary)' }}>
                      ₦{Number(selectedProductDetails.product_price || selectedProductDetails.price).toLocaleString()}
                    </h2>
                    
                    <h6 className="fw-bold mb-3" style={{ color: 'var(--text-primary)', fontSize: '1.1rem' }}>Description</h6>
                    <p className="mb-5" style={{ fontSize: '0.95rem', lineHeight: '1.7', color: 'var(--text-secondary)' }}>
                      {selectedProductDetails.product_details || "No detailed description provided by the seller for this item."}
                    </p>

                    <div className="mt-auto pt-4 border-top" style={{ borderColor: 'var(--border-color)' }}>
                      {(() => {
                        const cartItem = cartItems.find(item => item.id === selectedProductDetails.id);
                        if (cartItem) {
                          return (
                            <div className="d-flex align-items-center gap-2 w-100">
                              <motion.button
                                whileTap={{ scale: 0.92 }}
                                onClick={() => removeItem(selectedProductDetails.id)}
                                className="btn d-flex align-items-center justify-content-center border-0 text-white flex-shrink-0"
                                style={{ backgroundColor: '#c0392b', borderRadius: '10px', width: '52px', height: '52px' }}
                              >
                                <Trash2 size={18} />
                              </motion.button>
                              <div className="d-flex align-items-center justify-content-between flex-grow-1 px-3 rounded-3 text-white fw-semibold" style={{ backgroundColor: '#001F3F', height: '52px', fontSize: '1rem' }}>
                                <motion.button
                                  whileTap={{ scale: 0.85 }}
                                  onClick={() => updateQuantity(selectedProductDetails.id, -1)}
                                  className="btn p-0 text-white border-0 bg-transparent shadow-none d-flex align-items-center justify-content-center"
                                  style={{ width: '32px', height: '32px', fontSize: '1.5rem', lineHeight: 1 }}
                                >
                                  −
                                </motion.button>
                                <span>{cartItem.quantity} in cart</span>
                                <motion.button
                                  whileTap={{ scale: 0.85 }}
                                  onClick={() => updateQuantity(selectedProductDetails.id, 1)}
                                  className="btn p-0 text-white border-0 bg-transparent shadow-none d-flex align-items-center justify-content-center"
                                  style={{ width: '32px', height: '32px', fontSize: '1.5rem', lineHeight: 1 }}
                                >
                                  +
                                </motion.button>
                              </div>
                            </div>
                          );
                        }
                        return (
                          <button
                            onClick={() => {
                              addToCart(selectedProductDetails);
                              setSelectedProductDetails(null);
                            }}
                            className="btn w-100 py-3 fw-bold rounded-3 text-white d-flex align-items-center justify-content-center gap-2 shadow-sm"
                            style={{ backgroundColor: '#001F3F', fontSize: '1rem' }}
                          >
                            <Plus size={20} /> Add to Cart
                          </button>
                        );
                      })()}
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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
