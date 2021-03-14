import $DOM from '../../utils/DOM.js';
import { closeModal } from '../../view/modal.js';
import { onModalShow } from '../modal/visibility/onModalShow.js';
import { onToggleRenderedClips } from '../main/onToggleRenderedClips.js';

const actions = {
  F1: () => onToggleRenderedClips({ target: $DOM.NAVIGATOR.UNWATCHED_BUTTON }),
  F2: () => onToggleRenderedClips({ target: $DOM.NAVIGATOR.WATCHED_BUTTON }),
  F4: () =>
    $DOM.SEARCH_MODAL.CONTAINER.classList.contains('open')
      ? closeModal()
      : onModalShow(),
  Escape: () =>
    $DOM.SEARCH_MODAL.CONTAINER.classList.contains('open') && closeModal(),
};

export const onWindowInput = ({ key }) => {
  actions[key]?.();
};
