---
version: alpha
name: Cartão Luiz Filipe
description: Cartão digital de Luiz Filipe. A estrutura segue o cartão de referência. As cores e a tipografia são a identidade do portfólio.
colors:
  bg: "#E85A24"
  surface: "#FFFFFF"
  surface-raised: "#FFFFFF"
  media: "#E85A24"
  ink: "#26211E"
  cream: "#FFFFFF"
  muted: "#716761"
  link: "#C44A1C"
  accent: "#C44A1C"
  accent-ink: "#FFFFFF"
  line: "#E8D5C7"
  qr-paper: "#FFFFFF"
  qr-ink: "#000000"
  focus: "#FFFFFF"
  brand-linkedin: "#0A66C2"
  brand-whatsapp: "#25D366"
typography:
  display:
    fontFamily: Bricolage Grotesque
    fontSize: 4.8rem
    fontWeight: 600
    lineHeight: 1
    letterSpacing: -0.045em
  h2:
    fontFamily: Bricolage Grotesque
    fontSize: 1.35rem
    fontWeight: 600
    lineHeight: 1.15
    letterSpacing: -0.02em
  h3:
    fontFamily: Bricolage Grotesque
    fontSize: 0.75rem
    fontWeight: 500
    lineHeight: 1.3
  body-md:
    fontFamily: Bricolage Grotesque
    fontSize: 0.95rem
    fontWeight: 400
    lineHeight: 1.45
  body-sm:
    fontFamily: Bricolage Grotesque
    fontSize: 0.8125rem
    fontWeight: 400
    lineHeight: 1.4
  label-caps:
    fontFamily: Bricolage Grotesque
    fontSize: 0.75rem
    fontWeight: 500
    lineHeight: 1.3
rounded:
  sm: 14px
  md: 22px
  lg: 32px
  xl: 32px
  full: 9999px
spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 20px
  xl: 28px
  xxl: 36px
components:
  card:
    backgroundColor: "{colors.bg}"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
    padding: "{spacing.xl}"
  button-primary:
    backgroundColor: "{colors.cream}"
    textColor: "{colors.ink}"
    rounded: "{rounded.full}"
    padding: 16px
  button-on-cream:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.cream}"
    rounded: "{rounded.full}"
    padding: 16px
  button-outline:
    backgroundColor: "{colors.cream}"
    textColor: "{colors.cream}"
    rounded: "{rounded.full}"
    padding: 16px
  button-action:
    backgroundColor: "{colors.surface-raised}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
  button-icon:
    backgroundColor: "{colors.media}"
    textColor: "{colors.cream}"
    rounded: "{rounded.full}"
  button-channel:
    backgroundColor: "{colors.brand-linkedin}"
    textColor: "{colors.cream}"
    rounded: "{rounded.full}"
  button-linkedin:
    backgroundColor: "{colors.brand-linkedin}"
    textColor: "{colors.cream}"
    rounded: "{rounded.full}"
  card-qr:
    backgroundColor: "{colors.qr-paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
    padding: "{spacing.lg}"
  photo-slot:
    backgroundColor: "{colors.surface-raised}"
    textColor: "{colors.muted}"
    rounded: "{rounded.full}"
  glass:
    backgroundColor: "{colors.surface-raised}"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
---

# Cartão Luiz Filipe

## Overview

Cartão digital na mesma estrutura da referência: entrada, identidade e contato. A identidade visual é a do portfólio: tangerina `#E85A24`, terracota `#C44A1C`, grafite `#26211E` e branco `#FFFFFF`. O fundo do cartão é a tangerina. Nome, cargo e rótulos vão em branco, em negrito e com pelo menos 19px. QR, fatos e contato ficam em blocos brancos com texto grafite. O nome aparece em uma linha, em Bricolage Grotesque.

## Colors

