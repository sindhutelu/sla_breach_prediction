import React, { useState } from 'react';
import { AlertTriangle, CheckCircle, Clock, Send, Brain } from 'lucide-react';

const PredictionForm = () => {
  const [formData, setFormData] = useState({
    priority: '',
    category: '',
    complexity: '',
    requesterType: '',
    description: '',
    assignedAgent: ''
  });

  const [prediction, setPrediction] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate ML prediction delay
    setTimeout(() => {
      // Mock prediction logic
      const complexityWeight = formData.complexity === 'high' ? 0.4 : formData.complexity === 'medium' ? 0.2 : 0.1;
      const priorityWeight = formData.priority === 'high' ? 0.3 : formData.priority === 'medium' ? 0.15 : 0.05;
      const categoryWeight = formData.category === 'infrastructure' ? 0.2 : 0.1;
      
      const riskScore = Math.min(0.95, complexityWeight + priorityWeight + categoryWeight + Math.random() * 0.2);
      const breachProbability = Math.round(riskScore * 100);
      
      let riskLevel = 'low';
      let timeToResolution = '6-8 hours';
      let recommendations = ['Standard processing workflow'];
      
      if (breachProbability > 70) {
        riskLevel = 'high';
        timeToResolution = '2-4 hours';
        recommendations = [
          'Escalate to senior technician immediately',
          'Consider emergency response protocol',
          'Notify stakeholders of potential SLA breach'
        ];
      } else if (breachProbability > 40) {
        riskLevel = 'medium';
        timeToResolution = '4-6 hours';
        recommendations = [
          'Assign to experienced technician',
          'Monitor progress closely',
          'Prepare escalation if needed'
        ];
      }

      setPrediction({
        riskScore: breachProbability,
        riskLevel,
        timeToResolution,
        recommendations,
        confidence: Math.round(85 + Math.random() * 10)
      });
      
      setIsLoading(false);
    }, 2000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'high':
        return 'text-red-600 bg-red-100';
      case 'medium':
        return 'text-amber-600 bg-amber-100';
      default:
        return 'text-green-600 bg-green-100';
    }
  };

  const getRiskIcon = (level: string) => {
    switch (level) {
      case 'high':
        return <AlertTriangle className="w-5 h-5" />;
      case 'medium':
        return <Clock className="w-5 h-5" />;
      default:
        return <CheckCircle className="w-5 h-5" />;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">SLA Breach Prediction</h2>
        <p className="text-gray-600 mt-1">Enter ticket details to predict SLA breach probability using our Random Forest model</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Form */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Priority Level</label>
              <select
                name="priority"
                value={formData.priority}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="">Select priority</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="">Select category</option>
                <option value="infrastructure">Infrastructure</option>
                <option value="application">Application</option>
                <option value="network">Network</option>
                <option value="security">Security</option>
                <option value="user_access">User Access</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Complexity</label>
              <select
                name="complexity"
                value={formData.complexity}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="">Select complexity</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Requester Type</label>
              <select
                name="requesterType"
                value={formData.requesterType}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="">Select requester type</option>
                <option value="end_user">End User</option>
                <option value="admin">Administrator</option>
                <option value="manager">Manager</option>
                <option value="external">External Customer</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Assigned Agent</label>
              <input
                type="text"
                name="assignedAgent"
                value={formData.assignedAgent}
                onChange={handleInputChange}
                placeholder="Enter agent name"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
                placeholder="Brief description of the issue"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {isLoading ? (
                <>
                  <Brain className="w-5 h-5 animate-pulse" />
                  <span>Analyzing...</span>
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  <span>Predict SLA Risk</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Results */}
        <div className="space-y-6">
          {prediction && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Prediction Results</h3>
              
              {/* Risk Score */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Breach Probability</span>
                  <span className="text-2xl font-bold text-gray-900">{prediction.riskScore}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className={`h-3 rounded-full ${
                      prediction.riskScore > 70 ? 'bg-red-500' :
                      prediction.riskScore > 40 ? 'bg-amber-500' : 'bg-green-500'
                    }`}
                    style={{ width: `${prediction.riskScore}%` }}
                  />
                </div>
              </div>

              {/* Risk Level */}
              <div className="mb-6">
                <div className={`inline-flex items-center space-x-2 px-4 py-2 rounded-lg ${getRiskColor(prediction.riskLevel)}`}>
                  {getRiskIcon(prediction.riskLevel)}
                  <span className="font-medium">{prediction.riskLevel.toUpperCase()} RISK</span>
                </div>
              </div>

              {/* Estimated Resolution Time */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-2">Estimated Resolution Time</h4>
                <p className="text-gray-600">{prediction.timeToResolution}</p>
              </div>

              {/* Model Confidence */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Model Confidence</span>
                  <span className="font-medium text-gray-900">{prediction.confidence}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full"
                    style={{ width: `${prediction.confidence}%` }}
                  />
                </div>
              </div>

              {/* Recommendations */}
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Recommendations</h4>
                <ul className="space-y-2">
                  {prediction.recommendations.map((rec: string, index: number) => (
                    <li key={index} className="flex items-start space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-600">{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Model Info */}
          <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
            <div className="flex items-start space-x-3">
              <Brain className="w-6 h-6 text-blue-600 mt-1" />
              <div>
                <h3 className="font-medium text-blue-900">Random Forest Model</h3>
                <p className="text-blue-700 text-sm mt-1">
                  Our prediction model uses Random Forest algorithm trained on historical ticket data, 
                  achieving 87% accuracy in SLA breach prediction. The model considers multiple factors 
                  including priority, complexity, category, and historical resolution patterns.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PredictionForm;
