import { $ } from '../utils/querySelector.js';
import { clipTemplate } from './clipTemplate.js';

const $savedPageVideoWrapper = $('[data-js=saved-page__video-wrapper]');

export const renderSavedClip = (savedClip) => {
  $savedPageVideoWrapper.insertAdjacentHTML(
    'beforeend',
    clipTemplate(savedClip, {}),
  );
};

export const renderSavedClips = (savedClips) => {
  $savedPageVideoWrapper.innerHTML = savedClips
    .map((savedClip) =>
      clipTemplate(savedClip, {
        isWatched: savedClip.isWatched,
        isLiked: savedClip.isLiked,
      }),
    )
    .join('');
};
