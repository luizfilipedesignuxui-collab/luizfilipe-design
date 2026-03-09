
-- Drop ALL existing policies on site_content
DROP POLICY IF EXISTS "Anyone can view published content" ON public.site_content;
DROP POLICY IF EXISTS "Admins can manage content" ON public.site_content;

-- Recreate as PERMISSIVE (explicitly)
CREATE POLICY "Public can view published content"
  ON public.site_content FOR SELECT
  TO public
  USING (is_published = true);

CREATE POLICY "Admins can manage all content"
  ON public.site_content FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::public.app_role))
  WITH CHECK (public.has_role(auth.uid(), 'admin'::public.app_role));

-- Drop ALL existing policies on projects
DROP POLICY IF EXISTS "Anyone can view published projects" ON public.projects;
DROP POLICY IF EXISTS "Admins can manage all projects" ON public.projects;

-- Recreate as PERMISSIVE (explicitly)
CREATE POLICY "Public can view published projects"
  ON public.projects FOR SELECT
  TO public
  USING (is_published = true);

CREATE POLICY "Admins can manage all projects"
  ON public.projects FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::public.app_role))
  WITH CHECK (public.has_role(auth.uid(), 'admin'::public.app_role));
