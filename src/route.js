import { changeView } from './view';

const findRouteConfig = (config, toRoute) => config.routes.find(route => toRoute.match(route.hash));

export const goToDefaultRoute = config => {

  if (config.defaultRoute) {

    window.location.hash = config.defaultRoute;

  }

};

export const goToRoute = (config, toRoute) => {

  if (toRoute.indexOf('/') < 0) {

    return;

  }

  const routeConfig = findRouteConfig(config, toRoute);

  if (!routeConfig) {

    return;

  }

  event.preventDefault();

  changeView(config, routeConfig);

};
