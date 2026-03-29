import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import { handleSignup, handleLogin, handleGetProfile } from "./routes/auth";
import {
  handleGetApps,
  handleCreateApp,
  handleGetApp,
  handleUpdateApp,
  handleDeleteApp,
  handleGetDeployments,
  handleTriggerDeploy,
} from "./routes/apps";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);

  // Authentication routes
  app.post("/api/auth/signup", handleSignup);
  app.post("/api/auth/login", handleLogin);
  app.get("/api/auth/profile", handleGetProfile);

  // App management routes
  app.get("/api/apps", handleGetApps);
  app.post("/api/apps", handleCreateApp);
  app.get("/api/apps/:appId", handleGetApp);
  app.patch("/api/apps/:appId", handleUpdateApp);
  app.delete("/api/apps/:appId", handleDeleteApp);
  app.get("/api/apps/:appId/deployments", handleGetDeployments);
  app.post("/api/apps/:appId/deploy", handleTriggerDeploy);

  return app;
}
