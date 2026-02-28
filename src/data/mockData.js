import { DollarSign, Wrench, Users, Star, User, Lock, BellRing, Briefcase, CreditCard, Plug, Palette, Box, ShoppingCart, TrendingUp } from 'lucide-react';

// Import images from assets for E-commerce products
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

export const STATS = [
  { title: 'Active Jobs', value: '3', color: 'bg-primary' },
  { title: 'Upcoming', value: '2', color: 'bg-info' },
  { title: 'New Alerts', value: '1', color: 'bg-danger' },
];

export const JOBS = [
  {
    id: 1,
    category: 'active',
    customer: 'John Adeyemi',
    car: '2020 Toyota Camry • ABC-123-XY',
    service: 'Engine Diagnostic & Repair',
    price: '₦28,500',
    laborTime: '3.5h labor',
    progress: 65,
    status: 'In Progress',
    started: '9:00 AM',
    eta: '2:30 PM',
    parts: ['Oxygen Sensor', 'Air Filter']
  },
  {
    id: 2,
    category: 'active',
    customer: 'Sarah Ibrahim',
    car: '2019 Honda Accord • XYZ-456-AB',
    service: 'Brake System Service',
    price: '₦22,000',
    laborTime: '2h labor',
    progress: 30,
    status: 'In Progress',
    started: '10:30 AM',
    eta: '1:00 PM',
    parts: ['Brake Pads (Front)', 'Brake Fluid']
  },
  {
    id: 3,
    category: 'active',
    customer: 'David Okonkwo',
    car: '2021 Lexus ES • DEF-789-CD',
    service: 'Full Service',
    price: '₦35,000',
    laborTime: '1.5h labor',
    progress: 45,
    status: 'Paused',
    started: '8:00 AM',
    eta: 'Waiting for parts',
    parts: ['Oil Filter', 'Engine Oil (5W-30)', 'Cabin Filter']
  },
  {
    id: 4,
    category: 'upcoming',
    customer: 'Mary Johnson',
    car: '2018 Mercedes C-Class • GHI-321-EF',
    service: 'Full Service',
    price: '₦55,000',
    laborTime: '2 hours',
    progress: 0,
    status: 'Confirmed',
    started: 'Today, 2:00 PM',
    eta: '2 hours',
    parts: [],
    notes: 'Customer mentioned unusual engine noise'
  },
  {
    id: 5,
    category: 'upcoming',
    customer: 'Peter Obi',
    car: '2020 BMW X5 • JKL-654-GH',
    service: 'Brake Inspection',
    price: 'Pending',
    laborTime: '1 hour',
    progress: 0,
    status: 'Confirmed',
    started: 'Today, 4:30 PM',
    eta: '1 hour',
    parts: [],
    notes: ''
  },
  {
    id: 8,
    category: 'upcoming',
    customer: 'Grace Eze',
    car: '2019 Audi A4 • MNO-987-IJ',
    service: 'Oil Change',
    price: '₦25,000',
    laborTime: '45 mins',
    progress: 0,
    status: 'Pending',
    started: 'Tomorrow, 10:00 AM',
    eta: '45 mins',
    parts: [],
    notes: 'Prefers synthetic oil'
  },
  {
    id: 6,
    category: 'alerts',
    customer: 'John Adeyemi',
    car: '2020 Toyota Camry',
    service: 'Catalyst System Efficiency Below Threshold',
    errorCode: 'P0420',
    severity: 'High Severity',
    price: 'Pending',
    laborTime: 'TBD',
    progress: 0,
    status: 'Critical',
    started: '11:15 AM',
    timeAgo: '15 mins ago',
    eta: 'Check Required',
    parts: [],
    customerNotes: 'Check engine light came on during highway driving',
    location: 'Lekki, Lagos',
    phone: '+234 803 123 4567',
    imagesCount: 2,
    videoCount: 1
  },
  {
    id: 9,
    category: 'alerts',
    customer: 'Sarah Ibrahim',
    car: '2019 Honda Accord',
    service: 'System Too Lean (Bank 1)',
    errorCode: 'P0171',
    severity: 'Medium',
    price: 'Pending',
    laborTime: 'TBD',
    progress: 0,
    status: 'Critical',
    started: '1:00 PM',
    timeAgo: '1 hour ago',
    eta: 'Immediate',
    parts: [],
    customerNotes: 'Rough idle and decreased fuel efficiency',
    location: 'Victoria Island, Lagos',
    phone: '+234 805 987 6543',
    imagesCount: 1,
    videoCount: 0
  },
  {
    id: 10,
    category: 'alerts',
    customer: 'David Okonkwo',
    car: '2021 Lexus ES',
    service: 'Random/Multiple Cylinder Misfire Detected',
    errorCode: 'P0300',
    severity: 'High Severity',
    price: 'Pending',
    laborTime: 'TBD',
    progress: 0,
    status: 'Critical',
    started: '1:30 PM',
    timeAgo: '2 hours ago',
    eta: 'Check Required',
    parts: [],
    customerNotes: 'Engine shaking, loss of power',
    location: 'Ikeja, Lagos',
    phone: '+234 807 234 5678',
    imagesCount: 3,
    videoCount: 2
  },
  {
    id: 11,
    category: 'completed',
    customer: 'Michael Brown',
    car: '2017 Toyota Corolla',
    service: 'Oil Change & Filter',
    price: '₦12,500',
    laborTime: '45 mins',
    progress: 100,
    status: 'Completed',
    started: 'Today, 11:30 AM',
    eta: 'Completed',
    parts: [],
    rating: 5,
    isVerified: true,
    paymentStatus: 'Paid'
  },
  {
    id: 12,
    category: 'completed',
    customer: 'Jennifer Lee',
    car: '2019 Nissan Altima',
    service: 'Transmission Service',
    price: '₦45,000',
    laborTime: '2.5 hours',
    progress: 100,
    status: 'Completed',
    started: 'Today, 8:45 AM',
    eta: 'Completed',
    parts: [],
    rating: 5,
    isVerified: true,
    paymentStatus: 'Paid'
  },
  {
    id: 13,
    category: 'completed',
    customer: 'Ahmed Hassan',
    car: '2020 Honda CR-V',
    service: 'AC System Repair',
    price: '₦38,000',
    laborTime: '3 hours',
    progress: 100,
    status: 'Completed',
    started: 'Yesterday, 5:00 PM',
    eta: 'Completed',
    parts: [],
    rating: 5,
    isVerified: false,
    paymentStatus: 'Payment Pending'
  }
];

