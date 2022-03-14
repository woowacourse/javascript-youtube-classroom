import { $ } from '@Utils/Dom';
import { SELECTOR } from '@Constants/Selector';
import { ERROR_MESSAGE, ACTION_TYPE } from '@Constants/String';
import { onEnableButton, addEventDelegate } from '@Utils/ElementControl';
import Display from '@Core/Display';
import YoutubeSearchStore from '@Domain/YoutubeSearchStore';
import { isEmptyString, isSameKeyword } from '@Utils/Validator';

export default class SearchForm extends Display {
  setContainer() {
    this.container = $(SELECTOR.ID.SEARCH_FORM);
  }

  bindEvents() {
    addEventDelegate(this.container, SELECTOR.ID.SEARCH_INPUT_KEYWORD, {
      eventType: 'keyup',
      handler: this.handleInputValue.bind(this),
    });

    addEventDelegate(this.container, SELECTOR.ID.SEARCH_FORM, {
      eventType: 'submit',
      handler: this.handleSubmitForm.bind(this),
      defaultEvent: true,
    });
  }

  handleInputValue({ target: $target }) {
    const $searchButton = $(SELECTOR.ID.SEARCH_BUTTON, this.container);
    onEnableButton($searchButton, () => $target.value.length > 0);
  }

  handleSubmitForm() {
    const newKeyword = $(SELECTOR.ID.SEARCH_INPUT_KEYWORD, this.container).value;
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

    YoutubeSearchStore.dispatch(ACTION_TYPE.UPDATE_SEARCH_KEYWORD, newKeyword);
    YoutubeSearchStore.dispatch(ACTION_TYPE.UPDATE_SEARCH_RESULT);
  }
}
