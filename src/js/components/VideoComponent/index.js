import { VIDEO_COMPONENT_TYPE } from '../../constants/components';
import { parseTimeStamp } from '../../utils/util';
import { isLoadableImage } from '../../utils/validation';
class VideoComponent {
  #parentElement = null;

  componentType = VIDEO_COMPONENT_TYPE.SEARCH;

  $videoItem = null;

  $videoImg = null;

  constructor(parentElement, { type = VIDEO_COMPONENT_TYPE.SEARCH, ...restProps }) {
    this.#parentElement = parentElement;
    this.componentType = type;
    this.props = restProps;
    this.#mount();
    this.#initDOM();
  }

  #mount() {
    this.#parentElement.insertAdjacentHTML('beforeend', this.#generateTemplate());
  }

  #initDOM() {
    const { video } = this.props;
    const { videoId } = video.getVideoInfo();
    this.$videoItem = this.#parentElement.querySelector(`[data-video-id="${videoId}"]`);
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
    </li>
    `;
  }

  loadImg(showingCutline) {
    const { top } = this.$videoImg.getBoundingClientRect();

    if (isLoadableImage(top, showingCutline, this.$videoImg)) {
      const {
        dataset: { src },
      } = this.$videoImg;

      this.$videoImg.src = src;
    }
  }
}

export default VideoComponent;
