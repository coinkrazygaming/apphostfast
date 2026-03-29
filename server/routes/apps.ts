import { RequestHandler } from "express";

// In-memory app storage (in production, use a database)
const apps: Map<string, any> = new Map();

export const handleGetApps: RequestHandler = (req, res) => {
  // In a real app, you would get the userId from the JWT token
  // and filter apps by that user
  const appList = Array.from(apps.values());
  res.json({ apps: appList });
};

export const handleCreateApp: RequestHandler = (req, res) => {
  const { name, framework, repository, branch } = req.body;

  // Validation
  if (!name || !framework || !repository) {
    res.status(400).json({ message: "Missing required fields" });
    return;
  }

  // Create app
  const appId = `app_${Date.now()}`;
  const newApp = {
    id: appId,
    name,
    framework,
    repository,
    branch: branch || "main",
    url: `${name.toLowerCase().replace(/\s+/g, "-")}.apphostfast.io`,
    status: "building",
    createdAt: new Date().toISOString(),
    deployments: 0,
  };

  apps.set(appId, newApp);

  res.status(201).json({
    message: "App created successfully",
    app: newApp,
  });
};

export const handleGetApp: RequestHandler = (req, res) => {
  const { appId } = req.params;

  const app = apps.get(appId);
  if (!app) {
    res.status(404).json({ message: "App not found" });
    return;
  }

  res.json({ app });
};

export const handleUpdateApp: RequestHandler = (req, res) => {
  const { appId } = req.params;
  const updates = req.body;

  const app = apps.get(appId);
  if (!app) {
    res.status(404).json({ message: "App not found" });
    return;
  }

  // Update app
  const updatedApp = { ...app, ...updates };
  apps.set(appId, updatedApp);

  res.json({
    message: "App updated successfully",
    app: updatedApp,
  });
};

export const handleDeleteApp: RequestHandler = (req, res) => {
  const { appId } = req.params;

  if (!apps.has(appId)) {
    res.status(404).json({ message: "App not found" });
    return;
  }

  apps.delete(appId);
  res.json({ message: "App deleted successfully" });
};

export const handleGetDeployments: RequestHandler = (req, res) => {
  const { appId } = req.params;

  const app = apps.get(appId);
  if (!app) {
    res.status(404).json({ message: "App not found" });
    return;
  }

  // Return mock deployments
  const deployments = [
    {
      id: `deploy_1`,
      status: "success",
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      commit: "a1b2c3d",
      message: "Initial deployment",
    },
    {
      id: `deploy_2`,
      status: "success",
      createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      commit: "e4f5g6h",
      message: "Feature update",
    },
  ];

  res.json({ deployments });
};

export const handleTriggerDeploy: RequestHandler = (req, res) => {
  const { appId } = req.params;

  const app = apps.get(appId);
  if (!app) {
    res.status(404).json({ message: "App not found" });
    return;
  }

  // Update app status to building
  const updatedApp = { ...app, status: "building", deployments: app.deployments + 1 };
  apps.set(appId, updatedApp);

  res.json({
    message: "Deployment triggered",
    app: updatedApp,
  });
};
