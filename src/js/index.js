import { $ } from './utils/elements.js';

const $searchButton = $('#search-button');
const $searchModal = $('#video-search-modal');
const $modalCloseButton = $('#modal-close-button');

$searchButton.addEventListener('click', () =>
  $searchModal.classList.add('open')
);
$modalCloseButton.addEventListener('click', () =>
  $searchModal.classList.remove('open')
);
