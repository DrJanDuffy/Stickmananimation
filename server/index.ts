import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import { syncYouTubeVideos } from "./youtube-service";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

(async () => {
  const server = await registerRoutes(app);

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({ message });
    throw err;
  });

  // importantly only setup vite in development and after
  // setting up all the other routes so the catch-all route
  // doesn't interfere with the other routes
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  // Use the port provided by Vercel or fallback to 5000
  const port = process.env.PORT || 5000;
  
  // Check if we're in a serverless environment like Vercel
  const isServerless = process.env.VERCEL === '1';
  
  if (!isServerless) {
    // In regular environment, start the server
    server.listen({
      port: Number(port),
      host: "0.0.0.0",
    })
    .on('listening', () => {
      log(`Server successfully started on port ${port}`);
      
      // Sync YouTube videos with our database
      syncYouTubeVideos().catch(err => {
        console.error("Failed to sync YouTube videos:", err);
      });
    })
    .on('error', (err: any) => {
      log(`Error starting server: ${err.message}`);
      throw err;
    });
  } else {
    // In serverless environment, we don't need to listen on a port
    log(`Running in serverless mode`);
    
    // Still sync videos if needed, but with a check to avoid excessive API calls
    if (process.env.SYNC_VIDEOS === 'true') {
      syncYouTubeVideos().catch(err => {
        console.error("Failed to sync YouTube videos:", err);
      });
    }
  }
})();