export const DIAGNOSTIC_ALERTS = [
  {
    id: 1,
    vehicle: "2020 Toyota Camry",
    owner: "John Adeyemi",
    code: "P0420",
    severity: "Urgent",
    severityBadge: "bg-danger",
    description: "Catalyst System Efficiency Below Threshold",
    time: "15 mins ago",
    iconColor: "text-danger",
    iconBg: "bg-danger",
    details: {
      errorCode: "P0428",
      severityText: "High Severity",
      severityColor: "bg-danger bg-opacity-10 text-danger",
      actions: [
        "Inspect oxygen sensor and exhaust system",
        "Check for exhaust leaks",
        "Verify catalytic converter efficiency",
        "Run full diagnostic scan"
      ],
      timeReceived: "10:45 AM"
    }
  },
  {
    id: 2,
    vehicle: "2019 Honda Accord",
    owner: "Sarah Ibrahim",
    code: "P0171",
    severity: null,
    description: "System Too Lean (Bank 1)",
    time: "1 hour ago",
    iconColor: "text-warning",
    iconBg: "bg-warning",
    details: {
      errorCode: "P0171",
      severityText: "Medium Severity",
      severityColor: "bg-warning bg-opacity-10 text-warning",
      actions: [
        "Check mass air flow sensor",
        "Inspect vacuum lines for leaks",
        "Check fuel pressure"
      ],
      timeReceived: "09:30 AM"
    }
  },
  {
    id: 3,
    vehicle: "2021 Lexus ES",
    owner: "David Okonkwo",
    code: "P0300",
    severity: "Urgent",
    severityBadge: "bg-danger",
    description: "Random/Multiple Cylinder Misfire Detected",
    time: "2 hours ago",
    iconColor: "text-danger",
    iconBg: "bg-danger",
    details: {
      errorCode: "P0300",
      severityText: "High Severity",
      severityColor: "bg-danger bg-opacity-10 text-danger",
      actions: [
        "Check spark plugs and coils",
        "Inspect fuel injectors",
        "Compression test cylinders"
      ],
      timeReceived: "08:15 AM"
    }
  }
];

