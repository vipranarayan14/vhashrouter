import configuration from './configure';

function goToDefaultRoute() {

  const defaultRoute = configuration.options.defaultRoute;
  
  if (!defaultRoute) return;

  window.location.hash = defaultRoute;
}

export default goToDefaultRoute;