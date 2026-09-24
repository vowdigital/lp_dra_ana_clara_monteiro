import { whatsappUrl } from './site-data.js';

export function renderTreatments(container, items, group) {
  container.innerHTML = items.map(([title, text], index) => {
    const id = `${group}-${index}`;
    return `<article class="treatment-item"><button type="button" aria-expanded="false" aria-controls="${id}">${title}<span aria-hidden="true">+</span></button><p id="${id}" hidden>${text}<a class="treatment-cta" data-whatsapp="treatment_whatsapp_click" href="${whatsappUrl}" target="_blank" rel="noopener noreferrer">Agendar uma avaliação <span aria-hidden="true">↗</span></a></p></article>`;
  }).join('');
}

export function renderDifferentials(container, items) {
  container.innerHTML = items.map((text, index) => `<article class="differential"><span>${String(index + 1).padStart(2, '0')}</span><p>${text}</p></article>`).join('');
}

export function renderJourney(container, items) {
  container.innerHTML = items.map(item => `<li>${item}</li>`).join('');
}

export function renderFaq(container, items) {
  container.innerHTML = items.map(([question, answer], index) => `<article class="faq-item"><button class="faq-question" id="faq-question-${index}" type="button" aria-expanded="false" aria-controls="faq-${index}">${question}<span aria-hidden="true">+</span></button><div class="faq-answer" id="faq-${index}" role="region" aria-labelledby="faq-question-${index}" hidden><p>${answer}</p></div></article>`).join('');
}

function resultImage(asset, alt) {
  return `<picture><source srcset="${asset.webpSmall} 360w, ${asset.webp} ${asset.width}w" sizes="(max-width: 560px) 45vw, 500px" type="image/webp" /><img src="${asset.jpg}" alt="${alt}" width="${asset.width}" height="${asset.height}" loading="lazy" decoding="async" /></picture>`;
}

export function renderResults(container, items) {
  container.innerHTML = `<div class="results-selector" role="tablist" aria-label="Selecionar caso">${items.map((item, index) => `<button type="button" role="tab" id="result-tab-${item.id}" aria-selected="${index === 0}" tabindex="${index === 0 ? '0' : '-1'}" aria-controls="result-panel-${item.id}" data-result-tab="${item.id}">Caso ${item.id}</button>`).join('')}</div><div class="results-gallery">${items.map((item, index) => { const context = [item.procedure, item.context].filter(Boolean).join(' · '); return `<figure class="result-case" id="result-panel-${item.id}" role="tabpanel" aria-labelledby="result-tab-${item.id}" data-result-panel="${item.id}"${index ? ' hidden' : ''}><div class="result-comparison"><figure class="result-shot">${resultImage(item.before, `Caso ${item.id}, antes do tratamento`)}<figcaption>Antes</figcaption></figure><figure class="result-shot">${resultImage(item.after, `Caso ${item.id}, após o tratamento`)}<figcaption>Depois</figcaption></figure></div>${context ? `<p class="result-context">${context}</p>` : ''}<figcaption class="result-disclaimer">Caso individual. Resultados variam; a indicação depende de avaliação médica individualizada.</figcaption></figure>`; }).join('')}</div>`;
}

export function renderTestimonials(section, items) {
  if (!items.length) { section.hidden = true; return; }
  section.hidden = false;
  section.querySelector('[data-testimonials-list]').innerHTML = items.map(({ quote, author }) => `<blockquote><p>“${quote}”</p><footer>${author}</footer></blockquote>`).join('');
}
