-- ═══════════════════════════════════════════════════════════════════════════════
-- BlackBox Tech — Blogs Table Setup
-- Run this SQL in your Supabase SQL Editor to create the blogs table
-- ═══════════════════════════════════════════════════════════════════════════════

-- 1. Create the blackbox_blogs table
CREATE TABLE IF NOT EXISTS blackbox_blogs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt TEXT,
  content TEXT NOT NULL,
  cover_image TEXT,
  author TEXT DEFAULT 'BlackBox Tech Team',
  category TEXT NOT NULL,
  tags TEXT[] DEFAULT '{}',
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published'))
);

-- 2. Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_blogs_slug ON blackbox_blogs(slug);
CREATE INDEX IF NOT EXISTS idx_blogs_status ON blackbox_blogs(status);
CREATE INDEX IF NOT EXISTS idx_blogs_category ON blackbox_blogs(category);
CREATE INDEX IF NOT EXISTS idx_blogs_published_at ON blackbox_blogs(published_at DESC);

-- 3. Enable Row Level Security
ALTER TABLE blackbox_blogs ENABLE ROW LEVEL SECURITY;

-- 4. Allow public read access for published blogs
CREATE POLICY "Public can view published blogs"
  ON blackbox_blogs
  FOR SELECT
  TO anon
  USING (status = 'published');

-- 5. Allow authenticated/admin access for all operations
-- (Uses the admin password check via API, not Supabase auth)
CREATE POLICY "Admin can view all blogs"
  ON blackbox_blogs
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admin can insert blogs"
  ON blackbox_blogs
  FOR INSERT
  TO authenticated, anon
  WITH CHECK (true);

CREATE POLICY "Admin can update blogs"
  ON blackbox_blogs
  FOR UPDATE
  TO authenticated, anon
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Admin can delete blogs"
  ON blackbox_blogs
  FOR DELETE
  TO authenticated, anon
  USING (true);

-- ═══════════════════════════════════════════════════════════════════════════════
-- NOTE: After running this script, go to the Admin Dashboard (/admin)
-- Click the "Blogs" tab, then click "Seed 22 Blog Posts" to add all blog content.
-- ═══════════════════════════════════════════════════════════════════════════════
