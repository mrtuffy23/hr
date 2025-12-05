import React, { useState, useEffect } from 'react';
import { Sparkles, RefreshCw } from 'lucide-react';
import { getHRInsights } from '../services/geminiService';
import { MOCK_EMPLOYEES, MOCK_ATTENDANCE, MOCK_PAYROLL } from '../services/mockData';

const Reports: React.FC = () => {
  const [insight, setInsight] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const fetchInsights = async () => {
    setLoading(true);
    const result = await getHRInsights(MOCK_EMPLOYEES, MOCK_ATTENDANCE, MOCK_PAYROLL);
    setInsight(result);
    setLoading(false);
  };

  useEffect(() => {
    // Initial fetch
    fetchInsights();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between sm:flex-row sm:items-center">
        <h1 className="text-2xl font-bold text-gray-800">HR Analytics & Reports</h1>
      </div>

      {/* AI Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl shadow-lg text-white p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <Sparkles className="w-32 h-32" />
        </div>
        
        <div className="relative z-10">
          <div className="flex items-center mb-4">
            <Sparkles className="w-6 h-6 mr-2 text-yellow-300" />
            <h2 className="text-xl font-bold">AI Analyst Insights</h2>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 min-h-[150px]">
            {loading ? (
              <div className="flex items-center justify-center h-full">
                <RefreshCw className="w-6 h-6 animate-spin mr-2" />
                <span>Analyzing data patterns with Gemini...</span>
              </div>
            ) : (
              <div className="prose prose-invert max-w-none text-sm md:text-base leading-relaxed whitespace-pre-line">
                {insight}
              </div>
            )}
          </div>

          <button 
            onClick={fetchInsights}
            disabled={loading}
            className="mt-4 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-sm font-medium transition-colors flex items-center"
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Regenerate Analysis
          </button>
        </div>
      </div>

      {/* Placeholder for standard reports */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
         <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
             <h3 className="font-semibold text-gray-800 mb-4">Turnover Rate</h3>
             <div className="flex items-end space-x-2 h-48 border-b border-gray-200 pb-2">
                 <div className="w-1/6 bg-blue-200 h-20 rounded-t-md"></div>
                 <div className="w-1/6 bg-blue-300 h-24 rounded-t-md"></div>
                 <div className="w-1/6 bg-blue-400 h-16 rounded-t-md"></div>
                 <div className="w-1/6 bg-blue-500 h-10 rounded-t-md relative group">
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                        Current Month
                    </div>
                 </div>
                 <div className="w-1/6 bg-blue-200 h-14 rounded-t-md"></div>
                 <div className="w-1/6 bg-blue-300 h-18 rounded-t-md"></div>
             </div>
             <p className="mt-4 text-sm text-gray-500">Low turnover observed in Q3. AI suggests focusing on engineering retention.</p>
         </div>
         <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
             <h3 className="font-semibold text-gray-800 mb-4">Leave Utilization</h3>
             <div className="flex items-center justify-center h-48">
                 <div className="text-center">
                     <p className="text-4xl font-bold text-indigo-600">72%</p>
                     <p className="text-gray-500">Annual Leave Quota Used</p>
                 </div>
             </div>
         </div>
      </div>
    </div>
  );
};

export default Reports;