import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import './App.css';

// Import Components
import DeskingTool from './components/DeskingTool';
import LeadsManagement from './components/LeadsManagement';
import CreditApplication from './components/CreditApplication';
import AdminDashboard from './components/AdminDashboard';
import DealerCRM from './components/DealerCRM';
import ScraperManagement from './components/ScraperManagement';

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

// Admin Sidebar Component
const AdminSidebar = ({ activePage = "dashboard" }) => {
  const navigate = useNavigate();
  
  const adminMenuItems = [
    { 
      name: 'Dashboard', 
      path: '/admin', 
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/>
        </svg>
      )
    },
    { 
      name: 'Dealer CRM', 
      path: '/admin/dealers', 
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
        </svg>
      )
    },
    { 
      name: 'Subscriptions', 
      path: '/admin/subscriptions', 
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
        </svg>
      )
    },
    { 
      name: 'Billing', 
      path: '/admin/billing', 
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.41 16.09V20h-2.67v-1.93c-1.71-.36-3.16-1.46-3.27-3.4h1.96c.1 1.05.82 1.87 2.65 1.87 1.96 0 2.4-.98 2.4-1.59 0-.83-.44-1.61-2.67-2.14-2.48-.6-4.18-1.62-4.18-3.67 0-1.72 1.39-2.84 3.11-3.21V4h2.67v1.95c1.86.45 2.79 1.86 2.85 3.39H14.3c-.05-1.11-.64-1.87-2.22-1.87-1.5 0-2.4.68-2.4 1.64 0 .84.65 1.39 2.67 1.91s4.18 1.39 4.18 3.91c-.01 1.83-1.38 2.83-3.12 3.16z"/>
        </svg>
      )
    },
    { 
      name: 'Scraper Manager', 
      path: '/admin/scraper', 
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      )
    },
    { 
      name: 'Reports', 
      path: '/admin/reports', 
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4zm2.5 2.25l1.41-1.41L15.5 12.5 13 15l-3.5-3.5L4 17V5h16v12.25z"/>
        </svg>
      )
    },
    { 
      name: 'Analytics', 
      path: '/admin/analytics', 
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"/>
        </svg>
      )
    },
    { 
      name: 'Settings', 
      path: '/admin/settings', 
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

        {/* Company Info */}
        <div className="mb-8 p-4 bg-gray-800 rounded-lg">
          <p className="text-yellow-400 font-bold text-sm">PULSE AUTO MARKET</p>
          <p className="text-white font-medium">Admin Portal</p>
          <p className="text-gray-400 text-sm">Master Control</p>
        </div>

        {/* Menu Items */}
        <nav className="space-y-2">
          {adminMenuItems.map((item) => (
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

// Dealer Sidebar Component (existing)
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

// Admin Header Component (for admin portal pages)
const AdminHeader = ({ activePage = "dashboard" }) => {
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
              <p className="text-white font-medium">Admin User</p>
              <p className="text-gray-400 text-sm">System Administrator</p>
            </div>
            <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center">
              <span className="text-gray-900 font-bold">AD</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

// Customer Home Page (existing functionality - keeping the same)
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

// Simplified placeholder components for demo - keeping existing customer and dealer functionality
const CustomerInventoryPage = () => {
  const [vehicles] = useState([
    { id: '1', year: 2021, make: 'Audi', model: 'A4 Premium Quattro', price: 28500, mileage: 23450, dealer: 'Apex Auto' },
    { id: '2', year: 2020, make: 'Ford', model: 'F-150 XLT', price: 32900, mileage: 18200, dealer: 'Premier Motors' },
    { id: '3', year: 2019, make: 'Honda', model: 'CR-V EX', price: 24800, mileage: 28900, dealer: 'Elite Auto Group' }
  ]);

  return (
    <div className="min-h-screen bg-gray-900">
      <CustomerHeader />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-white mb-8">Available Vehicles</h1>
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
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Simplified repair page for space
const ServiceRepairPage = () => (
  <div className="min-h-screen bg-gray-900">
    <CustomerHeader />
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-white mb-8">Auto Service & Repair Centers</h1>
      <p className="text-xl text-gray-400">Find trusted automotive service centers near you.</p>
    </div>
  </div>
);

// Simplified dealer inventory for space
const DealerInventoryPage = () => (
  <div className="min-h-screen bg-gray-900">
    <DealerSidebar activePage="inventory" />
    <DealerHeader activePage="inventory" />
    <div className="ml-64 p-6">
      <h2 className="text-2xl font-bold text-white mb-4">Vehicle Inventory Management</h2>
      <p className="text-gray-400">Manage your dealership's vehicle inventory and listings.</p>
    </div>
  </div>
);

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
          
          {/* Admin Portal Pages */}
          <Route path="/admin" element={
            <div className="min-h-screen bg-gray-900">
              <AdminSidebar activePage="dashboard" />
              <AdminHeader activePage="dashboard" />
              <div className="ml-64">
                <AdminDashboard />
              </div>
            </div>
          } />
          <Route path="/admin/dealers" element={
            <div className="min-h-screen bg-gray-900">
              <AdminSidebar activePage="dealer-crm" />
              <AdminHeader activePage="dealer crm" />
              <div className="ml-64">
                <DealerCRM />
              </div>
            </div>
          } />
          <Route path="/admin/subscriptions" element={
            <div className="min-h-screen bg-gray-900">
              <AdminSidebar activePage="subscriptions" />
              <AdminHeader activePage="subscriptions" />
              <div className="ml-64 flex items-center justify-center h-96">
                <h1 className="text-white text-4xl">Subscription Management - Coming Soon</h1>
              </div>
            </div>
          } />
          <Route path="/admin/billing" element={
            <div className="min-h-screen bg-gray-900">
              <AdminSidebar activePage="billing" />
              <AdminHeader activePage="billing" />
              <div className="ml-64 flex items-center justify-center h-96">
                <h1 className="text-white text-4xl">Billing Management - Coming Soon</h1>
              </div>
            </div>
          } />
          <Route path="/admin/scraper" element={
            <div className="min-h-screen bg-gray-900">
              <AdminSidebar activePage="scraper-manager" />
              <AdminHeader activePage="scraper manager" />
              <div className="ml-64">
                <ScraperManagement />
              </div>
            </div>
          } />
          <Route path="/admin/reports" element={
            <div className="min-h-screen bg-gray-900">
              <AdminSidebar activePage="reports" />
              <AdminHeader activePage="reports" />
              <div className="ml-64 flex items-center justify-center h-96">
                <h1 className="text-white text-4xl">Admin Reports - Coming Soon</h1>
              </div>
            </div>
          } />
          <Route path="/admin/analytics" element={
            <div className="min-h-screen bg-gray-900">
              <AdminSidebar activePage="analytics" />
              <AdminHeader activePage="analytics" />
              <div className="ml-64 flex items-center justify-center h-96">
                <h1 className="text-white text-4xl">Analytics Dashboard - Coming Soon</h1>
              </div>
            </div>
          } />
          <Route path="/admin/settings" element={
            <div className="min-h-screen bg-gray-900">
              <AdminSidebar activePage="settings" />
              <AdminHeader activePage="settings" />
              <div className="ml-64 flex items-center justify-center h-96">
                <h1 className="text-white text-4xl">Admin Settings - Coming Soon</h1>
              </div>
            </div>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;