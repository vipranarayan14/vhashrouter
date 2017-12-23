function runOnSuccess(onSuccess) {

  onSuccess(navRouteVars, HashRouter);
}

function runOnFailure(onFailure) {

  onFailure(HashRouter);
}