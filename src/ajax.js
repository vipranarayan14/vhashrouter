export const sendXMLHttpRequest = (url, success) => {

  const xhttp = new XMLHttpRequest();
  const READY = 4;
  const OK = 200;

  xhttp.onreadystatechange = function () {

    if (this.readyState === READY) {

      if (this.status === OK) {

        success(this.responseText);

      }

    }

  };

  xhttp.open('GET', url, true);
  xhttp.send();

  return;

};
