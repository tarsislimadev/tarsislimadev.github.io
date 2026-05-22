import API from './api/index.js';

const el = [document.getElementById('product')];

const id = window.location.search.split('id=').at(-1);
el.map(element => element.textContent = `Loading product ${id}`);

API.fetch(`/products/${id}`).then(product => {
  el.map(element => element.textContent = product.data.products[0]);
}).catch(error => {
  console.error('Error fetching product:', error);
  el.map(element => element.textContent = 'Error loading product');
});
