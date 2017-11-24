; (function () {

  "use strict";

  const activeHashClass = 'hr-active-hash';

  let HashRouter = {};
  let loadedRsrcs = { navPages: {}, styles: {}, scripts: {} };

  let navPageSel = '', navPages = '';

  let config = {
    defaultRoute: '',
    navPageSelector: 'hr-navPage',
    navRoutes: []
  };

  function activateNavPage(navPageToShow) {

    HashRouter.currentNavPage = navPageToShow;

    navPageToShow.classList.add(activeHashClass);
  }

  function changeView(hashVal, navPageID, navPage) {

    hideAllNavPages();

    activateNavPage(navPage);

    setNavPageContentIfExists(navPageID, navPage);

    window.scrollTo(0, 0);
  }

  function configureDefaultPage() {

    if (!config.defaultRoute) {

      let firstNavPageEle = navPages[0];

      if (firstNavPageEle && firstNavPageEle.id) {

        config.defaultRoute = '#/' + firstNavPageEle.id;

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

    navPages = Array.prototype.slice.call(document.querySelectorAll('.' + navPageSel));

    HashRouter.navPages = navPages;
  }

  function findNavPage(navPageID) {

    return navPages.find(item => item.id === navPageID);
  }

  function goToDefaultPage() {

    window.location.hash = config.defaultRoute;
  }

  function HashHandler() {

    let hashVal = window.location.hash;
    let hashQueries = hashVal.split('/');
    let navRoute = config.navRoutes.find(item => item.route === hashVal);
    let navPageID = (navRoute) ? navRoute.id : hashQueries[1];

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

  function loadResources(rsrcs, onSuccess) {

    if (rsrcs) {

      addResource('styles', rsrcs);
      addResource('scripts', rsrcs, onSuccess);
    }
  }

  function addResource(type, rsrcs, onSuccess) {

    rsrcs = rsrcs[type];

    if (rsrcs) {

      for (let i = 0, len = rsrcs.length; i < len; i++) {

        if (loadedRsrcs[type][JSON.stringify(rsrcs[i])]) {

          if (type === 'scripts' && i === (len - 1)) {
            
            onSuccess();
          }

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

    url = encodeURIComponent(url);

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

  function getNavPage(urlToGet, navPageToGet, navPageTarget, onSuccess, onFailure) {

    sendXMLHttpRequest(urlToGet, (navPageContent) => {

      if (navPageContent) {

        loadedRsrcs.navPages[urlToGet] = true;
        navPageTarget.innerHTML = navPageContent;

        loadResources(navPageToGet.rsrcs, onSuccess);
      }
    }, onFailure);
  }

  function setNavPageContentIfExists(navPageID, navPageTarget) {

    const navPagesToGet = config.navRoutes;

    if (navPagesToGet) {

      let navPageToGet = navPagesToGet.find(item => item.id === navPageID);

      if (navPageToGet) {

        let urlToGet = navPageToGet.url;
        let onSuccess = navPageToGet.onSuccess || function () { };
        let onFailure = navPageToGet.onFailure || function () { };

        if (loadedRsrcs.navPages[urlToGet]) {

          onSuccess();
        } else {

          getNavPage(urlToGet, navPageToGet, navPageTarget, onSuccess, onFailure);
        }
      }
    }
  }

  HashRouter.init = initHashRouting;

  window.HashRouter = HashRouter;
  window.loadedRsrcs = loadedRsrcs;

})(window);