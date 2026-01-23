-- =============================================
-- Supabase Database Setup for Blog Comments
-- Run this SQL in your Supabase SQL Editor:
-- https://supabase.com/dashboard/project/_/sql
-- =============================================

-- Create comments table
CREATE TABLE IF NOT EXISTS public.comments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  tutorial_slug TEXT NOT NULL,
  author_name TEXT NOT NULL,
  author_email TEXT NOT NULL,
  content TEXT NOT NULL,
  is_approved BOOLEAN DEFAULT true NOT NULL,
  parent_id UUID REFERENCES public.comments(id) ON DELETE CASCADE
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_comments_tutorial_slug ON public.comments(tutorial_slug);
CREATE INDEX IF NOT EXISTS idx_comments_created_at ON public.comments(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_comments_is_approved ON public.comments(is_approved);
CREATE INDEX IF NOT EXISTS idx_comments_parent_id ON public.comments(parent_id);

-- Enable Row Level Security (RLS)
ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can read approved comments
CREATE POLICY "Anyone can read approved comments" 
  ON public.comments 
  FOR SELECT 
  USING (is_approved = true);

-- Policy: Anyone can insert comments
CREATE POLICY "Anyone can insert comments" 
  ON public.comments 
  FOR INSERT 
  WITH CHECK (true);

-- Optional: Create a function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = timezone('utc'::text, now());
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to auto-update updated_at
DROP TRIGGER IF EXISTS update_comments_updated_at ON public.comments;
CREATE TRIGGER update_comments_updated_at
  BEFORE UPDATE ON public.comments
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- =============================================
-- IMPORTANT: After running this SQL, make sure to:
-- 1. Go to Project Settings > API
-- 2. Copy your Project URL and anon/public key
-- 3. Add them to your .env.local file
-- =============================================
