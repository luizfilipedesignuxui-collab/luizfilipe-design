
-- Create app_role enum
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- Create user_roles table
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  UNIQUE (user_id, role)
);
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Security definer function for role checking
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role
  )
$$;

-- RLS for user_roles
CREATE POLICY "Users can view own roles" ON public.user_roles
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Only admins can manage roles" ON public.user_roles
  FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- Projects table (draft + published system)
CREATE TABLE public.projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  titulo TEXT NOT NULL,
  descricao TEXT NOT NULL DEFAULT '',
  imagem_capa TEXT DEFAULT '',
  categoria TEXT NOT NULL DEFAULT 'UX Design',
  ferramentas TEXT[] DEFAULT '{}',
  galeria_de_imagens TEXT[] DEFAULT '{}',
  contexto TEXT DEFAULT '',
  objetivo TEXT DEFAULT '',
  processo_research TEXT DEFAULT '',
  processo_wireframe TEXT DEFAULT '',
  processo_ui_design TEXT DEFAULT '',
  resultado TEXT DEFAULT '',
  tags TEXT[] DEFAULT '{}',
  link_projeto TEXT DEFAULT '',
  is_published BOOLEAN DEFAULT FALSE,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

-- Anyone can read published projects
CREATE POLICY "Anyone can view published projects" ON public.projects
  FOR SELECT USING (is_published = true);
-- Admins can do everything
CREATE POLICY "Admins can manage all projects" ON public.projects
  FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- Site content table (key-value for editable content)
CREATE TABLE public.site_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT NOT NULL UNIQUE,
  value TEXT NOT NULL DEFAULT '',
  is_published BOOLEAN DEFAULT FALSE,
  draft_value TEXT DEFAULT '',
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;

-- Anyone can read published content
CREATE POLICY "Anyone can view published content" ON public.site_content
  FOR SELECT USING (true);
-- Admins can manage
CREATE POLICY "Admins can manage content" ON public.site_content
  FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- Updated_at trigger function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_projects_updated_at
  BEFORE UPDATE ON public.projects
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_site_content_updated_at
  BEFORE UPDATE ON public.site_content
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Storage bucket for media uploads
INSERT INTO storage.buckets (id, name, public) VALUES ('media', 'media', true);

CREATE POLICY "Anyone can view media" ON storage.objects
  FOR SELECT USING (bucket_id = 'media');
CREATE POLICY "Admins can upload media" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'media' AND public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update media" ON storage.objects
  FOR UPDATE USING (bucket_id = 'media' AND public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete media" ON storage.objects
  FOR DELETE USING (bucket_id = 'media' AND public.has_role(auth.uid(), 'admin'));
