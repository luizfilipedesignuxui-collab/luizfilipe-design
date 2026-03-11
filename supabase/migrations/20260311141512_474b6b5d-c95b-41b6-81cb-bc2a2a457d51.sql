-- Atualizar o contexto do problema do projeto Pontuô
UPDATE public.projects 
SET contexto = 'Usuários de transporte público enfrentam diariamente desafios para encontrar rotas rápidas e confiáveis. Buscar o caminho mais eficiente para casa ou trabalho consome tempo e gera incerteza. O Pontuô resolve essa dor ao oferecer rotas otimizadas com agilidade, transformando a experiência de mobilidade urbana em algo simples e previsível.',
    updated_at = now()
WHERE slug = 'app-mobilidade-pontuo';