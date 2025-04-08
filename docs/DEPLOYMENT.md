# Deployment Guide

This document explains how the application is configured for deployment on Vercel and the solutions to common deployment issues.

## Deployment Configuration

The application is configured to be deployed on Vercel using the following files:

- `vercel.json`: Configures build settings, routes, and serverless function options
- `api/index.js`: A standalone serverless API handler that works without ESM imports
- `index.js`: Entry point that forwards to the API handler

## Vercel Environment Variables

The following environment variables must be set in the Vercel dashboard:

- `DATABASE_URL`: The PostgreSQL connection string for the Neon database
- `YOUTUBE_API_KEY`: Your YouTube Data API key

## Solving CommonJS vs ESM Issues

The main challenge with deploying to Vercel was the incompatibility between ESM and CommonJS modules in a serverless environment. The solution was to:

1. Create a dedicated CommonJS API handler in `api/index.js` that:
   - Directly connects to the database (no imports from server/)
   - Implements all API endpoints using raw SQL instead of Drizzle ORM
   - Includes appropriate error handling for serverless execution

2. Simplify the deployment configuration in `vercel.json` to:
   - Use reasonable memory limits (1024MB)
   - Set appropriate timeout (10 seconds)
   - Route all traffic through the API handler

## Performance Optimizations

To improve performance in a serverless environment:

1. Database operations use batch processing to avoid timeouts
2. API routes check if the database already has videos to avoid expensive YouTube API calls
3. Improved error handling with detailed logs helps diagnose issues
4. SQL queries are optimized for the Neon serverless PostgreSQL environment

## Manual Deployment

To manually deploy to Vercel:

1. Make sure all changes are committed to your repository
2. Link your repository to a Vercel project
3. Set the required environment variables
4. Deploy the project

## Troubleshooting

Common issues and solutions:

1. **"Cannot find module" errors**: This indicates an ESM vs CommonJS compatibility issue. Make sure the API handler uses `require()` instead of `import`.

2. **Timeout errors**: If functions timeout, check:
   - Increase the `maxDuration` in vercel.json
   - Use batched processing for database operations
   - Check for infinite loops or expensive operations

3. **Database connection issues**: Verify:
   - The `DATABASE_URL` environment variable is set correctly
   - The database is accessible from Vercel's network
   - Connection pooling is properly configured

4. **Missing YouTube data**: Ensure:
   - The `YOUTUBE_API_KEY` environment variable is set
   - API key has correct permissions
   - API quota is not exhausted