import React from 'react';
import { AlertTriangle, Clock, CheckCircle, TrendingUp, Users, Ticket } from 'lucide-react';
import MetricCard from './MetricCard';
import RiskChart from './RiskChart';
import RecentTickets from './RecentTickets';

const Dashboard = () => {
  const metrics = [
    {
      title: 'Active Tickets',
      value: '247',
      change: '+12%',
      trend: 'up',
      icon: Ticket,
      color: 'blue'
    },
    {
      title: 'High Risk',
      value: '23',
      change: '-5%',
      trend: 'down',
      icon: AlertTriangle,
      color: 'red'
    },
    {
      title: 'Avg Response Time',
      value: '2.4h',
      change: '-8%',
      trend: 'down',
      icon: Clock,
      color: 'green'
    },
    {
      title: 'SLA Compliance',
      value: '94.2%',
      change: '+2%',
      trend: 'up',
      icon: CheckCircle,
      color: 'emerald'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Dashboard Overview</h2>
          <p className="text-gray-600 mt-1">Monitor SLA performance and breach predictions in real-time</p>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <Clock className="w-4 h-4" />
          <span>Last updated: 2 minutes ago</span>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <MetricCard key={index} {...metric} />
        ))}
      </div>

      {/* Charts and Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <RiskChart />
        <div className="lg:col-span-2">
          <RecentTickets />
        </div>
      </div>

      {/* Alert Banner */}
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5" />
          <div>
            <h3 className="font-medium text-amber-800">Prediction Alert</h3>
            <p className="text-amber-700 text-sm mt-1">
              3 tickets are predicted to breach SLA within the next 4 hours. Consider prioritizing tickets #2451, #2453, and #2456.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
