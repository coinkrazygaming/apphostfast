'use client';

import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Activity, Zap, AlertTriangle, TrendingUp } from 'lucide-react';

export default function MonitoringPage() {
  // Mock data
  const cpuData = [
    { time: '10:00', usage: 12 },
    { time: '10:15', usage: 19 },
    { time: '10:30', usage: 14 },
    { time: '10:45', usage: 28 },
    { time: '11:00', usage: 32 },
    { time: '11:15', usage: 25 },
    { time: '11:30', usage: 18 },
  ];

  const memoryData = [
    { time: '10:00', usage: 256 },
    { time: '10:15', usage: 312 },
    { time: '10:30', usage: 289 },
    { time: '10:45', usage: 405 },
    { time: '11:00', usage: 462 },
    { time: '11:15', usage: 398 },
    { time: '11:30', usage: 345 },
  ];

  const requestData = [
    { status: '200', count: 8564, fill: '#10b981' },
    { status: '404', count: 234, fill: '#f59e0b' },
    { status: '500', count: 45, fill: '#ef4444' },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2">Platform Monitoring</h1>
        <p className="text-muted-foreground">
          Real-time metrics and performance analytics across all your apps
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="p-6 rounded-xl border border-border bg-card">
          <div className="flex items-start justify-between mb-4">
            <h3 className="text-sm font-medium text-muted-foreground">Avg CPU Usage</h3>
            <Zap className="w-5 h-5 text-yellow-500" />
          </div>
          <p className="text-3xl font-bold">24%</p>
          <p className="text-xs text-green-600 mt-2">↓ 5% from yesterday</p>
        </div>

        <div className="p-6 rounded-xl border border-border bg-card">
          <div className="flex items-start justify-between mb-4">
            <h3 className="text-sm font-medium text-muted-foreground">Avg Memory</h3>
            <Activity className="w-5 h-5 text-blue-500" />
          </div>
          <p className="text-3xl font-bold">512 MB</p>
          <p className="text-xs text-green-600 mt-2">↓ 2% from yesterday</p>
        </div>

        <div className="p-6 rounded-xl border border-border bg-card">
          <div className="flex items-start justify-between mb-4">
            <h3 className="text-sm font-medium text-muted-foreground">Requests/sec</h3>
            <TrendingUp className="w-5 h-5 text-green-500" />
          </div>
          <p className="text-3xl font-bold">1,247</p>
          <p className="text-xs text-green-600 mt-2">↑ 12% from yesterday</p>
        </div>

        <div className="p-6 rounded-xl border border-border bg-card">
          <div className="flex items-start justify-between mb-4">
            <h3 className="text-sm font-medium text-muted-foreground">Error Rate</h3>
            <AlertTriangle className="w-5 h-5 text-red-500" />
          </div>
          <p className="text-3xl font-bold">0.52%</p>
          <p className="text-xs text-green-600 mt-2">↓ 0.3% from yesterday</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* CPU Chart */}
        <div className="p-6 rounded-xl border border-border bg-card">
          <h2 className="text-lg font-bold mb-6">CPU Usage (Last Hour)</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={cpuData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="usage" stroke="#3b82f6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Memory Chart */}
        <div className="p-6 rounded-xl border border-border bg-card">
          <h2 className="text-lg font-bold mb-6">Memory Usage (Last Hour)</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={memoryData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="usage" stroke="#8b5cf6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Requests by Status */}
        <div className="p-6 rounded-xl border border-border bg-card">
          <h2 className="text-lg font-bold mb-6">Requests by Status</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={requestData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ status, percent }) => `${status} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="count"
              >
                {requestData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Response Times */}
        <div className="p-6 rounded-xl border border-border bg-card">
          <h2 className="text-lg font-bold mb-6">Response Times by Endpoint</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={[
              { endpoint: 'GET /api/apps', time: 45 },
              { endpoint: 'POST /api/deploy', time: 234 },
              { endpoint: 'GET /dashboard', time: 123 },
              { endpoint: 'GET /api/logs', time: 67 },
            ]}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="endpoint" angle={-45} textAnchor="end" height={80} />
              <YAxis label={{ value: 'Time (ms)', angle: -90, position: 'insideLeft' }} />
              <Tooltip />
              <Bar dataKey="time" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Alerts */}
      <div className="p-6 rounded-xl border border-border bg-card">
        <h2 className="text-lg font-bold mb-6">Active Alerts</h2>
        <div className="space-y-3">
          <div className="flex items-start gap-4 p-4 rounded-lg bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800">
            <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-semibold text-yellow-900 dark:text-yellow-100">
                High CPU Usage
              </p>
              <p className="text-sm text-yellow-800 dark:text-yellow-200">
                API server CPU reached 78% at 11:15 AM
              </p>
            </div>
            <button className="ml-auto text-sm text-yellow-600 hover:underline">
              Dismiss
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
