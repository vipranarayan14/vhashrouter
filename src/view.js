import { activeHashClass, navPageSelector } from './literals';
import { setContent } from './content';
import { setResources } from './resources';

const hideAllViews = () => {

  const views = document.querySelectorAll(`.${navPageSelector}`);

  views.forEach(view => {

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
  setResources(routeConfig);

  window.scrollTo(0, 0);

};
