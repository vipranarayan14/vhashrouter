(function () {

  'use strict';

  const activeHashClass = 'hr-active-hash';

  let HashRouter = {};
  let loadedRsrcs = { navPages: {}, styles: {}, scripts: {} };

  let navPageSel = '',
    navPages = [],
    externalNavPages = {},
    navRoutesWithVars = [],
    navRouteVars = [];

  let config = {
    defaultRoute: '',
    navPageSelector: 'hr-navPage',
    navRoutes: []
  };

  function activateNavPage(navPageToShow) {

    HashRouter.currentNavPage = navPageToShow;

    navPageToShow.classList.add(activeHashClass);
  }

  function changeView(hashVal, navPageID, navPage, navRoute) {

    hideAllNavPages();

    activateNavPage(navPage);

    if (navRoute) {

      hasContent(hashVal, navPage, navRoute, setContent);
    }

    window.scrollTo(0, 0);
  }

  function hasContent(hashVal, navPage, navRoute, setContent) {

    let onSuccess = navRoute.onSuccess || function () { };
    let onFailure = navRoute.onFailure || function () { };

    if (externalNavPages) {

      let externalPage = externalNavPages.find(item => item.route === hashVal); //TODO hashroute match

      setContent(externalPage, navPage, onSuccess, onFailure);
    }
  }

  function configureDefaultRoute() {

    if (!config.defaultRoute) {

      let firstNavPageEle = navPages[0];

      if (firstNavPageEle && firstNavPageEle.id) {

        config.defaultRoute = '#/' + firstNavPageEle.id;

      } else {

        throw new Error('HashRouter: Default page is not set');
      }
    }
  }

  function configureOptions(options = {}) {

    if (options) {

      config = Object.assign(config, options);
    }

    configureVariables();
    configureRoutes();
    configureDefaultRoute();
  }

  function configureRoutes() {

    navRoutesWithVars = config.navRoutes.filter(navRoute => {

      if (navRoute.route.indexOf('{') > -1) {

        navRoute.route = makeRegExp(navRoute.route);

        return navRoute;
      }
    });
  }

  function makeRegExp(str) {

    str = str.replace(/[-/\\^$*+?.()|[\]]/g, '\\$&')
      .replace(/\$/g, '$$$$')
      .replace(/{(.+?)}/g, '(.[^/]*)');

    str = new RegExp(str);

    return str;
  }

  function configureVariables() {

    navPageSel = config.navPageSelector;

    navPages = Array.prototype.slice.call(document.querySelectorAll('.' + navPageSel));

    externalNavPages = config.navRoutes.filter(navRoute => !!navRoute.url);

    HashRouter.navPages = navPages;
  }

  function findNavPage(navPageID) {

    return navPages.find(item => item.id === navPageID);
  }

  function goToDefaultRoute() {

    window.location.hash = config.defaultRoute;
  }

  function HashHandler() {

    let hashVal = window.location.hash;

    if (hashVal) {

      let hashQueries = hashVal.split('/');

      if (hashQueries.length > 1) {

        let navRoute = findNavRoute(hashVal);
        let navPageID = (navRoute) ? navRoute.id : hashQueries[1];
        let navPage = findNavPage(navPageID);

        if (navPage) {

          changeView(hashVal, navPageID, navPage, navRoute);

        } else goToDefaultRoute();

      } else return;

    } else goToDefaultRoute();
  }

  function findNavRoute(hashVal) {

    let navRoute = config.navRoutes.find(item => item.route === hashVal);

    if (navRoute) {

      return navRoute;
    } else {

      navRoute = navRoutesWithVars.find(item => {

        let routeMatch = hashVal.match(item.route);

        if (routeMatch) {

          navRouteVars = [];

          routeMatch.forEach(element => {

            navRouteVars.push(element);
          });

          return item;
        }
      });

      return navRoute;
    }
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

    const style = document.createElement('style');

    style.id = 'hash-router-styles';
    style.appendChild(document.createTextNode('')); //WebKit Hack
    document.head.appendChild(style);

    const styleSheet = style.sheet;

    styleSheet.insertRule('.' + navPageSel + ' { display: none }', 0);
    styleSheet.insertRule('.' + navPageSel + '.' + activeHashClass + '{ display: block }', 0);
  }

  function loadResources(rsrcUrls, onSuccess) {

    if (rsrcUrls) {

      addResource('styles', rsrcUrls);
      addResource('scripts', rsrcUrls, onSuccess);
    }
  }

  function addResource(type, rsrcUrls, onSuccess) {

    rsrcUrls = rsrcUrls[type];

    if (rsrcUrls) {

      for (let i = 0, len = rsrcUrls.length; i < len; i++) {

        let rsrcUrl = encodeURIComponent(rsrcUrls[i]);

        if (loadedRsrcs[type][rsrcUrl]) {

          if (type === 'scripts' && i === (len - 1)) {

            runOnSuccess(onSuccess);
          }

        } else {

          let tag = '';

          if (type === 'styles') {

            tag = document.createElement('LINK');
            tag.rel = 'stylesheet';
            tag.href = rsrcUrl;

          } else if (type === 'scripts') {

            tag = document.createElement('SCRIPT');
            tag.type = 'text/javascript';
            tag.src = rsrcUrl;
            tag.async = true;

            if (i === (len - 1)) {

              tag.addEventListener('load', () => {

                runOnSuccess(onSuccess);
              });
            }
          }

          document.head.appendChild(tag);
          loadedRsrcs[type][rsrcUrl] = true;
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

        else runOnFailure(error);
      }
    };

    xhttp.open('GET', url, true);
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

  function setContent(externalPage, navPageTarget, onSuccess, onFailure) {

    if (externalPage) {

      let urlToGet = encodeURIComponent(externalPage.url);

      if (loadedRsrcs.navPages[urlToGet]) {

        runOnSuccess(onSuccess);
      } else {

        getNavPage(urlToGet, externalPage, navPageTarget, onSuccess, onFailure);
      }
    }
  }

  function runOnSuccess(onSuccess) {

    onSuccess(navRouteVars, HashRouter);
  }

  function runOnFailure(onFailure) {

    onFailure(HashRouter);
  }

  HashRouter.init = initHashRouting;

  window.HashRouter = HashRouter;

})(window);