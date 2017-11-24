function sayHello() {

  console.log('I said hello!');
  
  document.querySelector('#Internationalized_URL')
    .insertAdjacentHTML('afterend', '<br><b><i>This text was set dynamically :)</i><b>');
}