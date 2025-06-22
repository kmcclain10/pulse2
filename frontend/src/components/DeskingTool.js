import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const DeskingTool = ({ vehicle = null }) => {
  const [calculations, setCalculations] = useState({
    vehicle_price: vehicle?.price || 25000,
    trade_value: 0,
    down_payment: 0,
    
    // Add-ons
    extended_warranty: 0,
    gap_insurance: 0,
    credit_life: 0,
    disability_insurance: 0,
    service_contract: 0,
    
    // Taxes and Fees
    sales_tax_rate: 9.25, // 9.25%
    doc_fee: 699,
    title_fee: 75,
    registration_fee: 24,
    
    // Finance Terms
    interest_rate: 7.5,
    loan_term: 72
  });

  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);

  // Auto-calculate when values change
  useEffect(() => {
    calculatePayments();
  }, [calculations]);

  const calculatePayments = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`${API}/desking/calculate`, calculations);
      setResults(response.data);
    } catch (error) {
      console.error('Error calculating payments:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateCalculation = (field, value) => {
    setCalculations(prev => ({
      ...prev,
      [field]: parseFloat(value) || 0
    }));
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatPercentage = (rate) => {
    return `${rate}%`;
  };

  return (
    <div className="bg-gray-800 rounded-xl p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">Professional Desking Tool</h1>
        <div className="flex space-x-4">
          <button className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold px-6 py-2 rounded-lg">
            Save Deal
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-2 rounded-lg">
            Print Deal Sheet
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column - Vehicle & Trade */}
        <div className="space-y-6">
          <div className="bg-gray-700 rounded-lg p-6">
            <h3 className="text-xl font-bold text-white mb-4">Vehicle Information</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Vehicle Price</label>
                <input
                  type="number"
                  value={calculations.vehicle_price}
                  onChange={(e) => updateCalculation('vehicle_price', e.target.value)}
                  className="w-full bg-gray-600 text-white px-4 py-3 rounded-lg border border-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Trade Value</label>
                <input
                  type="number"
                  value={calculations.trade_value}
                  onChange={(e) => updateCalculation('trade_value', e.target.value)}
                  className="w-full bg-gray-600 text-white px-4 py-3 rounded-lg border border-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Down Payment</label>
                <input
                  type="number"
                  value={calculations.down_payment}
                  onChange={(e) => updateCalculation('down_payment', e.target.value)}
                  className="w-full bg-gray-600 text-white px-4 py-3 rounded-lg border border-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
              </div>

              {results && (
                <div className="bg-gray-600 rounded-lg p-4">
                  <p className="text-gray-300 text-sm">Net Trade Difference</p>
                  <p className="text-white font-bold text-lg">{formatCurrency(results.net_trade_difference)}</p>
                </div>
              )}
            </div>
          </div>

          {/* Finance Terms */}
          <div className="bg-gray-700 rounded-lg p-6">
            <h3 className="text-xl font-bold text-white mb-4">Finance Terms</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Interest Rate (%)</label>
                <input
                  type="number"
                  step="0.01"
                  value={calculations.interest_rate}
                  onChange={(e) => updateCalculation('interest_rate', e.target.value)}
                  className="w-full bg-gray-600 text-white px-4 py-3 rounded-lg border border-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Loan Term (months)</label>
                <select
                  value={calculations.loan_term}
                  onChange={(e) => updateCalculation('loan_term', e.target.value)}
                  className="w-full bg-gray-600 text-white px-4 py-3 rounded-lg border border-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                >
                  <option value="36">36 months</option>
                  <option value="48">48 months</option>
                  <option value="60">60 months</option>
                  <option value="72">72 months</option>
                  <option value="84">84 months</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Middle Column - Add-ons & Products */}
        <div className="space-y-6">
          <div className="bg-gray-700 rounded-lg p-6">
            <h3 className="text-xl font-bold text-white mb-4">Protection Products</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Extended Warranty</label>
                <input
                  type="number"
                  value={calculations.extended_warranty}
                  onChange={(e) => updateCalculation('extended_warranty', e.target.value)}
                  className="w-full bg-gray-600 text-white px-4 py-3 rounded-lg border border-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">GAP Insurance</label>
                <input
                  type="number"
                  value={calculations.gap_insurance}
                  onChange={(e) => updateCalculation('gap_insurance', e.target.value)}
                  className="w-full bg-gray-600 text-white px-4 py-3 rounded-lg border border-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Credit Life Insurance</label>
                <input
                  type="number"
                  value={calculations.credit_life}
                  onChange={(e) => updateCalculation('credit_life', e.target.value)}
                  className="w-full bg-gray-600 text-white px-4 py-3 rounded-lg border border-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Disability Insurance</label>
                <input
                  type="number"
                  value={calculations.disability_insurance}
                  onChange={(e) => updateCalculation('disability_insurance', e.target.value)}
                  className="w-full bg-gray-600 text-white px-4 py-3 rounded-lg border border-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Service Contract</label>
                <input
                  type="number"
                  value={calculations.service_contract}
                  onChange={(e) => updateCalculation('service_contract', e.target.value)}
                  className="w-full bg-gray-600 text-white px-4 py-3 rounded-lg border border-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
              </div>

              {results && (
                <div className="bg-gray-600 rounded-lg p-4">
                  <p className="text-gray-300 text-sm">Total Add-ons</p>
                  <p className="text-white font-bold text-lg">{formatCurrency(results.total_add_ons)}</p>
                </div>
              )}
            </div>
          </div>

          {/* Taxes and Fees */}
          <div className="bg-gray-700 rounded-lg p-6">
            <h3 className="text-xl font-bold text-white mb-4">Taxes & Fees</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Sales Tax Rate (%)</label>
                <input
                  type="number"
                  step="0.01"
                  value={calculations.sales_tax_rate}
                  onChange={(e) => updateCalculation('sales_tax_rate', e.target.value / 100)}
                  className="w-full bg-gray-600 text-white px-4 py-3 rounded-lg border border-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Doc Fee</label>
                <input
                  type="number"
                  value={calculations.doc_fee}
                  onChange={(e) => updateCalculation('doc_fee', e.target.value)}
                  className="w-full bg-gray-600 text-white px-4 py-3 rounded-lg border border-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Title Fee</label>
                <input
                  type="number"
                  value={calculations.title_fee}
                  onChange={(e) => updateCalculation('title_fee', e.target.value)}
                  className="w-full bg-gray-600 text-white px-4 py-3 rounded-lg border border-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Registration Fee</label>
                <input
                  type="number"
                  value={calculations.registration_fee}
                  onChange={(e) => updateCalculation('registration_fee', e.target.value)}
                  className="w-full bg-gray-600 text-white px-4 py-3 rounded-lg border border-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
              </div>

              {results && (
                <div className="space-y-2">
                  <div className="bg-gray-600 rounded-lg p-4">
                    <p className="text-gray-300 text-sm">Sales Tax</p>
                    <p className="text-white font-bold text-lg">{formatCurrency(results.sales_tax)}</p>
                  </div>
                  <div className="bg-gray-600 rounded-lg p-4">
                    <p className="text-gray-300 text-sm">Total Fees</p>
                    <p className="text-white font-bold text-lg">{formatCurrency(results.total_fees)}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column - Payment Summary */}
        <div className="space-y-6">
          <div className="bg-gray-700 rounded-lg p-6">
            <h3 className="text-xl font-bold text-white mb-4">Payment Summary</h3>
            
            {loading ? (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-400"></div>
              </div>
            ) : results ? (
              <div className="space-y-6">
                {/* Monthly Payment - Big Display */}
                <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-lg p-6 text-center">
                  <p className="text-gray-900 text-sm font-medium mb-2">Monthly Payment</p>
                  <p className="text-gray-900 text-4xl font-bold">{formatCurrency(results.monthly_payment)}</p>
                  <p className="text-gray-700 text-sm mt-1">{results.loan_term} months @ {formatPercentage(results.interest_rate)}</p>
                </div>

                {/* Deal Summary */}
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-300">Vehicle Price:</span>
                    <span className="text-white font-bold">{formatCurrency(results.vehicle_price)}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-300">Trade Value:</span>
                    <span className="text-white font-bold">-{formatCurrency(results.trade_value)}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-300">Down Payment:</span>
                    <span className="text-white font-bold">-{formatCurrency(results.down_payment)}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-300">Add-ons:</span>
                    <span className="text-white font-bold">{formatCurrency(results.total_add_ons)}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-300">Sales Tax:</span>
                    <span className="text-white font-bold">{formatCurrency(results.sales_tax)}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-300">Fees:</span>
                    <span className="text-white font-bold">{formatCurrency(results.total_fees)}</span>
                  </div>
                  
                  <div className="border-t border-gray-600 pt-3">
                    <div className="flex justify-between">
                      <span className="text-yellow-400 font-bold">Amount Financed:</span>
                      <span className="text-yellow-400 font-bold text-lg">{formatCurrency(results.total_amount_financed)}</span>
                    </div>
                  </div>
                </div>

                {/* Alternative Payment Options */}
                <div className="bg-gray-600 rounded-lg p-4">
                  <h4 className="text-white font-bold mb-3">Alternative Terms</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-300">48 months:</span>
                      <span className="text-white">{formatCurrency(results.total_amount_financed / 48)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">60 months:</span>
                      <span className="text-white">{formatCurrency(results.total_amount_financed / 60)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">84 months:</span>
                      <span className="text-white">{formatCurrency(results.total_amount_financed / 84)}</span>
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
          </div>

          {/* Quick Actions */}
          <div className="bg-gray-700 rounded-lg p-6">
            <h4 className="text-white font-bold mb-4">Quick Actions</h4>
            <div className="space-y-3">
              <button className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg">
                Generate Credit App
              </button>
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg">
                Send to F&I
              </button>
              <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-4 rounded-lg">
                Email Customer
              </button>
              <button className="w-full bg-gray-600 hover:bg-gray-500 text-white font-bold py-3 px-4 rounded-lg">
                Print Worksheet
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeskingTool;