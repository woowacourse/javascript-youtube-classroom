import $DOM from '../utils/DOM.js';
import { clipTemplate } from './clipTemplate.js';

export const openModal = () => {
  $DOM.SEARCH_MODAL.CONTAINER.classList.add('open');
};

export const closeModal = () => {
  $DOM.SEARCH_MODAL.CONTAINER.classList.remove('open');
};

const recentKeywordTemplate = (keyword) => {
  return `<a class="chip" data-js="youtube-search-modal__chip">${keyword}</a>`;
};

export const renderRecentKeywords = (recentKeywords) => {
  $DOM.SEARCH_MODAL.CHIP_CONTAINER.innerHTML = recentKeywords
    .map(recentKeywordTemplate)
    .join('');
};

export const renderSaveVideoCount = (saveClips) => {
  $DOM.SEARCH_MODAL.SAVE_VIDEO_COUNT.innerText = `저장된 영상 갯수: ${saveClips.length}개`;
};

export const renderExtraClips = (videoItems, savedClipIds) => {
  const extraClips = videoItems
    .map((video, index) => {
      const isSaved = savedClipIds.includes(video.id.videoId);
      return clipTemplate(video, index, { isModal: true, isSaved });
    })
    .join('');

  $DOM.SEARCH_MODAL.VIDEO_WRAPPER.insertAdjacentHTML('beforeend', extraClips);
};

export const renderClips = (videoItems, savedClipIds) => {
  $DOM.SEARCH_MODAL.VIDEO_WRAPPER.innerHTML = videoItems
    .map((video, index) => {
      const isSaved = savedClipIds.includes(video.id.videoId);
      return clipTemplate(video, index, { isModal: true, isSaved });
    })
    .join('');
};

export const setRecentKeywords = (recentKeywords) => {
  $DOM.SEARCH_MODAL.RECENT_KEYWORDS.innerHTML =
    recentKeywordsLabel() + recentKeywords.map(recentKeywordTemplate).join('');
};

export const clearSearchResult = () => {
  $DOM.SEARCH_MODAL.VIDEO_WRAPPER.innerHTML = '';
};
