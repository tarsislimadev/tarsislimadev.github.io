console.log('ppp');

document.getElementsByTagName('body')[0].addEventListener('click', function() {
  document.querySelector('#app').innerHTML += Date.now() + '<br/>';
});
