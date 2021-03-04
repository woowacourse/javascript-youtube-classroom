import { onModalShow } from './handler/onModalShow.js';
import { closeModal } from './view/modal.js';
import { $ } from './utils/querySelector.js';
import { onSearchYoutube } from './handler/onSearchYoutube.js';

export const YoutubeClassRoom = () => {
  $('#search-button').addEventListener('click', onModalShow);
  $('.modal-close').addEventListener('click', closeModal);
  $('[data-js="youtube-search-modal__form"]').addEventListener(
    'submit',
    onSearchYoutube,
  );
};

window.onload = () => {
  YoutubeClassRoom();
};
