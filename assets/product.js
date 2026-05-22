const post_title_elements = Array.from(document.getElementsByClassName('post-title'));

const API = require('./api/index.js');

window.addEventListener('DOMContentLoaded', () => {
  console.log('DOM loaded');
  const id = window.location.search.split('id=').at(-1);
  post_title_elements.map(element => element.textContent = `Loading product ${id}`);

  API.fetch(`/products/${id}`).then(product => {
    post_title_elements.map(element => element.textContent = product.name);
  }).catch(error => {
    console.error('Error fetching product:', error);
    post_title_elements.map(element => element.textContent = 'Error loading product');
  });
});
