import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import './App.css';

// Import Components
import DeskingTool from './components/DeskingTool';
import LeadsManagement from './components/LeadsManagement';
import CreditApplication from './components/CreditApplication';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// PULSE Logo Component - Just pulse symbol
const PulseLogo = ({ size = "large", showText = true }) => {
  return (
    <div className="flex items-center">
      <div className={`${size === "large" ? "w-12 h-12" : "w-8 h-8"} bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center relative`}>
        {/* Pulse/Heartbeat Symbol */}
        <svg className={`${size === "large" ? "w-7 h-7" : "w-5 h-5"} text-gray-900`} fill="currentColor" viewBox="0 0 24 24">
          <path d="M3 12h2l2-4 4 8 4-8 2 4h4" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      {showText && (
        <span className={`${size === "large" ? "text-4xl" : "text-2xl"} font-bold text-white ml-4`}>
          PULSE
        </span>
      )}
    </div>
  );
};

// Hamburger Menu Component
const HamburgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const menuItems = [
    { name: 'Home', path: '/' },
    { name: 'Inventory', path: '/customer-inventory' },
    { name: 'Service & Repair', path: '/repair-shops' },
    { name: 'Dealer Portal', path: '/dealer-portal' },
    { name: 'Admin', path: '/admin' }
  ];

  const handleMenuClick = (path) => {
    navigate(path);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      {/* Hamburger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex flex-col justify-center items-center w-8 h-8 space-y-1 text-white hover:text-yellow-400 transition-colors"
      >
        <div className={`w-6 h-0.5 bg-current transition-all ${isOpen ? 'rotate-45 translate-y-1.5' : ''}`}></div>
        <div className={`w-6 h-0.5 bg-current transition-all ${isOpen ? 'opacity-0' : ''}`}></div>
        <div className={`w-6 h-0.5 bg-current transition-all ${isOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></div>
      </button>

      {/* Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setIsOpen(false)}></div>
      )}

      {/* Menu Panel */}
      <div className={`fixed top-0 left-0 h-full w-80 bg-gray-900 border-r border-gray-700 transform transition-transform duration-300 ease-in-out z-50 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="p-6">
          {/* Logo in Menu */}
          <div className="flex items-center justify-between mb-8">
            <PulseLogo size="small" />
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-white text-2xl"
            >
              ×
            </button>
          </div>

          {/* Menu Items */}
          <nav className="space-y-4">
            {menuItems.map((item) => (
              <button
                key={item.name}
                onClick={() => handleMenuClick(item.path)}
                className="block w-full text-left text-white hover:text-yellow-400 hover:bg-gray-800 px-4 py-3 rounded-lg transition-colors font-medium"
              >
                {item.name}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
};

// Dealer Sidebar Component
const DealerSidebar = ({ activePage = "inventory" }) => {
  const navigate = useNavigate();
  
  const dealerMenuItems = [
    { 
      name: 'Inventory', 
      path: '/dealer-portal', 
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 9l-1.26-3.78A2 2 0 0 0 15.84 4H8.16a2 2 0 0 0-1.9 1.22L5 9H3v11a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-1h12v1a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1V9h-2zM7.5 17a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm9 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/>
        </svg>
      )
    },
    { 
      name: 'Leads', 
      path: '/dealer-leads', 
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M16 4v4l-4-4-4 4V4c0-1.1.9-2 2-2h4c1.1 0 2 .9 2 2zm4 4v12c0 1.1-.9 2-2 2H6c-1.1 0-2-.9-2-2V8c0-1.1.9-2 2-2h1v1c0 1.1.9 2 2 2h6c1.1 0 2-.9 2-2V6h1c1.1 0 2 .9 2 2z"/>
        </svg>
      )
    },
    { 
      name: 'Reports', 
      path: '/dealer-reports', 
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4zm2.5 2.25l1.41-1.41L15.5 12.5 13 15l-3.5-3.5L4 17V5h16v12.25z"/>
        </svg>
      )
    },
    { 
      name: 'Desking Tool', 
      path: '/dealer-tools', 
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-8 14H9v-2h2v2zm0-4H9v-2h2v2zm0-4H9V7h2v2zm4 8h-2v-2h2v2zm0-4h-2v-2h2v2zm0-4h-2V7h2v2z"/>
        </svg>
      )
    },
    { 
      name: 'Credit Apps', 
      path: '/credit-application', 
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 2 2h8c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>
        </svg>
      )
    },
    { 
      name: 'Settings', 
      path: '/dealer-settings', 
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.74,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.8,11.69,4.8,12s0.02,0.64,0.07,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z"/>
        </svg>
      )
    }
  ];

  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-gray-900 border-r border-gray-700 z-30">
      <div className="p-6">
        {/* Logo */}
        <div className="mb-8">
          <PulseLogo size="small" />
        </div>

        {/* Dealership Info */}
        <div className="mb-8 p-4 bg-gray-800 rounded-lg">
          <p className="text-yellow-400 font-bold text-sm">DEALERSHIP</p>
          <p className="text-white font-medium">Sample Dealership</p>
          <p className="text-gray-400 text-sm">Nashville, TN</p>
        </div>

        {/* Menu Items */}
        <nav className="space-y-2">
          {dealerMenuItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                activePage === item.name.toLowerCase().replace(' ', '-')
                  ? 'bg-yellow-400 text-gray-900'
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
              }`}
            >
              {item.icon}
              <span className="font-medium">{item.name}</span>
            </Link>
          ))}
        </nav>

        {/* Bottom Actions */}
        <div className="absolute bottom-6 left-6 right-6 space-y-2">
          <Link
            to="/"
            className="flex items-center justify-center space-x-2 px-4 py-3 bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white rounded-lg transition-colors"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
            </svg>
            <span>Back to Site</span>
          </Link>
          <button className="flex items-center justify-center space-x-2 w-full px-4 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5z"/>
            </svg>
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
};

