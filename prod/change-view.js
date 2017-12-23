import constants from './constants';

const pages = document.getElementsByClassName(constants.navPageSelector);

function hideOtherPages() {

  for (let i = 0, len = pages.length; i < len; i++) {

    pages[i].classList.remove(constants.activeHashClass);
  }
}

function showPage(targetId) {

  const pageToShow = document.getElementById(targetId);

  // HashRouter.currentNavPage = pageToShow;

  pageToShow.classList.add(constants.activeHashClass);
}

function changeView(route) {
  
  hideOtherPages();

  showPage(route.targetId);

  // hasContent(route, setContent);

  window.scrollTo(0, 0);
}

export default changeView;