import { on, emit } from '../util/event';
import { $ } from '../util/selector';

class ModalView {
  constructor({
    target,
    modalContainer,
    searchInput,
    searchModalButton,
    searchButton,
    resetEmptyResult,
  }) {
    this.$dimmer = $('.dimmer');
    this.$searchModalButton = searchModalButton;
    this.$target = target;
    this.$modalContainer = modalContainer;
    this.$searchInputKeyword = searchInput;
    this.$searchButton = searchButton;
    this.resetEmptyResult = resetEmptyResult;

    this.bindEvents();
  }

  bindEvents() {
    on(this.$searchInputKeyword, 'keypress', this.onSubmit.bind(this));
    on(this.$searchButton, 'click', this.onSubmit.bind(this));
    on(this.$searchModalButton, 'click', this.toggleModalContainerView.bind(this));
    on(this.$dimmer, 'click', this.initModalState.bind(this));
  }

  onSubmit(event) {
    if ((event.type === 'keypress' && event.key === 'Enter') || event.type === 'click') {
      emit(event.target, '@submit', { input: this.$searchInputKeyword.value });
    }
  }

  toggleModalContainerView() {
    this.$modalContainer.classList.toggle('hide');
  }

  initModalState() {
    this.toggleModalContainerView();
    this.$target.replaceChildren();
    this.$searchInputKeyword.value = '';
    this.resetEmptyResult();
  }
}

export default ModalView;
