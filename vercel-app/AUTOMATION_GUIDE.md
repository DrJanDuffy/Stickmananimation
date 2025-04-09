# Fully Automated Deployment Guide

This guide provides step-by-step instructions for setting up fully automated deployments of your GK Animates website to Vercel.

## Option 1: Interactive Setup (Recommended for First-Time Setup)

We've included an interactive setup script that walks you through the entire process:

1. **Install required tools**
   ```bash
   npm install -g vercel
   ```

2. **Run the setup script**
   ```bash
   node scripts/setup-vercel.js
   ```

3. The script will:
   - Check if Vercel CLI is installed
   - Link your project to Vercel
   - Deploy to production
   - Guide you through setting up GitHub Actions

## Option 2: Manual Setup with GitHub Actions

If you prefer to set things up manually or already have a Vercel project:

1. **Push this repository to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/your-username/your-repo-name.git
   git push -u origin main
   ```

2. **Create a Vercel API token**
   - Go to [Vercel Account Settings](https://vercel.com/account/tokens)
   - Create a new token named "GitHub Actions"
   - Copy the token

3. **Add the token to GitHub**
   - Go to your GitHub repository
   - Navigate to Settings > Secrets and variables > Actions
   - Click "New repository secret"
   - Name: `VERCEL_TOKEN`
   - Value: paste your Vercel token

4. **Link your repository to Vercel**
   - Go to [Vercel](https://vercel.com/new)
   - Import your GitHub repository
   - Configure project settings and deploy

## Customizing the Replit URL

If you need to update the Replit application URL:

### Method 1: Using GitHub Actions UI
1. Go to the "Actions" tab in your GitHub repository
2. Select the "Deploy to Vercel" workflow
3. Click "Run workflow"
4. Enter the new Replit URL in the input field

### Method 2: Editing Files Directly
1. Update `pages/index.js` - change the `window.location.href` value
2. Update `vercel.json` - change the API proxy destination URL
3. Commit and push your changes to trigger an automatic deployment

## Troubleshooting

### Deployment Failures
- Check GitHub Actions logs for detailed error messages
- Verify your Vercel token has not expired
- Ensure your Vercel project is properly linked to GitHub

### API Proxying Issues
- Confirm the API URL in `vercel.json` matches your Replit app's API endpoint
- Check that your Replit app is running and accessible
- Try a test request directly to your Replit API to verify it's working

## Maintenance

Your deployments will continue to work automatically, but periodically check:

1. Vercel token validity (tokens can expire)
2. Replit app URL (if you've changed your Replit username or project name)
3. GitHub Actions logs for any warnings or errors