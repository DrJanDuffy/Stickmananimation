# Deploying to Vercel

This guide walks you through deploying the GK Animates website to Vercel.

## Prerequisites

Before deploying, make sure you have:

1. A Vercel account
2. A PostgreSQL database (Vercel Postgres, Neon, Railway, etc.)
3. A YouTube API key with access to the YouTube Data API v3

## Deployment Steps

### 1. Fork or Clone the Repository

If you have not already, fork or clone this repository to your GitHub account.

### 2. Connect to Vercel

1. Go to Vercel Dashboard
2. Click "Add New" → "Project"
3. Import your GitHub repository
4. Select the branch you want to deploy (usually main)

### 3. Configure Environment Variables

Add the following environment variables in the Vercel project settings:

- DATABASE_URL: Your PostgreSQL connection string
  - Format: postgresql://username:password@host:port/database
- YOUTUBE_API_KEY: Your YouTube Data API key
  - This is required to fetch videos from the GK Animates channel

### 4. Deploy

1. Click "Deploy" to start the deployment process
2. Vercel will automatically build and deploy your project
3. Once deployment is complete, Vercel will provide you with a URL to access your site

### 5. Initialize Database (First Deployment Only)

After the first deployment, you need to initialize your database schema. You can do this in two ways:

#### Option 1: Using Vercel CLI

Install Vercel CLI:
```
npm i -g vercel
```

Login to Vercel:
```
vercel login
```

Link to your project:
```
vercel link
```

Run database migration:
```
vercel env pull .env.production.local
npx drizzle-kit push:pg --config=drizzle.config.ts
```

#### Option 2: Running Migrations Locally

Set the DATABASE_URL to your production database:
```
export DATABASE_URL=your_production_database_url
```

Run migration:
```
npx drizzle-kit push:pg --config=drizzle.config.ts
```

## Troubleshooting

### Database Connection Issues

If you encounter database connection issues:

1. Verify your DATABASE_URL is correct
2. Ensure your database allows connections from Vercel IP ranges
3. Check that your database user has appropriate permissions

### YouTube API Issues

If videos are not loading:

1. Verify your YOUTUBE_API_KEY is correct
2. Ensure the YouTube Data API v3 is enabled in your Google Cloud Console
3. Check API quotas and limits in Google Cloud Console

## Maintaining Your Deployment

### Updating Your Site

Any changes pushed to your main branch will trigger automatic redeployment.

### Checking Logs

1. Go to your project on the Vercel dashboard
2. Click "View Functions Logs" to see server logs
3. Use these logs to diagnose any issues with your deployment

## Custom Domains

To add a custom domain:

1. Go to your project on the Vercel dashboard
2. Click "Domains"
3. Add your custom domain and follow the verification steps

## Next Steps

After successful deployment, consider:

1. Setting up a CI/CD pipeline for testing before deployment
2. Adding monitoring tools like Sentry for error tracking
3. Implementing analytics to track visitor engagement