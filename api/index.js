// This redirects API requests to the Express backend
// Vercel will use this file when deployed

export default function handler(req, res) {
  // Redirect to the Replit app API
  const targetUrl = `https://stickmananimations.replit.app${req.url}`;
  
  // Set cache control headers
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  
  // Redirect to the API endpoint on Replit
  res.redirect(307, targetUrl);
}