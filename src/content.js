import { sendXMLHttpRequest } from './utils';

const getContent = (url, view, onContentLoad) => {

  sendXMLHttpRequest(url, content => {

    view.innerHTML = content;

    onContentLoad();

  });

};

export const setContent = (view, routeConfig) => {

  if (!routeConfig.contentUrl) {

    return;

  }

  const url = encodeURIComponent(routeConfig.contentUrl);

  const { vHashRouter } = window;

  if (!vHashRouter.addedResources.includes(url)) {

    getContent(url, view, routeConfig.onContentLoad);

    vHashRouter.addedResources.push(url);

  }

};
