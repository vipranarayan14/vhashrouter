function hasContent(hashVal, navPage, navRoute, setContent) {

  let onSuccess = navRoute.onSuccess || function () { };
  let onFailure = navRoute.onFailure || function () { };

  if (externalNavPages) {

    let externalPage = externalNavPages.find(item => item.route === hashVal); //TODO hashroute match

    setContent(externalPage, navPage, onSuccess, onFailure);
  }
}