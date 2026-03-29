import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Zap, Globe, Lock, Rocket, Code2, Github, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

export default function Index() {
  const features = [
    {
      icon: Rocket,
      title: "Automatic Deployments",
      description: "Push to GitHub and we deploy instantly to production",
    },
    {
      icon: Globe,
      title: "Free Domain & SSL",
      description: "Every app includes a free domain and automatic SSL certificates",
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Global CDN, optimized infrastructure, and instant scaling",
    },
    {
      icon: Lock,
      title: "Enterprise Security",
      description: "End-to-end encryption, DDoS protection, and regular backups",
    },
    {
      icon: Code2,
      title: "Multi-Language Support",
      description: "Deploy Node.js, PHP, Python, Ruby, and more",
    },
    {
      icon: Github,
      title: "GitHub Integration",
      description: "Connect your GitHub account for seamless deployments",
    },
  ];

  const pricingPlans = [
    {
      name: "Starter",
      price: "$2.99",
      period: "/month",
      description: "Perfect for hobby projects",
      features: [
        "1 app",
        "2GB storage",
        "10GB bandwidth/month",
        "Community support",
        "Free domain",
      ],
      cta: "Get Started",
      highlighted: false,
    },
    {
      name: "Pro",
      price: "$14.99",
      period: "/month",
      description: "For growing businesses",
      features: [
        "10 apps",
        "100GB storage",
        "500GB bandwidth/month",
        "Priority support",
        "Free domains",
        "Team collaboration",
      ],
      cta: "Start Free Trial",
      highlighted: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "pricing",
      description: "For large-scale deployments",
      features: [
        "Unlimited apps",
        "Unlimited storage",
        "Unlimited bandwidth",
        "24/7 phone support",
        "Custom domains",
        "Advanced monitoring",
      ],
      cta: "Contact Sales",
      highlighted: false,
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Rocket className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                AppHostFast
              </span>
            </div>

            <nav className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-slate-600 hover:text-slate-900 font-medium">
                Features
              </a>
              <a href="#pricing" className="text-slate-600 hover:text-slate-900 font-medium">
                Pricing
              </a>
              <a href="/docs" className="text-slate-600 hover:text-slate-900 font-medium">
                Docs
              </a>
              <a href="https://github.com" className="text-slate-600 hover:text-slate-900 font-medium">
                GitHub
              </a>
            </nav>

            <div className="flex items-center gap-3">
              <Link to="/auth/login">
                <Button variant="ghost">Login</Button>
              </Link>
              <Link to="/auth/signup">
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                  Sign Up
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-32 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-slate-50 -z-10" />
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-200 bg-blue-50 mb-6">
                <span className="text-sm font-semibold text-blue-600">🚀 Launch Your Apps in Seconds</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight">
                Deploy Node.js, PHP & WordPress in Minutes
              </h1>
              <p className="text-xl text-slate-600 mb-8 max-w-lg">
                The easiest way to deploy your web applications. From pushing code to production in just minutes, with zero configuration.
              </p>
              <p className="text-3xl font-bold text-slate-900 mb-8">
                <span className="text-blue-600">$2.99</span>/month
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/auth/signup">
                  <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg px-8 py-6">
                    Get Started Free
                  </Button>
                </Link>
                <Button variant="outline" className="text-lg px-8 py-6">
                  View Demo
                </Button>
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-2xl p-8 border border-slate-200 flex items-center justify-center min-h-96">
              <p className="text-slate-500 text-center">Dashboard Preview</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Everything You Need to Deploy
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Powerful features to help you deploy, manage, and scale your applications
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <Card key={idx} className="border-slate-200">
                  <CardHeader>
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Choose the perfect plan for your needs. Scale as you grow.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, idx) => (
              <Card
                key={idx}
                className={`relative transition-all ${
                  plan.highlighted
                    ? "border-blue-600 ring-2 ring-blue-600 md:scale-105"
                    : "border-slate-200"
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                  <div className="mt-4">
                    <span className="text-4xl font-bold text-slate-900">{plan.price}</span>
                    <span className="text-slate-600 ml-2">{plan.period}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <Button
                    className={`w-full mb-6 ${
                      plan.highlighted
                        ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                        : ""
                    }`}
                    variant={plan.highlighted ? "default" : "outline"}
                  >
                    {plan.cta}
                  </Button>
                  <div className="space-y-3">
                    {plan.features.map((feature, featureIdx) => (
                      <div key={featureIdx} className="flex items-center gap-3">
                        <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                        <span className="text-slate-600">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Deploy?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of developers deploying their apps on AppHostFast
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/auth/signup">
              <Button className="bg-white text-blue-600 hover:bg-slate-100 text-lg px-8 py-6">
                Get Started Free
              </Button>
            </Link>
            <Button
              variant="outline"
              className="border-white text-white hover:bg-white/10 text-lg px-8 py-6"
            >
              Book a Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-white font-semibold mb-4">Product</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white">Features</a></li>
                <li><a href="#" className="hover:text-white">Pricing</a></li>
                <li><a href="#" className="hover:text-white">Security</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white">About</a></li>
                <li><a href="#" className="hover:text-white">Blog</a></li>
                <li><a href="#" className="hover:text-white">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white">Documentation</a></li>
                <li><a href="#" className="hover:text-white">API Reference</a></li>
                <li><a href="#" className="hover:text-white">GitHub</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white">Privacy</a></li>
                <li><a href="#" className="hover:text-white">Terms</a></li>
                <li><a href="#" className="hover:text-white">Cookies</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Rocket className="w-4 h-4 text-white" />
              </div>
              <span className="font-semibold text-white">AppHostFast</span>
            </div>
            <p className="text-sm">© 2024 AppHostFast. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
