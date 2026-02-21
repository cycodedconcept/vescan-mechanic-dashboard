import React, { useState, useMemo } from 'react';
import { useOutletContext } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ShoppingCart, Star, ChevronDown, Plus, Check, Menu } from 'lucide-react';

// Import images from assets
import brakePadsImg from '../assets/Premium Brake Pads Set.png';
import oxygenSensorImg from '../assets/Oxygen Sensor.png';
import engineOilImg from '../assets/Synthethic Engine Oil 5W-30.png';
import airFilterImg from '../assets/Air Filter Premium.png';
import sparkPlugsImg from '../assets/Spark Plugs.png';
import brakeFluidImg from '../assets/Brake Fluid DOT 4.png';
import carBatteryImg from '../assets/Car Battery 12V 75Ah.png';
import cabinAirFilterImg from '../assets/Carbin Air Filter.png';
import alternatorBeltImg from '../assets/Alternator Belt.png';
import ledBulbsImg from '../assets/LED Headlight Bulbs.png';
import brakeRotorsImg from '../assets/Brake Disk rotor.png';
import transmissionFluidImg from '../assets/Transmisson Flui ATF.png';

// Products split evenly between New and Tokunbo (12 each)
const rawProducts = [
  { id: 1, name: "Premium Brake Pads Set", price: 15000, rating: 5, reviews: 124, image: brakePadsImg, category: "Brake System", condition: "New" },
  { id: 2, name: "Oxygen Sensor", price: 12000, rating: 4, reviews: 89, image: oxygenSensorImg, category: "Electrical", condition: "Tokunbo" },
  { id: 3, name: "Synthetic Engine Oil 5W-30", price: 4500, rating: 4, reviews: 256, image: engineOilImg, category: "Fluids & Oils", condition: "New" },
  { id: 4, name: "Air Filter Premium", price: 3500, rating: 4, reviews: 67, image: airFilterImg, category: "Filters", condition: "Tokunbo" },
  { id: 5, name: "Spark Plugs (Set of 4)", price: 8000, rating: 4, reviews: 143, image: sparkPlugsImg, category: "Engine Parts", condition: "New" },
  { id: 6, name: "Brake Fluid DOT 4", price: 2800, rating: 4, reviews: 98, image: brakeFluidImg, category: "Fluids & Oils", condition: "Tokunbo" },
  { id: 7, name: "Car Battery 12V 75Ah", price: 35000, rating: 4, reviews: 187, image: carBatteryImg, category: "Electrical", condition: "New" },
  { id: 8, name: "Cabin Air Filter", price: 4500, rating: 4, reviews: 73, image: cabinAirFilterImg, category: "Filters", condition: "Tokunbo" },
  { id: 9, name: "Alternator Belt", price: 5500, rating: 4, reviews: 56, image: alternatorBeltImg, category: "Engine Parts", condition: "New" },
  { id: 10, name: "LED Headlight Bulbs", price: 18000, rating: 5, reviews: 234, image: ledBulbsImg, category: "Electrical", condition: "Tokunbo" },
  { id: 11, name: "Brake Disc Rotors (Pair)", price: 28000, rating: 4, reviews: 112, image: brakeRotorsImg, category: "Brake System", condition: "New" },
  { id: 12, name: "Transmission Fluid ATF", price: 6500, rating: 4, reviews: 91, image: transmissionFluidImg, category: "Fluids & Oils", condition: "Tokunbo" },
  { id: 13, name: "Fuel Injector Cleaner", price: 3200, rating: 4, reviews: 45, image: engineOilImg, category: "Engine Parts", condition: "New" },
  { id: 14, name: "Performance Spark Plugs", price: 12000, rating: 5, reviews: 78, image: sparkPlugsImg, category: "Engine Parts", condition: "Tokunbo" },
  { id: 15, name: "Ceramic Brake Pads", price: 18500, rating: 5, reviews: 210, image: brakePadsImg, category: "Brake System", condition: "New" },
  { id: 16, name: "Oil Filter High Capacity", price: 2500, rating: 4, reviews: 112, image: airFilterImg, category: "Filters", condition: "Tokunbo" },
  { id: 17, name: "Radiator Coolant (5L)", price: 5500, rating: 4, reviews: 167, image: brakeFluidImg, category: "Fluids & Oils", condition: "New" },
  { id: 18, name: "Engine Gasket Set", price: 22000, rating: 4, reviews: 34, image: alternatorBeltImg, category: "Engine Parts", condition: "Tokunbo" },
  { id: 19, name: "Suspension Coil Spring", price: 15000, rating: 4, reviews: 56, image: engineOilImg, category: "Engine Parts", condition: "New" },
  { id: 20, name: "Steering Rack Boot", price: 4500, rating: 4, reviews: 23, image: brakePadsImg, category: "Brake System", condition: "Tokunbo" },
  { id: 21, name: "Internal Door Handle Set", price: 8500, rating: 4, reviews: 15, image: ledBulbsImg, category: "Interior Parts", condition: "New" },
  { id: 22, name: "Gear Shift Knob Premium", price: 12000, rating: 5, reviews: 42, image: alternatorBeltImg, category: "Interior Parts", condition: "Tokunbo" },
  { id: 23, name: "Synthetic Power Steering Fluid", price: 3800, rating: 4, reviews: 88, image: transmissionFluidImg, category: "Fluids & Oils", condition: "New" },
  { id: 24, name: "Water Pump Assembly", price: 24500, rating: 4, reviews: 67, image: alternatorBeltImg, category: "Engine Parts", condition: "Tokunbo" }
];

