'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft, RotateCw, Trash2, Terminal } from 'lucide-react';
import { useState } from 'react';

export default function AppDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const [activeTab, setActiveTab] = useState<'settings' | 'logs' | 'monitoring'>('settings');

  // Mock app data
  const app = {
    id: params.id,
    name: 'portfolio-v2',
    framework: 'Next.js',
    status: 'active',
    url: 'portfolio-v2.apphostfast.dev',
    domain: 'myportfolio.com',
    lastDeploy: '2 minutes ago',
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <Link href="/dashboard/apps" className="flex items-center gap-2 text-primary hover:underline mb-4">
          <ArrowLeft className="w-4 h-4" />
          Back to Apps
        </Link>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">{app.name}</h1>
            <p className="text-muted-foreground mt-2">{app.framework} • {app.url}</p>
          </div>
          <span className="px-3 py-1 rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100 text-sm font-semibold">
            {app.status}
          </span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 border-b border-border mb-8">
        {['settings', 'logs', 'monitoring'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as any)}
            className={`px-4 py-2 font-semibold border-b-2 transition-colors ${
              activeTab === tab
                ? 'border-primary text-foreground'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Content */}
      {activeTab === 'settings' && (
        <div className="space-y-6 max-w-2xl">
          {/* Basic Settings */}
          <div className="p-6 rounded-xl border border-border bg-card">
            <h2 className="text-xl font-bold mb-4">Basic Settings</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">App Name</label>
                <input
                  type="text"
                  defaultValue={app.name}
                  className="w-full px-4 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Framework</label>
                <input
                  type="text"
                  defaultValue={app.framework}
                  disabled
                  className="w-full px-4 py-2 rounded-lg border border-input bg-muted cursor-not-allowed"
                />
              </div>
              <Button className="btn-primary">Save Changes</Button>
            </div>
          </div>

          {/* Domain Settings */}
          <div className="p-6 rounded-xl border border-border bg-card">
            <h2 className="text-xl font-bold mb-4">Domain</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Custom Domain</label>
                <input
                  type="text"
                  defaultValue={app.domain}
                  placeholder="yourdomain.com"
                  className="w-full px-4 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <Button className="btn-secondary">Configure DNS</Button>
            </div>
          </div>

          {/* Environment Variables */}
          <div className="p-6 rounded-xl border border-border bg-card">
            <h2 className="text-xl font-bold mb-4">Environment Variables</h2>
            <textarea
              placeholder="DATABASE_URL=..."
              rows={6}
              className="w-full px-4 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary font-mono text-sm mb-4"
            />
            <Button className="btn-primary">Update Variables</Button>
          </div>

          {/* Deployments */}
          <div className="p-6 rounded-xl border border-border bg-card">
            <h2 className="text-xl font-bold mb-4">Deployment</h2>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground mb-4">
                  Last deployment: <span className="font-semibold">{app.lastDeploy}</span>
                </p>
                <div className="flex gap-2">
                  <Button className="btn-secondary gap-2">
                    <RotateCw className="w-5 h-5" />
                    Redeploy
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Danger Zone */}
          <div className="p-6 rounded-xl border border-destructive bg-destructive/5">
            <h2 className="text-xl font-bold mb-4 text-destructive">Danger Zone</h2>
            <p className="text-sm text-muted-foreground mb-4">
              Deleting your app is permanent and cannot be undone.
            </p>
            <Button variant="destructive" className="gap-2">
              <Trash2 className="w-5 h-5" />
              Delete App
            </Button>
          </div>
        </div>
      )}

      {activeTab === 'logs' && (
        <div className="p-6 rounded-xl border border-border bg-card">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Terminal className="w-5 h-5" />
            Live Logs
          </h2>
          <div className="bg-slate-900 text-slate-100 p-4 rounded-lg font-mono text-sm h-96 overflow-y-auto">
            <div className="space-y-1">
              <div>[2024-01-15 10:32:15] Starting deployment...</div>
              <div>[2024-01-15 10:32:16] Cloning repository...</div>
              <div>[2024-01-15 10:32:18] Installing dependencies...</div>
              <div className="text-green-400">[2024-01-15 10:32:45] Build completed successfully</div>
              <div>[2024-01-15 10:32:46] Starting server...</div>
              <div className="text-green-400">[2024-01-15 10:32:47] App running on port 3000</div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'monitoring' && (
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-6 rounded-xl border border-border bg-card">
            <h3 className="text-lg font-bold mb-4">CPU Usage</h3>
            <div className="h-40 bg-muted rounded-lg flex items-center justify-center text-muted-foreground">
              Chart Placeholder
            </div>
          </div>
          <div className="p-6 rounded-xl border border-border bg-card">
            <h3 className="text-lg font-bold mb-4">Memory Usage</h3>
            <div className="h-40 bg-muted rounded-lg flex items-center justify-center text-muted-foreground">
              Chart Placeholder
            </div>
          </div>
          <div className="p-6 rounded-xl border border-border bg-card">
            <h3 className="text-lg font-bold mb-4">Requests Per Second</h3>
            <div className="h-40 bg-muted rounded-lg flex items-center justify-center text-muted-foreground">
              Chart Placeholder
            </div>
          </div>
          <div className="p-6 rounded-xl border border-border bg-card">
            <h3 className="text-lg font-bold mb-4">Error Rate</h3>
            <div className="h-40 bg-muted rounded-lg flex items-center justify-center text-muted-foreground">
              Chart Placeholder
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
