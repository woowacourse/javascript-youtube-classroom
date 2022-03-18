import VideoComponent from '.';
import { VIDEO_COMPONENT_TYPE } from '../../constants/components';
import { parseTimeStamp } from '../../utils/util';
class SavedVideoComponent extends VideoComponent {
  constructor(parentElement, props) {
    super(parentElement, props);
    this.#mount();
    this.#initDOM();
  }

  #mount() {
    this.parentElement.insertAdjacentHTML('beforeend', this.#generateTemplate());
  }

  #initDOM() {
    const { video } = this.props;
    const { videoId } = video.getVideoInfo();
    this.$videoItem = this.parentElement.querySelector(`[data-video-id="${videoId}"]`);
    this.$videoImg = this.$videoItem.querySelector('img');
  }

  #generateTemplate() {
    const { video } = this.props;
    const { videoId, videoTitle, channelTitle, publishTime, thumbnail } = video.getVideoInfo();
    return `
        <li class="video-item" data-video-id="${videoId}">
        <img
          data-src="${thumbnail}" class="video-item__thumbnail" ${
      this.props.notLazyLoad ? `src="${thumbnail}"` : ''
    }>
        <h4 class="video-item__title">${videoTitle}</h4>
        <p class="video-item__channel-name">${channelTitle}</p>
        <p class="video-item__published-date">${parseTimeStamp(publishTime)}</p>
        
        <div class="video-item__button_container">
          <button class="video-item__check-button button ${
            this.componentType === VIDEO_COMPONENT_TYPE.WATCHED ? 'checked' : ''
          }">✅</button>
          <button class="video-item__delete-button button">🗑</button>
        </div>
      </li>
          `;
  }
}
export default SavedVideoComponent;
