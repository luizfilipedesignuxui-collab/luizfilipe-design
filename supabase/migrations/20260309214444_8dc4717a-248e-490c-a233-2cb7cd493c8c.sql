
-- Drop restrictive policies
DROP POLICY IF EXISTS "Anyone can view published content" ON public.site_content;
DROP POLICY IF EXISTS "Admins can manage content" ON public.site_content;

-- Recreate as PERMISSIVE (default)
CREATE POLICY "Anyone can view published content"
  ON public.site_content FOR SELECT
  USING (is_published = true);

CREATE POLICY "Admins can manage content"
  ON public.site_content FOR ALL
  TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Same fix for projects table
DROP POLICY IF EXISTS "Anyone can view published projects" ON public.projects;
DROP POLICY IF EXISTS "Admins can manage all projects" ON public.projects;

CREATE POLICY "Anyone can view published projects"
  ON public.projects FOR SELECT
  USING (is_published = true);

CREATE POLICY "Admins can manage all projects"
  ON public.projects FOR ALL
  TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));
