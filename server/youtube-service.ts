import { InsertVideo, type Video } from "@shared/schema";
import fetch from "node-fetch";
import { storage } from "./storage";

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
const API_BASE_URL = "https://www.googleapis.com/youtube/v3";
const CHANNEL_ID = "UC_WllVNTkI50BEXRYkmVGRw";
const MAX_RESULTS = 50; // Maximum number of results to fetch per request

// Cache data to avoid hitting API limits unnecessarily
const CACHE_TTL = 1000 * 60 * 60; // 1 hour
let videosCache: any[] = [];
let videoCacheTime = 0;

interface YouTubeVideo {
  id: string;
  snippet: {
    title: string;
    description: string;
    publishedAt: string; 
    thumbnails: {
      high: {
        url: string;
      };
      maxres?: {
        url: string;
      };
    };
    categoryId: string;
  };
  contentDetails: {
    duration: string;
  };
  statistics: {
    viewCount: string;
    likeCount: string;
  };
}

interface YouTubeCategoryResponse {
  items: Array<{
    id: string;
    snippet: {
      title: string;
    };
  }>;
}

// Helper to format ISO 8601 duration to MM:SS format
function formatDuration(isoDuration: string): string {
  const match = isoDuration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return "00:00";
  
  const hours = parseInt(match[1] || "0");
  const minutes = parseInt(match[2] || "0");
  const seconds = parseInt(match[3] || "0");
  
  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  }
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

// Fetch video categories to map category IDs to names
async function fetchVideoCategories(): Promise<Map<string, string>> {
  const categoryMap = new Map<string, string>();
  
  try {
    const response = await fetch(
      `${API_BASE_URL}/videoCategories?part=snippet&regionCode=US&key=${YOUTUBE_API_KEY}`
    );
    
    if (!response.ok) {
      console.error(`Error fetching video categories: ${response.status} ${response.statusText}`);
      return categoryMap;
    }
    
    const data = await response.json() as YouTubeCategoryResponse;
    
    for (const category of data.items) {
      categoryMap.set(category.id, category.snippet.title);
    }
  } catch (error) {
    console.error("Error fetching video categories:", error);
  }
  
  return categoryMap;
}

// Map YouTube category IDs to our application categories
function mapCategoryName(categoryId: string, categoryMap: Map<string, string>): string {
  const categoryName = categoryMap.get(categoryId) || "Uncategorized";
  
  // Map YouTube categories to our app's categories
  switch (categoryName) {
    case "Film & Animation":
      return "Animation";
    case "Entertainment":
      return "Character";
    case "Howto & Style":
      return "Tutorial";
    case "Education":
      return "Tutorial";
    case "Science & Technology":
      return "Experimental";
    case "People & Blogs":
      return "Short Films";
    case "Gaming":
      return "Character";
    default:
      // For other cases, just use our most relevant category
      return "Motion Graphics";
  }
}

