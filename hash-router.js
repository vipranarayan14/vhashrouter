; (function () {

  "use strict";

  const activeHashClass = 'hr-active-hash';

  let HashRouter = {};
  let loadedRsrcs = { navPages: {}, styles: {}, scripts: {} };

  let navLinkSel = '', navPageSel = '', navLinks = '', navPages = '';

  let config = {
    defaultNavPageID: '',
    navPageSelector: 'hr-navPage',
    navLinkSelector: 'hr-navLink',
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

    setNavPageContentIfExists(navPageID, navPage);

    window.scrollTo(0, 0);
  }

  function configureDefaultPage() {

    if (!config.defaultNavPageID) {

      let firstNavPageEle = navPages[0];

      if (firstNavPageEle && firstNavPageEle.id) {

        config.defaultNavPageID = firstNavPageEle.id;

      } else {

        return console.error('HashRouter: Default page is not set');
      }
    }
  }

  function configureOptions(options = {}) {

    if (options) {

      config = Object.assign(config, options);
    }

    configureVariables();
    configureDefaultPage();
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

  function goToDefaultPage() {

    window.location.hash = '#/' + config.defaultNavPageID;
  }

  function HashHandler() {

    let hashVal = window.location.hash;
    let navPageID = hashVal.replace('#/', '');

    if (hashVal) {

      let navPage = findNavPage(navPageID);

      if (navPage) {

        changeView(hashVal, navPageID, navPage);

      } else return;

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

  function loadResources(navPageToGet, onSuccess) {

    addResource('styles', navPageToGet);
    addResource('scripts', navPageToGet, onSuccess);
  }

  function addResource(type, navPageToGet, onSuccess) {

    const rsrcs = navPageToGet.rsrcsToInject[type];

    if (rsrcs) {

      for (let i = 0, len = rsrcs.length; i < len; i++) {

        if (loadedRsrcs[type][JSON.stringify(rsrcs[i])]) {

          if (type === 'scripts' && i === (len - 1)) onSuccess();

        } else {

          let tag = '';

          if (type === 'styles') {

            tag = document.createElement('LINK');
            tag.rel = 'stylesheet';
            tag.href = rsrcs[i];

          } else if (type === 'scripts') {

            tag = document.createElement('SCRIPT');
            tag.type = 'text\/javascript';
            tag.src = rsrcs[i];
            tag.async = true;

            if (i === (len - 1)) {

              tag.addEventListener('load', onSuccess);
            }
          }

          document.head.appendChild(tag);
          loadedRsrcs[type][JSON.stringify(rsrcs[i])] = true;
        }
      }
    }
  }

  function sendXMLHttpRequest(url, success, error) {

    const xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {

      if (this.readyState == 4) {

        if (this.status === 200) {

          success(this.responseText);
        }

        else error();
      }
    }

    xhttp.open("GET", url, true);
    xhttp.send();

    return;
  }

  function loadNavPage(urlToGet, navPageToGet, navPageTarget, onSuccess) {

    navPageTarget.innerHTML = JSON.parse(loadedRsrcs.navPages[urlToGet]);

    loadResources(navPageToGet, onSuccess);
  }

  function getNavPage(urlToGet, navPageToGet, navPageTarget, onSuccess, onFailure) {

    sendXMLHttpRequest(navPageToGet.urlToGet, (navPageContent) => {

      if (navPageContent) {

        loadedRsrcs.navPages[urlToGet] = JSON.stringify(navPageContent);
        navPageTarget.innerHTML = navPageContent;

        loadResources(navPageToGet, onSuccess);
      };
    }, onFailure);
  }

  function setNavPageContentIfExists(navPageID, navPageTarget) {

    const navPagesToGet = config.navPagesToGet;

    if (navPagesToGet) {

      let navPageToGet = config.navPagesToGet.find(item => item.navPageID === navPageID);

      if (navPageToGet) {

        let urlToGet = JSON.stringify(navPageToGet.urlToGet);
        let onSuccess = navPageToGet.onSuccess || function () { };
        let onFailure = navPageToGet.onFailure || function () { };

        if (loadedRsrcs.navPages[urlToGet]) {

          loadNavPage(urlToGet, navPageToGet, navPageTarget, onSuccess);
        } else {

          getNavPage(urlToGet, navPageToGet, navPageTarget, onSuccess, onFailure);
        }
      }
    }
  }

  HashRouter.init = initHashRouting;

  window.HashRouter = HashRouter;

})(window);