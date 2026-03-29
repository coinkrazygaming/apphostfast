import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Code2, BookOpen, Zap, Github } from "lucide-react";
import { Link } from "react-router-dom";

export default function Docs() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/80 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="font-bold text-lg text-slate-900">
              AppHostFast
            </Link>
            <nav className="hidden md:flex items-center gap-8">
              <a href="#getting-started" className="text-slate-600 hover:text-slate-900">
                Getting Started
              </a>
              <a href="#guides" className="text-slate-600 hover:text-slate-900">
                Guides
              </a>
              <a href="#api" className="text-slate-600 hover:text-slate-900">
                API
              </a>
              <a href="#faq" className="text-slate-600 hover:text-slate-900">
                FAQ
              </a>
            </nav>
            <Link to="/auth/signup">
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="pt-20 pb-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 via-purple-50 to-slate-50">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-5xl font-bold text-slate-900 mb-4">Documentation</h1>
          <p className="text-xl text-slate-600">
            Learn how to deploy, manage, and scale your applications with AppHostFast
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <nav className="sticky top-24 space-y-2">
              <h3 className="font-semibold text-slate-900 text-sm uppercase tracking-wide mb-4">
                Navigation
              </h3>
              <a
                href="#getting-started"
                className="block px-3 py-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg"
              >
                Getting Started
              </a>
              <a
                href="#deployment"
                className="block px-3 py-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg"
              >
                Deployment
              </a>
              <a
                href="#frameworks"
                className="block px-3 py-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg"
              >
                Frameworks
              </a>
              <a
                href="#environment"
                className="block px-3 py-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg"
              >
                Environment Variables
              </a>
              <a
                href="#api"
                className="block px-3 py-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg"
              >
                API Reference
              </a>
              <a
                href="#faq"
                className="block px-3 py-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg"
              >
                FAQ
              </a>
            </nav>
          </div>

          {/* Content */}
          <div className="lg:col-span-3 space-y-12">
            {/* Getting Started */}
            <section id="getting-started">
              <h2 className="text-3xl font-bold text-slate-900 mb-6">Getting Started</h2>

              <div className="space-y-4 mb-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-semibold">
                        1
                      </span>
                      Create an Account
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600 mb-4">
                      Sign up for a free account to get started with AppHostFast. You'll get instant access to the dashboard
                      and can deploy your first app within minutes.
                    </p>
                    <Link to="/auth/signup">
                      <Button variant="outline" size="sm">
                        Create Account <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <span className="w-8 h-8 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center font-semibold">
                        2
                      </span>
                      Connect Your Repository
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600">
                      Connect your GitHub account to enable automatic deployments. Every push to your main branch will
                      trigger a new deployment.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <span className="w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center font-semibold">
                        3
                      </span>
                      Deploy Your App
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600">
                      Click "New App" in your dashboard and follow the deployment wizard to deploy your application.
                      Your app will be live in minutes.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Deployment */}
            <section id="deployment">
              <h2 className="text-3xl font-bold text-slate-900 mb-6">Deployment</h2>

              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Automatic Deployments</CardTitle>
                  <CardDescription>
                    AppHostFast automatically builds and deploys your app when you push code
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>
                    Every time you push to your connected GitHub branch, AppHostFast will:
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-blue-600 rounded-full" />
                      <span>Clone your repository</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-blue-600 rounded-full" />
                      <span>Install dependencies</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-blue-600 rounded-full" />
                      <span>Build your application</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-blue-600 rounded-full" />
                      <span>Deploy to production</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Required Files</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>
                    Depending on your framework, you may need certain configuration files:
                  </p>
                  <div className="space-y-3">
                    <div className="bg-slate-100 p-3 rounded-lg">
                      <code className="font-mono text-sm text-slate-900">package.json</code>
                      <p className="text-sm text-slate-600 mt-1">Required for Node.js applications</p>
                    </div>
                    <div className="bg-slate-100 p-3 rounded-lg">
                      <code className="font-mono text-sm text-slate-900">composer.json</code>
                      <p className="text-sm text-slate-600 mt-1">Required for PHP applications</p>
                    </div>
                    <div className="bg-slate-100 p-3 rounded-lg">
                      <code className="font-mono text-sm text-slate-900">wp-config.php</code>
                      <p className="text-sm text-slate-600 mt-1">For WordPress installations</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Frameworks */}
            <section id="frameworks">
              <h2 className="text-3xl font-bold text-slate-900 mb-6">Supported Frameworks</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { name: "Node.js", desc: "Express, Next.js, NestJS, and more", icon: "⚙️" },
                  { name: "PHP", desc: "Laravel, WordPress, Symfony, and more", icon: "🐘" },
                  { name: "Python", desc: "Django, Flask, FastAPI, and more", icon: "🐍" },
                  { name: "Ruby", desc: "Rails, Sinatra, and more", icon: "💎" },
                ].map((fw) => (
                  <Card key={fw.name}>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <span className="text-2xl">{fw.icon}</span>
                        {fw.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-slate-600 text-sm">{fw.desc}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* Environment Variables */}
            <section id="environment">
              <h2 className="text-3xl font-bold text-slate-900 mb-6">Environment Variables</h2>

              <Card>
                <CardHeader>
                  <CardTitle>Setting Environment Variables</CardTitle>
                  <CardDescription>
                    Securely manage environment variables for your applications
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>
                    You can set environment variables in your app's settings. These variables will be available to your
                    application at runtime.
                  </p>
                  <div className="bg-slate-900 p-4 rounded-lg text-slate-50 font-mono text-sm overflow-x-auto">
                    <div>DATABASE_URL=postgres://user:pass@host/db</div>
                    <div>API_KEY=your-secret-key</div>
                    <div>NODE_ENV=production</div>
                  </div>
                  <p className="text-sm text-slate-600">
                    <strong>Note:</strong> Be careful not to commit sensitive environment variables to your repository.
                    Use a .env.example file instead.
                  </p>
                </CardContent>
              </Card>
            </section>

            {/* API Reference */}
            <section id="api">
              <h2 className="text-3xl font-bold text-slate-900 mb-6">API Reference</h2>

              <Tabs defaultValue="auth" className="space-y-4">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="auth">Authentication</TabsTrigger>
                  <TabsTrigger value="apps">Apps</TabsTrigger>
                  <TabsTrigger value="deployments">Deployments</TabsTrigger>
                </TabsList>

                <TabsContent value="auth" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">POST /api/auth/signup</CardTitle>
                      <Badge className="w-fit mt-2">POST</Badge>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-slate-600 mb-4">Create a new user account</p>
                      <div className="bg-slate-100 p-3 rounded-lg text-sm font-mono mb-4">
                        <div className="text-slate-600">Request body:</div>
                        <div className="text-slate-900">
                          name, email, password
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">POST /api/auth/login</CardTitle>
                      <Badge className="w-fit mt-2">POST</Badge>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-slate-600">Login to your account</p>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="apps" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">GET /api/apps</CardTitle>
                      <Badge className="w-fit mt-2">GET</Badge>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-slate-600">List all your applications</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">POST /api/apps</CardTitle>
                      <Badge className="w-fit mt-2">POST</Badge>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-slate-600">Create a new application</p>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="deployments" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">GET /api/apps/:appId/deployments</CardTitle>
                      <Badge className="w-fit mt-2">GET</Badge>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-slate-600">Get deployment history for an app</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">POST /api/apps/:appId/deploy</CardTitle>
                      <Badge className="w-fit mt-2">POST</Badge>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-slate-600">Trigger a manual deployment</p>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </section>

            {/* FAQ */}
            <section id="faq">
              <h2 className="text-3xl font-bold text-slate-900 mb-6">Frequently Asked Questions</h2>

              <div className="space-y-4">
                {[
                  {
                    q: "How much does AppHostFast cost?",
                    a: "We offer a free plan to get started, plus affordable paid plans for production apps. See our pricing page for details.",
                  },
                  {
                    q: "Do you provide SSL certificates?",
                    a: "Yes! All applications on AppHostFast come with free SSL certificates. HTTPS is enabled by default.",
                  },
                  {
                    q: "Can I use a custom domain?",
                    a: "Yes, you can connect custom domains to your applications. Point your domain's DNS to our servers and configure it in your app settings.",
                  },
                  {
                    q: "What if my app goes down?",
                    a: "We monitor all applications 24/7 and automatically restart failed instances. You'll receive notifications of any issues.",
                  },
                  {
                    q: "Can I scale my application?",
                    a: "Yes! Our infrastructure automatically scales based on your application's traffic and resource usage.",
                  },
                  {
                    q: "How do I access logs?",
                    a: "Logs are available in your app's dashboard. You can view real-time logs and download historical logs.",
                  },
                ].map((item, idx) => (
                  <Card key={idx}>
                    <CardHeader>
                      <CardTitle className="text-base">{item.q}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-slate-600">{item.a}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          </div>
        </div>
      </main>

      {/* Footer CTA */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 py-12 px-4 sm:px-6 lg:px-8 mt-12">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to get started?</h2>
          <p className="text-blue-100 mb-6">
            Deploy your first app in minutes with AppHostFast
          </p>
          <Link to="/auth/signup">
            <Button className="bg-white text-blue-600 hover:bg-slate-100">
              Get Started for Free
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
