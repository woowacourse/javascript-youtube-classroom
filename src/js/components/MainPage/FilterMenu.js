import Component from '../../core/Component.js';
import videoService, { useStore } from '../../services/VideoService.js';

export default class FilterMenu extends Component {
  template() {
    const { watching, watched } = useStore((state) => ({
      watching: state.savedVideosFilter.watching,
      watched: state.savedVideosFilter.watched,
    }));

    return `
      <button id="filter-watching-button" class="button filter-menu__button ${
        watching ? 'selected' : ''
      }">👁️ 볼 영상</button>
      <button id="filter-watched-button" class="button filter-menu__button ${
        watched ? 'selected' : ''
      }">✅ 본 영상</button>
    `;
  }

  setEvent() {
    this.addEvent('click', '#filter-watching-button', () => {
      videoService.toggleSavedVideosFilter('watching');
    });

    this.addEvent('click', '#filter-watched-button', () => {
      videoService.toggleSavedVideosFilter('watched');
    });
  }
}
