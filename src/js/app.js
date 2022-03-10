import SearchModal from './searchModal';
import { $ } from './utils/dom';
import NotFoundImage from '../assets/images/not_found.png';

export default class App {
  constructor() {
    this.$nav = $('.nav');
    this.render();
    this.addEvent();
    new SearchModal();
  }

  render() {
    $('.search-modal').insertAdjacentHTML('beforeend', `
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
      </section>
    `);
  }

  addEvent() {
    $('#search-modal-button', this.$nav).addEventListener('click', this.openModal);
  }

  openModal() {
    const $modalContainer = $('.modal-container');
    $modalContainer.classList.toggle('hide');
  }
}

new App();