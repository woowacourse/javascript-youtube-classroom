import Component from '../../core/Component.js';
import './FilterMenu.js';
import videoService from '../../services/VideoService.js';

class NavBar extends Component {
  template() {
    return `
      <filter-menu class="filter-menu"></filter-menu>
      <button 
        id="search-modal-button" 
        class="button nav__button"
      >
        🔍 검색
      </button>
    `;
  }

  setEvent() {
    this.addEvent('click', '#search-modal-button', () => {
      videoService.toggleSearchModal();
    });
  }
}

customElements.define('nav-bar', NavBar);

export default NavBar;
