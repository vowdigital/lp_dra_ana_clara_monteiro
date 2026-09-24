import { site, whatsappUrl, treatments, differentials, journey, faqs, results, testimonials } from './site-data.js';
import { renderTreatments, renderDifferentials, renderJourney, renderFaq, renderResults, renderTestimonials } from './components.js';

document.documentElement.classList.add('js');
document.querySelector('.location')?.setAttribute('id', 'localizacao');

function track(event) {
  const events = event?.includes('whatsapp_click') ? ['whatsapp_click', event] : [event];
  events.filter(Boolean).forEach(name => {
    document.dispatchEvent(new CustomEvent('landing:conversion', { detail: { event: name } }));
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: name });
    if (typeof window.gtag === 'function') window.gtag('event', name);
    if (typeof window.fbq === 'function') window.fbq('trackCustom', name);
  });
}

document.querySelectorAll('[data-whatsapp]').forEach(link => {
  link.href = whatsappUrl;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  link.addEventListener('click', () => track(link.dataset.whatsapp));
});
document.querySelectorAll('[data-instagram]').forEach(link => {
  link.href = site.instagram;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  link.addEventListener('click', () => track('instagram_click'));
});

document.querySelectorAll('[data-treatment-list]').forEach(container => renderTreatments(container, treatments[container.dataset.treatmentList], container.dataset.treatmentList));
renderDifferentials(document.querySelector('[data-differentials]'), differentials);
renderJourney(document.querySelector('[data-journey]'), journey);
renderFaq(document.querySelector('[data-faq]'), faqs);
renderTestimonials(document.querySelector('[data-testimonials]'), testimonials);

document.querySelectorAll('.treatment-cta').forEach(link => link.addEventListener('click', () => track('treatment_whatsapp_click')));
document.querySelectorAll('.treatment-item button, .faq-question').forEach(button => button.addEventListener('click', () => {
  const open = button.getAttribute('aria-expanded') === 'true';
  const content = document.getElementById(button.getAttribute('aria-controls'));
  button.setAttribute('aria-expanded', String(!open));
  content.hidden = open;
  content.classList.toggle('is-open', !open);
}));

const resultsSection = document.querySelector('[data-results-section]');
if (site.publication.resultsApprovedForPublication) {
  resultsSection.hidden = false;
  renderResults(document.querySelector('[data-results-gallery]'), results);
  const resultTabs = [...document.querySelectorAll('[data-result-tab]')];
  const resultPanels = [...document.querySelectorAll('[data-result-panel]')];
  const selectResult = tab => {
    const selected = tab.dataset.resultTab;
    resultTabs.forEach(item => {
      const active = item === tab;
      item.setAttribute('aria-selected', String(active));
      item.tabIndex = active ? 0 : -1;
    });
    resultPanels.forEach(panel => { panel.hidden = panel.dataset.resultPanel !== selected; });
  };
  resultTabs.forEach((tab, index) => {
    tab.addEventListener('click', () => selectResult(tab));
    tab.addEventListener('keydown', event => {
      if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
      event.preventDefault();
      const next = event.key === 'Home' ? 0 : event.key === 'End' ? resultTabs.length - 1 : (index + (event.key === 'ArrowRight' ? 1 : -1) + resultTabs.length) % resultTabs.length;
      resultTabs[next].focus();
      selectResult(resultTabs[next]);
    });
  });
}

const header = document.querySelector('[data-header]');
const menuButton = document.querySelector('.menu-toggle');
const menu = document.querySelector('.main-nav');
addEventListener('scroll', () => header.classList.toggle('is-scrolled', scrollY > 18), { passive: true });
menuButton.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!isOpen));
  menu.classList.toggle('is-open', !isOpen);
});
menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  menuButton.setAttribute('aria-expanded', 'false');
  menu.classList.remove('is-open');
}));
document.querySelector('[data-year]').textContent = new Date().getFullYear();

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
  }), { threshold: .15 });
  document.querySelectorAll('.reveal').forEach(el => {
    el.style.transitionDelay = `${el.dataset.delay || 0}ms`;
    observer.observe(el);
  });
} else {
  document.querySelectorAll('.reveal').forEach(el => el.classList.add('is-visible'));
}
