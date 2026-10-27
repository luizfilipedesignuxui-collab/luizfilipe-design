# Cartão de Luiz Filipe

A primeira tela mostra o nome, a foto e o QR do cartão público. O QR é o foco. O único botão é Ir para o contato. Quem lê o QR e toca em Ver o restante do cartão cai na identidade, não na entrada. Na identidade, os fatos passam num bloco branco e o botão é Contato. Voltar para a primeira tela fica só no contato.

Na sessão de contato: **Salvar contato** gera um arquivo `.vcf` com os dados reais, **Compartilhar** usa o compartilhamento nativo ou copia o link, e **Baixar QR Code** guarda a primeira tela na galeria.

O cartão segue WCAG 2.2 AA: contraste, teclado, foco visível, alvos de toque e leitores de tela. Escape volta à entrada. No carrossel, as setas passam as informações.

## Rodar

```bash
npm install
npm run dev
```

A entrega do cartão fica em `http://127.0.0.1:5173/entrega`. O cartão público abre em `/` e em `/luiz-filipe`.

Verificações:

```bash
npm test
npm run lint
npm run build
```

Para publicar, defina `VITE_CARD_PUBLIC_URL` com o endereço `https://` final e rode `npm run build`. Sem esse endereço, o QR usa o domínio atual e não deve ser impresso se ainda for localhost.

## Trocar os dados

Tudo que é pessoal fica em `src/config/business-card.ts`.

Já preenchidos, a partir do portfólio:

- LinkedIn: https://www.linkedin.com/in/luiz-filipe-cardoso
- WhatsApp `+55 62 99447-4978`
- E-mail `luizfilipe.designuxui@gmail.com`
- Site https://luizfilipe-design.vercel.app
- Foto em `public/luiz-retrato.png`

O QR da entrada abre a URL pública do cartão + `/conectar`. O LinkedIn continua só como ação de contato.

Paleta da marca: tangerina `#E85A24`, terracota `#C44A1C`, grafite `#26211E`, branco `#FFFFFF`. Tipografia Bricolage Grotesque.

## O que ainda falta para publicar

- Domínio final e `publicUrl`
- PDF do currículo, se quiser oferecer o download
- Imagem de pré-visualização em `public/og.png` (1200×630), se quiser a miniatura nas redes
