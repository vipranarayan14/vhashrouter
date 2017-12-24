import { makeRegExp } from './make-regex';

const defaultRouteConfig = {
  contentUrl: '',
  hash: '',
  onLoadResources: () => { },
  onNavigate: () => { },
  resources: [],
  viewId: ''
};

const extendRouteConfig = routeConfig => Object.assign(
  {},
  defaultRouteConfig,
  routeConfig
);

const applyRouteHash = routeConfig => Object.assign(
  {},
  routeConfig,
  { hash: makeRegExp(routeConfig.hash) }
);

export const parseConfig = config => Object.assign(
  {},
  config,
  {
    routes: config.routes
      .map(extendRouteConfig)
      .map(applyRouteHash)
  }
);
