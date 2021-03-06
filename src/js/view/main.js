import { $ } from '../utils/querySelector.js';
import { clipTemplate } from './clipTemplate.js';

export const renderSavedClips = (savedClips) => {
  $(
    '[data-js=saved-page__video-wrapper]',
  ).innerHTML = savedClips
    .map((savedClip, index) => clipTemplate(savedClip, index, {}))
    .join('');
};
