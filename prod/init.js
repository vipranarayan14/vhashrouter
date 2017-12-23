import constants from './constants';

function initStyles() {

  const style = document.createElement('style');

  style.id = 'hash-router-styles';
  style.appendChild(document.createTextNode('')); //WebKit Hack
  document.head.appendChild(style);

  const styleSheet = style.sheet;

  styleSheet.insertRule('.' + constants.navPageSel + ' { display: none }', 0);
  styleSheet.insertRule('.' + constants.navPageSel + '.' + constants.activeHashClass + '{ display: block }', 0);
}

function initEventListeners() {

  window.addEventListener('load', HashHandler);
  window.addEventListener('hashchange', HashHandler);
}

function initHashRouting() {

  initStyles();
  // initEventListeners();
}

export default initHashRouting;