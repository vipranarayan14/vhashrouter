function activateNavPage(navPageToShow) {

  HashRouter.currentNavPage = navPageToShow;

  navPageToShow.classList.add(activeHashClass);
}