document.querySelector('#search-modal-button').addEventListener('click', () => {
  document.querySelector('#modal-container').classList.remove('hide');
});

document.querySelector('.dimmer').addEventListener('click', (e) => {
  document.querySelector('#modal-container').classList.add('hide');
});
