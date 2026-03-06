

# Portfolio UX/UI — Luiz Filipe

## Visão Geral
Site portfólio premium, minimalista e tecnológico para UX/UI Designer, com estética inspirada em Apple, Stripe e Linear. Paleta baseada em tons de areia, teal e sea salt.

## Design System
- **Cores**: Background areia (#D6CFC6), primária Tropical Teal (#2E7C83), secundária Sea (#63B7C6), cards Sea Salt (#8FAFA4), texto cinza escuro
- **Tipografia**: Google Fonts — Space Grotesk para títulos, Inter para corpo de texto
- **Componentes**: Cards arredondados, sombras suaves, microinterações com hover e transições

## Páginas e Seções

### 1. Hero Section
- Nome, título "UX/UI Designer", subtítulo descritivo
- Dois CTAs: "Ver Projetos" e "Entrar em Contato"
- Placeholder para foto profissional com frame arredondado
- Fundo com formas abstratas/gradientes sutis

### 2. Sobre Mim
- Texto biográfico com layout lado a lado (texto + elemento visual)
- Informações de formação e filosofia de design

### 3. Habilidades
- Grid de 8 cards com ícones (UX Design, User Research, Wireframing, Prototipação, UI Design, Design System, Interaction Design, Product Thinking)
- Cada card com ícone, título e descrição curta

### 4. Processo de Design
- 7 etapas visualizadas em cards conectados: Descoberta → Pesquisa → Ideação → Wireframing → Prototipação → Testes → Entrega
- Ícones e descrições curtas por etapa

### 5. Projetos Selecionados
- Grid de cards com imagem de capa, nome, descrição e tags
- Dados dos projetos em arquivo separado para fácil adição de novos projetos
- Botão "Ver Projeto" em cada card e "Ver todos os projetos" ao final

### 6. Página de Case Study (rota dinâmica)
- Template reutilizável com seções: visão geral, problema, pesquisa, processo, wireframes, interface final, protótipo, resultados
- Navegação de volta ao portfólio
- Projetos definidos como dados estruturados para fácil expansão

### 7. Design System (seção visual)
- Exibição da paleta de cores, tipografia, botões, cards e componentes usados no site

### 8. Contato
- Título "Vamos criar algo incrível juntos"
- Links para email, LinkedIn e portfólio
- Botão de contato estilizado

## Navegação
- Header fixo com scroll suave entre seções
- Menu responsivo com hamburger no mobile

## Interações
- Animações de entrada (fade-in) ao scroll
- Hover com scale e sombra nos cards
- Transições suaves em toda navegação

## Responsividade
- Layout adaptativo para desktop, tablet e mobile
- Grid flexível nos cards de habilidades e projetos

## Estrutura de Dados
- Projetos armazenados em arquivo TypeScript separado (`data/projects.ts`) para facilitar adição de novos projetos sem alterar componentes

