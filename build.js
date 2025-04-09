// This file is used by Vercel to build the project
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Run the build command
console.log('Running build command...');
execSync('npm run build', { stdio: 'inherit' });

// Verify the build output
const distPath = path.join(__dirname, 'dist');
if (fs.existsSync(distPath)) {
  console.log('Build completed successfully. Contents of dist directory:');
  const files = fs.readdirSync(distPath);
  console.log(files);

  // Copy index.html to the dist directory as a fallback
  if (fs.existsSync(path.join(__dirname, 'index.html'))) {
    console.log('Copying index.html to dist directory...');
    fs.copyFileSync(
      path.join(__dirname, 'index.html'),
      path.join(distPath, 'index.html')
    );
  }
} else {
  console.error('Build failed. Dist directory not found.');
  process.exit(1);
}