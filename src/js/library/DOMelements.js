const $ = selector => document.querySelector(selector);
// const $$ = selector => document.querySelectorAll(selector);

const dom = {
  $searchButton: $('#search-button'),
  $searchModal: $('#video-search-modal'),
  $modalCloseButton: $('#modal-close-button'),
  $videoSearchForm: $('#video-search-form'),
  $videoSearchResult: $('#video-search-result'),
  $videoList: $('#video-list'),
};

export default dom;
