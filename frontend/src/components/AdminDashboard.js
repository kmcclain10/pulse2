import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalDealers: 0,
    activeDealers: 0,
    totalRevenue: 0,
    monthlyGrowth: 0,
    totalVehicles: 0,
    scraperJobs: 0
  });

  const [recentActivity, setRecentActivity] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAdminStats();
  }, []);

  const fetchAdminStats = async () => {
    try {
      // This would be an admin-specific stats endpoint
      setStats({
        totalDealers: 247,
        activeDealers: 198,
        totalRevenue: 127500,
        monthlyGrowth: 12.5,
        totalVehicles: 15420,
        scraperJobs: 1250
      });

      setRecentActivity([
        { id: 1, type: 'new_dealer', message: 'Premier Auto Group signed up', time: '2 hours ago' },
        { id: 2, type: 'scraper', message: 'Scraper completed for Elite Motors - 45 vehicles', time: '4 hours ago' },
        { id: 3, type: 'billing', message: 'Payment received from Apex Auto Sales - $299', time: '6 hours ago' },
        { id: 4, type: 'subscription', message: 'Luxury Motors upgraded to Pro plan', time: '1 day ago' },
        { id: 5, type: 'scraper', message: 'Scraper failed for City Auto - retry scheduled', time: '1 day ago' }
      ]);
    } catch (error) {
      console.error('Error fetching admin stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-yellow-400 mb-4"></div>
            <p className="text-white text-xl">Loading dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">Admin Dashboard</h2>
        <p className="text-gray-400">PULSE Auto Market - Master Control Panel</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-gray-800 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Dealers</p>
              <p className="text-3xl font-bold text-white">{stats.totalDealers}</p>
              <p className="text-green-400 text-sm">{stats.activeDealers} active</p>
            </div>
            <div className="bg-blue-600 w-12 h-12 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Monthly Revenue</p>
              <p className="text-3xl font-bold text-white">${stats.totalRevenue.toLocaleString()}</p>
              <p className="text-green-400 text-sm">+{stats.monthlyGrowth}% growth</p>
            </div>
            <div className="bg-green-600 w-12 h-12 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Vehicles</p>
              <p className="text-3xl font-bold text-white">{stats.totalVehicles.toLocaleString()}</p>
              <p className="text-blue-400 text-sm">Across all dealers</p>
            </div>
            <div className="bg-purple-600 w-12 h-12 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 9l-1.26-3.78A2 2 0 0 0 15.84 4H8.16a2 2 0 0 0-1.9 1.22L5 9H3v11a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-1h12v1a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1V9h-2z"/>
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Scraper Jobs</p>
              <p className="text-3xl font-bold text-white">{stats.scraperJobs}</p>
              <p className="text-yellow-400 text-sm">This month</p>
            </div>
            <div className="bg-yellow-600 w-12 h-12 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-gray-800 rounded-xl p-6">
          <h3 className="text-xl font-bold text-white mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-center space-x-3 p-3 bg-gray-700 rounded-lg">
                <div className={`w-3 h-3 rounded-full ${
                  activity.type === 'new_dealer' ? 'bg-green-400' :
                  activity.type === 'scraper' ? 'bg-yellow-400' :
                  activity.type === 'billing' ? 'bg-blue-400' :
                  activity.type === 'subscription' ? 'bg-purple-400' : 'bg-gray-400'
                }`}></div>
                <div className="flex-1">
                  <p className="text-white text-sm">{activity.message}</p>
                  <p className="text-gray-400 text-xs">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-gray-800 rounded-xl p-6">
          <h3 className="text-xl font-bold text-white mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-4">
            <button className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold py-3 px-4 rounded-lg transition-colors">
              Run Scraper
            </button>
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-colors">
              Add Dealer
            </button>
            <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg transition-colors">
              Generate Report
            </button>
            <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-4 rounded-lg transition-colors">
              View Billing
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;