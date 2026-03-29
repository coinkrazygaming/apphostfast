import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Plus,
  MoreVertical,
  Settings,
  LogOut,
  Globe,
  Github,
  ExternalLink,
  Trash2,
  Clock,
  AlertCircle,
  CheckCircle2,
  Rocket,
  User,
} from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface App {
  id: string;
  name: string;
  url: string;
  status: "running" | "building" | "failed";
  framework: string;
  lastDeployed: string;
  deployments: number;
}

export default function Dashboard() {
  const navigate = useNavigate();
  const [apps, setApps] = useState<App[]>([
    {
      id: "1",
      name: "My Blog",
      url: "my-blog.apphostfast.io",
      status: "running",
      framework: "Node.js",
      lastDeployed: "2 hours ago",
      deployments: 12,
    },
    {
      id: "2",
      name: "Portfolio Site",
      url: "portfolio.apphostfast.io",
      status: "running",
      framework: "PHP",
      lastDeployed: "1 day ago",
      deployments: 5,
    },
  ]);
  const [showDeleteDialog, setShowDeleteDialog] = useState<string | null>(null);
  const [user, setUser] = useState({ name: "John Doe", email: "john@example.com" });

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/auth/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const handleDeleteApp = (appId: string) => {
    setApps((prev) => prev.filter((app) => app.id !== appId));
    setShowDeleteDialog(null);
  };

  const getStatusIcon = (status: App["status"]) => {
    switch (status) {
      case "running":
        return <CheckCircle2 className="w-5 h-5 text-green-600" />;
      case "building":
        return <Clock className="w-5 h-5 text-blue-600 animate-spin" />;
      case "failed":
        return <AlertCircle className="w-5 h-5 text-red-600" />;
    }
  };

  const getStatusColor = (status: App["status"]) => {
    switch (status) {
      case "running":
        return "bg-green-100 text-green-800";
      case "building":
        return "bg-blue-100 text-blue-800";
      case "failed":
        return "bg-red-100 text-red-800";
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white">
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

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <User className="w-5 h-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <User className="w-4 h-4 mr-2" />
                  <div>
                    <p className="font-medium">{user.name}</p>
                    <p className="text-sm text-slate-600">{user.email}</p>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <button className="w-full cursor-pointer">
                    <Settings className="w-4 h-4 mr-2" />
                    Account Settings
                  </button>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <button
                    className="w-full cursor-pointer text-red-600"
                    onClick={handleLogout}
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Dashboard</h1>
          <p className="text-slate-600">Manage and deploy your applications</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-slate-600">
                Total Apps
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-slate-900">{apps.length}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-slate-600">
                Running
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-green-600">
                {apps.filter((a) => a.status === "running").length}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-slate-600">
                Total Deployments
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-slate-900">
                {apps.reduce((sum, a) => sum + a.deployments, 0)}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-slate-600">
                Storage Used
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-slate-900">1.2 GB</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Apps List */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="apps" className="space-y-4">
              <div className="flex items-center justify-between">
                <TabsList>
                  <TabsTrigger value="apps">My Apps</TabsTrigger>
                  <TabsTrigger value="activity">Activity</TabsTrigger>
                </TabsList>
                <Button
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  onClick={() => navigate("/deploy")}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  New App
                </Button>
              </div>

              <TabsContent value="apps" className="space-y-4">
                {apps.length === 0 ? (
                  <Card>
                    <CardContent className="pt-12 pb-12 text-center">
                      <Rocket className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-slate-900 mb-2">
                        No apps yet
                      </h3>
                      <p className="text-slate-600 mb-6">
                        Deploy your first application to get started
                      </p>
                      <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                        <Plus className="w-4 h-4 mr-2" />
                        Deploy App
                      </Button>
                    </CardContent>
                  </Card>
                ) : (
                  apps.map((app) => (
                    <Card key={app.id} className="overflow-hidden">
                      <div className="flex items-start justify-between p-6">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-semibold text-slate-900">
                              {app.name}
                            </h3>
                            <Badge className={getStatusColor(app.status)}>
                              <span className="flex items-center gap-1">
                                {getStatusIcon(app.status)}
                                {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                              </span>
                            </Badge>
                          </div>
                          <p className="text-slate-600 mb-4">
                            Framework: <span className="font-medium">{app.framework}</span>
                          </p>
                          <div className="flex flex-wrap gap-6 text-sm">
                            <div className="flex items-center gap-2">
                              <Globe className="w-4 h-4 text-slate-400" />
                              <code className="bg-slate-100 px-2 py-1 rounded font-mono text-slate-700">
                                {app.url}
                              </code>
                            </div>
                            <div className="text-slate-600">
                              Last deployed: {app.lastDeployed}
                            </div>
                            <div className="text-slate-600">
                              {app.deployments} deployment{app.deployments !== 1 ? "s" : ""}
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="icon">
                            <ExternalLink className="w-4 h-4" />
                          </Button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreVertical className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Settings className="w-4 h-4 mr-2" />
                                Settings
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Github className="w-4 h-4 mr-2" />
                                View on GitHub
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="text-red-600"
                                onClick={() => setShowDeleteDialog(app.id)}
                              >
                                <Trash2 className="w-4 h-4 mr-2" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    </Card>
                  ))
                )}
              </TabsContent>

              <TabsContent value="activity" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                    <CardDescription>Your deployment activity over the last 7 days</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[...Array(5)].map((_, i) => (
                        <div key={i} className="flex items-center justify-between pb-4 border-b border-slate-200 last:pb-0 last:border-0">
                          <div>
                            <p className="font-medium text-slate-900">
                              {i === 0 ? "Deployed" : "Updated"} {apps[0]?.name || "App"}
                            </p>
                            <p className="text-sm text-slate-600">
                              {i === 0 ? "2 hours" : `${(i + 1) * 12} hours`} ago
                            </p>
                          </div>
                          <Badge>Successful</Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Quick Links</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="ghost" className="w-full justify-start">
                  <Github className="w-4 h-4 mr-2" />
                  Connect GitHub
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  Documentation
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Storage</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Used</span>
                    <span className="font-medium">1.2 GB / 2 GB</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full"
                      style={{ width: "60%" }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Need Help?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-600 mb-4">
                  Check our documentation or contact support
                </p>
                <Button variant="outline" className="w-full">
                  View Docs
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!showDeleteDialog} onOpenChange={(open) => !open && setShowDeleteDialog(null)}>
        <AlertDialogContent>
          <AlertDialogTitle>Delete App</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete this app? This action cannot be undone.
          </AlertDialogDescription>
          <div className="flex gap-3 justify-end">
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 hover:bg-red-700"
              onClick={() => showDeleteDialog && handleDeleteApp(showDeleteDialog)}
            >
              Delete
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
