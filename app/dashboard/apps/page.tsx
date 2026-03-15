'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  MoreVertical,
  ExternalLink,
  Trash2,
  Settings,
  Plus,
} from 'lucide-react';
import { useState } from 'react';

export default function AppsPage() {
  const [apps] = useState([
    {
      id: 1,
      name: 'portfolio-v2',
      framework: 'Next.js',
      status: 'active',
      url: 'portfolio-v2.apphostfast.dev',
      domain: 'myportfolio.com',
      lastDeploy: '2 minutes ago',
      cpu: 12,
      memory: 45,
    },
    {
      id: 2,
      name: 'api-server',
      framework: 'Node.js / Express',
      status: 'active',
      url: 'api-server.apphostfast.dev',
      domain: null,
      lastDeploy: '1 hour ago',
      cpu: 8,
      memory: 32,
    },
    {
      id: 3,
      name: 'blog-site',
      framework: 'React',
      status: 'inactive',
      url: 'blog-site.apphostfast.dev',
      domain: 'myblog.com',
      lastDeploy: '3 hours ago',
      cpu: 0,
      memory: 0,
    },
  ]);

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

              <div className="grid md:grid-cols-4 gap-4 mb-4 pb-4 border-b border-border">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">URL</p>
                  <a
                    href={`https://${app.url}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-semibold text-primary hover:underline flex items-center gap-1"
                  >
                    {app.url}
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
                {app.domain && (
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Domain</p>
                    <p className="text-sm font-semibold">{app.domain}</p>
                  </div>
                )}
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Last Deploy</p>
                  <p className="text-sm font-semibold">{app.lastDeploy}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">CPU Usage</p>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary"
                        style={{ width: `${app.cpu}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-semibold">{app.cpu}%</span>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Memory</p>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-secondary"
                        style={{ width: `${app.memory}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-semibold">{app.memory}%</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

import { Code2 } from 'lucide-react';
