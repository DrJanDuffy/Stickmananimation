# Setup Guide for GK Animates Website

This document provides detailed instructions for setting up the GK Animates website locally for development or deploying it to a production environment.

## Local Development Setup

### Prerequisites

- Node.js (v18 or higher)
- npm (v7 or higher)
- PostgreSQL database

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```
# Database
DATABASE_URL=postgresql://username:password@localhost:5432/gkanimates

# YouTube API (required for YouTube integration)
YOUTUBE_API_KEY=your_youtube_api_key
```

### Installation Steps

1. Clone the repository
2. Install dependencies using npm
3. Set up the database
4. Start the development server
5. Access the website at http://localhost:5000

## Production Deployment

### Deploying to Vercel

1. Create a Vercel account at https://vercel.com
2. Install the Vercel CLI
3. Configure the necessary environment variables in your Vercel project settings
4. Deploy using the Vercel platform or CLI

### Continuous Integration/Continuous Deployment

This project is set up with GitHub Actions workflows for CI/CD:
- CI workflow runs tests on pull requests and pushes to main
- Deploy workflow automatically deploys to Vercel when changes are pushed to main

## Troubleshooting

If you encounter issues:

1. Ensure all environment variables are correctly set
2. Check that your PostgreSQL database is running and accessible
3. Make sure you have a valid YouTube API key if you're using YouTube integration features
4. Confirm that all dependencies are installed correctly

For additional help, please open an issue in the GitHub repository.
