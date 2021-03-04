import { $ } from '../utils/querySelector';

const $modal = document.querySelector('[data-js="youtube-search-modal"]');

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
  return `<a class="chip">${keyword}</a>`;
};

export const renderRecentKeywords = (recentKeywords) => {
  $('[data-js="youtube-search-modal__recent-keywords"]').innerHTML =
    recentKeywordsLabel() + recentKeywords.map(recentKeywordTemplate).join('');
};
