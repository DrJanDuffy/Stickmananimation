-- Database initialization script for GK Animates Website

-- Create subscribers table
CREATE TABLE IF NOT EXISTS "subscribers" (
  "id" SERIAL PRIMARY KEY,
  "email" TEXT NOT NULL UNIQUE,
  "name" TEXT,
  "subscribed_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  "preference_updates" BOOLEAN DEFAULT TRUE,
  "preference_newsletter" BOOLEAN DEFAULT TRUE
);

-- Create videos table
CREATE TABLE IF NOT EXISTS "videos" (
  "id" SERIAL PRIMARY KEY,
  "video_id" TEXT NOT NULL UNIQUE,
  "title" TEXT NOT NULL,
  "description" TEXT,
  "thumbnail_url" TEXT NOT NULL,
  "category" TEXT NOT NULL,
  "duration" TEXT NOT NULL,
  "published_at" TEXT NOT NULL,
  "created_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  "view_count" INTEGER DEFAULT 0,
  "like_count" INTEGER DEFAULT 0,
  "featured" BOOLEAN DEFAULT FALSE,
  "is_showreel" BOOLEAN DEFAULT FALSE
);

-- Create users table
CREATE TABLE IF NOT EXISTS "users" (
  "id" SERIAL PRIMARY KEY,
  "username" TEXT NOT NULL UNIQUE,
  "password_hash" TEXT NOT NULL,
  "email" TEXT NOT NULL UNIQUE,
  "created_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  "is_admin" BOOLEAN DEFAULT FALSE
);

-- Add initial admin user (placeholder)
-- This is just a placeholder - replace with actual admin credentials in production
INSERT INTO "users" ("username", "password_hash", "email", "is_admin")
VALUES ('admin', 'REPLACE_WITH_SECURE_HASH', 'admin@example.com', TRUE)
ON CONFLICT (username) DO NOTHING;

-- Add initial video data (placeholder)
-- For showreel
INSERT INTO "videos" ("video_id", "title", "description", "thumbnail_url", "category", "duration", "published_at", "is_showreel")
VALUES ('lQKyi1eoOhk', 'Intro to Stickman Epic Legends', 'Showreel video', 'https://i.ytimg.com/vi/lQKyi1eoOhk/maxresdefault.jpg', 'Showreel', '1:30', '2023-01-01', TRUE)
ON CONFLICT (video_id) DO NOTHING;
