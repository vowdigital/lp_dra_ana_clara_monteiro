export const site = {
  doctor: 'Dra. Ana Clara Monteiro',
  city: 'Dourados, MS',
  clinic: 'Clínica Imagem',
  address: 'Rua João Rosa Góes, 1940 - Jardim América, Dourados - MS, CEP 79825-130',
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Cl%C3%ADnica+Imagem%2C+Rua+Jo%C3%A3o+Rosa+G%C3%B3es%2C+1940%2C+Jardim+Am%C3%A9rica%2C+Dourados+-+MS%2C+79825-130',
  whatsapp: {
    number: '5567998337489',
    message: 'Olá, vim pelo site da Dra. Ana Clara e gostaria de saber mais sobre a avaliação.'
  },
  instagram: 'https://www.instagram.com/dra.anaclaramonteiro.c/',
  domain: 'https://anaclaramonteiro.com.br',
  publication: { resultsApprovedForPublication: true }
};

export const whatsappUrl = `https://wa.me/${site.whatsapp.number}?text=${encodeURIComponent(site.whatsapp.message)}`;

export const treatments = {
  facial: [
    ['Reestruturação facial com ácido hialurônico', 'Uma ferramenta que pode colaborar com estrutura, proporções e harmonia facial dentro de um planejamento individualizado.'],
    ['Toxina botulínica', 'Pode ser indicada conforme a avaliação médica e os objetivos de cada paciente.'],
    ['Bioestimuladores de colágeno', 'Abordagem complementar que pode ser considerada no cuidado da qualidade e aparência da pele.'],
    ['Microagulhamento', 'Procedimento que pode integrar um plano voltado às necessidades individuais da pele.'],
    ['Tratamentos para qualidade e aparência da pele', 'Possibilidades voltadas às necessidades identificadas na avaliação e ao cuidado individualizado da pele.'],
    ['Rejuvenescimento e gerenciamento do envelhecimento', 'Estratégias que podem ser combinadas de acordo com a anatomia, o processo de envelhecimento e os objetivos da paciente.'],
    ['Medicina regenerativa', 'Possibilidade avaliada de forma criteriosa e individualizada.']
  ],
  body: [
    ['Reestruturação corporal', 'Planejamento de possibilidades para diferentes regiões e objetivos corporais.'],
    ['Bioestimuladores corporais', 'Podem fazer parte de um plano de cuidado corporal após avaliação.'],
    ['Aplicações corporais de ácido hialurônico', 'Possibilidade que pode ser considerada de acordo com a região, o objetivo e a avaliação médica.'],
    ['Tratamentos injetáveis para gordura localizada', 'A indicação depende da avaliação médica individualizada.'],
    ['Abdômen, glúteos, ombros e mãos', 'Regiões que podem receber abordagens específicas, sempre com indicação individual.']
  ]
};

export const differentials = ['Planejamento completo e individualizado', 'Conhecimento médico e experiência técnica', 'Resultados naturais e equilibrados', 'Atendimento acolhedor e humanizado', 'Fechamento realizado diretamente pela médica', 'Acompanhamento após os procedimentos', 'Senso estético apurado', 'Atuação no ensino de outros médicos', 'Capacidade de identificar quando tratar e quando não intervir', 'Preservação da identidade e da naturalidade'];

export const journey = ['Primeiro contato pelo WhatsApp', 'Agendamento da consulta', 'Avaliação individualizada', 'Planejamento do tratamento', 'Realização dos procedimentos indicados', 'Orientações após o procedimento', 'Acompanhamento', 'Retornos conforme necessidade'];