export const FINANCIAL_STATS = {
  balance: '₦45,230',
  today: '₦8.5k',
  thisWeek: '₦28.9k',
  commission: '₦5.7k',
  totalRevenue: '₦124.5k',
  revenueGrowth: '+18%',
  pending: '₦12.4k',
  pendingCount: 2
};

export const TRANSACTIONS = [
  {
    id: 1,
    type: 'income',
    title: 'Service Payment - John Adeyemi',
    time: '2 hours ago',
    amount: '+₦28,500',
    status: 'completed',
    refId: 'INV-2024-001'
  },
  {
    id: 2,
    type: 'expense',
    title: 'Parts Purchase - Oxygen Sensor',
    time: '3 hours ago',
    amount: '₦8,500',
    status: 'completed',
    refId: 'PRT-2024-034'
  },
  {
    id: 3,
    type: 'income',
    title: 'Commission - Auto Parts Sale',
    time: '5 hours ago',
    amount: '+₦2,400',
    status: 'completed',
    refId: 'COM-2024-012'
  },
  {
    id: 4,
    type: 'income',
    title: 'Service Payment - Sarah Ibrahim',
    time: 'Yesterday',
    amount: '+₦22,000',
    status: 'completed',
    refId: 'INV-2024-002'
  },
  {
    id: 5,
    type: 'pending',
    title: 'Service Payment - David Okonkwo',
    time: 'Yesterday',
    amount: '+₦35,000',
    status: 'pending',
    refId: 'INV-2024-003'
  }
];

export const INVOICES = [
  {
    id: "INV-2024-001",
    customer: "John Adeyemi",
    car: "2020 Toyota Camry",
    status: "Paid",
    amount: "₦28,500",
    issueDate: "Jan 15, 2026",
    dueDate: "Jan 15, 2026",
    items: [
      { name: "Oxygen Sensor", price: "₦12,000" },
      { name: "Air Filter", price: "₦3,500" },
      { name: "Labor (3.5 hrs)", price: "₦13,000" }
    ]
  },
  {
    id: "INV-2024-002",
    customer: "Sarah Ibrahim",
    car: "2019 Honda Accord",
    status: "Paid",
    amount: "₦22,000",
    issueDate: "Jan 14, 2026",
    dueDate: "Jan 14, 2026",
    items: [
      { name: "Brake Pads (Front)", price: "₦15,000" },
      { name: "Brake Fluid", price: "₦2,000" },
      { name: "Labor (2 hrs)", price: "₦5,000" }
    ]
  },
  {
    id: "INV-2024-003",
    customer: "David Okonkwo",
    car: "2021 Lexus ES",
    status: "Pending Payment",
    amount: "₦35,000",
    issueDate: "Jan 15, 2026",
    dueDate: "Jan 17, 2026",
    items: [
      { name: "Oil Filter", price: "₦4,500" },
      { name: "Engine Oil (5W-30)", price: "₦18,000" },
      { name: "Cabin Filter", price: "₦3,500" },
      { name: "Labor (1.5 hrs)", price: "₦9,000" }
    ]
  }
];

