import goToDefaultRoute from './default-route';
import findRoute from './find-route';
import changeView from './change-view';

function hashHandler(event) {

  const hashVal = window.location.hash;

  if (!hashVal) goToDefaultRoute();

  if (hashVal.indexOf('/') < 0) return;

  const route = findRoute(hashVal);

  if (!route) return;

  event.preventDefault();

  changeView(route);
}

export default hashHandler;