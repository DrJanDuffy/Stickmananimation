import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertSubscriberSchema } from "@shared/schema";
import { z } from "zod";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  // API Routes - Videos
  
  // Get showreel video
  app.get("/api/videos/showreel", async (_req: Request, res: Response) => {
    try {
      const showreel = await storage.getShowreel();
      
      if (!showreel) {
        return res.status(404).json({ message: "Showreel not found" });
      }
      
      res.json({ videoId: showreel.videoId });
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch showreel" });
    }
  });
  
  // Get featured videos
  app.get("/api/videos/featured", async (_req: Request, res: Response) => {
    try {
      const featuredVideos = await storage.getFeaturedVideos();
      res.json(featuredVideos);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch featured videos" });
    }
  });
  
  // Get all videos
  app.get("/api/videos/all", async (_req: Request, res: Response) => {
    try {
      const allVideos = await storage.getAllVideos();
      res.json(allVideos);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch all videos" });
    }
  });
  
  // Get videos by category
  app.get("/api/videos/category/:category", async (req: Request, res: Response) => {
    try {
      const category = req.params.category;
      const videos = await storage.getVideosByCategory(category);
      res.json(videos);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch videos by category" });
    }
  });
  
  // Get video by ID
  app.get("/api/videos/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid video ID" });
      }
      
      const video = await storage.getVideoById(id);
      
      if (!video) {
        return res.status(404).json({ message: "Video not found" });
      }
      
      res.json(video);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch video" });
    }
  });
  
  // Newsletter subscription
  app.post("/api/newsletter/subscribe", async (req: Request, res: Response) => {
    try {
      // Validate request body
      const validatedData = insertSubscriberSchema.safeParse(req.body);
      
      if (!validatedData.success) {
        const validationError = fromZodError(validatedData.error);
        return res.status(400).json({ message: validationError.message });
      }
      
      // Check if subscriber already exists
      const existingSubscriber = await storage.getSubscriberByEmail(validatedData.data.email);
      
      if (existingSubscriber) {
        return res.status(409).json({ message: "Email already subscribed" });
      }
      
      // Create subscriber
      const newSubscriber = await storage.createSubscriber({
        name: validatedData.data.name,
        email: validatedData.data.email,
        consentGiven: validatedData.data.consentGiven ?? true,
      });
      
      res.status(201).json(newSubscriber);
    } catch (error) {
      res.status(500).json({ message: "Failed to subscribe to newsletter" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
