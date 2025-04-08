import { users, subscribers, videos, type User, type InsertUser, type Subscriber, type InsertSubscriber, type Video, type InsertVideo } from "@shared/schema";

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

export class MemStorage implements IStorage {
  private usersMap: Map<number, User>;
  private subscribersMap: Map<number, Subscriber>;
  private videosMap: Map<number, Video>;
  
  private currentUserId: number;
  private currentSubscriberId: number;
  private currentVideoId: number;

  constructor() {
    this.usersMap = new Map();
    this.subscribersMap = new Map();
    this.videosMap = new Map();
    
    this.currentUserId = 1;
    this.currentSubscriberId = 1;
    this.currentVideoId = 1;
    
    // Initialize with sample videos
    this.initializeSampleVideos();
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.usersMap.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.usersMap.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.usersMap.set(id, user);
    return user;
  }
  
  // Newsletter Subscriber methods
  async getSubscriberByEmail(email: string): Promise<Subscriber | undefined> {
    return Array.from(this.subscribersMap.values()).find(
      (subscriber) => subscriber.email === email,
    );
  }
  
  async createSubscriber(insertSubscriber: InsertSubscriber): Promise<Subscriber> {
    const id = this.currentSubscriberId++;
    const subscriber: Subscriber = { 
      ...insertSubscriber, 
      id, 
      createdAt: new Date() 
    };
    this.subscribersMap.set(id, subscriber);
    return subscriber;
  }
  
  async getAllSubscribers(): Promise<Subscriber[]> {
    return Array.from(this.subscribersMap.values());
  }
  
  // YouTube Video methods
  async getShowreel(): Promise<Video | undefined> {
    return Array.from(this.videosMap.values()).find(
      (video) => video.showreel === true,
    );
  }
  
  async getFeaturedVideos(): Promise<Video[]> {
    return Array.from(this.videosMap.values())
      .filter((video) => video.featured === true)
      .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
  }
  
  async getAllVideos(): Promise<Video[]> {
    return Array.from(this.videosMap.values())
      .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
  }
  
  async getVideosByCategory(category: string): Promise<Video[]> {
    return Array.from(this.videosMap.values())
      .filter((video) => video.category === category)
      .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
  }
  
  async getVideoById(id: number): Promise<Video | undefined> {
    return this.videosMap.get(id);
  }
  
  async getVideoByYouTubeId(videoId: string): Promise<Video | undefined> {
    return Array.from(this.videosMap.values()).find(
      (video) => video.videoId === videoId,
    );
  }
  
  async createVideo(insertVideo: InsertVideo): Promise<Video> {
    const id = this.currentVideoId++;
    const video: Video = { ...insertVideo, id };
    this.videosMap.set(id, video);
    return video;
  }
  
  async updateVideo(id: number, videoUpdate: Partial<InsertVideo>): Promise<Video | undefined> {
    const existingVideo = this.videosMap.get(id);
    if (!existingVideo) return undefined;
    
    const updatedVideo: Video = { ...existingVideo, ...videoUpdate };
    this.videosMap.set(id, updatedVideo);
    return updatedVideo;
  }
  
  // Initialize with sample videos for development
  private initializeSampleVideos(): void {
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
    
    // Add sample videos to storage
    sampleVideos.forEach(video => {
      this.createVideo(video);
    });
  }
}

export const storage = new MemStorage();
