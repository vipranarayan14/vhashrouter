  function initStyles() {

    const style = document.createElement('style');

    style.id = 'hash-router-styles';
    style.appendChild(document.createTextNode('')); //WebKit Hack
    document.head.appendChild(style);

    const styleSheet = style.sheet;

    styleSheet.insertRule('.' + navPageSel + ' { display: none }', 0);
    styleSheet.insertRule('.' + navPageSel + '.' + activeHashClass + '{ display: block }', 0);
  }

  function initEventListeners() {

    window.addEventListener('load', HashHandler);
    window.addEventListener('hashchange', HashHandler);
  }

  function initHashRouting(options) {

    configureOptions(options);
    initStyles();
    initEventListeners();
  }