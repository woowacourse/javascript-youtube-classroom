import { $ } from '@Utils/dom';
import { isEmptyString, isSameKeyword } from '@Utils/validator';
import { YOUTUBE_SEARCH_ACTION } from '@Constants/action';
import { ERROR_MESSAGE } from '@Constants/message';
import { onEnableButton } from '@Utils/elementController';
import Display from '@Core/Display';
import YoutubeSearchStore from '@Domain/YoutubeSearchStore';

export default class SearchForm extends Display {
  setContainer() {
    this.container = $('#search-form');
  }

  bindEvents() {
    this.addEvent({
      eventType: 'keyup',
      selector: '#search-input-keyword',
      handler: this.handleInputValue.bind(this),
    });
    this.addEvent({
      eventType: 'submit',
      selector: '#search-form',
      handler: this.handleSubmitForm.bind(this),
      isPreventedDefault: true,
    });
  }

  handleInputValue({ target: $target }) {
    const $searchButton = $('#search-button', this.container);
    onEnableButton($searchButton, () => $target.value.length > 0);
  }

  handleSubmitForm() {
    const newKeyword = $('#search-input-keyword', this.container).value;
    const { isLoading, keyword: beforeKeyword } = YoutubeSearchStore.getState();

    if (isEmptyString(newKeyword)) {
      alert(ERROR_MESSAGE.EMPTY_SEARCH_KEYWORD);
      return;
    }

    if (isSameKeyword(beforeKeyword, newKeyword)) {
      return;
    }

    if (isLoading) {
      return;
    }

    YoutubeSearchStore.dispatch(YOUTUBE_SEARCH_ACTION.UPDATE_SEARCH_KEYWORD, newKeyword);
    YoutubeSearchStore.dispatch(YOUTUBE_SEARCH_ACTION.UPDATE_SEARCH_RESULT);
  }
}
