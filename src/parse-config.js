import { makeRegExp } from './make-regex';

const defaultRouteConfig = {
  hash: '',
  onLoadResources: () => { },
  onNavigate: () => { },
  resources: [],
  sourceUrl: '',
  targetId: ''
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
