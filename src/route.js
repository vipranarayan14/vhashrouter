import { changeView } from './view';

const findRouteConfig = (config, toRoute) => config.routes.find(route => toRoute.match(route.hash));

const setRouteParams = (routeConfig, toRoute) => {

  window.vHashRouter.routeParams = toRoute.match(routeConfig.hash, toRoute);

  routeConfig.onNavigate();

};

export const goToDefaultRoute = config => {

  if (config.defaultRoute) {

    window.location.hash = config.defaultRoute;

  }

};

export const goToRoute = (config, toRoute, event) => {

  if (toRoute.indexOf('/') < 0) {

    return;

  }

  const routeConfig = findRouteConfig(config, toRoute);

  if (!routeConfig) {

    return;

  }

  event.preventDefault();

  setRouteParams(routeConfig, toRoute);

  changeView(config, routeConfig);

};
