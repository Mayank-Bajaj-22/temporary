-- ====================================================================
-- BUDDHAHOME SUPABASE DATABASE SCHEMA & SECURITY POLICIES
-- ====================================================================
-- Run this script in your Supabase SQL Editor (Dashboard > SQL Editor)
-- It creates tables, indexes, triggers, Row Level Security (RLS) policies,
-- storage bucket configuration, and seed data.
-- ====================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. ADMIN USERS TABLE (Explicit Admin Authorization Table)
-- Only verified administrators listed here or with app_metadata->>'role' = 'admin'
-- can perform write operations on products and categories.
CREATE TABLE IF NOT EXISTS public.admin_users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- Only existing admins or service_role can read or manage admin_users
CREATE POLICY "Admins can view admin_users list"
  ON public.admin_users
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (SELECT 1 FROM public.admin_users WHERE id = auth.uid()) OR
    (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
  );

-- 3. SECURITY DEFINER HELPER: is_admin()
-- Checks either the dedicated admin_users table OR the secure app_metadata claim.
-- Standard user-editable user_metadata is intentionally IGNORED.
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
STABLE
AS $$
  SELECT 
    (auth.role() = 'service_role') OR
    (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin' OR
    EXISTS (
      SELECT 1 FROM public.admin_users WHERE id = auth.uid()
    );
$$;

-- 4. CATEGORIES TABLE
CREATE TABLE IF NOT EXISTS public.categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  image_path TEXT,
  sort_order INTEGER DEFAULT 0 NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_categories_slug ON public.categories(slug);
CREATE INDEX IF NOT EXISTS idx_categories_sort_order ON public.categories(sort_order);

-- 5. PRODUCTS TABLE
CREATE TABLE IF NOT EXISTS public.products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  price NUMERIC(10, 2) DEFAULT 0 CHECK (price >= 0),
  category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
  category_name TEXT,
  category_slug TEXT,
  images TEXT[] DEFAULT '{}'::TEXT[] NOT NULL,
  details JSONB DEFAULT '{}'::JSONB NOT NULL,
  featured BOOLEAN DEFAULT false NOT NULL,
  is_new_arrival BOOLEAN DEFAULT false NOT NULL,
  available BOOLEAN DEFAULT true NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_products_slug ON public.products(slug);
CREATE INDEX IF NOT EXISTS idx_products_category_slug ON public.products(category_slug);
CREATE INDEX IF NOT EXISTS idx_products_featured ON public.products(featured);
CREATE INDEX IF NOT EXISTS idx_products_available ON public.products(available);
CREATE INDEX IF NOT EXISTS idx_products_created_at ON public.products(created_at DESC);

-- 6. AUTOMATIC UPDATED_AT TRIGGER
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trigger_categories_updated_at ON public.categories;
CREATE TRIGGER trigger_categories_updated_at
  BEFORE UPDATE ON public.categories
  FOR EACH ROW
  EXECUTE FUNCTION public.set_updated_at();

DROP TRIGGER IF EXISTS trigger_products_updated_at ON public.products;
CREATE TRIGGER trigger_products_updated_at
  BEFORE UPDATE ON public.products
  FOR EACH ROW
  EXECUTE FUNCTION public.set_updated_at();

-- 7. ROW LEVEL SECURITY (RLS) POLICIES

-- Enable RLS
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- CATEGORIES POLICIES
-- Anyone (authenticated or public visitor) can view categories
CREATE POLICY "Public can view categories"
  ON public.categories
  FOR SELECT
  TO public
  USING (true);

-- Only verified admins can insert, update, or delete categories
CREATE POLICY "Admins can insert categories"
  ON public.categories
  FOR INSERT
  TO authenticated
  WITH CHECK (public.is_admin());

CREATE POLICY "Admins can update categories"
  ON public.categories
  FOR UPDATE
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

CREATE POLICY "Admins can delete categories"
  ON public.categories
  FOR DELETE
  TO authenticated
  USING (public.is_admin());

-- PRODUCTS POLICIES
-- Public visitors can only view products marked available = true
-- Authenticated admins can view ALL products (available and unavailable)
CREATE POLICY "Public can view available products"
  ON public.products
  FOR SELECT
  TO public
  USING (available = true OR public.is_admin());

-- Only verified admins can create products
CREATE POLICY "Admins can insert products"
  ON public.products
  FOR INSERT
  TO authenticated
  WITH CHECK (public.is_admin());

-- Only verified admins can update products
CREATE POLICY "Admins can update products"
  ON public.products
  FOR UPDATE
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- Only verified admins can delete products
CREATE POLICY "Admins can delete products"
  ON public.products
  FOR DELETE
  TO authenticated
  USING (public.is_admin());

-- 8. STORAGE BUCKET CONFIGURATION FOR PRODUCT IMAGES
-- Inserts the public storage bucket if it does not already exist
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'product-images',
  'product-images',
  true,
  5242880, -- 5 MB limit
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/avif', 'image/svg+xml']
)
ON CONFLICT (id) DO UPDATE SET
  public = true,
  file_size_limit = 5242880,
  allowed_mime_types = ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/avif', 'image/svg+xml'];

-- Storage RLS: Public can view images
CREATE POLICY "Public can view product images"
  ON storage.objects
  FOR SELECT
  TO public
  USING (bucket_id = 'product-images');

-- Storage RLS: Only admins can upload images
CREATE POLICY "Admins can upload product images"
  ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (
    bucket_id = 'product-images' AND
    public.is_admin()
  );

-- Storage RLS: Only admins can update product images
CREATE POLICY "Admins can update product images"
  ON storage.objects
  FOR UPDATE
  TO authenticated
  USING (bucket_id = 'product-images' AND public.is_admin())
  WITH CHECK (bucket_id = 'product-images' AND public.is_admin());

-- Storage RLS: Only admins can delete product images
CREATE POLICY "Admins can delete product images"
  ON storage.objects
  FOR DELETE
  TO authenticated
  USING (bucket_id = 'product-images' AND public.is_admin());

-- ====================================================================
-- INITIAL ADMINISTRATOR AUTHORIZATION INSTRUCTIONS
-- ====================================================================
-- To authorize an administrator:
-- 1. Create a user via Supabase Dashboard > Authentication > Users > "Add user" (or sign in via app).
-- 2. Run the SQL below with the administrator's user UUID:
--
-- INSERT INTO public.admin_users (id, email)
-- VALUES ('<USER_UUID_FROM_AUTH_USERS>', 'admin@buddhahome.in')
-- ON CONFLICT (id) DO NOTHING;
-- ====================================================================
