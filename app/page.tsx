'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Check, Zap, Github, Rocket, Shield, BarChart3, Globe, Code2 } from 'lucide-react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-blue-50 to-white dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <Header />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-block mb-4">
              <span className="badge-primary">🚀 Launch Your Apps in Seconds</span>
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black mb-6 gradient-text leading-tight">
              Deploy Node.js, PHP & WordPress in Minutes
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Production-ready web app hosting with automatic deployments, free domain, managed SSL, and built-in monitoring. Starting at just <span className="font-bold text-primary">$2.99/month</span>.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/auth/signup">
                <Button size="lg" className="btn-primary text-lg px-8">
                  Get Started Free
                </Button>
              </Link>
              <Button size="lg" className="btn-secondary text-lg px-8">
                View Demo
              </Button>
            </div>
          </div>

          {/* Screenshot/Feature Image */}
          <div className="relative h-96 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl border border-border overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <Code2 className="w-20 h-20 mx-auto text-primary mb-4 opacity-30" />
                <p className="text-muted-foreground">Dashboard Preview</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-card">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Everything You Need to Host Apps</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              All the tools of enterprise hosting, none of the complexity
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Rocket,
                title: 'Automatic Deployments',
                desc: 'Push to GitHub and we deploy instantly. No config, no YAML, no fuss.',
              },
              {
                icon: Globe,
                title: 'Free Domain & SSL',
                desc: 'Get a free .app domain and auto-renewing SSL for 1 year. Custom domains included.',
              },
              {
                icon: Shield,
                title: 'Enterprise Security',
                desc: 'Web Application Firewall, DDoS protection, and rate limiting built-in.',
              },
              {
                icon: BarChart3,
                title: 'Live Monitoring',
                desc: 'Real-time CPU, RAM, and request tracking. See exactly what your app is doing.',
              },
              {
                icon: Zap,
                title: 'Lightning Fast',
                desc: 'Global CDN, optimized builds, and instant scaling. 99.9% uptime guaranteed.',
              },
              {
                icon: Github,
                title: 'GitHub Integration',
                desc: 'Connect your repo, set up deployments, manage via webhooks. No secrets exposed.',
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="p-6 rounded-xl border border-border bg-white dark:bg-slate-900 hover:border-primary transition-colors"
              >
                <feature.icon className="w-10 h-10 text-primary mb-4" />
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              No hidden fees. All plans include free domain, SSL, and email for 1 year.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {/* Business Plan */}
            <div className="p-8 rounded-2xl border border-border bg-white dark:bg-slate-900">
              <h3 className="text-2xl font-bold mb-2">Business</h3>
              <div className="mb-6">
                <span className="text-4xl font-black text-primary">$2.99</span>
                <span className="text-muted-foreground">/month</span>
              </div>

              <div className="space-y-4 mb-8">
                {[
                  '5 managed web apps',
                  'Up to 50 websites',
                  '2 CPU cores, 3 GB RAM',
                  '50 GB NVMe storage',
                  '5 mailboxes per website',
                  'Unlimited bandwidth',
                  'Free domain (1 year)',
                  'Free SSL certificate',
                ].map((feature, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              <Link href="/auth/signup?plan=business">
                <Button className="w-full btn-secondary" size="lg">
                  Start Free Trial
                </Button>
              </Link>
            </div>

            {/* Cloud Startup Plan (Featured) */}
            <div className="p-8 rounded-2xl border-2 border-primary bg-gradient-to-br from-primary/5 to-secondary/5 dark:from-primary/20 dark:to-secondary/20 relative overflow-hidden">
              <div className="absolute -top-3 left-6 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-semibold">
                Most Popular
              </div>

              <h3 className="text-2xl font-bold mb-2 mt-4">Cloud Startup</h3>
              <div className="mb-6">
                <span className="text-4xl font-black text-primary">$6.99</span>
                <span className="text-muted-foreground">/month</span>
              </div>

              <div className="space-y-4 mb-8">
                {[
                  '10 managed web apps',
                  'Up to 100 websites',
                  '4 CPU cores, 4 GB RAM',
                  '100 GB NVMe storage',
                  'Dedicated IP included',
                  'Unlimited bandwidth',
                  'Priority support',
                  'Power boost feature',
                ].map((feature, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="font-medium">{feature}</span>
                  </div>
                ))}
              </div>

              <Link href="/auth/signup?plan=startup">
                <Button className="w-full btn-primary" size="lg">
                  Start Free Trial
                </Button>
              </Link>
            </div>
          </div>

          <p className="text-center text-muted-foreground mt-8">
            Both plans include 30 days free. No credit card required. Cancel anytime.
          </p>
        </div>
      </section>

      {/* Framework Support */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-card">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Deploy Any Framework</h2>
            <p className="text-xl text-muted-foreground">
              Automatic framework detection and optimized builds for all the tools you love
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              'React',
              'Vue.js',
              'Next.js',
              'Nuxt.js',
              'Angular',
              'Node.js',
              'Express.js',
              'NestJS',
              'PHP',
              'WordPress',
              'Laravel',
              'Static HTML',
            ].map((framework, i) => (
              <div
                key={i}
                className="p-6 rounded-xl border border-border bg-white dark:bg-slate-900 text-center font-semibold hover:border-primary transition-colors"
              >
                {framework}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 gradient-bg">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Deploy Your First App in 2 Minutes</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Connect your GitHub repo, and we'll handle the rest. Automatic deployments, SSL, and monitoring included.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/signup">
              <Button size="lg" className="btn-primary text-lg px-8">
                Start Building
              </Button>
            </Link>
            <Button size="lg" className="btn-secondary text-lg px-8">
              Read Docs
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
