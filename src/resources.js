const addedResources = [];

const getResourceType = resource => resource.split('.').pop().toUpperCase();

const addResource = resource => {

  const resourceType = getResourceType(resource);

  let tag = '';

  if (resourceType === 'JS') {

    tag = `<script src='${resource}' async>`;

  }
  else if (resourceType === 'CSS') {

    tag = `<link rel='stylesheet' href='${resource}'>`;

  }

  document.querySelector('head').insertAdjacentHTML('beforeend', tag);

  addedResources[resource] = true;

};

export const setResources = routeConfig => {

  if (!routeConfig.resources) {

    return;

  }

  routeConfig.resources.forEach(resource => {

    if (!addedResources[resource]) {

      addResource(resource);

    }

  });

};
