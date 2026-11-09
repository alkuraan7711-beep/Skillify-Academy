// ========================================================================
// script.js: قايمة الموبايل + فلتر الكورسات + نافذة Login/Sign up (تجريبية)
// ========================================================================
(() => {
  'use strict';

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ---------- 1) قايمة الموبايل ----------
  const menuToggle = $('.menu-toggle');
  const navPanel = $('#nav-panel');

  function setMenu(open) {
    navPanel.classList.toggle('is-open', open);
    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.textContent = open ? '✕' : '☰';
  }

  menuToggle.addEventListener('click', () => setMenu(!navPanel.classList.contains('is-open')));

  // أي لينك أو زرار جوه القايمة بيقفلها
  navPanel.addEventListener('click', (event) => {
    if (event.target.closest('a, [data-auth]')) setMenu(false);
  });

  // Esc بيقفل القايمة ويرجّع الفوكس للزرار
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && navPanel.classList.contains('is-open')) {
      setMenu(false);
      menuToggle.focus();
    }
  });

  // لو الشاشة كبرت (مثلا لفّ التابلت) نقفل القايمة المفتوحة
  window.matchMedia('(min-width: 901px)').addEventListener('change', (event) => {
    if (event.matches) setMenu(false);
  });

  // ---------- 2) فلتر الكورسات ----------
  const courses = $$('.cours');
  const chips = $$('.chip');
  const categoryCards = $$('.cards [data-filter]');
  const statusEl = $('#filter-status');

  function applyFilter(category) {
    let shown = 0;

    courses.forEach((course) => {
      const visible = category === 'All' || course.dataset.category === category;
      course.hidden = !visible;
      if (visible) shown++;
    });

    chips.forEach((chip) => chip.setAttribute('aria-pressed', String(chip.dataset.filter === category)));

    categoryCards.forEach((card) => {
      const active = card.dataset.filter === category;
      card.classList.toggle('is-active', active);
      card.setAttribute('aria-pressed', String(active));
    });

    const noun = shown === 1 ? 'course' : 'courses';
    statusEl.textContent = category === 'All'
      ? `Showing ${shown} ${noun}`
      : `Showing ${shown} ${noun} in ${category}`;
  }

  // مستمع واحد لكل العناصر اللي عليها data-filter (الشيبس، الكروت، القايمة المنسدلة، الفوتر)
  document.addEventListener('click', (event) => {
    const trigger = event.target.closest('[data-filter]');
    if (!trigger) return;

    // الضغط على كارت التصنيف وهو مفعّل بيرجّع "All"
    const isActiveCard = trigger.classList.contains('card') && trigger.classList.contains('is-active');
    applyFilter(isActiveCard ? 'All' : trigger.dataset.filter);

    // الأزرار (مش اللينكات) محتاجة سكرول يدوي لقسم الكورسات
    if (trigger.hasAttribute('data-scroll')) {
      $('#courses').scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
    }
  });

  applyFilter('All');

  // ---------- 3) نافذة Login / Sign up ----------
  const dialog = $('#auth-dialog');

  if (dialog && typeof dialog.showModal === 'function') {
    const form = $('#auth-form');
    const title = $('#auth-title');
    const nameField = $('#auth-name-field');
    const nameInput = $('#auth-name');
    const passwordInput = $('#auth-password');
    const submitButton = $('#auth-submit');
    const switchButton = $('#auth-switch');
    const message = $('#auth-message');

    let mode = 'login';
    let plan = '';

    function setMode(newMode) {
      mode = newMode;
      const isSignup = mode === 'signup';

      title.textContent = isSignup
        ? (plan ? `Sign up · ${plan} plan` : 'Create your account')
        : 'Log in';
      nameField.hidden = !isSignup;
      nameInput.disabled = !isSignup; // الحقل المعطّل بيتخطى الفاليديشن
      passwordInput.autocomplete = isSignup ? 'new-password' : 'current-password';
      submitButton.textContent = isSignup ? 'Create account' : 'Log in';
      switchButton.textContent = isSignup ? 'Already have an account? Log in' : 'New here? Create an account';
      form.hidden = false;
      message.hidden = true;
    }

    function openAuth(newMode, selectedPlan = '') {
      plan = selectedPlan;
      form.reset();
      setMode(newMode);
      dialog.showModal();
    }

    document.addEventListener('click', (event) => {
      const trigger = event.target.closest('[data-auth]');
      if (trigger) openAuth(trigger.dataset.auth, trigger.dataset.plan || '');
    });

    switchButton.addEventListener('click', () => {
      plan = '';
      setMode(mode === 'login' ? 'signup' : 'login');
    });

    $('.auth-close').addEventListener('click', () => dialog.close());

    // الضغط على الخلفية (برا الصندوق) بيقفل النافذة
    dialog.addEventListener('click', (event) => {
      if (event.target === dialog) dialog.close();
    });

    // المتصفح بيعمل الفاليديشن (required / email / minlength) قبل ما الحدث ده يشتغل
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const name = nameInput.value.trim();

      message.textContent = mode === 'signup'
        ? `Welcome${name ? `, ${name}` : ''}! This is a demo, so no account was created.`
        : 'Logged in! This is a demo, so nothing was saved.';
      message.hidden = false;
      form.hidden = true;
    });
  }
})();
