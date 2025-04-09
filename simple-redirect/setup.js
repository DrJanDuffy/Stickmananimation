#!/usr/bin/env node

/**
 * Automated Setup Script for Vercel Deployment
 * This script helps you quickly deploy the GK Animates redirect to Vercel
 */

const { execSync } = require('child_process');
const readline = require('readline');
const fs = require('fs');
const path = require('path');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// ASCII Art Header
const header = `
╔═══════════════════════════════════════════════════════════╗
║                                                           ║
║   ┏━┓╻┏ ┏━┓┏┓╻╻┏┳┓┏━┓╺┳╸┏━╸┏━┓   ╻ ╻┏━╸┏━┓┏━╸┏━╸╻       ║
║   ┃┗┛┣┫  ┣━┫┃┗┫┃┃┃┣━┫ ┃ ┣╸ ┗━┓   ┃┏┛┣╸ ┣┳┛┃  ┣╸ ┃       ║
║   ╹  ╹┗━┛╹ ╹╹ ╹╹╹ ╹╹ ╹ ╹ ┗━╸┗━┛   ┗┛ ┗━╸╹┗╸┗━╸┗━╸┗━╸     ║
║                                                           ║
║   Automatic Deployment Setup                              ║
║                                                           ║
╚═══════════════════════════════════════════════════════════╝
`;

console.log(header);

// Check if Vercel CLI is installed
function checkVercelCLI() {
  try {
    execSync('vercel --version', { stdio: 'ignore' });
    return true;
  } catch (error) {
    return false;
  }
}

// Check if Git is installed
function checkGit() {
  try {
    execSync('git --version', { stdio: 'ignore' });
    return true;
  } catch (error) {
    return false;
  }
}

// Step 1: Install dependencies if needed
async function installDependencies() {
  console.log('\n📦 Checking dependencies...');
  
  if (!checkVercelCLI()) {
    console.log('Vercel CLI not found. Installing...');
    try {
      execSync('npm install -g vercel', { stdio: 'inherit' });
      console.log('✅ Vercel CLI installed successfully!');
    } catch (error) {
      console.error('❌ Failed to install Vercel CLI. Please install it manually: npm install -g vercel');
      process.exit(1);
    }
  } else {
    console.log('✅ Vercel CLI is already installed.');
  }
  
  if (!checkGit()) {
    console.error('❌ Git is required but not installed. Please install Git and try again.');
    process.exit(1);
  } else {
    console.log('✅ Git is installed.');
  }
}

// Step 2: Init git repository
async function initGitRepo() {
  console.log('\n🔄 Setting up Git repository...');
  
  try {
    if (!fs.existsSync('.git')) {
      execSync('git init', { stdio: 'inherit' });
      console.log('✅ Git repository initialized.');
    } else {
      console.log('✅ Git repository already exists.');
    }
    
    // Create .gitignore
    if (!fs.existsSync('.gitignore')) {
      fs.writeFileSync('.gitignore', 'node_modules\n.vercel\n.env\n');
      console.log('✅ Created .gitignore file.');
    }
    
    // Add all files
    execSync('git add .', { stdio: 'inherit' });
    console.log('✅ Files added to Git.');
    
    // Commit changes
    try {
      execSync('git commit -m "Initial commit for GK Animates redirect"', { stdio: 'inherit' });
      console.log('✅ Changes committed.');
    } catch (error) {
      // If commit fails due to user config, help them set it up
      console.log('⚠️ Git requires user configuration before committing.');
      
      rl.question('Enter your name for Git config: ', (name) => {
        execSync(`git config user.name "${name}"`, { stdio: 'inherit' });
        
        rl.question('Enter your email for Git config: ', (email) => {
          execSync(`git config user.email "${email}"`, { stdio: 'inherit' });
          execSync('git commit -m "Initial commit for GK Animates redirect"', { stdio: 'inherit' });
          console.log('✅ Changes committed with your new Git config.');
          setupGitHub();
        });
      });
    }
  } catch (error) {
    console.error('❌ Error setting up Git repository:', error.message);
    process.exit(1);
  }
}

// Step 3: Setup GitHub
async function setupGitHub() {
  console.log('\n🌐 Setting up GitHub repository...');
  
  rl.question('Do you want to push to GitHub? (y/n): ', (answer) => {
    if (answer.toLowerCase() === 'y') {
      rl.question('Enter your GitHub repository URL (e.g., https://github.com/username/repo.git): ', (repoUrl) => {
        try {
          execSync(`git remote add origin ${repoUrl}`, { stdio: 'inherit' });
          execSync('git push -u origin main', { stdio: 'inherit' });
          console.log('✅ Successfully pushed to GitHub!');
          deployToVercel();
        } catch (error) {
          console.error('❌ Error pushing to GitHub:', error.message);
          console.log('You can still deploy to Vercel directly.');
          deployToVercel();
        }
      });
    } else {
      deployToVercel();
    }
  });
}

// Step 4: Deploy to Vercel
async function deployToVercel() {
  console.log('\n🚀 Deploying to Vercel...');
  
  rl.question('Do you want to deploy to Vercel now? (y/n): ', (answer) => {
    if (answer.toLowerCase() === 'y') {
      try {
        console.log('Running Vercel deployment...');
        execSync('vercel --prod', { stdio: 'inherit' });
        console.log('\n✅ Deployment completed!');
        
        console.log('\n🎉 Your GK Animates redirect site is now live!');
        console.log('\n📝 Next steps:');
        console.log('1. Set up your custom domain in the Vercel dashboard');
        console.log('2. Configure your domain DNS settings to point to Vercel');
        
        rl.close();
      } catch (error) {
        console.error('❌ Error deploying to Vercel:', error.message);
        process.exit(1);
      }
    } else {
      console.log('\n📝 To deploy later, run: vercel --prod');
      rl.close();
    }
  });
}

// Run the setup
async function runSetup() {
  try {
    await installDependencies();
    await initGitRepo();
    // setupGitHub and deployToVercel will be called after user input
  } catch (error) {
    console.error('❌ Setup failed:', error.message);
    process.exit(1);
  }
}

runSetup();