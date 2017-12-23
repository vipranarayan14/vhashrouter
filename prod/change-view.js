function changeView(hashVal, navPageID, navPage, navRoute) {

  hideAllNavPages();

  activateNavPage(navPage);

  if (navRoute) {

    hasContent(hashVal, navPage, navRoute, setContent);
  }

  window.scrollTo(0, 0);
}