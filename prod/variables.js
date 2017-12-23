const activeHashClass = 'hr-active-hash';

let HashRouter = {};
let loadedRsrcs = { navPages: {}, styles: {}, scripts: {} };

let navPageSel = '',
  navPages = [],
  externalNavPages = {},
  navRoutesWithVars = [],
  navRouteVars = [];

let config = {
  defaultRoute: '',
  navPageSelector: 'hr-navPage',
  navRoutes: []
};

export default HashRouter;