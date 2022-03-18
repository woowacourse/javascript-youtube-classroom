import { $ } from '@Utils/Dom';
import { SELECTOR } from '@Constants/Selector';
import { ERROR_MESSAGE, ACTION_TYPE } from '@Constants/String';
import { onEnableButton, addEventDelegate } from '@Utils/ElementControl';
import YoutubeSearchStore from '@Domain/YoutubeSearchStore';
import { isEmptyString, isSameKeyword } from '@Utils/Validator';

export default class SearchForm {
  $container = $(SELECTOR.ID.SEARCH_FORM);

  constructor() {
    this.setBindEvents();
  }

  setBindEvents() {
    addEventDelegate(this.$container, SELECTOR.ID.SEARCH_INPUT_KEYWORD, {
      eventType: 'keyup',
      handler: this.handleInputValue,
    });

    addEventDelegate(this.$container, SELECTOR.ID.SEARCH_FORM, {
      eventType: 'submit',
      handler: this.handleSubmitForm,
      defaultEvent: true,
    });
  }

  handleInputValue = ({ target: $target }) => {
    const $searchButton = $(SELECTOR.ID.SEARCH_BUTTON, this.$container);
    onEnableButton($searchButton, () => $target.value.length > 0);
  };

  handleSubmitForm = () => {
    const newKeyword = $(SELECTOR.ID.SEARCH_INPUT_KEYWORD, this.$container).value;
    const { isLoading, searchKeyword: beforeKeyword } = YoutubeSearchStore.getState();

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
  };
}
