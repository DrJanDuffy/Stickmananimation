#!/bin/bash

# Vercel build script
echo "Starting Vercel build..."

# Install dependencies
npm install

# Build the application
npm run build

# Ensure the API directory exists
mkdir -p api

# Copy the built server to the API directory for Vercel
cp dist/index.js api/index.js

echo "Vercel build completed successfully!"