export const foreach = (arr, process, done = () => { }) => {

  const length = arr.length;

  for (let i = 0; i < length; i += 1) {

    process(arr[i], i, arr);

    if (i === length - 1) {

      done();

    }

  }

};

export const sendXMLHttpRequest = (url, success) => {

  const xhttp = new XMLHttpRequest();
  const READY = 4;
  const OK = 200;

  xhttp.onreadystatechange = function () {

    if (this.readyState === READY && this.status === OK) {

      success(this.responseText);

    }

  };

  xhttp.open('GET', url, true);
  xhttp.send();

  return;

};

