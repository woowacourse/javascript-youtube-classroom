import VideoComponent from '.';
import { VIDEO_COMPONENT_TYPE } from '../../constants/components';
class SavedVideoComponent extends VideoComponent {
  constructor(parentElement, props) {
    super(parentElement, props);
    this.#mount();
  }

  #mount() {
    this.$videoItem.insertAdjacentHTML('beforeend', this.#generateButtonTemplate());
  }

  #generateButtonTemplate() {
    return `
        <div class="video-item__button_container">
          <button class="video-item__check-button button ${
            this.componentType === VIDEO_COMPONENT_TYPE.WATCHED ? 'checked' : ''
          }">✅</button>
          <button class="video-item__delete-button button">🗑</button>
        </div>
          `;
  }
}
export default SavedVideoComponent;
