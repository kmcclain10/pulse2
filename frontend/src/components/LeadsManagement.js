import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const LeadsManagement = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedLead, setSelectedLead] = useState(null);
  const [newNote, setNewNote] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API}/leads`);
      setLeads(response.data);
    } catch (error) {
      console.error('Error fetching leads:', error);
      // Mock data for demo
      setLeads([
        {
          id: '1',
          customer_name: 'John Smith',
          email: 'john@email.com',
          phone: '(615) 555-0123',
          vehicle_interest: '2020 Honda Accord',
          status: 'New',
          source: 'Website',
          created_at: '2024-01-15T10:30:00Z',
          notes: []
        },
        {
          id: '2',
          customer_name: 'Sarah Johnson',
          email: 'sarah@email.com',
          phone: '(615) 555-0124',
          vehicle_interest: '2019 Ford F-150',
          status: 'Contacted',
          source: 'Phone',
          created_at: '2024-01-14T14:22:00Z',
          notes: ['Called customer, interested in financing options']
        },
        {
          id: '3',
          customer_name: 'Mike Davis',
          email: 'mike@email.com',
          phone: '(615) 555-0125',
          vehicle_interest: '2021 BMW 3 Series',
          status: 'Qualified',
          source: 'Walk-in',
          created_at: '2024-01-13T09:15:00Z',
          notes: ['Pre-approved for financing', 'Scheduled test drive for Saturday']
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const updateLeadStatus = async (leadId, newStatus) => {
    try {
      await axios.put(`${API}/leads/${leadId}`, { status: newStatus });
      setLeads(leads.map(lead => 
        lead.id === leadId ? { ...lead, status: newStatus } : lead
      ));
    } catch (error) {
      console.error('Error updating lead status:', error);
    }
  };

  const addNote = async (leadId) => {
    if (!newNote.trim()) return;
    
    try {
      await axios.put(`${API}/leads/${leadId}`, { notes: newNote });
      setLeads(leads.map(lead => 
        lead.id === leadId ? { 
          ...lead, 
          notes: [...(lead.notes || []), `${new Date().toISOString()}: ${newNote}`] 
        } : lead
      ));
      setNewNote('');
    } catch (error) {
      console.error('Error adding note:', error);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'New': return 'bg-blue-100 text-blue-800';
      case 'Contacted': return 'bg-yellow-100 text-yellow-800';
      case 'Qualified': return 'bg-green-100 text-green-800';
      case 'Lost': return 'bg-red-100 text-red-800';
      case 'Sold': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredLeads = statusFilter === 'All' 
    ? leads 
    : leads.filter(lead => lead.status === statusFilter);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-yellow-400 mb-4"></div>
          <p className="text-white text-xl">Loading leads...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-full px-6 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-white">Leads Management</h1>
        <button className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold px-6 py-3 rounded-lg">
          Add New Lead
        </button>
      </div>

      {/* Filters */}
      <div className="bg-gray-800 rounded-lg p-6 mb-6">
        <div className="flex space-x-4">
          {['All', 'New', 'Contacted', 'Qualified', 'Lost', 'Sold'].map(status => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-4 py-2 rounded-lg font-medium ${
                statusFilter === status 
                  ? 'bg-yellow-400 text-gray-900' 
                  : 'bg-gray-700 text-white hover:bg-gray-600'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Leads List */}
        <div className="lg:col-span-2">
          <div className="bg-gray-800 rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-700">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-300 uppercase">Customer</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-300 uppercase">Vehicle Interest</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-300 uppercase">Status</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-300 uppercase">Source</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-300 uppercase">Date</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-300 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {filteredLeads.map((lead) => (
                    <tr 
                      key={lead.id} 
                      className={`hover:bg-gray-700 cursor-pointer transition-colors ${
                        selectedLead?.id === lead.id ? 'bg-gray-700' : ''
                      }`}
                      onClick={() => setSelectedLead(lead)}
                    >
                      <td className="px-6 py-4">
                        <div>
                          <div className="text-sm font-medium text-white">{lead.customer_name}</div>
                          <div className="text-sm text-gray-400">{lead.email}</div>
                          <div className="text-sm text-gray-400">{lead.phone}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-white">
                        {lead.vehicle_interest || 'Not specified'}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(lead.status)}`}>
                          {lead.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-300">{lead.source}</td>
                      <td className="px-6 py-4 text-sm text-gray-300">
                        {new Date(lead.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <select
                          value={lead.status}
                          onChange={(e) => updateLeadStatus(lead.id, e.target.value)}
                          onClick={(e) => e.stopPropagation()}
                          className="bg-gray-600 text-white text-sm px-3 py-1 rounded border border-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                        >
                          <option value="New">New</option>
                          <option value="Contacted">Contacted</option>
                          <option value="Qualified">Qualified</option>
                          <option value="Lost">Lost</option>
                          <option value="Sold">Sold</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Lead Details Panel */}
        <div className="lg:col-span-1">
          <div className="bg-gray-800 rounded-lg p-6 sticky top-6">
            {selectedLead ? (
              <div>
                <h3 className="text-xl font-bold text-white mb-4">Lead Details</h3>
                
                <div className="space-y-4 mb-6">
                  <div>
                    <p className="text-sm text-gray-400">Customer Name</p>
                    <p className="text-white font-medium">{selectedLead.customer_name}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-400">Email</p>
                    <p className="text-white">{selectedLead.email}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-400">Phone</p>
                    <p className="text-white">{selectedLead.phone}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-400">Vehicle Interest</p>
                    <p className="text-white">{selectedLead.vehicle_interest || 'Not specified'}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-400">Status</p>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(selectedLead.status)}`}>
                      {selectedLead.status}
                    </span>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-400">Source</p>
                    <p className="text-white">{selectedLead.source}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-400">Created</p>
                    <p className="text-white">{new Date(selectedLead.created_at).toLocaleString()}</p>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="space-y-3 mb-6">
                  <h4 className="text-lg font-bold text-white">Quick Actions</h4>
                  <button className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg">
                    Call Customer
                  </button>
                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg">
                    Send Email
                  </button>
                  <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-lg">
                    Schedule Appointment
                  </button>
                  <button className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-2 px-4 rounded-lg">
                    Start Deal
                  </button>
                </div>

                {/* Notes Section */}
                <div>
                  <h4 className="text-lg font-bold text-white mb-3">Notes</h4>
                  
                  {/* Add Note */}
                  <div className="mb-4">
                    <textarea
                      value={newNote}
                      onChange={(e) => setNewNote(e.target.value)}
                      placeholder="Add a note..."
                      className="w-full bg-gray-700 text-white px-3 py-2 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400 resize-none"
                      rows="3"
                    />
                    <button
                      onClick={() => addNote(selectedLead.id)}
                      className="mt-2 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-2 px-4 rounded-lg"
                    >
                      Add Note
                    </button>
                  </div>

                  {/* Notes List */}
                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {selectedLead.notes && selectedLead.notes.length > 0 ? (
                      selectedLead.notes.map((note, index) => (
                        <div key={index} className="bg-gray-700 rounded-lg p-3">
                          <p className="text-white text-sm">{note}</p>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-400 text-sm">No notes yet</p>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-400 py-8">
                <p>Select a lead to view details</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeadsManagement;