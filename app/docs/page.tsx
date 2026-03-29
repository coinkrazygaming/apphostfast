import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft, BookOpen, Code, Zap } from 'lucide-react';

export default function DocsPage() {
  const docs = [
    {
      title: 'Getting Started',
      description: 'Learn how to deploy your first app',
      icon: Zap,
      href: '#getting-started',
    },
    {
      title: 'Deployment',
      description: 'Deploy from GitHub or upload your code',
      icon: Code,
      href: '#deployment',
    },
    {
      title: 'Configuration',
      description: 'Configure your app with environment variables',
      icon: BookOpen,
      href: '#configuration',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Header */}
      <header className="bg-white dark:bg-slate-800 border-b border-border sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/" className="flex items-center gap-2 text-primary hover:underline">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-bold mb-4">Documentation</h1>
        <p className="text-xl text-muted-foreground mb-12">
          Learn how to use AppHostFast to deploy and manage your applications
        </p>

        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {docs.map((doc) => {
            const Icon = doc.icon;
            return (
              <a
                key={doc.title}
                href={doc.href}
                className="p-6 rounded-xl border border-border hover:border-primary bg-white dark:bg-slate-800 transition-all hover:shadow-lg"
              >
                <Icon className="w-8 h-8 text-primary mb-4" />
                <h3 className="font-bold text-lg mb-2">{doc.title}</h3>
                <p className="text-muted-foreground text-sm">{doc.description}</p>
              </a>
            );
          })}
        </div>

        {/* Documentation Sections */}
        <div className="space-y-12">
          {/* Getting Started */}
          <section id="getting-started" className="scroll-mt-16">
            <h2 className="text-3xl font-bold mb-4">Getting Started</h2>
            <div className="bg-white dark:bg-slate-800 rounded-xl border border-border p-8 space-y-4">
              <p>
                AppHostFast makes it easy to deploy your applications in seconds. Follow these steps to get started:
              </p>
              <ol className="list-decimal list-inside space-y-3 text-muted-foreground">
                <li>Create an account on AppHostFast</li>
                <li>Connect your GitHub account or upload your code</li>
                <li>Select your framework (Next.js, Express, React, etc.)</li>
                <li>Configure environment variables if needed</li>
                <li>Click Deploy and your app will be live in seconds</li>
              </ol>
            </div>
          </section>

          {/* Deployment */}
          <section id="deployment" className="scroll-mt-16">
            <h2 className="text-3xl font-bold mb-4">Deployment</h2>
            <div className="bg-white dark:bg-slate-800 rounded-xl border border-border p-8 space-y-4">
              <h3 className="text-xl font-semibold">GitHub Deployment</h3>
              <p>
                Connect your GitHub account to enable automatic deployments on every push. When you push to your main
                branch, your app will automatically rebuild and deploy.
              </p>

              <h3 className="text-xl font-semibold mt-6">Manual Deployment</h3>
              <p>
                You can also upload your code as a ZIP file for one-time deployments. Simply select the framework,
                configure your settings, and click Deploy.
              </p>
            </div>
          </section>

          {/* Configuration */}
          <section id="configuration" className="scroll-mt-16">
            <h2 className="text-3xl font-bold mb-4">Configuration</h2>
            <div className="bg-white dark:bg-slate-800 rounded-xl border border-border p-8 space-y-4">
              <h3 className="text-xl font-semibold">Environment Variables</h3>
              <p>
                Set environment variables for your app in the deployment configuration. Use the format:
              </p>
              <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto text-sm">
                DATABASE_URL=postgresql://...{'\n'}API_KEY=your-api-key
              </pre>

              <h3 className="text-xl font-semibold mt-6">Build and Start Commands</h3>
              <p>
                Customize your build and start commands for your specific framework. AppHostFast auto-detects most
                popular frameworks.
              </p>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
