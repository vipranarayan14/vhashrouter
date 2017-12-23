import configuration from './configure';

function findRoute(hashVal) {

  const route = configuration.options.routes.find(route => hashVal.match(route.hash));

  return route;
}

export default findRoute;



// navRoute = navRoutesWithVars.find(item => {

//   let routeMatch = hashVal.match(item.route);

//   if (routeMatch) {

//     navRouteVars = [];

//     routeMatch.forEach(element => {

//       navRouteVars.push(element);
//     });

//     return item;
//   }
// });

// return navRoute;
// }