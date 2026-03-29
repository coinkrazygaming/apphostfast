import path from "path";
import { createServer } from "./index";
import { initializeDatabase, closeDatabase } from "./db/client";
import * as express from "express";

async function startServer() {
  try {
    // Initialize database
    await initializeDatabase();
    console.log("✅ Database initialized");

    const app = createServer();
    const port = process.env.PORT || 3000;

    // In production, serve the built SPA files
    const __dirname = import.meta.dirname;
    const distPath = path.join(__dirname, "../spa");

    // Serve static files
    app.use(express.static(distPath));

    // Handle React Router - serve index.html for all non-API routes
    app.get("*", (req, res) => {
      // Don't serve index.html for API routes
      if (req.path.startsWith("/api/") || req.path.startsWith("/health")) {
        return res.status(404).json({ error: "API endpoint not found" });
      }

      res.sendFile(path.join(distPath, "index.html"));
    });

    app.listen(port, () => {
      console.log(`🚀 Fusion Starter server running on port ${port}`);
      console.log(`📱 Frontend: http://localhost:${port}`);
      console.log(`🔧 API: http://localhost:${port}/api`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

startServer();

// Graceful shutdown
async function gracefulShutdown(signal: string) {
  console.log(`🛑 Received ${signal}, shutting down gracefully`);
  try {
    await closeDatabase();
    console.log("✅ Database connection closed");
    process.exit(0);
  } catch (error) {
    console.error("Error during shutdown:", error);
    process.exit(1);
  }
}

process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
process.on("SIGINT", () => gracefulShutdown("SIGINT"));
