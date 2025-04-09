# Stickman Animations Vercel Deployment

This is a simple Next.js application that serves as a redirect to the Replit-hosted Stickman Animations website.

## Why this approach?

After multiple attempts to deploy the full application on Vercel, we found that the most reliable solution was to:

1. Host the actual application on Replit, where it runs perfectly
2. Use this simple Next.js app on Vercel just for the domain and redirection

## How it works

- When users visit the Vercel-hosted domain, they are automatically redirected to the Replit app
- The API requests are proxied through Vercel to the Replit app's API endpoints to maintain the same domain for API calls

## Deployment

1. Deploy this repository to Vercel
2. Configure your custom domain on Vercel
3. No environment variables are needed for this redirect app

This approach completely avoids the issues with Vercel's handling of the full-stack application while still allowing you to use your custom domain.