export const faqs = [
  ['Como funciona a avaliação?', 'A avaliação é o momento de compreender suas características, seu processo de envelhecimento e seus objetivos. A partir dela, a médica orienta as possibilidades adequadas para o seu caso.'],
  ['O tratamento é personalizado?', 'Sim. Cada planejamento é realizado de forma individualizada, respeitando anatomia, necessidades identificadas na avaliação e objetivos da paciente.'],
  ['Quais procedimentos podem fazer parte do planejamento?', 'Podem ser consideradas diferentes abordagens faciais e corporais. A indicação depende de avaliação médica individualizada.'],
  ['Como funciona o acompanhamento após o procedimento?', 'O acompanhamento e os retornos são definidos de acordo com a necessidade de cada paciente e com a orientação médica.'],
  ['Onde a Dra. Ana Clara atende?', 'O atendimento acontece na Clínica Imagem, em Dourados, Mato Grosso do Sul. Para informações de agendamento, converse com a equipe pelo WhatsApp.'],
  ['Como agendar uma consulta?', 'Clique em “Agendar minha avaliação” para falar diretamente com a equipe pelo WhatsApp.'],
  ['Quais são as formas de pagamento?', 'Para informações sobre formas de pagamento, consulte a equipe pelo WhatsApp.']
];

export const results = [
  {
    id: '01',
    before: { webp: '/images/results/result-case-02-before.webp', webpSmall: '/images/results/result-case-02-before-360.webp', jpg: '/images/results/result-case-02-before.jpg', width: 665, height: 591 },
    after: { webp: '/images/results/result-case-02-after.webp', webpSmall: '/images/results/result-case-02-after-360.webp', jpg: '/images/results/result-case-02-after.jpg', width: 665, height: 591 }
  }
];

// Intencionalmente vazio até receber material autorizado. O componente permanece pronto.
export const testimonials = [];

export const instagramPosts = [
  { id: '01', label: 'Apresentação da doutora', image: '/images/instagram/post-01.jpg', ratio: 0.802, url: 'https://www.instagram.com/dra.anaclaramonteiro.c/p/DVeB1HxEc8J/', alt: 'Post de apresentação da Dra. Ana Clara Monteiro' },
  { id: '02', label: 'Beleza funcional', image: '/images/instagram/post-02.jpg', ratio: 0.75, url: 'https://www.instagram.com/dra.anaclaramonteiro.c/p/DdkVazREUkE/', alt: 'Post da Dra. Ana Clara Monteiro sobre beleza funcional' },
  { id: '03', label: 'Olhar individualizado', image: '/images/instagram/post-03.jpg', ratio: 0.8, url: 'https://www.instagram.com/dra.anaclaramonteiro.c/p/DdXIvWPn60k/', alt: 'Retrato publicado pela Dra. Ana Clara Monteiro' },
  { id: '04', label: 'Naturalidade e identidade', image: '/images/instagram/post-04.jpg', ratio: 0.8, url: 'https://www.instagram.com/dra.anaclaramonteiro.c/p/DdHFIaREUAo/', alt: 'Retrato publicado pela Dra. Ana Clara Monteiro' },
  { id: '05', label: 'Conteúdo em vídeo', image: '/images/instagram/post-05.jpg', ratio: 0.562, url: 'https://www.instagram.com/dra.anaclaramonteiro.c/reel/DdbbGpnR9Z5/', alt: 'Reel da Dra. Ana Clara Monteiro' },
  { id: '06', label: 'Bastidores do consultório', image: '/images/instagram/post-06.jpg', ratio: 0.563, url: 'https://www.instagram.com/dra.anaclaramonteiro.c/reel/Ddmwgd_Br03/', alt: 'Dra. Ana Clara Monteiro em seu consultório' },
  { id: '07', label: 'Histórias que inspiram', image: '/images/instagram/post-07.jpg', ratio: 0.75, url: 'https://www.instagram.com/dra.anaclaramonteiro.c/p/DdZWWRiEXci/', alt: 'Publicação pessoal da Dra. Ana Clara Monteiro' },
  { id: '08', label: 'Presença e cuidado', image: '/images/instagram/post-08.jpg', ratio: 0.563, url: 'https://www.instagram.com/dra.anaclaramonteiro.c/reel/DdTzCDORUmD/', alt: 'Dra. Ana Clara Monteiro em um retrato no consultório' },
  { id: '09', label: 'Vida e propósito', image: '/images/instagram/post-09.jpg', ratio: 0.8, url: 'https://www.instagram.com/dra.anaclaramonteiro.c/p/DdO6rHxkQhW/', alt: 'Publicação pessoal da Dra. Ana Clara Monteiro' }
];
