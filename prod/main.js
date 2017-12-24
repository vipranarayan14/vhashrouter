import initHashRouting from './init';
import configuration from './configure';

const HashRouter = {};

HashRouter.init = initHashRouting;
HashRouter.config = configuration.configureOptions;
HashRouter._options = configuration.options;

window.HashRouter = HashRouter;

/*

HashRouter.init = config => {

  window.onload = () => {

    hashHandler = () => {};

    removeListener = window.addEventListener('hashchange', () => {});

  }

}

HashRouter.updateConfig = config => {

  tearDown(); // removeListener();

  HashRouter.init(config);

}

*/
