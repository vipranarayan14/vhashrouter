; (function () {

  "use strict";
  
  const activeHashClass = 'active-hash';

  let HashRouter = {};
  let hashVal, navPageID, navLinkSel, navPageSel, navLinks, navPages, navPage;

  let config = {
    defaultPage: '',
    navPageSelector: 'navPage',
    navLinkSelector: 'navLink',
    navPagesToGet: []
  };

  function activateNavLink(hashVal) {

    let navLinkToShow = findNavLink(hashVal);

    if (navLinkToShow) {

      HashRouter.currentNavLink = navLinkToShow;

      navLinkToShow.classList.add(activeHashClass);
    }
  }

  function activateNavPage(navPageToShow) {

    HashRouter.currentNavPage = navPageToShow;

    navPageToShow.classList.add(activeHashClass);
  }

  function changeView(hashVal, navPageID, navPage) {

    hideAllNavPages();

    activateNavPage(navPage);
    activateNavLink(hashVal);

    getNavPageContentIfExists(navPageID, navPage);

    window.scrollTo(0, 0);
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

    navPages = Array.prototype.slice.call(document.querySelectorAll('.' + navPageSel));
    navLinks = Array.prototype.slice.call(document.querySelectorAll('.' + navLinkSel));

    HashRouter.navLinks = navLinks;
    HashRouter.navPages = navPages;
  }
  
  function findNavLink(hashVal) {

    return navLinks.find(item => item.hash === hashVal);
  }

  function findNavPage(navPageID) {

    return navPages.find(item => item.id === navPageID);
  }

  function getNavPageContent(url, setNavPageContent) {

    const xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {

      if (this.readyState == 4 && this.status == 200) {

        setNavPageContent(this.responseText);
      }
    }

    xhttp.open("GET", url, true);
    xhttp.send();

    return;
  }

  function getNavPageContentIfExists(navPageID, navPage) {

    const navPagesToGet = config.navPagesToGet;
    let navPageToGet = '', navPageContent = '';

    if (navPagesToGet) {

      navPageToGet = config.navPagesToGet.find(item => item.navPageID === navPageID);

      if (navPageToGet) {

        navPageContent = getNavPageContent(navPageToGet.urlToGet, (navPageContent) => {

          if (navPageContent) {

            navPage.innerHTML = navPageContent;
          }
        });
      }
    }
  }

  function goToDefaultPage() {

    const defaultPage = config.defaultPage;
    let firstNavPageEle = '';

    if (defaultPage) {

      window.location.hash = defaultPage;
    } else {

      firstNavPageEle = navPages[0];

      if (firstNavPageEle && firstNavPageEle.id) {

        config.defaultPage = firstNavPageEle.id;

        goToDefaultPage();
      } else {

        return console.error('HashRouter: Default page is not set');
      }
    }
  }

  function HashHandler() {

    hashVal = window.location.hash;
    navPageID = hashVal.replace('#/', '');

    if (hashVal) {

      navPage = findNavPage(navPageID);

      if (navPage) {

        changeView(hashVal, navPageID, navPage);

      } else goToDefaultPage();

    } else goToDefaultPage();
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

  function initEventListeners() {

    window.addEventListener('load', HashHandler);
    window.addEventListener('hashchange', HashHandler);
  }

  function initHashRouting(options) {

    configureOptions(options);
    initStyles();
    initEventListeners();
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

  HashRouter.init = initHashRouting;

  window.HashRouter = HashRouter;

})(window);