import { RequestHandler } from "express";
import { query } from "../db/client";

export const handleGetApps: RequestHandler = async (req, res) => {
  try {
    const result = await query("SELECT * FROM apps ORDER BY created_at DESC");
    res.json({ apps: result.rows });
  } catch (error) {
    console.error("Get apps error:", error);
    res.status(500).json({ message: "Failed to fetch apps" });
  }
};

export const handleCreateApp: RequestHandler = async (req, res) => {
  const { name, framework, repository, branch } = req.body;

  // Validation
  if (!name || !framework || !repository) {
    res.status(400).json({ message: "Missing required fields" });
    return;
  }

  try {
    const appId = `app_${Date.now()}`;
    const url = `${name.toLowerCase().replace(/\s+/g, "-")}.apphostfast.io`;

    await query(
      `INSERT INTO apps (app_id, user_id, name, framework, repository, branch, url, status, deployments)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
      [appId, "default-user", name, framework, repository, branch || "main", url, "building", 0]
    );

    const newApp = {
      app_id: appId,
      name,
      framework,
      repository,
      branch: branch || "main",
      url,
      status: "building",
      deployments: 0,
    };

    res.status(201).json({
      message: "App created successfully",
      app: newApp,
    });
  } catch (error) {
    console.error("Create app error:", error);
    res.status(500).json({ message: "Failed to create app" });
  }
};

export const handleGetApp: RequestHandler = async (req, res) => {
  const { appId } = req.params;

  try {
    const result = await query("SELECT * FROM apps WHERE app_id = $1", [appId]);

    if (result.rows.length === 0) {
      res.status(404).json({ message: "App not found" });
      return;
    }

    res.json({ app: result.rows[0] });
  } catch (error) {
    console.error("Get app error:", error);
    res.status(500).json({ message: "Failed to fetch app" });
  }
};

export const handleUpdateApp: RequestHandler = async (req, res) => {
  const { appId } = req.params;
  const updates = req.body;

  try {
    // Check if app exists
    const appResult = await query("SELECT * FROM apps WHERE app_id = $1", [appId]);
    if (appResult.rows.length === 0) {
      res.status(404).json({ message: "App not found" });
      return;
    }

    // Build update query dynamically
    const columns = Object.keys(updates);
    const values = Object.values(updates);
    const setClause = columns.map((col, idx) => `${col} = $${idx + 1}`).join(", ");

    const result = await query(
      `UPDATE apps SET ${setClause}, created_at = created_at WHERE app_id = $${columns.length + 1} RETURNING *`,
      [...values, appId]
    );

    res.json({
      message: "App updated successfully",
      app: result.rows[0],
    });
  } catch (error) {
    console.error("Update app error:", error);
    res.status(500).json({ message: "Failed to update app" });
  }
};

export const handleDeleteApp: RequestHandler = async (req, res) => {
  const { appId } = req.params;

  try {
    const result = await query("DELETE FROM apps WHERE app_id = $1 RETURNING *", [appId]);

    if (result.rows.length === 0) {
      res.status(404).json({ message: "App not found" });
      return;
    }

    res.json({ message: "App deleted successfully" });
  } catch (error) {
    console.error("Delete app error:", error);
    res.status(500).json({ message: "Failed to delete app" });
  }
};

export const handleGetDeployments: RequestHandler = async (req, res) => {
  const { appId } = req.params;

  try {
    // Check if app exists
    const appResult = await query("SELECT * FROM apps WHERE app_id = $1", [appId]);
    if (appResult.rows.length === 0) {
      res.status(404).json({ message: "App not found" });
      return;
    }

    const result = await query(
      "SELECT * FROM deployments WHERE app_id = $1 ORDER BY created_at DESC",
      [appId]
    );

    res.json({ deployments: result.rows });
  } catch (error) {
    console.error("Get deployments error:", error);
    res.status(500).json({ message: "Failed to fetch deployments" });
  }
};

export const handleTriggerDeploy: RequestHandler = async (req, res) => {
  const { appId } = req.params;

  try {
    // Check if app exists
    const appResult = await query("SELECT * FROM apps WHERE app_id = $1", [appId]);
    if (appResult.rows.length === 0) {
      res.status(404).json({ message: "App not found" });
      return;
    }

    // Create deployment record
    const deployId = `deploy_${Date.now()}`;
    await query(
      `INSERT INTO deployments (deploy_id, app_id, status, commit, message)
       VALUES ($1, $2, $3, $4, $5)`,
      [deployId, appId, "building", null, "Manual deployment triggered"]
    );

    // Update app status and increment deployments
    const updateResult = await query(
      `UPDATE apps SET status = $1, deployments = deployments + 1
       WHERE app_id = $2 RETURNING *`,
      ["building", appId]
    );

    res.json({
      message: "Deployment triggered",
      app: updateResult.rows[0],
    });
  } catch (error) {
    console.error("Trigger deploy error:", error);
    res.status(500).json({ message: "Failed to trigger deployment" });
  }
};
