# Simple Redirect for GK Animates

This is an ultra-simple static site that redirects all visitors to the Replit-hosted GK Animates website.

## How it works

This project uses multiple redirection methods to ensure maximum compatibility:

1. HTML meta refresh tag
2. JavaScript redirection with window.location
3. Vercel configuration for static hosting
4. Netlify-style _redirects file (which some hosting providers support)

## Deployment Instructions

### Vercel (Recommended)

1. Create a new GitHub repository and push these files to it
2. Go to [Vercel](https://vercel.com) and create a new project
3. Import your GitHub repository
4. Deploy with default settings (no build command needed)

### GitHub Pages (Alternative)

GitHub Pages can also host this simple redirect:

1. Push these files to a GitHub repository
2. Go to Settings > Pages
3. Enable GitHub Pages from the main branch
4. Your site will be available at your-username.github.io/repo-name

## Customizing

If you need to change the destination URL:

1. Edit `index.html` - Update both the meta refresh tag and the JavaScript redirect
2. Edit `_redirects` - Update the destination URL

## Troubleshooting

If the redirect isn't working:

1. Make sure your Replit app is running and accessible
2. Check if Vercel is properly serving the static files
3. Try accessing the site in a different browser to rule out caching issues