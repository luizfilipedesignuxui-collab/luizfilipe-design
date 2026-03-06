

# Plano: Lightbox na galeria, corrigir capa e renomear FigJam

## 1. Lightbox nas imagens da galeria (CaseStudy.tsx)
Adicionar um Dialog (já disponível via Radix) que abre ao clicar em qualquer imagem da seção "Telas do Projeto". A imagem será exibida em tamanho grande com fundo escuro e botão de fechar.

- Usar estado local para controlar qual imagem está aberta
- Importar `Dialog` de `@/components/ui/dialog`
- Cada imagem da galeria vira clicável com cursor pointer

## 2. Corrigir imagem de capa cortada
- **ProjectsSection.tsx** (linha 58): trocar `object-cover` por `object-contain` e adicionar `bg-primary/5` para manter o fundo
- **CaseStudy.tsx**: a capa já usa `object-contain`, está ok

## 3. Renomear "FigJam" → "Figma Make"
Dois arquivos afetados:
- **src/data/projects.ts**: nas `ferramentas` (linhas 34, 72, 110) e no texto do `processo.wireframe` (linha 40)
- **src/components/AboutSection.tsx**: no array `tools` (linha 11, name "FigJam" → "Figma Make")

