import Component from '../../core/Component.js';
import FilterMenu from './FilterMenu.js';
import videoService from '../../services/VideoService.js';

export default class NavBar extends Component {
  template() {
    return `
      <div id="filter-menu"></div>
      <button id="search-modal-button" class="button nav__button">
        🔍 검색
      </button>
    `;
  }

  afterMounted() {
    new FilterMenu(this.$('#filter-menu'));
  }

  setEvent() {
    this.addEvent('click', '#search-modal-button', () => {
      videoService.toggleSearchModal();
    });
  }
}
