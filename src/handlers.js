import { goToDefaultRoute, goToRoute } from './route';

export const onLoadHandler = config => event => {

  const { hash } = window.location;

  if (!hash) {

    goToDefaultRoute(config);

  } else {

    goToRoute(config, hash, event);

  }

};

export const onHashChangeHandler = config => event => {

  goToRoute(config, window.location.hash, event);

};
