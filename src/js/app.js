import SearchModal from './searchModal';
import { $, removeChildren } from './utils/dom';
import NotFoundImage from '../assets/images/not_found.png';

export default class App {
  constructor() {
    this.$nav = $('.nav');
    this.render();
    const searchModal = new SearchModal();
    searchModal.init();
  }

  searchResultTemplate() {
    return `
      <section class="search-result">
        <ul class="video-list">
        </ul>
        <div class="no-result">
          <img src="${NotFoundImage}" alt="no result image" class="no-result__image">
          <p class="no-result__description">
            검색 결과가 없습니다<br />
            다른 키워드로 검색해보세요
          </p>
        </div>
      </section>`;
  }

  render() {
    $('.search-modal').insertAdjacentHTML('beforeend', this.searchResultTemplate());
    $('#search-modal-button', this.$nav).addEventListener('click', this.openModal);
    $('.dimmer').addEventListener('click', this.closeModal.bind(this));
  }

  closeModal(e) {
    $('#search-input-keyword').value = '';
    $('.search-result').classList.remove('search-result--no-result');
    removeChildren($('.video-list'));
    $('.modal-container').classList.add('hide');
  }

  openModal() {
    const $modalContainer = $('.modal-container');
    $modalContainer.classList.toggle('hide');
  }
}

new App();
