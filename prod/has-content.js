function hasContent(hashVal, navPage, navRoute, setContent) {

  const onSuccess = navRoute.onSuccess || function () { };
  const onFailure = navRoute.onFailure || function () { };

  if (externalNavPages) {

    const externalPage = externalNavPages.find(item => item.route === hashVal); //TODO hashroute match

    setContent(externalPage, navPage, onSuccess, onFailure);
  }
}