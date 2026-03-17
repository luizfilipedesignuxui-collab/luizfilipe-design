
ALTER TABLE public.projects
  ADD COLUMN IF NOT EXISTS titulo_en TEXT,
  ADD COLUMN IF NOT EXISTS descricao_en TEXT,
  ADD COLUMN IF NOT EXISTS categoria_en TEXT,
  ADD COLUMN IF NOT EXISTS contexto_en TEXT,
  ADD COLUMN IF NOT EXISTS objetivo_en TEXT,
  ADD COLUMN IF NOT EXISTS resultado_en TEXT,
  ADD COLUMN IF NOT EXISTS processo_research_en TEXT,
  ADD COLUMN IF NOT EXISTS processo_wireframe_en TEXT,
  ADD COLUMN IF NOT EXISTS processo_ui_design_en TEXT;
