---
version: alpha
name: Luiz Filipe Portfolio
description: Portfólio UX/UI e Design Engineering para startups e negócios digitais: do Figma ao produto no ar.
colors:
  brand: "#EA1D2C"
  paper: "#FFFFFF"
  ink: "#1A1A1A"
  whatsapp: "#25D366"
typography:
  h1:
    fontFamily: Bricolage Grotesque
    fontSize: clamp(8rem, 28vh, 22rem)
    fontWeight: 800
    lineHeight: 0.85
    letterSpacing: -0.02em
  display-serif:
    fontFamily: DM Serif Display
    fontSize: 3.25rem
    fontWeight: 400
    lineHeight: 1.15
    letterSpacing: 0em
  h2:
    fontFamily: Bricolage Grotesque
    fontSize: 2.5rem
    fontWeight: 800
    lineHeight: 0.85
    letterSpacing: -0.02em
  h3:
    fontFamily: Bricolage Grotesque
    fontSize: 1.25rem
    fontWeight: 800
    lineHeight: 0.85
  body-md:
    fontFamily: Bricolage Grotesque
    fontSize: 1rem
    fontWeight: 400
    lineHeight: 1.6
  body-sm:
    fontFamily: Bricolage Grotesque
    fontSize: 0.875rem
    fontWeight: 400
    lineHeight: 1.5
  label-caps:
    fontFamily: Bricolage Grotesque
    fontSize: 0.75rem
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: 0.4em
rounded:
  sm: 8px
  md: 8px
  lg: 8px
  xl: 8px
  full: 8px
spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
components:
  button-primary:
    backgroundColor: "{colors.brand}"
    textColor: "{colors.paper}"
    borderRadius: "{rounded.full}"
    paddingX: "{spacing.lg}"
    paddingY: "{spacing.sm}"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.brand}"
    borderColor: "{colors.brand}"
    borderRadius: "{rounded.full}"
  card:
    backgroundColor: "{colors.paper}"
    borderColor: "{colors.brand}"
    borderRadius: "{rounded.xl}"
    padding: "{spacing.lg}"
---

# Luiz Filipe Portfolio: Design System

## Overview

Portfólio pessoal centrado em UX/UI e Design Engineering. A identidade segue o cartão de visita: fundo vermelho-laranja e o nome em branco, enorme, na vertical, cortado pela borda.

## Colors

- **Brand** (`#EA1D2C`): fundo das seções ímpares e títulos em seção branca.
- **Paper** (`#FFFFFF`): fundo das seções pares e texto grande (a partir de 24px, peso 800) sobre o vermelho.
- **Ink** (`#1A1A1A`): corpo de texto em seção branca. Em seção vermelha (`.section-brand`) o texto pequeno vira preto puro, porque `#1A1A1A` sobre `#EA1D2C` dá só 3,9:1 e o preto dá 4,7:1.
- **WhatsApp** (`#25D366`): só o botão e o ícone do WhatsApp.
- **Botões compactos** (`.btn-compact`, usado no Contato): 44px de altura, texto 19px bold (conta como texto grande para o contraste branco sobre vermelho).

Ritmo da home (nunca duas seções vermelhas seguidas): hero vermelho, sobre branco, áreas de atuação vermelho, posicionamento branco, marquee vermelho, habilidades branco, processo vermelho, projetos branco, statement vermelho, certificados branco, contato vermelho.

## Typography

- **Display:** Bricolage Grotesque 800, caixa alta, line-height 0.85, letter-spacing -0.02em. Nome do hero e títulos.
- **Rótulo:** Bricolage Grotesque 500, caixa alta, letter-spacing 0.4em, 12px.
- **Editorial:** DM Serif Display 400, na frase do hero e no statement.
- **Corpo:** Bricolage Grotesque 400.

## Components

- **Header:** barra branca com borda vermelha e cantos de 8px. O menu central continua recebendo clique (a moldura é `pointer-events-none`).
- **Hero:** `100svh`, fundo `#EA1D2C`. O `h1` "LUIZ" / "FILIPE" fica na vertical (de baixo para cima) no desktop e sangra pela direita e por baixo. No mobile o nome fica horizontal, em duas linhas, cortado na borda direita. A frase e o botão do WhatsApp ficam fora do nome.
- **Botões:** 8px. No branco, fundo vermelho e texto branco. No vermelho, fundo branco e texto vermelho. Hover inverte.

## Layout

Fluxo narrativo da home:

1. Hero
2. Sobre
3. Áreas de atuação (`#atuacao`)
4. Posicionamento
5. Marquee (ponte visual)
6. Habilidades
7. Processo
8. Projetos
9. Statement
10. Certificados
11. Contato

Cada seção usa uma linha-ponte (`SectionBridge`) para conectar com a anterior.

## Motion

Biblioteca: `motion` (Motion for React). Tokens em `src/components/motion/tokens.ts`.

- **Um só movimento:** fade + subida de 24px, easing `cubic-bezier(0.22, 1, 0.36, 1)`, 0.6s; listas em cascata de 70ms.
- **Hero:** o nome é tipografia estática. Os cards de serviço abaixo ainda entram em cascata.
- **Reduzir movimento:** animações globais caem para 0.01ms quando `prefers-reduced-motion` está ativo.
- **Seções (Posicionamento → Projetos):** `Reveal` / `RevealGroup` + `RevealItem`, repetem toda vez que a seção volta para a tela, inclusive o banner.
- **Abrir/fechar (cards de serviço):** mesma curva de easing, 0.5s.
- **Títulos de seção:** `RevealTitle` divide o título em palavras que sobem de trás de uma máscara (110% → 0, 0.9s, cascata de 60ms), repetindo a cada entrada na tela. O texto completo fica em `sr-only` para leitores de tela.
- `MotionConfig reducedMotion="user"` respeita "reduzir movimento" do sistema.
- **Mobile (< 768px):** o banner abre no lado branco e alterna com o painel vermelho (wipe por clip-path, 3,5s / 4,5s). As linhas de cards (Habilidades, Processo) viram carrossel automático em loop. Sem botão de pausa: a animação para enquanto o usuário toca/segura ou foca algo dentro dela, e some com "reduzir movimento".
- **Nome lateral no mobile:** proporção natural (sem esticar), `min(18svh, 40vw)`, de ponta a ponta da altura da tela: o espaçamento entre letras é calculado (`(100svh - tamanho × 4,45) / 11`) para completar a altura sem esticar; a base das letras sangra 24% para fora da borda direita para não espremer o conteúdo (desktop/tablet: sangria de 10%).
- **Carrossel de cards (Habilidades, Processo), todas as larguras:** loop automático de borda a borda da tela (largura medida em JS), sem corte visível; pausa no hover/toque/foco. Com "reduzir movimento" volta a ser uma fileira com rolagem.

## Do

- Manter a ordem narrativa ao adicionar seções.
- Usar tokens de cor e tipografia do YAML.
- Preservar conteúdo existente ao reorganizar.

## Don't

- Não remover informação do portfólio só por limpeza visual.
- Não quebrar âncoras `#posicionamento`, `#sobre`, `#habilidades`, `#processo`, `#projetos`, `#certificados`, `#contato`.
- Não usar Inter/Roboto como fonte principal.
