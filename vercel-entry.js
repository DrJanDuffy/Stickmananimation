// Self-contained serverless handler for Vercel
const express = require('express');
const path = require('path');
const fs = require('fs');
const { drizzle } = require('drizzle-orm/neon-serverless');
const { neon } = require('@neondatabase/serverless');

// Check environment variables on startup
if (!process.env.DATABASE_URL) {
  console.error("DATABASE_URL environment variable is not set. Please set it in your Vercel project settings.");
}

if (!process.env.YOUTUBE_API_KEY) {
  console.error("YOUTUBE_API_KEY environment variable is not set. Please set it in your Vercel project settings.");
}

// Create a serverless handler
const handler = async (req, res) => {
  // Setup Express app if it doesn't exist
  if (!handler.app) {
    console.log('Initializing serverless Express app...');
    const app = express();
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    
    // Initialize database client
    let sql, db;
    try {
      if (!process.env.DATABASE_URL) {
        throw new Error("DATABASE_URL environment variable is not set");
      }
      
      console.log("Initializing database connection...");
      sql = neon(process.env.DATABASE_URL);
      db = drizzle(sql);
      console.log("Database connection established successfully");
    } catch (error) {
      console.error("Failed to initialize database:", error instanceof Error ? error.message : String(error));
      
      // Setup a simple handler for all routes that returns an error if DB connection failed
      app.all('*', (req, res) => {
        res.status(500).json({
          error: "Database connection failed",
          message: "The application cannot connect to the database. Please check the environment variables and try again."
        });
      });
      
      handler.app = app;
      return;
    }
    
    // API Routes
    app.get('/api/videos/showreel', async (req, res) => {
      try {
        const query = `SELECT * FROM videos WHERE showreel = true ORDER BY published_at DESC LIMIT 1`;
        const showreel = await sql`${query}`.then(rows => rows[0]);
        
        if (!showreel) {
          return res.status(404).json({ message: "Showreel not found" });
        }
        
        res.json({ videoId: showreel.video_id });
      } catch (error) {
        console.error("Error fetching showreel:", error);
        res.status(500).json({ message: "Failed to fetch showreel" });
      }
    });
    
    app.get('/api/videos/featured', async (req, res) => {
      try {
        const query = `SELECT * FROM videos WHERE featured = true ORDER BY published_at DESC LIMIT 6`;
        const featuredVideos = await sql`${query}`;
        
        // Map DB column names to camelCase for frontend consistency
        const mappedVideos = featuredVideos.map(video => ({
          id: video.id,
          videoId: video.video_id,
          title: video.title, 
          description: video.description,
          thumbnailUrl: video.thumbnail_url,
          category: video.category,
          duration: video.duration,
          viewCount: video.view_count,
          featured: video.featured,
          showreel: video.showreel,
          publishedAt: video.published_at
        }));
        
        res.json(mappedVideos);
      } catch (error) {
        console.error("Error fetching featured videos:", error);
        res.status(500).json({ message: "Failed to fetch featured videos" });
      }
    });
    
    app.get('/api/videos/all', async (req, res) => {
      try {
        const query = `SELECT * FROM videos ORDER BY published_at DESC`;
        const allVideos = await sql`${query}`;
        
        // Map DB column names to camelCase for frontend consistency
        const mappedVideos = allVideos.map(video => ({
          id: video.id,
          videoId: video.video_id,
          title: video.title, 
          description: video.description,
          thumbnailUrl: video.thumbnail_url,
          category: video.category,
          duration: video.duration,
          viewCount: video.view_count,
          featured: video.featured,
          showreel: video.showreel,
          publishedAt: video.published_at
        }));
        
        res.json(mappedVideos);
      } catch (error) {
        console.error("Error fetching all videos:", error);
        res.status(500).json({ message: "Failed to fetch all videos" });
      }
    });
    
    app.get('/api/videos/category/:category', async (req, res) => {
      try {
        const category = req.params.category;
        const query = `SELECT * FROM videos WHERE category = $1 ORDER BY published_at DESC`;
        const categoryVideos = await sql`${query}`.params([category]);
        
        // Map DB column names to camelCase for frontend consistency
        const mappedVideos = categoryVideos.map(video => ({
          id: video.id,
          videoId: video.video_id,
          title: video.title, 
          description: video.description,
          thumbnailUrl: video.thumbnail_url,
          category: video.category,
          duration: video.duration,
          viewCount: video.view_count,
          featured: video.featured,
          showreel: video.showreel,
          publishedAt: video.published_at
        }));
        
        res.json(mappedVideos);
      } catch (error) {
        console.error("Error fetching videos by category:", error);
        res.status(500).json({ message: "Failed to fetch videos by category" });
      }
    });
    
    app.get('/api/videos/longest', async (req, res) => {
      try {
        // Find the video with the longest duration (assuming format is HH:MM:SS or MM:SS)
        const query = `
          SELECT * FROM videos 
          ORDER BY 
            CASE 
              WHEN duration LIKE '%:%:%' THEN 
                (CAST(SPLIT_PART(duration, ':', 1) AS INTEGER) * 3600) + 
                (CAST(SPLIT_PART(duration, ':', 2) AS INTEGER) * 60) + 
                CAST(SPLIT_PART(duration, ':', 3) AS INTEGER)
              ELSE 
                (CAST(SPLIT_PART(duration, ':', 1) AS INTEGER) * 60) + 
                CAST(SPLIT_PART(duration, ':', 2) AS INTEGER)
            END DESC
          LIMIT 1
        `;
        
        const longestVideo = await sql`${query}`.then(rows => rows[0]);
        
        if (!longestVideo) {
          return res.status(404).json({ message: "No videos found" });
        }
        
        // Map DB column names to camelCase for frontend consistency
        const mappedVideo = {
          id: longestVideo.id,
          videoId: longestVideo.video_id,
          title: longestVideo.title, 
          description: longestVideo.description,
          thumbnailUrl: longestVideo.thumbnail_url,
          category: longestVideo.category,
          duration: longestVideo.duration,
          viewCount: longestVideo.view_count,
          featured: longestVideo.featured,
          showreel: longestVideo.showreel,
          publishedAt: longestVideo.published_at
        };
        
        res.json(mappedVideo);
      } catch (error) {
        console.error("Error fetching longest video:", error);
        res.status(500).json({ message: "Failed to fetch longest video" });
      }
    });
    
    app.post('/api/newsletter/subscribe', async (req, res) => {
      try {
        const { name, email } = req.body;
        
        if (!name || !email) {
          return res.status(400).json({ message: "Name and email are required" });
        }
        
        // Check if email is valid
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
          return res.status(400).json({ message: "Invalid email address" });
        }
        
        // Check if subscriber already exists
        const checkQuery = `SELECT * FROM subscribers WHERE email = $1`;
        const existingSubscriber = await sql`${checkQuery}`.params([email]).then(rows => rows[0]);
        
        if (existingSubscriber) {
          return res.status(409).json({ message: "Email already subscribed" });
        }
        
        // Create new subscriber
        const insertQuery = `INSERT INTO subscribers (name, email, consent_given) VALUES ($1, $2, true) RETURNING *`;
        const newSubscriber = await sql`${insertQuery}`.params([name, email]).then(rows => rows[0]);
        
        res.status(201).json({
          id: newSubscriber.id,
          name: newSubscriber.name,
          email: newSubscriber.email,
          consentGiven: newSubscriber.consent_given,
          createdAt: newSubscriber.created_at
        });
      } catch (error) {
        console.error("Error subscribing to newsletter:", error);
        res.status(500).json({ message: "Failed to subscribe to newsletter" });
      }
    });
    
    // Serve static files for non-API routes
    app.use(express.static(path.join(process.cwd(), 'dist')));
    
    // Catch-all route for SPA
    app.get('*', (req, res) => {
      try {
        // Skip API routes
        if (req.url.startsWith('/api/')) {
          return res.status(404).json({ message: "API endpoint not found" });
        }
        
        // Serve the index.html for client-side routing
        const indexPath = path.join(process.cwd(), 'dist', 'index.html');
        if (fs.existsSync(indexPath)) {
          return res.sendFile(indexPath);
        } else {
          return res.status(404).send("Application not built. Please run 'npm run build' first.");
        }
      } catch (error) {
        console.error("Error serving static content:", error);
        res.status(500).send("Server error");
      }
    });
    
    // Error handling middleware
    app.use((err, req, res, next) => {
      console.error("Server error:", err);
      res.status(500).json({ 
        message: "Internal server error", 
        error: process.env.NODE_ENV === 'production' ? undefined : err.message 
      });
    });
    
    handler.app = app;
    console.log('Serverless Express app initialized successfully');
  }
  
  // Process the request
  return handler.app(req, res);
};

// Initialize properties
handler.app = null;

// Export the handler for serverless use
module.exports = handler;