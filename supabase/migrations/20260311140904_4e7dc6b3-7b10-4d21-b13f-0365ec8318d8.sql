-- Atualizar a descrição do projeto Pontuô
UPDATE public.projects 
SET descricao = 'Aplicativo de mobilidade urbana que mostra as rotas mais rápidas de ônibus para o seu conforto. Conta com botão SOS especial para mulheres e emergências durante o trajeto. Nossa gamificação premia você: ganhe pontos a cada viagem e complete tarefas para desbloquear recompensas exclusivas.',
    updated_at = now()
WHERE slug = 'app-mobilidade-pontuo';