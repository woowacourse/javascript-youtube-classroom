import { $ } from '../utils/querySelector.js';
import { clipTemplate } from './clipTemplate.js';

const $savedPageVideoWrapper = $('[data-js=saved-page__video-wrapper]');

export const renderSavedClip = (savedClip, index) => {
  $savedPageVideoWrapper.insertAdjacentHTML(
    'beforeend',
    clipTemplate(savedClip, index),
  );
};

export const renderSavedClips = (savedClips) => {
  $savedPageVideoWrapper.innerHTML = savedClips
    .map((savedClip, index) =>
      clipTemplate(savedClip, index, {
        isWatched: savedClip.isWatched,
        isLiked: savedClip.isLiked,
      }),
    )
    .join('');
};
