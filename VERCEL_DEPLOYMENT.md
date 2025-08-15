# Vercel Deployment Guide

This guide explains how to properly deploy this full-stack Express + React application to Vercel.

## Prerequisites

1. A Vercel account
2. A PostgreSQL database (recommended: Neon, Supabase, or Railway)
3. A YouTube API key (for video syncing functionality)

## Environment Variables

You need to configure the following environment variables in your Vercel project settings:

### Required Variables

- `DATABASE_URL`: Your PostgreSQL connection string
  - Format: `postgresql://username:password@host:port/database`
  - Example: `postgresql://user:pass@db.example.com:5432/mydb`

- `YOUTUBE_API_KEY`: Your YouTube Data API v3 key
  - Get one from [Google Cloud Console](https://console.cloud.google.com/)
  - Enable YouTube Data API v3

### Optional Variables

- `SYNC_VIDEOS`: Set to `true` to sync YouTube videos on deployment (default: `false`)
- `NODE_ENV`: Set to `production` (Vercel sets this automatically)

## Deployment Steps

1. **Connect your repository to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub/GitLab repository
   - Vercel will automatically detect the Node.js framework

2. **Configure environment variables**
   - In your Vercel project dashboard, go to Settings → Environment Variables
   - Add all the required environment variables listed above

3. **Deploy**
   - Vercel will automatically build and deploy your application
   - The build process will:
     - Build the React frontend with Vite
     - Bundle the Express backend with esbuild
     - Copy static assets to the correct location

## Project Structure

```
├── client/           # React frontend
├── server/           # Express backend
├── api/              # Vercel serverless functions
├── shared/           # Shared types and schemas
├── dist/             # Build output (generated)
├── vercel.json       # Vercel configuration
├── package.json      # Dependencies and scripts
└── vite.config.ts    # Vite configuration
```

## How It Works

1. **Frontend**: Built with Vite and served as static files
2. **Backend**: Express server bundled and deployed as serverless functions
3. **API Routes**: All `/api/*` requests are handled by the Express server
4. **Static Files**: All other requests serve the React SPA

## Troubleshooting

### Common Issues

1. **Database Connection Errors**
   - Ensure your `DATABASE_URL` is correct
   - Check if your database allows external connections
   - Verify SSL settings if required

2. **Build Failures**
   - Check that all dependencies are in `package.json`
   - Ensure TypeScript compilation passes locally
   - Verify the build command works: `npm run build`

3. **API Routes Not Working**
   - Check that `/api/index.js` exists and is properly configured
   - Verify environment variables are set in Vercel
   - Check Vercel function logs for errors

### Debugging

1. **Check Build Logs**: In Vercel dashboard, go to Deployments → Latest → Build Logs
2. **Check Function Logs**: Go to Functions tab in Vercel dashboard
3. **Test Locally**: Run `npm run build` locally to catch build issues

## Performance Optimization

1. **Database**: Use connection pooling for better performance
2. **Caching**: Implement Redis for session storage if needed
3. **CDN**: Vercel automatically serves static assets via CDN
4. **Edge Functions**: Consider using Vercel Edge Functions for global performance

## Security

1. **Environment Variables**: Never commit sensitive data to your repository
2. **Database**: Use SSL connections and strong passwords
3. **API Keys**: Rotate YouTube API keys regularly
4. **Headers**: Security headers are configured in `vercel.json`

## Monitoring

1. **Vercel Analytics**: Enable in project settings
2. **Error Tracking**: Consider integrating Sentry or similar
3. **Database Monitoring**: Monitor your database performance
4. **API Usage**: Track YouTube API usage to avoid quotas