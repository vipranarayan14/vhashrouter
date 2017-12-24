import {activeHashClass, navPageSelector} from './literals';

const hideAllViews = () => {
  const views = document.getElementsByClassName(navPageSelector);

  for (let i = 0, length = views.length; i < length; i++) {
    views[i].classList.remove(activeHashClass);
  }
}

const showView = viewId => {
  document.getElementById(viewId)
    .classList.add(activeHashClass);
}

export const changeView = (config, routeConfig) => {
  hideAllViews();
  showView(routeConfig.targetId);
  
  window.scrollTo(0, 0);
}