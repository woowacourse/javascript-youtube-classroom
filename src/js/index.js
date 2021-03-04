import { onModalShow } from './handler/onModalShow.js';
import { closeModal } from './view/modal.js';
import { $ } from './utils/querySelector.js';
import { onSearchYoutube } from './handler/onSearchYoutube.js';
import { onModalScroll } from './handler/onModalScroll.js';

let timer;
const throttling = (func) => {
  if (!timer) {
    timer = setTimeout(() => {
      timer = null;
      func();
    }, 2000);
  }
};

export const YoutubeClassRoom = () => {
  $('#search-button').addEventListener('click', onModalShow);
  $('.modal-close').addEventListener('click', closeModal);
  $('[data-js="youtube-search-modal__form"]').addEventListener(
    'submit',
    onSearchYoutube,
  );

  document.addEventListener('scroll', () => {
    throttling(onModalScroll);
  });
};

window.onload = () => {
  YoutubeClassRoom();
};
