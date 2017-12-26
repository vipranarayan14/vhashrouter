import { foreach } from './utils';

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

  const { HashRouter } = window;

  foreach(routeConfig.resources.scripts, script => {

    if (!HashRouter.addedResources.includes(script)) {

      addScriptTag(script);

      HashRouter.addedResources.push(script);

    }

  });

  foreach(routeConfig.resources.styles, style => {

    if (!HashRouter.addedResources.includes(style)) {

      addStyleTag(style);

      HashRouter.addedResources.push(style);

    }

  });

};
