import { $ } from '../utils/querySelector.js';
import { closeModal } from '../view/modal.js';
import { onModalShow } from './onModalShow.js';
import { onToggleRenderedClips } from './onToggleRenderedClips.js';

const $unwatchedButton = $('[data-js="navigator__unwatched-button"]');
const $watchedButton = $('[data-js="navigator__watched-button"]');
const $modal = $('[data-js="youtube-search-modal"]');

const actions = {
  F1: () => onToggleRenderedClips({ target: $unwatchedButton }),
  F2: () => onToggleRenderedClips({ target: $watchedButton }),
  F3: () => ($modal.classList.contains('open') ? closeModal() : onModalShow()),
  Escape: () => $modal.classList.contains('open') && closeModal(),
};

export const onWindowInput = ({ key }) => {
  actions[key] && actions[key]();
};
