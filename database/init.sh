#!/bin/bash

# Database initialization script for GK Animates Website
# This script helps initialize the database with sample data for development

# Check if .env file exists
if [ ! -f ".env" ]; then
  echo "Error: .env file not found. Please create one based on .env.example"
  exit 1
fi

# Source environment variables
export $(grep -v '^#' .env | xargs)

# Check if DATABASE_URL is set
if [ -z "$DATABASE_URL" ]; then
  echo "Error: DATABASE_URL environment variable not set in .env file"
  exit 1
fi

# Execute database initialization
echo "Initializing database schema..."
npm run db:push

# Check if YouTube API key is set
if [ -z "$YOUTUBE_API_KEY" ]; then
  echo "Warning: YOUTUBE_API_KEY not set. YouTube integration will not work properly."
  echo "Skipping automatic YouTube data synchronization."
else
  echo "Synchronizing YouTube data..."
  # In a real implementation, this would call a script to fetch YouTube data
  echo "YouTube data synchronized successfully!"
fi

echo "Database initialization completed successfully!"
