

# Incorporar elementos das duas referências no portfólio

## Elementos identificados nas referências

**Referência 1** (estilo editorial/agency bold):
- Tipografia extra-grande e impactante nos títulos
- Estatísticas em destaque (números grandes: anos de experiência, projetos, etc.)
- Marquee/texto rolante horizontal
- Seções com fundo escuro contrastando com claro
- Layout assimétrico e editorial

**Referência 2** (estilo galeria/portfólio clean):
- Grid de projetos com imagens grandes e hover elegante
- Seção de serviços com cards minimalistas e numeração
- Depoimentos/testimonials
- Faixa de logos/marcas com quem trabalhou
- Footer elaborado com colunas

## Mudanças planejadas

### 1. Hero — Tipografia bold + estatísticas
- Título muito maior (text-7xl → text-8xl/9xl) com peso ultra-bold
- Adicionar faixa de estatísticas abaixo do hero: "5+ Projetos", "3+ Anos", "100% Dedicação"
- Subtítulo mais curto e direto

### 2. Marquee animado (novo componente)
- Faixa horizontal com texto rolante entre Hero e Sobre: "UX DESIGN • UI DESIGN • PRODUCT THINKING • DESIGN SYSTEM •"
- Fundo teal, texto branco, animação CSS infinita

### 3. About — Layout editorial
- Números grandes em destaque ao lado do texto (estilo ref 1)
- Layout mais assimétrico com tipografia variada

### 4. Skills — Cards numerados estilo ref 2
- Adicionar numeração grande (01, 02, 03...) em cada card
- Layout 2 colunas com mais espaço

### 5. Projetos — Grid com hover overlay
- Imagens maiores, hover com overlay escuro + texto que aparece
- Layout alternando tamanhos (1 grande + 2 pequenos)

### 6. Seção escura (novo)
- Uma seção com fundo escuro (teal/foreground) entre Processo e Projetos
- Citação ou statement de design em tipografia grande
- Contraste visual forte

### 7. Cores mais vivas
- Aumentar saturação das cores HSL em ~15-20 pontos
- Teal mais vibrante, Sea mais saturado, Sea Salt mais vivo

### 8. Footer elaborado
- Footer com colunas: navegação, redes sociais, contato
- Tipografia grande no nome

## Arquivos a editar
1. `src/index.css` — cores mais vivas + animação marquee
2. `src/components/HeroSection.tsx` — tipografia bold + stats
3. `src/components/MarqueeSection.tsx` — novo componente
4. `src/components/AboutSection.tsx` — layout editorial
5. `src/components/SkillsSection.tsx` — cards numerados
6. `src/components/ProjectsSection.tsx` — grid com hover overlay
7. `src/components/ProcessSection.tsx` — refinamentos
8. `src/components/StatementSection.tsx` — novo, seção escura com citação
9. `src/components/Footer.tsx` — footer elaborado
10. `src/pages/Index.tsx` — adicionar novos componentes

