import { sendXMLHttpRequest } from './ajax';

const loadedContent = [];

const getContent = (url, view) => {

  sendXMLHttpRequest(url, content => {

    view.innerHTML = content;

    loadedContent[url] = true;

  });

};

export const setContent = (view, routeConfig) => {

  if (!routeConfig.contentUrl) {

    return;

  }

  const url = encodeURIComponent(routeConfig.contentUrl);

  if (!loadedContent[url]) {

    getContent(url, view);

  }

};
