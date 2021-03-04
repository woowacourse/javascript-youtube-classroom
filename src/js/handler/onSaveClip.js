import { renderSavedClips } from '../view/main.js';
import localStorage from '../utils/localStorage.js';
import { ERROR_MESSAGE, YOUTUBE } from '../utils/constant.js';

export const onSaveClip = ({ target }) => {
  if (target.dataset.js !== 'save-button') {
    return;
  }

  const clipIndex = target.dataset.clipIndex;
  const recentSearchResults = localStorage.get('recentSearchResults') ?? [];
  const savedClips = localStorage.get('savedClips') ?? [];

  if (savedClips.length >= YOUTUBE.MAXIMUM_SAVE_CLIPS) {
    alert(ERROR_MESSAGE.EXCEED_MAXIMUM_CLIP_COUNT);
    return;
  }

  savedClips.push(recentSearchResults[clipIndex]);
  localStorage.set('savedClips', savedClips);

  renderSavedClips(savedClips);
};
