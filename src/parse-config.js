import { makeRegex } from './utils';

const defaultRouteConfig = {
  contentUrl: '',
  hash: '',
  onContentLoad: () => { },
  onNavigate: () => { },
  resources: {
    scripts: [],
    styles: []
  },
  viewId: ''
};

const applyRouteHash = routeConfig => Object.assign(
  {},
  routeConfig,
  { hash: makeRegex(routeConfig.hash) }
);

const extendRouteConfig = routeConfig => Object.assign(
  {},
  defaultRouteConfig,
  routeConfig,
  {
    resources: Object.assign(
      {},
      defaultRouteConfig.resources,
      routeConfig.resources
    )
  }
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
