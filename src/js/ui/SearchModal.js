import { $ } from '../utils/dom';
import Search from './Search';

export default class SearchModal {
  constructor() {
    this.addSearchButtonClickEvent();
    this.addSearchModalOuterClickEvent();
    this.search = new Search();
  }

  reset() {
    this.toggleShowSearchModal();
    this.search.reset();
  }

  toggleShowSearchModal() {
    $('.modal-container').classList.toggle('hide');
    $('body').classList.toggle('scroll-off');
  }

  addSearchButtonClickEvent() {
    $('#search-modal-button').addEventListener('click', () => {
      this.toggleShowSearchModal();
      this.search.input.focus();
    });
  }

  addSearchModalOuterClickEvent() {
    $('.dimmer').addEventListener('click', () => {
      this.reset();
    });
  }
}
