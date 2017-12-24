function runOnce() {

  console.log('I must be shown only once.');
}

document.querySelector('#Internationalized_URL')
.insertAdjacentHTML('afterend', '<br><b><i>This text was set dynamically :)</i><b>');

runOnce();