'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  MoreVertical,
  ExternalLink,
  Trash2,
  Settings,
  Plus,
  Code2,
  Loader,
} from 'lucide-react';
import { useState, useEffect } from 'react';

interface App {
  id: string;
  name: string;
  framework: string;
  status: string;
  subdomain: string;
  customDomain: string | null;
  lastDeploy: string | null;
  deployCount: number;
}

export default function AppsPage() {
  const [apps, setApps] = useState<App[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchApps = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/apps');

        if (!response.ok) {
          if (response.status === 401) {
            window.location.href = '/auth/login';
            return;
          }
          throw new Error('Failed to fetch apps');
        }

        const data = await response.json();
        setApps(data);
      } catch (err) {
        setError('Failed to load apps');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchApps();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <Loader className="w-8 h-8 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-muted-foreground">Loading apps...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start md:items-center flex-col md:flex-row gap-4">
        <div>
          <h1 className="text-3xl font-bold">Your Apps</h1>
          <p className="text-muted-foreground mt-2">
            {apps.length} {apps.length === 1 ? 'app' : 'apps'} deployed
          </p>
        </div>
        <Link href="/dashboard/apps/new">
          <Button className="btn-primary gap-2">
            <Plus className="w-5 h-5" />
            New App
          </Button>
        </Link>
      </div>

      {error && (
        <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-400">
          {error}
        </div>
      )}

      {/* Apps Grid */}
      {apps.length === 0 ? (
        <div className="text-center py-12 rounded-xl border-2 border-dashed border-border">
          <Code2 className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
          <h3 className="text-lg font-semibold mb-2">No apps yet</h3>
          <p className="text-muted-foreground mb-6">
            Deploy your first app to get started
          </p>
          <Link href="/dashboard/apps/new">
            <Button className="btn-primary">Deploy Your First App</Button>
          </Link>
        </div>
      ) : (
        <div className="grid gap-6">
          {apps.map((app) => (
            <div
              key={app.id}
              className="border border-border rounded-xl bg-card p-6 hover:border-primary transition-colors"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-bold">{app.name}</h3>
                    <span
                      className={`px-2 py-1 rounded text-xs font-semibold ${
                        app.status === 'active'
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100'
                          : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100'
                      }`}
                    >
                      {app.status}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">{app.framework}</p>
                </div>

                <div className="flex gap-2">
                  <Link href={`/dashboard/apps/${app.id}`}>
                    <Button variant="ghost" size="icon">
                      <Settings className="w-5 h-5" />
                    </Button>
                  </Link>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="w-5 h-5" />
                  </Button>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4 mb-4 pb-4 border-b border-border">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">URL</p>
                  <a
                    href={`https://${app.subdomain}.apphostfast.dev`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-semibold text-primary hover:underline flex items-center gap-1 break-all"
                  >
                    {app.subdomain}.apphostfast.dev
                    <ExternalLink className="w-4 h-4 flex-shrink-0" />
                  </a>
                </div>
                {app.customDomain && (
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Custom Domain</p>
                    <p className="text-sm font-semibold">{app.customDomain}</p>
                  </div>
                )}
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Deployments</p>
                  <p className="text-sm font-semibold">{app.deployCount}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
