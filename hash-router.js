; (function () {

  const activeHashClass = 'active-hash';

  let HashRouter = {};
  let navPageSel, navLinkSel, navLinks, navPages, hashVal;

  let config = {
    navPageSelector: 'navPage',
    navLinkSelector: 'navLink'
  }

  function activateNavLink(navLinkToShow) {

    if (navLinkToShow) {

      HashRouter.currentNavLink = navLinkToShow;

      navLinkToShow.classList.add(activeHashClass);
    }
  }

  function activateNavPage(navPageToShow) {

    HashRouter.currentNavPage = navPageToShow;

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

      insertContentIfExists(hashVal);

      window.scrollTo(0, 0);
    }
  }

  function configureOptions(options) {

    if (options) {

      config = Object.assign(config, options);
    }

    configureVariables();
  }

  function configureVariables() {

    navPageSel = config.navPageSelector;
    navLinkSel = config.navLinkSelector;

    navPages = document.querySelectorAll('.' + navPageSel);
    navLinks = document.querySelectorAll('.' + navLinkSel);

    HashRouter.navLinks = navLinks;
    HashRouter.navPages = navPages;
  }

  function getNavTargets() {

    let navPage = '', navLink = '';

    if (hashVal) {

      navPage = document.querySelector(hashVal);
      navLink = document.querySelector('a[href="' + hashVal + '"]' + '.' + navLinkSel);
    }

    if (!hashVal || !navPage) {

      navPage = document.querySelector(config.defaultPage + '.' + navPageSel);

      if (navPage) {

        navLink = document.querySelector('a[href="#' + navPage.id + '"]' + '.' + navLinkSel);
      } else {

        navPage = document.querySelector('.' + navPageSel);
        navLink = document.querySelector('.' + navLinkSel);
      }
    }

    return { navPage, navLink };
  }

  function goToDefaultPage() {

    location.hash = config.defaultPage;
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

  function insertContentIfExists(hashVal) {

    const navPagesToGet = config.navPagesToGet;
    let navPageToGet = '';

    if (navPagesToGet) {

      navPageToGet = config.navPagesToGet.find(item => item.route === hashVal);

      if (navPageToGet) {

        const xhttp = new XMLHttpRequest();

        xhttp.onreadystatechange = function () {

          if (this.readyState == 4) {

            if (this.status == 200) {

              document.querySelector(hashVal).innerHTML = this.responseText;
            }
            else {

              goToDefaultPage();
            }
          }
        }

        xhttp.open("GET", navPageToGet.pageToGet, true);
        xhttp.send();

        return;
      }
    }
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

  function initHashRouting(options) {

    configureOptions(options);
    initStyles();
    initEventListeners();
  }

  HashRouter.init = initHashRouting;

  window.HashRouter = HashRouter;

})(window);