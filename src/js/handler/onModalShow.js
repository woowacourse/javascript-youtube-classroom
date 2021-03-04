import localStorage from '../utils/localStorage.js';
import {
  openModal,
  renderClips,
  renderSaveVideoCount,
  renderRecentKeywords,
} from '../view/modal.js';

export const onModalShow = () => {
  const savedClips = localStorage.get('savedClips') ?? [];
  const savedClipIds = savedClips.map((savedClip) => savedClip.id.videoId);
  const recentKeywords = localStorage.get('recentKeywords') ?? [];
  const recentSearchResults = localStorage.get('recentSearchResults');

  openModal();
  console.log(recentKeywords);
  renderRecentKeywords(recentKeywords);
  renderSaveVideoCount(savedClips);

  if (recentSearchResults) {
    renderClips(recentSearchResults, savedClipIds);
  }
};
