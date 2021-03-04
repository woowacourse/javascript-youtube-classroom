import { onModalShow } from './handler/onModalShow.js';
import { closeModal } from './view/viewModal.js';
import { $ } from './utils/querySelector.js';

export const YoutubeClassRoom = () => {
  $('#search-button').addEventListener('click', onModalShow);
  $('.modal-close').addEventListener('click', closeModal);
};

window.onload = () => {
  YoutubeClassRoom();
};