export const CUSTOMERS = [
  {
    id: 1,
    name: "John Adeyemi",
    initials: "JA",
    rating: 5,
    customerSince: "Jan 2025",
    phone: "+234 803 123 4567",
    email: "john.adeyemi@email.com",
    location: "Lekki, Lagos",
    totalServices: 12,
    totalSpent: "₦285k",
    lastService: "2 days ago",
    vehiclesCount: 1,
    color: "#EFFFF4",
    textColor: "#28a745",
    vehicles: [
      {
        id: 1,
        model: "2020 Toyota Camry",
        plate: "ABC-123-XY",
        vin: "JT2BF18K8X8123456",
        mileage: "45,000 km",
        lastServiceDate: "2 days ago",
        nextServiceDate: "Feb 15"
      }
    ],
    serviceHistory: [
      {
        id: 1,
        title: "Engine Diagnostic & Repair",
        car: "2020 Toyota Camry",
        date: "Jan 13, 2026",
        amount: "₦28,500",
        status: "Paid"
      },
      {
        id: 2,
        title: "Oil Change",
        car: "2020 Toyota Camry",
        date: "Dec 28, 2025",
        amount: "₦12,000",
        status: "Paid"
      },
      {
        id: 3,
        title: "Brake Service",
        car: "2020 Toyota Camry",
        date: "Nov 15, 2025",
        amount: "₦35,000",
        status: "Paid"
      }
    ],
    notes: "Prefers appointments in the afternoon. Always wants detailed explanations of work done."
  },
  {
    id: 2,
    name: "Sarah Ibrahim",
    initials: "SI",
    rating: 5,
    customerSince: "Mar 2025",
    phone: "+234 805 987 6543",
    email: "sarah.ibrahim@email.com",
    location: "Victoria Island, Lagos",
    totalServices: 8,
    totalSpent: "₦156k",
    lastService: "1 week ago",
    vehiclesCount: 1,
    color: "#EFFFF4",
    textColor: "#28a745",
    vehicles: [
      {
        id: 1,
        model: "2021 Honda Accord",
        plate: "LAG-456-ZZ",
        vin: "1HGCR2F5XLA012345",
        mileage: "22,500 km",
        lastServiceDate: "1 week ago",
        nextServiceDate: "Mar 10"
      }
    ],
    serviceHistory: [
      {
        id: 1,
        title: "Tire Rotation & Balance",
        car: "2021 Honda Accord",
        date: "Feb 05, 2026",
        amount: "₦15,000",
        status: "Paid"
      }
    ],
    notes: "Very particular about hygiene inside the car."
  },
  {
    id: 3,
    name: "David Okonkwo",
    initials: "DO",
    rating: 5,
    customerSince: "Jan 2025",
    phone: "+234 807 234 5678",
    email: "david.okonkwo@email.com",
    location: "Ikeja, Lagos",
    totalServices: 15,
    totalSpent: "₦420k",
    lastService: "3 days ago",
    vehiclesCount: 1,
    color: "#EFFFF4",
    textColor: "#28a745",
    vehicles: [
      {
        id: 1,
        model: "2019 Lexus ES 350",
        plate: "IKJ-789-QA",
        vin: "58ABZ1B1KLU098765",
        mileage: "65,000 km",
        lastServiceDate: "3 days ago",
        nextServiceDate: "May 20"
      }
    ],
    serviceHistory: [
      {
        id: 1,
        title: "Full Engine Overhaul",
        car: "2019 Lexus ES 350",
        date: "Jan 10, 2026",
        amount: "₦250,500",
        status: "Paid"
      }
    ],
    notes: "Corporate client, requires formal invoices for every job."
  },
  {
    id: 4,
    name: "Mary Johnson",
    initials: "MJ",
    rating: 4,
    customerSince: "Jul 2025",
    phone: "+234 809 345 6789",
    email: "mary.johnson@email.com",
    location: "Ikoyi, Lagos",
    totalServices: 6,
    totalSpent: "₦124k",
    lastService: "2 weeks ago",
    vehiclesCount: 1,
    color: "#EFFFF4",
    textColor: "#28a745",
    vehicles: [
      {
        id: 1,
        model: "2022 Mercedes-Benz C300",
        plate: "IKY-321-LB",
        vin: "WDDWF4JB3LA112233",
        mileage: "12,000 km",
        lastServiceDate: "2 weeks ago",
        nextServiceDate: "Jul 15"
      }
    ],
    serviceHistory: [
      {
        id: 1,
        title: "Scheduled Maintenance",
        car: "2022 Mercedes-Benz C300",
        date: "Jan 30, 2026",
        amount: "₦45,000",
        status: "Paid"
      }
    ],
    notes: "New customer, referred by John Adeyemi."
  }
];

export const CUSTOMER_STATS = {
  total: 4,
  activeWeek: 12,
  newMonth: 8
};

