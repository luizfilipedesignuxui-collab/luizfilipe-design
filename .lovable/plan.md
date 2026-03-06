

# Plano: Adicionar segunda imagem ao projeto Pontuô

## Mudanças

### 1. Copiar imagem para o projeto
Salvar `user-uploads://Man_holding_iPhone_15_Pro_mockup_Mockuuups_Studio.png` como `src/assets/pontuo-mockup-2.png`.

### 2. Atualizar `src/data/projects.ts`
- Importar a nova imagem como `pontuoMockup2`
- Adicionar ao array `galeria_de_imagens` do projeto Pontuô (atualmente vazio)

### 3. Ajuste no `CaseStudy.tsx`
- A galeria já renderiza imagens quando `galeria_de_imagens.length > 0`
- Alterar as imagens da galeria para usar `object-contain` e altura automática (mesmo padrão da capa) para não cortar mockups

