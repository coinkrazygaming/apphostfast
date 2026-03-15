'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Github, Upload, Zap, ArrowLeft } from 'lucide-react';
import { useState } from 'react';

export default function NewAppPage() {
  const [step, setStep] = useState<'method' | 'configure'>('method');
  const [method, setMethod] = useState<'github' | 'upload' | null>(null);

  const frameworks = [
    { name: 'Node.js + Express', icon: '⚙️', color: 'bg-green-100' },
    { name: 'Next.js', icon: '▲', color: 'bg-black' },
    { name: 'React', icon: '⚛️', color: 'bg-blue-100' },
    { name: 'Vue.js', icon: '💚', color: 'bg-green-600' },
    { name: 'PHP', icon: '🐘', color: 'bg-purple-100' },
    { name: 'WordPress', icon: 'W', color: 'bg-blue-600' },
  ];

  return (
    <div className="max-w-4xl">
      {/* Header */}
      <div className="mb-8">
        <Link href="/dashboard/apps" className="flex items-center gap-2 text-primary hover:underline mb-4">
          <ArrowLeft className="w-4 h-4" />
          Back to Apps
        </Link>
        <h1 className="text-3xl font-bold">Deploy a New App</h1>
        <p className="text-muted-foreground mt-2">
          Connect your GitHub account or upload your code to get started
        </p>
      </div>

      {step === 'method' && (
        <div className="grid md:grid-cols-2 gap-6">
          {/* GitHub Option */}
          <button
            onClick={() => {
              setMethod('github');
              setStep('configure');
            }}
            className="p-8 rounded-xl border-2 border-border hover:border-primary transition-all hover:bg-muted cursor-pointer text-left"
          >
            <Github className="w-12 h-12 text-primary mb-4" />
            <h3 className="text-xl font-bold mb-2">Connect GitHub</h3>
            <p className="text-muted-foreground mb-6">
              Automatic deployments on every push. Best for teams.
            </p>
            <div className="space-y-2 text-sm">
              <p className="flex items-center gap-2">
                <span className="text-primary">✓</span> Automatic deployments
              </p>
              <p className="flex items-center gap-2">
                <span className="text-primary">✓</span> Preview deployments
              </p>
              <p className="flex items-center gap-2">
                <span className="text-primary">✓</span> Rollback on demand
              </p>
            </div>
          </button>

          {/* Upload Option */}
          <button
            onClick={() => {
              setMethod('upload');
              setStep('configure');
            }}
            className="p-8 rounded-xl border-2 border-border hover:border-primary transition-all hover:bg-muted cursor-pointer text-left"
          >
            <Upload className="w-12 h-12 text-primary mb-4" />
            <h3 className="text-xl font-bold mb-2">Upload Code</h3>
            <p className="text-muted-foreground mb-6">
              Upload a ZIP file with your code. One-time setup.
            </p>
            <div className="space-y-2 text-sm">
              <p className="flex items-center gap-2">
                <span className="text-primary">✓</span> Direct code upload
              </p>
              <p className="flex items-center gap-2">
                <span className="text-primary">✓</span> ZIP or directory
              </p>
              <p className="flex items-center gap-2">
                <span className="text-primary">✓</span> No CI/CD needed
              </p>
            </div>
          </button>
        </div>
      )}

      {step === 'configure' && method && (
        <div className="space-y-8">
          {method === 'github' && (
            <>
              <div className="p-6 rounded-xl border border-border bg-card">
                <h2 className="text-xl font-bold mb-4">Connect GitHub Account</h2>
                <p className="text-muted-foreground mb-6">
                  Click below to authorize AppHostFast with your GitHub account
                </p>
                <Button className="btn-primary gap-2">
                  <Github className="w-5 h-5" />
                  Connect GitHub
                </Button>
              </div>
            </>
          )}

          {method === 'upload' && (
            <>
              <div className="p-8 rounded-xl border-2 border-dashed border-border hover:border-primary transition-colors cursor-pointer text-center">
                <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Upload Your Code</h3>
                <p className="text-muted-foreground mb-6">
                  Drag and drop your code ZIP file or click to browse
                </p>
                <Button variant="outline">Select Files</Button>
              </div>
            </>
          )}

          {/* Framework Selection */}
          <div>
            <h2 className="text-xl font-bold mb-4">Select Your Framework</h2>
            <p className="text-muted-foreground mb-6">
              We'll automatically detect your framework, but you can choose here
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {frameworks.map((framework, i) => (
                <button
                  key={i}
                  className="p-4 rounded-xl border border-border hover:border-primary transition-all hover:bg-muted text-center"
                >
                  <p className="text-3xl mb-2">{framework.icon}</p>
                  <p className="font-semibold text-sm">{framework.name}</p>
                </button>
              ))}
            </div>
          </div>

          {/* App Configuration */}
          <div className="p-6 rounded-xl border border-border bg-card space-y-4">
            <h2 className="text-xl font-bold">App Configuration</h2>

            <div>
              <label className="block text-sm font-medium mb-2">App Name</label>
              <input
                type="text"
                placeholder="my-awesome-app"
                className="w-full px-4 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Environment Variables (Optional)
              </label>
              <textarea
                placeholder="DATABASE_URL=..." 
                rows={4}
                className="w-full px-4 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary font-mono text-sm"
              />
              <p className="text-xs text-muted-foreground mt-2">
                One variable per line: KEY=VALUE
              </p>
            </div>

            <div className="flex gap-4 pt-4">
              <Button
                variant="outline"
                onClick={() => {
                  setStep('method');
                  setMethod(null);
                }}
              >
                Back
              </Button>
              <Button className="btn-primary gap-2 flex-1">
                <Zap className="w-5 h-5" />
                Deploy App
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
