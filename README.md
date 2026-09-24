
# Landing page — Dra. Ana Clara Monteiro

Landing page institucional da Dra. Ana Clara Monteiro, dermatologia estética em Dourados (MS). O projeto é uma aplicação estática, com foco em apresentação da abordagem médica, conversão para WhatsApp, SEO/GEO e experiência responsiva.

## Stack e estrutura

- HTML, CSS e JavaScript nativos (sem framework ou dependências de runtime).
- `public/`: arquivos da página, dados, estilos, scripts e imagens.
- `build.mjs`: copia `public/` para `dist/` para publicação.
- `server.mjs`: servidor local de desenvolvimento em `http://localhost:4173`.
- `vercel.json`: configuração de build, saída e cabeçalhos de segurança para a Vercel.

## Desenvolvimento local

Requisitos: Node.js 18+ e npm.

```bash
npm install
npm run dev
```

Abra `http://localhost:4173` no navegador. Para gerar a versão de produção:

```bash
npm run build
```

O conteúdo publicado será gerado em `dist/`.

## Conteúdo e integrações

- CTA e botão flutuante direcionam para o WhatsApp da equipe.
- O menu principal inclui a seção de localização da Clínica Imagem.
- Endereço confirmado: Rua João Rosa Góes, 1940 — Jardim América, Dourados — MS, CEP 79825-130.
- A seção de localização exibe a foto externa da Clínica Imagem; o mapa está temporariamente oculto.
- Resultados são apresentados como casos individuais, com aviso de que a indicação depende de avaliação médica.
- Depoimentos, novas fotos profissionais e conteúdos adicionais permanecem pendentes de aprovação.

## SEO, acessibilidade e performance

A página inclui metadados SEO, dados estruturados Schema.org, `robots.txt`, `sitemap.xml`, textos alternativos nas imagens, navegação por teclado, estados sem JavaScript e carregamento otimizado de imagens.

## Deploy

O destino de produção é a Vercel, com gestão de hospedagem/domínio pela Vow Digital. Na Vercel, use:

- Build command: `npm run build`
- Output directory: `dist`

O domínio planejado é `anaclaramonteiro.com.br`.

## Direção visual

A interface usa uma linguagem editorial contemporânea, com tipografia fluida, hero mais imersivo, composições assimétricas, imagens com molduras orgânicas, cards mais leves e microinterações de hover e scroll. A paleta atual prioriza branco, preto e tons neutros para manter consistência com a marca.

O projeto permanece em HTML, CSS e JavaScript nativos. Essa escolha preserva carregamento rápido, SEO e simplicidade de deploy; React ou Vue podem ser considerados caso a página passe a exigir interações ou componentes dinâmicos mais complexos.

O footer usa fundo claro, tipografia escura e o logo original para manter legibilidade e alinhamento com o header.

### Alinhamento ao manual da marca

A interface tambem aplica os tokens da identidade visual Premium: off-white `#FFFDFB`, taupe `#D6BCAD`, monograma institucional como textura sutil, tipografia editorial de alto contraste e componentes com bordas e sombras mais discretas.
