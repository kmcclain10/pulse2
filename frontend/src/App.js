import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './App.css';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// Header Component
const Header = () => {
  return (
    <header className="bg-gray-900 shadow-lg border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-gray-900" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
              </div>
              <span className="text-2xl font-bold text-white ml-2">PULSE</span>
              <span className="text-yellow-400 text-sm font-medium ml-1">Auto Market</span>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link to="/search" className="text-gray-300 hover:text-yellow-400 transition-colors font-medium">
              Search
            </Link>
            <Link to="/repair-shops" className="text-gray-300 hover:text-yellow-400 transition-colors font-medium">
              Find a Repair Shop
            </Link>
            <Link to="/sell" className="text-gray-300 hover:text-yellow-400 transition-colors font-medium">
              Sell Your Car
            </Link>
          </nav>

          {/* Sign In Button */}
          <div className="flex items-center space-x-4">
            <Link to="/admin" className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 px-4 py-2 rounded-lg font-medium transition-colors">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

// Hero Section Component
const HeroSection = () => {
  const navigate = useNavigate();

  return (
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
                  onClick={() => navigate('/search')}
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
              onClick={() => navigate('/search')}
              className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 px-8 py-4 rounded-xl font-bold text-lg transition-colors shadow-lg"
            >
              Browse Inventory
            </button>
            <button 
              onClick={() => navigate('/repair-shops')}
              className="bg-transparent border-2 border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-gray-900 px-8 py-4 rounded-xl font-bold text-lg transition-colors"
            >
              Find Repair Shops
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Featured Vehicles Component
const FeaturedVehicles = () => {
  const navigate = useNavigate();
  
  // Mock featured vehicles - will be replaced with real data
  const featuredVehicles = [
    {
      id: 1,
      year: 2021,
      make: 'Audi',
      model: 'A4 Premium Quattro',
      price: 28500,
      mileage: 23450,
      image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400&h=300&fit=crop',
      dealer: 'Apex Auto',
      location: 'Anytown, NY'
    },
    {
      id: 2,
      year: 2020,
      make: 'Ford',
      model: 'F-150 XLT',
      price: 32900,
      mileage: 18200,
      image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400&h=300&fit=crop',
      dealer: 'Premier Motors',
      location: 'Nashville, TN'
    },
    {
      id: 3,
      year: 2019,
      make: 'Honda',
      model: 'CR-V EX',
      price: 24800,
      mileage: 28900,
      image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400&h=300&fit=crop',
      dealer: 'Elite Auto Group',
      location: 'Memphis, TN'
    }
  ];

  return (
    <section className="bg-gray-100 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Featured Vehicles</h2>
          <p className="text-xl text-gray-600">Hand-picked vehicles from our trusted dealer network</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {featuredVehicles.map((vehicle) => (
            <div key={vehicle.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
                 onClick={() => navigate(`/vehicle/${vehicle.id}`)}>
              <div className="relative h-48 bg-gray-200">
                <img 
                  src={vehicle.image} 
                  alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 bg-yellow-400 text-gray-900 px-3 py-1 rounded-full text-sm font-bold">
                  FAIR PRICE
                </div>
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
                  <p>{vehicle.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <button 
            onClick={() => navigate('/search')}
            className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 px-8 py-3 rounded-lg font-bold transition-colors"
          >
            View All Vehicles
          </button>
        </div>
      </div>
    </section>
  );
};

// Home Page Component
const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-900">
      <HeroSection />
      <FeaturedVehicles />
    </div>
  );
};

// Search Page Component
const SearchPage = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock vehicle data - will be replaced with API call
    const mockVehicles = [
      { id: 1, year: 2019, make: 'BMW', model: '3 Series', price: 33000, mileage: 10000, status: 'Available' },
      { id: 2, year: 2021, make: 'Honda', model: 'Accord', price: 28000, mileage: 10000, status: 'Available' },
      { id: 3, year: 2018, make: 'Ford', model: 'F-150', price: 42000, mileage: 25000, status: 'Available' },
      { id: 4, year: 2020, make: 'Chevrolet', model: 'Equinox', price: 23000, mileage: 20000, status: 'Available' },
      { id: 5, year: 2017, make: 'Toyota', model: 'Camry', price: 18000, mileage: 30000, status: 'Available' },
      { id: 6, year: 2019, make: 'Nissan', model: 'Rogue', price: 24000, mileage: 22000, status: 'Available' },
      { id: 7, year: 2022, make: 'Tesla', model: 'Model 3', price: 48000, mileage: 5000, status: 'Available' },
      { id: 8, year: 2016, make: 'Hyundai', model: 'Sonata', price: 16000, mileage: 40000, status: 'Available' }
    ];
    
    setTimeout(() => {
      setVehicles(mockVehicles);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-yellow-400 mb-4"></div>
          <p className="text-white text-xl">Loading vehicles...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-white mb-8">Vehicle Inventory</h1>
        
        {/* Search Filters */}
        <div className="bg-gray-800 rounded-xl p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <input 
              type="text" 
              placeholder="Search by keyword..."
              className="px-4 py-3 rounded-lg border border-gray-600 bg-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-yellow-500"
            />
            <select className="px-4 py-3 rounded-lg border border-gray-600 bg-gray-700 text-white focus:ring-2 focus:ring-yellow-500">
              <option>All Years</option>
              <option>2024</option>
              <option>2023</option>
              <option>2022</option>
              <option>2021</option>
              <option>2020</option>
            </select>
            <select className="px-4 py-3 rounded-lg border border-gray-600 bg-gray-700 text-white focus:ring-2 focus:ring-yellow-500">
              <option>All Makes</option>
              <option>BMW</option>
              <option>Honda</option>
              <option>Ford</option>
              <option>Toyota</option>
              <option>Chevrolet</option>
            </select>
            <button className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 px-6 py-3 rounded-lg font-bold transition-colors">
              Search
            </button>
          </div>
        </div>

        {/* Vehicles Table */}
        <div className="bg-gray-800 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-700">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300 uppercase tracking-wider">Photo</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300 uppercase tracking-wider">Year</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300 uppercase tracking-wider">Make & Model</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300 uppercase tracking-wider">Price</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300 uppercase tracking-wider">Mileage</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {vehicles.map((vehicle) => (
                  <tr key={vehicle.id} className="hover:bg-gray-700 cursor-pointer transition-colors">
                    <td className="px-6 py-4">
                      <div className="w-16 h-12 bg-gray-600 rounded-lg flex items-center justify-center">
                        <svg className="w-8 h-8 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M19 9l-1.26-3.78A2 2 0 0 0 15.84 4H8.16a2 2 0 0 0-1.9 1.22L5 9H3v11a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-1h12v1a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1V9h-2zM7.5 17a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm9 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zM7 9l.84-2.52A1 1 0 0 1 8.78 6h6.44a1 1 0 0 1 .94.48L17 9H7z"/>
                        </svg>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-white">{vehicle.year}</td>
                    <td className="px-6 py-4 text-sm text-white font-medium">{vehicle.make} {vehicle.model}</td>
                    <td className="px-6 py-4 text-sm text-yellow-400 font-bold">${vehicle.price.toLocaleString()}</td>
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
      </div>
    </div>
  );
};

// Vehicle Details Page Component
const VehicleDetailsPage = () => {
  const [currentImage, setCurrentImage] = useState(0);
  
  // Mock vehicle data - will be replaced with API call
  const vehicle = {
    id: 1,
    year: 2021,
    make: 'Audi',
    model: 'A4 Premium Quattro',
    price: 28500,
    mileage: 23450,
    transmission: 'Automatic',
    exteriorColor: 'Glacier White Metallic',
    interiorColor: 'Black',
    fuelType: 'Gasoline',
    drivetrain: 'AWD',
    dealer: 'Apex Auto',
    dealerAddress: '120 Main St, Anytown, NY 12345',
    dealerRating: 4.5,
    dealerReviews: 127,
    images: [
      'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&h=600&fit=crop'
    ],
    features: [
      'Leather Seats',
      'Navigation System',
      'Backup Camera',
      'Bluetooth Connectivity',
      'Heated Seats',
      'Premium Sound System',
      'Alloy Wheels',
      'Sunroof'
    ]
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Vehicle Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">
                {vehicle.year} {vehicle.make} {vehicle.model}
              </h1>
              <p className="text-gray-400">{vehicle.mileage.toLocaleString()} miles • {vehicle.transmission} • {vehicle.exteriorColor}</p>
            </div>
            <div className="text-right">
              <div className="bg-yellow-400 text-gray-900 px-6 py-2 rounded-full text-sm font-bold mb-2">
                FAIR PRICE
              </div>
              <div className="text-3xl font-bold text-yellow-400">
                ${vehicle.price.toLocaleString()}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Image Gallery */}
          <div className="lg:col-span-2">
            <div className="bg-gray-800 rounded-2xl p-6">
              {/* Main Image */}
              <div className="mb-4">
                <img 
                  src={vehicle.images[currentImage]}
                  alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
                  className="w-full h-96 object-cover rounded-xl"
                />
              </div>
              
              {/* Thumbnail Images */}
              <div className="grid grid-cols-5 gap-2">
                {vehicle.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImage(index)}
                    className={`h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                      currentImage === index ? 'border-yellow-400' : 'border-gray-600 hover:border-gray-500'
                    }`}
                  >
                    <img 
                      src={image} 
                      alt={`View ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Vehicle Specifications */}
            <div className="bg-gray-800 rounded-2xl p-6 mt-6">
              <h3 className="text-2xl font-bold text-white mb-6">Vehicle Specifications</h3>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-gray-400 text-sm">Year</p>
                  <p className="text-white font-semibold">{vehicle.year}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Make & Model</p>
                  <p className="text-white font-semibold">{vehicle.make} {vehicle.model}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Mileage</p>
                  <p className="text-white font-semibold">{vehicle.mileage.toLocaleString()} miles</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Transmission</p>
                  <p className="text-white font-semibold">{vehicle.transmission}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Exterior Color</p>
                  <p className="text-white font-semibold">{vehicle.exteriorColor}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Interior Color</p>
                  <p className="text-white font-semibold">{vehicle.interiorColor}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Fuel Type</p>
                  <p className="text-white font-semibold">{vehicle.fuelType}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Drivetrain</p>
                  <p className="text-white font-semibold">{vehicle.drivetrain}</p>
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="bg-gray-800 rounded-2xl p-6 mt-6">
              <h3 className="text-2xl font-bold text-white mb-6">Features & Options</h3>
              <div className="grid grid-cols-2 gap-3">
                {vehicle.features.map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <svg className="w-5 h-5 text-yellow-400 mr-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-white">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Contact/Action Panel */}
          <div className="lg:col-span-1">
            <div className="bg-gray-800 rounded-2xl p-6 sticky top-8">
              
              {/* Dealer Information */}
              <div className="mb-6">
                <h3 className="text-xl font-bold text-white mb-4">Dealer Information</h3>
                <div className="space-y-3">
                  <div>
                    <p className="font-semibold text-white">{vehicle.dealer}</p>
                    <p className="text-gray-400 text-sm">{vehicle.dealerAddress}</p>
                  </div>
                  <div className="flex items-center">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-white ml-2 text-sm">
                      {vehicle.dealerRating} ({vehicle.dealerReviews} reviews)
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-4">
                <button className="w-full bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold py-4 px-6 rounded-xl transition-colors">
                  Schedule Test Drive
                </button>
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-xl transition-colors">
                  Secure Financing
                </button>
                <button className="w-full bg-gray-700 hover:bg-gray-600 text-white font-bold py-4 px-6 rounded-xl transition-colors">
                  Send to Phone
                </button>
                <button className="w-full border-2 border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-gray-900 font-bold py-4 px-6 rounded-xl transition-colors">
                  Contact Dealer
                </button>
              </div>

              {/* Financing Calculator */}
              <div className="mt-8 pt-6 border-t border-gray-700">
                <h4 className="text-lg font-bold text-white mb-4">Payment Calculator</h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Down Payment</label>
                    <input type="number" placeholder="$5,000" className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:ring-2 focus:ring-yellow-500" />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Loan Term</label>
                    <select className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:ring-2 focus:ring-yellow-500">
                      <option>36 months</option>
                      <option>48 months</option>
                      <option>60 months</option>
                      <option>72 months</option>
                    </select>
                  </div>
                  <div className="bg-gray-700 rounded-lg p-4">
                    <p className="text-gray-400 text-sm">Estimated Monthly Payment</p>
                    <p className="text-2xl font-bold text-yellow-400">$426</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Repair Shops Page Component  
const RepairShopsPage = () => {
  const [repairShops, setRepairShops] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock repair shop data - will be replaced with API call
    const mockRepairShops = [
      {
        id: 1,
        name: 'Elite Auto Repair',
        address: '123 Main St, Nashville, TN 37203',
        phone: '(615) 555-0123',
        rating: 4.8,
        reviews: 156,
        services: ['Oil Change', 'Brake Service', 'Engine Repair', 'Transmission'],
        hours: 'Mon-Fri: 8AM-6PM, Sat: 8AM-4PM',
        image: 'https://images.unsplash.com/photo-1486754735734-325b5831c3ad?w=400&h=250&fit=crop'
      },
      {
        id: 2,
        name: 'Premier Auto Service',
        address: '456 Broadway, Memphis, TN 38103',
        phone: '(901) 555-0124',
        rating: 4.6,
        reviews: 98,
        services: ['Diagnostic', 'AC Repair', 'Tire Service', 'Battery Replacement'],
        hours: 'Mon-Fri: 7AM-7PM, Sat: 8AM-5PM',
        image: 'https://images.unsplash.com/photo-1486754735734-325b5831c3ad?w=400&h=250&fit=crop'
      },
      {
        id: 3,
        name: 'Quick Fix Auto',
        address: '789 Union Ave, Knoxville, TN 37902',
        phone: '(865) 555-0125',
        rating: 4.5,
        reviews: 203,
        services: ['Quick Lube', 'Inspection', 'Exhaust Service', 'Suspension'],
        hours: 'Mon-Sat: 8AM-6PM, Sun: 10AM-4PM',
        image: 'https://images.unsplash.com/photo-1486754735734-325b5831c3ad?w=400&h=250&fit=crop'
      },
      {
        id: 4,
        name: 'Precision Motors',
        address: '321 Church St, Chattanooga, TN 37402',
        phone: '(423) 555-0126',
        rating: 4.9,
        reviews: 87,
        services: ['European Cars', 'Performance Tuning', 'Import Service', 'Luxury Repair'],
        hours: 'Mon-Fri: 8AM-5PM, Sat: By Appointment',
        image: 'https://images.unsplash.com/photo-1486754735734-325b5831c3ad?w=400&h=250&fit=crop'
      },
      {
        id: 5,
        name: 'Family Auto Care',
        address: '654 Market St, Johnson City, TN 37601',
        phone: '(423) 555-0127',
        rating: 4.4,
        reviews: 142,
        services: ['General Repair', 'Fleet Service', 'Roadside Assistance', 'Towing'],
        hours: 'Mon-Fri: 7AM-6PM, Sat: 8AM-3PM',
        image: 'https://images.unsplash.com/photo-1486754735734-325b5831c3ad?w=400&h=250&fit=crop'
      },
      {
        id: 6,
        name: 'AutoTech Solutions',
        address: '987 Highland Ave, Jackson, TN 38301',
        phone: '(731) 555-0128',
        rating: 4.7,
        reviews: 76,
        services: ['Computer Diagnostics', 'Hybrid Service', 'Electric Vehicle', 'Modern Technology'],
        hours: 'Mon-Fri: 8AM-6PM, Sat: 9AM-4PM',
        image: 'https://images.unsplash.com/photo-1486754735734-325b5831c3ad?w=400&h=250&fit=crop'
      }
    ];
    
    setTimeout(() => {
      setRepairShops(mockRepairShops);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-yellow-400 mb-4"></div>
          <p className="text-white text-xl">Finding repair shops...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Find a Repair Shop</h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Locate trusted automotive service centers in Tennessee. All shops are vetted and reviewed by our community.
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
              <option>Diagnostic</option>
            </select>
            <button className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 px-6 py-3 rounded-lg font-bold transition-colors">
              Search Shops
            </button>
          </div>
        </div>

        {/* Repair Shops Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {repairShops.map((shop) => (
            <div key={shop.id} className="bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <div className="h-48 bg-gray-700">
                <img 
                  src={shop.image} 
                  alt={shop.name}
                  className="w-full h-full object-cover"
                />
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

                {/* Address */}
                <div className="flex items-start mb-3">
                  <svg className="w-5 h-5 text-gray-400 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  <p className="text-gray-300 text-sm">{shop.address}</p>
                </div>

                {/* Phone */}
                <div className="flex items-center mb-3">
                  <svg className="w-5 h-5 text-gray-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  <p className="text-gray-300 text-sm">{shop.phone}</p>
                </div>

                {/* Hours */}
                <div className="flex items-start mb-4">
                  <svg className="w-5 h-5 text-gray-400 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                  <p className="text-gray-300 text-sm">{shop.hours}</p>
                </div>

                {/* Services */}
                <div className="mb-4">
                  <p className="text-gray-400 text-sm mb-2">Services:</p>
                  <div className="flex flex-wrap gap-1">
                    {shop.services.slice(0, 3).map((service, index) => (
                      <span key={index} className="bg-gray-700 text-gray-300 px-2 py-1 rounded text-xs">
                        {service}
                      </span>
                    ))}
                    {shop.services.length > 3 && (
                      <span className="bg-gray-700 text-gray-300 px-2 py-1 rounded text-xs">
                        +{shop.services.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-2">
                  <button className="w-full bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold py-2 px-4 rounded-lg transition-colors">
                    Get Directions
                  </button>
                  <button className="w-full bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg transition-colors">
                    Call Now
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

// Admin Login Page Component
const AdminLoginPage = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ username: '', password: '' });

  const handleLogin = (e) => {
    e.preventDefault();
    // Mock admin login - will be replaced with real authentication
    if (credentials.username === 'admin' && credentials.password === 'pulseadmin123') {
      navigate('/admin-dashboard');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="max-w-md w-full space-y-8 p-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-2">Admin Portal</h2>
          <p className="text-gray-400">Sign in to manage your dealership</p>
        </div>
        
        <form className="space-y-6" onSubmit={handleLogin}>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Username</label>
            <input 
              type="text" 
              value={credentials.username}
              onChange={(e) => setCredentials({...credentials, username: e.target.value})}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-yellow-500"
              placeholder="Enter username"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Password</label>
            <input 
              type="password" 
              value={credentials.password}
              onChange={(e) => setCredentials({...credentials, password: e.target.value})}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-yellow-500"
              placeholder="Enter password"
              required
            />
          </div>
          
          <button 
            type="submit"
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold py-3 px-4 rounded-lg transition-colors"
          >
            Sign In
          </button>
        </form>

        <div className="text-center text-sm text-gray-500">
          Demo credentials: admin / pulseadmin123
        </div>
      </div>
    </div>
  );
};

// Admin Dashboard Component
const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-white mb-8">Admin Dashboard</h1>
        
        {/* Dashboard Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-800 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-400 mb-2">Total Vehicles</h3>
            <p className="text-3xl font-bold text-white">247</p>
            <p className="text-green-400 text-sm">+12 this week</p>
          </div>
          <div className="bg-gray-800 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-400 mb-2">Active Leads</h3>
            <p className="text-3xl font-bold text-white">89</p>
            <p className="text-blue-400 text-sm">23 new today</p>
          </div>
          <div className="bg-gray-800 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-400 mb-2">Sales This Month</h3>
            <p className="text-3xl font-bold text-white">$1.2M</p>
            <p className="text-green-400 text-sm">+8% vs last month</p>
          </div>
          <div className="bg-gray-800 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-400 mb-2">Conversion Rate</h3>
            <p className="text-3xl font-bold text-white">12.5%</p>
            <p className="text-yellow-400 text-sm">Industry avg: 10%</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-gray-800 rounded-xl p-6">
          <h2 className="text-2xl font-bold text-white mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold py-4 px-6 rounded-lg transition-colors">
              Add New Vehicle
            </button>
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-lg transition-colors">
              Manage Inventory
            </button>
            <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-6 rounded-lg transition-colors">
              View Reports
            </button>
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
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/vehicle/:id" element={<VehicleDetailsPage />} />
          <Route path="/repair-shops" element={<RepairShopsPage />} />
          <Route path="/admin" element={<AdminLoginPage />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;