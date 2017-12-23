import initHashRouting from './init';
import configuration from './configure';

let HashRouter = {};

HashRouter.init = initHashRouting;
HashRouter.config = configuration.configureOptions;
HashRouter.options = configuration.options;

window.HashRouter = HashRouter;