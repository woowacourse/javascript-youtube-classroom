export const $ = selector => document.querySelector(selector);

const dom = {
  $modalOpenButton: $('#search-button'),
  $videoList: $('#video-list'),
  $searchModal: $('#video-search-modal'),
  $modalCloseButton: $('#modal-close-button'),
  $videoSearchForm: $('#video-search-form'),
  $videoSearchResult: $('#video-search-result'),
  $endPoint: $('#end-point'),
  $latestKeywordList: $('#latest-keyword-list'),
  $savedVideoCount: $('#saved-video-count'),
};

export default dom;
