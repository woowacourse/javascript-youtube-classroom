export const SELECTOR = Object.freeze({
  ID: Object.freeze({
    CLASSROOM_NAVIGATION: '#classroom-navigation',
    SEARCH_MODAL_BUTTON: '#search-modal-button',
    MODAL_CONTAINER: '#modal',
    VIDEO_LIST: '#video-list',
    SEARCH_FORM: '#search-form',
    SEARCH_INPUT_KEYWORD: '#search-input-keyword',
    SEARCH_BUTTON: '#search-button',
    SEARCH_RESULT_CONTAINER: '#search-result',
    SEARCH_RESULT_SCROLL_OBSERVER: '#search-result-scroll-observer',
  }),
  CLASS: Object.freeze({
    VIDEO_LIST_SKELETON: '.skeleton',
    VIDEO_ITEM: '.video-item',
    VIDEO_ITEM_SAVE_BUTTON: '.video-item__save-button',
    SEARCH_RESULT_NOT_FOUND: '.no-result',
  }),
});

const removeSelectorSymbol = origin => {
  const output = {};
  Object.entries(origin).forEach(([key, value]) => {
    output[key] = value.substring(1);
  });

  return Object.freeze(output);
};

export const DOM_NAME = Object.freeze({
  ID: removeSelectorSymbol(SELECTOR.ID),
  CLASS: removeSelectorSymbol(SELECTOR.CLASS),
});
