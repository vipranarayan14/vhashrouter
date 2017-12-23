import makeRegExp from './make-regex';

const defaultConfig = {
  defaultRoute: '',
  routes: [
    {
      hash: '',
      targetId: '',
      sourceUrl: '',
      resources: [],
      onNavigate: () => { },
      onLoadResources: () => { }
    }
  ]
};

let options = {};

function configureRoutes() {

  options.routes.forEach(route => {

    route.hash = makeRegExp(route.hash);
  });
}

function configureOptions(userConfig) {

  options = Object.assign(options, defaultConfig, userConfig);

  options.routes = options.routes.map(route => {

    return Object.assign({}, defaultConfig.routes[0], route);
  });

  configureRoutes();
}

export default { 
  configureOptions,
  options
};