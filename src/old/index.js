import { $ } from 'old/utils/querySelector';

import { onModalShow } from './handler/onModalShow';
import { closeModal } from '../js/view/modal';
import { handleSearchItem } from './handler/handleSearchItem';
// import { onScroll } from './handler/handleScroll.js';
// import { handleSave } from './handler/handleSave.js';

export const YoutubeClassRoom = () => {
  $('#search-button').addEventListener('click', onModalShow);

  $('[data-js=youtube-search-modal__form]').addEventListener(
    'submit',
    handleSearchItem,
  );
  // document.addEventListener('scroll', onScroll);
  // $('[data-js=youtube-search-modal__video-wrapper']).addEventListener('click',handleSave)
};

window.onload = () => {
  YoutubeClassRoom();
};
