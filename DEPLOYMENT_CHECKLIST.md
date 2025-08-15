# Vercel Deployment Checklist

## Pre-Deployment Setup

- [ ] **Environment Variables Configured in Vercel**
  - [ ] `DATABASE_URL` - PostgreSQL connection string
  - [ ] `YOUTUBE_API_KEY` - YouTube Data API v3 key
  - [ ] `SYNC_VIDEOS` - Set to `false` initially (optional)

- [ ] **Database Setup**
  - [ ] PostgreSQL database created and accessible
  - [ ] Database schema initialized (run `npm run db:push` locally first)
  - [ ] Connection string tested and working

- [ ] **YouTube API Setup**
  - [ ] YouTube Data API v3 enabled in Google Cloud Console
  - [ ] API key generated and has proper permissions
  - [ ] API quota limits checked

## Deployment Steps

1. **Connect Repository to Vercel**
   - [ ] Go to [vercel.com](https://vercel.com)
   - [ ] Import your GitHub/GitLab repository
   - [ ] Vercel should auto-detect Node.js framework

2. **Configure Project Settings**
   - [ ] Set build command to: `./vercel-build.sh`
   - [ ] Set output directory to: `dist`
   - [ ] Set Node.js version to: `18.x`

3. **Environment Variables**
   - [ ] Add all required environment variables in Vercel dashboard
   - [ ] Test environment variables are accessible

4. **Deploy**
   - [ ] Trigger deployment
   - [ ] Monitor build logs for any errors
   - [ ] Check function logs for runtime errors

## Post-Deployment Verification

- [ ] **Frontend Working**
  - [ ] Main page loads correctly
  - [ ] Static assets (CSS, JS, images) load
  - [ ] Responsive design works on mobile

- [ ] **Backend API Working**
  - [ ] API routes respond correctly (`/api/*`)
  - [ ] Database connections work
  - [ ] YouTube API integration functions

- [ ] **Database Operations**
  - [ ] Can read from database
  - [ ] Can write to database (if applicable)
  - [ ] Schema is properly initialized

- [ ] **Performance**
  - [ ] Page load times are acceptable
  - [ ] API response times are good
  - [ ] No memory leaks or excessive resource usage

## Troubleshooting

### Common Issues

1. **Build Failures**
   - Check build logs in Vercel dashboard
   - Ensure all dependencies are in `package.json`
   - Verify TypeScript compilation passes locally

2. **Environment Variable Issues**
   - Double-check variable names and values
   - Ensure no extra spaces or quotes
   - Test locally with same values

3. **Database Connection Issues**
   - Verify `DATABASE_URL` format
   - Check database allows external connections
   - Test connection string locally

4. **API Route Issues**
   - Check function logs in Vercel dashboard
   - Verify `/api/index.js` exists and is correct
   - Test API endpoints locally

### Debugging Commands

```bash
# Test build locally
npm run build

# Test server locally
npm run dev

# Check database connection
npm run db:push

# Check TypeScript compilation
npm run check
```

## Monitoring

- [ ] Set up Vercel Analytics
- [ ] Configure error tracking (Sentry, etc.)
- [ ] Set up database monitoring
- [ ] Monitor API usage and quotas

## Security Checklist

- [ ] Environment variables are not exposed in client code
- [ ] Database connection uses SSL
- [ ] API keys are properly secured
- [ ] Security headers are configured
- [ ] No sensitive data in logs

## Performance Optimization

- [ ] Enable Vercel CDN for static assets
- [ ] Configure proper caching headers
- [ ] Optimize bundle sizes
- [ ] Monitor Core Web Vitals