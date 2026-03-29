'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Github, Upload, Zap, ArrowLeft, Loader } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function NewAppPage() {
  const router = useRouter();
  const [step, setStep] = useState<'method' | 'configure'>('method');
  const [method, setMethod] = useState<'github' | 'upload' | null>(null);
  const [appName, setAppName] = useState('');
  const [framework, setFramework] = useState('');
  const [envVars, setEnvVars] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const frameworks = [
    { name: 'Node.js + Express', id: 'express', icon: '⚙️', color: 'bg-green-100' },
    { name: 'Next.js', id: 'next.js', icon: '▲', color: 'bg-black' },
    { name: 'React', id: 'react', icon: '⚛️', color: 'bg-blue-100' },
    { name: 'Vue.js', id: 'vue.js', icon: '💚', color: 'bg-green-600' },
    { name: 'PHP', id: 'php', icon: '🐘', color: 'bg-purple-100' },
    { name: 'WordPress', id: 'wordpress', icon: 'W', color: 'bg-blue-600' },
  ];

  const handleDeploy = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!appName || !framework) {
      setError('Please provide an app name and select a framework');
      setLoading(false);
      return;
    }

    try {
      // Parse environment variables
      const envVarsObj = envVars
        ? Object.fromEntries(
            envVars.split('\n').map((line) => {
              const [key, value] = line.split('=');
              return [key, value];
            })
          )
        : {};

      const response = await fetch('/api/apps', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: appName,
          framework,
          envVars: envVarsObj,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.error || 'Failed to create app');
        return;
      }

      const app = await response.json();
      // Redirect to app details page
      router.push(`/dashboard/apps/${app.id}`);
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

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
          {error && (
            <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-400">
              {error}
            </div>
          )}

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
              {frameworks.map((fw, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setFramework(fw.id)}
                  className={`p-4 rounded-xl border transition-all text-center ${
                    framework === fw.id
                      ? 'border-primary bg-primary/10'
                      : 'border-border hover:border-primary hover:bg-muted'
                  }`}
                >
                  <p className="text-3xl mb-2">{fw.icon}</p>
                  <p className="font-semibold text-sm">{fw.name}</p>
                </button>
              ))}
            </div>
          </div>

          {/* App Configuration */}
          <form onSubmit={handleDeploy} className="p-6 rounded-xl border border-border bg-card space-y-4">
            <h2 className="text-xl font-bold">App Configuration</h2>

            <div>
              <label className="block text-sm font-medium mb-2">App Name</label>
              <input
                type="text"
                placeholder="my-awesome-app"
                value={appName}
                onChange={(e) => setAppName(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Environment Variables (Optional)
              </label>
              <textarea
                placeholder="DATABASE_URL=..."
                value={envVars}
                onChange={(e) => setEnvVars(e.target.value)}
                rows={4}
                className="w-full px-4 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary font-mono text-sm"
              />
              <p className="text-xs text-muted-foreground mt-2">
                One variable per line: KEY=VALUE
              </p>
            </div>

            <div className="flex gap-4 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setStep('method');
                  setMethod(null);
                  setError('');
                }}
              >
                Back
              </Button>
              <Button type="submit" disabled={loading} className="btn-primary gap-2 flex-1">
                {loading ? (
                  <>
                    <Loader className="w-5 h-5 animate-spin" />
                    Deploying...
                  </>
                ) : (
                  <>
                    <Zap className="w-5 h-5" />
                    Deploy App
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
