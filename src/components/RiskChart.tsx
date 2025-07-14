import React from 'react';
import { BarChart3 } from 'lucide-react';

const RiskChart = () => {
  const data = [
    { day: 'Mon', low: 45, medium: 25, high: 8 },
    { day: 'Tue', low: 52, medium: 18, high: 12 },
    { day: 'Wed', low: 38, medium: 32, high: 15 },
    { day: 'Thu', low: 41, medium: 28, high: 9 },
    { day: 'Fri', low: 35, medium: 22, high: 18 },
    { day: 'Sat', low: 28, medium: 15, high: 6 },
    { day: 'Sun', low: 31, medium: 12, high: 4 }
  ];

  const maxValue = Math.max(...data.map(d => d.low + d.medium + d.high));

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Risk Distribution</h3>
          <p className="text-gray-600 text-sm">Weekly ticket risk levels</p>
        </div>
        <BarChart3 className="w-5 h-5 text-gray-400" />
      </div>
      
      <div className="space-y-4">
        {data.map((item, index) => {
          const total = item.low + item.medium + item.high;
          const lowPercent = (item.low / maxValue) * 100;
          const mediumPercent = (item.medium / maxValue) * 100;
          const highPercent = (item.high / maxValue) * 100;
          
          return (
            <div key={index} className="flex items-center space-x-3">
              <div className="w-8 text-sm font-medium text-gray-600">{item.day}</div>
              <div className="flex-1 flex items-center space-x-1">
                <div className="flex-1 bg-gray-100 rounded-full h-6 flex overflow-hidden">
                  <div 
                    className="bg-green-500 h-full transition-all duration-500"
                    style={{ width: `${lowPercent}%` }}
                  />
                  <div 
                    className="bg-amber-500 h-full transition-all duration-500"
                    style={{ width: `${mediumPercent}%` }}
                  />
                  <div 
                    className="bg-red-500 h-full transition-all duration-500"
                    style={{ width: `${highPercent}%` }}
                  />
                </div>
                <div className="text-sm font-medium text-gray-700 w-8">{total}</div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex items-center justify-center space-x-6 mt-6 pt-4 border-t border-gray-200">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <span className="text-sm text-gray-600">Low Risk</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
          <span className="text-sm text-gray-600">Medium Risk</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <span className="text-sm text-gray-600">High Risk</span>
        </div>
      </div>
    </div>
  );
};

export default RiskChart;
