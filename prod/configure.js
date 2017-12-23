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

function configureRoutes() {

  navRoutesWithVars = config.navRoutes.filter(navRoute => {

    if (navRoute.route.indexOf('{') > -1) {

      navRoute.route = makeRegExp(navRoute.route);

      return navRoute;
    }
  });
}

function configureVariables() {

  navPageSel = config.navPageSelector;

  navPages = Array.prototype.slice.call(document.querySelectorAll('.' + navPageSel));

  externalNavPages = config.navRoutes.filter(navRoute => !!navRoute.url);

  HashRouter.navPages = navPages;
}

function configureOptions(options = {}) {

  if (options) {

    config = Object.assign(config, options);
  }

  configureVariables();
  configureRoutes();
  configureDefaultRoute();
}
