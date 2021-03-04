import { openModal, renderRecentKeywords } from '../view/modal.js';

export const onModalShow = () => {
  const recentKeywords = localStorage.get('recentKeywords') ?? [];
  const saveClips = localStorage.get('savedClips') ?? [];

  openModal();
  renderRecentKeywords(recentKeywords);
  renderSaveVideoCount(saveClips);
};
