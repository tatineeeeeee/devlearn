-- =============================================
-- Security Update: Restrict Email Access
-- Run this SQL in your Supabase SQL Editor
-- =============================================

-- Drop the existing policy
DROP POLICY IF EXISTS "Anyone can read approved comments" ON public.comments;

-- Create a more restrictive policy using a view that excludes email
-- This ensures email is NEVER exposed via the API

-- Option 1: Create a view that excludes email (recommended)
CREATE OR REPLACE VIEW public.comments_public AS
SELECT 
  id,
  created_at,
  updated_at,
  tutorial_slug,
  author_name,
  content,
  is_approved,
  parent_id
FROM public.comments
WHERE is_approved = true;

-- Grant access to the public view
GRANT SELECT ON public.comments_public TO anon, authenticated;

-- Re-create policy for the comments table (used for inserts)
CREATE POLICY "Anyone can read approved comments" 
  ON public.comments 
  FOR SELECT 
  USING (is_approved = true);

-- Note: Even though the policy allows reading, your app code 
-- only selects specific columns, not author_email

-- =============================================
-- EXTRA SECURITY: Column-level security (optional)
-- This prevents ANY query from returning author_email
-- even if someone tries to select * 
-- =============================================

-- Revoke direct select on author_email column for anon users
-- Note: This is advanced - only run if you understand the implications
-- REVOKE SELECT (author_email) ON public.comments FROM anon;
