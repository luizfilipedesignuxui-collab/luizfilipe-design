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
    fontSize: 3.15rem
    fontWeight: 300
    lineHeight: 1.02
    letterSpacing: -0.04em
  h2:
    fontFamily: Bricolage Grotesque
    fontSize: 1.35rem
    fontWeight: 400
    lineHeight: 1.15
    letterSpacing: -0.02em
  h3:
    fontFamily: Bricolage Grotesque
    fontSize: 0.75rem
    fontWeight: 500
    lineHeight: 1.3
  body-md:
    fontFamily: Bricolage Grotesque
    fontSize: 1.1875rem
    fontWeight: 400
    lineHeight: 1.4
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
  button-accent:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.cream}"
    rounded: "{rounded.full}"
    padding: 16px
  button-linkedin:
    backgroundColor: "{colors.brand-linkedin}"
    textColor: "{colors.cream}"
    rounded: "{rounded.full}"
    padding: 16px
  button-whatsapp:
    backgroundColor: "{colors.brand-whatsapp}"
    textColor: "{colors.ink}"
    rounded: "{rounded.full}"
    padding: 16px
  button-save:
    backgroundColor: "{colors.bg}"
    textColor: "{colors.cream}"
    rounded: "{rounded.full}"
    padding: 16px
  button-ink:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.cream}"
    rounded: "{rounded.full}"
    padding: 16px
  button-cream:
    backgroundColor: "{colors.cream}"
    textColor: "{colors.ink}"
    rounded: "{rounded.full}"
    padding: 16px
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

Cartão digital na mesma estrutura da referência: entrada, identidade e contato. A identidade visual é a do portfólio: tangerina `#E85A24`, terracota `#C44A1C`, grafite `#26211E` e branco `#FFFFFF`. O fundo do cartão é a tangerina lisa, sem desenhos. O nome entra em Bricolage Grotesque light. Cargo e rótulos sobre a tangerina ficam em medium, com pelo menos 19px. QR, fatos e contato ficam em blocos brancos com texto grafite.

## Colors

- **bg / media:** tangerina `#E85A24`. Fundo de todas as telas e botão de salvar.
- **cream:** branco. Texto sobre a tangerina e botão cream.
- **ink:** grafite `#26211E`. Texto dentro dos blocos brancos e botão Voltar.
- **accent / link:** terracota `#C44A1C`. Conexão, contato e portfólio.
- **muted:** `#716761`. Texto auxiliar só sobre branco.
- **line:** bege `#E8D5C7`. Contorno dos cards.
- **qr-paper / qr-ink:** branco e preto, para leitura do código.
- **brand-linkedin:** `#0A66C2`. LinkedIn e compartilhar.
- **brand-whatsapp:** `#25D366`. WhatsApp, com texto grafite.

## Typography

Bricolage Grotesque, pesos 300, 400 e 500. O nome usa light, tracking negativo e uma linha quando cabe. Corpo usa regular. Botões e cargo sobre a tangerina usam medium. Semibold e bold saem da interface.

## Shapes

QR com raio de 32px. Ícones em círculo colorido. Botões em cápsula cheia, cada um com a cor do canal. Fundo tangerina limpo. Informações em cartão branco. A foto fica em recorte circular.

## Components

- **button-accent:** cápsula terracota. Temos algo em comum, e Contato.
- **button-linkedin:** cápsula azul. LinkedIn e Vamos conversar.
- **button-whatsapp:** cápsula verde. WhatsApp e salvar contato.
- **button-save:** cápsula tangerina. Salvar cartão.
- **button-ink:** cápsula grafite. Voltar e e-mail.
- **button-cream:** cápsula branca sobre a tangerina.
- **card-qr:** placa branca compacta, com flutuação leve.
- **glass:** bloco branco das informações.
- **photo-slot:** foto do portfólio, recorte circular com o rosto.

## Layout & spacing

Mobile first. Sem traços, flor ou ilustração no fundo. Na entrada, a foto fica acima do nome no celular. No desktop, a entrada vira uma fileira: foto, identidade e QR. Os três botões principais ocupam uma grade igual. A identidade no desktop coloca foto e nome à esquerda e o carrossel à direita. O contato abre em duas colunas nos acessos. O QR abre a página de acessos, com LinkedIn, WhatsApp, e-mail, portfólio e vendas. Salvar cartão gera a imagem para a galeria. Abaixo do cartão branco há um cadeado. Só o dono entra, com um código exclusivo que ele recebeu. Quem visita o cartão não vê esse código. A mensagem copiada para o LinkedIn muda conforme o tipo de evento que o dono escolhe: geral, networking, RH ou negócios.

## Motion

O cartão pousa com mola, escala e um leve `rotateX`. A foto dá um spring e continua flutuando. Nome, ações e QR entram em cascata. O QR flutua e gira um pouco. Trocas de tela deslizam com rotação leve. Hover sobe 4px. Toque escala para 0.94. Com `prefers-reduced-motion`, tudo para.

## Accessibility

Camada WCAG 2.2 AA: texto branco em medium, a partir de 19px, sobre a tangerina; nome light só quando o texto é grande; texto grafite sobre os blocos brancos. Foco visível de 3px, alvos de toque com 44px, cápsulas de 52px, um título por tela, atalhos de teclado no carrossel, pausa de movimento e anúncio de status para leitor de tela. `#716761` só sobre branco.

## Do / Don't

- **Do:** fundo tangerina limpo; tipografia light no nome; botões com a cor do canal; desktop em fileira de identidade e grade de três ações; só dados reais do portfólio; manter o foco visível.
- **Don't:** desenhos ou flor no fundo; botão branco sem cor de canal; três colunas apertando foto, texto e QR no mesmo eixo dos botões; texto miúdo light sobre a tangerina; `#716761` sobre a tangerina.
