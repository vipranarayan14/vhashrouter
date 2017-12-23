import constants from './constants';
import hashHandler from './hash-handler';

function initStyles() {

  const style = document.createElement('style');

  style.innerHTML = `
    .${constants.navPageSelector} {
      display: none;
    }

    .${constants.navPageSelector}.${constants.activeHashClass} {
      display: block;
    }
  `;

  document.head.appendChild(style);
}

function initEventListeners() {

  window.addEventListener('load', hashHandler);
  window.addEventListener('hashchange', hashHandler);
}

function initHashRouting() {

  initStyles();
  initEventListeners();
}

export default initHashRouting;