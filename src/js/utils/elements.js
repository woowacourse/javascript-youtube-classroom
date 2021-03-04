const $ = (selector) => {
  const selected = document.querySelectorAll(selector);
  return selected.length === 1 ? selected[0] : selected;
};

const elements = {
  $searchButton: $("#search-button"),
  $searchModal: $("#search-modal"),
  $searchModalClose: $("#search-modal-close"),
  $searchForm: $("#search-form"),
  $searchResults: $("#search-results"),
  $notFound: $("#not-found"),
  $keywordHistory: $("#keyword-history"),
};

export default elements;
