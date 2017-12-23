
function loadResources(rsrcUrls, onSuccess) {

  if (rsrcUrls) {

    addResource('styles', rsrcUrls);
    addResource('scripts', rsrcUrls, onSuccess);
  }
}

function addResource(type, rsrcUrls, onSuccess) {

  rsrcUrls = rsrcUrls[type];

  if (rsrcUrls) {

    for (let i = 0, len = rsrcUrls.length; i < len; i++) {

      let rsrcUrl = encodeURIComponent(rsrcUrls[i]);

      if (loadedRsrcs[type][rsrcUrl]) {

        if (type === 'scripts' && i === (len - 1)) {

          runOnSuccess(onSuccess);
        }

      } else {

        let tag = '';

        if (type === 'styles') {

          tag = document.createElement('LINK');
          tag.rel = 'stylesheet';
          tag.href = rsrcUrl;

        } else if (type === 'scripts') {

          tag = document.createElement('SCRIPT');
          tag.type = 'text/javascript';
          tag.src = rsrcUrl;
          tag.async = true;

          if (i === (len - 1)) {

            tag.addEventListener('load', () => {

              runOnSuccess(onSuccess);
            });
          }
        }

        document.head.appendChild(tag);
        loadedRsrcs[type][rsrcUrl] = true;
      }
    }
  }
}

function sendXMLHttpRequest(url, success, error) {

  const xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function () {

    if (this.readyState == 4) {

      if (this.status === 200) {

        success(this.responseText);
      }

      else runOnFailure(error);
    }
  };

  xhttp.open('GET', url, true);
  xhttp.send();

  return;
}

function getNavPage(urlToGet, navPageToGet, navPageTarget, onSuccess, onFailure) {

  sendXMLHttpRequest(urlToGet, (navPageContent) => {

    if (navPageContent) {

      loadedRsrcs.navPages[urlToGet] = true;
      navPageTarget.innerHTML = navPageContent;

      loadResources(navPageToGet.rsrcs, onSuccess);
    }
  }, onFailure);
}

function setContent(externalPage, navPageTarget, onSuccess, onFailure) {

  if (externalPage) {

    let urlToGet = encodeURIComponent(externalPage.url);

    if (loadedRsrcs.navPages[urlToGet]) {

      runOnSuccess(onSuccess);
    } else {

      getNavPage(urlToGet, externalPage, navPageTarget, onSuccess, onFailure);
    }
  }
}