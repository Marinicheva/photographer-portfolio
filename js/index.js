import i18nObj from "./translate.js";

window.addEventListener('DOMContentLoaded', () => {
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const menu = document.querySelector('.main-nav');
  const menuItem = document.querySelectorAll('.nav-item');
  const portfolioBtns = document.querySelectorAll('.slider__btn');
  const portfolioImgs = document.querySelectorAll('.gallery-item__img');
  const langSwitch = document.querySelectorAll('.lang');
  const themeSwitcher = document.querySelector('.theme-switcher');
  const themeLogo = document.querySelector('.theme-icon__src');
  const elementToChange = ['page-body', 'main-header', 'header-logo', 'main-nav', 'mobile-menu-btn', 'lang-switcher', 'hero', 'hero__btn', 'section-title', 'btn-list', 'price-item__cost', 'contacts', 'contacts-form', 'social-link__img'];
  const seasons = ['winter', 'spring', 'autumn', 'summer'];
  let lang = 'en';
  let theme = 'dark';
  const btns = document.querySelectorAll('.btn');

  function menuShow() {
    mobileMenuBtn.addEventListener('click', () => {
      menu.classList.toggle('main-nav_active');
      mobileMenuBtn.classList.toggle('mobile-menu-btn_active');
    });
  }

  function menuClose() {
    menu.classList.remove('main-nav_active');
    mobileMenuBtn.classList.remove('mobile-menu-btn_active');

  }

  function changeImages() {
    portfolioBtns.forEach((item) => {
      item.addEventListener('click', (event) => {
        portfolioBtns.forEach(i => i.classList.remove('slider__btn_active'));
        event.target.classList.add('slider__btn_active');

        const btnSeason = event.target.getAttribute('data-btn-season');
        portfolioImgs.forEach((item, index) => item.src = `./assets/img/${btnSeason}/${index + 1}.jpg`);
      });
    });
  }

  function preloadSummerImages(list) {
    list.forEach(item => {
      for(let i = 1; i <= 6; i++) {
        const img = new Image();
        img.src = `./assets/img/${item}/${i}.jpg`;
      }
    });
  }

  function getTranslate(lang) {
    let texts = document.querySelectorAll('[data-i18n]');
    texts.forEach(item => {
      let data = item.getAttribute('data-i18n');
      item.textContent = i18nObj[lang][data];
      });
  }

  function changeTheme(theme) {
    elementToChange.forEach(item => {
      let elClass = '.' + item;
      let el = document.querySelectorAll(elClass);
      let newClass = item + '_light';
      if (theme == 'light') {
        el.forEach(elem => elem.classList.add(newClass));
      } else {
        el.forEach(elem => elem.classList.remove(newClass));
      }
    });
  }

  function setLocalStorage() {
    localStorage.setItem('lang', lang);
    localStorage.setItem('theme', theme);
  }

  function getLocalStorage() {
    if(localStorage.getItem('lang')) {
      const lang = localStorage.getItem('lang');
      getTranslate(lang);
    }

    if(localStorage.getItem('theme')) {
      const theme = localStorage.getItem('theme');
      changeTheme(theme);
    }
  }

  function btnAnimation(parent) {
    console.log('click');
    let pulse = document.createElement('span');
    pulse.classList.add('pulse');
    parent.append(pulse);

    pulse.addEventListener('animationend', (event) => event.target.remove());
  }

  window.addEventListener('beforeunload', setLocalStorage);
  window.addEventListener('load', getLocalStorage);

  menuItem.forEach(item => {
    item.addEventListener('click', menuClose);
  });

  langSwitch.forEach(item => {
    item.addEventListener('click', event => {
      langSwitch.forEach(i => i.classList.remove('lang_active'));
      event.target.classList.add('lang_active');
      lang = event.target.getAttribute('data-lang');
      setLocalStorage();
      getTranslate(lang);
    });
  });

  themeSwitcher.addEventListener('click', () => {
    theme = themeSwitcher.getAttribute('data-theme');
    setLocalStorage();
    
    changeTheme(theme);

    if (theme == 'light') {
      themeSwitcher.setAttribute('data-theme', 'dark');
      themeLogo.setAttribute('xlink:href', 'assets/svg/sprite.svg#dark-theme-icon');
    } else {
      themeSwitcher.setAttribute('data-theme', 'light');
      themeLogo.setAttribute('xlink:href', 'assets/svg/sprite.svg#light-theme-icon');
    }
  });

  menuShow();
  changeImages();
  preloadSummerImages(seasons);

  btns.forEach(item =>
    item.addEventListener('click', (event) => {
      event.preventDefault();
      let target = event.target;
      btnAnimation(target);
  }));

  console.log(`[v] Смена изображений в секции portfolio (фото меняются, кнопки реагируют) +25\n
  [v] Перевод страницы на два языка (перевод осуществляется в направлениях Ru > En, En > Ru, языковы обозначения стилизуются) +25\n
  [v] Переключение светлой и тёмной темы (в оба направления, стили интерактивных элементов не страдают) +25\n
  [v] Реализован функционал с сохранением пользовательских настроек в localStorage +5\n
  [v] Добавлена дополнительная интерактивность при клике на кнопки +5\n
  
  Итого: 85 баллов`);
});