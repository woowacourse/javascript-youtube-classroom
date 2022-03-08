const $ = (selector, node = document) => node.querySelector(selector);
const $$ = (selector, node = document) => node.querySelectorAll(selector);

$('#search-modal-button').addEventListener('click', () => {
  $('#modal-container').classList.remove('hide');
});

$('.dimmer').addEventListener('click', (e) => {
  $('#modal-container').classList.add('hide');
});

$('#search-form').addEventListener('submit', (e) => {
  e.preventDefault();
  console.log($('#search-input-keyword').value);
});
