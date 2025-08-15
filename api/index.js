// Vercel serverless function handler for the Express app
import { app } from '../dist/index.js';

// Create a serverless handler for Vercel
export default function handler(req, res) {
  // Set environment to indicate we're in serverless mode
  process.env.VERCEL = '1';
  
  // Handle the request through Express
  app(req, res);
}