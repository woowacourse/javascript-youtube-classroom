import SearchModal from './searchModal';
import { $ } from './utils';
import NotFoundImage from '../assets/images/not_found.png';

export default class App {
  constructor() {
    this.$modalContainer = $('.modal-container');

    $('.search-modal').insertAdjacentHTML('beforeend', this.searchResultTemplate());
    $('#search-modal-button').addEventListener('click', this.openModal);
    $('.dimmer').addEventListener('click', this.closeModal);

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

  closeModal = (e) => {
    $('#search-input-keyword').value = '';
    $('.search-result').classList.remove('search-result--no-result');
    $('.video-list').replaceChildren();
    this.$modalContainer.classList.add('hide');
  };

  openModal = () => {
    this.$modalContainer.classList.toggle('hide');
  };
}

new App();
