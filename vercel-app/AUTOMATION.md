# Automated Deployment Guide

This Next.js application is set up with GitHub Actions for fully automated deployments to Vercel. Here's how to use it:

## Initial Setup

1. **Push this repository to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/your-username/stickmananimations-vercel.git
   git push -u origin main
   ```

2. **Set up Vercel**
   - Create a Vercel account if you don't have one
   - Install the Vercel CLI: `npm i -g vercel`
   - Link your project: `vercel link`
   - When asked, select to create a new project

3. **Get a Vercel API token**
   - Go to your [Vercel account settings](https://vercel.com/account/tokens)
   - Create a new token (give it a name like "GitHub Actions")
   - Copy the token

4. **Add the token to GitHub Secrets**
   - Go to your GitHub repository
   - Navigate to Settings > Secrets and variables > Actions
   - Click "New repository secret"
   - Name: `VERCEL_TOKEN`
   - Value: paste your Vercel token
   - Click "Add secret"

## Automatic Deployments

Once set up, the GitHub Action will:

1. **Automatically deploy on every push to the main branch**
   - The workflow will run whenever you push to the main branch
   - It will deploy the latest version to Vercel

2. **Support manual deployments with custom settings**
   - Go to the "Actions" tab in your GitHub repository
   - Select the "Deploy to Vercel" workflow
   - Click "Run workflow"
   - You can optionally specify a different Replit URL if needed

## Updating the Replit URL

If your Replit app URL changes, you have two options:

1. **Manual Trigger with New URL**:
   - Go to the GitHub Actions tab
   - Click "Run workflow"
   - Enter the new Replit URL in the input field

2. **Edit the Repository Files**:
   - Update the URL in `pages/index.js`
   - Update the API proxy URL in `vercel.json`
   - Commit and push the changes

## Troubleshooting

If the deployment fails:

1. Check the GitHub Actions logs for errors
2. Verify your Vercel token is correct and has not expired
3. Ensure your GitHub repository is properly linked to Vercel
4. Manually run `vercel` from the command line to see if there are any project-specific issues