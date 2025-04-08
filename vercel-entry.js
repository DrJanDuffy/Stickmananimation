// This file is specifically for Vercel serverless environment
const express = require('express');
const { registerRoutes } = require('./dist/server/routes');
const { serveStatic } = require('./dist/server/vite');
const { syncYouTubeVideos } = require('./dist/server/youtube-service');

// Create a serverless handler
const handler = async (req, res) => {
  // Setup Express app if it doesn't exist
  if (!handler.app) {
    const app = express();
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    
    // Register routes
    await registerRoutes(app);
    
    // Serve static files from the build directory
    serveStatic(app);
    
    handler.app = app;
    
    // Sync videos when explicitly requested (only once)
    if (process.env.SYNC_VIDEOS === 'true' && !handler.synced) {
      try {
        await syncYouTubeVideos();
        handler.synced = true;
      } catch (err) {
        console.error("Error syncing YouTube videos:", err);
      }
    }
  }
  
  // Process the request
  return handler.app(req, res);
};

// Initialize properties
handler.app = null;
handler.synced = false;

// Export the handler for serverless use
module.exports = handler;