import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './App.css';

// Import Components
import DeskingTool from './components/DeskingTool';
import LeadsManagement from './components/LeadsManagement';
import CreditApplication from './components/CreditApplication';

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
const DealerHeader = ({ activePage = "inventory" }) => {
  const [selectedDealership, setSelectedDealership] = useState("Sample Dealership");
  
  return (
    <header className="bg-gray-900 border-b border-gray-700">
      <div className="max-w-full px-6 py-4">
        <div className="flex justify-between items-center">
          {/* PULSE Logo */}
          <PulseLogo size="small" />
          
          {/* Main Navigation */}
          <nav className="flex space-x-8">
            <Link to="/inventory" className={`font-semibold text-lg pb-1 ${activePage === 'inventory' ? 'text-yellow-400 border-b-2 border-yellow-400' : 'text-gray-300 hover:text-white'}`}>
              INVENTORY
            </Link>
            <Link to="/leads" className={`font-semibold text-lg pb-1 ${activePage === 'leads' ? 'text-yellow-400 border-b-2 border-yellow-400' : 'text-gray-300 hover:text-white'}`}>
              LEADS
            </Link>
            <Link to="/reports" className={`font-semibold text-lg pb-1 ${activePage === 'reports' ? 'text-yellow-400 border-b-2 border-yellow-400' : 'text-gray-300 hover:text-white'}`}>
              REPORTS
            </Link>
            <Link to="/tools" className={`font-semibold text-lg pb-1 ${activePage === 'tools' ? 'text-yellow-400 border-b-2 border-yellow-400' : 'text-gray-300 hover:text-white'}`}>
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

// Vehicle Modal Component
const VehicleModal = ({ vehicle, isOpen, onClose }) => {
  if (!isOpen || !vehicle) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" onClick={onClose}></div>
        
        <div className="inline-block w-full max-w-4xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-gray-800 shadow-xl rounded-2xl">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-white">
              {vehicle.year} {vehicle.make} {vehicle.model}
            </h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white text-2xl"
            >
              ×
            </button>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Image Section */}
            <div>
              <div className="bg-gray-700 rounded-lg h-64 flex items-center justify-center mb-4">
                <svg className="w-24 h-24 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 9l-1.26-3.78A2 2 0 0 0 15.84 4H8.16a2 2 0 0 0-1.9 1.22L5 9H3v11a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-1h12v1a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1V9h-2zM7.5 17a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm9 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zM7 9l.84-2.52A1 1 0 0 1 8.78 6h6.44a1 1 0 0 1 .94.48L17 9H7z"/>
                </svg>
              </div>
              <p className="text-gray-400 text-sm text-center">Real dealer photos will display here</p>
            </div>
            
            {/* Details Section */}
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-400 text-sm">Price</p>
                  <p className="text-yellow-400 text-2xl font-bold">${vehicle.price?.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Mileage</p>
                  <p className="text-white font-semibold">{vehicle.mileage?.toLocaleString()} miles</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Status</p>
                  <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                    {vehicle.status}
                  </span>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Stock #</p>
                  <p className="text-white">{vehicle.stock_number || 'N/A'}</p>
                </div>
              </div>
              
              <div className="space-y-3 pt-4">
                <h4 className="text-lg font-bold text-white">Vehicle Details</h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Year:</span>
                    <span className="text-white">{vehicle.year}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Make:</span>
                    <span className="text-white">{vehicle.make}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Model:</span>
                    <span className="text-white">{vehicle.model}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Trim:</span>
                    <span className="text-white">{vehicle.trim || 'N/A'}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-3 pt-4">
                <Link 
                  to={`/desking-tool?vehicle=${vehicle.id}`}
                  className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-3 px-4 rounded-lg text-center"
                >
                  Start Deal
                </Link>
                <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg">
                  Edit Vehicle
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Add Vehicle Modal Component
const AddVehicleModal = ({ isOpen, onClose, onVehicleAdded }) => {
  const [formData, setFormData] = useState({
    year: '',
    make: '',
    model: '',
    trim: '',
    mileage: '',
    price: '',
    cost: '',
    exterior_color: '',
    interior_color: '',
    transmission: '',
    fuel_type: '',
    drivetrain: '',
    engine: '',
    stock_number: '',
    description: '',
    vin: '',
    dealer_id: 'sample-dealer-1',
    dealer_name: 'Sample Dealership'
  });

  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    
    try {
      const response = await axios.post(`${API}/vehicles`, formData);
      onVehicleAdded(response.data);
      onClose();
      setFormData({
        year: '', make: '', model: '', trim: '', mileage: '', price: '', cost: '',
        exterior_color: '', interior_color: '', transmission: '', fuel_type: '',
        drivetrain: '', engine: '', stock_number: '', description: '', vin: '',
        dealer_id: 'sample-dealer-1', dealer_name: 'Sample Dealership'
      });
    } catch (error) {
      console.error('Error adding vehicle:', error);
      alert('Error adding vehicle. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" onClick={onClose}></div>
        
        <div className="inline-block w-full max-w-4xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-gray-800 shadow-xl rounded-2xl max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-white">Add New Vehicle</h3>
            <button onClick={onClose} className="text-gray-400 hover:text-white text-2xl">×</button>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">VIN</label>
                <input
                  type="text"
                  value={formData.vin}
                  onChange={(e) => setFormData({...formData, vin: e.target.value})}
                  className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Stock Number</label>
                <input
                  type="text"
                  value={formData.stock_number}
                  onChange={(e) => setFormData({...formData, stock_number: e.target.value})}
                  className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Year *</label>
                <input
                  type="number"
                  value={formData.year}
                  onChange={(e) => setFormData({...formData, year: e.target.value})}
                  required
                  className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Make *</label>
                <input
                  type="text"
                  value={formData.make}
                  onChange={(e) => setFormData({...formData, make: e.target.value})}
                  required
                  className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Model *</label>
                <input
                  type="text"
                  value={formData.model}
                  onChange={(e) => setFormData({...formData, model: e.target.value})}
                  required
                  className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Trim</label>
                <input
                  type="text"
                  value={formData.trim}
                  onChange={(e) => setFormData({...formData, trim: e.target.value})}
                  className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Mileage *</label>
                <input
                  type="number"
                  value={formData.mileage}
                  onChange={(e) => setFormData({...formData, mileage: e.target.value})}
                  required
                  className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Price *</label>
                <input
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({...formData, price: e.target.value})}
                  required
                  className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Cost</label>
                <input
                  type="number"
                  value={formData.cost}
                  onChange={(e) => setFormData({...formData, cost: e.target.value})}
                  className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Exterior Color</label>
                <input
                  type="text"
                  value={formData.exterior_color}
                  onChange={(e) => setFormData({...formData, exterior_color: e.target.value})}
                  className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Interior Color</label>
                <input
                  type="text"
                  value={formData.interior_color}
                  onChange={(e) => setFormData({...formData, interior_color: e.target.value})}
                  className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Transmission</label>
                <select
                  value={formData.transmission}
                  onChange={(e) => setFormData({...formData, transmission: e.target.value})}
                  className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                >
                  <option value="">Select Transmission</option>
                  <option value="Automatic">Automatic</option>
                  <option value="Manual">Manual</option>
                  <option value="CVT">CVT</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Fuel Type</label>
                <select
                  value={formData.fuel_type}
                  onChange={(e) => setFormData({...formData, fuel_type: e.target.value})}
                  className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                >
                  <option value="">Select Fuel Type</option>
                  <option value="Gasoline">Gasoline</option>
                  <option value="Diesel">Diesel</option>
                  <option value="Hybrid">Hybrid</option>
                  <option value="Electric">Electric</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Drivetrain</label>
                <select
                  value={formData.drivetrain}
                  onChange={(e) => setFormData({...formData, drivetrain: e.target.value})}
                  className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                >
                  <option value="">Select Drivetrain</option>
                  <option value="FWD">Front Wheel Drive</option>
                  <option value="RWD">Rear Wheel Drive</option>
                  <option value="AWD">All Wheel Drive</option>
                  <option value="4WD">Four Wheel Drive</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Engine</label>
                <input
                  type="text"
                  value={formData.engine}
                  onChange={(e) => setFormData({...formData, engine: e.target.value})}
                  placeholder="e.g., 2.4L I4"
                  className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                rows={3}
                className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400 resize-none"
              />
            </div>
            
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={onClose}
                className="bg-gray-600 hover:bg-gray-500 text-white font-bold py-3 px-6 rounded-lg"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-3 px-6 rounded-lg disabled:opacity-50"
              >
                {submitting ? 'Adding...' : 'Add Vehicle'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

// Inventory Page - Main dealer interface
const InventoryPage = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid');
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [showVehicleModal, setShowVehicleModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [filters, setFilters] = useState({
    keyword: '',
    year: '',
    make: ''
  });

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API}/vehicles`);
      setVehicles(response.data);
    } catch (error) {
      console.error('Error fetching vehicles:', error);
      // Mock vehicle data for demo
      setVehicles([
        { id: '1', year: 2019, make: 'Ford', model: 'Explorer', price: 33000, mileage: 10000, status: 'Available', trim: 'XLT' },
        { id: '2', year: 2018, make: 'Honda', model: 'Accord', price: 28000, mileage: 15000, status: 'Available', trim: 'EX' },
        { id: '3', year: 2020, make: 'Chevrolet', model: 'Silverado 1500', price: 42000, mileage: 25000, status: 'Available', trim: 'LT' },
        { id: '4', year: 2019, make: 'BMW', model: '3 Series', price: 33000, mileage: 18000, status: 'Available', trim: '330i' },
        { id: '5', year: 2021, make: 'Honda', model: 'Accord', price: 28000, mileage: 12000, status: 'Available', trim: 'Sport' },
        { id: '6', year: 2018, make: 'Ford', model: 'F-150', price: 42000, mileage: 35000, status: 'Available', trim: 'XLT' }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleVehicleClick = (vehicle) => {
    setSelectedVehicle(vehicle);
    setShowVehicleModal(true);
  };

  const handleVehicleAdded = (newVehicle) => {
    setVehicles([...vehicles, newVehicle]);
  };

  const filteredVehicles = vehicles.filter(vehicle => {
    return (
      (!filters.keyword || 
        vehicle.make.toLowerCase().includes(filters.keyword.toLowerCase()) ||
        vehicle.model.toLowerCase().includes(filters.keyword.toLowerCase())) &&
      (!filters.year || vehicle.year.toString() === filters.year) &&
      (!filters.make || vehicle.make.toLowerCase() === filters.make.toLowerCase())
    );
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900">
        <DealerHeader activePage="inventory" />
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
      <DealerHeader activePage="inventory" />
      
      <div className="max-w-full px-6 py-8">
        {/* Page Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-white">Inventory</h1>
          <button 
            onClick={() => setShowAddModal(true)}
            className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold px-6 py-3 rounded-lg flex items-center"
          >
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
              value={filters.keyword}
              onChange={(e) => setFilters({...filters, keyword: e.target.value})}
              className="bg-gray-700 text-white px-4 py-3 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            <select 
              value={filters.year}
              onChange={(e) => setFilters({...filters, year: e.target.value})}
              className="bg-gray-700 text-white px-4 py-3 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            >
              <option value="">All Years</option>
              <option value="2024">2024</option>
              <option value="2023">2023</option>
              <option value="2022">2022</option>
              <option value="2021">2021</option>
              <option value="2020">2020</option>
              <option value="2019">2019</option>
              <option value="2018">2018</option>
            </select>
            <select 
              value={filters.make}
              onChange={(e) => setFilters({...filters, make: e.target.value})}
              className="bg-gray-700 text-white px-4 py-3 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            >
              <option value="">All Makes</option>
              <option value="Ford">Ford</option>
              <option value="Honda">Honda</option>
              <option value="BMW">BMW</option>
              <option value="Chevrolet">Chevrolet</option>
              <option value="Toyota">Toyota</option>
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
          <p className="text-gray-400">{filteredVehicles.length} vehicles found</p>
        </div>

        {/* Grid View */}
        {viewMode === 'grid' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVehicles.map((vehicle) => (
              <div 
                key={vehicle.id} 
                onClick={() => handleVehicleClick(vehicle)}
                className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
              >
                <div className="h-48 bg-gray-700 flex items-center justify-center">
                  <svg className="w-20 h-20 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 9l-1.26-3.78A2 2 0 0 0 15.84 4H8.16a2 2 0 0 0-1.9 1.22L5 9H3v11a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-1h12v1a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1V9h-2zM7.5 17a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm9 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zM7 9l.84-2.52A1 1 0 0 1 8.78 6h6.44a1 1 0 0 1 .94.48L17 9H7z"/>
                  </svg>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-bold text-white mb-2">
                    {vehicle.year} {vehicle.make} {vehicle.model}
                  </h3>
                  {vehicle.trim && <p className="text-gray-400 text-sm mb-2">{vehicle.trim}</p>}
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold text-yellow-400">
                      ${vehicle.price?.toLocaleString()}
                    </span>
                    <span className="text-gray-400 text-sm">
                      {vehicle.mileage?.toLocaleString()} mi
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

        {/* Table View */}
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
                  {filteredVehicles.map((vehicle) => (
                    <tr 
                      key={vehicle.id} 
                      onClick={() => handleVehicleClick(vehicle)}
                      className="hover:bg-gray-700 cursor-pointer transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="w-16 h-12 bg-gray-600 rounded flex items-center justify-center">
                          <svg className="w-8 h-8 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M19 9l-1.26-3.78A2 2 0 0 0 15.84 4H8.16a2 2 0 0 0-1.9 1.22L5 9H3v11a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-1h12v1a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1V9h-2zM7.5 17a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm9 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zM7 9l.84-2.52A1 1 0 0 1 8.78 6h6.44a1 1 0 0 1 .94.48L17 9H7z"/>
                          </svg>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-white">{vehicle.year}</td>
                      <td className="px-6 py-4 text-sm font-medium text-white">
                        {vehicle.make} {vehicle.model}
                        {vehicle.trim && <div className="text-gray-400 text-xs">{vehicle.trim}</div>}
                      </td>
                      <td className="px-6 py-4 text-sm font-bold text-yellow-400">${vehicle.price?.toLocaleString()}</td>
                      <td className="px-6 py-4 text-sm text-gray-300">{vehicle.mileage?.toLocaleString()} miles</td>
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

      {/* Vehicle Details Modal */}
      <VehicleModal 
        vehicle={selectedVehicle}
        isOpen={showVehicleModal}
        onClose={() => setShowVehicleModal(false)}
      />

      {/* Add Vehicle Modal */}
      <AddVehicleModal 
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onVehicleAdded={handleVehicleAdded}
      />
    </div>
  );
};

// Reports Page Component
const ReportsPage = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await axios.get(`${API}/admin/stats`);
      setStats(response.data);
    } catch (error) {
      console.error('Error fetching stats:', error);
      // Mock data for demo
      setStats({
        vehicles: { total: 247, available: 198, sold: 49, average_price: 28500 },
        leads: { total: 89, new: 23 },
        deals: { total: 156, pending: 12 }
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900">
        <DealerHeader activePage="reports" />
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-yellow-400 mb-4"></div>
            <p className="text-white text-xl">Loading reports...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <DealerHeader activePage="reports" />
      
      <div className="max-w-full px-6 py-8">
        <h1 className="text-4xl font-bold text-white mb-8">Dashboard Reports</h1>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-800 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-400 mb-2">Total Vehicles</h3>
            <p className="text-3xl font-bold text-white">{stats?.vehicles?.total || 0}</p>
            <p className="text-green-400 text-sm">{stats?.vehicles?.available || 0} available</p>
          </div>
          
          <div className="bg-gray-800 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-400 mb-2">Active Leads</h3>
            <p className="text-3xl font-bold text-white">{stats?.leads?.total || 0}</p>
            <p className="text-blue-400 text-sm">{stats?.leads?.new || 0} new today</p>
          </div>
          
          <div className="bg-gray-800 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-400 mb-2">Total Deals</h3>
            <p className="text-3xl font-bold text-white">{stats?.deals?.total || 0}</p>
            <p className="text-yellow-400 text-sm">{stats?.deals?.pending || 0} pending</p>
          </div>
          
          <div className="bg-gray-800 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-400 mb-2">Avg Vehicle Price</h3>
            <p className="text-3xl font-bold text-white">${(stats?.vehicles?.average_price || 0).toLocaleString()}</p>
            <p className="text-green-400 text-sm">Market competitive</p>
          </div>
        </div>

        {/* Charts Placeholder */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-gray-800 rounded-xl p-6">
            <h3 className="text-xl font-bold text-white mb-4">Sales Performance</h3>
            <div className="h-64 bg-gray-700 rounded-lg flex items-center justify-center">
              <p className="text-gray-400">Sales chart will display here</p>
            </div>
          </div>
          
          <div className="bg-gray-800 rounded-xl p-6">
            <h3 className="text-xl font-bold text-white mb-4">Lead Sources</h3>
            <div className="h-64 bg-gray-700 rounded-lg flex items-center justify-center">
              <p className="text-gray-400">Lead sources chart will display here</p>
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
          <Route path="/leads" element={
            <div className="min-h-screen bg-gray-900">
              <DealerHeader activePage="leads" />
              <LeadsManagement />
            </div>
          } />
          <Route path="/reports" element={<ReportsPage />} />
          <Route path="/tools" element={
            <div className="min-h-screen bg-gray-900">
              <DealerHeader activePage="tools" />
              <div className="py-8">
                <DeskingTool />
              </div>
            </div>
          } />
          <Route path="/desking-tool" element={
            <div className="min-h-screen bg-gray-900">
              <DealerHeader activePage="tools" />
              <div className="py-8">
                <DeskingTool />
              </div>
            </div>
          } />
          <Route path="/credit-application" element={
            <div className="min-h-screen bg-gray-900">
              <DealerHeader />
              <div className="py-8">
                <CreditApplication />
              </div>
            </div>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;