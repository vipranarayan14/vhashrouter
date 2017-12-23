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