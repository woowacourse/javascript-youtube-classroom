import { openModal } from '../view/viewModal.js';

const recentKeywordsLabel = () => {
  return `<span class="text-gray-700">최근 검색어: </span>`;
};

const recentKeywordTemplate = (keyword) => {
  return `<a class="chip">${keyword}</a>`;
};

const renderRecentKeywords = (recentKeywords) => {
  $('[data-js="youtube-search-modal__recent-keywords"]').innerHTML =
    recentKeywordsLabel() + recentKeywords.map(recentKeywordTemplate).join('');
};

export const onModalShow = () => {
  const recentKeywords = localStorage.get('recentKeywords') ?? [];

  openModal();
  renderRecentKeywords(recentKeywords);
};
