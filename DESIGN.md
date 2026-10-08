---
version: alpha
name: Luiz Filipe Portfolio
description: Portfólio UX/UI e Design Engineering para startups e negócios digitais: do Figma ao produto no ar.
colors:
  primary: "#121D30"
  secondary: "#356080"
  tertiary: "#F69E4C"
  accent-ink: "#984D1B"
  accent-display: "#CB6724"
  neutral: "#F1F5F9"
  sky: "#D5E2F0"
  success: "#16A34A"
  warning: "#CA8A04"
  error: "#DC2626"
typography:
  h1:
    fontFamily: Sora
    fontSize: 3rem
    fontWeight: 800
    lineHeight: 1.05
    letterSpacing: -0.03em
  display-serif:
    fontFamily: Instrument Serif
    fontSize: 3.5rem
    fontWeight: 400
    lineHeight: 0.95
    letterSpacing: -0.01em
  h2:
    fontFamily: Sora
    fontSize: 2.5rem
    fontWeight: 800
    lineHeight: 1.15
  h3:
    fontFamily: Sora
    fontSize: 1.25rem
    fontWeight: 700
    lineHeight: 1.3
  body-md:
    fontFamily: DM Sans
    fontSize: 1rem
    fontWeight: 400
    lineHeight: 1.6
  body-sm:
    fontFamily: DM Sans
    fontSize: 0.875rem
    fontWeight: 400
    lineHeight: 1.5
  label-caps:
    fontFamily: Sora
    fontSize: 0.75rem
    fontWeight: 600
    lineHeight: 1.33
    letterSpacing: 0.1em
rounded:
  sm: 8px
  md: 12px
  lg: 16px
  xl: 24px
  full: 9999px
spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "#FFFFFF"
    borderRadius: "{rounded.full}"
    paddingX: "{spacing.lg}"
    paddingY: "{spacing.sm}"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.primary}"
    borderColor: "{colors.primary}"
    borderRadius: "{rounded.full}"
  card:
    backgroundColor: "#FFFFFF"
    borderColor: "#C9D0D8"
    borderRadius: "{rounded.xl}"
    padding: "{spacing.lg}"
---

# Luiz Filipe Portfolio: Design System

## Overview

Portfólio pessoal centrado em um nicho: UX/UI e Design Engineering (Figma → React) para startups e negócios digitais que precisam de produtos claros e prontos para converter. Fluxo: hero → sobre → capacidades → método → cases → formação → contato.

Rebranding (out/2026): estética "céu claro + vidro". Fundo em gradiente azul-céu, cards de vidro (`.glass-card`), header flutuante em pílula e hero com foto P&B ao centro, cercada por cards de projetos clicáveis e por um anel de órbita (linha branca + tracejada) visível em todos os tamanhos de tela.

## Colors

- **Primary** (`#121D30`): navy quase preto: texto principal e CTA sólido.
- **Secondary** (`#356080`): azul de apoio. Escuro o bastante para texto branco em botão (contraste AA) e para ícones em fundo claro.
- **Accent / tertiary** (`#F69E4C`): laranja da marca. Vale para preenchimento e para texto sobre o azul-marinho. Em fundo claro o texto usa **accent-ink** (`#984D1B`), que passa 4,5:1.
- **Sky** (`#D5E2F0`): topo do gradiente do hero (`.bg-sky-hero`).
- **Neutral** (`#F1F5F9`): fundo da página.

## Typography

- **Display:** Sora (títulos e marca).
- **Display serif:** Instrument Serif itálica, reservada para destaques pontuais.
- **Nome no hero:** `h1` em Sora bold; "Luiz Filipe." em accent-display (`#CB6724`). É texto grande, então o contraste exigido é 3:1. O laranja mais escuro (`#984D1B`) fica nos textos pequenos.
- **Body:** DM Sans (parágrafos e UI).

## Components

- **Header:** moldura em pílula translúcida; logo e CTA "Falar comigo" em pílulas brancas nas pontas; aba central "pendurada" com laterais curvas (lg+) contendo Sobre ▾, Trabalho ▾ (dropdowns), Projetos e idioma.
- **Hero orbit:** anel 3D colado à cabeça: 2 painéis verticais com capa de projeto nas laterais, 3 chips de projeto (sobre o cabelo, junto ao queixo e ao lado do rosto) e lâminas de vidro decorativas; cada card de projeto é um link para o case.

## Layout

Fluxo narrativo da home:

1. Hero
2. Sobre
3. Posicionamento (card)
4. Marquee (ponte visual)
5. Habilidades
6. Processo
7. Statement
8. Projetos
9. Certificados
10. Contato

Cada seção usa uma linha-ponte (`SectionBridge`) para conectar com a anterior.

## Motion

Biblioteca: `motion` (Motion for React). Tokens em `src/components/motion/tokens.ts`.

- **Um só movimento:** fade + subida de 24px, easing `cubic-bezier(0.22, 1, 0.36, 1)`, 0.6s; listas em cascata de 70ms.
- **Hero:** entra ao carregar, em sequência — nome → foto → cards em órbita → cards de serviço.
- **Partículas da foto do hero:** `src/components/hero/HeroParticles.tsx` (WebGL, `PARTICLE_CONFIG`). A própria foto se desfaz em pontos com as cores dos pixels, que se espalham, reagem ao mouse e reconstroem a imagem (~4s, só na entrada). Com "reduzir movimento" ativo, a foto aparece estática.
- **Seções (Posicionamento → Projetos):** `Reveal` / `RevealGroup` + `RevealItem`, disparam uma única vez ao entrar na tela.
- **Abrir/fechar (cards de serviço):** mesma curva de easing, 0.5s.
- `MotionConfig reducedMotion="user"` respeita "reduzir movimento" do sistema.

## Do

- Manter a ordem narrativa ao adicionar seções.
- Usar tokens de cor e tipografia do YAML.
- Preservar conteúdo existente ao reorganizar.

## Don't

- Não remover informação do portfólio só por limpeza visual.
- Não quebrar âncoras `#posicionamento`, `#sobre`, `#habilidades`, `#processo`, `#projetos`, `#certificados`, `#contato`.
- Não usar Inter/Roboto como fonte principal.
