import { foreach } from './utils';
import { vHashRouter } from './index';

const addScriptTag = url => {

  const tag = document.createElement('SCRIPT');

  tag.type = 'text/javascript';
  tag.src = url;

  document.body.appendChild(tag);

};

const addStyleTag = url => {

  const tag = document.createElement('LINK');

  tag.rel = 'stylesheet';
  tag.href = url;

  document.head.appendChild(tag);

};

export const addResources = routeConfig => {

  foreach(routeConfig.resources.scripts, script => {

    if (!vHashRouter.addedResources.includes(script)) {

      addScriptTag(script);

      vHashRouter.addedResources.push(script);

    }

  });

  foreach(routeConfig.resources.styles, style => {

    if (!vHashRouter.addedResources.includes(style)) {

      addStyleTag(style);

      vHashRouter.addedResources.push(style);

    }

  });

};
