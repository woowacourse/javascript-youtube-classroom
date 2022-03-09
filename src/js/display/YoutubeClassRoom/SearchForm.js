import { $ } from '@Utils/Dom';
import { onEnableButton } from '@Utils/Element-control';
import Display from '@Core/Display';
import SearchStore from '@Domain/YoutubeSearchResult';

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
    const keyword = $('#search-input-keyword', this.container).value;
    SearchStore.dispatch('UPDATE_SEARCH_KEYWORD', keyword);
  }
}
