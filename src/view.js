import { activeHashClass, navPageSelector } from './literals';

const hideAllViews = () => {

  const views = document.querySelectorAll(`.${ navPageSelector}`);

  views.forEach(view => {

    view.classList.remove(activeHashClass);

  });

};

const showView = viewId => {

  document.querySelector(`#${ viewId}`)
    .classList.add(activeHashClass);

};

export const changeView = (config, routeConfig) => {

  hideAllViews();
  showView(routeConfig.targetId);

  window.scrollTo(0, 0);

};
