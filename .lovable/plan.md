

# Plano: Redesign inspirado na referência + ajustes solicitados

## Resumo das mudanças

### 1. Hero no estilo da referência
Redesenhar o Hero com layout similar: foto grande ao centro/lado, texto bold à esquerda, estatísticas à direita (como na imagem). Incluir 4 mini-serviços abaixo (User-Centered Design, Brand Identity, Responsive UI, Seamless Prototyping). Mudar "3+" para "2" anos de experiência. Remover o label "UX/UI Designer" que está muito acima.

### 2. Reordenar seções — "Sobre mim" primeiro
Mover AboutSection para logo após o Hero (antes do Marquee), sendo a primeira coisa que o usuário vê ao rolar.

### 3. Cores: azuis mais escuros/quentes + pontos de amarelo
- Escurecer os azuis (primary e secondary) nos CSS variables
- Adicionar uma cor amarelo/dourado (`--gold`) como accent pontual em badges, números, destaques e hover states

### 4. Tipografia mais impactante
Trocar estilo dos títulos para peso mais pesado, maior contraste. Usar letras maiúsculas em títulos-chave e espaçamento de letras mais aberto para prender a leitura.

### 5. Remover seção Design System (paleta de cores)
Remover `DesignSystemSection` completamente da página e do header nav.

### 6. Botões todos clicáveis
Garantir que todos os botões tenham `href` ou `Link` funcional. O botão "Ver todos os projetos" vai linkar para `/projetos`.

### 7. Projetos: remover exemplos vazios + criar página de projetos
- Limpar os dados placeholder de `projects.ts` (deixar array vazio, pois o usuário vai inserir os reais)
- Criar nova página `/projetos` que lista todos os projetos em grid
- Atualizar a seção de projetos na home para mostrar mensagem "Em breve" quando não houver projetos, ou exibir os reais quando adicionados
- Adicionar rota `/projetos` no App.tsx

## Arquivos a editar
1. `src/index.css` — azuis mais escuros + variável gold/amarelo
2. `src/components/HeroSection.tsx` — layout da referência com foto, stats, mini-serviços
3. `src/pages/Index.tsx` — reordenar (About primeiro), remover DesignSystemSection
4. `src/components/Header.tsx` — remover link "Design System" do nav
5. `src/components/AboutSection.tsx` — posicionamento ajustado
6. `src/components/ProjectsSection.tsx` — botão clicável para /projetos, lidar com lista vazia
7. `src/data/projects.ts` — limpar exemplos placeholder
8. `src/pages/Projects.tsx` — nova página listando todos os projetos
9. `src/App.tsx` — adicionar rota /projetos
10. `tailwind.config.ts` — adicionar cor gold

