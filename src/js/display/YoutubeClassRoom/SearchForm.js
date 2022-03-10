import { $ } from '@Utils/Dom';
import { onEnableButton } from '@Utils/ElementControl';
import Display from '@Core/Display';
import YoutubeSearchStore from '@Domain/YoutubeSearchStore';
import { isEmptyString, isSameKeyword } from '@Utils/Validator';

export default class SearchForm extends Display {
  setContainer() {
    this.container = $('#search-form');
  }

  defaultElement() {}

  bindEvents() {
    this.addEvent('keyup', '#search-input-keyword', this.handleInputValue.bind(this));
    this.addEvent('submit', '#search-form', this.handleSubmitForm.bind(this));
  }

  handleInputValue({ target: $target }) {
    const $searchButton = $('#search-button', this.container);
    onEnableButton($searchButton, () => $target.value.length > 0);
  }

  handleSubmitForm() {
    const newKeyword = $('#search-input-keyword', this.container).value;
    const { isLoading, keyword: beforeKeyword } = YoutubeSearchStore.getState();

    if (isEmptyString(newKeyword)) {
      alert('검색어를 입력해주세요.');
      return;
    }

    if (isSameKeyword(beforeKeyword, newKeyword)) {
      return;
    }

    if (isLoading) {
      return;
    }

    YoutubeSearchStore.dispatch('UPDATE_SEARCH_KEYWORD', newKeyword);
    YoutubeSearchStore.dispatch('UPDATE_SEARCH_RESULT');
  }
}
