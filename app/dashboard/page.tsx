'use client';

import { BarChart3, Clock, Zap, AlertCircle } from 'lucide-react';

export default function DashboardPage() {
  // Mock data
  const stats = [
    {
      label: 'Active Apps',
      value: '3',
      icon: Zap,
      color: 'text-blue-500',
    },
    {
      label: 'Uptime',
      value: '99.9%',
      icon: BarChart3,
      color: 'text-green-500',
    },
    {
      label: 'Total Deployments',
      value: '27',
      icon: Clock,
      color: 'text-purple-500',
    },
    {
      label: 'Alerts',
      value: '0',
      icon: AlertCircle,
      color: 'text-orange-500',
    },
  ];

  const recentDeployments = [
    {
      id: 1,
      app: 'portfolio-v2',
      status: 'success',
      commit: 'Update landing page',
      time: '2 minutes ago',
    },
    {
      id: 2,
      app: 'api-server',
      status: 'success',
      commit: 'Add auth endpoints',
      time: '1 hour ago',
    },
    {
      id: 3,
      app: 'blog-site',
      status: 'success',
      commit: 'Fix SEO tags',
      time: '3 hours ago',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div
            key={i}
            className="p-6 rounded-xl border border-border bg-card hover:border-primary transition-colors"
          >
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-sm font-medium text-muted-foreground">
                {stat.label}
              </h3>
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
            </div>
            <p className="text-3xl font-bold">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Recent Deployments */}
      <div className="rounded-xl border border-border bg-card p-6">
        <h2 className="text-xl font-bold mb-6">Recent Deployments</h2>
        <div className="space-y-4">
          {recentDeployments.map((deployment) => (
            <div
              key={deployment.id}
              className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted transition-colors"
            >
              <div className="flex-1">
                <p className="font-semibold">{deployment.app}</p>
                <p className="text-sm text-muted-foreground">
                  {deployment.commit}
                </p>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-2 mb-1">
                  <span className="inline-block w-2 h-2 rounded-full bg-green-500"></span>
                  <span className="text-sm font-medium">Success</span>
                </div>
                <p className="text-xs text-muted-foreground">{deployment.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Getting Started */}
      <div className="rounded-xl border border-border bg-gradient-to-br from-primary/5 to-secondary/5 p-8">
        <h2 className="text-2xl font-bold mb-4">Getting Started</h2>
        <p className="text-muted-foreground mb-6">
          Ready to deploy your first app? Here's how to get started in under 2 minutes.
        </p>
        <ol className="space-y-4 max-w-2xl">
          <li className="flex gap-4">
            <span className="font-bold text-primary">1</span>
            <div>
              <p className="font-semibold">Connect your GitHub account</p>
              <p className="text-sm text-muted-foreground">
                Authorize AppHostFast to access your repositories
              </p>
            </div>
          </li>
          <li className="flex gap-4">
            <span className="font-bold text-primary">2</span>
            <div>
              <p className="font-semibold">Select a repository</p>
              <p className="text-sm text-muted-foreground">
                Choose the repo you want to deploy from your connected accounts
              </p>
            </div>
          </li>
          <li className="flex gap-4">
            <span className="font-bold text-primary">3</span>
            <div>
              <p className="font-semibold">Configure and deploy</p>
              <p className="text-sm text-muted-foreground">
                Set environment variables and watch your app go live automatically
              </p>
            </div>
          </li>
        </ol>
      </div>
    </div>
  );
}
