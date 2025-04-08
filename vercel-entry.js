// This file is specifically for Vercel serverless environment
import express from 'express';
import { createServer } from 'http';
import { registerRoutes } from './server/routes.js';
import { serveStatic } from './server/vite.js';
import { syncYouTubeVideos } from './server/youtube-service.js';

// Setup Express app
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Register routes
const server = await registerRoutes(app);

// Serve static files from the build directory
serveStatic(app);

// Sync videos when explicitly requested
if (process.env.SYNC_VIDEOS === 'true') {
  await syncYouTubeVideos();
}

// Export the Express app for serverless use
export default app;