// Fetch all videos from the channel
export async function fetchAllChannelVideos() {
  // Use cache if available and not expired
  const now = Date.now();
  if (videosCache.length > 0 && now - videoCacheTime < CACHE_TTL) {
    console.log("Using cached YouTube data");
    return videosCache;
  }
  
  console.log("Fetching YouTube channel videos...");
  
  try {
    // Step 1: Get video IDs from channel uploads
    const playlistResponse = await fetch(
      `${API_BASE_URL}/channels?part=contentDetails&id=${CHANNEL_ID}&key=${YOUTUBE_API_KEY}`
    );
    
    if (!playlistResponse.ok) {
      throw new Error(`Error fetching channel: ${playlistResponse.status} ${playlistResponse.statusText}`);
    }
    
    const channelData = await playlistResponse.json() as { 
      items: Array<{ 
        contentDetails: { 
          relatedPlaylists: { 
            uploads: string 
          } 
        }
      }>
    };
    const uploadsPlaylistId = channelData.items[0]?.contentDetails?.relatedPlaylists?.uploads;
    
    if (!uploadsPlaylistId) {
      throw new Error("Could not find uploads playlist ID");
    }
    
    // Step 2: Get videos from upload playlist
    const videosResponse = await fetch(
      `${API_BASE_URL}/playlistItems?part=snippet&maxResults=${MAX_RESULTS}&playlistId=${uploadsPlaylistId}&key=${YOUTUBE_API_KEY}`
    );
    
    if (!videosResponse.ok) {
      throw new Error(`Error fetching playlist items: ${videosResponse.status} ${videosResponse.statusText}`);
    }
    
    const playlistData = await videosResponse.json() as {
      items: Array<{
        snippet: {
          resourceId: {
            videoId: string
          }
        }
      }>
    };
    
    const videoIds = playlistData.items
      .map(item => item.snippet.resourceId.videoId)
      .join(",");
    
    // Step 3: Get detailed video information
    const detailsResponse = await fetch(
      `${API_BASE_URL}/videos?part=snippet,contentDetails,statistics&id=${videoIds}&key=${YOUTUBE_API_KEY}`
    );
    
    if (!detailsResponse.ok) {
      throw new Error(`Error fetching video details: ${detailsResponse.status} ${detailsResponse.statusText}`);
    }
    
    const videoData = await detailsResponse.json() as {
      items: YouTubeVideo[]
    };
    const categories = await fetchVideoCategories();
    
    // Update cache
    videosCache = videoData.items;
    videoCacheTime = now;
    
    return videoData.items;
  } catch (error) {
    console.error("Error fetching YouTube data:", error);
    // Return empty array in case of error
    return [];
  }
}

// Fetch and save videos to our database
export async function syncYouTubeVideos(): Promise<void> {
  try {
    const videos = await fetchAllChannelVideos();
    const categories = await fetchVideoCategories();
    
    console.log(`Fetched ${videos.length} videos from YouTube`);
    
    if (videos.length === 0) {
      console.log("No videos found, skipping sync");
      return;
    }
    
    // Get all existing videos in our database to avoid duplicates
    const existingVideos = await storage.getAllVideos();
    const existingVideoIds = new Set(existingVideos.map(video => video.videoId));
    
    // Process each video
    for (const video of videos) {
      const { id, snippet, contentDetails, statistics } = video as YouTubeVideo;
      
      // Skip if we already have this video
      if (existingVideoIds.has(id)) {
        continue;
      }
      
      // Get the best thumbnail available
      const thumbnailUrl = snippet.thumbnails.maxres?.url || snippet.thumbnails.high.url;
      
      // Map the category
      const category = mapCategoryName(snippet.categoryId, categories);
      
      // Format the duration
      const duration = formatDuration(contentDetails.duration);
      
      // Create a video object to store in our database
      const videoToInsert: InsertVideo = {
        videoId: id,
        title: snippet.title,
        description: snippet.description,
        thumbnailUrl,
        category,
        duration,
        publishedAt: new Date(snippet.publishedAt),
        featured: false, // Default to not featured
        showreel: false, // Default to not showreel
      };
      
      // Make the first video the showreel (if we don't have one yet)
      if (!existingVideos.some(v => v.showreel)) {
        videoToInsert.showreel = true;
        videoToInsert.featured = true;
      }
      
      // Add to database
      await storage.createVideo(videoToInsert);
      console.log(`Added video: ${snippet.title}`);
    }
    
    console.log("YouTube sync completed");
  } catch (error) {
    console.error("Error syncing YouTube videos:", error);
  }
}

// Get channel statistics (subscribers, views, etc.)
export async function getChannelStatistics() {
  try {
    const response = await fetch(
      `${API_BASE_URL}/channels?part=statistics&id=${CHANNEL_ID}&key=${YOUTUBE_API_KEY}`
    );
    
    if (!response.ok) {
      throw new Error(`Error fetching channel statistics: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json() as {
      items: Array<{
        statistics: {
          subscriberCount: string;
          viewCount: string;
          videoCount: string;
        }
      }>
    };
    return data.items[0]?.statistics || null;
  } catch (error) {
    console.error("Error fetching channel statistics:", error);
    return null;
  }
}