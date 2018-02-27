import { sendXMLHttpRequest } from './utils';
import { vHashRouter } from './index';

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

  const url = encodeURI(routeConfig.contentUrl);

  if (!vHashRouter.addedResources.includes(url)) {

    getContent(url, view, routeConfig.onContentLoad);

    vHashRouter.addedResources.push(url);

  }

};
