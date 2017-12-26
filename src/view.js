import { activeHashClass, navPageSelector } from './literals';
import { addResources } from './resources';
import { foreach } from './utils';
import { setContent } from './content';

const hideAllViews = () => {

  const views = document.querySelectorAll(`.${navPageSelector}`);

  foreach(views, view => {

    view.classList.remove(activeHashClass);

  });

};

const showView = view => {

  view.classList.add(activeHashClass);

};

export const changeView = (config, routeConfig) => {

  const view = document.querySelector(`#${routeConfig.viewId}`);

  hideAllViews();
  showView(view);

  setContent(view, routeConfig);
  addResources(routeConfig);

  window.scrollTo(0, 0);

};