// Customer Header Component
const CustomerHeader = () => {
  return (
    <header className="bg-gray-900 border-b border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Hamburger Menu */}
          <HamburgerMenu />
          
          {/* PULSE Logo - Center */}
          <div className="flex-1 flex justify-center">
            <PulseLogo size="small" />
          </div>
          
          {/* Right side - Dealer Login */}
          <div className="flex items-center space-x-4">
            <Link 
              to="/dealer-portal" 
              className="text-gray-300 hover:text-yellow-400 transition-colors font-medium text-sm whitespace-nowrap"
            >
              Dealer Login
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

// Dealer Header Component (for dealer portal pages)
const DealerHeader = ({ activePage = "inventory" }) => {
  return (
    <header className="bg-gray-900 border-b border-gray-700 ml-64">
      <div className="px-6 py-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white capitalize">
            {activePage.replace('-', ' ')}
          </h1>
          
          {/* User Info */}
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-white font-medium">John Dealer</p>
              <p className="text-gray-400 text-sm">Manager</p>
            </div>
            <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center">
              <span className="text-gray-900 font-bold">JD</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

// Customer Home Page
const CustomerHomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-900">
      <CustomerHeader />
      
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 min-h-screen flex items-center">
        {/* Background Image Overlay */}
        <div className="absolute inset-0 bg-black opacity-50"></div>
        
        {/* Hero Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Find Your Perfect
              <span className="text-yellow-400 block">Vehicle Today</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Browse thousands of quality pre-owned vehicles from trusted dealers across the nation. 
              Every vehicle comes with authentic dealer photos and detailed specifications.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl p-6 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Make</label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent">
                    <option>All Makes</option>
                    <option>Ford</option>
                    <option>Honda</option>
                    <option>Toyota</option>
                    <option>Chevrolet</option>
                    <option>BMW</option>
                    <option>Mercedes-Benz</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Model</label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent">
                    <option>All Models</option>
                    <option>F-150</option>
                    <option>Accord</option>
                    <option>Camry</option>
                    <option>Silverado</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Year</label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent">
                    <option>All Years</option>
                    <option>2024</option>
                    <option>2023</option>
                    <option>2022</option>
                    <option>2021</option>
                    <option>2020</option>
                    <option>2019</option>
                  </select>
                </div>
                <div className="flex items-end">
                  <button 
                    onClick={() => navigate('/customer-inventory')}
                    className="w-full bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold py-3 px-6 rounded-lg transition-colors"
                  >
                    Search Vehicles
                  </button>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => navigate('/customer-inventory')}
                className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 px-8 py-4 rounded-xl font-bold text-lg transition-colors shadow-lg"
              >
                Browse Inventory
              </button>
              <button 
                onClick={() => navigate('/repair-shops')}
                className="bg-transparent border-2 border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-gray-900 px-8 py-4 rounded-xl font-bold text-lg transition-colors"
              >
                Service & Repair
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Vehicles Section */}
      <section className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Featured Vehicles</h2>
            <p className="text-xl text-gray-600">Hand-picked vehicles from our trusted dealer network</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { id: 1, year: 2021, make: 'Audi', model: 'A4 Premium Quattro', price: 28500, mileage: 23450, dealer: 'Apex Auto' },
              { id: 2, year: 2020, make: 'Ford', model: 'F-150 XLT', price: 32900, mileage: 18200, dealer: 'Premier Motors' },
              { id: 3, year: 2019, make: 'Honda', model: 'CR-V EX', price: 24800, mileage: 28900, dealer: 'Elite Auto Group' }
            ].map((vehicle) => (
              <div key={vehicle.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer">
                <div className="h-48 bg-gray-200 flex items-center justify-center">
                  <svg className="w-20 h-20 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 9l-1.26-3.78A2 2 0 0 0 15.84 4H8.16a2 2 0 0 0-1.9 1.22L5 9H3v11a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-1h12v1a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1V9h-2zM7.5 17a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm9 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/>
                  </svg>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {vehicle.year} {vehicle.make} {vehicle.model}
                  </h3>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-2xl font-bold text-yellow-600">
                      ${vehicle.price.toLocaleString()}
                    </span>
                    <span className="text-gray-600">
                      {vehicle.mileage.toLocaleString()} miles
                    </span>
                  </div>
                  <div className="text-sm text-gray-600">
                    <p className="font-medium">{vehicle.dealer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button 
              onClick={() => navigate('/customer-inventory')}
              className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 px-8 py-3 rounded-lg font-bold transition-colors"
            >
              View All Vehicles
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Why Choose PULSE Auto Market?</h2>
            <p className="text-xl text-gray-400">Your trusted partner in finding the perfect vehicle</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-yellow-400 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-900" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Authentic Photos</h3>
              <p className="text-gray-400">Only real dealer photos - no stock images or placeholders</p>
            </div>

            <div className="text-center">
              <div className="bg-yellow-400 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-900" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Trusted Dealers</h3>
              <p className="text-gray-400">Verified dealerships with excellent customer service</p>
            </div>

            <div className="text-center">
              <div className="bg-yellow-400 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-900" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M13 10V3L4 14h7v7l9-11h-7z"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Fast & Easy</h3>
              <p className="text-gray-400">Quick search, instant results, seamless buying experience</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

// Customer Inventory Page
const CustomerInventoryPage = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data for customer view
    setTimeout(() => {
      setVehicles([
        { id: '1', year: 2021, make: 'Audi', model: 'A4 Premium Quattro', price: 28500, mileage: 23450, dealer: 'Apex Auto' },
        { id: '2', year: 2020, make: 'Ford', model: 'F-150 XLT', price: 32900, mileage: 18200, dealer: 'Premier Motors' },
        { id: '3', year: 2019, make: 'Honda', model: 'CR-V EX', price: 24800, mileage: 28900, dealer: 'Elite Auto Group' },
        { id: '4', year: 2022, make: 'BMW', model: '3 Series', price: 35900, mileage: 15200, dealer: 'Luxury Motors' },
        { id: '5', year: 2020, make: 'Toyota', model: 'Camry SE', price: 22900, mileage: 31200, dealer: 'City Auto' },
        { id: '6', year: 2021, make: 'Chevrolet', model: 'Silverado 1500', price: 38900, mileage: 22100, dealer: 'Truck Center' }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900">
        <CustomerHeader />
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-yellow-400 mb-4"></div>
            <p className="text-white text-xl">Loading vehicles...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <CustomerHeader />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-white mb-8">Available Vehicles</h1>
        
        {/* Search Filters */}
        <div className="bg-gray-800 rounded-xl p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <input 
              type="text" 
              placeholder="Search by keyword..."
              className="px-4 py-3 rounded-lg border border-gray-600 bg-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-yellow-500"
            />
            <select className="px-4 py-3 rounded-lg border border-gray-600 bg-gray-700 text-white focus:ring-2 focus:ring-yellow-500">
              <option>All Makes</option>
              <option>Audi</option>
              <option>BMW</option>
              <option>Ford</option>
              <option>Honda</option>
              <option>Toyota</option>
            </select>
            <select className="px-4 py-3 rounded-lg border border-gray-600 bg-gray-700 text-white focus:ring-2 focus:ring-yellow-500">
              <option>All Years</option>
              <option>2024</option>
              <option>2023</option>
              <option>2022</option>
              <option>2021</option>
              <option>2020</option>
            </select>
            <button className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 px-6 py-3 rounded-lg font-bold transition-colors">
              Search
            </button>
          </div>
        </div>

        {/* Vehicles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {vehicles.map((vehicle) => (
            <div key={vehicle.id} className="bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <div className="h-48 bg-gray-700 flex items-center justify-center">
                <svg className="w-20 h-20 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 9l-1.26-3.78A2 2 0 0 0 15.84 4H8.16a2 2 0 0 0-1.9 1.22L5 9H3v11a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-1h12v1a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1V9h-2zM7.5 17a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm9 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zM7 9l.84-2.52A1 1 0 0 1 8.78 6h6.44a1 1 0 0 1 .94.48L17 9H7z"/>
                </svg>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2">
                  {vehicle.year} {vehicle.make} {vehicle.model}
                </h3>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-2xl font-bold text-yellow-400">
                    ${vehicle.price.toLocaleString()}
                  </span>
                  <span className="text-gray-400">
                    {vehicle.mileage.toLocaleString()} miles
                  </span>
                </div>
                <div className="text-sm text-gray-400 mb-4">
                  <p className="font-medium">{vehicle.dealer}</p>
                </div>
                <div className="flex space-x-3">
                  <button className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold py-2 px-4 rounded-lg">
                    View Details
                  </button>
                  <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg">
                    Contact Dealer
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Service & Repair Shops Page
const ServiceRepairPage = () => {
  const [repairShops, setRepairShops] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock repair shop data
    setTimeout(() => {
      setRepairShops([
        {
          id: 1,
          name: 'Elite Auto Repair & Service',
          address: '123 Main St, Nashville, TN 37203',
          phone: '(615) 555-0123',
          rating: 4.8,
          reviews: 156,
          services: ['Oil Change', 'Brake Service', 'Engine Repair', 'Transmission', 'AC Repair', 'Tire Service'],
          hours: 'Mon-Fri: 8AM-6PM, Sat: 8AM-4PM',
          specialties: ['Full Service', 'Quick Lube', 'Diagnostics']
        },
        {
          id: 2,
          name: 'Premier Auto Service Center',
          address: '456 Broadway, Memphis, TN 38103',
          phone: '(901) 555-0124',
          rating: 4.6,
          reviews: 98,
          services: ['Diagnostic', 'AC Repair', 'Tire Service', 'Battery Replacement', 'Oil Change', 'Brake Service'],
          hours: 'Mon-Fri: 7AM-7PM, Sat: 8AM-5PM',
          specialties: ['Import Service', 'Electrical', 'Performance']
        },
        {
          id: 3,
          name: 'Quick Fix Auto Service',
          address: '789 Union Ave, Knoxville, TN 37902',
          phone: '(865) 555-0125',
          rating: 4.5,
          reviews: 203,
          services: ['Quick Lube', 'Inspection', 'Exhaust Service', 'Suspension', 'Oil Change', 'Brake Service'],
          hours: 'Mon-Sat: 8AM-6PM, Sun: 10AM-4PM',
          specialties: ['Quick Service', 'Suspension', 'Exhaust']
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900">
        <CustomerHeader />
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-yellow-400 mb-4"></div>
            <p className="text-white text-xl">Finding service centers...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <CustomerHeader />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Auto Service & Repair</h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Find trusted automotive service centers and repair shops near you. Professional service from oil changes to major repairs.
          </p>
        </div>

        {/* Search Bar */}
        <div className="bg-gray-800 rounded-xl p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input 
              type="text" 
              placeholder="Enter ZIP code or city..."
              className="px-4 py-3 rounded-lg border border-gray-600 bg-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-yellow-500"
            />
            <select className="px-4 py-3 rounded-lg border border-gray-600 bg-gray-700 text-white focus:ring-2 focus:ring-yellow-500">
              <option>All Services</option>
              <option>Oil Change</option>
              <option>Brake Service</option>
              <option>Engine Repair</option>
              <option>Transmission</option>
              <option>AC Repair</option>
              <option>Tire Service</option>
            </select>
            <button className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 px-6 py-3 rounded-lg font-bold transition-colors">
              Find Service Centers
            </button>
          </div>
        </div>

        {/* Service Centers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {repairShops.map((shop) => (
            <div key={shop.id} className="bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <div className="h-48 bg-gray-700 flex items-center justify-center">
                <svg className="w-20 h-20 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                </svg>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2">{shop.name}</h3>
                
                {/* Rating */}
                <div className="flex items-center mb-3">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-white ml-2 text-sm">
                    {shop.rating} ({shop.reviews} reviews)
                  </span>
                </div>

                <p className="text-gray-300 text-sm mb-3">{shop.address}</p>
                <p className="text-gray-300 text-sm mb-3">{shop.phone}</p>
                <p className="text-gray-400 text-sm mb-4">{shop.hours}</p>

                {/* Specialties */}
                <div className="mb-4">
                  <p className="text-gray-400 text-sm mb-2">Specialties:</p>
                  <div className="flex flex-wrap gap-1">
                    {shop.specialties.map((specialty, index) => (
                      <span key={index} className="bg-yellow-400 text-gray-900 px-2 py-1 rounded text-xs font-medium">
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Services */}
                <div className="mb-6">
                  <p className="text-gray-400 text-sm mb-2">Services:</p>
                  <div className="flex flex-wrap gap-1">
                    {shop.services.slice(0, 4).map((service, index) => (
                      <span key={index} className="bg-gray-700 text-gray-300 px-2 py-1 rounded text-xs">
                        {service}
                      </span>
                    ))}
                    {shop.services.length > 4 && (
                      <span className="bg-gray-700 text-gray-300 px-2 py-1 rounded text-xs">
                        +{shop.services.length - 4} more
                      </span>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <button className="w-full bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold py-2 px-4 rounded-lg transition-colors">
                    Schedule Service
                  </button>
                  <div className="flex space-x-2">
                    <button className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg transition-colors">
                      Call Now
                    </button>
                    <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors">
                      Directions
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Vehicle Modal Component (existing functionality)
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
              </div>
              
              <div className="flex space-x-3 pt-4">
                <Link 
                  to={`/dealer-tools?vehicle=${vehicle.id}`}
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

// Add Vehicle Modal (simplified for space)
const AddVehicleModal = ({ isOpen, onClose, onVehicleAdded }) => {
  const [formData, setFormData] = useState({
    year: '', make: '', model: '', price: '', mileage: '',
    dealer_id: 'sample-dealer-1', dealer_name: 'Sample Dealership'
  });

  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    
    try {
      const response = await axios.post(`${API}/vehicles`, formData);
      onVehicleAdded(response.data);
      onClose();
      setFormData({ year: '', make: '', model: '', price: '', mileage: '', dealer_id: 'sample-dealer-1', dealer_name: 'Sample Dealership' });
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
        
        <div className="inline-block w-full max-w-2xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-gray-800 shadow-xl rounded-2xl">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-white">Add New Vehicle</h3>
            <button onClick={onClose} className="text-gray-400 hover:text-white text-2xl">×</button>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <input
                type="number"
                placeholder="Year"
                value={formData.year}
                onChange={(e) => setFormData({...formData, year: e.target.value})}
                required
                className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
              <input
                type="text"
                placeholder="Make"
                value={formData.make}
                onChange={(e) => setFormData({...formData, make: e.target.value})}
                required
                className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
              <input
                type="text"
                placeholder="Model"
                value={formData.model}
                onChange={(e) => setFormData({...formData, model: e.target.value})}
                required
                className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
              <input
                type="number"
                placeholder="Price"
                value={formData.price}
                onChange={(e) => setFormData({...formData, price: e.target.value})}
                required
                className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>
            
            <div className="flex justify-end space-x-4 pt-4">
              <button type="button" onClick={onClose} className="bg-gray-600 hover:bg-gray-500 text-white font-bold py-3 px-6 rounded-lg">
                Cancel
              </button>
              <button type="submit" disabled={submitting} className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-3 px-6 rounded-lg disabled:opacity-50">
                {submitting ? 'Adding...' : 'Add Vehicle'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

// Dealer Inventory Page (with left sidebar)
const DealerInventoryPage = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [showVehicleModal, setShowVehicleModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

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
        { id: '1', year: 2019, make: 'Ford', model: 'Explorer', price: 33000, mileage: 10000, status: 'Available' },
        { id: '2', year: 2018, make: 'Honda', model: 'Accord', price: 28000, mileage: 15000, status: 'Available' },
        { id: '3', year: 2020, make: 'Chevrolet', model: 'Silverado 1500', price: 42000, mileage: 25000, status: 'Available' }
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900">
        <DealerSidebar activePage="inventory" />
        <DealerHeader activePage="inventory" />
        <div className="ml-64 flex items-center justify-center h-96">
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
      <DealerSidebar activePage="inventory" />
      <DealerHeader activePage="inventory" />
      
      <div className="ml-64 px-6 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-white">Vehicle Inventory</h2>
            <p className="text-gray-400">Manage your dealership's vehicle inventory</p>
          </div>
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

        {/* Vehicle Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {vehicles.map((vehicle) => (
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
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold text-yellow-400">
                    ${vehicle.price?.toLocaleString()}
                  </span>
                  <span className="text-gray-400 text-sm">
                    {vehicle.mileage?.toLocaleString()} mi
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <VehicleModal 
        vehicle={selectedVehicle}
        isOpen={showVehicleModal}
        onClose={() => setShowVehicleModal(false)}
      />

      <AddVehicleModal 
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onVehicleAdded={handleVehicleAdded}
      />
    </div>
  );
};

// Main App Component
function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Customer Pages */}
          <Route path="/" element={<CustomerHomePage />} />
          <Route path="/customer-inventory" element={<CustomerInventoryPage />} />
          <Route path="/repair-shops" element={<ServiceRepairPage />} />
          
          {/* Dealer Portal Pages */}
          <Route path="/dealer-portal" element={<DealerInventoryPage />} />
          <Route path="/dealer-leads" element={
            <div className="min-h-screen bg-gray-900">
              <DealerSidebar activePage="leads" />
              <DealerHeader activePage="leads" />
              <div className="ml-64">
                <LeadsManagement />
              </div>
            </div>
          } />
          <Route path="/dealer-reports" element={
            <div className="min-h-screen bg-gray-900">
              <DealerSidebar activePage="reports" />
              <DealerHeader activePage="reports" />
              <div className="ml-64 flex items-center justify-center h-96">
                <h1 className="text-white text-4xl">Dealer Reports - Coming Soon</h1>
              </div>
            </div>
          } />
          <Route path="/dealer-tools" element={
            <div className="min-h-screen bg-gray-900">
              <DealerSidebar activePage="desking-tool" />
              <DealerHeader activePage="desking tool" />
              <div className="ml-64 py-8">
                <DeskingTool />
              </div>
            </div>
          } />
          <Route path="/credit-application" element={
            <div className="min-h-screen bg-gray-900">
              <DealerSidebar activePage="credit-apps" />
              <DealerHeader activePage="credit applications" />
              <div className="ml-64 py-8">
                <CreditApplication />
              </div>
            </div>
          } />
          <Route path="/dealer-settings" element={
            <div className="min-h-screen bg-gray-900">
              <DealerSidebar activePage="settings" />
              <DealerHeader activePage="settings" />
              <div className="ml-64 flex items-center justify-center h-96">
                <h1 className="text-white text-4xl">Dealer Settings - Coming Soon</h1>
              </div>
            </div>
          } />
          
          {/* Admin */}
          <Route path="/admin" element={
            <div className="min-h-screen bg-gray-900">
              <CustomerHeader />
              <div className="flex items-center justify-center h-96">
                <h1 className="text-white text-4xl">Admin Login - Coming Soon</h1>
              </div>
            </div>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;