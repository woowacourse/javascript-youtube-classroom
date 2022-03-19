export const SELECTOR = {
  ID: {
    MODAL_CONTAINER: '#modal',
    SNACKBAR: '#snackbar',
    CLASSROOM_NAVIGATION: '#classroom-navigation',
    NAVIGATION_FILTER_BUTTON: '#classroom-watched-filter-button',
    SEARCH_MODAL_BUTTON: '#search-modal-button',
    SKELETON_LIST: '#skeleton-list',
    VIDEO_LIST: '#video-list',
    VIDEO_RESULT: '#search-video-result',
    SEARCH_FORM: '#search-form',
    SEARCH_INPUT_KEYWORD: '#search-input-keyword',
    SEARCH_BUTTON: '#search-button',
    SEARCH_RESULT_CONTAINER: '#search-result',
    SEARCH_RESULT_SCROLL_OBSERVER: '#search-result-scroll-observer',
    SAVE_LIST_CONTENT: '#save-video-result',
  },
  CLASS: {
    MODAL_DIMMER: '.dimmer',
    SNACKBAR_CONTAINER: '.snackbar-container',
    VIDEO_LIST_SKELETON: '.skeleton',
    VIDEO_ITEM: '.item',
    VIDEO_ITEM_SAVE_BUTTON: '.save-button',
    EMPTY_CONTENT: '.empty-content',
    SAVE_LIST_WATCHED_BUTTON: '.save-item-watched-button',
    SAVE_LIST_REMOVE_BUTTON: '.save-item-remove-button',
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