export const COMMISSIONS = [
  {
    id: 1,
    customer: "John Adeyemi",
    status: "credited",
    item: "Premium Brake Pads Set",
    orderValue: "₦24,000",
    commission: "+₦2,400",
    rate: "10%",
    date: "Jan 15, 2026"
  },
  {
    id: 2,
    customer: "Mary Johnson",
    status: "credited",
    item: "Synthetic Engine Oil 5W-40",
    orderValue: "₦18,500",
    commission: "+₦1,850",
    rate: "10%",
    date: "Jan 14, 2026"
  },
  {
    id: 3,
    customer: "Peter Obi",
    status: "pending",
    item: "Air Filter + Cabin Filter Combo",
    orderValue: "₦8,900",
    commission: "+₦890",
    rate: "10%",
    date: "Jan 14, 2026"
  },
  {
    id: 4,
    customer: "Grace Eze",
    status: "credited",
    item: "Battery (70Ah)",
    orderValue: "₦32,000",
    commission: "+₦3,200",
    rate: "10%",
    date: "Jan 13, 2026"
  }
];

export const VEHICLES = [
  {
    id: 1,
    year: '2020',
    make: 'Toyota',
    model: 'Camry',
    plate: 'ABC-123-XY',
    vin: 'JT2BF18K8X0123456',
    owner: 'John Adeyemi',
    mileage: '45,000 km',
    transmission: 'Automatic',
    fuelType: 'Gasoline',
    lastService: 'Jan 13, 2026',
    nextService: 'Feb 15, 2026',
    serviceCount: 12,
    diagnosticCount: 3,
    status: 'Active',
    errorCodes: ['P0420']
  },
  {
    id: 2,
    year: '2019',
    make: 'Honda',
    model: 'Accord',
    plate: 'XYZ-456-AB',
    vin: '1HGCV1F30JA123456',
    owner: 'Sarah Ibrahim',
    mileage: '38,000 km',
    transmission: 'Automatic',
    fuelType: 'Gasoline',
    lastService: 'Jan 8, 2026',
    nextService: 'Mar 1, 2026',
    serviceCount: 8,
    diagnosticCount: 1,
    status: 'Active',
    errorCodes: []
  },
  {
    id: 3,
    year: '2018',
    make: 'Mercedes-Benz',
    model: 'C-Class',
    plate: 'GHI-321-EF',
    vin: 'WDDWF8EB5JR123456',
    owner: 'Mary Johnson',
    mileage: '52,000 km',
    transmission: 'Automatic',
    fuelType: 'Gasoline',
    lastService: 'Dec 29, 2025',
    nextService: 'Feb 1, 2026',
    serviceCount: 12,
    diagnosticCount: 0,
    status: 'Maintenance Due',
    errorCodes: []
  },
  {
    id: 4,
    year: '2020',
    make: 'BMW',
    model: 'X5',
    plate: 'JKL-654-GH',
    vin: '5UXKR0C56L9123456',
    owner: 'Peter Obi',
    mileage: '35,000 km',
    transmission: 'Automatic',
    fuelType: 'Diesel',
    lastService: 'Dec 15, 2025',
    nextService: 'Jan 20, 2026',
    serviceCount: 9,
    diagnosticCount: 1,
    status: 'Maintenance Due',
    errorCodes: ['P0300']
  }
];

export const VEHICLE_STATS = {
  total: 5,
  active: 3,
  dueService: 2
};

