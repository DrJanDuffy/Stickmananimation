#!/usr/bin/env node

/**
 * This script automates the setup process for Vercel deployment
 * 
 * Usage:
 * 1. Install Vercel globally: npm i -g vercel
 * 2. Run this script: node setup-vercel.js
 * 
 * The script will:
 * - Check if Vercel CLI is installed
 * - Link your local project to Vercel
 * - Create a production deployment
 * - Provide instructions for automating future deployments
 */

const { execSync } = require('child_process');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// ANSI color codes for prettier output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  red: '\x1b[31m'
};

function printHeader(message) {
  console.log(`\n${colors.bright}${colors.blue}=== ${message} ===${colors.reset}\n`);
}

function printSuccess(message) {
  console.log(`${colors.green}✓ ${message}${colors.reset}`);
}

function printError(message) {
  console.log(`${colors.red}✗ ${message}${colors.reset}`);
}

function printStep(message) {
  console.log(`${colors.yellow}→ ${message}${colors.reset}`);
}

function checkVercelInstalled() {
  printHeader('Checking Vercel CLI Installation');
  
  try {
    execSync('vercel --version', { stdio: 'ignore' });
    printSuccess('Vercel CLI is installed');
    return true;
  } catch (error) {
    printError('Vercel CLI is not installed!');
    console.log(`Please install it by running: ${colors.bright}npm i -g vercel${colors.reset}`);
    return false;
  }
}

function linkToVercel() {
  printHeader('Linking Project to Vercel');
  printStep('This will connect your local project to a Vercel project');
  console.log('Follow the prompts in the Vercel CLI to complete the setup...\n');
  
  try {
    execSync('vercel link', { stdio: 'inherit' });
    printSuccess('Project successfully linked to Vercel');
    return true;
  } catch (error) {
    printError('Failed to link project to Vercel');
    console.log(error.message);
    return false;
  }
}

function deploy() {
  printHeader('Creating Production Deployment');
  printStep('This will deploy your project to Vercel');
  console.log('This may take a few moments...\n');
  
  try {
    execSync('vercel --prod', { stdio: 'inherit' });
    printSuccess('Deployment complete!');
    return true;
  } catch (error) {
    printError('Deployment failed');
    console.log(error.message);
    return false;
  }
}

function showNextSteps() {
  printHeader('Next Steps for Automated Deployments');
  
  console.log(`${colors.bright}1. Create a Vercel API token:${colors.reset}`);
  console.log('   - Go to https://vercel.com/account/tokens');
  console.log('   - Create a new token (name it "GitHub Actions")');
  console.log('   - Copy the token for the next step\n');
  
  console.log(`${colors.bright}2. Add the token to GitHub Secrets:${colors.reset}`);
  console.log('   - Go to your GitHub repository');
  console.log('   - Navigate to Settings > Secrets and variables > Actions');
  console.log('   - Click "New repository secret"');
  console.log('   - Name: VERCEL_TOKEN');
  console.log('   - Value: [paste your Vercel token]');
  console.log('   - Click "Add secret"\n');
  
  console.log(`${colors.bright}3. Push your code to GitHub:${colors.reset}`);
  console.log('   Once set up, every push to the main branch will automatically deploy to Vercel\n');
  
  console.log(`For more details, see the ${colors.bright}AUTOMATION.md${colors.reset} file.\n`);
}

async function main() {
  console.log(`${colors.bright}${colors.blue}
╔═══════════════════════════════════════════════════════════╗
║                 Vercel Deployment Setup                   ║
║                                                           ║
║   This script will help you set up automated deployment   ║
║   for your Next.js application on Vercel                  ║
╚═══════════════════════════════════════════════════════════╝
${colors.reset}`);

  // Check if Vercel CLI is installed
  if (!checkVercelInstalled()) {
    rl.close();
    return;
  }
  
  // Prompt for continuing
  rl.question(`Do you want to continue with the setup? (y/n) `, (answer) => {
    if (answer.toLowerCase() !== 'y') {
      console.log('Setup cancelled.');
      rl.close();
      return;
    }
    
    // Link to Vercel
    if (!linkToVercel()) {
      rl.close();
      return;
    }
    
    // Deploy
    if (!deploy()) {
      rl.close();
      return;
    }
    
    // Show next steps
    showNextSteps();
    
    rl.close();
  });
}

main();