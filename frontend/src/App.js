import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './App.css';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// PULSE Logo Component - Exact from screenshots
const PulseLogo = ({ size = "large" }) => {
  return (
    <div className="flex items-center">
      <div className={`${size === "large" ? "w-12 h-12" : "w-8 h-8"} bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center relative`}>
        {/* Heart with pulse line */}
        <svg className={`${size === "large" ? "w-7 h-7" : "w-5 h-5"} text-gray-900`} fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
        </svg>
        {/* Pulse line */}
        <div className="absolute -right-1 top-1/2 w-6 h-0.5 bg-yellow-400 transform -translate-y-1/2">
          <div className="w-2 h-2 bg-yellow-400 rounded-full absolute -right-1 -top-0.5"></div>
        </div>
      </div>
      <span className={`${size === "large" ? "text-4xl" : "text-2xl"} font-bold text-white ml-4`}>
        PULSE
      </span>
    </div>
  );
};

// Main Header Component - Dealer Portal
const DealerHeader = () => {
  const [selectedDealership, setSelectedDealership] = useState("Sample Dealership");
  
  return (
    <header className="bg-gray-900 border-b border-gray-700">
      <div className="max-w-full px-6 py-4">
        <div className="flex justify-between items-center">
          {/* PULSE Logo */}
          <PulseLogo size="small" />
          
          {/* Main Navigation */}
          <nav className="flex space-x-8">
            <Link to="/inventory" className="text-yellow-400 font-semibold text-lg border-b-2 border-yellow-400 pb-1">
              INVENTORY
            </Link>
            <Link to="/leads" className="text-gray-300 hover:text-white font-semibold text-lg">
              LEADS
            </Link>
            <Link to="/reports" className="text-gray-300 hover:text-white font-semibold text-lg">
              REPORTS
            </Link>
            <Link to="/tools" className="text-gray-300 hover:text-white font-semibold text-lg">
              TOOLS
            </Link>
          </nav>

          {/* Dealership Selector */}
          <div className="relative">
            <select 
              value={selectedDealership}
              onChange={(e) => setSelectedDealership(e.target.value)}
              className="bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            >
              <option>Sample Dealership</option>
              <option>Premier Auto Group</option>
              <option>Elite Motors</option>
              <option>Apex Auto Sales</option>
            </select>
          </div>
        </div>
      </div>
    </header>
  );
};

