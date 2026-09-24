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

function mountCarousel(root, slides, label) {
  if (!root || slides.length < 2) return;
  root.classList.add('is-carousel');
  root.setAttribute('role', 'region');
  root.setAttribute('aria-roledescription', 'carousel');
  root.setAttribute('aria-label', label);
  root.tabIndex = 0;
  let current = 0;
  let timer;

  const controls = document.createElement('div');
  controls.className = 'carousel-controls';
  const previous = document.createElement('button');
  previous.className = 'carousel-control carousel-control-prev';
  previous.type = 'button';
  previous.setAttribute('aria-label', 'Foto anterior');
  previous.textContent = '←';
  const next = document.createElement('button');
  next.className = 'carousel-control carousel-control-next';
  next.type = 'button';
  next.setAttribute('aria-label', 'Próxima foto');
  next.textContent = '→';
  const dots = document.createElement('div');
  dots.className = 'carousel-dots';
  const dotButtons = slides.map((slide, index) => {
    slide.classList.add('carousel-slide');
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.className = 'carousel-dot';
    dot.setAttribute('aria-label', `Ver foto ${index + 1}`);
    dot.addEventListener('click', () => goTo(index));
    dots.append(dot);
    return dot;
  });
  controls.append(previous, dots, next);
  root.append(controls);

  function goTo(index) {
    current = (index + slides.length) % slides.length;
    slides.forEach((slide, slideIndex) => {
      const active = slideIndex === current;
      slide.hidden = false;
      slide.classList.toggle('is-active', active);
      slide.setAttribute('aria-hidden', String(!active));
      dotButtons[slideIndex].setAttribute('aria-current', active ? 'true' : 'false');
    });
  }
  function start() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    window.clearInterval(timer);
    timer = window.setInterval(() => goTo(current + 1), 6000);
  }
  function stop() { window.clearInterval(timer); }

  previous.addEventListener('click', () => { goTo(current - 1); start(); });
  next.addEventListener('click', () => { goTo(current + 1); start(); });
  root.addEventListener('mouseenter', stop);
  root.addEventListener('mouseleave', start);
  root.addEventListener('focusin', stop);
  root.addEventListener('focusout', event => { if (!root.contains(event.relatedTarget)) start(); });
  root.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft') { event.preventDefault(); goTo(current - 1); start(); }
    if (event.key === 'ArrowRight') { event.preventDefault(); goTo(current + 1); start(); }
  });
  goTo(0);
  start();
}

function setupHeroCarousel() {
  const root = document.querySelector('.hero-image');
  const picture = root?.querySelector('picture');
  if (!root || !picture) return;
  const first = document.createElement('div');
  first.className = 'carousel-slide';
  first.append(picture);
  root.replaceChildren(first);
  const extraPhotos = [
    ['/images/doctor/ana-clara-editorial-01.jpg', 'Dra. Ana Clara Monteiro em retrato profissional sentado'],
    ['/images/doctor/ana-clara-editorial-02.jpg', 'Dra. Ana Clara Monteiro em retrato profissional de corpo inteiro'],
    ['/images/doctor/ana-clara-editorial-03.jpg', 'Dra. Ana Clara Monteiro em retrato profissional'],
    ['/images/doctor/ana-clara-editorial-04.jpg', 'Dra. Ana Clara Monteiro em retrato sorrindo'],
    ['/images/doctor/ana-clara-editorial-05.jpg', 'Dra. Ana Clara Monteiro em retrato sentado'],
  ];
  const slides = [first, ...extraPhotos.map(([src, alt]) => {
    const slide = document.createElement('div');
    const image = document.createElement('img');
    image.src = src;
    image.alt = alt;
    image.width = 724;
    image.height = 1084;
    image.loading = 'lazy';
    image.decoding = 'async';
    slide.append(image);
    root.append(slide);
    return slide;
  })];
  mountCarousel(root, slides, 'Retratos da Dra. Ana Clara Monteiro');
}

function setupClinicCarousel() {
  const root = document.querySelector('.clinic-gallery');
  if (!root) return;
  mountCarousel(root, [...root.querySelectorAll('figure')], 'Fotos da Clínica Imagem');
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
setupHeroCarousel();
setupClinicCarousel();

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
  let activeResultPanel = resultPanels.find(panel => !panel.hasAttribute('data-result-hidden')) || resultPanels[0];
  let resultTimer;
  const resultAutoplayEnabled = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const stopResultAutoplay = () => window.clearInterval(resultTimer);
  const startResultAutoplay = () => {
    if (!resultAutoplayEnabled || resultTabs.length < 2) return;
    stopResultAutoplay();
    resultTimer = window.setInterval(() => {
      const currentTab = resultTabs.find(tab => tab.getAttribute('aria-selected') === 'true') || resultTabs[0];
      const currentIndex = resultTabs.indexOf(currentTab);
      selectResult(resultTabs[(currentIndex + 1) % resultTabs.length]);
    }, 5000);
  };
  const selectResult = tab => {
    const selected = tab.dataset.resultTab;
    resultTabs.forEach(item => {
      const active = item === tab;
      item.setAttribute('aria-selected', String(active));
      item.tabIndex = active ? 0 : -1;
    });
    const nextResultPanel = resultPanels.find(panel => panel.dataset.resultPanel === selected);
    if (!nextResultPanel || nextResultPanel === activeResultPanel) return;
    const previousResultPanel = activeResultPanel;
    previousResultPanel?.classList.add('is-leaving');
    previousResultPanel?.setAttribute('data-result-hidden', '');
    previousResultPanel?.setAttribute('aria-hidden', 'true');
    nextResultPanel.removeAttribute('data-result-hidden');
    nextResultPanel.setAttribute('aria-hidden', 'false');
    nextResultPanel.classList.add('is-entering');
    window.requestAnimationFrame(() => nextResultPanel.classList.remove('is-entering'));
    window.setTimeout(() => previousResultPanel?.classList.remove('is-leaving'), 560);
    activeResultPanel = nextResultPanel;
    startResultAutoplay();
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
  resultsSection.addEventListener('mouseenter', stopResultAutoplay);
  resultsSection.addEventListener('mouseleave', startResultAutoplay);
  resultsSection.addEventListener('focusin', stopResultAutoplay);
  resultsSection.addEventListener('focusout', event => {
    if (!resultsSection.contains(event.relatedTarget)) startResultAutoplay();
  });
  startResultAutoplay();
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
