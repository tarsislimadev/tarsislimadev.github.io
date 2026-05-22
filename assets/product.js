const post_title_elements = document.getElementsByClassName('post_title');

alert('product')

window.addEventListener('DOMContentLoaded', () => {
  console.log('DOM loaded');
  const id = window.location.search.split('id=')[1];
  post_title_elements.forEach(element => element.textContent = `Product ${id}`);
});
