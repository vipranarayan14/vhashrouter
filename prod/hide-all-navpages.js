function hideAllNavPages() {

  for (let i = 0, len = navPages.length; i < len; i++) {

    if (navPages[i].classList.contains(activeHashClass)) {

      navPages[i].classList.remove(activeHashClass);
    }
  }
}