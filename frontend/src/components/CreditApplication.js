import React, { useState } from 'react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const CreditApplication = ({ vehicle = null, onComplete = null }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Personal Information
    firstName: '',
    lastName: '',
    middleName: '',
    ssn: '',
    dateOfBirth: '',
    email: '',
    phone: '',
    
    // Address Information
    address: '',
    city: '',
    state: '',
    zipCode: '',
    timeAtAddress: '',
    housingStatus: '',
    monthlyPayment: '',
    
    // Employment Information
    employmentStatus: '',
    employer: '',
    jobTitle: '',
    workPhone: '',
    monthlyIncome: '',
    timeAtJob: '',
    
    // Co-Applicant Information
    hasCoApplicant: false,
    coFirstName: '',
    coLastName: '',
    coSSN: '',
    coDateOfBirth: '',
    coPhone: '',
    coEmployer: '',
    coMonthlyIncome: '',
    
    // Financial Information
    bankName: '',
    accountType: '',
    monthlyExpenses: '',
    otherIncome: '',
    
    // Trade Information
    hasTradeIn: false,
    tradeYear: '',
    tradeMake: '',
    tradeModel: '',
    tradeMileage: '',
    tradeOwed: '',
    
    // Desired Terms
    downPayment: '',
    desiredPayment: '',
    desiredTerm: '72'
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const updateFormData = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: null
      }));
    }
  };

  const validateStep = (step) => {
    const newErrors = {};
    
    switch (step) {
      case 1: // Personal Information
        if (!formData.firstName) newErrors.firstName = 'First name is required';
        if (!formData.lastName) newErrors.lastName = 'Last name is required';
        if (!formData.ssn) newErrors.ssn = 'SSN is required';
        if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
        if (!formData.email) newErrors.email = 'Email is required';
        if (!formData.phone) newErrors.phone = 'Phone is required';
        break;
        
      case 2: // Address Information
        if (!formData.address) newErrors.address = 'Address is required';
        if (!formData.city) newErrors.city = 'City is required';
        if (!formData.state) newErrors.state = 'State is required';
        if (!formData.zipCode) newErrors.zipCode = 'ZIP code is required';
        if (!formData.timeAtAddress) newErrors.timeAtAddress = 'Time at address is required';
        if (!formData.housingStatus) newErrors.housingStatus = 'Housing status is required';
        break;
        
      case 3: // Employment Information
        if (!formData.employmentStatus) newErrors.employmentStatus = 'Employment status is required';
        if (!formData.employer) newErrors.employer = 'Employer is required';
        if (!formData.monthlyIncome) newErrors.monthlyIncome = 'Monthly income is required';
        if (!formData.timeAtJob) newErrors.timeAtJob = 'Time at job is required';
        break;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 5));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const submitApplication = async () => {
    setSubmitting(true);
    try {
      // Submit to backend
      const response = await axios.post(`${API}/credit-applications`, {
        ...formData,
        vehicleId: vehicle?.id,
        vehiclePrice: vehicle?.price
      });
      
      if (onComplete) {
        onComplete(response.data);
      }
      
      alert('Credit application submitted successfully!');
    } catch (error) {
      console.error('Error submitting application:', error);
      alert('Error submitting application. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-white mb-4">Personal Information</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">First Name *</label>
          <input
            type="text"
            value={formData.firstName}
            onChange={(e) => updateFormData('firstName', e.target.value)}
            className={`w-full bg-gray-700 text-white px-4 py-3 rounded-lg border ${errors.firstName ? 'border-red-500' : 'border-gray-600'} focus:outline-none focus:ring-2 focus:ring-yellow-400`}
          />
          {errors.firstName && <p className="text-red-400 text-sm mt-1">{errors.firstName}</p>}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Last Name *</label>
          <input
            type="text"
            value={formData.lastName}
            onChange={(e) => updateFormData('lastName', e.target.value)}
            className={`w-full bg-gray-700 text-white px-4 py-3 rounded-lg border ${errors.lastName ? 'border-red-500' : 'border-gray-600'} focus:outline-none focus:ring-2 focus:ring-yellow-400`}
          />
          {errors.lastName && <p className="text-red-400 text-sm mt-1">{errors.lastName}</p>}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Middle Name</label>
          <input
            type="text"
            value={formData.middleName}
            onChange={(e) => updateFormData('middleName', e.target.value)}
            className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Social Security Number *</label>
          <input
            type="text"
            value={formData.ssn}
            onChange={(e) => updateFormData('ssn', e.target.value)}
            placeholder="XXX-XX-XXXX"
            className={`w-full bg-gray-700 text-white px-4 py-3 rounded-lg border ${errors.ssn ? 'border-red-500' : 'border-gray-600'} focus:outline-none focus:ring-2 focus:ring-yellow-400`}
          />
          {errors.ssn && <p className="text-red-400 text-sm mt-1">{errors.ssn}</p>}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Date of Birth *</label>
          <input
            type="date"
            value={formData.dateOfBirth}
            onChange={(e) => updateFormData('dateOfBirth', e.target.value)}
            className={`w-full bg-gray-700 text-white px-4 py-3 rounded-lg border ${errors.dateOfBirth ? 'border-red-500' : 'border-gray-600'} focus:outline-none focus:ring-2 focus:ring-yellow-400`}
          />
          {errors.dateOfBirth && <p className="text-red-400 text-sm mt-1">{errors.dateOfBirth}</p>}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Email Address *</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => updateFormData('email', e.target.value)}
            className={`w-full bg-gray-700 text-white px-4 py-3 rounded-lg border ${errors.email ? 'border-red-500' : 'border-gray-600'} focus:outline-none focus:ring-2 focus:ring-yellow-400`}
          />
          {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Phone Number *</label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => updateFormData('phone', e.target.value)}
            placeholder="(XXX) XXX-XXXX"
            className={`w-full bg-gray-700 text-white px-4 py-3 rounded-lg border ${errors.phone ? 'border-red-500' : 'border-gray-600'} focus:outline-none focus:ring-2 focus:ring-yellow-400`}
          />
          {errors.phone && <p className="text-red-400 text-sm mt-1">{errors.phone}</p>}
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-white mb-4">Address Information</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-300 mb-2">Street Address *</label>
          <input
            type="text"
            value={formData.address}
            onChange={(e) => updateFormData('address', e.target.value)}
            className={`w-full bg-gray-700 text-white px-4 py-3 rounded-lg border ${errors.address ? 'border-red-500' : 'border-gray-600'} focus:outline-none focus:ring-2 focus:ring-yellow-400`}
          />
          {errors.address && <p className="text-red-400 text-sm mt-1">{errors.address}</p>}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">City *</label>
          <input
            type="text"
            value={formData.city}
            onChange={(e) => updateFormData('city', e.target.value)}
            className={`w-full bg-gray-700 text-white px-4 py-3 rounded-lg border ${errors.city ? 'border-red-500' : 'border-gray-600'} focus:outline-none focus:ring-2 focus:ring-yellow-400`}
          />
          {errors.city && <p className="text-red-400 text-sm mt-1">{errors.city}</p>}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">State *</label>
          <select
            value={formData.state}
            onChange={(e) => updateFormData('state', e.target.value)}
            className={`w-full bg-gray-700 text-white px-4 py-3 rounded-lg border ${errors.state ? 'border-red-500' : 'border-gray-600'} focus:outline-none focus:ring-2 focus:ring-yellow-400`}
          >
            <option value="">Select State</option>
            <option value="TN">Tennessee</option>
            <option value="AL">Alabama</option>
            <option value="GA">Georgia</option>
            <option value="KY">Kentucky</option>
            <option value="NC">North Carolina</option>
            {/* Add more states as needed */}
          </select>
          {errors.state && <p className="text-red-400 text-sm mt-1">{errors.state}</p>}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">ZIP Code *</label>
          <input
            type="text"
            value={formData.zipCode}
            onChange={(e) => updateFormData('zipCode', e.target.value)}
            className={`w-full bg-gray-700 text-white px-4 py-3 rounded-lg border ${errors.zipCode ? 'border-red-500' : 'border-gray-600'} focus:outline-none focus:ring-2 focus:ring-yellow-400`}
          />
          {errors.zipCode && <p className="text-red-400 text-sm mt-1">{errors.zipCode}</p>}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Time at Address *</label>
          <select
            value={formData.timeAtAddress}
            onChange={(e) => updateFormData('timeAtAddress', e.target.value)}
            className={`w-full bg-gray-700 text-white px-4 py-3 rounded-lg border ${errors.timeAtAddress ? 'border-red-500' : 'border-gray-600'} focus:outline-none focus:ring-2 focus:ring-yellow-400`}
          >
            <option value="">Select Time</option>
            <option value="Less than 1 year">Less than 1 year</option>
            <option value="1-2 years">1-2 years</option>
            <option value="2-5 years">2-5 years</option>
            <option value="5+ years">5+ years</option>
          </select>
          {errors.timeAtAddress && <p className="text-red-400 text-sm mt-1">{errors.timeAtAddress}</p>}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Housing Status *</label>
          <select
            value={formData.housingStatus}
            onChange={(e) => updateFormData('housingStatus', e.target.value)}
            className={`w-full bg-gray-700 text-white px-4 py-3 rounded-lg border ${errors.housingStatus ? 'border-red-500' : 'border-gray-600'} focus:outline-none focus:ring-2 focus:ring-yellow-400`}
          >
            <option value="">Select Housing Status</option>
            <option value="Own">Own</option>
            <option value="Rent">Rent</option>
            <option value="Live with Relatives">Live with Relatives</option>
            <option value="Other">Other</option>
          </select>
          {errors.housingStatus && <p className="text-red-400 text-sm mt-1">{errors.housingStatus}</p>}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Monthly Housing Payment</label>
          <input
            type="number"
            value={formData.monthlyPayment}
            onChange={(e) => updateFormData('monthlyPayment', e.target.value)}
            placeholder="$0"
            className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-white mb-4">Employment Information</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Employment Status *</label>
          <select
            value={formData.employmentStatus}
            onChange={(e) => updateFormData('employmentStatus', e.target.value)}
            className={`w-full bg-gray-700 text-white px-4 py-3 rounded-lg border ${errors.employmentStatus ? 'border-red-500' : 'border-gray-600'} focus:outline-none focus:ring-2 focus:ring-yellow-400`}
          >
            <option value="">Select Status</option>
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Self-employed">Self-employed</option>
            <option value="Retired">Retired</option>
            <option value="Unemployed">Unemployed</option>
            <option value="Student">Student</option>
          </select>
          {errors.employmentStatus && <p className="text-red-400 text-sm mt-1">{errors.employmentStatus}</p>}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Employer Name *</label>
          <input
            type="text"
            value={formData.employer}
            onChange={(e) => updateFormData('employer', e.target.value)}
            className={`w-full bg-gray-700 text-white px-4 py-3 rounded-lg border ${errors.employer ? 'border-red-500' : 'border-gray-600'} focus:outline-none focus:ring-2 focus:ring-yellow-400`}
          />
          {errors.employer && <p className="text-red-400 text-sm mt-1">{errors.employer}</p>}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Job Title</label>
          <input
            type="text"
            value={formData.jobTitle}
            onChange={(e) => updateFormData('jobTitle', e.target.value)}
            className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Work Phone</label>
          <input
            type="tel"
            value={formData.workPhone}
            onChange={(e) => updateFormData('workPhone', e.target.value)}
            placeholder="(XXX) XXX-XXXX"
            className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Monthly Gross Income *</label>
          <input
            type="number"
            value={formData.monthlyIncome}
            onChange={(e) => updateFormData('monthlyIncome', e.target.value)}
            placeholder="$0"
            className={`w-full bg-gray-700 text-white px-4 py-3 rounded-lg border ${errors.monthlyIncome ? 'border-red-500' : 'border-gray-600'} focus:outline-none focus:ring-2 focus:ring-yellow-400`}
          />
          {errors.monthlyIncome && <p className="text-red-400 text-sm mt-1">{errors.monthlyIncome}</p>}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Time at Job *</label>
          <select
            value={formData.timeAtJob}
            onChange={(e) => updateFormData('timeAtJob', e.target.value)}
            className={`w-full bg-gray-700 text-white px-4 py-3 rounded-lg border ${errors.timeAtJob ? 'border-red-500' : 'border-gray-600'} focus:outline-none focus:ring-2 focus:ring-yellow-400`}
          >
            <option value="">Select Time</option>
            <option value="Less than 6 months">Less than 6 months</option>
            <option value="6 months - 1 year">6 months - 1 year</option>
            <option value="1-2 years">1-2 years</option>
            <option value="2-5 years">2-5 years</option>
            <option value="5+ years">5+ years</option>
          </select>
          {errors.timeAtJob && <p className="text-red-400 text-sm mt-1">{errors.timeAtJob}</p>}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Other Monthly Income</label>
          <input
            type="number"
            value={formData.otherIncome}
            onChange={(e) => updateFormData('otherIncome', e.target.value)}
            placeholder="$0"
            className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Monthly Expenses</label>
          <input
            type="number"
            value={formData.monthlyExpenses}
            onChange={(e) => updateFormData('monthlyExpenses', e.target.value)}
            placeholder="$0"
            className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-white mb-4">Trade-In & Financial Information</h3>
      
      {/* Trade-In Section */}
      <div className="bg-gray-700 rounded-lg p-6">
        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            checked={formData.hasTradeIn}
            onChange={(e) => updateFormData('hasTradeIn', e.target.checked)}
            className="w-4 h-4 text-yellow-400 bg-gray-600 border-gray-500 rounded focus:ring-yellow-400"
          />
          <label className="ml-2 text-white font-medium">I have a trade-in vehicle</label>
        </div>
        
        {formData.hasTradeIn && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Trade Year</label>
              <input
                type="number"
                value={formData.tradeYear}
                onChange={(e) => updateFormData('tradeYear', e.target.value)}
                placeholder="2020"
                className="w-full bg-gray-600 text-white px-4 py-3 rounded-lg border border-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Trade Make</label>
              <input
                type="text"
                value={formData.tradeMake}
                onChange={(e) => updateFormData('tradeMake', e.target.value)}
                placeholder="Honda"
                className="w-full bg-gray-600 text-white px-4 py-3 rounded-lg border border-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Trade Model</label>
              <input
                type="text"
                value={formData.tradeModel}
                onChange={(e) => updateFormData('tradeModel', e.target.value)}
                placeholder="Accord"
                className="w-full bg-gray-600 text-white px-4 py-3 rounded-lg border border-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Mileage</label>
              <input
                type="number"
                value={formData.tradeMileage}
                onChange={(e) => updateFormData('tradeMileage', e.target.value)}
                placeholder="50000"
                className="w-full bg-gray-600 text-white px-4 py-3 rounded-lg border border-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Amount Owed</label>
              <input
                type="number"
                value={formData.tradeOwed}
                onChange={(e) => updateFormData('tradeOwed', e.target.value)}
                placeholder="$0"
                className="w-full bg-gray-600 text-white px-4 py-3 rounded-lg border border-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>
          </div>
        )}
      </div>

      {/* Banking Information */}
      <div className="bg-gray-700 rounded-lg p-6">
        <h4 className="text-lg font-bold text-white mb-4">Banking Information</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Bank Name</label>
            <input
              type="text"
              value={formData.bankName}
              onChange={(e) => updateFormData('bankName', e.target.value)}
              className="w-full bg-gray-600 text-white px-4 py-3 rounded-lg border border-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Account Type</label>
            <select
              value={formData.accountType}
              onChange={(e) => updateFormData('accountType', e.target.value)}
              className="w-full bg-gray-600 text-white px-4 py-3 rounded-lg border border-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            >
              <option value="">Select Type</option>
              <option value="Checking">Checking</option>
              <option value="Savings">Savings</option>
              <option value="Both">Both</option>
            </select>
          </div>
        </div>
      </div>

      {/* Desired Terms */}
      <div className="bg-gray-700 rounded-lg p-6">
        <h4 className="text-lg font-bold text-white mb-4">Desired Financing Terms</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Down Payment</label>
            <input
              type="number"
              value={formData.downPayment}
              onChange={(e) => updateFormData('downPayment', e.target.value)}
              placeholder="$0"
              className="w-full bg-gray-600 text-white px-4 py-3 rounded-lg border border-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Desired Monthly Payment</label>
            <input
              type="number"
              value={formData.desiredPayment}
              onChange={(e) => updateFormData('desiredPayment', e.target.value)}
              placeholder="$400"
              className="w-full bg-gray-600 text-white px-4 py-3 rounded-lg border border-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Desired Term</label>
            <select
              value={formData.desiredTerm}
              onChange={(e) => updateFormData('desiredTerm', e.target.value)}
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
  );

  const renderStep5 = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-white mb-4">Review & Submit</h3>
      
      <div className="bg-gray-700 rounded-lg p-6">
        <h4 className="text-lg font-bold text-white mb-4">Application Summary</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h5 className="font-bold text-yellow-400 mb-2">Personal Information</h5>
            <p className="text-white">{formData.firstName} {formData.lastName}</p>
            <p className="text-gray-300">{formData.email}</p>
            <p className="text-gray-300">{formData.phone}</p>
          </div>
          
          <div>
            <h5 className="font-bold text-yellow-400 mb-2">Address</h5>
            <p className="text-white">{formData.address}</p>
            <p className="text-gray-300">{formData.city}, {formData.state} {formData.zipCode}</p>
          </div>
          
          <div>
            <h5 className="font-bold text-yellow-400 mb-2">Employment</h5>
            <p className="text-white">{formData.employer}</p>
            <p className="text-gray-300">Monthly Income: ${formData.monthlyIncome}</p>
          </div>
          
          <div>
            <h5 className="font-bold text-yellow-400 mb-2">Desired Terms</h5>
            <p className="text-white">Down Payment: ${formData.downPayment}</p>
            <p className="text-gray-300">Term: {formData.desiredTerm} months</p>
          </div>
        </div>
        
        <div className="mt-6 p-4 bg-gray-600 rounded-lg">
          <p className="text-sm text-gray-300">
            By submitting this application, I authorize the dealer to obtain my credit report and 
            verify the information provided. I understand this will result in a credit inquiry.
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto bg-gray-800 rounded-xl p-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-4">Credit Application</h2>
        
        {/* Progress Bar */}
        <div className="flex items-center justify-between mb-6">
          {[1, 2, 3, 4, 5].map((step) => (
            <div key={step} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                currentStep >= step 
                  ? 'bg-yellow-400 text-gray-900' 
                  : 'bg-gray-600 text-gray-300'
              }`}>
                {step}
              </div>
              {step < 5 && (
                <div className={`w-16 h-1 mx-2 ${
                  currentStep > step ? 'bg-yellow-400' : 'bg-gray-600'
                }`} />
              )}
            </div>
          ))}
        </div>
        
        {/* Step Labels */}
        <div className="flex justify-between text-sm text-gray-400 mb-8">
          <span>Personal</span>
          <span>Address</span>
          <span>Employment</span>
          <span>Financial</span>
          <span>Review</span>
        </div>
      </div>

      {/* Step Content */}
      <div className="mb-8">
        {currentStep === 1 && renderStep1()}
        {currentStep === 2 && renderStep2()}
        {currentStep === 3 && renderStep3()}
        {currentStep === 4 && renderStep4()}
        {currentStep === 5 && renderStep5()}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <button
          onClick={prevStep}
          disabled={currentStep === 1}
          className={`px-6 py-3 rounded-lg font-bold ${
            currentStep === 1 
              ? 'bg-gray-600 text-gray-400 cursor-not-allowed' 
              : 'bg-gray-700 text-white hover:bg-gray-600'
          }`}
        >
          Previous
        </button>
        
        {currentStep < 5 ? (
          <button
            onClick={nextStep}
            className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold px-6 py-3 rounded-lg"
          >
            Next
          </button>
        ) : (
          <button
            onClick={submitApplication}
            disabled={submitting}
            className="bg-green-600 hover:bg-green-700 text-white font-bold px-6 py-3 rounded-lg disabled:opacity-50"
          >
            {submitting ? 'Submitting...' : 'Submit Application'}
          </button>
        )}
      </div>
    </div>
  );
};

export default CreditApplication;