- **bg / media:** tangerina `#E85A24`. Fundo de todas as telas do cartão. O mesmo tom do painel do hero e da foto.
- **cream:** branco. Texto sobre a tangerina e botão principal.
- **ink:** grafite `#26211E`. Texto dentro dos blocos brancos.
- **accent / link:** terracota `#C44A1C`. Destaque e texto pequeno de marca sobre branco.
- **muted:** `#716761`. Texto auxiliar só sobre branco.
- **line:** bege `#E8D5C7`. Contorno dos cards.
- **qr-paper / qr-ink:** branco e preto, para leitura do código.

## Typography

Bricolage Grotesque. Na entrada, o nome ocupa uma linha, em semibold. Cargo e rótulos ficam em medium, no mínimo 19px, para o branco sobre a tangerina continuar legível.

## Shapes

QR com raio de 32px. Ícones em círculo branco. Botão principal em cápsula branca sobre a tangerina. Fundo tangerina, com traços finos de ferramentas de desenho atrás do conteúdo. Informações em cartão branco. O nome entra em texto, numa linha.

## Components

- **button-primary:** cápsula branca sobre a tangerina.
- **button-on-cream:** cápsula grafite sobre o bloco branco.
- **button-outline:** cápsula secundária na tangerina, com borda branca e fundo branco translúcido. Usada em Voltar e nos botões do mesmo modelo.
- **button-channel:** bolinha com a marca do canal. O toque abre o bloco branco com o dado e o botão de ação.
- **button-linkedin:** cápsula azul do LinkedIn no convite.
- **card-qr:** placa branca compacta sobre a tangerina, com um movimento leve na entrada.
- **glass:** bloco branco das informações.
- **photo-slot:** foto do portfólio, recorte circular com o rosto.

## Layout & spacing

Mobile first. O fundo traz traços finos, em branco translúcido, da marca do Figma e de uma caneta de desenho, atrás do conteúdo. Na entrada, a foto fica acima do nome, sem cobri-lo. O QR abre a página de acessos, com LinkedIn, WhatsApp, e-mail, portfólio e vendas. Salvar cartão gera a imagem para a galeria do celular. Abaixo do cartão branco há um cadeado para a área do proprietário, protegida por senha. Voltar e Contato ficam na faixa de baixo da seção, sem cobrir os cards. O fato atual fica num bloco branco abaixo da foto, com o texto completo visível. No contato, a lista rola por dentro da tela e Voltar e Contato ficam fixos abaixo dela, sem cobrir os cards. Quem abre o QR cai na conexão, no mesmo cartão. Ver o restante do cartão abre a identidade, não a entrada. Voltar para a primeira tela existe só no contato. Se o convite for mais alto que a tela, a página rola por dentro, sem travar o cursor.

## Motion

O cartão pousa na mesa: escala e um leve `rotateX`, sem esconder a foto. A foto dá um spring curto. Nome, ações e QR entram em cascata. O QR flutua 6px. Os traços do fundo se deslocam bem devagar. Trocas de tela sobem e saem para cima. Toque escala para 0.97. Com `prefers-reduced-motion`, tudo para.

## Accessibility

Camada WCAG 2.2 AA: texto branco em negrito, a partir de 19px, sobre a tangerina; texto grafite sobre os blocos brancos. Foco visível de 3px, alvos de toque com 44px, cápsulas de 52px, um título por tela, atalhos de teclado no carrossel, pausa de movimento e anúncio de status para leitor de tela. `#716761` só sobre branco.

## Do / Don't

- **Do:** repetir a tangerina da entrada; foto, nome e cargo no cartão branco, sem repetir a especialidade; cápsula grafite Descubra nossa conexão nesse cartão; LinkedIn e Salvar contato em segundo plano; QR no mesmo cartão; fatos no bloco branco, com o texto inteiro; deslize; Contato na identidade; Voltar só no contato, para a entrada; só dados reais do portfólio; salvar número, compartilhar o link e guardar a primeira tela; manter o foco visível; nome em uma linha.
- **Don't:** capa de fundo; cortar palavras no bloco branco; frase Pausar informações; monograma sobre o nome; numerar etapas; travessão no texto; texto miúdo branco sobre a tangerina; `#716761` sobre a tangerina; Revelar identidade na entrada.
