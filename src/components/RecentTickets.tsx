import React from 'react';
import { Clock, AlertTriangle, CheckCircle } from 'lucide-react';

const RecentTickets = () => {
  const tickets = [
    {
      id: '#2456',
      title: 'Database connectivity issues',
      priority: 'High',
      risk: 'high',
      timeLeft: '2h 15m',
      agent: 'Sarah Johnson'
    },
    {
      id: '#2455',
      title: 'Email server configuration',
      priority: 'Medium',
      risk: 'medium',
      timeLeft: '4h 32m',
      agent: 'Mike Chen'
    },
    {
      id: '#2454',
      title: 'User account access request',
      priority: 'Low',
      risk: 'low',
      timeLeft: '1d 2h',
      agent: 'Lisa Park'
    },
    {
      id: '#2453',
      title: 'Application deployment failure',
      priority: 'High',
      risk: 'high',
      timeLeft: '1h 45m',
      agent: 'David Kim'
    },
    {
      id: '#2452',
      title: 'Network latency optimization',
      priority: 'Medium',
      risk: 'medium',
      timeLeft: '6h 20m',
      agent: 'Emma Wilson'
    },
    {
      id: '#2451',
      title: 'Security certificate renewal',
      priority: 'High',
      risk: 'high',
      timeLeft: '3h 10m',
      agent: 'Alex Rodriguez'
    },
    {
      id: '#2450',
      title: 'Backup system maintenance',
      priority: 'Medium',
      risk: 'medium',
      timeLeft: '8h 45m',
      agent: 'Jennifer Lee'
    }
  ];

  const getRiskIcon = (risk: string) => {
    switch (risk) {
      case 'high':
        return <AlertTriangle className="w-4 h-4 text-red-500" />;
      case 'medium':
        return <Clock className="w-4 h-4 text-amber-500" />;
      default:
        return <CheckCircle className="w-4 h-4 text-green-500" />;
    }
  };

  const getRiskBadge = (risk: string) => {
    const classes = {
      high: 'bg-red-100 text-red-800',
      medium: 'bg-amber-100 text-amber-800',
      low: 'bg-green-100 text-green-800'
    };
    
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${classes[risk as keyof typeof classes]}`}>
        {risk.charAt(0).toUpperCase() + risk.slice(1)} Risk
      </span>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Recent Tickets</h3>
          <p className="text-gray-600 text-sm">Latest ticket submissions and risk assessments</p>
        </div>
        <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
          View All
        </button>
      </div>

      <div className="space-y-3">
          {tickets.map((ticket, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="flex items-center space-x-4 flex-1 min-w-0">
                {getRiskIcon(ticket.risk)}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="font-medium text-gray-900">{ticket.id}</span>
                    {getRiskBadge(ticket.risk)}
                  </div>
                  <p className="text-gray-600 mb-1">{ticket.title}</p>
                  <p className="text-xs text-gray-500">Assigned to {ticket.agent}</p>
                </div>
              </div>
              <div className="text-right ml-6 flex-shrink-0">
                <div className="font-medium text-gray-900">{ticket.timeLeft}</div>
                <div className="text-xs text-gray-500">remaining</div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default RecentTickets;
