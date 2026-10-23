console.log('ppp');

document.body.addEventListener('click', function() {
  document.querySelector('#app').innerHTML += Date.now() + '<br/>';
});
