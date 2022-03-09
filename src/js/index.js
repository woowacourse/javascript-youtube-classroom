import '../css/index.css';
import { $ } from './util/domHelper.js';

const searchModalButton = $('#search-modal-button');
const modalContainer = $('.modal-container');

function handleOpenModal() {
  modalContainer.classList.remove('hide');
}

searchModalButton.addEventListener('click', handleOpenModal);

function handleCloseModal(e) {
  if (e.target.matches('#search-modal-button')) {
    return;
  }

  if (!e.target.closest('.search-modal')) {
    modalContainer.classList.add('hide');
  }
}

document.addEventListener('click', handleCloseModal);
