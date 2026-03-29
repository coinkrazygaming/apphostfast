import Link from 'next/link';
import { ArrowLeft, CheckCircle, AlertCircle } from 'lucide-react';

export default function StatusPage() {
  const services = [
    { name: 'API', status: 'operational', uptime: '99.99%' },
    { name: 'Dashboard', status: 'operational', uptime: '99.99%' },
    { name: 'Deployments', status: 'operational', uptime: '99.95%' },
    { name: 'Database', status: 'operational', uptime: '99.99%' },
  ];

  const incidents = [
    {
      date: 'March 20, 2024',
      title: 'Scheduled Maintenance',
      description: 'Infrastructure upgrades completed successfully',
      status: 'resolved',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Header */}
      <header className="bg-white dark:bg-slate-800 border-b border-border sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/" className="flex items-center gap-2 text-primary hover:underline">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-bold mb-4">System Status</h1>
        <p className="text-xl text-muted-foreground mb-12">
          Monitor the status of AppHostFast services and infrastructure
        </p>

        {/* Overall Status */}
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-border p-8 mb-12">
          <div className="flex items-center gap-4 mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
            <div>
              <h2 className="text-2xl font-bold">All Systems Operational</h2>
              <p className="text-muted-foreground">All services are running normally</p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            Last updated: {new Date().toLocaleString()}
          </p>
        </div>

        {/* Services Status */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Service Status</h2>
          <div className="grid gap-4">
            {services.map((service) => (
              <div key={service.name} className="bg-white dark:bg-slate-800 rounded-xl border border-border p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <div>
                      <h3 className="font-semibold">{service.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {service.status === 'operational' ? 'All systems operational' : 'Experiencing issues'}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-green-600">{service.uptime} uptime</p>
                    <p className="text-sm text-muted-foreground">This month</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Incidents */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Recent Incidents</h2>
          {incidents.length === 0 ? (
            <div className="bg-white dark:bg-slate-800 rounded-xl border border-border p-8 text-center">
              <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <p className="text-muted-foreground">No recent incidents</p>
            </div>
          ) : (
            <div className="space-y-4">
              {incidents.map((incident, i) => (
                <div key={i} className="bg-white dark:bg-slate-800 rounded-xl border border-border p-6">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold">{incident.title}</h3>
                    <span className="text-xs px-2 py-1 rounded bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                      {incident.status}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{incident.date}</p>
                  <p className="text-muted-foreground">{incident.description}</p>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
