import { addResources } from './resources';
import { foreach } from './utils';
import { setContent } from './content';

const hideAllViews = (viewSelector, activeViewClass) => {

  const views = document.querySelectorAll(`.${viewSelector}`);

  foreach(views, view => {

    view.classList.remove(activeViewClass);

  });

};

const showView = (view, activeViewClass) => {

  view.classList.add(activeViewClass);

};

export const changeView = (config, routeConfig) => {

  const view = document.querySelector(`#${routeConfig.viewId}`);

  hideAllViews(config.viewSelector, config.activeViewClass);

  showView(view, config.activeViewClass);

  setContent(view, routeConfig);

  addResources(routeConfig);

  window.scrollTo(0, 0);

};