// E-Commerce Data
export const rawProducts = [
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

export const categoryLabels = [
  "All Products",
  "Engine Parts",
  "Brake System",
  "Fluids & Oils",
  "Electrical",
  "Filters",
  "Interior Parts"
];

// Inventory Data
export const inventoryData = [
  { id: 1, name: 'Oxygen Sensor', category: 'Engine', sku: 'OX-SEN-001', inStock: 3, unitPrice: '₦12,000', used: 8, minStock: 5, lastUsed: '2 days ago', status: 'Low Stock', icon: Box, iconColor: '#f59e0b', iconBg: '#fef3c7' },
  { id: 2, name: 'Brake Pads (Front)', category: 'Brakes', sku: 'BRK-PAD-F01', inStock: 12, unitPrice: '₦15,000', used: 24, minStock: 8, lastUsed: '1 week ago', status: 'In Stock', icon: Box, iconColor: '#10b981', iconBg: '#d1fae5' },
  { id: 3, name: 'Engine Oil (5W-30)', category: 'Fluids', sku: 'OIL-5W30-001', inStock: 28, unitPrice: '₦3,600', used: 45, minStock: 15, lastUsed: '3 days ago', status: 'In Stock', icon: Box, iconColor: '#10b981', iconBg: '#d1fae5' },
  { id: 4, name: 'Air Filter', category: 'Engine', sku: 'AIR-FLT-001', inStock: 2, unitPrice: '₦3,500', used: 18, minStock: 10, lastUsed: '2 days ago', status: 'Low Stock', icon: Box, iconColor: '#f59e0b', iconBg: '#fef3c7' },
  { id: 5, name: 'Cabin Filter', category: 'Interior', sku: 'CAB-FLT-001', inStock: 0, unitPrice: '₦4,500', used: 12, minStock: 8, lastUsed: '1 week ago', status: 'Out of Stock', icon: Box, iconColor: '#ef4444', iconBg: '#fee2e2' },
  { id: 6, name: 'Spark Plugs (Set of 4)', category: 'Engine', sku: 'SPK-PLG-004', inStock: 15, unitPrice: '₦8,000', used: 20, minStock: 12, lastUsed: '5 days ago', status: 'In Stock', icon: Box, iconColor: '#10b981', iconBg: '#d1fae5' }
];

export const ordersData = [
  { id: 'ORD-2024-045', status: 'pending', vendor: 'Auto Parts Nigeria', total: '₦95,000', items: [ { name: 'Oxygen Sensor', qty: 5, price: '₦60,000' }, { name: 'Air Filter', qty: 10, price: '₦35,000' } ], orderedDate: 'Jan 14, 2026', expectedDate: 'Jan 18, 2026', payment: 'E-Wallet' },
  { id: 'ORD-2024-044', status: 'shipped', vendor: 'Premium Auto Supply', total: '₦140,000', items: [ { name: 'Brake Pads (Front)', qty: 8, price: '₦120,000' }, { name: 'Brake Fluid', qty: 10, price: '₦20,000' } ], orderedDate: 'Jan 12, 2026', expectedDate: 'Jan 15, 2026', payment: 'E-Wallet' },
  { id: 'ORD-2024-043', status: 'delivered', vendor: 'Oil Masters Ltd', total: '₦72,000', items: [ { name: 'Engine Oil (5W-30)', qty: 20, price: '₦72,000' } ], orderedDate: 'Jan 10, 2026', expectedDate: 'Jan 13, 2026', payment: 'E-Wallet' }
];

export const transactionData = [
  { id: 1, title: 'Parts Order - ORD-2024-045', time: 'Yesterday', amount: '₦95,000', type: 'debit', icon: ShoppingCart, iconColor: '#ef4444', iconBg: '#fee2e2' },
  { id: 2, title: 'Parts Order - ORD-2024-044', time: '3 days ago', amount: '₦140,000', type: 'debit', icon: ShoppingCart, iconColor: '#ef4444', iconBg: '#fee2e2' },
  { id: 3, title: 'Wallet Top-up', time: '4 days ago', amount: '+₦200,000', type: 'credit', icon: TrendingUp, iconColor: '#10b981', iconBg: '#d1fae5' },
  { id: 4, title: 'Parts Order - ORD-2024-043', time: '5 days ago', amount: '₦72,000', type: 'debit', icon: ShoppingCart, iconColor: '#ef4444', iconBg: '#fee2e2' }
];

// Analysis Data
export const metricIcons = {
  revenue: { icon: DollarSign, iconColor: '#10b981', iconBg: '#d1fae5' },
  services: { icon: Wrench, iconColor: '#3b82f6', iconBg: '#dbeafe' },
  customers: { icon: Users, iconColor: '#a855f7', iconBg: '#f3e8ff' },
  satisfaction: { icon: Star, iconColor: '#f59e0b', iconBg: '#fef3c7' }
};

export const ANALYSIS_DATA = {
  'This Week': {
    primaryMetrics: [
      { title: 'Revenue', value: '₦124.5k', change: '+18%', isPositive: true, ...metricIcons.revenue },
      { title: 'Services', value: '32', change: '+12%', isPositive: true, ...metricIcons.services },
      { title: 'Customers', value: '24', change: '+8%', isPositive: true, ...metricIcons.customers },
      { title: 'Satisfaction', value: '4.8/5.0', change: '+0.2', isPositive: true, ...metricIcons.satisfaction }
    ],
    weeklyPerformance: [
      { day: 'Mon', count: 4, rev: '₦29k' }, { day: 'Tue', count: 6, rev: '₦45k' }, { day: 'Wed', count: 5, rev: '₦39k' },
      { day: 'Thu', count: 7, rev: '₦52k' }, { day: 'Fri', count: 5, rev: '₦41k' }, { day: 'Sat', count: 8, rev: '₦68k' },
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
      { title: 'Avg Job Value', value: '₦3,890' }, { title: 'Labor Efficiency', value: '92%' },
      { title: 'Parts Used', value: '45' }, { title: 'ROI', value: '285%' }
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
      { title: 'Revenue', value: '₦485.0k', change: '+24%', isPositive: true, ...metricIcons.revenue },
      { title: 'Services', value: '128', change: '+15%', isPositive: true, ...metricIcons.services },
      { title: 'Customers', value: '86', change: '+22%', isPositive: true, ...metricIcons.customers },
      { title: 'Satisfaction', value: '4.7/5.0', change: '+0.1', isPositive: true, ...metricIcons.satisfaction }
    ],
    weeklyPerformance: [],
    serviceBreakdown: [
      { name: 'Engine Diagnostics', percent: 38, services: '12 services', rev: '₦340k' },
      { name: 'Brake Service', percent: 25, services: '8 services', rev: '₦180k' },
      { name: 'Oil Change', percent: 19, services: '6 services', rev: '₦72k' },
      { name: 'Full Service', percent: 12, services: '4 services', rev: '₦140k' },
      { name: 'Other', percent: 6, services: '2 services', rev: '₦48k' }
    ],
    businessMetrics: [
      { title: 'Avg Job Value', value: '₦3,789' }, { title: 'Labor Efficiency', value: '89%' },
      { title: 'Parts Used', value: '182' }, { title: 'ROI', value: '312%' }
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
      { title: 'Revenue', value: '₦5240.0k', change: '+32%', isPositive: true, ...metricIcons.revenue },
      { title: 'Services', value: '1456', change: '+28%', isPositive: true, ...metricIcons.services },
      { title: 'Customers', value: '412', change: '+35%', isPositive: true, ...metricIcons.customers },
      { title: 'Satisfaction', value: '4.6/5.0', change: '+0.3', isPositive: true, ...metricIcons.satisfaction }
    ],
    weeklyPerformance: [],
    serviceBreakdown: [
      { name: 'Engine Diagnostics', percent: 38, services: '12 services', rev: '₦340k' },
      { name: 'Brake Service', percent: 25, services: '8 services', rev: '₦180k' },
      { name: 'Oil Change', percent: 19, services: '6 services', rev: '₦72k' },
      { name: 'Full Service', percent: 12, services: '4 services', rev: '₦140k' },
      { name: 'Other', percent: 6, services: '2 services', rev: '₦48k' }
    ],
    businessMetrics: [
      { title: 'Avg Job Value', value: '₦3,599' }, { title: 'Labor Efficiency', value: '87%' },
      { title: 'Parts Used', value: '2048' }, { title: 'ROI', value: '298%' }
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

// Settings Data
export const settingsTabs = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'account', label: 'Account', icon: Lock },
  { id: 'notifications', label: 'Notifications', icon: BellRing },
  { id: 'business', label: 'Business', icon: Briefcase },
  { id: 'payment', label: 'Payment', icon: CreditCard },
  { id: 'integrations', label: 'Integrations', icon: Plug },
  { id: 'appearance', label: 'Appearance', icon: Palette }
];
