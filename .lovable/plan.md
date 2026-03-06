

# Plano: Adicionar imagem do Pontuô e renomear primeiro projeto

## Mudanças

### 1. Copiar imagem para o projeto
Copiar `user-uploads://Free_iPhone_Hand_Mockup_Mockuuups_Studio.png` para `src/assets/pontuo-mockup.png`.

### 2. Atualizar dados do primeiro projeto em `src/data/projects.ts`
- Mudar `titulo` de "FinTrack — App Financeiro" para "Pontuô — App de Mobilidade Urbana"
- Mudar `slug` para "app-mobilidade-pontuo"
- Atualizar `descricao` para refletir mobilidade urbana
- Definir `imagem_capa` para usar a imagem importada
- Atualizar `tags` para ["Mobile", "Mobilidade", "UX Design"]

### 3. Ajustar importação da imagem
Como `imagem_capa` é uma string, importar a imagem no `projects.ts` e usar o caminho importado como valor.

### 4. Verificar que `ProjectsSection.tsx` e `CaseStudy.tsx` já renderizam `imagem_capa` quando preenchida
O código existente já tem lógica para exibir `project.imagem_capa` via `<img>` — apenas precisa do valor preenchido.

