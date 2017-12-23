import constants from './constants';

function hideAllNavPages() {

  for (let i = 0, len = navPages.length; i < len; i++) {

    if (navPages[i].classList.contains(constants.activeHashClass)) {

      navPages[i].classList.remove(constants.activeHashClass);
    }
  }
}