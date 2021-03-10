import $DOM from '../utils/DOM.js';
import { closeModal } from '../view/modal.js';
import { onModalShow } from './onModalShow.js';
import { onToggleRenderedClips } from './onToggleRenderedClips.js';

const actions = {
  F1: () => onToggleRenderedClips({ target: $DOM.NAVIGATOR.UNWATCHED_BUTTON }),
  F2: () => onToggleRenderedClips({ target: $DOM.NAVIGATOR.WATCHED_BUTTON }),
  F3: () =>
    $DOM.SEARCH_MODAL.CONTAINER.classList.contains('open')
      ? closeModal()
      : onModalShow(),
  Escape: () =>
    $DOM.SEARCH_MODAL.CONTAINER.classList.contains('open') && closeModal(),
};

export const onWindowInput = ({ key }) => {
  actions[key] && actions[key]();
};
