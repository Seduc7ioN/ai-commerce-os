-- AI Commerce OS Database Schema
-- Run this in your Supabase SQL editor

-- Enable UUID generation
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- USERS
-- ============================================
CREATE TABLE users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  avatar_url TEXT,
  credits INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email, name, avatar_url)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'name',
    NEW.raw_user_meta_data->>'avatar_url'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION handle_new_user();

-- ============================================
-- PROJECTS
-- ============================================
CREATE TYPE project_status AS ENUM ('draft', 'processing', 'completed', 'failed');

CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  status project_status NOT NULL DEFAULT 'draft',
  original_image TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_projects_user_id ON projects(user_id);
CREATE INDEX idx_projects_status ON projects(status);
CREATE INDEX idx_projects_created_at ON projects(created_at DESC);

-- ============================================
-- PROJECT IMAGES
-- ============================================
CREATE TYPE image_type AS ENUM (
  'original', 'white_bg', 'transparent', 'lifestyle',
  'ai_background', 'shadow', 'enhanced'
);

CREATE TABLE project_images (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  type image_type NOT NULL,
  url TEXT NOT NULL,
  prompt TEXT,
  width INTEGER,
  height INTEGER,
  file_size INTEGER,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_project_images_project_id ON project_images(project_id);

-- ============================================
-- PROJECT CONTENT
-- ============================================
CREATE TYPE content_type AS ENUM (
  'description', 'seo_title', 'seo_description',
  'keywords', 'marketing_copy'
);

CREATE TABLE project_content (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  type content_type NOT NULL,
  content TEXT NOT NULL,
  locale TEXT NOT NULL DEFAULT 'en',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_project_content_project_id ON project_content(project_id);

-- ============================================
-- MARKETPLACE EXPORTS
-- ============================================
CREATE TYPE marketplace_type AS ENUM (
  'trendyol', 'amazon', 'etsy', 'shopify', 'hepsiburada'
);

CREATE TYPE export_status AS ENUM ('pending', 'completed', 'failed');

CREATE TABLE marketplace_exports (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  marketplace marketplace_type NOT NULL,
  status export_status NOT NULL DEFAULT 'pending',
  config JSONB NOT NULL DEFAULT '{}',
  exported_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_marketplace_exports_project_id ON marketplace_exports(project_id);

-- ============================================
-- AI JOBS
-- ============================================
CREATE TYPE job_type AS ENUM (
  'remove_bg', 'gen_bg', 'enhance',
  'gen_description', 'gen_keywords', 'gen_seo'
);

CREATE TYPE job_status AS ENUM ('queued', 'processing', 'completed', 'failed');

CREATE TABLE ai_jobs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  type job_type NOT NULL,
  provider TEXT,
  status job_status NOT NULL DEFAULT 'queued',
  input JSONB DEFAULT '{}',
  output JSONB,
  error TEXT,
  cost NUMERIC(10,6),
  duration_ms INTEGER,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  completed_at TIMESTAMPTZ
);

CREATE INDEX idx_ai_jobs_project_id ON ai_jobs(project_id);
CREATE INDEX idx_ai_jobs_status ON ai_jobs(status);
CREATE INDEX idx_ai_jobs_type ON ai_jobs(type);

-- ============================================
-- CREDITS LOG
-- ============================================
CREATE TABLE credits_log (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  amount INTEGER NOT NULL,
  reason TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_credits_log_user_id ON credits_log(user_id);

-- ============================================
-- ROW LEVEL SECURITY
-- ============================================
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE marketplace_exports ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE credits_log ENABLE ROW LEVEL SECURITY;

-- Users can only see their own data
CREATE POLICY "Users can view own data" ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can view own projects" ON projects
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can view own project images" ON project_images
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM projects
      WHERE projects.id = project_images.project_id
      AND projects.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can view own project content" ON project_content
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM projects
      WHERE projects.id = project_content.project_id
      AND projects.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can view own exports" ON marketplace_exports
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM projects
      WHERE projects.id = marketplace_exports.project_id
      AND projects.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can view own AI jobs" ON ai_jobs
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM projects
      WHERE projects.id = ai_jobs.project_id
      AND projects.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can view own credits" ON credits_log
  FOR SELECT USING (auth.uid() = user_id);

-- ============================================
-- STORAGE BUCKET
-- ============================================
-- Run this in Supabase Storage dashboard or SQL:
-- INSERT INTO storage.buckets (id, name, public)
-- VALUES ('product-images', 'product-images', true);
