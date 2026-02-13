
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
