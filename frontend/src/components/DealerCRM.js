import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const DealerCRM = () => {
  const [dealers, setDealers] = useState([]);
  const [selectedDealer, setSelectedDealer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [filters, setFilters] = useState({
    status: 'All',
    plan: 'All',
    search: ''
  });

  useEffect(() => {
    fetchDealers();
  }, []);

  const fetchDealers = async () => {
    try {
      setLoading(true);
      // Mock dealer data - replace with real API call
      setDealers([
        {
          id: '1',
          name: 'Premier Auto Group',
          contact: 'John Smith',
          email: 'john@premierauto.com',
          phone: '(615) 555-0123',
          location: 'Nashville, TN',
          status: 'Active',
          plan: 'Pro',
          monthlyFee: 299,
          vehicleCount: 87,
          lastActivity: '2024-01-15T10:30:00Z',
          joinDate: '2023-08-15',
          totalRevenue: 3588,
          scraperStatus: 'Running'
        },
        {
          id: '2',
          name: 'Elite Motors',
          contact: 'Sarah Johnson',
          email: 'sarah@elitemotors.com',
          phone: '(901) 555-0124',
          location: 'Memphis, TN',
          status: 'Active',
          plan: 'Basic',
          monthlyFee: 149,
          vehicleCount: 45,
          lastActivity: '2024-01-14T14:22:00Z',
          joinDate: '2023-11-01',
          totalRevenue: 1194,
          scraperStatus: 'Pending'
        },
        {
          id: '3',
          name: 'Apex Auto Sales',
          contact: 'Mike Davis',
          email: 'mike@apexauto.com',
          phone: '(865) 555-0125',
          location: 'Knoxville, TN',
          status: 'Inactive',
          plan: 'Pro',
          monthlyFee: 299,
          vehicleCount: 0,
          lastActivity: '2023-12-20T09:15:00Z',
          joinDate: '2023-05-10',
          totalRevenue: 2392,
          scraperStatus: 'Stopped'
        }
      ]);
    } catch (error) {
      console.error('Error fetching dealers:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Inactive': return 'bg-red-100 text-red-800';
      case 'Suspended': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPlanColor = (plan) => {
    switch (plan) {
      case 'Pro': return 'bg-purple-100 text-purple-800';
      case 'Basic': return 'bg-blue-100 text-blue-800';
      case 'Enterprise': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredDealers = dealers.filter(dealer => {
    return (
      (filters.status === 'All' || dealer.status === filters.status) &&
      (filters.plan === 'All' || dealer.plan === filters.plan) &&
      (filters.search === '' || 
        dealer.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        dealer.contact.toLowerCase().includes(filters.search.toLowerCase()) ||
        dealer.email.toLowerCase().includes(filters.search.toLowerCase()))
    );
  });

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-yellow-400 mb-4"></div>
            <p className="text-white text-xl">Loading dealers...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Dealer Management</h2>
          <p className="text-gray-400">Manage dealer accounts, subscriptions, and billing</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold px-6 py-3 rounded-lg flex items-center"
        >
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          Add Dealer
        </button>
      </div>

      {/* Filters */}
      <div className="bg-gray-800 rounded-lg p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input 
            type="text" 
            placeholder="Search dealers..."
            value={filters.search}
            onChange={(e) => setFilters({...filters, search: e.target.value})}
            className="bg-gray-700 text-white px-4 py-3 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
          <select 
            value={filters.status}
            onChange={(e) => setFilters({...filters, status: e.target.value})}
            className="bg-gray-700 text-white px-4 py-3 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          >
            <option value="All">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="Suspended">Suspended</option>
          </select>
          <select 
            value={filters.plan}
            onChange={(e) => setFilters({...filters, plan: e.target.value})}
            className="bg-gray-700 text-white px-4 py-3 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          >
            <option value="All">All Plans</option>
            <option value="Basic">Basic</option>
            <option value="Pro">Pro</option>
            <option value="Enterprise">Enterprise</option>
          </select>
          <button className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold px-6 py-3 rounded-lg">
            Export CSV
          </button>
        </div>
      </div>

      {/* Dealers Table */}
      <div className="bg-gray-800 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-700">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-300 uppercase tracking-wider">Dealer</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-300 uppercase tracking-wider">Plan</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-300 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-300 uppercase tracking-wider">Vehicles</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-300 uppercase tracking-wider">Revenue</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-300 uppercase tracking-wider">Last Activity</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-300 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {filteredDealers.map((dealer) => (
                <tr 
                  key={dealer.id} 
                  className="hover:bg-gray-700 cursor-pointer transition-colors"
                  onClick={() => setSelectedDealer(dealer)}
                >
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-white">{dealer.name}</div>
                      <div className="text-sm text-gray-400">{dealer.contact}</div>
                      <div className="text-sm text-gray-400">{dealer.email}</div>
                      <div className="text-sm text-gray-400">{dealer.location}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPlanColor(dealer.plan)}`}>
                      {dealer.plan}
                    </span>
                    <div className="text-sm text-gray-400 mt-1">${dealer.monthlyFee}/mo</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(dealer.status)}`}>
                      {dealer.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-white">
                    {dealer.vehicleCount} vehicles
                  </td>
                  <td className="px-6 py-4 text-sm font-bold text-yellow-400">
                    ${dealer.totalRevenue.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-300">
                    {new Date(dealer.lastActivity).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-xs">
                        Edit
                      </button>
                      <button className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-xs">
                        Bill
                      </button>
                      <button className="bg-yellow-600 hover:bg-yellow-700 text-white px-3 py-1 rounded text-xs">
                        Scraper
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Dealer Details Panel (if dealer selected) */}
      {selectedDealer && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" onClick={() => setSelectedDealer(null)}></div>
            
            <div className="inline-block w-full max-w-4xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-gray-800 shadow-xl rounded-2xl">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-white">{selectedDealer.name}</h3>
                <button
                  onClick={() => setSelectedDealer(null)}
                  className="text-gray-400 hover:text-white text-2xl"
                >
                  ×
                </button>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="text-lg font-bold text-white">Contact Information</h4>
                  <div className="space-y-2">
                    <p className="text-gray-400"><span className="text-white">Contact:</span> {selectedDealer.contact}</p>
                    <p className="text-gray-400"><span className="text-white">Email:</span> {selectedDealer.email}</p>
                    <p className="text-gray-400"><span className="text-white">Phone:</span> {selectedDealer.phone}</p>
                    <p className="text-gray-400"><span className="text-white">Location:</span> {selectedDealer.location}</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h4 className="text-lg font-bold text-white">Account Details</h4>
                  <div className="space-y-2">
                    <p className="text-gray-400"><span className="text-white">Plan:</span> {selectedDealer.plan} (${selectedDealer.monthlyFee}/mo)</p>
                    <p className="text-gray-400"><span className="text-white">Status:</span> {selectedDealer.status}</p>
                    <p className="text-gray-400"><span className="text-white">Vehicles:</span> {selectedDealer.vehicleCount}</p>
                    <p className="text-gray-400"><span className="text-white">Join Date:</span> {selectedDealer.joinDate}</p>
                    <p className="text-gray-400"><span className="text-white">Total Revenue:</span> ${selectedDealer.totalRevenue.toLocaleString()}</p>
                    <p className="text-gray-400"><span className="text-white">Scraper:</span> {selectedDealer.scraperStatus}</p>
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-4 mt-6">
                <button className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-2 px-4 rounded-lg">
                  Edit Dealer
                </button>
                <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg">
                  Process Billing
                </button>
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg">
                  Run Scraper
                </button>
                <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg">
                  Suspend Account
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DealerCRM;