const categoryLabels = [
  "All Products",
  "Engine Parts",
  "Brake System",
  "Fluids & Oils",
  "Electrical",
  "Filters",
  "Interior Parts"
];

const Ecommerce = () => {
  const { isSidebarOpen, toggleSidebar } = useOutletContext();
  const [activeCondition, setActiveCondition] = useState("New");
  const [activeCategory, setActiveCategory] = useState("All Products");
  const [searchQuery, setSearchQuery] = useState("");
  const [cartCount, setCartCount] = useState(1);
  const [showNotification, setShowNotification] = useState(false);
  const [isConditionOpen, setIsConditionOpen] = useState(false);

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

  const addToCart = () => {
    setCartCount(prev => prev + 1);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 2000);
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
    <div className="h-100 overflow-auto bg-white position-relative" style={{ fontFamily: 'Inter, sans-serif' }}>
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

      {/* Top Header */}
      <div className="px-4 py-3 bg-white border-bottom d-flex justify-content-between align-items-center sticky-top" style={{ zIndex: 100 }}>
        <div className="d-flex align-items-center gap-3">
          {!isSidebarOpen && (
            <button onClick={toggleSidebar} className="btn btn-link text-dark p-0 me-2">
              <Menu size={24} />
            </button>
          )}
          <div>
            <h5 className="fw-bold mb-0">E-Commerce Marketplace</h5>
            <small className="text-secondary opacity-75">Manage your business operations</small>
          </div>
        </div>
        <div className="d-flex align-items-center gap-3">
          <div className="position-relative cursor-pointer">
             <div className="position-relative">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
                <span className="position-absolute top-0 start-100 translate-middle p-1 bg-danger border border-white rounded-circle" style={{ width: '8px', height: '8px', marginTop: '2px', marginLeft: '-2px' }}></span>
             </div>
          </div>
          <div className="bg-dark text-white rounded-circle d-flex align-items-center justify-content-center fw-bold" style={{ width: '35px', height: '35px', fontSize: '0.8rem' }}>
            JD
          </div>
        </div>
      </div>

      {/* Blue Banner Section */}
      <div className="p-4" style={{ backgroundColor: '#0099C2' }}>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h4 className="fw-bold text-white mb-0">E-Commerce Marketplace</h4>
          <div className="position-relative p-2 rounded-3 bg-white bg-opacity-25 shadow-sm">
            <ShoppingCart size={24} className="text-white" />
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-circle bg-danger" style={{ fontSize: '0.65rem', border: '2px solid #0099C2', marginTop: '-2px' }}>
              {cartCount}
            </span>
          </div>
        </div>
        
        <div className="position-relative">
          <Search className="position-absolute top-50 translate-middle-y ms-3 text-secondary" size={18} />
          <input 
            type="text" 
            placeholder="Search for auto parts..." 
            className="form-control border-0 py-3 ps-5 rounded-3 shadow-inner"
            style={{ backgroundColor: '#E0F4F9', color: '#64748b' }}
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
              className="btn border border-secondary border-opacity-25 d-flex align-items-center gap-2 bg-white text-dark px-3 py-2 fw-semibold"
              style={{ fontSize: '0.9rem', color: '#001F3F' }}
            >
              {activeCondition} <ChevronDown size={14} className={isConditionOpen ? "rotate-180" : ""} />
            </button>
            <motion.div 
              initial={false}
              animate={{ height: isConditionOpen ? 'auto' : 0, opacity: isConditionOpen ? 1 : 0 }}
              className="mt-2 overflow-hidden position-absolute bg-white shadow-lg rounded-3 border"
              style={{ minWidth: '150px', zIndex: 1000 }}
            >
              <div className="p-2 d-flex flex-column gap-1">
                {["Show All", "New", "Tokunbo"].map((cond, i) => (
                  <button 
                    key={i}
                    onClick={() => { setActiveCondition(cond); setIsConditionOpen(false); }}
                    className={`btn btn-link text-start text-decoration-none px-3 py-2 rounded-2 ${activeCondition === cond ? 'bg-primary text-white' : 'text-dark hover-bg-light'}`}
                    style={{ fontSize: '0.85rem' }}
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
                  activeCategory === cat.name ? 'text-white' : 'bg-secondary bg-opacity-10 text-secondary'
                }`}
                style={{ 
                  fontSize: '0.85rem', 
                  backgroundColor: activeCategory === cat.name ? '#001F3F' : '#F1F5F9',
                  fontWeight: '500'
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
                  <div className="card border-0 shadow-sm h-100 rounded-4 overflow-hidden product-card border-light position-relative">
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
                      <h6 className="fw-semibold text-dark mb-1" style={{ fontSize: '1.05rem' }}>{product.name}</h6>
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
                      <h5 className="fw-bold mb-4 mt-auto">₦{product.price.toLocaleString()}</h5>
                      <motion.button 
                        whileTap={{ scale: 0.98 }}
                        onClick={addToCart}
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
