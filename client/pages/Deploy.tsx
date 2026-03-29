import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ArrowLeft,
  Github,
  Upload,
  Code2,
  Rocket,
  CheckCircle2,
  ExternalLink,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Deploy() {
  const navigate = useNavigate();
  const [deploymentStep, setDeploymentStep] = useState<
    "select-method" | "configure" | "deploy" | "success"
  >("select-method");
  const [formData, setFormData] = useState({
    appName: "",
    framework: "nodejs",
    repository: "",
    branch: "main",
  });

  const frameworks = [
    { value: "nodejs", label: "Node.js", icon: "⚙️" },
    { value: "php", label: "PHP", icon: "🐘" },
    { value: "python", label: "Python", icon: "🐍" },
    { value: "ruby", label: "Ruby", icon: "💎" },
    { value: "wordpress", label: "WordPress", icon: "📰" },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDeploy = async () => {
    if (!formData.appName || !formData.repository) {
      alert("Please fill in all required fields");
      return;
    }

    // Simulate deployment
    setDeploymentStep("deploy");
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setDeploymentStep("success");
  };

  if (deploymentStep === "success") {
    return (
      <div className="min-h-screen bg-slate-50">
        <header className="sticky top-0 z-40 border-b border-slate-200 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-center h-16">
              <Button variant="ghost" onClick={() => navigate("/dashboard")}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
            </div>
          </div>
        </header>

        <main className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8 text-green-600" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">
              Deployment Successful!
            </h1>
            <p className="text-slate-600 mb-8">
              Your app has been deployed and is now live
            </p>

            <Card className="border-slate-200 mb-8">
              <CardHeader>
                <CardTitle>{formData.appName}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-slate-50 p-4 rounded-lg">
                  <p className="text-sm text-slate-600 mb-2">Live URL</p>
                  <div className="flex items-center justify-between">
                    <code className="font-mono text-slate-900">
                      {formData.appName.toLowerCase().replace(/\s+/g, "-")}.apphostfast.io
                    </code>
                    <Button variant="ghost" size="icon">
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-slate-600">Framework</p>
                    <p className="font-medium text-slate-900">
                      {frameworks.find((f) => f.value === formData.framework)?.label}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600">Repository</p>
                    <p className="font-medium text-slate-900">{formData.repository}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => navigate("/dashboard")}
              >
                View Dashboard
              </Button>
              <Button className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                <ExternalLink className="w-4 h-4 mr-2" />
                Visit App
              </Button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (deploymentStep === "deploy") {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 mb-4 animate-spin">
            <Rocket className="w-6 h-6 text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Deploying Your App</h2>
          <p className="text-slate-600 mb-6">
            Please wait while we build and deploy your application...
          </p>

          <div className="space-y-3 text-left">
            <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-slate-200">
              <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
              <span className="text-slate-700">Building application</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-slate-200">
              <div className="w-5 h-5 rounded-full border-2 border-transparent border-t-blue-600 animate-spin" />
              <span className="text-slate-700">Deploying to servers</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-slate-200">
              <div className="w-5 h-5 rounded-full bg-slate-200" />
              <span className="text-slate-500">Setting up domain</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <Button variant="ghost" onClick={() => navigate("/dashboard")}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Deploy New App</h1>
          <p className="text-slate-600">Choose how you'd like to deploy your application</p>
        </div>

        {deploymentStep === "select-method" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card
              className="cursor-pointer border-2 border-slate-200 hover:border-blue-600 transition-colors"
              onClick={() => setDeploymentStep("configure")}
            >
              <CardHeader>
                <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center mb-4">
                  <Github className="w-6 h-6 text-slate-700" />
                </div>
                <CardTitle>Import from GitHub</CardTitle>
                <CardDescription>
                  Connect your GitHub repository for automatic deployments
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-600 mb-4">
                  Push code changes to trigger automatic builds and deployments
                </p>
                <Badge variant="outline">Recommended</Badge>
              </CardContent>
            </Card>

            <Card className="cursor-pointer border-2 border-slate-200 hover:border-blue-600 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center mb-4">
                  <Upload className="w-6 h-6 text-slate-700" />
                </div>
                <CardTitle>Upload Files</CardTitle>
                <CardDescription>
                  Drag and drop or upload your project files directly
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-600 mb-4">
                  No git repository required. Deploy from your local machine
                </p>
              </CardContent>
            </Card>
          </div>
        )}

        {deploymentStep === "configure" && (
          <div className="space-y-8">
            <Tabs defaultValue="app-info" className="space-y-4">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="app-info">App Info</TabsTrigger>
                <TabsTrigger value="repository">Repository</TabsTrigger>
                <TabsTrigger value="review">Review</TabsTrigger>
              </TabsList>

              <TabsContent value="app-info">
                <Card>
                  <CardHeader>
                    <CardTitle>Application Details</CardTitle>
                    <CardDescription>Configure your app name and framework</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="appName">App Name *</Label>
                      <Input
                        id="appName"
                        name="appName"
                        placeholder="My Awesome App"
                        value={formData.appName}
                        onChange={handleInputChange}
                      />
                      <p className="text-xs text-slate-500">
                        Your app will be accessible at{" "}
                        <code className="bg-slate-100 px-1 py-0.5 rounded">
                          {formData.appName.toLowerCase().replace(/\s+/g, "-")}.apphostfast.io
                        </code>
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="framework">Framework *</Label>
                      <Select value={formData.framework} onValueChange={(value) => 
                        setFormData(prev => ({ ...prev, framework: value }))
                      }>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {frameworks.map((fw) => (
                            <SelectItem key={fw.value} value={fw.value}>
                              {fw.icon} {fw.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <Button
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                      onClick={() => setDeploymentStep("configure")}
                    >
                      Continue to Repository
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="repository">
                <Card>
                  <CardHeader>
                    <CardTitle>Repository Details</CardTitle>
                    <CardDescription>
                      Configure your GitHub repository and branch
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="repository">Repository URL *</Label>
                      <Input
                        id="repository"
                        name="repository"
                        placeholder="username/repository"
                        value={formData.repository}
                        onChange={handleInputChange}
                      />
                      <p className="text-xs text-slate-500">
                        Format: username/repository
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="branch">Branch</Label>
                      <Input
                        id="branch"
                        name="branch"
                        placeholder="main"
                        value={formData.branch}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <p className="text-sm text-blue-900">
                        <strong>Tip:</strong> We'll automatically deploy your app when you push to this branch
                      </p>
                    </div>

                    <Button
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                      onClick={() => setDeploymentStep("configure")}
                    >
                      Review Configuration
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="review">
                <Card>
                  <CardHeader>
                    <CardTitle>Review Your Configuration</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="border-b border-slate-200 pb-4">
                        <p className="text-sm text-slate-600">App Name</p>
                        <p className="text-lg font-semibold text-slate-900">
                          {formData.appName || "Not specified"}
                        </p>
                      </div>

                      <div className="border-b border-slate-200 pb-4">
                        <p className="text-sm text-slate-600">Framework</p>
                        <p className="text-lg font-semibold text-slate-900">
                          {frameworks.find((f) => f.value === formData.framework)?.label}
                        </p>
                      </div>

                      <div className="border-b border-slate-200 pb-4">
                        <p className="text-sm text-slate-600">Repository</p>
                        <p className="text-lg font-semibold text-slate-900">
                          {formData.repository || "Not specified"}
                        </p>
                      </div>

                      <div>
                        <p className="text-sm text-slate-600">Branch</p>
                        <p className="text-lg font-semibold text-slate-900">
                          {formData.branch}
                        </p>
                      </div>
                    </div>

                    <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                      <p className="text-sm text-slate-700">
                        Your app will be deployed at:
                      </p>
                      <code className="text-lg font-semibold text-slate-900">
                        {formData.appName.toLowerCase().replace(/\s+/g, "-")}.apphostfast.io
                      </code>
                    </div>

                    <Button
                      className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                      onClick={handleDeploy}
                    >
                      <Rocket className="w-4 h-4 mr-2" />
                      Deploy Now
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        )}
      </main>
    </div>
  );
}
