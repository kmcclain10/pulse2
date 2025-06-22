import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const ScraperManagement = () => {
  const [scraperJobs, setScraperJobs] = useState([]);
  const [dealers, setDealers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showJobModal, setShowJobModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  useEffect(() => {
    fetchScraperData();
  }, []);

  const fetchScraperData = async () => {
    try {
      setLoading(true);
      // Mock scraper data - replace with real API calls
      setScraperJobs([
        {
          id: '1',
          dealerId: '1',
          dealerName: 'Premier Auto Group',
          status: 'Running',
          startTime: '2024-01-15T10:30:00Z',
          endTime: null,
          vehiclesFound: 45,
          vehiclesProcessed: 32,
          errors: 0,
          url: 'https://premierauto.com',
          lastRun: '2024-01-15T10:30:00Z',
          nextRun: '2024-01-16T10:30:00Z'
        },
        {
          id: '2',
          dealerId: '2',
          dealerName: 'Elite Motors',
          status: 'Completed',
          startTime: '2024-01-15T08:00:00Z',
          endTime: '2024-01-15T08:45:00Z',
          vehiclesFound: 67,
          vehiclesProcessed: 67,
          errors: 0,
          url: 'https://elitemotors.com',
          lastRun: '2024-01-15T08:00:00Z',
          nextRun: '2024-01-16T08:00:00Z'
        },
        {
          id: '3',
          dealerId: '3',
          dealerName: 'Apex Auto Sales',
          status: 'Failed',
          startTime: '2024-01-15T06:00:00Z',
          endTime: '2024-01-15T06:15:00Z',
          vehiclesFound: 0,
          vehiclesProcessed: 0,
          errors: 5,
          url: 'https://apexauto.com',
          lastRun: '2024-01-15T06:00:00Z',
          nextRun: '2024-01-16T06:00:00Z'
        }
      ]);

      setDealers([
        { id: '1', name: 'Premier Auto Group', url: 'https://premierauto.com' },
        { id: '2', name: 'Elite Motors', url: 'https://elitemotors.com' },
        { id: '3', name: 'Apex Auto Sales', url: 'https://apexauto.com' },
        { id: '4', name: 'Luxury Motors', url: 'https://luxurymotors.com' },
        { id: '5', name: 'City Auto', url: 'https://cityauto.com' }
      ]);
    } catch (error) {
      console.error('Error fetching scraper data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Running': return 'bg-blue-100 text-blue-800';
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'Failed': return 'bg-red-100 text-red-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Paused': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const runScraper = async (dealerId) => {
    try {
      // API call to start scraper
      console.log('Starting scraper for dealer:', dealerId);
      // Update UI to show running status
    } catch (error) {
      console.error('Error starting scraper:', error);
    }
  };

  const stopScraper = async (jobId) => {
    try {
      // API call to stop scraper
      console.log('Stopping scraper job:', jobId);
    } catch (error) {
      console.error('Error stopping scraper:', error);
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-yellow-400 mb-4"></div>
            <p className="text-white text-xl">Loading scraper data...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Scraper Management</h2>
          <p className="text-gray-400">Manage dealer photo scraping jobs and schedules</p>
        </div>
        <div className="flex space-x-4">
          <button 
            onClick={() => setShowJobModal(true)}
            className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold px-6 py-3 rounded-lg flex items-center"
          >
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            New Scraper Job
          </button>
          <button className="bg-green-600 hover:bg-green-700 text-white font-bold px-6 py-3 rounded-lg">
            Run All Scrapers
          </button>
        </div>
      </div>

      {/* Scraper Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-gray-800 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Active Jobs</p>
              <p className="text-3xl font-bold text-white">{scraperJobs.filter(job => job.status === 'Running').length}</p>
            </div>
            <div className="bg-blue-600 w-12 h-12 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Completed Today</p>
              <p className="text-3xl font-bold text-white">{scraperJobs.filter(job => job.status === 'Completed').length}</p>
            </div>
            <div className="bg-green-600 w-12 h-12 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Vehicles</p>
              <p className="text-3xl font-bold text-white">{scraperJobs.reduce((sum, job) => sum + job.vehiclesProcessed, 0)}</p>
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
              <p className="text-gray-400 text-sm">Failed Jobs</p>
              <p className="text-3xl font-bold text-white">{scraperJobs.filter(job => job.status === 'Failed').length}</p>
            </div>
            <div className="bg-red-600 w-12 h-12 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Scraper Jobs Table */}
      <div className="bg-gray-800 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-700">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-300 uppercase tracking-wider">Dealer</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-300 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-300 uppercase tracking-wider">Progress</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-300 uppercase tracking-wider">Duration</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-300 uppercase tracking-wider">Next Run</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-300 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {scraperJobs.map((job) => (
                <tr 
                  key={job.id} 
                  className="hover:bg-gray-700 cursor-pointer transition-colors"
                  onClick={() => setSelectedJob(job)}
                >
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-white">{job.dealerName}</div>
                      <div className="text-sm text-gray-400">{job.url}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(job.status)}`}>
                      {job.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-white">
                      {job.vehiclesProcessed} / {job.vehiclesFound} vehicles
                    </div>
                    <div className="w-full bg-gray-600 rounded-full h-2 mt-1">
                      <div 
                        className="bg-yellow-400 h-2 rounded-full" 
                        style={{ width: `${job.vehiclesFound > 0 ? (job.vehiclesProcessed / job.vehiclesFound) * 100 : 0}%` }}
                      ></div>
                    </div>
                    {job.errors > 0 && (
                      <div className="text-xs text-red-400 mt-1">{job.errors} errors</div>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-300">
                    {job.endTime 
                      ? `${Math.round((new Date(job.endTime) - new Date(job.startTime)) / 60000)} min`
                      : job.status === 'Running' 
                        ? `${Math.round((new Date() - new Date(job.startTime)) / 60000)} min`
                        : '-'
                    }
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-300">
                    {new Date(job.nextRun).toLocaleString()}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      {job.status === 'Running' ? (
                        <button 
                          onClick={(e) => { e.stopPropagation(); stopScraper(job.id); }}
                          className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-xs"
                        >
                          Stop
                        </button>
                      ) : (
                        <button 
                          onClick={(e) => { e.stopPropagation(); runScraper(job.dealerId); }}
                          className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-xs"
                        >
                          Run
                        </button>
                      )}
                      <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-xs">
                        Logs
                      </button>
                      <button className="bg-gray-600 hover:bg-gray-500 text-white px-3 py-1 rounded text-xs">
                        Config
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Job Details Modal */}
      {selectedJob && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" onClick={() => setSelectedJob(null)}></div>
            
            <div className="inline-block w-full max-w-4xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-gray-800 shadow-xl rounded-2xl">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-white">Scraper Job Details</h3>
                <button
                  onClick={() => setSelectedJob(null)}
                  className="text-gray-400 hover:text-white text-2xl"
                >
                  ×
                </button>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="text-lg font-bold text-white">Job Information</h4>
                  <div className="space-y-2">
                    <p className="text-gray-400"><span className="text-white">Dealer:</span> {selectedJob.dealerName}</p>
                    <p className="text-gray-400"><span className="text-white">URL:</span> {selectedJob.url}</p>
                    <p className="text-gray-400"><span className="text-white">Status:</span> {selectedJob.status}</p>
                    <p className="text-gray-400"><span className="text-white">Start Time:</span> {new Date(selectedJob.startTime).toLocaleString()}</p>
                    {selectedJob.endTime && (
                      <p className="text-gray-400"><span className="text-white">End Time:</span> {new Date(selectedJob.endTime).toLocaleString()}</p>
                    )}
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h4 className="text-lg font-bold text-white">Results</h4>
                  <div className="space-y-2">
                    <p className="text-gray-400"><span className="text-white">Vehicles Found:</span> {selectedJob.vehiclesFound}</p>
                    <p className="text-gray-400"><span className="text-white">Vehicles Processed:</span> {selectedJob.vehiclesProcessed}</p>
                    <p className="text-gray-400"><span className="text-white">Errors:</span> {selectedJob.errors}</p>
                    <p className="text-gray-400"><span className="text-white">Next Run:</span> {new Date(selectedJob.nextRun).toLocaleString()}</p>
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-4 mt-6">
                <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg">
                  Run Again
                </button>
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg">
                  View Logs
                </button>
                <button className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-2 px-4 rounded-lg">
                  Edit Schedule
                </button>
                <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg">
                  Delete Job
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScraperManagement;