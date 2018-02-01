const sendXMLHttpRequest = (url, success) => {

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

const usagePage = document.querySelector('#Usage');

sendXMLHttpRequest('resources/vhashrouter.config.js', content => {

  usagePage.innerHTML = `<pre><code class="javascript">${ content }</code></pre>`;

  window.hljs.highlightBlock(usagePage.querySelector('pre code'));

});
