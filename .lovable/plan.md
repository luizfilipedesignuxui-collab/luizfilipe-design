

# Plano: Navegação no lightbox, ajustar imagem iPad e corrigir capa na página de projetos

## 1. Botões de navegação no lightbox (CaseStudy.tsx)
- Trocar o estado `lightboxImg` de `string | null` para `number | null` (índice da imagem)
- Adicionar botões de seta esquerda/direita (ChevronLeft, ChevronRight) no Dialog para navegar entre imagens
- Esconder seta esquerda na primeira imagem e direita na última

## 2. Ajustar imagem do iPad na galeria (CaseStudy.tsx)
- Adicionar padding interno nas imagens da galeria para que o mockup do iPad fique mais visível (ex: `p-4` no container da imagem)

## 3. Corrigir capa cortada na página `/projetos` (Projects.tsx)
- Linha 51: trocar `object-cover` por `object-contain` para que a imagem de capa não seja cortada (mesmo padrão já aplicado em ProjectsSection.tsx)

