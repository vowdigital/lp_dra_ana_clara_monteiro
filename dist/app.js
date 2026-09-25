import { site, whatsappUrl, treatments, differentials, journey, faqs, results, testimonials, instagramPosts } from './site-data.js';
import { renderTreatments, renderDifferentials, renderJourney, renderFaq, renderResults, renderTestimonials, renderInstagramPosts } from './components.js';

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

function mountCarousel(root, slides, label, intervalMs = 6000) {
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
    timer = window.setInterval(() => goTo(current + 1), intervalMs);
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
  mountCarousel(root, slides, 'Retratos da Dra. Ana Clara Monteiro', 5000);
}

function setupClinicCarousel() {
  const root = document.querySelector('.clinic-gallery');
  if (!root) return;
  mountCarousel(root, [...root.querySelectorAll('figure')], 'Fotos da Clínica Imagem', 4000);
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
renderInstagramPosts(document.querySelector('[data-instagram-feed]'), instagramPosts);
setupHeroCarousel();
setupClinicCarousel();

function setupInstagramCarousel() {
  const root = document.querySelector('[data-instagram-feed]');
  const track = root?.querySelector('.instagram-feed-track');
  const posts = root ? [...root.querySelectorAll('.instagram-post')] : [];
  const previous = root?.querySelector('[data-instagram-prev]');
  const next = root?.querySelector('[data-instagram-next]');
  if (!root || !track || posts.length < 2 || !previous || !next) return;

  posts.forEach(post => {
    const clone = post.cloneNode(true);
    clone.setAttribute('aria-hidden', 'true');
    clone.querySelectorAll('a, button').forEach(element => { element.tabIndex = -1; });
    track.append(clone);
  });

  let current = 0;
  let timer;
  const visibleCount = () => window.innerWidth <= 560 ? 2 : window.innerWidth <= 900 ? 3 : 5;
  const ratioFor = index => Number(posts[index % posts.length].style.getPropertyValue('--post-ratio')) || 1;
  const setRowSize = (force = false) => {
    if (!force && track.style.getPropertyValue('--instagram-post-height')) return;
    const viewport = root.querySelector('.instagram-feed-viewport');
    const available = viewport?.clientWidth || root.clientWidth;
    // A altura é definida uma única vez para que o carrossel não salte a cada troca.
    const ratioSum = Array.from({ length: visibleCount() }, (_, offset) => ratioFor(offset))
      .reduce((sum, ratio) => sum + ratio, 0);
    if (available && ratioSum) track.style.setProperty('--instagram-post-height', `${available / ratioSum}px`);
  };
  const goTo = (index, animate = true) => {
    current = index;
    setRowSize();
    if (!animate) track.style.transition = 'none';
    const offset = [...track.querySelectorAll('.instagram-post')]
      .slice(0, current)
      .reduce((sum, post) => sum + post.getBoundingClientRect().width, 0);
    track.style.transform = `translateX(-${offset}px)`;
    if (!animate) {
      track.offsetHeight;
      requestAnimationFrame(() => track.style.removeProperty('transition'));
    }
  };
  const advance = direction => {
    if (direction < 0 && current === 0) {
      goTo(posts.length, false);
      requestAnimationFrame(() => {
        current = posts.length - 1;
        goTo(current);
      });
      return;
    }
    const nextIndex = current + direction;
    goTo(nextIndex);
    if (direction > 0 && nextIndex >= posts.length) {
      window.setTimeout(() => goTo(0, false), 700);
    }
  };
  const stop = () => window.clearInterval(timer);
  const start = () => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    stop();
    timer = window.setInterval(() => advance(1), 5000);
  };
  previous.addEventListener('click', () => { advance(-1); start(); });
  next.addEventListener('click', () => { advance(1); start(); });
  root.addEventListener('mouseenter', stop);
  root.addEventListener('mouseleave', start);
  root.addEventListener('focusin', stop);
  root.addEventListener('focusout', event => { if (!root.contains(event.relatedTarget)) start(); });
  window.addEventListener('resize', () => {
    track.style.removeProperty('--instagram-post-height');
    goTo(Math.min(current, posts.length - visibleCount()), false);
  }, { passive: true });
  goTo(0);
  start();
}
setupInstagramCarousel();

document.querySelectorAll('.treatment-cta').forEach(link => link.addEventListener('click', () => track('treatment_whatsapp_click')));
document.querySelectorAll('.treatment-item button, .faq-question').forEach(button => button.addEventListener('click', () => {
  const open = button.getAttribute('aria-expanded') === 'true';
  const content = document.getElementById(button.getAttribute('aria-controls'));
  button.setAttribute('aria-expanded', String(!open));
  content.hidden = open;
  content.classList.toggle('is-open', !open);
}));

function openTreatmentFromHash() {
  if (!location.hash) return;
  const target = document.querySelector(location.hash);
  const button = target?.matches('.treatment-item') ? target.querySelector('button') : null;
  if (!button) return;
  if (button.getAttribute('aria-expanded') !== 'true') button.click();
  window.requestAnimationFrame(() => target.scrollIntoView({ behavior: 'smooth', block: 'center' }));
}
window.addEventListener('hashchange', openTreatmentFromHash);
openTreatmentFromHash();

