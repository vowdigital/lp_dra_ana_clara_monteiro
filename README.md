
# Landing page — Dra. Ana Clara Monteiro

Landing page institucional da Dra. Ana Clara Monteiro, dermatologia estética em Dourados (MS). A experiência apresenta a médica, sua abordagem de beleza funcional, tratamentos faciais e corporais, casos autorizados, localização e canais de contato.

## Stack e estrutura

- HTML, CSS e JavaScript nativos, sem framework de runtime.
- `public/`: fonte da página, estilos, scripts, dados e imagens.
- `dist/`: versão gerada para publicação.
- `build.mjs`: copia os arquivos de `public/` para `dist/`.
- `server.mjs`: servidor local em `http://localhost:4173`.
- `vercel.json`: configuração de build e saída para hospedagem estática.

## Desenvolvimento local

Requisitos: Node.js 18+ e npm.

```bash
npm install
npm run dev
```

Abra `http://localhost:4173`. Para gerar a versão de produção:

```bash
npm run build
```

O conteúdo publicado será gerado em `dist/`.

## Estrutura da experiência

- Hero com retratos da Dra. Ana Clara em carrossel automático a cada 5 segundos.
- Apresentação da médica, abordagem de beleza funcional e diferenciais do atendimento.
- Tratamentos separados em categorias faciais e corporais, com menu suspenso e accordions.
- Casos reais autorizados, com troca manual e transição automática a cada 5 segundos.
- Jornada de atendimento em cards, localização da Clínica Imagem, mapa e galeria em carrossel automático a cada 4 segundos.
- FAQ com interação por abertura/fechamento e título fixo durante a rolagem em telas maiores.
- Bloco editorial de Instagram com link para o perfil oficial.
- CTAs de agendamento direcionados diretamente ao WhatsApp, com ícone oficial e botão flutuante.

## Conteúdo e dados principais

- Clínica Imagem: Rua João Rosa Góes, 1940 — Jardim América, Dourados — MS, CEP 79825-130.
- WhatsApp: `+55 (67) 99833-7489`.
- Instagram: [@dra.anaclaramonteiro.c](https://www.instagram.com/dra.anaclaramonteiro.c/).
- Resultados publicados como casos individuais, com aviso de que a indicação e os resultados dependem de avaliação médica.
- Depoimentos permanecem desativados enquanto não houver material aprovado para publicação.

Os conteúdos estruturais e imagens utilizados na página devem permanecer alinhados ao material previamente autorizado pela cliente.

## SEO, acessibilidade e performance

A página inclui metadados SEO, dados estruturados Schema.org, `robots.txt`, `sitemap.xml`, textos alternativos, navegação por teclado, estados compatíveis com JavaScript desativado e carregamento otimizado de imagens.

## Publicação

O comando de build para qualquer hospedagem estática é:

- Build command: `npm run build`
- Output directory: `dist`

## Direção visual

A interface segue a identidade visual premium da marca: fundo off-white, tons taupe, tipografia editorial de alto contraste, molduras orgânicas, cards discretos e microinterações suaves. A composição também se inspira em referências editoriais de dermatologia estética, mantendo o foco na presença da doutora e em uma navegação objetiva.
