export const SELECTOR = {
  ID: {
    CLASSROOM_NAVIGATION: '#classroom-navigation',
    SEARCH_MODAL_BUTTON: '#search-modal-button',
    MODAL_CONTAINER: '#modal',
    VIDEO_LIST: '#video-list',
    VIDEO_RESULT: '#search-video-result',
    SEARCH_FORM: '#search-form',
    SEARCH_INPUT_KEYWORD: '#search-input-keyword',
    SEARCH_BUTTON: '#search-button',
    SEARCH_RESULT_CONTAINER: '#search-result',
    SEARCH_RESULT_SCROLL_OBSERVER: '#search-result-scroll-observer',
  },
  CLASS: {
    VIDEO_LIST_SKELETON: '.skeleton',
    VIDEO_ITEM: '.item',
    VIDEO_ITEM_SAVE_BUTTON: '.save-button',
    SEARCH_RESULT_NOT_FOUND: '.no-result',
  },
};

const removeSelectorSymbol = origin => {
  const output = Object.entries(origin).reduce((previous, [key, value]) => {
    previous[key] = value.substring(1);
    return previous;
  }, {});
  return output;
};

export const DOM_NAME = {
  ID: removeSelectorSymbol(SELECTOR.ID),
  CLASS: removeSelectorSymbol(SELECTOR.CLASS),
};