// Inventory Page - Main dealer interface
const InventoryPage = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'table'

  useEffect(() => {
    // Mock vehicle data matching your screenshots
    const mockVehicles = [
      {
        id: 1,
        year: 2019,
        make: 'Ford',
        model: 'Explorer',
        price: 33000,
        mileage: 10000,
        status: 'Available',
        image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=300&h=200&fit=crop'
      },
      {
        id: 2,
        year: 2018,
        make: 'Honda',
        model: 'Accord',
        price: 28000,
        mileage: 10000,
        status: 'Available',
        image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=300&h=200&fit=crop'
      },
      {
        id: 3,
        year: 2020,
        make: 'Chevrolet',
        model: 'Silverado 1500',
        price: 42000,
        mileage: 25000,
        status: 'Available',
        image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=300&h=200&fit=crop'
      },
      {
        id: 4,
        year: 2019,
        make: 'BMW',
        model: '3 Series',
        price: 33000,
        mileage: 10000,
        status: 'Available',
        image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=300&h=200&fit=crop'
      },
      {
        id: 5,
        year: 2021,
        make: 'Honda',
        model: 'Accord',
        price: 28000,
        mileage: 10000,
        status: 'Available',
        image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=300&h=200&fit=crop'
      },
      {
        id: 6,
        year: 2018,
        make: 'Ford',
        model: 'F-150',
        price: 42000,
        mileage: 25000,
        status: 'Available',
        image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=300&h=200&fit=crop'
      }
    ];
    
    setTimeout(() => {
      setVehicles(mockVehicles);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900">
        <DealerHeader />
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-yellow-400 mb-4"></div>
            <p className="text-white text-xl">Loading inventory...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <DealerHeader />
      
      <div className="max-w-full px-6 py-8">
        {/* Page Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-white">Inventory</h1>
          <button className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold px-6 py-3 rounded-lg flex items-center">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Add Vehicle
          </button>
        </div>

        {/* Search and Filters */}
        <div className="bg-gray-800 rounded-lg p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <input 
              type="text" 
              placeholder="Keyword"
              className="bg-gray-700 text-white px-4 py-3 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            <select className="bg-gray-700 text-white px-4 py-3 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400">
              <option>All Years</option>
              <option>2024</option>
              <option>2023</option>
              <option>2022</option>
              <option>2021</option>
              <option>2020</option>
              <option>2019</option>
              <option>2018</option>
            </select>
            <select className="bg-gray-700 text-white px-4 py-3 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400">
              <option>All Makes</option>
              <option>Ford</option>
              <option>Honda</option>
              <option>BMW</option>
              <option>Chevrolet</option>
              <option>Toyota</option>
            </select>
            <button className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold px-6 py-3 rounded-lg">
              Search
            </button>
          </div>
        </div>

        {/* View Toggle */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex space-x-2">
            <button 
              onClick={() => setViewMode('grid')}
              className={`px-4 py-2 rounded-lg font-medium ${viewMode === 'grid' ? 'bg-yellow-400 text-gray-900' : 'bg-gray-700 text-white hover:bg-gray-600'}`}
            >
              Grid View
            </button>
            <button 
              onClick={() => setViewMode('table')}
              className={`px-4 py-2 rounded-lg font-medium ${viewMode === 'table' ? 'bg-yellow-400 text-gray-900' : 'bg-gray-700 text-white hover:bg-gray-600'}`}
            >
              Table View
            </button>
          </div>
          <p className="text-gray-400">{vehicles.length} vehicles found</p>
        </div>

        {/* Grid View */}
        {viewMode === 'grid' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {vehicles.map((vehicle) => (
              <div key={vehicle.id} className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                <div className="h-48 bg-gray-700">
                  <img 
                    src={vehicle.image} 
                    alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-bold text-white mb-2">
                    {vehicle.year} {vehicle.make} {vehicle.model}
                  </h3>
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold text-yellow-400">
                      ${vehicle.price.toLocaleString()}
                    </span>
                    <span className="text-gray-400 text-sm">
                      {vehicle.mileage.toLocaleString()} mi
                    </span>
                  </div>
                  <div className="mt-3">
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                      {vehicle.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Table View - Exact from your screenshot */}
        {viewMode === 'table' && (
          <div className="bg-gray-800 rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-700">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-300 uppercase tracking-wider">Photo</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-300 uppercase tracking-wider">Year</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-300 uppercase tracking-wider">Make & Model</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-300 uppercase tracking-wider">Price</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-300 uppercase tracking-wider">Mileage</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-300 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {vehicles.map((vehicle) => (
                    <tr key={vehicle.id} className="hover:bg-gray-700 cursor-pointer transition-colors">
                      <td className="px-6 py-4">
                        <img 
                          src={vehicle.image} 
                          alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
                          className="w-16 h-12 object-cover rounded"
                        />
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-white">{vehicle.year}</td>
                      <td className="px-6 py-4 text-sm font-medium text-white">{vehicle.make} {vehicle.model}</td>
                      <td className="px-6 py-4 text-sm font-bold text-yellow-400">${vehicle.price.toLocaleString()}</td>
                      <td className="px-6 py-4 text-sm text-gray-300">{vehicle.mileage.toLocaleString()} miles</td>
                      <td className="px-6 py-4">
                        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                          {vehicle.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Customer Find Your Next Car Page
const FindYourNextCarPage = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <header className="bg-gray-900 border-b border-gray-700 px-6 py-4">
        <div className="flex justify-between items-center">
          <PulseLogo size="small" />
          <nav className="flex space-x-6">
            <Link to="/" className="text-white font-medium">Inventory</Link>
            <Link to="/repair-shops" className="text-gray-400 hover:text-white">Repair Shops</Link>
            <Link to="/admin" className="text-gray-400 hover:text-white">E7.50 Login</Link>
          </nav>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-6">Find Your Next Car</h1>
        </div>

        {/* Search Form */}
        <div className="max-w-4xl mx-auto bg-white rounded-2xl p-8 shadow-xl mb-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div>
              <input 
                type="text" 
                placeholder="Keywords"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>
            <div>
              <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400">
                <option>All Makes</option>
                <option>Ford</option>
                <option>Honda</option>
                <option>BMW</option>
                <option>Toyota</option>
              </select>
            </div>
            <div>
              <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400">
                <option>All Models</option>
                <option>Accord</option>
                <option>F-150</option>
                <option>Camry</option>
                <option>3 Series</option>
              </select>
            </div>
            <div>
              <button className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-3 px-6 rounded-lg">
                Search
              </button>
            </div>
          </div>
        </div>

        {/* Featured Vehicles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl overflow-hidden shadow-lg">
            <div className="h-48 bg-gray-200"></div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">2020 Ford Fusion SE</h3>
              <p className="text-gray-600 mb-2">Centerprise Auto Credit</p>
              <p class="text-gray-600">Clark Nissan</p>
              <div className="mt-4">
                <span className="text-2xl font-bold text-gray-900">$18,500</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl overflow-hidden shadow-lg">
            <div className="h-48 bg-gray-200"></div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">2019 Honda CR-V EX</h3>
              <p className="text-gray-600 mb-2">AutoPlaza</p>
              <p class="text-gray-600">Adventure</p>
              <div className="mt-4">
                <span className="text-2xl font-bold text-gray-900">$24,800</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl overflow-hidden shadow-lg">
            <div className="h-48 bg-gray-200"></div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">2019 Chevrolet Equinox LT</h3>
              <p className="text-gray-600 mb-2">Centerprise</p>
              <p class="text-gray-600">Adventure</p>
              <div className="mt-4">
                <span className="text-2xl font-bold text-gray-900">$32,000</span>
              </div>
            </div>
          </div>
        </div>

        {/* Vehicle Details Panel */}
        <div className="mt-12 bg-white rounded-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Vehicle Details</h2>
          <p className="text-gray-600">Select a vehicle above to view detailed information, photos, and dealer contact details.</p>
        </div>
      </div>
    </div>
  );
};

// Desking Tool Page - Exact from screenshot
const DeskingToolPage = () => {
  const [salePrice, setSalePrice] = useState(18500);
  const [tax, setTax] = useState(1170);
  const [addOns, setAddOns] = useState(2299);
  const [vehicleServiceContract, setVehicleServiceContract] = useState(2299);
  const [gapInsurance, setGapInsurance] = useState(789);

  const total = salePrice + tax + addOns + vehicleServiceContract + gapInsurance;
  const monthlyPayment = 426.3;

  return (
    <div className="min-h-screen bg-gray-900">
      <DealerHeader />
      
      <div className="max-w-4xl mx-auto px-6 py-8">
        <h1 className="text-4xl font-bold text-white mb-8">Desking Tool</h1>
        
        <div className="bg-gray-800 rounded-lg p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Left Column - Pricing Details */}
            <div className="space-y-6">
              <div>
                <label className="block text-white font-medium mb-2">Sale Price</label>
                <input 
                  type="number" 
                  value={salePrice}
                  onChange={(e) => setSalePrice(Number(e.target.value))}
                  className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
              </div>

              <div>
                <label className="block text-white font-medium mb-2">Tax</label>
                <div className="flex justify-between items-center">
                  <span className="text-white">Tax</span>
                  <span className="text-white font-bold">${tax.toLocaleString()}</span>
                </div>
              </div>

              <div>
                <label className="block text-white font-medium mb-2">Add-on</label>
                <div className="flex justify-between items-center">
                  <span className="text-white">Add-on</span>
                  <span className="text-white font-bold">${addOns.toLocaleString()}</span>
                </div>
              </div>

              <div>
                <label className="block text-white font-medium mb-2">Vehicle Service Contract</label>
                <div className="flex justify-between items-center">
                  <span className="text-white">Vehicle Service Contract</span>
                  <span className="text-white font-bold">${vehicleServiceContract.toLocaleString()}</span>
                </div>
              </div>

              <div>
                <label className="block text-white font-medium mb-2">GAP Insurance</label>
                <div className="flex justify-between items-center">
                  <span className="text-white">GAP Insurance</span>
                  <span className="text-white font-bold">${gapInsurance}</span>
                </div>
              </div>

              <div className="border-t border-gray-600 pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-white text-xl font-bold">Total</span>
                  <span className="text-yellow-400 text-2xl font-bold">${total.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Right Column - Monthly Payment */}
            <div className="space-y-6">
              <div className="bg-gray-700 rounded-lg p-6">
                <h3 className="text-white text-xl font-bold mb-4">Monthly</h3>
                <div className="text-center">
                  <span className="text-yellow-400 text-4xl font-bold">${monthlyPayment}</span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-400">Sale Price</span>
                  <span className="text-white">${salePrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Tax</span>
                  <span className="text-white">${tax}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Add-on</span>
                  <span className="text-white">${addOns.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Vehicle Service Contract</span>
                  <span className="text-white">${vehicleServiceContract.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">GAP Insurance</span>
                  <span className="text-white">${gapInsurance}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main App Component
function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<InventoryPage />} />
          <Route path="/inventory" element={<InventoryPage />} />
          <Route path="/find-your-car" element={<FindYourNextCarPage />} />
          <Route path="/desking-tool" element={<DeskingToolPage />} />
          <Route path="/leads" element={<div className="min-h-screen bg-gray-900 flex items-center justify-center"><h1 className="text-white text-4xl">Leads Page - Coming Soon</h1></div>} />
          <Route path="/reports" element={<div className="min-h-screen bg-gray-900 flex items-center justify-center"><h1 className="text-white text-4xl">Reports Page - Coming Soon</h1></div>} />
          <Route path="/tools" element={<DeskingToolPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;