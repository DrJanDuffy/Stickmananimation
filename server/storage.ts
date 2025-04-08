import { users, subscribers, videos, type User, type InsertUser, type Subscriber, type InsertSubscriber, type Video, type InsertVideo } from "@shared/schema";
import { db } from "./db";
import { eq, desc } from "drizzle-orm";

// Interface for the storage methods
export interface IStorage {
  // User methods (keeping for backwards compatibility)
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Newsletter Subscriber methods
  getSubscriberByEmail(email: string): Promise<Subscriber | undefined>;
  createSubscriber(subscriber: InsertSubscriber): Promise<Subscriber>;
  getAllSubscribers(): Promise<Subscriber[]>;
  
  // YouTube Video methods
  getShowreel(): Promise<Video | undefined>;
  getFeaturedVideos(): Promise<Video[]>;
  getAllVideos(): Promise<Video[]>;
  getVideosByCategory(category: string): Promise<Video[]>;
  getVideoById(id: number): Promise<Video | undefined>;
  getVideoByYouTubeId(videoId: string): Promise<Video | undefined>;
  createVideo(video: InsertVideo): Promise<Video>;
  updateVideo(id: number, video: Partial<InsertVideo>): Promise<Video | undefined>;
}

export class DatabaseStorage implements IStorage {
  // User methods
  async getUser(id: number): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.id, id));
    return result[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.username, username));
    return result[0];
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const result = await db.insert(users).values(insertUser).returning();
    return result[0];
  }
  
  // Newsletter Subscriber methods
  async getSubscriberByEmail(email: string): Promise<Subscriber | undefined> {
    const result = await db.select().from(subscribers).where(eq(subscribers.email, email));
    return result[0];
  }
  
  async createSubscriber(insertSubscriber: InsertSubscriber): Promise<Subscriber> {
    const result = await db.insert(subscribers).values({
      ...insertSubscriber,
      createdAt: new Date()
    }).returning();
    return result[0];
  }
  
  async getAllSubscribers(): Promise<Subscriber[]> {
    return await db.select().from(subscribers).orderBy(desc(subscribers.createdAt));
  }
  
  // YouTube Video methods
  async getShowreel(): Promise<Video | undefined> {
    // Try to find a video marked as showreel
    const showreelResult = await db.select()
      .from(videos)
      .where(eq(videos.showreel, true))
      .limit(1);
    
    if (showreelResult.length > 0) {
      return showreelResult[0];
    }
    
    // If no showreel is set, return the first featured video
    const featuredResult = await db.select()
      .from(videos)
      .where(eq(videos.featured, true))
      .limit(1);
    
    if (featuredResult.length > 0) {
      return featuredResult[0];
    }
    
    // Fallback to any video
    const anyResult = await db.select().from(videos).limit(1);
    return anyResult[0];
  }
  
  async getFeaturedVideos(): Promise<Video[]> {
    return await db.select()
      .from(videos)
      .where(eq(videos.featured, true))
      .orderBy(desc(videos.publishedAt));
  }
  
  async getAllVideos(): Promise<Video[]> {
    return await db.select()
      .from(videos)
      .orderBy(desc(videos.publishedAt));
  }
  
  async getVideosByCategory(category: string): Promise<Video[]> {
    if (category === "All") {
      return this.getAllVideos();
    }
    
    return await db.select()
      .from(videos)
      .where(eq(videos.category, category))
      .orderBy(desc(videos.publishedAt));
  }
  
  async getVideoById(id: number): Promise<Video | undefined> {
    const result = await db.select().from(videos).where(eq(videos.id, id));
    return result[0];
  }
  
  async getVideoByYouTubeId(videoId: string): Promise<Video | undefined> {
    const result = await db.select().from(videos).where(eq(videos.videoId, videoId));
    return result[0];
  }
  
  async createVideo(insertVideo: InsertVideo): Promise<Video> {
    const result = await db.insert(videos).values(insertVideo).returning();
    return result[0];
  }
  
  async updateVideo(id: number, videoUpdate: Partial<InsertVideo>): Promise<Video | undefined> {
    const result = await db.update(videos)
      .set(videoUpdate)
      .where(eq(videos.id, id))
      .returning();
    
    return result[0];
  }
  
  // Helper method to initialize the database with sample videos if needed
  async initializeSampleVideos(): Promise<void> {
    // Check if we already have videos
    const existingVideos = await db.select().from(videos);
    if (existingVideos.length > 0) {
      console.log("Database already contains videos, skipping initialization");
      return;
    }
    
    console.log("Initializing database with sample videos");
    
    // Sample videos data
    const sampleVideos: InsertVideo[] = [
      {
        videoId: "dQw4w9WgXcQ", // Sample YouTube video
        title: "Character Animation Reel",
        description: "A showcase of expressive character animations across different styles",
        thumbnailUrl: "https://images.unsplash.com/photo-1550745165-9bc0b252726f",
        category: "Character",
        duration: "3:24",
        featured: true,
        showreel: true,
        publishedAt: new Date("2023-01-15"),
      },
      {
        videoId: "UZKVt_RSU4M", // Sample YouTube video
        title: "Abstract Motion Graphics",
        description: "Experimental animation exploring shape, color and movement",
        thumbnailUrl: "https://images.unsplash.com/photo-1536440136628-849c177e76a1",
        category: "Motion Graphics",
        duration: "2:15",
        featured: true,
        showreel: false,
        publishedAt: new Date("2023-02-20"),
      },
      {
        videoId: "tPEE9ZwTmy0", // Sample YouTube video
        title: "Short Film: \"Connections\"",
        description: "An award-winning animated short about human relationships",
        thumbnailUrl: "https://images.unsplash.com/photo-1516035071284-94981165aca1",
        category: "Short Films",
        duration: "4:52",
        featured: true,
        showreel: false,
        publishedAt: new Date("2023-03-10"),
      },
      {
        videoId: "NpEaa2P7qZI", // Sample YouTube video
        title: "Character Design Animation",
        description: "Creating and animating unique character designs",
        thumbnailUrl: "https://images.unsplash.com/photo-1551269901-5c5e14c25df7",
        category: "Character",
        duration: "1:45",
        featured: false,
        showreel: false,
        publishedAt: new Date("2023-04-05"),
      },
      {
        videoId: "YE7VzlLtp-4", // Sample YouTube video
        title: "Logo Animation - Client Project",
        description: "Professional logo animation for a tech company",
        thumbnailUrl: "https://images.unsplash.com/photo-1642957565850-617bc5155673",
        category: "Commercial",
        duration: "0:30",
        featured: false,
        showreel: false,
        publishedAt: new Date("2023-05-12"),
      },
      {
        videoId: "dKrS1RCsmbI", // Sample YouTube video
        title: "Fluid Simulation Experiment",
        description: "Testing advanced fluid dynamics in animation",
        thumbnailUrl: "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8",
        category: "Experimental",
        duration: "2:12",
        featured: false,
        showreel: false,
        publishedAt: new Date("2023-06-18"),
      },
      {
        videoId: "rf6uf3jNjao", // Sample YouTube video
        title: "Product Visualization",
        description: "3D product animation for marketing campaign",
        thumbnailUrl: "https://images.unsplash.com/photo-1620428268482-cf1851a383b0",
        category: "Commercial",
        duration: "1:20",
        featured: false,
        showreel: false,
        publishedAt: new Date("2023-07-23"),
      },
      {
        videoId: "GBmoeaYk5J0", // Sample YouTube video
        title: "Abstract Data Visualization",
        description: "Turning complex data into beautiful motion graphics",
        thumbnailUrl: "https://images.unsplash.com/photo-1559028012-481c04fa702d",
        category: "Motion Graphics",
        duration: "3:05",
        featured: false,
        showreel: false,
        publishedAt: new Date("2023-08-14"),
      },
      {
        videoId: "1La4QzGeaaQ", // Sample YouTube video
        title: "Character Walk Cycle Study",
        description: "Detailed animation of various walk cycles",
        thumbnailUrl: "https://images.unsplash.com/photo-1550745165-9bc0b252726f",
        category: "Character",
        duration: "0:45",
        featured: false,
        showreel: false,
        publishedAt: new Date("2023-09-02"),
      },
      {
        videoId: "IUN664s7N-c", // Sample YouTube video
        title: "\"The Journey\" - Short Film",
        description: "Award-winning short about personal growth",
        thumbnailUrl: "https://images.unsplash.com/photo-1578632767115-351597cf2477",
        category: "Short Films",
        duration: "5:30",
        featured: false,
        showreel: false,
        publishedAt: new Date("2023-10-09"),
      },
      {
        videoId: "ZHxGIPTuU9A", // Sample YouTube video
        title: "Particle System Demo",
        description: "Creating complex particle effects for animation",
        thumbnailUrl: "https://images.unsplash.com/photo-1519074069390-98277fc02a5f",
        category: "Experimental",
        duration: "1:35",
        featured: false,
        showreel: false,
        publishedAt: new Date("2023-11-15"),
      },
    ];
    
    // Insert all sample videos
    await db.insert(videos).values(sampleVideos);
  }
}

// Create and export the storage instance
export const storage = new DatabaseStorage();

// Initialize sample data if needed
storage.initializeSampleVideos().catch(err => {
  console.error("Error initializing sample videos:", err);
});
