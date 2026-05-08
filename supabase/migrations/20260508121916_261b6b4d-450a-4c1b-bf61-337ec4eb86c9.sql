UPDATE projects SET
  titulo = REPLACE(titulo, ' — ', ': '),
  descricao = REPLACE(descricao, ' — ', ', '),
  contexto = REPLACE(contexto, ' — ', ', '),
  objetivo = REPLACE(objetivo, ' — ', ', '),
  processo_research = REPLACE(processo_research, ' — ', ', '),
  processo_wireframe = REPLACE(processo_wireframe, ' — ', ', '),
  processo_ui_design = REPLACE(processo_ui_design, ' — ', ', '),
  resultado = REPLACE(resultado, ' — ', ', '),
  titulo_en = REPLACE(titulo_en, ' — ', ': '),
  descricao_en = REPLACE(descricao_en, ' — ', ', '),
  contexto_en = REPLACE(contexto_en, ' — ', ', '),
  objetivo_en = REPLACE(objetivo_en, ' — ', ', '),
  resultado_en = REPLACE(resultado_en, ' — ', ', '),
  processo_research_en = REPLACE(processo_research_en, ' — ', ', '),
  processo_wireframe_en = REPLACE(processo_wireframe_en, ' — ', ', '),
  processo_ui_design_en = REPLACE(processo_ui_design_en, ' — ', ', ')
WHERE slug = 'gabriel-augusto-psicanalista';