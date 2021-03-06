import { $ } from '../utils/querySelector.js';
import { clipTemplate } from './clipTemplate.js';

const $modal = $('[data-js="youtube-search-modal"]');

export const openModal = () => {
  $modal.classList.add('open');
};

export const closeModal = () => {
  $modal.classList.remove('open');
};

const recentKeywordsLabel = () => {
  return `<span class="text-gray-700">최근 검색어: </span>`;
};

const recentKeywordTemplate = (keyword) => {
  return `<a class="chip" data-js="youtube-search-modal__chip">${keyword}</a>`;
};

export const renderRecentKeywords = (recentKeywords) => {
  $('[data-js="youtube-search-modal__recent-keywords"]').innerHTML =
    recentKeywordsLabel() + recentKeywords.map(recentKeywordTemplate).join('');
};

export const renderSaveVideoCount = (saveClips) => {
  $(
    '[data-js="youtube-search-modal__save-video-count"]',
  ).innerText = `저장된 영상 갯수: ${saveClips.length}개`;
};

export const renderExtraClips = (videoItems, savedClipIds) => {
  $('[data-js=youtube-search-modal__video-wrapper]').innerHTML += videoItems
    .map((video, index) => {
      const isSaved = savedClipIds.includes(video.id.videoId);
      return clipTemplate(video, index, { isModal: true, isSaved });
    })
    .join('');
};

export const renderClips = (videoItems, savedClipIds) => {
  $('[data-js=youtube-search-modal__video-wrapper]').innerHTML = videoItems
    .map((video, index) => {
      const isSaved = savedClipIds.includes(video.id.videoId);
      return clipTemplate(video, index, { isModal: true, isSaved });
    })
    .join('');
};

export const setRecentKeywords = (recentKeywords) => {
  $('[data-js="youtube-search-modal__recent-keywords"]').innerHTML =
    recentKeywordsLabel() + recentKeywords.map(recentKeywordTemplate).join('');
};

export const clearSearchResult = () => {
  $('[data-js=youtube-search-modal__video-wrapper]').innerHTML = '';
};
