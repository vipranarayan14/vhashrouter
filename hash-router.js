; (function () {

  let navPageSel, navLinkSel, navLinks, navPages, hashVal;

  const activeHashClass = 'active-hash';

  function activateNavLink(navLinkToShow) {

    navLinkToShow.classList.add(activeHashClass);
  }

  function activateNavPage(navPageToShow) {

    navPageToShow.classList.add(activeHashClass);
  }

  function changeView() {

    hashVal = location.hash;

    let navTargets = getNavTargets(),
      navPageToShow = navTargets.navPage,
      navLinkToShow = navTargets.navLink;

    if (navPageToShow) {

      hideAllNavPages();

      activateNavPage(navPageToShow);
      activateNavLink(navLinkToShow);
    }
  }

  function getNavTargets() {

    let navPage = '', navLink = '';

    if (hashVal) {

      navPage = document.querySelector(hashVal);
      navLink = document.querySelector('a[href="' + hashVal + '"]' + '.' + navLinkSel);
    }

    if (!hashVal || !navPage) {

      navPage = document.querySelector('.' + navPageSel + '.' + activeHashClass);

      if (navPage) {

        navLink = document.querySelector('a[href="#' + navPage.id + '"]' + '.' + navLinkSel);
      } else {

        navPage = document.querySelector('.' + navPageSel);
        navLink = document.querySelector('.' + navLinkSel);
      }
    }

    return { navPage, navLink };
  }

  function initStyles() {

    const style = document.createElement("style");

    style.id = 'hash-router-styles';
    style.appendChild(document.createTextNode("")); //WebKit Hack
    document.head.appendChild(style);
    
    const styleSheet = style.sheet;

    styleSheet.insertRule('.' + navPageSel + ' { display: none }', 0);
    styleSheet.insertRule('.' + navPageSel + '.' + activeHashClass + '{ display: block }', 0);
  }

  function initEventListeners() {

    window.addEventListener('load', changeView);
    window.addEventListener('hashchange', changeView);
  }

  function hideAllNavPages() {

    for (let i = 0, len = navPages.length; i < len; i++) {

      if (navPages[i].classList.contains(activeHashClass)) {

        navPages[i].classList.remove(activeHashClass);
      }
    }

    for (let i = 0, len = navLinks.length; i < len; i++) {

      if (navLinks[i].classList.contains(activeHashClass)) {

        navLinks[i].classList.remove(activeHashClass);
      }
    }
  }

  function initHashRouting(navPageSelector = 'navPage', navLinkSelector = 'navLink') {

    navPageSel = navPageSelector;
    navLinkSel = navLinkSelector;

    navPages = document.querySelectorAll('.' + navPageSel);
    navLinks = document.querySelectorAll('.' + navLinkSel);

    initStyles();
    initEventListeners();
  }

  window.initHashRouting = initHashRouting;

})(window);