import { goToDefaultRoute, goToRoute } from "./route";

export const onLoadHandler = config => () => {
  const { hash } = window.location;

  if (!hash) goToDefaultRoute(config);
  else goToRoute(config, hash);
};

export const onHashChangeHandler = config => () => {
  goToRoute(config, window.location.hash);
}