-- =============================================
-- Add Likes Table for Comments
-- Run this SQL in your Supabase SQL Editor
-- =============================================

-- Create likes table (tracks who liked what)
CREATE TABLE IF NOT EXISTS public.comment_likes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  comment_id UUID NOT NULL REFERENCES public.comments(id) ON DELETE CASCADE,
  user_fingerprint TEXT NOT NULL, -- Anonymous user identifier (stored in localStorage)
  UNIQUE(comment_id, user_fingerprint) -- Prevent duplicate likes
);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_comment_likes_comment_id ON public.comment_likes(comment_id);
CREATE INDEX IF NOT EXISTS idx_comment_likes_fingerprint ON public.comment_likes(user_fingerprint);

-- Enable RLS
ALTER TABLE public.comment_likes ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can read likes
CREATE POLICY "Anyone can read likes" 
  ON public.comment_likes 
  FOR SELECT 
  USING (true);

-- Policy: Anyone can insert likes
CREATE POLICY "Anyone can insert likes" 
  ON public.comment_likes 
  FOR INSERT 
  WITH CHECK (true);

-- Policy: Users can delete their own likes (unlike)
CREATE POLICY "Users can delete their own likes" 
  ON public.comment_likes 
  FOR DELETE 
  USING (true);

-- Create a view to get comment with like counts
CREATE OR REPLACE VIEW public.comments_with_likes AS
SELECT 
  c.*,
  COALESCE(l.like_count, 0)::int as like_count
FROM public.comments c
LEFT JOIN (
  SELECT comment_id, COUNT(*) as like_count
  FROM public.comment_likes
  GROUP BY comment_id
) l ON c.id = l.comment_id;
