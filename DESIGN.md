---
version: alpha
name: Luiz Filipe Portfolio
description: Portfólio UX/UI e Design Engineering para startups e negócios digitais: do Figma ao produto no ar.
colors:
  brand: "#E85A24"
  brandHover: "#C44A1C"
  accent: "#F3B99B"
  paper: "#FFFFFF"
  ink: "#26211E"
  sand: "#FAF5F0"
  border: "#E8D5C7"
  muted: "#716761"
  success: "#536747"
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
    borderColor: "{colors.border}"
    borderRadius: "{rounded.xl}"
    padding: "{spacing.lg}"
---

# Luiz Filipe Portfolio: Design System

## Overview

Portfólio pessoal centrado em UX/UI e Design Engineering. A identidade **Tangerina Terrosa** é editorial e premium: branco predominante, areia nas seções de apoio e tangerina como assinatura — CTAs, títulos de seção, painel do hero e detalhes gráficos. O laranja não pinta o site inteiro.

## Colors

- **Brand / Tangerina Terrosa** (`#E85A24`): CTAs, títulos grandes em seção clara, ícones selecionados e o painel do hero. Texto e ícones sobre esta cor são brancos, em tamanho grande/bold (≥18,67px bold). Texto pequeno de marca sobre branco usa o hover.
- **Brand hover / Terracota** (`#C44A1C`): hover, foco e texto pequeno de marca sobre branco. Branco sobre hover passa.
- **Accent / Pêssego** (`#F3B99B`): aspas, bullets e detalhes decorativos. Nunca texto pequeno sobre branco.
- **Paper** (`#FFFFFF`): fundo predominante.
- **Ink / Grafite** (`#26211E`): títulos, corpo e navegação.
- **Sand / Areia** (`#FAF5F0`): `.section-brand`, cards de apoio. Muted (`#716761`) sobre areia dá ~4,39:1 — nessas seções o secundário vira Ink.
- **Border / Bege** (`#E8D5C7`): bordas, separadores e contornos.
- **Muted / Cinza quente** (`#716761`): texto secundário só sobre branco (~4,99:1).
- **Success / Verde oliva** (`#536747`): feedback positivo.
- **WhatsApp** (`#25D366`): só o botão e o ícone do WhatsApp, com letras e ícone brancos.
- **Botões compactos** (`.btn-compact`): 44px de altura, texto 19px bold. Preenchimento tangerina com texto e ícones brancos.

Ritmo da home (branco e areia se alternam): hero branco + painel tangerina, sobre branco, áreas areia, posicionamento branco, marquee tangerina (`#E85A24`, o mesmo tom do painel do hero), habilidades branco, processo areia, projetos branco, statement areia, certificados branco, contato areia.

## Typography

- **Display:** Bricolage Grotesque 800, caixa alta, line-height 0.85, letter-spacing -0.02em. Nome do hero e títulos.
- **Rótulo:** Bricolage Grotesque 500, caixa alta, letter-spacing 0.4em, 12px.
- **Editorial:** DM Serif Display 400, na frase do hero e no statement.
- **Corpo:** Bricolage Grotesque 400.

## Components

- **Header:** barra branca com borda bege e cantos de 8px. O menu central continua recebendo clique (a moldura é `pointer-events-none`).
- **Hero:** `100svh`, lado branco com frase editorial e CTAs; painel `.hero-panel` em `#E85A24`. O `h1` "LUIZ" / "FILIPE" fica na vertical (de baixo para cima) no desktop e sangra pela direita e por baixo. No mobile o nome fica horizontal, em duas linhas, cortado na borda direita. A frase e o botão do WhatsApp ficam fora do nome.
- **Botões:** 8px. Primário: fundo tangerina, texto e ícones brancos. Hover terracota, texto branco. Secundário: contorno tangerina e texto tangerina; hover preenchido com texto branco.

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
- **Mobile (< 768px):** o banner abre no lado branco e alterna com o painel tangerina (wipe por clip-path, 3,5s / 4,5s). A linha de cards do Processo vira carrossel automático em loop. Sem botão de pausa: a animação para enquanto o usuário toca/segura ou foca algo dentro dela, e some com "reduzir movimento".
- **Nome lateral no mobile:** proporção natural (sem esticar), `min(18svh, 40vw)`, de ponta a ponta da altura da tela: o espaçamento entre letras é calculado (`(100svh - tamanho × 4,45) / 11`) para completar a altura sem esticar; a base das letras sangra 24% para fora da borda direita. O `--name-gutter` extra só entra no tablet/desktop — no mobile o padding lateral fica simétrico para foto, cards, faixa e rodapé não parecerem deslocados.
- **Cards de Habilidades:** grade estática (sem loop), para não competir com os títulos animados da faixa de posicionamento.
- **Carrossel de cards (Processo):** loop automático de borda a borda da tela (largura medida em JS), sem corte visível; pausa no hover/toque/foco. Com "reduzir movimento" vira grade estática.

## Do

- Manter a ordem narrativa ao adicionar seções.
- Usar tokens de cor e tipografia do YAML.
- Preservar conteúdo existente ao reorganizar.
- Reservar a tangerina para assinatura visual, não para fundos de seção inteiros.

## Don't

- Não remover informação do portfólio só por limpeza visual.
- Não quebrar âncoras `#posicionamento`, `#sobre`, `#habilidades`, `#processo`, `#projetos`, `#certificados`, `#contato`.
- Não usar Inter/Roboto como fonte principal.
- Não usar texto branco pequeno sobre `#E85A24`.
- Não usar `#716761` sobre `#FAF5F0`.
- Não usar `#F3B99B` como texto pequeno sobre branco.
