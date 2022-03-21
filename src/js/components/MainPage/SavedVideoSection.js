import Component from '../../core/Component.js';
import { useStore } from '../../services/VideoService.js';
import './VideoCardList.js';
import './NotFound.js';

class SavedVideoSection extends Component {
  template() {
    const savedVideos = useStore((state) => state.savedVideos);

    return `
      ${
        savedVideos.length
          ? '<saved-list class="video-list"></saved-list>'
          : `<no-videos class="saved-videos-result--no-result"></no-videos>`
      }
    `;
  }
}

customElements.define('saved-section', SavedVideoSection);

export default SavedVideoSection;
