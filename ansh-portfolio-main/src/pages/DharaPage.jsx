import React, { useState, useEffect } from 'react';
import { IconSearch, IconFileUpload, IconBrain, IconFileText, IconLoader, IconTag, IconShield, IconLanguage, IconEye, IconTrendingUp, IconClock, IconTarget } from '@tabler/icons-react';
import { Particles } from "../components/Particles";
import { useMediaQuery } from "react-responsive";

const Dhara = () => {
  const [query, setQuery] = useState('');
  const [activeTab, setActiveTab] = useState('deepResearch');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState('');
  const [uploadedFile, setUploadedFile] = useState(null);
  const [focusArea, setFocusArea] = useState('general');
  const [extractFocusArea, setExtractFocusArea] = useState('general');
  const [loadingTime, setLoadingTime] = useState(0);
  const isMobile = useMediaQuery({ maxWidth: 853 });

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // API endpoints - replace with your actual endpoints
  const API_ENDPOINTS = {
    deepResearch: 'http://agentic-rag-load-balancer-97154622.ap-southeast-2.elb.amazonaws.com/api/v1/research',
    extractEntities: 'http://agentic-rag-load-balancer-97154622.ap-southeast-2.elb.amazonaws.com/api/v1/extract-entities', 
    summarize: 'http://agentic-rag-load-balancer-97154622.ap-southeast-2.elb.amazonaws.com/api/v1/summarize',
    healthCheck: 'http://agentic-rag-load-balancer-97154622.ap-southeast-2.elb.amazonaws.com/health'
  };

  // Configuration instructions
  const showConfigInstructions = false; // API endpoints are now configured

  // Helper function to create a fetch with timeout
  const fetchWithTimeout = (url, options, timeout = 600000) => { // 10 minutes = 600000ms
    return Promise.race([
      fetch(url, options),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Request timeout after 10 minutes')), timeout)
      )
    ]);
  };

  const handleSearch = async () => {
    if (!query.trim()) return;
    
    setLoading(true);
    setResults(''); // Clear previous results
    setLoadingTime(0);
    
    // Start loading timer
    const loadingInterval = setInterval(() => {
      setLoadingTime(prev => prev + 1);
    }, 1000);
    
    try {
      let requestBody;
      let headers = {
        'Content-Type': 'application/json',
        'accept': 'application/json'
      };
      
      // Prepare request body based on active tab
      if (activeTab === 'deepResearch') {
        requestBody = JSON.stringify({
          query: query,
          complexity: "advanced"
        });
      } else if (activeTab === 'extractEntities') {
        requestBody = JSON.stringify({
          query: query,
          complexity: "advanced",
          focus_area: extractFocusArea
        });
      } else if (activeTab === 'summarize') {
        if (uploadedFile) {
          // For file upload, we need to read the file content
          const fileContent = await readFileContent(uploadedFile);
        requestBody = JSON.stringify({
          document_text: fileContent,
          focus_area: focusArea
        });
      } else {
        // For text input
        requestBody = JSON.stringify({
          document_text: query,
          focus_area: focusArea
        });
      }
      }
      
      console.log('Making POST request to:', API_ENDPOINTS[activeTab]);
      console.log('Request body:', requestBody);
      console.log('Request headers:', headers);
      console.log('Timeout set to 10 minutes');
      
      const response = await fetchWithTimeout(API_ENDPOINTS[activeTab], {
        method: 'POST',
        headers: headers,
        body: requestBody,
        mode: 'cors', // Explicitly set CORS mode
      }, 600000); // 10 minutes timeout
      
      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error response:', errorText);
        throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
      }
      
      const data = await response.json();
      console.log('Response data:', data);
      setResults(formatResponse(data, activeTab));
    } catch (error) {
      console.error('API Error:', error);
      setResults(`# Error

## Issue
${error.message}

## Troubleshooting
- Ensure your API server is running and accessible
- Check that the API endpoints are correct and responding
- Verify the request format matches the expected schema
- Check browser console for detailed error logs

## API Status
Please check if the following endpoints are accessible:
- Health Check: https://agentic-rag-load-balancer-97154622.ap-southeast-2.elb.amazonaws.com/health
- Deep Research: https://agentic-rag-load-balancer-97154622.ap-southeast-2.elb.amazonaws.com/api/v1/research
- Extract Entities: https://agentic-rag-load-balancer-97154622.ap-southeast-2.elb.amazonaws.com/api/v1/extract-entities
- Summarize: https://agentic-rag-load-balancer-97154622.ap-southeast-2.elb.amazonaws.com/api/v1/summarize`);
    } finally {
      clearInterval(loadingInterval);
      setLoading(false);
      setLoadingTime(0);
    }
  };

  // Helper function to read file content
  const readFileContent = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target.result);
      reader.onerror = (e) => reject(e);
      reader.readAsText(file);
    });
  };

  // Helper function to format markdown for display
  const formatMarkdown = (text) => {
    return text
      .replace(/^# (.*$)/gim, '<h1 class="text-3xl font-bold text-white mb-4">$1</h1>')
      .replace(/^## (.*$)/gim, '<h2 class="text-2xl font-semibold text-blue-400 mb-3 mt-6">$1</h2>')
      .replace(/^### (.*$)/gim, '<h3 class="text-xl font-semibold text-purple-400 mb-2 mt-4">$1</h3>')
      .replace(/^- (.*$)/gim, '<li class="ml-4 mb-1 text-gray-300">• $1</li>')
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-white">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em class="italic text-gray-200">$1</em>')
      .replace(/\n\n/g, '<br><br>')
      .replace(/\n/g, '<br>');
  };

  // Helper function to format response based on API type
  const formatResponse = (data, tabType) => {
    if (tabType === 'deepResearch') {
      return `# Deep Research Analysis

## Query
${data.query || 'N/A'}

## Final Analysis
${data.final_analysis || 'No analysis available'}

## Confidence Score
${data.confidence_score ? `${(data.confidence_score * 100).toFixed(1)}%` : 'N/A'}

## Research Process
${data.research_process || 'No process details available'}

## Iterations
${data.iterations || 'N/A'}

## Processing Time
${data.processing_time ? `${data.processing_time}s` : 'N/A'}`;
    } else if (tabType === 'extractEntities') {
      const entities = data.extracted_entities || {};
      const entityTypes = Object.keys(entities);
      
      let formattedEntities = '# Extracted Entities\n\n';
      
      if (entityTypes.length === 0) {
        formattedEntities += 'No entities found in the provided text.';
      } else {
        entityTypes.forEach(type => {
          const entitiesList = entities[type];
          if (Array.isArray(entitiesList) && entitiesList.length > 0) {
            formattedEntities += `## ${type.charAt(0).toUpperCase() + type.slice(1)}\n`;
            entitiesList.forEach(entity => {
              formattedEntities += `- ${entity}\n`;
            });
            formattedEntities += '\n';
          }
        });
      }
      
      return formattedEntities;
    } else if (tabType === 'summarize') {
      return `# Document Summary

## Focus Area
${data.focus_area || 'General'}

## Summary
${data.summary || 'No summary available'}`;
    }
    
    return JSON.stringify(data, null, 2);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Check file size (10MB limit)
      if (file.size > 10 * 1024 * 1024) {
        alert('File size must be less than 10MB');
        return;
      }
      
      // Check file type
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!allowedTypes.includes(file.type)) {
        alert('Please upload a PDF, DOC, or DOCX file');
        return;
      }
      
      setUploadedFile(file);
    }
  };

  const clearResults = () => {
    setResults('');
  };

  const clearFile = () => {
    setUploadedFile(null);
    // Reset the file input
    const fileInput = document.querySelector('input[type="file"]');
    if (fileInput) fileInput.value = '';
  };

  const testConnectivity = async () => {
    console.log('Testing connectivity to all endpoints...');
    
    // Test health check endpoint first
    try {
      console.log(`Testing Health Check: ${API_ENDPOINTS.healthCheck}`);
      const healthResponse = await fetchWithTimeout(API_ENDPOINTS.healthCheck, {
        method: 'GET',
        headers: { 'accept': 'application/json' },
        mode: 'cors'
      }, 30000); // 30 seconds timeout for health check
      const healthData = await healthResponse.json();
      console.log(`Health Check - Status: ${healthResponse.status}`, healthData);
      setResults(`# Health Check Results

## Server Status
${healthResponse.ok ? '✅ Server is healthy and running' : '❌ Server is not responding properly'}

## Response Details
- Status Code: ${healthResponse.status}
- Response: ${JSON.stringify(healthData, null, 2)}

## Next Steps
${healthResponse.ok ? 'Server is healthy. You can now try the main features.' : 'Please check your server configuration and try again.'}`);
    } catch (error) {
      console.error(`Health Check - Error:`, error.message);
      setResults(`# Health Check Failed

## Error
${error.message}

## Troubleshooting
- Check if your API server is running
- Verify the health check endpoint is accessible
- Check CORS configuration
- Ensure the server is listening on the correct port

## Health Check URL
${API_ENDPOINTS.healthCheck}`);
    }
  };

  const tabs = [
    { id: 'deepResearch', label: 'Deep Research', icon: IconBrain },
    { id: 'extractEntities', label: 'Extract Entities', icon: IconTag },
    { id: 'summarize', label: 'Summarize', icon: IconFileText }
  ];

  return (
    <section className="min-h-screen relative py-20 px-4">
      {/* Particles Background - Same as homepage */}
      <div className="fixed inset-0 -z-10">
        <Particles
          className="absolute inset-0"
          quantity={isMobile ? 100 : 200}
          staticity={isMobile ? 10 : 15}
          color="#ffffff"
          size={0.8}
          ease={30}
          vx={0.2}
          vy={0.2}
        />
      </div>
      
      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-6 px-6 py-3 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full border border-white/20 backdrop-blur-sm">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-green-400">AI-Powered Legal Research</span>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 tracking-tight">
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              DHARA
            </span>
          </h1>
          
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4">
              Digital Hub for Advanced Research in Adjudication
            </h2>
            <p className="text-lg md:text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              An AI-powered legal research engine designed to revolutionize how judges and legal professionals 
              navigate the complexities of India's commercial courts. By harnessing cutting-edge natural language 
              processing and embedding-based retrieval, DHARA delivers contextually relevant and customized legal insights.
            </p>
          </div>
          
          <div className="flex gap-4 justify-center">
            <button className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
              <span>Get Started with DHARA</span>
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
            <button 
              onClick={testConnectivity}
              className="px-6 py-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl transition-all duration-300"
            >
              Check Server Health
            </button>
          </div>
        </div>

        {/* Configuration Notice */}
        {showConfigInstructions && (
          <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-6 mb-8">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <IconFileText className="w-6 h-6 text-yellow-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-yellow-400 mb-2">Configuration Required</h3>
                <p className="text-yellow-200 mb-3">
                  To use this legal RAG system, please update the API endpoints in the Dhara component:
                </p>
                <div className="bg-black/20 rounded-lg p-4 text-sm text-gray-300 font-mono">
                  <div>1. Open <code className="text-blue-400">src/sections/Dhara.jsx</code></div>
                  <div>2. Update the <code className="text-green-400">API_ENDPOINTS</code> object with your actual endpoints</div>
                  <div>3. Replace the placeholder URLs with your deployed API URLs</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Health Check Section */}
        <div className="bg-gradient-to-br from-green-500/10 to-green-600/10 backdrop-blur-xl rounded-3xl p-6 mb-8 border border-green-500/20 shadow-2xl">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold text-white mb-2">Server Status</h3>
              <p className="text-gray-300 text-sm">Check if your API server is running and accessible</p>
            </div>
            <button 
              onClick={testConnectivity}
              className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105"
            >
              Check Health
            </button>
          </div>
        </div>

        {/* Search Interface */}
        <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl p-8 mb-16 border border-white/20 shadow-2xl">
          {/* Tab Navigation */}
          <div className="flex flex-wrap gap-3 mb-8">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`group flex items-center gap-3 px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg shadow-blue-500/25'
                      : 'bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${activeTab === tab.id ? 'text-white' : 'text-gray-400 group-hover:text-white'}`} />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Search Input */}
          <div className="relative mb-8">
            <div className="relative">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={`Enter your ${activeTab === 'deepResearch' ? 'research query' : activeTab === 'extractEntities' ? 'text to extract entities from' : 'document to summarize'}...`}
                className="w-full px-8 py-6 pr-16 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg backdrop-blur-sm"
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
              <button
                onClick={handleSearch}
                disabled={loading || !query.trim()}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-3 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 disabled:from-gray-500 disabled:to-gray-500 disabled:cursor-not-allowed rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                {loading ? (
                  <IconLoader className="w-6 h-6 text-white animate-spin" />
                ) : (
                  <IconSearch className="w-6 h-6 text-white" />
                )}
              </button>
            </div>
            <div className="mt-3 text-sm text-gray-400 text-center">
              {activeTab === 'deepResearch' && 'Ask complex legal questions and get comprehensive AI-powered insights'}
              {activeTab === 'extractEntities' && 'Paste text to automatically identify and extract key legal entities'}
              {activeTab === 'summarize' && 'Upload documents for intelligent summarization and key insights'}
            </div>
          </div>

          {/* Focus Area Input for Extract Entities */}
          {activeTab === 'extractEntities' && (
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-300 mb-3">
                Specific Area to Focus On
              </label>
              <input
                type="text"
                value={extractFocusArea}
                onChange={(e) => setExtractFocusArea(e.target.value)}
                placeholder="Enter focus area: facts, judgment, analysis, or general"
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <p className="mt-2 text-xs text-gray-400">
                Specify the area to focus on: facts, judgment, analysis, or general
              </p>
            </div>
          )}

          {/* Focus Area Selector for Summarize */}
          {activeTab === 'summarize' && (
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-300 mb-3">
                Focus Area
              </label>
              <select
                value={focusArea}
                onChange={(e) => setFocusArea(e.target.value)}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="general" className="bg-gray-800">General Summary</option>
                <option value="legal" className="bg-gray-800">Legal Analysis</option>
                <option value="contract" className="bg-gray-800">Contract Review</option>
                <option value="case_law" className="bg-gray-800">Case Law</option>
                <option value="statute" className="bg-gray-800">Statute Analysis</option>
                <option value="procedural" className="bg-gray-800">Procedural Matters</option>
              </select>
            </div>
          )}

          {/* File Upload for Summarize */}
          {activeTab === 'summarize' && (
            <div className="mb-8">
              <label className="group flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-white/30 rounded-2xl cursor-pointer bg-gradient-to-br from-white/5 to-white/10 hover:from-white/10 hover:to-white/15 transition-all duration-300 hover:border-white/50">
                <div className="flex flex-col items-center justify-center pt-6 pb-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <IconFileUpload className="w-8 h-8 text-blue-400" />
                  </div>
                  <p className="mb-2 text-lg font-semibold text-white">
                    <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-sm text-gray-400">PDF, DOC, DOCX (MAX. 10MB)</p>
                </div>
                <input
                  type="file"
                  className="hidden"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileUpload}
                />
              </label>
              {uploadedFile && (
                <div className="mt-4 flex items-center justify-between bg-gradient-to-r from-green-500/10 to-green-600/10 border border-green-500/30 rounded-2xl p-4 backdrop-blur-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                      <IconFileText className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-green-400">
                        {uploadedFile.name}
                      </div>
                      <div className="text-xs text-green-300">
                        {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={clearFile}
                    className="px-4 py-2 text-red-400 hover:text-red-300 text-sm font-medium hover:bg-red-500/10 rounded-lg transition-colors"
                  >
                    Remove
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Loading Progress Bar */}
          {loading && (
            <div className="mb-6">
              <div className="flex justify-between text-sm text-gray-400 mb-2">
                <span>Processing...</span>
                <span>{Math.floor(loadingTime / 60)}:{(loadingTime % 60).toString().padStart(2, '0')} / 10:00</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-1000"
                  style={{ width: `${Math.min((loadingTime / 600) * 100, 100)}%` }}
                ></div>
              </div>
              <p className="text-xs text-gray-500 mt-2 text-center">
                AI processing can take up to 10 minutes. Please be patient...
              </p>
            </div>
          )}

          {/* Action Button */}
          <button
            onClick={handleSearch}
            disabled={loading || !query.trim() || (activeTab === 'summarize' && !uploadedFile)}
            className="group w-full py-6 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 disabled:from-gray-500 disabled:to-gray-500 disabled:cursor-not-allowed text-white font-bold text-lg rounded-2xl transition-all duration-300 transform hover:scale-105 disabled:scale-100 shadow-lg hover:shadow-xl disabled:shadow-none"
          >
            {loading ? (
              <div className="flex items-center justify-center gap-3">
                <IconLoader className="w-6 h-6 animate-spin" />
                <div className="text-center">
                  <div>Processing with AI...</div>
                  <div className="text-sm opacity-75">
                    {Math.floor(loadingTime / 60)}:{(loadingTime % 60).toString().padStart(2, '0')} / 10:00
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center gap-3">
                <span>Execute {tabs.find(tab => tab.id === activeTab)?.label}</span>
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>
            )}
          </button>
        </div>

        {/* Results */}
        {results && (
          <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                  <IconFileText className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white">
                  AI Analysis Results
                </h3>
              </div>
              <button
                onClick={clearResults}
                className="px-4 py-2 text-gray-400 hover:text-white text-sm font-medium rounded-lg hover:bg-white/10 transition-colors"
              >
                Clear Results
              </button>
            </div>
            <div className="prose prose-invert max-w-none">
              <div className="text-gray-300 leading-relaxed text-lg bg-white/5 rounded-2xl p-6 border border-white/10">
                <div className="whitespace-pre-wrap" dangerouslySetInnerHTML={{ __html: formatMarkdown(results) }} />
              </div>
            </div>
          </div>
        )}

        {/* Key Features Grid */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-center text-white mb-12">
            Why Choose <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">DHARA</span>?
          </h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="group bg-gradient-to-br from-blue-500/10 to-blue-600/10 backdrop-blur-lg rounded-2xl p-6 border border-blue-500/20 hover:border-blue-400/40 transition-all duration-300 hover:scale-105">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <IconBrain className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-lg font-semibold text-white mb-2">Intelligent</h4>
              <p className="text-gray-300 text-sm">Employs AI to understand legal context, not just keywords.</p>
            </div>
            
            <div className="group bg-gradient-to-br from-purple-500/10 to-purple-600/10 backdrop-blur-lg rounded-2xl p-6 border border-purple-500/20 hover:border-purple-400/40 transition-all duration-300 hover:scale-105">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <IconTarget className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-lg font-semibold text-white mb-2">Customized</h4>
              <p className="text-gray-300 text-sm">Delivers tailored results for each specific case.</p>
            </div>
            
            <div className="group bg-gradient-to-br from-green-500/10 to-green-600/10 backdrop-blur-lg rounded-2xl p-6 border border-green-500/20 hover:border-green-400/40 transition-all duration-300 hover:scale-105">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <IconClock className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-lg font-semibold text-white mb-2">Efficient</h4>
              <p className="text-gray-300 text-sm">Streamlines legal research, saving time and effort.</p>
            </div>
            
            <div className="group bg-gradient-to-br from-orange-500/10 to-orange-600/10 backdrop-blur-lg rounded-2xl p-6 border border-orange-500/20 hover:border-orange-400/40 transition-all duration-300 hover:scale-105">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <IconTrendingUp className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-lg font-semibold text-white mb-2">Predictive</h4>
              <p className="text-gray-300 text-sm">Forecasts potential case outcomes based on data.</p>
            </div>
            
            <div className="group bg-gradient-to-br from-pink-500/10 to-pink-600/10 backdrop-blur-lg rounded-2xl p-6 border border-pink-500/20 hover:border-pink-400/40 transition-all duration-300 hover:scale-105">
              <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-pink-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <IconLanguage className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-lg font-semibold text-white mb-2">Multilingual</h4>
              <p className="text-gray-300 text-sm">Supports multiple languages for wider accessibility.</p>
            </div>
            
            <div className="group bg-gradient-to-br from-red-500/10 to-red-600/10 backdrop-blur-lg rounded-2xl p-6 border border-red-500/20 hover:border-red-400/40 transition-all duration-300 hover:scale-105">
              <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <IconShield className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-lg font-semibold text-white mb-2">Secure</h4>
              <p className="text-gray-300 text-sm">Upholds strict data privacy and confidentiality.</p>
            </div>
            
            <div className="group bg-gradient-to-br from-cyan-500/10 to-cyan-600/10 backdrop-blur-lg rounded-2xl p-6 border border-cyan-500/20 hover:border-cyan-400/40 transition-all duration-300 hover:scale-105">
              <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <IconEye className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-lg font-semibold text-white mb-2">Transparent</h4>
              <p className="text-gray-300 text-sm">Provides clear reasoning behind its insights.</p>
            </div>
            
            <div className="group bg-gradient-to-br from-indigo-500/10 to-indigo-600/10 backdrop-blur-lg rounded-2xl p-6 border border-indigo-500/20 hover:border-indigo-400/40 transition-all duration-300 hover:scale-105">
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <IconBrain className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-lg font-semibold text-white mb-2">Transformative</h4>
              <p className="text-gray-300 text-sm">Empowers the judiciary for a smarter legal system.</p>
            </div>
          </div>
        </div>

        {/* Research Tools Section */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-center text-white mb-12">
            Research <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Tools</span>
          </h3>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 backdrop-blur-lg rounded-2xl p-8 border border-blue-500/20 hover:border-blue-400/40 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6">
                <IconBrain className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-xl font-semibold text-white mb-3">Deep Research</h4>
              <p className="text-gray-300 mb-4">
                Comprehensive analysis and insights on complex legal topics with AI-powered context understanding.
              </p>
              <div className="text-sm text-blue-400 font-medium">Advanced AI Analysis</div>
            </div>
            
            <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 backdrop-blur-lg rounded-2xl p-8 border border-purple-500/20 hover:border-purple-400/40 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6">
                <IconTag className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-xl font-semibold text-white mb-3">Extract Entities</h4>
              <p className="text-gray-300 mb-4">
                Automatically identify and extract key entities like names, dates, locations, and legal terms from text.
              </p>
              <div className="text-sm text-purple-400 font-medium">Smart Entity Recognition</div>
            </div>
            
            <div className="bg-gradient-to-br from-green-500/10 to-green-600/10 backdrop-blur-lg rounded-2xl p-8 border border-green-500/20 hover:border-green-400/40 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mb-6">
                <IconFileText className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-xl font-semibold text-white mb-3">Document Summary</h4>
              <p className="text-gray-300 mb-4">
                Upload documents and get AI-generated summaries and key insights tailored to your case.
              </p>
              <div className="text-sm text-green-400 font-medium">Intelligent Summarization</div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center py-12 border-t border-white/10">
          <div className="mb-6">
            <h3 className="text-2xl font-bold text-white mb-2">
              Ready to Transform Legal Research?
            </h3>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Join the future of legal research with DHARA. Experience AI-powered insights 
              that make complex legal analysis simple, fast, and accurate.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500">
            <span>© 2024 DHARA</span>
            <span>•</span>
            <span>Digital Hub for Advanced Research in Adjudication</span>
            <span>•</span>
            <span>Powered by AI</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dhara;
