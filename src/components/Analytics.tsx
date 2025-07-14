import React, { useState } from 'react';
import { TrendingUp, Calendar, Users, Award, BarChart3, Activity, Target } from 'lucide-react';

const Analytics = () => {
  const [activeVisualization, setActiveVisualization] = useState('overview');

  const monthlyData = [
    { month: 'Jun 2025', predicted: 45, actual: 38, accuracy: 84, unresolved: 12, overdue: 8 },
    { month: 'Jul 2025', predicted: 52, actual: 49, accuracy: 94, unresolved: 18, overdue: 5 },
    { month: 'Aug 2025', predicted: 38, actual: 35, accuracy: 92, unresolved: 15, overdue: 9 }
  ];

  const teamPerformance = [
    { agent: 'Sarah Johnson', resolved: 89, breached: 3, accuracy: 96.7 },
    { agent: 'Mike Chen', resolved: 76, breached: 7, accuracy: 91.6 },
    { agent: 'Lisa Park', resolved: 94, breached: 2, accuracy: 97.9 },
    { agent: 'David Kim', resolved: 67, breached: 8, accuracy: 89.3 },
    { agent: 'Emma Wilson', resolved: 82, breached: 4, accuracy: 95.3 }
  ];

  // Confusion Matrix Data
  const confusionMatrix = {
    truePositive: 156,
    falsePositive: 23,
    trueNegative: 298,
    falseNegative: 18,
    accuracy: 91.7,
    precision: 87.2,
    recall: 89.7,
    f1Score: 88.4
  };

  // ROC Curve Data Points
  const rocData = [
    { fpr: 0.0, tpr: 0.0 },
    { fpr: 0.05, tpr: 0.12 },
    { fpr: 0.1, tpr: 0.28 },
    { fpr: 0.15, tpr: 0.45 },
    { fpr: 0.2, tpr: 0.62 },
    { fpr: 0.25, tpr: 0.74 },
    { fpr: 0.3, tpr: 0.83 },
    { fpr: 0.35, tpr: 0.89 },
    { fpr: 0.4, tpr: 0.93 },
    { fpr: 0.5, tpr: 0.96 },
    { fpr: 0.6, tpr: 0.98 },
    { fpr: 0.8, tpr: 0.99 },
    { fpr: 1.0, tpr: 1.0 }
  ];

  // Heat Map Data (Breach Rate by Team and Category)
  const heatMapData = [
    { team: 'Hardware', categories: { Desktop: 38, Software: 18, Network: 12, Database: 24, Security: 15, Application: 8 } },
    { team: 'Software', categories: { Desktop: 22, Software: 35, Network: 21, Database: 18, Security: 28, Application: 31 } },
    { team: 'Network', categories: { Desktop: 15, Software: 27, Network: 23, Database: 19, Security: 16, Application: 14 } },
    { team: 'Database', categories: { Desktop: 28, Software: 30, Network: 24, Database: 21, Security: 33, Application: 27 } },
    { team: 'Security', categories: { Desktop: 19, Software: 24, Network: 17, Database: 32, Security: 19, Application: 22 } },
    { team: 'Application', categories: { Desktop: 12, Software: 30, Network: 11, Database: 8, Security: 25, Application: 29 } },
    { team: 'Infrastructure', categories: { Desktop: 25, Software: 21, Network: 31, Database: 19, Security: 28, Application: 23 } }
  ];

  const getHeatMapColor = (value: number) => {
    if (value >= 30) return 'bg-red-600';
    if (value >= 25) return 'bg-red-500';
    if (value >= 20) return 'bg-orange-500';
    if (value >= 15) return 'bg-yellow-500';
    if (value >= 10) return 'bg-green-400';
    return 'bg-green-500';
  };

  const getHeatMapTextColor = (value: number) => {
    return value >= 20 ? 'text-white' : 'text-gray-800';
  };

  const ConfusionMatrix = () => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Confusion Matrix</h3>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Matrix Visualization */}
        <div>
          <div className="mb-4">
            <div className="text-center mb-2">
              <span className="text-sm font-medium text-gray-600">Predicted</span>
            </div>
            <div className="grid grid-cols-3 gap-2 max-w-xs mx-auto">
              <div></div>
              <div className="text-center text-sm font-medium text-gray-600 py-2">No Breach</div>
              <div className="text-center text-sm font-medium text-gray-600 py-2">Breach</div>
              
              <div className="flex items-center justify-center text-sm font-medium text-gray-600 transform -rotate-90">
                <span>Actual</span>
              </div>
              <div className="bg-green-100 border-2 border-green-300 rounded-lg p-4 text-center">
                <div className="text-lg font-bold text-green-800">{confusionMatrix.trueNegative}</div>
                <div className="text-xs text-green-600">True Negative</div>
              </div>
              <div className="bg-red-100 border-2 border-red-300 rounded-lg p-4 text-center">
                <div className="text-lg font-bold text-red-800">{confusionMatrix.falsePositive}</div>
                <div className="text-xs text-red-600">False Positive</div>
              </div>
              
              <div></div>
              <div className="bg-red-100 border-2 border-red-300 rounded-lg p-4 text-center">
                <div className="text-lg font-bold text-red-800">{confusionMatrix.falseNegative}</div>
                <div className="text-xs text-red-600">False Negative</div>
              </div>
              <div className="bg-green-100 border-2 border-green-300 rounded-lg p-4 text-center">
                <div className="text-lg font-bold text-green-800">{confusionMatrix.truePositive}</div>
                <div className="text-xs text-green-600">True Positive</div>
              </div>
            </div>
          </div>
        </div>

        {/* Metrics */}
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="text-2xl font-bold text-blue-900">{confusionMatrix.accuracy}%</div>
              <div className="text-sm text-blue-600">Accuracy</div>
            </div>
            <div className="bg-purple-50 rounded-lg p-4">
              <div className="text-2xl font-bold text-purple-900">{confusionMatrix.precision}%</div>
              <div className="text-sm text-purple-600">Precision</div>
            </div>
            <div className="bg-green-50 rounded-lg p-4">
              <div className="text-2xl font-bold text-green-900">{confusionMatrix.recall}%</div>
              <div className="text-sm text-green-600">Recall</div>
            </div>
            <div className="bg-amber-50 rounded-lg p-4">
              <div className="text-2xl font-bold text-amber-900">{confusionMatrix.f1Score}%</div>
              <div className="text-sm text-amber-600">F1-Score</div>
            </div>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-2">Model Performance Summary</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Total Predictions: {confusionMatrix.truePositive + confusionMatrix.falsePositive + confusionMatrix.trueNegative + confusionMatrix.falseNegative}</li>
              <li>• Correct Predictions: {confusionMatrix.truePositive + confusionMatrix.trueNegative}</li>
              <li>• False Alarms: {confusionMatrix.falsePositive}</li>
              <li>• Missed Breaches: {confusionMatrix.falseNegative}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );

  const ROCCurve = () => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">ROC Curve Analysis</h3>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* ROC Curve */}
        <div>
          <div className="relative w-80 h-80 mx-auto">
            <svg viewBox="0 0 300 300" className="w-full h-full border border-gray-300 rounded-lg bg-gray-50">
              {/* Grid lines */}
              {[0, 60, 120, 180, 240, 300].map(pos => (
                <g key={pos}>
                  <line x1={pos} y1="0" x2={pos} y2="300" stroke="#e5e7eb" strokeWidth="1" />
                  <line x1="0" y1={pos} x2="300" y2={pos} stroke="#e5e7eb" strokeWidth="1" />
                </g>
              ))}
              
              {/* Diagonal reference line */}
              <line x1="0" y1="300" x2="300" y2="0" stroke="#9ca3af" strokeWidth="2" strokeDasharray="5,5" />
              
              {/* ROC Curve */}
              <path
                d={`M 0,300 ${rocData.map(point => `L ${point.fpr * 300},${300 - point.tpr * 300}`).join(' ')}`}
                fill="none"
                stroke="#3b82f6"
                strokeWidth="3"
              />
              
              {/* Area under curve */}
              <path
                d={`M 0,300 ${rocData.map(point => `L ${point.fpr * 300},${300 - point.tpr * 300}`).join(' ')} L 300,300 Z`}
                fill="#3b82f6"
                fillOpacity="0.1"
              />
              
              {/* Axes labels */}
              <text x="150" y="290" textAnchor="middle" className="text-xs fill-gray-600">False Positive Rate</text>
              <text x="15" y="150" textAnchor="middle" className="text-xs fill-gray-600" transform="rotate(-90 15 150)">True Positive Rate</text>
            </svg>
          </div>
        </div>

        {/* ROC Metrics */}
        <div className="space-y-6">
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="text-3xl font-bold text-blue-900">0.89</div>
            <div className="text-sm text-blue-600">AUC (Area Under Curve)</div>
            <div className="text-xs text-blue-500 mt-1">Excellent performance (&gt;0.8)</div>
          </div>
          
          <div className="space-y-3">
            <h4 className="font-medium text-gray-900">Performance Interpretation</h4>
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span>AUC &gt; 0.9: Outstanding</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span>AUC 0.8-0.9: Excellent</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
                <span>AUC 0.7-0.8: Good</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span>AUC &lt; 0.7: Poor</span>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-2">Key Insights</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Model shows excellent discrimination ability</li>
              <li>• Low false positive rate maintained</li>
              <li>• High sensitivity for breach detection</li>
              <li>• Optimal threshold at 0.35 FPR</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );

  const HeatMap = () => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Breach Rate Heatmap</h3>
      <p className="text-gray-600 text-sm mb-6">By team and category - showing percentage of tickets that breach SLA</p>
      
      <div className="overflow-x-auto">
        <div className="min-w-full">
          {/* Header */}
          <div className="grid grid-cols-8 gap-1 mb-2">
            <div className="p-3"></div>
            {Object.keys(heatMapData[0].categories).map(category => (
              <div key={category} className="p-3 text-center text-sm font-medium text-gray-700">
                {category}
              </div>
            ))}
          </div>
          
          {/* Heat map rows */}
          {heatMapData.map((row, rowIndex) => (
            <div key={rowIndex} className="grid grid-cols-8 gap-1 mb-1">
              <div className="p-3 text-sm font-medium text-gray-700 flex items-center">
                {row.team}
              </div>
              {Object.entries(row.categories).map(([category, value]) => (
                <div
                  key={category}
                  className={`p-3 text-center text-sm font-medium rounded ${getHeatMapColor(value)} ${getHeatMapTextColor(value)}`}
                >
                  {value}%
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      
      {/* Legend */}
      <div className="mt-6 flex items-center justify-center space-x-4">
        <span className="text-sm text-gray-600">Low</span>
        <div className="flex space-x-1">
          <div className="w-4 h-4 bg-green-500 rounded"></div>
          <div className="w-4 h-4 bg-green-400 rounded"></div>
          <div className="w-4 h-4 bg-yellow-500 rounded"></div>
          <div className="w-4 h-4 bg-orange-500 rounded"></div>
          <div className="w-4 h-4 bg-red-500 rounded"></div>
          <div className="w-4 h-4 bg-red-600 rounded"></div>
        </div>
        <span className="text-sm text-gray-600">High</span>
        <span className="text-xs text-gray-500 ml-4">Breach Rate (%)</span>
      </div>
      
      <div className="mt-4 bg-amber-50 border border-amber-200 rounded-lg p-4">
        <h4 className="font-medium text-amber-800 mb-2">Key Findings</h4>
        <ul className="text-sm text-amber-700 space-y-1">
          <li>• Hardware team shows highest breach rates for Desktop issues (38%)</li>
          <li>• Security team performs well across most categories</li>
          <li>• Database category shows consistent performance across teams</li>
          <li>• Application issues have lower breach rates overall</li>
        </ul>
      </div>
    </div>
  );

  const visualizationTabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'confusion', label: 'Confusion Matrix', icon: Target },
    { id: 'roc', label: 'ROC Curve', icon: Activity },
    { id: 'heatmap', label: 'Heat Map', icon: TrendingUp }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Analytics & Insights</h2>
        <p className="text-gray-600 mt-1">Comprehensive analysis of SLA performance and ML model metrics</p>
      </div>

      {/* Visualization Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          {visualizationTabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveVisualization(tab.id)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeVisualization === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Content based on active tab */}
      {activeVisualization === 'overview' && (
        <>
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
                  <Award className="w-6 h-6 text-green-600" />
                </div>
                <span className="text-sm text-green-600 font-medium">+2.3%</span>
              </div>
              <div className="mt-4">
                <h3 className="text-2xl font-bold text-gray-900">92.1%</h3>
                <p className="text-gray-600 text-sm">Model Accuracy</p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-blue-600" />
                </div>
                <span className="text-sm text-blue-600 font-medium">+5.7%</span>
              </div>
              <div className="mt-4">
                <h3 className="text-2xl font-bold text-gray-900">87.4%</h3>
                <p className="text-gray-600 text-sm">Prediction Precision</p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-purple-600" />
                </div>
                <span className="text-sm text-red-600 font-medium">-1.2%</span>
              </div>
              <div className="mt-4">
                <h3 className="text-2xl font-bold text-gray-900">244</h3>
                <p className="text-gray-600 text-sm">Breaches Prevented</p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 bg-amber-50 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-amber-600" />
                </div>
                <span className="text-sm text-green-600 font-medium">+8.1%</span>
              </div>
              <div className="mt-4">
                <h3 className="text-2xl font-bold text-gray-900">15.2h</h3>
                <p className="text-gray-600 text-sm">Avg Response Time</p>
              </div>
            </div>
          </div>

          {/* Monthly Trends */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Monthly Performance & Unresolved Tickets</h3>
            <div className="space-y-4">
              {monthlyData.map((data, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <div className="w-12 text-sm font-medium text-gray-600">{data.month}</div>
                  <div className="flex-1 grid grid-cols-5 gap-4">
                    <div>
                      <div className="text-xs text-gray-500 mb-1">Predicted</div>
                      <div className="text-sm font-medium">{data.predicted}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 mb-1">Actual</div>
                      <div className="text-sm font-medium">{data.actual}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 mb-1">Unresolved</div>
                      <div className="text-sm font-medium text-amber-600">{data.unresolved}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 mb-1">Overdue</div>
                      <div className="text-sm font-medium text-red-600">{data.overdue}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 mb-1">Accuracy</div>
                      <div className="flex items-center space-x-2">
                        <div className="text-sm font-medium">{data.accuracy}%</div>
                        <div className="flex-1 bg-gray-100 rounded-full h-2">
                          <div
                            className="bg-blue-500 h-2 rounded-full"
                            style={{ width: `${data.accuracy}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Summary Alert */}
            <div className="mt-6 bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <div className="w-5 h-5 text-red-600 mt-0.5">⚠️</div>
                <div>
                  <h4 className="font-medium text-red-800">Deadline Alert</h4>
                  <p className="text-red-700 text-sm mt-1">
                    Total of 45 tickets remain unresolved from recent months, with 22 tickets past their deadlines. 
                    July 2025 shows the highest number of unresolved tickets (18).
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Team Performance */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Team Performance</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 text-sm font-medium text-gray-500">Agent</th>
                    <th className="text-left py-3 text-sm font-medium text-gray-500">Resolved</th>
                    <th className="text-left py-3 text-sm font-medium text-gray-500">Breached</th>
                    <th className="text-left py-3 text-sm font-medium text-gray-500">Success Rate</th>
                    <th className="text-left py-3 text-sm font-medium text-gray-500">Performance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {teamPerformance.map((agent, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="py-4 text-sm font-medium text-gray-900">{agent.agent}</td>
                      <td className="py-4 text-sm text-gray-600">{agent.resolved}</td>
                      <td className="py-4 text-sm text-gray-600">{agent.breached}</td>
                      <td className="py-4 text-sm text-gray-600">{agent.accuracy}%</td>
                      <td className="py-4">
                        <div className="flex items-center space-x-2">
                          <div className="w-20 bg-gray-100 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full ${
                                agent.accuracy > 95 ? 'bg-green-500' :
                                agent.accuracy > 90 ? 'bg-amber-500' : 'bg-red-500'
                              }`}
                              style={{ width: `${agent.accuracy}%` }}
                            />
                          </div>
                          <span className="text-xs text-gray-500">{agent.accuracy}%</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {activeVisualization === 'confusion' && <ConfusionMatrix />}
      {activeVisualization === 'roc' && <ROCCurve />}
      {activeVisualization === 'heatmap' && <HeatMap />}
    </div>
  );
};

export default Analytics;
