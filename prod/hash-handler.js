function HashHandler() {

  let hashVal = window.location.hash;

  if (hashVal) {

    let hashQueries = hashVal.split('/');

    if (hashQueries.length > 1) {

      let navRoute = findNavRoute(hashVal);
      let navPageID = (navRoute) ? navRoute.id : hashQueries[1];
      let navPage = findNavPage(navPageID);

      if (navPage) {

        changeView(hashVal, navPageID, navPage, navRoute);

      } else goToDefaultRoute();

    } else return;

  } else goToDefaultRoute();
}