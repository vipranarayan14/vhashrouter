import { onHashChangeHandler, onLoadHandler } from './handlers';
import { initStyles } from './init-styles';
import { parseConfig } from './parse-config';

window.HashRouter = {

  addedResources: [],

  init(originalConfig) {

    const config = parseConfig(originalConfig);

    initStyles();

    window.addEventListener('hashchange', onHashChangeHandler(config));
    window.addEventListener('load', onLoadHandler(config));

  },

  routeParams: []
};
