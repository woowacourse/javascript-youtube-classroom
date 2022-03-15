import { $, addEvent } from '@Utils/dom';
import { isEmptyString, isSameKeyword } from '@Utils/validator';
import { YOUTUBE_SEARCH_ACTION, ERROR_MESSAGE, EVENT_TYPE } from '@Constants';
import { onEnableButton } from '@Utils/elementController';
import YoutubeSearchStore from '@Domain/YoutubeSearchStore';

export default class SearchForm {
  constructor() {
    this.container = $('#search-form');
    this.bindEvents();
  }

  bindEvents() {
    addEvent(this.container, {
      eventType: EVENT_TYPE.INPUT,
      selector: '#search-input-keyword',
      handler: this.handleInputValue,
    });
    addEvent(this.container, {
      eventType: EVENT_TYPE.SUBMIT,
      selector: '#search-form',
      handler: this.handleSubmitForm,
    });
  }

  handleInputValue = ({ target: $target }) => {
    const $searchButton = $('#search-button', this.container);
    onEnableButton($searchButton, () => $target.value.length > 0);
  };

  handleSubmitForm = event => {
    event.preventDefault();
    const newKeyword = $('#search-input-keyword', this.container).value;
    const { isLoading, keyword: beforeKeyword } = YoutubeSearchStore.getState();

    if (isEmptyString(newKeyword)) {
      alert(ERROR_MESSAGE.EMPTY_SEARCH_KEYWORD);
      return;
    }

    if (isSameKeyword(beforeKeyword, newKeyword) || isLoading) {
      return;
    }

    YoutubeSearchStore.dispatch(YOUTUBE_SEARCH_ACTION.UPDATE_SEARCH_KEYWORD, newKeyword);
    YoutubeSearchStore.dispatch(YOUTUBE_SEARCH_ACTION.UPDATE_SEARCH_RESULT_REQUEST);
  };
}