const resultsSection = document.querySelector('[data-results-section]');
if (site.publication.resultsApprovedForPublication) {
  resultsSection.hidden = false;
  const resultGroups = [
    { id: 'facial', label: 'Resultados faciais', option: 'Facial', items: results.filter(item => item.category === 'facial') },
    { id: 'abdomen', label: 'Resultados de abdome', option: 'Abdome', items: results.filter(item => item.category === 'abdomen') },
    { id: 'gluteos', label: 'Resultados de glúteos', option: 'Glúteos', items: results.filter(item => item.category === 'gluteos') }
  ].filter(group => group.items.length);
  const categorySelector = document.querySelector('[data-results-category-selector]');
  const groupsContainer = document.querySelector('[data-results-groups]');
  const activeGroup = resultGroups.find(group => group.id === 'facial') || resultGroups[0];
  categorySelector.innerHTML = resultGroups.map(group => `<button type="button" role="tab" id="results-category-tab-${group.id}" aria-selected="${group.id === activeGroup.id}" aria-controls="results-category-panel-${group.id}" tabindex="${group.id === activeGroup.id ? '0' : '-1'}" data-results-category="${group.id}">${group.option}</button>`).join('');
  groupsContainer.innerHTML = resultGroups.map(group => `<section class="results-group" id="results-category-panel-${group.id}" aria-labelledby="results-category-tab-${group.id}" data-results-category-panel="${group.id}"${group.id !== activeGroup.id ? ' hidden' : ''}><h3 id="results-group-${group.id}">${group.label}</h3><div data-results-gallery="${group.id}"></div></section>`).join('');
  resultGroups.forEach(group => {
    const groupContainer = groupsContainer.querySelector(`[data-results-gallery="${group.id}"]`);
    renderResults(groupContainer, group.items);
    const caseTabs = [...groupContainer.querySelectorAll('[data-result-tab]')];
    const casePanels = [...groupContainer.querySelectorAll('[data-result-panel]')];
    if (caseTabs.length < 2) return;
    const selectCase = tab => {
      const selected = tab.dataset.resultTab;
      caseTabs.forEach(item => {
        const active = item === tab;
        item.setAttribute('aria-selected', String(active));
        item.tabIndex = active ? 0 : -1;
      });
      casePanels.forEach(panel => {
        const active = panel.dataset.resultPanel === selected;
        panel.toggleAttribute('data-result-hidden', !active);
        panel.setAttribute('aria-hidden', String(!active));
      });
    };
    caseTabs.forEach((tab, index) => {
      tab.addEventListener('click', () => selectCase(tab));
      tab.addEventListener('keydown', event => {
        if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
        event.preventDefault();
        const next = event.key === 'Home' ? 0 : event.key === 'End' ? caseTabs.length - 1 : (index + (event.key === 'ArrowRight' ? 1 : -1) + caseTabs.length) % caseTabs.length;
        caseTabs[next].focus();
        selectCase(caseTabs[next]);
      });
    });
  });
  const categoryTabs = [...categorySelector.querySelectorAll('[data-results-category]')];
  const selectCategory = tab => {
    const selected = tab.dataset.resultsCategory;
    categoryTabs.forEach(item => {
      const active = item === tab;
      item.setAttribute('aria-selected', String(active));
      item.tabIndex = active ? 0 : -1;
    });
    groupsContainer.querySelectorAll('[data-results-category-panel]').forEach(panel => {
      panel.hidden = panel.dataset.resultsCategoryPanel !== selected;
    });
  };
  categoryTabs.forEach((tab, index) => {
    tab.addEventListener('click', () => selectCategory(tab));
    tab.addEventListener('keydown', event => {
      if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
      event.preventDefault();
      const next = event.key === 'Home' ? 0 : event.key === 'End' ? categoryTabs.length - 1 : (index + (event.key === 'ArrowRight' ? 1 : -1) + categoryTabs.length) % categoryTabs.length;
      categoryTabs[next].focus();
      selectCategory(categoryTabs[next]);
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

const treatmentDropdown = document.querySelector('.nav-dropdown');
const treatmentDropdownToggle = document.querySelector('.nav-dropdown-toggle');
if (treatmentDropdown && treatmentDropdownToggle) {
  const closeTreatmentDropdown = () => {
    treatmentDropdown.classList.remove('is-open');
    treatmentDropdownToggle.setAttribute('aria-expanded', 'false');
  };
  treatmentDropdownToggle.addEventListener('click', event => {
    event.stopPropagation();
    const isOpen = treatmentDropdown.classList.toggle('is-open');
    treatmentDropdownToggle.setAttribute('aria-expanded', String(isOpen));
  });
  treatmentDropdown.querySelectorAll('a').forEach(a => a.addEventListener('click', closeTreatmentDropdown));
  document.addEventListener('click', event => {
    if (!treatmentDropdown.contains(event.target)) closeTreatmentDropdown();
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      closeTreatmentDropdown();
      treatmentDropdownToggle.focus();
    }
  });
}
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
