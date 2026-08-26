---
version: alpha
name: Luiz Filipe Portfolio
description: Portfólio UX/UI e Design Engineering — narrativa clara para recrutadores e clientes.
colors:
  primary: "#0F2A4A"
  secondary: "#285A8C"
  tertiary: "#F0C93A"
  neutral: "#F0F2F5"
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

# Luiz Filipe Portfolio — Design System

## Overview

Portfólio pessoal de UX/UI Designer e Design Engineer. A página inicial conta uma história contínua: quem sou → o que entrego → como trabalho → cases → formação → contato.

## Colors

- **Primary** (`#0F2A4A`): navy — CTAs, títulos de destaque e ênfase.
- **Accent / tertiary** (`#F0C93A`): amarelo — marca no hero e destaques.
- **Neutral** (`#F0F2F5`): fundo claro da página.

## Typography

- **Display:** Sora (títulos e marca).
- **Body:** DM Sans (parágrafos e UI).

## Layout

Fluxo narrativo da home:

1. Hero
2. Sobre
3. Marquee (ponte visual)
4. Habilidades
5. Processo
6. Statement
7. Projetos
8. Certificados
9. Contato

Cada seção usa uma linha-ponte (`SectionBridge`) para conectar com a anterior.

## Do

- Manter a ordem narrativa ao adicionar seções.
- Usar tokens de cor e tipografia do YAML.
- Preservar conteúdo existente ao reorganizar.

## Don't

- Não remover informação do portfólio só por limpeza visual.
- Não quebrar âncoras `#sobre`, `#habilidades`, `#processo`, `#projetos`, `#certificados`, `#contato`.
- Não usar Inter/Roboto como fonte principal.
