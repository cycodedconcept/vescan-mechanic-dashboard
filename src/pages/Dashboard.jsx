import React from 'react';
import { 
  LayoutDashboard, 
  Wrench, 
  Wallet, 
  Users, 
  Car, 
  Package, 
  ShoppingCart, 
  BarChart2, 
  LogOut, 
  Settings,
  Bell,
  Clock,
  CheckCircle2,
  AlertTriangle,
  ChevronRight,
  Menu
} from 'lucide-react';

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="d-flex min-vh-100 bg-light">
      {/* Sidebar */}
      {isSidebarOpen && (
        <aside className="d-flex flex-column text-white p-3" style={{ width: '280px', backgroundColor: '#001F3F' }}>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h4 className="fw-bold mb-0">Vescan</h4>
              <small className="text-white-50">Mechanic Dashboard</small>
            </div>
            <button onClick={toggleSidebar} className="btn btn-link text-white p-0">
              <Menu size={24} />
            </button>
          </div>

        <nav className="nav nav-pills flex-column flex-grow-1 gap-2">
          <a href="#" className="nav-link active d-flex align-items-center gap-3 bg-white text-primary fw-medium">
            <LayoutDashboard size={20} />
            Dashboard
          </a>
          <a href="#" className="nav-link d-flex align-items-center gap-3 text-white opacity-75 hover-opacity-100">
            <Wrench size={20} />
            Services
            <span className="badge bg-danger ms-auto">8</span>
          </a>
          <a href="#" className="nav-link d-flex align-items-center gap-3 text-white opacity-75 hover-opacity-100">
            <Wallet size={20} />
            Financial
          </a>
          <a href="#" className="nav-link d-flex align-items-center gap-3 text-white opacity-75 hover-opacity-100">
            <Users size={20} />
            Customers
          </a>
          <a href="#" className="nav-link d-flex align-items-center gap-3 text-white opacity-75 hover-opacity-100">
            <Car size={20} />
            Vehicles
          </a>
          <a href="#" className="nav-link d-flex align-items-center gap-3 text-white opacity-75 hover-opacity-100">
            <Package size={20} />
            Inventory
            <span className="badge bg-danger ms-auto">3</span>
          </a>
          <a href="#" className="nav-link d-flex align-items-center gap-3 text-white opacity-75 hover-opacity-100">
            <ShoppingCart size={20} />
            E-Commerce
          </a>
          <a href="#" className="nav-link d-flex align-items-center gap-3 text-white opacity-75 hover-opacity-100">
            <BarChart2 size={20} />
            Analytics
          </a>
        </nav>

        <div className="mt-auto pt-4 border-top border-white-50">
          <div className="d-flex align-items-center gap-3 mb-3 px-2">
            <div className="bg-white text-primary rounded-circle d-flex align-items-center justify-content-center fw-bold" style={{ width: '40px', height: '40px' }}>
              JD
            </div>
            <div className="d-flex flex-column">
              <span className="fw-medium">John Doe</span>
              <small className="text-white-50">Master Mechanic</small>
            </div>
          </div>
          <a href="#" className="nav-link d-flex align-items-center gap-3 text-white opacity-75 hover-opacity-100 mb-2">
            <Settings size={20} />
            Settings
          </a>
          <a href="#" className="nav-link d-flex align-items-center gap-3 text-white opacity-75 hover-opacity-100">
            <LogOut size={20} />
            Logout
          </a>
        </div>
      </aside>
      )}

      {/* Main Content */}
      <main className="flex-grow-1 p-4 overflow-auto" style={{ maxHeight: '100vh' }}>
        {/* Header */}
        <header className="d-flex justify-content-between align-items-center mb-4">
          <div className="d-flex align-items-center gap-3">
            {!isSidebarOpen && (
              <button onClick={toggleSidebar} className="btn btn-link text-dark p-0 me-2">
                <Menu size={24} />
              </button>
            )}
            <div>
              <h2 className="fw-bold mb-1">Dashboard Overview</h2>
              <p className="text-secondary mb-0">Manage your business operations</p>
            </div>
          </div>
          <div className="d-flex align-items-center gap-3">
            <button className="btn btn-link text-secondary p-0 position-relative">
              <Bell size={24} />
              <span className="position-absolute top-0 start-100 translate-middle p-1 bg-danger border border-light rounded-circle">
                <span className="visually-hidden">New alerts</span>
              </span>
            </button>
            <div className="bg-dark text-white rounded-circle d-flex align-items-center justify-content-center fw-bold" style={{ width: '40px', height: '40px' }}>
              JD
            </div>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="row g-4 mb-4">
          <div className="col-md-3">
            <div className="card border-0 shadow-sm h-100 p-3">
              <div className="d-flex align-items-start justify-content-between mb-3">
                <div className="bg-primary bg-opacity-10 p-3 rounded-3 text-primary">
                  <Clock size={24} />
                </div>
              </div>
              <h3 className="fw-bold mb-1">8</h3>
              <p className="text-secondary mb-0">Active Jobs</p>
              <small className="text-success">+2 today</small>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card border-0 shadow-sm h-100 p-3">
              <div className="d-flex align-items-start justify-content-between mb-3">
                <div className="bg-success bg-opacity-10 p-3 rounded-3 text-success">
                  <CheckCircle2 size={24} />
                </div>
              </div>
              <h3 className="fw-bold mb-1">5</h3>
              <p className="text-secondary mb-0">Completed Today</p>
              <small className="text-secondary">3 pending payment</small>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card border-0 shadow-sm h-100 p-3">
              <div className="d-flex align-items-start justify-content-between mb-3">
                <div className="bg-info bg-opacity-10 p-3 rounded-3 text-info">
                  <Wallet size={24} />
                </div>
              </div>
              <h3 className="fw-bold mb-1">₦45,230</h3>
              <p className="text-secondary mb-0">Wallet Balance</p>
              <small className="text-secondary">+₦12,400 this week</small>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card border-0 shadow-sm h-100 p-3">
              <div className="d-flex align-items-start justify-content-between mb-3">
                <div className="bg-warning bg-opacity-10 p-3 rounded-3 text-warning">
                  <AlertTriangle size={24} />
                </div>
              </div>
              <h3 className="fw-bold mb-1">3</h3>
              <p className="text-secondary mb-0">Diagnostic Alerts</p>
              <small className="text-secondary">New from users</small>
            </div>
          </div>
        </div>

        {/* Diagnostic Alerts */}
        <div className="card border-0 shadow-sm mb-4">
          <div className="card-header bg-white border-0 py-3 d-flex justify-content-between align-items-center">
            <div>
              <h5 className="fw-bold mb-1">Diagnostic Alerts</h5>
              <p className="text-secondary mb-0 small">Real-time error codes from users</p>
            </div>
            <button className="btn btn-link text-decoration-none text-secondary">View All</button>
          </div>
          <div className="card-body">
            <div className="vstack gap-3">
              {/* Alert Item 1 */}
              <div className="p-3 border rounded-3 bg-light bg-opacity-50">
                <div className="d-flex justify-content-between mb-2">
                  <div className="d-flex gap-3">
                    <div className="bg-danger bg-opacity-10 p-2 rounded text-danger h-auto align-self-start">
                      <AlertTriangle size={20} />
                    </div>
                    <div>
                      <h6 className="fw-bold mb-1">2020 Toyota Camry</h6>
                      <p className="text-secondary small mb-2">John Adeyemi</p>
                      <div className="d-flex gap-2 align-items-center">
                        <span className="badge bg-secondary bg-opacity-10 text-secondary">P0420</span>
                        <span className="badge bg-danger bg-opacity-10 text-danger">Urgent</span>
                      </div>
                      <p className="text-secondary small mt-2 mb-0">Catalyst System Efficiency Below Threshold</p>
                    </div>
                  </div>
                  <small className="text-secondary">15 mins ago</small>
                </div>
                <div className="d-flex gap-2 mt-3 ps-5">
                  <button className="btn btn-primary flex-grow-1" style={{ backgroundColor: '#001F3F' }}>Respond</button>
                  <button className="btn btn-outline-secondary">Details</button>
                </div>
              </div>

              {/* Alert Item 2 */}
              <div className="p-3 border rounded-3 bg-light bg-opacity-50">
                <div className="d-flex justify-content-between mb-2">
                  <div className="d-flex gap-3">
                    <div className="bg-warning bg-opacity-10 p-2 rounded text-warning h-auto align-self-start">
                      <AlertTriangle size={20} />
                    </div>
                    <div>
                      <h6 className="fw-bold mb-1">2019 Honda Accord</h6>
                      <p className="text-secondary small mb-2">Sarah Ibrahim</p>
                      <div className="d-flex gap-2 align-items-center">
                        <span className="badge bg-secondary bg-opacity-10 text-secondary">P0171</span>
                      </div>
                      <p className="text-secondary small mt-2 mb-0">System Too Lean (Bank 1)</p>
                    </div>
                  </div>
                  <small className="text-secondary">1 hour ago</small>
                </div>
                <div className="d-flex gap-2 mt-3 ps-5">
                  <button className="btn btn-primary flex-grow-1" style={{ backgroundColor: '#001F3F' }}>Respond</button>
                  <button className="btn btn-outline-secondary">Details</button>
                </div>
              </div>

              {/* Alert Item 3 */}
              <div className="p-3 border rounded-3 bg-light bg-opacity-50">
                <div className="d-flex justify-content-between mb-2">
                  <div className="d-flex gap-3">
                    <div className="bg-danger bg-opacity-10 p-2 rounded text-danger h-auto align-self-start">
                      <AlertTriangle size={20} />
                    </div>
                    <div>
                      <h6 className="fw-bold mb-1">2021 Lexus ES</h6>
                      <p className="text-secondary small mb-2">David Okonkwo</p>
                      <div className="d-flex gap-2 align-items-center">
                        <span className="badge bg-secondary bg-opacity-10 text-secondary">P0300</span>
                        <span className="badge bg-danger bg-opacity-10 text-danger">Urgent</span>
                      </div>
                      <p className="text-secondary small mt-2 mb-0">Random/Multiple Cylinder Misfire Detected</p>
                    </div>
                  </div>
                  <small className="text-secondary">2 hours ago</small>
                </div>
                <div className="d-flex gap-2 mt-3 ps-5">
                  <button className="btn btn-primary flex-grow-1" style={{ backgroundColor: '#001F3F' }}>Respond</button>
                  <button className="btn btn-outline-secondary">Details</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Upcoming Appointments */}
        <div className="card border-0 shadow-sm mb-4">
          <div className="card-header bg-white border-0 py-3 d-flex justify-content-between align-items-center">
            <div>
              <h5 className="fw-bold mb-1">Upcoming Appointments</h5>
              <p className="text-secondary mb-0 small">Next 24 hours</p>
            </div>
            <button className="btn btn-link text-decoration-none text-secondary">View All</button>
          </div>
          <div className="card-body p-0">
            <div className="list-group list-group-flush">
              <div className="list-group-item p-3 d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center gap-3">
                  <div className="bg-primary bg-opacity-10 p-2 rounded-circle text-primary">
                    <Clock size={20} />
                  </div>
                  <div>
                    <h6 className="fw-bold mb-0">Mary Johnson</h6>
                    <small className="text-secondary">2018 Mercedes C-Class</small>
                    <div className="small text-secondary mt-1">
                      Full Service • Today, 2:00 PM
                    </div>
                  </div>
                </div>
                <span className="badge bg-success bg-opacity-10 text-success">confirmed</span>
              </div>
              <div className="list-group-item p-3 d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center gap-3">
                  <div className="bg-primary bg-opacity-10 p-2 rounded-circle text-primary">
                    <Clock size={20} />
                  </div>
                  <div>
                    <h6 className="fw-bold mb-0">Peter Obi</h6>
                    <small className="text-secondary">2020 BMW X5</small>
                    <div className="small text-secondary mt-1">
                      Brake Inspection • Today, 4:30 PM
                    </div>
                  </div>
                </div>
                <span className="badge bg-success bg-opacity-10 text-success">confirmed</span>
              </div>
              <div className="list-group-item p-3 d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center gap-3">
                  <div className="bg-primary bg-opacity-10 p-2 rounded-circle text-primary">
                    <Clock size={20} />
                  </div>
                  <div>
                    <h6 className="fw-bold mb-0">Grace Eze</h6>
                    <small className="text-secondary">2019 Audi A4</small>
                    <div className="small text-secondary mt-1">
                      Oil Change • Tomorrow, 10:00 AM
                    </div>
                  </div>
                </div>
                <span className="badge bg-warning bg-opacity-10 text-warning">pending</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons Grid */}
        <div className="row g-4">
          <div className="col-md-3">
            <button className="btn btn-info text-white w-100 p-4 d-flex flex-column align-items-center justify-content-center gap-2 border-0" style={{ backgroundColor: '#00BFFF' }}>
              <Package size={24} />
              <span className="fw-medium">Order Parts</span>
            </button>
          </div>
          <div className="col-md-3">
            <button className="btn btn-white w-100 p-4 d-flex flex-column align-items-center justify-content-center gap-2 border shadow-sm bg-white">
              <BarChart2 size={24} />
              <span className="fw-medium">View Reports</span>
            </button>
          </div>
          <div className="col-md-3">
            <button className="btn btn-white w-100 p-4 d-flex flex-column align-items-center justify-content-center gap-2 border shadow-sm bg-white">
              <Clock size={24} />
              <span className="fw-medium">Schedule Service</span>
            </button>
          </div>
          <div className="col-md-3">
            <button className="btn btn-white w-100 p-4 d-flex flex-column align-items-center justify-content-center gap-2 border shadow-sm bg-white">
              <Users size={24} />
              <span className="fw-medium">Manage Customers</span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
