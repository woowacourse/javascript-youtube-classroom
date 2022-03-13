import { $ } from '@Utils/Dom';
import { SELECTOR } from '@Constants/Selector';
import { ERROR_MESSAGE, ACTION_TYPE } from '@Constants/String';
import { onEnableButton } from '@Utils/ElementControl';
import Display from '@Core/Display';
import YoutubeSearchStore from '@Domain/YoutubeSearchStore';
import { isEmptyString, isSameKeyword } from '@Utils/Validator';

export default class SearchForm extends Display {
  setContainer() {
    this.container = $(SELECTOR.ID.SEARCH_FORM);
  }

  defaultElement() {}

  bindEvents() {
    this.addEvent({
      eventType: 'keyup',
      selector: SELECTOR.ID.SEARCH_INPUT_KEYWORD,
      handler: this.handleInputValue.bind(this),
    });
    this.addEvent({
      eventType: 'submit',
      selector: SELECTOR.ID.SEARCH_FORM,
      handler: this.handleSubmitForm.bind(this),
      isPreventedDefault: true,
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
